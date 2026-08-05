"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import PedidosPanel from "@/components/showcase/PedidosPanel";
import CotizadorPanel from "@/components/showcase/CotizadorPanel";
import TiendaPromptPanel from "@/components/showcase/TiendaPromptPanel";
import { PosCheckoutMobileScreen } from "@/components/showcase/PosMockups";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useCountUp } from "@/hooks/useCountUp";
import { SIGNUP_URL } from "@/lib/constants";
import T1FinalCTA from "@/components/T1FinalCTA";
import StoreShowcase from "@/components/StoreShowcase";
import TodoIncluidoDark from "@/components/TodoIncluidoDark";

/* ── Store carousel items — 8 unique stores, duplicated so the marquee
   (translateX(-50%)) loops seamlessly. ── */
const STORES = [
  { name: "Lochwild", image: "/img/inspira-1.png", url: "https://lochwild.mx/" },
  { name: "Pirma", image: "/img/inspira-2.png", url: "https://pirma.com.mx/" },
  { name: "Lover Boy", image: "/img/inspira-3.png", url: "https://loverboy.mx/" },
  { name: "Lumière", image: "/img/tienda-skincare.png", url: "#" },
  { name: "Sportify", image: "/img/tienda-1.png", url: "#" },
  { name: "Casa & Hogar", image: "/img/tienda-2.png", url: "#" },
  { name: "TechZone", image: "/img/tienda-3.png", url: "#" },
  { name: "Orgánica MX", image: "/img/tienda-4.png", url: "#" },
];
const STORE_CAROUSEL = [...STORES, ...STORES];

