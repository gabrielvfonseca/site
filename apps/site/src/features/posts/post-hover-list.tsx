'use client';

import { cn } from '@repo/design-system/lib/utils';
import Link from 'next/link';
import {
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from 'react';

export type PostItem = {
  title: string;
  description: string;
  href: string;
};

export interface PostHoverListProps
  extends Partial<ComponentPropsWithoutRef<typeof Link>> {
  items: PostItem[];
}

export function PostHoverList({
  items,
  className,
  ...props
}: PostHoverListProps) {
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
            className="inline-block w-full rounded-lg px-3 py-3 text-left transition-colors duration-300"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            {...{ ...props, href: item.href }}
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
