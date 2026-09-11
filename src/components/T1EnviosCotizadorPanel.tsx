"use client";

import { useEffect, useRef, useState } from "react";
import { ENVIOS_QUOTE_URL, ENVIOS_RATE_EXAMPLES } from "@/lib/constants";
import { track } from "@/lib/analytics";

/* Cotizador funcional del hero de Envíos. Card sólida elevada con campos en caja
   (no underline). Es un <form method="get"> nativo hacia /envios/cotizar: el click
   nunca muere (Opción B) — valida y navega con los valores precargados.
   La tarifa de ejemplo va como elemento SEPARADO arriba del panel. */

const ArrowRight = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* Tarifa de ejemplo — SEPARADA del formulario. */
function RateExample() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ENVIOS_RATE_EXAMPLES.length), 3200);
    return () => clearInterval(t);
  }, []);
  const r = ENVIOS_RATE_EXAMPLES[i];
  return (
    <div key={i} className="mb-2.5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-center" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
      <span className="flex items-center gap-1.5 font-inter text-[11.5px] font-medium text-white/75">
        {r.from}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#E2604C]"><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        {r.to}
      </span>
      <span className="font-inter text-[11px] text-white/50">desde</span>
      <span className="font-inter text-[12.5px] font-bold text-white">${r.price}</span>
      <span className="font-inter text-[10.5px] text-white/45">guía de 1 kg</span>
    </div>
  );
}

function Field({ name, label, unit, placeholder, maxLength, required, pattern, className = "" }: { name: string; label: string; unit?: string; placeholder: string; maxLength?: number; required?: boolean; pattern?: string; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block truncate font-inter text-[11.5px] font-medium text-white/75">{label}</span>
      <div className="flex items-baseline gap-1 border-b border-white/25 pb-1 transition-colors focus-within:border-[#E2604C]">
        <input
          name={name}
          required={required}
          inputMode="numeric"
          pattern={pattern}
          maxLength={maxLength}
          placeholder={placeholder}
          aria-label={label}
          className="min-w-0 flex-1 bg-transparent font-inter text-[15px] text-white outline-none placeholder:text-white/45"
        />
        {unit && <span className="shrink-0 font-inter text-[11px] text-white/45">{unit}</span>}
      </div>
    </label>
  );
}

export default function T1EnviosCotizadorPanel() {
  const started = useRef(false);
  const [valid, setValid] = useState(false);
  const onFirstFocus = () => {
    if (started.current) return;
    started.current = true;
    track("cotizador_start", { cta_section: "hero" });
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const f = new FormData(e.currentTarget);
    track("cotizador_submit", {
      cp_origen: f.get("cp_origen"),
      cp_destino: f.get("cp_destino"),
      con_medidas: !!(f.get("largo") && f.get("alto") && f.get("ancho") && f.get("peso")),
    });
    // El form navega por sí solo (method=get) a ENVIOS_QUOTE_URL con los valores.
  };

  return (
    <div className="w-full">
      <RateExample />
      <form
        action={ENVIOS_QUOTE_URL}
        method="get"
        onSubmit={onSubmit}
        onFocusCapture={onFirstFocus}
        onInput={(e) => setValid(e.currentTarget.checkValidity())}
        className="w-full overflow-hidden rounded-[16px] bg-[#1D1D1D] p-4 text-left tablet:p-6"
        style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.30)" }}
      >
        {/* CP origen / destino — 2 columnas */}
        <div className="grid grid-cols-2 gap-x-3.5 gap-y-3.5 tablet:gap-x-4">
          <Field name="cp_origen" label="CP Origen" placeholder="00000" maxLength={5} required pattern="\d{5}" />
          <Field name="cp_destino" label="CP Destino" placeholder="00000" maxLength={5} required pattern="\d{5}" />
        </div>
        {/* Largo / Alto / Ancho / Peso — 1 fila */}
        <div className="mt-3.5 grid grid-cols-4 gap-x-2.5 tablet:mt-4 tablet:gap-x-3">
          <Field name="largo" label="Largo" unit="cm" placeholder="0" maxLength={3} required pattern="\d+" />
          <Field name="alto" label="Alto" unit="cm" placeholder="0" maxLength={3} required pattern="\d+" />
          <Field name="ancho" label="Ancho" unit="cm" placeholder="0" maxLength={3} required pattern="\d+" />
          <Field name="peso" label="Peso" unit="kg" placeholder="0" maxLength={4} required pattern="\d+" />
        </div>

        <button type="submit" disabled={!valid} className={`mt-5 flex h-[48px] w-full items-center justify-center gap-1.5 rounded-[12px] font-inter text-[14px] font-semibold transition-colors tablet:mt-6 tablet:h-[52px] tablet:text-[15px] ${valid ? "bg-red-500 text-white hover:bg-red-600" : "cursor-not-allowed bg-[#60160F] text-white/45"}`}>
          Cotizar
          {ArrowRight}
        </button>
      </form>
    </div>
  );
}
