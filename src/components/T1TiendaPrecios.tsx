"use client";

import { useState } from "react";
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

const PLANS: Plan[] = [
  {
    name: "Gratuito", tagline: "Para empezar a vender hoy", monthly: 0, annual: 0, ia: "50 créditos IA al mes",
    features: ["Tienda en línea con IA", "Acepta pagos y crea envíos", "1 sucursal", "Plantillas base de diseño", "Conecta tus redes sociales"],
    cta: "Comienza gratis", href: SIGNUP_URL,
  },
  {
    name: "Básico", tagline: "Para nuevos vendedores en línea", monthly: 399, annual: 332, featured: true, ia: "500 créditos IA al mes",
    features: ["Todo lo del plan Gratuito", "Personaliza el diseño de tu tienda", "Hasta 3 sucursales", "5 plantillas de diseño", "Creación de cupones", "Dominio propio", "Protección contra bots"],
    cta: "Comienza gratis", href: SIGNUP_URL,
  },
  {
    name: "Avanzado", tagline: "Para negocios en crecimiento", monthly: 899, annual: 749, ia: "2,000 créditos IA al mes",
    features: ["Todo lo del plan Básico", "Hasta 10 sucursales", "Todas las plantillas de diseño", "Reportes y analítica avanzada", "Carrito abandonado", "Soporte prioritario"],
    cta: "Comienza gratis", href: SIGNUP_URL,
  },
  {
    name: "Enterprise", tagline: "A la medida de tu empresa", monthly: null, annual: null, custom: true, ia: "Créditos IA a tu medida",
    features: ["Todo lo del plan Avanzado", "Sucursales y usuarios ilimitados", "Integraciones avanzadas y API 10×", "Tarifas negociadas por volumen", "Asesoría y soporte dedicado"],
    cta: "Agenda una llamada", href: SALES_URL,
  },
];

/* Comparison table: value is true (✓), false (—), or a literal string. */
const COMPARE: { label: string; v: (boolean | string)[] }[] = [
  { label: "Créditos IA al mes", v: ["50", "500", "2,000", "A tu medida"] },
  { label: "Sucursales", v: ["1", "3", "10", "Ilimitadas"] },
  { label: "Plantillas de diseño", v: ["Base", "5", "Todas", "Todas"] },
  { label: "Tienda en línea con IA", v: [true, true, true, true] },
  { label: "Pagos y envíos integrados", v: [true, true, true, true] },
  { label: "Conecta tus redes sociales", v: [true, true, true, true] },
  { label: "Personaliza el diseño", v: [false, true, true, true] },
  { label: "Creación de cupones", v: [false, true, true, true] },
  { label: "Dominio propio", v: [false, true, true, true] },
  { label: "Protección contra bots", v: [false, true, true, true] },
  { label: "Reportes y analítica avanzada", v: [false, false, true, true] },
  { label: "Carrito abandonado", v: [false, false, true, true] },
  { label: "Integraciones avanzadas y API 10×", v: [false, false, false, true] },
  { label: "Tarifas negociadas por volumen", v: [false, false, false, true] },
  { label: "Soporte", v: ["Estándar", "Estándar", "Prioritario", "Dedicado"] },
];

function Cell({ val }: { val: boolean | string }) {
  if (val === true) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mx-auto"><path d="M5 12L10 17L19 7" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (val === false) return <span className="text-white/25">—</span>;
  return <span className="font-inter text-[13px] text-white/80">{val}</span>;
}

export default function T1TiendaPrecios() {
  const [annual, setAnnual] = useState(false);

  return (
    <main className="min-h-screen bg-black">
      <T1Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-20 pt-[130px] text-center tablet:px-10 tablet:pt-[150px]" style={{ background: HERO_BG }}>
        {/* Fade suave hacia el negro de la sección de planes */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0" style={{ height: 200, background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 55%, #000 100%)" }} />

        <div className="relative z-10 mx-auto max-w-[720px]">
          <h1 className="font-sora text-[34px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.08 }}>
            Elige el plan perfecto para tu negocio
          </h1>
          <p className="mx-auto font-inter text-[16px] font-light text-white/70 tablet:text-[18px]" style={{ lineHeight: 1.55, marginTop: 18, maxWidth: 560 }}>
            Desde emprendedores hasta grandes empresas, tienes un plan para vender, cobrar y enviar a tu escala.
          </p>

          {/* Toggle mensual/anual + chip verde */}
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
                className={`relative flex flex-col rounded-[22px] p-7 ${p.featured ? "border border-[rgba(219,59,43,0.45)] bg-[#181117]" : "border border-white/[0.10] bg-[#141215]"}`}
                style={p.featured ? { boxShadow: "0 24px 60px -30px rgba(219,59,43,0.30)" } : undefined}
              >
                {p.featured && (
                  <span className="absolute right-6 top-7 rounded-full bg-[#DB3B2B] px-2.5 py-1 font-inter text-[10px] font-bold text-white">Recomendado</span>
                )}
                <p className="font-sora text-[20px] font-medium text-white">{p.name}</p>
                <p className="mt-1 font-inter text-[13px] font-light text-white/55" style={{ minHeight: 36 }}>{p.tagline}</p>

                <div className="mt-5 flex items-end gap-1.5" style={{ minHeight: 56 }}>
                  {p.custom ? (
                    <span className="font-sora text-[30px] font-light text-white" style={{ letterSpacing: "-0.02em", lineHeight: 1 }}>A tu medida</span>
                  ) : (
                    <>
                      <span className="font-sora text-[44px] font-light text-white" style={{ letterSpacing: "-0.02em", lineHeight: 1 }}>${price}</span>
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
            <p className="font-sora text-[16px] font-medium text-white">Tarifa de tarjeta por transacción</p>
            <p className="mt-1 font-inter text-[14px] font-light text-white/60">Aplica a todos los planes. Cobra con T1 Pagos o conecta tu propio proveedor.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <span className="font-inter text-[14px] text-white/85"><span className="font-sora text-[22px] font-light text-white">3.5% + $1</span> <span className="text-white/55">con T1 Pagos</span></span>
            <span className="font-inter text-[14px] text-white/85"><span className="font-sora text-[22px] font-light text-white">2%</span> <span className="text-white/55">con proveedor externo</span></span>
          </div>
        </div>
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
                      <span className="font-sora text-[16px] font-medium text-white">{p.name}</span>
                      {p.featured && <span className="mt-1 block font-inter text-[10px] font-semibold uppercase tracking-wide text-[#22C55E]">Recomendado</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.label} className="border-t border-white/[0.07]">
                    <td className="sticky left-0 z-[1] bg-[#0e0d0d] py-3.5 pr-4 font-inter text-[14px] font-light text-white/75">{row.label}</td>
                    {row.v.map((val, i) => (
                      <td key={i} className={`px-3 py-3.5 text-center ${PLANS[i].featured ? "bg-white/[0.02]" : ""}`}>
                        <Cell val={val} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 font-inter text-[12px] font-light text-white/40">
            Precios en MXN sin IVA. Los créditos de IA y los límites por plan pueden actualizarse; consulta las condiciones vigentes al contratar.
          </p>
        </div>
      </section>

      <T1Footer />
    </main>
  );
}
