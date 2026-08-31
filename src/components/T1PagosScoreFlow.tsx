"use client";

import { useEffect, useState } from "react";

/* T1 Score — panel de proceso INTERNO (no es la pantalla del cliente).
   Comunica: el cliente paga y, en segundo plano, nosotros analizamos correo,
   teléfono, historial, dispositivo, etc. en segundos y decidimos si aprobar. */

const SIGNALS = ["Correo verificado", "Teléfono validado", "Historial de compras", "Dispositivo confiable", "Comportamiento de pago"];

const Check = (
  <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#16A34A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export function ScoreFlow() {
  // step 0: esperando · 1: pago entrante · 2..6: señales · 7: score · 8: decisión (hold) → loop
  const [step, setStep] = useState(0);
  useEffect(() => {
    const dur = step === 0 ? 800 : step === 1 ? 750 : step === 7 ? 950 : step === 8 ? 2900 : 560;
    const id = setTimeout(() => setStep((s) => (s + 1) % 9), dur);
    return () => clearTimeout(id);
  }, [step]);

  const incoming = step >= 1;
  const signalOn = (i: number) => step >= i + 2;
  const scoreOn = step >= 7;
  const decisionOn = step >= 8;

  const R = 34;
  const C = 2 * Math.PI * R;

  return (
    <div className="mx-auto flex w-full max-w-[300px] flex-col overflow-hidden rounded-[22px] border border-white/[0.10]" style={{ background: "#100d10", minHeight: 512, boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}>

      <div className="flex flex-1 flex-col px-4 py-3.5">
        {/* Pago entrante del cliente */}
        <p className="font-inter text-[10px] font-medium uppercase tracking-[0.1em] text-white/35" style={{ marginBottom: 8 }}>Pago entrante</p>
        <div className="flex items-center gap-2.5 rounded-[11px] border border-white/[0.08] bg-white/[0.03] px-3 py-2.5" style={{ opacity: incoming ? 1 : 0.35, transition: "opacity 0.4s" }}>
          <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-white/10 font-sora text-[10px] font-bold text-white">LC</span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate font-inter text-[12px] font-medium text-white">Luis Cervantes</p>
            <p className="font-inter text-[10px] text-white/45">Tenis blancos clásicos</p>
          </div>
          <span className="font-sora text-[13px] font-semibold text-white">$1,345.99</span>
        </div>

        {/* Análisis de señales (nuestro sistema) */}
        <p className="font-inter text-[10px] font-medium uppercase tracking-[0.1em] text-white/35" style={{ marginTop: 16, marginBottom: 8 }}>Analizamos en segundos</p>
        <div className="flex flex-col gap-1.5">
          {SIGNALS.map((s, i) => {
            const on = signalOn(i);
            return (
              <div key={s} className="flex items-center gap-2.5" style={{ opacity: on ? 1 : 0.28, transform: on ? "none" : "translateY(3px)", transition: "opacity 0.35s, transform 0.35s" }}>
                <span className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full" style={{ background: on ? "rgba(22,163,74,0.16)" : "rgba(255,255,255,0.06)" }}>
                  {on ? Check : <span className="h-[5px] w-[5px] rounded-full bg-white/30" />}
                </span>
                <span className="flex-1 font-inter text-[11.5px] text-white/75">{s}</span>
                {on && <span className="font-inter text-[9.5px] font-semibold text-[#16A34A]">OK</span>}
              </div>
            );
          })}
        </div>

        {/* Resultado: score + decisión */}
        <div className="mt-auto flex items-center gap-3 rounded-[14px] border border-white/[0.08] bg-white/[0.02] px-3.5 py-3" style={{ marginTop: 16, opacity: scoreOn ? 1 : 0.25, transition: "opacity 0.45s" }}>
          <div className="relative flex shrink-0 items-center justify-center" style={{ width: 78, height: 78 }}>
            <svg width="78" height="78" viewBox="0 0 78 78">
              <circle cx="39" cy="39" r={R} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="7" />
              <circle cx="39" cy="39" r={R} fill="none" stroke="#16A34A" strokeWidth="7" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={scoreOn ? C * 0.1 : C} transform="rotate(-90 39 39)" style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1)" }} />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-sora text-[22px] font-light text-white" style={{ lineHeight: 1 }}>892</span>
              <span className="font-inter text-[8px] text-white/40">Score</span>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-inter text-[11px] text-white/55">Riesgo bajo</p>
            <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: "rgba(34,197,94,0.14)", border: "1px solid rgba(34,197,94,0.35)", opacity: decisionOn ? 1 : 0, transform: decisionOn ? "scale(1)" : "scale(0.9)", transition: "opacity 0.35s, transform 0.35s" }}>
              <span className="flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#16A34A]">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span className="font-inter text-[11.5px] font-semibold text-[#22C55E]">Pago aprobado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════ Sección Antifraude con T1 Score (texto + panel simulado) ══════════ */
const SCORE_FEATURES = [
  "Análisis de riesgo en tiempo real",
  "Menos contracargos y reclamaciones",
  "Reglas de decisión adaptadas a tu negocio",
];
export function T1PagosScore() {
  return (
    <section className="relative overflow-hidden bg-[#0e0d0d] px-5 py-[90px] tablet:px-6 tablet:py-[128px]">
      <div aria-hidden className="pointer-events-none absolute -left-[8%] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(219,59,43,0.14) 0%, transparent 70%)", filter: "blur(20px)" }} />
      <div className="relative z-[1] mx-auto max-w-[var(--max-w)]">
        <div className="grid grid-cols-1 items-center gap-12 tablet:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] tablet:gap-16">
          {/* Texto */}
          <div className="order-2 tablet:order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 font-inter text-[12px] font-semibold text-white/70">
              <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[5px] bg-[#DB3B2B] font-sora text-[9px] font-extrabold text-white">T1</span>
              T1 Score
            </span>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginTop: 20, marginBottom: 16, maxWidth: 460 }}>
              Antifraude que aprueba más y frena el fraude
            </h2>
            <p className="font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 28, maxWidth: 460 }}>
              El cliente paga y, en segundos, analizamos correo, teléfono, historial, dispositivo y más para decidir si aprobar el pago.
            </p>
            <ul className="flex flex-col gap-3" style={{ marginBottom: 32 }}>
              {SCORE_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 font-inter text-[15px] font-light text-white/75 tablet:text-[16px]">
                  <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(34,197,94,0.14)" }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#22C55E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <a href="/productos/t1pagos/reclamaciones" className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]">
              Conoce más
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>

          {/* Panel simulado */}
          <div className="order-1 flex justify-center tablet:order-2">
            <ScoreFlow />
          </div>
        </div>
      </div>
    </section>
  );
}
