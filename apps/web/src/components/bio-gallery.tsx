import Image from 'next/image';
import type { JSX } from 'react';
import { BIO_GALLERY } from '@/constants/bio';

/**
 * A responsive photo gallery for the bio page. Renders nothing until images are
 * configured in `@/constants/bio`, so the page degrades gracefully while the
 * gallery is empty.
 * @returns The bio gallery, or `null` when there are no images.
 */
export function BioGallery(): JSX.Element | null {
  if (BIO_GALLERY.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="bio-gallery-heading"
      className="flex scroll-mt-8 flex-col gap-4"
    >
      <h2 className="font-semibold text-lg" id="bio-gallery-heading">
        Gallery
      </h2>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {BIO_GALLERY.map((image) => (
          <li className="flex flex-col gap-1.5" key={image.src}>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <Image
                alt={image.alt}
                className="object-cover transition-transform duration-300 hover:scale-105"
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                src={image.src}
              />
            </div>
            {image.caption && (
              <span className="text-muted-foreground text-xs leading-4">
                {image.caption}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
