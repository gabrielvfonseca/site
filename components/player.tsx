// ./components/player.tsx

import React from 'react';

/* Next */
import Link from 'next/link';

/* SWR */
import useSWR from 'swr';

/* Radix */
import * as Toast from '@radix-ui/react-toast';

/* Styles */
import classNames from "classnames";

/* Framer Motion */
import { motion, AnimatePresence } from "framer-motion";
import { motionPlays } from '@/lib/motion/animation';

/* Components */
import { TypographyH4 } from './ui/typography';

/* Icons */
const Spotify: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24"
  >
    <path
      d="M14,2A12,12,0,1,0,26,14,12,12,0,0,0,14,2Zm5.52,17.34a.72.72,0,0,1-1.021.24c-2.82-1.74-6.36-2.1-10.56-1.141A.742.742,0,1,1,7.579,17c4.56-1.021,8.52-.6,11.64,1.32a.72.72,0,0,1,.3,1.021Zm1.44-3.3a.907.907,0,0,1-1.262.3A15.55,15.55,0,0,0,7.76,14.96a.912.912,0,0,1-.54-1.741,17.563,17.563,0,0,1,13.5,1.621.847.847,0,0,1,.24,1.2Zm.12-3.36C17.24,10.4,10.82,10.16,7.16,11.3A1.1,1.1,0,0,1,6.5,9.2c4.26-1.26,11.28-1.02,15.72,1.621a1.16,1.16,0,0,1,.419,1.56,1.255,1.255,0,0,1-1.559.3Z"
      transform="translate(-2 -2)" 
      fill="#1ed760"
    />
  </svg>
);

const Playing: React.FC = () => {
  const { data, error, isLoading } = useSWR('/api/spotify/playing', (api: string) => fetch(api).then((res) => res.json()));

  if (error) console.log(error);

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root 
        open={data?.isPlaying} 
        className="ToastRoot"
      >
        <AnimatePresence>
        {
          data?.isPlaying && 
          <motion.div
            initial={motionPlays.initial}
            animate={motionPlays.animate}
            transition={motionPlays.transition}
            exit={motionPlays.exit}
            className={classNames(
              "flex w-fit items-center", 
              "pl-4 pr-6 pt-2 pb-2 space-x-4", 
              "dark:bg-over-dark bg-over-light", 
              "border-1 border-solid border-border", 
              "shadow-lg rounded-lg", 
            )}
          >
            <Spotify />
            <div className='block'>
              <Link 
                target='_black' 
                href={data?.songUrl || "/"} 
                className={classNames(
                  'hover:opacity-70',
                  "transition ease-in-out delay-100",
              )}>
                <TypographyH4 className="font-sans font-medium">
                  {data?.title}
                </TypographyH4>
              </Link> 
              <p className={classNames(
                'flex', 
                'text-gray-light', 
                'font-sans font-medium', 
                'text-sm leading-7'
              )}>
                By {data?.artist}
              </p>
            </div>
          </motion.div>
        }
      </AnimatePresence>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

export default Playing;
