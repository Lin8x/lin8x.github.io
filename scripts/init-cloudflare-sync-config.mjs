import fs from 'node:fs/promises';
import path from 'node:path';

const TEMPLATE = {
  api_token: 'REPLACE_WITH_CLOUDFLARE_API_TOKEN',
  zone_id: 'REPLACE_WITH_CLOUDFLARE_ZONE_ID',
  access_account_id: '',
  apex_domain: 'danieljalali.com',
  cname_target: 'danieljalali.com',
  redirect_base_url: 'https://danieljalali.com',
  redirect_status_code: 301,
  manage_redirects: true,
  manage_access_public_bypass: true,
  proxied: true,
  enabled_tracks: [],
  notes: 'Leave enabled_tracks empty to manage all professional tracks from src/data/tracks.ts',
};

async function main() {
  const root = process.cwd();
  const privateDir = path.join(root, 'private');
  const templatePath = path.join(privateDir, 'cloudflare-sync.template.json');
  const configPath = path.join(privateDir, 'cloudflare-sync.json');

  await fs.mkdir(privateDir, { recursive: true });
  await fs.writeFile(templatePath, `${JSON.stringify(TEMPLATE, null, 2)}\n`, 'utf8');

  try {
    const currentRaw = await fs.readFile(configPath, 'utf8');
    const current = JSON.parse(currentRaw);
    const merged = { ...TEMPLATE, ...current };
    await fs.writeFile(configPath, `${JSON.stringify(merged, null, 2)}\n`, 'utf8');
    console.log(`Template refreshed: ${templatePath}`);
    console.log(`Existing config updated with missing defaults: ${configPath}`);
  } catch {
    await fs.writeFile(configPath, `${JSON.stringify(TEMPLATE, null, 2)}\n`, 'utf8');
    console.log(`Template created: ${templatePath}`);
    console.log(`Config initialized: ${configPath}`);
  }
}

main().catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
