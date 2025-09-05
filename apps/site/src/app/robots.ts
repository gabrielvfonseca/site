import type { MetadataRoute } from 'next';

/**
 * The robots for the site.
 * @returns The robots for the site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://gabfon.com/sitemap.xml',
  };
}
