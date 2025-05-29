import { HoverList } from '@/components/hover-list';
import { posts } from '@/constants/posts';
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
        <HoverList
          items={posts
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((post) => ({
              title: post.title,
              description: post.description,
              href: `posts/${post.slug}`,
            }))}
          className="-mx-3 col-span-12"
        />
      </div>
    </>
  );
}
