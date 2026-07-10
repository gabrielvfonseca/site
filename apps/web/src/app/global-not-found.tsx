'use client'; // Error boundaries must be client components

import '@/styles/main.css';
import { DesignSystemProvider } from '@gabfon/design-system';
import { buttonVariants } from '@gabfon/design-system/components/button';
import { fonts } from '@gabfon/design-system/lib/fonts';
import { Geist } from 'next/font/google';
import Link from 'next/link';
import type { JSX } from 'react';
import { cn } from '@/lib/utils';

/**
 * Geist provides the `--font-sans` variable the Tailwind `font-sans` utility
 * resolves to. `global-not-found` renders its own `<html>` outside the root
 * layout, so the font stack must be re-applied here or it falls back to the
 * platform default.
 */
const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

/**
 * The GlobalNotFound for the site.
 * @returns The GlobalNotFound for the site.
 */
const GlobalNotFound = (): JSX.Element => (
  // global-error must include html and body tags
  <html className={cn(fonts, 'font-sans', geist.variable)} lang="en">
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
            className={buttonVariants({
              variant: 'default',
              className: 'rounded-full',
            })}
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
