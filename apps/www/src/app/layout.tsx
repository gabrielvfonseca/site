import React from 'react';

// CSS
import '@styles/globals.css';

// Font
import { inter, editorialNew } from '@fonts/index';

// Providers
import { ThemeProvider } from '@components/providers/theme-provider';
//import { AuthProvider } from '@components/providers/session-provider';
import { PHProvider } from '@components/providers/posthog-provider';

// Components
import Header from '@components/header';
import Footer from '@components/footer';

// Site Configuration
import { siteConfig } from '@config/site';

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  //metadataBase: new URL('baseUrl'),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.siteName,
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Components
import { ScrollArea } from '@components/ui/scroll-area';

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
  return (
    <html
      lang='en'
      className={cn(
        inter.variable,
        editorialNew.variable,
      )}
    >
      <body>
        <PHProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
          >
            <ScrollArea className='h-screen w-full'>
              <main className="mx-auto max-w-xl overflow-x-hidden px-6 py-12 antialiased sm:py-32 md:overflow-x-visible">
                <Header />
                { children }
                <Footer />
              </main>
            </ScrollArea>
            <Toaster />
          </ThemeProvider>
        </PHProvider>
      </body>
    </html>
  )
};
