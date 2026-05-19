"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { SIGNUP_URL } from "@/lib/constants";

/* ── Auto-tilt glass card wrapper with animated blob ── */
function AutoTiltCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div
      className="glass-card-wrapper w-[300px]"
      style={{ animation: `cardTilt 6s ease-in-out ${delay}s infinite` }}
    >
      <div className="glass-card">
        {/* Animated white blob for depth */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: "radial-gradient(ellipse 200px 200px at 30% 20%, rgba(255,255,255,0.08) 0%, transparent 70%)",
            animation: `blobMove 8s ease-in-out ${delay}s infinite`,
          }}
        />
        <div className="glass-card-spotlight" />
        {children}
      </div>
    </div>
  );
}

/* ── Vende card ── */
function VendeCard() {
  return (
    <AutoTiltCard>
      <div className="relative z-[3] flex flex-col items-center p-6 gap-[14px]" style={{ fontFamily: "var(--font-manrope-var), sans-serif" }}>
        <div className="flex h-[90px] w-[150px] items-center justify-center">
          <Image src="/img/tenis-transparente.png" alt="Tenis" width={140} height={90} className="object-contain" />
        </div>
        <p className="text-[26px] font-bold text-white" style={{ letterSpacing: "-0.02em" }}>$1,345.99</p>
        <p className="text-[13px] font-medium text-white/80">Tenis blancos clasicos</p>
        <p className="text-[12px] font-medium text-white/50">1,003 unidades</p>
        <div className="w-full" style={{ height: 1, background: "rgba(255,255,255,0.15)" }} />
        <div className="flex items-center gap-2.5">
          {["/img/meli-iso.svg", "/img/amazon-iso.svg", "/img/walmart.svg", "/img/sears-isotipo.svg", "/img/shein-iso.svg"].map((src, i) => (
            <div key={i} className="flex h-[28px] w-[28px] items-center justify-center overflow-hidden rounded-[7px]">
              <Image src={src} alt="" width={28} height={28} className="object-contain" />
            </div>
          ))}
        </div>
        <div className="w-full rounded-[10px] border border-white/15 bg-white/[0.06] py-2.5 text-center text-[12px] font-medium text-white/55">Comprar</div>
      </div>
    </AutoTiltCard>
  );
}

/* ── Cobra card — payment focused ── */
function CobraCard() {
  return (
    <AutoTiltCard delay={1.5}>
      <div className="relative z-[3] flex flex-col p-5 gap-[10px]" style={{ fontFamily: "var(--font-manrope-var), sans-serif" }}>
        {/* Card info */}
        <div className="flex w-full items-center gap-2.5 rounded-[10px] px-3.5 py-2.5" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div className="flex h-[26px] w-[40px] items-center justify-center overflow-hidden rounded-[4px] bg-white">
            <span className="text-[8px] font-bold text-[#1434CB]">VISA</span>
          </div>
          <div className="flex-1">
            <p className="text-[12px] font-medium text-white">Miguel Luna</p>
            <p className="text-[12px] font-medium text-white/40">•••• •••• •••• 1234</p>
          </div>
        </div>

        {/* MSI dropdown */}
        <div className="flex items-center justify-between rounded-[8px] px-3.5 py-2.5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <p className="text-[11px] font-medium text-white/70">Meses sin intereses</p>
            <p className="text-[13px] font-semibold text-white">6x $224.33 <span className="text-[10px] font-normal text-white/35">MXN/mes</span></p>
          </div>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Divider */}
        <div className="w-full" style={{ height: 1, background: "rgba(255,255,255,0.1)" }} />

        {/* Breakdown */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-white/40">Subtotal</span>
            <span className="text-[11px] text-white/60">$1,495.99</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-white/40">Descuento</span>
            <span className="text-[11px] font-medium text-[#22C55E]">-$150.00</span>
          </div>
          <div className="w-full" style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-white/70">Total</span>
            <span className="text-[20px] font-bold text-white">$1,345.99</span>
          </div>
        </div>

        {/* CTA — ghost (illustrative only) */}
        <div className="mt-1 w-full rounded-[10px] border border-white/15 bg-white/[0.06] py-2.5 text-center text-[12px] font-medium text-white/55">Pagar ahora</div>
      </div>
    </AutoTiltCard>
  );
}

