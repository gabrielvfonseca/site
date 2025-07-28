import type { JSX, ReactNode } from 'react';
import '@repo/design-system/styles/globals.css';
import { meta } from '@/constants/metadata';
import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import { createMetadata } from '@repo/seo/metadata';
import { createViewport } from '@repo/seo/viewport';
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = createViewport();
export const metadata: Metadata = createMetadata({ ...meta });

type RootLayoutProps = {
  readonly children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en" className={fonts} suppressHydrationWarning>
      <body className="flex min-h-screen flex-1 flex-col">
        <DesignSystemProvider>{children}</DesignSystemProvider>
      </body>
    </html>
  );
}
