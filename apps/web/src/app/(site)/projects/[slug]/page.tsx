import { LINK_EXTERNAL_CLASS } from '@gabfon/design-system/lib/constants';
import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { ArticleFooter } from '@/components/content/article-footer';
import { BackLink } from '@/components/content/back-link';
import { CONFIG } from '@/constants/config';
import { getProjectEntry, getProjects } from '@/lib/content-index';
import { formatDisplayDate } from '@/lib/format-date';
import { getReadingTime } from '@/lib/reading-time';
import { useMDXComponents } from '@/mdx-components';

/**
 * The ProjectPageProps for the site.
 */
interface ProjectPageProps {
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
 * @param props - The ProjectPageProps.
 * @returns The generateMetadata for the site.
 */
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const projects = getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return createMetadata({
    title: `${project.title} | Gabriel Fonseca`,
    description: project.description,
    authors: [
      {
        name: CONFIG.name,
        url: 'https://gabfon.com/',
      },
    ],
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      publishedTime: project.date,
      section: 'Projects',
    },
  });
}

/**
 * The ProjectPage for the site.
 * @param props - The ProjectPageProps.
 * @returns The ProjectPage for the site.
 */
export default async function ProjectPage({
  params,
}: ProjectPageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const project = getProjects().find((p) => p.slug === slug);
  const entry = getProjectEntry(slug);

  if (!project || !entry) {
    notFound();
  }

  const MdxContent = entry.body;
  const readingTime = getReadingTime('projects', entry._file.path);

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <BackLink href="/projects" label="Projects" />
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-lg">{project.title}</h1>
          <p className="text-muted-foreground text-sm">
            {project.date ? (
              <time dateTime={project.date}>
                {formatDisplayDate(project.date)}
              </time>
            ) : null}
            {project.date ? ' · ' : null}
            {readingTime} min read
          </p>
        </div>
        <p className="text-muted-foreground">{project.description}</p>
        {project.link ? (
          <Link
            className={`${LINK_EXTERNAL_CLASS} w-fit text-sm`}
            href={project.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            Visit project
          </Link>
        ) : null}
      </header>
      <div className="prose max-w-none">
        <MdxContent components={useMDXComponents({})} />
      </div>
      <ArticleFooter backHref="/projects" backLabel="All projects" />
    </article>
  );
}
