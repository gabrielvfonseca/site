'use client'; // Error boundaries must be Client Components

import { DesignSystemProvider } from '@repo/design-system';
import { buttonVariants } from '@repo/design-system/components/ui/button';
import { fonts } from '@repo/design-system/lib/fonts';
import Link from 'next/link';
import type { JSX } from 'react';

type GlobalErrorProps = {
  readonly error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function GlobalError({ reset }: GlobalErrorProps): JSX.Element {
  const handleReset = () => {
    reset();
  };

  return (
    // global-error must include html and body tags
    <html lang="en" className={fonts}>
      <body>
        <DesignSystemProvider>
          <div
            data-testid="error-container"
            className="mx-auto flex h-full min-h-screen max-w-md flex-col items-center justify-center gap-4"
          >
            <h2 className="font-semibold text-foreground text-lg">
              Internal Server Error
            </h2>
            <p className="text-center font-medium text-md">
              The server encountered an error.
            </p>
            <Link
              href="/"
              onClick={handleReset}
              className={buttonVariants({
                variant: 'default',
                shape: 'full',
              })}
            >
              Try again
            </Link>
          </div>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
