import type { JSX, ReactNode } from 'react';
import '@gabfon/design-system/styles/globals.css';
import { meta } from '@/constants/metadata';
import { DesignSystemProvider } from '@gabfon/design-system';
import { fonts } from '@gabfon/design-system/lib/fonts';
import { createMetadata } from '@gabfon/seo/metadata';
import { createViewport } from '@gabfon/seo/viewport';
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
