"use client";

import { useState } from "react";
import { PAGOS_START_URL } from "@/lib/constants";

const SOCIAL_PROOF = ["+90% de aprobación", "+200M transacciones", "8 países"];

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

export default function T1PagosHero() {
  const [monto, setMonto] = useState("");
  const [concepto, setConcepto] = useState("");
  const ok = Number(monto) > 0;

  return (
    <div className="relative z-0">
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-5 pb-0 pt-24 tablet:min-h-screen tablet:px-6 tablet:pt-28 tablet:pb-0">
        {/* Fondo */}
        <div aria-hidden className="absolute inset-0 z-0" style={{ background: "linear-gradient(160deg, #2e1622 0%, #180b13 50%, #0d070b 100%)" }} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 86% 70% at 67% 32%, rgba(226,64,47,0.26) 0%, transparent 60%), radial-gradient(ellipse 60% 58% at 14% 22%, rgba(150,34,34,0.18) 0%, transparent 58%), radial-gradient(ellipse 50% 46% at 82% 84%, rgba(244,114,150,0.08) 0%, transparent 62%), radial-gradient(ellipse 60% 70% at -4% 88%, rgba(58,74,158,0.30) 0%, transparent 52%), radial-gradient(ellipse 42% 60% at 102% 10%, rgba(58,74,158,0.24) 0%, transparent 50%)",
          }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden tablet:block" style={{ background: "linear-gradient(90deg, rgba(2,1,1,0.85) 0%, rgba(20,4,4,0.35) 12%, rgba(0,0,0,0) 26%, rgba(0,0,0,0) 74%, rgba(20,4,4,0.35) 88%, rgba(2,1,1,0.85) 100%)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden tablet:block" style={{ background: "radial-gradient(circle at 97% -2%, rgba(4,24,82,0.75) 0%, rgba(17,0,85,0) 27%)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[260px]" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(3,1,1,0.85) 55%, #000 100%)" }} />

        {/* Contenido */}
        <div className="relative z-10 flex w-full max-w-[440px] grow flex-col items-center tablet:max-w-[640px]">
          <h1 className="text-center font-sora text-[32px] font-light leading-[1.14] text-white tablet:text-[48px] desktop:text-[48px]" style={{ letterSpacing: "-0.03em" }}>
            Cobra en línea
          </h1>

          <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 py-6">
            <p className="max-w-[400px] text-center font-inter text-[16px] font-light leading-[1.6] text-white tablet:max-w-none">
              Crea un link de pago y cobra por WhatsApp, redes o donde vendas.
            </p>

            <div className="flex w-full flex-col gap-3.5">
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
