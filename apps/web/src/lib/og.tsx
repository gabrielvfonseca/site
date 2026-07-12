import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

/** Shared Open Graph card size (px). */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const AVATAR_URL = 'https://github.com/gabrielvfonseca.png';

/**
 * Design-system tokens (OKLCH in the app, converted to sRGB for Satori, which
 * cannot parse `oklch()`). Mirrors the site's dark theme in `main.css`.
 */
const COLOR = {
  background: '#0a0a0a', // --background (dark) oklch(0.145 0 0)
  foreground: '#fafafa', // --foreground (dark) oklch(0.985 0 0)
  muted: '#a1a1a1', // --muted-foreground (dark) oklch(0.708 0 0)
  faint: '#737373', // oklch(0.556 0 0)
  fainter: '#525252', // oklch(0.439 0 0)
  border: 'rgba(255, 255, 255, 0.1)', // --border (dark) oklch(1 0 0 / 10%)
  hairline: 'rgba(255, 255, 255, 0.08)',
} as const;

const FONTS_DIR = join(process.cwd(), 'assets/fonts');

type LoadedFont = {
  name: 'Geist';
  data: Buffer;
  weight: 400 | 500 | 600;
  style: 'normal';
};

let fontCache: LoadedFont[] | null = null;

/**
 * Load and cache the bundled Geist TTF weights used by the card. Satori requires
 * TTF/OTF font data (not the woff2 shipped with the app), so the weights are
 * committed under `apps/web/assets/fonts`.
 * @returns The Geist font descriptors for `ImageResponse`.
 */
const loadFonts = async (): Promise<LoadedFont[]> => {
  if (fontCache) {
    return fontCache;
  }

  const [regular, medium, semibold] = await Promise.all([
    readFile(join(FONTS_DIR, 'Geist-400.ttf')),
    readFile(join(FONTS_DIR, 'Geist-500.ttf')),
    readFile(join(FONTS_DIR, 'Geist-600.ttf')),
  ]);

  fontCache = [
    { name: 'Geist', data: regular, weight: 400, style: 'normal' },
    { name: 'Geist', data: medium, weight: 500, style: 'normal' },
    { name: 'Geist', data: semibold, weight: 600, style: 'normal' },
  ];

  return fontCache;
};

/** Max characters before the title / subtitle are truncated. */
const TITLE_MAX_CHARS = 96;
const SUBTITLE_MAX_CHARS = 140;
/** Only break on a word boundary when it sits past this fraction of the limit. */
const WORD_BOUNDARY_RATIO = 0.6;
/** Length thresholds (chars) that step the title font size down. */
const TITLE_LONG_CHARS = 70;
const TITLE_MEDIUM_CHARS = 44;
/** Title font sizes (px) for long / medium / short headings. */
const TITLE_SIZE_LONG = 54;
const TITLE_SIZE_MEDIUM = 66;
const TITLE_SIZE_BASE = 78;

/**
 * Truncate text to a maximum length on a word boundary, appending an ellipsis.
 * @param text - The source text.
 * @param max - The maximum character length.
 * @returns The truncated text.
 */
const clamp = (text: string, max: number): string => {
  if (text.length <= max) {
    return text;
  }

  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(' ');
  const onWord = lastSpace > max * WORD_BOUNDARY_RATIO;

  return `${(onWord ? slice.slice(0, lastSpace) : slice).trimEnd()}…`;
};

/**
 * Scale the title font size to its length so long headings stay on the canvas.
 * @param title - The title text.
 * @returns The title font size in px.
 */
const titleSize = (title: string): number => {
  if (title.length > TITLE_LONG_CHARS) {
    return TITLE_SIZE_LONG;
  }
  if (title.length > TITLE_MEDIUM_CHARS) {
    return TITLE_SIZE_MEDIUM;
  }

  return TITLE_SIZE_BASE;
};

interface OgCardOptions {
  /** Primary heading (page/post/project title). */
  title: string;
  /** Muted supporting line under the title (e.g. a description). */
  subtitle?: string;
  /** Small uppercase section label shown in the header pill (e.g. "Writing"). */
  eyebrow?: string;
}

/**
 * Render the branded Open Graph card in the site's editorial monochrome style:
 * a near-black canvas with a soft radial highlight, a signature header (avatar +
 * name) with a section pill, a length-responsive title, an optional description,
 * and a footer signature. Shared by the default card and the per-route
 * post/project cards to keep them visually consistent.
 * @param options - The card title, optional subtitle, and optional eyebrow.
 * @returns An ImageResponse (1200×630 PNG).
 */
export async function createOgImage({
  title,
  subtitle,
  eyebrow,
}: OgCardOptions): Promise<ImageResponse> {
  const fonts = await loadFonts();

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: COLOR.background,
        backgroundImage:
          'radial-gradient(680px circle at 130px 90px, rgba(255,255,255,0.06), transparent 62%), radial-gradient(900px circle at 1140px 660px, rgba(255,255,255,0.04), transparent 60%)',
        padding: '72px',
        color: COLOR.foreground,
        fontFamily: 'Geist',
      }}
    >
      {/* Header: brand signature + section pill */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* biome-ignore lint/performance/noImgElement: ImageResponse (satori) renders raw <img> */}
          <img
            alt=""
            height={60}
            src={AVATAR_URL}
            style={{
              borderRadius: '50%',
              border: `1px solid ${COLOR.border}`,
            }}
            width={60}
          />
          <span
            style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.01em' }}
          >
            Gabriel Fonseca
          </span>
        </div>
        {eyebrow ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: `1px solid ${COLOR.border}`,
              borderRadius: 999,
              padding: '10px 22px',
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: COLOR.muted,
            }}
          >
            {eyebrow}
          </div>
        ) : null}
      </div>

      {/* Content: title + optional description */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontSize: titleSize(title),
            fontWeight: 600,
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
          }}
        >
          {clamp(title, TITLE_MAX_CHARS)}
        </div>
        {subtitle ? (
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              fontWeight: 400,
              lineHeight: 1.4,
              color: COLOR.muted,
              marginTop: 28,
              maxWidth: 940,
            }}
          >
            {clamp(subtitle, SUBTITLE_MAX_CHARS)}
          </div>
        ) : null}
      </div>

      {/* Footer: hairline + signature */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            height: 1,
            backgroundColor: COLOR.hairline,
            marginBottom: 26,
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 22,
          }}
        >
          <span style={{ fontWeight: 500, color: COLOR.faint }}>
            gabfon.com
          </span>
          <span style={{ fontWeight: 400, color: COLOR.fainter }}>
            @gabfon_
          </span>
        </div>
      </div>
    </div>,
    { ...OG_SIZE, fonts }
  );
}
