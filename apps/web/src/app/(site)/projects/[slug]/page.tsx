import { LINK_EXTERNAL_CLASS } from '@gabfon/design-system/lib/constants';
import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { CONFIG } from '@/constants/config';
import { getProjectEntry, getProjects } from '@/lib/content-index';
import { formatDisplayDate } from '@/lib/format-date';

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

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="font-semibold text-2xl tracking-tight">
          {project.title}
        </h1>
        <p className="text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground/[var(--opacity-description)] text-xs uppercase tracking-wider">
          {project.date ? (
            <time dateTime={project.date}>
              {formatDisplayDate(project.date)}
            </time>
          ) : null}
          {project.link ? (
            <Link
              className={LINK_EXTERNAL_CLASS}
              href={project.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              Visit project ↗
            </Link>
          ) : null}
        </div>
      </header>
      <div className="prose max-w-none">
        <MdxContent />
      </div>
    </article>
  );
}
