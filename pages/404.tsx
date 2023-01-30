// ./pages/404.tsx

import React from "react";

/* Utils */
import classNames from "classnames";

/* Components */
import { 
    TypographyH3, 
    Typography,
} from "@/components/ui/typography";

/* Framer Motion */
import { motion } from "framer-motion";
import { motionPage } from "@/lib/motion/animation";

export default function NotFound() {
  return (
    <>
      <meta charSet="UTF-8" />
      <title>404 — Gabriel Fonseca</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Gabriel's portfolio website — Software Developer" />
      <meta name="keywords" content="HTML, CSS, JavaScript" />
      <meta name="author" content="Gabriel Fonseca" />

      <link rel="icon" href="/favicon.ico" />
      
      <motion.main 
        initial={motionPage.initial}
        animate={motionPage.animate}
        transition={motionPage.transition}
        exit={motionPage.exit}
        className={classNames("space-y-5 my-36", "text-center")}
      >
        <TypographyH3 className="font-serif">
            404
        </TypographyH3>
        <Typography>
            This page could not be found.
        </Typography>
      </motion.main>
    </>
  )
}
