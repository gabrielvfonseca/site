import { createMetadata } from '@repo/seo/metadata';
import { createViewport } from '@repo/seo/viewport';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

export const viewport: Viewport = createViewport();
export const metadata: Metadata = createMetadata({
  title: 'Posts | Gabriel Fonseca',
  description:
    'Gabriel Fonseca is a computer engineering student living in Lisbon, pt.',
});

type LayoutProps = {
  readonly children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-[500px] flex-col">
      <h4 className="mb-4">Posts</h4>
      {children}
    </div>
  );
}
