import type { JSX, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the {@link StatGrid} container.
 */
interface StatGridProps {
  /** {@link Stat} children. */
  readonly children: ReactNode;
  /** Columns at the `sm` breakpoint and up (2 or 3). Defaults to 3. */
  readonly columns?: 2 | 3;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A responsive grid of headline metrics for MDX — useful in project case
 * studies to surface impact numbers. Collapses to a single column on mobile.
 * @param props - The stat grid props.
 * @returns The StatGrid element.
 */
export function StatGrid({
  children,
  columns = 3,
  className,
}: StatGridProps): JSX.Element {
  return (
    <div
      className={cn(
        'not-prose grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border',
        columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Props for a single {@link Stat}.
 */
interface StatProps {
  /** The headline value, e.g. `99.9%` or `12ms`. */
  readonly value: string;
  /** Short label describing the value. */
  readonly label: string;
  /** Optional supporting detail. */
  readonly hint?: string;
}

/**
 * A single headline metric cell within a {@link StatGrid}.
 * @param props - The stat props.
 * @returns The Stat element.
 */
export function Stat({ value, label, hint }: StatProps): JSX.Element {
  return (
    <div className="flex flex-col gap-1 bg-background p-5">
      <span className="font-medium text-2xl text-foreground tabular-nums tracking-tight">
        {value}
      </span>
      <span className="font-medium text-foreground/80 text-sm">{label}</span>
      {hint ? (
        <span className="text-muted-foreground text-xs leading-normal">
          {hint}
        </span>
      ) : null}
    </div>
  );
}
