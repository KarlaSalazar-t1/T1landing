"use client";

import { useSyncExternalStore } from "react";

/**
 * useIsDesktop — viewport-based gate using `useSyncExternalStore`.
 *
 * Returns:
 *   - `null` during SSR and before the first client commit (server and
 *      client output match → no hydration mismatch).
 *   - `true` when window width is ≥ 768px (Tailwind `tablet` breakpoint).
 *   - `false` below 768px.
 *
 * Usage with conditional rendering:
 *   const isDesktop = useIsDesktop();
 *   {isDesktop !== false && <DesktopOnly />}  // includes SSR
 *   {isDesktop !== true  && <MobileOnly  />}  // includes SSR
 *
 * Both variants render during SSR; after mount, one is unmounted.
 */
const QUERY = "(min-width: 768px)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  if (mq.addEventListener) mq.addEventListener("change", onChange);
  else mq.addListener(onChange);
  return () => {
    if (mq.removeEventListener) mq.removeEventListener("change", onChange);
    else mq.removeListener(onChange);
  };
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

// During SSR the snapshot must be deterministic. We return `undefined` so
// the caller can distinguish "unknown / SSR" from `true`/`false`.
const getServerSnapshot = (): boolean | null => null;

export function useIsDesktop(): boolean | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
