'use client';

import { cn } from '@gabfon/design-system/lib/utils';
import Link from 'next/link';
import React, {
  type ComponentPropsWithoutRef,
  type JSX,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

/**
 * Base interface for list items that can be rendered.
 */
export interface ListItem {
  slug: string;
  title: string;
  description?: string;
}

/**
 * Props for the ListRenderer component.
 */
export interface ListRendererProps<T extends ListItem>
  extends Partial<ComponentPropsWithoutRef<typeof Link>> {
  items: T[];
  renderItem: (item: T, index: number, isHovered: boolean) => JSX.Element;
  getHref?: (item: T) => string;
  className?: string;
  containerClassName?: string;
}

/**
 * Generic list component with hover pill animation.
 * Eliminates duplication between ProjectsList and PostsList.
 */
export function ListRenderer<T extends ListItem>({
  items,
  renderItem,
  getHref,
  className,
  containerClassName,
  ...props
}: ListRendererProps<T>): JSX.Element {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activePillStyle, setActivePillStyle] = useState<
    Record<string, string | number>
  >({});
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
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

  // Respect prefers-reduced-motion for animations
  const prefersReducedMotion = useCallback(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
      let nextIndex: number | null = null;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (index < items.length - 1) {
            nextIndex = index + 1;
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (index > 0) {
            nextIndex = index - 1;
          }
          break;
        case 'Home':
          event.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          nextIndex = items.length - 1;
          break;
      }

      if (nextIndex !== null) {
        setFocusedIndex(nextIndex);
        setHoveredIndex(nextIndex);
        // Focus the next element after state update
        setTimeout(() => {
          featureRefs.current[nextIndex]?.focus();
        }, 0);
      }
    },
    [items.length]
  );

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-start gap-2',
        containerClassName
      )}
      role="list"
    >
      {/* Animated pill background */}
      <div
        aria-hidden="true"
        className="absolute rounded-lg border border-accent-2 bg-accent transition-all duration-300 ease-out"
        style={{
          ...activePillStyle,
          opacity: hoveredIndex !== null || focusedIndex !== null ? 1 : 0,
          transitionDuration: prefersReducedMotion() ? '0ms' : '300ms',
        }}
      />

      {/* List items */}
      <div className="relative flex w-full flex-col items-start gap-2">
        {items.map((item, index) => (
          <Link
            aria-label={item.title}
            className={cn(
              'inline-block w-full rounded-lg px-3 py-3 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              className
            )}
            href={getHref ? getHref(item) : item.slug}
            key={item.slug}
            onBlur={() => setFocusedIndex(null)}
            onFocus={() => {
              setFocusedIndex(index);
              setHoveredIndex(index);
            }}
            onKeyDown={(e: KeyboardEvent<HTMLAnchorElement>) =>
              handleKeyDown(e, index)
            }
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            ref={(element: HTMLAnchorElement | null) => {
              if (element) {
                featureRefs.current[index] = element;
              }
            }}
            role="listitem"
            {...props}
          >
            {renderItem(
              item,
              index,
              hoveredIndex === index || focusedIndex === index
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
