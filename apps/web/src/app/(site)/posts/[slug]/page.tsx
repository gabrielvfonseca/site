import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { source } from '@/lib/source';

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
  const page = source.getPage([slug], 'posts');

  if (!page) {
    notFound();
  }

  return createMetadata({
    title: `${page.data.title} | Gabriel Fonseca`,
    description: page.data.description,
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
  const page = source.getPage([slug], 'posts');

  if (!page) {
    notFound();
  }

  const { body: Content } = page.data;

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <Content />
    </article>
  );
}
