'use client'; // Error boundaries must be client components

import { DesignSystemProvider } from '@gabfon/design-system';
import { buttonVariants } from '@gabfon/design-system/components/button';
import { fonts } from '@gabfon/design-system/lib/fonts';
import Link from 'next/link';
import type { JSX } from 'react';

/**
 * The GlobalNotFound for the site.
 * @returns The GlobalNotFound for the site.
 */
const GlobalNotFound = (): JSX.Element => (
  // global-error must include html and body tags
  <html className={fonts} lang="en">
    <body className="bg-background text-foreground">
      <DesignSystemProvider>
        <main
          aria-describedby="not-found-description"
          aria-labelledby="not-found-title"
          className="mx-auto flex h-full min-h-screen max-w-md flex-col items-center justify-center gap-4"
        >
          <h1
            autoFocus
            className="font-medium text-foreground text-lg"
            id="not-found-title"
          >
            Not Found
          </h1>
          <p className="text-center text-md" id="not-found-description">
            Could not find requested resource
          </p>
          <Link
            aria-label="Go to homepage"
            className={buttonVariants({ variant: 'default', shape: 'full' })}
            href="/"
          >
            Go home
          </Link>
        </main>
      </DesignSystemProvider>
    </body>
  </html>
);

export default GlobalNotFound;
