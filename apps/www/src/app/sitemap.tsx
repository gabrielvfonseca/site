import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/data-access/cache/post-cache';
import { getAllProjects } from '@/data-access/cache/project-cache';

/**
 * The sitemap for the site.
 * @returns The sitemap for the site.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all posts
  const allPosts = await getAllPosts();

  // Get all projects
  const allProjects = await getAllProjects();

  return [
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
    ...allPosts.map((post) => ({
      url: `https://gabfon.com/posts/${post.slug}`,
      lastModified: post.updatedAt.toISOString().split('T')[0],
    })),
    ...allProjects.map((project) => ({
      url: `https://gabfon.com/projects/${project.slug}`,
      lastModified: project.updatedAt.toISOString().split('T')[0],
    })),
  ];
}
