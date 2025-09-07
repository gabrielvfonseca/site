import { z } from 'zod';
import { TagSchema } from './tag-schema.js';

// Enum
export const StatusEnum = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);
export type Status = z.infer<typeof StatusEnum>;

// Projects Schema
export const ProjectsSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().min(1),
  slug: z.string().min(1),
  githubUrl: z
    .string()
    .min(1)
    .url()
    .refine((url) => url.startsWith('http://') || url.startsWith('https://'), {
      message: 'URL must start with http:// or https://',
    })
    .optional(),
  demoUrl: z
    .string()
    .min(1)
    .url()
    .refine((url) => url.startsWith('http://') || url.startsWith('https://'), {
      message: 'URL must start with http:// or https://',
    })
    .optional(),
  imageUrl: z
    .string()
    .min(1)
    .url()
    .refine((url) => url.startsWith('http://') || url.startsWith('https://'), {
      message: 'URL must start with http:// or https://',
    })
    .optional(),
  isFeatured: z.boolean().default(false),
  priority: z.number().int().nullable().optional(),
  tags: z.array(TagSchema).optional(), // Or z.array(z.string().uuid()) if you're just validating IDs
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});
