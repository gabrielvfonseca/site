'use client'; // Ensure this is rendered in the client

import { cn } from '@gabfon/design-system/lib/utils';
import Link from 'next/link';
import {
  type ComponentPropsWithoutRef,
  type JSX,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { Post } from '@/types/posts';

/**
 * The PostsListProps for the site.
 * @returns The PostsListProps for the site.
 */
export interface PostsListProps
  extends Partial<ComponentPropsWithoutRef<typeof Link>> {
  items: Post[];
}

/**
 * The PostsList for the site.
 * @param props - The PostsListProps.
 * @returns The PostsList for the site.
 */
export function PostsList({
  items,
  className,
  ...props
}: PostsListProps): JSX.Element {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activePillStyle, setActivePillStyle] = useState({});
  const featureRefs = useRef<(HTMLAnchorElement | null)[]>([]);

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
        className="absolute rounded-lg border border-accent-2 bg-accent transition-all duration-300 ease-out"
        style={{
          ...activePillStyle,
          opacity: hoveredIndex !== null ? 1 : 0,
        }}
      />
      <div className="relative flex w-full flex-col flex-col items-start gap-2">
        {items.map((item, index: number) => (
          <Link
            className="inline-block w-full rounded-lg px-3 py-3 text-left transition-colors duration-300"
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            ref={(el) => {
              if (el) {
                featureRefs.current[index] = el;
              }
            }}
            {...{ ...props, href: `/posts/${item.slug}` }}
          >
            <div className="font-medium text-sm leading-5">{item.title}</div>
            <div className="text-sm text-tertiary leading-5">
              {item.description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
