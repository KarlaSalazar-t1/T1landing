"use client";

import { useState } from "react";
import { ENVIOS_QUOTE_URL } from "@/lib/constants";

const SOCIAL_PROOF = ["+30M de envíos", "+50,000 negocios", "+10 paqueterías"];

const ArrowRight = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function T1EnviosHero() {
  const [cpDesde, setCpDesde] = useState("");
  const [cpHasta, setCpHasta] = useState("");
  const ok = cpDesde.trim().length > 0 && cpHasta.trim().length > 0;

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
          <h1 className="mt-8 text-center font-sora text-[32px] font-light leading-[1.14] text-white tablet:mt-14 tablet:text-[48px] desktop:text-[48px]" style={{ letterSpacing: "-0.03em" }}>
            Todos tus envíos,
            <br />
            un solo lugar
          </h1>

          <div className="flex w-full flex-1 flex-col items-center justify-center gap-5 py-6">
            <p className="flex min-h-[52px] max-w-[360px] items-center justify-center text-center font-inter text-[16px] font-light leading-[1.6] text-white tablet:min-h-0 tablet:max-w-none tablet:whitespace-nowrap">
              Cotiza con +10 paqueterías en un clic.
            </p>

            {/* Cotizador Desde/Hacia — mismo componente que el tab de envíos de la home */}
            <div className="w-full tablet:max-w-[440px]">
              <div className="mx-auto flex min-h-[172px] w-full flex-col justify-center rounded-[16px] bg-[#1D1D1D] px-4 py-2 transition-shadow focus-within:ring-1 focus-within:ring-white/25">
                <div className="flex gap-3.5">
                  <div className="flex flex-col items-center self-stretch py-[22px]">
                    {/* Origen: punto · Destino: pin de localización */}
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
              <a
                href={ENVIOS_QUOTE_URL}
                onClick={(e) => { if (!ok) e.preventDefault(); }}
                aria-disabled={!ok}
                className={`mt-4 flex h-[46px] w-full items-center justify-center gap-1.5 rounded-[16px] font-inter text-[14px] font-semibold no-underline transition-colors ${ok ? "bg-red-500 text-white hover:bg-red-600" : "bg-[#60160F] text-white/45"}`}
              >
                Cotiza gratis
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
