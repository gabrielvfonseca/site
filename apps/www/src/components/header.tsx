
import React from 'react';

// Next
import Link from 'next/link';

// Config data
import { siteConfig } from '@config/site';

// UI components
//import { Button } from './ui/button';

// Navbar component
export default function Header(): JSX.Element {
    return (
        <header className='mb-20 sm:mb-32 flex justify-between items-center tracking-tight w-full'>
            <div className='flex flex-col items-start'>
                <Link   
                    href='/'
                    className='text-medium mb-px inline-block font-medium no-underline'
                >
                    {siteConfig.title}
                </Link>
                <span className='text-medium font-medium leading-none text-zinc-500'>
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