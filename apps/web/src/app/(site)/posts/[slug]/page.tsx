import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { CONFIG } from '@/constants/config';
import { getPosts } from '@/lib/content-index';

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
 * The generateMetadata for the site.
 * @param props - The PostPageProps.
 * @returns The generateMetadata for the site.
 */
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = getPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return createMetadata({
    title: `${post.title} | Gabriel Fonseca`,
    description: post.description,
    authors: [
      {
        name: CONFIG.name,
        url: 'https://gabfon.com/',
      },
    ],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      section: 'Blog',
    },
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
  const posts = getPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // For now, we'll show a simple page with post metadata
  // In a real implementation, you'd load the actual MDX content here
  return (
    <article className="max-w-none">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1>{post.title}</h1>
        <p className="text-muted-foreground">{post.description}</p>
        <time dateTime={post.date}>{post.date}</time>
        <div className="mt-8">
          <p>
            Post content will be loaded here. This is a placeholder for the
            actual MDX content.
          </p>
        </div>
      </div>
    </article>
  );
}
