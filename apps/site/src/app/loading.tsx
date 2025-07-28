import { Spinner } from '@repo/design-system/components/spinner';
import type { JSX } from 'react';

export default function Loading(): JSX.Element {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner />
    </div>
  );
}
