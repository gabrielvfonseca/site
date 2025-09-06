import { notFound } from 'next/navigation';
import type { JSX, ReactNode } from 'react';
import { getCachedPublishedPosts } from '@/data-access/cache/post-cache';
import type { Post } from '@/types/posts';

/**
 * The PostLayoutProps for the site.
 */
type PostLayoutProps = {
  /**
   * The children for the site.
   * @returns The children for the site.
   */
  readonly children: ReactNode;
  /**
   * The params for the site.
   * @returns The params for the site.
   */
  readonly params: Promise<{
    /**
     * The slug for the site.
     */
    slug: string;
  }>;
};

/**
 * The PostLayout for the site.
 * @param props - The PostLayoutProps.
 * @returns The PostLayout for the site.
 */
export default async function PostLayout({
  children,
  params,
}: PostLayoutProps): Promise<JSX.Element> {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const allPosts = await getCachedPublishedPosts();

  const post = allPosts.find((p: Post) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article
      aria-label="Blog post content"
      className="flex flex-col"
      id="post-article"
    >
      {children}
    </article>
  );
}
