import type { XPost } from '@gabfon/x';
import { HeartIcon, MessageCircleIcon, Repeat2Icon } from 'lucide-react';
import Link from 'next/link';
import type { JSX } from 'react';
import { formatRelativeTime } from './format';

/**
 * Props for {@link LatestPost}.
 */
interface LatestPostProps {
  /** The latest X post, or `null` when unavailable. */
  readonly post: XPost | null;
}

/**
 * The latest post on X, rendered as a quiet quote card: body text, a metrics
 * row (replies, reposts, likes) and a relative timestamp linking to X.
 * @param props - The latest post props.
 * @returns The LatestPost element.
 */
export function LatestPost({ post }: LatestPostProps): JSX.Element {
  if (!post) {
    return (
      <p className="text-muted-foreground text-sm">
        Latest post is unavailable right now.
      </p>
    );
  }

  return (
    <Link
      className="group flex flex-col gap-3 rounded-lg border border-border bg-muted/[var(--opacity-muted)] p-4 transition-colors duration-200 hover:border-foreground/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      href={post.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <p className="whitespace-pre-line text-foreground text-sm leading-relaxed">
        {post.text}
      </p>
      <div className="flex items-center gap-4 text-muted-foreground text-xs tabular-nums">
        <span className="inline-flex items-center gap-1">
          <MessageCircleIcon aria-hidden="true" className="size-3.5" />
          {post.replies}
        </span>
        <span className="inline-flex items-center gap-1">
          <Repeat2Icon aria-hidden="true" className="size-3.5" />
          {post.reposts}
        </span>
        <span className="inline-flex items-center gap-1">
          <HeartIcon aria-hidden="true" className="size-3.5" />
          {post.likes}
        </span>
        {post.createdAt ? (
          <span className="ml-auto">{formatRelativeTime(post.createdAt)}</span>
        ) : null}
      </div>
    </Link>
  );
}
