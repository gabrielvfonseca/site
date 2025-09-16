import type { MetadataRoute } from 'next';
import { config } from '@/constants/config';

/**
 * The manifest for the site.
 * @returns The manifest for the site.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${config.name} - ${config.title}`,
    short_name: config.name,
    description: config.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en',
    categories: ['portfolio', 'blog', 'technology', 'education'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
        purpose: 'any',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/screenshot-desktop.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Desktop view of Gabriel Fonseca portfolio',
      },
      {
        src: '/screenshot-mobile.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Mobile view of Gabriel Fonseca portfolio',
      },
    ],
    shortcuts: [
      {
        name: 'About',
        short_name: 'About',
        description: 'Learn more about Gabriel Fonseca',
        url: '/#about',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'Projects',
        short_name: 'Projects',
        description: 'View Gabriel Fonseca projects',
        url: '/projects',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'Blog',
        short_name: 'Blog',
        description: 'Read Gabriel Fonseca blog posts',
        url: '/posts',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    ],
  };
}
