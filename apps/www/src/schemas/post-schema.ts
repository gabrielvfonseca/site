import { z } from 'zod';
import { TagSchema } from './tag-schema.js';

// Enum
export const StatusEnum = z
  .enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
  .default('DRAFT');

// Posts Schema
export const PostSchema = z.object({
  id: z.string().uuid(),
  status: StatusEnum,
  title: z.string().min(1),
  description: z.string().min(1),
  slug: z.string().min(1), // Add regex if you want slug format validation
  content: z.string().min(1),
  isFeatured: z.boolean().default(false),
  readingTime: z.number().int().min(0).nullable().optional(),
  coverImageUrl: z
    .string()
    .min(1)
    .url()
    .refine((url) => url.startsWith('http://') || url.startsWith('https://'), {
      message: 'URL must start with http:// or https://',
    })
    .nullable()
    .optional(),
  metaTitle: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  priority: z.number().int().nullable().optional(),
  tags: z.array(TagSchema).optional(), // Or z.array(z.string().uuid())
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});
