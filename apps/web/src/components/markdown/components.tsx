import React, { ComponentPropsWithoutRef } from 'react';

import Image from 'next/image';

import { AspectRatio } from '@repo/design-system/components/ui/aspect-ratio';

import { highlight } from 'sugar-high';

import type { MDXComponents } from 'mdx/types';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

export const components: MDXComponents = {
  h1: (props: HeadingProps) => <h1 {...props} />,
  h2: (props: HeadingProps) => <h2 {...props} />,
  h3: (props: HeadingProps) => <h3 {...props} />,
  h4: (props: HeadingProps) => <h4 {...props} />,
  h5: (props: HeadingProps) => <h5 {...props} />,
  h6: (props: HeadingProps) => <h6 {...props} />,
  p: (props: ParagraphProps) => <p {...props} />,
  hr: () => <hr />,
  ol: (props: ListProps) => <ol {...props} />,
  ul: (props: ListProps) => <ul {...props} />,
  li: (props: ListItemProps) => <li {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => <em {...props} />,
  strong: (props: ComponentPropsWithoutRef<'strong'>) => <strong {...props} />,
  a: ({ href, children, ...props }: AnchorProps) => {
    if (href?.startsWith('/')) {
      return (
        <a 
          href={href} 
          {...props}
        >
          {children}
        </a>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a 
          href={href} 
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
        {...props}
      >
        {children}
      </a>
    );
  },
  Image: ({ src, alt, ratio }) => (
    <AspectRatio 
      ratio={ratio ? ratio : 16 / 9} 
      className='bg-accent rounded-md'
    >
      <Image 
        src={src as string}
        alt={alt as string} 
        fill
        className='rounded-md object-cover' 
      />
    </AspectRatio>
  ),
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return (
      <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
    );
  },
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
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700"
      {...props}
    />
  ),
};

export function useMDXComponents(
  otherComponents: MDXComponents,
): MDXComponents {
  return {
    ...otherComponents,
    ...components,
  };
}