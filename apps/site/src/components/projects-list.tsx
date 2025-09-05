'use client'; // Ensure this is rendered in the client

import type { Project } from '@/types/projects';
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

export type ProjectsHoverListProps = {
  items: Project[];
} & Partial<ComponentPropsWithoutRef<typeof Link>>;

export function ProjectsList({
  items,
  className,
  ...props
}: ProjectsHoverListProps): JSX.Element {
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
            key={index}
            ref={(el) => {
              if (el) {
                featureRefs.current[index] = el;
              }
            }}
            target="_blank"
            className="group inline-block w-full rounded-lg px-3 py-3 text-left transition-colors duration-300"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            {...{ ...props, href: item.href }}
          >
            <div className="flex items-center gap-1">
              <div className="font-medium text-sm leading-5">{item.title}</div>
              <ArrowUpRightIcon className="size-3 text-tertiary transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </div>
            <div className="text-sm text-tertiary leading-5">
              {item.description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
