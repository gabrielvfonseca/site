import { HoverList } from '@/components/hover-list';
import { blog } from '@repo/cms';
import { Feed } from '@repo/cms/components/feed';
import type { Blog, WithContext } from '@repo/seo/json-ld';
import { JsonLd } from '@repo/seo/json-ld';

export async function PostList() {
  const jsonLd: WithContext<Blog> = {
    '@type': 'Blog',
    '@context': 'https://schema.org',
  };

  return (
    <>
      <JsonLd code={jsonLd} />
      <div className="grid grid-cols-1 items-start md:grid-cols-12">
        <Feed queries={[blog.postsQuery]}>
          {async ([data]) => {
            'use server';

            if (!data.blog.posts.items.length) {
              return null;
            }

            return (
              <HoverList
                items={data.blog.posts.items.map((post) => ({
                  title: post._title,
                  description: post.date,
                  href: `/blog/${post._slug}`,
                }))}
                className="-mx-3 col-span-12"
              />
            );
          }}
        </Feed>
      </div>
    </>
  );
}
