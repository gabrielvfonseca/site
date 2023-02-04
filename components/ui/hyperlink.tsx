// ./components/ui/hyperlink.tsx

import React from "react";

/* Next */
import Link from "next/link";

/* Types */
import { HyperLinkProps } from "@/types/hyperlink";

/* Styles */
import classNames from "classnames";

export const styles = {
    link: classNames(
        "text-gray-light dark:text-gray-dark dark:text-opacity-60 dark:hover:text-opacity-90 text-opacity-80 hover:text-opacity-100", 
        "transition ease-in-out delay-150"
    ),
    dashed: classNames(
        "ml-1",
        "underline decoration-dotted decoration-1 decoration-current underline-offset-3",
        "text-gray-light dark:text-gray-dark text-opacity-90 dark:text-opacity-80 dark:hover:text-opacity-60", 
        "transition ease-in-out delay-150"
    )
};

export const HyperlinkDash: React.FC<HyperLinkProps> = ({
    href, children, target, className
}) => (
    <Link 
        href={href} 
        target={target} 
        hrefLang="en"
        className={classNames(styles.dashed, className)}
    >
      {children}
    </Link>
);

export const Hyperlink: React.FC<HyperLinkProps> = ({
    href, children, target, className
}) => (
    <Link 
        href={href} 
        target={target} 
        hrefLang="en"
        className={classNames(styles.link, className)}
    >
      {children}
    </Link>
);




