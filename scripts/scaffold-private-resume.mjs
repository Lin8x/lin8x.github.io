import fs from 'node:fs/promises';
import path from 'node:path';

import personalModule from '../src/data/personal.ts';
import tracksModule from '../src/data/tracks.ts';

const { workExperience, contactInfo, getExperienceForTrack } = personalModule;
const { PROFESSIONAL_TRACK_KEYS, resolveTrackContentKey } = tracksModule;

const TRACKS = [...PROFESSIONAL_TRACK_KEYS];

function parseDateForSort(dateValue) {
  if (!dateValue) return Number.NEGATIVE_INFINITY;
  if (String(dateValue).toLowerCase() === 'present') return Number.POSITIVE_INFINITY;
  const parsed = new Date(dateValue);
  return Number.isNaN(parsed.getTime()) ? Number.NEGATIVE_INFINITY : parsed.getTime();
}

function buildExperienceHint(item) {
  const firstBullet = Array.isArray(item.bullets) ? String(item.bullets[0] || '').trim() : '';
  if (!firstBullet) return 'No summary bullet provided.';

  const oneLine = firstBullet.replace(/\s+/g, ' ');
  const maxLen = 140;
  if (oneLine.length <= maxLen) return oneLine;
  return `${oneLine.slice(0, maxLen - 1).trimEnd()}...`;
}

function sortExperienceItems(items) {
  const sorted = [...items].sort((a, b) => {
    const endDiff = parseDateForSort(b.endDate) - parseDateForSort(a.endDate);
    if (endDiff !== 0) return endDiff;
    const startDiff = parseDateForSort(b.startDate) - parseDateForSort(a.startDate);
    if (startDiff !== 0) return startDiff;
    return String(a.title || '').localeCompare(String(b.title || ''));
  });
  return sorted;
}

function buildExperienceTrackVisibilityMap() {
  const visibility = new Map();

  for (const track of TRACKS) {
    const contentTrack = resolveTrackContentKey(track);
    const experiences = getExperienceForTrack(contentTrack);

    for (const item of experiences) {
      const key = `${item.organizationType || ''}|||${item.title || ''}`;
      if (!visibility.has(key)) visibility.set(key, new Set());
      visibility.get(key).add(track);
    }
  }

  return visibility;
}

function buildCompanyScaffold(items, visibilityMap) {
  const uniqueByKey = new Map();

  for (const item of items) {
    const entity = item.organizationType || '';
    const role = item.title || '';
    const key = `${entity}|||${role}`;
    if (uniqueByKey.has(key)) continue;

    uniqueByKey.set(key, {
      entity,
      role,
      hint: buildExperienceHint(item),
      company: 'REPLACEME',
      tracks: [...(visibilityMap.get(key) || new Set())],
    });
  }

  return [...uniqueByKey.values()];
}

function buildScaffold() {
  const sortedExperience = sortExperienceItems(workExperience);
  const visibilityMap = buildExperienceTrackVisibilityMap();
  const volunteerItems = sortedExperience.filter((item) => item.type === 'volunteer');
  const nonVolunteerItems = sortedExperience.filter((item) => item.type !== 'volunteer');
  const tracks = Object.fromEntries(TRACKS.map((track) => [track, {}]));
  return {
    contact: {
      name: contactInfo.name || '',
      email: contactInfo.email || '',
      linkedin: contactInfo.linkedin || '',
      github: contactInfo.github || '',
      website: contactInfo.website || '',
      location: contactInfo.location || '',
    },
    // Newest to oldest. Dates are intentionally not exposed in this file.
    experienceCompanies: buildCompanyScaffold(nonVolunteerItems, visibilityMap),
    // Newest to oldest volunteer-only entries.
    volunteerCompanies: buildCompanyScaffold(volunteerItems, visibilityMap),
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
