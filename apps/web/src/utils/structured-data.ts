import { CONFIG } from '@/constants/config';

/**
 * Generate Project structured data for SEO
 */
export function generateProjectStructuredData(project: {
  title: string;
  description: string;
  url: string;
  date?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name: project.title,
    description: project.description,
    url: `https://gabfon.com${project.url}`,
    author: {
      '@type': 'Person',
      name: CONFIG.name,
      url: 'https://gabfon.com/',
    },
    dateCreated: project.date,
    dateModified: project.date,
    publisher: {
      '@type': 'Person',
      name: CONFIG.name,
    },
  };
}

/**
 * Generate Person structured data for author
 */
export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: CONFIG.name,
    jobTitle: 'Software Developer',
    description: CONFIG.description,
    url: 'https://gabfon.com/',
    sameAs: [CONFIG.social.github, CONFIG.social.linkedin, CONFIG.social.x],
    worksFor: {
      '@type': 'Organization',
      name: 'Frontal',
      url: 'https://frontal.dev',
    },
  };
}

/**
 * Generate ContactPage structured data
 */
export function generateContactPageStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Gabriel Fonseca',
    description: 'Get in touch with Gabriel Fonseca',
    url: 'https://gabfon.com/contact',
    mainEntity: {
      '@type': 'Person',
      name: CONFIG.name,
      email: CONFIG.email.replace('mailto:', ''),
      sameAs: [CONFIG.social.github, CONFIG.social.linkedin, CONFIG.social.x],
    },
  };
}
