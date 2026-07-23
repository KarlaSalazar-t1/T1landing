"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { SIGNUP_URL, PAGOS_START_URL, ENVIOS_QUOTE_URL } from "@/lib/constants";

/* ── Analítica: usa dataLayer como fallback (el proyecto no tiene tracking) ── */
function track(event: string, data: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...data });
}

/* ── Iconos por modo (tienda / tarjeta / camión) ── */
const IconStore = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 9.5 5.2 4.5A1 1 0 0 1 6.17 3.75h11.66a1 1 0 0 1 .97.75L20 9.5M4 9.5h16M4 9.5v0a2.5 2.5 0 0 0 4 0 2.5 2.5 0 0 0 4 0 2.5 2.5 0 0 0 4 0 2.5 2.5 0 0 0 4 0M5 11.5V20h14v-8.5M10 20v-4.5h4V20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconCard = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="2.75" y="5.25" width="18.5" height="13.5" rx="2.25" stroke="currentColor" strokeWidth="1.6" />
    <path d="M2.75 9.5h18.5M6 14.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const IconTruck = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M2.75 6.75A1 1 0 0 1 3.75 5.75h9.5a1 1 0 0 1 1 1v9.5H2.75v-9.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M14.25 9.25h3.4a1 1 0 0 1 .82.42l2.35 3.3a1 1 0 0 1 .18.58v2.7h-6.75v-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx="7" cy="17.75" r="1.9" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17.25" cy="17.75" r="1.9" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

/* ── Contenido por modo (textos EXACTOS de negocio) ── */
type Mode = {
  id: string;
  label: string;
  icon: ReactNode;
  placeholder: string;
  cta: string;
  microcopy: string;
  chips: string[];
  proof: string[];
  href: string;
};

const MODES: Mode[] = [
  {
    id: "vender",
    label: "Vender en línea",
    icon: IconStore,
    placeholder: "Vendo ropa artesanal y quiero mi tienda en línea…",
    cta: "Crear tienda",
    microcopy: "Tu tienda en línea lista con IA, sin saber de diseño.",
    chips: ["Moda", "Comida", "Belleza", "Deportes", "Joyería", "Hogar"],
    proof: ["+25 mil tiendas", "+500 mil transacciones", "+10 M de envíos"],
    href: SIGNUP_URL, // flujo actual, sin cambios
  },
  {
    id: "cobrar",
    label: "Cobrar",
    icon: IconCard,
    placeholder: "Tengo un negocio de fotografía para eventos y quiero cobrar con distintas formas de pago…",
    cta: "Comenzar a cobrar",
    microcopy: "Cobra con tarjeta: sin tienda, sin terminal.",
    chips: ["Doy un servicio", "Vendo por redes", "Cobro apartados", "Clases o consultas"],
    proof: ["+500 mil transacciones", "+25 mil tiendas", "+10 M de envíos"],
    href: PAGOS_START_URL,
  },
  {
    id: "enviar",
    label: "Enviar", // sin acento
    icon: IconTruck,
    placeholder: "Vendo por Instagram y entrego yo misma, quiero enviar más barato…",
    cta: "Cotizar mi envío",
    microcopy: "Envía a todo México, sin volumen mínimo.",
    chips: ["Vendo por redes", "Ya tengo tienda propia", "Vendo en marketplaces", "Envíos ocasionales"],
    proof: ["+10 M de envíos", "+500 mil transacciones", "+25 mil tiendas"],
    href: ENVIOS_QUOTE_URL,
  },
];

