import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import type { JSX, ReactNode } from 'react';
import { meta } from '@/constants/metadata';

/**
 * The metadata for the site.
 * @returns The metadata for the site.
 */
export const metadata: Metadata = createMetadata({
  ...meta,
  title: meta.posts.title,
});

/**
 * The LayoutProps for the site.
 */
interface LayoutProps {
  /**
   * The children for the site.
   */
  readonly children: ReactNode;
}

/**
 * The Layout for the site.
 * @param props - The LayoutProps.
 * @returns The Layout for the site.
 */
export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <section
      aria-labelledby="posts-heading"
      className="flex flex-col"
      id="posts-section"
    >
      <h2 className="mb-4" id="posts-heading">
        Posts
      </h2>
      {children}
    </section>
  );
}
