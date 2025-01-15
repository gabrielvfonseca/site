import type { Metadata } from 'next';

type ConstructMetadataProperties = {
  title?: string;
  description?: string;
};

const publisher = 'Gabriel Fonseca';
const defaultTitle = publisher;
const defaultDescription = 'Software developer, tech enthusiast, and writer, living in Lisbon.';

const url = 'https://gabfon.com';
const applicationName = 'site';
const twitterHandle = '@gabfon_';

const author: Metadata['authors'] = {
  name: 'Gabriel Fonseca',
  url: url,
};

export const constructMetadata = ({ 
  title, description
}: ConstructMetadataProperties = {}): Metadata => {
  return {
    metadataBase: new URL(url),
    title: title || defaultTitle,
    description: description || defaultDescription,
    applicationName: applicationName,
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',
    authors: [author],
    creator: author.name,
    formatDetection: {
      telephone: false,
    },
    keywords: [
      'Developer', 
      'Software', 
      'Student', 
      'Engineer', 
      'Gabriel', 
      'Fonseca',
    ],
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: publisher,
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
      title: publisher,
      description: defaultDescription,
      images: '/opengraph-image.png',
      type: 'website',
      siteName: applicationName,
      locale: 'en_US',
    },
    publisher,
    twitter: {
      card: 'summary_large_image',
      creator: twitterHandle,
      images: '/opengraph-image.png',
    },
  } as Metadata;
};