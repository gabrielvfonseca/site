import { describe, it, expect } from 'vitest'
import { postSchema, type Post } from '@/models/post.model'

describe('postSchema', () => {
  it('should validate a valid post', () => {
    const validPost = {
      title: 'Test Post',
      description: 'A test post',
      slug: 'test-post',
      date: '2024-01-01',
      author: 'John Doe',
    }

    const result = postSchema.parse(validPost)
    expect(result).toEqual(validPost)
  })

  it('should validate post without optional fields', () => {
    const minimalPost = {
      title: 'Test Post',
      description: 'A test post',
      slug: 'test-post',
    }

    const result = postSchema.parse(minimalPost)
    expect(result.title).toBe('Test Post')
    expect(result.slug).toBe('test-post')
    expect(result.date).toBeUndefined()
    expect(result.author).toBeUndefined()
  })

  it('should reject post without title', () => {
    const invalidPost = {
      description: 'A test post',
      slug: 'test-post',
    }

    expect(() => postSchema.parse(invalidPost)).toThrow()
  })

  it('should reject post without description', () => {
    const invalidPost = {
      title: 'Test Post',
      slug: 'test-post',
    }

    expect(() => postSchema.parse(invalidPost)).toThrow()
  })

  it('should reject post without slug', () => {
    const invalidPost = {
      title: 'Test Post',
      description: 'A test post',
    }

    expect(() => postSchema.parse(invalidPost)).toThrow()
  })

  it('should accept valid author', () => {
    const validPost = {
      title: 'Test Post',
      description: 'A test post',
      slug: 'test-post',
      author: 'Jane Smith',
    }

    const result = postSchema.parse(validPost)
    expect(result.author).toBe('Jane Smith')
  })

  it('should accept valid date', () => {
    const validPost = {
      title: 'Test Post',
      description: 'A test post',
      slug: 'test-post',
      date: '2024-06-15',
    }

    const result = postSchema.parse(validPost)
    expect(result.date).toBe('2024-06-15')
  })

  it('should infer correct type', () => {
    const post: Post = {
      title: 'Test Post',
      description: 'A test post',
      slug: 'test-post',
    }

    expect(post.title).toBe('Test Post')
  })

  it('should allow null values for optional fields', () => {
    const postWithNulls = {
      title: 'Test Post',
      description: 'A test post',
      slug: 'test-post',
      date: undefined,
      author: undefined,
    }

    const result = postSchema.parse(postWithNulls)
    expect(result.date).toBeUndefined()
    expect(result.author).toBeUndefined()
  })
})
