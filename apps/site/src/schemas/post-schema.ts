import { z } from 'zod';
import { TagSchema } from './tag-schema';

// Enum
export const StatusEnum = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);

// Posts Schema
export const PostSchema = z.object({
  id: z.string().uuid(),
  status: StatusEnum.default('DRAFT'),
  title: z.string(),
  description: z.string(),
  slug: z.string(), // Add regex if you want slug format validation
  content: z.string(),
  isFeatured: z.boolean().default(false),
  readingTime: z.number().int().optional(),
  coverImageUrl: z.string().url().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  priority: z.number().int().optional(),
  tags: z.array(TagSchema).optional(), // Or z.array(z.string().uuid())
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});
