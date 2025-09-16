'use client'; // Templates must be client components

import { motion } from 'motion/react';
import type { JSX, ReactNode } from 'react';

/**
 * The TransitionProps for the site.
 */
interface TransitionProps {
  /**
   * The children for the site.
   * @returns The children for the site.
   */
  readonly children: ReactNode;
}

/**
 * The Transition for the site.
 * @param props - The TransitionProps.
 * @returns The Transition for the site.
 */
export default function Transition({ children }: TransitionProps): JSX.Element {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.25,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
