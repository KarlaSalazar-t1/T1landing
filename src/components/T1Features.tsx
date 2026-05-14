"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  FEATURES_HEADING,
  FEATURES_SUBTITLE,
  FEATURE_CARDS,
} from "@/lib/constants";
import ProductCard from "@/components/showcase/ProductCard";
import GlassProductCard from "@/components/showcase/GlassProductCard";
import GlassCreditCard from "@/components/showcase/GlassCreditCard";
import PedidosPanel from "@/components/showcase/PedidosPanel";
import EnviosPanel from "@/components/showcase/EnviosPanel";
import GlassShipmentCard from "@/components/showcase/GlassShipmentCard";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useCountUp } from "@/hooks/useCountUp";
import T1FinalCTA from "@/components/T1FinalCTA";

/* ── Marketplace icons for modal ── */
const MODAL_MARKETPLACES = [
  { name: "MercadoLibre", src: "/img/meli-iso.svg" },
  { name: "Amazon", src: "/img/amazon-iso.svg" },
  { name: "Sears", src: "/img/sears-isotipo.svg" },
  { name: "SHEIN", src: "/img/shein-iso.svg" },
  { name: "Walmart", src: "/img/walmart.svg" },
  { name: "Shopify", src: "/img/shein-iso.svg" },
  { name: "Liverpool", src: "/img/sears-isotipo.svg" },
];

/* ── Store carousel items ── */
const STORE_CAROUSEL = [
  { name: "Sportify", image: "/img/tienda-1.png", url: "#" },
  { name: "Casa & Hogar", image: "/img/tienda-2.png", url: "#" },
  { name: "TechZone", image: "/img/tienda-3.png", url: "#" },
  { name: "Orgánica MX", image: "/img/tienda-4.png", url: "#" },
  { name: "Sportify", image: "/img/tienda-1.png", url: "#" },
  { name: "Casa & Hogar", image: "/img/tienda-2.png", url: "#" },
  { name: "TechZone", image: "/img/tienda-3.png", url: "#" },
  { name: "Orgánica MX", image: "/img/tienda-4.png", url: "#" },
];

/* ── Animated prompt phrases + matching page images + section bg + gradient color ── */
const PROMPT_PAGES = [
  { text: "Quiero vender muebles de la más alta calidad.", image: "/img/muebles-v2.png", bg: "/img/fondo-modal-1.png", gradientColor: "#978478" },
  { text: "Necesito una tienda de ropa deportiva.", image: "/img/ropa-deportiva.png", bg: "/img/fondo-modal-2.png", gradientColor: "#7FA1B6" },
  { text: "Vendo accesorios tech y gadgets.", image: "/img/tech.png", bg: "/img/fondo-modal-3.png", gradientColor: "#7FA1B6" },
  { text: "Mi negocio es de productos orgánicos.", image: "/img/organico-v2.png", bg: "/img/fondo-modal-4.png", gradientColor: "#998E67" },
];

/* ── Stat with count-up animation, used in Tienda landing ── */
function CountStat({ end, prefix = "", suffix = "", label, decimals = 0 }: { end: number; prefix?: string; suffix?: string; label: string; decimals?: number }) {
  const { ref, display } = useCountUp({ end, prefix, suffix, decimals, duration: 1800 });
  return (
    <div ref={ref}>
      <p className="font-sora text-[36px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1 }}>
        {display}
      </p>
      <p className="font-inter text-[12px] font-light text-white/55 tablet:text-[13px]">{label}</p>
    </div>
  );
}

