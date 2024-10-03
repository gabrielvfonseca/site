import React from 'react';

// CSS
import '@styles/globals.css';

// Font
import { inter, editorialNew } from '@site/fonts-config';

// Providers
import { ThemeProvider } from '@components/providers/theme-provider';
import { AnalyticsProvider } from '@components/providers/analytics-provider';
import { LiveBlocksProvider } from '@components/providers/liveblocks-provider';

// Components
import { Header } from '@components/header';
import { Footer } from '@components/footer';

// Metadata
import type { Metadata } from 'next';

// Construct metadata
import { constructMetadata } from '@utils/metadata';

// Export metadata
export const metadata: Metadata = constructMetadata();

// Viewport
import type { Viewport } from 'next';

// Construct viewport
import { constructViewport } from '@utils/viewport';

// Export viewport
export const viewport: Viewport = constructViewport();

// UI Components
import { Toaster } from '@components/ui/sonner';

// Utils
import { cn } from '@utils/cn';

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
      className={cn(
        inter.variable,
        editorialNew.variable,
      )}
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
                <main>{ children }</main>
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
