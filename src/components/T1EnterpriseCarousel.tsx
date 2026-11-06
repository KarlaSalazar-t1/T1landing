"use client";

import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

/* Brand "spotlight" tint baked over every card photo (dark maroon). */
const TINT = "#241014";

/* ── Case studies data (same source as T1Enterprise) ──
   El orden del array es el orden de la Home; las páginas de producto lo fijan con `only`. */
type CaseStudy = {
  id: string; name: string; image: string; whiteLogo?: string; coverImage: string;
  /* Foto-still real del entrevistado (solo versión B, para las tarjetas con video). */
  videoCover?: string;
  treated?: boolean; textSide?: "left" | "right"; videoTextRight?: boolean; hidden?: boolean; logoH?: number; logoHm?: number; bgColor: string;
  metric: string; metricLabel: string; quote: string;
  person: string; role: string; hasVideo: boolean; videoId?: string;
};
const CASES: CaseStudy[] = [
  {
    id: "pirma", name: "Pirma", image: "/img/logos/pirma-v2.png", whiteLogo: "/img/logo-pirma-white.png", coverImage: "/img/pirma-card-v5.png", treated: true, logoH: 45, logoHm: 36, bgColor: "#241014",
    metric: "45%", metricLabel: "reducción en tiempo de entrega promedio",
    quote: "T1 Envíos nos dio acceso a las mejores paqueterías con tarifas que no podíamos negociar solos.",
    person: "Fernando Díaz", role: "HEAD OF LOGISTICS | PIRMA", hasVideo: false,
  },
  {
    id: "sesen", name: "Sesen", image: "/img/logo-sesen-white.png", whiteLogo: "/img/logo-sesen-white.png", coverImage: "/img/sesen-video.jpg", videoCover: "/img/sesen-video.jpg", treated: true, videoTextRight: true, bgColor: "#241014",
    metric: "+15 mil", metricLabel: "órdenes de compra y casi un millón de visitas al año",
    quote: "Si no tuviéramos un aliado con la infraestructura que tiene T1, para nosotros sería muy complicado y tendríamos muchísimos problemas con los clientes.",
    person: "Karim Nakid", role: "COFUNDADOR | SESEN", hasVideo: true, videoId: "9RhBr228C_o",
  },
  {
    id: "makora", name: "Makora", image: "/img/logos/makora-v2.png", whiteLogo: "/img/logo-makora-white.png", coverImage: "/img/caso-makora-art.png", videoCover: "/img/makora-video.png", treated: true, textSide: "right", bgColor: "#241014",
    metric: "+ Conversión", metricLabel: "y centralización de operación",
    quote: "T1 nos ayudó a aumentar la conversión y centralizar toda nuestra operación en una sola plataforma.",
    person: "Marín Ramos", role: "FUNDADOR Y DIRECTOR GENERAL | MAKORA", hasVideo: true, videoId: "7l0BDngMRUk",
  },
  {
    id: "doto", name: "Doto", image: "/img/logo-doto-white.png", whiteLogo: "/img/logo-doto-white.png", coverImage: "/img/doto-video.jpg", videoCover: "/img/doto-video.jpg", treated: true, videoTextRight: true, logoH: 34, logoHm: 30, bgColor: "#241014",
    metric: "−20%", metricLabel: "en costos de envío",
    quote: "Hoy en día usamos la tecnología de T1 para centralizar toda la información.",
    person: "Jacobo Sutton", role: "HEAD DE E-COMMERCE | DOTO", hasVideo: true, videoId: "nKPCKDAd8Vg",
  },
  {
    id: "visa", name: "Visa", image: "/img/logos/visa.png", whiteLogo: "/img/logo-visa-white.svg", coverImage: "/img/visa-video.jpg", videoCover: "/img/visa-video.jpg", treated: true, videoTextRight: true, bgColor: "#241014",
    metric: "8 países", metricLabel: "con millones de transacciones al mes",
    quote: "No todas las empresas tienen la capacidad de tener equipos especializados. El acompañamiento de T1pagos en la integración ha sido esencial.",
    person: "Berenice Dávalos", role: "VISA ACCEPTANCE SOLUTIONS | VISA", hasVideo: true, videoId: "vxP9Boi-gNs",
  },
  {
    id: "casadetono", name: "Casa de Toño", image: "/img/logos/casadetono-v3.png", whiteLogo: "/img/logo-casadetono-white.png", coverImage: "/img/casa-card-v5.png", treated: true, logoH: 60, logoHm: 45, bgColor: "#241014",
    metric: "+92%", metricLabel: "de aprobación y fraude casi cero",
    quote: "T1 Pagos permitió a Casa de Toño mantener altos niveles de aprobación, con fraude prácticamente nulo en sus operaciones digitales a través de su canal de WhatsApp.",
    person: "", role: "", hasVideo: false,
  },
  {
    id: "marcosmetics", name: "Mar Cosmetics", image: "/img/logo-marcosmetics-white.png", whiteLogo: "/img/logo-marcosmetics-white.png", coverImage: "/img/marcosmetics-video.jpg", videoCover: "/img/marcosmetics-video.jpg", treated: true, videoTextRight: true, logoH: 20, logoHm: 18, bgColor: "#241014",
    metric: "−30%", metricLabel: "en tiempos de entrega",
    quote: "Llegamos a T1envíos, que nos ofrecieron una solución rápida, sencilla, que nos permita generar la mayor cantidad de guías posibles, con las mejores paqueterías.",
    person: "Jorge Rodríguez", role: "DIRECTOR GENERAL | MAR COSMETICS", hasVideo: true, videoId: "RgOzL4L65X8",
  },
  {
    id: "sears", name: "Sears", image: "/img/logos/sears-v2.png", whiteLogo: "/img/logo-sears-white.png", coverImage: "/img/caso-sears-art.png", videoCover: "/img/sears-video.png", treated: true, bgColor: "#241014",
    metric: "Cobertura", metricLabel: "nacional con entrega el mismo día",
    quote: "T1 como core logístico, con cobertura a nivel nacional y entrega el mismo día.",
    person: "Mario Muñoz", role: "CHIEF DIGITAL OFFICER | SEARS", hasVideo: true, videoId: "KtUy7AhmdlA",
  },
  {
    id: "telcel", name: "Telcel", image: "/img/logos/telcel-v2.png", whiteLogo: "/img/logo-telcel-white.png", coverImage: "/img/telcel-card-v5.png", treated: true, bgColor: "#241014",
    metric: "+2 M", metricLabel: "de recargas procesadas",
    quote: "T1 Pagos ha procesado más de 2 millones de paquetes y recargas Telcel, consolidando una operación digital de alto volumen dentro del ecosistema.",
    person: "", role: "", hasVideo: false,
  },
  {
    id: "melonn", name: "Melonn", image: "/img/logo-melonn-white.png", whiteLogo: "/img/logo-melonn-white.png", coverImage: "/img/melonn-video.jpg", videoCover: "/img/melonn-video.jpg", treated: true, videoTextRight: true, bgColor: "#241014",
    metric: "+95%", metricLabel: "de entregas a tiempo",
    quote: "Nosotros nos conectamos con T1 de una forma muy natural. Las integraciones fueron sencillas, fueron rápidas y fluyen súper bien.",
    person: "Alejandro Celis", role: "COFUNDADOR | MELONN", hasVideo: true, videoId: "w49Dhj15DxQ",
  },
  {
    id: "pase", name: "PASE", image: "/img/logos/pase-v3.png", whiteLogo: "/img/logo-pase-white.png", coverImage: "/img/caso-pase-art.png", videoCover: "/img/pase-video.png", treated: true, textSide: "right", logoH: 45, logoHm: 36, bgColor: "#241014",
    metric: "<0.5 s", metricLabel: "tiempo de respuesta · 98% aprobación · +2 mil entregas de tags al mes",
    quote: "Con T1 procesamos en menos de 0.5 segundos con 98% de aprobación y entregamos más de 2 mil tags al mes.",
    person: "Alexis Reséndiz Meza", role: "DIRECTOR GENERAL | PASE", hasVideo: true, videoId: "ezeCCveM8y4",
  },
  {
    id: "circulo", name: "Círculo de Crédito", image: "/img/logos/circulo-v3.png", whiteLogo: "/img/logo-circulo-white.png", coverImage: "/img/caso-circulo-art.png", videoCover: "/img/circulo-video.png", treated: true, logoH: 40, bgColor: "#241014",
    metric: "−40%", metricLabel: "de mora temprana gracias a data alternativa",
    quote: "Con T1 Score logramos reducir 40% la mora temprana gracias a la data alternativa que integran al modelo.",
    person: "Juan Manuel Ruiz", role: "DIRECTOR GENERAL | CÍRCULO DE CRÉDITO", hasVideo: true, videoId: "MPXrBe7iNgE",
  },
  {
    id: "bzpay", name: "Bzpay", image: "/img/logo-bzpay-white.png", whiteLogo: "/img/logo-bzpay-white.png", coverImage: "/img/bzpay-video.jpg", videoCover: "/img/bzpay-video.jpg", treated: true, videoTextRight: true, bgColor: "#241014",
    metric: "+ Aprobación", metricLabel: "de 80% a 98% con T1score",
    quote: "T1score llegó a complementar esta estrategia, ayudándonos a tomar decisiones de riesgo mucho más inteligentes en tiempo real.",
    person: "Luis Bravo", role: "CEO | BZPAY", hasVideo: true, videoId: "LktQjyQDAeU",
  },
  {
    id: "claro", name: "Claro", image: "/img/logos/claro-v3.png", coverImage: "/img/caso-claro-v2.png", hidden: true, bgColor: "#1A0510",
    metric: "3.2x", metricLabel: "más pedidos procesados por hora",
    quote: "Con T1 automatizamos la gestión de pedidos y redujimos tiempos de preparación significativamente.",
    person: "Javier Torres", role: "DIRECTOR DE OPERACIONES | CLARO", hasVideo: false,
  },
];

