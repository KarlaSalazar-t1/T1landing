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
  duration = 1600,
  prefix = "",
  suffix = "",
  decimals = 0,
}: UseCountUpOptions) {
  const [value, setValue] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // IntersectionObserver — fires once when the element is even slightly
  // in the viewport. Small negative bottom rootMargin so it kicks in just
  // before the number is fully on screen, giving the count-up a head
  // start instead of starting at "0" while the user is already reading.
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
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

    // easeOutExpo — slows down dramatically near the end so the final
    // digit lands with weight. Better than easeOutCubic for big-number
    // reveals where the last 10% is the punch line.
    function easeOutExpo(t: number) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
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
