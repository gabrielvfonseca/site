'use client';

import * as React from 'react';

// Vaul
import { Drawer as DrawerPrimitive } from 'vaul';

// Classnames
import { cn } from '@/src/utils/cn'

// Drawer Component
const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
// Display Name for Drawer
Drawer.displayName = 'Drawer';

// Drawer Components
const DrawerTrigger = DrawerPrimitive.Trigger;

// Drawer Portal
const DrawerPortal = DrawerPrimitive.Portal;

// Drawer Close
const DrawerClose = DrawerPrimitive.Close;

// Drawer Overlay
const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-black/30 dark:bg-black/40 backdrop-blur-sm', className)}
    {...props}
  />
));
// Display Name for DrawerOverlay
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

// Drawer Content
const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border border-gray-500 dark:border-gray-900 bg-gray-100/90 dark:bg-gray-1200/80 backdrop-blur',
        className
      )}
      {...props}
    >
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
// Display Name for DrawerContent
DrawerContent.displayName = 'DrawerContent';

// Drawer Header
const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)}
    {...props}
  />
);
// Display Name for DrawerHeader
DrawerHeader.displayName = 'DrawerHeader';

// Drawer Footer
const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('mt-auto flex flex-col gap-2 p-4', className)}
    {...props}
  />
);
// Display Name for DrawerFooter
DrawerFooter.displayName = 'DrawerFooter';

// Drawer Title
const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
// Display Name for DrawerTitle
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

// Drawer Description
const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-sm text-black dark:text-white', className)}
    {...props}
  />
));
// Display Name for DrawerDescription
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

// Export Drawer components
export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};