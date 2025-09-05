import { Skeleton } from '@gabfon/design-system/components/skeleton';
import type { JSX } from 'react';

export default function Loading(): JSX.Element {
  // Minimum number of skeletons to show
  const minCount = 4;
  const maxCount = 10;

  // Get a random number between minCount and maxCount (inclusive)
  const randomCount =
    Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;

  // Minimum width percentage for a skeleton (e.g., never below 40%)
  const minWidth = 40;
  const maxWidth = 100;

  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: randomCount }, (_, index) => {
        const width =
          Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;

        return (
          <Skeleton
            key={index}
            className="h-10"
            style={{ width: `${width}%` }}
          />
        );
      })}
    </div>
  );
}
