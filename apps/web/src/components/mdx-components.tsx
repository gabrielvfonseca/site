import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps } from "react";
import { Accordion, AccordionItem } from "@/components/mdx/accordion";
import { Bookmark } from "@/components/mdx/bookmark";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { CodeGroup } from "@/components/mdx/code-group";
import { Details } from "@/components/mdx/details";
import { Divider } from "@/components/mdx/divider";
import { Embed } from "@/components/mdx/embed";
import { Epigraph } from "@/components/mdx/epigraph";
import { Figure } from "@/components/mdx/figure";
import { FurtherReading } from "@/components/mdx/further-reading";
import { Gallery } from "@/components/mdx/gallery";
import { Gist } from "@/components/mdx/gist";
import { Highlight } from "@/components/mdx/highlight";
import { Kbd } from "@/components/mdx/kbd";
import { Lead } from "@/components/mdx/lead";
import { LinkCard } from "@/components/mdx/link-card";
import { Mermaid } from "@/components/mdx/mermaid";
import { Newsletter } from "@/components/mdx/newsletter";
import { PullQuote } from "@/components/mdx/pull-quote";
import { Share } from "@/components/mdx/share";
import { Sidenote } from "@/components/mdx/sidenote";
import { Stat, StatGrid } from "@/components/mdx/stat";
import { Step, Steps } from "@/components/mdx/steps";
import { Tabbed } from "@/components/mdx/tabbed";
import { TechStack } from "@/components/mdx/tech-stack";
import { Terminal } from "@/components/mdx/terminal";
import { Tweet } from "@/components/mdx/tweet";
import { Video } from "@/components/mdx/video";
import { slugifyNode } from "@/lib/slugify";
import { cn } from "@/lib/utils";

/** Matches absolute http(s) URLs (external links). */
const EXTERNAL_URL = /^https?:\/\//;

/**
 * Factory for deep-linkable headings. Adds a slug `id` for `#anchor` links and
 * a hover-revealed `#` link so readers can grab a permalink to any section.
 */
function anchoredHeading(Tag: "h2" | "h3" | "h4") {
	const AnchoredHeading = ({ children, ...props }: ComponentProps<"h2">) => {
		const id = slugifyNode(children);
		return (
			<Tag className="group scroll-mt-24" id={id} {...props}>
				<a
					aria-label="Link to this section"
					className="-ml-5 pr-1 text-muted-foreground no-underline opacity-0 transition-opacity duration-150 focus:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-40"
					href={`#${id}`}
				>
					#
				</a>
				{children}
			</Tag>
		);
	};
	return AnchoredHeading;
}

/**
 * Custom MDX component mapping used across posts and projects. Provides
 * deep-linkable headings, design-system links/images/tables, and a `Callout`
 * component for authored `.mdx`. Code blocks are highlighted by fumadocs (Shiki).
 * @param components - Components provided by the MDX runtime.
 * @returns The merged MDX component map.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		Callout,
		Accordion,
		AccordionItem,
		Divider,
		Details,
		Epigraph,
		Figure,
		Highlight,
		Kbd,
		Lead,
		LinkCard,
		PullQuote,
		Sidenote,
		CodeGroup,
		Terminal,
		Mermaid,
		Gallery,
		Tweet,
		Embed,
		Gist,
		Bookmark,
		Newsletter,
		FurtherReading,
		Share,
		Stat,
		StatGrid,
		Step,
		Steps,
		Tabbed,
		TechStack,
		Video,
		pre: CodeBlock,
		h2: anchoredHeading("h2"),
		h3: anchoredHeading("h3"),
		h4: anchoredHeading("h4"),
		a: ({ href, children, ...props }: ComponentProps<"a">) => {
			const url = href ?? "#";
			const external = EXTERNAL_URL.test(url);
			return (
				<Link
					className={external ? "link-external" : "link-default"}
					href={url}
					{...(external
						? { target: "_blank", rel: "noopener noreferrer" }
						: {})}
					{...props}
				>
					{children}
				</Link>
			);
		},
		img: ({ className, alt, ...props }: ComponentProps<"img">) => (
			// biome-ignore lint/performance/noImgElement: MDX authors provide plain markdown images without dimensions
			// biome-ignore lint/correctness/useImageSize: intrinsic size is unknown for authored markdown
			<img
				alt={alt ?? ""}
				className={cn("rounded-lg border border-border", className)}
				loading="lazy"
				{...props}
			/>
		),
		table: ({ className, ...props }: ComponentProps<"table">) => (
			<div className="w-full overflow-x-auto">
				<table
					className={cn("w-full border-collapse text-sm", className)}
					{...props}
				/>
			</div>
		),
	};
}
