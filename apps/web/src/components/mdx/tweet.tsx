import type { JSX } from 'react';
import { Tweet as ReactTweet } from 'react-tweet';
import { cn } from '@/lib/utils';

/** Props for {@link Tweet}. */
interface TweetProps {
  /** The tweet/X post id (the numeric id from the status URL). */
  readonly id: string;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * Embeds a tweet/X post by id, rendered server-side with no client SDK or
 * tracking scripts. Centered to match the content column.
 * @param props - The tweet props.
 * @returns The Tweet element.
 */
export function Tweet({ id, className }: TweetProps): JSX.Element {
  return (
    <div
      className={cn(
        'not-prose flex justify-center [&_.react-tweet-theme]:my-0',
        className
      )}
    >
      <ReactTweet id={id} />
    </div>
  );
}
