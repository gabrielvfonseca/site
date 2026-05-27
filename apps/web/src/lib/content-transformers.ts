import { z } from 'zod';
import type { Post } from '@/models/post.model';
import type { Project } from '@/models/project.model';

/**
 * Transform a content page to a Post
 * Uses runtime validation with Zod schema
 */
export function transformPageToPost(page: unknown): Post {
  const postSchema = z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.string().optional(),
    author: z.string().optional(),
    url: z.string(),
  });

  const pageData = page as {
    slugs?: string[];
    data?: Record<string, unknown>;
    url?: string;
  };

  return postSchema.parse({
    slug: pageData.slugs?.join('/') || '',
    title: pageData.data?.title,
    description: pageData.data?.description,
    date: pageData.data?.date,
    author: pageData.data?.author,
    url: pageData.url || '',
  });
}

/**
 * Transform a content page to a Project
 * Uses runtime validation with Zod schema
 */
export function transformPageToProject(page: unknown): Project {
  const projectSchema = z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.string().optional(),
    link: z.string().url().optional(),
    url: z.string(),
  });

  const pageData = page as {
    slugs?: string[];
    data?: Record<string, unknown>;
    url?: string;
  };

  return projectSchema.parse({
    slug: pageData.slugs?.join('/') || '',
    title: pageData.data?.title,
    description: pageData.data?.description,
    date: pageData.data?.date,
    link: pageData.data?.link,
    url: pageData.url || '',
  });
}

/**
 * Extract date from page data safely
 * Returns ISO date string or undefined
 */
export function extractDate(
  pageData: Record<string, unknown>
): string | undefined {
  const date = pageData.date;
  if (typeof date === 'string') {
    return date;
  }
  return;
}
