"use client";

import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL, PAGOS_START_URL, ENVIOS_QUOTE_URL } from "@/lib/constants";

/* ── Analítica: dataLayer como fallback (el proyecto no tiene tracking) ── */
function track(event: string, data: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...data });
}

/* ── Tabs (segmented control) ── */
const TABS = [
  { id: "tienda", label: "Crea tu tienda", href: SIGNUP_URL },
  { id: "link", label: "Crea link de pago", href: PAGOS_START_URL },
  { id: "envio", label: "Cotizar envío", href: ENVIOS_QUOTE_URL },
];

/* Placeholders rotativos + chips para el modo tienda */
const TIENDA_PLACEHOLDERS = [
  "Vendo ropa artesanal",
  "Vendo café de especialidad",
  "Tengo velas aromáticas hechas a mano",
  "Vendo muebles de diseño",
];
const TIENDA_CHIPS: { label: string; example: string }[] = [
  { label: "Moda", example: "Vendo ropa y accesorios de moda" },
  { label: "Belleza", example: "Vendo productos de belleza y cuidado personal" },
  { label: "Joyería", example: "Hago joyería y bisutería artesanal" },
  { label: "Electrónica", example: "Vendo productos de electrónica y gadgets" },
  { label: "Hogar", example: "Vendo artículos de decoración para el hogar" },
  { label: "Deportes", example: "Vendo ropa y artículos deportivos" },
];

const SOCIAL_PROOF = ["+25,000 tiendas", "+10M de envíos", "+500mil transacciones"];

const ArrowUp = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 19V5M12 5l-6 6M12 5l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArrowRight = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FIELD = "w-full rounded-[14px] bg-[#1D1D1D] px-4 py-3 font-inter text-[15px] text-white outline-none placeholder:text-[#8A8A8A] focus:ring-1 focus:ring-white/20";

