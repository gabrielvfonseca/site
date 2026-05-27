import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { cn } from './utils';

/**
 * The fonts for the site.
 */
export const fonts = cn(
  GeistSans.variable,
  GeistMono.variable,
  'touch-manipulation font-sans antialiased'
);
