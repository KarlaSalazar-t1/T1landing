"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Tienda en línea — full-flow landing reveal.
 *
 * Stages:
 *   typing   → renders the T1 landing page mockup with the AI prompt
 *              input typing out a sample query
 *   loading  → fills the whole panel with a skeleton (the "creating
 *              your store" state — full surface, no spinner)
 *   ready    → reveals the finished tienda landing (logo, hero, product
 *              grid, footer)
 */
const PROMPT_TEXT = "Quiero vender comida y accesorios para mascotas";
const FONT = "var(--font-manrope-var), sans-serif";

type Stage = "typing" | "loading" | "ready";

function Spark({ size = 14, color = "#DB3B2B" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5L9.4 6.6L14.5 8L9.4 9.4L8 14.5L6.6 9.4L1.5 8L6.6 6.6L8 1.5Z"
        fill={color}
      />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────
   Stage 1 — Landing with AI prompt
   ──────────────────────────────────────────────────────────────── */
function LandingPrompt({ typed, isActive }: { typed: string; isActive: boolean }) {
  return (
    <div className="flex h-full w-full flex-col" style={{ fontFamily: FONT }}>
      {/* Top nav: T1 logo + condensed nav */}
      <div className="flex items-center justify-between px-5 py-3">
        <svg width="24" height="22" viewBox="0 0 45 44" fill="none">
          <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457V19.1513V19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#D93A26" />
          <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592H22.4335H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#D93A26" />
        </svg>
        <div className="flex items-center gap-3 text-[9px] text-black/60">
          <span>Ecosistema</span>
          <span>¿Qué es T1?</span>
          <span>Iniciar sesión</span>
          <span
            className="rounded-full px-2.5 py-1 text-[8px] font-semibold text-white"
            style={{ background: "#DB3B2B" }}
          >
            Comenzar gratis
          </span>
        </div>
      </div>

      {/* Hero copy + prompt */}
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <h2
          className="text-center font-sora font-normal text-black"
          style={{ fontSize: 26, lineHeight: 1.1, letterSpacing: "-0.025em" }}
        >
          Crea tu tienda en{" "}
          <span style={{ color: "#DB3B2B" }}>segundos</span>
        </h2>
        <p
          className="mt-2 text-center font-inter text-[11px] font-light text-black/60"
          style={{ maxWidth: 380 }}
        >
          T1 te ayuda a vender, cobrar y enviar a todo México. Todo en uno.
        </p>

        {/* Prompt input — big, rounded, like the screenshot */}
        <div
          className="mt-4 w-full overflow-hidden rounded-[18px] border bg-white"
          style={{
            maxWidth: 460,
            borderColor: "rgba(0,0,0,0.08)",
            padding: "16px 18px",
            boxShadow: "0 4px 30px rgba(0,0,0,0.04)",
            minHeight: 90,
          }}
        >
          <span className="font-inter text-[12px] text-black/85" style={{ lineHeight: 1.4 }}>
            {typed}
            {isActive && (
              <span
                className="ml-0.5 inline-block w-[2px] bg-black/70"
                style={{ height: "0.9em", verticalAlign: "text-bottom", animation: "blink 0.7s step-end infinite" }}
              />
            )}
          </span>
          <div className="mt-3 flex items-center justify-end gap-2">
            <span className="font-inter text-[9px] text-black/35">{typed.length}/500</span>
            <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full border border-black/10 bg-white text-black/55">
              <svg width="9" height="9" viewBox="0 0 16 16" fill="none">
                <rect x="6" y="2" width="4" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3.5 8C3.5 10.4853 5.51472 12.5 8 12.5C10.4853 12.5 12.5 10.4853 12.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span
              className="flex h-[22px] w-[22px] items-center justify-center rounded-full text-white"
              style={{ background: "#DB3B2B" }}
            >
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                <path d="M8 13V3M8 3L4 7M8 3L12 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>

        {/* Category chips */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
          {["Moda", "Deportes", "Belleza", "Joyería", "Electrónica", "Hogar"].map((c) => (
            <span
              key={c}
              className="rounded-full bg-black/[0.04] px-2.5 py-1 font-inter text-[9px] font-medium text-black/65"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Stats footer */}
      <div className="flex items-center justify-center gap-3 border-t border-black/[0.05] py-2.5 font-inter text-[9px] text-black/55">
        <span>+5,000 negocios</span>
        <span className="text-black/20">•</span>
        <span>+40,000 envíos</span>
        <span className="text-black/20">•</span>
        <span>+$1,000M procesados</span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Stage 2 — Full-panel skeleton
   ──────────────────────────────────────────────────────────────── */
function SkeletonLanding() {
  return (
    <div
      className="flex h-full w-full flex-col"
      style={{ fontFamily: FONT, animation: "fadeSlideIn 0.4s ease-out" }}
    >
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skel {
          background: linear-gradient(
            90deg,
            rgba(0,0,0,0.04) 0%,
            rgba(0,0,0,0.08) 50%,
            rgba(0,0,0,0.04) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.4s linear infinite;
          border-radius: 6px;
        }
      `}</style>

      {/* Top nav skeleton */}
      <div className="flex items-center justify-between px-5 py-3">
        <div className="skel" style={{ width: 28, height: 22 }} />
        <div className="flex items-center gap-2">
          <div className="skel" style={{ width: 50, height: 10 }} />
          <div className="skel" style={{ width: 60, height: 10 }} />
          <div className="skel" style={{ width: 70, height: 20, borderRadius: 999 }} />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6">
        <div className="skel" style={{ width: "70%", maxWidth: 320, height: 22 }} />
        <div className="skel" style={{ width: "55%", maxWidth: 260, height: 22 }} />
        <div className="skel" style={{ width: "60%", maxWidth: 280, height: 10, marginTop: 6 }} />

        {/* Product grid placeholder */}
        <div className="mt-4 grid w-full max-w-[460px] grid-cols-4 gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skel" style={{ height: 50 }} />
          ))}
        </div>
      </div>

      {/* Stats footer skeleton */}
      <div className="flex items-center justify-center gap-3 border-t border-black/[0.04] py-2.5">
        <div className="skel" style={{ width: 70, height: 10 }} />
        <div className="skel" style={{ width: 70, height: 10 }} />
        <div className="skel" style={{ width: 70, height: 10 }} />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Stage 3 — Finished landing (the tienda the prompt described)
   ──────────────────────────────────────────────────────────────── */
function FinalLanding() {
  const PRODUCTS = [
    { name: "Croquetas Premium", price: "$489" },
    { name: "Collar ajustable", price: "$129" },
    { name: "Juguete dental", price: "$89" },
    { name: "Cama acolchada", price: "$649" },
    { name: "Plato doble", price: "$179" },
    { name: "Snacks naturales", price: "$95" },
    { name: "Transportadora", price: "$899" },
    { name: "Shampoo natural", price: "$199" },
  ];
  return (
    <div className="flex h-full w-full flex-col" style={{ fontFamily: FONT, animation: "fadeSlideIn 0.5s ease-out" }}>
      {/* Branded nav */}
      <div className="flex items-center justify-between border-b border-black/[0.05] px-5 py-3">
        <span className="font-sora text-[14px] font-semibold text-black">PetShop MX</span>
        <div className="flex items-center gap-3 text-[10px] text-black/60">
          <span>Tienda</span>
          <span>Marcas</span>
          <span>Promos</span>
          <span
            className="rounded-full bg-black px-3 py-1 text-[9px] font-semibold text-white"
          >
            Comprar
          </span>
        </div>
      </div>

      {/* Hero band */}
      <div
        className="flex flex-col items-center justify-center gap-1 px-5 py-3"
        style={{
          background: "linear-gradient(135deg, #FFF6F0 0%, #FFE9DD 100%)",
        }}
      >
        <p className="font-sora text-[15px] font-semibold text-black" style={{ letterSpacing: "-0.02em" }}>
          Todo para tu mascota
        </p>
        <p className="font-inter text-[9px] text-black/55">Envíos a todo México · 24 hrs</p>
      </div>

      {/* Product grid */}
      <div className="grid flex-1 grid-cols-4 gap-1.5 p-2.5">
        {PRODUCTS.map((p, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-[6px] border border-black/[0.05] bg-white"
            style={{ animation: `fadeSlideIn 0.4s ease-out ${0.1 + i * 0.05}s both` }}
          >
            <div className="flex h-[40px] items-center justify-center" style={{ background: "#FAF6F2" }}>
              <Image src="/img/tenis-transparente.png" alt="" width={28} height={20} className="object-contain opacity-80" />
            </div>
            <div style={{ padding: "4px 5px" }}>
              <p className="truncate font-inter text-[7.5px] font-medium text-black">{p.name}</p>
              <p className="font-inter text-[8px] font-bold text-black">{p.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer pill */}
      <div className="flex items-center justify-center gap-1 border-t border-black/[0.04] py-2">
        <Spark size={9} />
        <span className="font-inter text-[8px] font-semibold text-black/55">
          Tienda creada con T1 en segundos
        </span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Main panel — wraps with the glass border frame other panels use
   ──────────────────────────────────────────────────────────────── */
export default function TiendaPromptPanel({ animate }: { animate: boolean }) {
  const [typed, setTyped] = useState("");
  const [stage, setStage] = useState<Stage>("typing");

  useEffect(() => {
    if (!animate) {
      setTyped("");
      setStage("typing");
      return;
    }
    let i = 0;
    let typingTimer: ReturnType<typeof setTimeout>;
    let loadingTimer: ReturnType<typeof setTimeout>;
    let readyTimer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (i <= PROMPT_TEXT.length) {
        setTyped(PROMPT_TEXT.slice(0, i));
        i++;
        // Slightly slower typing so the user has time to read it.
        typingTimer = setTimeout(tick, 55 + Math.random() * 25);
      } else {
        // Pause on the completed prompt so user can read it before
        // the skeleton blanks everything out.
        loadingTimer = setTimeout(() => {
          setStage("loading");
          // Spend longer in skeleton too — it's the build-up to the reveal.
          readyTimer = setTimeout(() => setStage("ready"), 2000);
        }, 1200);
      }
    };
    typingTimer = setTimeout(tick, 700);
    return () => {
      clearTimeout(typingTimer);
      clearTimeout(loadingTimer);
      clearTimeout(readyTimer);
    };
  }, [animate]);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ paddingTop: 12, paddingLeft: 12 }}
    >
      {/* Glass border frame */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: "18px 0 0 0",
          background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.03) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), inset 1px 0 0 rgba(255,255,255,0.3)",
        }}
      />

      {/* Inner panel — switches content per stage */}
      <div
        className="relative h-full overflow-hidden"
        style={{
          borderRadius: "14px 0 0 0",
          background:
            stage === "typing"
              ? "radial-gradient(ellipse 80% 55% at 50% 8%, #FFF3EF 0%, #FFFFFF 55%)"
              : "#FFFFFF",
          transition: "background 0.6s ease",
        }}
      >
        {stage === "typing" && <LandingPrompt typed={typed} isActive={true} />}
        {stage === "loading" && <SkeletonLanding />}
        {stage === "ready" && <FinalLanding />}
      </div>
    </div>
  );
}
