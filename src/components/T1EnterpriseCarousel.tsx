"use client";

import Image from "next/image";
import { useState, useCallback, useRef } from "react";

/* Brand "spotlight" tint baked over every card photo (dark maroon). */
const TINT = "#241014";

/* ── Case studies data (same source as T1Enterprise) ── */
type CaseStudy = {
  id: string; name: string; image: string; whiteLogo?: string; coverImage: string;
  treated?: boolean; textSide?: "left" | "right"; hidden?: boolean; logoH?: number; logoHm?: number; bgColor: string;
  metric: string; metricLabel: string; quote: string;
  person: string; role: string; hasVideo: boolean; videoId?: string;
};
const CASES: CaseStudy[] = [
  {
    id: "sears", name: "Sears", image: "/img/logos/sears-v2.png", whiteLogo: "/img/logo-sears-white.png", coverImage: "/img/caso-sears-art.png", treated: true, bgColor: "#241014",
    metric: "Cobertura", metricLabel: "nacional con entrega el mismo día",
    quote: "T1 como core logístico, con cobertura a nivel nacional y entrega el mismo día.",
    person: "Mario Muñoz", role: "CHIEF DIGITAL OFFICER | SEARS", hasVideo: true, videoId: "KtUy7AhmdlA",
  },
  {
    id: "circulo", name: "Círculo de Crédito", image: "/img/logos/circulo-v3.png", whiteLogo: "/img/logo-circulo-white.png", coverImage: "/img/caso-circulo-art.png", treated: true, logoH: 40, bgColor: "#241014",
    metric: "−40%", metricLabel: "de mora temprana gracias a data alternativa",
    quote: "Con T1 Score logramos reducir 40% la mora temprana gracias a la data alternativa que integran al modelo.",
    person: "Juan Manuel Ruiz", role: "DIRECTOR GENERAL | CÍRCULO DE CRÉDITO", hasVideo: true, videoId: "MPXrBe7iNgE",
  },
  {
    id: "casadetono", name: "Casa de Toño", image: "/img/logos/casadetono-v3.png", whiteLogo: "/img/logo-casadetono-white.png", coverImage: "/img/caso-casadetono-art.png", treated: true, logoH: 60, logoHm: 45, bgColor: "#241014",
    metric: "+92%", metricLabel: "de aprobación y fraude casi cero",
    quote: "T1 Pagos permitió a Casa de Toño mantener altos niveles de aprobación, con fraude prácticamente nulo en sus operaciones digitales a través de su canal de WhatsApp.",
    person: "", role: "", hasVideo: false,
  },
  {
    id: "telcel", name: "Telcel", image: "/img/logos/telcel-v2.png", whiteLogo: "/img/logo-telcel-white.png", coverImage: "/img/caso-telcel-art.png", treated: true, textSide: "right", bgColor: "#241014",
    metric: "+2 M", metricLabel: "de recargas procesadas",
    quote: "T1 Pagos ha procesado más de 2 millones de paquetes y recargas Telcel, consolidando una operación digital de alto volumen dentro del ecosistema.",
    person: "", role: "", hasVideo: false,
  },
  {
    id: "pirma", name: "Pirma", image: "/img/logos/pirma-v2.png", whiteLogo: "/img/logo-pirma-white.png", coverImage: "/img/caso-pirma-art.png", treated: true, logoH: 45, logoHm: 36, bgColor: "#241014",
    metric: "45%", metricLabel: "reducción en tiempo de entrega promedio",
    quote: "T1 Envíos nos dio acceso a las mejores paqueterías con tarifas que no podíamos negociar solos.",
    person: "Fernando Díaz", role: "HEAD OF LOGISTICS | PIRMA", hasVideo: false,
  },
  {
    id: "makora", name: "Makora", image: "/img/logos/makora-v2.png", whiteLogo: "/img/logo-makora-white.png", coverImage: "/img/caso-makora-art.png", treated: true, textSide: "right", bgColor: "#241014",
    metric: "+ Conversión", metricLabel: "y centralización de operación",
    quote: "T1 nos ayudó a aumentar la conversión y centralizar toda nuestra operación en una sola plataforma.",
    person: "Marín Ramos", role: "FUNDADOR Y DIRECTOR GENERAL | MAKORA", hasVideo: true, videoId: "7l0BDngMRUk",
  },
  {
    id: "pase", name: "PASE", image: "/img/logos/pase-v3.png", whiteLogo: "/img/logo-pase-white.png", coverImage: "/img/caso-pase-art.png", treated: true, textSide: "right", logoH: 45, logoHm: 36, bgColor: "#241014",
    metric: "<0.5 s", metricLabel: "tiempo de respuesta · 98% aprobación · +2 mil entregas de tags al mes",
    quote: "Con T1 procesamos en menos de 0.5 segundos con 98% de aprobación y entregamos más de 2 mil tags al mes.",
    person: "Alexis Reséndiz Meza", role: "DIRECTOR GENERAL | PASE", hasVideo: true, videoId: "ezeCCveM8y4",
  },
  {
    id: "claro", name: "Claro", image: "/img/logos/claro-v3.png", coverImage: "/img/caso-claro-v2.png", hidden: true, bgColor: "#1A0510",
    metric: "3.2x", metricLabel: "más pedidos procesados por hora",
    quote: "Con T1 automatizamos la gestión de pedidos y redujimos tiempos de preparación significativamente.",
    person: "Javier Torres", role: "DIRECTOR DE OPERACIONES | CLARO", hasVideo: false,
  },
];

