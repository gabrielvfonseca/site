'use client';

import { CheckIcon, CopyIcon } from 'lucide-react';
import { type ComponentProps, type JSX, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/** How long the "copied" confirmation state persists, in ms. */
const COPIED_RESET_MS = 2000;

/**
 * Props for {@link CodeBlock}. Extends the native `<pre>` props so it can be
 * used as a drop-in `pre` override for MDX. `title` is emitted by fumadocs
 * when a code fence declares `title="..."`.
 */
interface CodeBlockProps extends ComponentProps<'pre'> {
  /** Optional filename/title rendered in the header bar. */
  readonly title?: string;
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
  className,
  children,
  ...props
}: CodeBlockProps): JSX.Element {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async (): Promise<void> => {
    const text = preRef.current?.textContent ?? '';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      // Clipboard access can be denied; fail silently.
    }
  };

  return (
    <div className="not-prose group relative my-6 overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between border-border border-b bg-muted/[var(--opacity-muted)] py-2 pr-2 pl-4">
        <span className="font-medium text-muted-foreground text-xs tracking-wide">
          {title ?? 'Code'}
        </span>
        <button
          aria-label={copied ? 'Copied' : 'Copy code'}
          className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
          '!my-0 !rounded-none !border-0 overflow-x-auto',
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
