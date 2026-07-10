import { ImageResponse } from 'next/og';

/** Apple touch icon size (px). */
export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

/** GitHub avatar used as the Apple touch icon. */
const AVATAR_URL = 'https://github.com/gabrielvfonseca.png';

/**
 * The Apple touch icon renders the GitHub avatar (square, iOS masks corners).
 * @returns An ImageResponse with the avatar.
 */
export default function AppleIcon(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
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
