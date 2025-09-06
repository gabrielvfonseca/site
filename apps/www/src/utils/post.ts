import { getCachedPublishedPosts } from '@/data-access/cache/post-cache';
import type { Post } from '@/types/posts';

/**
 * Check if there are published posts.
 * @returns True if there are published posts, false otherwise.
 */
export const hasPublishedPosts = async (): Promise<boolean> => {
  // Get the published posts
  const publishedPosts: Post[] = await getCachedPublishedPosts();

  // Return true if there are published posts, false otherwise
  return publishedPosts.length > 0;
};
