import type { JSX } from 'react';
import { getCachedAllProjects } from '@/data-access/cache/project-cache';
import type { Project } from '@/types/projects';
import { ProjectsList } from './projects-list';

/**
 * The Projects for the site.
 * @returns The Projects for the site.
 */
export async function Projects(): Promise<JSX.Element> {
  const projects: Project[] = await getCachedAllProjects();

  return (
    <div className="-mx-3">
      <ProjectsList items={projects} />
    </div>
  );
}
