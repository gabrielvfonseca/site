import { z } from 'zod';

export const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string().optional(),
  author: z.string().optional(),
  slug: z.string().optional(),
  link: z.string().url().optional(),
});

export type Post = z.infer<typeof postSchema>;
