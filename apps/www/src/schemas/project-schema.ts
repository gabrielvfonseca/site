import { z } from 'zod';
import { TagSchema } from './tag-schema';

// Enum
export const StatusEnum = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);
export type Status = z.infer<typeof StatusEnum>;

// Projects Schema
export const ProjectsSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().min(1),
  slug: z.string().min(1),
  githubUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  isFeatured: z.boolean().default(false),
  priority: z.number().int().nullable().optional(),
  tags: z.array(TagSchema).optional(), // Or z.array(z.string().uuid()) if you're just validating IDs
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});
