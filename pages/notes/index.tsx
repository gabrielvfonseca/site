// ./pages/notes/index.tsx

import React, { useState } from "react";

/* Styles */
import classNames from "classnames";

/* Components */
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Typography, TypographyList } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Post from "@/components/ui/post";

/* Framer Motion */
import { motion } from "framer-motion";
import { motionPage, motionCard } from "@/lib/motion/animation";

/* Prisma */
import { prisma } from '@/lib/prisma';

/* Types */
import { PostProps } from "@/types/post";

/* Site Config */
import { siteConfig } from "@/config/site";

export default function Notes({ feed }: any) {
  const [site, setSite] = useState(false);

  return (
    <>
      <meta charSet="UTF-8" />
      <title>Notes — Gabriel Fonseca</title>
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
          I use this page to share some of my thoughts and ideas related to news, 
          code guides and other stuff.
        </Typography>

        <div id="posts">
          {feed?.map((item: PostProps, index: number) => (
            <Post 
              key={index} 
              title={item.title} 
              text={item.text} 
              date={item.date} 
            />
          ))}

          {/* First and static note post! 👇🏼 */}
          <Post 
            title="First commit!"
            text="This is a really simple developer portfolio I develop in about 4 days, using Nextjs@13 🤩. My intention with this is to document my journey in the wild world of programming 👨🏼‍💻. I hope you enjoy. Cheers!"
            date="2 February, 2023"
          />

          <div className="item-center inline-flex">
            <HoverCard
              defaultOpen={false}
              open={site}
              onOpenChange={setSite}
            >
              <Button
                aria-label="website-stack-list"
                variant="outline" 
                size="default"
                 onClick={() => setSite(!site)}>
                  Website build stack
              </Button>

              <HoverCardTrigger></HoverCardTrigger>
              <HoverCardContent
                sideOffset={24}
                align="center"
              >
                <motion.div 
                  initial={motionCard.initial} 
                  animate={motionCard.animate} 
                  transition={motionCard.transition} 
                  exit={motionCard.exit}
                  className="space-y-2 p-1"
                >
                  <h4 className={classNames(
                    "font-sans font-semibold", 
                    "text-sm", 
                    "text-gray-light dark:text-white", 
                    "text-opacity-90 dark:text-opacity-40"
                  )}>
                    This Website was made using:
                  </h4>

                  <TypographyList items={[
                    "Build upon Next.js",
                    "With amazing Typescript",
                    "Styled using beloved Tailwindcss styles",
                    "Based on awesome Radix components",
                    "Animated with Framer Motion",
                    "Powered by Prisma and Planetscale",
                    "Set with the beautiful Inter & Unbounded fonts!",
                  ]} 
                  className="text-sm" 
                />
                </motion.div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </motion.main>
    </>
  )
};

export async function getStaticProps() {
  const data = await prisma.note.findMany();
  const feed = JSON.parse(JSON.stringify(data));

  return {
    props : { feed },
  }
};