export default function T1Hero() {
  const [modeIdx, setModeIdx] = useState(0);
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const mode = MODES[modeIdx];
  const canSubmit = value.trim().length > 0;

  const selectMode = (i: number, focusBtn = false) => {
    if (i === modeIdx) return;
    setModeIdx(i);
    setValue(""); // el prompt se reinicia: cada modo es otra intención/destino
    track("hero_mode_select", { mode: MODES[i].id });
    if (focusBtn) btnRefs.current[i]?.focus();
  };

  const onSelectorKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      selectMode((modeIdx + 1) % MODES.length, true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      selectMode((modeIdx + MODES.length - 1) % MODES.length, true);
    }
  };

  const insertChip = (chip: string) => {
    track("hero_chip_click", { mode: mode.id, chip });
    const el = textareaRef.current;
    setValue((prev) => (prev.trim() ? `${prev.trim()} ${chip}` : chip));
    // foco + cursor al final tras el re-render
    requestAnimationFrame(() => {
      if (el) {
        el.focus();
        const end = el.value.length;
        el.setSelectionRange(end, end);
      }
    });
  };

  const onFocusTextarea = () => {
    // Sube la caja + CTA por encima del teclado móvil
    requestAnimationFrame(() => {
      textareaRef.current?.closest("[data-prompt-box]")?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  const onSubmit = (e: React.MouseEvent) => {
    if (!canSubmit) {
      e.preventDefault();
      return;
    }
    track("hero_prompt_submit", { mode: mode.id, length: value.trim().length });
  };

  return (
    <div className="sticky top-0 z-0">
      <section className="relative flex min-h-[92svh] flex-col items-center justify-start overflow-hidden px-5 pb-[clamp(24px,5vh,56px)] pt-[88px] tablet:min-h-screen tablet:justify-center tablet:px-6 tablet:pt-28 tablet:pb-28">
        {/* Fondo — degradado + glows (sin cambios de estilo global) */}
        <div aria-hidden className="absolute inset-0 z-0" style={{ background: "linear-gradient(180deg, #141414 0%, #020101 100%)" }} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at 31% 114%, rgba(1,25,69,0.9) 0%, rgba(17,0,85,0) 55%), radial-gradient(circle at -7% 50%, rgba(89,7,7,0.85) 0%, rgba(87,9,9,0) 45%), radial-gradient(circle at 79% 55%, rgba(89,7,7,0.75) 0%, rgba(87,9,9,0) 50%)",
          }}
        />

        {/* Contenido — en móvil llena el alto y reparte el espacio (ritmo); en tablet+ se centra */}
        <div className="relative z-10 flex w-full max-w-[560px] grow flex-col items-center justify-between gap-5 tablet:max-w-[680px] tablet:grow-0 tablet:justify-center tablet:gap-8">
          {/* 1 · H1 + subtítulo */}
          <div className="flex flex-col items-center text-center">
            <h1 className="font-sora text-[30px] font-light leading-[1.1] text-white tablet:text-[46px] desktop:text-[52px]" style={{ letterSpacing: "-0.03em" }}>
              Tu negocio, todo en uno.
            </h1>
            <p className="mt-3 font-inter text-[15px] font-normal text-white/75 tablet:mt-4 tablet:text-[17px]">
              Descríbelo y la IA lo deja listo en minutos.
            </p>
          </div>

          {/* 2 · Selector de 3 modos (segmented control / radiogroup) */}
          <div
            role="radiogroup"
            aria-label="¿Qué necesitas hacer?"
            onKeyDown={onSelectorKeyDown}
            className="grid w-full grid-cols-3 gap-2 tablet:gap-3"
          >
            {MODES.map((m, i) => {
              const selected = i === modeIdx;
              return (
                <button
                  key={m.id}
                  ref={(el) => {
                    btnRefs.current[i] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectMode(i)}
                  className={`group relative flex min-h-[62px] flex-col items-center justify-center gap-1 rounded-2xl border px-2 py-2.5 text-center transition-colors ${
                    selected
                      ? "border-white/35 bg-white/[0.12] text-white"
                      : "border-white/10 bg-white/[0.04] text-white/70 hover:border-white/20 hover:bg-white/[0.08]"
                  }`}
                >
                  {/* check en círculo relleno (estado seleccionado) */}
                  <span
                    aria-hidden
                    className={`absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full transition-opacity ${
                      selected ? "bg-red-500 opacity-100" : "opacity-0"
                    }`}
                  >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.2 5 8.5l4.5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className={selected ? "text-white" : "text-white/75"}>{m.icon}</span>
                  <span className="font-inter text-[12px] font-medium leading-tight tablet:text-[13px]">{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Zona que cambia por modo — anuncia cambios (a11y) */}
          <div className="flex w-full flex-col items-center gap-3" aria-live="polite">
            {/* 3 · Caja de prompt (dark glass premium) con textarea + CTA */}
            <div data-prompt-box className="group relative w-full">
              {/* aura ambiental de marca detrás de la caja */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 -z-10 opacity-70 blur-2xl transition-opacity duration-300 group-focus-within:opacity-100"
                style={{
                  background:
                    "radial-gradient(60% 70% at 50% 100%, rgba(255,111,94,0.18) 0%, rgba(255,111,94,0) 70%)",
                }}
              />
              <div
                className="relative overflow-hidden rounded-[22px] border border-white/[0.08] transition-colors duration-200 focus-within:border-white/25 tablet:rounded-[26px]"
                style={{ background: "#1B1B1E", boxShadow: "0 24px 70px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)" }}
              >
                {/* halo superior sutil (borde de luz) */}
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <div className="flex flex-col gap-3 p-4 tablet:p-5">
                  <div className="flex items-start gap-2.5">
                    {/* chispa IA */}
                    <span aria-hidden className="mt-0.5 shrink-0 text-[#FF7363]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 3l1.6 4.7a3 3 0 0 0 1.9 1.9L20 11.2l-4.5 1.6a3 3 0 0 0-1.9 1.9L12 19.4l-1.6-4.7a3 3 0 0 0-1.9-1.9L4 11.2l4.5-1.6a3 3 0 0 0 1.9-1.9L12 3z" fill="currentColor" />
                      </svg>
                    </span>
                    <textarea
                      ref={textareaRef}
                      key={`ta-${mode.id}`}
                      value={value}
                      onChange={(e) => setValue(e.target.value.slice(0, 500))}
                      onFocus={onFocusTextarea}
                      rows={2}
                      aria-label={`Describe tu negocio para el modo ${mode.label}`}
                      placeholder={mode.placeholder}
                      className="hero-fade min-h-[3.4em] w-full resize-none bg-transparent font-inter text-[15px] font-normal leading-relaxed text-white/90 outline-none placeholder:text-white/45 tablet:text-[17px]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-[11px] text-white/35">{value.length}/500</span>
                    {canSubmit ? (
                      <a
                        href={mode.href}
                        onClick={onSubmit}
                        className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-red-500 px-5 font-inter text-[14px] font-semibold text-white no-underline shadow-[0_6px_20px_rgba(219,59,43,0.45)] transition-colors hover:bg-red-600"
                      >
                        {mode.cta}
                        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                          <path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        aria-disabled="true"
                        className="inline-flex min-h-[44px] cursor-not-allowed items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-5 font-inter text-[14px] font-semibold text-white/40"
                      >
                        {mode.cta}
                        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                          <path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 4 · Microcopy educativo (altura fija 1 línea) */}
            <p key={`mc-${mode.id}`} className="hero-fade flex min-h-[20px] items-center px-2 text-center font-inter text-[13px] font-normal text-white/70 tablet:text-[14px]">
              {mode.microcopy}
            </p>

            {/* 5 · Chips de sugerencia (altura fija 2 filas) */}
            <div className="flex w-full flex-col items-center gap-2">
              <div key={`chips-${mode.id}`} className="hero-fade flex min-h-[84px] flex-wrap items-start justify-center gap-2 tablet:min-h-[52px]">
                {mode.chips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => insertChip(chip)}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-white/15 bg-white/[0.06] px-4 font-inter text-[13px] font-medium text-white/80 transition-colors hover:border-white/30 hover:bg-white/[0.12] hover:text-white tablet:text-[14px]"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 6 · Social proof (se reordena por modo) */}
          <div key={`sp-${mode.id}`} className="hero-fade flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-2 text-center">
            {mode.proof.map((s, i) => (
              <span key={s} className="flex items-center gap-3 font-inter text-[14px] font-medium text-white/90 tablet:text-[15px]">
                {i > 0 && <span aria-hidden className="text-white/35">•</span>}
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
