import React from 'react';
import Link from 'next/link';
import { PostCard } from '@/features/posts/card';

export default function Homepage() {
    return (
        <div className='flex flex-col gap-6'>
            <div className='flex flex-col'>
                <p className='text-primary-foreground font-medium mb-4'>
                    I'm a computer engineering student living in Lisbon, pt.
                </p>

                <p className='mb-4'>
                    {`Hey, I'm Gabriel — a passionate `}
                    <a href='https://github.com/gabrielvfonseca'>developer</a>{`, `}
                    <a href='https://github.com/gabrielvfonseca'>computer engineering student</a>{`, `}
                    {`and the Founder and CEO of `}
                    <Link href='https://trysequence.co' className='text-primary'>Sequence</Link>.
                </p>

                <p className='mb-4'>
                    {`I'm also on a journey to complete my Computer Engineering degree at the `}
                    <a href='https://www.fct.unl.pt'>NOVA School of Science and Technology</a> 
                    {` in Almada, Portugal.`}
                </p>

                <p className='mb-4'>
                    {`Sure, I might sound like your typical tech `}<s>enthusiast</s>{` nerd — and that's fine.`}
                    {`I'm here to share my `}<a>journey</a>{`, `}
                    <a href='/posts'>thoughts</a>, and <a href='/posts'>passions</a>{` with you.`}
                </p>
            </div>

            <div className='flex flex-col gap-6'>
                <span className='font-medium'>Posts</span>
                <ul className='flex flex-col gap-4'>
                    {
                        [
                            {
                                title: 'Post 1',
                                description: 'Description 1',
                                slug: 'post-1',
                                date: '2021-01-01'
                            },
                            {
                                title: 'Post 2',
                                description: 'Description 2',
                                date: '2021-01-02',
                                slug: 'post-2'
                            }
                        ].map((post) => (
                            <PostCard {...post} />
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}