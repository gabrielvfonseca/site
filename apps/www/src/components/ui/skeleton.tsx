import React from 'react';

// Utils
import { cn } from '@utils/cn';

// Skeleton Component
function Skeleton ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-900', className)}
      {...props}
    />
  )
};

// Export Skeleton Component
export { Skeleton };