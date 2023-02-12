// ./pages/projects/index.tsx

import React from "react";

/* Styles */
import classNames from "classnames";

/* Components */
import { Typography } from "@/components/ui/typography";
import { Hyperlink } from "@/components/ui/hyperlink";

/* Framer Motion */
import { motion } from "framer-motion";
import { 
  motionPage, 
  motionRow, 
  motionBadge 
} from "@/lib/motion/animation";

/* Prisma */
import { prisma } from '@/lib/prisma';

/* Types */
import { ProjectProps } from "@/types/project";

/* Site Config */
import { siteConfig } from "@/config/site";

export default function Projects({ feed }: any) {
  return (
    <>
      <meta charSet="UTF-8" />
      <title>Projects — Gabriel Fonseca</title>
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
        className={"space-y-8"}
      >
        <Typography>
          Here're the projects that I've spent most of my time on. 
          <br />Go check them out. ↓
        </Typography>

        <table className="w-full">
          <tbody>
            {feed?.map((item: ProjectProps, index: number) => (
              <motion.tr 
                key={index}
                initial={motionRow.initial}
                whileInView={motionRow.whileInView}
                transition={motionRow.transition}
                className={classNames(
                  "m-0 p-0",
                  "[&:not(:last-child)]:border-b-1 border-solid border-b-border",
                  "border-opacity-30 dark:border-opacity-100",
              )}>
                <td className={classNames(
                  "font-sans font-medium", 
                  "text-gray-light dark:text-gray-dark", 
                  "text-left", "text-opacity-60",
                  "py-4"
                )}>
                  <Hyperlink 
                    href={item.href} 
                    target="_blank" 
                    className="text-opacity-100 hover:text-opacity-60"
                  >
                    {item.title}
                  </Hyperlink>

                  {item.state && <motion.span 
                    initial={motionBadge.initial}
                    animate={motionBadge.animate}
                    transition={motionBadge.transition}
                    className={classNames(
                      "ml-6 py-1 px-2.5",
                      "text-sm text-gray-light dark:text-gray-dark text-opacity-75",
                      "border-1 border-gray-light border-solid",
                      "rounded-full"
                    )}>
                      {item.state}
                  </motion.span>}
                </td>
                <td className={classNames(
                  "font-sans font-medium",
                  "text-gray-light text-sm",
                  "text-opacity-70 dark:text-opacity-100",
                  "text-right uppercase",
                  "py-4"
                )}>
                  {item.text}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.main>
    </>
  )
};

export async function getStaticProps() {
  const data = await prisma.project.findMany();
  const feed = JSON.parse(JSON.stringify(data));

  return {
    props : { feed },
  }
};