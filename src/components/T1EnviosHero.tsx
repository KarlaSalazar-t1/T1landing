"use client";

import { useState } from "react";
import { ENVIOS_QUOTE_URL } from "@/lib/constants";

const PAQUETES = [
  { id: "sobre", label: "Sobre", ej: "Documentos" },
  { id: "pequeno", label: "Pequeño", ej: "Celular, accesorios" },
  { id: "mediano", label: "Mediano", ej: "Ropa, zapatos" },
  { id: "grande", label: "Grande", ej: "Electrodomésticos" },
];

const SOCIAL_PROOF = ["+40M de envíos", "+25,000 negocios", "+10 paqueterías"];

const FIELD = "w-full rounded-[14px] bg-[#1D1D1D] px-4 py-3 font-inter text-[16px] text-white outline-none placeholder:text-[#8A8A8A] focus:ring-1 focus:ring-white/20";
const ArrowRight = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function T1EnviosHero() {
  const [cpDesde, setCpDesde] = useState("");
  const [cpHasta, setCpHasta] = useState("");
  const [paquete, setPaquete] = useState("pequeno");
  const ok = cpDesde.trim().length > 0 && cpHasta.trim().length > 0 && paquete.length > 0;

  return (
    <div className="relative z-0">
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-5 pb-0 pt-24 tablet:min-h-screen tablet:px-6 tablet:pt-28 tablet:pb-0">
        {/* Fondo */}
        <div aria-hidden className="absolute inset-0 z-0" style={{ background: "linear-gradient(180deg, #141414 0%, #020101 100%)" }} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at 6% 102%, rgba(3,20,70,0.6) 0%, rgba(17,0,85,0) 26%), radial-gradient(circle at 79% 52%, rgba(112,10,10,0.95) 0%, rgba(87,9,9,0) 60%), radial-gradient(circle at -7% 48%, rgba(112,10,10,1) 0%, rgba(87,9,9,0) 60%)",
          }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden tablet:block" style={{ background: "linear-gradient(90deg, rgba(2,1,1,0.85) 0%, rgba(20,4,4,0.35) 12%, rgba(0,0,0,0) 26%, rgba(0,0,0,0) 74%, rgba(20,4,4,0.35) 88%, rgba(2,1,1,0.85) 100%)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden tablet:block" style={{ background: "radial-gradient(circle at 97% -2%, rgba(4,24,82,0.75) 0%, rgba(17,0,85,0) 27%)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[260px]" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(3,1,1,0.85) 55%, #000 100%)" }} />

        {/* Contenido */}
        <div className="relative z-10 flex w-full max-w-[440px] grow flex-col items-center tablet:max-w-[640px]">
          <h1 className="text-center font-sora text-[32px] font-light leading-[1.14] text-white tablet:text-[48px] desktop:text-[48px]" style={{ letterSpacing: "-0.03em" }}>
            Todos tus envíos,
            <br />
            un solo lugar.
          </h1>

          <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 py-6">
            <p className="max-w-[400px] text-center font-inter text-[16px] font-light leading-[1.6] text-white tablet:max-w-none">
              Cotiza, crea guías y rastrea con las mejores tarifas de +10 paqueterías.
            </p>

            {/* Cotizador */}
            <div className="w-full">
              <div className="flex items-end gap-2.5">
                <label className="flex-1">
                  <span className="mb-1.5 block px-1 font-inter text-[14px] font-light text-white/70">Código postal origen</span>
                  <input value={cpDesde} onChange={(e) => setCpDesde(e.target.value.replace(/[^\d]/g, "").slice(0, 5))} inputMode="numeric" placeholder="Ej. 06600" aria-label="Código postal de origen" className={`${FIELD} w-full`} />
                </label>
                <span aria-hidden className="shrink-0 pb-3 text-white/40">→</span>
                <label className="flex-1">
                  <span className="mb-1.5 block px-1 font-inter text-[14px] font-light text-white/70">Código postal destino</span>
                  <input value={cpHasta} onChange={(e) => setCpHasta(e.target.value.replace(/[^\d]/g, "").slice(0, 5))} inputMode="numeric" placeholder="Ej. 44100" aria-label="Código postal de destino" className={`${FIELD} w-full`} />
                </label>
              </div>

              <div className="mt-3">
                <p className="mb-2 font-inter text-[14px] font-light text-white/70">¿Qué tamaño es tu paquete?</p>
                <div className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 tablet:mx-0 tablet:grid tablet:grid-cols-4 tablet:overflow-visible tablet:px-0" style={{ scrollbarWidth: "none" }}>
                  {PAQUETES.map((p) => {
                    const sel = paquete === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={(e) => { setPaquete(p.id); e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" }); }}
                        className={`flex w-[142px] shrink-0 flex-col items-start rounded-[12px] border-[1.5px] px-3.5 py-2 text-left transition-colors tablet:w-auto ${sel ? "border-[rgba(231,231,231,0.2)] bg-[rgba(255,255,255,0.12)]" : "border-white/10 bg-[#1D1D1D] hover:border-white/25"}`}
                      >
                        <span className="whitespace-nowrap font-inter text-[14px] font-medium text-white">{p.label}</span>
                        <span className="whitespace-nowrap font-inter text-[12px] font-light text-white/55">{p.ej}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <a
                href={ENVIOS_QUOTE_URL}
                onClick={(e) => { if (!ok) e.preventDefault(); }}
                aria-disabled={!ok}
                className={`mt-4 flex h-[46px] items-center justify-center gap-1.5 rounded-[16px] font-inter text-[14px] font-semibold no-underline transition-colors ${ok ? "bg-red-500 text-white hover:bg-red-600" : "bg-[#60160F] text-white/45"}`}
              >
                Cotizar envío
                {ArrowRight}
              </a>
            </div>
          </div>

          {/* Social proof */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-2 text-center tablet:mb-14">
            {SOCIAL_PROOF.map((s, i) => (
              <span key={s} className="flex items-center gap-2.5 font-inter text-[16px] font-medium text-white">
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
