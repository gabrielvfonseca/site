import { describe, it, expect } from 'vitest'
import { z } from 'zod'

describe('Edge Cases & Error Scenarios', () => {
  describe('Empty & Null Values', () => {
    const schema = z.object({
      name: z.string().min(1),
      email: z.string().email(),
      message: z.string().optional(),
    })

    it('should reject empty string for required field', () => {
      const data = { name: '', email: 'test@example.com' }
      expect(() => schema.parse(data)).toThrow()
    })

    it('should accept undefined for optional field', () => {
      const data = { name: 'John', email: 'john@example.com', message: undefined }
      const result = schema.parse(data)
      expect(result.message).toBeUndefined()
    })

    it('should reject null for required field', () => {
      const data = { name: null, email: 'test@example.com' }
      expect(() => schema.parse(data)).toThrow()
    })

    it('should reject missing required fields', () => {
      const data = { email: 'test@example.com' }
      expect(() => schema.parse(data)).toThrow()
    })
  })

  describe('Boundary Values', () => {
    const listSchema = z.object({
      items: z.array(z.string()).min(1).max(100),
    })

    it('should reject empty array when min is 1', () => {
      const data = { items: [] }
      expect(() => listSchema.parse(data)).toThrow()
    })

    it('should accept single-item array', () => {
      const data = { items: ['one'] }
      const result = listSchema.parse(data)
      expect(result.items).toHaveLength(1)
    })

    it('should accept max-size array', () => {
      const data = { items: Array(100).fill('item') }
      const result = listSchema.parse(data)
      expect(result.items).toHaveLength(100)
    })

    it('should reject oversized array', () => {
      const data = { items: Array(101).fill('item') }
      expect(() => listSchema.parse(data)).toThrow()
    })
  })

  describe('Type Coercion & Conversion', () => {
    const schema = z.object({
      count: z.coerce.number().int().min(0),
      enabled: z.coerce.boolean(),
    })

    it('should coerce string to number', () => {
      const data = { count: '42', enabled: 'true' }
      const result = schema.parse(data)
      expect(result.count).toBe(42)
      expect(typeof result.count).toBe('number')
    })

    it('should coerce string to boolean', () => {
      const data = { count: '10', enabled: 'true' }
      const result = schema.parse(data)
      expect(result.enabled).toBe(true)
    })

    it('should reject invalid number string', () => {
      const data = { count: 'abc', enabled: 'true' }
      expect(() => schema.parse(data)).toThrow()
    })

    it('should reject negative numbers when min is 0', () => {
      const data = { count: '-1', enabled: 'true' }
      expect(() => schema.parse(data)).toThrow()
    })
  })

  describe('Special Characters & Encoding', () => {
    const schema = z.object({
      text: z.string(),
      email: z.string().email(),
    })

    it('should accept text with special characters', () => {
      const data = { text: "Hello! @#$%^&*()", email: 'test@example.com' }
      const result = schema.parse(data)
      expect(result.text).toContain('@#$%')
    })

    it('should accept unicode characters', () => {
      const data = { text: '你好世界 🌍', email: 'test@example.com' }
      const result = schema.parse(data)
      expect(result.text).toContain('🌍')
    })

    it('should accept text with newlines', () => {
      const data = { text: 'Line 1\nLine 2\nLine 3', email: 'test@example.com' }
      const result = schema.parse(data)
      expect(result.text.split('\n')).toHaveLength(3)
    })

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'notanemail',
        '@example.com',
        'user@',
        'user @example.com',
        'user@.com',
      ]

      invalidEmails.forEach((email) => {
        const data = { text: 'test', email }
        expect(() => schema.parse(data)).toThrow()
      })
    })
  })

  describe('Large Data Handling', () => {
    const messageSchema = z.object({
      content: z.string().max(10000),
    })

    it('should accept maximum length string', () => {
      const data = { content: 'a'.repeat(10000) }
      const result = messageSchema.parse(data)
      expect(result.content).toHaveLength(10000)
    })

    it('should reject oversized string', () => {
      const data = { content: 'a'.repeat(10001) }
      expect(() => messageSchema.parse(data)).toThrow()
    })

    it('should handle whitespace-only strings', () => {
      const data = { content: '   \n\t   ' }
      const result = messageSchema.parse(data)
      expect(result.content.trim()).toHaveLength(0)
    })
  })

  describe('Concurrent Request Scenarios', () => {
    const processData = async (data: { value: number }) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(data.value * 2), 10)
      })
    }

    it('should handle concurrent requests correctly', async () => {
      const requests = [{ value: 1 }, { value: 2 }, { value: 3 }]
      const results = await Promise.all(requests.map(processData))

      expect(results).toEqual([2, 4, 6])
    })

    it('should maintain order in concurrent operations', async () => {
      const data = [5, 3, 8, 1, 9]
      const results = await Promise.all(data.map((v) => processData({ value: v })))

      expect(results).toEqual([10, 6, 16, 2, 18])
    })
  })

  describe('Error Recovery', () => {
    const safeOperationWithFallback = async (shouldFail: boolean) => {
      try {
        if (shouldFail) {
          throw new Error('Operation failed')
        }
        return { success: true, data: 'result' }
      } catch (error) {
        return { success: false, data: null, error: (error as Error).message }
      }
    }

    it('should return success response on success', async () => {
      const result = await safeOperationWithFallback(false)
      expect(result.success).toBe(true)
      expect(result.data).toBe('result')
    })

    it('should return error response on failure', async () => {
      const result = await safeOperationWithFallback(true)
      expect(result.success).toBe(false)
      expect(result.error).toBe('Operation failed')
    })

    it('should handle multiple sequential failures', async () => {
      const results = await Promise.all([
        safeOperationWithFallback(true),
        safeOperationWithFallback(true),
        safeOperationWithFallback(false),
      ])

      expect(results[0].success).toBe(false)
      expect(results[1].success).toBe(false)
      expect(results[2].success).toBe(true)
    })
  })
})
