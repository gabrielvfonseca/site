import React from 'react';

// Next
import Link from 'next/link';

// UI Components
import { Button } from '@components/ui/button';

// NotFound JSX component
export default function NotFound(): JSX.Element {
    // Return page component
    return (
        <section className='flex flex-col mb-20 sm:mb-32 justify-start items-start'>
            <span className='font-medium'>
                'Sometimes when you innovate, you make mistakes. 
                It is best to admit them quickly, and get on with 
                improving your other innovations.' — This page is 
                one of those mistakes.
            </span>

            <Link href='/'>
                <Button
                    variant='outline'
                    size='sm'
                    className='mt-8'
                >
                    Return
                </Button>
            </Link>
        </section>
    );
};