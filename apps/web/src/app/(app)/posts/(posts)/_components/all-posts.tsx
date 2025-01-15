import React from 'react';

import Link from 'next/link';

import { allPosts, type Post } from '@posts';

import PostCard from '@/components/blog/post-card';

const AllPosts = () => {
    if (allPosts.length <= 0) {
        return (
            <p className='text-secondary font-medium text-md leading-none'>
                Could not retrieve any posts...
            </p>
        );
    };

    return (
        <ul className='flex flex-col gap-2'>
            {
                allPosts
                    .sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((post: Post) => (
                        <Link
                            key={post._id}
                            href={post.slug}
                            className='border-border'
                        >
                            <PostCard {...post} />
                        </Link>
                ))
            }
        </ul>
    );
};

export default AllPosts;