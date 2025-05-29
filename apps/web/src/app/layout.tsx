import type React from 'react';
import '@repo/design-system/styles/globals.css';
import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import { Toolbar } from '@repo/feature-flags/components/toolbar';
import { createMetadata } from '@repo/seo/metadata';
import { createViewport } from '@repo/seo/viewport';
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = createViewport();
export const metadata: Metadata = createMetadata({
  title: 'Gabriel Fonseca',
  description:
    'Gabriel Fonseca is a computer engineering student living in Lisbon, pt.',
});

type RootLayoutProps = {
  readonly children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={fonts} suppressHydrationWarning>
      <body className="flex min-h-screen flex-1 flex-col">
        <DesignSystemProvider>{children}</DesignSystemProvider>
        <Toolbar />
      </body>
    </html>
  );
}
