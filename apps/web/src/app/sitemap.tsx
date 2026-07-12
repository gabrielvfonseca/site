import type { MetadataRoute } from 'next';
import { env } from '@/config/env';
import { getPosts, getProjects } from '@/lib/content-index';

const SITE_URL = env.NEXT_PUBLIC_WEB_URL;

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
    {
      url: SITE_URL,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/posts`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/bio`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/now`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/ama`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: today,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  const postEntries: MetadataRoute.Sitemap = getPosts().map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: toDay(post.date, today),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = getProjects().map(
    (project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: toDay(project.date, today),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  );

  return [...staticEntries, ...postEntries, ...projectEntries];
}
