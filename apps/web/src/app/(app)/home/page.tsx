import { config } from '@/constants/config';
import { PostList } from '@/features/posts/post-list';
import { ProjectList } from '@/features/projects/project-list';
import { Skeleton } from '@repo/design-system/components/ui/skeleton';
import React from 'react';

export default function Homepage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <p className="copy-16 text-primary-foreground">
          I'm a computer engineering student living in Lisbon, pt.
        </p>
        <p>
          Hey, I'm Gabriel — a full-stack{' '}
          <a href="https://github.com/gabrielvfonseca" className="link">
            developer
          </a>{' '}
          with a passion for creating impactful software, a{' '}
          <a href="https://github.com/gabrielvfonseca" className="link">
            computer engineering student
          </a>{' '}
          at NOVA FCT, and the Founder and CEO of{' '}
          <a href="https://trysequence.co" className="link">
            Sequence
          </a>
          , where we're revolutionizing how teams collaborate and manage their
          workflows.
        </p>
        <p>
          Currently pursuing my Computer Engineering degree at the{' '}
          <a href="https://www.fct.unl.pt" className="link">
            NOVA School of Science and Technology
          </a>{' '}
          in Almada, Portugal, I'm constantly exploring the intersection of
          software development, artificial intelligence, and user experience
          design.
        </p>

        <p>
          Beyond coding, I'm deeply interested in{' '}
          <a href="/posts" className="link">
            technology trends
          </a>
          ,{' '}
          <a href="/posts" className="link">
            startup culture
          </a>
          , and{' '}
          <a href="/posts" className="link">
            product development
          </a>
          . I believe in the power of technology to solve real-world problems
          and am always eager to share my experiences and insights.
        </p>
      </div>

      {config.projects.enabled && (
        <div className="flex flex-col gap-4">
          <h4 className="heading-16">Projects</h4>
          <React.Suspense fallback={<Skeleton className="h-8 w-full" />}>
            <ProjectList />
          </React.Suspense>
        </div>
      )}

      {config.posts.enabled && (
        <div className="flex flex-col gap-4">
          <h4 className="heading-16">Writing</h4>
          <React.Suspense fallback={<Skeleton className="h-8 w-full" />}>
            <PostList />
          </React.Suspense>
        </div>
      )}
    </div>
  );
}
