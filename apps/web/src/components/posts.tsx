import type { JSX } from 'react';
import { getPosts } from '@/lib/content-index';
import type { Post } from '@/models/post';
import { PostsList } from './posts-list';

/**
 * The PostsProps for the site.
 */
export interface PostsProps {
  /** When true, renders every post without the "Show more" button. */
  readonly showAll?: boolean;
}

/**
 * The Posts for the site.
 * @param props - The PostsProps.
 * @returns The Posts for the site.
 */
export function Posts({ showAll = false }: PostsProps = {}): JSX.Element {
  const posts: Post[] = getPosts();

  return (
    <div className="-mx-3">
      <PostsList
        initialCount={showAll ? posts.length : undefined}
        items={posts}
      />
    </div>
  );
}
