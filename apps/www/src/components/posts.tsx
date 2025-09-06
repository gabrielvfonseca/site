import type { JSX } from 'react';
import { getCachedPublishedPosts } from '@/data-access/cache/post-cache';
import type { Post } from '@/types/posts';
import { PostsList } from './posts-list';

/**
 * The Posts for the site.
 * @returns The Posts for the site.
 */
export async function Posts(): Promise<JSX.Element> {
  const posts: Post[] = await getCachedPublishedPosts();

  return <PostsList items={posts} />;
}
