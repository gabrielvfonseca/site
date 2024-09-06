
import React from 'react';

// Next
import Link from 'next/link';

// Config data
import { siteConfig } from '@/site.config';

// UI components
//import { Button } from './ui/button';

// Navbar component
export function Header(): JSX.Element {
    return (
        <header className='mb-14 sm:mb-24 flex justify-between items-center tracking-tight w-full'>
            <div className='flex flex-col items-start'>
                <Link   
                    href='/'
                    className='text-medium mb-px inline-block font-medium no-underline'
                >
                    {siteConfig.title}
                </Link>
                <span className='text-medium font-medium leading-none dark:text-zinc-400'>
                    Software Developer
                </span>
            </div>

            {
            //<Button
            //    size='sm'
            //    variant='outline'
            //    radius='md'
            //>
            //</header>    Menu
            //</Button>
            }
        </header>
    );
};