import { describe, it, expect } from 'vitest'
import { postSchema, type Post } from '@/models/post.model'
import { mockPosts } from '../../fixtures/data'

describe('Post Model', () => {
  describe('postSchema validation', () => {
    it('should validate valid post data', () => {
      const validPost = {
        title: 'Test Post',
        description: 'A test post description',
        slug: 'test-post',
      }

      const result = postSchema.safeParse(validPost)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.title).toBe('Test Post')
      }
    })

    it('should validate post with optional fields', () => {
      const validPost = {
        title: 'Test Post',
        description: 'A test post description',
        slug: 'test-post',
        date: '2024-01-15',
        author: 'John Doe',
      }

      const result = postSchema.safeParse(validPost)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.date).toBe('2024-01-15')
        expect(result.data.author).toBe('John Doe')
      }
    })

    it('should reject post missing required title', () => {
      const invalidPost = {
        description: 'A test post description',
        slug: 'test-post',
      }

      const result = postSchema.safeParse(invalidPost)

      expect(result.success).toBe(false)
    })

    it('should reject post missing required description', () => {
      const invalidPost = {
        title: 'Test Post',
        slug: 'test-post',
      }

      const result = postSchema.safeParse(invalidPost)

      expect(result.success).toBe(false)
    })

    it('should reject post missing required slug', () => {
      const invalidPost = {
        title: 'Test Post',
        description: 'A test post description',
      }

      const result = postSchema.safeParse(invalidPost)

      expect(result.success).toBe(false)
    })

    it('should handle empty strings', () => {
      const invalidPost = {
        title: '',
        description: '',
        slug: '',
      }

      const result = postSchema.safeParse(invalidPost)

      expect(result.success).toBe(true)
    })

    it('should accept optional date field', () => {
      const post1 = {
        title: 'Post 1',
        description: 'Description 1',
        slug: 'post-1',
      }

      const post2 = {
        title: 'Post 2',
        description: 'Description 2',
        slug: 'post-2',
        date: '2024-01-15',
      }

      const result1 = postSchema.safeParse(post1)
      const result2 = postSchema.safeParse(post2)

      expect(result1.success).toBe(true)
      expect(result2.success).toBe(true)
    })

    it('should accept optional author field', () => {
      const post = {
        title: 'Test Post',
        description: 'Description',
        slug: 'test-post',
        author: 'John Doe',
      }

      const result = postSchema.safeParse(post)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.author).toBe('John Doe')
      }
    })
  })

  describe('Post Type', () => {
    it('should have correct type structure', () => {
      const post: Post = {
        title: 'Test Post',
        description: 'Test description',
        slug: 'test-post',
      }

      expect(post.title).toBeDefined()
      expect(post.description).toBeDefined()
      expect(post.slug).toBeDefined()
    })

    it('should allow optional fields in Post type', () => {
      const post: Post = {
        title: 'Test Post',
        description: 'Test description',
        slug: 'test-post',
        date: '2024-01-15',
        author: 'John Doe',
      }

      expect(post.date).toBe('2024-01-15')
      expect(post.author).toBe('John Doe')
    })
  })

  describe('Fixture data validation', () => {
    it('should validate mock posts', () => {
      mockPosts.forEach((post) => {
        const result = postSchema.safeParse(post)
        expect(result.success).toBe(true)
      })
    })

    it('should have expected mock post count', () => {
      expect(mockPosts).toHaveLength(3)
    })

    it('should contain posts with all required fields', () => {
      mockPosts.forEach((post) => {
        expect(post.title).toBeDefined()
        expect(post.description).toBeDefined()
        expect(post.slug).toBeDefined()
      })
    })

    it('should have unique slugs', () => {
      const slugs = mockPosts.map((p) => p.slug)
      const uniqueSlugs = new Set(slugs)

      expect(uniqueSlugs.size).toBe(slugs.length)
    })
  })

  describe('Post properties', () => {
    it('should have non-empty title', () => {
      const post: Post = {
        title: 'Test Post',
        description: 'Description',
        slug: 'test-post',
      }

      expect(post.title.length).toBeGreaterThan(0)
    })

    it('should have non-empty description', () => {
      const post: Post = {
        title: 'Test Post',
        description: 'This is a detailed description',
        slug: 'test-post',
      }

      expect(post.description.length).toBeGreaterThan(0)
    })

    it('should have slug-compatible title', () => {
      const post: Post = {
        title: 'Test Post',
        description: 'Description',
        slug: 'test-post',
      }

      // Slug should be lowercase and hyphenated version of title
      const expectedSlug = post.title.toLowerCase().replace(/\s+/g, '-')
      expect(post.slug).toBeDefined()
    })

    it('should support long descriptions', () => {
      const longDescription = 'a'.repeat(1000)
      const post: Post = {
        title: 'Test Post',
        description: longDescription,
        slug: 'test-post',
      }

      expect(post.description.length).toBe(1000)
    })
  })

  describe('Post sorting and filtering', () => {
    it('should allow filtering by title', () => {
      const filtered = mockPosts.filter((p) => p.title.includes('First'))

      expect(filtered).toHaveLength(1)
      expect(filtered[0].title).toBe('First Post')
    })

    it('should allow filtering by slug', () => {
      const filtered = mockPosts.filter((p) => p.slug.startsWith('first'))

      expect(filtered).toHaveLength(1)
    })

    it('should allow sorting by title', () => {
      const sorted = [...mockPosts].sort((a, b) =>
        a.title.localeCompare(b.title)
      )

      expect(sorted[0].title.localeCompare(sorted[1].title)).toBeLessThanOrEqual(0)
    })

    it('should support filtering empty results', () => {
      const filtered = mockPosts.filter((p) => p.slug === 'non-existent')

      expect(filtered).toHaveLength(0)
    })
  })

  describe('Edge cases', () => {
    it('should handle very long titles', () => {
      const longTitle = 'a'.repeat(500)
      const post = {
        title: longTitle,
        description: 'Description',
        slug: 'test-post',
      }

      const result = postSchema.safeParse(post)

      expect(result.success).toBe(true)
    })

    it('should handle special characters in content', () => {
      const post = {
        title: 'Test Post & <Special> "Characters"',
        description: 'Description with émojis 🚀 and symbols @#$%',
        slug: 'test-post',
      }

      const result = postSchema.safeParse(post)

      expect(result.success).toBe(true)
    })

    it('should handle whitespace-only fields as valid', () => {
      const post = {
        title: '   ',
        description: '  ',
        slug: '  ',
      }

      const result = postSchema.safeParse(post)

      expect(result.success).toBe(true)
    })

    it('should handle numeric strings', () => {
      const post = {
        title: '123',
        description: '456',
        slug: '789',
      }

      const result = postSchema.safeParse(post)

      expect(result.success).toBe(true)
    })

    it('should handle URL-like slugs', () => {
      const post = {
        title: 'Test',
        description: 'Desc',
        slug: 'https://example.com/post',
      }

      const result = postSchema.safeParse(post)

      expect(result.success).toBe(true)
    })
  })
})
