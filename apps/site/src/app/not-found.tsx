import { buttonVariants } from '@gabfon/design-system/components/button';
import Link from 'next/link';
import type { JSX } from 'react';

/**
 * The NotFound for the site.
 * @returns The NotFound for the site.
 */
export default function NotFound(): JSX.Element {
  return (
    <div className="mx-auto flex h-full min-h-screen max-w-md flex-col items-center justify-center gap-4">
      <h2 className="font-semibold text-lg text-primary">Not Found</h2>
      <p className="text-center text-md">Could not find requested resource</p>
      <Link
        className={buttonVariants({ variant: 'default', shape: 'full' })}
        href="/"
      >
        Go home
      </Link>
    </div>
  );
}
