"use client";

/* ─────────────────────────────────────────────────────────────────────────
   T1HeroB — VERSIÓN B del hero (para A/B, se decide cuál se queda).
   Diferencias vs T1Hero (A):
   1. Marquee de logos a todo el ancho, alineado con el header.
   2. Arriba del marquee regresan los datos: "+50,000 negocios" centrado arriba,
      y abajo "+40M de envíos" y "+200M transacciones" en una misma línea.
   3. Ese bloque (datos + marquee) baja: NO aparece en el first fold.
   4. En envíos y pagos, debajo del botón, un espacio + logos de paqueterías y
      métodos de pago respectivamente.
   ───────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SIGNUP_URL, PAGOS_START_URL, ENVIOS_QUOTE_URL } from "@/lib/constants";
import { HERO_CHIPS, HERO_PROMPT_PLACEHOLDERS, capFirst, type HeroChip } from "@/lib/heroPrompt";
import HeroBackground from "@/components/HeroBackground";

/* Analítica: track compartido (posthog + dataLayer, con props base y variant).
   page_context distingue home vs producto_tienda con el mismo namespace hero_*. */
import { track as baseTrack } from "@/lib/analytics";
function track(event: string, data: Record<string, unknown>) {
  baseTrack(event, { page_context: "home", ...data });
}

/* ── Tabs (segmented control) ── */
const TABS = [
  { id: "tienda", label: "Crea tu tienda", mLabel: "Crea tu tienda", href: SIGNUP_URL },
  { id: "envio", label: "Cotizar envío", mLabel: "Cotizar envío", href: ENVIOS_QUOTE_URL },
  { id: "link", label: "Crea link de pago", mLabel: "Link de pago", href: PAGOS_START_URL },
];

/* Íconos por tab (tienda / link / envío) */
function TabIcon({ id }: { id: string }) {
  const c = {
    width: 15, height: 15, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.8,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  };
  if (id === "tienda") {
    return (
      <svg {...c}>
        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
        <path d="M2 7h20" />
        <path d="M2 7v3a2 2 0 0 0 2 2 2 2 0 0 0 2-2V7m0 3a2 2 0 0 0 2 2 2 2 0 0 0 2-2V7m0 3a2 2 0 0 0 2 2 2 2 0 0 0 2-2V7m0 3a2 2 0 0 0 2 2 2 2 0 0 0 2-2V7" />
      </svg>
    );
  }
  if (id === "link") {
    return (
      <svg {...c}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    );
  }
  return (
    <svg {...c}>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}

/* ── Carrusel de logos de marcas (mismas que Casos de éxito) ── */
const LOGOS = [
  { src: "/img/logos/sears.svg", alt: "Sears" },
  { src: "/img/logos/circulo-de-credito.png", alt: "Círculo de Crédito" },
  { src: "/img/logos/mercado-libre.svg", alt: "Mercado Libre" },
  { src: "/img/logos/telcel.svg", alt: "Telcel" },
  { src: "/img/logos/pirma.png", alt: "Pirma" },
  { src: "/img/logos/makora.svg", alt: "Makora" },
  { src: "/img/logos/sanborns.svg", alt: "Sanborns" },
  { src: "/img/logos/pase.png", alt: "PASE" },
  { src: "/img/logos/claro.svg", alt: "Claro" },
];

function LogoMarquee() {
  return (
    <div className="relative overflow-hidden" style={{ padding: "22px 0" }}>
      <div className="marquee-track flex items-center">
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <Image
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            width={120}
            height={40}
            className="mr-16 h-[26px] w-auto shrink-0 object-contain opacity-60 brightness-0 invert"
          />
        ))}
      </div>
    </div>
  );
}

/* ── Logos de métodos de pago (link de pago) — tarjeta blanca ── */
const PAY_LOGOS = [
  "/img/icons/visa-card.svg",
  "/img/icons/mc-card.svg",
  "/img/icons/amex-card.svg",
  "/img/icons/spei-card.svg",
  "/img/icons/kueski-card.svg",
];
function PayLogos() {
  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <span className="font-inter text-[12px] font-normal text-white/45">Acepta todos los métodos de pago</span>
      {/* Logos sin contenedor — a color, directos sobre el fondo */}
      <div className="flex items-center justify-center gap-4">
        {PAY_LOGOS.map((src) => (
          <Image key={src} src={src} alt="" width={80} height={52} className="h-[30px] w-auto object-contain" />
        ))}
      </div>
    </div>
  );
}

