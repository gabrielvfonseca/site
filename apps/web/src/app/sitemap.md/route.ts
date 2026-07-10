import { CONFIG } from '@/constants/config';
import { getPosts, getProjects } from '@/lib/content-index';

/**
 * GET /sitemap.md — a human-readable Markdown sitemap reflecting the live
 * routes and real content (posts/projects) of the site.
 */
export function GET() {
  const updated = new Date().toISOString().split('T')[0];

  const posts = getPosts()
    .map(
      (post) => `- [${post.title}](/posts/${post.slug}) — ${post.description}`
    )
    .join('\n');

  const projects = getProjects()
    .map(
      (project) =>
        `- [${project.title}](${project.link || `/projects/${project.slug}`}) — ${project.description}`
    )
    .join('\n');

  const content = `# Sitemap — ${CONFIG.name} (gabfon.com)

A human-readable overview of every page and endpoint on gabfon.com.

---

## Pages

- [Home](/) — introduction, activity graph, projects and posts
- [Contact](/contact) — get in touch via the contact form

## Posts

${posts || '- No posts published yet.'}

## Projects

${projects || '- No projects published yet.'}

## Feeds & machine-readable

- [RSS](/rss.xml) — posts & projects feed (application/rss+xml)
- [Sitemap (XML)](/sitemap.xml) — crawler sitemap
- [Sitemap (Markdown)](/sitemap.md) — this document
- [llms.txt](/llms.txt) — concise profile for LLMs
- [llms.md](/llms.md) — structured profile for LLMs
- [llms-full.txt](/llms-full.txt) — full profile for LLMs
- [robots.txt](/robots.txt) — crawl directives

## API

- [/api/activity](/api/activity) — aggregated GitHub + Strava + Spotify daily activity

## Elsewhere

- [Frontal Labs](https://frontal.dev)
- [GitHub](${CONFIG.social.github})
- [LinkedIn](${CONFIG.social.linkedin})
- [X](${CONFIG.social.x})

---

*Last updated: ${updated} · Contact: ${CONFIG.email.replace('mailto:', '')}*
`;

  return new Response(content, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
    },
  });
}
