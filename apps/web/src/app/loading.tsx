import React from 'react';

import Spinner from '@repo/design-system/components/spinner';

// Routes loading fallback 
const Loading = () => (
    <div className='flex justify-center items-center w-full'>
        <Spinner />
    </div>
);

export default Loading;