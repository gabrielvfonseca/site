/** A single image rendered in the bio gallery. */
export interface GalleryImage {
  /** Image source. Local paths (`/gallery/…` in `public/`) work out of the box;
   * remote URLs also need their host added to `next.config.ts` `remotePatterns`. */
  readonly src: string;
  /** Accessible description of the image. */
  readonly alt: string;
  /** Optional short caption shown under the image. */
  readonly caption?: string;
}

/**
 * Images shown in the bio gallery.
 *
 * TODO: populate with your own photos. Either drop files into
 * `apps/web/public/gallery/` and reference them as `/gallery/your-photo.jpg`,
 * or add remote URLs (and their host in `next.config.ts` → `images.remotePatterns`).
 * The gallery section is hidden while this list is empty.
 *
 * @example
 * export const BIO_GALLERY: readonly GalleryImage[] = [
 *   { src: '/gallery/lisbon.jpg', alt: 'Lisbon rooftops at sunset', caption: 'Home base in Lisbon' },
 *   { src: '/gallery/desk.jpg', alt: 'My desk setup while building Frontal' },
 * ];
 */
export const BIO_GALLERY: readonly GalleryImage[] = [
  {
    src: 'https://picsum.photos/seed/gabfon-lisbon/900/900?grayscale',
    alt: 'Lisbon streets and rooftops',
    caption: 'Lisbon, home base',
  },
  {
    src: 'https://picsum.photos/seed/gabfon-desk/900/900?grayscale',
    alt: 'A desk setup with a laptop and notes',
    caption: 'Where the work happens',
  },
  {
    src: 'https://picsum.photos/seed/gabfon-building/900/900?grayscale',
    alt: 'Sketching product ideas',
    caption: 'Building Frontal',
  },
  {
    src: 'https://picsum.photos/seed/gabfon-running/900/900?grayscale',
    alt: 'Out for a run',
    caption: 'Staying active',
  },
  {
    src: 'https://picsum.photos/seed/gabfon-details/900/900?grayscale',
    alt: 'Close-up of design details',
    caption: 'Sweating the details',
  },
  {
    src: 'https://picsum.photos/seed/gabfon-city/900/900?grayscale',
    alt: 'City light and architecture',
    caption: 'Always looking around',
  },
];
