import React from 'react';

// Components
import Spinner from '@site/ui/spinner';

// Loading JSX component
export default function Loading(): JSX.Element {
    return (
        <div className='flex justify-center items-center h-screen w-full'>
            <Spinner size='md' />
        </div>
    );
};