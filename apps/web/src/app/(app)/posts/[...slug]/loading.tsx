import React from 'react';

import { Skeleton } from '@repo/design-system/components/ui/skeleton';

export default function Loading() {
    return (
        <div className='flex flex-col gap-y-4 w-full'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-4/5' />
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-2/5' />
        </div>
    );
}