import merge from 'lodash.merge';
import type { Metadata } from 'next';

type MetadataGenerator = Omit<Metadata, 'description' | 'title'> & {
  title: string;
  description: string;
  image?: string;
};

const applicationName = 'Gabriel Fonseca';
const author: Metadata['authors'] = {
  name: 'Gabriel Fonseca',
  url: 'https://gabfon.com/',
};
const publisher = 'Gabriel Fonseca';
const xHandle = '@gabfon_';
/** Absolute base for resolving OG/canonical URLs. */
const siteUrl = process.env.NEXT_PUBLIC_WEB_URL ?? 'https://gabfon.com';

export const createMetadata = ({
  title,
  description,
  image,
  ...properties
}: MetadataGenerator): Metadata => {
  const defaultMetadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title,
    description,
    applicationName,
    authors: [author],
    creator: author.name,
    formatDetection: {
      telephone: false,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: applicationName,
      locale: 'en_US',
    },
    publisher,
    twitter: {
      card: 'summary_large_image',
      creator: xHandle,
    },
  };

  const metadata: Metadata = merge(defaultMetadata, properties);

  if (image && metadata.openGraph) {
    metadata.openGraph.images = [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      },
    ];
  }

  return metadata;
};
