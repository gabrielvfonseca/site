// ./pages/interests/index.tsx

import React from "react";

/* Next */
import Link from "next/link";

/* Styles */
import classNames from "classnames";

/* Components */
import { 
  Blockquote, 
  Typography, 
  TypographyH2,
  TypographyH3, 
  TypographyH4,
  TypographyList
} from "@/components/ui/typography";

/* Framer Motion */
import { motion } from "framer-motion";
import { motionPage, motionTracks } from "@/lib/motion/animation";


export default function Interests({ data }: any) {
  return (
    <>
      <meta charSet="UTF-8" />
      <title>Interests — Gabriel Fonseca</title>
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
        <Typography>
          Some stuff I like to do or I'm currently jamming in :D
        </Typography>

        <div id="programming" className={classNames(
          "space-y-6 pt-4 pb-14", 
          "border-b-1 border-solid border-border"
        )}>
          <TypographyH2 className="font-serif">Programming</TypographyH2>

          <Typography>
            For my undergraduate research, I assembled and annotated the mitochondrial 
            genome of H. Lacustris, a freshwater green alga. We discovered that its 
            mitochondrion shared 90% of its genetic sequence with that of its chloroplast. 
            It was the first time a result of this nature had been found in green alga.
          </Typography>

          <TypographyH3 className="font-serif">Data science</TypographyH3>

          <Typography>
            Many years ago, when I was about fourteen, I was introduced to a 
            computer science graduate student in Sri Lanka. I got to know him at 
            a photoshoot for a magazine that we were publishing at the time. 
            After we were done, I saw him sitting on the floor, with his laptop on 
            a step, waiting for some program that seemed to be outputting endless 
            strings of characters to finish running. Obviously, I was curious and 
            asked him about it.
          </Typography>

          <Blockquote>
            Genetic algorithms use random exploration of the problem space combined with 
            evolutionary processes like mutations and crossovers (exchange of genetic information) 
            to improve guesses. But also, because they have no experience in the problem domain, 
            they could try things a human would never think to try.
          </Blockquote>

          <Typography>
            For my undergraduate research, I assembled and annotated the mitochondrial 
            genome of H. Lacustris, a freshwater green alga. We discovered that its 
            mitochondrion shared 90% of its genetic sequence with that of its chloroplast. 
            It was the first time a result of this nature had been found in green alga.
          </Typography>

        </div>

        <div id="music" className={classNames(
          "space-y-4 pt-10 pb-14", 
          "border-b-1 border-solid border-b-border",
          "border-opacity-30 dark:border-opacity-100",
        )}>
          <TypographyH2 className="font-serif">Music</TypographyH2>

          <Typography>
            On my free time I play the guitar and mix with some DJ equipment.
          </Typography>

          <TypographyList items={[
            "Harley Benton R-456FR BK",
            "Pionner DDJ-SB2",
          ]} className={classNames(
            "my-6 ml-6 pb-6", 
            "list-disc [&>li]:mt-2"
          )} />

          {/*<Ratio src="static/images/interests/guitar.jpg" alt="My Harley Benton"/>*/}
        </div>

        <div id="tracks" className="space-y-4 py-10">
          <TypographyH2 className="font-serif">Top tracks</TypographyH2>

          <Typography>
            Curious what I'm currently jamming to? Here's my top tracks on Spotify updated daily.
          </Typography>

          <div className="pt-2">
            {data?.items.map((item: any, index: number) => (
              <motion.li 
                key={index}
                initial={motionTracks.initial}
                whileInView={motionTracks.whileInView}
                transition={motionTracks.transition}
                className={classNames(
                "w-full flex", 
                "py-6 space-x-6",
                "items-center",
                "[&:not(:last-child)]:border-b-1 border-solid border-b-border",
                "border-opacity-30 dark:border-opacity-100",
              )}>
                <div className={classNames(
                  "w-fit", 
                  "font-semibold font-serif",
                  "text-black dark:text-white",
                )}>
                  {index+1}
                </div>

                <div className="space-y-2">
                  <Link 
                    href={item?.external_urls.spotify} 
                    target="_blank"
                    passHref
                  >
                    <TypographyH4 className={classNames(
                      "font-semibold font-serif",
                      "text-black text-opacity-80 dark:text-gray-dark hover:text-opacity-60 dark:hover:text-opacity-70", 
                      "transition ease-in-out delay-150"
                    )}>
                      {item?.name}
                    </TypographyH4>
                  </Link>

                  <span className={classNames(
                    "text-gray-light dark:text-gray-dark text-opacity-80 dark:text-opacity-60", 
                    "font-sans"
                  )}>
                    {item?.artists[0].name}
                  </span>
                </div>
              </motion.li>
            ))}
          </div>

        </div>
      </motion.main>
    </>
  )
};

export async function getServerSideProps() {
  const res = await fetch('https://gabriel-website.vercel.app/api/spotify/tracks');
  const data = await res.json();

  return {
    props: {
      data
    }
  };
}