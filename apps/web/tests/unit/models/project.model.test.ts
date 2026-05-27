import { describe, it, expect } from 'vitest'
import { projectSchema, type Project } from '@/models/project.model'

describe('projectSchema', () => {
  it('should validate a valid project', () => {
    const validProject = {
      title: 'Test Project',
      description: 'A test project',
      slug: 'test-project',
      date: '2024-01-01',
      link: 'https://example.com',
    }

    const result = projectSchema.parse(validProject)
    expect(result).toEqual(validProject)
  })

  it('should validate project without optional fields', () => {
    const minimalProject = {
      title: 'Test Project',
      description: 'A test project',
      slug: 'test-project',
    }

    const result = projectSchema.parse(minimalProject)
    expect(result.title).toBe('Test Project')
    expect(result.slug).toBe('test-project')
  })

  it('should reject project without title', () => {
    const invalidProject = {
      description: 'A test project',
      slug: 'test-project',
    }

    expect(() => projectSchema.parse(invalidProject)).toThrow()
  })

  it('should reject project without description', () => {
    const invalidProject = {
      title: 'Test Project',
      slug: 'test-project',
    }

    expect(() => projectSchema.parse(invalidProject)).toThrow()
  })

  it('should reject project without slug', () => {
    const invalidProject = {
      title: 'Test Project',
      description: 'A test project',
    }

    expect(() => projectSchema.parse(invalidProject)).toThrow()
  })

  it('should reject invalid URL in link field', () => {
    const invalidProject = {
      title: 'Test Project',
      description: 'A test project',
      slug: 'test-project',
      link: 'not-a-url',
    }

    expect(() => projectSchema.parse(invalidProject)).toThrow()
  })

  it('should accept valid URL in link field', () => {
    const validProject = {
      title: 'Test Project',
      description: 'A test project',
      slug: 'test-project',
      link: 'https://example.com/project',
    }

    const result = projectSchema.parse(validProject)
    expect(result.link).toBe('https://example.com/project')
  })

  it('should infer correct type', () => {
    const project: Project = {
      title: 'Test Project',
      description: 'A test project',
      slug: 'test-project',
    }

    expect(project.title).toBe('Test Project')
  })
})
