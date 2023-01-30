// ./pages/posts/index.tsx

import React from "react";

/* Utils */
import classNames from "classnames";

/* Components */
import { Typography } from "@/components/ui/typography";
import Post from "@/components/ui/post";

/* Framer Motion */
import { motion } from "framer-motion";
import { motionPage } from "@/lib/motion/animation";

/* Posts config */
import { posts } from "@/config/posts";

/* Types */
import { PostProps } from "@/types/post";

export default function Notes() {
  return (
    <>
      <meta charSet="UTF-8" />
      <title>Notes — Gabriel Fonseca</title>
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
          I use this page to share some of my thought's and ideias related with news, 
          code guides and other stuff.
        </Typography>

        <div id="posts">
          {
            posts.map((item: PostProps, index: number) => (
              <Post 
                key={index} 
                title={item.title} 
                text={item.text} 
                date={item.date} 
              />
            ))
          }
        </div>
      </motion.main>
    </>
  )
}
