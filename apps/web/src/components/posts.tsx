import type { JSX } from 'react';
import { transformPageToPost } from '@/lib/content-transformers';
import { source } from '@/lib/source';
import type { Post } from '@/models/post.model';
import { PostsList } from './posts-list';

/**
 * The Posts for the site.
 * @returns The Posts for the site.
 */
export function Posts(): JSX.Element {
  const posts: Post[] = source.getPages('posts').map(transformPageToPost);

  return (
    <div className="-mx-3">
      <PostsList items={posts} />
    </div>
  );
}
