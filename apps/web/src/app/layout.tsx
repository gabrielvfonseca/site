import React, { Suspense } from 'react';

import '@repo/design-system/styles/globals.css';

import { fonts } from '@repo/design-system/lib/fonts';

import type { Metadata } from 'next';

import { constructMetadata } from '@repo/seo/metadata';

import type { Viewport } from 'next';

import { constructViewport } from '@repo/seo/viewport';

import { DesignSystemProvider } from '@repo/design-system';

import { cn } from '@repo/design-system/lib/utils';
import Loading from './loading';

export const viewport: Viewport = constructViewport();

export const metadata: Metadata = constructMetadata({
  title: 'Gabriel Fonseca',
  description: 'Software developer, tech enthusiast, and writer, living in Lisbon.'
});

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
    <body>
      <DesignSystemProvider>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </DesignSystemProvider>
    </body>
  </html>
);

export default RootLayout;