import React from 'react';

import { formatDate } from '@repo/design-system/lib/utils';

import { allPosts, type Post } from '@contentlayer';

export const PostList = () => (
    <ul className='flex flex-col gap-2'>
        {
            allPosts
                .sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((post: Post) => (
                    <a
                        key={post._id}
                        rel='noopener noreferrer' 
                        href={post.slug}
                        className='flex sm:items-center flex-col sm:flex-row gap-0.5 sm:gap-4 group'
                    >
                        <span className='line-clamp-2 text-primary group-hover:text-blue-800'>
                            {post.title}
                        </span>
                        <span className='hidden sm:flex flex-1 border-t border-1 border-dashed shrink' />
                        <span className='font-mono text-[16px] flex-none text-md text-tertiary'>
                            {formatDate(post.date)}
                        </span>
                    </a>
            ))
        }
    </ul>
);