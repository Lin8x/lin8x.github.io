export type TrackKey = 'cloud' | 'dataengineer' | 'gamedev' | 'software-engineer' | 'all';
export type ResumeSectionKey = 'summary' | 'skills' | 'certifications' | 'projects' | 'experience' | 'education';

export interface TrackDefinition {
  key: TrackKey;
  name: string;
  slug: string;
  path: string;
  desc: string;
}

export const TRACKS: TrackDefinition[] = [
  {
    key: 'all',
    name: 'All Experience',
    slug: 'all',
    path: '/all',
    desc: 'Combined portfolio: Cloud, Data, Game Dev, SWE.',
  },
  {
    key: 'cloud',
    name: 'Cloud Engineer',
    slug: 'cloud',
    path: '/cloud',
    desc: 'Building resilient, scalable infrastructure.',
  },
  {
    key: 'dataengineer',
    name: 'Data Engineer',
    slug: 'dataengineer',
    path: '/dataengineer',
    desc: 'Pipelines, ETL, and data warehousing.',
  },
  {
    key: 'gamedev',
    name: 'Game Developer',
    slug: 'gamedev',
    path: '/gamedev',
    desc: 'Interactive experiences and 3D systems.',
  },
  {
    key: 'software-engineer',
    name: 'Software Engineer',
    slug: 'software-engineer',
    path: '/software-engineer',
    desc: 'Full-stack development and tooling.',
  },
];

export const PROFESSIONAL_TRACKS = TRACKS.filter((track) => track.key !== 'all');

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
  dataengineer: ['summary', 'skills', 'projects', 'experience', 'certifications', 'education'],
  gamedev: ['summary', 'projects', 'skills', 'experience', 'certifications', 'education'],
  'software-engineer': ['summary', 'projects', 'experience', 'skills', 'certifications', 'education'],
};
