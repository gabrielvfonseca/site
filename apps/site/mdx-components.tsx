import { Separator } from '@repo/design-system/components/ui/separator';
import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { highlight } from 'sugar-high';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const components = {
  h1: (props: HeadingProps) => (
    <h1 className="pb-4 font-medium text-primary" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="mt-4 pb-3 font-medium text-primary" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="mt-4 pb-2 font-medium text-primary" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="mt-4 pb-2 font-medium text-primary" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="mt-4 text-tertiary leading-snug" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol
      className="list-decimal space-y-2 py-2 pl-5 text-secondary"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul className="list-disc space-y-1 py-2 pl-5 text-secondary" {...props} />
  ),
  li: (props: ListItemProps) => (
    <li className="pl-1 text-tertiary" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  hr: () => <Separator />,
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium text-primary" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    if (href?.startsWith('/')) {
      return (
        <Link
          href={href}
          className="text-link hover:text-link-hover active:text-link-active"
          {...props}
        >
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a
          href={href}
          className="text-link hover:text-link-hover active:text-link-active"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-link hover:text-link-hover active:text-link-active"
        {...props}
      >
        {children}
      </a>
    );
  },
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre
      className="mt-4 overflow-x-auto rounded-lg border border-accent-2 bg-accent p-4 font-mono text-sm"
      {...props}
    />
  ),
  code: async ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHtml = highlight(children as string);
    return (
      <code
        className="flex rounded-lg border border-accent-2 bg-accent px-1 py-0.5 text-secondary"
        // biome-ignore lint: This is a valid MDX component
        dangerouslySetInnerHTML={{ __html: codeHtml }}
        {...props}
      />
    );
  },
  // biome-ignore lint: This is a valid MDX component
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-gray-300 border-l-3 pl-4 text-gray-700 dark:border-zinc-600 dark:text-zinc-300"
      {...props}
    />
  ),
};

declare global {
  type MdxProvidedComponents = typeof components;
}

// biome-ignore lint: This is a valid MDX component
export function useMDXComponents(): MdxProvidedComponents {
  return components;
}
