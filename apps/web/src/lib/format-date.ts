/**
 * Format an ISO-ish date string into a readable long-form date
 * (e.g. "May 20, 2026"). Falls back to the raw string if it can't be parsed.
 * @param date - The date string to format.
 * @returns The formatted date string.
 */
export function formatDisplayDate(date: string): string {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Normalize a date value into an ISO 8601 string suitable for machine-readable
 * metadata (e.g. Open Graph `article:published_time`, `<time dateTime>`).
 * Frontmatter dates may arrive as `Date` objects or strings.
 * @param date - The date value to normalize.
 * @returns The ISO 8601 string, or undefined when missing/unparseable.
 */
export function toIsoDate(date: string | Date | undefined): string | undefined {
  if (!date) {
    return;
  }

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}
