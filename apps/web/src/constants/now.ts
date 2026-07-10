/**
 * Content for the `/now` page: a living snapshot of what I'm currently focused
 * on, in the spirit of the "now page" movement (nownownow.com).
 *
 * This is the single source of truth for the page: update `NOW_UPDATED` and the
 * sections below whenever your focus changes. Keep it short and honest.
 */

/** A single entry within a now section. */
export interface NowItem {
  /** Short, scannable label (the "what"). */
  readonly label: string;
  /** Optional supporting detail (the "why" / context). */
  readonly detail?: string;
}

/** A titled group of related now entries. */
export interface NowSection {
  /** Section heading (e.g. "Focus", "Building", "Reading"). */
  readonly title: string;
  /** The entries shown under the heading. */
  readonly items: readonly NowItem[];
}

/** Date this page was last updated (ISO `YYYY-MM-DD`). */
export const NOW_UPDATED = '2026-07-10';

/** Where I'm based / writing from right now. */
export const NOW_LOCATION = 'Lisbon, Portugal';

/** Short lead paragraphs setting the scene. */
export const NOW_INTRO: readonly string[] = [
  "Here's what I'm focused on at the moment: the projects, ideas, and habits taking up most of my attention. It's a snapshot, not a résumé, and it changes as I do.",
];

/** The sections shown on the page, in order. */
export const NOW_SECTIONS: readonly NowSection[] = [
  {
    title: 'Focus',
    items: [
      {
        label: 'Building Frontal',
        detail:
          'Most of my energy goes into shipping our AI platform for organizational clarity, tightening the core product and talking to early users.',
      },
      {
        label: 'Finishing my degree',
        detail:
          'Balancing Computer Engineering at NOVA with building a company while learning to protect deep-work time.',
      },
    ],
  },
  {
    title: 'Building',
    items: [
      {
        label: 'Frontal',
        detail:
          'Product strategy, user research, and full-stack engineering, keeping the experience simple as the surface area grows.',
      },
      {
        label: 'This site',
        detail:
          'An ongoing playground for design and Next.js with small, focused improvements as I learn.',
      },
    ],
  },
  {
    title: 'Learning',
    items: [
      {
        label: 'Applied AI',
        detail: 'Agentic workflows and evals in production.',
      },
      {
        label: 'Design details',
        detail:
          'Typography, motion, and the small touches that make software feel trustworthy.',
      },
    ],
  },
  {
    title: 'Writing',
    items: [
      {
        label: 'Building in public',
        detail:
          'Notes on the founder journey, engineering, and lessons from shipping.',
      },
    ],
  },
  {
    title: 'Habits',
    items: [
      {
        label: 'Running',
        detail: 'Keeping a steady weekly rhythm to stay sharp.',
      },
      {
        label: 'Reading daily',
        detail: 'A little every day beats a lot occasionally.',
      },
    ],
  },
  {
    title: 'Enjoying',
    items: [
      {
        label: 'Lisbon',
        detail: 'The light, the pace, and a growing community of builders.',
      },
      {
        label: 'Good coffee and long walks',
        detail: 'Where most of the thinking actually happens.',
      },
    ],
  },
];
