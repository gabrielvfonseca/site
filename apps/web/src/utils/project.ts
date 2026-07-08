import { getProjects } from '@/lib/content-index';

/**
 * Check if there are projects.
 * @returns True if there are projects, false otherwise.
 */
export const hasProjects = (): boolean => getProjects().length > 0;

export const projects = {
  hasProjects,
};
