'use client'; // Ensure this is rendered in the client

import { cn } from '@gabfon/design-system/lib/utils';
import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';
import {
  type ComponentPropsWithoutRef,
  type JSX,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useIncremental } from '@/hooks/use-incremental';
import type { Project } from '@/models/project';
import { ShowMoreButton } from './show-more-button';

/**
 * The ProjectsHoverListProps for the site.
 * @returns The ProjectsHoverListProps for the site.
 */
export interface ProjectsHoverListProps
  extends Partial<ComponentPropsWithoutRef<typeof Link>> {
  items: Project[];
  /** Items shown before "Show more" is used (default 4). */
  initialCount?: number;
  /** Items revealed per "Show more" click (default 4). */
  batchSize?: number;
}

/**
 * The ProjectsList for the site.
 * @param props - The ProjectsHoverListProps.
 * @returns The ProjectsList for the site.
 */
export function ProjectsList({
  items,
  className,
  initialCount = 4,
  batchSize = 4,
  ...props
}: ProjectsHoverListProps): JSX.Element {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activePillStyle, setActivePillStyle] = useState({});
  const featureRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const { visible, canLoadMore, remaining, showMore } = useIncremental(
    items.length,
    initialCount,
    batchSize
  );
  const visibleItems = items.slice(0, visible);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = featureRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetTop, offsetHeight, offsetWidth, offsetLeft } =
          hoveredElement;
        setActivePillStyle({
          top: `${offsetTop}px`,
          left: `${offsetLeft}px`,
          height: `${offsetHeight}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [hoveredIndex]);

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-start gap-2',
        className
      )}
    >
      <div
        className="absolute rounded-md border border-border bg-accent transition-all duration-300 ease-out motion-reduce:transition-none"
        style={{
          ...activePillStyle,
          opacity: hoveredIndex !== null ? 1 : 0,
        }}
      />
      <div className="relative flex w-full flex-col items-start gap-2">
        {items.length === 0 ? (
          <p className="px-3 py-3 text-muted-foreground text-sm leading-5">
            No projects to show yet. Check back soon.
          </p>
        ) : (
          visibleItems.map((item, index: number) => {
            const external = Boolean(item.link);
            const href = external
              ? (item.link as string)
              : `/projects/${item.slug}`;

            return (
              <Link
                className="group inline-block w-full rounded-md px-3 py-3 text-left transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                ref={(element: HTMLAnchorElement | null) => {
                  if (element) {
                    featureRefs.current[index] = element;
                  }
                }}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                {...props}
                href={href}
              >
                <div className="flex items-center gap-1">
                  <div className="font-medium text-sm leading-5">
                    {item.title}
                  </div>
                  {external && (
                    <ArrowUpRightIcon className="size-3 text-muted-foreground transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 motion-reduce:transition-none" />
                  )}
                </div>
                <div className="text-muted-foreground text-sm leading-5">
                  {item.description}
                </div>
              </Link>
            );
          })
        )}
      </div>
      {canLoadMore && (
        <ShowMoreButton
          label="projects"
          onShowMore={showMore}
          remaining={remaining}
        />
      )}
    </div>
  );
}
