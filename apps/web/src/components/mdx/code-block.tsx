"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useRef, useState } from "react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** How long the "copied" confirmation state persists, in ms. */
const COPIED_RESET_MS = 2000;

/**
 * Props for {@link CodeBlock}. Extends the native`<pre>`props so it can be
 * used as a drop-in `pre` override for MDX. `title` is emitted by fumadocs
 * when a code fence declares `title="..."`.
 */
interface CodeBlockProps extends ComponentProps<"pre"> {
  /** Optional filename/title rendered in the header bar. */
  readonly title?: string;
  /**
   * When true, render only the`<pre>`without the surrounding card, header or
   * copy button. Used by {@link CodeGroup}, which supplies shared chrome.
   */
  readonly bare?: boolean;
}

/**
 * A wrapper around fumadocs' Shiki `<pre>` that adds a header bar with an
 * optional filename and a copy-to-clipboard button. The button reads the
 * rendered code text directly from the DOM so it stays correct regardless of
 * highlighting markup.
 * @param props - The code block props.
 * @returns The CodeBlock element.
 */
export function CodeBlock({
  title,
  bare = false,
  className,
  children,
  ...props
}: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async (): Promise<void> => {
    const text = preRef.current?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      // Clipboard access can be denied; fail silently.
    }
  };

  if (bare) {
    return (
      <pre
        className={cn(
          "!my-0 overflow-x-auto !rounded-none !border-0",
          className
        )}
        ref={preRef}
        {...props}
      >
        {children}
      </pre>
    );
  }

  return (
    <div className="not-prose group border-border bg-muted/50 relative overflow-hidden rounded-lg border">
      <div className="border-border flex items-center justify-between border-b py-2 pr-2 pl-4">
        <span className="text-muted-foreground font-mono text-xs tracking-wide">
          {title ?? "Code"}
        </span>
        <button
          aria-label={copied ? "Copied" : "Copy code"}
          className="text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-ring inline-flex size-7 items-center justify-center rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          onClick={copy}
          type="button"
        >
          {copied ? (
            <CheckIcon aria-hidden="true" className="size-3.5" />
          ) : (
            <CopyIcon aria-hidden="true" className="size-3.5" />
          )}
        </button>
      </div>
      <pre
        className={cn(
          "!my-0 overflow-x-auto !rounded-none !border-0",
          className
        )}
        ref={preRef}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
