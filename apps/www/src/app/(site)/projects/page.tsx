import type { JSX } from 'react';
import { ProjectsList } from '@/components/projects-list';
import { getCachedAllProjects } from '@/data-access/cache/project-cache';
import type { Project } from '@/types/projects';

/**
 * The Page for the site.
 * @returns The Page for the site.
 */
export default async function Page(): Promise<JSX.Element> {
  let projects: Project[] = [];

  try {
    projects = await getCachedAllProjects();
  } catch {
    // If database is not available, use empty array
    projects = [];
  }

  return (
    <section
      aria-labelledby="projects-list-heading"
      className="flex flex-col gap-4"
    >
      <h2 className="sr-only" id="projects-list-heading">
        List of Projects
      </h2>
      <div className="grid grid-cols-1 items-start md:grid-cols-12">
        <ProjectsList className="-mx-3 col-span-12" items={projects} />
      </div>
    </section>
  );
}
