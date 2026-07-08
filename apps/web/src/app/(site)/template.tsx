'use client'; // Templates must be client components

import { motion, useReducedMotion } from 'motion/react';
import type { JSX, ReactNode } from 'react';

/**
 * The TransitionProps for the site.
 */
interface TransitionProps {
  /**
   * The children for the site.
   */
  readonly children: ReactNode;
}

/** Duration (seconds) of the page-transition fade. */
const FADE_DURATION = 0.25;

/**
 * The Transition for the site.
 *
 * A Next.js `template` remounts on every navigation, so a plain fade-in is all
 * that is needed. We intentionally avoid `AnimatePresence`/`exit`: keeping the
 * outgoing page mounted for an exit animation caused the previous route to stack
 * on top of the incoming one (duplicated content) on back/forward navigation.
 * @param props - The TransitionProps.
 * @returns The Transition for the site.
 */
export default function Transition({ children }: TransitionProps): JSX.Element {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : FADE_DURATION,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
