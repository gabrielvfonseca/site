import Link from "next/link";

import type { PublicAmaEntry } from "@/lib/ama";

/**
 * The AmaListProps for the site.
 */
export interface AmaListProps {
  readonly items: PublicAmaEntry[];
}

/** Small "Pinned" badge shown on pinned threads. */
function PinnedBadge() {
  return (
    <span className="bg-muted text-micro text-muted-foreground inline-flex items-center gap-1 rounded-full px-2 py-0.5 tracking-wide uppercase">
      <svg
        aria-hidden
        className="size-2.5"
        fill="currentColor"
        role="img"
        viewBox="0 0 24 24"
      >
        <title>Pinned</title>
        <path d="M16 3v2l-1 1v5l3 3v2h-5v6h-2v-6H4v-2l3-3V6L6 5V3z" />
      </svg>
      Pinned
    </span>
  );
}

/** A single answered question, linking to its thread when it has a slug. */
function AmaItem({ item }: { item: PublicAmaEntry }) {
  const content = (
    <>
      <div className="flex items-center gap-2">
        {item.pinned && <PinnedBadge />}
        <p className="text-sm leading-5">{item.question}</p>
      </div>
      <p className="text-muted-foreground line-clamp-3 text-sm leading-6 whitespace-pre-line">
        {item.answer}
      </p>
    </>
  );

  if (!item.slug) {
    return <li className="flex flex-col gap-1.5">{content}</li>;
  }

  return (
    <li>
      <Link
        aria-label={`Open thread: ${item.question}`}
        className="hover:bg-muted/50 focus:ring-ring -mx-3 flex flex-col gap-1.5 rounded-lg px-3 py-2 transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
        href={`/ama/${item.slug}`}
      >
        {content}
        <span className="text-muted-foreground/[var(--opacity-secondary)] mt-0.5 text-xs">
          Read thread →
        </span>
      </Link>
    </li>
  );
}

/**
 * Renders published AMA question/answer pairs. Pinned threads sort first (with a
 * badge) and each entry links through to its full conversation. Shows an empty
 * state when there are no answered questions yet.
 * @param props - The AmaListProps.
 * @returns The AmaList for the site.
 */
export function AmaList({ items }: AmaListProps) {
  if (items.length === 0) {
    return (
      <p className="text-muted-foreground text-sm leading-5">
        No answered questions yet. Be the first to ask something below.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <AmaItem item={item} key={item.id} />
      ))}
    </ul>
  );
}
