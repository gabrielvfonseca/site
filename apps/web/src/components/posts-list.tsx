'use client';

import type { JSX } from 'react';
import type { Post } from '@/models/post.model';
import { ListRenderer, type ListRendererProps } from './list-renderer';

export type PostsListProps = Omit<ListRendererProps<Post>, 'renderItem'>;

export function PostsList({ items, ...props }: PostsListProps): JSX.Element {
  return (
    <ListRenderer<Post>
      className="inline-block w-full rounded-lg px-3 py-3 text-left transition-colors duration-300"
      getHref={(item) => `/posts/${item.slug}`}
      items={items}
      renderItem={(item) => (
        <>
          <div className="font-medium text-sm leading-5">{item.title}</div>
          <div className="text-muted-foreground text-sm leading-5">
            {item.description}
          </div>
        </>
      )}
      {...props}
    />
  );
}
