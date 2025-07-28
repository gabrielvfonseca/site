'use client'; // Templates must be client components

import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import type { JSX, ReactNode } from 'react';

type TransitionProps = {
  readonly children: ReactNode;
};

export default function Transition({ children }: TransitionProps): JSX.Element {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.25,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
