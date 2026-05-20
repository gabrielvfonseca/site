import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string().optional(),
  link: z.string().url().optional(),
  slug: z.string().optional(),
});

export type Project = z.infer<typeof projectSchema>;
