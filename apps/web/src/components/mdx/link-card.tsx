import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';
import type { JSX } from 'react';
import { cn } from '@/lib/utils';

/** Matches absolute http(s) URLs (treated as external links). */
const EXTERNAL_URL = /^https?:\/\//;

/**
 * Props for {@link LinkCard}.
 */
interface LinkCardProps {
  /** Destination URL. */
  readonly href: string;
  /** Card title. */
  readonly title: string;
  /** Supporting description. */
  readonly description?: string;
  /** Optional eyebrow/source label, e.g. a domain. */
  readonly eyebrow?: string;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A rich, bookmark-style link card for MDX. Surfaces a title, description and
 * source as a single tappable block with a hover-animated affordance. External
 * links open in a new tab; internal links use client navigation.
 * @param props - The link card props.
 * @returns The LinkCard element.
 */
export function LinkCard({
  href,
  title,
  description,
  eyebrow,
  className,
}: LinkCardProps): JSX.Element {
  const external = EXTERNAL_URL.test(href);

  return (
    <Link
      className={cn(
        'not-prose group flex items-center justify-between gap-4 rounded-lg border border-border bg-muted/[var(--opacity-muted)] px-5 py-4 no-underline transition-colors duration-200 hover:border-foreground/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="flex min-w-0 flex-col gap-1">
        {eyebrow ? (
          <span className="text-muted-foreground text-xs uppercase tracking-wider">
            {eyebrow}
          </span>
        ) : null}
        <span className="truncate font-medium text-foreground text-sm">
          {title}
        </span>
        {description ? (
          <span className="text-muted-foreground text-sm leading-snug">
            {description}
          </span>
        ) : null}
      </span>
      <ArrowUpRightIcon
        aria-hidden="true"
        className="group-hover:-translate-y-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground"
      />
    </Link>
  );
}
