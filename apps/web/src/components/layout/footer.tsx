import React from 'react';

import Link from 'next/link';

const Footer = () => (
    <footer className='mt-14 sm:mt-24 flex justify-between items-center tracking-tight w-full'>
        <p className='text-xs tracking-normal leading-none font-medium text-tertiary'>
            &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
        <nav className='flex flex-row gap-x-2 text-xs tracking-normal leading-none font-medium'>
            <Link 
                target='_blank' 
                href='https://x.com/gabfon_'
                className='text-quaternary hover:text-secondary'
            >
                Twitter
            </Link>
            <Link 
                target='_blank' 
                href='https://www.instagram.com/gabrielvnfonseca/'
                className='text-quaternary hover:text-secondary'
            >
                IG
            </Link>
            <Link 
                target='_blank' 
                href='https://www.linkedin.com/in/gabrielvfonseca/'
                className='text-quaternary hover:text-secondary'
            >
                LinkedIn
            </Link>
        </nav>
    </footer>
);

export default Footer;