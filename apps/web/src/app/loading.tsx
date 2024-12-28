import React from 'react';

import Spinner from '@repo/design-system/components/spinner';

export default function Loading() {
    return (
        <div className='flex justify-center h-screen items-center w-full'>
            <Spinner />
        </div>
    );
}