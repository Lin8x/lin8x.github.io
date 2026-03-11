import fs from 'node:fs/promises';
import path from 'node:path';
import tracksModule from '../src/data/tracks.ts';

const { PROFESSIONAL_TRACK_KEYS } = tracksModule;
const TRACKS = [...PROFESSIONAL_TRACK_KEYS];

function emptyTrackTemplate() {
  return {};
}

function buildTemplate() {
  const tracks = Object.fromEntries(TRACKS.map((track) => [track, emptyTrackTemplate()]));
  return {
    contact: {},
    experienceCompanies: [],
    volunteerCompanies: [],
    tracks,
  };
}

async function main() {
  const root = process.cwd();
  const privateDir = path.join(root, 'private');
  const templatePath = path.join(privateDir, 'private-resume.template.json');
  const privatePath = path.join(privateDir, 'private-resume.json');

  const template = buildTemplate();

  await fs.mkdir(privateDir, { recursive: true });
  await fs.writeFile(templatePath, `${JSON.stringify(template, null, 2)}\n`, 'utf8');

  try {
    await fs.access(privatePath);
    console.log(`Template refreshed: ${templatePath}`);
    console.log(`Existing private file preserved: ${privatePath}`);
  } catch {
    await fs.writeFile(privatePath, `${JSON.stringify(template, null, 2)}\n`, 'utf8');
    console.log(`Template created: ${templatePath}`);
    console.log(`Private file initialized: ${privatePath}`);
  }
}

main().catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
