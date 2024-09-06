import React, { Suspense } from 'react';

// Next
import Link from 'next/link';

// Subscribe
import Subscribe from '@components/forms/subscribe';

// Components
import { Card } from './card';

// Contentlayer
import { allNotes } from 'contentlayer/generated';

// Fallback
import Fallback from './fallback';

// Types
import type { Notes as Note } from 'contentlayer/generated';
import { formatDate } from '../utils/date';
import { Badge } from './ui/badge';

// Homepage JSX component
export default async function Homepage() {  
  // Return page component
  return (
    <section className='flex flex-col'>
      <p className='mb-4 font-medium text-zinc-800 dark:text-zinc-200'>
        I&apos;m a computer engineering student living in Lisbon, pt.
      </p>
      
      <p className='mb-8'>
        Hey there! I've always believed that the best way to learn is by taking the long, sometimes harder route. 
        That's why I created this space — to document and share my journey, thoughts, and passions. 
        I may not always be sure if this is the best use of my time, but it feels right to be authentic and speak my truth.
      </p>

      <p className='mb-8'>
        I'm currently pursuing a degree in <Link href='/github'>Computer Engineering</Link>, with a deep love for all things tech. 
        Throughout my career, I've built <Link href='/projects'>websites and full-stack applications</Link> for a range of clients. 
        I also love attending tech conferences and events, where I gain insights from leading products and speakers in the industry. 
        I'm constantly thinking of new ideas, and I’m passionate about bringing <Link href='/projects'>innovative projects to life</Link>.
      </p>

      <p className='mb-8'>
        I probably sound like your typical tech enthusiast, and maybe I am. 
        But that&apos;s okay. I&apos;m here to share my journey, thoughts, and passions.
      </p>

      <div className='mb-8 mt-8 sm:mt-10'>
        <h2 className='block mb-4 text-md'>
          Projects
        </h2>

        <div className='flex flex-col gap-2'>
          <Suspense fallback={ <Fallback /> }>
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
          </Suspense>
        </div>
      </div>

      <div className='mb-8 mt-8 sm:mt-10'>
        <h4 className='block mb-4 text-md'>
          Notes
        </h4>
        
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
      </div>

      <div className='mb-8 mt-8 sm:mt-10'>
        <h4 className='block mb-4 text-md'>
          Newsletter
        </h4>

        <p className='mb-8'>
          I&apos;m currently working on a new project, which I'm excited to share
          with you soon. In the meantime, you can subscribe to my newsletter to
          receive updates on my progress.
        </p>

        <Subscribe />
      </div>
    </section>
  )
}
