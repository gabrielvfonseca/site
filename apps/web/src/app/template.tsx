'use client'; // Templates must be client components

import { motion } from 'motion/react';
import type { JSX, ReactNode } from 'react';
import { useEffect, useState } from 'react';

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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // If user prefers reduced motion, render without animation
  if (prefersReducedMotion) {
    return <>{children}</>;
  }

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
