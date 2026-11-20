"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

import { nodeToText } from "@/lib/node-text";
import { cn } from "@/lib/utils";

/** How long the "copied" confirmation state persists, in ms. */
const COPIED_RESET_MS = 2000;

/** Props for {@link Terminal}. */
interface TerminalProps {
  /** One or more shell commands, one per line. */
  readonly children: ReactNode;
  /** Optional title for the terminal header (defaults to a shell hint). */
  readonly title?: string;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A styled terminal block for MDX. Renders each line with a`$`prompt and a
 * copy button that yields the raw commands (without prompts). Distinct from a
 * code block: it reads as something to run, not something to study.
 * @param props - The terminal props.
 * @returns The Terminal element.
 */
export function Terminal({
  children,
  title = "Terminal",
  className,
}: TerminalProps) {
  const [copied, setCopied] = useState(false);
  const lines = nodeToText(children).trim().split("\n");

  const copy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      // Clipboard access can be denied; fail silently.
    }
  };

  return (
    <div
      className={cn(
        "not-prose border-border bg-muted/50 my-6 overflow-hidden rounded-lg border",
        className
      )}
    >
      <div className="border-border flex items-center justify-between border-b py-2 pr-2 pl-4">
        <span className="text-muted-foreground font-mono text-xs tracking-wide">
          {title}
        </span>
        <button
          aria-label={copied ? "Copied" : "Copy commands"}
          className="text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-ring inline-flex size-7 items-center justify-center rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2"
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
      <pre className="text-foreground !m-0 overflow-x-auto p-4 font-mono text-sm">
        {lines.map((line, index) => (
          <span className="flex gap-2" key={`${index}-${line}`}>
            <span
              aria-hidden="true"
              className="text-muted-foreground select-none"
            >
              $
            </span>
            <span>{line}</span>
          </span>
        ))}
      </pre>
    </div>
  );
}
