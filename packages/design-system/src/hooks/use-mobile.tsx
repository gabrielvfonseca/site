import * as React from "react";

const MOBILE_BREAKPOINT = 768;

function getMobileMql() {
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
}

/**
 * Track whether the viewport is below the mobile breakpoint.
 *
 * Reads the matchMedia query during render (a safe read — it only re-renders
 * on window resize, when React calls `onResize`) and keeps state in sync with
 * it in an effect, so the first client paint matches the server output.
 * @returns True when the viewport is narrower than the mobile breakpoint.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  const mql = getMobileMql();

  React.useEffect(() => {
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    // oxlint-disable-next-line react/set-state-in-effect -- syncs state with the matchMedia query (external system) after mount; SSR-safe because render reads `mql` directly before hydration.
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, [mql]);

  return isMobile ?? !!mql?.matches;
}
