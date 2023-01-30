// ./components/header.tsx

/* Next */
import Link from "next/link";
import { useRouter } from "next/router";

/* Icons */
import { 
    SunIcon, 
    MoonIcon 
} from '@radix-ui/react-icons';

/* Theme */
import { useTheme } from 'next-themes';

/* Styles */
import classNames from "classnames";

/* Site Config */
import { siteConfig } from "@/config/site";

/* Framer Motion */
import { motion, AnimatePresence } from "framer-motion";
import { motionHeader } from "@/lib/motion/animation";

/* Types */
import { ItemProps } from "@/types/nav";

export default function Header() {
    const {theme, setTheme} = useTheme();
    const router = useRouter().pathname;

    return (
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

            <div className="flex items-center space-x-4">
                <nav className={classNames("flex", "space-x-4", "text-gray-dark")}>
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
                <button className={classNames(
                    "p-2.5", 
                    "bg-transparent hover:bg-hover-dark text-white hover:text-opacity-80", 
                    "rounded-lg cursor-pointer shadow-sm", 
                    "transition ease-in-out delay-100"
                    )}
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                    <AnimatePresence initial={false}>
                        {(theme === 'light' ? true : false) ? 
                        <motion.div animate={{rotate: !(theme === 'light') ? 180 : 0}}><MoonIcon /></motion.div> : 
                        <motion.div animate={{rotate: !(theme === 'light') ? 360 : 0}}><SunIcon /></motion.div>}
                    </AnimatePresence>
                </button>
            </div>
        </motion.header>
    )
}