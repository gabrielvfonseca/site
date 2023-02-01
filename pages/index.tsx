// ./pages/index.tsx

import React from "react";

/* Styles */
import classNames from "classnames";
import { styles as TypographyStyles } from "@/components/ui/typography";
import { styles as HyperlinkStyles } from "@/components/ui/hyperlink";

/* Framer Motion */
import { motion } from "framer-motion";
import { motionPage, motionCard } from "@/lib/motion/animation";

/* Components */
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hovercard";
import { Typography } from "@/components/ui/typography";
import { HyperlinkDash } from "@/components/ui/hyperlink";

export default function Home() {
  return (
    <>
      <meta charSet="UTF-8" />
      <title>Gabriel Fonseca</title>
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
        className={classNames("space-y-5")}
      >
        <Typography>
          I'm a software developer and computer science high school student from Portugal, 
          currently building open-source code while studying mathematics :)
        </Typography>

        <Typography>
          I'm interest in a wide range of other topics like 
          <HyperlinkDash href="/interests">web and app development</HyperlinkDash>, 
          <HyperlinkDash href="/interests" className="mr-1">artificial intelligence</HyperlinkDash> 
          and <HyperlinkDash href="/interests">robotics</HyperlinkDash>.
        </Typography>

        <Typography>
          I've spend my time as a developer on freelance web design and development as 
          well as algorithm competitions.
        </Typography>

        <div className={TypographyStyles.typography}>
          This year, I'm also preparing myself to enter computer science engineering at 
          <HoverCard>
            <HoverCardTrigger className={classNames(HyperlinkStyles.dashed, "cursor-pointer")}>
              IST — Instituto Superior Técnico
            </HoverCardTrigger>
            <HoverCardContent>
              <motion.div 
                initial={motionCard.initial} 
                animate={motionCard.animate} 
                transition={motionCard.transition} 
                exit={motionCard.exit}
                className="space-y-2"
              >
                <h4 className={classNames(
                  "font-sans font-semibold", 
                  "text-sm", 
                  "text-gray-light dark:text-white", 
                  "text-opacity-90 dark:text-opacity-40"
                )}>
                  Where I want to get in
                </h4>
                <span className="text-sm">
                  An engineering university in Portugal. 
                  Ranked as one of the best in Europe.
                </span>
              </motion.div>
            </HoverCardContent>
          </HoverCard>.
        </div>

        <Typography>
          You can know a bit more about me via my 
          <HyperlinkDash href="/notes">writting</HyperlinkDash>, 
          <HyperlinkDash href="/projects" className="mr-1">projects</HyperlinkDash>
          and social media accounts. Thank You!
        </Typography>
      </motion.main>
    </>
  )
}
