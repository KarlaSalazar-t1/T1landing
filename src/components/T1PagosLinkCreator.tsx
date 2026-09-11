"use client";

import { useState } from "react";
import { PAGOS_START_URL } from "@/lib/constants";

const ArrowRight = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* "10" → "0.10", "109999" → "1,099.99" */
function formatMonto(digits: string): string {
  const cents = digits.replace(/\D/g, "");
  if (cents === "") return "";
  const val = (parseInt(cents, 10) / 100).toFixed(2);
  const [int, dec] = val.split(".");
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + dec;
}

/* Creador de link de pago — barra horizontal (Monto | Concepto | botón),
   mismo patrón que el cotizador de envíos. `bare` = campos en caja oscura (V2). */
export default function T1PagosLinkCreator({ bare = false, vertical = false }: { bare?: boolean; vertical?: boolean }) {
  const [monto, setMonto] = useState("");
  const [concepto, setConcepto] = useState("");
  const ok = Number(monto) > 0;

  // Envoltura de cada campo: underline (dentro de card) o caja oscura (bare/V2).
  const wrap = bare
    ? "flex items-baseline gap-1 rounded-[10px] border border-white/[0.10] bg-[#1D1D1D] px-3 py-2.5 transition-colors focus-within:border-[#E2604C]"
    : "flex items-baseline gap-1 border-b border-white/25 pb-1 transition-colors focus-within:border-[#E2604C]";
  const labelCls = "mb-1 block font-inter text-[11.5px] font-medium text-white/75";
  // vertical: campos apilados (para columna angosta). horizontal (default): barra.
  const rowCls = vertical ? "flex flex-col gap-4" : "flex flex-col gap-3.5 tablet:flex-row tablet:items-end tablet:gap-5";
  const montoCls = vertical ? "block" : "block tablet:w-[170px]";
  const conceptoCls = vertical ? "block" : "block tablet:flex-1";
  const btnCls = vertical
    ? "mt-1 flex h-[50px] w-full items-center justify-center gap-1.5 rounded-[12px] px-7 font-inter text-[15px] font-semibold no-underline transition-colors"
    : "mt-1 flex h-[48px] w-full shrink-0 items-center justify-center gap-1.5 rounded-[12px] px-7 font-inter text-[14px] font-semibold no-underline transition-colors tablet:mt-0 tablet:h-[50px] tablet:w-auto tablet:text-[15px]";

  return (
    <div className="w-full text-left">
      <div className={rowCls}>
        {/* Monto */}
        <label className={montoCls}>
          <span className={labelCls}>Monto a cobrar</span>
          <div className={wrap}>
            <span className="font-sora text-[18px] font-light text-white/45">$</span>
            <input
              inputMode="numeric"
              value={monto === "" ? "" : formatMonto(monto)}
              onChange={(e) => setMonto(e.target.value.replace(/\D/g, "").slice(0, 9))}
              placeholder="0.00"
              aria-label="Monto a cobrar"
              className="min-w-0 flex-1 bg-transparent font-sora text-[20px] font-light text-white outline-none placeholder:text-white/40"
            />
          </div>
        </label>

        {/* Concepto */}
        <label className={conceptoCls}>
          <span className={labelCls}>¿Qué quieres cobrar?</span>
          <div className={wrap}>
            <input
              value={concepto}
              onChange={(e) => setConcepto(e.target.value)}
              placeholder="Ej. Sesión de fotos"
              aria-label="Concepto del cobro"
              className="min-w-0 flex-1 bg-transparent font-inter text-[15px] text-white outline-none placeholder:text-white/45"
            />
          </div>
        </label>

        {/* Botón */}
        <a
          href={PAGOS_START_URL}
          onClick={(e) => { if (!ok) e.preventDefault(); }}
          aria-disabled={!ok}
          className={`${btnCls} ${ok ? "bg-red-500 text-white hover:bg-red-600" : "bg-[#60160F] text-white/45"}`}
        >
          Crea tu link de pago
          {ArrowRight}
        </a>
      </div>
    </div>
  );
}
