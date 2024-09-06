import React from 'react';

// UI Components
import { Skeleton } from '@components/ui/skeleton';

// Fallback Component exported as default
export default function Fallback() {
    return (
        <div className='flex flex-col space-y-4'>
            <Skeleton className="h-2.5 w-[20rem] rounded-full" />
            <Skeleton className="h-2.5 w-[12rem] rounded-full" />
        </div>
    );
};