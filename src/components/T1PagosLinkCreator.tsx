"use client";

import { useState } from "react";
import { PAGOS_START_URL } from "@/lib/constants";

const FIELD = "w-full rounded-[14px] bg-[#1D1D1D] px-4 py-3 font-inter text-[16px] text-white outline-none placeholder:text-[#8A8A8A] focus:ring-1 focus:ring-white/20";
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

/* Creador de link de pago (monto + concepto) — antes vivía en el hero. */
export default function T1PagosLinkCreator() {
  const [monto, setMonto] = useState("");
  const [concepto, setConcepto] = useState("");
  const ok = Number(monto) > 0;

  return (
    <div className="mx-auto flex w-full max-w-[440px] flex-col gap-3.5 text-left">
      {/* Monto grande */}
      <div className="flex items-baseline justify-center gap-1.5 py-1">
        <span className="font-sora text-[28px] font-light text-white/45">$</span>
        <input
          inputMode="numeric"
          value={monto === "" ? "" : formatMonto(monto)}
          onChange={(e) => setMonto(e.target.value.replace(/\D/g, "").slice(0, 9))}
          placeholder="0.00"
          aria-label="Monto a cobrar"
          className="w-[200px] bg-transparent text-center font-sora text-[44px] font-light leading-none text-white outline-none placeholder:text-white/25"
        />
      </div>
      {/* Concepto */}
      <div>
        <p className="mb-1.5 px-1 font-inter text-[14px] font-medium text-white/85">¿Qué quieres cobrar?</p>
        <input value={concepto} onChange={(e) => setConcepto(e.target.value)} placeholder="Ej. Sesión de fotos" aria-label="Concepto del cobro" className={FIELD} />
      </div>
      <a
        href={PAGOS_START_URL}
        onClick={(e) => { if (!ok) e.preventDefault(); }}
        aria-disabled={!ok}
        className={`flex h-[46px] items-center justify-center gap-1.5 rounded-[16px] font-inter text-[14px] font-semibold no-underline transition-colors ${ok ? "bg-red-500 text-white hover:bg-red-600" : "bg-[#60160F] text-white/45"}`}
      >
        Crea tu link de pago
        {ArrowRight}
      </a>
    </div>
  );
}
