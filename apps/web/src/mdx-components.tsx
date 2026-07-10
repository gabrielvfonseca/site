import {
  LINK_CLASS,
  LINK_EXTERNAL_CLASS,
} from '@gabfon/design-system/lib/constants';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { Accordion, AccordionItem } from '@/components/mdx/accordion';
import { Callout } from '@/components/mdx/callout';
import { CodeBlock } from '@/components/mdx/code-block';
import { Divider } from '@/components/mdx/divider';
import { Figure } from '@/components/mdx/figure';
import { Kbd } from '@/components/mdx/kbd';
import { LinkCard } from '@/components/mdx/link-card';
import { PullQuote } from '@/components/mdx/pull-quote';
import { Stat, StatGrid } from '@/components/mdx/stat';
import { Step, Steps } from '@/components/mdx/steps';
import { Tabbed } from '@/components/mdx/tabbed';
import { TechStack } from '@/components/mdx/tech-stack';
import { Video } from '@/components/mdx/video';
import { cn } from '@/lib/utils';

/** Matches absolute http(s) URLs (external links). */
const EXTERNAL_URL = /^https?:\/\//;
/** Characters stripped when slugifying heading text. */
const NON_SLUG_CHARS = /[^\w\s-]/g;
/** Runs of whitespace collapsed to a single hyphen. */
const WHITESPACE = /\s+/g;

/** Flatten MDX heading children to plain text for slug generation. */
function toText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(toText).join('');
  }
  if (node && typeof node === 'object' && 'props' in node) {
    return toText(
      (node as { props?: { children?: ReactNode } }).props?.children
    );
  }
  return '';
}

/** GitHub-style slug from heading text, used as a deep-link id. */
function slugify(node: ReactNode): string {
  return toText(node)
    .toLowerCase()
    .trim()
    .replace(NON_SLUG_CHARS, '')
    .replace(WHITESPACE, '-');
}

/** Factory for deep-linkable headings (adds a slug `id` for `#anchor` links). */
function anchoredHeading(Tag: 'h2' | 'h3' | 'h4') {
  const AnchoredHeading = ({ children, ...props }: ComponentProps<'h2'>) => (
    <Tag className="scroll-mt-24" id={slugify(children)} {...props}>
      {children}
    </Tag>
  );
  return AnchoredHeading;
}

/**
 * Custom MDX component mapping used across posts and projects. Provides
 * deep-linkable headings, design-system links/images/tables, and a `Callout`
 * component for authored `.mdx`. Code blocks are highlighted by fumadocs (Shiki).
 * @param components - Components provided by the MDX runtime.
 * @returns The merged MDX component map.
 */
// biome-ignore lint/style/useNamingConvention: Next.js expects this exact name for MDX component mapping
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // biome-ignore lint/style/useNamingConvention: MDX components are referenced by PascalCase names in .mdx
    Callout,
    // biome-ignore lint/style/useNamingConvention: MDX components are referenced by PascalCase names in .mdx
    Accordion,
    // biome-ignore lint/style/useNamingConvention: MDX components are referenced by PascalCase names in .mdx
    AccordionItem,
    // biome-ignore lint/style/useNamingConvention: MDX components are referenced by PascalCase names in .mdx
    Divider,
    // biome-ignore lint/style/useNamingConvention: MDX components are referenced by PascalCase names in .mdx
    Figure,
    // biome-ignore lint/style/useNamingConvention: MDX components are referenced by PascalCase names in .mdx
    Kbd,
    // biome-ignore lint/style/useNamingConvention: MDX components are referenced by PascalCase names in .mdx
    LinkCard,
    // biome-ignore lint/style/useNamingConvention: MDX components are referenced by PascalCase names in .mdx
    PullQuote,
    // biome-ignore lint/style/useNamingConvention: MDX components are referenced by PascalCase names in .mdx
    Stat,
    // biome-ignore lint/style/useNamingConvention: MDX components are referenced by PascalCase names in .mdx
    StatGrid,
    // biome-ignore lint/style/useNamingConvention: MDX components are referenced by PascalCase names in .mdx
    Step,
    // biome-ignore lint/style/useNamingConvention: MDX components are referenced by PascalCase names in .mdx
    Steps,
    // biome-ignore lint/style/useNamingConvention: MDX components are referenced by PascalCase names in .mdx
    Tabbed,
    // biome-ignore lint/style/useNamingConvention: MDX components are referenced by PascalCase names in .mdx
    TechStack,
    // biome-ignore lint/style/useNamingConvention: MDX components are referenced by PascalCase names in .mdx
    Video,
    pre: CodeBlock,
    h2: anchoredHeading('h2'),
    h3: anchoredHeading('h3'),
    h4: anchoredHeading('h4'),
    a: ({ href, children, ...props }: ComponentProps<'a'>) => {
      const url = href ?? '#';
      const external = EXTERNAL_URL.test(url);
      return (
        <Link
          className={external ? LINK_EXTERNAL_CLASS : LINK_CLASS}
          href={url}
          {...(external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          {...props}
        >
          {children}
        </Link>
      );
    },
    img: ({ className, alt, ...props }: ComponentProps<'img'>) => (
      // biome-ignore lint/performance/noImgElement: MDX authors provide plain markdown images without dimensions
      // biome-ignore lint/nursery/useImageSize: intrinsic size is unknown for authored markdown
      <img
        alt={alt ?? ''}
        className={cn('rounded-lg border border-border', className)}
        loading="lazy"
        {...props}
      />
    ),
    table: ({ className, ...props }: ComponentProps<'table'>) => (
      <div className="my-6 w-full overflow-x-auto">
        <table
          className={cn('w-full border-collapse text-sm', className)}
          {...props}
        />
      </div>
    ),
  };
}
