import fs from 'node:fs/promises';
import path from 'node:path';

import tracksModule from '../src/data/tracks.ts';

const { TRACKS, PROFESSIONAL_TRACK_KEYS } = tracksModule;
const MANAGED_RULE_PREFIX = 'managed-track-redirect:';
const API_BASE = 'https://api.cloudflare.com/client/v4';

function parseArgs(argv) {
  const args = new Set(argv);
  return {
    apply: args.has('--apply'),
    track: (() => {
      const idx = argv.findIndex((a) => a === '--track' || a === '-t');
      return idx >= 0 ? argv[idx + 1] : null;
    })(),
  };
}

async function loadConfig(root) {
  const configPath = path.join(root, 'private', 'cloudflare-sync.json');
  const raw = await fs.readFile(configPath, 'utf8').catch(() => {
    throw new Error('Missing private/cloudflare-sync.json. Run: npm run domain:cloudflare:init');
  });
  const cfg = JSON.parse(raw);

  const required = ['api_token', 'zone_id', 'apex_domain'];
  for (const key of required) {
    if (!cfg[key] || String(cfg[key]).startsWith('REPLACE_WITH_')) {
      throw new Error(`Config field \"${key}\" is missing/placeholder in ${configPath}`);
    }
  }

  return {
    ...cfg,
    access_account_id: cfg.access_account_id || '',
    cname_target: cfg.cname_target || cfg.apex_domain,
    redirect_base_url: cfg.redirect_base_url || `https://${cfg.apex_domain}`,
    redirect_status_code: cfg.redirect_status_code || 301,
    manage_redirects: typeof cfg.manage_redirects === 'boolean' ? cfg.manage_redirects : false,
    manage_access_public_bypass: typeof cfg.manage_access_public_bypass === 'boolean' ? cfg.manage_access_public_bypass : false,
    proxied: typeof cfg.proxied === 'boolean' ? cfg.proxied : true,
    enabled_tracks: Array.isArray(cfg.enabled_tracks) ? cfg.enabled_tracks : [],
  };
}

function getAccessScopePath(accountId, zoneId) {
  return accountId
    ? `/accounts/${accountId}`
    : `/zones/${zoneId}`;
}

function isAccessAuthError(err) {
  const msg = String(err?.message || '').toLowerCase();
  return msg.includes('authentication error') || msg.includes('not authorized');
}

function getManagedTrackDefs(config, explicitTrack) {
  const professional = TRACKS.filter((t) => PROFESSIONAL_TRACK_KEYS.includes(t.key));
  const selected = explicitTrack
    ? professional.filter((t) => t.key === explicitTrack)
    : config.enabled_tracks.length
      ? professional.filter((t) => config.enabled_tracks.includes(t.key))
      : professional;

  return selected;
}

function getSubdomainsForTrack(track) {
  const aliases = Array.isArray(track.domainAliases) && track.domainAliases.length
    ? track.domainAliases
    : [track.slug];
  return aliases.map((x) => String(x).toLowerCase().trim()).filter(Boolean);
}

function buildDesiredEntries(trackDefs, config) {
  const entries = [];
  for (const track of trackDefs) {
    const subdomains = getSubdomainsForTrack(track);
    for (const sub of subdomains) {
      const fqdn = `${sub}.${config.apex_domain}`;
      entries.push({
        trackKey: track.key,
        subdomain: sub,
        fqdn,
        path: track.path,
      });
    }
  }
  return entries;
}

