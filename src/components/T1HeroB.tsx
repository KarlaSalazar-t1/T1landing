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
  { id: "tienda", label: "Crea tu tienda", mLabel: "Tienda", vLabel: "Tienda en línea", href: SIGNUP_URL },
  { id: "envio", label: "Cotizar envío", mLabel: "Envíos", vLabel: "Cotizar envío", href: ENVIOS_QUOTE_URL },
  { id: "link", label: "Crea link de pago", mLabel: "Pagos", vLabel: "Link de pago", href: PAGOS_START_URL },
];


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
    <div className="mt-6 flex flex-col items-center">
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
    <div className="mt-6 flex flex-col items-center">
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

/* unoChat (propuesta B): sin pestañas, un solo input de chat con Uno.
   Las sugerencias cubren los tres productos y mandan a su flujo. */
const UNO_PLACEHOLDERS = [
  "Crea mi tienda de ropa casual con estilo minimalista",
  "Cotiza un envío de 2 kg de CDMX a Monterrey",
  "Crea un link de pago de $850 por una sesión de fotos",
  "Crea mi tienda de joyería de plata con diseños elegantes",
  "¿Cuánto cuesta mandar una caja a Mérida?",
  "Cóbrale $1,200 a un cliente con meses sin intereses",
];
const UNO_SUGGESTIONS = [
  { id: "tienda", label: "Crea tu tienda", prompt: "Crea mi tienda de ropa casual con estilo minimalista", href: SIGNUP_URL,
    icon: <path d="M4 9.5 5.5 4h13L20 9.5M4 9.5h16M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0M5.5 12v8h13v-8M10 20v-4.5h4V20" /> },
  { id: "envio", label: "Cotiza un envío", prompt: "Cotiza un envío de 2 kg de CDMX a Monterrey", href: ENVIOS_QUOTE_URL,
    icon: <><path d="M3 6.5h11v9.5H3zM14 9.5h3.8L21 13v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17.5" cy="17.5" r="1.8" /></> },
  { id: "link", label: "Crea un link de pago", prompt: "Crea un link de pago de $850 por una sesión de fotos", href: PAGOS_START_URL,
    icon: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /> },
];

/* H1 rotativo (versión B): marco fijo "Un solo lugar para" + acción que rota. */
const HERO_PHRASES = ["crear tu tienda", "cobrar tus ventas", "enviar tus pedidos", "crecer sin límites"];
const BUENFIN_PHRASES = ["crea tu tienda", "envía tus pedidos", "cobra tus ventas", "crece sin límites"];

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

/* Uno con su avatar en línea, junto a su nombre en la instrucción de cada pestaña */
function UnoInline({ label = "Uno" }: { label?: string }) {
  return (
    <b className="inline-flex items-center gap-1.5 whitespace-nowrap align-[-7px] font-semibold">
      <Image src="/img/uno-avatar.svg" alt="" width={26} height={26} unoptimized className="h-[25px] w-[25px]" />
      {label}
    </b>
  );
}

/* Instrucción arriba de cada pestaña (como en t1.com) — solo con `uno` */
const INSTR = "max-w-[360px] text-center font-inter text-[16px] font-light leading-[1.6] text-white tablet:max-w-none";

const FIELD = "w-full rounded-[14px] bg-[#1D1D1D] px-4 py-3 font-inter text-[16px] text-white outline-none placeholder:text-[#8A8A8A] focus:ring-1 focus:ring-white/20";

/* uno: propuesta para presentar a Uno (la IA de T1) sin rehacer el hero. Agrega
   las instrucciones por pestaña de t1.com; las tres mencionan a Uno con su
   avatar junto al nombre, y en Tienda se presenta como "Uno, la IA de T1". */
/* unoChat: propuesta B, más limpia — sin pestañas ni formularios, solo el chat. */
/* unoSub: propuesta v2 — sin instrucción por pestaña; una sola frase general
   bajo el título que presenta a Uno y no cambia al cambiar de pestaña. */
