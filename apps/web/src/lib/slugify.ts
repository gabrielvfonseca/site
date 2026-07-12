import type { ReactNode } from 'react';
import { nodeToText } from '@/lib/node-text';

/** Characters stripped when slugifying heading text. */
const NON_SLUG_CHARS = /[^\w\s-]/g;
/** Runs of whitespace collapsed to a single hyphen. */
const WHITESPACE = /\s+/g;

/**
 * Convert a plain string into a GitHub-style slug used as a deep-link `id`.
 * Kept in one place so heading `id`s (rendered in {@link file://./../mdx-components.tsx})
 * and the table of contents ({@link file://./toc.ts}) always agree.
 * @param text - The raw heading text.
 * @returns The slugified anchor id.
 */
export function slugifyText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(NON_SLUG_CHARS, '')
    .replace(WHITESPACE, '-');
}

/**
 * Slugify MDX heading children (which may be strings, arrays, or elements).
 * @param node - The heading's React children.
 * @returns The slugified anchor id.
 */
export function slugifyNode(node: ReactNode): string {
  return slugifyText(nodeToText(node));
}
