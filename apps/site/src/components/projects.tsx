import { getCachedAllProjects } from '@/data-access/cache/project-cache';
import type { Project } from '@/types/projects';
import type { JSX } from 'react';
import { ProjectsList } from './projects-list';

export async function Projects(): Promise<JSX.Element> {
  const projects: Project[] = await getCachedAllProjects();

  return <ProjectsList items={projects} />;
}
