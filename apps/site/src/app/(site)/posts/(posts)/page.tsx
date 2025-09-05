import { PostsList } from '@/components/posts-list';
import { getCachedPublishedPosts } from '@/data-access/cache/post-cache';
import type { Post } from '@/types/posts';
import { type Blog, JsonLd, type WithContext } from '@gabfon/seo/json-ld';
import type { JSX } from 'react';

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
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-1 items-start md:grid-cols-12">
          <PostsList items={sortedPosts} className="-mx-3 col-span-12" />
        </div>
      </section>
      <JsonLd code={jsonLd} />
    </>
  );
}
