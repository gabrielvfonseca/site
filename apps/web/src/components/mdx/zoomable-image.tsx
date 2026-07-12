'use client';

import type { ComponentProps, JSX } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { cn } from '@/lib/utils';

/** Gap (px) kept between the zoomed image and the viewport edge. */
const ZOOM_MARGIN = 24;

/** Props for {@link ZoomableImage}: the native `img` props. */
type ZoomableImageProps = ComponentProps<'img'>;

/**
 * An image that expands to a full-screen lightbox on click, dimming the page
 * behind it. Used by {@link Figure} and {@link Gallery} for authored images
 * whose intrinsic dimensions are unknown, so a plain `<img>` is intentional.
 * @param props - The native image props.
 * @returns The zoomable image element.
 */
export function ZoomableImage({
  className,
  alt,
  ...props
}: ZoomableImageProps): JSX.Element {
  return (
    <Zoom zoomMargin={ZOOM_MARGIN}>
      {/* biome-ignore lint/performance/noImgElement: authored images have no known dimensions */}
      {/* biome-ignore lint/nursery/useImageSize: intrinsic size is unknown for authored MDX */}
      <img
        alt={alt ?? ''}
        className={cn('w-full', className)}
        loading="lazy"
        {...props}
      />
    </Zoom>
  );
}
