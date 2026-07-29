"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
  { id: "tienda", label: "Crea tu tienda", mLabel: "Crea tu tienda", href: SIGNUP_URL },
  { id: "link", label: "Crea link de pago", mLabel: "Link de pago", href: PAGOS_START_URL },
  { id: "envio", label: "Cotizar envío", mLabel: "Cotizar envío", href: ENVIOS_QUOTE_URL },
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
  { label: "Dulces", example: "Vendo dulces y postres artesanales" },
  { label: "Refacciones", example: "Vendo refacciones y autopartes" },
  { label: "Hogar", example: "Vendo artículos de decoración para el hogar" },
];

/* Paquetes para cotizar envío (con ejemplo de qué cabe) */
const PAQUETES = [
  { id: "sobre", label: "Sobre", ej: "Documentos" },
  { id: "pequeno", label: "Pequeño", ej: "Celular, accesorios" },
  { id: "mediano", label: "Mediano", ej: "Ropa, zapatos" },
  { id: "grande", label: "Grande", ej: "Electrodomésticos" },
];

const SOCIAL_PROOF = ["+50,000 negocios", "+30M de envíos", "+200M transacciones"];

/* Formatea dígitos como monto: "10" → "0.10", "109999" → "1,099.99" */
function formatMonto(digits: string): string {
  const cents = digits.replace(/\D/g, "");
  if (cents === "") return "";
  const val = (parseInt(cents, 10) / 100).toFixed(2);
  const [int, dec] = val.split(".");
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + dec;
}

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

