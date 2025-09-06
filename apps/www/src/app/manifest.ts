import type { MetadataRoute } from 'next';

/**
 * The manifest for the site.
 * @returns The manifest for the site.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gabriel Fonseca',
    short_name: 'Gabriel',
    description: 'Personal site.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