async function cfRequest(config, method, route, body) {
  const res = await fetch(`${API_BASE}${route}`, {
    method,
    headers: {
      Authorization: `Bearer ${config.api_token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    const details = JSON.stringify(data?.errors || data || {}, null, 2);
    throw new Error(`Cloudflare API ${method} ${route} failed: ${details}`);
  }

  return data.result;
}

async function upsertDnsRecords(config, desired, apply) {
  const existing = await cfRequest(
    config,
    'GET',
    `/zones/${config.zone_id}/dns_records?type=CNAME&per_page=5000`
  );

  const existingByName = new Map(existing.map((r) => [String(r.name).toLowerCase(), r]));
  const actions = [];

  for (const item of desired) {
    const found = existingByName.get(item.fqdn.toLowerCase());
    const payload = {
      type: 'CNAME',
      name: item.subdomain,
      content: config.cname_target,
      proxied: config.proxied,
      ttl: 1,
      comment: `${MANAGED_RULE_PREFIX}${item.trackKey}`,
    };

    if (!found) {
      actions.push({ type: 'create_dns', item, payload });
      if (apply) {
        await cfRequest(config, 'POST', `/zones/${config.zone_id}/dns_records`, payload);
      }
      continue;
    }

    const needsUpdate =
      String(found.content).toLowerCase() !== String(config.cname_target).toLowerCase() ||
      Boolean(found.proxied) !== Boolean(config.proxied) ||
      String(found.comment || '') !== payload.comment;

    if (needsUpdate) {
      actions.push({ type: 'update_dns', item, payload, id: found.id });
      if (apply) {
        await cfRequest(config, 'PUT', `/zones/${config.zone_id}/dns_records/${found.id}`, payload);
      }
    } else {
      actions.push({ type: 'noop_dns', item });
    }
  }

  return actions;
}

async function getOrCreateRedirectRuleset(config, apply) {
  try {
    const entrypoint = await cfRequest(
      config,
      'GET',
      `/zones/${config.zone_id}/rulesets/phases/http_request_dynamic_redirect/entrypoint`
    );
    return entrypoint;
  } catch (err) {
    if (!apply) return null;
    const created = await cfRequest(config, 'POST', `/zones/${config.zone_id}/rulesets`, {
      name: 'Managed Dynamic Redirects',
      kind: 'zone',
      phase: 'http_request_dynamic_redirect',
      rules: [],
    });
    return created;
  }
}

function buildRedirectRule(item, config) {
  return {
    action: 'redirect',
    expression: `http.host eq \"${item.fqdn}\"`,
    description: `${MANAGED_RULE_PREFIX}${item.subdomain}`,
    enabled: true,
    action_parameters: {
      from_value: {
        status_code: Number(config.redirect_status_code) || 301,
        target_url: {
          value: `${config.redirect_base_url}${item.path}`,
        },
        preserve_query_string: true,
      },
    },
  };
}

async function upsertRedirectRules(config, desired, apply) {
  const ruleset = await getOrCreateRedirectRuleset(config, apply);
  const existingRules = ruleset?.rules || [];

  const byDescription = new Map(
    existingRules
      .filter((rule) => String(rule.description || '').startsWith(MANAGED_RULE_PREFIX))
      .map((rule) => [rule.description, rule])
  );

  const actions = [];
  const updatedRules = [...existingRules];

  for (const item of desired) {
    const desiredRule = buildRedirectRule(item, config);
    const existing = byDescription.get(desiredRule.description);

    if (!existing) {
      actions.push({ type: 'create_rule', item, description: desiredRule.description });
      if (apply) updatedRules.push(desiredRule);
      continue;
    }

    const changed =
      existing.expression !== desiredRule.expression ||
      existing.action_parameters?.from_value?.target_url?.value !== desiredRule.action_parameters.from_value.target_url.value ||
      Number(existing.action_parameters?.from_value?.status_code || 0) !== Number(desiredRule.action_parameters.from_value.status_code || 0) ||
      existing.enabled !== desiredRule.enabled;

    if (changed) {
      actions.push({ type: 'update_rule', item, description: desiredRule.description });
      if (apply) {
        const idx = updatedRules.findIndex((r) => r.id === existing.id);
        if (idx >= 0) {
          updatedRules[idx] = { ...existing, ...desiredRule, id: existing.id, ref: existing.ref };
        }
      }
    } else {
      actions.push({ type: 'noop_rule', item, description: desiredRule.description });
    }
  }

  if (apply && ruleset) {
    await cfRequest(config, 'PUT', `/zones/${config.zone_id}/rulesets/${ruleset.id}`, {
      name: ruleset.name,
      description: ruleset.description,
      kind: ruleset.kind,
      phase: ruleset.phase,
      rules: updatedRules,
    });
  }

  return actions;
}

function hasEveryoneRule(rules) {
  if (!Array.isArray(rules)) return false;
  return rules.some((rule) => rule && typeof rule === 'object' && Object.prototype.hasOwnProperty.call(rule, 'everyone'));
}

async function upsertAccessPublicBypass(config, desired, apply) {
  let scope = getAccessScopePath(config.access_account_id, config.zone_id);
  let apps;
  try {
    apps = await cfRequest(config, 'GET', `${scope}/access/apps?per_page=1000`);
  } catch (err) {
    const accountScope = String(scope).startsWith('/accounts/');
    if (!accountScope || !isAccessAuthError(err)) throw err;
    const zoneScope = `/zones/${config.zone_id}`;
    console.warn(
      'Warning: account-scope Access API auth failed; retrying with zone-scope Access API.'
    );
    scope = zoneScope;
    apps = await cfRequest(config, 'GET', `${scope}/access/apps?per_page=1000`);
  }
  const appsByDomain = new Map(
    apps
      .filter((app) => app && app.domain)
      .map((app) => [String(app.domain).toLowerCase(), app])
  );

  const actions = [];

  for (const item of desired) {
    const domain = item.fqdn.toLowerCase();
    let app = appsByDomain.get(domain);

    if (!app) {
      const payload = {
        name: `Public Track - ${item.subdomain}`,
        type: 'self_hosted',
        domain: item.fqdn,
        app_launcher_visible: false,
        session_duration: '24h',
      };
      actions.push({ type: 'create_access_app', item });
      if (apply) {
        app = await cfRequest(config, 'POST', `${scope}/access/apps`, payload);
        appsByDomain.set(domain, app);
      } else {
        continue;
      }
    } else {
      actions.push({ type: 'noop_access_app', item });
    }

    const policies = await cfRequest(
      config,
      'GET',
      `${scope}/access/apps/${app.id}/policies?per_page=1000`
    );
    const existingBypass = policies.find(
      (p) => String(p.decision || '').toLowerCase() === 'bypass' && hasEveryoneRule(p.include)
    );

    if (existingBypass) {
      actions.push({ type: 'noop_access_policy', item });
      continue;
    }

    const policyPayload = {
      name: `Managed Public Bypass - ${item.subdomain}`,
      decision: 'bypass',
      include: [{ everyone: {} }],
      exclude: [],
      require: [],
      precedence: 1,
    };
    actions.push({ type: 'create_access_policy', item });
    if (apply) {
      await cfRequest(
        config,
        'POST',
        `${scope}/access/apps/${app.id}/policies`,
        policyPayload
      );
    }
  }

  return actions;
}

async function resolveAccessAccountId(config) {
  if (String(config.access_account_id || '').trim()) {
    return String(config.access_account_id).trim();
  }
  const zone = await cfRequest(config, 'GET', `/zones/${config.zone_id}`);
  const accountId = zone?.account?.id ? String(zone.account.id).trim() : '';
  return accountId;
}

function printPlan(desired, dnsActions, ruleActions, apply) {
  console.log(`Mode: ${apply ? 'APPLY' : 'DRY RUN'}`);
  console.log(`Managed entries: ${desired.length}`);

  const summarize = (arr, key) => arr.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] || 0) + 1;
    return acc;
  }, {});

  console.log('DNS actions:', summarize(dnsActions, 'type'));
  console.log('Redirect actions:', summarize(ruleActions, 'type'));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = process.cwd();
  const config = await loadConfig(root);
  if (config.manage_access_public_bypass) {
    const discoveredAccountId = await resolveAccessAccountId(config);
    if (!discoveredAccountId) {
      throw new Error(
        'Unable to resolve access account id from zone_id. Set access_account_id in private/cloudflare-sync.json'
      );
    }
    config.access_account_id = discoveredAccountId;
  }

  const trackDefs = getManagedTrackDefs(config, args.track);
  if (!trackDefs.length) {
    throw new Error('No tracks selected for sync. Check enabled_tracks or --track value.');
  }

  const desired = buildDesiredEntries(trackDefs, config);
  const dnsActions = await upsertDnsRecords(config, desired, args.apply);
  let ruleActions;
  if (config.manage_redirects) {
    try {
      ruleActions = await upsertRedirectRules(config, desired, args.apply);
    } catch (err) {
      const msg = String(err?.message || '');
      const unauthorized = msg.includes('/rulesets') && msg.toLowerCase().includes('not authorized');
      if (!unauthorized) throw err;
      console.warn(
        'Warning: missing Cloudflare ruleset permission; skipping redirect rule sync. ' +
        'DNS and Access sync will continue.'
      );
      ruleActions = desired.map((item) => ({ type: 'skipped_rule_auth', item, description: `${MANAGED_RULE_PREFIX}${item.subdomain}` }));
    }
  } else {
    ruleActions = desired.map((item) => ({ type: 'skipped_rule', item, description: `${MANAGED_RULE_PREFIX}${item.subdomain}` }));
  }
  const accessActions = config.manage_access_public_bypass
    ? await upsertAccessPublicBypass(config, desired, args.apply)
    : desired.map((item) => ({ type: 'skipped_access', item }));

  printPlan(desired, dnsActions, ruleActions, args.apply);
  console.log('Access actions:', accessActions.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {}));

  if (!args.apply) {
    console.log('No changes applied. Re-run with --apply to execute.');
  } else {
    console.log('Cloudflare sync completed successfully.');
  }
}

main().catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
