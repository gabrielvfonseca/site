'use client'; // Error boundaries must be client components

import { DesignSystemProvider } from '@repo/design-system';
import { Button } from '@repo/design-system/components/button';
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
  return (
    // global-error must include html and body tags
    <html lang="en" className={fonts}>
      <body>
        <DesignSystemProvider>
          <div className="mx-auto flex h-full min-h-screen max-w-md flex-col items-center justify-center gap-4">
            <h2 className="font-semibold text-foreground text-lg">
              Internal Server Error
            </h2>
            <p className="text-center font-medium text-md">
              The server encountered an error.
            </p>
            <Button onClick={() => reset()} variant="default" shape="full">
              <Link href="/">Try again</Link>
            </Button>
          </div>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
