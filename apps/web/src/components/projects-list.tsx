'use client';

import { ArrowUpRightIcon } from 'lucide-react';
import type { JSX } from 'react';
import type { Project } from '@/models/project.model';
import { ListRenderer, type ListRendererProps } from './list-renderer';

export type ProjectsListProps = Omit<ListRendererProps<Project>, 'renderItem'>;

export function ProjectsList({
  items,
  ...props
}: ProjectsListProps): JSX.Element {
  return (
    <ListRenderer<Project>
      className="group inline-block w-full rounded-lg px-3 py-3 text-left transition-colors duration-300"
      getHref={(item) => item.slug}
      items={items}
      renderItem={(item) => (
        <>
          <div className="flex items-center gap-1">
            <div className="font-medium text-sm leading-5">{item.title}</div>
            <ArrowUpRightIcon className="size-3 text-muted-foreground transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </div>
          <div className="text-muted-foreground text-sm leading-5">
            {item.description}
          </div>
        </>
      )}
      target="_blank"
      {...props}
    />
  );
}
