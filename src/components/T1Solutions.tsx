"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";

/* ── Top-level tabs ── */
// Ordered by the seller's journey priority: create store → get paid →
// expand channels → manage orders → ship → quality → physical POS.
const TABS = [
  "Crea tu tienda",
  "Cobra en línea",
  "Crea envíos",
  "Conecta marketplaces",
  "Gestiona pedidos",
  "Control de calidad",
  "Vende en persona",
];

/* ── Sub-tab type ── */
type SubTab = {
  label: string;
  description: string;
  image: string | null;
  floatingCards: "incidencia" | "metrics" | "sobrepesos" | null;
  panel?: "tienda-ia" | "producto-grid" | "pedidos" | "personaliza" | "sync-inventory" | "order-list" | "sobrepesos-cards" | "cotizador" | "carrito" | "rastreo" | "guias-masivas" | "enrutamiento-pagos" | "checkout" | "link-pago" | "disputas" | "metricas-contracargos" | "fraude" | "riesgo" | "buro" | "pos-cobro" | "pos-inventario" | "pos-control-caja" | null;
};

type TabCard = {
  title: string;
  description: string; // fallback
  cta: string;
  ctaHref: string;
  subTabs: SubTab[];
};

const TAB_CARDS: TabCard[] = [
  {
    title: "TIENDA EN LÍNEA",
    description:
      "Crea tu tienda con IA, personaliza tu diseño y empieza a vender en minutos. Gestiona tu catálogo de productos desde un solo lugar.",
    cta: "Crea tu tienda gratis",
    ctaHref: "/registro",
    subTabs: [
      { label: "Tienda con IA", description: "Describe tu negocio y nuestra IA creará tu tienda en menos de 1 minuto, lista para vender.", image: null, floatingCards: null, panel: "tienda-ia" },
      { label: "Catálogo de productos", description: "Gestiona productos, variantes, precios e inventario desde un solo lugar centralizado.", image: null, floatingCards: null, panel: "producto-grid" },
      { label: "Personaliza diseño", description: "Personaliza colores, tipografías, banners y secciones de tu tienda sin necesidad de código.", image: null, floatingCards: null, panel: "personaliza" },
    ],
  },
  {
    title: "PAGOS EN LÍNEA",
    description:
      "Recibe pagos con tarjeta, transferencia y efectivo. Enrutamiento inteligente para la mayor tasa de aprobación del mercado.",
    cta: "Comenzar a cobrar",
    ctaHref: "/registro",
    subTabs: [
      { label: "Checkout integrado", description: "Un checkout rápido y sin fricción, optimizado para mayor conversión: menos carritos abandonados y más ventas cerradas.", image: null, floatingCards: null, panel: "checkout" },
      { label: "Links de pago", description: "Cobra compartiendo un enlace por WhatsApp, email o redes sociales.", image: null, floatingCards: null, panel: "link-pago" },
    ],
  },
  {
    title: "ENVÍOS",
    description:
      "Cotiza y crea envíos con más de 10 paqueterías desde un solo lugar. Genera guías masivas y rastrea en tiempo real.",
    cta: "Crear envío",
    ctaHref: "/registro",
    subTabs: [
      { label: "Cotizador", description: "Cotiza envíos con más de 10 paqueterías y elige la mejor opción para cada pedido.", image: null, floatingCards: null, panel: "cotizador" },
      { label: "Guías masivas", description: "Genera cientos de guías de envío en segundos con procesamiento por lotes.", image: null, floatingCards: null, panel: "guias-masivas" },
      { label: "Rastreo de guías", description: "Rastrea todas tus guías en tiempo real desde un solo dashboard.", image: null, floatingCards: null, panel: "rastreo" },
    ],
  },
  {
    title: "MARKETPLACES",
    description:
      "Conecta y gestiona Amazon, Mercado Libre, Walmart, SHEIN y más. Sincroniza inventario y pedidos automáticamente.",
    cta: "Conectar canales",
    ctaHref: "/registro",
    subTabs: [
      { label: "Conecta canales", description: "Conecta más de 8 canales de venta —Amazon, Mercado Libre, Walmart, SHEIN y más— en un solo click.", image: null, floatingCards: null, panel: "pedidos" },
      { label: "Sincroniza inventario", description: "Tu inventario se actualiza en tiempo real en todos tus canales de venta.", image: null, floatingCards: null, panel: "sync-inventory" },
    ],
  },
  {
    title: "GESTIÓN DE PEDIDOS",
    description:
      "Administrador unificado para gestionar pedidos de todos tus canales de venta. Visualiza, filtra y procesa pedidos en tiempo real.",
    cta: "Comenzar ahora",
    ctaHref: "/registro",
    subTabs: [
      { label: "Administrador de pedidos", description: "Visualiza, filtra y gestiona pedidos de todos tus canales en el administrador.", image: null, floatingCards: null, panel: "order-list" },
      { label: "Carrito abandonado", description: "Recupera ventas perdidas con seguimiento automático de carritos abandonados.", image: null, floatingCards: null, panel: "carrito" },
    ],
  },
  {
    title: "CONTROL DE CALIDAD",
    description:
      "Ofrece el mejor servicio a tus clientes, crea y gestiona todas las incidencias de tus envíos desde nuestro administrador. Monitorea tu porcentaje de incidencias y el desempeño por paquetería.",
    cta: "Conocer más",
    ctaHref: "/registro",
    subTabs: [
      { label: "Crea incidencias", description: "Crea y gestiona incidencias de tus envíos directamente desde el administrador.", image: "/img/incidencias.png", floatingCards: "incidencia" },
      { label: "Gestiona sobrepesos", description: "Detecta y gestiona sobrepesos para evitar cargos adicionales.", image: null, floatingCards: "sobrepesos", panel: "sobrepesos-cards" },
    ],
  },
  {
    title: "VENDE EN TU TIENDA FÍSICA",
    description:
      "Vende en tu tienda física con un POS integrado a tu inventario, pagos y envíos. Sincroniza todo en tiempo real.",
    cta: "Empezar a vender",
    ctaHref: "/registro",
    subTabs: [
      { label: "Cobra en sucursal", description: "Registra tus ventas en sucursal y configura tus métodos de pago; los cobros con tarjeta se procesan con tu propia terminal.", image: null, floatingCards: null, panel: "pos-cobro" },
      { label: "Control de inventario", description: "Lleva el control de tu inventario en tiempo real desde el punto de venta.", image: null, floatingCards: null, panel: "pos-inventario" },
      { label: "Control de caja", description: "Cierra turno con el detalle de cobros, devoluciones y efectivo en caja.", image: null, floatingCards: null, panel: "pos-control-caja" },
    ],
  },
  // T1Score hidden — DO NOT REMOVE (used for future launch)
  // The T1 Score tab entry, its TAB_CARDS data, and the panel renders for
  // `fraude`, `riesgo`, `buro` (both desktop and mobile) are kept intentionally.
];

const font = "var(--font-manrope-var), sans-serif";

