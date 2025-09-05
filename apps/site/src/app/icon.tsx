import { ImageResponse } from 'next/og';

/**
 * The size for the site.
 * @returns The size for the site.
 */
type Size = {
  /**
   * The width for the site.
   */
  width: number;
  /**
   * The height for the site.
   */
  height: number;
};

/**
 * The size for the site.
 * @returns The size for the site.
 */
export const size: Size = {
  width: 32,
  height: 32,
};

/**
 * The contentType for the site.
 * @returns The contentType for the site.
 */
export const contentType: string = 'image/png';

/**
 * The Icon for the site.
 * @returns The Icon for the site.
 */
export default function Icon(): ImageResponse {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 24,
        background: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '1000px',
        color: 'white',
      }}
    >
      A
    </div>,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
