// ./pages/guestbook/index.tsx

import React, { useState } from "react";

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


export default function Guestbook({ feed }: any) {
  const [guest, setGuest] = useState("");
  const [message, setMessage] = useState("");

  const createRecord = () => {
    if (guest !== "" || message !== "") {
      const promise = fetch('/api/sandbox/guest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({guest: guest, message: message}),
      })
      // Reset vars
      setGuest("");
      setMessage("");
    }
  }

  return (
    <>
      <meta charSet="UTF-8" />
      <title>Guestbook — Gabriel Fonseca</title>
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
        className={classNames("space-y-10")}
      >
        <Typography>
          Leave your mark on my website by saying something nice! Thanks.
        </Typography>

        <motion.div
          className={classNames(
            "space-y-4 md:space-y-0 md:space-x-6",
            "block md:flex md:justify-between"
          )}>
            <Input 
              type="text" 
              value={guest}
              onChange={e => setGuest(e.target.value)}
              className="md:w-max" 
              placeholder="Username" 
              required
            />

            <div className="relative w-full">
              <Input 
                type="text" 
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full" 
                placeholder="Say something nice..." 
              />

              <button 
                onClick={createRecord}
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
        </motion.div>

        <div id="guests" className="space-y-2">
          {feed?.slice(0).reverse().map((item: CommitProps, index: number) => (
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

export async function getStaticProps() {
  const data = await prisma.guest.findMany();
  const feed = JSON.parse(JSON.stringify(data));

  return {
    props : { feed },
  }
};
