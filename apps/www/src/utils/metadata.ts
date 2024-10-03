
// Import the Metadata type
import { Metadata } from "next";

// Configuration related to metadata
import { siteConfig } from "@/site.config";

// Type to construct metadata
interface ConstructMetadata {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
};

// Construct the metadata
export function constructMetadata ({
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
}: ConstructMetadata = {}): Metadata {
  return {
    title,
    description,
    generator: 'Next.js',
    applicationName: 'Next.js',
    referrer: 'origin-when-cross-origin',
    keywords: [
        'Developer', 
        'Software', 
        'Student', 
        'Engineer', 
        'Gabriel', 
        'Fonseca',
    ],
    authors: { name: 'Gabriel' },
    creator: '@gabrielvfonseca',
    publisher: '@gabrielvfonseca',
    formatDetection: {
      email: true,
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: siteConfig.title,
      description: siteConfig.description,
      url: siteConfig.url,
      siteName: siteConfig.title,
      images: [
        {
          url: siteConfig.ogImage, // Must be an absolute URL
          width: 1200,
          height: 630,
          alt: 'Gabriel',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: siteConfig.links.twitter,
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    manifest: `${siteConfig.url}/site.webmanifest`,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
};