import React, { Suspense } from 'react';

// Next
import Image from 'next/image';

// Navigation
import { notFound } from 'next/navigation';

// MDX
import MDX from '@/components/markdown';

// UI Components
import { AspectRatio } from '@site/ui/aspect-ratio';

// Config
import { siteConfig } from '@/config/site';

// Contentlayer
import { allNotes } from '@contentlayer';

// Loading fallback
import Loading from './loading';

// Utils
import { formatDate, howLongAgo } from '@/utils/date';

// Construct metadata
import { constructMetadata } from '@/utils/metadata';

// Types
import type { Metadata } from 'next';

interface NoteProps {
  params: {
    slug: string[];
  }; // Slug params
};

// Note JSX component
export default async function Page ({ params }: NoteProps) {
  // Retrieve the note from the params
  const note = await getnoteFromParams(params);

  // If the note does not exist, return a 404 page
  if (!note) {
    notFound();
  };

  // Return page component
  return (
    <Suspense fallback={ <Loading /> }>
      <div className={note.image ? '' : 'mb-8'}>
        <h1 className='mb-4 max-w-md text-lg'>
          {note.title}
        </h1>

        <div className='flex justify-between items-center w-full'>          
          <p className='text-sm font-normal'>
            {formatDate(note.date)} ({howLongAgo(note.date)})
          </p>
        </div>
      </div>

      {
        note.image && (
          <div className='w-full my-16 sm:scale-105'>
            <AspectRatio ratio={16 / 9}>
              <Image 
                src={note.image} 
                alt='Image' 
                className='rounded-md object-cover' 
                fill
              />
            </AspectRatio>
          </div>
        )
      }
      
      <MDX code={note.body.code} />
    </Suspense>
  );
};


// Retrieve the note from the params
async function getnoteFromParams(params: NoteProps['params']) {
  // Retrieve the slug from the params
  const slug = params?.slug?.join('/');
  // Find the note with the matching slug
  const note = allNotes.find((note) => note.slugAsParams === slug);
  // If the note does not exist, return null
  if (!note) {
      null;
  };
  // Return the note
  return note;
};

// Generate the metadata for the note
export async function generateMetadata({
params,
}: NoteProps): Promise<Metadata> {
  // Retrieve the note from the params
  const note = await getnoteFromParams(params);

  // If the note does not exist, return an empty object
  if (!note) {
    return {};
  };

  // Return the metadata for the note
  return constructMetadata({
    title: `${note.title} | ${siteConfig.title}`,
    description: note.description,
    image: note.image,
  });
};

// Generate the static params for the note
export async function generateStaticParams(): Promise<NoteProps['params'][]> {
  // Return the params for all the notes
  const params = allNotes.map((note) => ({
    slug: note.slugAsParams.split('/'),
  }));

  // Return
  return params;
};