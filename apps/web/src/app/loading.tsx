import { Spinner } from '@gabfon/design-system/components/spinner';
import type { JSX } from 'react';

/**
 * The Loading for the site.
 * @returns The Loading for the site.
 */
const Loading = (): JSX.Element => {
  return (
    <div
      aria-live="polite"
      className="flex h-full max-h-screen w-full items-center justify-center"
    >
      <Spinner aria-hidden="true" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;
