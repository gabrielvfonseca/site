import type { MetadataRoute } from 'next';
import { CONFIG } from '@/constants/config';

/**
 * The manifest for the site.
 * @returns The manifest for the site.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${CONFIG.name} - ${CONFIG.title}`,
    short_name: CONFIG.name,
    description: CONFIG.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en',
    categories: ['portfolio', 'blog', 'technology', 'education'],
    // Icon is served by the dynamic `app/icon.tsx` route and injected into
    // <head> automatically; no static icon assets are shipped in `public/`.
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: 'Projects',
        short_name: 'Projects',
        description: 'View Gabriel Fonseca projects',
        url: '/#projects',
      },
      {
        name: 'Blog',
        short_name: 'Blog',
        description: 'Read Gabriel Fonseca blog posts',
        url: '/#posts',
      },
    ],
  };
}
