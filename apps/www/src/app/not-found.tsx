import { buttonVariants } from '@gabfon/design-system/components/button';
import Link from 'next/link';
import type { JSX } from 'react';

/**
 * The NotFound for the site.
 * @returns The NotFound for the site.
 */
export default function NotFound(): JSX.Element {
  return (
    <main
      aria-describedby="not-found-description"
      aria-labelledby="not-found-title"
      className="mx-auto flex h-full min-h-screen max-w-md flex-col items-center justify-center gap-4"
    >
      <h1
        autoFocus
        className="font-semibold text-lg text-primary"
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
  );
}
