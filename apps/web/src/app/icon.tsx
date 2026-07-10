import { ImageResponse } from 'next/og';

/** Favicon size (px). */
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

/** GitHub avatar used as the site favicon / app icon. */
const AVATAR_URL = 'https://github.com/gabrielvfonseca.png';

/**
 * The dynamic favicon renders the GitHub avatar as a rounded icon.
 * @returns An ImageResponse with the avatar.
 */
export default function Icon(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        overflow: 'hidden',
        background: 'black',
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: ImageResponse (satori) renders raw <img>, not next/image */}
      <img
        alt=""
        height={size.height}
        src={AVATAR_URL}
        style={{ objectFit: 'cover' }}
        width={size.width}
      />
    </div>,
    { ...size }
  );
}
