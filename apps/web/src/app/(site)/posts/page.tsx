import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import type { JSX } from 'react';
import { Posts } from '@/components/posts';

/**
 * The metadata for the writing index page.
 * @returns The metadata for the writing index page.
 */
export const metadata: Metadata = createMetadata({
  title: 'Writing',
  description:
    'Posts on building products, engineering, systems, and startups — written in public as I go.',
  pathname: '/posts',
});

/**
 * The writing index: a full listing of published posts, styled to match the
 * homepage section rhythm.
 * @returns The writing index page for the site.
 */
export default function Page(): JSX.Element {
  return (
    <div className="flex flex-col gap-12">
      <section
        aria-labelledby="posts-index-heading"
        className="flex scroll-mt-8 flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-lg" id="posts-index-heading">
            Writing
          </h1>
          <p className="text-muted-foreground">
            Notes on building products, engineering, and startups — written in
            public as I go.
          </p>
        </div>
        <Posts showAll />
      </section>
    </div>
  );
}
