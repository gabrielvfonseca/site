'use client';

import React from 'react';

// Tooltip
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

// Utils
import { cn } from '@utils/cn';

// Tooltip Provider
const TooltipProvider = TooltipPrimitive.Provider;

// Tooltip
const Tooltip = TooltipPrimitive.Root;

// Tooltip Trigger
const TooltipTrigger = TooltipPrimitive.Trigger;

// Tooltip Content
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 2, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-lg border border-gray-400 dark:border-gray-800 bg-white px-3 py-1.5 text-sm text-white dark:text-black shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
// Display name
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Exports
export { 
  Tooltip, 
  TooltipTrigger, 
  TooltipContent,
  TooltipProvider,
};