import type { Post } from '@/models/post.model';
import type { Project } from '@/models/project.model';

// Static content index - manually maintained for now
// This could be automated with a build script later
export const posts: Post[] = [
  {
    slug: 'hello-world',
    title: 'Hello World',
    description: 'My first post',
    date: '2026-03-25',
  },
  {
    slug: 'welcome',
    title: 'Welcome to my new blog',
    description: 'This is my first post using Fumadocs.',
    date: '2024-03-25',
  },
];

export const projects: Project[] = [
  {
    slug: 'awesome-project',
    title: 'My Awesome Project',
    description: 'A description of my awesome project.',
    date: '2024-03-25',
  },
  {
    slug: 'my-site',
    title: 'My Site',
    description: 'My first project',
    date: '2026-03-25',
  },
];

/**
 * Get all posts sorted by date (newest first)
 */
export function getPosts(): Post[] {
  return posts.sort(
    (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
  );
}

/**
 * Get all projects sorted by date (newest first)
 */
export function getProjects(): Project[] {
  return projects.sort(
    (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
  );
}
