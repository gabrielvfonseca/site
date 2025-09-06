import { z } from 'zod';

// Tag Schema
export const TagSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  // You can populate these separately as arrays of nested objects or just IDs
  posts: z.array(z.any()).optional(), // Replace z.any() with PostsSchema if needed
  projects: z.array(z.any()).optional(), // Replace z.any() with ProjectsSchema if needed
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});