/* ── Store carousel ──────────────────────────────────────────────────────────
   Self-contained component so ProductModal's constant typewriter re-renders
   never touch it. Hover is detected with elementFromPoint on the STATIONARY
   container (fired from onMouseMove), which is reliable even while the cards
   auto-scroll under a still cursor — the old approach relied on each moving
   card's :hover / mouseenter, which browsers don't fire for elements that move
   under a stationary pointer. State-driven, so the overlay + pause always show.
*/
function StoreCarousel({ dark }: { dark: boolean }) {
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
    const card = el?.closest<HTMLElement>("[data-store-idx]");
    setHovered(card ? Number(card.dataset.storeIdx) : null);
  };

  return (
    <div
      className="relative"
      style={{ overflow: "clip" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setHovered(null);
      }}
      onMouseMove={onMove}
    >
      <div className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-20 ${dark ? "bg-gradient-to-r from-black to-transparent" : "bg-gradient-to-r from-white/80 to-transparent"}`} />
      <div className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-20 ${dark ? "bg-gradient-to-l from-black to-transparent" : "bg-gradient-to-l from-white/80 to-transparent"}`} />
      {/* No flex `gap` and no horizontal padding: each card owns its trailing
          space via margin-right, so the track is exactly two identical copies
          and translateX(-50%) loops seamlessly (gap-based spacing made the
          half-period off by ½ gap → a visible jump at the seam). */}
      <div
        className="store-carousel flex items-center"
        style={{ padding: "20px 0", animationPlayState: paused ? "paused" : "running" }}
      >
        {STORE_CAROUSEL.map((store, i) => {
          const isHovered = hovered === i;
          return (
            <a
              key={`${store.name}-${i}`}
              data-store-idx={i}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative shrink-0 overflow-hidden rounded-[16px] no-underline"
              style={{
                width: 240,
                height: 280,
                marginRight: 20,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                boxShadow: isHovered ? "0 18px 50px rgba(0,0,0,0.45)" : "none",
                zIndex: isHovered ? 5 : 1,
              }}
            >
              <Image
                src={store.image}
                alt={store.name}
                fill
                sizes="240px"
                className="object-cover"
                style={{ filter: isHovered ? "blur(2px) brightness(0.6)" : "none", transition: "filter 0.3s ease" }}
              />
              <div
                className="pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center gap-4 px-4 text-center"
                style={{
                  background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.72) 100%)",
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                <p
                  className="font-sora text-[24px] font-medium text-white"
                  style={{ letterSpacing: "-0.01em", borderBottom: "2px solid rgba(255,255,255,0.85)", paddingBottom: 5 }}
                >
                  {store.name}
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 font-inter text-[14px] font-semibold text-black">
                  Ver tienda
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ── Animated prompt phrases + matching page images + section bg + gradient color ── */
const PROMPT_PAGES = [
  { text: "Tengo una tienda de skincare.", image: "/img/tienda-skincare.png", bg: "/img/fondo-modal-1.png", gradientColor: "#C7A99A" },
  { text: "Necesito una tienda de ropa deportiva.", image: "/img/tienda-deporte.png", bg: "/img/fondo-modal-2.png", gradientColor: "#7FA1B6" },
  { text: "Quiero vender ropa de moda.", image: "/img/tienda-ropa.png", bg: "/img/fondo-modal-3.png", gradientColor: "#998E67" },
  { text: "Quiero vender muebles de la más alta calidad.", image: "/img/tienda-muebles.png", bg: "/img/fondo-modal-4.png", gradientColor: "#978478" },
];

/* ── Hero prompt input ───────────────────────────────────────────────────────
   Self-contained so it owns its own typing loop (independent of the PROMPT_PAGES
   preview that drives "Hoy basta una frase"). "Quiero vender " stays fixed; the
   category suffix types in char-by-char, holds, deletes, and rotates. ── */
const HERO_PROMPT_PREFIX = "Quiero vender ";
const HERO_PROMPT_SUFFIXES = [
  "ropa de mujer",
  "productos de belleza y maquillaje",
  "comida casera y postres",
  "bisutería y accesorios",
  "zapatos y bolsas",
  "ropa de bebé y niño",
  "fundas y accesorios para celular",
  "productos para mascotas",
  "ropa deportiva y fitness",
  "perfumes y fragancias",
  "artículos de decoración para el hogar",
  "suplementos y vitaminas",
  "lencería y ropa interior",
  "artículos de papelería y regalos",
  "productos de limpieza del hogar",
  "plantas y macetas",
  "joyería de plata y accesorios",
  "productos naturistas y herbolaria",
  "ropa de hombre",
  "electrónicos y accesorios tech",
];
const HERO_PROMPT_CHIPS = ["Moda", "Deportes", "Belleza", "Joyería", "Electrónica", "Hogar"];
// Clicking a chip pre-fills the prompt with a random phrase from its category.
const CHIP_PROMPTS: Record<string, string[]> = {
  Moda: [
    "Quiero vender ropa de mujer moderna y elegante",
    "Necesito una tienda de streetwear para jóvenes",
    "Quiero vender ropa de moda con envío a todo México",
  ],
  Deportes: [
    "Quiero vender ropa deportiva y accesorios de fitness",
    "Necesito una tienda de suplementos y equipo de gym",
    "Quiero vender tenis y calzado deportivo",
  ],
  Belleza: [
    "Quiero vender productos de skincare y cuidado facial",
    "Necesito una tienda de maquillaje y cosméticos",
    "Quiero vender perfumes y fragancias importadas",
  ],
  Joyería: [
    "Quiero vender joyería de plata hecha a mano",
    "Necesito una tienda de accesorios y bisutería",
    "Quiero vender anillos y collares personalizados",
  ],
  Electrónica: [
    "Quiero vender accesorios y gadgets para celular",
    "Necesito una tienda de electrónicos y tecnología",
    "Quiero vender audífonos y bocinas bluetooth",
  ],
  Hogar: [
    "Quiero vender artículos de decoración para el hogar",
    "Necesito una tienda de plantas y macetas",
    "Quiero vender velas aromáticas y textiles para casa",
  ],
};
const HERO_TYPING_SPEED = 100;
const HERO_DELETE_SPEED = 50;
const HERO_DELAY_BETWEEN = 2000;
const HERO_PAUSE_AFTER_COMPLETE = 1500;

function HeroPromptInput() {
  const [idx, setIdx] = useState(0);
  const [suffix, setSuffix] = useState("");
  const [filled, setFilled] = useState<string | null>(null); // set when a chip is clicked

  useEffect(() => {
    if (filled) return; // paused once the user pre-fills from a chip
    const full = HERO_PROMPT_SUFFIXES[idx];
    let char = 0;
    let deleting = false;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (!deleting) {
        char++;
        setSuffix(full.slice(0, char));
        if (char >= full.length) {
          // Fully typed — hold, then start deleting.
          t = setTimeout(() => {
            deleting = true;
            tick();
          }, HERO_PAUSE_AFTER_COMPLETE);
          return;
        }
        t = setTimeout(tick, HERO_TYPING_SPEED);
      } else {
        char--;
        setSuffix(full.slice(0, char));
        if (char <= 0) {
          // Cleared — wait, then advance to the next message.
          t = setTimeout(() => setIdx((p) => (p + 1) % HERO_PROMPT_SUFFIXES.length), HERO_DELAY_BETWEEN);
          return;
        }
        t = setTimeout(tick, HERO_DELETE_SPEED);
      }
    };
    t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, [idx, filled]);

  const displayText = filled ?? `${HERO_PROMPT_PREFIX}${suffix}`;
  const charCount = displayText.length;

  return (
    <div className="w-full" style={{ maxWidth: 640 }}>
      {/* Field starts in a focused state — neutral grey ring + border. */}
      <div
        className="relative rounded-[20px] border bg-white text-left"
        style={{
          borderColor: "rgba(0,0,0,0.28)",
          boxShadow: "0 16px 50px rgba(0,0,0,0.18), 0 0 0 4px rgba(0,0,0,0.06)",
        }}
      >
        <div className="px-6 pt-6 tablet:pl-7 tablet:pr-7 tablet:pt-7" style={{ minHeight: 96 }}>
          <p className="font-inter text-[16px] text-black/85 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
            {displayText}
            <span
              className="ml-0.5 inline-block w-[2px] bg-black/45 align-text-bottom"
              style={{ height: 18, animation: "blink 0.8s step-end infinite" }}
            />
          </p>
        </div>
        <div className="flex items-center justify-between px-6 pb-5 pt-4 tablet:pl-7 tablet:pr-5">
          <span className="font-inter text-[12px] text-black/35">{charCount}/500</span>
          <a
            href="#"
            aria-label="Crear con IA"
            className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#DB3B2B] text-white no-underline transition-all duration-200 hover:scale-[1.05] hover:bg-[#C0332A]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
      {/* Suggestion chips */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <span className="font-inter text-[12px] text-white/45" style={{ marginRight: 4 }}>Prueba con:</span>
        {HERO_PROMPT_CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              const arr = CHIP_PROMPTS[c];
              setFilled(arr[Math.floor(Math.random() * arr.length)]);
            }}
            className="cursor-pointer rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 font-inter text-[12px] text-white/70 transition-all duration-150 hover:border-[#E26153]/50 hover:bg-[rgba(226,97,83,0.12)] hover:text-white"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Stat with count-up animation, used in Tienda landing ── */
function CountStat({ end, prefix = "", suffix = "", label, decimals = 0 }: { end: number; prefix?: string; suffix?: string; label: string; decimals?: number }) {
  const { ref, display } = useCountUp({ end, prefix, suffix, decimals, duration: 1800 });
  return (
    <div ref={ref}>
      <p className="font-sora text-[36px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1 }}>
        {display}
      </p>
      <p className="font-inter text-[12px] font-light text-white/55 tablet:text-[14px]">{label}</p>
    </div>
  );
}

/* ── Product modal — matching Figma design ── */
export function ProductModal({ cardId, onClose, pageMode = false }: { cardId: string; onClose: () => void; pageMode?: boolean }) {
  const titles: Record<string, string> = {
    t1tienda: "T1 Tienda",
    t1pagos: "T1 Pagos",
    t1envios: "T1 Envíos",
  };
  const title = titles[cardId] || cardId;
  const scrollRef = useRef<HTMLDivElement>(null);

  const [pageIdx, setPageIdx] = useState(0);
  const [visiblePageIdx, setVisiblePageIdx] = useState(0); // only changes after typing done
  const [displayedText, setDisplayedText] = useState("");
  const [scrollY, setScrollY] = useState(0);

  // "Todo incluido" carousel — arrow + dot navigation
  const incluyeRef = useRef<HTMLDivElement>(null);
  const [incluyeIdx, setIncluyeIdx] = useState(0);
  const [incluyePages, setIncluyePages] = useState(1);
  const incluyeStep = () => {
    const el = incluyeRef.current;
    const card = el?.querySelector<HTMLElement>(".incluye-card");
    return card ? card.offsetWidth + 28 : (el?.clientWidth ?? 0) * 0.8;
  };
  // Scroll one PAGE per click — a page is however many whole cards fit in view.
  // This keeps 1 click = 1 dot and every stop shows full cards; the final stop
  // snaps to the true end so the last card is fully visible.
  const incluyePageStep = () => {
    const el = incluyeRef.current;
    if (!el) return 1;
    const step = Math.max(1, incluyeStep());
    const visible = Math.max(1, Math.floor(el.clientWidth / step));
    return visible * step;
  };
  useEffect(() => {
    const el = incluyeRef.current;
    if (!el) return;
    const calc = () => {
      const ps = Math.max(1, incluyePageStep());
      const maxScroll = el.scrollWidth - el.clientWidth;
      setIncluyePages(maxScroll <= 1 ? 1 : Math.ceil(maxScroll / ps) + 1);
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const goIncluye = useCallback((i: number) => {
    const el = incluyeRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const target = i >= incluyePages - 1 ? maxScroll : i * incluyePageStep();
    el.scrollTo({ left: Math.min(target, maxScroll), behavior: "smooth" });
  }, [incluyePages]);
  const scrollIncluye = useCallback((dir: number) => {
    goIncluye(Math.max(0, Math.min(incluyePages - 1, incluyeIdx + dir)));
  }, [goIncluye, incluyeIdx, incluyePages]);
  const onIncluyeScroll = () => {
    const el = incluyeRef.current;
    if (!el) return;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
    setIncluyeIdx(atEnd ? incluyePages - 1 : Math.min(incluyePages - 1, Math.round(el.scrollLeft / Math.max(1, incluyePageStep()))));
  };

  // Lock body scroll — only in modal mode
  useEffect(() => {
    if (pageMode) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [pageMode]);

  // (The store carousel is now the self-contained <StoreCarousel> component —
  // no coverflow rAF loop here anymore.)

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
              {/* Hero backdrop */}
              <div className="absolute inset-0 z-0">
                {pageMode ? (
                  /* AI-style backdrop: pure black with soft color blobs + a faint
                     radial glow — no store image (CEO: hero on black with IA-style
                     color blobs/gradient; just text + prompt input + example tags;
                     the store preview animation now lives in the "Hoy basta una
                     frase" section below). */
                  <>
                    {/* Red + blue color blobs over black for an IA-gradient feel */}
                    <div className="absolute" style={{ top: "-14%", left: "2%", width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(219,59,43,0.40) 0%, transparent 62%)", filter: "blur(90px)" }} />
                    <div className="absolute" style={{ top: "-6%", right: "-8%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,120,255,0.36) 0%, transparent 62%)", filter: "blur(90px)" }} />
                    <div className="absolute" style={{ bottom: "-10%", left: "34%", width: 540, height: 540, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.26) 0%, transparent 64%)", filter: "blur(100px)" }} />
                    {/* Bottom fade to solid black to fuse with the next section */}
                    <div aria-hidden className="absolute inset-x-0 bottom-0" style={{ height: "45%", background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 60%, #000 100%)" }} />
                  </>
                ) : (
                  <>
                    {/* Per-prompt background image (modal mode) — changes after typing */}
                    <Image
                      key={PROMPT_PAGES[visiblePageIdx].bg}
                      src={PROMPT_PAGES[visiblePageIdx].bg}
                      alt=""
                      fill
                      className="object-cover"
                      style={{ animation: "fadeSlideIn 0.6s ease-out" }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(180deg, ${PROMPT_PAGES[visiblePageIdx].gradientColor} 0%, ${PROMPT_PAGES[visiblePageIdx].gradientColor}cc 20%, transparent 55%)`,
                        transition: "background 0.6s ease-out",
                      }}
                    />
                  </>
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
                /* ── pageMode hero: prompt input on top, live store-preview
                       animation below (CEO: "en el hero el input del prompt y
                       abajo la animación que tenemos ahora"). Single centered
                       column; the typed prompt drives the preview that builds
                       below it. ── */
                <div
                  className="mx-auto flex max-w-[820px] flex-col items-center text-center"
                  style={{ paddingTop: 140, paddingBottom: 24 }}
                >
                  <h1
                    className="font-sora text-[32px] font-normal text-white tablet:text-[44px]"
                    style={{ lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}
                  >
                    Crea tu tienda en menos de 1 minuto
                  </h1>
                  <p
                    className="font-inter text-[16px] font-light text-white/80 tablet:text-[19px]"
                    style={{ lineHeight: 1.55, marginBottom: 28, maxWidth: 560 }}
                  >
                    Describe tu negocio y T1 genera una tienda lista para vender,
                    cobrar y enviar.
                  </p>

                  {/* Prompt input — self-contained typing loop (see HeroPromptInput) */}
                  <HeroPromptInput />
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-4 tablet:flex-row tablet:items-start tablet:justify-between tablet:gap-6" style={{ marginBottom: 28, paddingTop: 0 }}>
                    <div>
                      <h3 className="font-sora text-[22px] font-normal text-white tablet:text-[28px]" style={{ marginBottom: 8 }}>
                        Crea tu tienda en menos de 1 minuto
                      </h3>
                      <p className="font-inter text-[17px] font-normal text-white/80" style={{ lineHeight: 1.6 }}>
                        Cuéntanos de que trata tu negocio y nuestra IA creará tu tienda en menos de 1 minuto.
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
                      <p className="font-inter text-[16px] font-normal text-black/80" style={{ minHeight: 44 }}>
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
            {/* No data-modal-animate here: this carousel must be visible from the
                start (peeking above the fold) so it's obvious there's content to
                scroll to — otherwise the hero looks like the whole page. */}
            <div className={`${pageMode ? "bg-black pt-4 pb-16 tablet:pt-6 tablet:pb-20" : "py-12"}`}>
              <h3
                className={`font-sora text-[32px] font-light text-center px-5 tablet:text-[44px] tablet:px-10 ${pageMode ? "text-white" : "text-black"}`}
                style={{ marginBottom: 64, letterSpacing: "-0.02em" }}
              >
                Explora tiendas que ya venden con T1
              </h3>

              {/* Store showcase — desktop + mobile mockup on the left, store
                  info (name, resumen, link) on the right; rotates 3 stores. */}
              <StoreShowcase dark={pageMode} />
            </div>

            {/* ── pageMode-only storytelling sections ── */}
            {pageMode && (
              <>
                {/* ── Act II — Conflict: "Antes" (subdued, sets the tension) ── */}
                {/* data-white-card: triggers navbar light mode when this section reaches the top */}
                <section className="relative bg-white px-5 pt-24 pb-14 tablet:px-10 tablet:pt-32 tablet:pb-20" data-white-card data-tienda-act-2>
                  <div className="mx-auto max-w-[var(--max-w)]">
                    <div data-modal-animate className="mx-auto text-center" style={{ marginBottom: 48 }}>
                      <h2 className="font-sora text-[32px] font-light text-black tablet:text-[44px] tablet:whitespace-nowrap" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>
                        Antes, lanzar una tienda tomaba meses.
                      </h2>
                    </div>

                    <div data-modal-animate className="flex flex-wrap justify-center gap-5">
                      {[
                        { title: "Semanas de espera", desc: "Cotizaciones, ida y vuelta con agencias, prototipos que no convencían.", icon: "clock" },
                        { title: "Costos elevados", desc: "Diseño, hosting, plugins, integraciones. La cuenta nunca paraba de subir.", icon: "money" },
                        { title: "Resultados inciertos", desc: "Lanzar y rezar. Sin métricas claras, sin SEO, sin saber si convertiría.", icon: "question" },
                      ].map((p, i) => (
                        <div
                          key={p.title}
                          data-stagger
                          className="w-full tablet:w-[280px] rounded-[18px] border border-black/[0.07] bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
                          style={{ ["--i" as string]: i }}
                        >
                          <div className="mb-4 flex h-[30px] w-[30px] items-center justify-center">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              {p.icon === "clock" && (
                                <>
                                  <circle cx="12" cy="12" r="9" />
                                  <path d="M12 7.5V12l3 2" />
                                </>
                              )}
                              {p.icon === "money" && (
                                <>
                                  <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
                                  <circle cx="12" cy="12" r="2.6" />
                                  <path d="M6 9.5v5M18 9.5v5" />
                                </>
                              )}
                              {p.icon === "question" && (
                                <>
                                  <circle cx="12" cy="12" r="9" />
                                  <path d="M9.6 9.6a2.4 2.4 0 0 1 4.4 1.3c0 1.6-2 1.9-2 3.1" />
                                  <path d="M12 17.2v.01" />
                                </>
                              )}
                            </svg>
                          </div>
                          <h3 className="font-sora text-[18px] font-normal text-black/70" style={{ marginBottom: 6 }}>{p.title}</h3>
                          <p className="font-inter text-[14px] font-light text-black/50" style={{ lineHeight: 1.6 }}>{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* ── Act III — "Hoy basta una frase": white-bg 2-column hero
                       layout — title + text on the LEFT, the live store-preview
                       + typing prompt animation on the RIGHT (CEO). ── */}
                <section className="relative overflow-hidden bg-white px-5 pt-14 pb-24 tablet:px-10 tablet:pt-20 tablet:pb-32">
                  <div className="relative mx-auto max-w-[var(--max-w)]">
                    <div className="grid grid-cols-1 items-center gap-12 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] tablet:gap-16">
                      {/* Left: title + text */}
                      <div data-modal-animate>
                        <h2 className="font-sora text-[32px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-1.5px", lineHeight: 1.05, marginBottom: 20 }}>
                          Hoy basta una frase.
                          <span className="ml-2 inline-flex translate-y-1 items-center">
                            <AISparkle size={30} color="#E26153" />
                          </span>
                        </h2>
                        <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[19px]" style={{ lineHeight: 1.55, maxWidth: 480 }}>
                          Le dices a la IA qué vendes y arma una tienda hecha para ti. Estructura, copy, secciones y diseño coherentes con tu marca.
                        </p>
                        <a
                          href={SIGNUP_URL}
                          className="mt-8 inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[16px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]"
                        >
                          Crear mi tienda con IA
                        </a>
                      </div>

                      {/* Right: store preview simulation + live typing prompt card */}
                      <div data-modal-animate className="relative">
                        <div
                          className="overflow-hidden rounded-[18px] border border-black/[0.06] bg-white"
                          style={{ padding: 10, boxShadow: "0 24px 70px rgba(0,0,0,0.12)" }}
                        >
                          <div className="overflow-hidden rounded-[12px]" style={{ aspectRatio: "16/10" }}>
                            <div className="transition-transform duration-1000 ease-in-out" style={{ transform: `translateY(-${scrollY}px)` }}>
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

                        {/* Floating live-typed prompt card — desktop */}
                        <div
                          className="absolute hidden rounded-[16px] border border-black/[0.06] bg-white tablet:block"
                          style={{ left: -28, bottom: -26, width: 320, padding: "18px 20px", boxShadow: "0 16px 40px rgba(0,0,0,0.16)" }}
                        >
                          <p className="font-inter text-[14px] font-normal text-black/80" style={{ minHeight: 44 }}>
                            {displayedText}
                            <span className="ml-0.5 inline-block w-[2px] bg-[#DB3B2B]" style={{ height: 16, verticalAlign: "text-bottom", animation: "blink 0.8s step-end infinite" }} />
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="font-inter text-[11px] text-black/30">{(displayedText || "").length}/500</span>
                            <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#DB3B2B]">
                              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                <path d="M7 11V3M7 3L4 6M7 3L10 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Mobile: typed prompt below the preview */}
                        <div className="mt-4 rounded-[14px] border border-black/[0.06] bg-white tablet:hidden" style={{ padding: "14px 16px", boxShadow: "0 10px 30px rgba(0,0,0,0.10)" }}>
                          <p className="font-inter text-[14px] text-black/80" style={{ minHeight: 38 }}>
                            {displayedText}
                            <span className="ml-0.5 inline-block w-[2px] bg-[#DB3B2B]" style={{ height: 14, verticalAlign: "text-bottom", animation: "blink 0.8s step-end infinite" }} />
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="font-inter text-[11px] text-black/30">{(displayedText || "").length}/500</span>
                            <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#DB3B2B]">
                              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                <path d="M7 11V3M7 3L4 6M7 3L10 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ── Cómo funciona — 4 steps with connector line ── */}
                <section className="relative bg-[#FBFBFB] px-5 py-24 tablet:px-10 tablet:py-32">
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
                        { n: "01", title: "Describe y la IA crea tu tienda", desc: "Cuéntale a la IA qué vendes y arma tu tienda: estructura, secciones, copy y diseño." },
                        { n: "02", title: "Carga tus productos", desc: "Sube tus productos o deja que la IA arme títulos, descripciones y variantes." },
                        { n: "03", title: "Activa métodos de pago", desc: "Acepta tarjetas, SPEI, efectivo y meses sin intereses en unos clics." },
                        { n: "04", title: "Establece tarifas de envío", desc: "Configura paqueterías y tarifas para empezar a entregar tus pedidos." },
                      ].map((s, i) => (
                        <div
                          key={s.n}
                          data-stagger
                          className="tienda-card relative rounded-[18px] border border-black/[0.06] bg-white p-7"
                          style={{ ["--i" as string]: i }}
                        >
                          <span className="font-sora text-[40px] font-light text-[#DB3B2B]" style={{ display: "block", marginTop: 28, marginBottom: 12, letterSpacing: "-0.04em", lineHeight: 1 }}>
                            {s.n}
                          </span>
                          <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 6 }}>{s.title}</h3>
                          <p className="font-inter text-[14px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{s.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* ── Lo que incluye — versión fondo blanco (oculta; se usa la oscura TodoIncluidoDark) ── */}
                {false && (
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

                    {/* Horizontal carousel — swipeable on mobile, scrollable on
                        desktop; cards snap into place (CEO: "que sean cards pero
                        que sea un carrusel"). Scrollbar hidden. */}
                    <div
                      ref={incluyeRef}
                      onScroll={onIncluyeScroll}
                      data-modal-animate
                      className="flex gap-7 overflow-x-auto snap-x snap-mandatory px-6 pt-14 pb-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                      style={{ scrollPaddingLeft: 24, scrollPaddingRight: 24 }}
                    >
                      {/* 1. Diseño responsive — browser + phone (real store) */}
                      <div data-stagger style={{ ["--i" as string]: 0, boxShadow: "0 26px 60px -34px rgba(0,0,0,0.4)", background: "radial-gradient(86% 76% at 85% 38%, rgba(219,59,43,0.17) 0%, transparent 62%), radial-gradient(72% 66% at 10% 92%, rgba(116,88,214,0.16) 0%, transparent 62%), linear-gradient(158deg, #17151b 0%, #100e13 100%)" }} className="incluye-card incluye-dark-card flex shrink-0 snap-start w-[80vw] max-w-[320px] tablet:w-[320px] flex-col rounded-[24px] border border-white/[0.07]">
                        <div className="relative flex h-[214px] items-center justify-center">
                          {/* Browser */}
                          <div className="absolute left-[22px] top-[-14px] z-10 w-[188px] overflow-hidden rounded-[11px] border border-white/12 bg-white/[0.06] backdrop-blur-md" style={{ boxShadow: "0 18px 36px rgba(0,0,0,0.45)" }}>
                            <div className="flex items-center gap-1.5 px-2.5 py-1.5">
                              <span className="h-[5px] w-[5px] rounded-full bg-white/30" />
                              <span className="h-[5px] w-[5px] rounded-full bg-white/22" />
                              <span className="h-[5px] w-[5px] rounded-full bg-white/16" />
                              <div className="ml-1 flex-1 rounded-full bg-white/[0.12] py-0.5 text-center"><span className="font-inter text-[7px] text-white/60">www.mi-tienda.com</span></div>
                            </div>
                            <div className="relative w-full" style={{ height: 132 }}>
                              <Image src="/img/moda-banner-desktop.png" alt="" fill className="object-cover" sizes="200px" />
                            </div>
                          </div>
                          {/* Phone — overlaps bottom-right */}
                          <div className="absolute bottom-[10px] right-[20px] z-20 overflow-hidden rounded-[15px] border-[3px] border-[#0b0a0e] bg-[#0b0a0e]" style={{ width: 78, height: 150, boxShadow: "0 16px 30px rgba(0,0,0,0.55)" }}>
                            <div className="relative h-full w-full overflow-hidden rounded-[12px]">
                              <Image src="/img/moda-banner-mobile.png" alt="" fill className="object-cover" style={{ objectPosition: "50% 0%" }} sizes="90px" />
                            </div>
                          </div>
                        </div>
                        <div className="px-6 pb-7 pt-1">
                          <h3 className="font-sora text-[21px] font-normal text-white" style={{ marginBottom: 8, letterSpacing: "-0.01em" }}>Diseño responsive</h3>
                          <p className="font-inter text-[14px] font-light text-white/55" style={{ lineHeight: 1.55 }}>Tu tienda se ve perfecta en cualquier dispositivo, sin esfuerzo.</p>
                        </div>
                      </div>

                      {/* 2. Checkout integrado */}
                      <div data-stagger style={{ ["--i" as string]: 1, boxShadow: "0 26px 60px -34px rgba(0,0,0,0.4)", background: "radial-gradient(86% 76% at 85% 38%, rgba(219,59,43,0.17) 0%, transparent 62%), radial-gradient(72% 66% at 10% 92%, rgba(116,88,214,0.16) 0%, transparent 62%), linear-gradient(158deg, #17151b 0%, #100e13 100%)" }} className="incluye-card incluye-dark-card flex shrink-0 snap-start w-[80vw] max-w-[320px] tablet:w-[320px] flex-col rounded-[24px] border border-white/[0.07]">
                        <div className="relative flex h-[214px] items-start justify-center">
                          {/* Floating product — pops out above the card */}
                          <Image src="/img/tenis-transparente.png" alt="" width={140} height={104} className="pointer-events-none absolute left-1/2 top-[-34px] z-20 -translate-x-1/2 object-contain" style={{ filter: "drop-shadow(0 16px 22px rgba(0,0,0,0.55))" }} />
                          {/* Glass checkout panel */}
                          <div className="relative z-10 w-[200px] rounded-[16px] border border-white/12 bg-white/[0.10] p-3.5 backdrop-blur-md" style={{ marginTop: 46 }}>
                            <p className="text-center font-inter text-[19px] font-bold text-white" style={{ marginBottom: 10, letterSpacing: "-0.01em" }}>$1,345.99</p>
                            <div className="flex items-center gap-2 rounded-[11px] bg-white/[0.13] px-2.5 py-2" style={{ marginBottom: 9 }}>
                              <span className="flex items-center rounded-[3px] bg-white px-1.5 py-1"><span className="font-inter text-[8px] font-extrabold italic text-[#1434CB]">VISA</span></span>
                              <div className="leading-tight">
                                <p className="font-inter text-[10px] font-medium text-white">Miguel Luna</p>
                                <p className="font-inter text-[9px] text-white/55">•••• 1234</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-center rounded-full bg-[#DB3B2B] py-1.5">
                              <span className="font-inter text-[10px] font-semibold text-white">Pagar</span>
                            </div>
                          </div>
                        </div>
                        <div className="px-6 pb-7 pt-1">
                          <h3 className="font-sora text-[21px] font-normal text-white" style={{ marginBottom: 8, letterSpacing: "-0.01em" }}>Checkout integrado</h3>
                          <p className="font-inter text-[14px] font-light text-white/55" style={{ lineHeight: 1.55 }}>Pasarela de pagos lista, optimizada para conversión.</p>
                        </div>
                      </div>

                      {/* 3. SEO — search result + Google mark popping above */}
                      <div data-stagger style={{ ["--i" as string]: 2, boxShadow: "0 26px 60px -34px rgba(0,0,0,0.4)", background: "radial-gradient(86% 76% at 85% 38%, rgba(219,59,43,0.17) 0%, transparent 62%), radial-gradient(72% 66% at 10% 92%, rgba(116,88,214,0.16) 0%, transparent 62%), linear-gradient(158deg, #17151b 0%, #100e13 100%)" }} className="incluye-card incluye-dark-card flex shrink-0 snap-start w-[80vw] max-w-[320px] tablet:w-[320px] flex-col rounded-[24px] border border-white/[0.07]">
                        <div className="relative flex h-[214px] items-center justify-center">
                          {/* Google mark — pops out above */}
                          <div className="absolute left-1/2 top-[-24px] z-20 flex h-[48px] w-[48px] -translate-x-1/2 items-center justify-center rounded-full bg-white" style={{ boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}>
                            <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
                          </div>
                          <div className="mt-[26px] w-[216px] rounded-[13px] border border-white/12 bg-white/[0.08] p-3.5 backdrop-blur-md">
                            <p className="font-inter text-[14px] font-medium text-[#8AB4F8]">Mi tienda | T1</p>
                            <p className="font-inter text-[9.5px] text-[#6EC58A]" style={{ marginTop: 2, marginBottom: 6 }}>mitienda.t1.com</p>
                            <p className="font-inter text-[9.5px] text-white/45" style={{ lineHeight: 1.5 }}>Encuentra todo lo que necesitas en un solo lugar, con envíos y pagos incluidos.</p>
                          </div>
                        </div>
                        <div className="px-6 pb-7 pt-1">
                          <h3 className="font-sora text-[21px] font-normal text-white" style={{ marginBottom: 8, letterSpacing: "-0.01em" }}>Optimizado para SEO</h3>
                          <p className="font-inter text-[14px] font-light text-white/55" style={{ lineHeight: 1.55 }}>Estructura, metadatos y velocidad pensados para Google.</p>
                        </div>
                      </div>

                      {/* 4. Catálogo inteligente — product card + IA badge popping above */}
                      <div data-stagger style={{ ["--i" as string]: 3, boxShadow: "0 26px 60px -34px rgba(0,0,0,0.4)", background: "radial-gradient(86% 76% at 85% 38%, rgba(219,59,43,0.17) 0%, transparent 62%), radial-gradient(72% 66% at 10% 92%, rgba(116,88,214,0.16) 0%, transparent 62%), linear-gradient(158deg, #17151b 0%, #100e13 100%)" }} className="incluye-card incluye-dark-card flex shrink-0 snap-start w-[80vw] max-w-[320px] tablet:w-[320px] flex-col rounded-[24px] border border-white/[0.07]">
                        <div className="relative flex h-[214px] items-center justify-center">
                          {/* IA badge — pops out above */}
                          <div className="absolute left-[46px] top-[-14px] z-20 inline-flex items-center gap-1 rounded-full px-2.5 py-1" style={{ background: "linear-gradient(135deg, #A78BFA 0%, #7C5AE0 100%)", boxShadow: "0 8px 18px rgba(124,90,220,0.45)" }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M12 3L14 9L20 11L14 13L12 19L10 13L4 11L10 9L12 3Z" fill="#fff" /></svg>
                            <span className="font-inter text-[9px] font-semibold text-white">Generado con IA</span>
                          </div>
                          {/* Product card */}
                          <div className="mt-[8px] w-[196px] rounded-[14px] border border-white/12 bg-white/[0.09] p-3 backdrop-blur-md">
                            <div className="mb-2.5 flex h-[94px] w-full items-center justify-center overflow-hidden rounded-[10px] bg-white/90">
                              <Image src="/img/tenis-transparente.png" alt="" width={132} height={92} className="object-contain" />
                            </div>
                            <p className="font-inter text-[14px] font-semibold text-white">Tennis clásicos</p>
                            <p className="font-inter text-[11px] text-white/55" style={{ marginTop: 2 }}>$1,345.99</p>
                          </div>
                        </div>
                        <div className="px-6 pb-7 pt-1">
                          <h3 className="font-sora text-[21px] font-normal text-white" style={{ marginBottom: 8, letterSpacing: "-0.01em" }}>Catálogo inteligente</h3>
                          <p className="font-inter text-[14px] font-light text-white/55" style={{ lineHeight: 1.55 }}>Sube fotos y la IA arma título, descripción y variantes.</p>
                        </div>
                      </div>

                      {/* 5. Dominio personalizado — browser popping above */}
                      <div data-stagger style={{ ["--i" as string]: 4, boxShadow: "0 26px 60px -34px rgba(0,0,0,0.4)", background: "radial-gradient(86% 76% at 85% 38%, rgba(219,59,43,0.17) 0%, transparent 62%), radial-gradient(72% 66% at 10% 92%, rgba(116,88,214,0.16) 0%, transparent 62%), linear-gradient(158deg, #17151b 0%, #100e13 100%)" }} className="incluye-card incluye-dark-card flex shrink-0 snap-start w-[80vw] max-w-[320px] tablet:w-[320px] flex-col rounded-[24px] border border-white/[0.07]">
                        <div className="relative flex h-[214px] items-center justify-center">
                          <div className="absolute left-1/2 top-[-30px] z-20 w-[256px] -translate-x-1/2 overflow-hidden rounded-[13px] border border-white/15 bg-white/[0.07] backdrop-blur-md" style={{ boxShadow: "0 22px 44px rgba(0,0,0,0.45)" }}>
                            <div className="flex items-center gap-2.5 px-3 py-2.5">
                              <div className="flex gap-1.5">
                                <span className="h-[7px] w-[7px] rounded-full bg-white/30" />
                                <span className="h-[7px] w-[7px] rounded-full bg-white/22" />
                                <span className="h-[7px] w-[7px] rounded-full bg-white/16" />
                              </div>
                              <div className="flex-1 rounded-full bg-white/[0.13] py-1 text-center">
                                <span className="font-inter text-[9px] text-white/70">www.mi-tienda.com</span>
                              </div>
                            </div>
                            <div className="relative w-full" style={{ height: 190 }}>
                              <Image src="/img/moda-banner-desktop.png" alt="" fill className="object-cover" style={{ objectPosition: "62% center" }} sizes="260px" />
                            </div>
                          </div>
                        </div>
                        <div className="px-6 pb-7 pt-1">
                          <h3 className="font-sora text-[21px] font-normal text-white" style={{ marginBottom: 8, letterSpacing: "-0.01em" }}>Dominio personalizado</h3>
                          <p className="font-inter text-[14px] font-light text-white/55" style={{ lineHeight: 1.55 }}>Conecta tu dominio en minutos o usa uno de cortesía.</p>
                        </div>
                      </div>

                      {/* 6. Métricas en tiempo real */}
                      <div data-stagger style={{ ["--i" as string]: 5, boxShadow: "0 26px 60px -34px rgba(0,0,0,0.4)", background: "radial-gradient(86% 76% at 85% 38%, rgba(219,59,43,0.17) 0%, transparent 62%), radial-gradient(72% 66% at 10% 92%, rgba(116,88,214,0.16) 0%, transparent 62%), linear-gradient(158deg, #17151b 0%, #100e13 100%)" }} className="incluye-card incluye-dark-card flex shrink-0 snap-start w-[80vw] max-w-[320px] tablet:w-[320px] flex-col rounded-[24px] border border-white/[0.07]">
                        <div className="relative flex h-[214px] items-end justify-center">
                          {/* Bars — the tall ones break out above the card top */}
                          <div className="absolute z-10 flex items-end justify-center gap-[7px]" style={{ left: 28, right: 28, bottom: 42, height: 200 }}>
                            {[42, 58, 36, 70, 54, 84, 72, 100].map((h, i) => (
                              <div key={i} className="flex-1 rounded-t-[4px]" style={{ height: `${h}%`, background: "linear-gradient(180deg, #E24A38 0%, #B0271B 100%)" }} />
                            ))}
                          </div>
                          {/* Glass sales panel */}
                          <div className="relative z-20 w-[222px] rounded-[14px] border border-white/14 bg-white/[0.12] p-3.5 backdrop-blur-md" style={{ marginBottom: 14, boxShadow: "0 14px 30px rgba(0,0,0,0.35)" }}>
                            <p className="font-inter text-[10px] text-white/60" style={{ marginBottom: 5 }}>Ventas · Últimos 7 días</p>
                            <div className="flex items-center gap-2.5">
                              <p className="font-sora text-[23px] font-light text-white" style={{ letterSpacing: "-0.02em", lineHeight: 1 }}>$285,982</p>
                              <span className="rounded-full bg-[rgba(74,222,128,0.18)] px-2 py-0.5 font-inter text-[10px] font-semibold text-[#4ADE80]">+23%</span>
                            </div>
                          </div>
                        </div>
                        <div className="px-6 pb-7 pt-1">
                          <h3 className="font-sora text-[21px] font-normal text-white" style={{ marginBottom: 8, letterSpacing: "-0.01em" }}>Métricas en tiempo real</h3>
                          <p className="font-inter text-[14px] font-light text-white/55" style={{ lineHeight: 1.55 }}>Dashboard de ventas, tráfico y comportamiento desde el día uno.</p>
                        </div>
                      </div>
                    </div>

                    {/* Carousel controls — arrows + dot indicators */}
                    <div className="mt-7 flex items-center justify-center gap-4">
                      <button
                        type="button"
                        onClick={() => scrollIncluye(-1)}
                        aria-label="Anterior"
                        className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-black/70 transition-colors hover:border-black/25 hover:text-black"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: incluyePages }, (_, i) => i).map((i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => goIncluye(i)}
                            aria-label={`Ir a la tarjeta ${i + 1}`}
                            className="cursor-pointer rounded-full border-none p-0 transition-all duration-200"
                            style={{ width: incluyeIdx === i ? 22 : 8, height: 8, background: incluyeIdx === i ? "#DB3B2B" : "rgba(0,0,0,0.18)" }}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => scrollIncluye(1)}
                        aria-label="Siguiente"
                        className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-black/70 transition-colors hover:border-black/25 hover:text-black"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>
                    </div>
                  </div>
                </section>
                )}

                {/* ── Todo incluido + métricas: degradado continuo #1A0A0A (arriba) → #000 (abajo) ── */}
                <div className="relative" style={{ background: "linear-gradient(180deg, #1A0A0A 0%, #000000 100%)" }}>
                {/* ── Todo incluido desde el día uno (fondo oscuro, continúa con métricas) ── */}
                <TodoIncluidoDark />

                {/* ── Stats with count-up (fondo transparente: hereda el degradado) ── */}
                <section className="relative px-5 py-20 tablet:px-10 tablet:py-24">
                  <div className="mx-auto max-w-[var(--max-w)]">
                    <div data-modal-animate className="mx-auto max-w-[640px] text-center" style={{ marginBottom: 48 }}>
                      <h2 className="font-sora text-[32px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                        Los números hablan.
                      </h2>
                    </div>

                    <div data-modal-animate className="grid grid-cols-1 gap-10 text-center tablet:grid-cols-3">
                      <div data-stagger style={{ ["--i" as string]: 0 }}>
                        <CountStat end={1} prefix="<" suffix=" min" label="para crear tu tienda" />
                      </div>
                      <div data-stagger style={{ ["--i" as string]: 1 }}>
                        <CountStat end={6} prefix="+" suffix=" mil" label="tiendas creadas con T1" />
                      </div>
                      <div data-stagger style={{ ["--i" as string]: 2 }}>
                        <CountStat end={5} prefix="+" label="métodos de pago" />
                      </div>
                    </div>
                  </div>
                </section>
                </div>

                {/* ── FAQ (fondo oscuro) ── */}
                <section className="relative bg-black px-5 py-24 tablet:px-10 tablet:py-32">
                  <div className="mx-auto max-w-[760px]">
                    <div data-modal-animate className="text-center" style={{ marginBottom: 40 }}>
                      <h2 className="font-sora text-[32px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>
                        Preguntas frecuentes
                      </h2>
                    </div>
                    <div data-modal-animate className="flex flex-col gap-3">
                      {[
                        { q: "¿Necesito saber programar?", a: "No. La IA crea tu tienda y el editor visual te permite ajustar todo sin código." },
                        { q: "¿Cuánto tarda en estar lista?", a: "Menos de 2 minutos para la primera versión. Puedes seguir personalizándola sin límite." },
                        { q: "¿Puedo usar mi propio dominio?", a: "Sí. Conecta tu dominio existente o usa uno de cortesía mientras decides." },
                        { q: "¿Cómo recibo el dinero de mis ventas?", a: "Cada venta entra a tu cuenta de T1 Pagos. Con SPEI y transferencias el pago se acredita en minutos, y con tarjeta se confirma al momento; en ambos casos el dinero queda disponible para retiro al día siguiente hábil (T+1)." },
                      ].map((f, i) => (
                        <details
                          key={f.q}
                          data-stagger
                          className="group rounded-[14px] border border-white/[0.08] bg-white/[0.03] transition-all duration-200 open:border-[rgba(219,59,43,0.4)] open:bg-white/[0.05]"
                          style={{ ["--i" as string]: i }}
                        >
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-sora text-[16px] font-normal text-white transition-colors duration-150 hover:text-[#FF6F5E]">
                            {f.q}
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-white/40 transition-transform duration-300 group-open:rotate-180 group-open:text-[#FF6F5E]">
                              <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </summary>
                          <p className="px-6 pb-5 font-inter text-[14px] font-light text-white/60" style={{ lineHeight: 1.65 }}>
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
    id: "t1tienda-en-linea",
    title: "Crea tu tienda con IA con T1 Tienda",
    description:
      "Describe tu negocio y la IA crea tu tienda, lista para vender, con envíos y pagos integrados.",
    bgImage: null,
    bgCSS: "stack-bg-tienda-online",
    panelLeft: null,
    panelRight: "ai-prompt",
    ctaLabel: "Crea tu tienda con IA",
    ctaHref: "/productos/t1tienda/tienda-con-ia",
  },
  {
    id: "t1tienda",
    title: "Gestiona todas tus ventas en T1 Tienda",
    description:
      "Gestiona pedidos, revisa tu dashboard de ventas y ten visibilidad omnicanal de Mercado Libre, Amazon, Shein y más.",
    bgImage: null,
    bgCSS: "stack-bg-tienda",
    panelLeft: "/img/card-producto.webp",
    panelRight: "/img/lista-pedidos-t1.webp",
    ctaLabel: "Conoce los reportes",
    ctaHref: "/productos/t1tienda/reportes",
  },
  {
    id: "t1pagos",
    title: "Cobra de forma fácil y segura con T1 Pagos",
    description:
      "Crea links de pago en segundos y cobra a distancia desde un solo lugar.",
    bgImage: null,
    bgCSS: "stack-bg-pagos",
    panelLeft: "/img/pagos.webp",
    panelRight: null,
    ctaLabel: "Empezar a cobrar",
    ctaHref: "/productos/t1pagos/links-de-pago",
  },
  {
    id: "t1pos",
    title: "Cobra en tu tienda física con T1 POS",
    description:
      "Vende en persona con el mismo catálogo, inventario y pagos de tu tienda en línea. Corta caja y entrega tickets al instante.",
    bgImage: null,
    bgCSS: "stack-bg-pos",
    panelLeft: null,
    panelRight: null,
    ctaLabel: "Conoce T1 POS",
    ctaHref: "/productos/t1tienda/punto-de-venta",
  },
  {
    id: "t1envios",
    title: "Envía a todo México con T1 Envíos",
    description:
      "Cotiza +10 paqueterías y crea guías en segundos. Sin mensualidad ni mínimo de envíos.",
    bgImage: null,
    bgCSS: "stack-bg-envios",
    panelLeft: "/img/envios.svg",
    panelRight: null,
    ctaLabel: "Cotizar envío",
    ctaHref: "/productos/t1envios/multipaqueteria",
  },
];

/* Opaque per-card backstop colors keyed on bgCSS. Each is the darkest base of
   that card's CSS gradient, painted as a solid `background` on the card itself
   so the card can NEVER be transparent — even the instant Safari fails to
   composite the gradient layer over the sticky hero <video>, the worst case is
   a brief solid dark card instead of the video bleeding through. */
const STACK_BACKSTOP: Record<string, string> = {
  "stack-bg-tienda-online": "#2c1c1e",
  "stack-bg-tienda": "#140a14",
  "stack-bg-pagos": "#0a0f1a",
  "stack-bg-envios": "#100a18",
  "stack-bg-pos": "#170b12",
};

/* AI "sparkle" — the two-star ✨ motif that signals an AI-generated capability.
   Replaces the checkmark on the Tienda en línea card's bullets (CEO: "en lugar
   del check mark las estrellas de IA") and echoes the IA section accent. */
function AISparkle({ size = 16, color = "#FF9E86" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M11 1.6l1.75 6.9 6.9 1.75-6.9 1.75L11 18.85 9.25 11.95 2.35 10.25 9.25 8.5 11 1.6z" fill={color} />
      <path d="M19.2 13.3l.85 3.05 3.05.85-3.05.85-.85 3.05-.85-3.05-3.05-.85 3.05-.85.85-3.05z" fill={color} opacity="0.85" />
    </svg>
  );
}

/* Renders a string with the standalone word "IA" in bold (CEO: "en las stack
   cards pon en bold IA"). Splits on the uppercase token with word boundaries so
   accented words like "guías" or "paquetería" are never affected. */
function withBoldIA(text: string) {
  return text.split(/(\bIA\b)/).map((part, i) =>
    part === "IA" ? (
      <strong key={i} className="font-semibold text-white">
        IA
      </strong>
    ) : (
      part
    )
  );
}

/* Tienda en línea — AI capability bullets (CEO: "crea tu tienda con IA, crear
   imágenes, crear productos con una foto"). Shared by the desktop list and the
   compact mobile list so the copy stays in one place. */
/* PaymentMethodsGrid removed — the Pagos stack card now uses feature bullets,
   matching the other cards (CEO: "agrega bullet points en todos los cards
   stacks como en la stack card de tienda"). */

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
            <p className="mt-1 text-[11px] text-black/50 text-center">Tenis blancos clásicos</p>
            <p className="mt-0.5 text-[18px] font-bold text-black">$1,345.99</p>
          </div>
          <div className="border-t border-black/[0.06] px-5 py-2.5">
            <p className="text-[11px] font-semibold text-black/70" style={{ marginBottom: 6 }}>Método de pago</p>
            {/* Credit card — SELECTED with MSI dropdown inside */}
            <div className="rounded-[8px] border border-[#E26153]" style={{ marginBottom: 8 }}>
              <div className="flex items-center gap-2 px-3 py-2.5">
                <div className="h-[8px] w-[8px] rounded-full bg-[#E26153]" />
                <span className="text-[11px] font-medium text-black/70">Tarjetas de crédito o débito</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <Image src="/img/icons/visa.svg" alt="Visa" width={26} height={10} className="h-[10px] w-auto" />
                  <Image src="/img/icons/mastercard.svg" alt="Mastercard" width={16} height={10} className="h-[12px] w-auto" />
                  <Image src="/img/icons/amex.svg" alt="American Express" width={16} height={12} className="h-[12px] w-auto" />
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
            <div
              className="flex items-center gap-2 rounded-[8px] border border-black/[0.06] px-3 py-2.5"
              style={{ marginBottom: 8 }}
            >
              <div className="h-[8px] w-[8px] rounded-full border-2 border-black/15" />
              <span className="text-[11px] text-black/50">Transferencia bancaria</span>
              <Image src="/img/icons/spei.svg" alt="SPEI" width={26} height={10} className="ml-auto h-[12px] w-auto" />
            </div>
            {/* Kueski — unselected (buy-now-pay-later) */}
            <div className="flex items-center gap-2 rounded-[8px] border border-black/[0.06] px-3 py-2.5">
              <div className="h-[8px] w-[8px] rounded-full border-2 border-black/15" />
              <span className="text-[11px] text-black/50">Pago a plazos</span>
              <Image src="/img/icons/kueski.svg" alt="Kueski Pay" width={32} height={13} className="ml-auto h-[13px] w-auto" />
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
              <span className="text-[14px] font-bold text-white">Pagar $1,345.99</span>
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

/* ── Tienda card: channels-activating UI + floating "Nuevo pedido" badge.
   The channels view is restored as the primary capa 1 (matches the real
   T1 admin "Canales de venta" screen). The only marketing animation on
   top is the rotating <TiendaNuevoPedidoBadge> in Oxford navy. */

const TIENDA_NUEVO_PEDIDO = [
  { canal: "TikTok",        monto: "$1,345.99", src: "/img/tiktok-isotipo.png" },
  { canal: "Mercado Libre", monto: "$2,150.00", src: "/img/meli-iso.svg" },
  { canal: "Amazon",        monto: "$3,890.00", src: "/img/amazon-iso.svg" },
  { canal: "SHEIN",         monto: "$450.00",   src: "/img/shein-iso.svg" },
  { canal: "Walmart",       monto: "$1,200.00", src: "/img/walmart.svg" },
];

const OXFORD = "#0A1F3F";

type TiendaBadgeOrientation = "desktop" | "mobile";

function TiendaNuevoPedidoBadge({
  visible,
  orientation,
}: {
  visible: boolean;
  orientation: TiendaBadgeOrientation;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!visible) {
      setIdx(0);
      return;
    }
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIdx(0);
      return;
    }
    const interval = window.setInterval(() => {
      setIdx((i) => (i + 1) % TIENDA_NUEVO_PEDIDO.length);
    }, 2800);
    return () => window.clearInterval(interval);
  }, [visible]);

  const a = TIENDA_NUEVO_PEDIDO[idx];

  // The badge wrapper stays mounted (no key change). Only the inner text
  // pieces (channel name + amount) crossfade in place when idx changes.
  const badge = (
    <div
      className="overflow-hidden rounded-[12px] bg-white"
      style={{
        boxShadow:
          "0 16px 32px -10px rgba(10,31,63,0.18), 0 0 0 1px rgba(10,31,63,0.08)",
      }}
    >
      <div
        className="flex items-center gap-1.5"
        style={{
          padding: orientation === "desktop" ? "8px 14px 6px" : "7px 11px 5px",
          borderBottom: "1px solid rgba(10,31,63,0.08)",
        }}
      >
        <svg
          width={orientation === "desktop" ? 11 : 10}
          height={orientation === "desktop" ? 11 : 10}
          viewBox="0 0 28 28"
          fill="none"
        >
          <path
            d="M14 3L16.5 10.5L24 13L16.5 15.5L14 23L11.5 15.5L4 13L11.5 10.5L14 3Z"
            stroke="#DB3B2B"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="rgba(219,59,43,0.18)"
          />
        </svg>
        <span
          className={`font-inter font-bold uppercase ${
            orientation === "desktop" ? "text-[10px]" : "text-[9px]"
          }`}
          style={{ color: OXFORD, letterSpacing: "0.10em" }}
        >
          Nuevo pedido
        </span>
      </div>
      <div
        className="flex items-center gap-2"
        style={{
          padding: orientation === "desktop" ? "9px 14px 11px" : "7px 11px 9px",
        }}
      >
        <Image
          key={`logo-${idx}`}
          src={a.src}
          alt={a.canal}
          width={orientation === "desktop" ? 20 : 18}
          height={orientation === "desktop" ? 20 : 18}
          className="tienda-text-fade rounded-full object-contain"
        />
        <span
          key={`canal-${idx}`}
          className={`tienda-text-fade font-inter font-semibold ${
            orientation === "desktop" ? "text-[12px]" : "text-[11px]"
          }`}
          style={{ color: "#1A1A1A" }}
        >
          {a.canal}
        </span>
        <span
          key={`monto-${idx}`}
          className={`tienda-text-fade ml-auto font-inter font-bold tabular-nums ${
            orientation === "desktop" ? "text-[14px]" : "text-[12px]"
          }`}
          style={{ color: OXFORD }}
        >
          {a.monto}
        </span>
      </div>

      <style jsx>{`
        .tienda-text-fade { animation: tiendaTextFade 0.6s ease-in-out; }
        @keyframes tiendaTextFade {
          0%   { opacity: 0.25; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );

  if (!visible) return null;

  if (orientation === "desktop") {
    /* Desktop: badge floats over the top-left of the channels grid with
       a vertical dashed line dropping down into the grid area. */
    return (
      <div
        className="pointer-events-none absolute z-30"
        style={{
          top: 210,
          left: -80,
          width: 232,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {badge}
        {/* Dashed connector — from above the badge curves up-right toward
            the "Pedidos" cart icon. Badge wrapper top=210; the far end of
            the path shifted +50px to the right to land closer to the cart. */}
        <svg
          aria-hidden
          width="200"
          height="170"
          className="absolute"
          style={{ top: -150, left: 40, overflow: "visible" }}
        >
          <path
            d="M 90 150 C 90 130 80 110 80 92"
            stroke={OXFORD}
            strokeWidth="1.4"
            strokeDasharray="4 4"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="80" cy="92" r="3" fill={OXFORD} />
        </svg>
      </div>
    );
  }

  /* Mobile: badge floats over the upper area of the phone mockup,
     shifted ~60px to the right of horizontal center. No connector line. */
  return (
    <div
      className="pointer-events-none absolute z-30"
      style={{
        top: 90,
        left: "50%",
        transform: "translateX(calc(-50% + 60px))",
        width: 220,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}
    >
      {badge}
    </div>
  );
}

/* ── Channels list — shared between Mobile and Desktop. Each entry
   maps to a card in the "Marketplace" grid that animates from
   "Conectar →" to "Conectado ✓" sequentially. */
const TIENDA_CHANNELS_DESKTOP = [
  { id: "amazon", name: "Amazon", src: "/img/amazon-iso.svg" },
  { id: "meli", name: "Mercado Libre", src: "/img/meli-iso.svg" },
  { id: "shein", name: "SHEIN", src: "/img/shein-iso.svg" },
  { id: "walmart", name: "Walmart", src: "/img/walmart.svg" },
  { id: "tiktok", name: "TikTok", src: "/img/tiktok-isotipo.png" },
  { id: "sears", name: "Sears", src: "/img/sears-isotipo.svg" },
];

const TIENDA_CHANNELS_MOBILE = [
  { id: "amazon", name: "Amazon", src: "/img/amazon-iso.svg" },
  { id: "meli", name: "Mercado Libre", src: "/img/meli-iso.svg" },
  { id: "shein", name: "SHEIN", src: "/img/shein-iso.svg" },
  { id: "tiktok", name: "TikTok", src: "/img/tiktok-isotipo.png" },
];

/* ── Mobile Tienda Panel ── */
function MobileTiendaPanel({ animate }: { animate: boolean }) {
  const [connectedCount, setConnectedCount] = useState(0);
  // Badge appears as soon as the first channel activates (not after all
  // are connected). Once visible it stays — only the text inside rotates.
  const badgeVisible = connectedCount >= 1;

  useEffect(() => {
    if (!animate) {
      setConnectedCount(0);
      return;
    }
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setConnectedCount(TIENDA_CHANNELS_MOBILE.length);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < TIENDA_CHANNELS_MOBILE.length; i++) {
      timers.push(setTimeout(() => setConnectedCount(i + 1), 1200 + i * 1300));
    }
    return () => timers.forEach(clearTimeout);
  }, [animate]);

  return (
    <div className="relative mx-auto mt-5" style={{ width: "85%", maxWidth: 300 }}>
      <div
        className="flex flex-col overflow-hidden bg-white tablet:hidden"
        style={{
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
          <span className="text-[14px] font-bold text-black">Canales de venta</span>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden px-3 pt-2">
          <p className="text-[10px] font-normal text-black/55" style={{ marginBottom: 8 }}>
            Aumenta tus ventas activando canales
          </p>

          {/* Tabs */}
          <div
            className="flex items-center gap-3 border-b border-black/[0.06]"
            style={{ paddingBottom: 6, marginBottom: 8 }}
          >
            <span className="relative text-[10px] font-semibold text-black">
              Todos
              <span className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-[#DB3B2B]" />
            </span>
            <span className="text-[10px] font-normal text-black/40">Activos</span>
            <span className="text-[10px] font-normal text-black/40">Próximos</span>
          </div>

          <p className="text-[10px] font-bold text-black" style={{ marginBottom: 6 }}>
            Marketplace
          </p>

          <div className="flex flex-col gap-1.5 overflow-hidden">
            {TIENDA_CHANNELS_MOBILE.map((ch, i) => {
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
                      className="tienda-pill-fade flex items-center gap-1 rounded-full"
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
                        padding: "3px 8px",
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

        <style jsx>{`
          .tienda-pill-fade { animation: tiendaPillFade 0.35s ease-out; }
          @keyframes tiendaPillFade {
            from { opacity: 0; transform: scale(0.85); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>

      {/* Floating "Nuevo pedido" badge — appears once all channels are connected */}
      <TiendaNuevoPedidoBadge visible={badgeVisible} orientation="mobile" />
    </div>
  );
}

/* ── Desktop Tienda Panel ── */
function DesktopTiendaPanel({ animate }: { animate: boolean }) {
  const [connectedCount, setConnectedCount] = useState(0);
  // Badge appears once the first channel activates and stays mounted —
  // only the text inside rotates afterwards.
  const badgeVisible = connectedCount >= 1;

  useEffect(() => {
    if (!animate) {
      setConnectedCount(0);
      return;
    }
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setConnectedCount(TIENDA_CHANNELS_DESKTOP.length);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < TIENDA_CHANNELS_DESKTOP.length; i++) {
      timers.push(setTimeout(() => setConnectedCount(i + 1), 900 + i * 900));
    }
    return () => timers.forEach(clearTimeout);
  }, [animate]);

  const channelsContent = (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div
        className="border-b border-black/[0.04] px-5"
        style={{ paddingTop: 18, paddingBottom: 14 }}
      >
        <h3 className="text-[18px] font-bold text-black">Canales de venta</h3>
        <p className="text-[11px] font-normal text-black/55" style={{ marginTop: 2 }}>
          Aumenta tus ventas activando más canales
        </p>
      </div>

      <div className="flex items-center gap-5 border-b border-black/[0.04] px-5" style={{ paddingTop: 8 }}>
        <span
          className="relative inline-flex items-center text-[11px] font-semibold text-black"
          style={{ paddingBottom: 8 }}
        >
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

      <div className="px-5" style={{ paddingTop: 12, paddingBottom: 6 }}>
        <div
          className="flex items-center gap-2 rounded-[8px] border border-black/[0.06]"
          style={{ padding: "7px 10px" }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
            <path d="M11 11L14 14" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-[10px] text-black/35">Buscar producto</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden px-5" style={{ paddingTop: 6, paddingBottom: 14 }}>
        <p className="text-[12px] font-bold text-black" style={{ marginBottom: 10 }}>
          Marketplace
        </p>
        <div className="grid flex-1 grid-cols-3 gap-2.5" style={{ gridAutoRows: "1fr" }}>
          {TIENDA_CHANNELS_DESKTOP.map((ch, i) => {
            const active = i < connectedCount;
            return (
              <div
                key={ch.id}
                className="flex flex-col justify-between rounded-[10px] border border-black/[0.06] bg-white"
                style={{
                  padding: "12px 14px",
                  boxShadow: "0 2px 8px -2px rgba(0,0,0,0.04)",
                  minHeight: 90,
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center overflow-hidden rounded-[7px] border border-black/[0.06] bg-white">
                    <Image
                      src={ch.src}
                      alt={ch.name}
                      width={26}
                      height={26}
                      className="object-contain"
                      style={{ maxHeight: 24, width: "auto" }}
                    />
                  </div>
                  <span className="truncate text-[11px] font-semibold text-black">
                    {ch.name}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  {active ? (
                    <span
                      key="active"
                      className="tienda-pill-fade-d inline-flex items-center gap-1 rounded-[5px]"
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
                      <span
                        className="text-[8px] font-bold uppercase tracking-wide"
                        style={{ letterSpacing: "0.05em" }}
                      >
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
                      <span
                        className="text-[8px] font-bold uppercase tracking-wide"
                        style={{ letterSpacing: "0.05em" }}
                      >
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
        .tienda-pill-fade-d { animation: tiendaPillFadeD 0.35s ease-out; }
        @keyframes tiendaPillFadeD {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );

  return (
    <div className="relative h-full w-full">
      <PedidosPanel animate={false} activeIconLabel="Pedidos" contentOverride={channelsContent} />
      <TiendaNuevoPedidoBadge visible={badgeVisible} orientation="desktop" />
    </div>
  );
}
/* ── Main Component ── */
export default function T1Features() {
  const tiendaRef = useRef<HTMLDivElement>(null);
  const [tiendaVisible, setTiendaVisible] = useState(false);
  const tiendaOnlineRef = useRef<HTMLDivElement>(null);
  const [tiendaOnlineVisible, setTiendaOnlineVisible] = useState(false);
  const enviosRef = useRef<HTMLDivElement>(null);
  const [enviosVisible, setEnviosVisible] = useState(false);
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
    const pairs: [HTMLDivElement | null, (v: boolean) => void][] = [
      [tiendaRef.current, setTiendaVisible],
      [tiendaOnlineRef.current, setTiendaOnlineVisible],
      [enviosRef.current, setEnviosVisible],
    ];
    const observers = pairs
      .filter(([el]) => el)
      .map(([el, setter]) => {
        const observer = new IntersectionObserver(
          ([entry]) => setter(entry.isIntersecting),
          { threshold: 0.3 }
        );
        observer.observe(el as HTMLDivElement);
        return observer;
      });
    return () => observers.forEach((o) => o.disconnect());
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
    <section className="stack-section-bg isolate rounded-t-[24px] pb-[60px] pt-0 tablet:rounded-t-[28px] tablet:pt-[60px] tablet:pb-[60px]">
      {/* Mobile-only full-width divider between the dark intro section
          and the stack cards. Light hairline now that the bg is dark. */}
      <div
        aria-hidden
        className="tablet:hidden"
        style={{ height: 1, width: "100%", background: "rgba(255,255,255,0.08)" }}
      />

      {/* Section heading */}
      <div className="mx-auto max-w-[var(--max-w)] px-5 text-center tablet:px-6" style={{ paddingTop: 44 }}>
        <h2 className="mx-auto font-sora text-[28px] font-light text-white tablet:whitespace-nowrap tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 44 }}>
          Lo que tu negocio necesita
        </h2>
      </div>


      {/* ── Stacking showcase cards with scale-down effect ──
          Transparent now that the whole block is dark — any sliver of bg that
          becomes visible (e.g. when Safari's URL bar hides and the viewport
          grows beyond 100svh, leaving ~80px below each card) shows the
          stack-section-bg charcoal instead of flashing a light gray. */}
      <div className="bg-transparent">
      <div className="stack-card-container relative mx-auto max-w-[var(--max-w)] px-5 tablet:px-6">
        {SHOWCASE_CARDS.map((card, idx) => (
          <div
            key={card.id}
            className="stack-card sticky cursor-pointer overflow-hidden rounded-[12px] tablet:rounded-[15px]"
            style={{
              top: `${70 + idx * 20}px`,
              marginBottom: 40,
              height: 580,
              zIndex: idx + 1,
              // Opaque backstop + own stacking context: the card is promoted to
              // a GPU layer by the JS 3D transform; pairing a solid base color
              // with `isolation` guarantees the sticky hero <video> can never
              // composite through it (Safari bleed fix).
              background: STACK_BACKSTOP[card.bgCSS ?? ""] ?? "#0e0d0d",
              isolation: "isolate",
              // Dark-bg legibility: a light hairline ring + a top inset
              // edge-highlight give each card a crisp lit top edge as it
              // stacks (a plain dark drop-shadow disappears on the charcoal
              // section bg). Downward dark shadow keeps depth between layers.
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px rgba(255,255,255,0.08), 0 -8px 28px rgba(0,0,0,0.45), 0 18px 44px rgba(0,0,0,0.4)",
              transformOrigin: "50% 0",
            }}
            data-stack-idx={idx}
            onClick={() => {
              if (card.id === "t1pagos") {
                window.open("https://t1.com/mx/pagos/", "_blank", "noopener,noreferrer");
              } else if (card.id === "t1envios") {
                window.open("https://www.t1.com/mx/envios", "_blank", "noopener,noreferrer");
              } else if (card.id === "t1tienda" || card.id === "t1tienda-en-linea") {
                window.open("https://www.t1.com/mx/tienda", "_blank", "noopener,noreferrer");
              } else if (card.id === "t1pos") {
                window.location.href = "/productos/t1tienda/punto-de-venta";
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
            <div className="absolute inset-0 bg-black/[0.08]" />

            {/* Móvil: flecha animada al final de la card → scroll a la siguiente */}
            {idx < SHOWCASE_CARDS.length - 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const next = document.querySelector(`[data-stack-idx="${idx + 1}"]`);
                  if (next) (next as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                aria-label={`Ir a la siguiente tarjeta (${idx + 2} de ${SHOWCASE_CARDS.length})`}
                className="absolute bottom-4 left-1/2 z-20 flex h-[38px] w-[38px] -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border-none tablet:hidden"
                style={{
                  background: "rgba(0,0,0,0.32)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)",
                }}
              >
                <svg className="scroll-hint" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 6L8 11L13 6" stroke="rgba(255,255,255,0.95)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {/* Content wrapper */}
            <div className="relative z-10 flex h-full flex-col tablet:flex-row" style={{ minHeight: 320 }}>
              {card.id === "t1tienda-en-linea" ? (
                /* ── Tienda en línea — AI prompt panel on the LEFT,
                       text on the RIGHT (swapped from default). ── */
                <div className="flex h-full w-full flex-col tablet:flex-row-reverse" ref={tiendaOnlineRef}>
                  <div className="flex w-full flex-col px-5 pt-24 pb-5 tablet:w-1/2 tablet:justify-center tablet:p-8">
                    <div>
                      <p className="font-sora text-[24px] font-normal text-white tablet:text-[24px] lg:text-[32px]">
                        {card.title}
                      </p>
                      <p className="font-inter text-[16px] font-normal text-white/90 tablet:text-[14px] lg:text-[16px]" style={{ lineHeight: 1.6, marginTop: 8, marginBottom: 18 }}>
                        {withBoldIA(card.description)}
                      </p>
                      {/* CTA — underlined text instead of the small arrow chip
                          (CEO: "el call to action puede ser un texto subrayado"). */}
                      {card.ctaLabel && (
                        <a
                          href={card.ctaHref}
                          target={card.ctaHref?.startsWith("http") ? "_blank" : undefined}
                          rel={card.ctaHref?.startsWith("http") ? "noopener noreferrer" : undefined}
                          onClick={(e) => e.stopPropagation()}
                          className="group/cta inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:border-white/50 hover:bg-white/[0.06]"
                        >
                          {card.ctaLabel}
                          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="shrink-0 transition-transform duration-150 group-hover/cta:translate-x-0.5"><path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </a>
                      )}
                    </div>
                  </div>
                  {/* AI prompt panel — anchored to the LEFT edge of its
                      column (the column is visually on the left of the
                      card now because of flex-row-reverse). */}
                  <div className="hidden w-1/2 items-end justify-start tablet:flex" style={{ paddingTop: 60 }}>
                    <TiendaPromptPanel animate={tiendaOnlineVisible} />
                  </div>
                  {/* Mobile: phone-framed landing animation */}
                  <div className="px-5 pb-5 pt-2 tablet:hidden">
                    <TiendaPromptPanel animate={tiendaOnlineVisible} mobile />
                  </div>
                </div>
              ) : card.panelRight ? (
                /* ── Two-column layout (T1 Tienda) ── */
                <>
                  {/* Left column — text at top + product card below */}
                  <div className="flex w-full flex-col px-5 pt-24 pb-5 tablet:w-1/2 tablet:justify-center tablet:p-8" ref={tiendaRef}>
                    {/* Text info at top */}
                    <div style={{ maxWidth: 380 }}>
                      <p className="font-sora text-[24px] font-normal text-white tablet:text-[24px] lg:text-[32px]">
                        {card.title}
                      </p>
                      <p
                        className="font-inter text-[16px] font-normal text-white/90 tablet:text-[14px] lg:text-[16px]"
                        style={{ lineHeight: 1.6, marginTop: 8, marginBottom: 18 }}
                      >
                        {withBoldIA(card.description)}
                      </p>
                      {card.ctaLabel && (
                        <a
                          href={card.ctaHref}
                          target={card.ctaHref?.startsWith("http") ? "_blank" : undefined}
                          rel={card.ctaHref?.startsWith("http") ? "noopener noreferrer" : undefined}
                          onClick={(e) => e.stopPropagation()}
                          className="group/cta inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:border-white/50 hover:bg-white/[0.06]"
                        >
                          {card.ctaLabel}
                          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="shrink-0 transition-transform duration-150 group-hover/cta:translate-x-0.5"><path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </a>
                      )}
                    </div>

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
                /* ── Two-column layout (T1 Pagos) — phone panel on the
                       LEFT, text/payment-method tiles on the RIGHT. ── */
                <div className="flex h-full w-full flex-col tablet:flex-row-reverse">
                  {/* Right column (visually): text at top, payment methods centered below */}
                  <div className="flex w-full flex-col px-5 pt-24 pb-5 tablet:w-1/2 tablet:justify-center tablet:p-8 lg:p-10">
                    <div style={{ maxWidth: 420 }}>
                      <p className="font-sora text-[24px] font-normal text-white tablet:text-[24px] lg:text-[32px]">
                        {card.title}
                      </p>
                      <p className="font-inter text-[16px] font-normal text-white/90 tablet:text-[14px] lg:text-[16px]" style={{ lineHeight: 1.6, marginTop: 8, marginBottom: 18 }}>
                        {withBoldIA(card.description)}
                      </p>
                      {card.ctaLabel && (
                        <a
                          href={card.ctaHref}
                          target={card.ctaHref?.startsWith("http") ? "_blank" : undefined}
                          rel={card.ctaHref?.startsWith("http") ? "noopener noreferrer" : undefined}
                          onClick={(e) => e.stopPropagation()}
                          className="group/cta inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:border-white/50 hover:bg-white/[0.06]"
                        >
                          {card.ctaLabel}
                          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="shrink-0 transition-transform duration-150 group-hover/cta:translate-x-0.5"><path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </a>
                      )}
                    </div>

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
                      <div style={{ marginTop: 40, marginBottom: -25 }}>
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
                <div className="flex h-full w-full flex-col tablet:flex-row" ref={enviosRef}>
                  <div className="flex w-full flex-col px-5 pt-24 pb-5 tablet:w-1/2 tablet:justify-center tablet:p-8">
                    <div>
                      <p className="font-sora text-[24px] font-normal text-white tablet:text-[24px] lg:text-[32px]">
                        {card.title}
                      </p>
                      <p className="font-inter text-[16px] font-normal text-white/90 tablet:text-[14px] lg:text-[16px]" style={{ lineHeight: 1.6, marginTop: 8, marginBottom: 18 }}>
                        {withBoldIA(card.description)}
                      </p>
                      {card.ctaLabel && (
                        <a
                          href={card.ctaHref}
                          target={card.ctaHref?.startsWith("http") ? "_blank" : undefined}
                          rel={card.ctaHref?.startsWith("http") ? "noopener noreferrer" : undefined}
                          onClick={(e) => e.stopPropagation()}
                          className="group/cta inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:border-white/50 hover:bg-white/[0.06]"
                        >
                          {card.ctaLabel}
                          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="shrink-0 transition-transform duration-150 group-hover/cta:translate-x-0.5"><path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </a>
                      )}
                    </div>
                    {/* Mobile: cotizador in a phone frame */}
                    {isDesktop !== true && (
                      <div className="pb-5 pt-2">
                        <CotizadorPanel animate={enviosVisible} mobile />
                      </div>
                    )}
                  </div>
                  {/* CotizadorPanel — matches Marketplaces panel width (w-1/2) */}
                  {isDesktop !== false && (
                    <div className="hidden w-1/2 items-end justify-end tablet:flex" style={{ paddingTop: 60 }}>
                      <CotizadorPanel animate={enviosVisible} />
                    </div>
                  )}
                </div>
              ) : card.id === "t1pos" ? (
                /* ── Punto de venta — checkout animation panel on the LEFT,
                       text on the RIGHT (same semi-cut screen + glass border
                       style as the other cards). ── */
                <div className="flex h-full w-full flex-col tablet:flex-row-reverse">
                  {/* Text column (visually RIGHT) */}
                  <div className="flex w-full flex-col px-5 pt-24 pb-5 tablet:w-1/2 tablet:justify-center tablet:p-8 lg:p-10">
                    <div style={{ maxWidth: 420 }}>
                      <p className="font-sora text-[24px] font-normal text-white tablet:text-[24px] lg:text-[32px]">
                        {card.title}
                      </p>
                      <p className="font-inter text-[16px] font-normal text-white/90 tablet:text-[14px] lg:text-[16px]" style={{ lineHeight: 1.6, marginTop: 8, marginBottom: 18 }}>
                        {card.description}
                      </p>
                      {card.ctaLabel && (
                        <a
                          href={card.ctaHref}
                          onClick={(e) => e.stopPropagation()}
                          className="group/cta inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:border-white/50 hover:bg-white/[0.06]"
                        >
                          {card.ctaLabel}
                          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="shrink-0 transition-transform duration-150 group-hover/cta:translate-x-0.5"><path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </a>
                      )}
                    </div>
                  </div>
                  {/* Panel column (visually LEFT) — the same checkout animation
                      as the POS sublanding ("Marca y cobra en segundos"), in its
                      phone frame. Anchored to the TOP so the screen bleeds off the
                      BOTTOM edge (semi-cut screen + GlassScreen border). The mock's
                      action buttons sit raised (extra bottom padding inside the
                      phone) so they stay visible above the cut. */}
                  <div className="hidden w-1/2 items-start justify-center overflow-hidden tablet:flex" style={{ paddingTop: 44 }}>
                    <div style={{ width: "100%", maxWidth: 300 }}>
                      <PosCheckoutMobileScreen liftButtons />
                    </div>
                  </div>
                  {/* Mobile: checkout phone mock */}
                  <div className="mx-auto px-5 pb-5 pt-2 tablet:hidden" style={{ maxWidth: 270 }}>
                    <PosCheckoutMobileScreen />
                  </div>
                </div>
              ) : (
                /* ── Single panel layout (fallback) ── */
                <div className="flex w-full flex-col justify-between px-5 pt-24 pb-5 tablet:p-8 lg:p-10">
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

      </div>

      {/* Modal */}
      {modalCard && typeof document !== "undefined" && createPortal(
        <ProductModal cardId={modalCard} onClose={closeModal} />,
        document.body
      )}
    </section>
  );
}
