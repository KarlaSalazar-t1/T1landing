"use client";

import { useState } from "react";
import { ENVIOS_QUOTE_URL } from "@/lib/constants";

const ArrowRight = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* Tamaños de paquete con dimensiones y peso predeterminados. */
const SIZES = [
  { id: "pequeno", label: "Pequeño", dims: "20 × 15 × 10 cm", weight: "hasta 1 kg" },
  { id: "mediano", label: "Mediano", dims: "40 × 30 × 20 cm", weight: "hasta 5 kg" },
  { id: "grande", label: "Grande", dims: "60 × 40 × 40 cm", weight: "hasta 15 kg" },
];

/* Cotizador Desde/Hacia + tamaño de paquete (dimensiones y peso predeterminados). */
export default function T1EnviosCotizador() {
  const [cpDesde, setCpDesde] = useState("");
  const [cpHasta, setCpHasta] = useState("");
  const [size, setSize] = useState("mediano");
  const ok = cpDesde.trim().length > 0 && cpHasta.trim().length > 0;

  return (
    <div className="mx-auto w-full max-w-[440px] text-left tablet:max-w-[680px]">
      <div className="grid grid-cols-1 gap-3 tablet:grid-cols-2 tablet:items-stretch">
        {/* Origen / destino */}
        <div className="flex min-h-[172px] w-full flex-col justify-center rounded-[16px] bg-[#1D1D1D] px-4 py-2 transition-shadow focus-within:ring-1 focus-within:ring-white/25">
          <div className="flex gap-3.5">
            <div className="flex flex-col items-center self-stretch py-[22px]">
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
                <input value={cpDesde} onChange={(e) => setCpDesde(e.target.value.slice(0, 40))} placeholder="Código postal o colonia" aria-label="Origen del envío" className="mt-0.5 w-full bg-transparent font-inter text-[16px] text-white outline-none placeholder:text-[#8A8A8A]" />
              </label>
              <span className="block h-px w-full bg-white/10" />
              <label className="block py-4">
                <span className="font-inter text-[12px] font-normal text-white">Hacia</span>
                <input value={cpHasta} onChange={(e) => setCpHasta(e.target.value.slice(0, 40))} placeholder="Código postal o colonia" aria-label="Destino del envío" className="mt-0.5 w-full bg-transparent font-inter text-[16px] text-white outline-none placeholder:text-[#8A8A8A]" />
              </label>
            </div>
          </div>
        </div>

        {/* Tamaño del paquete — dimensiones y peso predeterminados */}
        <div className="flex min-h-[172px] w-full flex-col rounded-[16px] bg-[#1D1D1D] px-4 py-4">
          <p className="mb-2.5 font-inter text-[12px] font-medium text-white/55">Tamaño del paquete</p>
          <div className="grid grid-cols-3 gap-2 tablet:flex tablet:flex-1 tablet:flex-col">
            {SIZES.map((s) => {
              const on = size === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSize(s.id)}
                  className="flex flex-col items-start rounded-[12px] border px-3 py-2.5 text-left transition-colors tablet:flex-1 tablet:flex-row tablet:items-center tablet:justify-between"
                  style={{ borderColor: on ? "rgba(219,59,43,0.6)" : "rgba(255,255,255,0.12)", background: on ? "rgba(219,59,43,0.10)" : "rgba(255,255,255,0.03)" }}
                >
                  <span className="font-inter text-[13px] font-semibold text-white">{s.label}</span>
                  <span className="mt-1 tablet:mt-0 tablet:text-right">
                    <span className="block font-inter text-[10.5px] leading-tight text-white/55">{s.dims}</span>
                    <span className="block font-inter text-[10.5px] leading-tight text-white/45">{s.weight}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <a
        href={ENVIOS_QUOTE_URL}
        onClick={(e) => { if (!ok) e.preventDefault(); }}
        aria-disabled={!ok}
        className={`mt-3 flex h-[46px] w-full items-center justify-center gap-1.5 rounded-[16px] font-inter text-[14px] font-semibold no-underline transition-colors ${ok ? "bg-red-500 text-white hover:bg-red-600" : "bg-[#60160F] text-white/45"}`}
      >
        Cotiza gratis
        {ArrowRight}
      </a>
    </div>
  );
}
