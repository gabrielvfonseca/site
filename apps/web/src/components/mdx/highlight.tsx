import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * An inline highlight for MDX — a semantic `<mark>` used to draw the eye to a
 * phrase mid-sentence. Styled as a quiet tinted underlay rather than a loud
 * marker so it stays within the monochrome system.
 * @param props - The native `mark` props.
 * @returns The Highlight element.
 */
export function Highlight({ className, ...props }: ComponentProps<"mark">) {
  return (
    <mark
      className={cn(
        "bg-foreground/10 text-foreground rounded-[0.25em] px-[0.2em] py-[0.05em]",
        className
      )}
      {...props}
    />
  );
}
