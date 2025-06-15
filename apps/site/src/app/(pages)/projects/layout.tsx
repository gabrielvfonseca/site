import { createMetadata } from '@repo/seo/metadata';
import { createViewport } from '@repo/seo/viewport';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

export const viewport: Viewport = createViewport();
export const metadata: Metadata = createMetadata({
  title: 'Projects | Gabriel Fonseca',
  description:
    'Gabriel Fonseca is a computer engineering student living in Lisbon, pt.',
});

type LayoutProps = {
  readonly children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col">
      <h4 className="mb-4">Projects</h4>
      {children}
    </div>
  );
}
