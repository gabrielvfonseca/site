import { getCachedAllProjects } from '@/data-access/cache/project-cache';
import type { Project } from '@/types/projects';

/**
 * Check if there are projects.
 * @returns True if there are projects, false otherwise.
 */
export const hasProjects = async (): Promise<boolean> => {
  // Get the published posts
  const projects: Project[] = await getCachedAllProjects();

  // Return true if there are published posts, false otherwise
  return projects.length > 0;
};
