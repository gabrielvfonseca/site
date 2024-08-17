'use client';

import * as React from 'react';

// Next Themes
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Types
import { type ThemeProviderProps } from 'next-themes/dist/types';

// Main Component
export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
};