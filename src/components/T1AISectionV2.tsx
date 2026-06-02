"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const MAX_PROMPT = 500;
const SIGNUP_BASE = "https://t1.com/mx/tienda";

const TYPING_PLACEHOLDERS = [
  "Quiero vender maquillaje, skincare y productos de belleza",
  "Quiero vender galletas, pasteles y postres hechos por mí",
  "Quiero vender accesorios para celular y tecnología",
  "Quiero vender comida y accesorios para mascotas",
  "Quiero vender decoración y artículos para el hogar",
  "Quiero vender ropa deportiva y artículos fitness",
];

type SlideId = "tienda" | "personaliza" | "productos" | "enrutamiento" | "riesgo";

const SLIDES: { id: SlideId; title: string; description: string; badge?: string }[] = [
  {
    id: "tienda",
    title: "Crea tu tienda en segundos",
    description:
      "Describe tu negocio y la IA genera tu tienda lista para vender en menos de 2 minutos.",
    badge: "Créala ahora",
  },
  {
    id: "personaliza",
    title: "Personaliza tu tienda",
    description:
      "Genera imágenes de producto, edita banners y personaliza textos con inteligencia artificial.",
  },
  {
    id: "productos",
    title: "Crea tus productos",
    description:
      "Sube una foto y la IA genera título, descripción y variantes automáticamente.",
  },
  {
    id: "enrutamiento",
    title: "Enrutamiento inteligente",
    description:
      "Nuestra IA elige la paquetería más rápida y económica para cada envío.",
  },
  {
    id: "riesgo",
    title: "Análisis de riesgo",
    description:
      "IA que evalúa el riesgo crediticio de cada transacción en tiempo real.",
  },
];

