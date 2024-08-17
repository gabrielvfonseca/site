import React from 'react';

// Next
import Image from 'next/image';
import Link from 'next/link';

// UI Components
import { Separator } from '@components/ui/separator';
import { AspectRatio } from '@components/ui/aspect-ratio';
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area';
import { Button } from '@components/ui/button';

// Types
import type { MDXComponents } from 'mdx/types';

// Markdown Components
export const components: MDXComponents = {
    h1: (props) => (
        <h1 {...props} className='text-xl mt-10 mb-4'>
            {props.children}
        </h1>
    ),
    h2: (props) => (
        <h2 {...props} className='text-lg mt-10 mb-3'>
            {props.children}
        </h2>
    ),
    h3: (props) => (
        <h3 {...props} className='text-md mt-10 mb-4'>
            {props.children}
        </h3>
    ),
    h4: (props) => (
        <h4 {...props} className='text-md mt-10 mb-2'>
            {props.children}
        </h4>
    ),
    h5: (props) => (
        <h5 {...props} className='text-sm mt-10 mb-2'>
            {props.children}
        </h5>
    ),
    h6: (props) => (
        <h6 {...props} className='text-xs mt-10 mb-2'>
            {props.children}
        </h6>
    ),
    p: (props) => (
        <p {...props} className='mt-2 mb-4'>
            {props.children}
        </p>
    ),
    strong: (props) => (
        <strong {...props} className='font-semibold text-zinc-800 dark:text-zinc-200'>
            {props.children}
        </strong>
    ),
    em: (props) => (
        <em {...props} className='italic text-zinc-500 dark:text-zinc-400'>
            {props.children}
        </em>
    ),
    blockquote: (props) => (
        <blockquote {...props} className='border-l-4 border-gray-200 pl-4 italic my-4'>
            {props.children}
        </blockquote>
    ),
    ul: (props) => (
        <ul {...props} className='list-disc list-inside mb-4'>
            {props.children}
        </ul>
    ),
    ol: (props) => (
        <ol {...props} className='list-decimal list-inside mb-4'>
            {props.children}
        </ol>
    ),
    li: (props) => (
        <li {...props} className='mb-2'>
            {props.children}
        </li>
    ),
    pre: (props) => (
        <pre {...props} className='bg-gray-100 p-2 rounded-md overflow-auto'>
            {props.children}
        </pre>
    ),
    hr: (props) => (
        <Separator className='mt-10' />
    ),
    Image: ({ src, alt, ratio }) => (
        <AspectRatio 
            ratio={ratio ? ratio : 16 / 9} 
            className='border border-gray-400 dark:border-gray-800 rounded-lg bg-gray-100 dark:bg-gray-1000 mb-10'
        >
            <Image 
                src={src as string}
                alt={alt as string} 
                fill
                className='rounded-md object-cover' 
            />
        </AspectRatio>
    ),
    code: ({ children, ...props }) => {
        return (
            <ScrollArea className='w-xl text-sm border border-gray-200 dark:border-gray-800 bg-gray-200 dark:bg-gray-900 rounded-lg p-4 mb-4'>
                <code {...props}>{children}</code>
                <ScrollBar orientation='horizontal' />
            </ScrollArea>
    )},
    table: (props) => (
        <table {...props} className='w-full border-collapse border-gray-300 my-4'>
            {props.children}
        </table>
    ),
    thead: (props) => (
        <thead {...props} className='bg-gray-100 border-b border-gray-300'>
            {props.children}
        </thead>
    ),
    tbody: (props) => (
        <tbody {...props} className='divide-y divide-gray-300'>
            {props.children}
        </tbody>
    ),
    th: (props) => (
        <th {...props} className='px-6 py-3 text-left font-semibold text-gray-800'>
            {props.children}
        </th>
    ),
    td: (props) => (
        <td {...props} className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
            {props.children}
        </td>
    ),
    a: ({ href, target, children }) => (
        <Link 
            href={href as string} 
            target={target as string}
            className='hover:text-blue-500'
        >
            {children}
        </Link>
    ),
    Button: ({ children, ...props }) => (
        <Button
            variant='default'
            size='sm'
            {...props}
        >
            {children}
        </Button>
    ),
    i: ({ className, ...props }) => (
        <i 
            className={`font-editorial italic ${className}`}
            {...props}
        />
    ),
};
