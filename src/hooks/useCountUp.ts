"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

/**
 * useCountUp — animated count-up that defaults to the FINAL value.
 *
 * Why default to `end` instead of `0`:
 *   If the IntersectionObserver never fires (Safari quirk, very fast
 *   scroll, observer not supported, JS error) the counter still shows
 *   the real number. The count-up is an enhancement on top — never the
 *   primary source of truth.
 *
 * Also respects `prefers-reduced-motion: reduce` — when set, the value
 * stays at `end` and no animation runs.
 */
export function useCountUp({
  end,
  duration = 1200,
  prefix = "",
  suffix = "",
  decimals = 0,
}: UseCountUpOptions) {
  // Static fallback: render the final value on first paint so SSR + no-JS
  // + observer-failure states still display the real number.
  const [value, setValue] = useState<number>(end);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // IntersectionObserver — fires once when the element is even slightly
  // in the viewport (threshold 0.1) with a small bottom offset so the
  // count-up starts a bit before it's fully visible.
  useEffect(() => {
    if (hasStarted) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Count-up tick. Skips entirely (and leaves `value` at `end`) when the
  // user has requested reduced motion.
  useEffect(() => {
    if (!hasStarted) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(end);
      return;
    }

    let raf = 0;
    const startTime = performance.now();

    // Reset to 0 in the same frame the animation starts so we don't see
    // a stale `end` value sitting still mid-animation.
    setValue(0);

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setValue(eased * end);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setValue(end);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasStarted, end, duration]);

  const display = `${prefix}${
    decimals > 0 ? value.toFixed(decimals) : Math.round(value)
  }${suffix}`;

  return { ref, display };
}
