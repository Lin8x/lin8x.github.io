export type TrackKey = 'cloud' | 'dataengineer' | 'gamedev' | 'software-engineer' | 'it' | 'all';
export type ResumeSectionKey = 'summary' | 'skills' | 'certifications' | 'projects' | 'experience' | 'education';
export type ResumeSectionItemLimitKey = 'certifications' | 'projectBullets' | 'experienceBullets';

export const DEFAULT_RESUME_SECTION_ITEM_LIMITS: Record<ResumeSectionItemLimitKey, number> = {
  certifications: 2,
  projectBullets: 3,
  experienceBullets: 3,
};

export interface TrackDefinition {
  key: TrackKey;
  name: string;
  slug: string;
  path: string;
  desc: string;
  roleTitle?: string;
  // Optional alternate labels for resume/job-title wording.
  roleAliases?: string[];
  // Reuse another track's data while keeping a different role/label.
  contentSource?: Exclude<TrackKey, 'all'>;
  // Optional subdomain aliases that map to this track (e.g., "swe" -> software-engineer).
  domainAliases?: string[];
  // Optional per-section item limits for generated resumes.
  resumeSectionItemLimits?: Partial<Record<ResumeSectionItemLimitKey, number>>;
}

export const TRACKS: TrackDefinition[] = [
  {
    key: 'all',
    name: 'All Experience',
    slug: 'all',
    path: '/all',
    desc: 'Combined portfolio: Cloud, Data, Game Dev, SWE.',
    roleTitle: 'Software Engineer',
  },
  {
    key: 'cloud',
    name: 'Cloud Engineer',
    slug: 'cloud',
    path: '/cloud',
    desc: 'Building resilient, scalable infrastructure.',
    roleTitle: 'Cloud Engineer',
    roleAliases: ['IT Engineer', 'Systems Engineer'],
    domainAliases: ['cloud'],
  },
  {
    key: 'dataengineer',
    name: 'Data Engineer',
    slug: 'dataengineer',
    path: '/dataengineer',
    desc: 'Pipelines, ETL, and data warehousing.',
    roleTitle: 'Data Engineer',
    domainAliases: ['dataengineer', 'data'],
    resumeSectionItemLimits: {
      certifications: 3,
      projectBullets: 3,
      experienceBullets: 3,
    },
  },
  {
    key: 'gamedev',
    name: 'Game Developer',
    slug: 'gamedev',
    path: '/gamedev',
    desc: 'Interactive experiences and 3D systems.',
    roleTitle: 'Game Developer',
    domainAliases: ['gamedev'],
  },
  {
    key: 'software-engineer',
    name: 'Software Engineer',
    slug: 'software-engineer',
    path: '/software-engineer',
    desc: 'Full-stack development and tooling.',
    roleTitle: 'Software Engineer',
    domainAliases: ['software-engineer', 'swe'],
  },
  {
    key: 'it',
    name: 'IT Specialist',
    slug: 'it',
    path: '/it',
    desc: 'IT operations and infrastructure administration.',
    roleTitle: 'IT Specialist',
    roleAliases: ['Junior System Administrator', 'System Administrator', 'IT Engineer'],
    domainAliases: ['it'],
    resumeSectionItemLimits: {
      certifications: 3,
      projectBullets: 4,
      experienceBullets: 4,
    },
  },
];

export const PROFESSIONAL_TRACKS = TRACKS.filter((track) => track.key !== 'all');
export const PROFESSIONAL_TRACK_KEYS = PROFESSIONAL_TRACKS.map((track) => track.key as Exclude<TrackKey, 'all'>);

export const TRACKS_BY_KEY: Record<TrackKey, TrackDefinition> = TRACKS.reduce((acc, track) => {
  acc[track.key] = track;
  return acc;
}, {} as Record<TrackKey, TrackDefinition>);

// Cloud order is the default fallback when a specific track order is not configured.
export const DEFAULT_RESUME_SECTION_ORDER: ResumeSectionKey[] = [
  'summary',
  'skills',
  'certifications',
  'projects',
  'experience',
  'education',
];

export const RESUME_SECTION_ORDER_BY_TRACK: Partial<Record<TrackKey, ResumeSectionKey[]>> = {
  cloud: [...DEFAULT_RESUME_SECTION_ORDER],
  it: [...DEFAULT_RESUME_SECTION_ORDER],
  dataengineer: ['summary', 'skills', 'projects', 'experience', 'certifications', 'education'],
  gamedev: ['summary', 'projects', 'skills', 'experience', 'certifications', 'education'],
  'software-engineer': ['summary', 'projects', 'experience', 'skills', 'certifications', 'education'],
};

export function resolveTrackContentKey(trackKey: TrackKey): TrackKey {
  const track = TRACKS_BY_KEY[trackKey];
  if (!track) return trackKey;
  return track.contentSource || trackKey;
}

export function getTrackRoleTitle(trackKey: TrackKey, preferredAlias?: string): string {
  const track = TRACKS_BY_KEY[trackKey];
  if (!track) return 'Software Engineer';

  if (preferredAlias) {
    const match = (track.roleAliases || []).find(
      (alias) => alias.toLowerCase() === preferredAlias.toLowerCase()
    );
    if (match) return match;
  }

  return track.roleTitle || track.name;
}

export function getResumeSectionItemLimit(
  trackKey: TrackKey,
  section: ResumeSectionItemLimitKey
): number {
  const track = TRACKS_BY_KEY[trackKey];
  const configuredLimit = track?.resumeSectionItemLimits?.[section];

  if (typeof configuredLimit === 'number' && configuredLimit >= 0) {
    return configuredLimit;
  }

  return DEFAULT_RESUME_SECTION_ITEM_LIMITS[section];
}

export function getTrackFromSubdomain(subdomain: string): TrackKey {
  const normalized = subdomain.toLowerCase().trim();
  const match = TRACKS.find((track) =>
    (track.domainAliases || [track.slug]).map((alias) => alias.toLowerCase()).includes(normalized)
  );
  return match?.key || 'all';
}

export function getPrimarySubdomainForTrack(trackKey: TrackKey): string {
  const track = TRACKS_BY_KEY[trackKey];
  if (!track) return 'software-engineer';
  if (track.key === 'all') return 'software-engineer';
  const aliases = Array.isArray(track.domainAliases) && track.domainAliases.length
    ? track.domainAliases
    : [track.slug];
  return String(aliases[0] || track.slug).toLowerCase().trim();
}

export function getTrackWebsiteHost(trackKey: TrackKey, apexDomain = 'danieljalali.com'): string {
  const subdomain = getPrimarySubdomainForTrack(trackKey);
  const normalizedApex = String(apexDomain || 'danieljalali.com').toLowerCase().trim();
  return `${subdomain}.${normalizedApex}`;
}
