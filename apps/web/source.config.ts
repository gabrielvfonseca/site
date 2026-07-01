import { defineCollections, defineConfig } from 'fumadocs-mdx/config';
import { postSchema } from '@/models/post';
import { projectSchema } from '@/models/project';

export const posts = defineCollections({
  type: 'doc',
  dir: 'content/posts',
  schema: postSchema,
});

export const projects = defineCollections({
  type: 'doc',
  dir: 'content/projects',
  schema: projectSchema,
});

export default defineConfig();
