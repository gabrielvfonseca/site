import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';
import type { JSX } from 'react';
import { cn } from '@/lib/utils';

/** Matches absolute http(s) URLs (treated as external links). */
const EXTERNAL_URL = /^https?:\/\//;

/** Props for {@link Newsletter}. */
interface NewsletterProps {
  /** Where the call-to-action links (a subscribe page, contact, etc.). */
  readonly href: string;
  /** Heading for the CTA. Defaults to a subscribe prompt. */
  readonly title?: string;
  /** Supporting line beneath the heading. */
  readonly description?: string;
  /** Button label. Defaults to "Subscribe". */
  readonly action?: string;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * An end-of-post call to action for MDX — a quiet, bordered block inviting the
 * reader to subscribe or follow. Presentational only: it links out rather than
 * capturing email inline, keeping it backend-agnostic.
 * @param props - The newsletter props.
 * @returns The Newsletter element.
 */
export function Newsletter({
  href,
  title = 'Enjoyed this?',
  description = 'Get new writing in your inbox — no noise, unsubscribe anytime.',
  action = 'Subscribe',
  className,
}: NewsletterProps): JSX.Element {
  const external = EXTERNAL_URL.test(href);

  return (
    <aside
      className={cn(
        'not-prose my-8 flex flex-col gap-4 rounded-lg border border-border bg-muted/[var(--opacity-muted)] p-6 sm:flex-row sm:items-center sm:justify-between',
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <Link
        className="group inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-background px-4 py-2 font-medium text-foreground text-sm no-underline transition-colors hover:border-foreground/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {action}
        <ArrowUpRightIcon
          aria-hidden="true"
          className="group-hover:-translate-y-0.5 size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
        />
      </Link>
    </aside>
  );
}
