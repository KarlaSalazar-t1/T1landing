"use client";

import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { HERO_CHIPS, HERO_PROMPT_PLACEHOLDERS, capFirst, type HeroChip } from "@/lib/heroPrompt";

/* Caja de prompt "Crea tu tienda con IA" — COMPONENTE COMPARTIDO. Lo usan tanto el
   hero de la landing de Tienda (T1TiendaHero) como la landing /tienda-con-ia
   (T1Features pageMode), para que sean exactamente el mismo input + chips. */

const PLACEHOLDERS = HERO_PROMPT_PLACEHOLDERS;
const CHIPS = HERO_CHIPS;
const cap = capFirst;

const ArrowRight = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function TiendaPromptBox({ pageContext = "producto_tienda" }: { pageContext?: string }) {
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
    <div className="flex w-full flex-col items-center gap-6">
      {/* Caja de prompt */}
      <div className="relative w-full rounded-[14px] bg-[#1D1D1D] min-h-[160px] tablet:min-h-[180px]">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => { setValue(e.target.value.slice(0, 500)); setSource("typed"); setChipCategory(null); }}
          rows={3}
          aria-label="Describe tu negocio"
          placeholder=""
          className="h-[160px] tablet:h-[180px] w-full resize-none rounded-[14px] bg-transparent px-[18px] py-[15px] font-inter text-[16px] leading-[1.5] text-white outline-none"
        />
        {!value && (
          <div aria-hidden className="pointer-events-none absolute inset-0 px-[18px] py-[15px] text-left font-inter text-[16px] leading-[1.5] text-[#8A8A8A]">
            {cap(typed)}
            <span className="ml-px inline-block w-[2px] align-[-2px] bg-[#8A8A8A]" style={{ height: "1.1em", animation: "blink 1s step-end infinite" }} />
          </div>
        )}
        <a
          href={SIGNUP_URL}
          onClick={(e) => {
            if (!tiendaOk) { e.preventDefault(); return; }
            track("hero_prompt_submit", { page_context: pageContext, prompt_source: source, chip_category: source === "chip" ? chipCategory : null, length: value.trim().length });
          }}
          aria-label="Crea tu tienda"
          style={kbOpen ? { position: "fixed", right: 16, bottom: kbH + 10, zIndex: 60 } : undefined}
          className={`absolute bottom-3 right-3 flex h-[40px] items-center gap-1.5 rounded-full pl-4 pr-3 font-inter text-[14px] font-semibold transition-colors ${
            tiendaOk ? "bg-red-500 text-white hover:bg-red-600" : "bg-[#60160F] text-white/45"
          }`}
        >
          Crea tu tienda
          {ArrowRight}
        </a>
      </div>

      {/* Chips — móvil: una sola fila con scroll horizontal; desktop: wrap centrado */}
      <div className="flex w-full flex-nowrap items-center justify-start gap-2.5 overflow-x-auto tablet:justify-center tablet:gap-2" style={{ scrollbarWidth: "none" }}>
        {CHIPS.map((chip) => (
          <button
            key={chip.label}
            type="button"
            onClick={() => insertChip(chip)}
            className="shrink-0 whitespace-nowrap rounded-[11px] border border-white/10 px-2.5 py-1.5 font-inter text-[14px] font-medium text-white transition-colors hover:border-white/25 tablet:text-[13px]"
            style={{ background: "rgba(52,52,52,0.6)" }}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
