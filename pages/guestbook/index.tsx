// ./pages/guestbook/index.tsx

import React, { useEffect, useState } from "react";

/* Styles */
import classNames from "classnames";

/* Radix Icons */
import { PaperPlaneIcon } from "@radix-ui/react-icons";

/* Components */
import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";

/* Framer Motion */
import { motion } from "framer-motion";
import { 
  motionPage, 
  motionCommits,
} from "@/lib/motion/animation";

/* Prisma */
import { prisma } from "@/lib/prisma";

/* Types */
import { CommitProps } from "@/types/post";

/* Site Config */
import { siteConfig } from "@/config/site";

export default function Guestbook(props: any) {
  const [data, setData] = useState({
    guest: "",
    message: "",
  });

  const createRecord = () => {
    if (data.guest !== "" || data.message !== "") {
      fetch('/api/sandbox/guest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guest: data.guest, 
          message: data.message
        }),
      })
    }
  }

  return (
    <>
      <meta charSet="UTF-8" />
      <title>Guestbook — Gabriel Fonseca</title>
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
        className={"space-y-10"}
      >
        <Typography>
          Leave your mark on my website by saying something nice! Thanks.
        </Typography>

        <motion.form
          className={classNames(
            "space-y-4 md:space-y-0 md:space-x-6",
            "block md:flex md:justify-between"
          )}>
            <Input 
              type="text" 
              value={data.guest}
              onChange={e => setData({...data, guest: e.target.value})}
              className="md:w-max" 
              placeholder="Username" 
              required
            />

            <div className="relative w-full">
              <Input 
                type="text" 
                value={data.message}
                onChange={e => setData({...data, message: e.target.value})}
                className="w-full" 
                placeholder="Say something nice..." 
              />

              <button 
                onClick={() => 
                  createRecord()
                }
                className={classNames(
                  "text-black dark:text-white hover:text-opacity-70", 
                  "absolute right-2 top-2",
                  "focus:outline-none",
                  "py-1 px-2", "cursor-pointer",
                  "transition ease-in-out delay-100"
                )}>
                <PaperPlaneIcon width={18} height={18} />
              </button>
            </div>
        </motion.form>

        <div id="guests" className="space-y-2">
          {props.data.feed?.slice(0).reverse().map((item: CommitProps, index: number) => (
            <motion.div 
              key={index}
              initial={motionCommits.initial}
              transition={motionCommits.transition}
              whileInView={motionCommits.whileInView}
              className="flex space-x-4 items-center"
            >
              <span className={classNames(
                "font-sans font-medium",
                "text-sm",
              )}>
                {item.guest}
              </span>
              <p className={
                classNames(
                  "text-gray-light dark:text-gray-light", 
                  "font-sans", "z-0",
                  "leading-7", "text-sm"
              )}>
                {item.message}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.main>
    </>
  )
};

export async function getServerSideProps() {
  const data = await prisma.guest.findMany();
  const feed = JSON.parse(JSON.stringify(data));

  return {
    props: {
      data: { feed },
    },
  };
}