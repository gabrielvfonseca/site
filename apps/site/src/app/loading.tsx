import { Spinner } from '@gabfon/design-system/components/spinner';
import type { JSX } from 'react';

/**
 * The Loading for the site.
 * @returns The Loading for the site.
 */
export default function Loading(): JSX.Element {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner />
    </div>
  );
}
