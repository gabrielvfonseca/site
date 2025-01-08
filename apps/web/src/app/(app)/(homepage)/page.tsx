import React, { Suspense } from 'react';

import Link from 'next/link';

import PostList from './_components/post-list';
import Newsletter from './_components/newsletter';

import Loading from './loading';

const Homepage = () => (
    <main>
        <p className='text-primary font-medium mb-4'>
            I'm a computer engineering student living in Lisbon, pt.
        </p>

        <p className='mb-4'>
            {`Hey, I'm Gabriel—a passionate `}
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
            {`I'm here to share my `}<a>journey</a>, <a>thoughts</a>, and <a>passions</a>{` with you.`}
        </p>

        <div className='flex flex-col gap-y-6 my-14'>
            <div className='font-medium'>Posts</div>
            <Suspense fallback={<Loading />}>
                <PostList />
            </Suspense>
        </div>

        <div className='flex flex-col gap-y-6'>
            <div className='font-medium'>Newsletter</div>
            <p>
                {`I'm currently working on a new project, which I'm excited `}
                {`to share with you soon. In the meantime, you can `}
                <span className='text-primary'>subscribe to my newsletter to receive updates</span> 
                {` on my progress.`}
            </p>
            <Newsletter />
        </div>
    </main>
);

export default Homepage;