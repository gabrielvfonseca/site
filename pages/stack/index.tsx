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


export default function Stack({ stack, tools}: any) {
  return (
    <>
      <meta charSet="UTF-8" />
      <title>Stack — Gabriel Fonseca</title>
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

      <meta name="description" content="Gabriel's software developer portfolio: This website is my brain dump'" />

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
        <div id="stack">
          <TypographyH2 className="font-serif">Stack</TypographyH2>

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
          <TypographyH2 className="font-serif">Tools</TypographyH2>

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