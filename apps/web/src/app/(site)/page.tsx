import Link from 'next/link';
import type { JSX } from 'react';
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
            className="rounded text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
            className="rounded text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
            className="rounded text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
            className="rounded text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            href="/projects"
            rel="noopener noreferrer"
            title="personal projects"
          >
            personal projects
          </Link>{' '}
          , always seeking to solve real-world problems creatively. I regularly{' '}
          <Link
            aria-label="write posts"
            className="rounded text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            href="/posts"
            rel="noopener noreferrer"
            title="write posts"
          >
            write posts
          </Link>{' '}
          about my experiences and believe in{' '}
          <Link
            aria-label="building in public (opens in a new tab)"
            className="rounded text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
            className="rounded text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
            className="rounded text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
            className="rounded text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
            className="rounded text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
            className="rounded text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
            className="rounded text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            href={CONFIG.email}
            rel="noopener noreferrer"
            target="_blank"
            title="Email me"
          >
            email me
          </Link>
          .
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-2 pt-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">
          <Link
            className="transition-colors hover:text-foreground"
            href="/projects"
          >
            See my projects
          </Link>
          <span className="opacity-25">/</span>
          <Link
            className="transition-colors hover:text-foreground"
            href="/posts"
          >
            Read my posts
          </Link>
          <span className="opacity-25">/</span>
          <Link className="transition-colors hover:text-foreground" href="/use">
            What I use daily
          </Link>
          <span className="opacity-25">/</span>
          <Link className="transition-colors hover:text-foreground" href="/now">
            My live stats
          </Link>
          <span className="opacity-25">/</span>
          <Link
            className="text-blue-500 transition-colors hover:text-foreground"
            href="/ai"
          >
            Talk to my local AI
          </Link>
        </div>
      </section>

      {projects && (
        <section
          aria-labelledby="homepage-projects-heading"
          className="flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <h2
              className="font-semibold text-lg"
              id="homepage-projects-heading"
            >
              Projects
            </h2>
            <Link
              aria-label="View more projects"
              className="text-muted-foreground/75 text-xs transition-color duration-300 hover:text-muted-foreground"
              href="/projects"
            >
              View more
            </Link>
          </div>
          <Projects />
        </section>
      )}

      {posts && (
        <section
          aria-labelledby="homepage-posts-heading"
          className="flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg" id="homepage-posts-heading">
              Posts
            </h2>
            <Link
              aria-label="View more posts"
              className="text-muted-foreground/75 text-xs transition-color duration-300 hover:text-muted-foreground"
              href="/posts"
            >
              View more
            </Link>
          </div>
          <Posts />
        </section>
      )}

      <section className="mt-8 grid gap-4 border-border border-t pt-8 sm:grid-cols-2">
        <Link
          className="group flex flex-col gap-2 rounded-xl border border-border p-4 transition-colors hover:bg-accent"
          href="/now"
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm">Currently</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider transition-colors group-hover:text-foreground">
              Digital Twin →
            </span>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Live stats on my weekly running mileage, what I'm scrobbling on
            Spotify, and recent GitHub activity.
          </p>
        </Link>
        <Link
          className="group flex flex-col gap-2 rounded-xl border border-blue-500/20 border-border bg-blue-500/5 p-4 transition-colors hover:bg-accent"
          href="/ai"
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-blue-500 text-sm">
              Local AI Coach
            </span>
            <span className="text-[10px] text-blue-500 uppercase tracking-wider transition-colors group-hover:text-blue-400">
              WebGPU →
            </span>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Talk to an AI that runs entirely on your GPU. No data ever leaves
            your browser.
          </p>
        </Link>
      </section>
    </div>
  );
}
