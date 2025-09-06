import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getCurrentMonth,
  getCurrentMonthName,
  getCurrentYear,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek,
  getToday,
  getYesterday,
} from '../../src/utils/date';

describe('Date Utilities', () => {
  beforeEach(() => {
    // Reset any date mocks before each test
    vi.useRealTimers();
  });

  describe('getToday', () => {
    it('should return today with time reset to 00:00:00', () => {
      const today = getToday();
      const now = new Date();

      expect(today.getFullYear()).toBe(now.getFullYear());
      expect(today.getMonth()).toBe(now.getMonth());
      expect(today.getDate()).toBe(now.getDate());
      expect(today.getHours()).toBe(0);
      expect(today.getMinutes()).toBe(0);
      expect(today.getSeconds()).toBe(0);
      expect(today.getMilliseconds()).toBe(0);
    });

    it('should return a new Date instance each time', () => {
      const today1 = getToday();
      const today2 = getToday();

      expect(today1).not.toBe(today2);
      expect(today1.getTime()).toBe(today2.getTime());
    });
  });

  describe('getYesterday', () => {
    it("should return yesterday's date", () => {
      const yesterday = getYesterday();
      const today = getToday();
      const expectedYesterday = new Date(today);
      expectedYesterday.setDate(today.getDate() - 1);

      expect(yesterday.getTime()).toBe(expectedYesterday.getTime());
    });

    it('should handle month boundaries correctly', () => {
      // Mock date to be the first day of a month
      const mockDate = new Date(2025, 1, 1); // February 1st, 2025
      vi.useFakeTimers();
      vi.setSystemTime(mockDate);

      const yesterday = getYesterday();

      expect(yesterday.getFullYear()).toBe(2025);
      expect(yesterday.getMonth()).toBe(0); // January (0-indexed)
      expect(yesterday.getDate()).toBe(31);
    });
  });

  describe('getStartOfMonth', () => {
    it('should return the first day of the current month', () => {
      const startOfMonth = getStartOfMonth();
      const now = new Date();

      expect(startOfMonth.getFullYear()).toBe(now.getFullYear());
      expect(startOfMonth.getMonth()).toBe(now.getMonth());
      expect(startOfMonth.getDate()).toBe(1);
    });
  });

  describe('getEndOfMonth', () => {
    it('should return the last day of the current month', () => {
      const endOfMonth = getEndOfMonth();
      const now = new Date();
      const expectedLastDay = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      ).getDate();

      expect(endOfMonth.getFullYear()).toBe(now.getFullYear());
      expect(endOfMonth.getMonth()).toBe(now.getMonth());
      expect(endOfMonth.getDate()).toBe(expectedLastDay);
    });

    it('should handle February correctly in leap years', () => {
      const mockDate = new Date(2024, 1, 15); // February 15th, 2024 (leap year)
      vi.useFakeTimers();
      vi.setSystemTime(mockDate);

      const endOfMonth = getEndOfMonth();

      expect(endOfMonth.getDate()).toBe(29); // February has 29 days in 2024
    });

    it('should handle February correctly in non-leap years', () => {
      const mockDate = new Date(2025, 1, 15); // February 15th, 2025 (non-leap year)
      vi.useFakeTimers();
      vi.setSystemTime(mockDate);

      const endOfMonth = getEndOfMonth();

      expect(endOfMonth.getDate()).toBe(28); // February has 28 days in 2025
    });
  });

  describe('getStartOfWeek', () => {
    it('should return Monday as the start of the week', () => {
      // Mock a Wednesday
      const mockDate = new Date(2025, 6, 30); // July 30th, 2025 (Wednesday)
      vi.useFakeTimers();
      vi.setSystemTime(mockDate);

      const startOfWeek = getStartOfWeek();

      expect(startOfWeek.getDay()).toBe(1); // Monday
      expect(startOfWeek.getDate()).toBe(28); // July 28th, 2025
    });

    it('should handle Sunday correctly', () => {
      // Mock a Sunday
      const mockDate = new Date(2025, 7, 3); // August 3rd, 2025 (Sunday)
      vi.useFakeTimers();
      vi.setSystemTime(mockDate);

      const startOfWeek = getStartOfWeek();

      expect(startOfWeek.getDay()).toBe(1); // Monday
      expect(startOfWeek.getDate()).toBe(28); // July 28th, 2025
    });
  });

  describe('getEndOfWeek', () => {
    it('should return Sunday as the end of the week', () => {
      const endOfWeek = getEndOfWeek();

      expect(endOfWeek.getDay()).toBe(0); // Sunday
    });

    it('should be 6 days after start of week', () => {
      const startOfWeek = getStartOfWeek();
      const endOfWeek = getEndOfWeek();

      const diffInDays =
        (endOfWeek.getTime() - startOfWeek.getTime()) / (1000 * 60 * 60 * 24);
      expect(diffInDays).toBe(6);
    });
  });

  describe('getCurrentYear', () => {
    it('should return the current year as a number', () => {
      const currentYear = getCurrentYear();
      const expectedYear = new Date().getFullYear();

      expect(currentYear).toBe(expectedYear);
      expect(typeof currentYear).toBe('number');
    });
  });

  describe('getCurrentMonth', () => {
    it('should return the current month as 1-12', () => {
      const currentMonth = getCurrentMonth();
      const expectedMonth = new Date().getMonth() + 1;

      expect(currentMonth).toBe(expectedMonth);
      expect(currentMonth).toBeGreaterThanOrEqual(1);
      expect(currentMonth).toBeLessThanOrEqual(12);
    });
  });

  describe('getCurrentMonthName', () => {
    it('should return the current month name in English by default', () => {
      const monthName = getCurrentMonthName();
      const expectedMonthName = new Date().toLocaleString('en-US', {
        month: 'long',
      });

      expect(monthName).toBe(expectedMonthName);
      expect(typeof monthName).toBe('string');
    });

    it('should return the month name in the specified locale', () => {
      const monthNameFrench = getCurrentMonthName('fr-FR');
      const expectedMonthNameFrench = new Date().toLocaleString('fr-FR', {
        month: 'long',
      });

      expect(monthNameFrench).toBe(expectedMonthNameFrench);
    });

    it('should handle different locales correctly', () => {
      // Mock January
      const mockDate = new Date(2025, 0, 15); // January 15th, 2025
      vi.useFakeTimers();
      vi.setSystemTime(mockDate);

      expect(getCurrentMonthName('en-US')).toBe('January');
      expect(getCurrentMonthName('es-ES')).toBe('enero');
    });
  });
});
