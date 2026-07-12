import { ChevronRightIcon } from 'lucide-react';
import type { JSX, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for {@link Details}.
 */
interface DetailsProps {
  /** The summary label shown in the collapsed state. */
  readonly summary: string;
  /** The revealed content. */
  readonly children: ReactNode;
  /** When set, renders expanded by default. */
  readonly open?: boolean;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A lightweight collapsible built on the native `<details>`/`<summary>`
 * elements — good for asides, "show answer" reveals, and optional detail that
 * would otherwise interrupt the flow. Lighter than {@link Accordion}, needs no
 * client JavaScript.
 * @param props - The details props.
 * @returns The Details element.
 */
export function Details({
  summary,
  children,
  open = false,
  className,
}: DetailsProps): JSX.Element {
  return (
    <details
      className={cn(
        'not-prose group my-6 rounded-lg border border-border px-4',
        className
      )}
      open={open}
    >
      <summary className="-mx-4 flex cursor-pointer list-none items-center gap-2 px-4 py-3 font-medium text-foreground text-sm marker:content-none">
        <ChevronRightIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-90"
        />
        {summary}
      </summary>
      <div className="prose max-w-none pb-4 text-muted-foreground text-sm">
        {children}
      </div>
    </details>
  );
}
