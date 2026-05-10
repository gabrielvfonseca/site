import '@/styles/main.css';
import { AnalyticsProvider } from '@gabfon/analytics';
import { Toaster } from '@gabfon/design-system/components/toaster';
import { TooltipProvider } from '@gabfon/design-system/components/tooltip';
import { fonts } from '@gabfon/design-system/lib/fonts';
import { ThemeProvider } from '@gabfon/design-system/providers/theme';
import { createMetadata } from '@gabfon/seo/metadata';
import { createViewport } from '@gabfon/seo/viewport';
import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import type { JSX, ReactNode } from 'react';
import { SkipNav } from '@/components/accessibility/skip-nav';
import { meta } from '@/constants/metadata';
import { cn } from '@/lib/utils';
import { QueryProvider } from '@/providers/query-provider';
import { ThemeInitScript } from '@/scripts/theme-init-script';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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
const RootLayout = ({ children }: RootLayoutProps): JSX.Element => {
  return (
    <html
      className={cn(fonts, 'font-sans', geist.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground">
        <SkipNav />
        <ThemeInitScript />
        <QueryProvider>
          <ThemeProvider defaultTheme="dark" enableSystem>
            <AnalyticsProvider>
              <TooltipProvider>{children}</TooltipProvider>
              <Toaster />
            </AnalyticsProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
