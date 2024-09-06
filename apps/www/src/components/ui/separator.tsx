'use client'

import * as React from 'react';

// Radix
import * as SeparatorPrimitive from '@radix-ui/react-separator';

// Utils
import { cn } from '@utils/cn';

// Separator Component
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-gray-400 dark:bg-gray-900',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      {...props}
    />
  )
);
// Display Name for Separator Component
Separator.displayName = SeparatorPrimitive.Root.displayName;

// Exports
export { Separator };