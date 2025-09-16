import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { getCachedPublishedPosts } from '@/data-access/cache/post-cache';
import type { Post } from '@/types/posts';

/**
 * The PostPageProps for the site.
 */
interface PostPageProps {
  /**
   * The params for the site.
   */
  readonly params: Promise<{
    /**
     * The slug for the site.
     */
    slug: string;
  }>;
}

/**
 * The getPost for the site.
 * @param slug - The slug for the site.
 * @returns The getPost for the site.
 */
const getPost = async (slug: string): Promise<Post | undefined> => {
  try {
    const allPosts = await getCachedPublishedPosts();
    return allPosts.find((post: Post) => post.slug === slug);
  } catch {
    // If database is not available, return undefined
    return;
  }
};

/**
 * The generateMetadata for the site.
 * @param props - The PostPageProps.
 * @returns The generateMetadata for the site.
 */
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return createMetadata({
    title: `${post.title} | Gabriel Fonseca`,
    description:
      'Gabriel Fonseca is a computer engineering student living in Lisbon, pt.',
  });
}

/**
 * The PostPage for the site.
 * @param props - The PostPageProps.
 * @returns The PostPage for the site.
 */
export default async function PostPage({
  params,
}: PostPageProps): Promise<JSX.Element> {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="prose prose-lg max-w-none">
      <h1>{post.title}</h1>
      <div className="whitespace-pre-wrap">{post.content}</div>
    </div>
  );
}
