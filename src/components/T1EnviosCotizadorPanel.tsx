"use client";

import { useEffect, useRef, useState } from "react";
import { ENVIOS_QUOTE_URL, ENVIOS_RATE_EXAMPLES } from "@/lib/constants";
import { track } from "@/lib/analytics";

/* Cotizador funcional del hero de Envíos (CAMBIO 1) — estilo oscuro, coherente
   con el cotizador del landing T1. Campos reales del cotizador de producto (sin
   presets). Es un <form method="get"> nativo hacia /envios/cotizar: el click
   nunca muere (Opción B) — valida y navega con los valores precargados.
   La tarifa de ejemplo (ahorro) va como elemento SEPARADO arriba del panel,
   para no mezclarla con los campos que llena el usuario. */

const ArrowRight = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* Tarifa de ejemplo con ancla de ahorro — SEPARADA del formulario (CAMBIO 1b/1c). */
function RateExample() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ENVIOS_RATE_EXAMPLES.length), 3200);
    return () => clearInterval(t);
  }, []);
  const r = ENVIOS_RATE_EXAMPLES[i];
  const ahorro = r.market - r.price;
  return (
    <div key={i} className="mb-2.5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-center" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
      <span className="flex items-center gap-1.5 font-inter text-[11.5px] font-medium text-white/70">
        {r.from}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#E2604C]"><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        {r.to}
      </span>
      <span className="font-inter text-[11px] text-white/35 line-through">${r.market}</span>
      <span className="font-inter text-[12.5px] font-bold text-white">${r.price}</span>
      <span className="rounded-full bg-[rgba(74,222,128,0.14)] px-2 py-0.5 font-inter text-[10.5px] font-semibold text-[#4ADE80]">Ahorras ${ahorro}</span>
    </div>
  );
}

function Field({ name, label, unit, placeholder, maxLength, required, pattern, className = "" }: { name: string; label: string; unit?: string; placeholder: string; maxLength?: number; required?: boolean; pattern?: string; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block truncate font-inter text-[10.5px] font-medium text-white/50">{label}</span>
      <div className="flex items-baseline gap-1 border-b border-white/15 pb-1 transition-colors focus-within:border-[#DB3B2B]">
        <input
          name={name}
          required={required}
          inputMode="numeric"
          pattern={pattern}
          maxLength={maxLength}
          placeholder={placeholder}
          aria-label={label}
          className="min-w-0 flex-1 bg-transparent font-inter text-[14px] text-white outline-none placeholder:text-white/25"
        />
        {unit && <span className="shrink-0 font-inter text-[10.5px] text-white/35">{unit}</span>}
      </div>
    </label>
  );
}

export default function T1EnviosCotizadorPanel() {
  const started = useRef(false);
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
        className="w-full overflow-hidden rounded-[18px] border border-white/[0.1] bg-[#17141a] p-4 text-left tablet:p-6"
        style={{ boxShadow: "0 30px 70px rgba(0,0,0,0.45)" }}
      >
        <div className="mb-4 tablet:mb-5">
          <p className="font-sora text-[16px] font-semibold text-white tablet:text-[19px]">Cotiza ahora</p>
          {/* Subtítulo oculto en móvil para aligerar la primera vista */}
          <p className="mt-0.5 hidden font-inter text-[12.5px] text-white/45 tablet:block">Compara +10 paqueterías en segundos</p>
        </div>

        {/* CP origen / destino — 2 columnas */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 tablet:gap-x-5">
          <Field name="cp_origen" label="CP Origen" placeholder="00000" maxLength={5} required pattern="\d{5}" />
          <Field name="cp_destino" label="CP Destino" placeholder="00000" maxLength={5} required pattern="\d{5}" />
        </div>
        {/* Largo / Alto / Ancho / Peso — 1 fila (opcionales; se arrastran si se llenan) */}
        <div className="mt-4 grid grid-cols-4 gap-x-3 tablet:mt-5 tablet:gap-x-4">
          <Field name="largo" label="Largo" unit="cm" placeholder="0" maxLength={3} pattern="\d*" />
          <Field name="alto" label="Alto" unit="cm" placeholder="0" maxLength={3} pattern="\d*" />
          <Field name="ancho" label="Ancho" unit="cm" placeholder="0" maxLength={3} pattern="\d*" />
          <Field name="peso" label="Peso" unit="kg" placeholder="0" maxLength={4} pattern="\d*" />
        </div>

        <button type="submit" className="mt-5 flex h-[48px] w-full items-center justify-center gap-1.5 rounded-[12px] bg-red-500 font-inter text-[14px] font-semibold text-white transition-colors hover:bg-red-600 tablet:mt-6 tablet:h-[52px] tablet:text-[15px]">
          Cotizar
          {ArrowRight}
        </button>
      </form>
    </div>
  );
}
