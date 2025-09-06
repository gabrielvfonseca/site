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
