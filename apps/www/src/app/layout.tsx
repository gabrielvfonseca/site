import type { JSX, ReactNode } from 'react';
import '@gabfon/design-system/styles/globals.css';
import { DesignSystemProvider } from '@gabfon/design-system';
import { fonts } from '@gabfon/design-system/lib/fonts';
import { createMetadata } from '@gabfon/seo/metadata';
import { createViewport } from '@gabfon/seo/viewport';
import type { Metadata, Viewport } from 'next';
import { meta } from '@/constants/metadata';

/**
 * The viewport for the site.
 * @returns The viewport for the site.
 */
export const viewport: Viewport = createViewport();

/**
 * The metadata for the site.
 * @returns The metadata for the site.
 */
export const metadata: Metadata = createMetadata({ ...meta });

/**
 * The RootLayoutProps for the site.
 */
type RootLayoutProps = {
  /**
   * The children for the site.
   * @returns The children for the site.
   */
  readonly children: ReactNode;
};

/**
 * The RootLayout for the site.
 * @returns The RootLayout for the site.
 */
export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html className={fonts} lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-1 flex-col">
        <DesignSystemProvider>
          <main id="main-content">{children}</main>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
