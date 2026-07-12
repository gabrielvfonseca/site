import type { MetadataRoute } from 'next';
import { env } from '@/config/env';

/** Absolute base URL for the site, used for the sitemap and host directives. */
const siteUrl = env.NEXT_PUBLIC_WEB_URL;

/**
 * The robots for the site.
 * @returns The robots for the site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
