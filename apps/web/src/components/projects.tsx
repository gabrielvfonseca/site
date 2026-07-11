import type { JSX } from 'react';
import { getProjects } from '@/lib/content-index';
import type { Project } from '@/models/project';
import { ProjectsList } from './projects-list';

/**
 * The ProjectsProps for the site.
 */
export interface ProjectsProps {
  /** When true, renders every project without the "Show more" button. */
  readonly showAll?: boolean;
}

/**
 * The Projects for the site.
 * @param props - The ProjectsProps.
 * @returns The Projects for the site.
 */
export function Projects({ showAll = false }: ProjectsProps = {}): JSX.Element {
  const projects: Project[] = getProjects();

  return (
    <div className="-mx-3">
      <ProjectsList
        initialCount={showAll ? projects.length : undefined}
        items={projects}
      />
    </div>
  );
}
