import { meta } from '@/constants/metadata';
import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import type { JSX } from 'react';

export const metadata: Metadata = createMetadata({
  ...meta,
  title: meta.posts.title,
});

type LayoutProps = {
  readonly children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="flex min-h-[500px] flex-col">
      <h4 className="mb-4">Posts</h4>
      {children}
    </div>
  );
}
