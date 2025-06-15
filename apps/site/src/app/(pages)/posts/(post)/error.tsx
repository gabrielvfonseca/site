'use client'; // Error boundaries must be Client Components

import { Button } from '@repo/design-system/components/ui/button';

type ErrorProps = {
  readonly error: Error & { digest?: string };
  reset: () => void;
};

// biome-ignore lint: Ignore global "Error"
export default function Error({ reset }: ErrorProps) {
  return (
    <div>
      <p>Error rendering post</p>
      <Button
        type="button"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
