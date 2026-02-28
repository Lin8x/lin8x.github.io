import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const checks = [];

function run(cmd, args, options = {}) {
  const result = spawnSync(cmd, args, {
    cwd: root,
    encoding: 'utf8',
    stdio: options.capture ? ['ignore', 'pipe', 'pipe'] : 'pipe',
    env: process.env,
  });
  return result;
}

function record(name, status, detail = '') {
  checks.push({ name, status, detail });
}

function ok(name, detail = '') {
  record(name, 'PASS', detail);
}

function warn(name, detail = '') {
  record(name, 'WARN', detail);
}

function fail(name, detail = '') {
  record(name, 'FAIL', detail);
}

function fileExists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function readJson(rel) {
  const p = path.join(root, rel);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function checkScriptSyntax(rel) {
  const result = run('node', ['--check', rel], { capture: true });
  if (result.status === 0) {
    ok(`syntax:${rel}`);
  } else {
    fail(`syntax:${rel}`, (result.stderr || result.stdout || '').trim());
  }
}

function checkNpmCommand(cmdName) {
  const pkg = readJson('package.json');
  if (pkg.scripts && pkg.scripts[cmdName]) {
    ok(`npm-script:${cmdName}`, pkg.scripts[cmdName]);
  } else {
    fail(`npm-script:${cmdName}`, 'missing from package.json scripts');
  }
}

function checkPrivateIgnored() {
  const result = run('git', ['check-ignore', '-q', 'private/'], { capture: true });
  if (result.status === 0) {
    ok('gitignore:private/');
    return;
  }
  warn('gitignore:private/', 'private/ is not ignored (or git unavailable)');
}

function checkTrackedPrivateFiles() {
  const result = run('git', ['ls-files', 'private'], { capture: true });
  if (result.status !== 0) {
    warn('git-tracked:private/', 'unable to query git tracked files');
    return;
  }
  const tracked = (result.stdout || '').trim();
  if (!tracked) {
    ok('git-tracked:private/');
  } else {
    fail('git-tracked:private/', `tracked files found:\n${tracked}`);
  }
}

function checkCloudflareConfig() {
  const rel = 'private/cloudflare-sync.json';
  if (!fileExists(rel)) {
    warn('cloudflare-config', `${rel} missing (run npm run domain:cloudflare:init)`);
    return;
  }
  try {
    const cfg = readJson(rel);
    const required = ['api_token', 'zone_id', 'apex_domain'];
    const missing = required.filter((k) => !cfg[k] || String(cfg[k]).startsWith('REPLACE_WITH_'));
    if (missing.length > 0) {
      warn('cloudflare-config', `missing/placeholder keys: ${missing.join(', ')}`);
    } else {
      ok('cloudflare-config');
    }
  } catch (err) {
    fail('cloudflare-config', String(err.message || err));
  }
}

function checkPrivateResumeConfig() {
  const rel = 'private/private-resume.json';
  if (!fileExists(rel)) {
    warn('private-resume-config', `${rel} missing (run npm run resume:private:scaffold)`);
    return;
  }
  try {
    readJson(rel);
    ok('private-resume-config');
  } catch (err) {
    fail('private-resume-config', String(err.message || err));
  }
}

function smokeReleaseAutomation() {
  const result = run('npm', ['run', 'ship', '--', '--skip-checks', '--skip-build', '--no-cloudflare'], {
    capture: true,
  });
  if (result.status === 0) {
    ok('release-automation-smoke');
  } else {
    fail('release-automation-smoke', (result.stderr || result.stdout || '').trim());
  }
}

function smokeCloudflarePlan() {
  const cfgPath = path.join(root, 'private/cloudflare-sync.json');
  if (!fs.existsSync(cfgPath)) {
    warn('cloudflare-plan-smoke', 'config missing; skipped');
    return;
  }
  let cfg = null;
  try {
    cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  } catch (err) {
    fail('cloudflare-plan-smoke', `invalid JSON: ${String(err.message || err)}`);
    return;
  }
  const hasRequired =
    cfg.api_token &&
    cfg.zone_id &&
    cfg.apex_domain &&
    !String(cfg.api_token).startsWith('REPLACE_WITH_') &&
    !String(cfg.zone_id).startsWith('REPLACE_WITH_');
  if (!hasRequired) {
    warn('cloudflare-plan-smoke', 'missing required config; skipped');
    return;
  }

  const result = run('npm', ['run', 'domain:cloudflare:plan'], { capture: true });
  if (result.status === 0) {
    ok('cloudflare-plan-smoke');
  } else {
    warn(
      'cloudflare-plan-smoke',
      'plan failed (likely token/scope/network). Output:\n' + (result.stderr || result.stdout || '').trim()
    );
  }
}

function printSummary() {
  const icon = { PASS: '[PASS]', WARN: '[WARN]', FAIL: '[FAIL]' };
  for (const c of checks) {
    console.log(`${icon[c.status]} ${c.name}${c.detail ? `\n${c.detail}\n` : ''}`);
  }

  const pass = checks.filter((x) => x.status === 'PASS').length;
  const warnCount = checks.filter((x) => x.status === 'WARN').length;
  const failCount = checks.filter((x) => x.status === 'FAIL').length;

  console.log(`Summary: ${pass} pass, ${warnCount} warn, ${failCount} fail`);
  if (failCount > 0) {
    process.exit(1);
  }
}

function main() {
  checkNpmCommand('ship');
  checkNpmCommand('domain:cloudflare:init');
  checkNpmCommand('domain:cloudflare:plan');
  checkNpmCommand('resume:private:init');
  checkNpmCommand('resume:private:scaffold');
  checkNpmCommand('resume:private');

  checkScriptSyntax('scripts/release-automation.mjs');
  checkScriptSyntax('scripts/init-cloudflare-sync-config.mjs');
  checkScriptSyntax('scripts/sync-cloudflare-routes.mjs');
  checkScriptSyntax('scripts/init-private-resume-template.mjs');
  checkScriptSyntax('scripts/scaffold-private-resume.mjs');
  checkScriptSyntax('scripts/generate-private-resume.mjs');

  checkPrivateIgnored();
  checkTrackedPrivateFiles();
  checkCloudflareConfig();
  checkPrivateResumeConfig();

  smokeReleaseAutomation();
  smokeCloudflarePlan();

  printSummary();
}

main();
