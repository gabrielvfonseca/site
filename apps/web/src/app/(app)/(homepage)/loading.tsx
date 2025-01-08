import React from 'react';

import { Skeleton } from '@repo/design-system/components/ui/skeleton';

// Post loading fallback 
const Loading = () => (
    <div className='flex flex-col gap-y-2'>
        {
            Array.from({ length: 3 }).map((_, index: number) => (
                <Skeleton key={index} className='h-4 w-full' />
            ))
        }
    </div>
);

export default Loading;