import { allPosts } from '@contentlayer';

import type { Post } from '@contentlayer';

export default async function sitemap() {
  let posts = allPosts.map((post: Post) => ({
    url: post.slug,
    lastModified: post.date ,
  }));

  let routes = ['', '/posts'].map((route: string) => ({
    url: `https://gabfon.com/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...posts];
};