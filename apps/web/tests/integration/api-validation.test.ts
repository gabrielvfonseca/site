import { describe, it, expect } from 'vitest'
import { z } from 'zod'

// Simulate the validation schemas used in API routes
const ChatMessageSchema = z.object({
  message: z.string().min(1).max(10000),
  history: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string(),
    })
  ),
})

const ChatRequestSchema = z.object({
  message: z.string().min(1).max(10000),
  history: z.array(z.any()).max(50),
})

const QuerySchema = z.object({
  per_page: z.coerce.number().int().min(1).max(100).default(10),
  sort: z
    .enum(['updated', 'created', 'pushed', 'name'])
    .default('updated'),
})

describe('API Validation Schemas', () => {
  describe('ChatRequestSchema', () => {
    it('should validate valid chat message', () => {
      const validRequest = {
        message: 'Hello',
        history: [],
      }

      const result = ChatRequestSchema.parse(validRequest)
      expect(result.message).toBe('Hello')
    })

    it('should reject empty message', () => {
      const invalidRequest = {
        message: '',
        history: [],
      }

      expect(() => ChatRequestSchema.parse(invalidRequest)).toThrow()
    })

    it('should reject message over 10000 characters', () => {
      const invalidRequest = {
        message: 'a'.repeat(10001),
        history: [],
      }

      expect(() => ChatRequestSchema.parse(invalidRequest)).toThrow()
    })

    it('should accept message with exactly 10000 characters', () => {
      const validRequest = {
        message: 'a'.repeat(10000),
        history: [],
      }

      const result = ChatRequestSchema.parse(validRequest)
      expect(result.message).toHaveLength(10000)
    })

    it('should reject history with more than 50 items', () => {
      const invalidRequest = {
        message: 'Hello',
        history: Array(51).fill({ role: 'user', content: 'test' }),
      }

      expect(() => ChatRequestSchema.parse(invalidRequest)).toThrow()
    })

    it('should accept history with exactly 50 items', () => {
      const validRequest = {
        message: 'Hello',
        history: Array(50).fill({ role: 'user', content: 'test' }),
      }

      const result = ChatRequestSchema.parse(validRequest)
      expect(result.history).toHaveLength(50)
    })
  })

  describe('QuerySchema', () => {
    it('should validate valid query parameters', () => {
      const validQuery = {
        per_page: 10,
        sort: 'updated',
      }

      const result = QuerySchema.parse(validQuery)
      expect(result.per_page).toBe(10)
      expect(result.sort).toBe('updated')
    })

    it('should use default per_page value', () => {
      const query = {
        sort: 'updated',
      }

      const result = QuerySchema.parse(query)
      expect(result.per_page).toBe(10)
    })

    it('should use default sort value', () => {
      const query = {
        per_page: 20,
      }

      const result = QuerySchema.parse(query)
      expect(result.sort).toBe('updated')
    })

    it('should reject per_page less than 1', () => {
      const invalidQuery = {
        per_page: 0,
        sort: 'updated',
      }

      expect(() => QuerySchema.parse(invalidQuery)).toThrow()
    })

    it('should reject per_page greater than 100', () => {
      const invalidQuery = {
        per_page: 101,
        sort: 'updated',
      }

      expect(() => QuerySchema.parse(invalidQuery)).toThrow()
    })

    it('should accept all valid sort options', () => {
      const sortOptions = ['updated', 'created', 'pushed', 'name'] as const

      sortOptions.forEach((sort) => {
        const query = { sort }
        const result = QuerySchema.parse(query)
        expect(result.sort).toBe(sort)
      })
    })

    it('should reject invalid sort option', () => {
      const invalidQuery = {
        per_page: 10,
        sort: 'invalid-sort',
      }

      expect(() => QuerySchema.parse(invalidQuery)).toThrow()
    })

    it('should coerce string per_page to number', () => {
      const query = {
        per_page: '25',
        sort: 'created',
      }

      const result = QuerySchema.parse(query)
      expect(result.per_page).toBe(25)
      expect(typeof result.per_page).toBe('number')
    })
  })

  describe('ChatMessageSchema', () => {
    it('should validate complete chat message', () => {
      const validMessage = {
        message: 'Hello world',
        history: [
          { role: 'user', content: 'Hi' },
          { role: 'assistant', content: 'Hello' },
        ],
      }

      const result = ChatMessageSchema.parse(validMessage)
      expect(result.message).toBe('Hello world')
      expect(result.history).toHaveLength(2)
    })

    it('should reject invalid role in history', () => {
      const invalidMessage = {
        message: 'Hello',
        history: [{ role: 'admin', content: 'test' }],
      }

      expect(() => ChatMessageSchema.parse(invalidMessage)).toThrow()
    })

    it('should reject message with invalid type', () => {
      const invalidMessage = {
        message: 123,
        history: [],
      }

      expect(() => ChatMessageSchema.parse(invalidMessage)).toThrow()
    })
  })
})
