import React from 'react';

export const Nav = () => (
    <header className='mb-14 sm:mb-24 flex justify-between items-center tracking-tight w-full'>
        <div className='flex flex-col items-start'>
            <a   
                href='/'
                className='mb-px inline-block font-medium no-underline'
            >
                Gabriel Fonseca
            </a>
            <p className='leading-none font-medium text-secondary'>
                Software Developer
            </p>
        </div>
    </header>
);