import type { JSX, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for {@link Kbd}.
 */
interface KbdProps {
  /** The key label(s), e.g. `⌘` or `Shift`. */
  readonly children: ReactNode;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * An inline keyboard-key indicator for MDX. Renders as a small, raised chip
 * that sits comfortably within a line of body copy.
 * @param props - The kbd props.
 * @returns The Kbd element.
 */
export function Kbd({ children, className }: KbdProps): JSX.Element {
  return (
    <kbd
      className={cn(
        'not-prose inline-flex h-5 min-w-5 items-center justify-center rounded-[0.3rem] border border-border border-b-[1.5px] bg-muted/[var(--opacity-muted)] px-1.5 font-medium font-sans text-[0.6875rem] text-muted-foreground leading-none tracking-wide',
        className
      )}
    >
      {children}
    </kbd>
  );
}
