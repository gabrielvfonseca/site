'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';

export default function Transition ({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode='wait'>
            <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};