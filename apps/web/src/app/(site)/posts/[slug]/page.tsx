import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { ArticleFooter } from '@/components/content/article-footer';
import { BackLink } from '@/components/content/back-link';
import { BackToTop } from '@/components/content/back-to-top';
import { ReadingProgress } from '@/components/content/reading-progress';
import { TableOfContents } from '@/components/content/table-of-contents';
import { CONFIG } from '@/constants/config';
import { getPostEntry, getPosts } from '@/lib/content-index';
import { formatDisplayDate } from '@/lib/format-date';
import { getReadingTime } from '@/lib/reading-time';
import { getToc } from '@/lib/toc';
import { useMDXComponents } from '@/mdx-components';

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
  const readingTime = getReadingTime('posts', entry._file.path);
  const toc = getToc('posts', entry._file.path);

  return (
    <article className="relative flex flex-col gap-8">
      <ReadingProgress />
      <BackToTop />
      {toc.length >= 2 ? (
        <aside className="absolute top-0 left-full hidden h-full pl-10 xl:block">
          <div className="sticky top-28 w-56">
            <TableOfContents entries={toc} />
          </div>
        </aside>
      ) : null}
      <header className="flex flex-col gap-4">
        <BackLink href="/posts" label="Writing" />
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-lg">{post.title}</h1>
          <p className="text-muted-foreground text-sm">
            {post.date ? (
              <time dateTime={post.date}>{formatDisplayDate(post.date)}</time>
            ) : null}
            {post.date ? ' · ' : null}
            {readingTime} min read
          </p>
        </div>
        <p className="text-muted-foreground">{post.description}</p>
      </header>
      <div className="prose max-w-none">
        <MdxContent components={useMDXComponents({})} />
      </div>
      <ArticleFooter backHref="/posts" backLabel="All writing" />
    </article>
  );
}
