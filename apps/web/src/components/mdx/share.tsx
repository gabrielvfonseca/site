'use client';

import { CheckIcon, LinkIcon } from 'lucide-react';
import { type JSX, useState } from 'react';
import { cn } from '@/lib/utils';

/** How long the "copied" confirmation state persists, in ms. */
const COPIED_RESET_MS = 2000;

/** Props for {@link Share}. */
interface ShareProps {
  /** Text used when sharing to X (usually the post title). */
  readonly title?: string;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A compact share row for MDX — copy the current page URL, or open an X share
 * intent prefilled with the title. Reads the live URL on the client so it works
 * on any route without threading the URL through props.
 * @param props - The share props.
 * @returns The Share element.
 */
export function Share({ title = '', className }: ShareProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  const copyLink = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      // Clipboard access can be denied; fail silently.
    }
  };

  const shareToX = (): void => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    window.open(
      `https://x.com/intent/tweet?url=${url}&text=${text}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const buttonClass =
    'inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-muted-foreground text-sm transition-colors hover:border-foreground/25 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring';

  return (
    <div className={cn('not-prose flex items-center gap-2', className)}>
      <button className={buttonClass} onClick={copyLink} type="button">
        {copied ? (
          <CheckIcon aria-hidden="true" className="size-3.5" />
        ) : (
          <LinkIcon aria-hidden="true" className="size-3.5" />
        )}
        {copied ? 'Copied' : 'Copy link'}
      </button>
      <button className={buttonClass} onClick={shareToX} type="button">
        Share on X
      </button>
    </div>
  );
}
