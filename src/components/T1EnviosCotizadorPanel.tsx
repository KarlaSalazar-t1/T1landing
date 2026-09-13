"use client";

import { useRef, useState } from "react";
import { ENVIOS_QUOTE_URL } from "@/lib/constants";
import { track } from "@/lib/analytics";

/* Cotizador funcional del hero de Envíos. Card sólida elevada con campos en caja
   (no underline). Es un <form method="get"> nativo hacia /envios/cotizar: el click
   nunca muere (Opción B) — valida y navega con los valores precargados.
   La tarifa de ejemplo va como elemento SEPARADO arriba del panel. */

const ArrowRight = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* Shortcuts: prellenan el cotizador (CP + medidas + peso) para quitar fricción. */
type Shortcut = { label: string; cp_origen: string; cp_destino: string; peso: string; largo: string; alto: string; ancho: string };
const SHORTCUTS: Shortcut[] = [
  { label: "CDMX → CDMX", cp_origen: "06000", cp_destino: "03100", peso: "1", largo: "20", alto: "15", ancho: "10" },
  { label: "CDMX → GDL", cp_origen: "06000", cp_destino: "44100", peso: "2", largo: "30", alto: "20", ancho: "15" },
  { label: "CDMX → MTY", cp_origen: "06000", cp_destino: "64000", peso: "3", largo: "35", alto: "25", ancho: "20" },
];
const SHORTCUT_FIELDS = ["cp_origen", "cp_destino", "peso", "largo", "alto", "ancho"] as const;

function Field({ name, label, unit, placeholder, maxLength, required, pattern, filled = false, className = "" }: { name: string; label: string; unit?: string; placeholder: string; maxLength?: number; required?: boolean; pattern?: string; filled?: boolean; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block truncate font-inter text-[11.5px] font-medium text-white/75">{label}</span>
      <div className={filled
        ? "flex items-center gap-1 rounded-[10px] border border-white/[0.10] bg-[#1D1D1D] px-3 py-2.5 transition-colors focus-within:border-[#E2604C]"
        : "flex items-baseline gap-1 border-b border-white/25 pb-1 transition-colors focus-within:border-[#E2604C]"}>
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

export default function T1EnviosCotizadorPanel({ bare = false }: { bare?: boolean }) {
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [valid, setValid] = useState(false);
  const applyShortcut = (s: Shortcut) => {
    const form = formRef.current;
    if (!form) return;
    SHORTCUT_FIELDS.forEach((k) => {
      const el = form.elements.namedItem(k) as HTMLInputElement | null;
      if (el) el.value = s[k];
    });
    setValid(form.checkValidity());
    track("cotizador_shortcut", { preset: s.label });
  };
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
      {/* Shortcuts — prellenan el cotizador (CP + medidas + peso). Una sola línea. */}
      <div className="mb-3.5 flex flex-nowrap items-center gap-2 overflow-x-auto justify-start tablet:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="shrink-0 font-inter text-[11px] font-medium text-white/40">Prueba con:</span>
        {SHORTCUTS.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => applyShortcut(s)}
            className="shrink-0 whitespace-nowrap rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-1.5 font-inter text-[12px] font-medium text-white/80 transition-colors hover:border-[#E2604C]/60 hover:text-white"
          >
            {s.label}
          </button>
        ))}
      </div>
      <form
        ref={formRef}
        action={ENVIOS_QUOTE_URL}
        method="get"
        onSubmit={onSubmit}
        onFocusCapture={onFirstFocus}
        onInput={(e) => setValid(e.currentTarget.checkValidity())}
        className={bare ? "w-full text-left" : "w-full overflow-hidden rounded-[16px] bg-[#1D1D1D] p-4 text-left tablet:p-6"}
        style={bare ? undefined : { boxShadow: "0 20px 50px rgba(0,0,0,0.30)" }}
      >
        {/* Barra horizontal en desktop; stack ordenado en móvil */}
        <div className="flex flex-col gap-3.5 tablet:flex-row tablet:items-end tablet:justify-center tablet:gap-5">
          {/* CP origen / destino — móvil 2-col, desktop en línea */}
          <div className="grid grid-cols-2 gap-3 tablet:contents">
            <Field name="cp_origen" label="CP Origen" placeholder="00000" maxLength={5} required pattern="\d{5}" filled={bare} className="tablet:w-[128px]" />
            <Field name="cp_destino" label="CP Destino" placeholder="00000" maxLength={5} required pattern="\d{5}" filled={bare} className="tablet:w-[128px]" />
          </div>
          {/* Peso */}
          <Field name="peso" label="Peso" unit="kg" placeholder="0" maxLength={4} required pattern="\d+" filled={bare} className="tablet:w-[82px]" />
          {/* Dimensiones — móvil 3-col, desktop en línea */}
          <div className="grid grid-cols-3 gap-2 tablet:contents">
            <Field name="largo" label="Largo" unit="cm" placeholder="0" maxLength={3} required pattern="\d+" filled={bare} className="tablet:w-[72px]" />
            <Field name="alto" label="Alto" unit="cm" placeholder="0" maxLength={3} required pattern="\d+" filled={bare} className="tablet:w-[72px]" />
            <Field name="ancho" label="Ancho" unit="cm" placeholder="0" maxLength={3} required pattern="\d+" filled={bare} className="tablet:w-[72px]" />
          </div>
          {/* Botón */}
          <button type="submit" disabled={!valid} className={`mt-1 flex h-[48px] w-full shrink-0 items-center justify-center gap-1.5 rounded-[12px] px-8 font-inter text-[14px] font-semibold transition-colors tablet:mt-0 tablet:h-[50px] tablet:w-auto tablet:text-[15px] ${valid ? "bg-red-500 text-white hover:bg-red-600" : "cursor-not-allowed bg-[#60160F] text-white/45"}`}>
            Cotizar
            {ArrowRight}
          </button>
        </div>
      </form>
    </div>
  );
}
