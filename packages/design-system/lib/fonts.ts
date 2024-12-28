import { cn } from '@repo/design-system/lib/utils';

import { Inter, JetBrains_Mono } from 'next/font/google';

const sans = Inter ({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const mono = JetBrains_Mono ({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const fonts = cn(
  sans.variable,
  mono.variable,
  'font-sans antialiased'
);