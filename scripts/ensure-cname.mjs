import fs from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_DOMAIN = 'www.danieljalali.com';

async function main() {
  const root = process.cwd();
  const domain = (process.env.SITE_DOMAIN || DEFAULT_DOMAIN).trim().toLowerCase();
  const outputPath = path.join(root, 'public', 'CNAME');

  if (!domain) {
    throw new Error('SITE_DOMAIN is empty.');
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${domain}\n`, 'utf8');
  console.log(`CNAME written: ${outputPath} -> ${domain}`);
}

main().catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
