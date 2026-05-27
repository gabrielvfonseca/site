import { describe, it, expect } from 'vitest'
import { formatDate, parseDate, isValidDate, getDaysDifference } from '@/utils/date'

describe('Date Utilities', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15')
      const formatted = formatDate(date)

      expect(typeof formatted).toBe('string')
      expect(formatted.length).toBeGreaterThan(0)
    })

    it('should handle date strings', () => {
      const dateString = '2024-01-15'
      const formatted = formatDate(dateString)

      expect(typeof formatted).toBe('string')
    })

    it('should format with different locales', () => {
      const date = new Date('2024-01-15')
      const enFormat = formatDate(date, 'en')
      const frFormat = formatDate(date, 'fr')

      expect(enFormat).toBeDefined()
      expect(frFormat).toBeDefined()
    })

    it('should handle null dates gracefully', () => {
      const result = formatDate(null as any)

      expect(result).toBeDefined()
    })

    it('should include time when specified', () => {
      const date = new Date('2024-01-15T14:30:00')
      const withTime = formatDate(date, 'en', { includeTime: true })
      const withoutTime = formatDate(date, 'en', { includeTime: false })

      expect(withTime.length).toBeGreaterThanOrEqual(withoutTime.length)
    })
  })

  describe('parseDate', () => {
    it('should parse ISO date string', () => {
      const dateString = '2024-01-15'
      const parsed = parseDate(dateString)

      expect(parsed).toBeInstanceOf(Date)
    })

    it('should parse ISO datetime string', () => {
      const dateString = '2024-01-15T14:30:00Z'
      const parsed = parseDate(dateString)

      expect(parsed).toBeInstanceOf(Date)
    })

    it('should handle various date formats', () => {
      const dates = [
        '2024-01-15',
        '01/15/2024',
        'Jan 15, 2024',
      ]

      dates.forEach((dateStr) => {
        const parsed = parseDate(dateStr)
        expect(parsed).toBeDefined()
      })
    })

    it('should return null for invalid dates', () => {
      const result = parseDate('invalid-date')

      expect(result).toBeNull()
    })

    it('should handle timestamp numbers', () => {
      const timestamp = 1705353600000 // 2024-01-15
      const parsed = parseDate(timestamp)

      expect(parsed).toBeInstanceOf(Date)
    })
  })

  describe('isValidDate', () => {
    it('should validate valid dates', () => {
      const date = new Date('2024-01-15')

      expect(isValidDate(date)).toBe(true)
    })

    it('should reject invalid dates', () => {
      const invalidDate = new Date('invalid')

      expect(isValidDate(invalidDate)).toBe(false)
    })

    it('should validate date strings', () => {
      expect(isValidDate('2024-01-15')).toBe(true)
      expect(isValidDate('invalid')).toBe(false)
    })

    it('should validate timestamps', () => {
      const validTimestamp = 1705353600000
      const invalidTimestamp = NaN

      expect(isValidDate(validTimestamp)).toBe(true)
      expect(isValidDate(invalidTimestamp)).toBe(false)
    })

    it('should handle edge cases', () => {
      expect(isValidDate(null as any)).toBe(false)
      expect(isValidDate(undefined as any)).toBe(false)
      expect(isValidDate('')).toBe(false)
    })
  })

  describe('getDaysDifference', () => {
    it('should calculate difference between two dates', () => {
      const date1 = new Date('2024-01-15')
      const date2 = new Date('2024-01-20')

      const difference = getDaysDifference(date1, date2)

      expect(difference).toBe(5)
    })

    it('should handle negative differences', () => {
      const date1 = new Date('2024-01-20')
      const date2 = new Date('2024-01-15')

      const difference = getDaysDifference(date1, date2)

      expect(difference).toBeLessThan(0)
    })

    it('should handle same dates', () => {
      const date = new Date('2024-01-15')

      const difference = getDaysDifference(date, date)

      expect(difference).toBe(0)
    })

    it('should calculate absolute difference when specified', () => {
      const date1 = new Date('2024-01-20')
      const date2 = new Date('2024-01-15')

      const difference = getDaysDifference(date1, date2, true)

      expect(difference).toBe(5)
    })

    it('should round down to whole days', () => {
      const date1 = new Date('2024-01-15T12:00:00')
      const date2 = new Date('2024-01-20T08:00:00')

      const difference = getDaysDifference(date1, date2)

      expect(difference).toBe(Math.floor(difference))
    })
  })

  describe('Date edge cases', () => {
    it('should handle leap year dates', () => {
      const leapDate = new Date('2024-02-29')

      expect(isValidDate(leapDate)).toBe(true)
    })

    it('should handle year boundaries', () => {
      const date1 = new Date('2023-12-31')
      const date2 = new Date('2024-01-01')

      const difference = getDaysDifference(date1, date2)

      expect(difference).toBe(1)
    })

    it('should handle timezone offsets', () => {
      const utcDate = new Date('2024-01-15T00:00:00Z')
      const localDate = new Date('2024-01-15T00:00:00')

      expect(isValidDate(utcDate)).toBe(true)
      expect(isValidDate(localDate)).toBe(true)
    })

    it('should format historical dates', () => {
      const historicalDate = new Date('1970-01-01')

      expect(isValidDate(historicalDate)).toBe(true)
      expect(formatDate(historicalDate)).toBeDefined()
    })

    it('should handle future dates', () => {
      const futureDate = new Date('2100-12-31')

      expect(isValidDate(futureDate)).toBe(true)
    })
  })

  describe('Performance', () => {
    it('should handle large date ranges efficiently', () => {
      const date1 = new Date('1970-01-01')
      const date2 = new Date('2100-12-31')

      const startTime = performance.now()
      const difference = getDaysDifference(date1, date2)
      const endTime = performance.now()

      expect(difference).toBeGreaterThan(0)
      expect(endTime - startTime).toBeLessThan(10) // Should complete in < 10ms
    })

    it('should format dates quickly', () => {
      const date = new Date()

      const startTime = performance.now()
      for (let i = 0; i < 1000; i++) {
        formatDate(date)
      }
      const endTime = performance.now()

      expect(endTime - startTime).toBeLessThan(100) // 1000 formats in < 100ms
    })
  })
})
