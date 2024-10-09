import React, { Suspense } from "react";

// Next
import Link from "next/link";

// Contentlayer
import { allNotes } from '@contentlayer';

// Fallback
import Fallback from '@components/fallback';

// Utils
import { formatDate } from "@utils/date";

// Types
import type { Notes as Note } from '@contentlayer';

// Construct metadata
import { constructMetadata } from "@utils/metadata";

// Configuration siteConfig
import { siteConfig } from "@/site.config";

// Metadata
export const metadata = constructMetadata({
  title: `Notes | ${siteConfig.title}`,
  description: 'A collection of notes on various topics, from software engineering to personal development.',
});

// Notes Page JSX component
export default function Page(): JSX.Element {
  return (
    <Suspense fallback={ <Fallback /> }>
      <ul className='space-y-4'>
        {
          allNotes
            .sort((a: Note, b: Note) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((value: Note, index: number) => (
              <Link 
                key={`${index}-${value.title}`}
                rel="noopener noreferrer" 
                href={value.slug}
                className="flex sm:items-center flex-col sm:flex-row gap-0.5 sm:gap-4 group"
              >
                <strong className="line-clamp-2 font-medium text-gray-1000 group-hover:text-primary group-hover:underline">
                  {value.title}
                </strong>
                <span className="hidden sm:flex flex-1 border-t border-gray-500 border-dashed shrink" />
                <span className="flex-none text-gray-800">
                  {formatDate(value.date)}
                </span>
              </Link>
            )
          )
        }
      </ul>
    </Suspense>
  );
};