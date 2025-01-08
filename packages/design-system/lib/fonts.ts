import { cn } from '@repo/design-system/lib/utils';

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const fonts = cn(
  GeistSans.variable,
  GeistMono.variable,
  'font-sans antialiased'
);