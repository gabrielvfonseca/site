import React from 'react';

// CSS
import '@styles/globals.css';

// Font
import { inter, editorialNew } from '@site/fonts-config';

// Providers
import { ThemeProvider } from '@components/providers/theme-provider';
//import { AuthProvider } from '@components/providers/session-provider';
import { PHProvider } from '@components/providers/posthog-provider';

// Components
import { Header } from '@components/header';
import { Footer } from '@components/footer';

// Site Configuration
import { siteConfig } from '@/site.config';

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Developer', 
    'Software', 
    'Student', 
    'Engineer', 
    'Gabriel', 
    'Fonseca',
  ],
  authors: { name: 'Gabriel' },
  creator: '@gabrielvfonseca',
  publisher: '@gabrielvfonseca',
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  description: siteConfig.description,
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
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.title,
    images: [
      {
        url: siteConfig.ogImage, // Must be an absolute URL
        width: 1200,
        height: 630,
        alt: 'Gabriel',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

// Viewport
import type { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
        <PHProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
          >
            <ScrollArea className='flex flex-1 flex-col min-h-screen w-full'>
              <main className="prose overflow-x-hidden md:container md:mx-auto md:max-w-xl px-6 py-10 antialiased sm:py-28 md:overflow-x-visible">
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
