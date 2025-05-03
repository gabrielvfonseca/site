'use client';

import { motion } from 'motion/react';
import type React from 'react';

type TransitionProps = {
  children: React.ReactNode;
};

export default function Transition({ children }: TransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
