'use client'; // Use client

import * as React from 'react';

// Framer Motion
import { motion } from 'framer-motion';

// Classnames
import { cn } from "@utils/cn";

// Button Variants
import { buttonVariants } from '@components/ui/button';

// MenuToggle Props
interface MenuToggleProps {
    state: boolean;
    onToggle: (state: boolean) => void;
    className?: string;
    classNameToggle?: string;
};

// MenuToggle Component
export const MenuToggle = ({ state, onToggle, className, classNameToggle }: MenuToggleProps) => {
    // Container properties
    const container = {
        size: 10,
    };
    // Line properties
    const lines = {
        size: 2,
        length: container.size * 2, // Adjusting the length to fit within the container
        spacing: container.size * 0.4, // Spacing between lines
    };
    // Animations
    const animations = {
        container: {
            initial: {
                opacity: 0,
            },
            animate: {
                opacity: 1,
                transition: {
                    duration: 0.5,
                },
            },
        },
        lines: [
            {
                initial: {
                    y: (container.size - lines.size) / 2 - lines.spacing,
                    rotate: 0,
                },
                closed: {
                    y: (container.size - lines.size) / 2,
                    rotate: 45,
                },
                opened: {
                    y: (container.size - lines.size) / 2 - lines.spacing,
                    rotate: 0,
                },
            },
            {
                initial: {
                    y: (container.size - lines.size) / 2 + lines.spacing,
                    rotate: 0,
                },
                closed: {
                    y: (container.size - lines.size) / 2,
                    rotate: -45,
                },
                opened: {
                    y: (container.size - lines.size) / 2 + lines.spacing,
                    rotate: 0,
                },
            },
        ],
    };

    return (
        <button
            className={cn(buttonVariants({ variant: 'ghost', size: 'default', radius: 'full' }), className)}
            onClick={() => onToggle(!state)}
        >
            <motion.div
                className='relative cursor-pointer'
                style={{ width: container.size, height: container.size }}
                variants={animations.container}
                initial='initial'
                animate='animate'
            >
                {animations.lines.map((line, index) => (
                    <motion.div
                        key={index}
                        className={cn('absolute bg-gray-900 dark:bg-gray-400 transition-colors duration-300 rounded-full', classNameToggle)}
                        style={{
                            width: lines.length,
                            height: lines.size,
                            left: (container.size - lines.length) / 2,
                        }}
                        variants={line}
                        initial='initial'
                        animate={state ? 'closed' : 'opened'}
                    />
                ))}
            </motion.div>
        </button>
    );
};