import type { JSX } from 'react';
import { cn } from '@/lib/utils';

/** A single headline metric. */
export interface StatTile {
  /** Headline value, e.g. `18h 30m`. */
  readonly value: string;
  /** Short label under the value. */
  readonly label: string;
  /** Optional supporting hint. */
  readonly hint?: string;
}

/**
 * Props for {@link StatTiles}.
 */
interface StatTilesProps {
  /** The tiles to render. */
  readonly items: readonly StatTile[];
  /** Columns at the `sm` breakpoint and up. Defaults to 3. */
  readonly columns?: 2 | 3 | 4;
}

/** Tailwind column classes keyed by count (static so they aren't purged). */
const COLUMN_CLASS: Record<2 | 3 | 4, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 md:grid-cols-4',
};

/**
 * A responsive grid of headline metrics with hairline dividers, matching the
 * bordered card look used elsewhere. Collapses to two columns on mobile.
 * @param props - The stat tiles props.
 * @returns The StatTiles element.
 */
export function StatTiles({ items, columns = 3 }: StatTilesProps): JSX.Element {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border',
        COLUMN_CLASS[columns]
      )}
    >
      {items.map((item) => (
        <div className="flex flex-col gap-1 bg-background p-4" key={item.label}>
          <span className="font-medium text-foreground text-xl tabular-nums tracking-tight">
            {item.value}
          </span>
          <span className="font-medium text-foreground/80 text-sm">
            {item.label}
          </span>
          {item.hint ? (
            <span className="text-muted-foreground text-xs leading-normal">
              {item.hint}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
