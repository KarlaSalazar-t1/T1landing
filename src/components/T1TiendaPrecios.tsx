"use client";

import { Fragment, useState } from "react";
import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import { SIGNUP_URL, SALES_URL } from "@/lib/constants";

const HERO_BG =
  "radial-gradient(ellipse 86% 70% at 67% 32%, rgba(226,64,47,0.26) 0%, transparent 60%), radial-gradient(ellipse 60% 58% at 14% 22%, rgba(150,34,34,0.18) 0%, transparent 58%), radial-gradient(ellipse 50% 46% at 82% 84%, rgba(244,114,150,0.08) 0%, transparent 62%), radial-gradient(ellipse 60% 70% at -4% 88%, rgba(58,74,158,0.30) 0%, transparent 52%), radial-gradient(ellipse 42% 60% at 102% 10%, rgba(58,74,158,0.24) 0%, transparent 50%), linear-gradient(160deg, #2e1622 0%, #180b13 50%, #0d070b 100%)";

const IA_PURPLE = "#A78BFA";

const IaStar = ({ color = IA_PURPLE }: { color?: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path d="M12 2.5l1.9 5.1a4 4 0 0 0 2.5 2.5l5.1 1.9-5.1 1.9a4 4 0 0 0-2.5 2.5L12 21.5l-1.9-5.1a4 4 0 0 0-2.5-2.5L2.5 12l5.1-1.9a4 4 0 0 0 2.5-2.5L12 2.5z" fill={color} />
  </svg>
);

type Plan = {
  name: string; tagline: string; monthly: number | null; annual: number | null;
  custom?: boolean; featured?: boolean; ia: string; features: string[]; cta: string; href: string;
};

/* Planes — Fase México (Definición v2.2 / Tabla v5.1). El plan gratuito ya
   transacciona y tiene tienda en línea. Créditos: 50/500/5,000 al mes
   (5 créditos por imagen). "Pausa", nunca "bloqueo". */
const PLANS: Plan[] = [
  {
    name: "Gratuito", tagline: "Para vender en línea desde hoy, para siempre", monthly: 0, annual: 0,
    ia: "50 créditos IA al mes",
    features: [
      "Tienda en línea con 30 pedidos al mes",
      "Productos ilimitados · 500 publicados",
      "500 clientes · 25 facturas al mes",
      "POS Lite · 1 sucursal · 1 empleado",
      "Chat AI ilimitado (10 análisis al día)",
      "Vende en Sears, Sanborns y +10 canales",
      "1 plantilla · subdominio T1",
    ],
    cta: "Comienza gratis", href: SIGNUP_URL,
  },
  {
    name: "Básico", tagline: "Para nuevos vendedores en línea", monthly: 399, annual: 332.5, featured: true,
    ia: "500 créditos IA al mes",
    features: [
      "Todo lo del plan Gratuito, más:",
      "500 pedidos al mes · adicionales a $8 c/u",
      "Facturas ilimitadas + autofacturación",
      "Productos publicados y clientes ilimitados",
      "Hasta 3 sucursales · 9 empleados POS",
      "Dominio propio + SSL · 5 plantillas",
      "Cupones, descuentos y carrito abandonado",
      "Chat AI: 100 análisis al día",
    ],
    cta: "Comienza gratis", href: SIGNUP_URL,
  },
  {
    name: "Avanzado", tagline: "Para equipos en crecimiento", monthly: 1499, annual: 1249.17,
    ia: "5,000 créditos IA al mes",
    features: [
      "Todo lo del plan Básico, más:",
      "5,000 pedidos al mes · adicionales a $5 c/u",
      "Hasta 10 sucursales · 30 empleados POS",
      "15 plantillas de diseño",
      "Protección contra bots (Bot Manager)",
      "Chat AI: 250 análisis al día · historial ilimitado",
    ],
    cta: "Comienza gratis", href: SIGNUP_URL,
  },
  {
    name: "Enterprise", tagline: "A la medida de tu empresa", monthly: null, annual: null, custom: true,
    ia: "Créditos IA a tu medida",
    features: [
      "Todo lo del plan Avanzado, más:",
      "Sucursales y usuarios ilimitados",
      "Integraciones avanzadas",
      "Tarifas negociadas por volumen",
      "Asesoría y soporte dedicado",
    ],
    cta: "Agenda una llamada", href: SALES_URL,
  },
];

/* Tabla extendida — por sección (Definición v2.2 / Tabla v5.1).
   Orden de columnas: Gratuito, Básico, Avanzado, Enterprise. */
const COMPARE: { section: string; rows: { label: string; v: (boolean | string)[]; note?: string }[] }[] = [
  {
    section: "Precios",
    rows: [
      { label: "Precio mensual", v: ["Gratis", "$399", "$1,499", "A tu medida"] },
      { label: "Precio anual (al mes)", v: ["Gratis", "$332.50", "$1,249.17", "A tu medida"] },
      { label: "Créditos IA al mes", v: ["50", "500", "5,000", "A tu medida"], note: "Cada imagen generada usa 5 créditos. Se renuevan cada mes y no son acumulables." },
    ],
  },
  {
    section: "Pedidos",
    rows: [
      { label: "Pedidos de tienda en línea al mes", v: ["30", "500", "5,000", "A tu medida"], note: "Al llegar al límite, el checkout se pausa: tu tienda sigue visible y tus demás canales activos; se reanuda el día 1 o al cambiar de plan." },
      { label: "Pedido adicional", v: [false, "$8", "$5", "A tu medida"] },
      { label: "Pedidos por POS, marketplaces y links de pago", v: ["Ilimitados", "Ilimitados", "Ilimitados", "Ilimitados"] },
    ],
  },
  {
    section: "Comisiones",
    rows: [
      { label: "Con T1 Pagos", v: ["3.5% + $1", "3.5% + $1", "3.5% + $1", "3.5% + $1"] },
      { label: "Métodos externos (PayPal, Oxxo Pay)", v: ["No disponible", "2% por orden", "2% por orden", "Negociable"] },
    ],
  },
  {
    section: "Tienda en línea",
    rows: [
      { label: "Tienda en línea con checkout", v: [true, true, true, true] },
      { label: "Dominio", v: ["Subdominio T1", "Propio + SSL", "Propio + SSL", "Propio + SSL"] },
      { label: "Plantillas de diseño", v: ["1", "5", "15", "Todas"] },
      { label: "Reportes avanzados, SEO y redes", v: [false, true, true, true] },
      { label: "Burbuja de WhatsApp, T&C y editor de diseño", v: [false, true, true, true] },
    ],
  },
  {
    section: "Gestión de productos",
    rows: [
      { label: "Productos en catálogo y marketplaces", v: ["Ilimitados", "Ilimitados", "Ilimitados", "Ilimitados"] },
      { label: "Publicados en tu tienda y POS", v: ["500", "Ilimitados", "Ilimitados", "Ilimitados"], note: "La base y la publicación a Sears/Sanborns no tienen límite." },
      { label: "Sucursales", v: ["1", "3", "10", "Ilimitadas"] },
      { label: "Inventario, precios, carga masiva y reporte de ventas", v: [true, true, true, true] },
    ],
  },
  {
    section: "Gestión de clientes",
    rows: [
      { label: "Clientes", v: ["500", "Ilimitados", "Ilimitados", "Ilimitados"] },
      { label: "Carrito abandonado, cupones y descuentos", v: [false, true, true, true] },
    ],
  },
  {
    section: "Facturación",
    rows: [
      { label: "Facturas al mes", v: ["25", "Ilimitadas", "Ilimitadas", "Ilimitadas"] },
      { label: "Autofacturación por canal de venta", v: [false, true, true, true] },
    ],
  },
  {
    section: "Punto de venta",
    rows: [
      { label: "POS Lite", v: [true, true, true, true] },
      { label: "Empleados POS", v: ["1", "9", "30", "Ilimitados"] },
      { label: "Pedidos por POS", v: ["Ilimitados", "Ilimitados", "Ilimitados", "Ilimitados"] },
    ],
  },
  {
    section: "Chat AI",
    rows: [
      { label: "Conversación y soporte", v: ["Ilimitados", "Ilimitados", "Ilimitados", "Ilimitados"] },
      { label: "Análisis de archivos al día", v: ["10", "100", "250", "A tu medida"] },
      { label: "Archivos por mensaje", v: ["5", "10", "10", "10"] },
      { label: "Historial", v: ["30 días", "12 meses", "Ilimitado", "Ilimitado"] },
      { label: "Memoria del negocio", v: [true, true, true, true] },
      { label: "Hablar con una persona", v: [true, true, true, true] },
    ],
  },
  {
    section: "Funcionalidad con IA",
    rows: [
      { label: "Creación de tienda y de página con IA", v: [true, true, true, true] },
      { label: "Secciones, textos e imágenes con IA", v: [true, true, true, true], note: "Utiliza créditos IA." },
      { label: "Mejora de descripciones y detección de categoría", v: [true, true, true, true] },
    ],
  },
  {
    section: "Canales, administración y seguridad",
    rows: [
      { label: "Vende en Sears y Sanborns", v: [true, true, true, true] },
      { label: "Gestión en +10 canales (OMS) y links de pago", v: [true, true, true, true] },
      { label: "Usuarios administradores ilimitados", v: [true, true, true, true] },
      { label: "Protección contra bots (Bot Manager)", v: [false, false, true, true] },
    ],
  },
];

function fmtPrice(n: number) {
  return n % 1 === 0
    ? n.toLocaleString("es-MX")
    : n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function Cell({ val }: { val: boolean | string }) {
  if (val === true) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mx-auto"><path d="M5 12L10 17L19 7" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (val === false) return <span className="text-white/25">—</span>;
  return <span className="font-inter text-[13px] text-white/80">{val}</span>;
}

export default function T1TiendaPrecios() {
  const [annual, setAnnual] = useState(false);

  return (
    <main className="min-h-screen bg-black">
      <T1Navbar product="tienda" pageType="sublanding" />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-20 pt-[130px] text-center tablet:px-10 tablet:pt-[150px]" style={{ background: HERO_BG }}>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0" style={{ height: 200, background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 55%, #000 100%)" }} />

        <div className="relative z-10 mx-auto max-w-[900px]">
          <h1 className="font-sora text-[34px] font-light text-white tablet:whitespace-nowrap tablet:text-[52px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.08 }}>
            El plan perfecto para tu negocio
          </h1>
          <p className="mx-auto font-inter text-[16px] font-light text-white/70 tablet:text-[18px]" style={{ lineHeight: 1.55, marginTop: 18, maxWidth: 560 }}>
            Desde emprendedores hasta grandes empresas.
          </p>

          {/* Toggle mensual/anual */}
          <div className="mt-9 flex justify-center">
            <div className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/[0.05] p-1">
              <button type="button" onClick={() => setAnnual(false)} className={`rounded-full px-5 py-2 font-inter text-[14px] font-semibold transition-colors ${!annual ? "bg-white text-black" : "text-white/70 hover:text-white"}`}>
                Mensual
              </button>
              <button type="button" onClick={() => setAnnual(true)} className={`rounded-full px-5 py-2 font-inter text-[14px] font-semibold transition-colors ${annual ? "bg-white text-black" : "text-white/70 hover:text-white"}`}>
                Anual <span className={annual ? "text-[#16A34A]" : "text-[#22C55E]"}>· 2 meses gratis</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Planes */}
      <section className="relative bg-black px-5 pb-[100px] tablet:px-10">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-stretch gap-4 tablet:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {PLANS.map((p) => {
            const price = annual ? p.annual : p.monthly;
            const redBtn = p.name !== "Gratuito";
            return (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-[22px] border p-7 ${p.featured ? "border-white/[0.12] bg-[#181117]" : "border-white/[0.10] bg-[#141215]"}`}
                style={p.featured ? { boxShadow: "0 8px 55px -6px rgba(219,59,43,0.42)" } : undefined}
              >
                {p.featured && (
                  <span className="absolute right-6 top-7 rounded-full bg-[#DB3B2B] px-2.5 py-1 font-inter text-[10px] font-bold text-white">Recomendado</span>
                )}
                <p className="font-sora text-[20px] font-medium text-white">{p.name}</p>
                <p className="mt-1 overflow-hidden font-inter text-[13px] font-light text-white/55" style={{ height: 38, lineHeight: 1.35 }}>{p.tagline}</p>

                <div className="mt-5 flex items-end gap-1.5" style={{ minHeight: 56 }}>
                  {p.custom ? (
                    <span className="font-sora text-[30px] font-light text-white" style={{ letterSpacing: "-0.02em", lineHeight: 1 }}>A tu medida</span>
                  ) : price === 0 ? (
                    <span className="font-sora text-[44px] font-light text-white" style={{ letterSpacing: "-0.02em", lineHeight: 1 }}>Gratis</span>
                  ) : (
                    <>
                      <span className="font-sora text-[44px] font-light text-white" style={{ letterSpacing: "-0.02em", lineHeight: 1 }}>${fmtPrice(price as number)}</span>
                      <span className="mb-1.5 font-inter text-[13px] font-light text-white/50">MXN / mes</span>
                    </>
                  )}
                </div>

                <a href={p.href} className={`mt-6 flex h-[46px] items-center justify-center rounded-[12px] font-inter text-[14px] font-semibold no-underline transition-colors duration-150 ${redBtn ? "bg-[#DB3B2B] text-white hover:bg-[#C0332A]" : "border border-white/20 text-white hover:border-white/40 hover:bg-white/[0.05]"}`}>
                  {p.cta}
                </a>

                <p className="mt-6 flex items-center gap-1.5 font-inter text-[12px] font-semibold uppercase tracking-[0.05em]" style={{ color: IA_PURPLE, marginBottom: 4 }}>
                  <IaStar />
                  {p.ia}
                </p>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 font-inter text-[13.5px] font-light text-white/75">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0"><path d="M5 12L10 17L19 7" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Comisiones de tarjeta */}
        <div className="mx-auto mt-8 flex max-w-[1120px] flex-col items-start gap-3 rounded-[18px] border border-white/[0.08] bg-white/[0.03] p-6 tablet:flex-row tablet:items-center tablet:justify-between tablet:p-7">
          <div>
            <p className="font-sora text-[16px] font-medium text-white">Comisión por transacción</p>
            <p className="mt-1 font-inter text-[14px] font-light text-white/60">Cobra en todos los planes con T1 Pagos, incluido el Gratuito.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <span className="font-inter text-[14px] text-white/85"><span className="font-sora text-[22px] font-light text-white">3.5% + $1</span> <span className="text-white/55">con T1 Pagos</span></span>
            <span className="font-inter text-[14px] text-white/85"><span className="font-sora text-[22px] font-light text-white">2%</span> <span className="text-white/55">métodos externos (desde Básico)</span></span>
          </div>
        </div>

        <p className="mx-auto mt-4 max-w-[1120px] font-inter text-[12px] font-light text-white/40">*MXN, IVA no incluido.</p>
      </section>

      {/* Comparativa completa */}
      <section className="relative bg-[#0e0d0d] px-5 py-[90px] tablet:px-10 tablet:py-[120px]">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-center font-sora text-[28px] font-light text-white tablet:text-[40px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 44 }}>
            Compara todos los planes
          </h2>

          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="sticky left-0 z-[1] bg-[#0e0d0d] pb-4 pr-4" />
                  {PLANS.map((p) => (
                    <th key={p.name} className="px-3 pb-4 text-center">
                      <span className="block font-sora text-[16px] font-medium text-white">{p.name}</span>
                      {p.featured && <span className="mx-auto mt-1.5 block w-fit rounded-full bg-[#DB3B2B] px-2.5 py-1 font-inter text-[10px] font-bold text-white">Recomendado</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((sec) => (
                  <Fragment key={sec.section}>
                    <tr>
                      <td colSpan={PLANS.length + 1} className="sticky left-0 bg-[#0e0d0d] pb-2 pt-8 font-sora text-[13px] font-semibold uppercase tracking-[0.08em] text-white">
                        {sec.section}
                      </td>
                    </tr>
                    {sec.rows.map((row) => (
                      <tr key={sec.section + row.label} className="border-t border-white/[0.07]">
                        <td className="sticky left-0 z-[1] bg-[#0e0d0d] py-3.5 pr-4 align-top font-inter text-[14px] font-light text-white/75">
                          {row.label}
                          {row.note && <span className="mt-1 block max-w-[300px] font-inter text-[11.5px] font-light leading-snug text-white/55">{row.note}</span>}
                        </td>
                        {row.v.map((val, i) => (
                          <td key={i} className={`px-3 py-3.5 text-center align-top ${PLANS[i].featured ? "bg-white/[0.02]" : ""}`}>
                            <Cell val={val} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 font-inter text-[12px] font-light text-white/40">
            *MXN, IVA no incluido. Los créditos de IA y los límites por plan se renuevan cada mes; consulta las condiciones vigentes al contratar.
          </p>
        </div>
      </section>

      <T1Footer />
    </main>
  );
}