export default function T1HeroB({ buenFin = false, variantB = false, uno = false, unoChat = false, unoSub = false }: { buenFin?: boolean; variantB?: boolean; uno?: boolean; unoChat?: boolean; unoSub?: boolean }) {
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
  const heroPhrases = buenFin ? BUENFIN_PHRASES : HERO_PHRASES;
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
    const list = unoChat ? UNO_PLACEHOLDERS : TIENDA_PLACEHOLDERS;
    const full = list[phIdx % list.length];
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
  }, [typed, deleting, phIdx, tabIdx, value, unoChat]);

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

  // unoChat: la sugerencia elegida decide a qué flujo va el botón
  const [sugIdx, setSugIdx] = useState<number | null>(null);
  const pickSuggestion = (i: number) => {
    const sg = UNO_SUGGESTIONS[i];
    track("hero_chip_click", { mode: "uno_chat", chip: sg.id });
    setValue(sg.prompt);
    setSugIdx(i);
    requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
    });
  };

  const tiendaOk = value.trim().length > 0;
  const linkOk = Number(monto) > 0;
  const envioOk = cpDesde.trim().length > 0 && cpHasta.trim().length > 0;

  return (
    <div className="relative z-0">
      <section className={`relative flex flex-col items-center overflow-hidden px-5 pb-0 tablet:px-6 tablet:pb-0 ${buenFin ? (variantB ? "pt-16 tablet:pt-28" : "pt-16 tablet:pt-20") : "pt-24 tablet:pt-28"}`}>
        {/* Fondo (compartido entre los heroes) */}
        <HeroBackground />

        {/* ══ FIRST FOLD ══ título + selector + contenido. En móvil un poco menos alto
            (85svh) para que asome un hint de los datos/marquee = "hay scroll". ══ */}
        <div className="relative z-10 flex min-h-[calc(85svh-96px)] w-full max-w-[440px] flex-col items-center tablet:min-h-[760px] tablet:max-w-[840px] wide:min-h-[860px] wide:max-w-[1040px]">
          {buenFin && variantB ? (
            /* ══ Versión B — logo VERTICAL a la izquierda · título a la derecha (desktop);
               en móvil se apila (logo arriba, título abajo). ══ */
            <div className="mb-6 flex w-full flex-col items-center gap-5 tablet:mb-2 tablet:flex-row tablet:justify-center tablet:gap-9">
              <Image
                src="/img/buen-fin-vertical-w.png"
                alt="MIPYMES · El Buen Fin 2026 — 13 al 17 de noviembre"
                width={2135}
                height={2135}
                priority
                className="h-[128px] w-auto shrink-0 object-contain tablet:h-[144px]"
              />
              <h1
                className="text-center font-sora text-[30px] font-light leading-[1.12] text-white tablet:text-left tablet:text-[46px]"
                style={{ letterSpacing: "-0.03em" }}
              >
                <span className="block">Este Buen Fin con T1</span>
                <span key={pIdx} className="block text-white" style={{ animation: "heroWordIn 0.4s ease-out" }}>
                  {heroPhrases[pIdx]}
                </span>
              </h1>
            </div>
          ) : (
            <>
              {/* Logo MIPYMES × Buen Fin (versión blanca, sin fondo) — arriba del título */}
              {buenFin && (
                <div className="mb-5 flex justify-center tablet:mb-6">
                  <Image src="/img/buen-fin-mipymes-w.png" alt="MIPYMES · El Buen Fin 2026 — 13 al 17 de noviembre" width={318} height={133} priority className="h-[96px] w-auto object-contain tablet:h-[112px]" />
                </div>
              )}

              {/* 1 · H1 (arriba) — rotativo: "Un solo lugar para [acción]."
                  Desktop (≥1024px): una sola línea, la frase que cambia va a la derecha. Todas las
                  frases ocupan la misma celda del grid (solo una visible), así el ancho
                  es siempre el de la más larga y el texto fijo no brinca al rotar.
                  Móvil y tablet: dos líneas, como antes. */}
              <h1
                className="text-center font-sora text-[32px] font-light leading-[1.12] text-white tablet:text-[48px] lg:whitespace-nowrap wide:text-[56px]"
                style={{ letterSpacing: "-0.03em" }}
              >
                <span className="block lg:inline">{buenFin ? "Este Buen Fin con T1" : "Un solo lugar para"} </span>
                <span className="grid justify-items-center lg:inline-grid lg:justify-items-start lg:text-left">
                  {heroPhrases.map((ph, i) => (
                    <span
                      key={i === pIdx ? `on-${pIdx}` : ph}
                      aria-hidden={i !== pIdx}
                      className="text-white"
                      style={{ gridArea: "1 / 1", visibility: i === pIdx ? "visible" : "hidden", animation: i === pIdx ? "heroWordIn 0.4s ease-out" : undefined }}
                    >
                      {ph}
                    </span>
                  ))}
                </span>
              </h1>
            </>
          )}

          {unoSub && (
            <p className="mb-4 mt-4 max-w-[340px] text-balance text-center font-inter text-[16px] font-light leading-[1.55] text-white/75 tablet:max-w-[560px] tablet:text-[18px]">
              Tú lo pides y <b className="font-semibold text-white">Uno</b> lo hace.
            </p>
          )}

          {unoChat ? (
            /* ── Propuesta B: solo el chat con Uno ── */
            <div className="flex w-full flex-col items-center gap-5 pt-10 tablet:pt-14">
              <p className={INSTR}>Pídele a <b className="whitespace-nowrap font-semibold">Uno, la IA de T1,</b> lo que necesites</p>
              <div className="relative w-full rounded-[20px] bg-[#1D1D1D] transition-shadow focus-within:ring-1 focus-within:ring-white/20">
                <textarea
                  ref={textareaRef}
                  value={value}
                  onChange={(e) => { setValue(e.target.value.slice(0, 500)); setSugIdx(null); }}
                  rows={2}
                  aria-label="Pídele algo a Uno"
                  placeholder=""
                  className="h-[132px] w-full resize-none rounded-[20px] bg-transparent px-[18px] py-[16px] font-inter text-[16px] leading-[1.5] text-white outline-none tablet:h-[128px] tablet:px-[22px] tablet:py-[18px] tablet:text-[17px]"
                />
                {!value && (
                  <div aria-hidden className="pointer-events-none absolute inset-0 px-[18px] py-[16px] font-inter text-[16px] leading-[1.5] text-[#8A8A8A] tablet:px-[22px] tablet:py-[18px] tablet:text-[17px]">
                    {placeholder}
                    <span className="ml-px inline-block w-[2px] align-[-2px] bg-[#8A8A8A]" style={{ height: "1.1em", animation: "blink 1s step-end infinite" }} />
                  </div>
                )}
                <Image src="/img/uno-avatar.svg" alt="Uno" width={36} height={36} unoptimized className="pointer-events-none absolute bottom-[14px] left-[16px] h-[34px] w-[34px] tablet:left-[20px]" />
                <a
                  href={sugIdx === null ? SIGNUP_URL : UNO_SUGGESTIONS[sugIdx].href}
                  onClick={(e) => {
                    if (!tiendaOk) e.preventDefault();
                    else track("hero_prompt_submit", { mode: "uno_chat", suggestion: sugIdx === null ? null : UNO_SUGGESTIONS[sugIdx].id, length: value.trim().length });
                  }}
                  aria-label="Enviar a Uno"
                  style={kbOpen ? { position: "fixed", right: 16, bottom: kbH + 10, zIndex: 60 } : undefined}
                  className={`absolute bottom-3 right-3 flex h-[40px] w-[40px] items-center justify-center rounded-full transition-colors ${
                    tiendaOk ? "bg-red-500 text-white hover:bg-red-600" : "bg-[#60160F] text-white/45"
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" /></svg>
                </a>
              </div>
              {/* Sugerencias: una por producto (tienda, envíos, pagos) */}
              <div className="flex w-full flex-wrap items-center justify-center gap-2.5">
                {UNO_SUGGESTIONS.map((sg, i) => (
                  <button
                    key={sg.id}
                    type="button"
                    onClick={() => pickSuggestion(i)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 font-inter text-[14px] font-medium text-white transition-colors ${
                      sugIdx === i ? "border-white/40 bg-white/10" : "border-white/12 hover:border-white/30"
                    }`}
                    style={{ background: sugIdx === i ? undefined : "rgba(52,52,52,0.6)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-80">{sg.icon}</svg>
                    {sg.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
          <>
          {/* Bloque central — anclado bajo el H1 (NO centrado) para que el selector
              quede fijo y no suba/baje al cambiar de tab (el contenido varía de alto). */}
          <div className={`flex w-full flex-col items-center gap-8 pt-10 tablet:gap-10 ${variantB ? "tablet:pt-6" : "tablet:pt-16"}`}>

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
                    className={`relative flex-1 whitespace-nowrap px-1 pb-3 pt-1 font-inter font-medium transition-colors ${unoSub ? "text-[14px] max-[380px]:text-[13px]" : "text-[13px] uppercase tracking-[0.03em]"} ${
                      selected ? "text-white" : "text-white/45 hover:text-white/70"
                    }`}
                  >
                    {unoSub ? t.vLabel : t.mLabel}
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
            <div className="flex min-h-[336px] w-full flex-col items-center gap-5 tablet:min-h-[260px]" aria-live="polite">
              {/* ── TIENDA ── */}
              {tab.id === "tienda" && (
                <>
                  {uno && <p className={INSTR}>Describe tu negocio y crea tu tienda con <br className="tablet:hidden" /><UnoInline label="Uno, la IA de T1" /></p>}
                  <div className="relative w-full rounded-[16px] bg-[#1D1D1D] min-h-[160px] tablet:min-h-[170px]">
                    <textarea
                      ref={textareaRef}
                      value={value}
                      onChange={(e) => { setValue(e.target.value.slice(0, 500)); setPromptSource("typed"); setChipCategory(null); }}
                      rows={3}
                      aria-label="Describe tu negocio"
                      placeholder=""
                      className="h-[160px] tablet:h-[170px] w-full resize-none rounded-[16px] bg-transparent px-[18px] py-[15px] font-inter text-[16px] tablet:px-[22px] tablet:py-[18px] tablet:text-[17px] leading-[1.5] text-white outline-none"
                    />
                    {/* Placeholder animado con cursor (solo cuando el input está vacío) */}
                    {!value && (
                      <div aria-hidden className="pointer-events-none absolute inset-0 px-[18px] py-[15px] font-inter text-[16px] leading-[1.5] text-[#8A8A8A] tablet:px-[22px] tablet:py-[18px] tablet:text-[17px]">
                        {capFirst(placeholder)}
                        <span className="ml-px inline-block w-[2px] align-[-2px] bg-[#8A8A8A]" style={{ height: "1.1em", animation: "blink 1s step-end infinite" }} />
                      </div>
                    )}
                    {/* unoSub: Uno vive en el input de la tienda (abajo a la izquierda) */}
                    {unoSub && (
                      <Image src="/img/uno-avatar.svg" alt="Uno" width={36} height={36} unoptimized className="pointer-events-none absolute bottom-[14px] left-[16px] h-[34px] w-[34px] tablet:left-[20px]" />
                    )}
                    <a
                      href={tab.href}
                      onClick={(e) => {
                        if (!tiendaOk) e.preventDefault();
                        else submit({ length: value.trim().length, prompt_source: promptSource, chip_category: promptSource === "chip" ? chipCategory : null });
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
                  {uno && <p className={INSTR}>Cobra sin terminal: crea tu link de pago con <br className="tablet:hidden" /><UnoInline /></p>}
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
                        className="min-w-[64px] max-w-[280px] bg-transparent text-left font-sora text-[44px] font-light leading-none text-white caret-[#DB3B2B] outline-none [field-sizing:content] placeholder:text-white/25 [&:placeholder-shown:not(:focus)]:caret-transparent"
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
                  {uno && <p className={INSTR}>Compara +10 paqueterías en segundos con <br className="tablet:hidden" /><UnoInline /></p>}
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
          </>
          )}

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
