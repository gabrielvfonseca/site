'use client';

import { Button } from '@gabfon/design-system/components/button';
import { ChevronDownIcon } from 'lucide-react';
import type { JSX } from 'react';

/**
 * The ShowMoreButtonProps for the site.
 */
export interface ShowMoreButtonProps {
  /** Number of items still hidden, surfaced to the user and screen readers. */
  readonly remaining: number;
  /** Noun for the items being revealed, e.g. `'posts'`. */
  readonly label: string;
  /** Reveal the next batch of items. */
  readonly onShowMore: () => void;
}

/**
 * A "Show more" trigger that reveals the next batch of a paginated list.
 * @param props - The ShowMoreButtonProps.
 * @returns The ShowMoreButton for the site.
 */
export function ShowMoreButton({
  remaining,
  label,
  onShowMore,
}: ShowMoreButtonProps): JSX.Element {
  return (
    <Button
      aria-label={`Show more ${label} (${remaining} remaining)`}
      className="mt-2 self-start text-muted-foreground"
      onClick={onShowMore}
      size="sm"
      type="button"
      variant="ghost"
    >
      Show more
      <ChevronDownIcon aria-hidden="true" />
    </Button>
  );
}
