import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/** Average adult reading speed, in words per minute. */
const WORDS_PER_MINUTE = 220;
/** Frontmatter block delimited by leading/trailing `---` lines. */
const FRONTMATTER = /^---\n[\s\S]*?\n---/;
/** MDX/markdown syntax noise stripped before counting words. */
const MDX_NOISE = /[#>*_`~[\]()!-]|<[^>]+>|\{[^}]*\}/g;
/** Runs of whitespace used to split content into words. */
const WHITESPACE = /\s+/;

/**
 * Estimate the reading time of an MDX document, in whole minutes (min 1).
 * Reads the raw source so it stays accurate regardless of how the body is
 * compiled, strips frontmatter and coarse MDX syntax, then divides the word
 * count by an average reading speed.
 * @param collection - The content collection directory (`posts` or `projects`).
 * @param filePath - The entry's file path relative to the collection dir.
 * @returns The estimated reading time in minutes.
 */
export function getReadingTime(
  collection: 'posts' | 'projects',
  filePath: string
): number {
  try {
    const raw = readFileSync(
      join(process.cwd(), 'content', collection, filePath),
      'utf8'
    );
    const body = raw.replace(FRONTMATTER, '').replace(MDX_NOISE, ' ');
    const words = body.split(WHITESPACE).filter(Boolean).length;
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  } catch {
    return 1;
  }
}
