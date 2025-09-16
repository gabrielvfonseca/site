import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/data-access/cache/post-cache';
import { getAllProjects } from '@/data-access/cache/project-cache';

/**
 * The sitemap for the site.
 * @returns The sitemap for the site.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    // Try to get all posts and projects
    const [allPosts, allProjects] = await Promise.all([
      getAllPosts(),
      getAllProjects(),
    ]);

    // Add dynamic content if available
    const dynamicSitemap: MetadataRoute.Sitemap = [
      ...allPosts.map((post) => ({
        url: `https://gabfon.com/posts/${post.slug}`,
        lastModified: post.updatedAt.toISOString().split('T')[0],
      })),
      ...allProjects.map((project) => ({
        url: `https://gabfon.com/projects/${project.slug}`,
        lastModified: project.updatedAt.toISOString().split('T')[0],
      })),
    ];

    return [...baseSitemap, ...dynamicSitemap];
  } catch {
    // If database is not available (e.g., during build), return base sitemap
    return baseSitemap;
  }
}
