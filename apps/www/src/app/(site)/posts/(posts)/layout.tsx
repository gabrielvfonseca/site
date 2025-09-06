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
type LayoutProps = {
  /**
   * The children for the site.
   * @returns The children for the site.
   */
  readonly children: ReactNode;
};

/**
 * The Layout for the site.
 * @param props - The LayoutProps.
 * @returns The Layout for the site.
 */
export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="flex min-h-[500px] flex-col">
      <h4 className="mb-4">Posts</h4>
      {children}
    </div>
  );
}
