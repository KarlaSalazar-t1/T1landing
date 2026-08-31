"use client";

import { useState, useEffect, useRef } from "react";
import { PhoneFrame, TiendaFlow, LinkFlow } from "@/components/T1PagosEnLinea";
import { ApiFlow } from "@/components/T1PagosApiFlow";

const ITEMS = [
  {
    id: "checkout",
    title: "Pasarela en línea",
    description: "Una pasarela optimizada para convertir, con todos los métodos de pago y meses sin intereses.",
    cta: "Conoce más",
    ctaHref: "/productos/t1pagos/pagos-en-linea",
    Flow: TiendaFlow,
  },
  {
    id: "links",
    title: "Links de pago",
    description: "Cobra sin tienda ni terminal: comparte un link por WhatsApp, redes o correo y te pagan con tarjeta.",
    cta: "Conoce más",
    ctaHref: "/productos/t1pagos/links-de-pago",
    Flow: LinkFlow,
  },
  {
    id: "api",
    title: "API e integraciones",
    description: "Conecta T1 Pagos a tu plataforma, app o flujo propio.",
    cta: "Conoce más",
    ctaHref: "/login",
    Flow: ApiFlow,
  },
];

const DURATION = 9000;

export default function T1PagosPilares() {
  const [active, setActive] = useState(0);
  const [barFull, setBarFull] = useState(false);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // El loop y las animaciones arrancan sólo cuando la sección entra en viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setStarted(true); return; }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.3 });
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

  // Cada pilar muestra su flujo animado; el de Score es un panel interno de T1
  // (no un teléfono). Las animaciones sólo montan cuando la sección arrancó.
  const Card = ({ it }: { it: (typeof ITEMS)[number] }) => {
    const Flow = it.Flow;
    const isStandalone = "standalone" in it && (it as { standalone?: boolean }).standalone;
    return (
      <div className="flex w-full flex-col items-center gap-7 py-2">
        {isStandalone ? (
          started ? <Flow /> : <div className="mx-auto w-full max-w-[300px]" style={{ minHeight: 512 }} />
        ) : (
          <PhoneFrame>{started ? <Flow /> : null}</PhoneFrame>
        )}
        <Cta it={it} />
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black px-5 tablet:px-6" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="relative mx-auto max-w-[var(--max-w)]">
        <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", textAlign: "center", marginBottom: 16 }}>
          Una plataforma para todos tus cobros
        </h2>
        <p className="mx-auto font-inter text-[16px] font-light text-white/85 tablet:whitespace-nowrap tablet:text-[18px]" style={{ textAlign: "center", marginBottom: 56 }}>
          Cobra en tu pasarela, con un link o desde tu propia integración, todo en un lugar.
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
