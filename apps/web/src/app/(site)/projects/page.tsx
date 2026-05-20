import { JsonLd, type WithContext } from '@gabfon/seo/json-ld';
import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import type { JSX } from 'react';
import { ProjectsList } from '@/components/projects-list';
import { meta } from '@/constants/metadata';
import { getProjects } from '@/lib/content-index';
import type { Project } from '@/models/project.model';
import { generatePersonStructuredData } from '@/utils/structured-data';

/**
 * The metadata for the site.
 * @returns The metadata for the site.
 */
export const metadata: Metadata = createMetadata({
  ...meta,
  title: meta.projects.title,
});

/**
 * The Page for the site.
 * @returns The Page for the site.
 */
export default function Page(): JSX.Element {
  const projectsList: Project[] = getProjects();
  const personStructuredData = generatePersonStructuredData();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="sr-only" id="projects-list-heading">
        List of Projects
      </h2>
      <div className="grid grid-cols-1 items-start md:grid-cols-12">
        <ProjectsList className="-mx-3 col-span-12" items={projectsList} />
      </div>
      <JsonLd
        code={personStructuredData as WithContext<Record<string, unknown>>}
      />
    </div>
  );
}
