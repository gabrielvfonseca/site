import React from 'react';

const Nav = () => (
    <header className='mb-14 sm:mb-24 flex justify-between items-center tracking-tight w-full'>
        <div className='flex flex-col items-start'>
            <a   
                href='/'
                className='mb-px inline-block font-medium no-underline hover:text-primary'
            >
                Gabriel Fonseca
            </a>
            <p className='leading-none font-medium text-secondary'>
                Software Developer
            </p>
        </div>
    </header>
);

export default Nav;