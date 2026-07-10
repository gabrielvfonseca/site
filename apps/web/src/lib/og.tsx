import { ImageResponse } from 'next/og';

/** Shared Open Graph card size (px). */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const AVATAR_URL = 'https://github.com/gabrielvfonseca.png';

interface OgCardOptions {
  /** Primary heading (page/post/project title). */
  title: string;
  /** Muted line under the title (e.g. role or section). */
  subtitle?: string;
}

/**
 * Render a branded Open Graph card matching the site's monochrome design —
 * black canvas, GitHub avatar, a title, and an optional subtitle. Shared by the
 * default card and the per-route post/project cards to keep them consistent.
 * @param options - The card title and optional subtitle.
 * @returns An ImageResponse (1200×630 PNG).
 */
export function createOgImage({
  title,
  subtitle,
}: OgCardOptions): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0a0a0a',
        padding: '80px',
        color: '#fafafa',
        fontFamily: 'sans-serif',
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: ImageResponse (satori) renders raw <img> */}
      <img
        alt=""
        height={112}
        src={AVATAR_URL}
        style={{ borderRadius: '50%' }}
        width={112}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div style={{ fontSize: 32, color: '#a1a1a1', marginTop: 16 }}>
            {subtitle}
          </div>
        ) : null}
      </div>
      <div style={{ display: 'flex', fontSize: 26, color: '#7c7c7c' }}>
        gabfon.com
      </div>
    </div>,
    { ...OG_SIZE }
  );
}
