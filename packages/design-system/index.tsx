import { Toaster } from '@repo/design-system/components/ui/sonner';

import { TooltipProvider } from '@repo/design-system/components/ui/tooltip';

import { ThemeProvider } from '@repo/design-system/providers/theme';

import type { ThemeProviderProps } from 'next-themes';

type DesignSystemProviderProperties = ThemeProviderProps;

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProperties) => (
  <ThemeProvider {...properties}>
    <TooltipProvider>
      {children}
    </TooltipProvider>
    <Toaster
      position="bottom-right" 
      theme='system'
    />
  </ThemeProvider>
);