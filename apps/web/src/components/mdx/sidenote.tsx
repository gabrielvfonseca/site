import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Props for {@link Sidenote}.
 */
interface SidenoteProps {
  /** The note content. */
  readonly children: ReactNode;
  /** Optional short label rendered before the note (e.g. "Note", "Aside"). */
  readonly label?: string;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A quiet marginal aside for MDX. Renders as a compact, hairline-marked note
 * set apart from the body — useful for tangents and caveats that would
 * otherwise interrupt the argument. Kept inline (rather than floated) so it
 * coexists with the table-of-contents margin. Monochrome, no accent color.
 * @param props - The sidenote props.
 * @returns The Sidenote element.
 */
export function Sidenote({
  children,
  label = "Note",
  className,
}: SidenoteProps) {
  return (
    <aside
      className={cn(
        "not-prose border-border text-muted-foreground my-6 border-l pl-4 text-sm leading-relaxed",
        className
      )}
    >
      <span className="text-foreground/70 mb-1 block text-xs tracking-wider uppercase">
        {label}
      </span>
      {children}
    </aside>
  );
}
