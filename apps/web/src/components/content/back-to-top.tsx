'use client';

import { ArrowUpIcon } from 'lucide-react';
import { type JSX, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/** Scroll distance (px) past which the control becomes visible. */
const REVEAL_THRESHOLD = 600;

/**
 * A floating control that scrolls the reader back to the top of the page. It
 * fades in only after the reader has scrolled far enough for it to be useful,
 * and respects reduced-motion preferences via the browser's smooth-scroll.
 * @returns The back-to-top button.
 */
export function BackToTop(): JSX.Element {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = (): void => {
      setVisible(window.scrollY > REVEAL_THRESHOLD);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <button
      aria-hidden={!visible}
      aria-label="Back to top"
      className={cn(
        'fixed right-5 bottom-5 z-40 inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition-all duration-200 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-2 opacity-0'
      )}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      tabIndex={visible ? 0 : -1}
      type="button"
    >
      <ArrowUpIcon aria-hidden="true" className="size-4" />
    </button>
  );
}
