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
  { id: "link", label: "Cobra con link", href: PAGOS_START_URL },
  { id: "envio", label: "Cotizar envío", href: ENVIOS_QUOTE_URL },
];

/* Placeholders rotativos + chips para el modo tienda */
const TIENDA_PLACEHOLDERS = [
  "Vendo ropa y accesorios de moda",
  "Vendo gadgets y accesorios de electrónica",
  "Vendo maquillaje y productos de belleza",
  "Vendo ropa y equipo deportivo",
];
const TIENDA_CHIPS: { label: string; example: string }[] = [
  { label: "Moda", example: "Vendo ropa y accesorios de moda" },
  { label: "Electrónica", example: "Vendo gadgets y accesorios de electrónica" },
  { label: "Belleza", example: "Vendo maquillaje y productos de belleza" },
  { label: "Deportes", example: "Vendo ropa y equipo deportivo" },
  { label: "Joyería", example: "Hago joyería y bisutería artesanal" },
  { label: "Hogar", example: "Vendo artículos de decoración para el hogar" },
];

/* Paquetes para cotizar envío (con ejemplo de qué cabe) */
const PAQUETES = [
  { id: "sobre", label: "Sobre", ej: "Documentos" },
  { id: "pequeno", label: "Pequeño", ej: "Celular, accesorios" },
  { id: "mediano", label: "Mediano", ej: "Ropa, zapatos" },
  { id: "grande", label: "Grande", ej: "Electrodomésticos" },
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
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const placeholder = tabIdx === 0 ? typed : "";

  // Modo link de pago
  const [monto, setMonto] = useState("");
  const [concepto, setConcepto] = useState("");

  // Modo envío
  const [cpDesde, setCpDesde] = useState("");
  const [cpHasta, setCpHasta] = useState("");
  const [paquete, setPaquete] = useState("pequeno");

  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Placeholder con animación typewriter (solo modo tienda, input vacío)
  useEffect(() => {
    if (tabIdx !== 0 || value) return;
    const full = TIENDA_PLACEHOLDERS[phIdx % TIENDA_PLACEHOLDERS.length];
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
  }, [typed, deleting, phIdx, tabIdx, value]);

  const selectTab = (i: number, focusBtn = false) => {
    if (i === tabIdx) return;
    setTabIdx(i);
    setPhIdx(0);
    setTyped("");
    setDeleting(false);
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
  const envioOk = cpDesde.trim().length > 0 && cpHasta.trim().length > 0 && paquete.length > 0;

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
              "radial-gradient(circle at 6% 102%, rgba(3,20,70,0.6) 0%, rgba(17,0,85,0) 26%), radial-gradient(circle at 79% 52%, rgba(112,10,10,0.95) 0%, rgba(87,9,9,0) 60%), radial-gradient(circle at -7% 48%, rgba(112,10,10,1) 0%, rgba(87,9,9,0) 60%)",
          }}
        />
        {/* Viñeta lateral — solo desktop: orillas a negro/rojo oscuro */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 hidden tablet:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(2,1,1,0.85) 0%, rgba(20,4,4,0.35) 12%, rgba(0,0,0,0) 26%, rgba(0,0,0,0) 74%, rgba(20,4,4,0.35) 88%, rgba(2,1,1,0.85) 100%)",
          }}
        />
        {/* Blob azul superior derecha — solo desktop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 hidden tablet:block"
          style={{
            background: "radial-gradient(circle at 97% -2%, rgba(4,24,82,0.75) 0%, rgba(17,0,85,0) 27%)",
          }}
        />

        {/* Contenido — título arriba · selector+contenido centrado en medio · social proof abajo */}
        <div className="relative z-10 flex w-full max-w-[440px] grow flex-col items-center tablet:max-w-[640px]">
          {/* 1 · H1 (arriba) */}
          <h1
            className="text-center font-sora text-[32px] font-light leading-[1.14] text-white tablet:text-[46px] desktop:text-[52px]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Vende, cobra y envía.
            <br />
            Todo en uno.
          </h1>

          {/* Bloque central (centrado en el alto disponible) */}
          <div className="flex w-full flex-1 flex-col items-center justify-center gap-9 py-6">

            {/* 2 · Selector (tabs con subrayado) */}
            <div
              role="radiogroup"
              aria-label="¿Qué quieres hacer?"
              onKeyDown={onSelectorKeyDown}
              className="flex w-full items-end border-b border-white/10"
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
                    className={`relative flex-1 whitespace-nowrap px-1 pb-3 pt-1 font-inter text-[15px] font-medium transition-colors tablet:text-[16px] ${
                      selected ? "text-white" : "text-white/45 hover:text-white/70"
                    }`}
                  >
                    {t.label}
                    <span
                      className={`absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-white transition-transform duration-200 ${
                        selected ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* 3 · Zona que cambia por tab — altura fija para que el selector no se desfase */}
            <div className="flex min-h-[336px] w-full flex-col items-center gap-5 tablet:min-h-[300px]" aria-live="polite">
              {/* ── TIENDA ── */}
              {tabIdx === 0 && (
                <>
                  <p className="max-w-[360px] text-center font-inter text-[16px] font-light leading-[1.6] text-white">
                    Describe tu negocio y crea tu tienda con IA
                  </p>
                  <div className="relative w-full rounded-[14px] bg-[#1D1D1D]" style={{ minHeight: 160 }}>
                    <textarea
                      ref={textareaRef}
                      value={value}
                      onChange={(e) => setValue(e.target.value.slice(0, 500))}
                      rows={3}
                      aria-label="Describe tu negocio"
                      placeholder=""
                      className="h-[160px] w-full resize-none rounded-[14px] bg-transparent px-[18px] py-[15px] font-inter text-[16px] leading-[1.5] text-white outline-none"
                    />
                    {/* Placeholder animado con cursor (solo cuando el input está vacío) */}
                    {!value && (
                      <div aria-hidden className="pointer-events-none absolute inset-0 px-[18px] py-[15px] font-inter text-[16px] leading-[1.5] text-[#8A8A8A]">
                        {placeholder}
                        <span className="ml-px inline-block w-[2px] align-[-2px] bg-[#8A8A8A]" style={{ height: "1.1em", animation: "blink 1s step-end infinite" }} />
                      </div>
                    )}
                    <a
                      href={tab.href}
                      onClick={(e) => {
                        if (!tiendaOk) e.preventDefault();
                        else submit({ length: value.trim().length });
                      }}
                      aria-label="Crear tienda"
                      className={`absolute bottom-3 right-3 flex h-[38px] w-[38px] items-center justify-center rounded-full transition-colors ${
                        tiendaOk ? "bg-red-500 text-white hover:bg-red-600" : "bg-[#60160F] text-white/45"
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
                  <p className="max-w-[360px] text-center font-inter text-[16px] font-light leading-[1.6] text-white">
                    Cobra sin tienda ni terminal, solo comparte tu link
                  </p>
                  <div className="flex w-full flex-col gap-3.5">
                    {/* Monto grande, sin caja */}
                    <div className="flex items-baseline justify-center gap-1.5 py-1">
                      <span className="font-sora text-[28px] font-light text-white/45">$</span>
                      <input
                        inputMode="decimal"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value.replace(/[^\d.]/g, ""))}
                        placeholder="0.00"
                        aria-label="Monto a cobrar"
                        className="w-[180px] bg-transparent text-center font-sora text-[44px] font-light leading-none text-white outline-none placeholder:text-white/25"
                      />
                    </div>
                    {/* Concepto — línea completa */}
                    <input
                      value={concepto}
                      onChange={(e) => setConcepto(e.target.value)}
                      placeholder="Concepto (¿qué cobras?)"
                      aria-label="Concepto"
                      className={FIELD}
                    />
                    <a
                      href={tab.href}
                      onClick={(e) => {
                        if (!linkOk) e.preventDefault();
                        else submit({ length: monto.length });
                      }}
                      aria-disabled={!linkOk}
                      className={`flex h-[46px] items-center justify-center gap-1.5 rounded-[16px] font-inter text-[14px] font-semibold no-underline transition-colors ${
                        linkOk ? "bg-red-500 text-white hover:bg-red-600" : "bg-[#60160F] text-white/45"
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
                  <p className="whitespace-nowrap text-center font-inter text-[16px] font-light leading-[1.6] text-white">
                    Cotiza tu envío en segundos, sin mínimos
                  </p>
                  <div className="flex w-full flex-col gap-3">
                    {/* Origen → destino */}
                    <div className="flex items-center gap-2.5">
                      <input value={cpDesde} onChange={(e) => setCpDesde(e.target.value.replace(/[^\d]/g, "").slice(0, 5))} inputMode="numeric" placeholder="C.P. origen" aria-label="Código postal de origen" className={`${FIELD} flex-1`} />
                      <span aria-hidden className="shrink-0 text-white/50">→</span>
                      <input value={cpHasta} onChange={(e) => setCpHasta(e.target.value.replace(/[^\d]/g, "").slice(0, 5))} inputMode="numeric" placeholder="C.P. destino" aria-label="Código postal de destino" className={`${FIELD} flex-1`} />
                    </div>
                    {/* Selector de tamaño de paquete — horizontal con swipe en móvil */}
                    <div>
                      <p className="mb-2 font-inter text-[13px] font-light text-white/70">¿Qué tamaño es tu paquete?</p>
                      <div
                        role="radiogroup"
                        aria-label="Tamaño del paquete"
                        className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 tablet:mx-0 tablet:grid tablet:grid-cols-4 tablet:overflow-visible tablet:px-0"
                        style={{ scrollbarWidth: "none" }}
                      >
                        {PAQUETES.map((p) => {
                          const sel = paquete === p.id;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              role="radio"
                              aria-checked={sel}
                              onClick={(e) => {
                                setPaquete(p.id);
                                e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                              }}
                              className={`flex w-[142px] shrink-0 flex-col items-start rounded-[12px] border-[1.5px] px-3.5 py-2 text-left transition-colors tablet:w-auto ${
                                sel ? "border-[rgba(231,231,231,0.2)] bg-[rgba(255,255,255,0.12)]" : "border-white/10 bg-[#1D1D1D] hover:border-white/25"
                              }`}
                            >
                              <span className="whitespace-nowrap font-inter text-[14px] font-medium text-white">{p.label}</span>
                              <span className="whitespace-nowrap font-inter text-[12px] font-light text-white/55">{p.ej}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <a
                      href={tab.href}
                      onClick={(e) => {
                        if (!envioOk) e.preventDefault();
                        else submit({ paquete });
                      }}
                      aria-disabled={!envioOk}
                      className={`mt-1 flex h-[46px] items-center justify-center gap-1.5 rounded-[16px] font-inter text-[14px] font-semibold no-underline transition-colors ${
                        envioOk ? "bg-red-500 text-white hover:bg-red-600" : "bg-[#60160F] text-white/45"
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

          {/* 4 · Social proof (abajo) */}
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-2 text-center">
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
