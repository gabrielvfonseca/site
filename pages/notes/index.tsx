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


export default function Notes({ feed }: any) {
  const [site, setSite] = useState(false);

  return (
    <>
      <meta charSet="UTF-8" />
      <title>Notes — Gabriel Fonseca</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />

      <meta name="author" content="Gabriel Fonseca" />
      <meta name="description" content="Gabriel Fonseca — Software Developer" />
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

      <link href="/static/favicon/site.webmanifest" rel="manifest" />

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
      
      {/* Main component page 👇🏼 */}
      
      <motion.main 
        initial={motionPage.initial}
        animate={motionPage.animate}
        transition={motionPage.transition}
        exit={motionPage.exit}
        className={classNames("space-y-5")}
      >
        <Typography>
          I use this page to share some of my thought's and ideias related with news, 
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
            text="This is a really simple developer portfolio I develop in about 4 days, using Nextjs@13 🤩. My intention with this, is to document my journey in the wild world of programming. I hope you enjoy it, if you like it, please like it above and check this website stack if you're curious. Cheers!"
            date="2 February, 2023"
          />

          <div className="item-center inline-flex">
            <HoverCard
              defaultOpen={false}
              open={site}
              onOpenChange={setSite}
            >
              <Button variant="outline" size="default" onClick={() => setSite(!site)}>Check website build</Button>
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
                    "Build appon Next.js@13", 
                    "With amazing Typescript", 
                    "Styled using beloved Tailwindcss styles", 
                    "Based on awesome Radix components", 
                    "Animated with Framer Motion", 
                    "Powered by Prisma and Planetscale",
                    "Set with the beautiful Inter & Unbounded fonts!"
                  ]} className="text-sm" />
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