import type { ImageResponse } from 'next/og';
import { getPosts } from '@/lib/content-index';
import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og';

export const alt = 'Post — Gabriel Fonseca';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

interface Params {
  params: Promise<{ slug: string }>;
}

/**
 * Per-post Open Graph card showing the post title.
 * @param props - The route params (slug).
 * @returns The branded ImageResponse.
 */
export default async function PostOgImage({
  params,
}: Params): Promise<ImageResponse> {
  const { slug } = await params;
  const post = getPosts().find((entry) => entry.slug === slug);
  return createOgImage({
    title: post?.title ?? 'Post',
    subtitle: 'Gabriel Fonseca',
  });
}
