import { source } from '@/lib/source';

/**
 * Check if there are published posts.
 * @returns True if there are published posts, false otherwise.
 */
export const hasPublishedPosts = (): boolean => {
  const posts = source.getPages('posts');
  return posts.length > 0;
};

export const posts = {
  hasPublishedPosts,
};
