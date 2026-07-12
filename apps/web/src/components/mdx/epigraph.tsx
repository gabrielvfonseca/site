import type { JSX, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for {@link Epigraph}.
 */
interface EpigraphProps {
  /** The quoted line(s). */
  readonly children: ReactNode;
  /** Optional attribution (person, work). */
  readonly cite?: string;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A small attributed epigraph for MDX — a short quotation set beneath a
 * heading or at the top of a piece. Quieter and more compact than
 * {@link PullQuote}: italic, right-aligned attribution, no accent bar.
 * @param props - The epigraph props.
 * @returns The Epigraph element.
 */
export function Epigraph({
  children,
  cite,
  className,
}: EpigraphProps): JSX.Element {
  return (
    <figure className={cn('not-prose flex flex-col gap-1 py-2', className)}>
      <blockquote className="text-balance text-muted-foreground italic">
        {children}
      </blockquote>
      {cite ? (
        <figcaption className="text-muted-foreground/80 text-sm">
          — {cite}
        </figcaption>
      ) : null}
    </figure>
  );
}
