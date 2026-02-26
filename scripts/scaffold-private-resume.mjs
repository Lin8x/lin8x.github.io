import fs from 'node:fs/promises';
import path from 'node:path';

import personalModule from '../src/data/personal.ts';
import tracksModule from '../src/data/tracks.ts';

const { getExperienceForTrack, contactInfo } = personalModule;
const { resolveTrackContentKey, PROFESSIONAL_TRACK_KEYS } = tracksModule;

const TRACKS = [...PROFESSIONAL_TRACK_KEYS];

function buildTrackScaffold(track) {
  const contentTrack = resolveTrackContentKey(track);
  const experience = getExperienceForTrack(contentTrack).map((item) => ({
    entity: item.organizationType || '',
    role: item.title,
    company: 'REPLACEME',
  }));

  return {
    experience,
  };
}

function buildScaffold() {
  const tracks = Object.fromEntries(TRACKS.map((track) => [track, buildTrackScaffold(track)]));
  return {
    contact: {
      name: contactInfo.name || '',
      email: contactInfo.email || '',
      linkedin: contactInfo.linkedin || '',
      github: contactInfo.github || '',
      website: contactInfo.website || '',
      location: contactInfo.location || '',
    },
    tracks,
  };
}

async function main() {
  const root = process.cwd();
  const privateDir = path.join(root, 'private');
  const outputPath = path.join(privateDir, 'private-resume.json');

  await fs.mkdir(privateDir, { recursive: true });

  const scaffold = buildScaffold();

  try {
    await fs.access(outputPath);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(privateDir, `private-resume.backup.${timestamp}.json`);
    await fs.copyFile(outputPath, backupPath);
    console.log(`Existing private file backed up: ${backupPath}`);
  } catch {
    // No existing private-resume.json, no backup needed.
  }

  await fs.writeFile(outputPath, `${JSON.stringify(scaffold, null, 2)}\n`, 'utf8');
  console.log(`Scaffolded private resume file: ${outputPath}`);
}

main().catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
