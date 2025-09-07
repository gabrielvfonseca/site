'use client'; // Error boundaries must be client components

import { Button } from '@gabfon/design-system/components/button';
import type { JSX } from 'react';

/**
 * The ErrorProps for the site.
 */
type ErrorProps = {
  /**
   * The error for the site.
   */
  readonly error: Error & {
    digest?: string;
  };
  /**
   * The reset for the site.
   */
  reset: () => void;
};

/**
 * The PostsError for the site.
 * @param props - The ErrorProps.
 * @returns The PostsError for the site.
 */
export default function PostsError({ reset }: ErrorProps): JSX.Element {
  return (
    <section
      aria-describedby="error-description"
      aria-labelledby="error-title"
      className="mx-auto flex h-full min-h-screen max-w-md flex-col items-center justify-center gap-4"
    >
      <h2 className="font-semibold text-foreground text-lg" id="error-title">
        Internal Server Error
      </h2>
      <p className="text-center font-medium text-md" id="error-description">
        The server encountered an error.
      </p>
      <Button
        aria-label="Try to reload the post"
        onClick={() => reset()}
        shape="full"
        variant="default"
      >
        Try again
      </Button>
    </section>
  );
}
