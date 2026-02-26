import { getTrackFromSubdomain, type TrackKey } from '../data/tracks';

export function getTrackFromHost(hostname: string): TrackKey {
  const cleanHost = hostname.toLowerCase().trim();
  const sub = cleanHost.split('.')[0];
  return getTrackFromSubdomain(sub);
}

export function getCurrentTrack(hostname?: string): TrackKey {
  if (hostname) return getTrackFromHost(hostname);

  if (typeof window !== 'undefined') {
    return getTrackFromHost(window.location.hostname);
  }

  if (import.meta.env.PUBLIC_SUBDOMAIN) {
    return getTrackFromSubdomain(String(import.meta.env.PUBLIC_SUBDOMAIN).toLowerCase());
  }

  // Default to 'all' when hostname is unavailable.
  return 'all';
}

export function isFunDomain(hostname?: string): boolean {
  return getCurrentTrack(hostname) === 'all';
}
