import {
  LINK_CLASS,
  LINK_EXTERNAL_CLASS,
} from '@gabfon/design-system/lib/constants';
import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { JSX } from 'react';
import { BioGallery } from '@/components/bio-gallery';
import { CONFIG } from '@/constants/config';

/**
 * The metadata for the bio page.
 * @returns The metadata for the bio page.
 */
export const metadata: Metadata = createMetadata({
  title: 'Bio',
  description:
    'The longer story: who Gabriel Fonseca is, what he is building, and how to get in touch.',
  pathname: '/bio',
});

/** A single milestone rendered in the timeline section. */
type TimelineItem = {
  readonly period: string;
  readonly title: string;
  readonly description: string;
};

const TIMELINE: readonly TimelineItem[] = [
  {
    period: 'Now',
    title: 'Founder & CEO, Frontal',
    description:
      'Building an AI-powered platform to streamline business operations and decision-making, from product and research to engineering.',
  },
  {
    period: 'Ongoing',
    title: 'Computer Engineering, NOVA',
    description:
      'Studying Computer Engineering at NOVA School of Science and Technology while building in public.',
  },
  {
    period: 'Alongside',
    title: 'Freelance & personal projects',
    description:
      'Full-stack development for clients and side projects, shipping small, focused tools that solve real problems.',
  },
];

/**
 * The bio page: a longer-form "about" for the site owner, styled to match the
 * homepage section rhythm.
 * @returns The bio page for the site.
 */
export default function Page(): JSX.Element {
  return (
    <div className="flex flex-col gap-12">
      <section
        aria-labelledby="bio-intro-heading"
        className="flex scroll-mt-8 flex-col gap-4"
      >
        <h1 className="font-semibold text-lg" id="bio-intro-heading">
          Bio
        </h1>
        <p>
          I&apos;m {CONFIG.name}, a {CONFIG.title.toLowerCase()} and founder
          based in {CONFIG.location}.
        </p>
        <p>
          I care about building products that are useful, honest, and pleasant
          to use. Most of my time goes into{' '}
          <Link
            aria-label="Frontal (opens in a new tab)"
            className={LINK_CLASS}
            href="https://frontal.dev"
            rel="noopener noreferrer"
            target="_blank"
          >
            Frontal
          </Link>
          , where I&apos;m the founder & CEO, but I stay close to the craft:
          writing code, shaping the details, and talking to the people who use
          what I make.
        </p>
        <p>
          I started programming because I liked the feeling of turning an idea
          into something real and shippable in an afternoon. That instinct never
          left. Most of what I do now is still about compressing the distance
          between a problem and a working solution, whether that&apos;s a full
          product or a small tool that saves someone ten minutes a day.
        </p>
      </section>

      <BioGallery />

      <section
        aria-labelledby="bio-building-heading"
        className="flex scroll-mt-8 flex-col gap-4"
      >
        <h2 className="font-semibold text-lg" id="bio-building-heading">
          What I&apos;m building
        </h2>
        <p>
          Frontal is an AI-powered platform focused on organizational clarity,
          helping teams streamline operations and make better decisions with the
          context they already have. I work across product strategy, user
          research, and full-stack engineering to keep the experience simple as
          the surface area grows.
        </p>
        <p>
          Day to day that means wearing a lot of hats: sketching flows in the
          morning, pairing on tricky code in the afternoon, and jumping on calls
          with early users to hear where things break. I&apos;m a big believer
          that the fastest way to learn what to build is to put something in
          front of real people and watch honestly.
        </p>
      </section>

      <section
        aria-labelledby="bio-approach-heading"
        className="flex scroll-mt-8 flex-col gap-4"
      >
        <h2 className="font-semibold text-lg" id="bio-approach-heading">
          How I work
        </h2>
        <p>
          I like small teams, tight feedback loops, and shipping in the open. I
          care about the details most people never notice, like the copy, the
          loading states, and the empty screens, because they add up to whether
          something feels trustworthy. I&apos;d rather ship a smaller thing that
          works beautifully than a big thing that&apos;s almost done.
        </p>
        <p>
          Technically I&apos;m happiest across the full stack: TypeScript,
          React, Next.js, and whatever backend the problem actually needs. But
          tools are means to an end. The work I&apos;m proudest of is the work
          that quietly made someone&apos;s day a little easier.
        </p>
      </section>

      <section
        aria-labelledby="bio-timeline-heading"
        className="flex scroll-mt-8 flex-col gap-4"
      >
        <h2 className="font-semibold text-lg" id="bio-timeline-heading">
          Timeline
        </h2>
        <ul className="flex flex-col gap-4">
          {TIMELINE.map((item) => (
            <li className="flex flex-col gap-1" key={item.title}>
              <span className="text-muted-foreground text-xs uppercase tracking-wide">
                {item.period}
              </span>
              <span className="font-medium text-sm leading-5">
                {item.title}
              </span>
              <span className="text-muted-foreground text-sm leading-5">
                {item.description}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="bio-interests-heading"
        className="flex scroll-mt-8 flex-col gap-4"
      >
        <h2 className="font-semibold text-lg" id="bio-interests-heading">
          Interests
        </h2>
        <p>
          Outside of work I follow AI and productivity closely, enjoy writing
          about what I learn, and spend time running and staying active.
          I&apos;m drawn to good design in every form including typography,
          product, and cities. I take a lot of inspiration from things that are
          built to last. I believe in building in public and sharing the journey
          along the way.
        </p>
        <p>
          Lisbon is a big part of the story too: the light, the pace, and a
          growing community of builders that makes it an easy place to stay
          curious. If any of this resonates, I&apos;d love to hear from you.
        </p>
      </section>

      <section
        aria-labelledby="bio-elsewhere-heading"
        className="flex scroll-mt-8 flex-col gap-4"
      >
        <h2 className="font-semibold text-lg" id="bio-elsewhere-heading">
          Elsewhere
        </h2>
        <p className="text-muted-foreground">
          Find me on{' '}
          <Link
            aria-label="X (opens in a new tab)"
            className={LINK_EXTERNAL_CLASS}
            href={CONFIG.social.x}
            rel="noopener noreferrer"
            target="_blank"
          >
            X
          </Link>
          ,{' '}
          <Link
            aria-label="LinkedIn (opens in a new tab)"
            className={LINK_EXTERNAL_CLASS}
            href={CONFIG.social.linkedin}
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </Link>
          , and{' '}
          <Link
            aria-label="GitHub (opens in a new tab)"
            className={LINK_EXTERNAL_CLASS}
            href={CONFIG.social.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </Link>
          . You can also{' '}
          <Link
            aria-label="Schedule a meeting (opens in a new tab)"
            className={LINK_EXTERNAL_CLASS}
            href={CONFIG.schedule}
            rel="noopener noreferrer"
            target="_blank"
          >
            schedule a call
          </Link>{' '}
          or{' '}
          <Link
            aria-label="Email me"
            className={LINK_CLASS}
            href={CONFIG.email}
          >
            email me
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
