"use client";

import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";

/* ── Case studies data ── */
const CASES = [
  {
    id: "sears", name: "Sears", image: "/img/logos/sears.png", coverImage: "/img/caso-1.png", bgColor: "#0A1628",
    metric: "Cobertura", metricLabel: "nacional con entrega el mismo día",
    quote: "T1 como core logístico, con cobertura a nivel nacional y entrega el mismo día.",
    person: "Mario Muñoz", role: "CHIEF DIGITAL OFFICER | SEARS", hasVideo: true, videoId: "KtUy7AhmdlA",
  },
  {
    id: "circulo", name: "Círculo de Crédito", image: "/img/logos/circulo-de-credito.png", coverImage: "/img/caso-circulo.png", bgColor: "#0A0F1A",
    metric: "−40%", metricLabel: "de mora temprana gracias a data alternativa",
    quote: "Con T1score logramos reducir 40% la mora temprana gracias a la data alternativa que integran al modelo.",
    person: "Juan Manuel Ruiz", role: "DIRECTOR GENERAL | CÍRCULO DE CRÉDITO", hasVideo: true, videoId: "MPXrBe7iNgE",
  },
  {
    id: "visa", name: "Visa", image: "/img/logos/visa.png", coverImage: "/img/caso-mercado.png", bgColor: "#0A1A28",
    metric: "+1M", metricLabel: "transacciones procesadas con T1",
    quote: "T1 nos permitió ofrecer una experiencia de pagos confiable y rápida para nuestros tarjetahabientes en México.",
    person: "Juan Hernández", role: "PARTNERSHIPS LEAD | VISA MX", hasVideo: false,
  },
  {
    id: "telcel", name: "Telcel", image: "/img/logos/telcel.png", coverImage: "/img/caso-telcel.png", bgColor: "#0A1020",
    metric: "+40M", metricLabel: "de envíos gestionados a través de T1",
    quote: "La integración multipaquetería de T1 nos permitió reducir costos logísticos en un 30%.",
    person: "Ana Ramírez", role: "VP SUPPLY CHAIN | TELCEL", hasVideo: false,
  },
  {
    id: "pirma", name: "Pirma", image: "/img/logos/pirma.png", coverImage: "/img/caso-pirma.png", bgColor: "#0D1A18",
    metric: "45%", metricLabel: "reducción en tiempo de entrega promedio",
    quote: "T1envíos nos dio acceso a las mejores paqueterías con tarifas que no podíamos negociar solos.",
    person: "Fernando Díaz", role: "HEAD OF LOGISTICS | PIRMA", hasVideo: false,
  },
  {
    id: "makora", name: "Makora", image: "/img/logos/makora.svg", coverImage: "/img/caso-makora.png", bgColor: "#1A1408",
    metric: "+ Conversión", metricLabel: "y centralización de operación",
    quote: "T1 nos ayudó a aumentar la conversión y centralizar toda nuestra operación en una sola plataforma.",
    person: "Marín Ramos", role: "FUNDADOR Y DIRECTOR GENERAL | MAKORA", hasVideo: true, videoId: "7l0BDngMRUk",
  },
  {
    id: "pase", name: "PASE", image: "/img/logos/pase.png", coverImage: "/img/caso-pase.png", bgColor: "#0F1015",
    metric: "<0.5 s", metricLabel: "tiempo de respuesta · 98% aprobación · +2 mil entregas de tags al mes",
    quote: "Con T1 procesamos en menos de 0.5 segundos con 98% de aprobación y entregamos más de 2 mil tags al mes.",
    person: "Alexis Reséndiz Meza", role: "DIRECTOR GENERAL | PASE", hasVideo: true, videoId: "ezeCCveM8y4",
  },
  {
    id: "claro", name: "Claro", image: "/img/logos/claro.png", coverImage: "/img/caso-claro.png", bgColor: "#1A0510",
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
      className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-black/40 transition-all duration-150 hover:border-black/20 hover:text-black"
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

export default function T1Enterprise() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const current = CASES[active];

  // Scroll mobile gallery — scroll to active card position
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const container = mobileScrollRef.current;
    if (!container) return;
    // Each card is 80vw + 12px gap
    const cardWidth = window.innerWidth * 0.80;
    const gap = 12;
    const targetLeft = active * (cardWidth + gap);
    container.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  }, [active]);

  // Sync active state when user manually scrolls on mobile
  useEffect(() => {
    const container = mobileScrollRef.current;
    if (!container) return;
    let timeout: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const cardWidth = window.innerWidth * 0.80 + 12;
        const idx = Math.round(container.scrollLeft / cardWidth);
        setActive(Math.min(idx, CASES.length - 1));
      }, 100);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => { container.removeEventListener("scroll", onScroll); clearTimeout(timeout); };
  }, []);

  const prev = useCallback(() => {
    setActive((a) => (a === 0 ? CASES.length - 1 : a - 1));
  }, []);

  const next = useCallback(() => {
    setActive((a) => (a === CASES.length - 1 ? 0 : a + 1));
  }, []);

  return (
    <section className="bg-[#F6F6F6]" style={{ paddingTop: 60, paddingBottom: 280 }}>
      <div className="mx-auto max-w-[var(--max-w)] px-5 tablet:px-6">
        {/* Header row */}
        <div className="flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between" style={{ marginBottom: 24 }}>
          <div>
            <h2
              className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]"
              style={{ letterSpacing: "-0.03em", lineHeight: "1.2em" }}
            >
              Casos de éxito
            </h2>
            <p
              className="font-inter text-[16px] font-light text-black/50 tablet:text-[20px] lg:text-[25px]"
              style={{ lineHeight: 1.5 }}
            >
              Conoce cómo nuestros clientes crecen con T1.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ArrowBtn direction="left" onClick={prev} />
            <ArrowBtn direction="right" onClick={next} />
          </div>
        </div>

        {/*
          Gallery — On mobile: horizontal scroll. On desktop: flex with transition on flex-grow.
        */}
        {/* Mobile gallery: horizontal scroll */}
        {/* Mobile gallery — full-width cards, scroll-snap, peek next card */}
        <div
          ref={mobileScrollRef}
          className="flex gap-3 overflow-x-auto tablet:hidden"
          style={{ height: 260, marginBottom: 24, scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
        >
          {CASES.map((c, i) => (
            <div
              key={c.id}
              className="relative shrink-0 cursor-pointer overflow-hidden rounded-[14px]"
              style={{
                width: "80vw",
                height: 260,
                background: c.bgColor,
                scrollSnapAlign: "start",
              }}
              onClick={() => setActive(i)}
            >
              {c.coverImage && (
                <Image src={c.coverImage} alt={c.name} fill className="object-cover" sizes="80vw" />
              )}
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                <div className="flex h-[28px] w-[28px] items-center justify-center rounded-[6px] bg-white/10 backdrop-blur-sm">
                  <Image src={c.image} alt={c.name} width={20} height={20} className="object-contain brightness-0 invert" />
                </div>
                <span className="whitespace-nowrap font-inter text-[13px] font-semibold text-white/90">{c.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile-only: info row below the gallery (metric, quote, person) + Ver video button */}
        <div className="flex flex-col gap-4 tablet:hidden" style={{ marginBottom: 24 }}>
          <div key={`mobile-info-${current.id}`} style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
            <p className="font-inter text-[22px] font-bold leading-tight text-black">
              {current.metric}{" "}
              <span className="text-[14px] font-normal text-black/70">{current.metricLabel}</span>
            </p>
            <p className="mt-2 font-inter text-[14px] italic leading-relaxed text-black/55">
              &ldquo;{current.quote}&rdquo;
            </p>
            <p className="mt-2 font-inter text-[12px] font-medium text-black/70">
              {current.person} <span className="text-black/40">· {current.role}</span>
            </p>
          </div>
          {current.hasVideo && (
            <button
              onClick={() => setVideoOpen(true)}
              className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-black/15 bg-white px-5 py-2.5 font-inter text-[13px] font-medium text-black transition-all duration-150 hover:border-black/30"
            >
              Ver video
              <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#DB3B2B]">
                <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
                  <path d="M1 1L7 5L1 9V1Z" fill="white" />
                </svg>
              </span>
            </button>
          )}
        </div>

        {/* Desktop gallery — active card has metric, quote, author embedded. */}
        <div
          className="hidden gap-2 overflow-hidden tablet:flex"
          style={{ height: 520, marginBottom: 24 }}
        >
          {CASES.map((c, i) => {
            const isActive = i === active;
            const isHovered = i === hovered && !isActive;

            /* Determine flex value */
            let flex = 1;
            if (isActive) flex = 10;
            else if (isHovered) flex = 3;

            return (
              <div
                key={c.id}
                className="relative cursor-pointer overflow-hidden rounded-[16px]"
                style={{
                  flex,
                  minWidth: 0,
                  height: 520,
                  background: c.bgColor,
                  transition: "flex 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onClick={() => setActive(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Cover image */}
                {c.coverImage && (
                  <Image
                    src={c.coverImage}
                    alt={c.name}
                    fill
                    className="object-cover"
                  />
                )}

                {/* Dark overlay — stronger bottom gradient on active to read text */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: isActive
                      ? `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.85) 100%)`
                      : isHovered
                        ? `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)`
                        : `linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.75) 100%)`,
                  }}
                />

                {/* (Top-left brand logo removed per design — info lives at the bottom) */}

                {/* Ver video button — top-right floating, active only */}
                {isActive && c.hasVideo && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setVideoOpen(true); }}
                    className="absolute right-6 top-6 z-10 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 font-inter text-[13px] font-medium text-black transition-all duration-150 hover:bg-white"
                    style={{ animation: "fadeSlideIn 0.4s ease-out", boxShadow: "0 4px 14px rgba(0,0,0,0.18)" }}
                  >
                    Ver video
                    <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#DB3B2B]">
                      <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
                        <path d="M1 1L7 5L1 9V1Z" fill="white" />
                      </svg>
                    </span>
                  </button>
                )}

                {/* Bottom info — metric, quote, author — active only */}
                {isActive && (
                  <div
                    key={`info-${c.id}`}
                    className="absolute bottom-0 left-0 right-0 z-10 px-7 pb-7"
                    style={{ animation: "fadeSlideIn 0.5s ease-out" }}
                  >
                    {/* Metric — uppercase title */}
                    <p className="font-inter text-[16px] font-bold uppercase leading-tight text-white tablet:text-[18px] lg:text-[20px]" style={{ letterSpacing: "0.02em", marginBottom: 12 }}>
                      {c.metric} {c.metricLabel}
                    </p>
                    {/* Quote */}
                    <p className="font-inter text-[14px] italic leading-relaxed text-white/85 tablet:text-[15px]" style={{ marginBottom: 10 }}>
                      &ldquo;{c.quote}&rdquo;
                    </p>
                    {/* Author */}
                    <p className="font-inter text-[11px] font-semibold uppercase text-white/70 tablet:text-[12px]" style={{ letterSpacing: "0.05em" }}>
                      {c.person} <span className="text-white/45">· {c.role}</span>
                    </p>
                  </div>
                )}

                {/* Small logo + name — visible on hover only (not active) */}
                <div
                  className="absolute bottom-5 left-5 z-10 flex items-center gap-2.5 transition-opacity duration-300"
                  style={{ opacity: isHovered ? 1 : 0 }}
                >
                  <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-white/10 backdrop-blur-sm">
                    <Image
                      src={c.image}
                      alt={c.name}
                      width={24}
                      height={24}
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                  <span className="whitespace-nowrap font-inter text-[14px] font-semibold text-white/90">
                    {c.name}
                  </span>
                </div>

                {/* Tiny centered logo for collapsed cards */}
                <div
                  className="absolute inset-0 flex items-end justify-center pb-5 transition-opacity duration-300"
                  style={{ opacity: !isActive && !isHovered ? 0.5 : 0 }}
                >
                  <div className="flex h-[24px] w-[24px] items-center justify-center overflow-hidden rounded-[6px] bg-white/10">
                    <Image
                      src={c.image}
                      alt={c.name}
                      width={18}
                      height={18}
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                </div>

                {/* Hover brighten */}
                {!isActive && (
                  <div
                    className="absolute inset-0 transition-all duration-200"
                    style={{ background: isHovered ? "rgba(255,255,255,0.04)" : "transparent" }}
                  />
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Video modal */}
      {videoOpen && current.hasVideo && current.videoId && (
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
              src={`https://www.youtube.com/embed/${current.videoId}?autoplay=1`}
              title={`Caso de éxito: ${current.name}`}
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
