import React from 'react';

// UI Components
import { Skeleton } from '@components/ui/skeleton';

// Fallback Component exported as default
export default function Fallback() {
    return (
        <Skeleton className="px-3 py-3 w-full h-[68px] rounded-md" />
    );
};