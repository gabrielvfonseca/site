import { CONFIG } from '@/constants/config';
import { getPosts, getProjects } from '@/lib/content-index';

/**
 * GET /llms.txt — a concise, plain-text profile for LLM consumption, generated
 * from the site config and real content.
 */
export function GET() {
  const posts = getPosts()
    .map((post) => `- ${post.title}: ${post.description} (/posts/${post.slug})`)
    .join('\n');

  const projects = getProjects()
    .map(
      (project) =>
        `- ${project.title}: ${project.description} (${project.link || `/projects/${project.slug}`})`
    )
    .join('\n');

  const content = `# ${CONFIG.name} — Portfolio (gabfon.com)

${CONFIG.location}-based software developer, founder of Frontal Labs, and Computer Engineering student at NOVA FCT.

## Summary
${CONFIG.description}

## Technical stack
- Frameworks: Next.js, React, Tailwind CSS
- Languages: TypeScript, JavaScript
- Focus: full-stack product development, web performance, developer tooling

## Posts
${posts || '- No posts published yet.'}

## Projects
${projects || '- No projects published yet.'}

## Site
A personal site built with Next.js (App Router) and a design system in Tailwind. Features a contact form (server actions + Resend), and a live "activity" heatmap aggregating GitHub contributions, Strava activities and Spotify listening.

## Contact
- Email: ${CONFIG.email.replace('mailto:', '')}
- X: ${CONFIG.social.x}
- GitHub: ${CONFIG.social.github}
- LinkedIn: ${CONFIG.social.linkedin}
`;

  return new Response(content, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