export default function T1Hero() {
  const [tabIdx, setTabIdx] = useState(0);
  const tab = TABS[tabIdx];

  // Modo tienda
  const [value, setValue] = useState("");
  const [phIdx, setPhIdx] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const placeholder = TIENDA_PLACEHOLDERS[phIdx % TIENDA_PLACEHOLDERS.length];

  // Modo link de pago
  const [monto, setMonto] = useState("");
  const [concepto, setConcepto] = useState("");

  // Modo envío
  const [cpDesde, setCpDesde] = useState("");
  const [cpHasta, setCpHasta] = useState("");
  const [dim, setDim] = useState({ ancho: "", largo: "", alto: "", peso: "" });

  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Placeholder rotativo (solo modo tienda, input vacío)
  useEffect(() => {
    if (tabIdx !== 0 || value) return;
    const t = setInterval(() => setPhIdx((p) => p + 1), 3200);
    return () => clearInterval(t);
  }, [tabIdx, value]);

  const selectTab = (i: number, focusBtn = false) => {
    if (i === tabIdx) return;
    setTabIdx(i);
    setPhIdx(0);
    track("hero_mode_select", { mode: TABS[i].id });
    if (focusBtn) btnRefs.current[i]?.focus();
  };

  const onSelectorKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      selectTab((tabIdx + 1) % TABS.length, true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      selectTab((tabIdx + TABS.length - 1) % TABS.length, true);
    }
  };

  const insertChip = (chip: { label: string; example: string }) => {
    track("hero_chip_click", { mode: tab.id, chip: chip.label });
    const el = textareaRef.current;
    setValue(chip.example);
    requestAnimationFrame(() => {
      if (el) {
        el.focus();
        const end = el.value.length;
        el.setSelectionRange(end, end);
      }
    });
  };

  const submit = (extra: Record<string, unknown>) => track("hero_prompt_submit", { mode: tab.id, ...extra });

  const tiendaOk = value.trim().length > 0;
  const linkOk = monto.trim().length > 0;
  const envioOk = cpDesde.trim().length > 0 && cpHasta.trim().length > 0;

  return (
    <div className="sticky top-0 z-0">
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-5 pb-[clamp(24px,5vh,56px)] pt-24 tablet:min-h-screen tablet:px-6 tablet:py-28">
        {/* Fondo — degradado exacto de Figma */}
        <div aria-hidden className="absolute inset-0 z-0" style={{ background: "linear-gradient(180deg, #141414 0%, #020101 100%)" }} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at 79% 52%, rgba(112,10,10,0.95) 0%, rgba(87,9,9,0) 60%), radial-gradient(circle at -7% 48%, rgba(112,10,10,1) 0%, rgba(87,9,9,0) 60%), radial-gradient(circle at 31% 114%, rgba(1,25,69,0.95) 0%, rgba(17,0,85,0) 52%)",
          }}
        />

        {/* Contenido */}
        <div className="relative z-10 flex w-full max-w-[440px] grow flex-col items-center justify-between tablet:max-w-[640px] tablet:grow-0 tablet:justify-center tablet:gap-16">
          <div className="flex w-full flex-col items-center gap-9 tablet:gap-11">
            {/* 1 · H1 */}
            <h1
              className="text-center font-sora text-[32px] font-light leading-[1.14] text-white tablet:text-[46px] desktop:text-[52px]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Vende, cobra y envía.
              <br />
              Todo en uno.
            </h1>

            {/* 2 · Selector (segmented control) */}
            <div
              role="radiogroup"
              aria-label="¿Qué quieres hacer?"
              onKeyDown={onSelectorKeyDown}
              className="flex w-full items-center gap-1 rounded-[15px] p-1"
              style={{ background: "rgba(13,13,13,0.55)" }}
            >
              {TABS.map((t, i) => {
                const selected = i === tabIdx;
                return (
                  <button
                    key={t.id}
                    ref={(el) => {
                      btnRefs.current[i] = el;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectTab(i)}
                    className={`flex-1 whitespace-nowrap rounded-[12px] px-1.5 py-2.5 font-inter text-[11px] font-medium leading-tight transition-colors tablet:text-[13px] ${
                      selected ? "text-white" : "text-white/65 hover:text-white/85"
                    }`}
                    style={selected ? { background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(231,231,231,0.2)" } : undefined}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* 3 · Zona que cambia por tab */}
            <div className="flex w-full flex-col items-center gap-5" aria-live="polite">
              {/* ── TIENDA ── */}
              {tabIdx === 0 && (
                <>
                  <p className="max-w-[360px] text-center font-inter text-[15px] font-light leading-[1.6] text-white tablet:text-[16px]">
                    Describe tu negocio y crea tu tienda con IA
                  </p>
                  <div className="relative w-full rounded-[14px] bg-[#1D1D1D]" style={{ minHeight: 160 }}>
                    <textarea
                      ref={textareaRef}
                      value={value}
                      onChange={(e) => setValue(e.target.value.slice(0, 500))}
                      rows={3}
                      aria-label="Describe tu negocio"
                      placeholder={placeholder}
                      className="h-[160px] w-full resize-none rounded-[14px] bg-transparent px-[18px] py-[15px] font-inter text-[16px] leading-[1.5] text-white outline-none placeholder:text-[#8A8A8A]"
                    />
                    <a
                      href={tab.href}
                      onClick={(e) => {
                        if (!tiendaOk) e.preventDefault();
                        else submit({ length: value.trim().length });
                      }}
                      aria-label="Crear tienda"
                      className={`absolute bottom-3 right-3 flex h-[38px] w-[38px] items-center justify-center rounded-full text-white transition-colors ${
                        tiendaOk ? "bg-red-500 hover:bg-red-600" : "bg-red-500/40"
                      }`}
                    >
                      {ArrowUp}
                    </a>
                  </div>
                  {/* chips */}
                  <div className="flex min-h-[80px] flex-wrap items-start justify-center gap-2.5 tablet:min-h-[44px]">
                    {TIENDA_CHIPS.map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => insertChip(chip)}
                        className="rounded-[11px] border border-white/10 px-2.5 py-1.5 font-inter text-[13px] font-medium text-white transition-colors hover:border-white/25 tablet:text-[14px]"
                        style={{ background: "rgba(52,52,52,0.6)" }}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* ── LINK DE PAGO ── */}
              {tabIdx === 1 && (
                <>
                  <p className="max-w-[360px] text-center font-inter text-[15px] font-light leading-[1.6] text-white tablet:text-[16px]">
                    Cobra sin tienda ni terminal, solo comparte tu link
                  </p>
                  <div className="flex w-full flex-col gap-3">
                    <div className="flex gap-3">
                      <div className="relative w-[42%]">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-inter text-[15px] text-[#8A8A8A]">$</span>
                        <input
                          inputMode="decimal"
                          value={monto}
                          onChange={(e) => setMonto(e.target.value.replace(/[^\d.]/g, ""))}
                          placeholder="0.00"
                          aria-label="Monto a cobrar"
                          className={`${FIELD} pl-7`}
                        />
                      </div>
                      <input
                        value={concepto}
                        onChange={(e) => setConcepto(e.target.value)}
                        placeholder="¿Qué cobras?"
                        aria-label="Concepto"
                        className={`${FIELD} flex-1`}
                      />
                    </div>
                    <a
                      href={tab.href}
                      onClick={(e) => {
                        if (!linkOk) e.preventDefault();
                        else submit({ length: monto.length });
                      }}
                      aria-disabled={!linkOk}
                      className={`flex h-[46px] items-center justify-center gap-1.5 rounded-[16px] font-inter text-[14px] font-semibold text-white no-underline transition-colors ${
                        linkOk ? "bg-red-500 hover:bg-red-600" : "bg-red-500/40"
                      }`}
                    >
                      Crear link de pago
                      {ArrowRight}
                    </a>
                  </div>
                </>
              )}

              {/* ── ENVÍO ── */}
              {tabIdx === 2 && (
                <>
                  <p className="max-w-[360px] text-center font-inter text-[15px] font-light leading-[1.6] text-white tablet:text-[16px]">
                    Cotiza tu envío en segundos, sin volumen mínimo
                  </p>
                  <div className="flex w-full flex-col gap-3">
                    {/* Origen → destino */}
                    <div className="flex items-center gap-2.5">
                      <input value={cpDesde} onChange={(e) => setCpDesde(e.target.value.replace(/[^\d]/g, "").slice(0, 5))} inputMode="numeric" placeholder="C.P. origen" aria-label="Código postal de origen" className={`${FIELD} flex-1`} />
                      <span aria-hidden className="shrink-0 text-white/50">→</span>
                      <input value={cpHasta} onChange={(e) => setCpHasta(e.target.value.replace(/[^\d]/g, "").slice(0, 5))} inputMode="numeric" placeholder="C.P. destino" aria-label="Código postal de destino" className={`${FIELD} flex-1`} />
                    </div>
                    {/* Peso */}
                    <input
                      value={dim.peso}
                      onChange={(e) => setDim((d) => ({ ...d, peso: e.target.value.replace(/[^\d.]/g, "") }))}
                      inputMode="decimal"
                      placeholder="Peso aprox. (kg)"
                      aria-label="Peso aproximado en kilogramos"
                      className={FIELD}
                    />
                    <a
                      href={tab.href}
                      onClick={(e) => {
                        if (!envioOk) e.preventDefault();
                        else submit({});
                      }}
                      aria-disabled={!envioOk}
                      className={`mt-1 flex h-[46px] items-center justify-center gap-1.5 rounded-[16px] font-inter text-[14px] font-semibold text-white no-underline transition-colors ${
                        envioOk ? "bg-red-500 hover:bg-red-600" : "bg-red-500/40"
                      }`}
                    >
                      Cotizar envío
                      {ArrowRight}
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 4 · Social proof */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-2 text-center tablet:mt-0">
            {SOCIAL_PROOF.map((s, i) => (
              <span key={s} className="flex items-center gap-2.5 font-inter text-[15px] font-medium text-white tablet:text-[16px]">
                {i > 0 && <span aria-hidden className="text-white/40">•</span>}
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
