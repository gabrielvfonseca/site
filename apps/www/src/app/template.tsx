'use client';

import React from "react";

// Next
import { usePathname } from "next/navigation";

// Motion
import { AnimatePresence, motion } from "framer-motion";

// Main Transition Component
export default function Template ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    // Pathname hook to get the current path
    const pathname = usePathname();

    // Render the component and animate it
    return (
        <AnimatePresence mode="wait">
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