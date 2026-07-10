const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;
const MS_PER_MINUTE = 60_000;
const MS_PER_HOUR = 3_600_000;
const MS_PER_DAY = 86_400_000;
const MS_PER_WEEK = 604_800_000;

/**
 * Format a duration in seconds as a compact `Hh Mm` string (e.g. `18h 30m`).
 * @param seconds - The duration in seconds.
 * @returns The formatted duration.
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / SECONDS_PER_HOUR);
  const minutes = Math.round((seconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

/**
 * Format a running pace (seconds per km) as `M:SS` (e.g. `5:30`).
 * @param secondsPerKm - Pace in seconds per kilometre.
 * @returns The formatted pace, or an em dash if unknown.
 */
export function formatPace(secondsPerKm: number): string {
  if (!secondsPerKm) {
    return '—';
  }
  const minutes = Math.floor(secondsPerKm / SECONDS_PER_MINUTE);
  const seconds = Math.round(secondsPerKm % SECONDS_PER_MINUTE);
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Format a distance in kilometres to one decimal place (e.g. `12.4 km`).
 * @param km - Distance in kilometres.
 * @returns The formatted distance.
 */
export function formatDistance(km: number): string {
  return `${km.toFixed(1)} km`;
}

/**
 * Format an ISO timestamp as a short relative time (e.g. `3h ago`, `2d ago`).
 * Runs client-side only.
 * @param iso - The ISO 8601 timestamp.
 * @returns The relative time string.
 */
export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) {
    return '';
  }
  const diff = Date.now() - then;
  if (diff < MS_PER_MINUTE) {
    return 'just now';
  }
  if (diff < MS_PER_HOUR) {
    return `${Math.floor(diff / MS_PER_MINUTE)}m ago`;
  }
  if (diff < MS_PER_DAY) {
    return `${Math.floor(diff / MS_PER_HOUR)}h ago`;
  }
  if (diff < MS_PER_WEEK) {
    return `${Math.floor(diff / MS_PER_DAY)}d ago`;
  }
  return `${Math.floor(diff / MS_PER_WEEK)}w ago`;
}
