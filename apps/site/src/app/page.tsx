import { Skeleton } from '@gabfon/design-system/components/skeleton';
import Link from 'next/link';
import { type JSX, Suspense } from 'react';
import { Posts } from '@/components/posts';
import { Projects } from '@/components/projects';
import { config } from '@/constants/config';
import { getCachedPublishedPosts } from '@/data-access/cache/post-cache';
import { getCachedAllProjects } from '@/data-access/cache/project-cache';
import type { Post } from '@/types/posts';
import type { Project } from '@/types/projects';

/**
 * The Page for the site.
 * @returns The Page for the site.
 */
export default async function Page(): Promise<JSX.Element> {
  const posts: Post[] = await getCachedPublishedPosts();
  const projects: Project[] = await getCachedAllProjects();

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <p className="font-medium text-primary">
          I'm a Lisbon-based software developer, founder, and Computer
          Engineering student at{' '}
          <Link
            aria-label="NOVA School of Science and Technology"
            className="text-link hover:text-link-hover"
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
          I'm currently building an AI-powered platform to streamline business
          operations and decision-making. As the founder, I'm deeply involved in
          product development and user research.
        </p>
        <p>
          Outside of my startup, I engage in full-stack development for
          freelance and personal projects, always seeking to solve real-world
          problems creatively. I'm an active participant in the tech, business,
          and startup communities, constantly learning and iterating.
        </p>
        <p>
          I'm open to connecting with fellow builders, potential collaborators,
          and anyone interested in AI, productivity, and organizational clarity.
          Feel free to reach out on{' '}
          <Link
            aria-label={config.social.twitter.alt}
            className="text-link hover:text-link-hover"
            href={config.social.twitter.url}
            rel="noopener noreferrer"
            target="_blank"
            title={config.social.twitter.alt}
          >
            {config.social.twitter.alt}
          </Link>
          ,{' '}
          <Link
            aria-label={config.social.linkedin.alt}
            className="text-link hover:text-link-hover"
            href={config.social.linkedin.url}
            rel="noopener noreferrer"
            target="_blank"
            title={config.social.linkedin.alt}
          >
            {config.social.linkedin.alt}
          </Link>
          , or{' '}
          <Link
            aria-label={config.social.github.alt}
            className="text-link hover:text-link-hover"
            href={config.social.github.url}
            rel="noopener noreferrer"
            target="_blank"
            title={config.social.github.alt}
          >
            {config.social.github.alt}
          </Link>
          . If you'd like to schedule a meeting, you can do so{' '}
          <Link
            aria-label={config.schedule.alt}
            className="text-link hover:text-link-hover"
            href={config.schedule.url}
            rel="noopener noreferrer"
            target="_blank"
            title={config.schedule.alt}
          >
            here
          </Link>
          {' or '}
          <Link
            aria-label={config.email.alt}
            className="text-link hover:text-link-hover"
            href={config.email.url}
            rel="noopener noreferrer"
            target="_blank"
            title={config.email.alt}
          >
            email me
          </Link>
          .
        </p>
      </div>

      {projects.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4>Projecs</h4>
            <Link
              className="text-quaternary text-xs transition-color duration-300 hover:text-tertiary"
              href="/projects"
            >
              View more
            </Link>
          </div>
          <Suspense fallback={<Skeleton className="h-8 w-full" />}>
            <Projects />
          </Suspense>
        </section>
      )}

      {posts.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4>Posts</h4>
            <Link
              className="text-quaternary text-xs transition-color duration-300 hover:text-tertiary"
              href="/posts"
            >
              View more
            </Link>
          </div>
          <Suspense fallback={<Skeleton className="h-8 w-full" />}>
            <Posts />
          </Suspense>
        </section>
      )}
    </div>
  );
}
