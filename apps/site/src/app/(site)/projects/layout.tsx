import { meta } from '@/constants/metadata';
import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import type { JSX, ReactNode } from 'react';

export const metadata: Metadata = createMetadata({
  ...meta,
  title: meta.projects.title,
});

type ProjectsLayoutProps = {
  readonly children: ReactNode;
};

export default function ProjectsLayout({
  children,
}: ProjectsLayoutProps): JSX.Element {
  return (
    <div className="flex flex-col">
      <h4 className="mb-4">Projects</h4>
      {children}
    </div>
  );
}
