/* Instrumentación de la landing de Envíos (CAMBIO 10).
   Scaffold seguro: si PostHog está inicializado (window.posthog) captura ahí;
   siempre empuja a dataLayer como fallback. Todos los eventos llevan props base
   (device_type, viewport_width, utm_*, landing_page, variant).

   PENDIENTE de infra: inicializar el SDK de PostHog y el bucketing real de
   `variant` (A/B). Mientras no exista, variant sale de ?variant= o localStorage,
   con default "unassigned". No se puede declarar ganador sin variant desde el día 1. */

type Props = Record<string, unknown>;

interface WinAnalytics {
  posthog?: { capture?: (event: string, props?: Props) => void };
  dataLayer?: Props[];
}

function getVariant(): string {
  try {
    const qs = new URLSearchParams(window.location.search).get("variant");
    if (qs) {
      window.localStorage.setItem("ab_variant", qs);
      return qs;
    }
    return window.localStorage.getItem("ab_variant") || "unassigned";
  } catch {
    return "unassigned";
  }
}

function baseProps(): Props {
  if (typeof window === "undefined") return {};
  const w = window.innerWidth;
  const params = (() => {
    try {
      return new URLSearchParams(window.location.search);
    } catch {
      return new URLSearchParams();
    }
  })();
  return {
    device_type: w < 768 ? "mobile" : w < 1280 ? "tablet" : "desktop",
    viewport_width: w,
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
    landing_page: window.location.pathname,
    variant: getVariant(),
  };
}

export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  const payload = { ...baseProps(), ...props };
  const w = window as unknown as WinAnalytics;
  try {
    w.posthog?.capture?.(event, payload);
  } catch {
    /* no-op */
  }
  try {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event, ...payload });
  } catch {
    /* no-op */
  }
}
