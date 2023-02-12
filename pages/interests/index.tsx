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
import { HyperlinkDash } from "@/components/ui/hyperlink";

/* Framer Motion */
import { motion } from "framer-motion";
import { motionPage, motionTracks } from "@/lib/motion/animation";

/* Site Config */
import { siteConfig } from "@/config/site";

export default function Interests({ data }: any) {
  return (
    <>
      <meta charSet="UTF-8" />
      <title>Interests — Gabriel Fonseca</title>
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
        className={"space-y-5"}
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
            Years ago, at the age of 11, when I started programming and jamming around with 
            computers and stuff, I hated programming because I didn't understand it well, 
            I was more like a hardware guy.
          </Typography>

          <Typography>
            At the same time, I applied to a robotics workshop at IST where we learned to build some straightforward robots using Arduino.
          </Typography>

          <Typography>
            Then I started using Python for bot creation and messing around with my friends. Later I built my first local web 
            server cluster using old computers that I had around at the time and hosted WordPress websites using PHP (all by myself 👀). 
            At the same time, I started a blog where I applied my WordPress skills and later I've done the same on friends' and 
            clients' websites ✨.
          </Typography>

          <Typography>
            I made my high school in a computer science course, where I learned Javascript (definitely love at the first sight 🤣), 
            then python again, and some database technologies. To be honest, I learned more on my own than in school. Check the 
            <HyperlinkDash href="/stack" className="mr-1">Stack</HyperlinkDash> 
            page to view it all.
          </Typography>

          <TypographyH3 className="font-serif">Artificial Inteligence</TypographyH3>

          <Typography>
            Apart from web or app development, the truth is Artificial intelligence 
            fascinates me, the way we make a computer "think" 🧠 is amazing and unreal! 
          </Typography>

          <Typography>
            Although I am not the most experienced guy, I dedicated a lot of work on studying 
            different algorithms and approches in Natural Language Processing using Transformers 
            and Image Recognition using CNN's, and so on.
          </Typography>

          <Blockquote>
            "Artificial intelligence would be the ultimate version of Google. The ultimate 
            search engine that would understand everything on the web. It would understand 
            exactly what you wanted, and it would give you the right thing. We're nowhere 
            near doing that now. However, we can get incrementally closer to that, and 
            that is basically what we work on." — Lary Page
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