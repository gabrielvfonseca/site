import type { JSX } from 'react';
import { source } from '@/lib/source';
import type { Post } from '@/models/post.model';
import { PostsList } from './posts-list';

/**
 * The Posts for the site.
 * @returns The Posts for the site.
 */
export function Posts(): JSX.Element {
  const posts: Post[] = source.getPages('posts').map((page) => ({
    slug: page.slugs.join('/'),
    title: page.data.title as string,
    description: page.data.description as string,
    date: (page.data as { date?: string }).date,
    url: page.url,
  }));

  return (
    <div className="-mx-3">
      <PostsList items={posts} />
    </div>
  );
}
