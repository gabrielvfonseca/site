import { Separator } from '@gabfon/design-system/components/separator';
import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

// Define prop types for each supported HTML element for type safety and clarity
type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;
type TableProps = ComponentPropsWithoutRef<'table'>;
type TableHeadProps = ComponentPropsWithoutRef<'thead'>;
type TableBodyProps = ComponentPropsWithoutRef<'tbody'>;
type TableRowProps = ComponentPropsWithoutRef<'tr'>;
type TableCellProps = ComponentPropsWithoutRef<'td'>;
type TableHeaderProps = ComponentPropsWithoutRef<'th'>;

// Interface for the MDX components mapping
export interface MdxComponents {
  h1: (props: HeadingProps) => ReactNode;
  h2: (props: HeadingProps) => ReactNode;
  h3: (props: HeadingProps) => ReactNode;
  h4: (props: HeadingProps) => ReactNode;
  h5: (props: HeadingProps) => ReactNode;
  h6: (props: HeadingProps) => ReactNode;
  p: (props: ParagraphProps) => ReactNode;
  ol: (props: ListProps) => ReactNode;
  ul: (props: ListProps) => ReactNode;
  li: (props: ListItemProps) => ReactNode;
  em: (props: ComponentPropsWithoutRef<'em'>) => ReactNode;
  hr: () => ReactNode;
  strong: (props: ComponentPropsWithoutRef<'strong'>) => ReactNode;
  a: (props: AnchorProps) => ReactNode;
  pre: (props: ComponentPropsWithoutRef<'pre'>) => ReactNode;
  code: (props: ComponentPropsWithoutRef<'code'>) => ReactNode;
  table: (props: TableProps) => ReactNode;
  thead: (props: TableHeadProps) => ReactNode;
  tbody: (props: TableBodyProps) => ReactNode;
  tr: (props: TableRowProps) => ReactNode;
  th: (props: TableHeaderProps) => ReactNode;
  td: (props: TableCellProps) => ReactNode;
  blockquote: (props: BlockquoteProps) => ReactNode;
  tableComponent: (props: {
    data: { headers: string[]; rows: string[][] };
  }) => ReactNode;
}

/**
 * MDX components mapping for custom rendering of markdown elements.
 * Each key corresponds to an HTML tag or legacy component used in MDX content.
 */
export const components: MdxComponents = {
  // Headings
  h1: (props: HeadingProps) => (
    <h1 className="pb-4 font-medium text-primary text-xl" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="mt-6 pb-3 font-medium text-lg text-primary" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="mt-5 pb-2 font-medium text-lg text-primary" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="mt-4 pb-2 font-medium text-md text-primary" {...props} />
  ),
  h5: (props: HeadingProps) => (
    <h5 className="mt-4 pb-2 font-medium text-md text-primary" {...props} />
  ),
  h6: (props: HeadingProps) => (
    <h6
      className="mt-4 pb-2 font-medium font-normal text-md text-primary"
      {...props}
    />
  ),
  // Paragraph
  p: (props: ParagraphProps) => (
    <p className="mt-4 text-tertiary leading-relaxed" {...props} />
  ),
  // Ordered list
  ol: (props: ListProps) => (
    <ol
      className="list-decimal space-y-2 py-2 pl-6 text-tertiary leading-relaxed"
      {...props}
    />
  ),
  // Unordered list
  ul: (props: ListProps) => (
    <ul
      className="list-disc space-y-2 py-2 pl-6 text-tertiary leading-relaxed"
      {...props}
    />
  ),
  // List item
  li: (props: ListItemProps) => (
    <li className="text-tertiary leading-relaxed" {...props} />
  ),
  // Emphasis
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium text-secondary" {...props} />
  ),
  // Horizontal rule using the design system Separator
  hr: () => <Separator className="my-6" />,
  // Strong/bold text
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium text-primary" {...props} />
  ),
  // Anchor/link handling
  a: ({ href, children, ...props }: AnchorProps) => {
    // Internal links (relative to site root) use Next.js Link for client-side navigation
    if (href?.startsWith('/')) {
      return (
        <Link
          className="text-link transition-colors duration-200 hover:text-link-hover active:text-link-active"
          href={href}
          {...props}
        >
          {children}
        </Link>
      );
    }
    // Anchor links (in-page navigation)
    if (href?.startsWith('#')) {
      return (
        <a
          className="text-link transition-colors duration-200 hover:text-link-hover active:text-link-active"
          href={href}
          {...props}
        >
          {children}
        </a>
      );
    }
    // External links open in a new tab with security attributes
    return (
      <a
        className="text-link transition-colors duration-200 hover:text-link-hover active:text-link-active"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        {...props}
      >
        {children}
      </a>
    );
  },
  // Preformatted/code block
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre
      className="mt-4 overflow-x-auto rounded-lg border border-accent-2 bg-accent-1 p-4 font-mono text-secondary text-sm"
      {...props}
    />
  ),
  // Inline code
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    return (
      <code
        className="rounded-md border border-accent-2 bg-accent-1 px-1.5 py-0.5 font-mono text-secondary text-xs"
        {...props}
      >
        {children}
      </code>
    );
  },
  // Table wrapper for horizontal scrolling
  table: (props: TableProps) => (
    <div className="mt-4 overflow-x-auto">
      <table
        className="w-full border-collapse rounded-lg border border-accent-2"
        {...props}
      />
    </div>
  ),
  // Table head
  thead: (props: TableHeadProps) => (
    <thead className="bg-accent-1" {...props} />
  ),
  // Table body
  tbody: (props: TableBodyProps) => <tbody {...props} />,
  // Table row
  tr: (props: TableRowProps) => (
    <tr className="border-accent-2 border-b last:border-b-0" {...props} />
  ),
  // Table header cell
  th: (props: TableHeaderProps) => (
    <th
      className="px-4 py-3 text-left font-medium text-primary text-sm"
      {...props}
    />
  ),
  // Table cell
  td: (props: TableCellProps) => (
    <td className="px-4 py-3 text-sm text-tertiary" {...props} />
  ),
  // Blockquote
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="mt-4 border-accent-3 border-l-4 pl-4 text-tertiary italic"
      {...props}
    />
  ),
  // Legacy Table component for backwards compatibility with old MDX content
  tableComponent: ({
    data,
  }: {
    data: { headers: string[]; rows: string[][] };
  }) => (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse rounded-lg border border-accent-2">
        <thead className="bg-accent-1">
          <tr>
            {data.headers.map((header, index) => (
              <th
                className="px-4 py-3 text-left font-medium text-primary text-sm"
                key={index}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr
              className="border-accent-2 border-b last:border-b-0"
              key={index}
            >
              {row.map((cell, cellIndex) => (
                <td className="px-4 py-3 text-sm text-tertiary" key={cellIndex}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

// Type for the provided MDX components mapping
type MdxProvidedComponents = MdxComponents;

// Export a hook for MDXProvider to access the components mapping
// biome-ignore lint: This is a valid MDX component
export function useMDXComponents(): MdxProvidedComponents {
  return components;
}
