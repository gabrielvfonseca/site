// ./pages/interests/index.tsx

import React from "react";

/* Next */
import Link from "next/link";

/* SWR */
import useSWR from 'swr';

/* Styles */
import classNames from "classnames";

/* Components */
import { Typography, TypographyH3, TypographyH4 } from "@/components/ui/typography";
import Ratio from "@/components/ui/ratio";

/* Framer Motion */
import { motion } from "framer-motion";
import { motionPage, motionTracks } from "@/lib/motion/animation";


export default function Interests({ data }: any) {
  return (
    <>
      <meta charSet="UTF-8" />
      <title>Interests — Gabriel Fonseca</title>
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
          Some stuff I like to do or I'm currently jamming in :D
        </Typography>

        <div id="programming" className={classNames(
          "space-y-6 pt-4 pb-14", 
          "border-b-1 border-solid border-border"
        )}>
          <TypographyH3 className="font-serif">Programming</TypographyH3>

          <Typography className="text-gray-dark text-opacity-80">
            For my undergraduate research, I assembled and annotated the mitochondrial 
            genome of H. Lacustris, a freshwater green alga. We discovered that its 
            mitochondrion shared 90% of its genetic sequence with that of its chloroplast. 
            It was the first time a result of this nature had been found in green alga.
          </Typography>

          <TypographyH3 className="font-serif">Data science</TypographyH3>

          <Typography className="text-gray-dark text-opacity-80">
            Many years ago, when I was about fourteen, I was introduced to a 
            computer science graduate student in Sri Lanka. I got to know him at 
            a photoshoot for a magazine that we were publishing at the time. 
            After we were done, I saw him sitting on the floor, with his laptop on 
            a step, waiting for some program that seemed to be outputting endless 
            strings of characters to finish running. Obviously, I was curious and 
            asked him about it.
          </Typography>

          <blockquote className={classNames(
            "pl-6", 
            "border-l-1 border-over-dark dark:border-white border-opacity-80", 
            "italic text-gray-light text-opacity-75 dark:text-gray-dark"
          )}>
            Genetic algorithms use random exploration of the problem space combined with 
            evolutionary processes like mutations and crossovers (exchange of genetic information) 
            to improve guesses. But also, because they have no experience in the problem domain, 
            they could try things a human would never think to try.
          </blockquote>

          <Typography className="text-gray-dark text-opacity-80">
            For my undergraduate research, I assembled and annotated the mitochondrial 
            genome of H. Lacustris, a freshwater green alga. We discovered that its 
            mitochondrion shared 90% of its genetic sequence with that of its chloroplast. 
            It was the first time a result of this nature had been found in green alga.
          </Typography>

          <TypographyH4 className="font-serif">Stack & Tools</TypographyH4>
          <ul className={classNames(
            "my-6 ml-6", 
            "list-disc [&>li]:mt-2"
          )}>
            <li>Javascript & Typescript {"<3"}</li>
            <li>Next.js with React.js</li>
            <li>HTML, CSS e Tailwindcss</li>
            <li>Python, Rust, Arduino</li>
            <li>MongoDB, mySQL, Redis</li>
            <li>Docker</li>
          </ul>
        </div>

        <div id="music" className={classNames(
          "space-y-4 pt-10 pb-14", 
          "border-b-1 border-solid border-border"
        )}>
          <TypographyH3 className="font-serif">Music</TypographyH3>
          <Typography className="text-gray-dark text-opacity-80">
            On my free time I play the guitar and mix with some DJ equipment.
          </Typography>

          <ul className={classNames(
            "my-6 ml-6 pb-6", 
            "list-disc [&>li]:mt-2"
          )}>
            <li>Harley Benton R-456FR BK</li>
            <li>Pionner DDJ-SB2</li>
          </ul>

          <Ratio src="static/gallery/interests/hb.jpg" alt="My Harley Benton"/>
        </div>

        <div id="tracks" className="space-y-4 py-10">
          <TypographyH3 className="font-serif">Top tracks</TypographyH3>
          <Typography className="text-gray-dark text-opacity-80">
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
                "border-b-1 border-solid border-border last:border-none"
              )}>
                <div className={classNames(
                  "w-fit", 
                  "font-semibold font-serif",
                  "dark:text-white",
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
                      "text-gray-dark hover:text-opacity-70", 
                      "transition ease-in-out delay-150"
                    )}>
                      {item?.name}
                    </TypographyH4>
                  </Link>

                  <span className={classNames(
                    "text-gray-dark text-opacity-60", 
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