/* ── Logos de paqueterías (envío) — círculos de marca ── */
const CARRIER_LOGOS = [
  "/img/circles/dhl.svg",
  "/img/circles/fedex.svg",
  "/img/circles/ups.svg",
  "/img/circles/ampm.svg",
  "/img/circles/99.svg",
];
function CarrierLogos() {
  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <span className="font-inter text-[12px] font-normal text-white/45">Envía con las mejores paqueterías</span>
      <div className="flex items-center justify-center gap-2.5">
        {CARRIER_LOGOS.map((src) => (
          <div key={src} className="flex h-[30px] w-[30px] shrink-0 items-center justify-center overflow-hidden rounded-full">
            <Image src={src} alt="" width={64} height={64} className="h-full w-full object-cover" style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.4))" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* Placeholders rotativos + chips (set unificado, compartido con T1 Tienda). */
const TIENDA_PLACEHOLDERS = HERO_PROMPT_PLACEHOLDERS;
const TIENDA_CHIPS = HERO_CHIPS;

/* H1 rotativo (versión B): marco fijo "Un solo lugar para" + acción que rota. */
const HERO_PHRASES = ["crear tu tienda", "cobrar tus ventas", "enviar tus pedidos", "crecer sin límites"];

/* Formatea dígitos como monto: "10" → "0.10", "109999" → "1,099.99" */
function formatMonto(digits: string): string {
  const cents = digits.replace(/\D/g, "");
  if (cents === "") return "";
  const val = (parseInt(cents, 10) / 100).toFixed(2);
  const [int, dec] = val.split(".");
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + dec;
}

const ArrowRight = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FIELD = "w-full rounded-[14px] bg-[#1D1D1D] px-4 py-3 font-inter text-[16px] text-white outline-none placeholder:text-[#8A8A8A] focus:ring-1 focus:ring-white/20";

export default function T1HeroB() {
  const [tabIdx, setTabIdx] = useState(0);
  const tab = TABS[tabIdx];

  // Modo tienda
  const [value, setValue] = useState("");
  const [promptSource, setPromptSource] = useState<"chip" | "typed">("typed");
  const [chipCategory, setChipCategory] = useState<string | null>(null);
  const [phIdx, setPhIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const placeholder = tabIdx === 0 ? typed : "";

  // Modo link de pago
  const [monto, setMonto] = useState("");
  const [concepto, setConcepto] = useState("");
  const montoRef = useRef<HTMLInputElement>(null);

  // Modo envío
  const [cpDesde, setCpDesde] = useState("");
  const [cpHasta, setCpHasta] = useState("");
  const cpDesdeRef = useRef<HTMLInputElement>(null);

  // H1 rotativo — cicla la acción cada 2.2s
  const [pIdx, setPIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPIdx((i) => (i + 1) % HERO_PHRASES.length), 2200);
    return () => clearInterval(t);
  }, []);

  // Al abrir la pestaña de link o envío, enfoca su primer campo para escribir de inmediato.
  // En móvil NO se enfoca (abriría el teclado de golpe, molesto).
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    if (tab.id === "link") montoRef.current?.focus();
    else if (tab.id === "envio") cpDesdeRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabIdx]);

  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Alto del teclado móvil (visualViewport) para subir el botón por encima
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
  const kbBtnStyle = kbOpen ? { position: "fixed" as const, left: 16, right: 16, bottom: kbH + 10, zIndex: 60 } : undefined;

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

  const insertChip = (chip: HeroChip) => {
    track("hero_chip_click", { mode: tab.id, chip: chip.label });
    const el = textareaRef.current;
    const example = capFirst(chip.examples[Math.floor(Math.random() * chip.examples.length)]);
    setValue(example);
    setPromptSource("chip");
    setChipCategory(chip.label);
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
  const linkOk = Number(monto) > 0;
  const envioOk = cpDesde.trim().length > 0 && cpHasta.trim().length > 0;

  return (
    <div className="relative z-0">
      <section className="relative flex flex-col items-center overflow-hidden px-5 pb-0 pt-24 tablet:px-6 tablet:pt-28 tablet:pb-0">
        {/* Fondo (compartido entre los heroes) */}
        <HeroBackground />

        {/* ══ FIRST FOLD ══ título + selector + contenido. En móvil un poco menos alto
            (85svh) para que asome un hint de los datos/marquee = "hay scroll". ══ */}
        <div className="relative z-10 flex min-h-[calc(85svh-96px)] w-full max-w-[440px] flex-col items-center tablet:min-h-[680px] tablet:max-w-[720px]">
          {/* 1 · H1 (arriba) — rotativo: "Un solo lugar para [acción]." */}
          <h1
            className="text-center font-sora text-[30px] font-light leading-[1.12] text-white tablet:text-[44px]"
            style={{ letterSpacing: "-0.03em" }}
          >
            <span className="block">Un solo lugar para</span>
            <span
              key={pIdx}
              className="block text-white"
              style={{ animation: "heroWordIn 0.4s ease-out" }}
            >
              {HERO_PHRASES[pIdx]}
            </span>
          </h1>

          {/* Bloque central — anclado bajo el H1 (NO centrado) para que el selector
              quede fijo y no suba/baje al cambiar de tab (el contenido varía de alto). */}
          <div className="flex w-full flex-col items-center gap-8 pt-10 tablet:pt-14">

            {/* 2 · Selector — móvil: tabs con subrayado · desktop: segmented pill */}
            {/* Móvil — tabs con subrayado */}
            <div
              role="radiogroup"
              aria-label="¿Qué quieres hacer?"
              onKeyDown={onSelectorKeyDown}
              className="flex w-full items-end border-b border-white/10 tablet:hidden"
            >
              {TABS.map((t, i) => {
                const selected = i === tabIdx;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectTab(i)}
                    className={`relative flex-1 whitespace-nowrap px-1 pb-3 pt-1 font-inter text-[13px] font-medium uppercase tracking-[0.03em] transition-colors ${
                      selected ? "text-white" : "text-white/45 hover:text-white/70"
                    }`}
                  >
                    {t.mLabel}
                    <span
                      className={`absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-white transition-transform duration-200 ${
                        selected ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            {/* Desktop — tabs con línea inferior (sin recuadro) */}
            <div
              role="radiogroup"
              aria-label="¿Qué quieres hacer?"
              onKeyDown={onSelectorKeyDown}
              className="hidden w-full items-end border-b border-white/10 tablet:flex"
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
                    className={`relative flex flex-1 items-center justify-center gap-2 whitespace-nowrap px-2 pb-3 pt-1 font-inter text-[14px] font-medium uppercase tracking-[0.04em] transition-colors ${
                      selected ? "text-white" : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    <span className={selected ? "text-white" : "text-white/60"}>
                      <TabIcon id={t.id} />
                    </span>
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

            {/* 3 · Zona que cambia por tab. El selector va anclado ARRIBA (bloque no
                centrado), así que aunque esta zona cambie de alto el selector no se mueve. */}
            <div className="flex min-h-[336px] w-full flex-col items-center gap-5 tablet:min-h-[300px]" aria-live="polite">
              {/* ── TIENDA ── */}
              {tab.id === "tienda" && (
                <>
                  <p className="max-w-[360px] text-center font-inter text-[16px] font-light leading-[1.6] text-white">
                    Describe tu negocio y crea tu tienda con IA
                  </p>
                  <div className="relative w-full rounded-[14px] bg-[#1D1D1D] min-h-[160px] tablet:min-h-[180px]">
                    <textarea
                      ref={textareaRef}
                      value={value}
                      onChange={(e) => { setValue(e.target.value.slice(0, 500)); setPromptSource("typed"); setChipCategory(null); }}
                      rows={3}
                      aria-label="Describe tu negocio"
                      placeholder=""
                      className="h-[160px] tablet:h-[180px] w-full resize-none rounded-[14px] bg-transparent px-[18px] py-[15px] font-inter text-[16px] leading-[1.5] text-white outline-none"
                    />
                    {/* Placeholder animado con cursor (solo cuando el input está vacío) */}
                    {!value && (
                      <div aria-hidden className="pointer-events-none absolute inset-0 px-[18px] py-[15px] font-inter text-[16px] leading-[1.5] text-[#8A8A8A]">
                        {capFirst(placeholder)}
                        <span className="ml-px inline-block w-[2px] align-[-2px] bg-[#8A8A8A]" style={{ height: "1.1em", animation: "blink 1s step-end infinite" }} />
                      </div>
                    )}
                    <a
                      href={tab.href}
                      onClick={(e) => {
                        if (!tiendaOk) e.preventDefault();
                        else submit({ length: value.trim().length, prompt_source: promptSource, chip_category: promptSource === "chip" ? chipCategory : null });
                      }}
                      aria-label="Comienza gratis"
                      style={kbOpen ? { position: "fixed", right: 16, bottom: kbH + 10, zIndex: 60 } : undefined}
                      className={`absolute bottom-3 right-3 flex h-[40px] items-center gap-1.5 rounded-full pl-4 pr-3 font-inter text-[14px] font-semibold transition-colors ${
                        tiendaOk ? "bg-red-500 text-white hover:bg-red-600" : "bg-[#60160F] text-white/45"
                      }`}
                    >
                      Comienza gratis
                      {ArrowRight}
                    </a>
                  </div>
                  {/* chips — una sola línea (scroll horizontal si no caben) */}
                  <div className="flex w-full flex-nowrap items-center justify-start gap-2.5 overflow-x-auto tablet:justify-center tablet:gap-2" style={{ scrollbarWidth: "none" }}>
                    {TIENDA_CHIPS.map((chip) => (
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
                </>
              )}

              {/* ── LINK DE PAGO ── */}
              {tab.id === "link" && (
                <>
                  <p className="flex min-h-[52px] max-w-[360px] items-center justify-center text-center font-inter text-[16px] font-light leading-[1.6] text-white tablet:min-h-0 tablet:max-w-none tablet:whitespace-nowrap">
                    Cobra sin terminal. Comparte un link y listo.
                  </p>
                  <div className="flex w-full flex-1 flex-col gap-3.5 tablet:flex-none">
                    {/* Campos (monto + concepto) — misma altura mín. que el CP de envío para alinear los logos entre pestañas */}
                    <div className="flex min-h-[172px] flex-col gap-3.5">
                    {/* Monto grande, sin caja */}
                    <div className="flex items-center justify-center gap-1.5" style={{ minHeight: 85 }}>
                      <span className="font-sora text-[28px] font-light text-white/45">$</span>
                      <input
                        ref={montoRef}
                        inputMode="numeric"
                        value={monto === "" ? "" : formatMonto(monto)}
                        onChange={(e) => setMonto(e.target.value.replace(/\D/g, "").slice(0, 9))}
                        placeholder="0.00"
                        aria-label="Monto a cobrar"
                        className="min-w-[64px] max-w-[280px] bg-transparent text-center font-sora text-[44px] font-light leading-none text-white caret-[#DB3B2B] outline-none [field-sizing:content] placeholder:text-white/25 [&:placeholder-shown:not(:focus)]:caret-transparent"
                      />
                    </div>
                    {/* Concepto — pregunta arriba + hint abajo */}
                    <div className="mx-auto w-full tablet:max-w-[440px]">
                      <p className="mb-1.5 px-1 font-inter text-[14px] font-medium text-white/85">¿Qué quieres cobrar?</p>
                      <input
                        value={concepto}
                        onChange={(e) => setConcepto(e.target.value)}
                        placeholder="Ej. Sesión de fotos"
                        aria-label="Concepto del cobro"
                        className={FIELD}
                      />
                    </div>
                    </div>
                    <a
                      href={tab.href}
                      onClick={(e) => {
                        if (!linkOk) e.preventDefault();
                        else submit({ length: monto.length });
                      }}
                      aria-disabled={!linkOk}
                      style={kbBtnStyle}
                      className={`mt-auto flex h-[46px] items-center justify-center gap-1.5 rounded-[16px] font-inter text-[14px] font-semibold no-underline transition-colors tablet:mt-3 tablet:w-full tablet:max-w-[440px] tablet:self-center ${
                        linkOk ? "bg-red-500 text-white hover:bg-red-600" : "bg-[#60160F] text-white/45"
                      }`}
                    >
                      Crea link de pago
                      {ArrowRight}
                    </a>
                    {/* B: espacio + logos de métodos de pago debajo del botón */}
                    <PayLogos />
                  </div>
                </>
              )}

              {/* ── ENVÍO ── */}
              {tab.id === "envio" && (
                <>
                  <p className="flex min-h-[52px] max-w-[360px] items-center justify-center text-center font-inter text-[16px] font-light leading-[1.6] text-white tablet:min-h-0 tablet:max-w-none tablet:whitespace-nowrap">
                    Cotiza con +10 paqueterías en un clic.
                  </p>
                  <div className="flex w-full flex-1 flex-col gap-4 tablet:flex-none">
                    {/* CP — misma altura mín. que los campos de link para alinear los logos entre pestañas */}
                    <div className="mx-auto flex min-h-[172px] w-full flex-col justify-center rounded-[16px] bg-[#1D1D1D] px-4 py-2 transition-shadow focus-within:ring-1 focus-within:ring-white/25 tablet:max-w-[440px]">
                      <div className="flex gap-3.5">
                        <div className="flex flex-col items-center self-stretch py-[22px]">
                          {/* Origen: punto · Destino: pin de localización */}
                          <span className="h-[10px] w-[10px] shrink-0 rounded-full border-[1.5px] border-white/80" />
                          <span className="my-1 w-px flex-1" style={{ background: "repeating-linear-gradient(#FFFFFF 0 3px, transparent 3px 7px)" }} />
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0" style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.5))" }}>
                            <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" fill="#FFFFFF" />
                            <circle cx="12" cy="10" r="2.6" fill="#1D1D1D" />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <label className="block py-4">
                            <span className="font-inter text-[12px] font-normal text-white">Desde</span>
                            <input ref={cpDesdeRef} value={cpDesde} onChange={(e) => setCpDesde(e.target.value.slice(0, 40))} placeholder="Código postal o colonia" aria-label="Origen del envío" className="mt-0.5 w-full bg-transparent font-inter text-[16px] text-white outline-none placeholder:text-[#8A8A8A]" />
                          </label>
                          <span className="block h-px w-full bg-white/10" />
                          <label className="block py-4">
                            <span className="font-inter text-[12px] font-normal text-white">Hacia</span>
                            <input value={cpHasta} onChange={(e) => setCpHasta(e.target.value.slice(0, 40))} placeholder="Código postal o colonia" aria-label="Destino del envío" className="mt-0.5 w-full bg-transparent font-inter text-[16px] text-white outline-none placeholder:text-[#8A8A8A]" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <a
                      href={tab.href}
                      onClick={(e) => {
                        if (!envioOk) e.preventDefault();
                        else submit({ mode: "envio" });
                      }}
                      aria-disabled={!envioOk}
                      style={kbBtnStyle}
                      className={`mt-auto flex h-[46px] items-center justify-center gap-1.5 rounded-[16px] font-inter text-[14px] font-semibold no-underline transition-colors tablet:mt-3 tablet:w-full tablet:max-w-[440px] tablet:self-center ${
                        envioOk ? "bg-red-500 text-white hover:bg-red-600" : "bg-[#60160F] text-white/45"
                      }`}
                    >
                      Cotiza gratis
                      {ArrowRight}
                    </a>
                    {/* B: espacio + logos de paqueterías debajo del botón */}
                    <CarrierLogos />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Números — dentro del first fold, debajo del input */}
          <div className="mt-8 flex flex-col items-center gap-2.5 pb-2 tablet:mt-10 tablet:gap-4">
            <span className="font-inter text-[19px] font-normal text-white tablet:text-[24px]">+50,000 negocios</span>
            <div className="flex items-center gap-6 tablet:gap-12">
              <span className="font-inter text-[15px] font-normal text-white/75 tablet:text-[18px]">+40M de envíos</span>
              <span className="font-inter text-[15px] font-normal text-white/75 tablet:text-[18px]">+200M transacciones</span>
            </div>
          </div>
        </div>

        {/* ══ BAJO EL FOLD ══ marquee de marcas a todo el ancho (alineado al header) ══ */}
        <div className="relative z-10 w-full pb-8 pt-11 tablet:pt-[60px]">
          <div className="mx-auto w-full max-w-[var(--max-w)] px-5 tablet:px-6">
            <LogoMarquee />
          </div>
        </div>
      </section>
    </div>
  );
}
