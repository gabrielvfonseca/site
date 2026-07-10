import type { ImageResponse } from 'next/og';
import { getProjects } from '@/lib/content-index';
import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og';

export const alt = 'Project — Gabriel Fonseca';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

interface Params {
  params: Promise<{ slug: string }>;
}

/**
 * Per-project Open Graph card showing the project title.
 * @param props - The route params (slug).
 * @returns The branded ImageResponse.
 */
export default async function ProjectOgImage({
  params,
}: Params): Promise<ImageResponse> {
  const { slug } = await params;
  const project = getProjects().find((entry) => entry.slug === slug);
  return createOgImage({
    title: project?.title ?? 'Project',
    subtitle: 'Gabriel Fonseca',
  });
}
