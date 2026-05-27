/**
 * Get today's date (with time reset to 00:00:00)
 */
export function getToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/**
 * Get yesterday's date
 */
export function getYesterday(): Date {
  const today = getToday();
  today.setDate(today.getDate() - 1);
  return today;
}

/**
 * Get the first day of the current month
 */
export function getStartOfMonth(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

/**
 * Get the last day of the current month
 */
export function getEndOfMonth(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0);
}

/**
 * Get the start of the current week (Monday as first day)
 */
export function getStartOfWeek(): Date {
  const now = getToday();
  const day = now.getDay(); // Sunday = 0, Monday = 1
  const SUNDAY = 0;
  const MONDAY = 1;
  const DAYS_FROM_SUNDAY_TO_MONDAY = -6;
  const diff = (day === SUNDAY ? DAYS_FROM_SUNDAY_TO_MONDAY : MONDAY) - day;
  now.setDate(now.getDate() + diff);
  return now;
}

/**
 * Get the end of the current week (Sunday as last day)
 */
export function getEndOfWeek(): Date {
  const startOfWeek = getStartOfWeek();
  const end = new Date(startOfWeek);
  const DAYS_IN_WEEK = 7;
  end.setDate(startOfWeek.getDate() + DAYS_IN_WEEK - 1);
  return end;
}

/**
 * Get the current year (e.g. 2025)
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Get the current month (1–12)
 */
export function getCurrentMonth(): number {
  return new Date().getMonth() + 1; // getMonth() returns 0–11
}

/**
 * Get the current month as a full string (e.g. "July")
 */
export function getCurrentMonthName(locale = 'en-US'): string {
  return new Date().toLocaleString(locale, { month: 'long' });
}

/**
 * Format a date for display
 */
export function formatDate(date: Date | string, locale = 'en-US', options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (!isValidDate(dateObj)) return '';
  return dateObj.toLocaleDateString(locale, options);
}

/**
 * Parse a date string or timestamp
 */
export function parseDate(date: string | number | null | undefined): Date | null {
  if (!date) return null;
  try {
    const parsed = new Date(date);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  } catch {
    return null;
  }
}

/**
 * Check if a date is valid (works with Date objects, strings, and timestamps)
 */
export function isValidDate(date: unknown): boolean {
  if (date instanceof Date) {
    return !Number.isNaN(date.getTime());
  }
  if (typeof date === 'string') {
    const parsed = new Date(date);
    return !Number.isNaN(parsed.getTime());
  }
  if (typeof date === 'number') {
    return !Number.isNaN(date) && isFinite(date);
  }
  return false;
}

/**
 * Get the difference in days between two dates
 */
export function getDaysDifference(date1: Date | string, date2: Date | string, absolute = false): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

  if (!isValidDate(d1) || !isValidDate(d2)) return 0;

  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const diff = (d2.getTime() - d1.getTime()) / MS_PER_DAY;

  return absolute ? Math.abs(Math.floor(diff)) : Math.floor(diff);
}
