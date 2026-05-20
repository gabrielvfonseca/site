import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { CONFIG } from '@/constants/config';
import { getProjects } from '@/lib/content-index';

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
  const projects = getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // For now, we'll show a simple page with project metadata
  // In a real implementation, you'd load the actual MDX content here
  return (
    <article className="max-w-none">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1>{project.title}</h1>
        <p className="text-muted-foreground">{project.description}</p>
        <time dateTime={project.date}>{project.date}</time>
        <div className="mt-8">
          <p>
            Project content will be loaded here. This is a placeholder for the
            actual MDX content.
          </p>
        </div>
      </div>
    </article>
  );
}