/* ── Floating cards ── */
function FloatingCards({ type }: { type: string | null }) {
  if (type === "incidencia") {
    return (
      <div
        className="absolute rounded-[20px] bg-white"
        style={{
          right: 70, top: 110, width: 280, zIndex: 10,
          boxShadow: "0 0 25px 0 rgba(0,0,0,0.06)",
          fontFamily: font, padding: "20px 26px",
          animation: "none",
        }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
          <span className="text-[12px] font-bold text-[#4c4c4c]">INC-00103</span>
          <span className="rounded-full bg-[rgba(254,77,97,0.1)] px-2.5 py-1 text-[11px] font-bold text-[#fe4d61]">Requiere acción</span>
        </div>
        <p className="text-[12px] font-bold text-[#4c4c4c]" style={{ marginBottom: 12 }}>Dirección incompleta</p>
        <div className="flex items-center gap-2.5" style={{ marginBottom: 12 }}>
          <Image src="/img/dhl-iso.svg" alt="DHL" width={40} height={25} className="object-contain" />
          <span className="text-[12px] font-bold text-[#4c4c4c]">77452320977452</span>
        </div>
        <p className="text-[12px] font-medium text-[#4c4c4c]" style={{ marginBottom: 8 }}>Creado 22/02/25  |  10:18 am</p>
        <p className="text-[12px] font-medium text-[#4c4c4c]" style={{ marginBottom: 4 }}>Tiempo de respuesta:</p>
        <p className="text-[12px] font-bold text-[#828282]" style={{ marginBottom: 16 }}>2 días hábiles</p>
        <button className="w-full rounded-[10px] bg-[#db3b2b] py-2 font-inter text-[12px] font-bold text-white">Acciones</button>
        <p className="mt-2 text-center text-[12px] font-bold text-[#4c4c4c]">Ver detalle</p>
      </div>
    );
  }

  if (type === "metrics") {
    return (
      <>
        <div className="absolute rounded-[16px] bg-white" style={{ right: 360, top: 70, width: 220, boxShadow: "0 0 25px 0 rgba(0,0,0,0.06)", fontFamily: font, padding: "16px 22px", zIndex: 10, animation: "none" }}>
          <p className="text-[14px] font-bold text-[#4c4c4c]">Tasa de incidencias</p>
          <p className="text-[34px] font-bold text-[#4c4c4c]" style={{ lineHeight: 1.1, marginTop: 4 }}>1.02%</p>
          <p className="text-[11px] font-normal text-[#828282]">148 / 3,452 envíos</p>
        </div>
        <div className="absolute rounded-[16px] bg-white" style={{ right: 60, top: 290, width: 230, boxShadow: "0 0 25px 0 rgba(0,0,0,0.06)", fontFamily: font, padding: "14px 16px 14px 18px", zIndex: 10, animation: "none" }}>
          <p className="text-[14px] font-bold text-[#4c4c4c]" style={{ marginBottom: 14 }}>Desempeño por paquetería</p>
          <div className="flex flex-col gap-[10px]">
            {[
              { logo: "/img/dhl-iso.svg", pct: "1.00%", detail: "2 / 400  envíos" },
              { logo: "/img/ups-iso.svg", pct: "0.80%", detail: "4 / 500  envíos" },
              { logo: "/img/99min-iso.svg", pct: "0.50%", detail: "35 / 500  envíos" },
            ].map((row) => (
              <div key={row.pct} className="flex items-center gap-2">
                <div className="flex h-[22px] w-[34px] shrink-0 items-center justify-center">
                  <Image src={row.logo} alt="" width={34} height={22} className="object-contain" />
                </div>
                <span className="w-[50px] text-right text-[14px] font-bold text-[#4c4c4c]">{row.pct}</span>
                <span className="text-[11px] font-medium text-[#828282]">{row.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  /* sobrepesos cards are now inline in the panel — no floating cards needed */
  if (type === "sobrepesos") {
    return null;
  }

  return null;
}

/* ── Main component ── */
export default function T1Solutions() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const mobileSubTabsRef = useRef<HTMLDivElement>(null);
  const mainTabsRef = useRef<HTMLDivElement>(null);
  const desktopSubTabsRef = useRef<HTMLDivElement>(null);

  const card = TAB_CARDS[activeTab];
  const currentSub = card.subTabs[activeSubTab];

  const handleTabChange = useCallback((i: number) => {
    setActiveTab(i);
    setActiveSubTab(0);
    // Manual horizontal scroll on ONLY the chip's overflow container.
    // (scrollIntoView walks up parents and can horizontally shift the page on some browsers
    //  even with overflow-x: clip, which causes the whole section to appear "shifted left".)
    const chipsRow = mainTabsRef.current;
    const overflowContainer = chipsRow?.parentElement;
    if (chipsRow && overflowContainer) {
      const button = chipsRow.children[i] as HTMLElement | undefined;
      if (button) {
        const target = button.offsetLeft + button.offsetWidth / 2 - overflowContainer.clientWidth / 2;
        overflowContainer.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
      }
    }
  }, []);

  const handleSubTabChange = useCallback((i: number) => {
    setActiveSubTab(i);
    // Scroll mobile sub-tab into view
    const container = mobileSubTabsRef.current;
    if (container) {
      const buttons = Array.from(container.children) as HTMLElement[];
      if (buttons[i]) {
        buttons[i].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, []);

  return (
    <section className="overflow-x-hidden bg-[#0e0d0d]" style={{ paddingTop: 60, paddingBottom: 100 }}>
      <div className="mx-auto max-w-[var(--max-w)] px-5 tablet:px-6">
        {/* Heading */}
        <h2
          className="font-sora text-[28px] font-light text-white tablet:text-[36px] lg:text-[44px]"
          style={{ letterSpacing: "-1.32px", textAlign: "center", marginBottom: 28 }}
        >
          Un ecosistema para todo tu negocio
        </h2>

        {/* ── Level 1 chips OUTSIDE the card — single line.
            Outer wrapper handles overflow scroll; inner uses w-max + mx-auto so
            chips center when they fit and scroll left when they overflow. */}
        <div
          className="overflow-x-auto"
          style={{ marginBottom: 24, paddingLeft: 4, paddingRight: 4, scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          <div
            ref={mainTabsRef}
            className="mx-auto flex w-max items-center"
            style={{ gap: 8 }}
          >
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => handleTabChange(i)}
                className={`shrink-0 cursor-pointer whitespace-nowrap rounded-[12px] border font-inter transition-all duration-200 ${
                  activeTab === i ? "font-semibold text-[#0e0d0d]" : "font-medium text-white/65 hover:text-white"
                }`}
                style={{
                  padding: "9px 16px",
                  fontSize: 13.5,
                  background: activeTab === i ? "#ffffff" : "rgba(52,52,52,0.55)",
                  borderColor: activeTab === i ? "#ffffff" : "rgba(255,255,255,0.10)",
                  boxShadow: activeTab === i ? "0 4px 16px rgba(0,0,0,0.45)" : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Single card — responsive
            Carousel: card + peek edges wrapped in one animated container so they
            slide together when activeTab changes (no misalignment during transition).
            Width 1040 = the shared "inset card" size (matches T1Score): full-width
            sections span the --max-w frame, single rounded panels sit inset at 1040
            so the page reads with 2 deliberate container sizes, not random margins. */}
        <div className="relative mx-auto" style={{ maxWidth: 1040 }}>
          <div
            key={`carousel-${activeTab}`}
            className="relative"
            style={{ animation: `fadeSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)` }}
          >

          <div
            className="solutions-card-wrapper group/card relative overflow-hidden rounded-[16px] bg-[#1A1A1D] tablet:rounded-[20px]"
            style={{
              width: "100%",
              minHeight: 360,
              zIndex: 1,
            }}
          >
            {/* Inner < > arrows (desktop) — navigate level-2 sub-tabs within the active card.
                Hidden until the user hovers the card. */}
            <button
              type="button"
              onClick={() => handleSubTabChange((activeSubTab - 1 + card.subTabs.length) % card.subTabs.length)}
              aria-label="Herramienta anterior"
              className="absolute left-3 z-[3] hidden h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 opacity-0 transition-all duration-200 hover:border-white/35 hover:text-white group-hover/card:opacity-100 tablet:flex"
              style={{ top: "calc(50% + 25px)", transform: "translateY(-50%)" }}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              type="button"
              onClick={() => handleSubTabChange((activeSubTab + 1) % card.subTabs.length)}
              aria-label="Siguiente herramienta"
              className="absolute right-3 z-[3] hidden h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 opacity-0 transition-all duration-200 hover:border-white/35 hover:text-white group-hover/card:opacity-100 tablet:flex"
              style={{ top: "calc(50% + 25px)", transform: "translateY(-50%)" }}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            {/* ── Level 2 — Sub-tabs strip at top of card (desktop only) ──
                Evenly distributed, uppercase, with shared horizontal rule below */}
            <div className="relative hidden bg-[#1A1A1D] tablet:block">
              <div
                ref={desktopSubTabsRef}
                className="mx-auto flex items-stretch"
                style={{ maxWidth: 940 }}
              >
                {card.subTabs.map((st, i) => {
                  const isActive = activeSubTab === i;
                  return (
                    <button
                      key={st.label}
                      onClick={() => handleSubTabChange(i)}
                      className="relative flex-1 cursor-pointer border-none bg-transparent font-inter uppercase transition-all duration-200 hover:bg-white/[0.04]"
                      style={{
                        padding: "20px 12px",
                        fontSize: 13,
                        letterSpacing: "0.06em",
                        color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.45)",
                        fontWeight: isActive ? 700 : 500,
                      }}
                    >
                      {st.label}
                      {/* Active underline (sits on top of the shared line) */}
                      <span
                        aria-hidden
                        style={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          bottom: 0,
                          height: 2,
                          background: isActive ? "#FFFFFF" : "transparent",
                          transition: "background 0.2s ease",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
              {/* Shared horizontal rule below all tabs */}
              <div className="mx-auto" style={{ maxWidth: 940, height: 1, background: "rgba(255,255,255,0.12)" }} />
            </div>
            {/* Left panel bg — removed (was rgba(248,248,248,0.41)) per design */}

            {/* Mobile: fixed height so card doesn't jump between tabs */}
            <div className="flex flex-col tablet:hidden" style={{ padding: "0 0 16px 0", minHeight: 520 }}>
              {/* Sub-tabs (mobile) — single active label centered, with plain prev/next arrows */}
              <div ref={mobileSubTabsRef} className="flex items-center justify-between border-b border-white/10 px-4" style={{ paddingTop: 14, paddingBottom: 14, marginBottom: 18 }}>
                <button
                  type="button"
                  onClick={() => handleSubTabChange((activeSubTab - 1 + card.subTabs.length) % card.subTabs.length)}
                  aria-label="Herramienta anterior"
                  className="flex shrink-0 cursor-pointer items-center justify-center bg-transparent border-none p-1 text-white/55 transition-colors duration-150 hover:text-white"
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <p
                  key={`mobile-subtab-${activeSubTab}`}
                  className="font-inter font-bold uppercase text-white"
                  style={{ fontSize: 13, letterSpacing: "0.06em", animation: "none" }}
                >
                  {currentSub.label}
                </p>
                <button
                  type="button"
                  onClick={() => handleSubTabChange((activeSubTab + 1) % card.subTabs.length)}
                  aria-label="Siguiente herramienta"
                  className="flex shrink-0 cursor-pointer items-center justify-center bg-transparent border-none p-1 text-white/55 transition-colors duration-150 hover:text-white"
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>

              <p
                key={`desc-m-${activeTab}-${activeSubTab}`}
                className="font-inter text-[14px] font-light text-white/60 px-4"
                style={{ lineHeight: 1.5, animation: "none", marginBottom: 12 }}
              >
                {currentSub.description}
              </p>
              <a
                href={card.ctaHref}
                className="mx-4 mb-5 inline-flex items-center gap-1.5 font-inter text-[14px] font-semibold text-white no-underline"
              >
                {card.cta}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              {/* Image or panel on mobile */}
              {currentSub.image && currentSub.floatingCards === "incidencia" ? (
                <div key={`img-m-${activeTab}-${activeSubTab}`} className="relative px-4" style={{ height: 280, animation: "none" }}>
                  <div className="relative overflow-hidden rounded-[12px]" style={{ width: "60%", height: 260 }}>
                    <Image src={currentSub.image} alt="" fill className="object-cover" />
                  </div>
                  {/* Floating incidencia card — overlapping image slightly */}
                  <div className="absolute rounded-[14px] bg-white" style={{ right: 16, top: 50, width: "55%", padding: "14px 16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontFamily: font }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                      <span className="text-[10px] font-bold text-[#4c4c4c]">INC-00103</span>
                      <span className="rounded-full bg-[rgba(254,77,97,0.1)] px-2 py-0.5 text-[8px] font-bold text-[#fe4d61]">Requiere acción</span>
                    </div>
                    <p className="text-[10px] font-bold text-[#4c4c4c]" style={{ marginBottom: 6 }}>Dirección incompleta</p>
                    <div className="flex items-center gap-2" style={{ marginBottom: 6 }}>
                      <Image src="/img/dhl-iso.svg" alt="" width={28} height={16} className="object-contain" />
                      <span className="text-[9px] font-bold text-[#4c4c4c]">77452320977452</span>
                    </div>
                    <p className="text-[9px] text-[#828282]">Tiempo de respuesta: 2 días hábiles</p>
                    <button className="mt-2 w-full rounded-[8px] bg-[#db3b2b] py-1.5 text-[10px] font-bold text-white">Acciones</button>
                  </div>
                </div>
              ) : currentSub.image && currentSub.floatingCards === "metrics" ? (
                <div key={`img-m-${activeTab}-${activeSubTab}`} className="relative px-4" style={{ height: 280, animation: "none" }}>
                  {/* Centered image */}
                  <div className="relative mx-auto overflow-hidden rounded-[12px]" style={{ width: "55%", height: 240, marginTop: 20 }}>
                    <Image src={currentSub.image} alt="" fill className="object-cover" />
                  </div>
                  {/* Floating: tasa top-left */}
                  <div className="absolute rounded-[10px] bg-white" style={{ left: 16, top: 0, width: "42%", padding: "10px 12px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", fontFamily: font }}>
                    <p className="text-[10px] font-bold text-[#4c4c4c]">Tasa de incidencias</p>
                    <p className="text-[24px] font-bold text-[#4c4c4c]" style={{ lineHeight: 1.1 }}>1.02%</p>
                    <p className="text-[8px] text-[#828282]">148 / 3,452 envíos</p>
                  </div>
                  {/* Floating: desempeño bottom-right */}
                  <div className="absolute rounded-[10px] bg-white" style={{ right: 16, bottom: 0, width: "52%", padding: "10px 12px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", fontFamily: font }}>
                    <p className="text-[10px] font-bold text-[#4c4c4c]" style={{ marginBottom: 6 }}>Desempeño por paquetería</p>
                    {[
                      { logo: "/img/dhl-iso.svg", pct: "1.00%", detail: "2/400" },
                      { logo: "/img/99min-iso.svg", pct: "0.50%", detail: "35/500" },
                    ].map((r) => (
                      <div key={r.pct} className="flex items-center gap-1.5" style={{ marginBottom: 4 }}>
                        <Image src={r.logo} alt="" width={24} height={14} className="object-contain" />
                        <span className="text-[10px] font-bold text-[#4c4c4c]">{r.pct}</span>
                        <span className="text-[8px] text-[#828282]">{r.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : currentSub.image && currentSub.floatingCards === "sobrepesos" ? (
                <div key={`img-m-${activeTab}-${activeSubTab}`} className="relative px-4" style={{ animation: "none" }}>
                  <div className="flex gap-2" style={{ marginBottom: 8 }}>
                    <div className="flex-1 rounded-[8px] bg-white" style={{ padding: "10px 12px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)", fontFamily: font }}>
                      <p className="text-[9px] font-bold text-[#4c4c4c]">Tasa de sobrepesos</p>
                      <div className="flex items-center gap-1">
                        <span className="text-[20px] font-bold text-[#4c4c4c]">18.8%</span>
                        <span className="rounded-full bg-[rgba(254,77,97,0.1)] px-1.5 py-0.5 text-[7px] font-bold text-[#fe4d61]">+2.1%</span>
                      </div>
                      <p className="text-[7px] text-[#828282]">19 / 228 guías</p>
                    </div>
                    <div className="flex-1 rounded-[8px] bg-white" style={{ padding: "10px 12px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)", fontFamily: font }}>
                      <p className="text-[9px] font-bold text-[#4c4c4c]">Cargo por sobrepesos</p>
                      <div className="flex items-center gap-1">
                        <span className="text-[18px] font-bold text-[#4c4c4c]">$1,686.80</span>
                        <span className="rounded-full bg-[rgba(81,175,112,0.1)] px-1.5 py-0.5 text-[7px] font-bold text-[#4fc153]">+15%</span>
                      </div>
                      <p className="text-[7px] text-[#828282]">19 guías</p>
                    </div>
                  </div>
                  <div className="rounded-[8px] bg-white" style={{ padding: "10px 12px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)", fontFamily: font }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                      <span className="text-[8px] text-[#828282]">Hoy | 2:24 hrs</span>
                      <span className="rounded-full bg-[rgba(81,175,112,0.1)] px-1.5 py-0.5 text-[7px] font-bold text-[#4fc153]">Cobrado hoy</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ marginBottom: 6 }}>
                      <Image src="/img/icons/fedex-logo.svg" alt="" width={28} height={16} className="object-contain" />
                      <div>
                        <p className="text-[10px] font-bold text-[#4c4c4c]">43567890082</p>
                        <p className="text-[8px] text-[#828282]">FedEx</p>
                      </div>
                    </div>
                    <div className="flex justify-between border-t border-black/[0.04] pt-2">
                      <div>
                        <p className="text-[7px] text-[#828282]">Sobrepeso (kg):</p>
                        <p className="text-[11px] font-bold text-[#4c4c4c]">+5.7</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[7px] text-[#828282]">Cargo adicional:</p>
                        <p className="text-[11px] font-bold text-[#4c4c4c]">$87.45 MXN</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : currentSub.panel === "sobrepesos-cards" ? (
                <div key={`panel-m-${activeSubTab}`} className="px-4" style={{ animation: "none", fontFamily: font }}>
                  <div className="flex gap-2" style={{ marginBottom: 8 }}>
                    <div className="flex-1 rounded-[8px] bg-white" style={{ padding: "10px 12px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                      <p className="text-[9px] font-bold text-[#4c4c4c]">Tasa de sobrepesos</p>
                      <div className="flex items-center gap-1">
                        <span className="text-[20px] font-bold text-[#4c4c4c]">18.8%</span>
                        <span className="rounded-full bg-[rgba(254,77,97,0.1)] px-1.5 py-0.5 text-[7px] font-bold text-[#fe4d61]">+2.1%</span>
                      </div>
                      <p className="text-[7px] text-[#828282]">19 / 228 guías</p>
                    </div>
                    <div className="flex-1 rounded-[8px] bg-white" style={{ padding: "10px 12px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                      <p className="text-[9px] font-bold text-[#4c4c4c]">Cargo por sobrepesos</p>
                      <div className="flex items-center gap-1">
                        <span className="text-[18px] font-bold text-[#4c4c4c]">$1,686.80</span>
                        <span className="rounded-full bg-[rgba(81,175,112,0.1)] px-1.5 py-0.5 text-[7px] font-bold text-[#4fc153]">+15%</span>
                      </div>
                      <p className="text-[7px] text-[#828282]">19 guías</p>
                    </div>
                  </div>
                  <div className="rounded-[8px] bg-white" style={{ padding: "10px 12px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                      <span className="text-[8px] text-[#828282]">Hoy | 2:24 hrs</span>
                      <span className="rounded-full bg-[rgba(81,175,112,0.1)] px-1.5 py-0.5 text-[7px] font-bold text-[#4fc153]">Cobrado hoy</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ marginBottom: 6 }}>
                      <Image src="/img/icons/fedex-logo.svg" alt="" width={28} height={16} className="object-contain" />
                      <div>
                        <p className="text-[10px] font-bold text-[#4c4c4c]">43567890082</p>
                        <p className="text-[8px] text-[#828282]">FedEx</p>
                      </div>
                    </div>
                    <div className="flex justify-between border-t border-black/[0.04] pt-2">
                      <div>
                        <p className="text-[7px] text-[#828282]">Sobrepeso (kg):</p>
                        <p className="text-[11px] font-bold text-[#4c4c4c]">+5.7</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[7px] text-[#828282]">Cargo adicional:</p>
                        <p className="text-[11px] font-bold text-[#4c4c4c]">$87.45 MXN</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : /* T1Score hidden — DO NOT REMOVE (used for future launch). Mobile panels for fraude / riesgo / buro stay below. */
              currentSub.panel === "fraude" ? (
                <div key={`panel-m-${activeSubTab}`} className="relative flex justify-center px-4" style={{ height: 280, animation: "none" }}>
                  <svg width="180" height="180" viewBox="0 0 110 110" fill="none" style={{ marginTop: 30 }}>
                    <circle cx="55" cy="55" r="48" stroke="rgba(0,0,0,0.04)" strokeWidth="6" />
                    <circle cx="55" cy="55" r="48" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" strokeDasharray="280 302" transform="rotate(-90 55 55)" />
                    <circle cx="55" cy="55" r="36" stroke="rgba(0,0,0,0.03)" strokeWidth="5" />
                    <circle cx="55" cy="55" r="36" stroke="#E26153" strokeWidth="5" strokeLinecap="round" strokeDasharray="40 226" transform="rotate(-90 55 55)" />
                    <text x="55" y="55" textAnchor="middle" style={{ fontSize: 14, fontWeight: 700, fill: "rgba(0,0,0,0.8)" }}>96%</text>
                    <text x="55" y="68" textAnchor="middle" style={{ fontSize: 6, fontWeight: 500, fill: "rgba(0,0,0,0.4)" }}>aprobadas</text>
                  </svg>
                  {/* Floating: Pago aprobado */}
                  <div className="absolute flex items-center gap-1.5 rounded-[10px] bg-white" style={{ left: 12, top: 20, padding: "8px 10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                    <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#22C55E]">
                      <svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span className="text-[10px] font-bold text-[#4c4c4c]">Pago aprobado</span>
                  </div>
                  {/* Floating: Fraude */}
                  <div className="absolute flex items-center gap-1.5 rounded-[10px] bg-white" style={{ right: 12, bottom: 20, padding: "8px 10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                    <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#fe4d61]">
                      <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M3 3L13 13M13 3L3 13" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
                    </div>
                    <span className="text-[10px] font-bold text-[#4c4c4c]">Bloqueada</span>
                  </div>
                </div>
              ) : currentSub.panel === "riesgo" ? (
                <div key={`panel-m-${activeSubTab}`} className="relative flex justify-center px-4" style={{ height: 280, animation: "none" }}>
                  <svg width="160" height="160" viewBox="0 0 110 110" fill="none" style={{ marginTop: 40 }}>
                    <circle cx="55" cy="55" r="48" stroke="rgba(0,0,0,0.04)" strokeWidth="6" />
                    <circle cx="55" cy="55" r="48" stroke="#E26153" strokeWidth="6" strokeLinecap="round" strokeDasharray="260 302" transform="rotate(-90 55 55)" />
                    <circle cx="55" cy="55" r="36" stroke="rgba(0,0,0,0.03)" strokeWidth="5" />
                    <circle cx="55" cy="55" r="36" stroke="#8B5CF6" strokeWidth="5" strokeLinecap="round" strokeDasharray="150 226" transform="rotate(-90 55 55)" />
                    <text x="55" y="58" textAnchor="middle" style={{ fontSize: 18, fontWeight: 700, fill: "rgba(0,0,0,0.7)" }}>78</text>
                    <text x="55" y="68" textAnchor="middle" style={{ fontSize: 5, fontWeight: 500, fill: "rgba(0,0,0,0.4)" }}>SCORE</text>
                  </svg>
                  {/* Floating: Pago aprobado */}
                  <div className="absolute flex items-center gap-1.5 rounded-[10px] bg-white" style={{ left: 12, top: 20, padding: "8px 10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                    <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#22C55E]">
                      <svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span className="text-[10px] font-bold text-[#4c4c4c]">Aprobado</span>
                  </div>
                  {/* Floating: Rechazado */}
                  <div className="absolute flex items-center gap-1.5 rounded-[10px] bg-white" style={{ right: 12, top: 30, padding: "8px 10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                    <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#fe4d61]">
                      <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M3 3L13 13M13 3L3 13" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
                    </div>
                    <span className="text-[10px] font-bold text-[#4c4c4c]">Rechazado</span>
                  </div>
                  {/* Floating: Riesgo medio */}
                  <div className="absolute rounded-[10px] bg-white" style={{ left: 16, bottom: 16, padding: "8px 10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                    <p className="text-[8px] text-[#828282]">Riesgo</p>
                    <p className="text-[12px] font-bold text-[#4c4c4c]">Medio</p>
                  </div>
                </div>
              ) : currentSub.panel === "buro" ? (
                <div key={`panel-m-${activeSubTab}`} className="px-4" style={{ animation: "none", fontFamily: font }}>
                  <div className="overflow-hidden rounded-[12px] border border-black/[0.06] bg-white" style={{ padding: "14px 16px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                      <div>
                        <p className="text-[8px] text-[#828282]">Reporte crediticio</p>
                        <p className="text-[12px] font-bold text-[#4c4c4c]">Juan Pérez García</p>
                      </div>
                      <span className="rounded-full bg-[rgba(34,197,94,0.1)] px-2 py-0.5 text-[8px] font-bold text-[#22C55E]">Aprobado</span>
                    </div>
                    <div className="flex items-center gap-3" style={{ marginBottom: 10 }}>
                      <svg width="70" height="70" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="40" stroke="rgba(0,0,0,0.06)" strokeWidth="8" />
                        <circle cx="50" cy="50" r="40" stroke="#22C55E" strokeWidth="8" strokeLinecap="round" strokeDasharray="210 251" transform="rotate(-90 50 50)" />
                        <text x="50" y="48" textAnchor="middle" style={{ fontSize: 14, fontWeight: 700, fill: "#4c4c4c" }}>742</text>
                        <text x="50" y="62" textAnchor="middle" style={{ fontSize: 6, fontWeight: 500, fill: "#828282" }}>de 850</text>
                      </svg>
                      <div>
                        <p className="text-[9px] text-[#828282]">Score crediticio</p>
                        <p className="text-[14px] font-bold text-[#22C55E]">Excelente</p>
                        <p className="text-[8px] text-[#828282]">Riesgo bajo</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-[#4c4c4c]" style={{ marginBottom: 6 }}>Factores</p>
                      {[
                        { label: "Historial de pagos", v: "Excelente", pct: 95, color: "#22C55E" },
                        { label: "Utilización", v: "32%", pct: 68, color: "#22C55E" },
                        { label: "Antigüedad", v: "8 años", pct: 80, color: "#8B5CF6" },
                      ].map((r) => (
                        <div key={r.label} style={{ marginBottom: 6 }}>
                          <div className="flex justify-between" style={{ marginBottom: 2 }}>
                            <span className="text-[9px] text-[#4c4c4c]">{r.label}</span>
                            <span className="text-[9px] font-bold text-[#4c4c4c]">{r.v}</span>
                          </div>
                          <div className="h-[3px] w-full overflow-hidden rounded-full bg-black/[0.04]">
                            <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: r.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : currentSub.panel === "pos-cobro" ? (
                <div key={`panel-m-${activeSubTab}`} className="relative flex justify-center px-6 py-4" style={{ animation: "none" }}>
                  <div className="relative overflow-hidden rounded-[14px]" style={{ width: "62%", maxWidth: 220, aspectRatio: "3 / 4", boxShadow: "0 6px 18px rgba(0,0,0,0.14)" }}>
                    <Image src="/img/pos-carrito.webp" alt="Carrito de cobro POS" fill className="object-cover" sizes="220px" />
                  </div>
                  <div className="absolute overflow-hidden rounded-[12px]" style={{ right: "12%", bottom: "12%", width: "42%", maxWidth: 150, aspectRatio: "3 / 4", boxShadow: "0 8px 20px rgba(0,0,0,0.18)" }}>
                    <Image src="/img/pos-cobra.png" alt="Cobro POS" fill className="object-cover" sizes="150px" />
                  </div>
                </div>
              ) : currentSub.panel === "pos-inventario" ? (
                <div key={`panel-m-${activeSubTab}`} className="px-4" style={{ animation: "none", fontFamily: font }}>
                  <div className="rounded-[12px] border border-black/[0.06] bg-white" style={{ padding: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                    <p className="text-[12px] font-bold text-[#4c4c4c]" style={{ marginBottom: 8 }}>Inventario en tiempo real</p>
                    {[
                      { name: "Tenis blancos", sku: "TBC-042", stock: 24 },
                      { name: "Playera básica", sku: "PB-101", stock: 87 },
                      { name: "Sudadera", sku: "SH-220", stock: 12 },
                    ].map((r, i) => (
                      <div key={r.name} className={`flex items-center justify-between py-2 ${i < 2 ? "border-b border-black/[0.04]" : ""}`}>
                        <div>
                          <p className="text-[11px] font-medium text-[#4c4c4c]">{r.name}</p>
                          <p className="text-[9px] text-[#828282]">{r.sku}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] text-[#828282]">Disponibles</p>
                          <p className="text-[12px] font-bold text-[#4c4c4c]">{r.stock}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : currentSub.panel === "pos-control-caja" ? (
                <div key={`panel-m-${activeSubTab}`} className="relative flex justify-center px-6 py-4" style={{ animation: "none", fontFamily: font }}>
                  <div className="relative overflow-hidden rounded-[14px]" style={{ width: "66%", maxWidth: 230, aspectRatio: "3 / 4", boxShadow: "0 8px 20px rgba(0,0,0,0.14)" }}>
                    <Image src="/img/pos-control-caja.svg" alt="Control de caja POS" fill className="object-cover" sizes="230px" />
                  </div>
                  {/* Floating: efectivo ingresado */}
                  <div className="absolute flex items-center gap-2 rounded-[10px] border border-black/[0.06] bg-white" style={{ left: "6%", top: "8%", padding: "8px 10px", boxShadow: "0 6px 18px rgba(0,0,0,0.10)" }}>
                    <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[rgba(34,197,94,0.14)]">
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M8 13V3M8 3L4 7M8 3L12 7" stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div>
                      <p className="text-[8px] text-[#828282]">Efectivo ingresado</p>
                      <p className="text-[11px] font-bold text-[#4c4c4c]">+$8,420.00</p>
                    </div>
                  </div>
                  {/* Floating: efectivo retirado */}
                  <div className="absolute flex items-center gap-2 rounded-[10px] border border-black/[0.06] bg-white" style={{ right: "6%", bottom: "10%", padding: "8px 10px", boxShadow: "0 6px 18px rgba(0,0,0,0.10)" }}>
                    <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[rgba(219,59,43,0.12)]">
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M8 3V13M8 13L4 9M8 13L12 9" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div>
                      <p className="text-[8px] text-[#828282]">Efectivo retirado</p>
                      <p className="text-[11px] font-bold text-[#4c4c4c]">−$1,250.00</p>
                    </div>
                  </div>
                </div>
              ) : currentSub.image ? (
                <div
                  key={`img-m-${activeTab}-${activeSubTab}`}
                  className="relative w-full overflow-hidden"
                  style={{ height: 220, animation: "none" }}
                >
                  <Image src={currentSub.image} alt="" fill className="object-cover" sizes="100vw" />
                </div>
              ) : currentSub.panel === "tienda-ia" ? (
                <div key={`panel-m-${activeSubTab}`} className="relative flex justify-center overflow-hidden" style={{ height: 340, animation: "none" }}>
                  <div className="relative overflow-hidden rounded-[10px] border border-black/[0.06]" style={{ width: "75%", height: "100%" }}>
                    <Image src="/img/muebles-responsive.png" alt="" fill className="object-cover object-top" />
                  </div>
                  {/* Floating AI prompt */}
                  <div className="absolute rounded-[10px] border border-black/[0.06] bg-white" style={{ left: 8, top: 20, padding: "10px 12px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", width: 180 }}>
                    <p className="text-[9px] text-black/50 leading-relaxed">Quiero vender muebles...</p>
                    <div className="mt-1.5 flex items-center justify-end">
                      <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#E26153]">
                        <svg width="7" height="7" viewBox="0 0 10 10" fill="none"><path d="M5 8V2M5 2L2.5 4.5M5 2L7.5 4.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              ) : currentSub.panel === "producto-grid" ? (
                <div key={`panel-m-${activeSubTab}`} className="relative flex justify-center" style={{ animation: "none" }}>
                  <div className="relative overflow-hidden rounded-[10px]" style={{ width: 200, height: 320, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                    <Image src="/img/list-product.webp" alt="" fill className="object-cover object-top" />
                  </div>
                  {/* Floating product card — lower position */}
                  <div className="absolute rounded-[10px] border border-black/[0.06] bg-white" style={{ right: 16, bottom: 40, padding: "10px 12px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", width: 130 }}>
                    <div className="flex items-center justify-center" style={{ marginBottom: 4 }}>
                      <Image src="/img/tenis-transparente.png" alt="" width={40} height={30} className="object-contain" />
                    </div>
                    <p className="text-center text-[8px] text-black/60">Tenis blancos</p>
                    <p className="text-center text-[10px] font-bold text-black">$1,345.99</p>
                  </div>
                </div>
              ) : currentSub.panel === "pedidos" ? (
                <div key={`panel-m-${activeSubTab}`} className="relative flex items-center justify-center px-4" style={{ height: 250, animation: "none" }}>
                  {/* T1 center */}
                  <div className="flex h-[40px] w-[40px] items-center justify-center" style={{ zIndex: 5 }}>
                    <svg width="24" height="22" viewBox="0 0 45 44" fill="none">
                      <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457V19.1513V19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#D93A26" />
                      <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592H22.4335H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#D93A26" />
                    </svg>
                  </div>
                  {/* 6 marketplace logos — top row, middle row, bottom row */}
                  {[
                    { src: "/img/tiktok-isotipo.png", top: "2%", left: "20%" },
                    { src: "/img/meli-iso.svg", top: "2%", right: "20%" },
                    { src: "/img/amazon-iso.svg", top: "38%", left: "5%" },
                    { src: "/img/shein-iso.svg", top: "38%", right: "5%" },
                    { src: "/img/walmart.svg", bottom: "2%", left: "20%" },
                    { src: "/img/logos/sanborns.png", bottom: "2%", right: "20%" },
                  ].map((mp, i) => (
                    <div key={i} className="absolute flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-white" style={{ ...mp, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                      <Image src={mp.src} alt="" width={22} height={22} className="object-contain" />
                    </div>
                  ))}
                  <svg className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
                    <line x1="50%" y1="50%" x2="25%" y2="10%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="50%" y1="50%" x2="75%" y2="10%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="50%" y1="50%" x2="10%" y2="46%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="50%" y1="50%" x2="90%" y2="46%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="50%" y1="50%" x2="25%" y2="90%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="50%" y1="50%" x2="75%" y2="90%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                  </svg>
                </div>
              ) : currentSub.panel === "personaliza" ? (
                <div key={`panel-m-${activeSubTab}`} className="relative flex justify-center overflow-hidden" style={{ height: 340, animation: "none" }}>
                  <div className="relative overflow-hidden rounded-[10px] border border-black/[0.06]" style={{ width: "75%", height: "100%" }}>
                    <Image src="/img/muebles-responsive.png" alt="" fill className="object-cover object-top" />
                  </div>
                  {/* Floating color palette */}
                  <div className="absolute rounded-[8px] border border-black/[0.06] bg-white" style={{ right: 8, top: 16, padding: "8px 10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                    <p className="text-[7px] font-semibold text-black/40 uppercase" style={{ marginBottom: 4 }}>Colores</p>
                    <div className="flex gap-1.5">
                      {["#1a1a1a", "#c9a96e", "#f5f0eb", "#b08d57"].map((c) => (
                        <div key={c} className="h-[12px] w-[12px] rounded-[3px]" style={{ background: c }} />
                      ))}
                    </div>
                  </div>
                  {/* Floating banner card */}
                  <div className="absolute rounded-[8px] border border-black/[0.06] bg-white" style={{ left: 8, bottom: 16, padding: "6px 8px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                    <p className="text-[7px] font-semibold text-black/50">✨ Generar banner con IA</p>
                  </div>
                </div>
              ) : currentSub.panel === "sync-inventory" ? (
                <div key={`panel-m-${activeSubTab}`} className="relative flex flex-col items-center px-4" style={{ height: 350, animation: "none" }}>
                  {/* Product card — top */}
                  <div className="shrink-0 overflow-hidden rounded-[10px]" style={{ width: 100, padding: 10, background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)", zIndex: 2 }}>
                    <div className="mb-1 flex items-center justify-center">
                      <Image src="/img/tenis-transparente.png" alt="" width={44} height={34} className="object-contain" />
                    </div>
                    <p className="text-center text-[9px] font-bold text-black">$1,345.99</p>
                    <p className="text-center text-[7px] text-black/40">1,003 uds</p>
                  </div>
                  {/* T1 logo — centered */}
                  <div style={{ margin: "6px 0", zIndex: 2 }}>
                    <svg width="20" height="18" viewBox="0 0 45 44" fill="none">
                      <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457V19.1513V19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#D93A26" />
                      <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592H22.4335H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#D93A26" />
                    </svg>
                  </div>
                  {/* Spacer for lines */}
                  <div style={{ height: 130 }} />
                  {/* Marketplace logos — at very bottom */}
                  <div className="flex items-center justify-center gap-4" style={{ zIndex: 2 }}>
                    {["/img/meli-iso.svg", "/img/amazon-iso.svg", "/img/shein-iso.svg", "/img/walmart.svg"].map((src, i) => (
                      <div key={i} className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] bg-white" style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                        <Image src={src} alt="" width={20} height={20} className="object-contain" />
                      </div>
                    ))}
                  </div>
                  {/* Lines: product → T1 → vertical trunk → horizontal branch → ticks down to logos */}
                  <svg className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
                    <line x1="50%" y1="28%" x2="50%" y2="40%" stroke="rgba(0,0,0,0.08)" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="50%" y1="46%" x2="50%" y2="70%" stroke="rgba(0,0,0,0.08)" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="22%" y1="70%" x2="78%" y2="70%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="28%" y1="70%" x2="28%" y2="80%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="3 2" />
                    <line x1="42%" y1="70%" x2="42%" y2="80%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="3 2" />
                    <line x1="58%" y1="70%" x2="58%" y2="80%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="3 2" />
                    <line x1="72%" y1="70%" x2="72%" y2="80%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="3 2" />
                  </svg>
                </div>
              ) : currentSub.panel === "order-list" ? (
                <div key={`panel-m-${activeSubTab}`} className="relative mx-auto" style={{ width: 280, height: 280, animation: "none" }}>
                  {/* Background photo — left/behind */}
                  <div className="absolute overflow-hidden rounded-[10px]" style={{ left: 0, top: 10, width: 160, height: 240 }}>
                    <Image src="/img/pedidos-bg.png" alt="" fill className="object-cover" />
                  </div>
                  {/* Order panel — right, overlapping */}
                  <div className="absolute overflow-hidden rounded-[10px]" style={{ left: 90, top: 25, width: 190, height: 250, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                    <Image src="/img/list-order.svg" alt="" fill className="object-cover object-top" />
                  </div>
                </div>
              ) : currentSub.panel === "carrito" ? (
                <div key={`panel-m-${activeSubTab}`} className="flex justify-center" style={{ animation: "none" }}>
                  <div className="relative overflow-hidden rounded-[10px]" style={{ width: 220, height: 340, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                    <Image src="/img/carrito-movil.svg" alt="Carrito abandonado" fill className="object-cover object-top" />
                  </div>
                </div>
              ) : currentSub.panel === "rastreo" ? (
                <div key={`panel-m-${activeSubTab}`} className="flex justify-center px-4" style={{ animation: "none" }}>
                  <Image src="/img/rastrear.svg" alt="Rastreo" width={280} height={180} className="object-contain" />
                </div>
              ) : currentSub.panel === "guias-masivas" ? (
                <div key={`panel-m-${activeSubTab}`} className="px-4" style={{ animation: "none", fontFamily: font }}>
                  <div className="rounded-[12px] border border-black/[0.06] bg-white" style={{ padding: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                      <p className="text-[12px] font-bold text-[#4c4c4c]">Generando guías</p>
                      <span className="rounded-full bg-[rgba(34,197,94,0.12)] px-2 py-0.5 text-[8px] font-bold text-[#22C55E]">En proceso</span>
                    </div>
                    <div className="rounded-[8px] bg-[#FAFAF9]" style={{ padding: "10px 12px", marginBottom: 10 }}>
                      <div className="flex items-baseline justify-between" style={{ marginBottom: 6 }}>
                        <span className="text-[18px] font-bold text-[#4c4c4c]">247</span>
                        <span className="text-[9px] text-[#828282]">de 500 guías</span>
                      </div>
                      <div className="h-[5px] w-full overflow-hidden rounded-full bg-black/[0.05]">
                        <div className="h-full rounded-full" style={{ width: "49%", background: "#DB3B2B" }} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {[
                        { id: "T1-9472831", courier: "/img/dhl-iso.svg", status: "ok" },
                        { id: "T1-9472832", courier: "/img/icons/fedex-logo.svg", status: "ok" },
                        { id: "T1-9472833", courier: "/img/99min-iso.svg", status: "loading" },
                      ].map((row) => (
                        <div key={row.id} className="flex items-center gap-2 rounded-[6px] border border-black/[0.04] bg-white px-2 py-1.5">
                          <Image src={row.courier} alt="" width={22} height={14} className="object-contain" />
                          <span className="flex-1 font-mono text-[9px] text-[#4c4c4c]">{row.id}</span>
                          {row.status === "ok" ? (
                            <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#22C55E]">
                              <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                          ) : (
                            <span className="h-[8px] w-[8px] rounded-full bg-[#DB3B2B]" style={{ animation: "pulse-soft 1.2s ease-in-out infinite" }} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : currentSub.panel === "enrutamiento-pagos" ? (
                <div key={`panel-m-${activeSubTab}`} className="px-4" style={{ animation: "none", fontFamily: font }}>
                  <div className="rounded-[12px] border border-black/[0.06] bg-white" style={{ padding: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                    <p className="text-[12px] font-bold text-[#4c4c4c]" style={{ marginBottom: 10 }}>Enrutamiento por flujo</p>
                    <div className="flex flex-col gap-2">
                      {[
                        { name: "Flujo A", pct: "88%", dim: true },
                        { name: "Flujo B", pct: "96%", dim: false },
                        { name: "Flujo C", pct: "79%", dim: true },
                      ].map((p) => (
                        <div
                          key={p.name}
                          className={`flex items-center justify-between rounded-[8px] border bg-white px-3 py-2 ${p.dim ? "border-black/[0.06] opacity-50" : "border-[#DB3B2B]"}`}
                          style={p.dim ? {} : { boxShadow: "0 2px 8px rgba(219,59,43,0.12)" }}
                        >
                          <span className="text-[11px] font-semibold text-[#4c4c4c]">{p.name}</span>
                          <span className={`text-[11px] font-bold ${p.dim ? "text-black/40" : "text-[#DB3B2B]"}`}>{p.pct} aprobación</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-2 rounded-[8px] bg-[rgba(34,197,94,0.08)] px-2.5 py-2">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span className="text-[10px] font-semibold text-[#16A34A]">+24% de aprobación con enrutamiento</span>
                    </div>
                  </div>
                </div>
              ) : currentSub.panel === "checkout" ? (
                <div key={`panel-m-${activeSubTab}`} className="relative flex justify-center" style={{ animation: "none" }}>
                  <div className="relative overflow-hidden rounded-[10px]" style={{ width: 220, height: 320, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                    <Image src="/img/checkout-movil.svg" alt="Checkout" fill className="object-cover object-top" />
                  </div>
                  {/* Floating: Pedido completado */}
                  <div className="absolute flex items-center gap-1.5 rounded-[10px] bg-white" style={{ right: 16, top: 30, padding: "8px 12px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
                    <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#22C55E]">
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-semibold text-[#4c4c4c]">Pedido completado</span>
                  </div>
                </div>
              ) : currentSub.panel === "link-pago" ? (
                <div key={`panel-m-${activeSubTab}`} className="relative flex justify-center" style={{ height: 300, animation: "none" }}>
                  <div className="relative overflow-hidden rounded-[14px]" style={{ width: 200, height: 280 }}>
                    <Image src="/img/link-pago.png" alt="Link de pago" fill className="object-cover object-top" />
                  </div>
                  {/* Floating: WhatsApp message — el SVG ya trae su forma de burbuja
                      (con colita); sin recuadro que la recorte, sombra por drop-shadow. */}
                  <div className="absolute" style={{ left: 4, top: 60, width: 168 }}>
                    <Image src="/img/message-wa.svg" alt="" width={376} height={122} className="w-full" style={{ filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.16))" }} />
                  </div>
                  {/* Floating: Pago completado */}
                  <div className="absolute flex items-center gap-1.5 rounded-[10px] bg-white" style={{ right: 8, bottom: 20, padding: "8px 12px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
                    <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#22C55E]">
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-semibold text-[#4c4c4c]">Pago completado</span>
                  </div>
                </div>
              ) : currentSub.panel === "cotizador" ? (
                <div key={`panel-m-${activeSubTab}`} className="relative flex justify-center" style={{ height: 380, animation: "none" }}>
                  <div className="relative overflow-hidden rounded-[10px]" style={{ width: 210, height: 360, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                    <Image src="/img/cotizador-movil.svg" alt="Cotizador" fill className="object-cover object-top" />
                  </div>
                  {/* Floating DHL card — raised */}
                  <div className="absolute overflow-hidden rounded-[10px]" style={{ right: 16, bottom: 60, width: 155, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
                    <Image src="/img/card-dhl.svg" alt="DHL" width={155} height={85} className="w-full" />
                  </div>
                </div>
              ) : currentSub.panel === "metricas-contracargos" ? (
                <div key={`panel-m-${activeSubTab}`} className="relative flex justify-center" style={{ height: 280, animation: "none" }}>
                  <Image src="/img/metricas-contracargos.png" alt="" width={200} height={180} className="object-contain" style={{ marginTop: 20 }} />
                  {/* Floating card reclamacion 1 */}
                  <div className="absolute overflow-hidden rounded-[8px]" style={{ left: 8, top: 10, width: 140, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
                    <Image src="/img/card-reclamacion-1.svg" alt="" width={140} height={80} className="w-full" />
                  </div>
                  {/* Floating card reclamacion 2 */}
                  <div className="absolute overflow-hidden rounded-[8px]" style={{ right: 8, bottom: 10, width: 140, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
                    <Image src="/img/card-reclamacion-2.svg" alt="" width={140} height={80} className="w-full" />
                  </div>
                </div>
              ) : currentSub.panel === "disputas" ? (
                <div key={`panel-m-${activeSubTab}`} className="relative flex justify-center" style={{ animation: "none" }}>
                  <div className="relative overflow-hidden rounded-[10px]" style={{ width: 220, height: 320, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                    <Image src="/img/reclamaciones-movil.svg" alt="Disputas" fill className="object-cover object-top" />
                  </div>
                  {/* Floating: Evidencia recibida */}
                  <div className="absolute flex items-center gap-1.5 rounded-[10px] bg-white" style={{ right: 12, top: 30, padding: "8px 12px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
                    <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#22C55E]">
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-semibold text-[#4c4c4c]">Evidencia recibida</span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Desktop: absolute positioned layout (position:relative so absolutes
                are scoped to this content area — sub-tabs strip above no longer
                overlaps with content). */}
            <div className="hidden tablet:block" style={{ height: 521, position: "relative" }}>
              {/* Left content — vertically centered. Reduced left padding
                  so the card uses more horizontal real estate (the arrows
                  only appear on hover now so we don't need a wide gutter). */}
              <div
                className="absolute flex flex-col"
                style={{ left: 36, top: "50%", transform: "translateY(-50%)", width: 320, gap: 18 }}
              >
                {/* Description — changes per sub-tab */}
                <p
                  key={`desc-${activeTab}-${activeSubTab}`}
                  className="font-inter text-[16px] font-light text-white/60"
                  style={{ lineHeight: 1.6, animation: "none" }}
                >
                  {currentSub.description}
                </p>

                {/* CTA link */}
                <a
                  href={card.ctaHref}
                  className="inline-flex items-center gap-1.5 font-inter text-[14px] font-semibold text-white no-underline transition-colors duration-150 hover:text-white/70"
                >
                  {card.cta}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              {/* Right panel — custom or image. Right padding trimmed too. */}
              <div
                key={`panel-${activeTab}-${activeSubTab}`}
                className="absolute overflow-hidden rounded-[10px]"
                style={{ left: 392, top: 53, width: 612, height: 420, animation: "none" }}
              >
                {currentSub.panel === "tienda-ia" ? (
                  /* Tienda con IA — store preview with floating prompt on top */
                  <div className="relative h-full" style={{ padding: "20px" }}>
                    {/* Browser mockup with store */}
                    <div className="h-full overflow-hidden rounded-[8px] border border-black/[0.05] bg-white">
                      <div className="flex items-center gap-1.5 border-b border-black/[0.04] px-3 py-1.5">
                        <span className="h-[6px] w-[6px] rounded-full bg-[#FF5F57]" />
                        <span className="h-[6px] w-[6px] rounded-full bg-[#FEBC2E]" />
                        <span className="h-[6px] w-[6px] rounded-full bg-[#28C840]" />
                        <span className="ml-2 flex-1 rounded-full bg-black/[0.03] px-2 py-[2px] font-inter text-[8px] text-black/25">mitienda.t1.com</span>
                      </div>
                      <div className="relative" style={{ height: "calc(100% - 28px)" }}>
                        <Image src="/img/muebles-v2.webp" alt="" fill className="object-cover object-top" />
                      </div>
                    </div>
                    {/* Floating prompt — on top of the store */}
                    <div
                      className="absolute rounded-[12px] border border-black/[0.06] bg-white"
                      style={{ left: 30, top: 60, width: 280, padding: "14px 16px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
                    >
                      <p className="font-inter text-[11px] text-black/50 leading-relaxed" style={{ marginBottom: 10 }}>
                        Quiero vender muebles de la más alta calidad.
                      </p>
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-[9px] text-black/25">45/500</span>
                        <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#E26153]">
                          <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M5 8V2M5 2L2.5 4.5M5 2L7.5 4.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : currentSub.panel === "producto-grid" ? (
                  /* Product list — centered image, floating cards overlapping */
                  <div className="relative flex h-full items-center justify-center">
                    <div className="relative overflow-hidden rounded-[12px]" style={{ width: 260, height: "88%", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                      <Image src="/img/list-product.webp" alt="Lista de productos" fill className="object-cover object-top" />
                    </div>
                    {/* Floating card — overlapping image, lower position */}
                    <div className="absolute rounded-[12px] border border-black/[0.06] bg-white" style={{ right: 50, bottom: 60, padding: "12px 14px", boxShadow: "0 6px 24px rgba(0,0,0,0.1)", width: 155 }}>
                      <div className="flex items-center justify-center" style={{ marginBottom: 6 }}>
                        <Image src="/img/tenis-transparente.png" alt="" width={50} height={38} className="object-contain" />
                      </div>
                      <p className="text-center text-[9px] font-medium text-black/70">Tenis blancos</p>
                      <p className="text-center text-[12px] font-bold text-black">$1,345.99</p>
                      <p className="text-center text-[7px] text-black/40">3,102 unidades</p>
                    </div>
                  </div>
                ) : currentSub.panel === "pedidos" ? (
                  /* Conecta canales — T1 center with marketplace logos radiating */
                  <div className="relative flex h-full items-center justify-center">
                   <div className="relative flex h-full w-full items-center justify-center" style={{ maxWidth: 340 }}>
                    {/* T1 logo center */}
                    <div className="relative flex h-[60px] w-[60px] items-center justify-center rounded-[14px] bg-white" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)", zIndex: 10 }}>
                      <svg width="30" height="28" viewBox="0 0 45 44" fill="none">
                        <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457V19.1513V19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#D93A26" />
                        <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592H22.4335H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#D93A26" />
                      </svg>
                    </div>
                    {/* Dashed lines + marketplace logos orbiting around T1 */}
                    {[
                      { src: "/img/meli-iso.svg", top: "8%", left: "20%" },
                      { src: "/img/amazon-iso.svg", top: "8%", right: "20%" },
                      { src: "/img/shein-iso.svg", top: "42%", left: "5%" },
                      { src: "/img/walmart.svg", top: "42%", right: "5%" },
                      { src: "/img/sears-isotipo.svg", bottom: "12%", left: "20%" },
                      { src: "/img/tiktok-isotipo.png", bottom: "12%", right: "20%" },
                    ].map((mp, i) => (
                      <div key={i} className="absolute flex h-[44px] w-[44px] items-center justify-center rounded-[10px] bg-white" style={{ ...mp, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                        <Image src={mp.src} alt="" width={30} height={30} className="object-contain" />
                      </div>
                    ))}
                    {/* Connecting lines SVG — blancas para que se vean sobre el panel oscuro */}
                    <svg className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
                      <line x1="50%" y1="50%" x2="20%" y2="15%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                      <line x1="50%" y1="50%" x2="80%" y2="15%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                      <line x1="50%" y1="50%" x2="8%" y2="50%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                      <line x1="50%" y1="50%" x2="92%" y2="50%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                      <line x1="50%" y1="50%" x2="20%" y2="85%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                      <line x1="50%" y1="50%" x2="80%" y2="85%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                    </svg>
                   </div>
                  </div>
                ) : currentSub.panel === "personaliza" ? (
                  /* Personaliza — store with floating design elements */
                  <div className="relative h-full" style={{ padding: "20px" }}>
                    {/* Store browser mockup */}
                    <div className="h-full overflow-hidden rounded-[8px] border border-black/[0.05] bg-white">
                      <div className="flex items-center gap-1.5 border-b border-black/[0.04] px-3 py-1.5">
                        <span className="h-[6px] w-[6px] rounded-full bg-[#FF5F57]" />
                        <span className="h-[6px] w-[6px] rounded-full bg-[#FEBC2E]" />
                        <span className="h-[6px] w-[6px] rounded-full bg-[#28C840]" />
                      </div>
                      <div className="relative" style={{ height: "calc(100% - 28px)" }}>
                        <Image src="/img/muebles-v2.webp" alt="" fill className="object-cover object-top" />
                      </div>
                    </div>

                    {/* Floating: Color palette card */}
                    <div className="absolute rounded-[10px] border border-black/[0.06] bg-white" style={{ top: 50, right: 30, padding: "10px 12px", boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}>
                      <p className="text-[8px] font-semibold text-black/50 uppercase tracking-wide" style={{ marginBottom: 6 }}>Paletas curadas</p>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[
                          ["#1a1a1a", "#666", "#c9a96e", "#b08d57"],
                          ["#f5f0eb", "#f0ece6", "#faf5ef", "#f8f4ee"],
                        ].map((row, ri) => (
                          <div key={ri} className="contents">
                            {row.map((c, ci) => (
                              <div key={ci} className="h-[14px] w-[14px] rounded-[3px]" style={{ background: c }} />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Floating: Logo generator */}
                    <div className="absolute rounded-[10px] border border-black/[0.06] bg-white" style={{ bottom: 80, left: 30, padding: "10px 14px", boxShadow: "0 6px 20px rgba(0,0,0,0.08)", width: 180 }}>
                      <p className="text-[8px] font-semibold text-black/50" style={{ marginBottom: 6 }}>Logo principal</p>
                      <div className="flex h-[36px] items-center justify-center rounded-[6px] border border-dashed border-black/[0.1]">
                        <span className="text-[8px] text-black/25">Seleccionar imagen</span>
                      </div>
                      <div className="mt-2 flex h-[24px] items-center justify-center rounded-[6px] bg-[#DB3B2B]">
                        <span className="text-[8px] font-semibold text-white">✨ Generar logo con IA</span>
                      </div>
                    </div>

                    {/* Floating: Banner editor */}
                    <div className="absolute rounded-[10px] border border-black/[0.06] bg-white" style={{ bottom: 40, right: 40, padding: "8px 10px", boxShadow: "0 6px 20px rgba(0,0,0,0.08)", width: 160 }}>
                      <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
                        <p className="text-[8px] font-semibold text-black/60">Banner</p>
                        <span className="text-[7px] text-black/30">×</span>
                      </div>
                      <div className="flex gap-1.5" style={{ marginBottom: 4 }}>
                        <div className="flex h-[18px] flex-1 items-center justify-center rounded-[4px] bg-[#E26153]/10 text-[7px] font-medium text-[#E26153]">Imagen</div>
                        <div className="flex h-[18px] flex-1 items-center justify-center rounded-[4px] text-[7px] text-black/30">Video</div>
                      </div>
                      <div className="h-[50px] overflow-hidden rounded-[4px]">
                        <Image src="/img/bento-2.png" alt="" width={160} height={50} className="h-full w-full object-cover" />
                      </div>
                    </div>
                  </div>
                ) : currentSub.panel === "sync-inventory" ? (
                  /* Sincroniza inventario — T1 + marketplace tree like modal */
                  <div className="relative flex h-full items-center justify-center">
                   <div className="relative flex h-full w-full items-center justify-center" style={{ maxWidth: 400 }}>
                    {/* Product card left */}
                    <div className="absolute overflow-hidden rounded-[14px]" style={{ left: 20, top: "50%", transform: "translateY(-50%)", width: 120, padding: 14, background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}>
                      <div className="mb-2 flex items-center justify-center">
                        <Image src="/img/tenis-transparente.png" alt="" width={60} height={45} className="object-contain" />
                      </div>
                      <p className="text-center text-[12px] font-bold text-black">$1,345.99</p>
                      <p className="text-center text-[8px] text-black/50">Tenis blancos</p>
                      <p className="text-center text-[7px] text-black/30">1,003 unidades</p>
                    </div>
                    {/* T1 logo center */}
                    <div className="flex h-[40px] w-[40px] items-center justify-center" style={{ zIndex: 5 }}>
                      <svg width="30" height="28" viewBox="0 0 45 44" fill="none">
                        <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457V19.1513V19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#D93A26" />
                        <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592H22.4335H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#D93A26" />
                      </svg>
                    </div>
                    {/* Marketplace icons on right */}
                    {[
                      { src: "/img/meli-iso.svg", top: "10%", right: "15%" },
                      { src: "/img/amazon-iso.svg", top: "30%", right: "5%" },
                      { src: "/img/shein-iso.svg", top: "50%", right: "15%" },
                      { src: "/img/walmart.svg", top: "70%", right: "5%" },
                      { src: "/img/sears-isotipo.svg", top: "90%", right: "15%" },
                    ].map((mp, i) => (
                      <div key={i} className="absolute flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-[8px]" style={{ ...mp }}>
                        <Image src={mp.src} alt="" width={36} height={36} className="object-contain" />
                      </div>
                    ))}
                    {/* Dashed lines — blancas para que se vean sobre el panel oscuro */}
                    <svg className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
                      <line x1="28%" y1="50%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                      <line x1="50%" y1="50%" x2="58%" y2="50%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                      <line x1="58%" y1="15%" x2="58%" y2="93%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                      <line x1="58%" y1="15%" x2="82%" y2="15%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                      <line x1="58%" y1="35%" x2="92%" y2="35%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                      <line x1="58%" y1="55%" x2="82%" y2="55%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                      <line x1="58%" y1="75%" x2="92%" y2="75%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                      <line x1="58%" y1="93%" x2="82%" y2="93%" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="4 3" />
                    </svg>
                   </div>
                  </div>
                ) : currentSub.panel === "order-list" ? (
                  /* Order list — photo behind, panel overlapping */
                  <div className="relative h-full">
                    {/* Background photo — 50px smaller, 20px left */}
                    <div className="absolute overflow-hidden rounded-[12px]" style={{ left: 40, top: 50, width: 210, bottom: 50 }}>
                      <Image src="/img/pedidos-bg.png" alt="" fill className="object-cover" />
                    </div>
                    {/* Order panel — overlapping, 20px right */}
                    <div className="absolute overflow-hidden rounded-[12px]" style={{ left: 240, top: 20, width: 270, bottom: 15, boxShadow: "0 6px 30px rgba(0,0,0,0.12)" }}>
                      <Image src="/img/list-order.svg" alt="Lista de pedidos" fill className="object-cover object-top" />
                    </div>
                  </div>
                ) : currentSub.panel === "carrito" ? (
                  /* Carrito abandonado — full image with shadow */
                  <div className="relative flex h-full items-center justify-center" style={{ padding: "20px" }}>
                    <div className="overflow-hidden rounded-[12px]" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
                      <Image src="/img/carrito-desktop.svg" alt="Carrito abandonado" width={520} height={380} className="object-contain" />
                    </div>
                  </div>
                ) : currentSub.panel === "rastreo" ? (
                  /* Rastreo de guías — smaller */
                  <div className="relative flex h-full items-center justify-center">
                    <Image src="/img/rastrear.svg" alt="Rastreo de guías" width={380} height={300} className="object-contain" />
                  </div>
                ) : currentSub.panel === "guias-masivas" ? (
                  /* Guías masivas — bulk shipment generator mock with progress bar */
                  <div className="relative flex h-full items-center justify-center" style={{ padding: "20px 24px" }}>
                    <div className="w-[440px] rounded-[14px] border border-black/[0.06] bg-white" style={{ padding: 22, fontFamily: font, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                      {/* Header — title + counter */}
                      <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
                        <p className="text-[14px] font-bold text-[#4c4c4c]">Generando guías</p>
                        <span className="rounded-full bg-[rgba(34,197,94,0.12)] px-2 py-0.5 text-[10px] font-bold text-[#22C55E]">En proceso</span>
                      </div>
                      {/* Progress bar */}
                      <div className="rounded-[10px] bg-[#FAFAF9]" style={{ padding: "12px 14px", marginBottom: 14 }}>
                        <div className="flex items-baseline justify-between" style={{ marginBottom: 8 }}>
                          <span className="text-[24px] font-bold text-[#4c4c4c]">247</span>
                          <span className="text-[11px] text-[#828282]">de 500 guías</span>
                        </div>
                        <div className="h-[6px] w-full overflow-hidden rounded-full bg-black/[0.05]">
                          <div className="h-full rounded-full" style={{ width: "49%", background: "#DB3B2B" }} />
                        </div>
                      </div>
                      {/* List of generated shipments */}
                      <div className="flex flex-col gap-1.5">
                        {[
                          { id: "T1-9472831", courier: "/img/dhl-iso.svg", status: "ok" },
                          { id: "T1-9472832", courier: "/img/icons/fedex-logo.svg", status: "ok" },
                          { id: "T1-9472833", courier: "/img/99min-iso.svg", status: "ok" },
                          { id: "T1-9472834", courier: "/img/dhl-iso.svg", status: "loading" },
                          { id: "T1-9472835", courier: "/img/icons/fedex-logo.svg", status: "pending" },
                        ].map((row) => (
                          <div key={row.id} className="flex items-center gap-3 rounded-[8px] border border-black/[0.04] bg-white px-3 py-2">
                            <div className="flex h-[24px] w-[34px] shrink-0 items-center justify-center">
                              <Image src={row.courier} alt="" width={28} height={18} className="object-contain" />
                            </div>
                            <span className="flex-1 font-mono text-[11px] text-[#4c4c4c]">{row.id}</span>
                            {row.status === "ok" && (
                              <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#22C55E]">
                                <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              </div>
                            )}
                            {row.status === "loading" && (
                              <div className="flex h-[20px] w-[20px] items-center justify-center">
                                <span className="h-[10px] w-[10px] rounded-full bg-[#DB3B2B]" style={{ animation: "pulse-soft 1.2s ease-in-out infinite" }} />
                              </div>
                            )}
                            {row.status === "pending" && (
                              <span className="text-[10px] text-black/35">En cola</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Floating: Listas para imprimir */}
                    <div className="absolute flex items-center gap-2 rounded-[12px] bg-white" style={{ right: 36, top: 70, padding: "10px 14px", boxShadow: "0 6px 24px rgba(0,0,0,0.10)" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9V2h12v7 M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2 M6 14h12v8H6z" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-inter text-[11px] font-semibold text-[#4c4c4c]">Listas para imprimir</span>
                    </div>
                  </div>
                ) : currentSub.panel === "enrutamiento-pagos" ? (
                  /* Enrutamiento de pagos — diagram: card → 3 processors → bank, animated */
                  <div className="relative flex h-full items-center justify-center" style={{ padding: "20px 24px" }}>
                    <div className="w-[460px] rounded-[14px] border border-black/[0.06] bg-white" style={{ padding: 24, fontFamily: font, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                      <p className="text-[14px] font-bold text-[#4c4c4c]" style={{ marginBottom: 16 }}>Enrutamiento por flujo</p>
                      <div className="relative" style={{ minHeight: 220 }}>
                        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 220" fill="none" preserveAspectRatio="xMidYMid meet">
                          {/* Lines from card to processors */}
                          <line x1="40" y1="110" x2="180" y2="60" stroke="rgba(219,59,43,0.30)" strokeWidth="1.5" strokeDasharray="4 4" />
                          <line x1="40" y1="110" x2="180" y2="110" stroke="#DB3B2B" strokeWidth="2" />
                          <line x1="40" y1="110" x2="180" y2="160" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                          {/* Lines from processors to bank */}
                          <line x1="280" y1="60" x2="360" y2="110" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                          <line x1="280" y1="110" x2="360" y2="110" stroke="#DB3B2B" strokeWidth="2" />
                          <line x1="280" y1="160" x2="360" y2="110" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                          {/* Animated dot */}
                          <circle r="4" fill="#DB3B2B"><animateMotion dur="2.4s" repeatCount="indefinite" path="M40 110 L180 110 L280 110 L360 110" /></circle>
                        </svg>
                        {/* Card icon (left) */}
                        <div className="absolute flex h-[44px] w-[44px] items-center justify-center rounded-[10px] border border-black/[0.08] bg-white" style={{ left: 0, top: 88, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="#DB3B2B" strokeWidth="1.6" /><path d="M3 10h18" stroke="#DB3B2B" strokeWidth="1.6" /></svg>
                        </div>
                        {/* Processors (middle column) */}
                        {[
                          { y: 38, name: "Flujo A", subtitle: "88% aprobación", dim: true },
                          { y: 88, name: "Flujo B", subtitle: "96% aprobación", dim: false },
                          { y: 138, name: "Flujo C", subtitle: "79% aprobación", dim: true },
                        ].map((p) => (
                          <div
                            key={p.name}
                            className={`absolute flex w-[110px] flex-col items-center justify-center rounded-[10px] border bg-white px-2 py-2 ${p.dim ? "border-black/[0.06] opacity-50" : "border-[#DB3B2B]"}`}
                            style={{ left: 175, top: p.y, boxShadow: p.dim ? "none" : "0 4px 14px rgba(219,59,43,0.18)" }}
                          >
                            <p className="text-[10px] font-semibold text-[#4c4c4c]">{p.name}</p>
                            <p className="text-[9px] text-[#828282]">{p.subtitle}</p>
                          </div>
                        ))}
                        {/* Bank icon (right) */}
                        <div className="absolute flex h-[44px] w-[44px] items-center justify-center rounded-[10px] bg-[rgba(34,197,94,0.10)]" style={{ right: 0, top: 88 }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 21h18 M5 10v8 M9 10v8 M15 10v8 M19 10v8 M3 10l9-6 9 6v0 H3z" stroke="#16A34A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                      </div>
                      {/* Footer — approval rate */}
                      <div className="mt-3 flex items-center gap-2 rounded-[10px] bg-[rgba(34,197,94,0.08)] px-3 py-2.5">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span className="font-inter text-[12px] font-semibold text-[#16A34A]">+24% de aprobación con enrutamiento</span>
                      </div>
                    </div>
                  </div>
                ) : currentSub.panel === "checkout" ? (
                  /* Checkout — image with shadow + floating "Pedido completado" */
                  <div className="relative flex h-full items-center justify-center" style={{ padding: "20px" }}>
                    <div className="overflow-hidden rounded-[12px]" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
                      <Image src="/img/checkout-desktop.svg" alt="Checkout" width={480} height={380} className="object-contain" />
                    </div>
                    {/* Floating: Pedido completado */}
                    <div className="absolute flex items-center gap-2 rounded-[12px] bg-white" style={{ right: 40, top: 60, padding: "12px 18px", boxShadow: "0 6px 24px rgba(0,0,0,0.1)" }}>
                      <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#22C55E]">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="font-inter text-[14px] font-semibold text-[#4c4c4c]">Pedido completado</span>
                    </div>
                  </div>
                ) : currentSub.panel === "link-pago" ? (
                  /* Links de pago — smaller image + message floating + pago completado */
                  <div className="relative flex h-full items-center justify-center">
                    <div className="overflow-hidden rounded-[16px]">
                      <Image src="/img/link-pago.png" alt="Link de pago" width={280} height={240} className="object-contain" />
                    </div>
                    {/* Floating: WhatsApp message — el SVG ya trae su forma de burbuja
                        (con colita); sin recuadro que la recorte, sombra por drop-shadow. */}
                    <div className="absolute" style={{ left: 12, top: 80, width: 216 }}>
                      <Image src="/img/message-wa.svg" alt="Mensaje" width={376} height={122} className="w-full" style={{ filter: "drop-shadow(0 8px 22px rgba(0,0,0,0.14))" }} />
                    </div>
                    {/* Floating: Pago completado */}
                    <div className="absolute flex items-center gap-2 rounded-[12px] bg-white" style={{ right: 30, bottom: 70, padding: "12px 18px", boxShadow: "0 6px 24px rgba(0,0,0,0.1)" }}>
                      <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#22C55E]">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="font-inter text-[14px] font-semibold text-[#4c4c4c]">Pago completado</span>
                    </div>
                  </div>
                ) : currentSub.panel === "cotizador" ? (
                  /* Cotizador — full image + floating DHL card */
                  <div className="relative flex h-full items-center justify-center">
                    <Image src="/img/cotizador-desktop.svg" alt="Cotizador" width={500} height={400} className="object-contain" />
                    {/* Floating DHL card — right, slightly up */}
                    <div className="absolute overflow-hidden rounded-[12px]" style={{ right: 30, top: 180, width: 220, boxShadow: "0 6px 24px rgba(0,0,0,0.1)" }}>
                      <Image src="/img/card-dhl.svg" alt="DHL" width={220} height={120} className="w-full" />
                    </div>
                  </div>
                ) : currentSub.panel === "sobrepesos-cards" ? (
                  /* Sobrepesos — cards only, well-aligned */
                  <div className="flex h-full flex-col justify-center bg-white" style={{ padding: "20px 24px", fontFamily: font }}>
                    {/* Row 1: two cards */}
                    <div className="flex gap-3" style={{ marginBottom: 12 }}>
                      <div className="flex-1 rounded-[10px] border border-black/[0.04]" style={{ padding: "16px 18px" }}>
                        <p className="text-[14px] font-bold text-[#4c4c4c]">Tasa de sobrepesos</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-[32px] font-bold text-[#4c4c4c]">18.8%</span>
                          <span className="rounded-full bg-[rgba(254,77,97,0.1)] px-2.5 py-1 text-[11px] font-bold text-[#fe4d61]">+2.1%</span>
                        </div>
                        <p className="mt-1 text-[11px] text-[#828282]">19 / 228 guías en los últimos 30 días</p>
                      </div>
                      <div className="flex-1 rounded-[10px] border border-black/[0.04]" style={{ padding: "16px 18px" }}>
                        <p className="text-[14px] font-bold text-[#4c4c4c]">Cargo por sobrepesos</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-[32px] font-bold text-[#4c4c4c]">$1,686.80</span>
                          <span className="rounded-full bg-[rgba(81,175,112,0.1)] px-2.5 py-1 text-[11px] font-bold text-[#4fc153]">+15%</span>
                        </div>
                        <p className="mt-1 text-[11px] text-[#828282]">19 guías en los últimos 30 días</p>
                      </div>
                    </div>
                    {/* Row 2: shipment detail */}
                    <div className="rounded-[10px] border border-black/[0.04]" style={{ padding: "14px 18px" }}>
                      <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                        <span className="text-[11px] text-[#828282]">Hoy | 2:24 hrs</span>
                        <span className="rounded-full bg-[rgba(81,175,112,0.1)] px-2.5 py-1 text-[10px] font-bold text-[#4fc153]">Cobrado hoy</span>
                      </div>
                      <div className="flex items-center gap-3" style={{ marginBottom: 8 }}>
                        <Image src="/img/icons/fedex-logo.svg" alt="FedEx" width={36} height={22} className="object-contain" />
                        <div>
                          <p className="text-[14px] font-bold text-[#4c4c4c]">43567890082</p>
                          <p className="text-[11px] text-[#828282]">FedEx</p>
                        </div>
                        <div className="ml-auto flex h-[24px] w-[24px] items-center justify-center rounded-full bg-black/[0.04]">
                          <span className="text-[10px] text-black/40">···</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-black/[0.04] pt-2">
                        <div>
                          <p className="text-[10px] text-[#828282]">Sobrepeso (kg):</p>
                          <p className="text-[14px] font-bold text-[#4c4c4c]">+5.7</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-[#828282]">Cargo adicional:</p>
                          <p className="text-[14px] font-bold text-[#4c4c4c]">$87.45 MXN</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : currentSub.panel === "metricas-contracargos" ? (
                  /* Métricas contracargos — image with rounded corners + floating reclamacion cards */
                  <div className="relative flex h-full items-center justify-center">
                    <div className="overflow-hidden rounded-[14px]">
                      <Image src="/img/metricas-contracargos.png" alt="Métricas contracargos" width={320} height={300} className="object-contain" />
                    </div>
                    {/* Floating card reclamacion 1 */}
                    <div className="absolute overflow-hidden rounded-[12px]" style={{ left: 20, top: 40, width: 200, boxShadow: "0 6px 24px rgba(0,0,0,0.1)" }}>
                      <Image src="/img/card-reclamacion-1.svg" alt="" width={200} height={110} className="w-full" />
                    </div>
                    {/* Floating card reclamacion 2 */}
                    <div className="absolute overflow-hidden rounded-[12px]" style={{ right: 20, bottom: 50, width: 200, boxShadow: "0 6px 24px rgba(0,0,0,0.1)" }}>
                      <Image src="/img/card-reclamacion-2.svg" alt="" width={200} height={110} className="w-full" />
                    </div>
                  </div>
                ) : currentSub.panel === "disputas" ? (
                  /* Administrador de disputas — image + floating "Evidencia recibida" */
                  <div className="relative flex h-full items-center justify-center" style={{ padding: "15px" }}>
                    <div className="overflow-hidden rounded-[12px]" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
                      <Image src="/img/reclamaciones-desktop.svg" alt="Administrador de disputas" width={500} height={380} className="object-contain" />
                    </div>
                    {/* Floating: Evidencia recibida */}
                    <div className="absolute flex items-center gap-2 rounded-[12px] bg-white" style={{ right: 30, top: 50, padding: "12px 18px", boxShadow: "0 6px 24px rgba(0,0,0,0.1)" }}>
                      <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#22C55E]">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="font-inter text-[14px] font-semibold text-[#4c4c4c]">Evidencia recibida</span>
                    </div>
                  </div>
                ) : /* T1Score hidden — DO NOT REMOVE (used for future launch). Desktop panels for fraude / riesgo / buro stay below. */
                currentSub.panel === "fraude" ? (
                  /* Prevención de fraude — gauge + transaction floats */
                  <div className="relative flex h-full items-center justify-center">
                    {/* Gauge */}
                    <svg width="240" height="240" viewBox="0 0 110 110" fill="none" className="shrink-0">
                      <circle cx="55" cy="55" r="48" stroke="rgba(0,0,0,0.04)" strokeWidth="6" />
                      <circle cx="55" cy="55" r="48" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" strokeDasharray="280 302" transform="rotate(-90 55 55)" />
                      <circle cx="55" cy="55" r="36" stroke="rgba(0,0,0,0.03)" strokeWidth="5" />
                      <circle cx="55" cy="55" r="36" stroke="#E26153" strokeWidth="5" strokeLinecap="round" strokeDasharray="40 226" transform="rotate(-90 55 55)" />
                      <text x="55" y="55" textAnchor="middle" style={{ fontSize: 14, fontWeight: 700, fill: "rgba(0,0,0,0.8)" }}>96%</text>
                      <text x="55" y="68" textAnchor="middle" style={{ fontSize: 6, fontWeight: 500, fill: "rgba(0,0,0,0.4)" }}>aprobadas</text>
                    </svg>
                    {/* Floating: Transacción aprobada */}
                    <div className="absolute flex items-center gap-2 rounded-[12px] bg-white" style={{ left: 30, top: 60, padding: "10px 14px", boxShadow: "0 6px 24px rgba(0,0,0,0.08)" }}>
                      <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#22C55E]">
                        <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-[#4c4c4c]">Pago aprobado</p>
                        <p className="text-[9px] text-[#828282]">$1,345.99 — Tarjeta ****3456</p>
                      </div>
                    </div>
                    {/* Floating: Transacción fraudulenta */}
                    <div className="absolute flex items-center gap-2 rounded-[12px] bg-white" style={{ right: 30, bottom: 70, padding: "10px 14px", boxShadow: "0 6px 24px rgba(0,0,0,0.08)" }}>
                      <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#fe4d61]">
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                          <path d="M3 3L13 13M13 3L3 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-[#4c4c4c]">Transacción fraudulenta</p>
                        <p className="text-[9px] text-[#fe4d61]">Bloqueada automáticamente</p>
                      </div>
                    </div>
                    {/* Floating: Score */}
                    <div className="absolute rounded-[12px] bg-white" style={{ right: 50, top: 50, padding: "10px 14px", boxShadow: "0 6px 24px rgba(0,0,0,0.08)" }}>
                      <p className="text-[9px] font-medium text-[#828282]">Score de riesgo</p>
                      <p className="text-[20px] font-bold text-[#4c4c4c]" style={{ lineHeight: 1.1 }}>Bajo</p>
                    </div>
                  </div>
                ) : currentSub.panel === "riesgo" ? (
                  /* Análisis de riesgo — gauge with transaction floats */
                  <div className="relative flex h-full items-center justify-center">
                    {/* Concentric ring chart */}
                    <svg width="240" height="240" viewBox="0 0 110 110" fill="none">
                      <circle cx="55" cy="55" r="48" stroke="rgba(0,0,0,0.04)" strokeWidth="6" />
                      <circle cx="55" cy="55" r="48" stroke="#E26153" strokeWidth="6" strokeLinecap="round" strokeDasharray="260 302" transform="rotate(-90 55 55)" />
                      <circle cx="55" cy="55" r="36" stroke="rgba(0,0,0,0.03)" strokeWidth="5" />
                      <circle cx="55" cy="55" r="36" stroke="#8B5CF6" strokeWidth="5" strokeLinecap="round" strokeDasharray="150 226" transform="rotate(-90 55 55)" />
                      <circle cx="55" cy="55" r="25" stroke="rgba(0,0,0,0.02)" strokeWidth="4" />
                      <circle cx="55" cy="55" r="25" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round" strokeDasharray="90 157" transform="rotate(-90 55 55)" />
                      <text x="55" y="58" textAnchor="middle" style={{ fontSize: 18, fontWeight: 700, fill: "rgba(0,0,0,0.7)" }}>78</text>
                      <text x="55" y="68" textAnchor="middle" style={{ fontSize: 5, fontWeight: 500, fill: "rgba(0,0,0,0.4)" }}>SCORE</text>
                    </svg>
                    {/* Floating: Pago aprobado */}
                    <div className="absolute flex items-center gap-2 rounded-[12px] bg-white" style={{ left: 30, top: 70, padding: "10px 14px", boxShadow: "0 6px 24px rgba(0,0,0,0.08)" }}>
                      <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#22C55E]">
                        <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-[12px] font-semibold text-[#4c4c4c]">Pago aprobado</span>
                    </div>
                    {/* Floating: Transacción rechazada */}
                    <div className="absolute flex items-center gap-2 rounded-[12px] bg-white" style={{ right: 30, top: 90, padding: "10px 14px", boxShadow: "0 6px 24px rgba(0,0,0,0.08)" }}>
                      <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#fe4d61]">
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                          <path d="M3 3L13 13M13 3L3 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                      <span className="text-[12px] font-semibold text-[#4c4c4c]">Transacción rechazada</span>
                    </div>
                    {/* Floating: Riesgo evaluado */}
                    <div className="absolute rounded-[12px] bg-white" style={{ left: 50, bottom: 60, padding: "10px 14px", boxShadow: "0 6px 24px rgba(0,0,0,0.08)" }}>
                      <p className="text-[10px] font-medium text-[#828282]">Riesgo evaluado</p>
                      <div className="mt-0.5 flex items-center gap-2">
                        <span className="text-[16px] font-bold text-[#4c4c4c]">Medio</span>
                        <span className="rounded-full bg-[rgba(245,158,11,0.1)] px-2 py-0.5 text-[9px] font-bold text-[#f59e0b]">Revisar</span>
                      </div>
                    </div>
                    {/* Floating: Score breakdown */}
                    <div className="absolute rounded-[12px] bg-white" style={{ right: 40, bottom: 50, padding: "10px 14px", boxShadow: "0 6px 24px rgba(0,0,0,0.08)", width: 160 }}>
                      <p className="text-[9px] font-medium text-[#828282]" style={{ marginBottom: 6 }}>Variables analizadas</p>
                      {[
                        { label: "Datos transaccionales", v: "92%", color: "#22C55E" },
                        { label: "Datos alternativos", v: "85%", color: "#8B5CF6" },
                        { label: "Histórico", v: "78%", color: "#E26153" },
                      ].map((row) => (
                        <div key={row.label} className="flex items-center justify-between" style={{ marginBottom: 3 }}>
                          <span className="text-[9px] text-[#4c4c4c]">{row.label}</span>
                          <span className="text-[10px] font-bold" style={{ color: row.color }}>{row.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : currentSub.panel === "buro" ? (
                  /* Evaluación crediticia — credit report style */
                  <div className="relative flex h-full items-center justify-center" style={{ padding: "20px" }}>
                    <div className="overflow-hidden rounded-[14px] border border-black/[0.06] bg-white" style={{ width: 380, padding: "20px 24px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", fontFamily: font }}>
                      {/* Header */}
                      <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
                        <div>
                          <p className="text-[10px] font-medium text-[#828282]">Reporte crediticio</p>
                          <p className="text-[14px] font-bold text-[#4c4c4c]">Juan Pérez García</p>
                        </div>
                        <span className="rounded-full bg-[rgba(34,197,94,0.1)] px-2.5 py-1 text-[10px] font-bold text-[#22C55E]">Aprobado</span>
                      </div>
                      {/* Score gauge */}
                      <div className="flex items-center gap-4" style={{ marginBottom: 14 }}>
                        <div className="relative">
                          <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
                            <circle cx="50" cy="50" r="40" stroke="rgba(0,0,0,0.06)" strokeWidth="8" />
                            <circle cx="50" cy="50" r="40" stroke="#22C55E" strokeWidth="8" strokeLinecap="round" strokeDasharray="210 251" transform="rotate(-90 50 50)" />
                            <text x="50" y="48" textAnchor="middle" style={{ fontSize: 16, fontWeight: 700, fill: "#4c4c4c" }}>742</text>
                            <text x="50" y="62" textAnchor="middle" style={{ fontSize: 6, fontWeight: 500, fill: "#828282" }}>de 850</text>
                          </svg>
                        </div>
                        <div>
                          <p className="text-[11px] font-medium text-[#828282]">Score crediticio</p>
                          <p className="text-[18px] font-bold text-[#22C55E]">Excelente</p>
                          <p className="text-[10px] text-[#828282]">Riesgo bajo de impago</p>
                        </div>
                      </div>
                      {/* Variables */}
                      <div style={{ marginBottom: 12 }}>
                        <p className="text-[10px] font-bold text-[#4c4c4c]" style={{ marginBottom: 8 }}>Factores evaluados</p>
                        {[
                          { label: "Historial de pagos", value: "Excelente", pct: 95, color: "#22C55E" },
                          { label: "Utilización de crédito", value: "32%", pct: 68, color: "#22C55E" },
                          { label: "Antigüedad", value: "8 años", pct: 80, color: "#8B5CF6" },
                          { label: "Tipos de crédito", value: "Buena", pct: 75, color: "#E26153" },
                        ].map((row) => (
                          <div key={row.label} style={{ marginBottom: 8 }}>
                            <div className="flex items-center justify-between" style={{ marginBottom: 3 }}>
                              <span className="text-[10px] text-[#4c4c4c]">{row.label}</span>
                              <span className="text-[10px] font-bold text-[#4c4c4c]">{row.value}</span>
                            </div>
                            <div className="h-[4px] w-full overflow-hidden rounded-full bg-black/[0.04]">
                              <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.color }} />
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Stats footer */}
                      <div className="flex items-center justify-between border-t border-black/[0.06] pt-3">
                        <div>
                          <p className="text-[8px] text-[#828282]">Cuentas activas</p>
                          <p className="text-[14px] font-bold text-[#4c4c4c]">4</p>
                        </div>
                        <div>
                          <p className="text-[8px] text-[#828282]">Saldo total</p>
                          <p className="text-[14px] font-bold text-[#4c4c4c]">$45,200</p>
                        </div>
                        <div>
                          <p className="text-[8px] text-[#828282]">Pagos a tiempo</p>
                          <p className="text-[14px] font-bold text-[#22C55E]">100%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : currentSub.panel === "pos-cobro" ? (
                  /* POS — carrito image + cobra mockup */
                  <div className="relative flex h-full items-center justify-center" style={{ padding: "16px 24px" }}>
                    {/* Carrito — natural ratio 713:1409 (very tall), object-contain so full screen visible */}
                    <div className="relative h-[94%]" style={{ aspectRatio: "713 / 1409", filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.14))" }}>
                      <Image src="/img/pos-carrito.webp" alt="Carrito de cobro POS" fill className="object-contain" sizes="220px" />
                    </div>
                    {/* Cobra (overlapping, right) — kept as before */}
                    <div className="absolute overflow-hidden rounded-[14px] h-[58%]" style={{ right: 36, bottom: 40, aspectRatio: "3 / 4", boxShadow: "0 10px 22px rgba(0,0,0,0.18)" }}>
                      <Image src="/img/pos-cobra.png" alt="Cobro POS" fill className="object-cover" sizes="240px" />
                    </div>
                  </div>
                ) : currentSub.panel === "pos-inventario" ? (
                  /* POS inventory — single sucursal stock list */
                  <div className="relative flex h-full items-center justify-center">
                    <div className="relative flex w-[440px] flex-col rounded-[14px] border border-black/[0.06] bg-white" style={{ padding: 22, fontFamily: font, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                      <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                        <p className="text-[14px] font-bold text-[#4c4c4c]">Inventario en tiempo real</p>
                        <span className="rounded-full bg-[rgba(34,197,94,0.12)] px-2 py-0.5 text-[9px] font-bold text-[#22C55E]">Sincronizado</span>
                      </div>
                      {[
                        { name: "Tenis blancos clásicos", sku: "TBC-042", stock: 24, status: "Disponible", color: "#22C55E" },
                        { name: "Playera básica", sku: "PB-101", stock: 87, status: "Disponible", color: "#22C55E" },
                        { name: "Sudadera hoodie", sku: "SH-220", stock: 8, status: "Inventario bajo", color: "#F59E0B" },
                      ].map((row, i) => (
                        <div key={row.sku} className={`flex items-center justify-between py-3 ${i < 2 ? "border-b border-black/[0.04]" : ""}`}>
                          <div>
                            <p className="text-[12px] font-semibold text-[#4c4c4c]">{row.name}</p>
                            <p className="text-[10px] text-[#828282]">{row.sku}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold" style={{ background: `${row.color}1F`, color: row.color }}>{row.status}</span>
                            <div className="text-right">
                              <p className="text-[9px] text-[#828282]">Disponibles</p>
                              <p className="text-[14px] font-bold text-[#4c4c4c]">{row.stock}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="absolute flex items-center gap-2 rounded-[12px] bg-white" style={{ left: 40, top: 70, padding: "10px 14px", boxShadow: "0 6px 24px rgba(0,0,0,0.08)" }}>
                      <span className="flex h-[8px] w-[8px] rounded-full bg-[#22C55E]" style={{ animation: "pulse-soft 2s ease-in-out infinite" }} />
                      <span className="text-[12px] font-semibold text-[#4c4c4c]">Inventario actualizado</span>
                    </div>
                  </div>
                ) : currentSub.panel === "pos-control-caja" ? (
                  /* POS — control de caja image + floating movement cards */
                  <div className="relative flex h-full items-center justify-center" style={{ padding: "16px 24px" }}>
                    {/* Natural ratio 909:1001 (near-square), object-contain so full image visible */}
                    <div className="relative h-[88%]" style={{ aspectRatio: "909 / 1001", filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.14))" }}>
                      <Image src="/img/pos-control-caja.svg" alt="Control de caja POS" fill className="object-contain" sizes="360px" />
                    </div>
                    {/* Floating: efectivo ingresado */}
                    <div className="absolute flex items-center gap-3 rounded-[12px] border border-black/[0.06] bg-white" style={{ left: 30, top: 70, padding: "12px 14px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", fontFamily: font }}>
                      <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[rgba(34,197,94,0.14)]">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 13V3M8 3L4 7M8 3L12 7" stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#828282]">Efectivo ingresado</p>
                        <p className="text-[16px] font-bold text-[#4c4c4c]">+$8,420.00</p>
                      </div>
                    </div>
                    {/* Floating: efectivo retirado */}
                    <div className="absolute flex items-center gap-3 rounded-[12px] border border-black/[0.06] bg-white" style={{ right: 30, bottom: 80, padding: "12px 14px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", fontFamily: font }}>
                      <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[rgba(219,59,43,0.12)]">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3V13M8 13L4 9M8 13L12 9" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#828282]">Efectivo retirado</p>
                        <p className="text-[16px] font-bold text-[#4c4c4c]">−$1,250.00</p>
                      </div>
                    </div>
                  </div>
                ) : currentSub.image ? (
                  <div className="relative h-full">
                    <Image src={currentSub.image} alt="" fill className="object-contain" sizes="600px" style={{ padding: "10px 80px 10px 80px" }} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {/* Floating cards INSIDE carousel wrapper so they move with the card */}
          <div key={`float-${activeTab}-${activeSubTab}`} className="hidden lg:block">
            <FloatingCards type={currentSub.floatingCards} />
          </div>
          </div>{/* /carousel animated wrapper */}
        </div>
      </div>
    </section>
  );
}
