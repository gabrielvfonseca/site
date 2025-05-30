import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gabriel Fonseca',
    // biome-ignore lint: Short name from next app
    short_name: 'Gabriel',
    description: 'Personal site.',
    // biome-ignore lint: Start url from next app
    start_url: '/',
    display: 'standalone',
    // biome-ignore lint: Display from next app
    background_color: '#fff',
    // biome-ignore lint: Theme color from next app
    theme_color: '#fff',
    icons: [
      {
        src: '/android-icon-36x36.png',
        sizes: '36x36',
        type: 'image/png',
      },
      {
        src: '/android-icon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/android-icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: '/android-icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/android-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}
