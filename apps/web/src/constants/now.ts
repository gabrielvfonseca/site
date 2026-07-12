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

/** A hand-curated headline stat for the "By the numbers" strip. */
export interface NowStat {
  /** Short label, e.g. `Coffees`. */
  readonly label: string;
  /** The value as displayed, e.g. `14`. */
  readonly value: string;
  /** Optional supporting context, e.g. `This week`. */
  readonly hint?: string;
}

/**
 * Manually maintained fun stats shown alongside the live figures (coding time,
 * contributions) in the "By the numbers" strip. Update these by hand.
 */
export const NOW_STATS: readonly NowStat[] = [
  { label: 'Coffees', value: '14', hint: 'This week' },
];

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
    title: 'Habits',
    items: [
      {
        label: 'Deep-work mornings',
        detail: 'Protecting the first hours of the day for focused building.',
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
      {
        label: 'Music, DJing, and guitar',
        detail:
          'Playing guitar and mixing on the decks — the best way to reset off the clock.',
      },
    ],
  },
];
