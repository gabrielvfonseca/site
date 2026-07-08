import type { JSX } from 'react';
import { getProjects } from '@/lib/content-index';
import type { Project } from '@/models/project';
import { ProjectsList } from './projects-list';

/**
 * The Projects for the site.
 * @returns The Projects for the site.
 */
export function Projects(): JSX.Element {
  const projects: Project[] = getProjects();

  return (
    <div className="-mx-3">
      <ProjectsList items={projects} />
    </div>
  );
}
