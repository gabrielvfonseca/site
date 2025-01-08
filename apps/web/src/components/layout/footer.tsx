import React from 'react';

export const Footer = () => (
    <footer className='mt-14 sm:mt-24 flex justify-between items-center tracking-tight w-full'>
        <p className='text-xs tracking-normal leading-none font-medium text-tertiary'>
            &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
    </footer>
);