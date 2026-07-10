import type { JSX } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for {@link Divider}.
 */
interface DividerProps {
  /** Optional centered label; without it, renders a simple hairline rule. */
  readonly label?: string;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A section divider for MDX. With a `label` it renders a centered caption
 * flanked by hairlines; otherwise a lone centered dot leader. Adds structure
 * to long-form pieces without heavy chrome.
 * @param props - The divider props.
 * @returns The Divider element.
 */
export function Divider({ label, className }: DividerProps): JSX.Element {
  if (!label) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'not-prose flex items-center justify-center py-2 text-muted-foreground/50',
          className
        )}
      >
        <span className="tracking-[0.6em]">···</span>
      </div>
    );
  }

  return (
    <div className={cn('not-prose flex items-center gap-4 py-2', className)}>
      <span aria-hidden="true" className="h-px flex-1 bg-border" />
      <span className="text-muted-foreground text-xs uppercase tracking-wider">
        {label}
      </span>
      <span aria-hidden="true" className="h-px flex-1 bg-border" />
    </div>
  );
}