/* ── Arrow button ── */
/* disabled: al inicio/final del carrusel la flecha se apaga (antes seguía viéndose
   activa al llegar al último caso y la gente la tocaba varias veces). */
function ArrowBtn({ direction, onClick, disabled = false }: { direction: "left" | "right"; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Anterior" : "Siguiente"}
      className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/50 transition-all duration-150 hover:border-white/30 hover:text-white disabled:cursor-default disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-white/50"
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

export default function T1EnterpriseCarousel({
  bVariant = false,
  only,
  title = "Marcas que crecen con T1",
  subtitle = "De emprendedores a grandes empresas.",
}: {
  bVariant?: boolean;
  only?: string[];
  title?: string;
  subtitle?: string;
}) {
  const [videoOpen, setVideoOpen] = useState(false);
  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setVideoOpen(false); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [videoOpen]);
  const [activeVideo, setActiveVideo] = useState<(typeof CASES)[number] | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const cards = only && only.length
    ? (only.map((id) => CASES.find((c) => c.id === id)).filter(Boolean) as CaseStudy[])
    : CASES.filter((c) => !c.hidden);

  // Card width + gap: lo que avanza una flecha (y la base para saber en qué caso vas).
  const cardStep = useCallback(() => {
    const el = trackRef.current;
    const first = el?.querySelector<HTMLElement>("[data-card]");
    const gap = 20;
    return first ? first.offsetWidth + gap : (el?.clientWidth ?? 0) * 0.62;
  }, []);

  // Va a un caso por índice (no scrollBy relativo: con scroll-snap un clic durante la
  // animación a veces se perdía y la flecha "no hacía nada").
  const scrollToCard = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: Math.min(max, Math.max(0, i * cardStep())), behavior: "smooth" });
  };

  // Posición: caso activo + si ya se llegó al inicio/final (para apagar flechas)
  // idx = caso alineado a la izquierda (navegación); dot = el que se marca (al final, el último).
  const [pos, setPos] = useState({ idx: 0, dot: 0, atStart: true, atEnd: false });
  const scrollByCard = (dir: 1 | -1) => scrollToCard(pos.idx + dir);
  const updatePos = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    const atStart = el.scrollLeft <= 4;
    const step = cardStep();
    // Al final el último caso no llega a alinearse a la izquierda: se redondea hacia
    // arriba para que "Anterior" regrese de uno en uno (sin saltarse uno).
    const idx = step ? (atEnd ? Math.ceil : Math.round)(el.scrollLeft / step) : 0;
    const dot = atEnd ? cards.length - 1 : idx;
    setPos((p) => (p.idx === idx && p.dot === dot && p.atEnd === atEnd && p.atStart === atStart ? p : { idx, dot, atStart, atEnd }));
  }, [cardStep, cards.length]);
  useEffect(() => {
    updatePos();
    window.addEventListener("resize", updatePos);
    return () => window.removeEventListener("resize", updatePos);
  }, [updatePos]);

  return (
    <section className="bg-[#0e0d0d] pb-[60px] pt-[100px]">
      <div className="mx-auto max-w-[var(--max-w)] px-5 tablet:px-6">
        {/* Header row */}
        <div className="flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between" style={{ marginBottom: 32 }}>
          <div>
            <h2
              className="font-sora text-[28px] font-light text-white tablet:text-[36px] lg:text-[44px]"
              style={{ letterSpacing: "-0.03em", lineHeight: "1.2em" }}
            >
              {title}
            </h2>
            <p
              className="font-inter text-[14px] font-light text-white/55 tablet:text-[16px] lg:text-[16px]"
              style={{ lineHeight: 1.55, maxWidth: 620 }}
            >
              {subtitle}
            </p>
          </div>
          <div className="hidden items-center gap-2 tablet:flex">
            <ArrowBtn direction="left" onClick={() => scrollByCard(-1)} disabled={pos.atStart} />
            <ArrowBtn direction="right" onClick={() => scrollByCard(1)} disabled={pos.atEnd} />
          </div>
        </div>
      </div>

      {/* Peek carousel — one full card + ~60% of the next.
          Left padding aligns the first card to the page container; the
          track itself bleeds to the right edge so the peek reads as
          "more to come". */}
      <div
        ref={trackRef}
        onScroll={updatePos}
        className="flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          paddingLeft: "max(20px, calc((100vw - var(--max-w)) / 2 + 24px))",
          scrollPaddingLeft: "max(20px, calc((100vw - var(--max-w)) / 2 + 24px))",
          paddingRight: 24,
        }}
      >
        {cards.map((c) => {
          // Pre-treated art carries the spotlight baked into the PNG, so it
          // skips the CSS overlay. Subject side varies per photo: text goes on
          // the empty color side (opposite the person).
          // Versión B: las tarjetas con video usan la foto-still real del entrevistado.
          const videoCard = bVariant && c.hasVideo && !!c.videoCover;
          const cover = videoCard ? c.videoCover! : c.coverImage;
          const treated = videoCard ? true : !!c.treated; // videoCard trae su propio degradado, sin spotlight
          // Foto-still: por defecto el entrevistado va a la derecha y el texto a la izquierda;
          // las miniaturas nuevas lo traen a la izquierda, así que marcan videoTextRight.
          const isRight = videoCard ? c.videoTextRight === true : c.textSide === "right";
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
                {cover && (
                  <Image
                    src={cover}
                    alt={c.name}
                    fill
                    quality={92}
                    className="object-cover"
                    style={{ objectPosition: videoCard ? "center 20%" : isRight ? "18% center" : "82% center" }}
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
                {/* Ver video — chip (versión A / no-videoCard) */}
                {c.hasVideo && !videoCard && (
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

                {/* Play centrado (versión B, foto-still) */}
                {videoCard && (
                  <button
                    type="button"
                    onClick={() => { setActiveVideo(c); setVideoOpen(true); }}
                    aria-label={`Ver video de ${c.name}`}
                    className="group/play absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center border-none bg-transparent p-0"
                  >
                    <Image src="/img/play-circle.svg" alt="" width={56} height={56} className="h-[56px] w-[56px]" style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.45))" }} />
                  </button>
                )}
              </div>
              <div className="p-5">
                <p className="font-sora text-[28px] font-semibold leading-none text-white" style={{ letterSpacing: "-0.02em" }}>{c.metric}</p>
                <p className="mt-2 font-inter text-[14px] font-medium leading-snug text-white/85">{c.metricLabel}</p>
                <p className="mt-3 font-inter text-[14px] italic leading-relaxed text-white/70">&ldquo;{c.quote}&rdquo;</p>
                {c.person && (
                  <p className="mt-3 font-inter text-[11px] font-semibold uppercase text-white/70" style={{ letterSpacing: "0.04em" }}>
                    {c.person} <span className="font-normal text-white/45">· {c.role}</span>
                  </p>
                )}
              </div>
            </div>

            {/* ── DESKTOP: full-bleed treated photo with text overlaid ── */}
            <div className="hidden tablet:contents">
              {cover && (
                <Image
                  src={cover}
                  alt={c.name}
                  fill
                  quality={92}
                  className="object-cover"
                  style={{ objectPosition: videoCard ? "center 20%" : "center" }}
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
              {/* Bottom legibility gradient — más fuerte para las foto-still de video */}
              <div
                className="absolute inset-0"
                style={{ background: videoCard
                  ? "linear-gradient(180deg, rgba(0,0,0,0.42) 0%, transparent 26%, rgba(0,0,0,0.45) 58%, rgba(0,0,0,0.92) 100%)"
                  : "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 34%, rgba(0,0,0,0.18) 58%, rgba(0,0,0,0.82) 100%)" }}
              />
              {/* Foto-still con texto a la derecha: oscurece ese lado para que la cita se lea sobre fondos claros */}
              {videoCard && isRight && (
                <div className="absolute inset-0" style={{ background: "linear-gradient(270deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 38%, transparent 62%)" }} />
              )}

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
                  <span className="font-inter text-[16px] font-semibold text-white" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>{c.name}</span>
                </div>
              )}

              {/* Ver video — chip (versión A / no-videoCard) */}
              {c.hasVideo && !videoCard && (
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

              {/* Play centrado (versión B, foto-still) */}
              {videoCard && (
                <button
                  type="button"
                  onClick={() => { setActiveVideo(c); setVideoOpen(true); }}
                  aria-label={`Ver video de ${c.name}`}
                  className="group/play absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center border-none bg-transparent p-0"
                >
                  <Image
                    src="/img/play-circle.svg"
                    alt=""
                    width={76}
                    height={76}
                    className="h-[76px] w-[76px] transition-transform duration-200 group-hover/play:scale-110"
                    style={{ filter: "drop-shadow(0 4px 18px rgba(0,0,0,0.45))" }}
                  />
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

      {/* Paginación — en qué caso vas y cuántos hay (también en móvil, sin flechas) */}
      {cards.length > 1 && (
        <div className="mx-auto mt-4 flex max-w-[var(--max-w)] items-center gap-0.5 px-5 tablet:px-6">
          {cards.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => scrollToCard(i)}
              aria-label={`Ver caso ${c.name}`}
              aria-current={pos.dot === i ? "true" : undefined}
              className="flex h-[24px] cursor-pointer items-center justify-center border-none bg-transparent px-[3px] py-0"
            >
              <span className={`block h-[6px] rounded-full transition-all duration-200 ${pos.dot === i ? "w-[20px] bg-white" : "w-[6px] bg-white/30 hover:bg-white/50"}`} />
            </button>
          ))}
        </div>
      )}

      {/* Video modal */}
      {videoOpen && activeVideo?.hasVideo && activeVideo.videoId && createPortal(
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", animation: "fadeSlideIn 0.2s ease-out" }}
          onClick={() => setVideoOpen(false)}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setVideoOpen(false); }}
            className="absolute right-4 top-4 z-[2] flex tablet:right-6 tablet:top-6 h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border-none bg-white/10 text-white transition-colors hover:bg-white/20"
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
        </div>,
        document.body
      )}
    </section>
  );
}
