"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { CTA_ON, CTA_OFF, FOCUS_ON, FOCUS_BOX } from "@/lib/heroCta";
import { HERO_CHIPS, HERO_PROMPT_PLACEHOLDERS, capFirst, type HeroChip } from "@/lib/heroPrompt";

/* Caja de prompt "Crea tu tienda con IA" — COMPONENTE COMPARTIDO. Lo usan tanto el
   hero de la landing de Tienda (T1TiendaHero) como la landing /tienda-con-ia
   (T1Features pageMode), para que sean exactamente el mismo input + chips. */

const PLACEHOLDERS = HERO_PROMPT_PLACEHOLDERS;
const CHIPS = HERO_CHIPS;
const cap = capFirst;

export default function TiendaPromptBox({ pageContext = "producto_tienda" }: { pageContext?: string }) {
  const [value, setValue] = useState("");
  const [source, setSource] = useState<"chip" | "typed">("typed");
  const [chipCategory, setChipCategory] = useState<string | null>(null);
  const [phIdx, setPhIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);
  // Tocó "Crea tu tienda" con la caja vacía → se enfoca y se pide la descripción
  const [hint, setHint] = useState(false);

  // Desktop: enfoca la caja al cargar (como la versión anterior) para que se note
  // que está lista para escribir. En móvil no (abriría el teclado de golpe).
  useEffect(() => {
    if (window.innerWidth < 768) return;
    textareaRef.current?.focus({ preventScroll: true });
  }, []);

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
    <div className="flex w-full flex-col items-center gap-6">
      {/* Caja de prompt */}
      <div
        onClick={() => textareaRef.current?.focus()}
        className={`relative w-full cursor-text rounded-[14px] bg-[#1D1D1D] min-h-[160px] tablet:min-h-[180px] ring-1 transition-shadow ${
          hint ? FOCUS_ON : FOCUS_BOX
        }`}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); setHint(false); }}
          onChange={(e) => { setValue(e.target.value.slice(0, 500)); setSource("typed"); setChipCategory(null); setHint(false); }}
          rows={3}
          aria-label="Describe tu negocio"
          placeholder=""
          className="h-[160px] tablet:h-[180px] w-full resize-none rounded-[14px] bg-transparent px-[18px] pt-[15px] pb-[56px] font-inter text-[16px] leading-[1.5] text-white outline-none"
        />
        {!value && (
          <div aria-hidden className="pointer-events-none absolute inset-0 px-[18px] py-[15px] text-left font-inter text-[16px] leading-[1.5] text-white/40">
            {hint ? (
              <span>Escribe qué vendes para crear tu tienda</span>
            ) : (
              <>
                {/* "Ej.:" distingue el ejemplo animado de lo que se envía */}
                <span className="text-white/30">Ej.: </span>
                {cap(typed)}
                {/* Con foco ya se ve el cursor real; el falso solo cuando no hay foco */}
                {!focused && <span className="ml-px inline-block w-[2px] align-[-2px] bg-white/40" style={{ height: "1.1em", animation: "blink 1s step-end infinite" }} />}
              </>
            )}
          </div>
        )}
        <span aria-hidden className="pointer-events-none absolute bottom-[22px] left-[18px] font-inter text-[12px] text-white/30">{value.length}/500</span>
        <a
          href={SIGNUP_URL}
          onClick={(e) => {
            e.stopPropagation();
            if (!tiendaOk) {
              e.preventDefault();
              setHint(true);
              textareaRef.current?.focus();
              track("hero_prompt_empty_click", { page_context: pageContext });
              return;
            }
            track("hero_prompt_submit", { page_context: pageContext, prompt_source: source, chip_category: source === "chip" ? chipCategory : null, length: value.trim().length });
          }}
          aria-label="Crea tu tienda"
          title="Crea tu tienda"
          aria-disabled={!tiendaOk}
          style={kbOpen ? { position: "fixed", right: 16, bottom: kbH + 10, zIndex: 60 } : undefined}
          className={`absolute bottom-3 right-3 flex h-[40px] w-[40px] items-center justify-center rounded-full transition-colors ${
            tiendaOk ? CTA_ON : CTA_OFF
          }`}
        >
          {/* Solo flecha, como la versión anterior (100% de clics enviaban). El aria-label
             mantiene el nombre "Crea tu tienda" en PostHog. */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" /></svg>
        </a>
      </div>

      {/* Chips — móvil: 2 filas centradas; desktop: una sola línea */}
      <div className="flex w-full flex-wrap items-center justify-center gap-x-1 gap-y-1 tablet:flex-nowrap tablet:gap-2 tablet:overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {CHIPS.map((chip, k) => (
          <Fragment key={chip.label}>
            <button
              type="button"
              onClick={() => insertChip(chip)}
              className="shrink-0 whitespace-nowrap rounded-[11px] border border-white/10 px-[7px] py-1.5 font-inter text-[12.5px] font-medium text-white transition-colors hover:border-white/25 tablet:px-2.5 tablet:text-[13px]"
              style={{ background: "rgba(52,52,52,0.6)" }}
            >
              {chip.label}
            </button>
            {k === 3 && <span aria-hidden className="basis-full tablet:hidden" />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
