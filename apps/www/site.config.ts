
// Setup and export site URL
export const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Types
interface SiteConfig {
  title: string;
  siteName: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
  mailSupport: string;
};

// Setup and export site config
export const siteConfig: SiteConfig = {
  title: 'Gabriel',
  siteName: 'Gabriel Fonseca',
  description: 'This is my site.',
  url: baseUrl,
  ogImage: `${baseUrl}/opengraph-image`,
  links: {
    twitter: 'https://twitter.com/codehagen',
    github: 'https://github.com/projectx-codehagen/Badget',
  },
  mailSupport: 'christer@sailsdock.com',
};