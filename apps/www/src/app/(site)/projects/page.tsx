import type { JSX } from 'react';
import { ProjectsList } from '@/components/projects-list';
import { getCachedAllProjects } from '@/data-access/cache/project-cache';
import type { Project } from '@/types/projects';

/**
 * The Page for the site.
 * @returns The Page for the site.
 */
export default async function Page(): Promise<JSX.Element> {
  const projects: Project[] = await getCachedAllProjects();

  return (
    <section className="flex flex-col gap-4">
      <div className="grid grid-cols-1 items-start md:grid-cols-12">
        <ProjectsList className="-mx-3 col-span-12" items={projects} />
      </div>
    </section>
  );
}
