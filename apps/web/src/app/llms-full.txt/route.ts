import { CONFIG } from '@/constants/config';
import { getPosts, getProjects } from '@/lib/content-index';

/**
 * GET /llms-full.txt — a comprehensive plain-text profile for detailed LLM
 * analysis, generated from the site config and real content.
 */
export function GET() {
  const updated = new Date().toISOString().split('T')[0];

  const posts = getPosts()
    .map(
      (post) =>
        `### ${post.title}\n${post.description}\nURL: /posts/${post.slug}${post.date ? `\nDate: ${post.date}` : ''}`
    )
    .join('\n\n');

  const projects = getProjects()
    .map(
      (project) =>
        `### ${project.title}\n${project.description}\nURL: ${project.link || `/projects/${project.slug}`}`
    )
    .join('\n\n');

  const content = `# ${CONFIG.name} — Comprehensive Portfolio (gabfon.com)

## Personal Information
Name: ${CONFIG.name}
Title: ${CONFIG.title}
Location: ${CONFIG.location}
Email: ${CONFIG.email.replace('mailto:', '')}

## Professional Summary
${CONFIG.description} Founder of Frontal Labs and Computer Engineering student at NOVA FCT. Focused on shipping polished, accessible, performant web products.

## Technical Expertise
- Frontend: React, Next.js (App Router), TypeScript, Tailwind CSS, design systems
- Backend: Node.js, serverless & edge functions, server actions
- Practice: web performance & Core Web Vitals, accessibility (WCAG), testing (Vitest, Playwright), CI/CD

## Posts
${posts || 'No posts published yet.'}

## Projects
${projects || 'No projects published yet.'}

## About This Site
Built with Next.js 16 (App Router) and React 19 in a Turborepo monorepo with a shared Tailwind design system. Features: MDX-powered posts and projects, a contact form (React server actions + Resend), and a live activity heatmap that aggregates GitHub contributions, Strava activities, and Spotify listening. Security via Arcjet + Nosecone headers and Upstash-backed rate limiting; analytics via PostHog + Vercel; error tracking via Sentry.

## Connect
X: ${CONFIG.social.x}
LinkedIn: ${CONFIG.social.linkedin}
GitHub: ${CONFIG.social.github}
Schedule: ${CONFIG.schedule}

---
Last updated: ${updated}
Portfolio URL: https://gabfon.com
`;

  return new Response(content, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
