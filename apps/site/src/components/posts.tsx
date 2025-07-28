import { getCachedPublishedPosts } from '@/data-access/cache/post-cache';
import type { Post } from '@/types/posts';
import type { JSX } from 'react';
import { PostsList } from './posts-list';

export async function Posts(): Promise<JSX.Element> {
  const posts: Post[] = await getCachedPublishedPosts();

  return <PostsList items={posts} />;
}
