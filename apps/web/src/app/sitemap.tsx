import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

/**
 * The sitemap for the site.
 * @returns The sitemap for the site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Base sitemap entries
  const baseSitemap: MetadataRoute.Sitemap = [
    {
      url: 'https://gabfon.com',
      lastModified: new Date().toISOString().split('T')[0],
    },
    {
      url: 'https://gabfon.com/projects',
      lastModified: new Date().toISOString().split('T')[0],
    },
    {
      url: 'https://gabfon.com/posts',
      lastModified: new Date().toISOString().split('T')[0],
    },
  ];

  try {
    // Add dynamic content from Fumadocs source
    const dynamicSitemap: MetadataRoute.Sitemap = source
      .getPages()
      .map((page) => ({
        url: `https://gabfon.com${page.url}`,
        lastModified: (page.data as { date?: string }).date
          ? new Date((page.data as { date?: string }).date ?? '')
              .toISOString()
              .split('T')[0]
          : new Date().toISOString().split('T')[0],
      }));

    return [...baseSitemap, ...dynamicSitemap];
  } catch {
    // If there's an error (e.g., during build), return base sitemap
    return baseSitemap;
  }
}
