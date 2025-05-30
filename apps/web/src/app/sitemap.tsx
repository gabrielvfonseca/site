import { posts } from '@/constants/posts';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = posts.map((post) => ({
    url: post.slug,
    lastModified: post.date,
  }));

  return [
    ...['', '/posts'].map((route: string) => ({
      url: `https://gabfon.com/${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })),
    ...allPosts,
  ];
}
