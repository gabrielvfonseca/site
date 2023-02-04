// ./components/header.tsx

import React, { useState, useEffect } from "react";

/* Next */
import Link from "next/link";
import { useRouter } from "next/router";

/* Icons */
import { 
    SunIcon, 
    MoonIcon,
    HamburgerMenuIcon,
    Cross2Icon,
} from '@radix-ui/react-icons';

/* Theme */
import { useTheme } from 'next-themes';

/* Components */
import { BottomMenu } from "./footer";

/* Styles */
import classNames from "classnames";

/* Site Config */
import { siteConfig } from "@/config/site";

/* Framer Motion */
import { 
    motion, 
    AnimatePresence,
} from "framer-motion";
import { 
    motionHeader, 
    motionMenu, 
    motionDivider,
} from "@/lib/motion/animation";

/* Types */
import { ItemProps } from "@/types/nav";

export const styles = {
    button: classNames(
        "p-2.5", 
        "bg-transparent hover:bg-hover-light dark:hover:bg-hover-dark", 
        "rounded-lg cursor-pointer hover:shadow-sm", 
        "transition ease-in-out delay-100"
    ),
    icons: classNames(
        "text-black dark:text-white text-opacity-80"
    )
};

const Menu: React.FC<{ router: any }> = ({ router }) => {
    return (
        <motion.div 
            key="modal"
            initial={motionMenu.initial} 
            animate={motionMenu.animate} 
            transition={motionMenu.transition} 
            exit={motionMenu.exit} 
            className={classNames(
                "px-10 py-20",
                "fixed top-0 left-0",
                "h-full w-full z-20",
                "dark:bg-over-dark bg-over-light",
                "mobile-menu"
        )}>
            <nav className="inline space-y-3">
                {siteConfig.mainNav.map((item: ItemProps, index: number) => (
                    <Link key={index} href={item.href} className={classNames(
                        "block", "text-xl", "space-y-3",
                        "text-gray-light dark:text-gray-dark",
                        (router == item.href) ? 
                        "text-opacity-60 dark:text-opacity-50 dark:hover:text-opacity-100 hover:text-opacity-80" : 
                        "hover:text-opacity-60 dark:hover:text-opacity-60",
                        "transition ease-in-out delay-150"
                    )}>
                        <span>{item.title}</span>

                        <motion.div 
                            initial={motionDivider.initial}
                            animate={motionDivider.animate}
                            transition={motionDivider.transition}
                            exit={motionDivider.exit} 
                            className={classNames(
                                "border-t-1 border-solid border-t-border",
                                "border-opacity-30 dark:border-opacity-100",
                        )} />
                    </Link>
                ))}
            </nav>

            <div className={classNames(
                "absolute bottom-0",
                "py-20 mt-20", "text-sm",
                "justify-between items-center", 
                "md:flex md:items-center md:justify-between"
            )}>
                <BottomMenu />
            </div>
        </motion.div>
    )
};

export default function Header() {
    const [open, setOpen] = useState(false);

    const {theme, setTheme} = useTheme();
    const router = useRouter().pathname;

    useEffect(() => {
        setOpen(false);
      }, [ router ]);

    return (
        <>
            <motion.header 
                initial={motionHeader.initial}
                animate={motionHeader.animate}
                transition={motionHeader.transition}
                className={classNames(
                    "flex justify-between items-center", 
                    "pb-14 pt-8"
            )}>
                <Link href="/" className={classNames(
                    "scroll-m-20", 
                    "font-serif font-semibold", 
                    "tracking-tight text-2xl",
                    "text-black text-opacity-80 dark:text-gray-dark dark:text-opacity-100",
                    "hover:text-opacity-70 dark:hover:text-opacity-75",
                    "transition ease-in-out delay-100",
                )}>
                    Gabriel
                </Link>

                <div className="flex items-center space-x-4 z-50">
                    <nav className={classNames(
                        "flex", 
                        "space-x-4",
                        "menu-nav"
                    )}>
                        {(siteConfig.mainNav.slice(1, siteConfig.mainNav.length)).map((item: ItemProps, index: number) => (
                            <Link key={index} href={item.href} className={classNames(
                                "text-gray-light dark:text-gray-dark",
                                (router == item.href) ? 
                                "text-opacity-60 dark:text-opacity-50 dark:hover:text-opacity-100 hover:text-opacity-80" : 
                                "hover:text-opacity-60 dark:hover:text-opacity-60",
                                "transition ease-in-out delay-150"
                            )}>
                                {item.title}
                            </Link>
                        ))}
                    </nav>

                    <div className="z-10 space-x-2">
                        <button 
                            aria-label="mobile-menu-button"
                            className={classNames(styles.button, "open-menu")}
                            onClick={() => setOpen(!open)}
                        >
                            <AnimatePresence initial={false}>
                                {!open ? 
                                <motion.div animate={{rotate: !open ? 180 : 0}}><HamburgerMenuIcon className={styles.icons} /></motion.div> : 
                                <motion.div animate={{rotate: !open ? 360 : 0}}><Cross2Icon className={styles.icons} /></motion.div>}
                            </AnimatePresence>
                        </button>

                        <button 
                            aria-label="website-theme-toggle"
                            className={styles.button}
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        >
                            <AnimatePresence initial={false}>
                                {(theme === 'light' ? true : false) ? 
                                <motion.div animate={{rotate: !(theme === 'light') ? 180 : 0}}><MoonIcon className={styles.icons} /></motion.div> : 
                                <motion.div animate={{rotate: !(theme === 'light') ? 360 : 0}}><SunIcon className={styles.icons} /></motion.div>}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.header>
            {open && <Menu router={router} />}
        </>
    )
}