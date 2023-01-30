// ./components/footer.tsx

import React from "react";

/* Next */
import Link from "next/link"

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
                "flex justify-between items-center", 
                "border-t-1 border-solid border-t-border"
        )}>
            <nav className={classNames(
                "flex", 
                "space-x-4", 
                "text-gray-dark"
            )}>
                <Hyperlink href={siteConfig.links.github}>
                    Github
                </Hyperlink>
                
                <Hyperlink href={siteConfig.links.twitter}>
                    Twitter
                </Hyperlink>
                
                <Hyperlink href={siteConfig.links.linkedin}>
                    Linkedin
                </Hyperlink>
            </nav>
            
            <span className={classNames(
                "font-sans font-medium", 
                "text-gray-light"
            )}>
                2023 &copy; Gabriel Fonseca.
            </span>
        </motion.footer>
    )
}