/* ── Arrow button ── */
function ArrowBtn({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "left" ? "Anterior" : "Siguiente"}
      className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/50 transition-all duration-150 hover:border-white/30 hover:text-white"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d={direction === "left" ? "M10 4L6 8L10 12" : "M6 4L10 8L6 12"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function T1EnterpriseCarousel() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<(typeof CASES)[number] | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // First child = a card; scroll by its width + gap so one card advances.
    const first = el.querySelector<HTMLElement>("[data-card]");
    const gap = 20;
    const step = first ? first.offsetWidth + gap : el.clientWidth * 0.62;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  return (
    <section className="bg-[#141414] pb-[60px] pt-[100px]">
      <div className="mx-auto max-w-[var(--max-w)] px-5 tablet:px-6">
        {/* Header row */}
        <div className="flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between" style={{ marginBottom: 32 }}>
          <div>
            <h2
              className="font-sora text-[28px] font-light text-white tablet:text-[36px] lg:text-[44px]"
              style={{ letterSpacing: "-0.03em", lineHeight: "1.2em" }}
            >
              Negocios que ya operan con T1
            </h2>
            <p
              className="font-inter text-[14px] font-light text-white/55 tablet:text-[15px] lg:text-[16px]"
              style={{ lineHeight: 1.55, maxWidth: 620 }}
            >
              Desde comercios en crecimiento hasta empresas de alto volumen, T1 ayuda a conectar ventas, pagos y operación.
            </p>
          </div>
          <div className="hidden items-center gap-2 tablet:flex">
            <ArrowBtn direction="left" onClick={() => scrollByCard(-1)} />
            <ArrowBtn direction="right" onClick={() => scrollByCard(1)} />
          </div>
        </div>
      </div>

      {/* Peek carousel — one full card + ~60% of the next.
          Left padding aligns the first card to the page container; the
          track itself bleeds to the right edge so the peek reads as
          "more to come". */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          paddingLeft: "max(20px, calc((100vw - var(--max-w)) / 2 + 24px))",
          scrollPaddingLeft: "max(20px, calc((100vw - var(--max-w)) / 2 + 24px))",
          paddingRight: 24,
        }}
      >
        {CASES.filter((c) => !c.hidden).map((c) => {
          // Pre-treated art carries the spotlight baked into the PNG, so it
          // skips the CSS overlay. Subject side varies per photo: text goes on
          // the empty color side (opposite the person).
          const treated = !!c.treated;
          const isRight = c.textSide === "right";
          const logoH = c.logoH ?? 26;   // desktop white-logo height
          const logoHm = c.logoHm ?? Math.round(logoH * 0.9); // mobile height
          return (
          <article
            key={c.id}
            data-card
            className="relative shrink-0 overflow-hidden rounded-[22px] flex-[0_0_82%] tablet:flex-[0_0_62%] tablet:h-[460px]"
            style={{
              background: TINT,
              scrollSnapAlign: "start",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.07)",
            }}
          >
            {/* ── MOBILE / responsive: image on top, text below ── */}
            <div className="flex flex-col tablet:hidden">
              <div className="relative h-[200px]" style={{ background: c.bgColor }}>
                {c.coverImage && (
                  <Image
                    src={c.coverImage}
                    alt={c.name}
                    fill
                    quality={92}
                    className="object-cover"
                    style={{ objectPosition: isRight ? "18% center" : "82% center" }}
                    sizes="82vw"
                  />
                )}
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.28) 0%, transparent 42%, rgba(36,16,20,0.55) 100%)" }} />
                {/* Logo — same side as the text (right for telcel/makora/pase) */}
                {c.whiteLogo ? (
                  <Image
                    src={c.whiteLogo}
                    alt={c.name}
                    width={200}
                    height={44}
                    className={`absolute top-5 z-10 w-auto object-contain ${isRight ? "right-5" : "left-5"}`}
                    style={{ height: logoHm, filter: "drop-shadow(0 1px 8px rgba(0,0,0,0.45))" }}
                  />
                ) : (
                  <div className={`absolute top-4 z-10 flex h-[44px] w-[44px] items-center justify-center overflow-hidden rounded-[11px] bg-white ${isRight ? "right-4" : "left-4"}`} style={{ boxShadow: "0 3px 10px rgba(0,0,0,0.22)" }}>
                    <Image src={c.image} alt={c.name} width={34} height={34} className="object-contain" style={{ padding: 3 }} />
                  </div>
                )}
                {/* Ver video — opposite the logo */}
                {c.hasVideo && (
                  <button
                    type="button"
                    onClick={() => { setActiveVideo(c); setVideoOpen(true); }}
                    aria-label={`Ver video de ${c.name}`}
                    className={`absolute top-4 z-10 inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white/95 py-1.5 pl-2 pr-3 font-inter text-[11px] font-semibold text-black ${isRight ? "left-4" : "right-4"}`}
                    style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.22)" }}
                  >
                    <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-black">
                      <svg width="7" height="9" viewBox="0 0 8 10" fill="none"><path d="M1 1L7 5L1 9V1Z" fill="white" /></svg>
                    </span>
                    Ver video
                  </button>
                )}
              </div>
              <div className="p-5">
                <p className="font-sora text-[26px] font-semibold leading-none text-white" style={{ letterSpacing: "-0.02em" }}>{c.metric}</p>
                <p className="mt-2 font-inter text-[13px] font-medium leading-snug text-white/85">{c.metricLabel}</p>
                <p className="mt-3 font-inter text-[13px] italic leading-relaxed text-white/70">&ldquo;{c.quote}&rdquo;</p>
                {c.person && (
                  <p className="mt-3 font-inter text-[11px] font-semibold uppercase text-white/70" style={{ letterSpacing: "0.04em" }}>
                    {c.person} <span className="font-normal text-white/45">· {c.role}</span>
                  </p>
                )}
              </div>
            </div>

            {/* ── DESKTOP: full-bleed treated photo with text overlaid ── */}
            <div className="hidden tablet:contents">
              {c.coverImage && (
                <Image
                  src={c.coverImage}
                  alt={c.name}
                  fill
                  quality={92}
                  className="object-cover"
                  style={{ objectPosition: "center" }}
                  sizes="720px"
                />
              )}

              {/* Maroon spotlight for cards whose photo is NOT pre-treated. */}
              {!treated && (
                <>
                  <div
                    className="absolute inset-0"
                    style={{ background: `radial-gradient(circle at 60% 40%, transparent 0%, transparent 28%, ${TINT}80 44%, ${TINT}F2 62%, ${TINT} 100%)` }}
                  />
                  <div
                    className="pointer-events-none absolute"
                    style={{ left: "60%", top: "40%", width: 560, height: 560, transform: "translate(-50%, -50%)", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)" }}
                  />
                </>
              )}
              {/* Bottom legibility gradient */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 34%, rgba(0,0,0,0.18) 58%, rgba(0,0,0,0.82) 100%)" }}
              />

              {/* Brand logo — color side */}
              {c.whiteLogo ? (
                <div className={`absolute top-6 z-10 ${isRight ? "right-6" : "left-6"}`}>
                  <Image
                    src={c.whiteLogo}
                    alt={c.name}
                    width={200}
                    height={44}
                    className="w-auto object-contain"
                    style={{ height: logoH, filter: "drop-shadow(0 1px 8px rgba(0,0,0,0.45))" }}
                  />
                </div>
              ) : (
                <div className="absolute left-5 top-5 z-10 flex items-center gap-2.5">
                  <div className="flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[12px] bg-white" style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.22)" }}>
                    <Image src={c.image} alt={c.name} width={38} height={38} className="object-contain" style={{ padding: 4 }} />
                  </div>
                  <span className="font-inter text-[15px] font-semibold text-white" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>{c.name}</span>
                </div>
              )}

              {/* Ver video — opposite the color side */}
              {c.hasVideo && (
                <button
                  type="button"
                  onClick={() => { setActiveVideo(c); setVideoOpen(true); }}
                  aria-label={`Ver video de ${c.name}`}
                  className={`absolute top-5 z-10 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/90 py-2 pl-2.5 pr-4 font-inter text-[12px] font-semibold text-black transition-all duration-150 hover:bg-white ${isRight ? "left-5" : "right-5"}`}
                  style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.22)" }}
                >
                  <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-black">
                    <svg width="8" height="10" viewBox="0 0 8 10" fill="none"><path d="M1 1L7 5L1 9V1Z" fill="white" /></svg>
                  </span>
                  Ver video
                </button>
              )}

              {/* Text on the color side, raised and width-limited */}
              <div className={`absolute inset-y-0 z-10 flex max-w-[52%] flex-col justify-end p-7 pb-14 ${isRight ? "right-0 items-end text-right" : "left-0"}`}>
                <p className="font-sora text-[36px] font-semibold leading-none text-white" style={{ letterSpacing: "-0.02em" }}>{c.metric}</p>
                <p className="mt-2 font-inter text-[14px] font-medium leading-snug text-white/85">{c.metricLabel}</p>
                <p className="mt-4 font-inter text-[14px] italic leading-relaxed text-white/80" style={{ textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}>&ldquo;{c.quote}&rdquo;</p>
                {c.person && (
                  <p className="mt-4 font-inter text-[12px] font-semibold uppercase text-white/80" style={{ letterSpacing: "0.04em" }}>
                    {c.person} <span className="font-normal text-white/50">· {c.role}</span>
                  </p>
                )}
              </div>
            </div>
          </article>
          );
        })}
      </div>

      {/* Video modal */}
      {videoOpen && activeVideo?.hasVideo && activeVideo.videoId && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", animation: "fadeSlideIn 0.2s ease-out" }}
          onClick={() => setVideoOpen(false)}
        >
          <button
            onClick={() => setVideoOpen(false)}
            className="absolute right-6 top-6 flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border-none bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Cerrar"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div
            className="relative w-full max-w-[960px] overflow-hidden rounded-[16px]"
            style={{ aspectRatio: "16 / 9", margin: "0 24px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1`}
              title={`Caso de éxito: ${activeVideo.name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-none"
            />
          </div>
        </div>
      )}
    </section>
  );
}
