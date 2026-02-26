// Utility to detect current subdomain and map to track.
export type TrackKey = 'cloud' | 'dataengineer' | 'gamedev' | 'software-engineer' | 'all';

function mapSubdomainToTrack(subdomain: string): TrackKey {
  if (subdomain === 'swe') return 'software-engineer';
  if (subdomain === 'data') return 'dataengineer';
  if (subdomain === 'cloud' || subdomain === 'gamedev' || subdomain === 'all') return subdomain;
  return 'all';
}

export function getTrackFromHost(hostname: string): TrackKey {
  const cleanHost = hostname.toLowerCase().trim();
  const sub = cleanHost.split('.')[0];
  return mapSubdomainToTrack(sub);
}

export function getCurrentTrack(hostname?: string): TrackKey {
  if (hostname) return getTrackFromHost(hostname);

  if (typeof window !== 'undefined') {
    return getTrackFromHost(window.location.hostname);
  }

  if (import.meta.env.PUBLIC_SUBDOMAIN) {
    return mapSubdomainToTrack(String(import.meta.env.PUBLIC_SUBDOMAIN).toLowerCase());
  }

  // Default to 'all' when hostname is unavailable.
  return 'all';
}

export function isFunDomain(hostname?: string): boolean {
  return getCurrentTrack(hostname) === 'all';
}
