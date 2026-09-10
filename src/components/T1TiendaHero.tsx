"use client";

import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { HERO_CHIPS, HERO_PROMPT_PLACEHOLDERS, capFirst, type HeroChip } from "@/lib/heroPrompt";
import HeroBackground from "@/components/HeroBackground";

/* Set unificado de chips y frases (compartido con la home vía @/lib/heroPrompt). */
const PLACEHOLDERS = HERO_PROMPT_PLACEHOLDERS;
const CHIPS = HERO_CHIPS;
const cap = capFirst;

const SOCIAL_PROOF = ["+50,000 negocios", "+40M de envíos", "+200M transacciones"];

const ArrowUp = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 19V5M12 5l-6 6M12 5l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function T1TiendaHero() {
  const [value, setValue] = useState("");
  const [source, setSource] = useState<"chip" | "typed">("typed");
  const [chipCategory, setChipCategory] = useState<string | null>(null);
  const [phIdx, setPhIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Alto del teclado móvil para subir la flecha por encima
  const [kbH, setKbH] = useState(0);
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const onResize = () => setKbH(Math.max(0, window.innerHeight - vv.height - vv.offsetTop));
    vv.addEventListener("resize", onResize);
    vv.addEventListener("scroll", onResize);
    return () => {
      vv.removeEventListener("resize", onResize);
      vv.removeEventListener("scroll", onResize);
    };
  }, []);
  const kbOpen = kbH > 120;

  // Placeholder con animación typewriter
  useEffect(() => {
    if (value) return;
    const full = PLACEHOLDERS[phIdx % PLACEHOLDERS.length];
    let delay = deleting ? 35 : 65;
    if (!deleting && typed === full) delay = 1900;
    if (deleting && typed === "") delay = 350;
    const t = setTimeout(() => {
      if (!deleting && typed === full) setDeleting(true);
      else if (deleting && typed === "") {
        setDeleting(false);
        setPhIdx((p) => p + 1);
      } else {
        setTyped(deleting ? full.slice(0, typed.length - 1) : full.slice(0, typed.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [typed, deleting, phIdx, value]);

  const insertChip = (chip: HeroChip) => {
    const el = textareaRef.current;
    const example = cap(chip.examples[Math.floor(Math.random() * chip.examples.length)]);
    setValue(example);
    setSource("chip");
    setChipCategory(chip.label);
    requestAnimationFrame(() => {
      if (el) {
        el.focus();
        const end = el.value.length;
        el.setSelectionRange(end, end);
      }
    });
  };

  const tiendaOk = value.trim().length > 0;

  return (
    <div className="relative z-0">
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-5 pb-0 pt-24 tablet:min-h-screen tablet:px-6 tablet:pt-28 tablet:pb-0">
        {/* Fondo (compartido entre los heroes) */}
        <HeroBackground fadeHeight={640} />

        {/* Contenido */}
        <div className="relative z-10 flex w-full max-w-[440px] grow flex-col items-center tablet:max-w-[720px]">
          {/* Título */}
          <h1
            className="mt-8 text-center font-sora font-light leading-[1.12] text-white tablet:mt-14"
            style={{ letterSpacing: "-0.03em", fontSize: "clamp(25px, 7vw, 44px)" }}
          >
            Crea tu tienda en
            <br />
            60 segundos
          </h1>

          <p className="mt-4 max-w-[440px] text-center font-inter text-[16px] font-light leading-[1.55] text-white/70 tablet:mt-5 tablet:max-w-none tablet:whitespace-nowrap tablet:text-[17px]">
            T1 te ayuda a vender, cobrar y enviar a todo México. Gratis, sin tarjeta de crédito.
          </p>

          {/* Bloque central */}
          <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 py-6">
            {/* Caja de prompt */}
            <div className="relative w-full rounded-[14px] bg-[#1D1D1D]" style={{ minHeight: 160 }}>
              <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => { setValue(e.target.value.slice(0, 500)); setSource("typed"); setChipCategory(null); }}
                rows={3}
                aria-label="Describe tu negocio"
                placeholder=""
                className="h-[160px] w-full resize-none rounded-[14px] bg-transparent px-[18px] py-[15px] font-inter text-[16px] leading-[1.5] text-white outline-none"
              />
              {!value && (
                <div aria-hidden className="pointer-events-none absolute inset-0 px-[18px] py-[15px] font-inter text-[16px] leading-[1.5] text-[#8A8A8A]">
                  {cap(typed)}
                  <span className="ml-px inline-block w-[2px] align-[-2px] bg-[#8A8A8A]" style={{ height: "1.1em", animation: "blink 1s step-end infinite" }} />
                </div>
              )}
              <a
                href={SIGNUP_URL}
                onClick={(e) => {
                  if (!tiendaOk) { e.preventDefault(); return; }
                  track("hero_prompt_submit", { page_context: "producto_tienda", prompt_source: source, chip_category: source === "chip" ? chipCategory : null, length: value.trim().length });
                }}
                aria-label="Crea tu tienda"
                style={kbOpen ? { position: "fixed", right: 16, bottom: kbH + 10, zIndex: 60 } : undefined}
                className={`absolute bottom-3 right-3 flex h-[38px] items-center gap-1.5 rounded-full px-4 font-inter text-[13px] font-semibold transition-colors ${
                  tiendaOk ? "bg-red-500 text-white hover:bg-red-600" : "bg-[#60160F] text-white/45"
                }`}
              >
                Crea tu tienda
                {ArrowUp}
              </a>
            </div>

            {/* Chips — móvil: una sola fila con scroll horizontal (no envolver); desktop: wrap centrado */}
            <div className="flex w-full min-h-[44px] flex-nowrap items-center justify-start gap-2.5 overflow-x-auto tablet:flex-wrap tablet:justify-center tablet:overflow-visible" style={{ scrollbarWidth: "none" }}>
              {CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => insertChip(chip)}
                  className="shrink-0 rounded-[11px] border border-white/10 px-2.5 py-1.5 font-inter text-[14px] font-medium text-white transition-colors hover:border-white/25"
                  style={{ background: "rgba(52,52,52,0.6)" }}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social proof — estilo hero principal: métrica grande arriba, dos abajo */}
          <div className="mb-10 flex flex-col items-center gap-2.5 text-center tablet:mb-14 tablet:gap-4">
            <span className="font-inter text-[19px] font-normal text-white tablet:text-[24px]">{SOCIAL_PROOF[0]}</span>
            <div className="flex items-center gap-6 tablet:gap-12">
              {SOCIAL_PROOF.slice(1).map((s) => (
                <span key={s} className="font-inter text-[15px] font-normal text-white/75 tablet:text-[18px]">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
