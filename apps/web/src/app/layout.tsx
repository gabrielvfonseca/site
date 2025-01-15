import React, { Suspense } from 'react';

import '@repo/design-system/styles/globals.css';

import { fonts } from '@repo/design-system/lib/fonts';

import type { Metadata, Viewport } from 'next';

import { constructViewport } from '@repo/seo/viewport';

import { constructMetadata } from '@repo/seo/metadata';

import { DesignSystemProvider } from '@repo/design-system';

import { cn } from '@repo/design-system/lib/utils';

import Loading from './loading';

import { VercelAnalytics } from '@repo/vercel'; 

export const viewport: Viewport = constructViewport();

export const metadata: Metadata = constructMetadata();

// Root Layout
const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <html
    lang='en'
    className={cn(fonts)}
    suppressHydrationWarning
  >
    <body className='flex flex-col flex-1 min-h-screen'>
      <VercelAnalytics>
        <DesignSystemProvider>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </DesignSystemProvider>
      </VercelAnalytics>
    </body>
  </html>
);

export default RootLayout;