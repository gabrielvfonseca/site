'use client'; // Error boundaries must be Client Components

import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import type React from 'react';

type TemplateProps = {
  readonly children: React.ReactNode;
};

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 0.992 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.992 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
