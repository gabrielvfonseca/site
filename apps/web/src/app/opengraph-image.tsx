import type { ImageResponse } from 'next/og';
import { CONFIG } from '@/constants/config';
import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og';

export const alt = `${CONFIG.name} — ${CONFIG.title}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * The default Open Graph / social card, used for all routes unless a route
 * provides its own opengraph-image.
 * @returns The branded ImageResponse.
 */
export default function OpengraphImage(): Promise<ImageResponse> {
  return createOgImage({
    eyebrow: 'Portfolio',
    title: 'Software Developer, Founder & Engineer',
    subtitle:
      'Building products, tools, and systems — and writing about it, from Lisbon, Portugal.',
  });
}
