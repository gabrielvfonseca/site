import type { MetadataRoute } from 'next';
import { extractDate } from '@/lib/content-transformers';
import { source } from '@/lib/source';

/**
 * Format date for sitemap (YYYY-MM-DD)
 */
function formatSitemapDate(dateString?: string): string {
  if (!dateString) {
    return new Date().toISOString().split('T')[0];
  }

  try {
    return new Date(dateString).toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

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
      .map((page: any) => ({
        url: `https://gabfon.com${page.url}`,
        lastModified: formatSitemapDate(extractDate(page.data as Record<string, unknown>)),
      }));

    return [...baseSitemap, ...dynamicSitemap];
  } catch {
    // If there's an error (e.g., during build), return base sitemap
    return baseSitemap;
  }
}
