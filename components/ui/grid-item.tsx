// ./components/ui/grid-item.tsx

import React from "react";

/* Next */
import Image from "next/image";
import Link from "next/link";

/* Styles */
import classNames from "classnames";

/* Framer Motion */
import { motion } from "framer-motion";
import { motionGridItems } from "@/lib/motion/animation";

/* Components */
import { TypographyH4 } from "@/components/ui/typography";

/* Types */
import { GridItemProps } from "@/types/grid";

const GridItem: React.FC<GridItemProps> = ({ title, text, imageSrc, href }) => (
    <motion.div
        initial={motionGridItems.initial}
        whileInView={motionGridItems.whileInView}
        transition={motionGridItems.transition}
        exit={motionGridItems.exit}
        className={classNames(
            "py-2", "cursor-pointer",
            "dark:bg-over-dark bg-over-light",
            "bg-opacity-40 dark:bg-opacity-30", 
            "border-1 border-solid border-border",
            "border-opacity-30 dark:border-opacity-100", 
            "rounded-lg shadow",
        )}
    >
        <div className={classNames(
            "w-full", "p-4",
            "border-b-1 border-solid border-b-border",
            "border-opacity-30 dark:border-opacity-100"
        )}>
            <Image 
                src={imageSrc} 
                alt={title} 
                width={34} 
                height={34} 
            />
        </div>

        <div className={classNames(
            "pb-3 pt-4 px-4",
        )}>
            <Link 
                href={href} 
                target="_blank" 
                passHref
            >
                <TypographyH4 className={classNames(
                    "text-black dark:text-gray-dark dark:hover:text-opacity-80 hover:text-opacity-70", 
                    "transition ease-in-out delay-150"
                )}>
                    {title}
                </TypographyH4>
            </Link>

            <p className={classNames(
                "text-gray-light dark:text-gray-light", 
                "font-sans", "z-0",
                "leading-7"
            )}>
                {text}
            </p>
        </div>
    </motion.div>
)

export default GridItem;