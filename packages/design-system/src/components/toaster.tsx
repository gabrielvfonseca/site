'use client';

import { useTheme } from 'next-themes';
import type * as React from 'react';
import { Toaster as Sonner } from 'sonner';

import { cn } from '@gabfon/design-system/lib/utils';

type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster({ className, ...props }: ToasterProps) {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className={cn('toaster group', className)}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
        style: {
          '--normal-bg': 'var(--background)',
          '--normal-border': 'var(--border)',
          '--normal-text': 'var(--popover-foreground)',
        } as React.CSSProperties,
      }}
      {...props}
    />
  );
}
