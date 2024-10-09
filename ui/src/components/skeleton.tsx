import React from 'react';

// Utils
import { cn } from '../utils/cn';

// Styles
import '../styles/styles.css';

// Skeleton Component
function Skeleton ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-accents-2', 
        className
      )}
      {...props}
    />
  )
};

// Export Skeleton Component
export { Skeleton };