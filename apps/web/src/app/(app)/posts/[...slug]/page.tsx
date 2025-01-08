import React from 'react';

import { notFound } from 'next/navigation';

import { allPosts, type Post } from '@contentlayer';

import { constructMetadata } from '@repo/seo/metadata';

import { Metadata } from 'next';

import BlogPost from './_components/blog-post';

type PostProps = {
    params: {
        slug: string[];
    };
};

export default async function Page ({ params }: PostProps) {
    const post = await getPostFromParams(params);

    if (!post) notFound();

    return <BlogPost {...post} />;
};


const getPostFromParams = async (params: PostProps['params']) => {
    const slug = params?.slug?.join('/');
    const post = allPosts.find((post: Post) => post.slugAsParams === slug);
    if (!post) null;
    return post;
};

export const generateMetadata = async ({ params }: PostProps): Promise<Metadata> => {
    const post = await getPostFromParams(params);

    if (!post) return {};

    return constructMetadata({
        title: `${post.title} | Gabriel Fonseca`,
        description: post.description,
        image: post.image,
    });
};

export const generateStaticParams = async (): Promise<PostProps['params'][]> => {
    return allPosts.map((post: Post) => ({
        slug: post.slugAsParams.split('/'),
    }));
};