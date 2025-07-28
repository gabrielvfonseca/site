'use client'; // Error boundaries must be client components

import { Button } from '@repo/design-system/components/button';
import type React from 'react';

type ErrorProps = {
  readonly error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function PostsError({ reset }: ErrorProps): React.JSX.Element {
  return (
    <div className="mx-auto flex h-full min-h-screen max-w-md flex-col items-center justify-center gap-4">
      <h2 className="font-semibold text-foreground text-lg">
        Internal Server Error
      </h2>
      <p className="text-center font-medium text-md">
        The server encountered an error.
      </p>
      <Button onClick={() => reset()} variant="default" shape="full">
        Try again
      </Button>
    </div>
  );
}
