import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

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
export function Kbd({ children, className }: KbdProps) {
  return (
    <kbd
      className={cn(
        "not-prose border-border bg-muted/50 text-muted-foreground inline-flex h-5 min-w-5 items-center justify-center rounded-[0.3rem] border border-b-[1.5px] px-1.5 font-sans text-[0.6875rem] leading-none tracking-wide",
        className
      )}
    >
      {children}
    </kbd>
  );
}
