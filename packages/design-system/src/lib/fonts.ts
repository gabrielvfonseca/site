import { cn } from '@gabfon/design-system/lib/utils';
import { IBM_Plex_Mono, Inter } from 'next/font/google';

/**
 * The Inter font.
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/**
 * The IBM Plex Mono font.
 */
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
  weight: ['400', '700'],
});

/**
 * The fonts for the site.
 */
export const fonts = cn(
  inter.variable,
  ibmPlexMono.variable,
  'touch-manipulation font-sans antialiased'
);
