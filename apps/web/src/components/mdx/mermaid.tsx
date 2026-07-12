'use client';

import { type JSX, useEffect, useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/** Props for {@link Mermaid}. */
interface MermaidProps {
  /** The Mermaid diagram definition. */
  readonly chart: string;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * Renders a Mermaid diagram from its text definition. Mermaid is imported
 * dynamically on the client so it stays out of the initial bundle and never
 * runs during SSR, and the theme follows the site's light/dark mode. Falls
 * back to the raw source if rendering fails.
 * @param props - The mermaid props.
 * @returns The Mermaid element.
 */
export function Mermaid({ chart, className }: MermaidProps): JSX.Element {
  const rawId = useId();
  const [svg, setSvg] = useState('');
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const render = async (): Promise<void> => {
      const { default: mermaid } = await import('mermaid');
      const dark = document.documentElement.classList.contains('dark');
      mermaid.initialize({
        startOnLoad: false,
        theme: dark ? 'dark' : 'neutral',
        securityLevel: 'strict',
        fontFamily: 'inherit',
      });
      try {
        const { svg: rendered } = await mermaid.render(
          `mermaid-${rawId.replace(/:/g, '')}`,
          chart
        );
        if (mounted.current) {
          setSvg(rendered);
        }
      } catch {
        if (mounted.current) {
          setSvg('');
        }
      }
    };
    render();
    return () => {
      mounted.current = false;
    };
  }, [chart, rawId]);

  if (!svg) {
    return (
      <pre className="not-prose my-6 overflow-x-auto rounded-lg border border-border p-4 text-muted-foreground text-sm">
        {chart}
      </pre>
    );
  }

  // SVG is produced locally by Mermaid from author-supplied text with
  // securityLevel 'strict', so it is safe to inject.
  // biome-ignore lint/style/useNamingConvention: React requires the `__html` key
  const markup = { __html: svg };

  return (
    <div
      className={cn(
        'not-prose my-6 flex justify-center [&_svg]:max-w-full',
        className
      )}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: locally-rendered, sanitized Mermaid SVG
      dangerouslySetInnerHTML={markup}
    />
  );
}
