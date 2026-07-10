/**
 * Shared design system constants for consistent styling across the application.
 * All link variants, opacity tokens, and spacing values should be imported from here.
 */

/**
 * Base link styling - underlined, muted decoration that darkens on hover,
 * with a visible focus ring for accessibility.
 */
export const LINK_BASE_CLASS =
  'rounded text-foreground underline decoration-[1.5px] underline-offset-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

/**
 * Default link style for inline text links.
 * Underline uses muted-foreground at 30% opacity, darkens to full foreground on hover.
 */
export const LINK_CLASS = `${LINK_BASE_CLASS} decoration-muted-foreground/30 hover:decoration-foreground`;

/**
 * Muted link style for less prominent links (e.g., metadata, timestamps).
 * Uses muted-foreground color with 40% opacity underline.
 */
export const LINK_MUTED_CLASS = `${LINK_BASE_CLASS} text-muted-foreground decoration-muted-foreground/40 hover:decoration-muted-foreground`;

/**
 * External link style with trailing icon indicator.
 * Includes the base link styling plus inline-flex for icon alignment.
 */
export const LINK_EXTERNAL_CLASS = `${LINK_CLASS} inline-flex items-center gap-1`;

/**
 * Link style for links rendered inside MDX prose (blog posts, project case
 * studies). Emphasized (medium weight) to stand out within body copy while
 * keeping the shared underline + focus-ring treatment.
 */
export const LINK_CLASS_PROSE = `${LINK_CLASS} font-medium`;

/**
 * Opacity token values for consistent transparency across the design system.
 * Use these instead of arbitrary opacity values.
 */
export const OPACITY = {
  /** 10% - disabled elements, subtle backgrounds */
  disabled: '0.1' as const,
  /** 30% - subtle underlines, borders */
  subtle: '0.3' as const,
  /** 40% - muted text underlines, secondary borders */
  muted: '0.4' as const,
  /** 50% - focus rings, overlay backgrounds */
  focus: '0.5' as const,
  /** 60% - meta text, timestamps, captions */
  meta: '0.6' as const,
  /** 70% - author names, secondary text */
  secondary: '0.7' as const,
  /** 75% - dates, descriptions, supporting text */
  description: '0.75' as const,
  /** 80% - hover states, active elements */
  hover: '0.8' as const,
  /** 90% - emphasis, near-opaque */
  emphasis: '0.9' as const,
} as const;

/**
 * Spacing tokens for consistent layout rhythm.
 * Use these semantic names instead of raw spacing values.
 */
export const SPACING = {
  /** 0.125rem (2px) - tight inline gaps */
  xs: '0.125rem' as const,
  /** 0.25rem (4px) - small inline gaps */
  sm: '0.25rem' as const,
  /** 0.5rem (8px) - base inline gaps, label-input spacing */
  md: '0.5rem' as const,
  /** 0.75rem (12px) - small component gaps */
  lg: '0.75rem' as const,
  /** 1rem (16px) - base component gaps */
  xl: '1rem' as const,
  /** 1.5rem (24px) - section gaps */
  '2xl': '1.5rem' as const,
  /** 2rem (32px) - large section gaps */
  '3xl': '2rem' as const,
  /** 3rem (48px) - page section gaps */
  '4xl': '3rem' as const,
} as const;

/**
 * Border radius tokens for consistent rounding.
 */
export const RADIUS = {
  /** 0.125rem (2px) - minimal rounding */
  none: '0' as const,
  /** 0.25rem (4px) - small elements */
  sm: '0.25rem' as const,
  /** 0.375rem (6px) - base radius */
  md: '0.375rem' as const,
  /** 0.5rem (8px) - cards, inputs */
  lg: '0.5rem' as const,
  /** 0.75rem (12px) - large cards, modals */
  xl: '0.75rem' as const,
  /** 1rem (16px) - extra large containers */
  '2xl': '1rem' as const,
  /** 9999px - fully rounded (pills, badges) */
  full: '9999px' as const,
} as const;

/**
 * Font weight tokens - capped at semibold (600) per design system rules.
 */
export const FONT_WEIGHT = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '600' as const,
  extrabold: '600' as const,
  black: '600' as const,
} as const;

/**
 * Transition duration tokens for consistent animation timing.
 */
export const TRANSITION = {
  /** 75ms - micro interactions */
  fast: '75ms' as const,
  /** 150ms - standard transitions */
  normal: '150ms' as const,
  /** 200ms - link underlines, hover states */
  base: '200ms' as const,
  /** 300ms - complex transitions */
  slow: '300ms' as const,
} as const;

/**
 * Z-index layers for consistent stacking context.
 */
export const Z_INDEX = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  toast: 800,
} as const;
