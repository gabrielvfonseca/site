'use client';

import { type JSX, useEffect, useState } from 'react';
import type { TocEntry } from '@/lib/toc';
import { cn } from '@/lib/utils';

/** Props for {@link TableOfContents}. */
interface TableOfContentsProps {
  /** Ordered heading entries to render. */
  readonly entries: readonly TocEntry[];
}

/** Root margin that marks a heading "active" once it nears the top. */
const OBSERVER_ROOT_MARGIN = '0px 0px -70% 0px';
/** Base left indent (rem) for a top-level (`h2`) entry. */
const BASE_INDENT_REM = 0.75;
/** Extra left indent (rem) added per nesting level below `h2`. */
const INDENT_STEP_REM = 0.75;
/** Depth of a top-level table-of-contents entry (`h2`). */
const TOP_LEVEL_DEPTH = 2;

/**
 * A sticky table of contents shown alongside long-form content on wide
 * viewports. Highlights the section currently in view using an
 * `IntersectionObserver`, and lets readers jump to any heading. Renders
 * nothing when a document has fewer than two headings.
 * @param props - The table-of-contents props.
 * @returns The navigation element, or `null` when there is nothing to show.
 */
export function TableOfContents({
  entries,
}: TableOfContentsProps): JSX.Element | null {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (observed) => {
        for (const item of observed) {
          if (item.isIntersecting) {
            setActiveId(item.target.id);
          }
        }
      },
      { rootMargin: OBSERVER_ROOT_MARGIN, threshold: 1 }
    );

    for (const heading of headings) {
      observer.observe(heading);
    }
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 2) {
    return null;
  }

  return (
    <nav aria-label="Table of contents" className="flex flex-col gap-3 text-sm">
      <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        On this page
      </span>
      <ul className="flex flex-col gap-2">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              className={cn(
                'block border-border border-l py-0.5 pr-2 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground',
                activeId === entry.id && 'border-foreground text-foreground'
              )}
              href={`#${entry.id}`}
              style={{
                paddingLeft: `${(entry.depth - TOP_LEVEL_DEPTH) * INDENT_STEP_REM + BASE_INDENT_REM}rem`,
              }}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
