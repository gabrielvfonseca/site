import type { Viewport } from 'next';

type CreateViewportProps = {
  /**
   * The theme color for the viewport.
   * @default [{ media: '(prefers-color-scheme: light)', color: 'white' }, { media: '(prefers-color-scheme: dark)', color: 'black' }]
   */
  themeColor?: { media: string; color: string }[];
  /**
   * The width for the viewport.
   * @default 'device-width'
   */
  width?: string;
  /**
   * The initial scale for the viewport.
   * @default 1
   */
  initialScale?: number;
  /**
   * The maximum scale for the viewport. Left unset by default so users can
   * pinch-to-zoom (WCAG 1.4.4). Override only when a page truly requires it.
   */
  maximumScale?: number;
  /**
   * Whether the user can zoom. Enabled by default for accessibility.
   * @default true
   */
  userScalable?: boolean;
};

/**
 * The createViewport function for the SEO.
 * @param props - The CreateViewportProps.
 * @returns The createViewport function.
 */
export function createViewport({
  themeColor = [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width = 'device-width',
  initialScale = 1,
  maximumScale,
  userScalable = true,
}: CreateViewportProps = {}): Viewport {
  return {
    themeColor,
    width,
    initialScale,
    maximumScale,
    userScalable,
  };
}
