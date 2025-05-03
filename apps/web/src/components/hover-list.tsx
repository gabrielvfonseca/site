'use client';

import { cn } from '@repo/design-system/lib/utils';
import Link from 'next/link';
import {
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from 'react';

export type Item = {
  title: string;
  description: string;
  href: string;
};

export interface HoverListProps
  extends Partial<ComponentPropsWithoutRef<typeof Link>> {
  items: Item[];
}

export function HoverList({ items, className, ...props }: HoverListProps) {
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
        className="absolute rounded-[10px] bg-[#0e0f1114] transition-all duration-300 ease-out dark:bg-[#ffffff14]"
        style={{
          ...activePillStyle,
          opacity: hoveredIndex !== null ? 1 : 0,
        }}
      />
      <div className="relative flex w-full flex-col items-start space-y-2">
        {items.map((item, index: number) => (
          <Link
            key={index}
            ref={(el) => {
              if (el) {
                featureRefs.current[index] = el;
              }
            }}
            className="inline-block w-full rounded-[10px] px-3 py-3 text-left transition-colors duration-300"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            {...{ ...props, href: item.href }}
          >
            <div className="font-medium text-[#0e0e10] text-sm leading-5 dark:text-white">
              {item.title}
            </div>
            <div className="text-[#0e0f1199] text-sm leading-5 dark:text-[#ffffff99]">
              {item.description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
