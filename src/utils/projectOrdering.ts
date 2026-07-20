export interface ProjectOrderable {
  title: string;
  date: string;
  pinned?: boolean;
}

const PRESENT_RE = /^present$/i;

const MONTH_INDEX: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

function parseDatePart(value: string, preferEndOfRange = false): number {
  const normalized = value.trim().replace(/\./g, '');
  if (!normalized) return Number.NEGATIVE_INFINITY;
  if (PRESENT_RE.test(normalized)) return Number.POSITIVE_INFINITY;

  const yearOnly = normalized.match(/^(\d{4})$/);
  if (yearOnly) {
    const year = Number(yearOnly[1]);
    const month = preferEndOfRange ? 11 : 0;
    return Date.UTC(year, month, 1);
  }

  const monthYear = normalized.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (monthYear) {
    const month = MONTH_INDEX[monthYear[1].toLowerCase()];
    const year = Number(monthYear[2]);
    if (month !== undefined) return Date.UTC(year, month, 1);
  }

  const parsed = Date.parse(normalized);
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed;
}

export function getProjectDateSortValue(date: string): { end: number; start: number } {
  const parts = String(date || '')
    .split(/\s+[–-]\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return {
      end: Number.NEGATIVE_INFINITY,
      start: Number.NEGATIVE_INFINITY,
    };
  }

  const start = parseDatePart(parts[0], false);
  const end = parseDatePart(parts[parts.length - 1], true);

  return { end, start };
}

export function compareProjectsByDateDesc<T extends ProjectOrderable>(a: T, b: T): number {
  const aDate = getProjectDateSortValue(a.date);
  const bDate = getProjectDateSortValue(b.date);

  if (aDate.end !== bDate.end) return bDate.end - aDate.end;
  if (aDate.start !== bDate.start) return bDate.start - aDate.start;
  return a.title.localeCompare(b.title);
}

export function sortProjectsByDateDesc<T extends ProjectOrderable>(projects: T[]): T[] {
  return [...projects].sort(compareProjectsByDateDesc);
}

export function selectResumeProjects<T extends ProjectOrderable>(projects: T[], limit = 3): T[] {
  const sorted = sortProjectsByDateDesc(projects);
  const pinned = sorted.filter((project) => project.pinned).slice(0, limit);

  if (pinned.length >= limit) {
    return pinned;
  }

  const selected = new Set<T>(pinned);

  for (const project of sorted) {
    if (selected.has(project) || project.pinned) continue;
    selected.add(project);
    if (selected.size >= limit) break;
  }

  return sorted.filter((project) => selected.has(project)).slice(0, limit);
}
