import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

/** Matches absolute http(s) URLs (treated as external links). */
const EXTERNAL_URL = /^https?:\/\//;

/** Props for {@link Bookmark}. */
interface BookmarkProps {
  /** Destination URL. */
  readonly href: string;
  /** Bookmark title. */
  readonly title: string;
  /** Supporting description. */
  readonly description?: string;
  /** Source label, e.g. a domain. */
  readonly eyebrow?: string;
  /** Preview/OG image URL shown alongside the text. */
  readonly image?: string;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A rich bookmark card for MDX — like {@link LinkCard} but with a preview
 * image (e.g. an Open Graph thumbnail) beside the text. The image is authored
 * explicitly rather than fetched, keeping rendering fully static.
 * @param props - The bookmark props.
 * @returns The Bookmark element.
 */
export function Bookmark({
  href,
  title,
  description,
  eyebrow,
  image,
  className,
}: BookmarkProps) {
  const external = EXTERNAL_URL.test(href);

  return (
    <Link
      className={cn(
        "not-prose group border-border bg-muted/50 hover:border-foreground/25 focus-visible:ring-ring flex items-stretch justify-between gap-4 overflow-hidden rounded-lg border no-underline transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transition-none",
        className
      )}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="flex min-w-0 flex-1 flex-col gap-1 px-5 py-4">
        {eyebrow ? (
          <span className="text-muted-foreground text-xs tracking-wider uppercase">
            {eyebrow}
          </span>
        ) : null}
        <span className="text-foreground flex items-center gap-1.5 text-sm">
          <span className="truncate">{title}</span>
          <ArrowUpRightIcon
            aria-hidden="true"
            className="text-muted-foreground group-hover:text-foreground size-3.5 shrink-0 transition-colors"
          />
        </span>
        {description ? (
          <span className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {description}
          </span>
        ) : null}
      </span>
      {image ? (
        <span className="border-border hidden w-40 shrink-0 overflow-hidden border-l sm:block">
          <img
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            src={image}
          />
        </span>
      ) : null}
    </Link>
  );
}
