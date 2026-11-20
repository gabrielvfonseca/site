import type { ImageResponse } from "next/og";

import { getProjects } from "@/lib/content-index";
import { createOgImage } from "@/lib/og";

export { OG_CONTENT_TYPE as contentType, OG_SIZE as size } from "@/lib/og";

export const alt = "Project - Gabriel Fonseca";

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
    eyebrow: "Project",
    title: project?.title ?? "Project",
    subtitle: project?.description,
  });
}
