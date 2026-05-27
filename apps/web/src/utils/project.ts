import { source } from '@/lib/source';

/**
 * Check if there are projects.
 * @returns True if there are projects, false otherwise.
 */
export const hasProjects = (): boolean => {
  const projects = source.getPages('projects');
  return projects.length > 0;
};

export const projects = {
  hasProjects,
};
