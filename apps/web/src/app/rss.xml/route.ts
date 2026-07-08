import { CONFIG } from '@/constants/config';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatDate(date: Date): string {
  return date.toUTCString();
}

// Constants for time calculations (in milliseconds)
const SEVEN_DAYS_IN_MS = 604_800_000;
const FOURTEEN_DAYS_IN_MS = 1_209_600_000;
const TWENTY_ONE_DAYS_IN_MS = 1_814_400_000;
const THIRTY_DAYS_IN_MS = 2_592_000_000;
const FORTY_FIVE_DAYS_IN_MS = 3_888_000_000;
const SIXTY_DAYS_IN_MS = 5_184_000_000;
const SEVENTY_FIVE_DAYS_IN_MS = 6_480_000_000;

export function GET() {
  const now = new Date();
  const siteUrl = 'https://gabfon.com';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(CONFIG.name)} - Portfolio &amp; Blog</title>
    <description>${escapeXml(CONFIG.description)}</description>
    <link>${siteUrl}</link>
    <language>en-us</language>
    <copyright>Copyright ${now.getFullYear()} ${escapeXml(CONFIG.name)}. All rights reserved.</copyright>
    <lastBuildDate>${formatDate(now)}</lastBuildDate>
    <generator>Gabriel Fonseca Portfolio RSS Feed</generator>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    
    <!-- Portfolio Update -->
    <item>
      <title>Portfolio Updated - ${escapeXml(CONFIG.name)}</title>
      <description>Comprehensive portfolio showcasing software development projects, technical expertise, and professional experience.</description>
      <link>${siteUrl}</link>
      <guid isPermaLink="true">${siteUrl}</guid>
      <pubDate>${formatDate(new Date(now.getTime() - SEVEN_DAYS_IN_MS))}</pubDate>
      <dc:creator>${escapeXml(CONFIG.name)}</dc:creator>
      <category>Portfolio</category>
      <category>Web Development</category>
    </item>
    
    <!-- Frontal Labs Project -->
    <item>
      <title>Frontal Labs - AI-Powered Business Platform</title>
      <description>Building an AI-powered platform to streamline business operations and enhance decision-making processes through intelligent automation.</description>
      <link>https://frontal.dev</link>
      <guid isPermaLink="true">https://frontal.dev</guid>
      <pubDate>${formatDate(new Date(now.getTime() - FOURTEEN_DAYS_IN_MS))}</pubDate>
      <dc:creator>${escapeXml(CONFIG.name)}</dc:creator>
      <category>AI</category>
      <category>Startup</category>
      <category>Business</category>
    </item>
    
    <!-- Technical Blog Post -->
    <item>
      <title>Edge AI with WebLLM and WebGPU</title>
      <description>Exploring browser-based AI implementations using WebLLM and WebGPU for client-side machine learning applications.</description>
      <link>${siteUrl}/posts/edge-ai-weblm-webgpu</link>
      <guid isPermaLink="true">${siteUrl}/posts/edge-ai-weblm-webgpu</guid>
      <pubDate>${formatDate(new Date(now.getTime() - TWENTY_ONE_DAYS_IN_MS))}</pubDate>
      <dc:creator>${escapeXml(CONFIG.name)}</dc:creator>
      <category>AI</category>
      <category>Web Development</category>
      <category>Tutorial</category>
    </item>
    
    <!-- Open Source Contribution -->
    <item>
      <title>Fluent Theme - VS Code Theme Update</title>
      <description>Updated Fluent Theme with improved color contrast and new syntax highlighting for better developer experience.</description>
      <link>https://marketplace.visualstudio.com/items?itemName=gabfon.fluent-theme</link>
      <guid isPermaLink="true">https://marketplace.visualstudio.com/items?itemName=gabfon.fluent-theme</guid>
      <pubDate>${formatDate(new Date(now.getTime() - THIRTY_DAYS_IN_MS))}</pubDate>
      <dc:creator>${escapeXml(CONFIG.name)}</dc:creator>
      <category>Open Source</category>
      <category>VS Code</category>
      <category>Developer Tools</category>
    </item>
    
    <!-- Performance Optimization -->
    <item>
      <title>Web Performance Optimization Guide</title>
      <description>Comprehensive guide to optimizing web applications for Core Web Vitals and achieving optimal user experience.</description>
      <link>${siteUrl}/posts/web-performance-optimization</link>
      <guid isPermaLink="true">${siteUrl}/posts/web-performance-optimization</guid>
      <pubDate>${formatDate(new Date(now.getTime() - FORTY_FIVE_DAYS_IN_MS))}</pubDate>
      <dc:creator>${escapeXml(CONFIG.name)}</dc:creator>
      <category>Performance</category>
      <category>Web Development</category>
      <category>Best Practices</category>
    </item>
    
    <!-- Next.js Tutorial -->
    <item>
      <title>Building Static Sites with Next.js App Router</title>
      <description>Step-by-step tutorial on creating high-performance static websites using Next.js 13+ App Router and modern web standards.</description>
      <link>${siteUrl}/posts/nextjs-static-sites-app-router</link>
      <guid isPermaLink="true">${siteUrl}/posts/nextjs-static-sites-app-router</guid>
      <pubDate>${formatDate(new Date(now.getTime() - SIXTY_DAYS_IN_MS))}</pubDate>
      <dc:creator>${escapeXml(CONFIG.name)}</dc:creator>
      <category>Next.js</category>
      <category>React</category>
      <category>Tutorial</category>
    </item>
    
    <!-- TypeScript Best Practices -->
    <item>
      <title>TypeScript Best Practices for Large Applications</title>
      <description>Essential TypeScript patterns and practices for building scalable, maintainable web applications.</description>
      <link>${siteUrl}/posts/typescript-best-practices</link>
      <guid isPermaLink="true">${siteUrl}/posts/typescript-best-practices</guid>
      <pubDate>${formatDate(new Date(now.getTime() - SEVENTY_FIVE_DAYS_IN_MS))}</pubDate>
      <dc:creator>${escapeXml(CONFIG.name)}</dc:creator>
      <category>TypeScript</category>
      <category>Best Practices</category>
      <category>Software Engineering</category>
    </item>

  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
