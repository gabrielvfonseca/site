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
} from "@/components/ui/hover-card";
import { Typography } from "@/components/ui/typography";
import { HyperlinkDash } from "@/components/ui/hyperlink";

export default function Home() {
  return (
    <>
      <meta charSet="UTF-8" />
      <title>Gabriel Fonseca</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />

      <meta name="author" content="Gabriel Fonseca" />
      <meta name="description" content="Gabriel's software developer portfolio: This website is my brain dump'" />
      <meta name="keywords" content="
        developer, full stack developer, software developer, front end developer, web developer, 
        back end developer, backend developer, frontend developer, front-end developer, back-end developer, 
        app developer, website developer, python, javascript, nextjs, react, sql, mongodb, rust, arduino, 
        wordpress, php, full stack web developer, portfolio web developer, web developer portfolio" 
      />

      <link rel="icon" href="/static/favicon/favicon.ico" />
      <link href="/static/favicon/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      <link href="/static/favicon/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
      <link href="/static/favicon/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
      <link href="/static/favicon/safari-pinned-tab.svg" rel="mask-icon" color="#000000" />

      <link href="/static/favicon/site.webmanifest.json" rel="manifest" />

      <meta content="#000000" name="msapplication-TileColor" />
      <meta content="#fff" name="theme-color" />

      <meta content="/static/favicon/browserconfig.xml" name="msapplication-config" />
      <link href="/feed.xml" rel="alternate" type="application/rss+xml" />

      <meta content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" name="robots" />

      <meta property="og:site_name" content="Gabriel Fonseca" />
      <meta property="og:title" content="Gabriel's Personal website" />
      <meta property="og:description" content="Personal Software Developer Portfolio — Gabriel Fonseca" />
      <meta property="og:image" content="/static/favicon/twitter-card.png" />
      <meta property="og:url" content="https//www.gabfon.me" />

      <meta content="@gabriefonseca_" name="twitter:site" />
      <meta name="twitter:title" content="Gabriel's Personal website" />
      <meta name="twitter:description" content="Personal Software Developer Portfolio — Gabriel Fonseca" />
      <meta name="twitter:image" content="/static/favicon/logo.png" />
      <meta property="twitter:url" content="https//www.gabfon.me" />
      <meta name="twitter:card" content="summary" />

      <link rel="canonical" href="https://gabfon.me" />


      
      <motion.main 
        id="main-content"
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
