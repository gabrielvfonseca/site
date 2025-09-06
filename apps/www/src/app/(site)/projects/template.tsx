'use client'; // Templates must be Client Components

import { motion } from 'motion/react';
import type { JSX, ReactNode } from 'react';

/**
 * The TemplateProps for the site.
 */
type TemplateProps = {
  /**
   * The children for the site.
   * @returns The children for the site.
   */
  readonly children: ReactNode;
};

/**
 * The Template for the site.
 * @param props - The TemplateProps.
 * @returns The Template for the site.
 */
export default function Template({ children }: TemplateProps): JSX.Element {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.992 }}
      initial={{ opacity: 0, scale: 0.992 }}
      transition={{
        duration: 0.25,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
