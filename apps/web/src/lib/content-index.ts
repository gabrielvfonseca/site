import type { Post } from '@/models/post';
import type { Project } from '@/models/project';
import {
  posts as sourcePosts,
  projects as sourceProjects,
} from '../../.source';

interface SourceDoc {
  info: { path: string };
  data: Record<string, unknown>;
}

function sortByDate<T extends { date?: string }>(items: T[]): T[] {
  return items.sort(
    (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
  );
}

/**
 * Get all posts sorted by date (newest first)
 */
export function getPosts(): Post[] {
  return sortByDate(
    (sourcePosts as SourceDoc[])
      .filter((post) => post.info?.path)
      .map((post) => ({
        slug: post.info.path.replace('.mdx', ''),
        title: String(post.data.title ?? ''),
        description: String(post.data.description ?? ''),
        date: String(post.data.date ?? ''),
      }))
  );
}

/**
 * Get all projects sorted by date (newest first)
 */
export function getProjects(): Project[] {
  return sortByDate(
    (sourceProjects as SourceDoc[])
      .filter((project) => project.info?.path)
      .map((project) => ({
        slug: project.info.path.replace('.mdx', ''),
        title: String(project.data.title ?? ''),
        description: String(project.data.description ?? ''),
        date: String(project.data.date ?? ''),
        link: String(project.data.link ?? ''),
      }))
  );
}
