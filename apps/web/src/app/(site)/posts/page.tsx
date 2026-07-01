import { type Blog, JsonLd, type WithContext } from '@gabfon/seo/json-ld';
import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import type { JSX } from 'react';
import { PostsList } from '@/components/posts-list';
import { meta } from '@/constants/metadata';
import { getPosts } from '@/lib/content-index';
import type { Post } from '@/models/post';

/**
 * The metadata for the site.
 * @returns The metadata for the site.
 */
export const metadata: Metadata = createMetadata({
  ...meta,
  title: meta.posts.title,
});

/**
 * The Page for the site.
 * @returns The Page for the site.
 */
export default function Page(): JSX.Element {
  const allPosts: Post[] = getPosts();

  const jsonLd: WithContext<Blog> = {
    '@type': 'Blog',
    '@context': 'https://schema.org',
  };

  // Sort items by date in descending order
  const sortedPosts: Post[] = allPosts.sort(
    (a: Post, b: Post) =>
      new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
  );

  return (
    <div className="flex flex-col" id="posts-section">
      <h2 className="mb-4" id="posts-heading">
        Posts
      </h2>
      <section
        aria-labelledby="posts-list-heading"
        className="flex flex-col gap-4"
        id="posts-list-section"
      >
        <h2 className="sr-only" id="posts-list-heading">
          Blog Posts
        </h2>
        <div className="grid grid-cols-1 items-start md:grid-cols-12">
          <PostsList
            aria-label="List of published blog posts"
            className="-mx-3 col-span-12"
            items={sortedPosts}
          />
        </div>
      </section>
      <JsonLd code={jsonLd} />
    </div>
  );
}
