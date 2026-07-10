import { LINK_EXTERNAL_CLASS } from '@gabfon/design-system/lib/constants';
import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { JSX } from 'react';
import { CONFIG } from '@/constants/config';
import {
  NOW_INTRO,
  NOW_LOCATION,
  NOW_SECTIONS,
  NOW_UPDATED,
} from '@/constants/now';
import { formatDisplayDate } from '@/lib/format-date';

/**
 * The metadata for the now page.
 * @returns The metadata for the now page.
 */
export const metadata: Metadata = createMetadata({
  title: 'Now | Gabriel Fonseca',
  description:
    'What Gabriel Fonseca is focused on right now: current projects, learning, writing, habits, and interests. A living snapshot, updated regularly.',
});

/**
 * The `/now` page: a regularly updated snapshot of current priorities,
 * projects, learning, writing, habits, and interests, in the spirit of the
 * "now page" movement. Structured like the bio page and driven entirely by
 * `@/constants/now`, so it's easy to keep current.
 * @returns The now page for the site.
 */
export default function Page(): JSX.Element {
  return (
    <div className="flex flex-col gap-12">
      <section
        aria-labelledby="now-intro-heading"
        className="flex scroll-mt-8 flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-lg" id="now-intro-heading">
            Now
          </h1>
          <p className="text-muted-foreground text-sm">
            {CONFIG.name} · {NOW_LOCATION} · Updated{' '}
            <time dateTime={NOW_UPDATED}>{formatDisplayDate(NOW_UPDATED)}</time>
          </p>
        </div>
        {NOW_INTRO.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      {NOW_SECTIONS.map((section, index) => {
        const headingId = `now-section-${index}-heading`;
        return (
          <section
            aria-labelledby={headingId}
            className="flex scroll-mt-8 flex-col gap-4"
            key={section.title}
          >
            <h2 className="font-semibold text-lg" id={headingId}>
              {section.title}
            </h2>
            <ul className="flex flex-col gap-4">
              {section.items.map((item) => (
                <li className="flex flex-col gap-1" key={item.label}>
                  <span className="font-medium text-foreground text-sm leading-5">
                    {item.label}
                  </span>
                  {item.detail && (
                    <span className="text-muted-foreground text-sm leading-5">
                      {item.detail}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section
        aria-labelledby="now-about-heading"
        className="flex scroll-mt-8 flex-col gap-4"
      >
        <h2 className="font-semibold text-lg" id="now-about-heading">
          About this page
        </h2>
        <p className="text-muted-foreground text-sm leading-6">
          This is a{' '}
          <Link
            aria-label="now page (opens in a new tab)"
            className={LINK_EXTERNAL_CLASS}
            href="https://nownownow.com/about"
            rel="noopener noreferrer"
            target="_blank"
          >
            now page
          </Link>
          , a snapshot of what I&apos;m focused on at this point in my life. It
          changes over time. Check back to see what&apos;s new.
        </p>
      </section>
    </div>
  );
}