const FIELD = "w-full rounded-[14px] bg-[#1D1D1D] px-4 py-3 font-inter text-[16px] text-white outline-none placeholder:text-[#8A8A8A] focus:ring-1 focus:ring-white/20";

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

  // Social proof rotativo (un dato a la vez, cicla los 3)
  const [spIdx, setSpIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSpIdx((i) => (i + 1) % SOCIAL_PROOF.length), 2600);
    return () => clearInterval(t);
  }, []);

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
  const linkOk = Number(monto) > 0;
  const envioOk = cpDesde.trim().length > 0 && cpHasta.trim().length > 0 && paquete.length > 0;

  return (
    <div className="relative z-0">
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-5 pb-0 pt-24 tablet:min-h-screen tablet:px-6 tablet:pt-28 tablet:pb-0">
        {/* Fondo — degradado exacto de Figma */}
        <div aria-hidden className="absolute inset-0 z-0" style={{ background: "linear-gradient(180deg, #0e0d0d 0%, #020101 100%)" }} />
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
        {/* Degradado rojo→negro al fondo — suaviza el corte hacia la sección negra */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[260px]"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(3,1,1,0.85) 55%, #000 100%)" }}
        />

        {/* Contenido — título arriba · selector+contenido centrado en medio · social proof abajo */}
        <div className="relative z-10 flex w-full max-w-[440px] grow flex-col items-center tablet:max-w-[640px]">
          {/* 1 · H1 (arriba) */}
          <h1
            className="text-center font-sora text-[32px] font-light leading-[1.14] text-white tablet:text-[48px] desktop:whitespace-nowrap"
            style={{ letterSpacing: "-0.03em" }}
          >
            Todo tu negocio en un lugar.
          </h1>

          {/* Bloque central (centrado en el alto disponible) */}
          <div className="flex w-full flex-1 flex-col items-center justify-center gap-9 py-6">

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

            {/* 3 · Zona que cambia por tab — altura fija para que el selector no se desfase */}
            <div className="flex min-h-[336px] w-full flex-col items-center gap-5 tablet:min-h-[300px]" aria-live="polite">
              {/* ── TIENDA ── */}
              {tab.id === "tienda" && (
                <>
                  <p className="max-w-[360px] text-center font-inter text-[16px] font-light leading-[1.6] text-white">
                    Describe tu negocio y crea tu tienda con IA
                  </p>
                  <div className="relative w-full rounded-[14px] bg-[#1D1D1D] min-h-[160px] tablet:min-h-[124px]">
                    <textarea
                      ref={textareaRef}
                      value={value}
                      onChange={(e) => setValue(e.target.value.slice(0, 500))}
                      rows={3}
                      aria-label="Describe tu negocio"
                      placeholder=""
                      className="h-[160px] tablet:h-[124px] w-full resize-none rounded-[14px] bg-transparent px-[18px] py-[15px] font-inter text-[16px] leading-[1.5] text-white outline-none"
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
                      style={kbOpen ? { position: "fixed", right: 16, bottom: kbH + 10, zIndex: 60 } : undefined}
                      className={`absolute bottom-3 right-3 flex h-[38px] w-[38px] items-center justify-center rounded-full transition-colors ${
                        tiendaOk ? "bg-red-500 text-white hover:bg-red-600" : "bg-[#60160F] text-white/45"
                      }`}
                    >
                      {ArrowUp}
                    </a>
                  </div>
                  {/* chips — envuelven en móvil, una sola línea en desktop */}
                  <div className="flex min-h-[80px] flex-wrap items-start justify-center gap-2.5 tablet:min-h-0 tablet:flex-nowrap tablet:gap-2">
                    {TIENDA_CHIPS.map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => insertChip(chip)}
                        className="rounded-[11px] border border-white/10 px-2.5 py-1.5 font-inter text-[14px] font-medium text-white transition-colors hover:border-white/25 tablet:whitespace-nowrap tablet:px-2.5 tablet:py-1.5 tablet:text-[13px]"
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
                  <p className="max-w-[360px] text-center font-inter text-[16px] font-light leading-[1.6] text-white tablet:max-w-none tablet:whitespace-nowrap">
                    Cobra sin terminal. Comparte un link y listo.
                  </p>
                  <div className="flex w-full flex-1 flex-col gap-3.5 tablet:flex-none">
                    {/* Monto grande, sin caja */}
                    <div className="flex items-center justify-center gap-1.5" style={{ minHeight: 85 }}>
                      <span className="font-sora text-[28px] font-light text-white/45">$</span>
                      <input
                        inputMode="numeric"
                        value={monto === "" ? "" : formatMonto(monto)}
                        onChange={(e) => setMonto(e.target.value.replace(/\D/g, "").slice(0, 9))}
                        placeholder="0.00"
                        aria-label="Monto a cobrar"
                        className="w-[200px] bg-transparent text-center font-sora text-[44px] font-light leading-none text-white outline-none placeholder:text-white/25"
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
                    <a
                      href={tab.href}
                      onClick={(e) => {
                        if (!linkOk) e.preventDefault();
                        else submit({ length: monto.length });
                      }}
                      aria-disabled={!linkOk}
                      style={kbBtnStyle}
                      className={`mt-auto mb-6 flex h-[46px] items-center justify-center gap-1.5 rounded-[16px] font-inter text-[14px] font-semibold no-underline transition-colors tablet:mt-0 tablet:mb-0 tablet:w-full tablet:max-w-[440px] tablet:self-center ${
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
              {tab.id === "envio" && (
                <>
                  <p className="max-w-[360px] text-center font-inter text-[16px] font-light leading-[1.6] text-white tablet:max-w-none tablet:whitespace-nowrap">
                    Cotiza a todo México en segundos.
                  </p>
                  <div className="flex w-full flex-1 flex-col gap-3 tablet:flex-none">
                    {/* Origen → destino — label arriba de cada input */}
                    <div className="flex w-full items-stretch overflow-hidden rounded-[16px] bg-[#1D1D1D]">
                      <label className="flex flex-1 flex-col justify-center px-4 py-2.5">
                        <span className="font-inter text-[12px] font-normal text-white/50">Código postal origen</span>
                        <input value={cpDesde} onChange={(e) => setCpDesde(e.target.value.replace(/[^\d]/g, "").slice(0, 5))} inputMode="numeric" placeholder="Ej. 06600" aria-label="Código postal de origen" className="mt-0.5 w-full bg-transparent font-inter text-[16px] text-white outline-none placeholder:text-[#8A8A8A]" />
                      </label>
                      <span aria-hidden className="my-2.5 w-px shrink-0 bg-white/10" />
                      <label className="flex flex-1 flex-col justify-center px-4 py-2.5">
                        <span className="font-inter text-[12px] font-normal text-white/50">Código postal destino</span>
                        <input value={cpHasta} onChange={(e) => setCpHasta(e.target.value.replace(/[^\d]/g, "").slice(0, 5))} inputMode="numeric" placeholder="Ej. 44100" aria-label="Código postal de destino" className="mt-0.5 w-full bg-transparent font-inter text-[16px] text-white outline-none placeholder:text-[#8A8A8A]" />
                      </label>
                    </div>
                    {/* Selector de tamaño de paquete — horizontal con swipe en móvil */}
                    <div className="mt-3">
                      <p className="mb-2 px-1 font-inter text-[14px] font-medium text-white/85">¿Qué tamaño es tu paquete?</p>
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
                                sel ? "border-[rgba(255,255,255,0.35)] bg-[rgba(0,0,0,0.45)]" : "border-white/10 bg-[#1D1D1D] hover:border-white/25"
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
                      style={kbBtnStyle}
                      className={`mt-auto mb-6 flex h-[46px] items-center justify-center gap-1.5 rounded-[16px] font-inter text-[14px] font-semibold no-underline transition-colors tablet:mt-1 tablet:mb-0 tablet:w-1/2 tablet:self-center ${
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

        </div>

        {/* 4+5 · Clientes: en desktop título + dato rotativo a la izquierda,
            marquee de logos a la derecha en la misma línea. En móvil apilado. */}
        <div className="relative z-10 mt-6 w-full tablet:mt-8">
          <div className="mx-auto max-w-[var(--max-w)] px-3">
            {/* Título — arriba de toda la línea del marquee */}
            <p className="mb-4 hidden text-center font-inter text-[15px] font-light text-white/55 tablet:block">
              Las marcas que confían en nosotros
            </p>
            <div className="flex flex-col items-center gap-4 tablet:flex-row tablet:items-center tablet:gap-8">
              {/* Dato rotativo */}
              <span key={spIdx} className="shrink-0 font-inter text-[16px] font-medium text-white tablet:w-[220px] tablet:text-left tablet:text-[18px]" style={{ animation: "fadeSlideIn 0.5s ease-out" }} aria-live="polite">
                {SOCIAL_PROOF[spIdx]}
              </span>
              {/* Marquee de logos */}
              <div className="w-full min-w-0 flex-1 overflow-hidden">
                <LogoMarquee />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
