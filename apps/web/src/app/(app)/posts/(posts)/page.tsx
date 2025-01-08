import React, { Suspense } from 'react';

import AllPosts from './_components/all-posts';

import Loading from './loading';

const Postspage = () => (
    <main className='flex flex-col gap-y-6 my-14'>
        <div className='font-medium'>Posts</div>
        <Suspense fallback={<Loading />}>
            <AllPosts />
        </Suspense>
    </main>
);

export default Postspage;