export default function T1AISectionV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [prompt, setPrompt] = useState("");
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Rotating typing placeholder for the "tienda" slide.
  // Updates the DOM `.placeholder` directly to avoid re-rendering on every char.
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    // Only animate when textarea exists, slide is "tienda", and user hasn't typed.
    if (active !== 0 || prompt.length > 0) return;

    let textIdx = 0;
    let charIdx = 0;
    let phase: "typing" | "pause" | "deleting" = "typing";
    let timer = 0;

    const tick = () => {
      const current = TYPING_PLACEHOLDERS[textIdx];
      if (phase === "typing") {
        if (charIdx < current.length) {
          charIdx++;
          ta.placeholder = current.slice(0, charIdx);
          timer = window.setTimeout(tick, 32);
        } else {
          phase = "pause";
          timer = window.setTimeout(tick, 1800);
        }
      } else if (phase === "pause") {
        phase = "deleting";
        timer = window.setTimeout(tick, 0);
      } else {
        if (charIdx > 0) {
          charIdx--;
          ta.placeholder = current.slice(0, charIdx);
          timer = window.setTimeout(tick, 18);
        } else {
          textIdx = (textIdx + 1) % TYPING_PLACEHOLDERS.length;
          phase = "typing";
          timer = window.setTimeout(tick, 250);
        }
      }
    };

    timer = window.setTimeout(tick, 400);
    return () => window.clearTimeout(timer);
  }, [active, prompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = prompt.trim();
    const target = trimmed
      ? `${SIGNUP_BASE}?prompt=${encodeURIComponent(trimmed)}`
      : SIGNUP_BASE;
    window.open(target, "_blank", "noopener,noreferrer");
  };

  // Horizontal swipe on touch devices → prev/next slide.
  // Ignores vertical swipes so native scroll (which also changes slides) keeps working.
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    let startX = 0;
    let startY = 0;

    const onStart = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      if (!e.changedTouches[0]) return;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      // Predominantly horizontal swipe with enough distance
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        if (dx < 0) nextRef.current();
        else prevRef.current();
      }
    };

    sec.addEventListener("touchstart", onStart, { passive: true });
    sec.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      sec.removeEventListener("touchstart", onStart);
      sec.removeEventListener("touchend", onEnd);
    };
  }, []);

  // Refs so the touch handlers always see the latest next/prev without re-binding
  const nextRef = useRef<() => void>(() => {});
  const prevRef = useRef<() => void>(() => {});

  // Horizontal carousel on all breakpoints — just set the active slide.
  const goToSlide = useCallback((i: number) => {
    setActive(i);
  }, []);

  const next = useCallback(
    () => goToSlide(Math.min(SLIDES.length - 1, activeRef.current + 1)),
    [goToSlide]
  );
  const prev = useCallback(
    () => goToSlide(Math.max(0, activeRef.current - 1)),
    [goToSlide]
  );

  // Keep refs in sync so the touch handlers can call the latest versions
  useEffect(() => {
    nextRef.current = next;
    prevRef.current = prev;
  }, [next, prev]);

  const slide = SLIDES[active];

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ background: "#FFF1EB" }}
    >
      <style jsx>{`
        .ai-carousel-hint {
          animation: aiCarouselNudge 1.6s ease-in-out infinite;
        }
        @keyframes aiCarouselNudge {
          0%, 100% { transform: translateX(0); opacity: 0.55; }
          50% { transform: translateX(4px); opacity: 1; }
        }
      `}</style>
      {/* Compact, content-sized horizontal carousel on every breakpoint.
          Slides change via the paginator / arrows / swipe — no scroll
          pinning and no full-viewport height. */}
      <div
        className="relative flex w-full flex-col overflow-hidden"
        style={{
          background:
            "radial-gradient(110% 70% at 15% 0%, rgba(255,195,185,0.95) 0%, transparent 55%), radial-gradient(90% 70% at 100% 30%, rgba(255,165,150,0.75) 0%, transparent 55%), radial-gradient(120% 80% at 50% 110%, rgba(255,210,200,0.85) 0%, transparent 60%), #FFF1EB",
        }}
      >
        {/* Decorative glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute"
            style={{
              top: "-10%",
              left: "-8%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(219,59,43,0.10) 0%, transparent 60%)",
              filter: "blur(90px)",
            }}
          />
          <div
            className="absolute"
            style={{
              top: "25%",
              right: "-12%",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,180,165,0.18) 0%, transparent 60%)",
              filter: "blur(100px)",
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: "-20%",
              left: "35%",
              width: 450,
              height: 450,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,236,232,0.55) 0%, transparent 55%)",
              filter: "blur(70px)",
            }}
          />
        </div>

        <div className="relative mx-auto flex w-full max-w-[var(--max-w)] flex-col px-5 py-10 tablet:px-6 tablet:py-14">
          {/* Layout: vertical on every breakpoint — title + description on
              top, visual below. Navigation arrows at the bottom. */}
          <div className="flex flex-col items-center gap-8 tablet:gap-10">

            {/* Text — IA title + active feature copy, centered */}
            <div className="flex flex-col items-center text-center">
              <h2
                className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]"
                style={{
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  marginBottom: 20,
                }}
              >
                La <span style={{ color: "#DB3B2B" }}>IA</span>, desde el primer día.
              </h2>

              <div
                key={`text-${slide.id}`}
                className="flex flex-col items-center"
                style={{ animation: "fadeSlideIn 0.45s ease-out" }}
              >
                <h3
                  className="font-inter text-[17px] font-medium text-black tablet:text-[18px] lg:text-[20px]"
                  style={{ letterSpacing: "-0.005em", lineHeight: 1.3, marginBottom: 8 }}
                >
                  {slide.title}
                </h3>
                <p
                  className="font-inter text-[15px] font-light leading-relaxed text-black/65 tablet:text-[16px]"
                  style={{ marginBottom: 0, maxWidth: 560 }}
                >
                  {slide.description}
                </p>
              </div>
            </div>

            {/* COL 3 — Visual.
                Mobile: flex-1 with capped max-height so taller visuals
                (mockup, gauge stack) don't bleed into the bottom indicator.
                Desktop: regular grid cell, centered via items-center. */}
            <div
              key={`visual-${slide.id}`}
              className="flex w-full max-w-[640px] items-center justify-center overflow-hidden"
              style={{ minHeight: 220, animation: "fadeSlideIn 0.5s ease-out" }}
            >
              {slide.id === "tienda" && (
                <div className="flex w-full max-w-[460px] flex-col">
                  <span
                    className="inline-flex w-fit items-center gap-2 rounded-full font-inter text-[12px] font-medium"
                    style={{
                      padding: "6px 14px 6px 10px",
                      background: "rgba(255,255,255,0.7)",
                      color: "#0A1F3F",
                      marginBottom: 14,
                      border: "1px solid rgba(10,31,63,0.18)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <span aria-hidden style={{ fontSize: 14 }}>✨</span>
                    Escribe qué vendes y crea tu tienda
                  </span>
                <form
                  onSubmit={handleSubmit}
                  className="ai-prompt-form w-full rounded-[18px] border bg-white/85 backdrop-blur-sm transition-all duration-200 focus-within:border-[#DB3B2B] focus-within:shadow-[0_0_0_4px_rgba(219,59,43,0.08)]"
                  style={{
                    borderColor: "rgba(0,0,0,0.10)",
                    padding: "20px 20px 16px",
                  }}
                >
                  <textarea
                    ref={textareaRef}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value.slice(0, MAX_PROMPT))}
                    placeholder=""
                    rows={4}
                    maxLength={MAX_PROMPT}
                    aria-label="Describe tu negocio"
                    className="w-full resize-none border-none bg-transparent font-inter text-[15px] text-black outline-none placeholder:text-black/40"
                    style={{ minHeight: 120, lineHeight: 1.5 }}
                  />
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-inter text-[12px] text-black/40">
                      {prompt.length}/{MAX_PROMPT}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Describir por voz"
                        title="Describir por voz"
                        className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-black/10 bg-white text-black/60 transition-all duration-200 hover:border-black/20 hover:text-black"
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <rect x="6" y="2" width="4" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M3.5 8C3.5 10.4853 5.51472 12.5 8 12.5C10.4853 12.5 12.5 10.4853 12.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M8 12.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </button>
                      <button
                        type="submit"
                        disabled={!prompt.trim()}
                        aria-label="Crear tienda con IA"
                        className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#DB3B2B] text-white transition-all duration-200 hover:bg-[#C0332A] hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M8 13V3M8 3L4 7M8 3L12 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
                </div>
              )}
              {slide.id === "personaliza" && <VisualPersonaliza />}
              {slide.id === "productos" && <VisualProductos />}
              {slide.id === "enrutamiento" && <VisualEnrutamiento />}
              {slide.id === "riesgo" && <VisualRiesgo />}
            </div>
          </div>

          {/* Horizontal carousel controls — shown on every breakpoint now.
              Circular prev/next arrows with a dot paginator between them. */}
          <div
            className="z-30 mt-10 flex items-center justify-center gap-4 tablet:mt-12"
          >
            <button
              type="button"
              onClick={() => {
                if (active > 0) goToSlide(active - 1);
              }}
              disabled={active === 0}
              aria-label="Anterior"
              className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-black/45 transition-all duration-150 hover:border-black/25 hover:text-black disabled:opacity-30"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 4L6 8L10 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToSlide(i)}
                  aria-label={`Ir a ${s.title}`}
                  aria-current={i === active}
                  className="cursor-pointer border-none p-0 transition-all duration-300"
                  style={{
                    width: i === active ? 11 : 8,
                    height: i === active ? 11 : 8,
                    borderRadius: "50%",
                    background: i === active ? "#DB3B2B" : "rgba(0,0,0,0.20)",
                    boxShadow: i === active ? "0 0 0 4px rgba(219,59,43,0.10)" : "none",
                  }}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                if (active < SLIDES.length - 1) goToSlide(active + 1);
              }}
              disabled={active === SLIDES.length - 1}
              aria-label="Siguiente"
              className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-black/45 transition-all duration-150 hover:border-black/25 hover:text-black disabled:opacity-30"
            >
              <svg
                className={active < SLIDES.length - 1 ? "ai-carousel-hint" : ""}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── Visuals ───── */

