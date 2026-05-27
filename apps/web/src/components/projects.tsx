import type { JSX } from 'react';
import { transformPageToProject } from '@/lib/content-transformers';
import { source } from '@/lib/source';
import type { Project } from '@/models/project.model';
import { ProjectsList } from './projects-list';

/**
 * The Projects for the site.
 * @returns The Projects for the site.
 */
export function Projects(): JSX.Element {
  const projects: Project[] = source
    .getPages('projects')
    .map(transformPageToProject);

  return (
    <div className="-mx-3">
      <ProjectsList items={projects} />
    </div>
  );
}
