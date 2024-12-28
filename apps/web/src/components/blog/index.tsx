'use client';

import { MDX } from '@/components/markdown';

import type { Post } from '@contentlayer';

export default function BlogPost(post: Post) {  
    return (
        <main>
            <div className='font-semibold mb-4 text-primary'>
                {post.title}
            </div>
            <article className='prose'>
                <MDX code={post.body.code} />
            </article>
        </main>
    );
};