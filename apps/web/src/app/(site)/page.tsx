import Link from 'next/link';
import type { JSX } from 'react';
import { ContributionGraph } from '@/components/contribution-graph';
import { Posts } from '@/components/posts';
import { Projects } from '@/components/projects';
import { CONFIG } from '@/constants/config';
import { hasPublishedPosts } from '@/utils/post';
import { hasProjects } from '@/utils/project';

/**
 * The Page for the site.
 * @returns The Page for the site.
 */
export default function Page(): JSX.Element {
  // Check if there are posts and projects
  const posts: boolean = hasPublishedPosts();
  const projects: boolean = hasProjects();

  return (
    <div className="flex flex-col gap-12">
      <section aria-label="About" className="flex flex-col gap-4">
        <p className="font-medium text-foreground">
          I'm a Lisbon-based software developer, founder, and Computer
          Engineering student at{' '}
          <Link
            aria-label="NOVA School of Science and Technology (opens in a new tab)"
            className="rounded text-foreground underline decoration-[0.5px] decoration-muted-foreground/30 underline-offset-4 transition-colors duration-200 hover:decoration-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            href="https://www.fct.unl.pt"
            rel="noopener noreferrer"
            target="_blank"
            title="NOVA School of Science and Technology"
          >
            NOVA School of Science and Technology
          </Link>
          .
        </p>
        <p>
          I'm currently building an{' '}
          <Link
            aria-label="AI-powered platform (opens in a new tab)"
            className="rounded text-foreground underline decoration-[0.5px] decoration-muted-foreground/30 underline-offset-4 transition-colors duration-200 hover:decoration-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            href="https://frontal.dev"
            rel="noopener noreferrer"
            target="_blank"
            title="AI-powered platform"
          >
            AI-powered platform
          </Link>{' '}
          to streamline business operations and decision-making. As the founder
          & CEO of{' '}
          <Link
            aria-label="Frontal (opens in a new tab)"
            className="rounded text-foreground underline decoration-[0.5px] decoration-muted-foreground/30 underline-offset-4 transition-colors duration-200 hover:decoration-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            href="https://frontal.dev"
            rel="noopener noreferrer"
            target="_blank"
            title="frontal.dev"
          >
            Frontal
          </Link>
          , I'm deeply involved in product development and user research.
        </p>
        <p>
          Outside of my startup, I engage in full-stack development for
          freelance and{' '}
          <Link
            aria-label="personal projects"
            className="rounded text-foreground underline decoration-[0.5px] decoration-muted-foreground/30 underline-offset-4 transition-colors duration-200 hover:decoration-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            href="#projects"
            title="personal projects"
          >
            personal projects
          </Link>{' '}
          , always seeking to solve real-world problems creatively. I regularly{' '}
          <Link
            aria-label="write posts"
            className="rounded text-foreground underline decoration-[0.5px] decoration-muted-foreground/30 underline-offset-4 transition-colors duration-200 hover:decoration-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            href="#posts"
            title="write posts"
          >
            write posts
          </Link>{' '}
          about my experiences and believe in{' '}
          <Link
            aria-label="building in public (opens in a new tab)"
            className="rounded text-foreground underline decoration-[0.5px] decoration-muted-foreground/30 underline-offset-4 transition-colors duration-200 hover:decoration-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            href={CONFIG.social.twitter}
            rel="noopener noreferrer"
            target="_blank"
            title="building in public"
          >
            building in public
          </Link>{' '}
          to share my journey and learnings. I'm an active participant in the
          tech, business, and startup communities, constantly learning and
          iterating.
        </p>
        <p>
          I'm{' '}
          <Link
            aria-label="open to connecting (opens in a new tab)"
            className="rounded text-foreground underline decoration-[0.5px] decoration-muted-foreground/30 underline-offset-4 transition-colors duration-200 hover:decoration-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            href={CONFIG.social.linkedin}
            rel="noopener noreferrer"
            target="_blank"
            title="open to connecting"
          >
            open to connecting
          </Link>{' '}
          with fellow builders, potential collaborators, and anyone interested
          in AI, productivity, and organizational clarity. Feel free to reach
          out on{' '}
          <Link
            aria-label="Twitter (opens in a new tab)"
            className="rounded text-foreground underline decoration-[0.5px] decoration-muted-foreground/30 underline-offset-4 transition-colors duration-200 hover:decoration-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            href={CONFIG.social.twitter}
            rel="noopener noreferrer"
            target="_blank"
            title="Twitter"
          >
            Twitter
          </Link>
          ,{' '}
          <Link
            aria-label="LinkedIn (opens in a new tab)"
            className="rounded text-foreground underline decoration-[0.5px] decoration-muted-foreground/30 underline-offset-4 transition-colors duration-200 hover:decoration-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            href={CONFIG.social.linkedin}
            rel="noopener noreferrer"
            target="_blank"
            title="LinkedIn"
          >
            LinkedIn
          </Link>
          , or{' '}
          <Link
            aria-label="GitHub (opens in a new tab)"
            className="rounded text-foreground underline decoration-[0.5px] decoration-muted-foreground/30 underline-offset-4 transition-colors duration-200 hover:decoration-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            href={CONFIG.social.github}
            rel="noopener noreferrer"
            target="_blank"
            title="GitHub"
          >
            GitHub
          </Link>
          . If you'd like to schedule a meeting or a quick call, you can do so{' '}
          <Link
            aria-label="Schedule a meeting (opens in a new tab)"
            className="rounded text-foreground underline decoration-[0.5px] decoration-muted-foreground/30 underline-offset-4 transition-colors duration-200 hover:decoration-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            href={CONFIG.schedule}
            rel="noopener noreferrer"
            target="_blank"
            title="Schedule a meeting"
          >
            here
          </Link>
          {' or '}
          <Link
            aria-label="Email me (opens in a new tab)"
            className="rounded text-foreground underline decoration-[0.5px] decoration-muted-foreground/30 underline-offset-4 transition-colors duration-200 hover:decoration-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            href={CONFIG.email}
            rel="noopener noreferrer"
            target="_blank"
            title="Email me"
          >
            email me
          </Link>
          .
        </p>
      </section>

      <section
        aria-labelledby="homepage-activity-heading"
        className="flex scroll-mt-8 flex-col gap-4"
        id="activity"
      >
        <h2 className="font-semibold text-lg" id="homepage-activity-heading">
          Activity
        </h2>
        <ContributionGraph />
      </section>

      {projects && (
        <section
          aria-labelledby="homepage-projects-heading"
          className="flex scroll-mt-8 flex-col gap-4"
          id="projects"
        >
          <h2 className="font-semibold text-lg" id="homepage-projects-heading">
            Projects
          </h2>
          <Projects />
        </section>
      )}

      {posts && (
        <section
          aria-labelledby="homepage-posts-heading"
          className="flex scroll-mt-8 flex-col gap-4"
          id="posts"
        >
          <h2 className="font-semibold text-lg" id="homepage-posts-heading">
            Posts
          </h2>
          <Posts />
        </section>
      )}
    </div>
  );
}
