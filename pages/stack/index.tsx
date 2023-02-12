// ./pages/stack/index.tsx

import React from "react";

/* Styles */
import classNames from "classnames";

/* Components */
import { TypographyH2 } from "@/components/ui/typography";
import GridItem from "@/components/ui/grid-item";

/* Framer Motion */
import { motion } from "framer-motion";
import { motionPage } from "@/lib/motion/animation";

/* Prisma */
import { prisma } from '@/lib/prisma';

/* Types */
import { GridItemProps as ItemProps } from "@/types/grid";

/* Site Config */
import { siteConfig } from "@/config/site";

export default function Stack({ stack, tools }: any) {
  return (
    <>
      <meta charSet="UTF-8" />
      <title>Stack — Gabriel Fonseca</title>
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
        <div id="stack">
          <TypographyH2 className="font-serif">
            Stack
          </TypographyH2>

          <div className={classNames(
            "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
            "pt-8 pb-12"
        )}>
            {tools.map((item: ItemProps, index: number) => (
              <GridItem
                key={index}
                imageSrc={item.imageSrc}
                title={item.title}
                text={item.text}
                href={item.href}
              />
            ))}
          </div>
        </div>

        <div id="tools">
          <TypographyH2 className="font-serif">
            Tools
          </TypographyH2>

        <div className={classNames(
            "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
            "pt-8 pb-12"
        )}>
            {stack.map((item: ItemProps, index: number) => (
              <GridItem
                key={index}
                imageSrc={item.imageSrc}
                title={item.title}
                text={item.text}
                href={item.href}
              />
            ))}
          </div>

        </div>
      </motion.main>
    </>
  )
};

export async function getStaticProps() {
  const stData = await prisma.stack.findMany();
  const tlData = await prisma.tools.findMany();

  const stack = JSON.parse(JSON.stringify(stData));
  const tools = JSON.parse(JSON.stringify(tlData));

  return {
    props : { 
      stack: stack,
      tools: tools,
    },
  }
};