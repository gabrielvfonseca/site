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
