import { describe, expect, it } from 'vitest';
import { formatDisplayDate } from './format-date';

describe('formatDisplayDate', () => {
  it('formats an ISO date into a long-form date', () => {
    expect(formatDisplayDate('2026-05-20')).toBe('May 20, 2026');
  });

  it('formats a full ISO timestamp', () => {
    expect(formatDisplayDate('2024-01-02T10:00:00.000Z')).toBe(
      'January 2, 2024'
    );
  });

  it('returns the raw string when it cannot be parsed', () => {
    expect(formatDisplayDate('not-a-date')).toBe('not-a-date');
  });

  it('returns an empty string unchanged', () => {
    expect(formatDisplayDate('')).toBe('');
  });
});
