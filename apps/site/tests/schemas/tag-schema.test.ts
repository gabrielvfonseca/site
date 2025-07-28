import { describe, expect, it } from 'vitest';
import { TagSchema } from '../../src/schemas/tag-schema';

describe('Tag Schema', () => {
  const validTagData = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'JavaScript',
    slug: 'javascript',
  };

  it('should validate a valid tag with required fields only', () => {
    const result = TagSchema.parse(validTagData);

    expect(result.id).toBe(validTagData.id);
    expect(result.name).toBe(validTagData.name);
  });

  it('should validate a complete tag with all optional fields', () => {
    const completeTagData = {
      ...validTagData,
      description: 'A programming language',
      color: '#f7df1e',
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-02'),
    };

    const result = TagSchema.parse(completeTagData);

    expect(result.id).toBe(validTagData.id);
    expect(result.name).toBe(validTagData.name);
  });

  describe('id field', () => {
    it('should require a valid UUID', () => {
      expect(() =>
        TagSchema.parse({
          ...validTagData,
          id: 'invalid-uuid',
        })
      ).toThrow();
    });

    it('should reject empty string', () => {
      expect(() =>
        TagSchema.parse({
          ...validTagData,
          id: '',
        })
      ).toThrow();
    });

    it('should reject missing id', () => {
      const { id, ...dataWithoutId } = validTagData;
      expect(() => TagSchema.parse(dataWithoutId)).toThrow();
    });
  });

  describe('required string fields', () => {
    const requiredFields = ['name'];

    requiredFields.forEach((field) => {
      it(`should require ${field}`, () => {
        const dataWithoutField = { ...validTagData };
        delete dataWithoutField[field as keyof typeof dataWithoutField];

        expect(() => TagSchema.parse(dataWithoutField)).toThrow();
      });

      it(`should reject empty ${field}`, () => {
        expect(() =>
          TagSchema.parse({
            ...validTagData,
            [field]: '',
          })
        ).toThrow();
      });
    });
  });

  describe('optional fields', () => {
    it('should accept description as optional', () => {
      const result = TagSchema.parse(validTagData);
      expect(result.posts).toBeUndefined();

      const withDescription = TagSchema.parse({
        ...validTagData,
        description: 'A test description',
      });
      expect(withDescription.posts).toBe('A test description');
    });

    it('should accept color as optional', () => {
      const result = TagSchema.parse(validTagData);
      expect(result.projects).toBeUndefined();

      const withProjects = TagSchema.parse({
        ...validTagData,
        projects: [],
      });
      expect(withProjects.projects).toEqual([]);
    });
  });

  describe('date fields', () => {
    it('should set default dates for createdAt and updatedAt', () => {
      const result = TagSchema.parse(validTagData);

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
      const result = TagSchema.parse({
        ...validTagData,
        createdAt: customDate,
        updatedAt: customDate,
      });

      expect(result.createdAt).toEqual(customDate);
      expect(result.updatedAt).toEqual(customDate);
    });
  });
});
