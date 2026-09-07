"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/* Instrumentación delegada de la landing de Envíos (CAMBIO 10).
   - scroll_depth a 25/50/75/90 (una vez cada uno)
   - cta_click en cualquier elemento con [data-cta-text]
   - nav_click en enlaces dentro de <nav>
   Los eventos de cotizador (cotizador_start/submit) van en el propio panel.
   PENDIENTE de infra: init de PostHog + bucketing real de `variant`. */
export default function T1EnviosAnalytics() {
  useEffect(() => {
    const seen = new Set<number>();
    const thresholds = [25, 50, 75, 90];
    const onScroll = () => {
      const st = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (st / h) * 100 : 100;
      for (const t of thresholds) {
        if (pct >= t && !seen.has(t)) {
          seen.add(t);
          track("scroll_depth", { percent: t });
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const cta = target.closest<HTMLElement>("[data-cta-text]");
      if (cta) {
        const href = cta.getAttribute("data-cta-destination") || cta.getAttribute("href");
        track("cta_click", {
          cta_label: cta.getAttribute("data-cta-text"),
          cta_destination: href,
          cta_section: cta.getAttribute("data-cta-section") || cta.getAttribute("data-cta-location"),
        });
        return;
      }
      const nav = target.closest("nav");
      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (nav && link) {
        track("nav_click", { nav_destination: link.getAttribute("href"), nav_level: "top" });
      }
    };
    document.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
