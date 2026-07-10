import { CONFIG } from '@/constants/config';
import { getPosts, getProjects } from '@/lib/content-index';

/**
 * GET /llms.md — a structured Markdown profile for LLM consumption, generated
 * from the site config and real content.
 */
export function GET() {
  const updated = new Date().toISOString().split('T')[0];

  const posts = getPosts()
    .map(
      (post) => `### [${post.title}](/posts/${post.slug})\n${post.description}`
    )
    .join('\n\n');

  const projects = getProjects()
    .map(
      (project) =>
        `### [${project.title}](${project.link || `/projects/${project.slug}`})\n${project.description}`
    )
    .join('\n\n');

  const content = `# ${CONFIG.name}

> ${CONFIG.title} • [gabfon.com](https://gabfon.com)

---

## About

${CONFIG.location}-based software developer, founder of [Frontal Labs](https://frontal.dev), and Computer Engineering student at [NOVA FCT](https://www.fct.unl.pt).

- **Location**: ${CONFIG.location}
- **Email**: [${CONFIG.email.replace('mailto:', '')}](${CONFIG.email})

## Technical Expertise

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, serverless functions, edge runtimes
- **Practice**: product development, web performance, accessibility, developer tooling

## Posts

${posts || 'No posts published yet.'}

## Projects

${projects || 'No projects published yet.'}

## Connect

- **X**: [${CONFIG.social.x}](${CONFIG.social.x})
- **LinkedIn**: [${CONFIG.social.linkedin}](${CONFIG.social.linkedin})
- **GitHub**: [${CONFIG.social.github}](${CONFIG.social.github})
- **Schedule**: [${CONFIG.schedule}](${CONFIG.schedule})

---

*Last updated: ${updated} · [gabfon.com](https://gabfon.com)*
`;

  return new Response(content, {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
}
