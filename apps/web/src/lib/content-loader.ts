import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Post } from '@/models/post';
import type { Project } from '@/models/project';

const FRONTMATTER_REGEX = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;

/**
 * Parse frontmatter from MDX content
 */
function parseFrontmatter(content: string) {
  const match = content.match(FRONTMATTER_REGEX);

  if (!match) {
    return { data: {}, content };
  }

  const frontmatterStr = match[1];
  const bodyContent = match[2];

  const data: Record<string, unknown> = {};
  const lines = frontmatterStr.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Remove quotes if present
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      data[key] = value;
    }
  }

  return { data, content: bodyContent };
}

/**
 * Load all posts from content/posts directory
 */
export async function loadPosts(): Promise<Post[]> {
  const postsDir = join(process.cwd(), 'content/posts');

  try {
    const files = await readdir(postsDir);
    const posts: Post[] = [];

    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const filePath = join(postsDir, file);
        const content = await readFile(filePath, 'utf-8');
        const { data } = parseFrontmatter(content);

        posts.push({
          slug: file.replace('.mdx', ''),
          title: data.title || 'Untitled',
          description: data.description || '',
          date: data.date || '',
        });
      }
    }

    return posts.sort(
      (a, b) =>
        new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
    );
  } catch (_error) {
    return [];
  }
}

/**
 * Load all projects from content/projects directory
 */
export async function loadProjects(): Promise<Project[]> {
  const projectsDir = join(process.cwd(), 'content/projects');

  try {
    const files = await readdir(projectsDir);
    const projects: Project[] = [];

    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const filePath = join(projectsDir, file);
        const content = await readFile(filePath, 'utf-8');
        const { data } = parseFrontmatter(content);

        projects.push({
          slug: file.replace('.mdx', ''),
          title: data.title || 'Untitled',
          description: data.description || '',
          date: data.date || '',
        });
      }
    }

    return projects.sort(
      (a, b) =>
        new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
    );
  } catch (_error) {
    return [];
  }
}
