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

  // Scroll-driven slide change: section is tall (N * 100vh), the inner is sticky.
  // As the user scrolls through the section, we map scroll progress → active slide.
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = sec.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionHeight = sec.offsetHeight;
        const viewportHeight = window.innerHeight;
        const maxScroll = Math.max(1, sectionHeight - viewportHeight);
        const scrolledInto = Math.max(0, window.scrollY - sectionTop);
        const progress = Math.max(0, Math.min(0.9999, scrolledInto / maxScroll));
        const newActive = Math.min(
          SLIDES.length - 1,
          Math.floor(progress * SLIDES.length)
        );
        if (newActive !== activeRef.current) {
          setActive(newActive);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

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

  // Scroll page to a specific slide's range (used by arrows + number buttons)
  const goToSlide = useCallback((i: number) => {
    const sec = sectionRef.current;
    if (!sec) return;
    const sectionTop = sec.getBoundingClientRect().top + window.scrollY;
    const sectionHeight = sec.offsetHeight;
    const viewportHeight = window.innerHeight;
    const maxScroll = Math.max(1, sectionHeight - viewportHeight);
    // Land near the middle of slide i's range
    const target = sectionTop + ((i + 0.5) / SLIDES.length) * maxScroll;
    window.scrollTo({ top: target, behavior: "smooth" });
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
      style={{
        // Use dvh on mobile to avoid the address-bar height jump.
        height: `${SLIDES.length * 100}dvh`,
        background: "#FFF1EB",
      }}
    >
      <style jsx>{`
        .ai-prompt-form {
          animation: aiPromptPulse 2.8s ease-in-out infinite;
        }
        .ai-prompt-form:focus-within {
          animation: none;
          box-shadow: 0 0 0 4px rgba(219, 59, 43, 0.08) !important;
        }
        @keyframes aiPromptPulse {
          0%, 100% {
            box-shadow:
              0 16px 40px -16px rgba(219, 59, 43, 0.18),
              0 0 0 0 rgba(219, 59, 43, 0.18);
          }
          50% {
            box-shadow:
              0 18px 44px -14px rgba(219, 59, 43, 0.32),
              0 0 0 10px rgba(219, 59, 43, 0.04);
          }
        }
        .ai-scroll-hint {
          animation: aiScrollBounce 1.8s ease-in-out infinite;
        }
        @keyframes aiScrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(4px); opacity: 1; }
        }
      `}</style>
      {/* Sticky inner — stays in view while the user scrolls through the section. */}
      <div
        className="sticky top-0 flex w-full flex-col overflow-hidden"
        style={{
          height: "100dvh",
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

        <div className="relative mx-auto flex h-full w-full max-w-[var(--max-w)] flex-col px-5 pb-10 pt-24 tablet:px-6 tablet:pb-20 tablet:pt-56">
          {/* Grid:
              - mobile: single column, items reordered (text → visual → paginator at bottom)
              - tablet+: 3 columns [paginator | text | visual]
              items-start so the IA title keeps a stable Y position when the
              feature content under it changes size between slides. */}
          <div className="grid flex-1 grid-cols-1 items-start gap-6 tablet:grid-cols-[60px_1fr_1fr] tablet:items-center tablet:gap-12">
            {/* COL 1 — Paginator
                Desktop only: vertical column on the left.
                Hidden on mobile because horizontal dots imply a swipe gesture
                that conflicts with the vertical scroll-driven carousel. */}
            <div className="order-3 hidden flex-col items-center justify-center gap-3 tablet:order-none tablet:flex">
              <button
                type="button"
                onClick={prev}
                aria-label="Anterior"
                className="hidden h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-black/55 transition-colors duration-200 hover:text-black disabled:opacity-30 tablet:flex"
                disabled={active === 0}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 10L8 5L13 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToSlide(i)}
                  aria-label={`Ir a ${s.title}`}
                  aria-current={i === active}
                  className="cursor-pointer border-none p-0 transition-all duration-300"
                  style={{
                    width: i === active ? 12 : 8,
                    height: i === active ? 12 : 8,
                    borderRadius: "50%",
                    background: i === active ? "#DB3B2B" : "rgba(0,0,0,0.22)",
                    boxShadow:
                      i === active ? "0 0 0 4px rgba(219,59,43,0.10)" : "none",
                  }}
                />
              ))}
              <button
                type="button"
                onClick={next}
                aria-label="Siguiente"
                className="hidden h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-black/55 transition-colors duration-200 hover:text-black disabled:opacity-30 tablet:flex"
                disabled={active === SLIDES.length - 1}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* COL 2 — Text (IA title at top, feature content below) */}
            <div className="order-1 flex flex-col tablet:order-none">
              <h2
                className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]"
                style={{
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  marginBottom: 28,
                }}
              >
                La <span style={{ color: "#DB3B2B" }}>IA</span>, desde
                <br />
                el primer día.
              </h2>

              <div
                key={`text-${slide.id}`}
                className="flex flex-col"
                style={{ animation: "fadeSlideIn 0.45s ease-out" }}
              >
                <h3
                  className="font-inter text-[17px] font-medium text-black tablet:text-[18px] lg:text-[20px]"
                  style={{ letterSpacing: "-0.005em", lineHeight: 1.3, marginBottom: 10 }}
                >
                  {slide.title}
                </h3>
                <p
                  className="font-inter text-[15px] font-light leading-relaxed text-black/65 tablet:text-[16px]"
                  style={{ marginBottom: 0, maxWidth: 480 }}
                >
                  {slide.description}
                </p>
              </div>
            </div>

            {/* COL 3 — Visual (centered vertically in its column) */}
            <div
              key={`visual-${slide.id}`}
              className="order-2 flex items-center justify-center tablet:order-none"
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
                    <span aria-hidden style={{ fontSize: 14 }}>👋</span>
                    Cuéntame qué vendes
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

          {/* Mobile-only scroll hint — bouncing chevron + counter, replaces
              the horizontal dot paginator (which implied a swipe gesture
              that conflicts with vertical scroll). */}
          <div className="mt-3 flex flex-col items-center gap-1 tablet:hidden">
            <span className="font-inter text-[10px] font-medium tracking-wide text-black/40">
              {active + 1} / {SLIDES.length}
            </span>
            {active < SLIDES.length - 1 && (
              <svg
                className="ai-scroll-hint"
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 6L8 11L13 6"
                  stroke="rgba(0,0,0,0.45)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
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
              <div
                className="flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm"
                style={{ padding: "8px 14px", boxShadow: "0 8px 24px -8px rgba(0,0,0,0.20)" }}
              >
                <svg className="vp2-spin" width="13" height="13" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M14 3L16.5 10.5L24 13L16.5 15.5L14 23L11.5 15.5L4 13L11.5 10.5L14 3Z"
                    stroke="#DB3B2B" strokeWidth="1.5" strokeLinejoin="round"
                    fill="rgba(219,59,43,0.20)"
                  />
                </svg>
                <span className="font-inter text-[11px] font-medium text-[#DB3B2B]">
                  Generando imagen…
                </span>
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
      {/* Desktop callout — overlaps the top-right of the mockup
          (roughly 200px left + 200px up from its previous beside-the-mockup spot). */}
      <div
        className="vp2-callout absolute z-10"
        style={{ top: 30, right: -30, width: 220 }}
      >
        {renderCallout()}
      </div>
      </div>

      {/* MOBILE — phone-shaped mockup (< tablet) */}
      <div
        className="relative shrink-0 overflow-hidden bg-white tablet:hidden"
        style={{
          width: 240,
          borderRadius: 26,
          boxShadow:
            "0 24px 60px -16px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.04), inset 0 0 0 2px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center justify-between px-4 py-1.5" style={{ background: "#F6F1EE" }}>
          <span className="font-inter text-[9px] font-semibold text-black/70">9:41</span>
          <div className="flex h-[12px] w-[40px] items-center justify-center rounded-full bg-black/85">
            <span className="h-[5px] w-[5px] rounded-full bg-black/40" />
          </div>
          <span className="flex items-center gap-0.5">
            <span className="h-[4px] w-[4px] rounded-full bg-black/70" />
            <span className="h-[5px] w-[4px] rounded-sm bg-black/70" />
            <span className="h-[7px] w-[12px] rounded-[2px] bg-black/70" />
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-black/[0.05] px-3 py-2">
          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-black/[0.06]">
            <span className="h-[2px] w-[10px] rounded bg-black/55" />
          </span>
          <span className="font-sora text-[10px] font-bold tracking-tight text-black">
            mitienda
          </span>
          <span className="font-inter text-[12px] text-black/55">🛒</span>
        </div>

        <div className="relative overflow-hidden" style={{ height: 160, background: "#F6F1EE" }}>
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
              <div className="flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm" style={{ padding: "6px 10px", boxShadow: "0 8px 24px -8px rgba(0,0,0,0.20)" }}>
                <svg className="vp2-spin" width="11" height="11" viewBox="0 0 28 28" fill="none">
                  <path d="M14 3L16.5 10.5L24 13L16.5 15.5L14 23L11.5 15.5L4 13L11.5 10.5L14 3Z" stroke="#DB3B2B" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(219,59,43,0.20)" />
                </svg>
                <span className="font-inter text-[10px] font-medium text-[#DB3B2B]">Generando…</span>
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

      {/* Mobile callout — stacked under the phone (only renders on < tablet) */}
      <div className="vp2-callout w-full max-w-[220px] shrink-0 tablet:hidden">
        {renderCallout()}
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

function VisualProductos() {
  // 3-stage timeline: photo → loading with sparkles → full info
  const [stage, setStage] = useState<"photo" | "loading" | "complete">("photo");

  useEffect(() => {
    const t1 = window.setTimeout(() => setStage("loading"), 800);
    const t2 = window.setTimeout(() => setStage("complete"), 2200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className="relative w-full max-w-[400px] rounded-[18px] bg-white/85 backdrop-blur-sm"
      style={{
        padding: "22px",
        boxShadow: "0 20px 50px -16px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04)",
        minHeight: 280,
      }}
    >
      <div className="flex items-center gap-4" style={{ marginBottom: 16 }}>
        <div className="relative flex h-[90px] w-[100px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-black/[0.06]">
          <Image
            src="/img/tenis-transparente.png"
            alt=""
            width={80}
            height={64}
            className="object-contain"
          />
          {/* Sparkles overlay during loading */}
          {stage === "loading" && (
            <>
              <span className="vp-spark vp-spark-1" />
              <span className="vp-spark vp-spark-2" />
              <span className="vp-spark vp-spark-3" />
              <span className="vp-spark vp-spark-4" />
            </>
          )}
        </div>

        {/* Title area — shows skeleton during loading, real text on complete */}
        <div className="flex flex-1 flex-col gap-2">
          {stage === "photo" && (
            <div className="vp-fade-in" key="title-photo">
              <div className="h-[10px] w-[60%] rounded-full bg-black/[0.06]" />
            </div>
          )}
          {stage === "loading" && (
            <div className="vp-fade-in flex flex-col gap-2" key="title-loading">
              <div className="vp-shimmer h-[10px] w-[80%] rounded-full" />
              <div className="vp-shimmer h-[10px] w-[50%] rounded-full" />
            </div>
          )}
          {stage === "complete" && (
            <p
              key="title-complete"
              className="vp-fade-in font-sora text-[17px] font-bold text-black/85"
              style={{ lineHeight: 1.3 }}
            >
              Tenis clásicos blancos con detalles en rojo
            </p>
          )}
        </div>
      </div>

      {/* Description / sparks indicator below */}
      <div style={{ minHeight: 60, marginBottom: 12 }}>
        {stage === "photo" && (
          <div className="vp-fade-in flex flex-col gap-2" key="desc-photo">
            <div className="h-[8px] w-[90%] rounded-full bg-black/[0.04]" />
            <div className="h-[8px] w-[80%] rounded-full bg-black/[0.04]" />
            <div className="h-[8px] w-[60%] rounded-full bg-black/[0.04]" />
          </div>
        )}
        {stage === "loading" && (
          <div
            className="vp-fade-in flex items-center gap-2"
            key="desc-loading"
            style={{ paddingTop: 8 }}
          >
            <svg className="vp-spin" width="16" height="16" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 3L16.5 10.5L24 13L16.5 15.5L14 23L11.5 15.5L4 13L11.5 10.5L14 3Z"
                stroke="#DB3B2B"
                strokeWidth="1.5"
                strokeLinejoin="round"
                fill="rgba(219,59,43,0.15)"
              />
            </svg>
            <span className="font-inter text-[12px] font-medium text-[#DB3B2B]">
              Generando con IA<span className="vp-dots">...</span>
            </span>
          </div>
        )}
        {stage === "complete" && (
          <p
            key="desc-complete"
            className="vp-fade-in font-inter text-[13px] font-light text-black/60"
            style={{ lineHeight: 1.6 }}
          >
            Tenis clásicos blancos, con un diseño minimalista y cómodo, son perfectos para cualquier ocasión, ya sea un paseo casual o una salida con amigos.
          </p>
        )}
      </div>

      <div
        className="flex items-center gap-1.5 font-inter text-[11px] font-semibold uppercase text-[#DB3B2B]"
        style={{ letterSpacing: "0.05em", opacity: stage === "complete" ? 1 : 0, transition: "opacity 0.4s ease" }}
      >
        <svg width="12" height="12" viewBox="0 0 28 28" fill="none">
          <path
            d="M14 3L16.5 10.5L24 13L16.5 15.5L14 23L11.5 15.5L4 13L11.5 10.5L14 3Z"
            stroke="#DB3B2B"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="rgba(219,59,43,0.10)"
          />
        </svg>
        Generado con IA
      </div>

      <style jsx>{`
        .vp-fade-in {
          animation: vpFadeIn 0.35s ease-out;
        }
        @keyframes vpFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .vp-shimmer {
          background: linear-gradient(90deg, rgba(0,0,0,0.05) 0%, rgba(219,59,43,0.20) 50%, rgba(0,0,0,0.05) 100%);
          background-size: 200% 100%;
          animation: vpShimmer 1.1s linear infinite;
        }
        @keyframes vpShimmer {
          from { background-position: 200% 0; }
          to { background-position: -200% 0; }
        }
        .vp-spin {
          animation: vpSpin 1.2s linear infinite;
        }
        @keyframes vpSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .vp-dots::after {
          content: "";
          animation: vpDots 1.2s steps(4, end) infinite;
        }
        @keyframes vpDots {
          0% { content: ""; }
          25% { content: "."; }
          50% { content: ".."; }
          75% { content: "..."; }
          100% { content: ""; }
        }
        .vp-spark {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #DB3B2B;
          box-shadow: 0 0 8px rgba(219,59,43,0.7);
          opacity: 0;
        }
        .vp-spark-1 { top: 14%; left: 18%; animation: vpSpark 1.4s ease-in-out 0s infinite; }
        .vp-spark-2 { top: 70%; left: 24%; animation: vpSpark 1.4s ease-in-out 0.35s infinite; }
        .vp-spark-3 { top: 25%; right: 18%; animation: vpSpark 1.4s ease-in-out 0.7s infinite; }
        .vp-spark-4 { bottom: 18%; right: 22%; animation: vpSpark 1.4s ease-in-out 1.05s infinite; }
        @keyframes vpSpark {
          0%, 100% { opacity: 0; transform: scale(0.4); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
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
          <path d="M0 50 C25 50, 50 11, 100 11" stroke="rgba(226,97,83,0.45)" strokeWidth="2" fill="none" strokeDasharray="4 3" />
          <path d="M0 50 C25 50, 50 50, 100 50" stroke="rgba(226,97,83,0.55)" strokeWidth="2" fill="none" strokeDasharray="4 3" />
          <path d="M0 50 C25 50, 50 89, 100 89" stroke="rgba(226,97,83,0.45)" strokeWidth="2" fill="none" strokeDasharray="4 3" />
        </svg>

        {/* Animated traveling dots */}
        <span className="ve-dot ve-dot-1" />
        <span className="ve-dot ve-dot-2" />
        <span className="ve-dot ve-dot-3" />
      </div>

      <style jsx>{`
        .ve-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #DB3B2B;
          box-shadow: 0 0 10px rgba(219,59,43,0.6);
          margin-left: -4px;
          margin-top: -4px;
        }
        .ve-dot-1 { animation: veRoute1 2.6s ease-in-out infinite; }
        .ve-dot-2 { animation: veRoute2 2.2s ease-in-out 0.4s infinite; }
        .ve-dot-3 { animation: veRoute3 2.9s ease-in-out 0.8s infinite; }

        @keyframes veRoute1 {
          0%   { left: 0%;   top: 50%; opacity: 0; }
          10%  { opacity: 1; }
          25%  { left: 25%;  top: 50%; }
          50%  { left: 50%;  top: 30%; }
          75%  { left: 75%;  top: 17%; }
          90%  { opacity: 1; }
          100% { left: 100%; top: 11%; opacity: 0; }
        }
        @keyframes veRoute2 {
          0%   { left: 0%;   top: 50%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: 100%; top: 50%; opacity: 0; }
        }
        @keyframes veRoute3 {
          0%   { left: 0%;   top: 50%; opacity: 0; }
          10%  { opacity: 1; }
          25%  { left: 25%;  top: 50%; }
          50%  { left: 50%;  top: 70%; }
          75%  { left: 75%;  top: 82%; }
          90%  { opacity: 1; }
          100% { left: 100%; top: 89%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function VisualRiesgo() {
  // Each ring fills via stroke-dashoffset transition; number counts up to 78.
  const [drawn, setDrawn] = useState(false);
  const [count, setCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDrawn(true), 60);

    // Animated counter 0 → 78 (~1.5s, ease-out cubic)
    const start = performance.now();
    const duration = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 78));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Result card shows shortly after counter finishes
    const tCard = window.setTimeout(() => setShowResult(true), 1750);

    return () => {
      window.clearTimeout(t);
      window.clearTimeout(tCard);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center gap-5">
      <svg width="220" height="220" viewBox="0 0 110 110" fill="none">
        {/* Outer */}
        <circle cx="55" cy="55" r="48" stroke="rgba(0,0,0,0.04)" strokeWidth="6" />
        <circle
          cx="55" cy="55" r="48"
          stroke="#DB3B2B" strokeWidth="6" strokeLinecap="round"
          transform="rotate(-90 55 55)"
          style={{
            strokeDasharray: `260 302`,
            strokeDashoffset: drawn ? 0 : 260,
            transition: "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0ms",
          }}
        />
        {/* Middle */}
        <circle cx="55" cy="55" r="36" stroke="rgba(0,0,0,0.03)" strokeWidth="5" />
        <circle
          cx="55" cy="55" r="36"
          stroke="#E26153" strokeWidth="5" strokeLinecap="round"
          transform="rotate(-90 55 55)"
          style={{
            strokeDasharray: `150 226`,
            strokeDashoffset: drawn ? 0 : 150,
            transition: "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1) 120ms",
          }}
        />
        {/* Inner */}
        <circle cx="55" cy="55" r="25" stroke="rgba(0,0,0,0.02)" strokeWidth="4" />
        <circle
          cx="55" cy="55" r="25"
          stroke="#F2876A" strokeWidth="4" strokeLinecap="round"
          transform="rotate(-90 55 55)"
          style={{
            strokeDasharray: `90 157`,
            strokeDashoffset: drawn ? 0 : 90,
            transition: "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1) 240ms",
          }}
        />
        <text x="55" y="61" textAnchor="middle" style={{ fontSize: 18, fontWeight: 700, fill: "rgba(0,0,0,0.75)" }}>
          {count}
        </text>
      </svg>

      {/* Result card — slides in once the score lands */}
      <div
        className="vr-result-card flex w-full max-w-[300px] items-center gap-3 rounded-[14px] bg-white"
        style={{
          padding: "12px 14px",
          boxShadow: "0 14px 36px -12px rgba(219,59,43,0.20), 0 0 0 1px rgba(0,0,0,0.04)",
          opacity: showResult ? 1 : 0,
          transform: showResult ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
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
