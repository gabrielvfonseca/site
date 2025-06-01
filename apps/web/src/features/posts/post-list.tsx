import type { Posts } from '@/constants/posts';
import type { Blog, WithContext } from '@repo/seo/json-ld';
import { JsonLd } from '@repo/seo/json-ld';
import { PostHoverList } from './post-hover-list';

type PostListProps = {
  readonly items: Posts;
};

export async function PostList({ items }: PostListProps) {
  const jsonLd: WithContext<Blog> = {
    '@type': 'Blog',
    '@context': 'https://schema.org',
  };

  // Sort items by date in descending order
  const sortedItems = items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <JsonLd code={jsonLd} />
      <div className="grid grid-cols-1 items-start md:grid-cols-12">
        <PostHoverList
          items={sortedItems.map((post) => ({
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
