import '@/styles/main.css';
import { AnalyticsProvider } from '@gabfon/analytics';
import { Toaster } from '@gabfon/design-system/components/toaster';
import { TooltipProvider } from '@gabfon/design-system/components/tooltip';
import { fonts } from '@gabfon/design-system/lib/fonts';
import { ThemeProvider } from '@gabfon/design-system/providers/theme';
import { createMetadata } from '@gabfon/seo/metadata';
import { createViewport } from '@gabfon/seo/viewport';
import type { Metadata, Viewport } from 'next';
import type { JSX, ReactNode } from 'react';
import { WebVitalsInit } from '@/components/web-vitals-init';
import { meta } from '@/constants/metadata';
import { QueryProvider } from '@/providers/query-provider';

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
interface RootLayoutProps {
  /**
   * The children for the site.
   */
  readonly children: ReactNode;
}

/**
 * The RootLayout for the site.
 * @param props - The RootLayoutProps.
 * @returns The RootLayout for the site.
 */
export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html className={fonts} lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const isDark = localStorage.theme === 'dark' ||
                  (!('theme' in localStorage) &&
                   matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) document.documentElement.classList.add('dark');
              } catch(_) {}
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-1 flex-col">
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-4 focus:text-foreground"
          href="#main-content"
        >
          Skip to main content
        </a>
        <QueryProvider>
          <ThemeProvider defaultTheme="dark" enableSystem>
            <AnalyticsProvider>
              <TooltipProvider>
                <WebVitalsInit />
                {children}
              </TooltipProvider>
              <Toaster />
            </AnalyticsProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
