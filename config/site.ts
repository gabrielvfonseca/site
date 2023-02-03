// ./config/site.ts

import { ItemProps } from "@/types/nav";

interface SiteConfig {
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
      title: "Guestbook",
      href: "/guestbook",
    },
    {
      title: "Stack",
      href: "/stack",
    },
  ],
  links: {
    twitter: "https://twitter.com/teenupdate",
    github: "https://github.com/gabrielvfonseca",
    linkedin: "https://www.linkedin.com/company/teenupdate/",
  },
  contacts: {
    mail: 'jg.fonseca@outlook.pt',
  }
}