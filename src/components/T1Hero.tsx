"use client";

import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";

/* Placeholder con efecto typewriter para el prompt del hero */
const PROMPT_PHRASES = [
  "Vendo ropa artesanal",
  "Vendo café de especialidad",
  "Vendo muebles de diseño",
  "Vendo productos de belleza",
];

/* Categorías sugeridas — rellenan el prompt al hacer click */
const PROMPT_CATEGORIES = ["Moda", "Deportes", "Belleza", "Joyería", "Electrónica", "Hogar"];

function HeroPrompt() {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (manual) return;
    const full = PROMPT_PHRASES[idx];
    let delay = deleting ? 45 : 85;
    if (!deleting && text === full) delay = 2200;
    if (deleting && text === "") delay = 350;
    const t = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIdx((p) => (p + 1) % PROMPT_PHRASES.length);
      } else {
        setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, idx, manual]);

  const pickCategory = (cat: string) => {
    setManual(true);
    setDeleting(false);
    setText(`Vendo ${cat.toLowerCase()}`);
  };

  return (
    <div
      className="relative mx-auto w-full overflow-hidden rounded-[20px] bg-white tablet:rounded-[24px]"
      style={{ maxWidth: 718, boxShadow: "0 24px 70px rgba(0,0,0,0.35)" }}
    >
      <div className="flex min-h-[120px] flex-col justify-between px-5 pt-4 pb-4 tablet:min-h-[148px] tablet:px-6 tablet:pt-6 tablet:pb-4">
        <p className="font-inter text-[15px] font-normal leading-relaxed text-black/40 tablet:text-[18px]">
          {text}
          <span
            className="ml-0.5 inline-block w-[2px] bg-black/40 align-text-bottom"
            style={{ height: "1em", animation: "blink 0.75s step-end infinite" }}
          />
        </p>
        <div className="mt-4 flex items-center justify-end gap-2.5">
          <span className="font-inter text-[11px] text-black/35">{text.length}/500</span>
          {/* Crear tienda (primario) */}
          <a
            href={SIGNUP_URL}
            className="inline-flex h-[36px] shrink-0 items-center gap-1.5 rounded-full bg-[#DB3B2B] px-4 font-inter text-[13px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]"
          >
            Crear tienda
            <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
              <path d="M6.75 4.5L11.25 9L6.75 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
      {/* Barra de categorías sugeridas (parte del prompt) — 1 renglón con scroll en móvil */}
      <div
        className="flex items-center gap-2 overflow-x-auto border-t border-black/[0.07] bg-black/[0.015] px-5 py-3 tablet:flex-wrap tablet:justify-center tablet:overflow-visible tablet:px-6"
        style={{ scrollbarWidth: "none" }}
      >
        {PROMPT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => pickCategory(cat)}
            className="shrink-0 rounded-full border border-black/[0.1] bg-white px-3 py-1 font-inter text-[12px] font-medium text-black/65 transition-colors hover:border-black/20 hover:bg-black/[0.04] hover:text-black/80 tablet:text-[13px]"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

/* Chips de soluciones alternas (blancos) */
const SOLUTION_CHIPS = [
  {
    label: "Crea link de pago",
    href: "/productos/t1pagos/links-de-pago",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1 M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
  },
  {
    label: "Cotizar envío",
    href: "/productos/t1envios/multipaqueteria",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M3 7l9-4 9 4v10l-9 4-9-4V7z M3 7l9 4 9-4 M12 11v10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
  },
];

export default function T1Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={rootRef} className="sticky top-0 z-0">
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-5 py-12 tablet:min-h-screen tablet:px-6 tablet:py-28">
        {/* Fondo — degradado + glows */}
        <div aria-hidden className="absolute inset-0 z-0" style={{ background: "linear-gradient(180deg, #141414 0%, #020101 100%)" }} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at 31% 114%, rgba(1,25,69,0.9) 0%, rgba(17,0,85,0) 55%), radial-gradient(circle at -7% 50%, rgba(89,7,7,0.85) 0%, rgba(87,9,9,0) 45%), radial-gradient(circle at 79% 55%, rgba(89,7,7,0.75) 0%, rgba(87,9,9,0) 50%)",
          }}
        />

        {/* Contenido */}
        <div className="relative z-10 flex w-full max-w-[840px] flex-col items-center gap-7 tablet:gap-14">
          <div className="flex w-full flex-col items-center gap-5 tablet:gap-10">
            <div className="flex flex-col items-center text-center" style={{ maxWidth: 660 }}>
              <h1 className="font-sora text-[32px] font-light text-white tablet:text-[48px] lg:text-[54px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.12 }}>
                Vende, cobra y envía.
                <br />
                Todo en uno.
              </h1>
            </div>

            <div className="mx-auto w-full" style={{ maxWidth: 718 }}>
              <p className="mb-2.5 font-inter text-[14px] font-normal text-white/70 tablet:text-[15px]">Crea tu tienda con IA:</p>
              <HeroPrompt />
            </div>
          </div>

          {/* Botones de soluciones — pill horizontal (icono + label + flecha) */}
          <div className="flex flex-col items-center">
            <div className="flex w-full max-w-[400px] flex-nowrap items-center justify-center gap-2.5 tablet:w-auto tablet:max-w-none tablet:gap-4">
              {SOLUTION_CHIPS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="group flex min-w-0 flex-1 basis-0 flex-col items-center justify-center gap-2 rounded-[14px] border border-white/[0.12] bg-white/[0.14] px-3 py-3.5 no-underline transition-all duration-150 hover:border-white/25 hover:bg-white/[0.2] tablet:w-[230px] tablet:flex-none tablet:flex-row tablet:gap-3 tablet:px-0 tablet:py-3.5 tablet:pl-5 tablet:pr-4"
                >
                  <span className="flex shrink-0 items-center text-white/90">{c.icon}</span>
                  <span className="flex items-center justify-center gap-1.5 tablet:contents">
                    <span className="whitespace-nowrap text-center font-inter text-[13px] font-medium text-white/90 tablet:flex-1 tablet:text-[16px]">{c.label}</span>
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" className="shrink-0 text-white/45 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-white/80 tablet:h-[18px] tablet:w-[18px]">
                      <path d="M6.75 4.5L11.25 9L6.75 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-3 text-center">
            {["+25,000 tiendas", "+10M de envíos", "+500mil transacciones"].map((s, i) => (
              <span key={s} className="flex items-center gap-3 font-inter text-[14px] font-medium text-white tablet:text-[16px]">
                {i > 0 && <span className="text-white/40">•</span>}
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
