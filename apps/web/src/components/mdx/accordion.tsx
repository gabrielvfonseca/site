'use client';

import { PlusIcon } from 'lucide-react';
import { type JSX, type ReactNode, useId, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the {@link Accordion} container.
 */
interface AccordionProps {
  /** {@link AccordionItem} children. */
  readonly children: ReactNode;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A container that groups {@link AccordionItem}s into a single bordered card
 * with hairline dividers between rows. Ideal for FAQs in MDX.
 * @param props - The accordion props.
 * @returns The Accordion element.
 */
export function Accordion({
  children,
  className,
}: AccordionProps): JSX.Element {
  return (
    <div
      className={cn(
        'not-prose divide-y divide-border overflow-hidden rounded-lg border border-border',
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Props for a single {@link AccordionItem}.
 */
interface AccordionItemProps {
  /** The row's question/title. */
  readonly title: string;
  /** The collapsible answer/content. */
  readonly children: ReactNode;
  /** Whether the row starts expanded. Defaults to `false`. */
  readonly defaultOpen?: boolean;
}

/**
 * A single collapsible row. Uses a CSS `grid-template-rows` transition for a
 * smooth, content-agnostic open/close animation, and respects reduced motion.
 * @param props - The accordion item props.
 * @returns The AccordionItem element.
 */
export function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: AccordionItemProps): JSX.Element {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div>
      <button
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-muted/[var(--opacity-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <span className="font-medium text-foreground text-sm">{title}</span>
        <PlusIcon
          aria-hidden="true"
          className={cn(
            'size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out motion-reduce:transition-none',
            open && 'rotate-45'
          )}
        />
      </button>
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
        id={panelId}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-4 text-muted-foreground text-sm leading-relaxed [&>*+*]:mt-3 [&>p]:m-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
