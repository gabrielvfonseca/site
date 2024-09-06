import React, { Suspense } from "react";

// Next
import Link from "next/link";

// Fallback
import Fallback from '@components/fallback';

// UI Components
import { Badge } from '@components/ui/badge';

// Notes Page JSX component
export default function Page(): JSX.Element {
    return (
        <div className='flex flex-col gap-2'>
          <Suspense fallback={ <Fallback /> }>
            <ul className='space-y-4'>
                {
                    [
                        {
                        title: 'Lava',
                        description: 'A new era for project development workflow.',
                        href: 'https://lava.dev'
                        },
                    ].map((value: { 
                        title: string; 
                        description: string; 
                        href: string; 
                    }, index: number) => (
                        <Link 
                            key={`${index}-${value.title}`}
                            rel="noopener noreferrer" 
                            href={value.href}
                            className="flex sm:items-center flex-col sm:flex-row gap-1 sm:gap-4 group"
                        >
                            <strong className="line-clamp-2 font-medium text-gray-1000 group-hover:text-primary group-hover:underline dark:text-gray-100">
                                {value.title}
                            </strong>
                            <span className="hidden sm:flex flex-1 border-t border-gray-500 border-dashed shrink dark:border-gray-800" />
                            <span className="flex-none dark:text-zinc-400">
                                {value.description}
                            </span>
                            <Badge variant='default' size='sm'>
                                Building
                            </Badge>
                        </Link>
                        )
                    )
                }
            </ul>
          </Suspense>

        </div>
    );
};