
// Types
import type { MetadataRoute } from 'next';
 
// Import site configuration
import { siteConfig } from '@/site.config';

// Robots.txt configuration
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
};
