import { type Blog, JsonLd, type WithContext } from '@gabfon/seo/json-ld';
import type { JSX } from 'react';
import { PostsList } from '@/components/posts-list';
import { getCachedPublishedPosts } from '@/data-access/cache/post-cache';
import type { Post } from '@/types/posts';

/**
 * The Page for the site.
 * @returns The Page for the site.
 */
export default async function Page(): Promise<JSX.Element> {
  const allPosts: Post[] = await getCachedPublishedPosts();

  const jsonLd: WithContext<Blog> = {
    '@type': 'Blog',
    '@context': 'https://schema.org',
  };

  // Sort items by date in descending order
  const sortedPosts: Post[] = allPosts.sort(
    (a: Post, b: Post) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
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
    </>
  );
}
