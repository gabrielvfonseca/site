// ./components/footer.tsx

import React from "react";

/* Styles */
import classNames from "classnames";

/* Framer Motion */
import { motion } from "framer-motion";
import { motionFooter } from "@/lib/motion/animation";

/* Components */
import { Hyperlink } from "./ui/hyperlink";

/* Site Config */
import { siteConfig } from "@/config/site";

export default function Footer() {
    return (
        <motion.footer 
            initial={motionFooter.initial}
            animate={motionFooter.animate}
            transition={motionFooter.transition}
            className={classNames(
                "py-20 mt-20", "text-sm",
                " justify-between items-center", 
                "border-t-1 border-solid border-t-border",
                "border-opacity-30 dark:border-opacity-100",
                "md:flex md:items-center md:justify-between"
        )}>
            <nav className={classNames(
                "flex", "sm:mt-0",
                "space-x-4", 
                "text-gray-dark"
            )}>
                <Hyperlink  target="_blank" href={siteConfig.links.github}>
                    Github
                </Hyperlink>
                
                <Hyperlink target="_blank" href={siteConfig.links.twitter}>
                    Twitter
                </Hyperlink>
                
                <Hyperlink target="_blank" href={siteConfig.links.linkedin}>
                    Linkedin
                </Hyperlink>
            </nav>
            
            <span className={classNames(
                "font-sans font-medium", 
                "text-gray-light",
                "text-opacity-70 dark:text-opacity-100",
                "sm:text-center"
            )}>
                2023 &copy; Gabriel Fonseca.
            </span>
        </motion.footer>
    )
}