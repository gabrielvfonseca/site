import type { MDXComponents } from 'mdx/types';
import type { ComponentType } from 'react';
import type { Post } from '@/models/post';
import type { Project } from '@/models/project';
import {
  posts as sourcePosts,
  projects as sourceProjects,
} from '../../.source';

/**
 * Runtime shape of a fumadocs-mdx `doc()` entry: schema frontmatter fields are
 * spread at the top level and the file info lives under `_file`.
 */
interface SourceDoc {
  _file: { path: string };
  title?: unknown;
  description?: unknown;
  date?: unknown;
  link?: unknown;
}

/** Trailing `.mdx` extension, stripped to derive a slug from a file path. */
const MDX_EXTENSION = /\.mdx$/;

/**
 * A source entry including its compiled MDX body component, used to render the
 * full content on detail pages.
 */
interface SourceEntry extends SourceDoc {
  body: ComponentType<{ components?: MDXComponents }>;
}

function findEntry(docs: unknown, slug: string): SourceEntry | undefined {
  return (docs as SourceEntry[]).find(
    (doc) => doc._file?.path?.replace(MDX_EXTENSION, '') === slug
  );
}

/**
 * Get a single post entry (with its MDX body) by slug.
 */
export function getPostEntry(slug: string): SourceEntry | undefined {
  return findEntry(sourcePosts, slug);
}

/**
 * Get a single project entry (with its MDX body) by slug.
 */
export function getProjectEntry(slug: string): SourceEntry | undefined {
  return findEntry(sourceProjects, slug);
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
    (sourcePosts as unknown as SourceDoc[])
      .filter((post) => post._file?.path)
      .map((post) => ({
        slug: post._file.path.replace(MDX_EXTENSION, ''),
        title: String(post.title ?? ''),
        description: String(post.description ?? ''),
        date: String(post.date ?? ''),
      }))
  );
}

/**
 * Get all projects sorted by date (newest first)
 */
export function getProjects(): Project[] {
  return sortByDate(
    (sourceProjects as unknown as SourceDoc[])
      .filter((project) => project._file?.path)
      .map((project) => ({
        slug: project._file.path.replace(MDX_EXTENSION, ''),
        title: String(project.title ?? ''),
        description: String(project.description ?? ''),
        date: String(project.date ?? ''),
        link: String(project.link ?? ''),
      }))
  );
}
