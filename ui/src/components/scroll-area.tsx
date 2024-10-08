'use client'

import * as React from 'react';

// Radix
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

// Utils
import { cn } from '../utils/cn';

// Styles
import '../styles/styles.css';

// ScrollArea Component
const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className='h-full w-full'>
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
// Display Name for ScrollArea Component
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

// ScrollBar Component
const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' &&
        'h-full w-2 border-l border-l-gray-400 pr-1 py-1',
      orientation === 'horizontal' &&
        'h-2 flex-col border-t border-t-gray-400 p-[2px]',
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className='relative flex-1 rounded-full bg-accents-1 transition-colors duration-300' />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
// Display Name for ScrollBar Component
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

// Export ScrollArea Components
export { ScrollArea, ScrollBar };