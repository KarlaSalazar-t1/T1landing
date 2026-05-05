"use client";

import { RefObject, useEffect } from "react";

/**
 * Drives the full-screen stack-card scaling effect:
 *   as the next .fs-stack-card scrolls up over the current card,
 *   the current card scales down + dims via CSS variables --stack-scale and --stack-dim.
 *
 * Mirrors the .stack-card logic from T1Features but scoped to a single root,
 * and tuned for full-viewport cards (larger reduction per card).
 *
 * Usage:
 *   const rootRef = useRef<HTMLDivElement>(null);
 *   useFSStackCards(rootRef);
 *   <div ref={rootRef}>
 *     <div className="fs-stack-card-container">
 *       <div className="fs-stack-card" style={{ top: 60, zIndex: 1 }}>...</div>
 *       <div className="fs-stack-card" style={{ top: 80, zIndex: 2 }}>...</div>
 *     </div>
 *   </div>
 */
export function useFSStackCards(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Respect reduced motion — leave defaults (no scale/dim)
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let rafId = 0;
    let cachedCards: HTMLElement[] | null = null;

    const getCards = () => {
      if (!cachedCards || cachedCards.length === 0 || !document.contains(cachedCards[0])) {
        cachedCards = Array.from(root.querySelectorAll<HTMLElement>(".fs-stack-card"));
      }
      return cachedCards;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const cards = getCards();
        const total = cards.length;
        if (total === 0) return;

        const viewportH = window.innerHeight;
        const tops = new Array<number>(total);
        for (let i = 0; i < total; i++) {
          tops[i] = cards[i].getBoundingClientRect().top;
        }

        for (let i = 0; i < total; i++) {
          let totalReduction = 0;
          for (let j = i + 1; j < total; j++) {
            // Each card sits at top: ~60 + idx*20
            const nextStickyTop = 60 + j * 20;
            const distanceToTravel = viewportH - nextStickyTop;
            const distanceTraveled = viewportH - tops[j];
            const progress = distanceTraveled <= 0
              ? 0
              : distanceTraveled >= distanceToTravel
                ? 1
                : distanceTraveled / distanceToTravel;
            // Bigger reduction per card (full screen → only ~3 cards) so effect is visible
            totalReduction += progress * 0.06;
          }
          // Cap reduction so the deepest card stays at scale 0.82 (18% smaller)
          const scale = totalReduction >= 0.18 ? 0.82 : 1 - totalReduction;
          const dim = Math.min(0.30, totalReduction * 1.6);
          cards[i].style.setProperty("--stack-scale", String(scale));
          cards[i].style.setProperty("--stack-dim", String(dim));
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [rootRef]);
}
