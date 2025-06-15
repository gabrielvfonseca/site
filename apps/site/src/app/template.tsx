'use client'; // Error boundaries must be Client Components

import { motion } from 'motion/react';
import type React from 'react';

type TransitionProps = {
  readonly children: React.ReactNode;
};

export default function Transition({ children }: TransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
