// ./components/ui/typography.tsx

import React from "react";

/* Types */
import { TypographyProps } from "@/types/typography";

/* Framer Motion */
import { motion } from "framer-motion";
import { motionTypography, motionHeaders } from "@/lib/motion/animation";

/* Styles */
import classNames from "classnames";

const styles = {
  typography: classNames(
    "text-gray-dark", 
    "font-sans", "z-0",
    "leading-7 [&:not(:first-child)]:mt-6"
  ),
  typographyH1: classNames(
    "scroll-m-20",
    "font-sans font-extrabold",
    "text-3xl tracking-tight lg:text-5xl",
  ),
  typographyH2: classNames(
    "scroll-m-20", 
    "font-semibold tracking-tight",
    "text-2xl", 
    "transition-colors",
  ),
  typographyH3: classNames(
    "scroll-m-20", 
    "text-xl tracking-tight", 
    "font-semibold",
  ),
  typographyH4: classNames(
    "scroll-m-20", 
    "text-lg tracking-tight",
    "font-sans font-semibold ",
  ),
};

export const Typography: React.FC<TypographyProps> = ({children, className}) => (
    <motion.p 
      initial={motionTypography.initial}
      animate={motionTypography.animate}
      transition={motionTypography.transition}
      className={classNames(
        styles.typography,
        className
    )}>
      {children}
    </motion.p>
);

export const TypographyH1: React.FC<TypographyProps> = ({children, className}) => {
  return (
    <motion.h1 
      initial={motionHeaders.initial}
      animate={motionHeaders.animate}
      transition={motionHeaders.transition}
      className={classNames(
        styles.typographyH1,
        className
    )}>
      {children}
    </motion.h1>
  )
}

export const TypographyH2: React.FC<TypographyProps> = ({children, className}) => {
  return (
    <motion.h2
      initial={motionHeaders.initial}
      animate={motionHeaders.animate}
      transition={motionHeaders.transition} className={classNames(
        styles.typographyH2,
        className
    )}>
      {children}
    </motion.h2>
  )
}

export const TypographyH3: React.FC<TypographyProps> = ({children, className}) => {
  return (
    <motion.h3
      initial={motionHeaders.initial}
      animate={motionHeaders.animate}
      transition={motionHeaders.transition} className={classNames(
        styles.typographyH3,
        className
    )}>
      {children}
    </motion.h3>
  )
}

export const TypographyH4: React.FC<TypographyProps> = ({children, className}) => {
  return (
    <motion.h4
      initial={motionHeaders.initial}
      animate={motionHeaders.animate}
      transition={motionHeaders.transition} className={classNames(
        styles.typographyH4,
        className
    )}>
      {children}
    </motion.h4>
  )
}