/* ── Envía card ── */
function EnviaCard() {
  return (
    <AutoTiltCard delay={3}>
      <div className="relative z-[3] flex flex-col p-6 gap-[12px]" style={{ fontFamily: "var(--font-manrope-var), sans-serif" }}>
        <div className="flex items-center gap-2.5 rounded-[10px] px-4 py-3" style={{ background: "rgba(255,255,255,0.08)" }}>
          <Image src="/img/dhl-iso.svg" alt="DHL" width={44} height={28} className="object-contain" />
          <span className="text-[13px] font-medium text-white">4657891234</span>
        </div>
        <p className="text-center text-[13px] font-medium text-white/50">Entrega estimada</p>
        <p className="text-center text-[26px] font-bold text-white" style={{ marginBottom: 4 }}>Mañana</p>
        <div className="flex flex-col gap-0 pl-3">
          {[
            { label: "Entregado", sub: "", dim: true },
            { label: "En camino", sub: "Hoy", dim: false },
            { label: "Recolectado", sub: "22 abril", dim: false },
            { label: "Envío creado", sub: "22 abril", dim: false },
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className={`h-[7px] w-[7px] rounded-full ${i === 0 ? "bg-white/40" : "bg-white"}`} />
                {i < 3 && <div className="w-[1px] bg-white/30" style={{ height: 18 }} />}
              </div>
              <div style={{ marginTop: -2 }}>
                <p className={`text-[11px] font-semibold ${step.dim ? "text-white/40" : "text-white"}`}>{step.label}</p>
                {step.sub && <p className="text-[11px] font-light text-white/50">{step.sub}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AutoTiltCard>
  );
}

/* ── Card for "Todo en uno" — orbiting product icons around T1 logo ── */
const ORBIT_ICONS = [
  { src: "/img/icon-tienda.svg", label: "T1tienda" },
  { src: "/img/icon-envios.svg", label: "T1envíos" },
  { src: "/img/icon-pagos.svg", label: "T1pagos" },
  { src: "/img/icon-score.svg", label: "T1score" },
];

function TodoEnUnoCard() {
  // The 420×420 composition with orbit radius 180 gets clipped on small
  // phones (≤375px). Scale the whole thing down to ~70% on mobile so the
  // orbiting icons stay fully visible without rewriting the geometry.
  return (
    <div className="origin-center scale-[0.7] tablet:scale-100">
    <div className="relative flex items-center justify-center" style={{ width: 420, height: 420 }}>
      {/* Orbit circle */}
      <div
        className="absolute rounded-full border border-white/15"
        style={{ width: 360, height: 360 }}
      />
      {/* T1 Logo center */}
      <svg width="60" height="58" viewBox="0 0 45 44" fill="none" className="relative z-10">
        <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985C31.7332 19.1985 31.7332 19.1985 31.7332 19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457C39.6169 19.2457 39.6169 19.1985 39.6169 19.1513C39.6169 19.1041 39.6169 19.1041 39.6169 19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#D93A26" />
        <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506C21.867 13.2034 21.867 13.0617 21.867 13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592C22.2919 12.2592 22.3391 12.2592 22.4335 12.2592H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781C32.6303 6.02781 32.6303 5.9806 32.6303 5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#D93A26" />
      </svg>
      {/* Orbiting icons */}
      <div className="absolute" style={{ width: 360, height: 360, animation: "orbitSpin 20s linear infinite" }}>
        {ORBIT_ICONS.map((icon, i) => {
          const angle = (i / ORBIT_ICONS.length) * 360;
          const rad = (angle * Math.PI) / 180;
          const x = 180 + Math.cos(rad) * 180 - 21;
          const y = 180 + Math.sin(rad) * 180 - 21;
          return (
            <div
              key={i}
              className="group/orbit absolute flex h-[48px] w-[48px] items-center justify-center rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-sm"
              style={{ left: x - 3, top: y - 3, animation: `orbitSpinReverse 20s linear infinite` }}
            >
              <Image src={icon.src} alt={icon.label} width={26} height={26} className="object-contain [filter:brightness(0)_invert(1)]" />
              {/* Hover tooltip */}
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-3 py-1 font-inter text-[11px] font-semibold text-black opacity-0 shadow-lg transition-opacity duration-200 group-hover/orbit:opacity-100">
                {icon.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}

/* ── Words + cards ── */
const WORDS = [
  { text: "Vende", ctaCopy: "Empieza a vender en tu tienda en línea y +10 canales de venta", ctaLabel: "Comenzar gratis" },
  { text: "Cobra", ctaCopy: "Acepta pagos sin renta mensual", ctaLabel: "Comenzar gratis" },
  { text: "Envía", ctaCopy: "Comienza a enviar a todo México.", ctaLabel: "Cotizar envío" },
  { text: "Todo en uno", ctaCopy: "Activa todo el ecosistema en minutos", ctaLabel: "Crear cuenta gratis" },
];

const BG_GRADIENT = "radial-gradient(ellipse at 50% 60%, rgba(226,97,83,0.3) 0%, rgba(226,97,83,0.08) 40%, transparent 70%)";

/* ── Mobile section: Vende/Cobra/Envía as tabs + Todo en uno as scroll-driven ── */
function MobileScrollSections({ cards }: { cards: React.ReactNode[] }) {
  const [tabIdx, setTabIdx] = useState(0); // 0 = Vende, 1 = Cobra, 2 = Envía
  const todoEnUnoRef = useRef<HTMLDivElement>(null);
  const [todoVisible, setTodoVisible] = useState(false);

  useEffect(() => {
    const el = todoEnUnoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setTodoVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="tablet:hidden">
      {/* ── Section 1: Tabs for Vende / Cobra / Envía ── */}
      <div className="px-5" style={{ paddingTop: 60, paddingBottom: 60 }}>
        {/* Tab strip */}
        <div className="flex border-b border-white/10" style={{ marginBottom: 28 }}>
          {WORDS.slice(0, 3).map((w, i) => (
            <button
              key={w.text}
              onClick={() => setTabIdx(i)}
              className="flex-1 cursor-pointer border-none bg-transparent py-3 font-sora text-[16px] font-medium transition-colors duration-200"
              style={{
                color: tabIdx === i ? "#fff" : "rgba(255,255,255,0.4)",
                borderBottom: tabIdx === i ? "2px solid #E26153" : "2px solid transparent",
                marginBottom: -1,
              }}
            >
              {w.text}
            </button>
          ))}
        </div>

        {/* Active card */}
        <div className="relative flex w-full justify-center" style={{ perspective: 800 }}>
          <div className="absolute inset-0 rounded-[20px]" style={{ background: BG_GRADIENT }} />
          <div
            key={tabIdx}
            className="relative z-10 py-6"
            style={{ animation: "fadeSlideIn 0.4s ease-out" }}
          >
            {cards[tabIdx]}
          </div>
        </div>

        {/* Contextual CTA */}
        <div key={`cta-m-${tabIdx}`} className="mt-6 flex flex-col items-center gap-3 text-center" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
          <p className="font-inter text-[13px] font-light text-white/65" style={{ maxWidth: 280 }}>
            {WORDS[tabIdx].ctaCopy}
          </p>
          <a
            href={SIGNUP_URL}
            className="inline-flex h-[42px] items-center rounded-full bg-[#DB3B2B] px-5 font-inter text-[13px] font-semibold text-white no-underline transition-colors duration-200 hover:bg-[#C0332A]"
          >
            {WORDS[tabIdx].ctaLabel}
          </a>
        </div>
      </div>

      {/* ── Section 2: Todo en uno — scroll-driven dramatic reveal ── */}
      <div ref={todoEnUnoRef} className="relative" style={{ height: "100vh" }}>
        <div className="sticky top-0 flex flex-col items-center justify-center px-5" style={{ height: "100vh" }}>
          <h3
            className="mb-6 font-sora text-[36px] font-semibold text-white"
            style={{
              letterSpacing: "-0.03em",
              textAlign: "center",
              opacity: todoVisible ? 1 : 0.3,
              transform: todoVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            {WORDS[3].text}
          </h3>
          <div className="relative flex w-full justify-center" style={{ perspective: 800 }}>
            <div className="absolute inset-0 rounded-[20px]" style={{ background: BG_GRADIENT, opacity: todoVisible ? 1 : 0.5, transition: "opacity 0.6s ease-out" }} />
            <div
              className="relative z-10 py-6"
              style={{
                opacity: todoVisible ? 1 : 0,
                transform: todoVisible ? "scale(1)" : "scale(0.85)",
                filter: todoVisible ? "blur(0px)" : "blur(8px)",
                transition: "opacity 0.7s ease-out, transform 0.7s ease-out, filter 0.6s ease-out",
              }}
            >
              {cards[3]}
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center gap-3 text-center" style={{
            opacity: todoVisible ? 1 : 0,
            transform: todoVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s 0.2s ease-out, transform 0.7s 0.2s ease-out",
          }}>
            <p className="font-inter text-[13px] font-light text-white/65" style={{ maxWidth: 280 }}>
              {WORDS[3].ctaCopy}
            </p>
            <a
              href={SIGNUP_URL}
              className="inline-flex h-[42px] items-center rounded-full bg-[#DB3B2B] px-5 font-inter text-[13px] font-semibold text-white no-underline transition-colors duration-200 hover:bg-[#C0332A]"
            >
              {WORDS[3].ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function T1ScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileOuterRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileTranslateX, setMobileTranslateX] = useState(0);
  const [ctaVisible, setCtaVisible] = useState(false);

  /* Desktop: vertical scroll → active word/card index */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const scrollProgress = -rect.top / (containerHeight - window.innerHeight);
      const clamped = Math.max(0, Math.min(1, scrollProgress));
      const idx = Math.min(WORDS.length - 1, Math.floor(clamped * WORDS.length));
      setActiveIndex(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Mobile: vertical scroll → horizontal translateX */
  useEffect(() => {
    const outer = mobileOuterRef.current;
    if (!outer) return;
    const onScroll = () => {
      const rect = outer.getBoundingClientRect();
      const scrollableHeight = outer.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      // Map progress to translateX: 0% to -(items-1)*100%
      const translate = progress * (WORDS.length - 1) * 100;
      setMobileTranslateX(translate);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { setCtaVisible(entries[0].isIntersecting); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cards = [<VendeCard key="v" />, <CobraCard key="c" />, <EnviaCard key="e" />, <TodoEnUnoCard key="t" />];

  return (
    <div
      className="relative bg-black"
      style={{ borderRadius: "40px 40px 0 0", marginTop: -60 }}
    >
      {/* ── Desktop ── */}
      <div
        ref={containerRef}
        className="hidden tablet:block"
        style={{ height: `${WORDS.length * 100}vh` }}
      >
        <div className="sticky top-0 flex items-center" style={{ height: "100vh" }}>
          <div className="mx-auto flex max-w-[var(--max-w)] items-center px-6" style={{ width: "100%" }}>
            {/* Left — All words listed with subtle gradient blob */}
            <div className="relative w-1/2" style={{ paddingRight: 60 }}>
              {/* Decorative blob behind text */}
              <div
                className="pointer-events-none absolute"
                style={{
                  top: "20%", left: "-20%", width: 400, height: 400, borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(219,59,43,0.06) 0%, transparent 60%)",
                  filter: "blur(50px)",
                }}
              />
              <div className="flex flex-col" style={{ gap: 24 }}>
                {WORDS.map((w, i) => (
                  <h2
                    key={w.text}
                    className="cursor-pointer font-sora font-medium transition-all duration-500 hover:opacity-80"
                    style={{
                      fontSize: 56,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.2,
                      color: activeIndex === i ? "#FFFFFF" : "rgba(255,255,255,0.2)",
                    }}
                    onClick={() => {
                      const container = containerRef.current;
                      if (!container) return;
                      const containerTop = container.getBoundingClientRect().top + window.scrollY;
                      const totalScroll = container.offsetHeight - window.innerHeight;
                      // Center of this word's zone
                      const targetScroll = containerTop + ((i + 0.5) / WORDS.length) * totalScroll;
                      window.scrollTo({ top: targetScroll, behavior: "smooth" });
                    }}
                  >
                    {w.text}
                  </h2>
                ))}
              </div>
            </div>

            {/* Right — Glass cards with PayPal-style 3D transition + contextual CTA */}
            <div className="relative flex w-1/2 flex-col items-center justify-center" style={{ height: "70vh", perspective: 1200 }}>
              {/* Warm glow background */}
              <div
                className="absolute inset-0 rounded-[24px]"
                style={{ background: BG_GRADIENT }}
              />
              {/* Card area */}
              <div className="relative flex flex-1 w-full items-center justify-center">
                {cards.map((card, i) => {
                  const isActive = i === activeIndex;
                  const isPrev = i < activeIndex;
                  return (
                    <div
                      key={i}
                      className="absolute z-10"
                      style={{
                        transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-out, filter 0.6s ease-out",
                        transform: isActive
                          ? "translateY(0) scale(1) rotateX(0deg)"
                          : isPrev
                            ? "translateY(-60px) scale(0.92) rotateX(4deg)"
                            : "translateY(60px) scale(0.92) rotateX(-4deg)",
                        opacity: isActive ? 1 : 0,
                        filter: isActive ? "blur(0px)" : "blur(6px)",
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                    >
                      {card}
                    </div>
                  );
                })}
              </div>
              {/* Contextual CTA below mockup */}
              <div key={`cta-${activeIndex}`} className="relative z-10 flex flex-col items-center gap-3 text-center" style={{ marginTop: 28, animation: "fadeSlideIn 0.4s ease-out" }}>
                <p className="font-inter text-[14px] font-light text-white/70">
                  {WORDS[activeIndex].ctaCopy}
                </p>
                <a
                  href={SIGNUP_URL}
                  className="inline-flex h-[44px] items-center rounded-full bg-[#DB3B2B] px-6 font-inter text-[13px] font-semibold text-white no-underline transition-all duration-200 hover:bg-[#C0332A] hover:scale-[1.02]"
                >
                  {WORDS[activeIndex].ctaLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile — vertical scroll with fade-in/out transitions ── */}
      <MobileScrollSections cards={cards} />

      {/* ── CTA — PayPal brand-moment style: sticky centered, scroll-reveal.
          Container is ~1.2x viewport so the reveal animation finishes inside
          a single scroll gesture — the user no longer needs a second scroll
          to push past empty space before reaching the footer. ── */}
      <div ref={ctaRef} className="h-[120vh] tablet:h-[200vh]">
        <div
          className="sticky top-0 flex items-center justify-center"
          style={{ height: "100vh" }}
        >
          <div
            className="flex flex-col items-center text-center px-6"
            style={{
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? "translateY(0) scale(1)" : "translateY(100px) scale(0.85)",
              filter: ctaVisible ? "blur(0px)" : "blur(8px)",
              transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s ease-out",
            }}
          >
            <h2
              className="mx-auto font-sora text-[32px] font-light text-white tablet:text-[48px] lg:text-[60px]"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: 800, marginBottom: 24 }}
            >
              ¿Listo para conectar{" "}
              <br className="hidden tablet:block" />
              tu negocio con T1?
            </h2>
            <p
              className="mx-auto font-inter text-[15px] font-light text-white/40 tablet:text-[18px]"
              style={{ maxWidth: 500, lineHeight: 1.5, marginBottom: 40 }}
            >
              Comienza gratis y escala al ritmo de tu negocio.
            </p>
            <a
              href={SIGNUP_URL}
              className="inline-flex h-[54px] items-center rounded-[23px] bg-[#DB3B2B] px-10 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-200 hover:bg-[#C0332A] hover:shadow-[0_6px_24px_rgba(226,97,83,0.4)] hover:scale-[1.02] tablet:h-[58px] tablet:px-12 tablet:text-[16px]"
            >
              Comenzar ahora
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
