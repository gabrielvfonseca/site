import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string().optional(),
  link: z.url().optional(),
  slug: z.string(),
});

export type Project = z.infer<typeof projectSchema>;
