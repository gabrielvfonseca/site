'use client'; // Templates must be client components

import { motion } from 'motion/react';
import type { JSX, ReactNode } from 'react';

type TransitionProps = {
  readonly children: ReactNode;
};

export default function Transition({ children }: TransitionProps): JSX.Element {
  return (
    <motion.div
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
  );
}
