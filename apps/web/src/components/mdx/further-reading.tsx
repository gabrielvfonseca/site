import type { JSX } from 'react';
import { LinkCard } from '@/components/mdx/link-card';
import { getPosts } from '@/lib/content-index';
import { cn } from '@/lib/utils';

/** Number of recent posts shown when no explicit slugs are given. */
const DEFAULT_COUNT = 3;

/** Props for {@link FurtherReading}. */
interface FurtherReadingProps {
  /** Curated post slugs to link, in order. Falls back to recent posts. */
  readonly slugs?: readonly string[];
  /** Section heading. Defaults to "Further reading". */
  readonly title?: string;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A related-reading block for MDX. Given curated post `slugs` it links those in
 * order; otherwise it surfaces the most recent posts. Titles and descriptions
 * are pulled from the content index so they never drift from the source.
 * @param props - The further-reading props.
 * @returns The FurtherReading element, or `null` when there is nothing to show.
 */
export function FurtherReading({
  slugs,
  title = 'Further reading',
  className,
}: FurtherReadingProps): JSX.Element | null {
  const posts = getPosts();
  const selected = slugs
    ? slugs
        .map((slug) => posts.find((post) => post.slug === slug))
        .filter((post): post is NonNullable<typeof post> => post !== undefined)
    : posts.slice(0, DEFAULT_COUNT);

  if (selected.length === 0) {
    return null;
  }

  return (
    <section className={cn('not-prose my-8 flex flex-col gap-4', className)}>
      <h2 className="font-semibold text-foreground text-lg">{title}</h2>
      <div className="flex flex-col gap-3">
        {selected.map((post) => (
          <LinkCard
            description={post.description}
            eyebrow="Writing"
            href={`/posts/${post.slug}`}
            key={post.slug}
            title={post.title}
          />
        ))}
      </div>
    </section>
  );
}
