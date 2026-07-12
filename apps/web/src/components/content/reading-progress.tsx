'use client';

import { type JSX, useEffect, useState } from 'react';

/** Divisor converting a 0–100 percentage to a 0–1 scale factor. */
const PERCENT = 100;

/**
 * A thin progress bar fixed to the top of the viewport that reflects how far
 * the reader has scrolled through the document. Purely decorative, so it is
 * hidden from assistive technology.
 * @returns The progress bar element.
 */
export function ReadingProgress(): JSX.Element {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = (): void => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const scrollable = scrollHeight - clientHeight;
      setProgress(scrollable > 0 ? (scrollTop / scrollable) * PERCENT : 0);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
    >
      <div
        className="h-full origin-left bg-foreground transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress / PERCENT})` }}
      />
    </div>
  );
}
