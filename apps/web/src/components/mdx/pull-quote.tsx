import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Props for {@link PullQuote}.
 */
interface PullQuoteProps {
  /** The quoted statement. */
  readonly children: ReactNode;
  /** Optional attribution (person, source). */
  readonly author?: string;
  /** Optional role/context for the author. */
  readonly role?: string;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A large editorial pull quote for MDX. Sets the statement in display type to
 * break the reading rhythm and emphasise a key line, with optional
 * attribution. Monochrome, no decorative color.
 * @param props - The pull quote props.
 * @returns The PullQuote element.
 */
export function PullQuote({
  children,
  author,
  role,
  className,
}: PullQuoteProps) {
  return (
    <figure
      className={cn(
        "not-prose border-border flex flex-col gap-4 border-y py-8",
        className
      )}
    >
      <blockquote className="text-foreground text-xl leading-snug tracking-tight text-balance sm:text-2xl">
        <span aria-hidden="true" className="text-muted-foreground/60">
          “
        </span>
        {children}
        <span aria-hidden="true" className="text-muted-foreground/60">
          ”
        </span>
      </blockquote>
      {author ? (
        <figcaption className="text-muted-foreground flex items-center gap-2 text-xs tracking-wider uppercase">
          <span aria-hidden="true" className="bg-border h-px w-6" />
          <span className="text-foreground/80">{author}</span>
          {role ? <span>· {role}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
