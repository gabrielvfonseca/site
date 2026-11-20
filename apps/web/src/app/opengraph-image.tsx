import type { ImageResponse } from "next/og";

import { CONFIG } from "@/config/site";
import { createOgImage } from "@/lib/og";

export { OG_CONTENT_TYPE as contentType, OG_SIZE as size } from "@/lib/og";

export const alt = `${CONFIG.name} — ${CONFIG.title}`;

/**
 * The default Open Graph / social card, used for all routes unless a route
 * provides its own opengraph-image.
 * @returns The branded ImageResponse.
 */
export default function OpengraphImage(): Promise<ImageResponse> {
  return createOgImage({
    eyebrow: "Portfolio",
    title: "Building Enterprise AI",
    subtitle: "Building enterprise AI systems — from Lisbon, Portugal.",
  });
}
