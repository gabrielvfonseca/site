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
      "[&:not(:last-child)]:border-b-1 border-solid border-b-border"
  )}>
    <td className={classNames(
      "font-sans font-medium", 
      "text-gray-dark", 
      "text-left",
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
          "text-sm text-gray-dark text-opacity-75",
          "border-1 border-gray-light border-solid",
          "rounded-full"
        )}>
          {state}
      </motion.span>}
    </td>
    <td className={classNames(
      "font-sans font-medium",
      "text-gray-light text-sm",
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
      <meta name="description" content="Gabriel's portfolio website — Software Developer" />
      <meta name="keywords" content="HTML, CSS, JavaScript" />
      <meta name="author" content="Gabriel Fonseca" />

      <link rel="icon" href="/favicon.ico" />
      
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
