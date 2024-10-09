import React from 'react';

// CSS
import '@styles/globals.css';
import '@site/ui/styles.css';

// Font
import { inter } from '@components/fonts';

// Providers
import { ThemeProvider } from '@site/ui/providers/theme';
import { AnalyticsProvider } from '@site/ui/providers/analytics';
import { LiveBlocksProvider } from '@site/ui/providers/liveblocks';

// Components
import { Header } from '@components/header';
import { Footer } from '@components/footer';

// Metadata
import type { Metadata } from 'next';

// Construct metadata
import { constructMetadata } from '@utils/metadata';

// Viewport
import type { Viewport } from 'next';

// Construct viewport
import { constructViewport } from '@utils/viewport';

// Export viewport
export const viewport: Viewport = constructViewport();

// Export metadata
export const metadata: Metadata = constructMetadata();

// UI Components
import { Toaster } from '@site/ui/sonner';
import { ScrollArea } from '@site/ui/scroll-area';

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Return layout component
  return (
    <html
      lang='en'
      className={inter.variable}
    >
      <body>
        <AnalyticsProvider>
          <LiveBlocksProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
            >
              <div className='mx-auto max-w-lg sm:max-w-xl px-4 py-10 sm:py-28'>
                <Header />
                <main>{children}</main>
                <Footer />
              </div>
              <Toaster 
                position="bottom-right" 
                theme='system'
              />
            </ThemeProvider>
          </LiveBlocksProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
};
