import type { JSX } from 'react';
import { source } from '@/lib/source';
import type { Project } from '@/models/project';
import { ProjectsList } from './projects-list';

/**
 * The Projects for the site.
 * @returns The Projects for the site.
 */
export function Projects(): JSX.Element {
  const projects: Project[] = source.getPages('projects').map((page) => ({
    slug: page.slugs.join('/'),
    title: page.data.title as string,
    description: page.data.description as string,
    date: (page.data as { date?: string }).date,
    url: page.url,
  }));

  return (
    <div className="-mx-3">
      <ProjectsList items={projects} />
    </div>
  );
}
