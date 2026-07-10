import { CONFIG } from '@/constants/config';
import { getPosts, getProjects } from '@/lib/content-index';

const SITE_URL = 'https://gabfon.com';

/** Escape a string for safe inclusion in XML text/attribute nodes. */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** RFC-822 date for RSS `pubDate`, tolerant of missing/invalid dates. */
function toRfc822(date: string | undefined, fallback: Date): string {
  const parsed = date ? new Date(date) : null;
  return (
    parsed && !Number.isNaN(parsed.getTime()) ? parsed : fallback
  ).toUTCString();
}

interface FeedItem {
  title: string;
  description: string;
  url: string;
  date: string | undefined;
  categories: string[];
}

function renderItem(item: FeedItem, now: Date): string {
  const categories = item.categories
    .map((category) => `<category>${escapeXml(category)}</category>`)
    .join('\n      ');
  return `    <item>
      <title>${escapeXml(item.title)}</title>
      <description>${escapeXml(item.description)}</description>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <pubDate>${toRfc822(item.date, now)}</pubDate>
      <dc:creator>${escapeXml(CONFIG.name)}</dc:creator>
      ${categories}
    </item>`;
}

/**
 * GET /rss.xml — an RSS 2.0 feed generated from the real posts and projects in
 * the content index (no hardcoded/placeholder entries).
 */
export function GET() {
  const now = new Date();

  const postItems: FeedItem[] = getPosts().map((post) => ({
    title: post.title,
    description: post.description,
    url: `${SITE_URL}/posts/${post.slug}`,
    date: post.date,
    categories: ['Posts'],
  }));

  const projectItems: FeedItem[] = getProjects().map((project) => ({
    title: project.title,
    description: project.description,
    url: project.link || `${SITE_URL}/projects/${project.slug}`,
    date: project.date,
    categories: ['Projects'],
  }));

  const items = [...postItems, ...projectItems]
    .map((item) => renderItem(item, now))
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(CONFIG.name)} — Posts &amp; Projects</title>
    <description>${escapeXml(CONFIG.description)}</description>
    <link>${SITE_URL}</link>
    <language>en-us</language>
    <copyright>Copyright ${now.getFullYear()} ${escapeXml(CONFIG.name)}. All rights reserved.</copyright>
    <lastBuildDate>${now.toUTCString()}</lastBuildDate>
    <generator>Next.js</generator>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
