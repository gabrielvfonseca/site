
import React from 'react';

// Next
import Link from 'next/link';

// Config data
import { siteConfig } from '@/config/site';

// Spotlight Component
import { Spotlight } from './spotlight';

// Navbar component
export function Header(): JSX.Element {
    return (
        <header className='mb-14 sm:mb-24 flex justify-between items-center tracking-tight w-full'>
            <div className='flex flex-col items-start'>
                <Link   
                    href='/'
                    className='text-medium mb-px text-gray-1000 inline-block font-medium no-underline'
                >
                    {siteConfig.title}
                </Link>
                <p className='leading-none opacity-80'>
                    Software Developer
                </p>
            </div>
            <Spotlight />
        </header>
    );
};