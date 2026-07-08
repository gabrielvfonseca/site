import { getPosts } from '@/lib/content-index';

/**
 * Check if there are published posts.
 * @returns True if there are published posts, false otherwise.
 */
export const hasPublishedPosts = (): boolean => getPosts().length > 0;

export const posts = {
  hasPublishedPosts,
};
