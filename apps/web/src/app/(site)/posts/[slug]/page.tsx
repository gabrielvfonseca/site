import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { CONFIG } from '@/constants/config';
import { getPostEntry, getPosts } from '@/lib/content-index';
import { formatDisplayDate } from '@/lib/format-date';

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
  const post = getPosts().find((p) => p.slug === slug);
  const entry = getPostEntry(slug);

  if (!post || !entry) {
    notFound();
  }

  const MdxContent = entry.body;

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="font-semibold text-2xl tracking-tight">{post.title}</h1>
        <p className="text-muted-foreground">{post.description}</p>
        {post.date ? (
          <time
            className="text-muted-foreground/[var(--opacity-description)] text-xs uppercase tracking-wider"
            dateTime={post.date}
          >
            {formatDisplayDate(post.date)}
          </time>
        ) : null}
      </header>
      <div className="prose max-w-none">
        <MdxContent />
      </div>
    </article>
  );
}
