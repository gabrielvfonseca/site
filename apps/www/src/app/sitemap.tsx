
// Config
import { baseUrl } from '@/site.config';

// Contentlayer
import { allNotes } from 'contentlayer/generated';

// Types
import type { Notes as Note } from 'contentlayer/generated';

// Sitemap function
export default async function sitemap() {
  // Retrieve all notes from Contentlayer
  let notes = allNotes.map((note: Note) => ({
    url: note.slug,
    lastModified: note.date ,
  }));

  // Add the routes to the sitemap
  let routes = ['', '/notes'].map((route: string) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  // Return the sitemap
  return [...routes, ...notes];
};
