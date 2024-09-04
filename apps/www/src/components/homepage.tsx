import React, { Suspense } from 'react';

// Next
import Image from 'next/image';

// Image
import profileImage from '@app/profile.jpg';

// Subscribe
import Subscribe from '@components/forms/subscribe';

// Components
import { Card } from './card';

// UI Components
import { AspectRatio } from '@components/ui/aspect-ratio';

// Contentlayer
import { allNotes } from 'contentlayer/generated';

// Fallback
import Fallback from './fallback';

// Types
import type { Notes as Note } from 'contentlayer/generated';

// Homepage JSX component
export default async function Homepage() {  
  // Return page component
  return (
    <section className='flex flex-col'>
      <p className='mb-4 font-medium text-zinc-800 dark:text-zinc-200'>
        I&apos;m a computer engineering student living in Lisbon, pt.
      </p>
      
      <p className='mb-8'>
        Hello! I&apos;ve always believed in learning things the long (often harder) way. 
        It's why I have this website — to share my journey, thoughts, and passions. 
        I&apos;m not entirely sure if it's the best use of my time, but it feels 
        right to speak my truth.
      </p>
        
      <p>
        In my professional career, I have created various websites and full-stack applications for clients. 
        I like to attend tech events and conferences, gaining valuable insights from top industry products and speakers. 
        I am always thinking of new ideas and am enthusiastic about bringing innovative projects to life.
      </p>

      <div className='w-full my-16 sm:scale-105'>
        <AspectRatio ratio={16 / 14}>
          <Image 
            src={profileImage} 
            alt='Image' 
            className='rounded-lg object-cover' 
            priority
            fill
          />
        </AspectRatio>
      </div>

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
                  title: 'Lava (buidling)',
                  description: 'A new era for project development workflow.',
                  href: 'https://lava.dev'
                },
              ].map((value: { 
                title: string; 
                description: string; 
                href: string; 
              }, index: number) => (
                  <Card 
                    key={`${index}-${value.title}`}
                    title={value.title}
                    description={value.description}
                    href={value.href}
                    target='_blank'
                  />
                )
              )
            }
          </Suspense>
        </div>
      </div>

      <div className='mb-8 mt-8 sm:mt-10'>
        <h2 className='block mb-4 text-md'>
          Notes
        </h2>
        
        <div className='flex flex-col gap-2'>
          <Suspense fallback={ <Fallback /> }>
            {
              allNotes.map((value: Note, index: number) => (
                  <Card 
                    key={`${index}-${value._id}`}
                    title={value.title}
                    description={value.description}
                    href={value.slug}
                  />
                )
              )
            }
          </Suspense>
        </div>
      </div>

      <div className='mb-8 mt-8 sm:mt-10'>
        <h2 className='block mb-4 text-md'>
          Newsletter
        </h2>

        <p className='mb-8 font-medium text-zinc-500 dark:text-zinc-400'>
          I&apos;m currently working on a new project, which I'm excited to share
          with you soon. In the meantime, you can subscribe to my newsletter to
          receive updates on my progress.
        </p>

        <Subscribe />
      </div>
    </section>
  )
}
