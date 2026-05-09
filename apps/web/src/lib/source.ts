import { posts, projects } from '@source';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';

export const source = loader({
  baseUrl: '/',
  source: createMDXSource(posts, projects),
});
