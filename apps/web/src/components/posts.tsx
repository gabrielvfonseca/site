import type { JSX } from 'react';
import { getPosts } from '@/lib/content-index';
import type { Post } from '@/models/post';
import { PostsList } from './posts-list';

/**
 * The Posts for the site.
 * @returns The Posts for the site.
 */
export function Posts(): JSX.Element {
  const posts: Post[] = getPosts();

  return (
    <div className="-mx-3">
      <PostsList items={posts} />
    </div>
  );
}
