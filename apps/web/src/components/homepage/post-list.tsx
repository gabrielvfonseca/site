import React from 'react';

import Link from 'next/link';

import { formatDate } from '@repo/design-system/lib/utils';

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@repo/design-system/components/ui/card";

import { Badge } from "@repo/design-system/components/ui/badge";

import { allPosts, type Post } from '@contentlayer';

export const PostList = () => (
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
                        <Card className='relative'>
                            <CardContent className='w-2/3'>
                                <CardTitle>
                                    {post.title}
                                </CardTitle>
                                <CardDescription>
                                    {post.description}
                                </CardDescription>
                            </CardContent>
                            <Badge
                                variant='outline'
                                className='absolute top-2 right-2'
                            >
                                {formatDate(post.date)}
                            </Badge>
                        </Card>
                    </Link>
            ))
        }
    </ul>
);