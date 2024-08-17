import React, { FC } from 'react';

// Next
import Link from 'next/link';

// Icons
import { ArrowUpRight } from 'lucide-react';

// Types
import type { LinkProps } from 'next/link';

type CardProps = {
    title: string;
    description: string;
    href: string;
    arrow?: boolean;
} & LinkProps & Partial<HTMLAnchorElement>;


// Card Component
const Card: FC<CardProps> = (props) => (
    <Link
        className='group -mx-3 flex justify-between items-start rounded-md px-3 py-3 no-underline hover:bg-gray-300/60 dark:hover:bg-gray-900' 
        target={props.target}
        {...props as LinkProps}
    >
        <p className='flex flex-col'>
            <span className='text-black mb-px dark:text-white'>{props.title}</span>
            <span className='text-gray-500 dark:text-zinc-400'>
                {props.description}
            </span>
        </p>

        {props.target === '_blank' && (
            <ArrowUpRight 
                className='group-hover:opacity-90' 
                size={16} 
            />
        )}
    </Link>   
);

// Display Name for Card Component
Card.displayName = 'Card';

// Export
export { Card };