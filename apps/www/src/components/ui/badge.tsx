'use client';

import React from 'react';

// Class Variance Authority
import { cva, type VariantProps } from 'class-variance-authority';

// Utils
import { cn } from '@utils/cn';

// Badge Variants
const badgeVariants = cva(
  'inline-flex items-center w-fit rounded-full font-medium px-2 py-0 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border border-gray-400 text-gray-700 bg-gradient-to-b from-gray-100 to-gray-200 dark:border-gray-900 dark:text-gray-400 dark:from-gray-1100 dark:to-gray-1200',
        secondary: 'border border-gray-400 text-black bg-gradient-to-b from-gray-100 to-gray-200 dark:border-gray-800 dark:text-white dark:from-gray-900 dark:to-gray-1000',
        destructive: 'border border-transparent bg-destructive text-destructive-foreground',
        outline: 'border border-gray-400 dark:border-gray-800',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

// Badge Props
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {};

// Badge Component
const Badge = ({ 
  className, 
  size = 'sm', 
  variant, 
  ...props 
}: BadgeProps) => {
  return (
    <div className={cn(
      badgeVariants({ variant, size }),
      className
    )} 
      {...props} 
    />
  );
};

// Exports
export { 
  Badge, 
  badgeVariants 
};