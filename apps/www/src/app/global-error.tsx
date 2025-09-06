'use client'; // Error boundaries must be client components

import { DesignSystemProvider } from '@gabfon/design-system';
import { Button } from '@gabfon/design-system/components/button';
import { fonts } from '@gabfon/design-system/lib/fonts';
import Link from 'next/link';
import type { JSX } from 'react';

/**
 * The GlobalErrorProps for the site.
 */
type GlobalErrorProps = {
  /**
   * The error for the site.
   * @returns The error for the site.
   */
  readonly error: Error & {
    digest?: string;
  };
  /**
   * The reset for the site.
   * @returns The reset for the site.
   */
  reset: () => void;
};

/**
 * The GlobalError for the site.
 * @param props - The GlobalErrorProps.
 * @returns The GlobalError for the site.
 */
export default function GlobalError({ reset }: GlobalErrorProps): JSX.Element {
  return (
    // global-error must include html and body tags
    <html className={fonts} lang="en">
      <body>
        <DesignSystemProvider>
          <main
            aria-describedby="global-error-description"
            aria-labelledby="global-error-title"
            className="mx-auto flex h-full min-h-screen max-w-md flex-col items-center justify-center gap-4"
          >
            <h1
              autoFocus
              className="font-semibold text-foreground text-lg"
              id="global-error-title"
            >
              Internal Server Error
            </h1>
            <p
              className="text-center font-medium text-md"
              id="global-error-description"
            >
              The server encountered an error.
            </p>
            <Button
              aria-label="Try to reload the page"
              onClick={() => reset()}
              shape="full"
              variant="default"
            >
              <Link aria-hidden="true" href="/">
                Try again
              </Link>
            </Button>
          </main>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
