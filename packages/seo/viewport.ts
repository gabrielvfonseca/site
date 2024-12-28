import type { Viewport } from 'next';

interface ConstructViewport {
  themeColor?: { media: string, color: string }[];
  width?: string;
  initialScale?: number;
  maximumScale?: number;
  userScalable?: boolean;
};

export function constructViewport({
    themeColor = [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
    width = 'device-width',
    initialScale = 1,
    maximumScale = 1,
    userScalable = false,
}: ConstructViewport = {}): Viewport {
  return {
    themeColor,
    width,
    initialScale,
    maximumScale,
    userScalable,
  };
};