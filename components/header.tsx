// ./components/header.tsx

import React, { useState } from "react";

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

/* Styles */
import classNames from "classnames";

/* Site Config */
import { siteConfig } from "@/config/site";

/* Framer Motion */
import { motion, AnimatePresence } from "framer-motion";
import { motionHeader, motionMenu } from "@/lib/motion/animation";

/* Types */
import { ItemProps } from "@/types/nav";

const Menu: React.FC = () => (
    <motion.div 
        initial={motionMenu.initial} 
        animate={motionMenu.animate} 
        transition={motionMenu.transition} 
        exit={motionMenu.exit} 
        className={classNames(
            "fixed top-0 left-0",
            "h-full w-full z-20",
            "px-4",
            "dark:bg-over-dark bg-over-light",
            "mobile-menu"
    )}>
        <nav className="block">
            {siteConfig.mainNav.map((item: ItemProps, index: number) => (
                <Link key={index} href={item.href} className={classNames(
                    "text-gray-dark", 
                    "text-opacity-60 hover:text-opacity-100",
                    "transition ease-in-out delay-150",
                )}>
                    {item.title}
                </Link>
            ))}
        </nav>
    </motion.div>
);

export default function Header() {
    const [open, setOpen] = useState(false);

    const {theme, setTheme} = useTheme();
    const router = useRouter().pathname;

    const styles = {
        button: classNames(
            "p-2.5", 
            "bg-transparent hover:bg-hover-dark text-white hover:text-opacity-80", 
            "rounded-lg cursor-pointer shadow-sm", 
            "transition ease-in-out delay-100"
    )};

    return (
        <>
            {open && <Menu />}
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
                    "text-gray-dark hover:text-opacity-75",
                    "transition ease-in-out delay-100",
                )}>
                    Gabriel
                </Link>

                <div className="flex items-center space-x-4 z-50">
                    <nav className={classNames(
                        "flex", 
                        "space-x-4",
                        "dark:text-gray-dark text-gray-light",
                        "menu-nav"
                    )}>
                        {siteConfig.mainNav.map((item: ItemProps, index: number) => (
                            <Link key={index} href={item.href} className={classNames(
                                "text-gray-dark", 
                                (router == item.href) ? "text-opacity-60 hover:text-opacity-100" : "hover:text-opacity-60",
                                "transition ease-in-out delay-150"
                            )}>
                                {item.title}
                            </Link>
                        ))}
                    </nav>

                    <div className="z-10 space-x-2">
                        <button className={classNames(styles.button, "open-menu")}
                            onClick={() => setOpen(!open)}
                        >
                            <AnimatePresence initial={false}>
                                {!open ? 
                                <motion.div animate={{rotate: !open ? 180 : 0}}><HamburgerMenuIcon /></motion.div> : 
                                <motion.div animate={{rotate: !open ? 360 : 0}}><Cross2Icon /></motion.div>}
                            </AnimatePresence>
                        </button>

                        <button className={styles.button}
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        >
                            <AnimatePresence initial={false}>
                                {(theme === 'light' ? true : false) ? 
                                <motion.div animate={{rotate: !(theme === 'light') ? 180 : 0}}><MoonIcon /></motion.div> : 
                                <motion.div animate={{rotate: !(theme === 'light') ? 360 : 0}}><SunIcon /></motion.div>}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.header>
        </>
    )
}