"use client";

import { useState } from "react";
import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";

const HERO_BG =
  "radial-gradient(ellipse 86% 70% at 67% 32%, rgba(226,64,47,0.26) 0%, transparent 60%), radial-gradient(ellipse 60% 58% at 14% 22%, rgba(150,34,34,0.18) 0%, transparent 58%), radial-gradient(ellipse 50% 46% at 82% 84%, rgba(244,114,150,0.08) 0%, transparent 62%), radial-gradient(ellipse 60% 70% at -4% 88%, rgba(58,74,158,0.30) 0%, transparent 52%), radial-gradient(ellipse 42% 60% at 102% 10%, rgba(58,74,158,0.24) 0%, transparent 50%), linear-gradient(160deg, #2e1622 0%, #180b13 50%, #0d070b 100%)";

const VALUE_PROPS = [
  { t: "A tu medida", d: "Configuramos T1 según la operación y los volúmenes de tu empresa." },
  { t: "Mejores costos y comisiones", d: "Tarifas negociadas por volumen en pagos y envíos." },
  { t: "API de alta capacidad", d: "Hasta 10× de ancho de banda para integrar T1 con tus sistemas." },
  { t: "Asesoría y soporte prioritario", d: "Un equipo dedicado que te acompaña en la operación." },
];

const FIELD =
  "h-[50px] w-full rounded-[12px] bg-[#1D1D1D] px-4 font-inter text-[15px] text-white outline-none transition-shadow placeholder:text-[#8A8A8A] focus:ring-1 focus:ring-white/25";
const SELECT = `${FIELD} appearance-none pr-10`;
const LABEL = "mb-1.5 block font-inter text-[13px] font-medium text-white/70";

function Select({ label, opts, required }: { label: string; opts: string[]; required?: boolean }) {
  return (
    <label className="block">
      <span className={LABEL}>{label}{!required && <span className="text-white/35"> (opcional)</span>}</span>
      <div className="relative">
        <select required={required} defaultValue="" className={SELECT}>
          <option value="" disabled>Selecciona una opción</option>
          {opts.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/45"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    </label>
  );
}

function Text({ label, type = "text", required, placeholder }: { label: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <span className={LABEL}>{label}{!required && <span className="text-white/35"> (opcional)</span>}</span>
      <input type={type} required={required} placeholder={placeholder} className={FIELD} />
    </label>
  );
}

export default function T1ContactoVentas() {
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-black">
      <T1Navbar />

      <section className="relative px-5 pb-24 pt-[130px] tablet:px-10 tablet:pt-[150px]" style={{ background: HERO_BG }}>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0" style={{ height: "26%", background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 70%, #000 100%)" }} />

        <div className="relative z-10 mx-auto grid max-w-[var(--max-w)] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Left — pitch (compacto, fijo en desktop) */}
          <div className="lg:sticky lg:top-[112px] lg:self-start lg:pt-8">
            <h1 className="font-sora text-[28px] font-light text-white tablet:text-[38px]" style={{ letterSpacing: "-0.02em", lineHeight: 1.12, maxWidth: 420 }}>
              Una solución a la medida de tu empresa
            </h1>
            <p className="font-inter text-[15px] font-light text-white/65 tablet:text-[16px]" style={{ lineHeight: 1.55, marginTop: 16, maxWidth: 400 }}>
              Déjanos tus datos y un especialista de T1 se comunica contigo para conocer tu negocio y armar juntos la solución ideal.
            </p>

            <ul className="mt-8 flex flex-col gap-4" style={{ maxWidth: 420 }}>
              {VALUE_PROPS.map((v) => (
                <li key={v.t} className="flex items-center gap-3">
                  <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[rgba(219,59,43,0.14)]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="font-sora text-[16px] font-normal text-white">{v.t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form (fondo sólido) */}
          <div className="rounded-[24px] border border-white/[0.08] bg-[#121013] p-6 tablet:p-8" style={{ boxShadow: "0 30px 80px -30px rgba(0,0,0,0.7)" }}>
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#16A34A]">
                  <svg width="26" height="26" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <p className="font-sora text-[22px] font-light text-white">Solicitud enviada</p>
                <p className="mt-2 max-w-[340px] font-inter text-[15px] font-light text-white/60">Un experto de T1 te contacta en menos de 24 horas hábiles.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-4">
                <p className="font-sora text-[18px] font-normal text-white" style={{ marginBottom: 4 }}>Cuéntanos de tu empresa</p>

                <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
                  <Text label="Nombre completo" required />
                  <Text label="Teléfono" type="tel" required />
                </div>

                {/* Único campo full: correo */}
                <Text label="Correo electrónico" type="email" required />

                <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
                  <Text label="Nombre de la empresa" required />
                  <Text label="URL del sitio web" placeholder="https://" />
                </div>
                <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
                  <Text label="Giro de la empresa" required />
                  <Select label="Número de SKU" required opts={["0 – 100", "100 – 500", "500 – 1,000", "1,000+"]} />
                </div>
                <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
                  <Select label="Número de empleados" required opts={["1 – 10", "11 – 50", "51 – 200", "201 – 500", "500+"]} />
                  <Select label="Ventas mensuales" required opts={["$100K – $500K", "$500K – $1M", "$1M – $3M", "$3M – $5M", "$5M+ MXN"]} />
                </div>
                <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
                  <Select label="Marketplace objetivo" opts={["Amazon México", "Mercado Libre", "Liverpool", "Claroshop", "Walmart", "Shopify", "WooCommerce", "Otro"]} />
                  <Select label="Necesidades especiales" opts={["Integraciones personalizadas", "SLA garantizado", "Soporte dedicado", "Facturación especial", "Instancia dedicada"]} />
                </div>

                <button type="submit" className="mt-2 flex h-[52px] items-center justify-center rounded-[14px] bg-[#DB3B2B] font-inter text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-[#C0332A]">
                  Enviar solicitud
                </button>
                <p className="text-center font-inter text-[12px] font-light text-white/40">Te contactamos en menos de 24 horas hábiles.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <T1Footer />
    </main>
  );
}
