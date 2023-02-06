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

/* Site Config */
import { siteConfig } from "@/config/site";

export default function Index() {
  return (
    <>
      <meta charSet="UTF-8" />
      <title>{siteConfig.title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />

      <meta name="author" content={siteConfig.meta.author} />
      <meta name="description" content={siteConfig.meta.description} />
      <meta name="keywords" content={siteConfig.meta.keywords.toString()} />

      <link rel="icon" href={siteConfig.meta.favicon.icon} />
      <link href={siteConfig.meta.favicon["apple-touch"]} rel="apple-touch-icon" sizes="180x180" />
      <link href={siteConfig.meta.favicon["32x32"]} rel="icon" sizes="32x32" type="image/png" />
      <link href={siteConfig.meta.favicon["16x16"]} rel="icon" sizes="16x16" type="image/png" />
      <link href={siteConfig.meta.favicon["safari-tab"]} rel="mask-icon" color="#000000" />

      <link href={siteConfig.meta.manifest} rel="manifest" />

      <meta content={siteConfig.meta["theme-color"]} name="msapplication-TileColor" />
      <meta content={siteConfig.meta["theme-color"]} name="theme-color" />

      <meta content="/static/favicon/browserconfig.xml" name="msapplication-config" />
      <link href="/feed.xml" rel="alternate" type="application/rss+xml" />

      <meta content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" name="robots" />

      <meta property="og:site_name" content={siteConfig.meta.og.site} />
      <meta property="og:title" content={siteConfig.meta.og.title} />
      <meta property="og:description" content={siteConfig.meta.og.description} />
      <meta property="og:image" content={siteConfig.meta.og.image} />
      <meta property="og:url" content={siteConfig.meta.og.url} />

      <meta content={siteConfig.meta.og.site} name="twitter:site" />
      <meta name="twitter:title" content={siteConfig.meta.og.title} />
      <meta name="twitter:description" content={siteConfig.meta.og.description} />
      <meta name="twitter:image" content={siteConfig.meta.og.image} />
      <meta property="twitter:url" content={siteConfig.meta.og.url} />
      <meta name="twitter:card" content={siteConfig.meta.og.card} />

      <link rel="canonical" href={siteConfig.meta.canonical} />


      
      <motion.main 
        id="main-content"
        initial={motionPage.initial}
        animate={motionPage.animate}
        transition={motionPage.transition}
        exit={motionPage.exit}
        className={"space-y-5"}
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
