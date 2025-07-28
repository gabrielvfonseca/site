import { getAllPosts } from '@/data-access';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getAllPosts();

  return [
    ...['', '/posts'].map((route: string) => ({
      url: `https://gabfon.com/${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })),
    ...allPosts,
  ];
}
