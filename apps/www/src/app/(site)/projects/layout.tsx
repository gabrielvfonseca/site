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
    <div className="flex flex-col">
      <h4 className="mb-4">Projects</h4>
      {children}
    </div>
  );
}
