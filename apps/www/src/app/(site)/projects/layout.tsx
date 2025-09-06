import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import type { JSX, ReactNode } from 'react';
import { meta } from '@/constants/metadata';

/**
 * The metadata for the site.
 * @returns The metadata for the site.
 */
export const metadata: Metadata = createMetadata({
  ...meta,
  title: meta.projects.title,
});

/**
 * The ProjectsLayoutProps for the site.
 */
type ProjectsLayoutProps = {
  /**
   * The children for the site.
   * @returns The children for the site.
   */
  readonly children: ReactNode;
};

/**
 * The ProjectsLayout for the site.
 * @param props - The ProjectsLayoutProps.
 * @returns The ProjectsLayout for the site.
 */
export default function ProjectsLayout({
  children,
}: ProjectsLayoutProps): JSX.Element {
  return (
    <section
      aria-labelledby="projects-heading"
      className="flex flex-col"
      id="projects-section"
    >
      <h2 className="mb-4" id="projects-heading">
        Projects
      </h2>
      {children}
    </section>
  );
}
