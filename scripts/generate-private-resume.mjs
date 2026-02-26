import path from 'node:path';
import fs from 'node:fs/promises';
import React from 'react';
import { renderToFile } from '@react-pdf/renderer';

import tracksModule from '../src/data/tracks.ts';
import portfolioModule from '../src/data/portfolio.ts';
import projectsModule from '../src/data/resumeProjects.ts';
import personalModule from '../src/data/personal.ts';
import resumeDocModule from '../src/components/resume/ResumeDocument.tsx';

const { TRACKS_BY_KEY, resolveTrackContentKey, PROFESSIONAL_TRACK_KEYS } = tracksModule;
const { getSkillsForTrack, getCertificationsForTrack, courseMap, degrees } = portfolioModule;
const { getProjectsForTrack } = projectsModule;
const { contactInfo, professionalSummaries, getExperienceForTrack } = personalModule;
const { ResumeDocument } = resumeDocModule;

const TRACKS = [...PROFESSIONAL_TRACK_KEYS];

function usageAndExit() {
  console.error('Usage: npm run resume:private -- [track]');
  console.error(`Valid tracks: ${TRACKS.join(', ')}`);
  console.error('Examples:');
  console.error('  npm run resume:private -- cloud');
  console.error('  npm run resume:private -- --track cloud');
  console.error('  npm run resume:private');
  process.exit(1);
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function splitEntityRole(title) {
  const value = (title || '').trim();
  const parts = value.split(' - ');
  if (parts.length >= 2) {
    return {
      entity: parts.shift() || '',
      role: parts.join(' - ').trim(),
    };
  }

  return {
    entity: '',
    role: value,
  };
}

function composeDateRange(startDate, endDate) {
  const start = (startDate || '').trim();
  const end = (endDate || '').trim();
  if (!start && !end) return '';
  if (!start) return end;
  if (!end) return start;
  if (start === end) return start;
  return `${start} – ${end}`;
}

function parseTrackArg(argv) {
  if (!argv.length) return null;

  const direct = argv.find((arg) => TRACKS.includes(arg));
  if (direct) return direct;

  const trackFlagIndex = argv.findIndex((arg) => arg === '--track' || arg === '-t');
  if (trackFlagIndex >= 0) {
    const value = argv[trackFlagIndex + 1];
    if (value && TRACKS.includes(value)) return value;
    usageAndExit();
  }

  return null;
}

async function loadPrivateData(root) {
  const privatePath = path.join(root, 'private', 'private-resume.json');
  const templatePath = path.join(root, 'private', 'private-resume.template.json');

  try {
    const raw = await fs.readFile(privatePath, 'utf8');
    return { data: JSON.parse(raw), source: privatePath };
  } catch {
    const raw = await fs.readFile(templatePath, 'utf8').catch(() => {
      throw new Error(
        'Neither private/private-resume.json nor private/private-resume.template.json exists. Run: npm run resume:private:init'
      );
    });
    return { data: JSON.parse(raw), source: templatePath };
  }
}

function normalizeSkillItem(value) {
  if (!value) return null;
  if (typeof value === 'string') return { name: value };
  if (typeof value === 'object' && typeof value.name === 'string' && value.name.trim()) {
    return { name: value.name.trim() };
  }
  return null;
}

function normalizeCertificationItem(value) {
  if (!value) return null;
  if (typeof value === 'string') {
    return {
      name: value,
      provider: 'Private',
      status: 'completed',
      type: 'certification',
    };
  }

  if (typeof value === 'object' && typeof value.name === 'string' && value.name.trim()) {
    return {
      name: value.name.trim(),
      provider: value.provider || 'Private',
      status: value.status || 'completed',
      type: value.type || 'certification',
    };
  }

  return null;
}

function applyNamedObjectListOverride(baseList, override, normalizeItem, key = 'name') {
  if (!override) return baseList;

  const normalizeArray = (items) => asArray(items).map(normalizeItem).filter(Boolean);

  if (Array.isArray(override.replace)) {
    const replaced = normalizeArray(override.replace);
    const dedup = new Map(replaced.map((item) => [item[key], item]));
    return [...dedup.values()];
  }

  const removeSet = new Set(asArray(override.remove));
  const kept = baseList.filter((item) => !removeSet.has(item[key]));
  const additions = normalizeArray(override.add);
  const combined = [...kept, ...additions];
  const dedup = new Map(combined.map((item) => [item[key], item]));

  return [...dedup.values()];
}

function applyItemOverrides(items, overrides, keyField = 'title') {
  const byKey = new Map(items.map((item) => [item[keyField], { ...item }]));

  for (const patch of asArray(overrides)) {
    const matchTitle = patch?.matchTitle;
    if (!matchTitle || !byKey.has(matchTitle)) continue;

    const current = byKey.get(matchTitle);
    const next = { ...current };

    for (const [k, v] of Object.entries(patch)) {
      if (k === 'matchTitle' || v === undefined) continue;
      next[k] = v;
    }

    byKey.set(matchTitle, next);
  }

  return items.map((item) => byKey.get(item[keyField]) || item);
}

function findProjectMatchIndex(items, patch) {
  if (patch?.matchTitle) {
    return items.findIndex((item) => item.title === patch.matchTitle);
  }

  const patchEntity = (patch?.entity || '').trim();
  const patchRole = (patch?.role || '').trim();
  if (!patchEntity && !patchRole) return -1;

  return items.findIndex((item) => {
    const parts = splitEntityRole(item.title);
    const entityMatches = !patchEntity || parts.entity === patchEntity;
    const roleMatches = !patchRole || parts.role === patchRole;
    return entityMatches && roleMatches;
  });
}

function findExperienceMatchIndex(items, patch) {
  if (patch?.matchTitle) {
    return items.findIndex((item) => item.title === patch.matchTitle);
  }

  const patchEntity = (patch?.entity || '').trim();
  const patchRole = (patch?.role || '').trim();
  if (!patchEntity && !patchRole) return -1;

  return items.findIndex((item) => {
    const entityMatches = !patchEntity || (item.organizationType || '') === patchEntity;
    const roleMatches = !patchRole || item.title === patchRole;
    return entityMatches && roleMatches;
  });
}

function applyProjectOverrides(items, overrides) {
  const next = items.map((item) => ({ ...item }));

  for (const patch of asArray(overrides)) {
    const idx = findProjectMatchIndex(next, patch);
    if (idx < 0) continue;

    const current = next[idx];
    const updated = { ...current };

    for (const [k, v] of Object.entries(patch)) {
      if (k === 'matchTitle' || k === 'entity' || k === 'role' || v === undefined) continue;
      updated[k] = v;
    }

    if (!patch.date && (patch.startDate || patch.endDate)) {
      updated.date = composeDateRange(patch.startDate, patch.endDate);
    }

    next[idx] = updated;
  }

  return next;
}

function applyExperienceOverrides(items, overrides) {
  const next = items.map((item) => ({ ...item }));

  for (const patch of asArray(overrides)) {
    const idx = findExperienceMatchIndex(next, patch);
    if (idx < 0) continue;

    const current = next[idx];
    const updated = { ...current };

    for (const [k, v] of Object.entries(patch)) {
      if (k === 'matchTitle' || k === 'entity' || k === 'role' || v === undefined) continue;
      updated[k] = v;
    }

    next[idx] = updated;
  }

  return next;
}

function buildPublicResumeData(track) {
  const contentTrack = resolveTrackContentKey(track);
  return {
    track,
    skills: getSkillsForTrack(contentTrack).map((s) => ({ name: s.name })),
    certifications: getCertificationsForTrack(contentTrack)
      .filter((c) => c.type === 'certification')
      .map((c) => ({
        name: c.name,
        provider: c.provider,
        status: c.status,
        type: c.type,
      })),
    projects: getProjectsForTrack(contentTrack).map((p) => ({
      title: p.title,
      description: p.description,
      date: p.date,
      tags: p.tags,
    })),
    education: degrees.map((d) => ({
      title: d.title,
      institution: d.institution,
      year: d.year,
      relevantCourses: d.relevantCourses,
    })),
    courses: asArray(courseMap[contentTrack]).map((c) => ({ name: c.name })),
    experience: getExperienceForTrack(contentTrack).map((e) => ({
      title: e.title,
      company: '',
      organizationType: e.organizationType || '',
      startDate: e.startDate,
      endDate: e.endDate,
      bullets: e.bullets,
    })),
    contactInfo,
    summary: professionalSummaries[contentTrack] || professionalSummaries['software-engineer'] || '',
    title: TRACKS_BY_KEY[track]?.name || track,
  };
}

function mergeWithPrivateOverrides(base, privateData, track) {
  const trackOverrides = privateData?.tracks?.[track] || {};

  const contact = { ...base.contactInfo, ...(privateData.contact || {}) };

  const skills = applyNamedObjectListOverride(
    base.skills,
    trackOverrides.skills,
    normalizeSkillItem,
    'name'
  );

  const certifications = applyNamedObjectListOverride(
    base.certifications,
    trackOverrides.certifications,
    normalizeCertificationItem,
    'name'
  );

  const projects = applyProjectOverrides(base.projects, trackOverrides.projects);
  const experience = applyExperienceOverrides(base.experience, trackOverrides.experience);
  const education = applyItemOverrides(base.education, trackOverrides.education, 'title');

  return {
    track,
    skills,
    certifications,
    projects,
    education,
    courses: base.courses,
    experience: experience.map((item) => ({
      ...item,
      organizationType: '',
    })),
    contactInfo: contact,
    summary: trackOverrides.summary || base.summary,
    title: trackOverrides.title || base.title,
  };
}

async function generateForTrack({ track, privateData, root }) {
  const outputDir = path.join(root, 'private', 'output');
  await fs.mkdir(outputDir, { recursive: true });

  const publicData = buildPublicResumeData(track);
  const mergedData = mergeWithPrivateOverrides(publicData, privateData, track);

  const outputPath = path.join(
    outputDir,
    `Daniel_Jalali_Private_Resume_${track.replace(/[^a-z0-9-]/gi, '_')}.pdf`
  );
  const legacyMarkdownPath = outputPath.replace(/\.pdf$/i, '.md');

  await renderToFile(React.createElement(ResumeDocument, { data: mergedData }), outputPath);
  await fs.unlink(legacyMarkdownPath).catch(() => {});
  return outputPath;
}

async function main() {
  const argv = process.argv.slice(2);
  const parsedTrack = parseTrackArg(argv);

  const root = process.cwd();
  const { data: privateData, source } = await loadPrivateData(root);

  const tracksToGenerate = parsedTrack ? [parsedTrack] : TRACKS;
  const generated = [];

  for (const track of tracksToGenerate) {
    if (!TRACKS.includes(track)) usageAndExit();
    const output = await generateForTrack({ track, privateData, root });
    generated.push(output);
  }

  console.log(`Private resume PDFs generated from overrides in: ${source}`);
  for (const file of generated) {
    console.log(`Output: ${file}`);
  }
}

main().catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
