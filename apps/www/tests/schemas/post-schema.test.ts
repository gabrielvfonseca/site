import { describe, expect, it } from 'vitest';
import { PostSchema, StatusEnum } from '../../src/schemas/post-schema';

describe('Post Schema', () => {
  describe('StatusEnum', () => {
    it('should accept valid status values', () => {
      expect(() => StatusEnum.parse('DRAFT')).not.toThrow();
      expect(() => StatusEnum.parse('PUBLISHED')).not.toThrow();
      expect(() => StatusEnum.parse('ARCHIVED')).not.toThrow();
    });

    it('should reject invalid status values', () => {
      expect(() => StatusEnum.parse('INVALID')).toThrow();
      expect(() => StatusEnum.parse('draft')).toThrow(); // case sensitive
      expect(() => StatusEnum.parse('')).toThrow();
      expect(() => StatusEnum.parse(null)).toThrow();
    });

    it('should have DRAFT as default', () => {
      const result = StatusEnum.parse(undefined);
      expect(result).toBe('DRAFT');
    });
  });

  describe('PostSchema', () => {
    const validPostData = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      title: 'Test Post',
      description: 'A test post description',
      slug: 'test-post',
      content: 'This is the content of the test post',
    };

    it('should validate a valid post with required fields only', () => {
      const result = PostSchema.parse(validPostData);

      expect(result.id).toBe(validPostData.id);
      expect(result.title).toBe(validPostData.title);
      expect(result.description).toBe(validPostData.description);
      expect(result.slug).toBe(validPostData.slug);
      expect(result.content).toBe(validPostData.content);
      expect(result.status).toBe('DRAFT'); // default value
      expect(result.isFeatured).toBe(false); // default value
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('should validate a complete post with all optional fields', () => {
      const completePostData = {
        ...validPostData,
        status: 'PUBLISHED' as const,
        isFeatured: true,
        readingTime: 5,
        coverImageUrl: 'https://example.com/image.jpg',
        metaTitle: 'Meta Title',
        metaDescription: 'Meta Description',
        priority: 1,
        tags: [],
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-02'),
      };

      const result = PostSchema.parse(completePostData);

      expect(result.status).toBe('PUBLISHED');
      expect(result.isFeatured).toBe(true);
      expect(result.readingTime).toBe(5);
      expect(result.coverImageUrl).toBe('https://example.com/image.jpg');
      expect(result.metaTitle).toBe('Meta Title');
      expect(result.metaDescription).toBe('Meta Description');
      expect(result.priority).toBe(1);
      expect(result.tags).toEqual([]);
      expect(result.createdAt).toEqual(new Date('2025-01-01'));
      expect(result.updatedAt).toEqual(new Date('2025-01-02'));
    });

    describe('id field', () => {
      it('should require a valid UUID', () => {
        expect(() =>
          PostSchema.parse({
            ...validPostData,
            id: 'invalid-uuid',
          })
        ).toThrow();
      });

      it('should reject empty string', () => {
        expect(() =>
          PostSchema.parse({
            ...validPostData,
            id: '',
          })
        ).toThrow();
      });

      it('should reject missing id', () => {
        const { id, ...dataWithoutId } = validPostData;
        expect(() => PostSchema.parse(dataWithoutId)).toThrow();
      });
    });

    describe('status field', () => {
      it('should accept valid status values', () => {
        const statuses = ['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const;

        statuses.forEach((status) => {
          const result = PostSchema.parse({
            ...validPostData,
            status,
          });
          expect(result.status).toBe(status);
        });
      });

      it('should use DRAFT as default when status is not provided', () => {
        const result = PostSchema.parse(validPostData);
        expect(result.status).toBe('DRAFT');
      });
    });

    describe('required string fields', () => {
      const requiredFields = ['title', 'description', 'slug', 'content'];

      requiredFields.forEach((field) => {
        it(`should require ${field}`, () => {
          const dataWithoutField = { ...validPostData };
          delete dataWithoutField[field as keyof typeof dataWithoutField];

          expect(() => PostSchema.parse(dataWithoutField)).toThrow();
        });

        it(`should reject empty ${field}`, () => {
          expect(() =>
            PostSchema.parse({
              ...validPostData,
              [field]: '',
            })
          ).toThrow();
        });
      });
    });

    describe('isFeatured field', () => {
      it('should default to false', () => {
        const result = PostSchema.parse(validPostData);
        expect(result.isFeatured).toBe(false);
      });

      it('should accept boolean values', () => {
        const resultTrue = PostSchema.parse({
          ...validPostData,
          isFeatured: true,
        });
        expect(resultTrue.isFeatured).toBe(true);

        const resultFalse = PostSchema.parse({
          ...validPostData,
          isFeatured: false,
        });
        expect(resultFalse.isFeatured).toBe(false);
      });

      it('should reject non-boolean values', () => {
        expect(() =>
          PostSchema.parse({
            ...validPostData,
            isFeatured: 'true',
          })
        ).toThrow();
      });
    });

    describe('readingTime field', () => {
      it('should be optional', () => {
        const result = PostSchema.parse(validPostData);
        expect(result.readingTime).toBeUndefined();
      });

      it('should accept positive integers', () => {
        const result = PostSchema.parse({
          ...validPostData,
          readingTime: 5,
        });
        expect(result.readingTime).toBe(5);
      });

      it('should reject non-integer values', () => {
        expect(() =>
          PostSchema.parse({
            ...validPostData,
            readingTime: 5.5,
          })
        ).toThrow();
      });

      it('should reject negative values', () => {
        expect(() =>
          PostSchema.parse({
            ...validPostData,
            readingTime: -1,
          })
        ).toThrow();
      });
    });

    describe('coverImageUrl field', () => {
      it('should be optional', () => {
        const result = PostSchema.parse(validPostData);
        expect(result.coverImageUrl).toBeUndefined();
      });

      it('should accept valid URLs', () => {
        const validUrls = [
          'https://example.com/image.jpg',
          'http://example.com/image.png',
          'https://cdn.example.com/path/to/image.webp',
        ];

        validUrls.forEach((url) => {
          const result = PostSchema.parse({
            ...validPostData,
            coverImageUrl: url,
          });
          expect(result.coverImageUrl).toBe(url);
        });
      });

      it('should reject invalid URLs', () => {
        const invalidUrls = [
          'not-a-url',
          'ftp://example.com/image.jpg',
          'example.com/image.jpg',
          '',
        ];

        invalidUrls.forEach((url) => {
          expect(() =>
            PostSchema.parse({
              ...validPostData,
              coverImageUrl: url,
            })
          ).toThrow();
        });
      });
    });

    describe('priority field', () => {
      it('should be optional', () => {
        const result = PostSchema.parse(validPostData);
        expect(result.priority).toBeUndefined();
      });

      it('should accept integer values', () => {
        const result = PostSchema.parse({
          ...validPostData,
          priority: 1,
        });
        expect(result.priority).toBe(1);
      });

      it('should reject non-integer values', () => {
        expect(() =>
          PostSchema.parse({
            ...validPostData,
            priority: 1.5,
          })
        ).toThrow();
      });
    });

    describe('date fields', () => {
      it('should set default dates for createdAt and updatedAt', () => {
        const result = PostSchema.parse(validPostData);

        expect(result.createdAt).toBeInstanceOf(Date);
        expect(result.updatedAt).toBeInstanceOf(Date);

        // Should be close to current time (within 1 second)
        const now = new Date();
        expect(
          Math.abs(result.createdAt.getTime() - now.getTime())
        ).toBeLessThan(1000);
        expect(
          Math.abs(result.updatedAt.getTime() - now.getTime())
        ).toBeLessThan(1000);
      });

      it('should accept custom date values', () => {
        const customDate = new Date('2025-01-01');
        const result = PostSchema.parse({
          ...validPostData,
          createdAt: customDate,
          updatedAt: customDate,
        });

        expect(result.createdAt).toEqual(customDate);
        expect(result.updatedAt).toEqual(customDate);
      });
    });

    describe('tags field', () => {
      it('should be optional', () => {
        const result = PostSchema.parse(validPostData);
        expect(result.tags).toBeUndefined();
      });

      it('should accept empty array', () => {
        const result = PostSchema.parse({
          ...validPostData,
          tags: [],
        });
        expect(result.tags).toEqual([]);
      });

      // Note: Full tag validation would require the TagSchema to be imported and tested
      // This is a basic test assuming tags is an array
    });
  });
});
