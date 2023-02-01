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

/* Types */
import { RowProps } from "@/types/row";

const Row: React.FC<RowProps> = ({title, href, state, text}) => (
  <motion.tr 
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
        href={href} 
        target="_blank" 
        className="text-opacity-100 hover:text-opacity-60"
      >
        {title}
      </Hyperlink>

      {state && <motion.span 
        initial={motionBadge.initial}
        animate={motionBadge.animate}
        transition={motionBadge.transition}
        className={classNames(
          "ml-6 py-1 px-2.5",
          "text-sm text-gray-light dark:text-gray-dark text-opacity-75",
          "border-1 border-gray-light border-solid",
          "rounded-full"
        )}>
          {state}
      </motion.span>}
    </td>
    <td className={classNames(
      "font-sans font-medium",
      "text-gray-light text-sm",
      "text-opacity-70 dark:text-opacity-100",
      "text-right uppercase",
      "py-4"
    )}>
      {text}
    </td>
  </motion.tr>
)

export default function Projects() {
  return (
    <>
<meta charSet="UTF-8" />
      <title>Projects — Gabriel Fonseca</title>
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
      

      
      <motion.main 
        initial={motionPage.initial}
        animate={motionPage.animate}
        transition={motionPage.transition}
        exit={motionPage.exit}
        className={classNames("space-y-8")}
      >
        <Typography>
          Here're the projects that I've spent most of my time on. 
          <br />Go check them out. ↓
        </Typography>

        <table className="w-full">
          <tbody>
            <Row 
              title="Aurora.ai" 
              state="building" 
              href="https://aurora.ai" 
              text="Founder & Developer" 
            />
            <Row 
              title="teenupdate" 
              href="https://teenupdate.pt" 
              text="Co-founder & writter" 
            />
          </tbody>
        </table>

      </motion.main>
    </>
  )
}
