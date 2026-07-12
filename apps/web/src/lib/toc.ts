import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { slugifyText } from '@/lib/slugify';

/** Frontmatter block delimited by leading/trailing `---` lines. */
const FRONTMATTER = /^---\n[\s\S]*?\n---/;
/** Fenced code blocks, whose `#` lines must not be read as headings. */
const CODE_FENCE = /^```[\s\S]*?^```/gm;
/** An ATX heading line: `##`/`###`/`####` followed by text. */
const HEADING = /^(#{2,4})\s+(.+?)\s*#*\s*$/;
/** Inline markdown emphasis/code markers stripped from heading labels. */
const INLINE_MARKS = /[*_`]/g;

/** A single table-of-contents entry. */
export interface TocEntry {
  /** Heading depth: 2 (`##`), 3 (`###`) or 4 (`####`). */
  readonly depth: number;
  /** The rendered heading label. */
  readonly text: string;
  /** The anchor id, matching the rendered heading's `id`. */
  readonly id: string;
}

/**
 * Extract a table of contents from an MDX document's raw source. Reads the
 * source (not the compiled body) so it stays accurate regardless of how the
 * body is compiled, and slugifies with {@link slugifyText} so ids match the
 * anchored headings rendered by the MDX component map.
 * @param collection - The content collection directory (`posts` or `projects`).
 * @param filePath - The entry's file path relative to the collection dir.
 * @returns The ordered list of heading entries (may be empty).
 */
export function getToc(
  collection: 'posts' | 'projects',
  filePath: string
): TocEntry[] {
  try {
    const raw = readFileSync(
      join(process.cwd(), 'content', collection, filePath),
      'utf8'
    );
    const body = raw.replace(FRONTMATTER, '').replace(CODE_FENCE, '');
    const entries: TocEntry[] = [];
    for (const line of body.split('\n')) {
      const match = HEADING.exec(line);
      if (!match) {
        continue;
      }
      const text = match[2].replace(INLINE_MARKS, '').trim();
      entries.push({
        depth: match[1].length,
        text,
        id: slugifyText(text),
      });
    }
    return entries;
  } catch {
    return [];
  }
}