/* ── Product modal — matching Figma design ── */
export function ProductModal({ cardId, onClose, pageMode = false }: { cardId: string; onClose: () => void; pageMode?: boolean }) {
  const titles: Record<string, string> = {
    t1tienda: "T1tienda",
    t1pagos: "T1pagos",
    t1envios: "T1envíos",
  };
  const title = titles[cardId] || cardId;
  const scrollRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [pageIdx, setPageIdx] = useState(0);
  const [visiblePageIdx, setVisiblePageIdx] = useState(0); // only changes after typing done
  const [displayedText, setDisplayedText] = useState("");
  const [scrollY, setScrollY] = useState(0);

  // Lock body scroll — only in modal mode
  useEffect(() => {
    if (pageMode) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [pageMode]);

  // ── Carousel 3D coverflow — center cards larger, sides smaller (pageMode only) ──
  useEffect(() => {
    if (!pageMode) return;
    const wrap = carouselRef.current;
    if (!wrap) return;

    // Respect reduced motion
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let rafId = 0;
    let visible = true;
    const hovered = new Set<HTMLElement>();

    const ioVisibility = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 }
    );
    ioVisibility.observe(wrap);

    // Track hover so we don't fight the CSS hover transform
    const cards = Array.from(wrap.querySelectorAll<HTMLElement>(".store-carousel > a"));
    const enterHandlers = new Map<HTMLElement, () => void>();
    const leaveHandlers = new Map<HTMLElement, () => void>();
    cards.forEach((card) => {
      const enter = () => {
        hovered.add(card);
        // Clear inline transform/opacity so CSS :hover rule applies
        card.style.removeProperty("transform");
        card.style.removeProperty("opacity");
      };
      const leave = () => hovered.delete(card);
      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
      enterHandlers.set(card, enter);
      leaveHandlers.set(card, leave);
    });

    function tick() {
      if (visible && wrap) {
        const rect = wrap.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const half = rect.width / 2 || 1;
        cards.forEach((card) => {
          // Skip hovered cards — let CSS hover own the transform
          if (hovered.has(card)) return;
          const cr = card.getBoundingClientRect();
          const cardCenter = cr.left + cr.width / 2;
          const dist = (cardCenter - center) / half; // -1 .. 1 across the carousel
          const clamped = Math.max(-1, Math.min(1, dist));
          const scale = 1 - Math.abs(clamped) * 0.22;
          const rotateY = clamped * -14;
          const tz = -Math.abs(clamped) * 60;
          const opacity = 1 - Math.abs(clamped) * 0.35;
          card.style.transform = `perspective(1100px) translateZ(${tz}px) rotateY(${rotateY}deg) scale(${scale})`;
          card.style.opacity = String(opacity);
        });
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      ioVisibility.disconnect();
      cards.forEach((card) => {
        const e = enterHandlers.get(card);
        const l = leaveHandlers.get(card);
        if (e) card.removeEventListener("mouseenter", e);
        if (l) card.removeEventListener("mouseleave", l);
      });
    };
  }, [pageMode]);

  // Scroll-triggered animations — modal uses inner scroll container; pageMode uses viewport
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("modal-visible");
          }
        });
      },
      { root: pageMode ? null : container, threshold: 0.15, rootMargin: pageMode ? "0px 0px -10% 0px" : "0px" }
    );
    const elements = container.querySelectorAll("[data-modal-animate]");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pageMode]);

  // Typewriter effect — types in, pauses, changes page image, scrolls, erases, next
  useEffect(() => {
    const fullText = PROMPT_PAGES[pageIdx].text;
    let charIdx = 0;
    let erasing = false;
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      if (!erasing) {
        charIdx++;
        setDisplayedText(fullText.slice(0, charIdx));
        if (charIdx >= fullText.length) {
          // Done typing — change the page image NOW
          timeout = setTimeout(() => {
            setVisiblePageIdx(pageIdx);
            // Scroll animation on new page
            setScrollY(80);
            timeout = setTimeout(() => {
              setScrollY(0);
              // Start erasing
              timeout = setTimeout(() => {
                erasing = true;
                tick();
              }, 800);
            }, 1200);
          }, 800);
          return;
        }
        timeout = setTimeout(tick, 40 + Math.random() * 30);
      } else {
        charIdx--;
        setDisplayedText(fullText.slice(0, charIdx));
        if (charIdx <= 0) {
          setPageIdx((p) => (p + 1) % PROMPT_PAGES.length);
          return;
        }
        timeout = setTimeout(tick, 20);
      }
    }

    timeout = setTimeout(tick, 500);
    return () => clearTimeout(timeout);
  }, [pageIdx]);

  return (
    <div
      className={pageMode ? "w-full" : "fixed inset-0 z-[300] flex items-center justify-center"}
      onClick={pageMode ? undefined : onClose}
    >
      {!pageMode && (
        <div className="absolute inset-0">
          <Image src="/img/bg-modal-v3.png" alt="" fill className="object-cover" />
        </div>
      )}

      {/* Modal container — flush to bottom; in pageMode, just full width */}
      <div
        className={pageMode ? "w-full" : "absolute bottom-0 left-1/2 overflow-hidden"}
        style={pageMode ? {} : {
          width: 1220,
          maxWidth: "95vw",
          maxHeight: "92vh",
          transform: "translateX(-50%)",
          borderRadius: "15px 15px 0 0",
          boxShadow: "0 -10px 80px rgba(0,0,0,0.4)",
          animation: "modalSlideUp 0.4s ease-out",
        }}
        onClick={pageMode ? undefined : (e) => e.stopPropagation()}
      >
        {/* Scrollable content — pageMode uses natural page scroll */}
        <div
          ref={scrollRef}
          className={pageMode ? "w-full" : "modal-scroll-container overflow-y-auto"}
          style={pageMode ? {} : { maxHeight: "92vh" }}
        >
          <div className={`relative ${pageMode ? "bg-black" : "bg-white"}`}>

            {/* ── Section 1: Crea tu tienda con IA — bg changes per prompt ── */}
            {/* Background covers header + section 1 together */}
            <div className={`relative overflow-hidden ${pageMode ? "bg-black pb-24" : "pb-8"}`}>
              {/* Per-prompt background image — changes only after typing completes */}
              <div className="absolute inset-0 z-0">
                <Image
                  key={PROMPT_PAGES[visiblePageIdx].bg}
                  src={PROMPT_PAGES[visiblePageIdx].bg}
                  alt=""
                  fill
                  className="object-cover"
                  style={{ animation: "fadeSlideIn 0.6s ease-out" }}
                />
                {/* Gradient overlay: color → transparent for blending */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, ${PROMPT_PAGES[visiblePageIdx].gradientColor} 0%, ${PROMPT_PAGES[visiblePageIdx].gradientColor}cc 20%, transparent 55%)`,
                    transition: "background 0.6s ease-out",
                  }}
                />
                {/* Bottom black gradient — fuses hero with the black "Inspírate" carousel section (pageMode only) */}
                {pageMode && (
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0"
                    style={{
                      height: "55%",
                      background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.85) 80%, #000 100%)",
                    }}
                  />
                )}
              </div>
              <div className={pageMode ? "relative z-10 mx-auto max-w-[var(--max-w)] px-5 tablet:px-3" : "relative z-10 px-5 tablet:px-10"}>
              {/* Header — only in modal mode (page mode uses navbar instead) */}
              {!pageMode && (
                <div className="flex items-center justify-between pt-10 pb-4">
                  <h2 className="font-sora text-[32px] font-normal text-white">{title}</h2>
                  <button
                    onClick={onClose}
                    className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border-none bg-white/[0.15] text-white/80 transition-colors duration-150 hover:bg-white/[0.25] hover:text-white"
                  >
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              )}
              {pageMode ? (
                /* ── pageMode: 2-column hero (text left, preview right) ── */
                <div
                  className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] tablet:gap-12"
                  style={{ paddingTop: 100, paddingBottom: 24 }}
                >
                  {/* Left: title + description + CTA */}
                  <div>
                    <h1
                      className="font-sora text-[32px] font-normal text-white tablet:text-[48px]"
                      style={{ lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 18 }}
                    >
                      Crea tu tienda con IA en segundos
                    </h1>
                    <p
                      className="font-inter text-[17px] font-light text-white/80 tablet:text-[19px]"
                      style={{ lineHeight: 1.55, marginBottom: 28, maxWidth: 480 }}
                    >
                      Cuéntanos de qué trata tu negocio y nuestra IA creará tu tienda online lista para vender en menos de 2 minutos.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href="#"
                        className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]"
                      >
                        Crear mi tienda
                      </a>
                      <span className="font-inter text-[13px] text-white/55">Sin tarjeta · Empieza gratis</span>
                    </div>
                  </div>

                  {/* Right: store preview with floating prompt */}
                  <div className="relative">
                    <div
                      className="rounded-[18px]"
                      style={{
                        padding: 10,
                        background: "rgba(255,255,255,0.25)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.35)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                      }}
                    >
                      <div className="overflow-hidden rounded-[12px]" style={{ aspectRatio: "16/10" }}>
                        <div
                          className="transition-transform duration-1000 ease-in-out"
                          style={{ transform: `translateY(-${scrollY}px)` }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            key={PROMPT_PAGES[visiblePageIdx].image}
                            src={PROMPT_PAGES[visiblePageIdx].image}
                            alt="Vista previa tienda"
                            className="block w-full"
                            style={{ animation: "fadeSlideIn 0.5s ease-out" }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Floating AI prompt card — bottom-left of preview, desktop only */}
                    <div
                      className="absolute hidden rounded-[16px] bg-white tablet:block"
                      style={{
                        left: -32,
                        bottom: -24,
                        width: 320,
                        padding: "18px 20px",
                        boxShadow: "0 12px 36px rgba(0,0,0,0.18)",
                      }}
                    >
                      <p className="font-inter text-[14px] font-normal text-black/80" style={{ minHeight: 44 }}>
                        {displayedText}
                        <span
                          className="ml-0.5 inline-block w-[2px] bg-black/60"
                          style={{ height: 16, verticalAlign: "text-bottom", animation: "blink 0.8s step-end infinite" }}
                        />
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-inter text-[11px] text-black/30">{displayedText.length}/500</span>
                        <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#E26153]">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                            <path d="M7 11V3M7 3L4 6M7 3L10 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-4 tablet:flex-row tablet:items-start tablet:justify-between tablet:gap-6" style={{ marginBottom: 28, paddingTop: 0 }}>
                    <div>
                      <h3 className="font-sora text-[22px] font-normal text-white tablet:text-[28px]" style={{ marginBottom: 8 }}>
                        Crea tu tienda con IA en segundos
                      </h3>
                      <p className="font-inter text-[17px] font-normal text-white/80" style={{ lineHeight: 1.6 }}>
                        Cuéntanos de que trata tu negocio y nuestra IA creará tu tienda en menos de 2 minutos.
                      </p>
                    </div>
                    <a
                      href="#"
                      className="inline-flex shrink-0 items-center rounded-[14px] bg-[#DB3B2B] px-6 py-3 font-inter text-[14px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]"
                    >
                      Crear mi tienda
                    </a>
                  </div>

                  {/* Store preview with floating prompt */}
                  <div className="relative mx-auto" style={{ maxWidth: 850 }}>
                    <div
                      className="mx-auto rounded-[18px]"
                      style={{
                        maxWidth: 850,
                        padding: 10,
                        background: "rgba(255,255,255,0.25)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.35)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                      }}
                    >
                      <div className="overflow-hidden rounded-[12px]" style={{ aspectRatio: "16/10" }}>
                        <div
                          className="transition-transform duration-1000 ease-in-out"
                          style={{ transform: `translateY(-${scrollY}px)` }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            key={PROMPT_PAGES[visiblePageIdx].image}
                            src={PROMPT_PAGES[visiblePageIdx].image}
                            alt="Vista previa tienda"
                            className="block w-full"
                            style={{ animation: "fadeSlideIn 0.5s ease-out" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className="absolute hidden rounded-[16px] bg-white tablet:block"
                      style={{ left: -20, top: 30, width: 380, padding: "20px 24px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
                    >
                      <p className="font-inter text-[15px] font-normal text-black/80" style={{ minHeight: 44 }}>
                        {displayedText}
                        <span
                          className="ml-0.5 inline-block w-[2px] bg-black/60"
                          style={{ height: 16, verticalAlign: "text-bottom", animation: "blink 0.8s step-end infinite" }}
                        />
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-inter text-[12px] text-black/30">{displayedText.length}/500</span>
                        <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#E26153]">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 11V3M7 3L4 6M7 3L10 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              </div>{/* close z-10 wrapper */}
            </div>

            {/* ── Section 2: Inspírate — carousel ── */}
            {/* In pageMode: black bg fuses with the hero's bottom black gradient. data-white-card stays so navbar still goes light when next white section enters. */}
            <div className={`${pageMode ? "bg-black pt-4 pb-16 tablet:pt-6 tablet:pb-20" : "py-12"}`} data-modal-animate>
              <h3
                className={`font-sora text-[22px] font-light text-center px-5 tablet:text-[28px] tablet:px-10 ${pageMode ? "text-white" : "text-black"}`}
                style={{ marginBottom: 32, letterSpacing: "-0.02em" }}
              >
                Inspírate con algunas tiendas creadas con T1
              </h3>

              {/* Carousel — overflow visible so hover scale isn't clipped */}
              <div ref={carouselRef} className={`relative ${pageMode ? "carousel-3d" : ""}`} style={{ overflow: "clip" }}>
                <div className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-20 ${pageMode ? "bg-gradient-to-r from-black to-transparent" : "bg-gradient-to-r from-white/80 to-transparent"}`} />
                <div className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-20 ${pageMode ? "bg-gradient-to-l from-black to-transparent" : "bg-gradient-to-l from-white/80 to-transparent"}`} />
                <div
                  className="store-carousel flex items-center gap-5"
                  style={{ padding: "20px 40px" }}
                >
                  {STORE_CAROUSEL.map((store, i) => (
                    <a
                      key={`${store.name}-${i}`}
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="store-card relative shrink-0 rounded-[16px] no-underline transition-all duration-300 hover:scale-[1.06] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)]"
                      style={{ width: 240, height: 280, overflow: "hidden" }}
                    >
                      <Image
                        src={store.image}
                        alt={store.name}
                        fill
                        className="store-card-img object-cover transition-all duration-300"
                      />
                      {/* Hover overlay */}
                      <div
                        className="store-card-overlay absolute inset-0 z-[2] flex flex-col items-center justify-center"
                        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)", opacity: 0, transition: "opacity 0.3s ease" }}
                      >
                        <p className="font-sora text-[22px] font-normal text-white" style={{ letterSpacing: "-0.01em" }}>{store.name}</p>
                        <p className="mt-1 font-inter text-[13px] text-white/85">Visitar tienda →</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── pageMode-only storytelling sections ── */}
            {pageMode && (
              <>
                {/* ── Act II — Conflict: "Antes" (subdued, sets the tension) ── */}
                {/* data-white-card: triggers navbar light mode when this section reaches the top */}
                <section className="relative bg-[#F6F6F6] px-5 py-24 tablet:px-10 tablet:py-32" data-white-card data-tienda-act-2>
                  <div className="mx-auto max-w-[var(--max-w)]">
                    <div data-modal-animate className="mx-auto text-center" style={{ marginBottom: 48 }}>
                      <h2 className="font-sora text-[26px] font-light text-black tablet:text-[34px] lg:text-[40px] whitespace-nowrap" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>
                        Antes, lanzar una tienda tomaba meses.
                      </h2>
                    </div>

                    <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
                      {[
                        { title: "Semanas de espera", desc: "Cotizaciones, ida y vuelta con agencias, prototipos que no convencían." },
                        { title: "Costos opacos", desc: "Diseño, hosting, plugins, integraciones. La cuenta nunca paraba de subir." },
                        { title: "Resultados inciertos", desc: "Lanzar y rezar. Sin métricas claras, sin SEO, sin saber si convertiría." },
                      ].map((p, i) => (
                        <div
                          key={p.title}
                          data-stagger
                          className="rounded-[18px] border border-black/[0.06] bg-white p-7 transition-shadow duration-200 hover:shadow-[0_0_25px_2px_rgba(0,0,0,0.04)]"
                          style={{ ["--i" as string]: i }}
                        >
                          <h3 className="font-sora text-[18px] font-normal text-black/70" style={{ marginBottom: 6 }}>{p.title}</h3>
                          <p className="font-inter text-[14px] font-light text-black/50" style={{ lineHeight: 1.6 }}>{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* ── Act III — The shift: Magic moment with live AI demo ── */}
                <section className="relative overflow-hidden bg-white px-5 py-24 tablet:px-10 tablet:py-32">
                  <div className="relative mx-auto max-w-[var(--max-w)]">
                    {/* Headline */}
                    <div data-modal-animate className="mx-auto max-w-[820px] text-center" style={{ marginBottom: 64 }}>
                      <h2 className="font-sora text-[32px] font-light text-black tablet:text-[44px] lg:text-[56px]" style={{ letterSpacing: "-1.5px", lineHeight: 1.05, marginBottom: 20 }}>
                        Hoy basta una <span className="relative inline-block">
                          frase
                          <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 8, background: "rgba(219,59,43,0.18)", borderRadius: 4, zIndex: -1 }} />
                        </span>.
                      </h2>
                      <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[19px]" style={{ lineHeight: 1.5, maxWidth: 620, margin: "0 auto" }}>
                        Le dices a la IA qué vendes y arma una tienda hecha para ti. Estructura, copy, secciones y diseño coherentes con tu marca.
                      </p>
                    </div>

                    {/* Live AI prompt input — like t1.com/mx/tienda */}
                    <div data-modal-animate className="mx-auto" style={{ maxWidth: 720 }}>
                      <div className="relative rounded-[20px] border border-black/[0.08] bg-white" style={{ boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
                        {/* Sparkle decoration on the left */}
                        <div className="pointer-events-none absolute left-5 top-5 hidden tablet:flex h-[28px] w-[28px] items-center justify-center rounded-full" style={{ background: "rgba(219,59,43,0.10)" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M12 3L14 9L20 11L14 13L12 19L10 13L4 11L10 9L12 3Z" stroke="#DB3B2B" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(219,59,43,0.18)" />
                          </svg>
                        </div>
                        {/* Live-typed prompt area */}
                        <div className="px-6 pt-6 tablet:pl-16 tablet:pr-7 tablet:pt-7" style={{ minHeight: 120 }}>
                          <p className="font-inter text-[16px] text-black/85 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
                            {displayedText || (
                              <span className="text-black/35">Cuéntanos de qué trata tu negocio…</span>
                            )}
                            <span
                              className="ml-0.5 inline-block w-[2px] bg-[#DB3B2B] align-text-bottom"
                              style={{ height: 18, animation: "blink 0.8s step-end infinite" }}
                            />
                          </p>
                        </div>
                        {/* Bottom row — char counter + submit */}
                        <div className="flex items-center justify-between px-6 pb-5 pt-4 tablet:pl-16 tablet:pr-5">
                          <span className="font-inter text-[12px] text-black/35">{(displayedText || "").length}/500</span>
                          <a
                            href="#"
                            className="inline-flex h-[44px] items-center gap-2 rounded-full bg-[#DB3B2B] px-5 font-inter text-[14px] font-semibold text-white no-underline transition-all duration-200 hover:scale-[1.03] hover:bg-[#C0332A]"
                          >
                            Crear con IA
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </a>
                        </div>
                      </div>

                      {/* Quick prompt chips */}
                      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                        <span className="font-inter text-[12px] text-black/45" style={{ marginRight: 4 }}>Prueba con:</span>
                        {PROMPT_PAGES.map((p) => (
                          <button
                            key={p.text}
                            type="button"
                            className="rounded-full border border-black/[0.08] bg-white px-3 py-1.5 font-inter text-[12px] text-black/65 transition-all duration-150 hover:border-[#DB3B2B]/40 hover:bg-[rgba(219,59,43,0.04)] hover:text-[#DB3B2B]"
                          >
                            {p.text.replace(/\.$/, "")}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* ── Cómo funciona — 4 steps with connector line ── */}
                <section className="relative bg-[#F6F6F6] px-5 py-24 tablet:px-10 tablet:py-32">
                  <div className="mx-auto max-w-[var(--max-w)]">
                    <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
                      <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
                        Tu tienda lista en 4 pasos
                      </h2>
                      <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
                        Sin código, sin diseñadores, sin esperar semanas.
                      </p>
                    </div>

                    <div data-modal-animate className="relative grid grid-cols-1 gap-5 tablet:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                      {/* Connector line — desktop only */}
                      <div aria-hidden className="pointer-events-none absolute hidden lg:block" style={{ left: "12.5%", right: "12.5%", top: 30, height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(219,59,43,0.25) 12%, rgba(219,59,43,0.25) 88%, transparent 100%)" }} />

                      {[
                        { n: "01", title: "Describe tu negocio", desc: "Cuéntale a la IA qué vendes, a quién y con qué tono. Una frase basta." },
                        { n: "02", title: "La IA crea tu tienda", desc: "Genera estructura, secciones, copy y diseño coherente con tu marca." },
                        { n: "03", title: "Personaliza al detalle", desc: "Ajusta colores, tipografías, productos y secciones con un editor visual." },
                        { n: "04", title: "Publica y vende", desc: "Conecta dominio y pasarela. Empieza a recibir pedidos el mismo día." },
                      ].map((s, i) => (
                        <div
                          key={s.n}
                          data-stagger
                          className="tienda-card relative rounded-[18px] border border-black/[0.06] bg-white p-7"
                          style={{ ["--i" as string]: i }}
                        >
                          {/* Step dot above the card on desktop, connecting to the line */}
                          <span aria-hidden className="step-dot absolute hidden h-[10px] w-[10px] rounded-full bg-[#DB3B2B] lg:block" style={{ left: 28, top: 25, boxShadow: "0 0 0 6px rgba(219,59,43,0.12)" }} />
                          <span className="font-sora text-[40px] font-light text-[#DB3B2B]" style={{ display: "block", marginTop: 28, marginBottom: 12, letterSpacing: "-0.04em", lineHeight: 1 }}>
                            {s.n}
                          </span>
                          <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 6 }}>{s.title}</h3>
                          <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{s.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* ── Lo que incluye — 3-col grid with compact visuals (no bento) ── */}
                <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32">
                  <div className="mx-auto max-w-[var(--max-w)]">
                    <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
                      <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
                        Todo incluido desde el día uno
                      </h2>
                      <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
                        Tu tienda nace con todo lo necesario para vender, optimizar y crecer.
                      </p>
                    </div>

                    {/* 3-col uniform grid — each card has a compact visual at top */}
                    <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                      {/* 1. Diseño responsive */}
                      <div data-stagger style={{ ["--i" as string]: 0 }} className="tienda-card flex flex-col overflow-hidden rounded-[18px] border border-black/[0.06] bg-white p-6">
                        <div className="relative mb-5 flex h-[110px] items-center justify-center overflow-hidden rounded-[10px]">
                          {/* desktop frame */}
                          <div className="absolute left-1/2 top-1/2 -translate-x-[calc(50%+22px)] -translate-y-1/2 rounded-[6px] border border-black/[0.08] bg-white" style={{ width: 110, height: 70 }}>
                            <div className="flex items-center gap-[3px] border-b border-black/[0.05] px-1.5 py-1">
                              <span className="h-[3px] w-[3px] rounded-full bg-[#FF5F57]" />
                              <span className="h-[3px] w-[3px] rounded-full bg-[#FEBC2E]" />
                              <span className="h-[3px] w-[3px] rounded-full bg-[#28C840]" />
                            </div>
                            <div className="flex flex-col gap-1 px-1.5 py-1.5">
                              <div className="h-[3px] w-3/4 rounded-full bg-black/15" />
                              <div className="h-[3px] w-1/2 rounded-full bg-black/10" />
                              <div className="mt-0.5 h-[14px] w-full rounded-[2px] bg-[rgba(219,59,43,0.18)]" />
                            </div>
                          </div>
                          {/* phone frame */}
                          <div className="absolute left-1/2 top-1/2 translate-x-[calc(50%-2px)] -translate-y-1/2 rounded-[8px] border-2 border-white bg-white" style={{ width: 38, height: 70, boxShadow: "0 4px 12px rgba(0,0,0,0.10)" }}>
                            <div className="flex h-full flex-col items-center justify-center gap-1 px-1.5">
                              <div className="h-[2px] w-3/4 rounded-full bg-black/15" />
                              <div className="h-[2px] w-1/2 rounded-full bg-black/10" />
                              <div className="mt-1 h-[10px] w-full rounded-[2px] bg-[rgba(219,59,43,0.22)]" />
                              <div className="h-[2px] w-2/3 rounded-full bg-black/10" />
                            </div>
                          </div>
                        </div>
                        <h3 className="font-sora text-[17px] font-normal text-black" style={{ marginBottom: 6 }}>Diseño responsive</h3>
                        <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>Tu tienda se ve perfecta en cualquier dispositivo, sin esfuerzo.</p>
                      </div>

                      {/* 2. Checkout integrado */}
                      <div data-stagger style={{ ["--i" as string]: 1 }} className="tienda-card flex flex-col overflow-hidden rounded-[18px] border border-black/[0.06] bg-white p-6">
                        <div className="relative mb-5 flex h-[110px] items-center justify-center overflow-hidden rounded-[10px]" style={{ padding: 12 }}>
                          <div className="w-full max-w-[180px] rounded-[8px] border border-black/[0.06] bg-white p-2.5">
                            <p className="font-inter text-[8px] text-black/40" style={{ marginBottom: 2 }}>Tarjeta</p>
                            <p className="font-inter text-[11px] font-medium text-black" style={{ marginBottom: 6 }}>•••• •••• •••• 4242</p>
                            <div className="flex items-center justify-center rounded-[5px] bg-[#DB3B2B] py-1">
                              <span className="font-inter text-[9px] font-semibold text-white">Pagar $1,345.99</span>
                            </div>
                          </div>
                        </div>
                        <h3 className="font-sora text-[17px] font-normal text-black" style={{ marginBottom: 6 }}>Checkout integrado</h3>
                        <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>Pasarela de pagos lista, optimizada para conversión.</p>
                      </div>

                      {/* 3. SEO out of the box */}
                      <div data-stagger style={{ ["--i" as string]: 2 }} className="tienda-card flex flex-col overflow-hidden rounded-[18px] border border-black/[0.06] bg-white p-6">
                        <div className="relative mb-5 flex h-[110px] items-center justify-center overflow-hidden rounded-[10px]" style={{ padding: 12 }}>
                          <div className="w-full max-w-[200px] rounded-[8px] border border-black/[0.06] bg-white p-2.5">
                            <div className="flex items-center gap-1.5" style={{ marginBottom: 5 }}>
                              <svg width="11" height="11" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
                              <p className="font-inter text-[8px] text-black/45">tienda.t1.com</p>
                            </div>
                            <p className="font-inter text-[11px] font-medium text-[#1A0DAB]" style={{ marginBottom: 1 }}>Tienda | T1</p>
                            <p className="font-inter text-[7.5px] text-[#006621]" style={{ marginBottom: 3 }}>tienda.t1.com</p>
                            <p className="font-inter text-[7.5px] text-black/50" style={{ lineHeight: 1.4 }}>Encuentra todo lo que necesitas...</p>
                          </div>
                        </div>
                        <h3 className="font-sora text-[17px] font-normal text-black" style={{ marginBottom: 6 }}>SEO out of the box</h3>
                        <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>Estructura, metadatos y velocidad pensados para Google.</p>
                      </div>

                      {/* 4. Catálogo inteligente */}
                      <div data-stagger style={{ ["--i" as string]: 3 }} className="tienda-card flex flex-col overflow-hidden rounded-[18px] border border-black/[0.06] bg-white p-6">
                        <div className="relative mb-5 flex h-[110px] items-center justify-center overflow-hidden rounded-[10px]" style={{ padding: 12 }}>
                          <div className="flex w-full max-w-[210px] items-center gap-2 rounded-[8px] border border-black/[0.06] bg-white p-2">
                            <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center overflow-hidden rounded-[5px] border border-black/[0.05] bg-white">
                              <Image src="/img/tenis-transparente.png" alt="" width={36} height={28} className="object-contain" />
                            </div>
                            <div className="flex-1">
                              <p className="font-inter text-[10px] font-semibold text-black" style={{ marginBottom: 1 }}>Tenis blancos</p>
                              <p className="font-inter text-[8px] text-black/50" style={{ marginBottom: 2 }}>$1,345.99</p>
                              <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(139,92,246,0.10)] px-1.5 py-0.5">
                                <svg width="7" height="7" viewBox="0 0 24 24" fill="none"><path d="M12 3L14 9L20 11L14 13L12 19L10 13L4 11L10 9L12 3Z" stroke="#8B5CF6" strokeWidth="2" strokeLinejoin="round" fill="rgba(139,92,246,0.2)" /></svg>
                                <span className="font-inter text-[7px] font-semibold text-[#8B5CF6]">IA</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <h3 className="font-sora text-[17px] font-normal text-black" style={{ marginBottom: 6 }}>Catálogo inteligente</h3>
                        <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>Sube fotos y la IA arma título, descripción y variantes.</p>
                      </div>

                      {/* 5. Dominio personalizado */}
                      <div data-stagger style={{ ["--i" as string]: 4 }} className="tienda-card flex flex-col overflow-hidden rounded-[18px] border border-black/[0.06] bg-white p-6">
                        <div className="relative mb-5 flex h-[110px] items-center justify-center overflow-hidden rounded-[10px]" style={{ padding: 12 }}>
                          <div className="flex w-full max-w-[210px] items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-2.5 py-1.5">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="black" strokeOpacity="0.4" strokeWidth="1.5" /><path d="M3 12h18 M12 3c2 2.5 3 5.7 3 9s-1 6.5-3 9c-2-2.5-3-5.7-3-9s1-6.5 3-9z" stroke="black" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" /></svg>
                            <span className="font-inter text-[10px] text-black/50">https://</span>
                            <span className="font-inter text-[10px] font-medium text-black">mitienda</span>
                            <span className="font-inter text-[10px] text-black/50">.com</span>
                            <div className="ml-auto flex items-center gap-1 rounded-full bg-[rgba(34,197,94,0.12)] px-1.5 py-0.5">
                              <span className="h-[5px] w-[5px] rounded-full bg-[#22C55E]" />
                            </div>
                          </div>
                        </div>
                        <h3 className="font-sora text-[17px] font-normal text-black" style={{ marginBottom: 6 }}>Dominio personalizado</h3>
                        <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>Conecta tu dominio en minutos o usa uno de cortesía.</p>
                      </div>

                      {/* 6. Métricas en tiempo real */}
                      <div data-stagger style={{ ["--i" as string]: 5 }} className="tienda-card flex flex-col overflow-hidden rounded-[18px] border border-black/[0.06] bg-white p-6">
                        <div className="relative mb-5 flex h-[110px] items-center justify-center overflow-hidden rounded-[10px]" style={{ padding: 12 }}>
                          <div className="w-full max-w-[200px] rounded-[8px] border border-black/[0.06] bg-white p-2.5">
                            <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
                              <span className="font-inter text-[8px] text-black/50">Ventas · 7 días</span>
                              <span className="font-inter text-[9px] font-bold text-[#22C55E]">↑ 24%</span>
                            </div>
                            <p className="font-sora text-[16px] font-light text-black" style={{ letterSpacing: "-0.02em", marginBottom: 6, lineHeight: 1 }}>$284,920</p>
                            <div className="flex h-[28px] items-end gap-1">
                              {[35, 52, 28, 64, 48, 78, 90].map((h, i) => (
                                <div key={i} className="flex-1 rounded-t-[2px]" style={{ height: `${h}%`, background: i === 6 ? "#DB3B2B" : "rgba(219,59,43,0.18)" }} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <h3 className="font-sora text-[17px] font-normal text-black" style={{ marginBottom: 6 }}>Métricas en tiempo real</h3>
                        <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>Dashboard de ventas, tráfico y comportamiento desde el día uno.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ── Stats with count-up ── */}
                <section className="relative px-5 py-20 tablet:px-10 tablet:py-24" style={{ background: "linear-gradient(135deg, #1A0A0A 0%, #261515 50%, #1A0A0A 100%)" }}>
                  <div className="mx-auto max-w-[var(--max-w)]">
                    <div data-modal-animate className="mx-auto max-w-[640px] text-center" style={{ marginBottom: 48 }}>
                      <h2 className="font-sora text-[24px] font-light text-white tablet:text-[34px]" style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                        Los números hablan.
                      </h2>
                    </div>

                    <div data-modal-animate className="grid grid-cols-1 gap-10 text-center tablet:grid-cols-3">
                      <div data-stagger style={{ ["--i" as string]: 0 }}>
                        <CountStat end={2} prefix="<" suffix=" min" label="para tu primera tienda" />
                      </div>
                      <div data-stagger style={{ ["--i" as string]: 1 }}>
                        <CountStat end={50} prefix="+" suffix="K" label="tiendas creadas con T1" />
                      </div>
                      <div data-stagger style={{ ["--i" as string]: 2 }}>
                        <p className="font-sora text-[36px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1 }}>
                          24/7
                        </p>
                        <p className="font-inter text-[12px] font-light text-white/55 tablet:text-[13px]">soporte en español</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ── FAQ ── */}
                <section className="relative bg-[#F6F6F6] px-5 py-24 tablet:px-10 tablet:py-32">
                  <div className="mx-auto max-w-[760px]">
                    <div data-modal-animate className="text-center" style={{ marginBottom: 40 }}>
                      <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>
                        Preguntas frecuentes
                      </h2>
                    </div>
                    <div data-modal-animate className="flex flex-col gap-3">
                      {[
                        { q: "¿Necesito saber programar?", a: "No. La IA crea tu tienda y el editor visual te permite ajustar todo sin código." },
                        { q: "¿Cuánto tarda en estar lista?", a: "Menos de 2 minutos para la primera versión. Puedes seguir personalizándola sin límite." },
                        { q: "¿Puedo usar mi propio dominio?", a: "Sí. Conecta tu dominio existente o usa uno de cortesía mientras decides." },
                        { q: "¿Qué incluye el plan gratis?", a: "Tienda completa con checkout, hasta cierto volumen de pedidos al mes y soporte en español." },
                      ].map((f, i) => (
                        <details
                          key={f.q}
                          data-stagger
                          className="group rounded-[14px] border border-black/[0.06] bg-white transition-all duration-200 open:border-[rgba(219,59,43,0.2)] open:shadow-[0_4px_18px_rgba(0,0,0,0.05)]"
                          style={{ ["--i" as string]: i }}
                        >
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-sora text-[16px] font-normal text-black transition-colors duration-150 hover:text-[#DB3B2B]">
                            {f.q}
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-black/40 transition-transform duration-300 group-open:rotate-180 group-open:text-[#DB3B2B]">
                              <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </summary>
                          <p className="px-6 pb-5 font-inter text-[14px] font-light text-black/65" style={{ lineHeight: 1.65 }}>
                            {f.a}
                          </p>
                        </details>
                      ))}
                    </div>
                  </div>
                </section>

                <T1FinalCTA
                  title="¿Listo para crear tu tienda con T1?"
                  description="Empieza gratis, sin tarjeta. Cuéntale a la IA qué vendes y deja que arme tu tienda en menos de 2 minutos."
                  buttonLabel="Crear mi tienda gratis"
                />
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Showcase stacking cards data ── */
const SHOWCASE_CARDS = [
  {
    id: "t1tienda",
    title: "Tienda",
    description:
      "Crea tu tienda en línea con checkout integrado, conecta +10 marketplaces y gestiona productos y envíos desde un solo lugar.",
    bgImage: null,
    bgCSS: "stack-bg-tienda",
    panelLeft: "/img/card-producto.svg",
    panelRight: "/img/lista-pedidos-t1.svg",
    ctaLabel: "Conoce T1tienda",
    ctaHref: "/productos/t1tienda/tienda-con-ia",
  },
  {
    id: "t1envios",
    title: "Envíos",
    description:
      "Cotiza y crea guías de envío. Si ya vendes en marketplaces, conéctalos y gestiona todos tus pedidos desde un solo lugar.",
    bgImage: null,
    bgCSS: "stack-bg-envios",
    panelLeft: "/img/envios.svg",
    panelRight: null,
    ctaLabel: "Conoce T1envíos",
    ctaHref: "https://www.t1.com/mx/envios",
  },
  {
    id: "t1pagos",
    title: "Pagos",
    description:
      "Crea links de pago en segundos, cobra a distancia y gestiona todo desde un solo lugar.",
    bgImage: null,
    bgCSS: "stack-bg-pagos",
    panelLeft: "/img/pagos.svg",
    panelRight: null,
    ctaLabel: "Conoce T1pagos",
    ctaHref: "https://t1.com/mx/pagos/",
  },
];

/* ── External link arrow icon ── */
/* ── Phone mockup with WhatsApp → Link de pago ── */
function PhoneLinkPago() {
  // 0 = payment form, 1 = confirmation
  const [screen, setScreen] = useState(0);
  const [btnPressed, setBtnPressed] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = phoneRef.current;
    if (!el) return;
    let timers: ReturnType<typeof setTimeout>[] = [];
    let cycle: ReturnType<typeof setInterval> | null = null;

    const runCycle = () => {
      setScreen(0);
      setBtnPressed(false);
      // After 2.5s, simulate button press
      timers.push(setTimeout(() => setBtnPressed(true), 2500));
      // After 3s (0.5s after press), switch to confirmation
      timers.push(setTimeout(() => {
        setBtnPressed(false);
        setScreen(1);
      }, 3100));
      // After 7s, reset back to payment and restart
      timers.push(setTimeout(() => {
        setScreen(0);
        setBtnPressed(false);
      }, 7500));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runCycle();
          cycle = setInterval(runCycle, 8500);
        } else {
          setScreen(0);
          setBtnPressed(false);
          timers.forEach(clearTimeout);
          timers = [];
          if (cycle) clearInterval(cycle);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); timers.forEach(clearTimeout); if (cycle) clearInterval(cycle); };
  }, []);

  return (
    <div
      ref={phoneRef}
      className="overflow-hidden bg-white"
      style={{
        width: 280,
        height: 520,
        borderRadius: 15,
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        fontFamily: "var(--font-inter-var), sans-serif",
        position: "relative",
      }}
    >
      {/* iOS Status bar */}
      <div className="flex items-center justify-between px-5 py-1.5 bg-white">
        <span className="text-[11px] font-semibold text-black">9:41</span>
        <div className="flex items-center gap-1">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <rect x="0" y="3" width="2.5" height="7" rx="0.5" fill="rgba(0,0,0,0.3)" />
            <rect x="3.5" y="2" width="2.5" height="8" rx="0.5" fill="rgba(0,0,0,0.3)" />
            <rect x="7" y="1" width="2.5" height="9" rx="0.5" fill="rgba(0,0,0,0.5)" />
            <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" fill="rgba(0,0,0,0.7)" />
          </svg>
          <svg width="12" height="10" viewBox="0 0 16 12" fill="none">
            <path d="M1 8.5C3.5 5 6.5 3 8 3C9.5 3 12.5 5 15 8.5" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <svg width="18" height="9" viewBox="0 0 22 11" fill="none">
            <rect x="0.5" y="0.5" width="18" height="10" rx="2" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
            <rect x="2" y="2" width="14" height="7" rx="1" fill="rgba(0,0,0,0.7)" />
            <rect x="19.5" y="3.5" width="2" height="4" rx="1" fill="rgba(0,0,0,0.3)" />
          </svg>
        </div>
      </div>

      {screen === 1 ? (
        /* ── Confirmation screen ── */
        <div className="flex h-full flex-col bg-white" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-3">
            <span className="text-[12px] font-bold text-black">LOGO</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 3L11 11M11 3L3 11" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Success icon + message */}
          <div className="flex flex-col items-center px-5" style={{ paddingTop: 28, paddingBottom: 20 }}>
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#22C55E]" style={{ marginBottom: 14 }}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[16px] font-bold text-black" style={{ marginBottom: 4 }}>¡Gracias por tu pago!</p>
            <p className="text-[11px] text-black/50 text-center">Enviaremos a tu correo la confirmación</p>
          </div>

          {/* Receipt details */}
          <div className="mx-5 rounded-[10px] border border-black/[0.06]" style={{ padding: "14px 16px" }}>
            <div className="flex items-center justify-between border-b border-black/[0.04] pb-2.5" style={{ marginBottom: 10 }}>
              <span className="text-[10px] text-black/50">Método de pago</span>
              <div className="flex items-center gap-1.5">
                <div className="flex h-[14px] w-[22px] items-center justify-center rounded-[2px]" style={{ background: "#EB001B" }}>
                  <div className="flex">
                    <div className="h-[8px] w-[8px] rounded-full bg-[#EB001B]" />
                    <div className="h-[8px] w-[8px] -ml-2 rounded-full bg-[#F79E1B] opacity-80" />
                  </div>
                </div>
                <span className="text-[10px] font-medium text-black/60">**** 3456</span>
              </div>
            </div>
            <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
              <span className="text-[10px] text-black/50">Subtotal</span>
              <span className="text-[10px] text-black/70">$2,396.00</span>
            </div>
            <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
              <span className="text-[10px] text-black/50">Impuestos (IVA)</span>
              <span className="text-[10px] text-black/70">$383.36</span>
            </div>
            <div className="flex items-center justify-between border-t border-black/[0.04] pt-2.5" style={{ marginTop: 4 }}>
              <span className="text-[11px] font-semibold text-black">Total</span>
              <span className="text-[11px] font-bold text-black">$2,629.36</span>
            </div>
          </div>

          {/* Powered by */}
          <div className="mt-auto flex items-center justify-center gap-1 pb-4">
            <span className="text-[9px] text-black/30">Powered by</span>
            <svg width="14" height="13" viewBox="0 0 45 44" fill="none">
              <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457V19.1513V19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#D93A26" />
              <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592H22.4335H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#D93A26" />
            </svg>
            <span className="text-[9px] font-bold text-[#D93A26]">pagos</span>
          </div>
        </div>
      ) : (
        /* ── Payment form — credit card selected ── */
        <div className="flex h-full flex-col bg-white">
          <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-3">
            <span className="text-[12px] font-bold text-black">LOGO</span>
            <span className="text-[11px] text-black/40">Ver detalle ›</span>
          </div>
          <div className="flex flex-col items-center px-5 py-3">
            <Image src="/img/tenis-transparente.png" alt="Tenis" width={60} height={42} className="object-contain" />
            <p className="mt-1 text-[11px] text-black/50 text-center">Tenis blancos clasicos</p>
            <p className="mt-0.5 text-[18px] font-bold text-black">$1,345.99</p>
          </div>
          <div className="border-t border-black/[0.06] px-5 py-2.5">
            <p className="text-[11px] font-semibold text-black/70" style={{ marginBottom: 6 }}>Método de pago</p>
            {/* Credit card — SELECTED with MSI dropdown inside */}
            <div className="rounded-[8px] border border-[#E26153]" style={{ marginBottom: 8 }}>
              <div className="flex items-center gap-2 px-3 py-2.5">
                <div className="h-[8px] w-[8px] rounded-full bg-[#E26153]" />
                <span className="text-[11px] font-medium text-black/70">Tarjetas de crédito o débito</span>
                <div className="ml-auto flex items-center gap-1">
                  <span className="text-[8px] font-bold text-[#1434CB]">VISA</span>
                  <div className="flex">
                    <div className="h-[8px] w-[8px] rounded-full bg-[#EB001B]" />
                    <div className="h-[8px] w-[8px] -ml-2 rounded-full bg-[#F79E1B] opacity-80" />
                  </div>
                </div>
              </div>
              {/* MSI dropdown inside card selection */}
              <div className="flex items-center justify-between border-t border-[#E26153]/10 px-3 py-2">
                <span className="text-[9px] text-black/50">Meses sin intereses</span>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-semibold text-black/70">6 meses</span>
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="rgba(0,0,0,0.3)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
            {/* Transfer — unselected */}
            <div className="flex items-center gap-2 rounded-[8px] border border-black/[0.06] px-3 py-2.5">
              <div className="h-[8px] w-[8px] rounded-full border-2 border-black/15" />
              <span className="text-[11px] text-black/50">Transferencia bancaria</span>
              <span className="ml-auto text-[9px] font-bold text-black/25">SPEI</span>
            </div>
          </div>
          {/* Pagar button — right after payment methods, simulated click */}
          <div className="px-5" style={{ marginTop: 12 }}>
            <div
              className="flex h-[40px] items-center justify-center rounded-[10px] bg-[#DB3B2B]"
              style={{
                transform: btnPressed ? "scale(0.95)" : "scale(1)",
                opacity: btnPressed ? 0.85 : 1,
                boxShadow: btnPressed ? "inset 0 2px 4px rgba(0,0,0,0.2)" : "0 2px 8px rgba(219,59,43,0.3)",
                transition: "transform 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease",
                position: "relative",
              }}
            >
              <span className="text-[13px] font-bold text-white">Pagar $1,345.99</span>
              {/* Simulated finger/cursor indicator */}
              {btnPressed && (
                <div
                  className="absolute"
                  style={{
                    bottom: -18,
                    right: 30,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.12)",
                    border: "2px solid rgba(0,0,0,0.08)",
                    animation: "fadeSlideIn 0.2s ease-out",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ExternalArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M4.5 11.5L11.5 4.5M11.5 4.5H6M11.5 4.5V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── iOS Status Bar (shared by mobile panels) ── */
function IOSStatusBar() {
  return (
    <div className="flex items-center justify-between px-5 py-1.5 bg-white">
      <span className="text-[11px] font-semibold text-black">9:41</span>
      <div className="flex items-center gap-1">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <rect x="0" y="3" width="2.5" height="7" rx="0.5" fill="rgba(0,0,0,0.3)" />
          <rect x="3.5" y="2" width="2.5" height="8" rx="0.5" fill="rgba(0,0,0,0.3)" />
          <rect x="7" y="1" width="2.5" height="9" rx="0.5" fill="rgba(0,0,0,0.5)" />
          <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" fill="rgba(0,0,0,0.7)" />
        </svg>
        <svg width="12" height="10" viewBox="0 0 16 12" fill="none">
          <path d="M1 8.5C3.5 5 6.5 3 8 3C9.5 3 12.5 5 15 8.5" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <svg width="18" height="9" viewBox="0 0 22 11" fill="none">
          <rect x="0.5" y="0.5" width="18" height="10" rx="2" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
          <rect x="2" y="2" width="14" height="7" rx="1" fill="rgba(0,0,0,0.7)" />
          <rect x="19.5" y="3.5" width="2" height="4" rx="1" fill="rgba(0,0,0,0.3)" />
        </svg>
      </div>
    </div>
  );
}

/* ── Mobile Tienda Panel (phone-style with animation) ── */
function MobileTiendaPanel({ animate }: { animate: boolean }) {
  type Stage = "channels" | "orders";
  const [stage, setStage] = useState<Stage>("channels");
  const [connectedCount, setConnectedCount] = useState(0);
  const [extraCount, setExtraCount] = useState(0);

  const CHANNELS = [
    { id: "amazon", name: "Amazon", src: "/img/amazon-iso.svg" },
    { id: "meli", name: "Mercado Libre", src: "/img/meli-iso.svg" },
    { id: "shein", name: "SHEIN", src: "/img/shein-iso.svg" },
    { id: "tiktok", name: "TikTok", src: "/img/tiktok-isotipo.png" },
  ];

  useEffect(() => {
    if (!animate) {
      setStage("channels");
      setConnectedCount(0);
      setExtraCount(0);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Stage 1 (channels) — each "Conectar canal" turns into "Canal conectado"
    // sequentially. Starts after a short delay.
    for (let i = 0; i < CHANNELS.length; i++) {
      timers.push(setTimeout(() => setConnectedCount(i + 1), 900 + i * 850));
    }

    // After all channels connected → switch to orders stage.
    const ordersAt = 900 + CHANNELS.length * 850 + 700;
    timers.push(setTimeout(() => setStage("orders"), ordersAt));

    // Orders trickle in.
    for (let i = 0; i < 3; i++) {
      timers.push(setTimeout(() => setExtraCount(i + 1), ordersAt + 700 + i * 1800));
    }

    return () => timers.forEach(clearTimeout);
  }, [animate]);

  const INITIAL = [
    { id: "#112", canal: "Tiktok", src: "/img/tiktok-isotipo.png", productos: "2 productos", estatus: "Por enviar" },
    { id: "#111", canal: "SHEIN", src: "/img/shein-iso.svg", productos: "1 producto", estatus: "Enviado" },
    { id: "#110", canal: "Tienda", src: null as string | null, emoji: "🏪", productos: "3 productos", estatus: "Por preparar" },
    { id: "#109", canal: "MeLi", src: "/img/meli-iso.svg", productos: "2 productos", estatus: "Entregado" },
    { id: "#108", canal: "Amazon", src: "/img/amazon-iso.svg", productos: "1 producto", estatus: "Cancelado" },
    { id: "#107", canal: "Walmart", src: "/img/walmart.svg", productos: "4 productos", estatus: "Enviado" },
    { id: "#106", canal: "Tienda", src: null as string | null, emoji: "🏪", productos: "1 producto", estatus: "Entregado" },
  ];

  const EXTRA = [
    { id: "#113", canal: "Amazon", src: "/img/amazon-iso.svg", productos: "1 producto", estatus: "Por enviar" },
    { id: "#114", canal: "MeLi", src: "/img/meli-iso.svg", productos: "3 productos", estatus: "Por enviar" },
    { id: "#115", canal: "Tienda", src: null as string | null, emoji: "🏪", productos: "1 producto", estatus: "Pendiente" },
  ];

  const headerTitle = stage === "channels" ? "Canales de venta" : "Mis pedidos";

  return (
    <div
      className="mx-auto mt-5 flex flex-col overflow-hidden bg-white tablet:hidden"
      style={{
        width: "85%",
        maxWidth: 300,
        height: 480,
        marginBottom: 16,
        borderRadius: 20,
        boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        fontFamily: "var(--font-manrope-var), sans-serif",
      }}
    >
      <IOSStatusBar />

      <div
        className="flex shrink-0 items-center justify-between border-b border-black/[0.06] px-4"
        style={{ paddingTop: 8, paddingBottom: 8 }}
      >
        <span key={headerTitle} className="text-[14px] font-bold text-black mt-fade-in">
          {headerTitle}
        </span>
        {stage === "orders" && (
          <span className="flex h-[28px] items-center rounded-full bg-[#DB3B2B] px-4 text-[10px] font-semibold text-white">
            Crear pedido
          </span>
        )}
      </div>

      <div className="relative flex-1 overflow-hidden">
        {/* ── Stage 1 — "Canales de venta" screen ───────────
            Mimics the T1 admin "Canales de Venta" view. Each channel's
            "Conectar canal" button transforms into "Canal conectado" with
            a checkmark sequentially. */}
        {stage === "channels" && (
          <div className="mt-fade-in flex h-full flex-col px-3 pt-1">
            <p className="text-[10px] font-normal text-black/55" style={{ marginBottom: 8 }}>
              Aumenta tus ventas activando canales
            </p>

            {/* Tabs */}
            <div className="flex items-center gap-3 border-b border-black/[0.06]" style={{ paddingBottom: 6, marginBottom: 8 }}>
              <span className="relative text-[10px] font-semibold text-black">
                Todos
                <span
                  className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-[#DB3B2B]"
                />
              </span>
              <span className="text-[10px] font-normal text-black/40">Activos</span>
              <span className="text-[10px] font-normal text-black/40">Próximos</span>
            </div>

            {/* Marketplace section header */}
            <p className="text-[10px] font-bold text-black" style={{ marginBottom: 6 }}>
              Marketplace
            </p>

            {/* Channel cards */}
            <div className="flex flex-col gap-1.5 overflow-hidden">
              {CHANNELS.map((ch, i) => {
                const connected = i < connectedCount;
                return (
                  <div
                    key={ch.id}
                    className="flex items-center gap-2 rounded-[8px] border border-black/[0.06] bg-white"
                    style={{ padding: "7px 8px" }}
                  >
                    <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border border-black/[0.06] bg-white">
                      <Image
                        src={ch.src}
                        alt={ch.name}
                        width={22}
                        height={22}
                        className="object-contain"
                        style={{ maxHeight: 20, width: "auto" }}
                      />
                    </div>
                    <span className="flex-1 truncate text-[10px] font-semibold text-black">
                      {ch.name}
                    </span>
                    {connected ? (
                      <span
                        key="connected"
                        className="mt-fade-in flex items-center gap-1 rounded-full"
                        style={{
                          padding: "3px 8px 3px 6px",
                          background: "rgba(34,197,94,0.12)",
                          color: "#15803D",
                        }}
                      >
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2 6L5 9L10 3"
                            stroke="#15803D"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[9px] font-semibold">Conectado</span>
                      </span>
                    ) : (
                      <span
                        className="flex items-center gap-1 rounded-full"
                        style={{
                          padding: "3px 8px 3px 8px",
                          background: "rgba(219,59,43,0.10)",
                          color: "#DB3B2B",
                        }}
                      >
                        <span className="text-[9px] font-semibold">Conectar</span>
                        <svg width="9" height="9" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M3 8H13M13 8L9 4M13 8L9 12"
                            stroke="#DB3B2B"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Stage 3 — orders list (original animation) ──── */}
        {stage === "orders" && (
          <div className="mt-fade-in h-full overflow-hidden">
            {[...EXTRA.slice(0, extraCount)].reverse().map((row) => (
              <div
                key={`extra-${row.id}`}
                className="border-b border-black/[0.04] px-4 py-2.5"
                style={{ animation: "slideRowIn 0.8s ease-out" }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: 2 }}>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-black/40">22 abr</span>
                    <span className="text-[10px] font-semibold text-black/60">{row.id}</span>
                  </div>
                  <span className="text-[10px] font-bold text-black">$1,345.99</span>
                </div>
                <div className="flex items-center gap-2" style={{ marginBottom: 2 }}>
                  <span className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[8px] font-medium text-black/45">{row.estatus}</span>
                  <div className="flex items-center gap-1">
                    {row.src ? (
                      <Image src={row.src} alt="" width={12} height={12} className="rounded-full object-contain" />
                    ) : (
                      <span className="text-[10px]">{row.emoji}</span>
                    )}
                    <span className="text-[9px] text-black/40">{row.canal}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-black/35">Juan Pérez</span>
                  <span className="text-[9px] text-black/25">{row.productos}</span>
                </div>
              </div>
            ))}
            {INITIAL.map((row, i) => (
              <div key={i} className="border-b border-black/[0.04] px-4 py-2.5 last:border-0">
                <div className="flex items-center justify-between" style={{ marginBottom: 2 }}>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-black/40">21 abr</span>
                    <span className="text-[10px] font-semibold text-black/60">{row.id}</span>
                  </div>
                  <span className="text-[10px] font-bold text-black">$1,345.99</span>
                </div>
                <div className="flex items-center gap-2" style={{ marginBottom: 2 }}>
                  <span className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[8px] font-medium text-black/45">{row.estatus}</span>
                  <div className="flex items-center gap-1">
                    {row.src ? (
                      <Image src={row.src} alt="" width={12} height={12} className="rounded-full object-contain" />
                    ) : (
                      <span className="text-[10px]">{row.emoji}</span>
                    )}
                    <span className="text-[9px] text-black/40">{row.canal}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-black/35">María López</span>
                  <span className="text-[9px] text-black/25">{row.productos}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .mt-fade-in {
          animation: mtFadeIn 0.45s ease-out;
        }
        @keyframes mtFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mt-cursor {
          display: inline-block;
          width: 1px;
          margin-left: 2px;
          background: #DB3B2B;
          color: transparent;
          animation: mtBlink 0.8s steps(2, end) infinite;
        }
        @keyframes mtBlink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ── Desktop Tienda Panel: channels view → orders view ──
   Renders <PedidosPanel> as the fixed glass frame and only swaps the
   inner content area: stage 1 shows the "Canales de Venta" view, stage 2
   falls back to PedidosPanel's default Mis pedidos table. */
function DesktopTiendaPanel({ animate }: { animate: boolean }) {
  type Stage = "channels" | "orders";
  const [stage, setStage] = useState<Stage>("channels");
  const [connectedCount, setConnectedCount] = useState(0);

  const CHANNELS = [
    { id: "amazon", name: "Amazon", src: "/img/amazon-iso.svg" },
    { id: "meli", name: "Mercado Libre", src: "/img/meli-iso.svg" },
    { id: "shein", name: "SHEIN", src: "/img/shein-iso.svg" },
    { id: "walmart", name: "Walmart", src: "/img/walmart.svg" },
    { id: "tiktok", name: "TikTok", src: "/img/tiktok-isotipo.png" },
    { id: "sears", name: "Sears", src: "/img/sears-isotipo.svg" },
  ];

  useEffect(() => {
    if (!animate) {
      setStage("channels");
      setConnectedCount(0);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < CHANNELS.length; i++) {
      timers.push(setTimeout(() => setConnectedCount(i + 1), 700 + i * 480));
    }
    const ordersAt = 700 + CHANNELS.length * 480 + 900;
    timers.push(setTimeout(() => setStage("orders"), ordersAt));
    return () => timers.forEach(clearTimeout);
  }, [animate]);

  const channelsContent = (
    <div className="flex flex-1 flex-col overflow-hidden dt-fade-in">
      <style jsx>{`
        .dt-fade-in { animation: dtFadeIn 0.5s ease-out; }
        @keyframes dtFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header (mimics the "Mis pedidos" header height/spacing of PedidosPanel) */}
      <div className="border-b border-black/[0.04] px-5" style={{ paddingTop: 14, paddingBottom: 10 }}>
        <h3 className="text-[16px] font-bold text-black">Canales de venta</h3>
        <p className="text-[11px] font-normal text-black/55" style={{ marginTop: 2 }}>
          Aumenta tus ventas activando más canales
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-5 border-b border-black/[0.04] px-5" style={{ paddingTop: 8 }}>
        <span className="relative inline-flex items-center text-[11px] font-semibold text-black" style={{ paddingBottom: 8 }}>
          Todos los canales
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#DB3B2B]" />
        </span>
        <span className="text-[11px] font-normal text-black/40" style={{ paddingBottom: 8 }}>
          Canales activos
        </span>
        <span className="text-[11px] font-normal text-black/40" style={{ paddingBottom: 8 }}>
          Próximos canales
        </span>
      </div>

      {/* Marketplace section + grid */}
      <div className="flex-1 overflow-hidden px-5" style={{ paddingTop: 14 }}>
        <p className="text-[11px] font-bold text-black" style={{ marginBottom: 10 }}>
          Marketplace
        </p>
        <div className="grid grid-cols-3 gap-2.5">
          {CHANNELS.map((ch, i) => {
            const active = i < connectedCount;
            return (
              <div
                key={ch.id}
                className="rounded-[10px] border border-black/[0.06] bg-white"
                style={{ padding: "10px 12px", boxShadow: "0 2px 8px -2px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border border-black/[0.06] bg-white">
                    <Image
                      src={ch.src}
                      alt={ch.name}
                      width={24}
                      height={24}
                      className="object-contain"
                      style={{ maxHeight: 22, width: "auto" }}
                    />
                  </div>
                  <span className="truncate text-[11px] font-semibold text-black">
                    {ch.name}
                  </span>
                </div>
                <div className="mt-2 flex">
                  {active ? (
                    <span
                      key="active"
                      className="dt-pill-in inline-flex items-center gap-1 rounded-[5px]"
                      style={{
                        padding: "2px 7px",
                        background: "rgba(34,197,94,0.12)",
                        color: "#15803D",
                      }}
                    >
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6L5 9L10 3"
                          stroke="#15803D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-[8px] font-bold uppercase tracking-wide" style={{ letterSpacing: "0.05em" }}>
                        Activo
                      </span>
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1 rounded-[5px]"
                      style={{
                        padding: "2px 7px",
                        background: "rgba(219,59,43,0.10)",
                        color: "#DB3B2B",
                      }}
                    >
                      <span className="text-[8px] font-bold uppercase tracking-wide" style={{ letterSpacing: "0.05em" }}>
                        Conectar →
                      </span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .dt-pill-in { animation: dtPillIn 0.35s ease-out; }
        @keyframes dtPillIn {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );

  return (
    <PedidosPanel
      animate={stage === "orders" ? animate : false}
      contentOverride={stage === "channels" ? channelsContent : undefined}
    />
  );
}

/* ── Mobile Envios Panel (phone-style with self-managed animation) ── */
function MobileEnviosPanel() {
  const [extraCount, setExtraCount] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    let timers: ReturnType<typeof setTimeout>[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setExtraCount(0);
          for (let i = 0; i < 3; i++) {
            timers.push(setTimeout(() => setExtraCount(i + 1), 2500 + i * 2200));
          }
        } else {
          setExtraCount(0);
          timers.forEach(clearTimeout);
          timers = [];
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  const INITIAL = [
    { guia: "43567890082", paqueteria: "FedEx", logo: "/img/icons/fedex-logo.svg", costo: "$87.45", estado: "En camino" },
    { guia: "43567890082", paqueteria: "DHL", logo: "/img/dhl-iso.svg", costo: "$449.00", estado: "Entregado" },
    { guia: "43567890082", paqueteria: "99min", logo: "/img/99min-iso.svg", costo: "$87.45", estado: "Por recolectar" },
    { guia: "98765432100", paqueteria: "Estafeta", logo: "/img/icons/estafeta-logo.svg", costo: "$125.00", estado: "En camino" },
    { guia: "55667788990", paqueteria: "FedEx", logo: "/img/icons/fedex-logo.svg", costo: "$95.50", estado: "Entregado" },
    { guia: "77889900112", paqueteria: "DHL", logo: "/img/dhl-iso.svg", costo: "$210.00", estado: "Recolectado" },
    { guia: "33445566778", paqueteria: "99min", logo: "/img/99min-iso.svg", costo: "$65.00", estado: "En camino" },
    { guia: "22334455667", paqueteria: "Estafeta", logo: "/img/icons/estafeta-logo.svg", costo: "$178.50", estado: "Por recolectar" },
    { guia: "11223344559", paqueteria: "FedEx", logo: "/img/icons/fedex-logo.svg", costo: "$112.00", estado: "Entregado" },
  ];

  const EXTRA = [
    { guia: "11223344556", paqueteria: "DHL", logo: "/img/dhl-iso.svg", costo: "$210.00", estado: "Recolectado" },
    { guia: "66778899001", paqueteria: "Estafeta", logo: "/img/icons/estafeta-logo.svg", costo: "$145.00", estado: "En camino" },
    { guia: "99001122334", paqueteria: "FedEx", logo: "/img/icons/fedex-logo.svg", costo: "$89.00", estado: "Por recolectar" },
  ];

  return (
    <div ref={panelRef} className="mx-auto mt-5 flex flex-col overflow-hidden bg-white tablet:hidden" style={{ width: "85%", maxWidth: 300, height: 480, marginBottom: 16, borderRadius: 20, boxShadow: "0 8px 30px rgba(0,0,0,0.15)", fontFamily: "var(--font-manrope-var), sans-serif" }}>
      <IOSStatusBar />
      <div className="flex shrink-0 items-center justify-between border-b border-black/[0.06] px-4" style={{ paddingTop: 8, paddingBottom: 8 }}>
        <span className="text-[14px] font-bold text-black">Mis envíos</span>
        <span className="flex h-[28px] items-center rounded-full bg-[#DB3B2B] px-4 text-[10px] font-semibold text-white">Crear envío</span>
      </div>
      <div className="flex-1 overflow-hidden">
        {EXTRA.slice(0, extraCount).map((row, i) => (
          <div key={`extra-${row.guia}-${i}`} className="flex items-center gap-2.5 border-b border-black/[0.04] px-4 py-2.5" style={{ animation: "slideRowIn 0.8s ease-out" }}>
            <Image src={row.logo} alt="" width={22} height={22} className="shrink-0 rounded object-contain" />
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-[10px] font-semibold text-black/70">{row.guia}</span>
              <span className="text-[9px] text-black/35">{row.paqueteria}</span>
            </div>
            <span className="ml-auto shrink-0 text-[10px] font-semibold text-black/60">{row.costo}</span>
            <span className="shrink-0 rounded-full bg-black/[0.04] px-2 py-0.5 text-[8px] font-medium text-black/45">{row.estado}</span>
          </div>
        ))}
        {INITIAL.map((row, i) => (
          <div key={i} className="flex items-center gap-2.5 border-b border-black/[0.04] px-4 py-2.5 last:border-0">
            <Image src={row.logo} alt="" width={22} height={22} className="shrink-0 rounded object-contain" />
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-[10px] font-semibold text-black/70">{row.guia}</span>
              <span className="text-[9px] text-black/35">{row.paqueteria}</span>
            </div>
            <span className="ml-auto shrink-0 text-[10px] font-semibold text-black/60">{row.costo}</span>
            <span className="shrink-0 rounded-full bg-black/[0.04] px-2 py-0.5 text-[8px] font-medium text-black/45">{row.estado}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function T1Features() {
  const tiendaRef = useRef<HTMLDivElement>(null);
  const [tiendaVisible, setTiendaVisible] = useState(false);
  const [modalCard, setModalCard] = useState<string | null>(null);
  // Q1 — viewport gate: desktop-only and mobile-only subtrees are unmounted
  // post-hydration to remove ~244 hidden nodes from the stack DOM.
  const isDesktop = useIsDesktop();

  const closeModal = useCallback(() => setModalCard(null), []);

  /* Scale-down staircase — continuous interpolation based on next card's scroll progress.
     Optimized: 1 batched read of rects → write CSS vars (no filter:brightness, no per-frame
     querySelectorAll). The actual transform+overlay live in CSS using the variables. */
  useEffect(() => {
    let rafId: number;
    let cachedCards: HTMLElement[] | null = null;
    const TOP_BASE = 70;
    const TOP_GAP = 20;

    const getCards = () => {
      if (!cachedCards || cachedCards.length === 0 || !document.contains(cachedCards[0])) {
        cachedCards = Array.from(document.querySelectorAll<HTMLElement>(".stack-card"));
      }
      return cachedCards;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const cards = getCards();
        const totalCards = cards.length;
        if (totalCards === 0) return;

        // Skip scale effect on mobile — cards are full-viewport and shouldn't shrink.
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        if (isMobile) {
          for (let i = 0; i < totalCards; i++) {
            cards[i].style.removeProperty("--stack-scale");
            cards[i].style.removeProperty("--stack-dim");
          }
          return;
        }

        // Single read pass: cache top positions
        const viewportH = window.innerHeight;
        const tops = new Array<number>(totalCards);
        for (let i = 0; i < totalCards; i++) {
          tops[i] = cards[i].getBoundingClientRect().top;
        }

        // Single write pass: compute reduction from cached tops (O(n), no extra reads)
        for (let i = 0; i < totalCards; i++) {
          let totalReduction = 0;
          for (let j = i + 1; j < totalCards; j++) {
            const nextStickyTop = TOP_BASE + j * TOP_GAP;
            const distanceToTravel = viewportH - nextStickyTop;
            const distanceTraveled = viewportH - tops[j];
            const progress = distanceTraveled <= 0
              ? 0
              : distanceTraveled >= distanceToTravel
                ? 1
                : distanceTraveled / distanceToTravel;
            totalReduction += progress * 0.04;
          }
          const scale = totalReduction >= 0.12 ? 0.88 : 1 - totalReduction;
          // Dim is the strength of the dark overlay (0..0.25), replaces filter:brightness.
          const dim = Math.min(0.25, totalReduction * 1.5);
          cards[i].style.setProperty("--stack-scale", String(scale));
          cards[i].style.setProperty("--stack-dim", String(dim));
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial pass
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const el = tiendaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setTiendaVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Q2 — Pause blobFloat animation on cards that are off-screen.
     Toggles `.is-visible` class on each `.stack-card`. CSS plays the
     animation only when the class is present, saving paint cost on the
     two non-active cards in the stack. */
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".stack-card");
    if (cards.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          (entry.target as HTMLElement).classList.toggle("is-visible", entry.isIntersecting);
        }
      },
      // Activate when at least 10% of the card is visible
      { threshold: 0.1, rootMargin: "0px" }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#F6F6F6]" style={{ paddingTop: 60, paddingBottom: 40 }}>
      <div className="mx-auto max-w-[var(--max-w)] px-5 tablet:px-6" style={{ paddingTop: 40 }}>
        {/* Heading — Sora 44px */}
        <h2
          className="mx-auto font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]"
          style={{
            letterSpacing: "-0.03em",
            lineHeight: "1.2em",
            textAlign: "center",
            maxWidth: 700,
            marginBottom: 16,
          }}
        >
          {FEATURES_HEADING}
        </h2>

        {/* Subtitle — Inter 25px light, full width */}
        <p
          className="font-inter text-[16px] font-light text-black tablet:text-[20px] lg:text-[25px]"
          style={{
            textAlign: "center",
            lineHeight: 1.5,
            marginBottom: 48,
            whiteSpace: "pre-line",
          }}
        >
          {FEATURES_SUBTITLE}
        </p>

        {/* MOBILE (< tablet) — 3 cards stacked: illustration on the left,
            label + description on the right (same layout, now wrapped in cards). */}
        <div className="flex flex-col gap-4 tablet:hidden" style={{ marginBottom: 48 }}>
          {[
            { id: "vende", label: "VENDE", desc: "En tu tienda en línea o marketplaces", src: "/img/card-vende.png" },
            { id: "cobra", label: "COBRA", desc: "Con tarjeta o transferencia con nuestro checkout integrado o link de pago", src: "/img/card-cobra.png" },
            { id: "envia", label: "ENVÍA", desc: "Cotiza y crea envíos con las mejores paqueterías y los precios más bajos", src: "/img/card-envia.png" },
          ].map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-[16px] bg-white"
              style={{
                padding: "18px 18px",
                boxShadow: "0 0 25px 0 rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex shrink-0 items-center justify-center" style={{ width: 64, height: 64 }}>
                <Image
                  src={item.src}
                  alt={item.label}
                  width={64}
                  height={64}
                  className="object-contain"
                  style={{ width: "auto", height: "auto", maxWidth: 64, maxHeight: 64 }}
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <p className="font-inter text-[16px] font-semibold uppercase tracking-[0.04em] text-black">
                  {item.label}
                </p>
                <p className="font-inter text-[14px] font-normal text-black/65" style={{ lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP (≥ tablet) — 3-column card grid */}
        <div className="hidden tablet:grid tablet:grid-cols-3 tablet:gap-4 lg:gap-6" style={{ marginBottom: 60 }}>
          {FEATURE_CARDS.map((card) => {
            const illustration =
              card.id === "vende" ? "/img/card-vende.png"
              : card.id === "cobra" ? "/img/card-cobra.png"
              : "/img/card-envia.png";
            return (
              <div
                key={card.id}
                className="flex flex-col items-center rounded-[20px] bg-white transition-all duration-300 hover:scale-[1.01]"
                style={{ padding: "40px 32px", boxShadow: "0 0 25px 0 rgba(0,0,0,0.06)" }}
              >
                {/* Illustration — natural size, no wrapper */}
                <Image
                  src={illustration}
                  alt={card.label}
                  width={120}
                  height={120}
                  className="object-contain"
                  style={{ marginBottom: 16, height: "auto", width: "auto", maxHeight: 140 }}
                />


                {/* Label uppercase */}
                <p className="font-inter text-[18px] font-medium uppercase text-black tablet:text-[20px]" style={{ marginBottom: 16 }}>
                  {card.label}
                </p>

                {/* Description — left-aligned, full width */}
                <p className="w-full font-inter text-[15px] font-normal text-black tablet:text-[16px]" style={{ lineHeight: 1.5 }}>
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Stacking showcase cards with scale-down effect ── */}
      <div className="stack-card-container relative mx-auto max-w-[var(--max-w)] px-4 tablet:px-6">
        {SHOWCASE_CARDS.map((card, idx) => (
          <div
            key={card.id}
            className="stack-card sticky cursor-pointer overflow-hidden rounded-[12px] tablet:rounded-[15px]"
            style={{
              top: `${70 + idx * 20}px`,
              marginBottom: 40,
              height: 580,
              zIndex: idx + 1,
              boxShadow: "0 -4px 30px rgba(0,0,0,0.2)",
              transformOrigin: "50% 0",
            }}
            data-stack-idx={idx}
            onClick={() => {
              if (card.id === "t1pagos") {
                window.open("https://t1.com/mx/pagos/", "_blank", "noopener,noreferrer");
              } else if (card.id === "t1envios") {
                window.open("https://www.t1.com/mx/envios", "_blank", "noopener,noreferrer");
              } else if (card.id === "t1tienda") {
                window.location.href = "/productos/t1tienda/tienda-con-ia";
              } else {
                setModalCard(card.id);
              }
            }}
          >
            {/* Background — CSS gradient or image */}
            {card.bgImage ? (
              <Image src={card.bgImage} alt="" fill className="object-cover" sizes="100vw" />
            ) : (
              <>
                <div className={`absolute inset-0 ${card.bgCSS}`} />
                <div className="noise-grain pointer-events-none absolute inset-0 z-[1]" />
              </>
            )}

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Mobile-only stack indicator: glass pill at title height.
                Click jumps to the next stack card. */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const next = idx + 1 < SHOWCASE_CARDS.length
                  ? document.querySelector(`[data-stack-idx="${idx + 1}"]`)
                  : null;
                if (next) {
                  (next as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              aria-label={
                idx < SHOWCASE_CARDS.length - 1
                  ? `Ir a la siguiente tarjeta (${idx + 2} de ${SHOWCASE_CARDS.length})`
                  : `Tarjeta ${idx + 1} de ${SHOWCASE_CARDS.length}`
              }
              disabled={idx === SHOWCASE_CARDS.length - 1}
              className="absolute z-20 flex cursor-pointer items-center gap-1.5 rounded-full border-none tablet:hidden"
              style={{
                top: 50,
                right: 20,
                padding: "6px 12px",
                background: "rgba(0,0,0,0.28)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)",
              }}
            >
              <span
                className="font-inter text-[12px] font-semibold tabular-nums text-white"
                style={{ letterSpacing: "0.02em" }}
              >
                {idx + 1} / {SHOWCASE_CARDS.length}
              </span>
              {idx < SHOWCASE_CARDS.length - 1 && (
                <svg className="scroll-hint" width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 6L8 11L13 6"
                    stroke="rgba(255,255,255,0.95)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            {/* Content wrapper */}
            <div className="relative z-10 flex h-full flex-col tablet:flex-row" style={{ minHeight: 320 }}>
              {card.panelRight ? (
                /* ── Two-column layout (T1tienda) ── */
                <>
                  {/* Left column — text at top + product card below */}
                  <div className="flex w-full flex-col px-5 pt-14 pb-5 tablet:w-1/2 tablet:p-8" ref={tiendaRef}>
                    {/* Text info at top */}
                    <div>
                      <p className="font-sora text-[18px] font-normal text-white tablet:text-[22px] lg:text-[26px]">
                        {card.title}
                      </p>
                      <p
                        className="font-inter text-[13px] font-normal text-white/90 tablet:text-[14px] lg:text-[16px]"
                        style={{ lineHeight: 1.6, marginTop: 8, marginBottom: 18 }}
                      >
                        {card.description}
                      </p>
                      {card.ctaLabel && (
                        <a
                          href={card.ctaHref}
                          target={card.ctaHref?.startsWith("http") ? "_blank" : undefined}
                          rel={card.ctaHref?.startsWith("http") ? "noopener noreferrer" : undefined}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex h-[42px] items-center gap-2 rounded-full bg-white px-5 font-inter text-[13px] font-semibold text-black no-underline transition-all duration-200 hover:scale-[1.03] hover:bg-white/90"
                          style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.18)" }}
                        >
                          {card.ctaLabel}
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      )}
                    </div>

                    {/* Desktop: GlassProductCard — only mounted on desktop (Q1) */}
                    {isDesktop !== false && (
                      <div className="mt-6 hidden flex-1 items-center justify-center tablet:flex tablet:mt-0">
                        <GlassProductCard
                          imageSrc="/img/tenis-transparente.png"
                          price="$1,345.99"
                          title="Tenis blancos clasicos"
                          units="1,003 unidades"
                          marketplaces={[
                            { src: "/img/meli-iso.svg", alt: "MercadoLibre" },
                            { src: "/img/amazon-iso.svg", alt: "Amazon" },
                            { src: "/img/walmart.svg", alt: "Walmart" },
                            { src: "/img/sears-isotipo.svg", alt: "Sears" },
                            { src: "/img/shein-iso.svg", alt: "SHEIN" },
                          ]}
                        />
                      </div>
                    )}

                    {/* Mobile: phone-style pedidos panel — only mounted on mobile (Q1) */}
                    {isDesktop !== true && <MobileTiendaPanel animate={tiendaVisible} />}

                  </div>

                  {/* Right column: channels-then-orders desktop panel (Q1) */}
                  {isDesktop !== false && (
                    <div className="hidden w-1/2 items-end justify-end tablet:flex" style={{ paddingTop: 60 }}>
                      <DesktopTiendaPanel animate={tiendaVisible} />
                    </div>
                  )}
                </>
              ) : card.id === "t1pagos" ? (
                /* ── Two-column layout (T1pagos) ── */
                <div className="flex h-full w-full flex-col tablet:flex-row">
                  {/* Left column: text at top, credit cards centered below */}
                  <div className="flex w-full flex-col px-5 pt-14 pb-5 tablet:w-1/2 tablet:p-8 lg:p-10">
                    <div style={{ maxWidth: 420 }}>
                      <p className="font-sora text-[18px] font-normal text-white tablet:text-[22px] lg:text-[26px]">
                        {card.title}
                      </p>
                      <p className="font-inter text-[13px] font-normal text-white/90 tablet:text-[14px] lg:text-[16px]" style={{ lineHeight: 1.6, marginTop: 8, marginBottom: 18 }}>
                        {card.description}
                      </p>
                      {card.ctaLabel && (
                        <a
                          href={card.ctaHref}
                          target={card.ctaHref?.startsWith("http") ? "_blank" : undefined}
                          rel={card.ctaHref?.startsWith("http") ? "noopener noreferrer" : undefined}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex h-[42px] items-center gap-2 rounded-full bg-white px-5 font-inter text-[13px] font-semibold text-black no-underline transition-all duration-200 hover:scale-[1.03] hover:bg-white/90"
                          style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.18)" }}
                        >
                          {card.ctaLabel}
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      )}
                    </div>
                    {/* Desktop: credit cards — only mounted on desktop (Q1) */}
                    {isDesktop !== false && (
                      <div className="mt-6 hidden flex-1 items-center justify-center tablet:flex tablet:mt-0">
                        <GlassCreditCard />
                      </div>
                    )}

                    {/* Mobile: phone link de pago — only mounted on mobile (Q1) */}
                    {isDesktop !== true && (
                      <div className="mx-auto mt-5 tablet:hidden">
                        <PhoneLinkPago />
                      </div>
                    )}
                  </div>

                  {/* Right column: phone mockup — only mounted on desktop (Q1) */}
                  {isDesktop !== false && (
                    <div className="hidden w-1/2 items-center justify-center overflow-hidden tablet:flex">
                      <div style={{ marginTop: 40, marginBottom: -80 }}>
                        <div
                          className="relative"
                          style={{
                            padding: "10px 10px 0 10px",
                            borderRadius: "18px 18px 0 0",
                            background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.03) 100%)",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), inset 1px 0 0 rgba(255,255,255,0.2), inset -1px 0 0 rgba(255,255,255,0.2)",
                          }}
                        >
                          <PhoneLinkPago />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : card.id === "t1envios" ? (
                /* ── Envíos — text + shipment card left, panel right ── */
                <div className="flex h-full w-full flex-col tablet:flex-row">
                  <div className="flex w-full flex-col px-5 pt-14 pb-5 tablet:w-2/5 tablet:p-8">
                    <div>
                      <p className="font-sora text-[18px] font-normal text-white tablet:text-[22px] lg:text-[26px]">
                        {card.title}
                      </p>
                      <p className="font-inter text-[13px] font-normal text-white/90 tablet:text-[14px] lg:text-[16px]" style={{ lineHeight: 1.6, marginTop: 8, marginBottom: 18 }}>
                        {card.description}
                      </p>
                      {card.ctaLabel && (
                        <a
                          href={card.ctaHref}
                          target={card.ctaHref?.startsWith("http") ? "_blank" : undefined}
                          rel={card.ctaHref?.startsWith("http") ? "noopener noreferrer" : undefined}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex h-[42px] items-center gap-2 rounded-full bg-white px-5 font-inter text-[13px] font-semibold text-black no-underline transition-all duration-200 hover:scale-[1.03] hover:bg-white/90"
                          style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.18)" }}
                        >
                          {card.ctaLabel}
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      )}
                    </div>
                    {/* Desktop: GlassShipmentCard — only mounted on desktop (Q1) */}
                    {isDesktop !== false && (
                      <div className="mt-6 hidden flex-1 items-center justify-center tablet:flex tablet:mt-0">
                        <GlassShipmentCard />
                      </div>
                    )}

                    {/* Mobile: phone-style envios panel — only mounted on mobile (Q1) */}
                    {isDesktop !== true && <MobileEnviosPanel />}

                  </div>
                  {/* EnviosPanel — only mounted on desktop (Q1) */}
                  {isDesktop !== false && (
                    <div className="hidden w-3/5 tablet:block" style={{ paddingTop: 40 }}>
                      <EnviosPanel animate={tiendaVisible} />
                    </div>
                  )}
                </div>
              ) : (
                /* ── Single panel layout (fallback) ── */
                <div className="flex w-full flex-col justify-between p-5 tablet:p-8 lg:p-10">
                  <div style={{ maxWidth: 520 }}>
                    <p className="flex items-center gap-2 font-sora text-[20px] font-normal text-white tablet:text-[24px] lg:text-[28px]">
                      {card.title}
                      <span className="text-white/60"><ExternalArrow /></span>
                    </p>
                    <p className="font-inter text-[14px] font-normal text-white/90 tablet:text-[16px] lg:text-[18px]" style={{ lineHeight: 1.6, marginTop: 8, marginBottom: 12 }}>
                      {card.description}
                    </p>
                  </div>
                  <div className="hidden flex-1 items-center justify-center tablet:flex" style={{ minHeight: 0 }}>
                    {card.panelLeft ? (
                      <div className="overflow-hidden rounded-[12px] shadow-2xl" style={{ maxWidth: 500, maxHeight: "100%" }}>
                        <Image
                          src={card.panelLeft}
                          alt={`${card.title} panel`}
                          width={600}
                          height={400}
                          className="h-auto w-full object-contain"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalCard && typeof document !== "undefined" && createPortal(
        <ProductModal cardId={modalCard} onClose={closeModal} />,
        document.body
      )}
    </section>
  );
}
