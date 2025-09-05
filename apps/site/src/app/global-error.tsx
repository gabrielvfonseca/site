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
          <div className="mx-auto flex h-full min-h-screen max-w-md flex-col items-center justify-center gap-4">
            <h2 className="font-semibold text-foreground text-lg">
              Internal Server Error
            </h2>
            <p className="text-center font-medium text-md">
              The server encountered an error.
            </p>
            <Button onClick={() => reset()} shape="full" variant="default">
              <Link href="/">Try again</Link>
            </Button>
          </div>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
