'use client';

import React from 'react';

// Next
import Link from 'next/link';

// Motion
import { AnimatePresence, motion } from 'framer-motion';

// UI Components
import { Avatar, AvatarImage } from '@components/ui/avatar';

// Configuration siteConfig
import { siteConfig } from '@/site.config';

// Hooks
import { useCurrentlyPlaying } from '@hooks/use-currently-playing';

// Footer Component
export function Footer() {
  // Fetch currently playing track
  const { data, isLoading } = useCurrentlyPlaying();

  // Return
  return (
    <footer className='mt-14 sm:mt-24 text-sm dark:text-zinc-400'>
      <div className='flex flex-col mt-10'>
        <span>
          {'Check out more of my work on '}
          <Link href={siteConfig.links.twitter} target='_blank'>Twitter</Link>{' and '}
          <Link href={siteConfig.links.github} target='_blank'>GitHub</Link>.
        </span>

        <AnimatePresence>
          {
            data?.state 
            && !isLoading 
            && data?.data 
            && (
              <motion.div className='flex mt-4 flex-row gap-x-2 items-start'>                
                <Avatar className='h-[14px] w-[14px] mt-1'>
                  <AvatarImage src='https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' />
                </Avatar>

                <span className='flex items-start'>
                  <span className='whitespace-nowrap'>{'Currently Listening to'}</span>
                  <Link 
                    target='_blank'
                    href={data?.data.url}
                    className='ml-1'
                  >
                    {`${data?.data.name} by ${data?.data.artist}`}
                  </Link>.
                </span>
              </motion.div>
            )   
          }
        </AnimatePresence>
      </div>
    </footer>
  )
};