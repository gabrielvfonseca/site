// ./config/site.ts

import { ItemProps } from "@/types/nav";

interface SiteConfig {
  title: string,
  meta: {
    description: string,
    author: string,
    keywords: string[],
    favicon: {
      icon: string,
      "32x32": string,
      "16x16": string,
      "apple-touch": string,
      "safari-tab": string
    },
    "theme-color": "#FFF" | "#000",
    manifest: string,
    canonical: string,
    og: {
      site: string,
      title: string,
      description: string,
      image: string,
      url: string,
      card: string,
    },
  },
  mainNav: ItemProps[]
  links: {
    twitter: string
    github: string
    linkedin: string
  }
  contacts: {
    mail: string,
  }
}

export const siteConfig: SiteConfig = {
  title: "Gabriel Fonseca",
  meta: {
    description: "Gabriel's software developer portfolio: This website is my brain dump'",
    author: "Gabriel Fonseca",
    keywords: [
      'developer', 
      'full stack developer', 
      'software developer', 
      'front end developer', 
      'web developer', 
      'back end developer', 
      'backend developer', 
      'frontend developer', 
      'front-end developer', 
      'back-end developer', 
      'app developer', 
      'website developer', 
      'python', 
      'javascript', 
      'nextjs', 
      'react', 
      'sql', 
      'mongodb', 
      'rust', 
      'arduino', 
      'wordpress', 
      'php', 
      'full stack web developer', 
      'portfolio web developer', 
      'web developer portfolio'
    ],
    favicon: {
      icon: "/static/favicon/favicon.ico",
      "32x32": "/static/favicon/favicon-32x32.png",
      "16x16": "/static/favicon/favicon-16x16.png",
      "apple-touch": "/static/favicon/apple-touch-icon.png",
      "safari-tab": "/static/favicon/safari-pinned-tab.svg",
    },
    "theme-color": "#FFF",
    manifest: "/static/favicon/site.webmanifest.json",
    canonical: "https://gabfon.me",

    og: {
      site: "Gabriel Fonseca",
      title: "Gabriel's Personal website",
      description: "Personal Software Developer Portfolio — Gabriel Fonseca",
      image: "/static/favicon/twitter-card.png",
      url: "https//www.gabfon.me",
      card: "summary"
    },
  },
  mainNav: [
    {
      title: "About",
      href: "/",
    },
    {
      title: "Interests",
      href: "/interests",
    },
    {
        title: "Notes",
        href: "/notes",
    },
    {
        title: "Projects",
        href: "/projects",
    },
    {
      title: "Stack",
      href: "/stack",
    },
  ],
  links: {
    twitter: "https://twitter.com/GabrieFonseca_",
    github: "https://github.com/gabrielvfonseca",
    linkedin: "https://www.linkedin.com/in/gabrielfonsecaa/",
  },
  contacts: {
    mail: 'jg.fonseca@outlook.pt',
  }
}