# MDX Post Rendering — Polish Pass

**Date:** 2026-07-11
**Author:** Gabriel Fonseca (with Claude)
**Status:** Approved (direction) — pending spec review

## Goal

Refine the existing MDX rendering used on blog posts (and shared with project
case studies) for consistency, correct vertical rhythm, dark mode parity,
accessibility, and subtle micro-interactions. **Keep the current design system
exactly as-is:** strict black/gray/white monochrome, existing type scale,
existing tokens. No new colors, no new components, no layout overhaul. This is
pure refinement of what already ships.

## Context

The MDX system is already mature:

- `src/mdx-components.tsx` maps headings (deep-linkable), links, images, tables,
  and 14 custom components.
- `src/components/mdx/*` — Callout, CodeBlock, Divider, Figure, Kbd, LinkCard,
  PullQuote, Stat/StatGrid, Step/Steps, Tabbed, TechStack, Video, Accordion.
- `src/styles/main.css` — hand-authored `.prose` typography (no
  `@tailwindcss/typography` plugin); must remain **unlayered** so it wins over
  design-system layers.
- Rendered in `src/app/(site)/posts/[slug]/page.tsx` inside `.prose max-w-none`,
  with `MdxContent components={useMDXComponents({})}`.

Shared design tokens live in
`packages/design-system/src/lib/constants.ts` (`LINK_CLASS`,
`LINK_CLASS_PROSE`, `OPACITY`, `SPACING`, `RADIUS`, `TRANSITION`).

## Findings & Changes

### 1. Vertical rhythm — the one real bug (highest priority)

Custom blocks fall into two inconsistent camps:

- `Callout`, `CodeBlock`, `LinkCard` declare their own `my-6` (24px).
- `PullQuote`, `Steps`, `StatGrid`, `Figure`, `Video`, `Accordion`,
  `TechStack`, `Divider` declare no vertical margin and inherit prose flow
  (`.prose > * + *` → `margin-top: 1rem` = 16px).

Because `.prose > * + *` has higher specificity (0-1-1) than the `.my-6`
utility (0-1-0), the components' own **top** margins are silently overridden —
the rendered spacing does not match what the component code implies.

**Change:** centralize block spacing in one place.

- Add a single rule in `main.css` scoped to custom blocks that are direct
  children of `.prose` and preceded by a sibling:
  `.prose > * + .not-prose { margin-top: 1.5rem; }`. This reuses the existing
  adjacent-sibling pattern (so a leading block is never pushed down) and, at
  specificity 0-2-0 (`.prose` + `.not-prose`), cleanly overrides the generic
  `.prose > * + *` (0-1-0) rhythm for custom blocks only. Target gap: **1.5rem**
  (24px), matching the current intent of `my-6`.
- Remove the ad-hoc `my-6` from `Callout`, `CodeBlock`, `LinkCard` so spacing
  is owned solely by the prose stylesheet. One source of truth.

Note: all custom components are already marked `.not-prose`, so
`:where(.not-prose)` selects exactly the custom-block set without touching
plain markdown elements.

### 2. Prose links use the wrong token

`mdx-components.tsx` internal links use `LINK_CLASS`. The design system ships
`LINK_CLASS_PROSE` (`LINK_CLASS` + `font-medium`) built specifically for body
copy so links stand out within muted prose.

**Change:** import and use `LINK_CLASS_PROSE` for internal prose links; external
links use `LINK_CLASS_PROSE` composed with the external inline-flex/icon
treatment (preserve the new-tab + `rel` behavior). Keep the existing
external-URL detection.

### 3. Caption size drift

`Figure` and `Video` figcaptions use `text-xs`; the prose `figcaption` rule and
`PullQuote` use the `--font-size-caption` token.

**Change:** unify `Figure`/`Video` captions on the caption token (via a small
utility class or inline `text-[var(--font-size-caption)]`) so every caption in a
post matches.

### 4. Interaction guards & focus consistency

- `LinkCard` hover translate has no `motion-reduce` guard (Accordion does).
  **Change:** add `motion-reduce:transition-none` to `LinkCard`'s animated
  affordance.
- Focus-ring treatment varies slightly (`focus:outline-none
  focus-visible:ring-2 ring-ring` vs `focus-visible:ring-2 ring-ring
  ring-offset-2`). **Change:** align `LinkCard`, `Accordion`, and `CodeBlock`'s
  copy button on one focus-visible pattern (`focus:outline-none
  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`).

### 5. Inline code overflow on mobile

`.prose :not(pre) > code` sets `white-space: nowrap`, so long inline tokens
(URLs, long identifiers) overflow horizontally on small screens.

**Change:** replace `white-space: nowrap` with graceful wrapping
(`overflow-wrap: anywhere` / `word-break: break-word`) so short snippets stay
tidy but long ones wrap instead of causing horizontal scroll.

### 6. Heading anchors unreachable on touch

The `#` permalink beside `h2/h3/h4` is `opacity-0` until hover/focus — mouse
only. Touch users can't grab section links.

**Change:** give the anchor a faint persistent opacity (e.g. `opacity-0`
→ subtle always-on on coarse pointers, or a low base opacity that brightens on
hover/focus) so it's reachable without adding visual noise on desktop. Stay
monochrome and quiet.

## Non-Goals

- No new colors or accent palette.
- No new MDX components.
- No type-scale or heading-size changes.
- No layout/structure changes to the post page.
- No refactor of unrelated components.

## Files Touched

- `src/styles/main.css` — block-spacing rule; inline-code wrapping.
- `src/mdx-components.tsx` — prose link token; heading anchor visibility.
- `src/components/mdx/callout.tsx` — remove `my-6`.
- `src/components/mdx/code-block.tsx` — remove `my-6`; focus alignment.
- `src/components/mdx/link-card.tsx` — remove `my-6`; motion guard; focus.
- `src/components/mdx/accordion.tsx` — focus alignment.
- `src/components/mdx/figure.tsx` — caption token.
- `src/components/mdx/video.tsx` — caption token.

## Verification

- Run the dev server (`bun run dev`, per project memory).
- Use browser MCP to capture before/after screenshots of a representative post
  in **light and dark** mode, checking: block spacing rhythm, link weight,
  captions, inline-code wrapping, heading-anchor visibility, and focus rings.
- `pnpm --filter site typecheck` and `pnpm lint` clean.

## Risks

- The `.prose > :where(.not-prose)` selector must not disturb first-block
  spacing or nested `.not-prose` content inside components. Verify leading and
  consecutive blocks visually.
- `main.css` prose rules must stay unlayered (per existing memory) — do not move
  them into an `@layer`.