const PERSONALIZA_BANNERS = [
  { src: "/img/banner1.png", prompt: "mujer corriendo con outfit deportivo en ciudad moderna y estilo limpio" },
  { src: "/img/banner2.png", prompt: "hombre y mujer corriendo, con look deportivo moderno" },
  { src: "/img/banner3.png", prompt: "mujer en pose fitness en espacio minimalista y estilo elegante" },
];

const PERSONALIZA_PRODUCTS = [
  { name: "Tenis Runner", price: "$1,299", src: "/img/tenis-transparente.png" },
  { name: "Gorra Sport", price: "$349", src: "/img/gorra.png" },
  { name: "Playera Pro", price: "$499", src: "/img/playera.png" },
];

function VisualPersonaliza() {
  // Sequence: shown → typing (next prompt) → loading → swap banner → shown ...
  const [bannerIdx, setBannerIdx] = useState(0);
  const [phase, setPhase] = useState<"shown" | "typing" | "loading">("shown");
  const [typedPrompt, setTypedPrompt] = useState(PERSONALIZA_BANNERS[0].prompt);

  useEffect(() => {
    let timer: number | undefined;

    if (phase === "shown") {
      // Hold the current banner with the just-typed prompt visible,
      // then start typing the next banner's prompt.
      timer = window.setTimeout(() => {
        setTypedPrompt("");
        setPhase("typing");
      }, 1800);
    } else if (phase === "typing") {
      // Type out the NEXT banner's prompt (the one that will appear after loading).
      const nextIdx = (bannerIdx + 1) % PERSONALIZA_BANNERS.length;
      const fullText = PERSONALIZA_BANNERS[nextIdx].prompt;
      let charIdx = 0;
      const tick = () => {
        charIdx++;
        setTypedPrompt(fullText.slice(0, charIdx));
        if (charIdx < fullText.length) {
          timer = window.setTimeout(tick, 28);
        } else {
          // Pause briefly after typing completes, then enter loading.
          timer = window.setTimeout(() => setPhase("loading"), 700);
        }
      };
      timer = window.setTimeout(tick, 250);
    } else if (phase === "loading") {
      // Loading state: dim banner + sparkles, then swap to next banner.
      timer = window.setTimeout(() => {
        setBannerIdx((i) => (i + 1) % PERSONALIZA_BANNERS.length);
        setPhase("shown");
      }, 1500);
    }

    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [phase, bannerIdx]);

  const current = PERSONALIZA_BANNERS[bannerIdx];

  // Callout markup is reused in two places (absolute over the desktop mockup,
  // stacked under the mobile mockup), so keep it as a small inline render fn.
  const renderCallout = () => (
    <div
      className="flex flex-col gap-2 rounded-[14px] bg-white"
      style={{
        padding: "14px 14px 12px",
        boxShadow:
          "0 20px 44px -14px rgba(219,59,43,0.30), 0 4px 14px -4px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-center gap-1.5">
        <svg width="13" height="13" viewBox="0 0 28 28" fill="none">
          <path
            d="M14 3L16.5 10.5L24 13L16.5 15.5L14 23L11.5 15.5L4 13L11.5 10.5L14 3Z"
            stroke="#DB3B2B"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="rgba(219,59,43,0.15)"
          />
        </svg>
        <span
          className="font-inter text-[10px] font-semibold uppercase tracking-wide"
          style={{ color: "#DB3B2B" }}
        >
          Generar imagen
        </span>
      </div>
      <p
        className="font-inter text-[12px] font-light text-black/80"
        style={{ lineHeight: 1.4, minHeight: 50 }}
      >
        {typedPrompt}
        {phase === "typing" && <span className="vp2-cursor" aria-hidden>|</span>}
      </p>
      <div className="flex items-center justify-between">
        <span className="font-inter text-[9px] text-black/35">
          {phase === "loading"
            ? "Generando…"
            : phase === "typing"
            ? "Escribiendo…"
            : "Imagen lista"}
        </span>
        <button
          type="button"
          aria-label="Generar"
          className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#DB3B2B] text-white"
        >
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 13V3M8 3L4 7M8 3L12 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 tablet:flex-row tablet:items-center tablet:gap-5">
      {/* DESKTOP — browser-shaped mockup + absolute callout overlapping top */}
      <div className="relative hidden shrink-0 tablet:block" style={{ width: 360 }}>
      <div
        className="vp2-mockup-desktop w-full overflow-hidden rounded-[16px] bg-white"
        style={{
          boxShadow: "0 24px 60px -16px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04)",
        }}
      >
        {/* Browser bar */}
        <div className="flex items-center gap-1.5 border-b border-black/[0.05] px-3 py-2">
          <span className="h-[8px] w-[8px] rounded-full bg-[#FF5F57]" />
          <span className="h-[8px] w-[8px] rounded-full bg-[#FEBC2E]" />
          <span className="h-[8px] w-[8px] rounded-full bg-[#28C840]" />
          <span className="ml-2 rounded-full bg-black/[0.04] px-2 py-0.5 font-inter text-[9px] text-black/40">
            mitienda.t1.com
          </span>
        </div>

        {/* Store header */}
        <div className="flex items-center justify-between border-b border-black/[0.05] px-4 py-2.5">
          <span className="font-sora text-[11px] font-bold tracking-tight text-black">
            mitienda
          </span>
          <div className="flex items-center gap-3 font-inter text-[9px] font-medium text-black/55">
            <span>Tienda</span>
            <span>Catálogo</span>
            <span>🛒</span>
          </div>
        </div>

        {/* Banner */}
        <div className="relative overflow-hidden" style={{ height: 170, background: "#F6F1EE" }}>
          <Image
            key={`banner-d-${bannerIdx}`}
            src={current.src}
            alt=""
            fill
            sizes="360px"
            className="object-cover"
            style={{
              objectPosition: "center 22%",
              opacity: phase === "loading" ? 0.35 : 1,
              transform: phase === "loading" ? "scale(1.03)" : "scale(1)",
              transition: "opacity 0.45s ease, transform 0.6s ease",
            }}
          />
          <div
            className="absolute"
            style={{
              left: 16, bottom: 14, zIndex: 1,
              opacity: phase === "loading" ? 0.4 : 1,
              transition: "opacity 0.45s ease",
            }}
          >
            <p
              className="font-inter text-[9px] font-semibold uppercase text-white/85"
              style={{
                letterSpacing: "0.12em",
                marginBottom: 4,
                textShadow: "0 1px 6px rgba(0,0,0,0.35)",
              }}
            >
              Colección Fitness
            </p>
            <p
              className="font-sora text-[17px] font-light text-white"
              style={{
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
                textShadow: "0 2px 10px rgba(0,0,0,0.40)",
              }}
            >
              Tu mejor versión<br />en movimiento
            </p>
          </div>
          {phase === "loading" && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Loading badge — solo spark icon, sin texto "Generando con IA" */}
              <div
                className="flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm"
                style={{
                  width: 36,
                  height: 36,
                  boxShadow: "0 8px 24px -8px rgba(0,0,0,0.20)",
                }}
              >
                <svg className="vp2-spin" width="16" height="16" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M14 3L16.5 10.5L24 13L16.5 15.5L14 23L11.5 15.5L4 13L11.5 10.5L14 3Z"
                    stroke="#DB3B2B" strokeWidth="1.5" strokeLinejoin="round"
                    fill="rgba(219,59,43,0.20)"
                  />
                </svg>
              </div>
              <span className="vp2-spark vp2-spark-a" />
              <span className="vp2-spark vp2-spark-b" />
              <span className="vp2-spark vp2-spark-c" />
              <span className="vp2-spark vp2-spark-d" />
            </div>
          )}
        </div>

        {/* Products */}
        <div className="grid grid-cols-3 gap-2 px-3 py-3">
          {PERSONALIZA_PRODUCTS.map((p) => (
            <div key={p.name} className="overflow-hidden rounded-[8px] bg-[#F6F1EE]" style={{ aspectRatio: "1 / 1.1" }}>
              <div className="flex h-[68%] items-center justify-center">
                <Image src={p.src} alt={p.name} width={50} height={40} className="object-contain opacity-90" style={{ maxHeight: 50, width: "auto" }} />
              </div>
              <div className="px-2 pb-1.5">
                <p className="font-inter text-[8px] font-semibold leading-tight text-black/75" style={{ marginBottom: 1 }}>
                  {p.name}
                </p>
                <p className="font-inter text-[8px] font-medium text-[#DB3B2B]">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Desktop callout — overlaps the right side of the mockup. */}
      <div
        className="vp2-callout absolute z-10"
        style={{ top: 130, right: -100, width: 220 }}
      >
        {renderCallout()}
      </div>
      </div>

      {/* MOBILE — store mockup without phone chrome (no status bar, no
          dynamic island). Just a browser-card-style container. */}
      <div className="relative shrink-0 tablet:hidden" style={{ width: 240 }}>
      <div
        className="overflow-hidden bg-white"
        style={{
          borderRadius: 16,
          boxShadow:
            "0 24px 60px -16px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center justify-between border-b border-black/[0.05] px-3 py-2">
          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-black/[0.06]">
            <span className="h-[2px] w-[10px] rounded bg-black/55" />
          </span>
          <span className="font-sora text-[10px] font-bold tracking-tight text-black">
            mitienda
          </span>
          <span className="font-inter text-[12px] text-black/55">🛒</span>
        </div>

        <div className="relative overflow-hidden" style={{ height: 120, background: "#F6F1EE" }}>
          <Image
            key={`banner-m-${bannerIdx}`}
            src={current.src}
            alt=""
            fill
            sizes="240px"
            className="object-cover"
            style={{
              objectPosition: "center 22%",
              opacity: phase === "loading" ? 0.35 : 1,
              transform: phase === "loading" ? "scale(1.03)" : "scale(1)",
              transition: "opacity 0.45s ease, transform 0.6s ease",
            }}
          />
          <div className="absolute" style={{ left: 12, bottom: 10, zIndex: 1, opacity: phase === "loading" ? 0.35 : 1, transition: "opacity 0.45s ease" }}>
            <p className="font-inter text-[8px] font-semibold uppercase text-white/85" style={{ letterSpacing: "0.10em", marginBottom: 2, textShadow: "0 1px 5px rgba(0,0,0,0.40)" }}>
              Colección Fitness
            </p>
            <p className="font-sora text-[15px] font-light text-white" style={{ letterSpacing: "-0.01em", lineHeight: 1.1, textShadow: "0 2px 10px rgba(0,0,0,0.40)" }}>
              Tu mejor versión<br />en movimiento
            </p>
          </div>
          {phase === "loading" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm"
                style={{
                  width: 30,
                  height: 30,
                  boxShadow: "0 8px 24px -8px rgba(0,0,0,0.20)",
                }}
              >
                <svg className="vp2-spin" width="14" height="14" viewBox="0 0 28 28" fill="none">
                  <path d="M14 3L16.5 10.5L24 13L16.5 15.5L14 23L11.5 15.5L4 13L11.5 10.5L14 3Z" stroke="#DB3B2B" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(219,59,43,0.20)" />
                </svg>
              </div>
              <span className="vp2-spark vp2-spark-a" />
              <span className="vp2-spark vp2-spark-b" />
              <span className="vp2-spark vp2-spark-c" />
              <span className="vp2-spark vp2-spark-d" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-1.5 px-2 py-2.5">
          {PERSONALIZA_PRODUCTS.map((p) => (
            <div key={p.name} className="overflow-hidden rounded-[6px] bg-[#F6F1EE]" style={{ aspectRatio: "1 / 1.15" }}>
              <div className="flex h-[64%] items-center justify-center">
                <Image src={p.src} alt={p.name} width={42} height={32} className="object-contain opacity-90" style={{ maxHeight: 42, width: "auto" }} />
              </div>
              <div className="px-1.5 pb-1">
                <p className="font-inter text-[7px] font-semibold leading-tight text-black/75" style={{ marginBottom: 1 }}>
                  {p.name}
                </p>
                <p className="font-inter text-[7px] font-medium text-[#DB3B2B]">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Mobile callout — overlaps the banner area of the phone, anchored
          near the bottom of the visible mockup so it doesn't compete with
          the IA title above. */}
      <div
        className="vp2-callout absolute z-10"
        style={{ top: 135, left: -10, width: 200 }}
      >
        {renderCallout()}
      </div>
      </div>

      <style jsx>{`
        .vp2-spin {
          animation: vp2Spin 1.2s linear infinite;
        }
        @keyframes vp2Spin {
          to { transform: rotate(360deg); }
        }
        .vp2-spark {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #DB3B2B;
          box-shadow: 0 0 10px rgba(219,59,43,0.7);
          opacity: 0;
        }
        .vp2-spark-a { top: 22%; left: 18%; animation: vp2Spark 1.3s ease-in-out 0s infinite; }
        .vp2-spark-b { top: 68%; left: 22%; animation: vp2Spark 1.3s ease-in-out 0.32s infinite; }
        .vp2-spark-c { top: 28%; left: 78%; animation: vp2Spark 1.3s ease-in-out 0.6s infinite; }
        .vp2-spark-d { top: 72%; left: 72%; animation: vp2Spark 1.3s ease-in-out 0.95s infinite; }
        @keyframes vp2Spark {
          0%, 100% { opacity: 0; transform: scale(0.4); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .vp2-cursor {
          display: inline-block;
          width: 1px;
          margin-left: 2px;
          background: #DB3B2B;
          animation: vp2Blink 0.8s steps(2, end) infinite;
          color: transparent;
        }
        @keyframes vp2Blink {
          50% { opacity: 0; }
        }
        .vp2-callout {
          animation: vp2CalloutIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes vp2CalloutIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

/* ── VisualProductos (Stripe-pattern static composition) ──
   Desktop: horizontal (photo · dashed line · mini-card).
   Mobile: diagonal — product photo top-left, mini-card bottom-right, they
   slightly overlap; the dashed connector lives outside the overlap. */
function VisualProductos() {
  const photoSquare = (
    <div
      className="flex shrink-0 items-center justify-center rounded-[14px] bg-[#F6F6F6]"
      style={{ width: 120, height: 120 }}
    >
      <Image
        src="/img/tenis-transparente.png"
        alt=""
        width={92}
        height={68}
        className="object-contain"
        style={{ maxHeight: 80, width: "auto" }}
      />
    </div>
  );

  const productCard = (
    <div
      className="relative rounded-[14px] bg-white"
      style={{
        padding: "14px 14px 12px",
        boxShadow: "0 14px 32px -10px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
        width: 220,
      }}
    >
      <div className="flex items-start gap-3" style={{ marginBottom: 8 }}>
        <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-[#F6F6F6]">
          <Image
            src="/img/tenis-transparente.png"
            alt=""
            width={30}
            height={22}
            className="object-contain"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <p className="font-sora text-[12px] font-semibold text-black" style={{ lineHeight: 1.3, marginBottom: 2 }}>
            Tenis blancos clásicos
          </p>
          <p className="font-inter text-[11px] font-bold tabular-nums" style={{ color: "#0A1F3F" }}>
            $1,345.99 MXN
          </p>
        </div>
      </div>

      <p className="font-inter text-[10px] font-light text-black/65" style={{ lineHeight: 1.5, marginBottom: 8 }}>
        Tenis casuales de piel sintética, ideales para el día a día.
      </p>

      <p className="font-inter text-[9px] font-medium text-black/45">
        Calzado · Hombre · Casual
      </p>

      <div
        className="absolute flex items-center gap-1 rounded-full"
        style={{
          top: -8,
          right: 12,
          padding: "3px 8px 3px 6px",
          background: "#DB3B2B",
          boxShadow: "0 6px 14px -4px rgba(219,59,43,0.40)",
        }}
      >
        <svg width="9" height="9" viewBox="0 0 28 28" fill="none">
          <path d="M14 3L16.5 10.5L24 13L16.5 15.5L14 23L11.5 15.5L4 13L11.5 10.5L14 3Z" fill="white" />
        </svg>
        <span className="font-inter text-[8px] font-bold uppercase tracking-wide text-white" style={{ letterSpacing: "0.08em" }}>
          Creada con IA
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP — horizontal row: photo · line · card */}
      <div className="hidden items-center justify-center gap-0 tablet:flex">
        {photoSquare}
        <svg
          aria-hidden
          width="64"
          height="14"
          viewBox="0 0 64 14"
          fill="none"
          style={{ overflow: "visible" }}
        >
          <line
            x1="0" y1="7" x2="60" y2="7"
            stroke="#0A1F3F"
            strokeWidth="1.4"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
          <circle cx="62" cy="7" r="2.5" fill="#0A1F3F" />
        </svg>
        {productCard}
      </div>

      {/* MOBILE — diagonal: photo top-left, card bottom-right, overlap,
          dashed connector outside the overlap going from photo top-right
          corner area down to the card top-left corner area. */}
      <div className="relative tablet:hidden" style={{ width: 260, height: 230, margin: "0 auto" }}>
        {/* Photo: anchored top-left */}
        <div className="absolute" style={{ top: 0, left: 0, zIndex: 1 }}>
          {photoSquare}
        </div>

        {/* Card: anchored bottom-right, slightly overlapping the photo
            (its top-left corner sits behind the photo's bottom-right). */}
        <div className="absolute" style={{ bottom: 0, right: 0, zIndex: 2 }}>
          {productCard}
        </div>

        {/* Dashed connector — sits OUTSIDE the overlap, going from the
            photo's right edge down/right to the card's top-left area. */}
        <svg
          aria-hidden
          className="absolute"
          style={{ top: 18, left: 102, width: 64, height: 80, overflow: "visible", zIndex: 3 }}
          viewBox="0 0 64 80"
          fill="none"
        >
          <path
            d="M 4 4 C 30 4 30 70 60 70"
            stroke="#0A1F3F"
            strokeWidth="1.4"
            strokeDasharray="4 4"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="60" cy="70" r="2.5" fill="#0A1F3F" />
        </svg>
      </div>
    </>
  );
}

function VisualEnrutamiento() {
  // All white boxes are 50x50 squares; dots animate along the dashed curves.
  return (
    <div className="relative h-[280px] w-full max-w-[420px]">
      {/* T1 box — centered left */}
      <div className="absolute" style={{ left: 20, top: "50%", transform: "translateY(-50%)" }}>
        <div
          className="flex h-[50px] w-[50px] items-center justify-center rounded-[12px] bg-white"
          style={{ boxShadow: "0 10px 30px -8px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)" }}
        >
          <svg width="26" height="24" viewBox="0 0 45 44" fill="none">
            <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457V19.1513V19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#D93A26" />
            <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592H22.4335H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#D93A26" />
          </svg>
        </div>
      </div>

      {/* FedEx — top right */}
      <div className="absolute" style={{ right: 20, top: 10 }}>
        <div
          className="flex h-[50px] w-[50px] items-center justify-center rounded-[12px] bg-white"
          style={{ boxShadow: "0 8px 24px -8px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)" }}
        >
          <Image src="/img/icons/fedex-logo.svg" alt="FedEx" width={36} height={20} className="object-contain" />
        </div>
      </div>

      {/* DHL — middle right */}
      <div className="absolute" style={{ right: 20, top: "50%", transform: "translateY(-50%)" }}>
        <div
          className="flex h-[50px] w-[50px] items-center justify-center rounded-[12px] bg-white"
          style={{ boxShadow: "0 8px 24px -8px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)" }}
        >
          <Image src="/img/dhl-iso.svg" alt="DHL" width={36} height={20} className="object-contain" />
        </div>
      </div>

      {/* 99min — bottom right */}
      <div className="absolute" style={{ right: 20, bottom: 10 }}>
        <div
          className="flex h-[50px] w-[50px] items-center justify-center rounded-[12px] bg-white"
          style={{ boxShadow: "0 8px 24px -8px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)" }}
        >
          <Image src="/img/99min-iso.svg" alt="99min" width={36} height={20} className="object-contain" />
        </div>
      </div>

      {/* Connectors + animated dots — track between T1 (right edge x≈70) and carriers (left edge x≈container-70) */}
      <div
        className="absolute"
        style={{
          left: 70,
          top: 10,
          right: 70,
          bottom: 10,
          height: "calc(100% - 20px)",
        }}
      >
        <svg className="h-full w-full" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
          <path d="M0 50 C25 50, 50 11, 100 11" stroke="rgba(226,97,83,0.45)" strokeWidth="1" fill="none" strokeDasharray="3 3" />
          <path d="M0 50 C25 50, 50 50, 100 50" stroke="rgba(226,97,83,0.55)" strokeWidth="1" fill="none" strokeDasharray="3 3" />
          <path d="M0 50 C25 50, 50 89, 100 89" stroke="rgba(226,97,83,0.45)" strokeWidth="1" fill="none" strokeDasharray="3 3" />
        </svg>
      </div>
    </div>
  );
}

function VisualRiesgo() {
  // Fully static — no ring-fill animation, no counter, no slide-in card.
  return (
    <div className="relative flex flex-col items-center justify-center gap-3 tablet:gap-5">
      <svg
        viewBox="0 0 110 110"
        fill="none"
        className="h-[150px] w-[150px] tablet:h-[220px] tablet:w-[220px]"
      >
        <circle cx="55" cy="55" r="48" stroke="rgba(0,0,0,0.04)" strokeWidth="6" />
        <circle
          cx="55" cy="55" r="48"
          stroke="#DB3B2B" strokeWidth="6" strokeLinecap="round"
          transform="rotate(-90 55 55)"
          strokeDasharray="260 302"
        />
        <circle cx="55" cy="55" r="36" stroke="rgba(0,0,0,0.03)" strokeWidth="5" />
        <circle
          cx="55" cy="55" r="36"
          stroke="#E26153" strokeWidth="5" strokeLinecap="round"
          transform="rotate(-90 55 55)"
          strokeDasharray="150 226"
        />
        <circle cx="55" cy="55" r="25" stroke="rgba(0,0,0,0.02)" strokeWidth="4" />
        <circle
          cx="55" cy="55" r="25"
          stroke="#F2876A" strokeWidth="4" strokeLinecap="round"
          transform="rotate(-90 55 55)"
          strokeDasharray="90 157"
        />
        <text x="55" y="61" textAnchor="middle" style={{ fontSize: 18, fontWeight: 700, fill: "rgba(0,0,0,0.75)" }}>
          78
        </text>
      </svg>

      {/* Result card — static, no slide-in animation */}
      <div
        className="vr-result-card flex w-full max-w-[300px] items-center gap-3 rounded-[14px] bg-white"
        style={{
          padding: "12px 14px",
          boxShadow: "0 14px 36px -12px rgba(219,59,43,0.20), 0 0 0 1px rgba(0,0,0,0.04)",
        }}
      >
        <div
          className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full"
          style={{ background: "rgba(219,59,43,0.10)" }}
        >
          <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 3L16.5 10.5L24 13L16.5 15.5L14 23L11.5 15.5L4 13L11.5 10.5L14 3Z"
              stroke="#DB3B2B"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="#DB3B2B"
              opacity="0.9"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <p className="font-inter text-[13px] font-semibold text-black" style={{ lineHeight: 1.25, marginBottom: 2 }}>
            Transacción rechazada
          </p>
          <p className="font-inter text-[12px] font-light text-black/55" style={{ lineHeight: 1.3 }}>
            Cliente de alto riesgo
          </p>
        </div>
      </div>
    </div>
  );
}
