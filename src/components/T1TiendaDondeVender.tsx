"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/* "Dónde vender" — misma mecánica que "Para cada etapa de tu negocio":
   tabs en desktop, carrusel con timer + glow en móvil. */

const ITEMS = [
  {
    id: "linea",
    title: "Tienda en línea",
    description: "Crea tu tienda con IA y véndele a todo México desde tu propio sitio, sin saber de diseño.",
    cta: "Conoce más",
    ctaHref: "/productos/t1tienda/tienda-con-ia",
    image: "/img/incluye-responsive-v2.png",
    fit: "contain" as const,
  },
  {
    id: "market",
    title: "Marketplaces",
    description: "Publica y vende en Mercado Libre, Amazon, TikTok Shop y más desde el administrador.",
    cta: "Conoce más",
    ctaHref: "/productos/t1tienda/marketplaces",
    image: "/img/tienda-marketplace.png",
    fit: "contain" as const,
  },
  {
    id: "pos",
    title: "Punto de venta",
    description: "Vende en tu tienda física con un POS integrado a inventario, pagos y envíos.",
    cta: "Conoce más",
    ctaHref: "/productos/t1tienda/punto-de-venta",
    image: "/img/tienda-pos.png",
    fit: "contain" as const,
  },
];

const DURATION = 5000;

export default function T1TiendaDondeVender() {
  const [active, setActive] = useState(0);
  const [barFull, setBarFull] = useState(false);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // El timer arranca sólo cuando la sección completa entra en viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setStarted(true); return; }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.55 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    setBarFull(false);
    const raf = requestAnimationFrame(() => setBarFull(true));
    const timer = setTimeout(() => setActive((a) => (a + 1) % ITEMS.length), DURATION);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [active, started]);

  // Carrusel móvil
  const scrollRef = useRef<HTMLDivElement>(null);
  const programmatic = useRef(false);
  const settleTimer = useRef(0);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const target = active * el.clientWidth;
    if (Math.abs(el.scrollLeft - target) < 4) return;
    programmatic.current = true;
    el.scrollTo({ left: target, behavior: "smooth" });
  }, [active]);
  const onCarouselScroll = () => {
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      const el = scrollRef.current;
      if (!el) return;
      if (programmatic.current) { programmatic.current = false; return; }
      const i = Math.round(el.scrollLeft / el.clientWidth);
      if (i !== active && i >= 0 && i < ITEMS.length) setActive(i);
    }, 110);
  };

  const Card = ({ it }: { it: (typeof ITEMS)[number] }) => (
    <div className="audience-card-wrap flex w-full justify-center tablet:justify-start">
      <div className="audience-card flex w-full" style={{ maxWidth: 460 }}>
        <span className="audience-beam" aria-hidden />
        <div className="relative z-[1] w-full overflow-hidden rounded-[18.5px]" style={{ background: "#1b1714" }}>
          <div className="relative w-full" style={{ aspectRatio: "741 / 565" }}>
            <Image src={it.image} alt={it.title} fill className={(it as { fit?: string }).fit === "contain" ? "object-contain" : "object-cover"} sizes="(max-width: 768px) 90vw, 460px" />
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.75) 100%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-5 tablet:p-7">
              <a
                href={it.ctaHref}
                className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-6 py-3 font-inter text-[14px] font-semibold text-white no-underline transition-colors duration-150 hover:bg-[#C0332A]"
              >
                {it.cta}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black px-5 tablet:px-6" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="relative mx-auto max-w-[var(--max-w)]">
        <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", textAlign: "center", marginBottom: 16 }}>
          Vende donde estén tus clientes
        </h2>
        <p className="mx-auto font-inter text-[16px] font-light text-white/85 tablet:whitespace-nowrap tablet:text-[18px]" style={{ textAlign: "center", marginBottom: 56 }}>
          Tienda en línea, marketplaces y punto de venta, conectados en un solo lugar.
        </p>

        {/* Desktop — tabs + imagen */}
        <div className="hidden grid-cols-1 gap-8 tablet:grid tablet:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] tablet:items-center tablet:gap-8">
          <div className="flex flex-col gap-3.5">
            {ITEMS.map((it, i) => {
              const on = i === active;
              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className="w-full cursor-pointer rounded-[16px] border p-5 text-left transition-all duration-300"
                  style={{ borderColor: on ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.07)", background: on ? "rgba(255,255,255,0.05)" : "transparent" }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-sora text-[22px] font-normal tablet:text-[24px]" style={{ letterSpacing: "-0.02em", color: on ? "#FFFFFF" : "rgba(255,255,255,0.45)", transition: "color 0.3s" }}>
                      {it.title}
                    </h3>
                    <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full" style={{ background: on ? "#DB3B2B" : "rgba(255,255,255,0.08)", transition: "background 0.3s" }}>
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke={on ? "#fff" : "rgba(255,255,255,0.4)"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </div>
                  {on && (
                    <>
                      <p className="font-inter text-[16px] font-normal leading-relaxed text-white/60" style={{ marginTop: 12 }}>{it.description}</p>
                      <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.10)" }}>
                        <div style={{ height: "100%", width: barFull ? "100%" : "0%", background: "#DB3B2B", transition: barFull ? `width ${DURATION}ms linear` : "none" }} />
                      </div>
                    </>
                  )}
                </button>
              );
            })}
          </div>
          <Card it={ITEMS[active]} />
        </div>

        {/* Móvil — carrusel con swipe + timer */}
        <div className="tablet:hidden">
          <div
            ref={scrollRef}
            onScroll={onCarouselScroll}
            className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {ITEMS.map((it) => (
              <div key={it.id} className="w-full shrink-0 snap-center">
                <Card it={it} />
                <div className="mt-4 px-1 text-center">
                  <h3 className="font-sora text-[22px] font-normal text-white" style={{ letterSpacing: "-0.02em" }}>{it.title}</h3>
                  <p className="mx-auto mt-2 max-w-[360px] font-inter text-[15px] font-light leading-relaxed text-white/60">{it.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-2 px-1">
            {ITEMS.map((_, i) => (
              <button key={i} type="button" onClick={() => setActive(i)} aria-label={`Ir a ${ITEMS[i].title}`} className="h-[4px] flex-1 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.12)" }}>
                <div style={{ height: "100%", width: i < active ? "100%" : i === active ? (barFull ? "100%" : "0%") : "0%", background: "#DB3B2B", transition: i === active && barFull ? `width ${DURATION}ms linear` : "none" }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
