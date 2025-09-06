import { describe, expect, it } from 'vitest';
import { ProjectsSchema } from '../../src/schemas/project-schema';

describe('Project Schema', () => {
  const validProjectData = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Test Project',
    description: 'A test project description',
    slug: 'test-project',
  };

  it('should validate a valid project with required fields only', () => {
    const result = ProjectsSchema.parse(validProjectData);

    expect(result.id).toBe(validProjectData.id);
    expect(result.title).toBe(validProjectData.title);
    expect(result.description).toBe(validProjectData.description);
    expect(result.slug).toBe(validProjectData.slug);
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.updatedAt).toBeInstanceOf(Date);
  });

  it('should validate a complete project with all optional fields', () => {
    const completeProjectData = {
      ...validProjectData,
      githubUrl: 'https://github.com/user/repo',
      demoUrl: 'https://demo.example.com',
      imageUrl: 'https://example.com/image.jpg',
      tags: [],
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-02'),
    };

    const result = ProjectsSchema.parse(completeProjectData);

    expect(result.tags).toEqual([]);
    expect(result.createdAt).toEqual(new Date('2025-01-01'));
    expect(result.updatedAt).toEqual(new Date('2025-01-02'));
  });

  describe('id field', () => {
    it('should require a valid UUID', () => {
      expect(() =>
        ProjectsSchema.parse({
          ...validProjectData,
          id: 'invalid-uuid',
        })
      ).toThrow();
    });

    it('should reject empty string', () => {
      expect(() =>
        ProjectsSchema.parse({
          ...validProjectData,
          id: '',
        })
      ).toThrow();
    });

    it('should reject missing id', () => {
      const { id, ...dataWithoutId } = validProjectData;
      expect(() => ProjectsSchema.parse(dataWithoutId)).toThrow();
    });
  });

  describe('required string fields', () => {
    const requiredFields = ['title', 'description', 'slug'];

    requiredFields.forEach((field) => {
      it(`should require ${field}`, () => {
        const dataWithoutField = { ...validProjectData };
        delete dataWithoutField[field as keyof typeof dataWithoutField];

        expect(() => ProjectsSchema.parse(dataWithoutField)).toThrow();
      });

      it(`should reject empty ${field}`, () => {
        expect(() =>
          ProjectsSchema.parse({
            ...validProjectData,
            [field]: '',
          })
        ).toThrow();
      });
    });
  });

  describe('URL fields', () => {
    const urlFields = ['githubUrl', 'demoUrl', 'imageUrl'];

    urlFields.forEach((field) => {
      it(`should accept valid URLs for ${field}`, () => {
        const validUrls = [
          'https://example.com',
          'http://example.com',
          'https://subdomain.example.com/path',
        ];

        validUrls.forEach((url) => {
          const result = ProjectsSchema.parse({
            ...validProjectData,
            [field]: url,
          });
          expect(result[field as keyof typeof result]).toBe(url);
        });
      });

      it(`should reject invalid URLs for ${field}`, () => {
        const invalidUrls = [
          'not-a-url',
          'ftp://example.com',
          'example.com',
          '',
        ];

        invalidUrls.forEach((url) => {
          expect(() =>
            ProjectsSchema.parse({
              ...validProjectData,
              [field]: url,
            })
          ).toThrow();
        });
      });

      it(`should be optional for ${field}`, () => {
        const result = ProjectsSchema.parse(validProjectData);
        expect(result[field as keyof typeof result]).toBeUndefined();
      });
    });
  });

  describe('date fields', () => {
    it('should set default dates for createdAt and updatedAt', () => {
      const result = ProjectsSchema.parse(validProjectData);

      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);

      // Should be close to current time (within 1 second)
      const now = new Date();
      expect(Math.abs(result.createdAt.getTime() - now.getTime())).toBeLessThan(
        1000
      );
      expect(Math.abs(result.updatedAt.getTime() - now.getTime())).toBeLessThan(
        1000
      );
    });

    it('should accept custom date values', () => {
      const customDate = new Date('2025-01-01');
      const result = ProjectsSchema.parse({
        ...validProjectData,
        createdAt: customDate,
        updatedAt: customDate,
      });

      expect(result.createdAt).toEqual(customDate);
      expect(result.updatedAt).toEqual(customDate);
    });
  });

  describe('tags field', () => {
    it('should be optional', () => {
      const result = ProjectsSchema.parse(validProjectData);
      expect(result.tags).toBeUndefined();
    });

    it('should accept empty array', () => {
      const result = ProjectsSchema.parse({
        ...validProjectData,
        tags: [],
      });
      expect(result.tags).toEqual([]);
    });
  });
});
