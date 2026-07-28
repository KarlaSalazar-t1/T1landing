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
 * useCountUp — animated count-up that starts at 0 and rolls up to `end`
 * when the element enters the viewport.
 *
 * Pacing follows the common dataviz pattern: ~2 seconds with an easeOut
 * curve so the number accelerates in and decelerates dramatically near
 * the end — the trick that makes the final value feel like a reveal.
 *
 * SSR / no-JS fallback: server renders 0. The instant we hydrate on the
 * client (or the observer fires) the animation runs and lands on `end`.
 * Respects `prefers-reduced-motion: reduce` by jumping straight to `end`.
 */
export function useCountUp({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
}: UseCountUpOptions) {
  const [value, setValue] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // IntersectionObserver — fires once when the element first enters view.
  // A shallow negative bottom rootMargin (-8%) lets the count-up kick off
  // as soon as the number is comfortably on-screen, instead of sitting at
  // 0 while it scrolls a quarter of the way up (CEO: "veo el 0 y se tarda
  // en empezar"). If a fast scroll lands past the section, the observer
  // still fires immediately on observe() because it's already intersecting,
  // so the animation is never missed.
  useEffect(() => {
    if (hasStarted) return;
    const el = ref.current;
    if (!el) return;

    // Fallback: if IntersectionObserver isn't available, start immediately.
    if (typeof IntersectionObserver === "undefined") {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px 25% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Count-up tick. Skips entirely (and jumps straight to `end`) when the
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

    // easeOutCubic — spreads the motion evenly across the whole duration
    // and only gently decelerates at the end. easeOutExpo was too extreme
    // here: ~75% of the count landed in the first ~250ms, so the number
    // *snapped* up and then crawled, which read as "muy rápido" (CEO).
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
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString("es-MX")
  }${suffix}`;

  return { ref, display };
}
