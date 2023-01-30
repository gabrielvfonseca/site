// ./pages/index.tsx

import React from "react";

/* Styles */
import classNames from "classnames";

/* Framer Motion */
import { motion } from "framer-motion";
import { motionPage } from "@/lib/motion/animation";

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

        <Typography>
          This year, I'm also preparing myself to enter computer science engineering at 
          <HoverCard>
            <HoverCardTrigger className={classNames(
              "ml-1", "underline decoration-dotted decoration-1 decoration-current underline-offset-3", 
              "text-gray-dark text-opacity-80 hover:text-opacity-60", 
              "transition ease-in-out delay-150", "cursor-pointer"
            )}>
              IST — Instituto Superior Técnico
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Where I want to get in</h4>
                <p className="text-sm">
                  An engineering university in Portugal. 
                  Ranked as one of the best in Europe.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>.
        </Typography>

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
