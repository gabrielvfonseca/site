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
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
