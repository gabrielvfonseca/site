import React, { Suspense } from 'react';

// Next
import Image from 'next/image';
import { notFound } from 'next/navigation';

// MDX
import MDX from '@components/markdown';

// UI Components
import { AspectRatio } from '@components/ui/aspect-ratio';

// Config
import { siteConfig } from '@config/site';

// Subscribe
import Subscribe from '@components/forms/subscribe';

// Contentlayer
import { allNotes } from 'contentlayer/generated';

// Loading fallback
import Loading from './loading';

// Utils
import { formatDate, howLongAgo } from '@utils/date';

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
    <section className='flex flex-col'>
      <Suspense fallback={ <Loading /> }>

        <div className={note.image ? '' : 'mb-8'}>
          <h1 className='mb-4 text-md'>
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
        
        <div>
          <MDX code={note.body.code} />
        </div>
        <div className='mb-8 mt-8 sm:mt-10'>
        <h2 className='block mb-4 text-md'>
          More notes like this
        </h2>

        <p className='mb-8'>
          I began writing these notes to share insights on software 
          development, productivity, and more. If you found 
          this note valuable, consider <b>subscribing to my 
          newsletter</b> for regular updates on these topics.
        </p>

        <p className='mb-8'>
          No spam, unsubscribe at any time.
        </p>

        <Subscribe />
      </div>
      </Suspense>
    </section>
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
  return {
    title: note.title,
    description: note.description,
    authors: [
      { name: siteConfig.siteName, url: note.slug }
    ],
    applicationName: siteConfig.title,
    generator: 'Next.js',
    keywords: note.title.split(' '), // Split the title into keywords
    openGraph: {
      title: note.title,
      description: note.description,
      type: 'article',
      siteName: siteConfig.siteName,
      url: `${siteConfig.url}${note.slug}`,
      images: [
        { url: note.image ? note.image : '', alt: note.title }
      ],  
    },
  };
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