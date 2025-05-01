import { cn } from '@repo/design-system/lib/utils';
import { Inter } from 'next/font/google';
 
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-sans',
});

export const fonts = cn(
  inter.variable,
  'touch-manipulation font-sans antialiased'
);
