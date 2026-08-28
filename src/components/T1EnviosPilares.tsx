"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { CotizadorPanel, RastreoPanel } from "@/components/T1EnviosPanels";

const ITEMS = [
  {
    id: "cotiza",
    title: "Cotiza y crea envío",
    description: "Compara +10 paqueterías, elige la mejor tarifa y genera tu guía al instante.",
    cta: "Cotiza ahora",
    ctaHref: "/productos/t1envios/multipaqueteria",
    panel: "cotiza" as const,
    image: "",
  },
  {
    id: "rastrea",
    title: "Rastrea",
    description: "Sigue todos tus paquetes en tiempo real desde un solo panel, sin entrar a cada paquetería.",
    cta: "Conoce más",
    ctaHref: "/productos/t1envios/rastreo",
    panel: "rastreo" as const,
    image: "",
  },
  {
    id: "seguimiento",
    title: "Seguimiento",
    description: "Nuestra torre de control detecta y resuelve cualquier incidencia antes que tu cliente.",
    cta: "Conoce más",
    ctaHref: "/productos/t1envios/control-calidad",
    image: "/img/incidencias-reportadas.png",
  },
];

const DURATION = 5000;

export default function T1EnviosPilares() {
  const [active, setActive] = useState(0);
  const [barFull, setBarFull] = useState(false);

  useEffect(() => {
    setBarFull(false);
    const raf = requestAnimationFrame(() => setBarFull(true));
    const timer = setTimeout(() => setActive((a) => (a + 1) % ITEMS.length), DURATION);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [active]);

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

  const Cta = ({ it }: { it: (typeof ITEMS)[number] }) => (
    <a href={it.ctaHref} className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-6 py-3 font-inter text-[14px] font-semibold text-white no-underline transition-colors duration-150 hover:bg-[#C0332A]">
      {it.cta}
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </a>
  );

  const Card = ({ it }: { it: (typeof ITEMS)[number] }) => {
    // Cotiza y Rastrea muestran un panel animado (mock móvil); Crea usa imagen.
    if ("panel" in it && it.panel) {
      return (
        <div className="flex w-full flex-col items-center gap-6">
          {it.panel === "cotiza" ? <CotizadorPanel /> : <RastreoPanel />}
          <Cta it={it} />
        </div>
      );
    }
    return (
      <div className="audience-card-wrap flex w-full justify-center tablet:justify-start">
        <div className="audience-card flex w-full" style={{ maxWidth: 460 }}>
          <span className="audience-beam" aria-hidden />
          <div className="relative z-[1] w-full overflow-hidden rounded-[18.5px]" style={{ background: "#1b1714" }}>
            <div className="relative w-full" style={{ aspectRatio: "741 / 565" }}>
              <Image src={it.image} alt={it.title} fill className="object-cover" sizes="(max-width: 768px) 90vw, 460px" />
              <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.75) 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-5 tablet:p-7">
                <Cta it={it} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden bg-black px-5 tablet:px-6" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="relative mx-auto max-w-[var(--max-w)]">
        <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", textAlign: "center", marginBottom: 16 }}>
          Cotiza, crea y rastrea
        </h2>
        <p className="mx-auto font-inter text-[16px] font-light text-white/85 tablet:whitespace-nowrap tablet:text-[18px]" style={{ textAlign: "center", marginBottom: 56 }}>
          Del cotizador a la torre de control: todo el ciclo de tu envío, en un solo lugar.
        </p>

        <div className="hidden grid-cols-1 gap-8 tablet:grid tablet:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] tablet:items-center tablet:gap-8">
          <div className="flex flex-col gap-3.5">
            {ITEMS.map((it, i) => {
              const on = i === active;
              return (
                <button key={it.id} type="button" onClick={() => setActive(i)} className="w-full cursor-pointer rounded-[16px] border p-5 text-left transition-all duration-300" style={{ borderColor: on ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.07)", background: on ? "rgba(255,255,255,0.05)" : "transparent" }}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-sora text-[22px] font-normal tablet:text-[24px]" style={{ letterSpacing: "-0.02em", color: on ? "#FFFFFF" : "rgba(255,255,255,0.45)", transition: "color 0.3s" }}>{it.title}</h3>
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

        <div className="tablet:hidden">
          <div ref={scrollRef} onScroll={onCarouselScroll} className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
