import React from 'react';

import '@repo/design-system/styles/globals.css';
import { fonts } from '@repo/design-system/lib/fonts';

import { createViewport } from '@repo/seo/viewport';
import { createMetadata } from '@repo/seo/metadata';

import { DesignSystemProvider } from '@repo/design-system';
import { Toolbar } from '@repo/feature-flags/components/toolbar';

import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = createViewport();
export const metadata: Metadata = createMetadata({
  title: 'Gabriel Fonseca',
  description: 'Gabriel Fonseca',
});

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (  
    <html 
      lang="en" 
      className={fonts} 
      suppressHydrationWarning
    >
    <body className='flex flex-col flex-1 min-h-screen bg-background text-foreground border-border outline-ring/50'>
      <DesignSystemProvider>
        {children}
      </DesignSystemProvider>
      <Toolbar />
    </body>
    </html>
  );
}