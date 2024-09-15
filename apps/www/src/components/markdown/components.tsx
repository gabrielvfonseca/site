import React, { ComponentPropsWithoutRef } from 'react';

// Next Image
import Image from 'next/image';

// Link
import { Link } from 'next-view-transitions';

// UI Components
import { AspectRatio } from '../ui/aspect-ratio';

// Sugar
import { highlight } from 'sugar-high'

// Types
import type { MDXComponents } from 'mdx/types';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

// Components
export const components: MDXComponents = {
  h1: (props: HeadingProps) => (
    <h1 className="font-bold pt-12 mb-0 fade-in" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="font-medium mt-8 mb-3" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="font-medium mt-8 mb-3" {...props} />
  ),
  h4: (props: HeadingProps) => <h4 className="font-medium" {...props} />,
  p: (props: ParagraphProps) => (
    <p className="leading-normal tracking-normal" {...props} />
  ),
  hr: () => <hr className="border-gray-400 dark:border-gray-1000 my-8" />,
  ol: (props: ListProps) => (
    <ol className="list-decimal pl-5 space-y-2" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="list-disc pl-5 space-y-1" {...props} />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium text-black dark:text-white" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = 'text-blue-500 hover:text-blue-700';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  Image: ({ src, alt, ratio }) => (
    <AspectRatio 
      ratio={ratio ? ratio : 16 / 9} 
      className='text-black dark:text-white bg-gray-200 dark:bg-gray-1200 rounded-md'
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
      <code 
        className='font-serif text-black dark:text-white border border-gray-300 dark:border-gray-1000 bg-gray-200 dark:bg-gray-1200 rounded-md text-xs'
        dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} 
      />
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