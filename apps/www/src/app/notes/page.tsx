import React, { Suspense } from "react";

// Next
import Link from "next/link";

// Contentlayer
import { allNotes } from 'contentlayer/generated';

// Fallback
import Fallback from '@components/fallback';

// Utils
import { formatDate } from "@utils/date";

// Types
import type { Notes as Note } from 'contentlayer/generated';

// Notes Page JSX component
export default function Page(): JSX.Element {
    return (
        <div className='flex flex-col gap-2'>
          <Suspense fallback={ <Fallback /> }>
            <ul className='space-y-4'>
              {
                allNotes.map((value: Note, index: number) => (
                    <Link 
                      key={`${index}-${value.title}`}
                      rel="noopener noreferrer" 
                      href={value.slug}
                      className="flex sm:items-center flex-col sm:flex-row gap-0.5 sm:gap-4 group"
                    >
                      <strong className="line-clamp-2 font-medium text-gray-1000 group-hover:text-primary group-hover:underline dark:text-gray-100">
                        {value.title}
                      </strong>
                      <span className="hidden sm:flex flex-1 border-t border-gray-500 border-dashed shrink dark:border-gray-800" />
                      <span className="flex-none dark:text-zinc-400">
                        {formatDate(value.date)}
                      </span>
                    </Link>
                  )
                )
              }
            </ul>
          </Suspense>
        </div>
    );
};