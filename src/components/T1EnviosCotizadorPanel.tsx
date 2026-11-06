"use client";

import { useRef, useState } from "react";
import { ENVIOS_QUOTE_URL } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { CTA_ON, CTA_OFF, CTA_HINT } from "@/lib/heroCta";

/* Cotizador funcional del hero de Envíos. Card sólida elevada con campos en caja
   (no underline). Es un <form method="get"> nativo hacia /envios/cotizar: el click
   nunca muere (Opción B) — valida y navega con los valores precargados.

   PRELLENADO para quitar fricción (feedback CEO): CP origen por defecto CDMX
   (pendiente: detectar ciudad del visitante por IP y usar su CP), CP destino de
   ejemplo, y peso/medidas de un paquete típico — así cotiza al instante.
   El peso y las medidas van colapsados ("Ajustar…") para simplificar. */

const ArrowRight = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* Origen prellenado = ubicación aproximada del visitante (editable).
   PROD (Vercel): leer en el server los headers de geo y pasar el resultado aquí:
     x-vercel-ip-postal-code  → cp   (aprox; puede ser el CP del centro de la ciudad)
     x-vercel-ip-city         → city
     x-vercel-ip-country      → si ≠ "MX" (o vacío, p. ej. VPN) usar el fallback CDMX
   Mientras no esté conectado, se usa este default. */
const ORIGIN = { cp: "06000", city: "CDMX" };
/* Paquete típico por defecto (el detalle se ajusta en el cotizador completo). */
const PKG = { peso: "1", largo: "30", alto: "20", ancho: "15" };

/* error: la etiqueta se cambia por lo que falta (sin mover el layout). */
function Field({ name, label, unit, placeholder, maxLength, required, pattern, defaultValue, filled = false, error, className = "" }: { name: string; label: string; unit?: string; placeholder: string; maxLength?: number; required?: boolean; pattern?: string; defaultValue?: string; filled?: boolean; error?: string; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span role={error ? "status" : undefined} className={`mb-1 block truncate font-inter text-[11.5px] font-medium ${error ? CTA_HINT : "text-white/75"}`}>{error ?? label}</span>
      <div className={filled
        ? "flex cursor-text items-center gap-1 rounded-[10px] border border-white/[0.10] bg-[#1D1D1D] px-3 py-2.5 transition-colors focus-within:border-[#E2604C]"
        : "flex cursor-text items-baseline gap-1 border-b border-white/25 pb-1 transition-colors focus-within:border-[#E2604C]"}>
        <input
          name={name}
          // Solo dígitos (el CP es numérico aunque el teclado de escritorio deje letras)
          onInput={(e) => { const el = e.currentTarget; el.value = el.value.replace(/\D/g, ""); }}
          // El origen viene prellenado: al enfocarlo se selecciona para reemplazarlo de un
          // jalón (antes había que borrar a mano → clics repetidos en "CP Origen").
          // (diferido: el mouseup del clic quitaría la selección si fuera inmediata)
          onFocus={(e) => { const el = e.currentTarget; setTimeout(() => el.select(), 0); }}
          required={required}
          inputMode="numeric"
          pattern={pattern}
          maxLength={maxLength}
          placeholder={placeholder}
          defaultValue={defaultValue}
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
  const [valid, setValid] = useState(false); // destino vacío → el usuario lo llena
  // Campos que faltan tras tocar "Cotizar" con datos incompletos
  const [errors, setErrors] = useState<{ cp_origen?: string; cp_destino?: string }>({});
  const onFirstFocus = () => {
    if (started.current) return;
    started.current = true;
    track("cotizador_start", { cta_section: "hero" });
  };
  // Con datos incompletos el navegador cancela el envío (validación nativa, que también
  // cubre clics antes de hidratar) y dispara `invalid`: en vez de su globo, el botón no
  // muere — enfoca el primer CP inválido y la etiqueta dice qué falta.
  const onInvalid = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const first = form.querySelector<HTMLInputElement>("input:invalid");
    if (e.target !== first) return; // `invalid` llega una vez por campo; basta con el primero
    const msg = (n: string, vacio: string) => {
      const el = form.elements.namedItem(n) as HTMLInputElement;
      if (el.validity.valid) return undefined; // (checkValidity() re-dispararía `invalid`)
      return el.value ? "CP de 5 dígitos" : vacio;
    };
    setErrors({ cp_origen: msg("cp_origen", "Escribe el CP origen"), cp_destino: msg("cp_destino", "Escribe el CP destino") });
    first?.focus();
    track("cotizador_empty_click", { cta_section: "hero" });
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
      <form
        action={ENVIOS_QUOTE_URL}
        method="get"
        onSubmit={onSubmit}
        onFocusCapture={onFirstFocus}
        onInvalidCapture={onInvalid}
        onInput={(e) => { setValid(e.currentTarget.checkValidity()); setErrors({}); }}
        className={bare ? "w-full text-left" : "w-full overflow-hidden rounded-[16px] bg-[#1D1D1D] p-4 text-left tablet:p-6"}
        style={bare ? undefined : { boxShadow: "0 20px 50px rgba(0,0,0,0.30)" }}
      >
        {/* Barra: CP Origen · CP Destino · Cotizar (peso y medidas van por defecto) */}
        <div className="flex flex-col gap-3.5 tablet:flex-row tablet:items-end tablet:justify-center tablet:gap-4">
          {/* CP origen / destino — móvil 2-col, desktop en línea */}
          <div className="grid grid-cols-2 gap-3 tablet:contents">
            <Field name="cp_origen" label="CP Origen" placeholder="00000" maxLength={5} required pattern="\d{5}" defaultValue={ORIGIN.cp} filled={bare} error={errors.cp_origen} className="tablet:w-[168px]" />
            <Field name="cp_destino" label="CP Destino" placeholder="Ej. 64000" maxLength={5} required pattern="\d{5}" filled={bare} error={errors.cp_destino} className="tablet:w-[168px]" />
          </div>

          {/* Peso y medidas — paquete típico por defecto (se ajustan al cotizar) */}
          <input type="hidden" name="peso" defaultValue={PKG.peso} />
          <input type="hidden" name="largo" defaultValue={PKG.largo} />
          <input type="hidden" name="alto" defaultValue={PKG.alto} />
          <input type="hidden" name="ancho" defaultValue={PKG.ancho} />

          {/* Botón */}
          <button type="submit" aria-disabled={!valid} className={`mt-1 flex h-[48px] w-full shrink-0 items-center justify-center gap-1.5 rounded-[12px] px-8 font-inter text-[14px] font-semibold transition-colors tablet:mt-0 tablet:h-[50px] tablet:w-auto tablet:text-[15px] ${valid ? CTA_ON : CTA_OFF}`}>
            Cotizar
            {ArrowRight}
          </button>
        </div>

        {/* Nota de transparencia */}
        <p className="mt-3 text-center font-inter text-[11.5px] font-light text-white/40">
          Origen aproximado ({ORIGIN.city}) · estimación para 1 kg. Ajusta el detalle al cotizar.
        </p>
      </form>
    </div>
  );
}
