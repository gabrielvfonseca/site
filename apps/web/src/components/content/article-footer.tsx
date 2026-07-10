import { LINK_MUTED_CLASS } from '@gabfon/design-system/lib/constants';
import Link from 'next/link';
import type { JSX } from 'react';
import { CONFIG } from '@/constants/config';

/**
 * Props for {@link ArticleFooter}.
 */
interface ArticleFooterProps {
  /** Index href for the collection, e.g. `/posts`. */
  readonly backHref: string;
  /** Label for the index link, e.g. `all writing`. */
  readonly backLabel: string;
}

/**
 * A closing block for article/case-study pages: a hairline rule, a short
 * sign-off, and a return link to the collection index and contact. Keeps the
 * end of long-form content intentional rather than abrupt.
 * @param props - The article footer props.
 * @returns The ArticleFooter element.
 */
export function ArticleFooter({
  backHref,
  backLabel,
}: ArticleFooterProps): JSX.Element {
  return (
    <footer className="mt-16 flex flex-col gap-4 border-border border-t pt-8">
      <p className="text-muted-foreground text-sm leading-relaxed">
        Thanks for reading. If this sparked a thought,{' '}
        <Link className={LINK_MUTED_CLASS} href="/contact">
          reach out
        </Link>{' '}
        — {CONFIG.name.split(' ')[0]} replies to most messages.
      </p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <Link className={LINK_MUTED_CLASS} href={backHref}>
          {backLabel}
        </Link>
        <Link className={LINK_MUTED_CLASS} href="/ama">
          Ask me anything
        </Link>
      </div>
    </footer>
  );
}
