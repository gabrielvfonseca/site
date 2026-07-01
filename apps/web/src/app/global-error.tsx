'use client'; // Error boundaries must be client components

import { parseError } from '@gabfon/observability';
import Link from 'next/link';
import { type JSX, useEffect } from 'react';

/**
 * The GlobalErrorProps for the site.
 */
interface GlobalErrorProps {
  /**
   * The error for the site.
   */
  readonly error: Error & {
    digest?: string;
  };
  /**
   * The reset for the site.
   */
  readonly reset: () => void;
}

/**
 * The GlobalError for the site.
 * @param props - The GlobalErrorProps.
 * @returns The GlobalError for the site.
 */
export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps): JSX.Element {
  useEffect(() => {
    parseError(error);
  }, [error]);

  return (
    // global-error must include html and body tags
    <html lang="en">
      <body className="bg-background text-foreground">
        <main
          aria-describedby="global-error-description"
          aria-labelledby="global-error-title"
          className="mx-auto flex h-full min-h-screen max-w-md flex-col items-center justify-center gap-4 p-4"
        >
          <h1
            autoFocus
            className="font-medium text-foreground text-lg"
            id="global-error-title"
          >
            Internal Server Error
          </h1>
          <p className="text-center text-md" id="global-error-description">
            The server encountered an error.
          </p>
          <Link
            className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
            href="/"
            onClick={() => reset()}
          >
            Try again
          </Link>
        </main>
      </body>
    </html>
  );
}
