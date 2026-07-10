import type { MetadataRoute } from 'next';
import { getPosts, getProjects } from '@/lib/content-index';

const SITE_URL = 'https://gabfon.com';

/**
 * Format a date string to `YYYY-MM-DD`, falling back to today when missing or
 * unparseable.
 * @param date - The date string to format.
 * @param fallback - The fallback `YYYY-MM-DD` string.
 * @returns The formatted date string.
 */
function toDay(date: string | undefined, fallback: string): string {
  const parsed = date ? new Date(date) : null;

  return parsed && !Number.isNaN(parsed.getTime())
    ? (parsed.toISOString().split('T')[0] ?? fallback)
    : fallback;
}

/**
 * The sitemap for the site.
 * @returns The sitemap for the site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split('T')[0] ?? '';

  const staticEntries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: today },
    { url: `${SITE_URL}/bio`, lastModified: today },
    { url: `${SITE_URL}/now`, lastModified: today },
    { url: `${SITE_URL}/ama`, lastModified: today },
    { url: `${SITE_URL}/contact`, lastModified: today },
  ];

  const postEntries: MetadataRoute.Sitemap = getPosts().map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: toDay(post.date, today),
  }));

  const projectEntries: MetadataRoute.Sitemap = getProjects().map(
    (project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: toDay(project.date, today),
    })
  );

  return [...staticEntries, ...postEntries, ...projectEntries];
}
