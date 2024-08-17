'use client'

import * as React from 'react'

// Radix
import * as AvatarPrimitive from '@radix-ui/react-avatar';

// Utils
import { cn } from '@utils/cn';

// Avatar Component
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
));
// Display Name for Avatar Component
Avatar.displayName = AvatarPrimitive.Root.displayName;

// Avatar Image Component
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
));
// Display Name for Avatar Image Component
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

// Avatar Fallback Component
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full font-medium text-sm items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800',
      className
    )}
    {...props}
  />
));
// Display Name for Avatar Fallback Component
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// Export Avatar Components
export { 
  Avatar, 
  AvatarImage, 
  AvatarFallback 
};