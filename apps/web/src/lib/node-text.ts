import type { ReactNode } from 'react';

/**
 * Flatten an arbitrary React node tree to its plain text content. MDX wraps
 * component children in elements (e.g. a `<p>`), so components that need the
 * raw text — headings for slugs, a terminal for its commands — must walk the
 * tree rather than assume a string.
 * @param node - The React node to flatten.
 * @returns The concatenated text content.
 */
export function nodeToText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(nodeToText).join('');
  }
  if (node && typeof node === 'object' && 'props' in node) {
    return nodeToText(
      (node as { props?: { children?: ReactNode } }).props?.children
    );
  }
  return '';
}
