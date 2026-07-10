import type { JSX } from 'react';
import { CONFIG } from '@/constants/config';
import type { AmaThread as AmaThreadData } from '@/lib/ama';
import { cn } from '@/lib/utils';

/** A normalized bubble in the rendered conversation. */
type Bubble = {
  readonly key: string;
  readonly role: 'asker' | 'owner';
  readonly author: string;
  readonly body: string;
};

/**
 * The AmaThreadProps for the site.
 */
export interface AmaThreadProps {
  readonly thread: AmaThreadData;
}

/**
 * A single chat bubble. Asker messages align left and muted; owner (site owner)
 * messages align right and emphasized.
 * @param props - The bubble to render.
 * @returns The rendered bubble.
 */
function ThreadBubble({ bubble }: { bubble: Bubble }): JSX.Element {
  const isOwner = bubble.role === 'owner';
  return (
    <li
      className={cn(
        'flex flex-col gap-1',
        isOwner ? 'items-end' : 'items-start'
      )}
    >
      <span className="px-1 text-muted-foreground/[var(--opacity-secondary)] text-xs">
        {bubble.author}
      </span>
      <div
        className={cn(
          'max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-6',
          isOwner
            ? 'rounded-tr-sm bg-foreground text-background'
            : 'rounded-tl-sm bg-muted text-foreground'
        )}
      >
        {bubble.body}
      </div>
    </li>
  );
}

/**
 * Renders an AMA conversation as a chat thread: the original question and answer
 * followed by any back-and-forth follow-up messages, in order.
 * @param props - The AmaThreadProps.
 * @returns The rendered conversation thread.
 */
export function AmaThread({ thread }: AmaThreadProps): JSX.Element {
  const askerName = thread.askerName ?? 'Anonymous';

  const bubbles: Bubble[] = [
    {
      key: `${thread.id}-question`,
      role: 'asker',
      author: askerName,
      body: thread.question,
    },
  ];

  if (thread.answer) {
    bubbles.push({
      key: `${thread.id}-answer`,
      role: 'owner',
      author: CONFIG.name,
      body: thread.answer,
    });
  }

  for (const message of thread.messages) {
    bubbles.push({
      key: message.id,
      role: message.role,
      author: message.role === 'owner' ? CONFIG.name : askerName,
      body: message.body,
    });
  }

  return (
    <ul className="flex flex-col gap-5">
      {bubbles.map((bubble) => (
        <ThreadBubble bubble={bubble} key={bubble.key} />
      ))}
    </ul>
  );
}
