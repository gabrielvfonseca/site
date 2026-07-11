import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import type { JSX } from 'react';
import { Projects } from '@/components/projects';

/**
 * The metadata for the projects index page.
 * @returns The metadata for the projects index page.
 */
export const metadata: Metadata = createMetadata({
  title: 'Projects | Gabriel Fonseca',
  description:
    'Selected projects and case studies — the tools, products, and systems I have designed and built.',
});

/**
 * The projects index: a full listing of projects, styled to match the homepage
 * section rhythm.
 * @returns The projects index page for the site.
 */
export default function Page(): JSX.Element {
  return (
    <div className="flex flex-col gap-12">
      <section
        aria-labelledby="projects-index-heading"
        className="flex scroll-mt-8 flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-lg" id="projects-index-heading">
            Projects
          </h1>
          <p className="text-muted-foreground">
            Selected work and case studies — the tools, products, and systems I
            have designed and built.
          </p>
        </div>
        <Projects showAll />
      </section>
    </div>
  );
}
