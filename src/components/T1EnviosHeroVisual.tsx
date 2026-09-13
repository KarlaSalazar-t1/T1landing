"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ENVIOS_RATE_EXAMPLES } from "@/lib/constants";

/* Visual del hero de Envíos: caja (producto) al centro con las paqueterías
   orbitando alrededor (solo desktop) y un chip de tarifa (CDMX → …) que cicla
   encima de la caja — es el gancho del hero. Los shortcuts para prellenar viven
   en el cotizador. Todo decorativo / no interactivo. */

const LOGOS = [
  "/img/circles/ups.svg",
  "/img/circles/fedex.svg",
  "/img/circles/dhl.svg",
  "/img/circles/ampm.svg",
  "/img/circles/99.svg",
  "/img/circles/jt.svg",
  "/img/circles/estafeta.svg",
];
const DUR = 32; // segundos por vuelta

const Arrow = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#E2604C]"><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function T1EnviosHeroVisual() {
  const n = LOGOS.length;
  const radius = 194;
  const [q, setQ] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setQ((v) => (v + 1) % ENVIOS_RATE_EXAMPLES.length), 3200);
    return () => clearInterval(t);
  }, []);
  const r = ENVIOS_RATE_EXAMPLES[q];

  return (
    <div className="relative mx-auto w-[300px] select-none tablet:aspect-square tablet:w-[440px]">
      {/* Glow cálido */}
      <div aria-hidden className="absolute inset-[-12%] rounded-full" style={{ background: "radial-gradient(ellipse at 50% 46%, rgba(229,144,134,0.18) 0%, transparent 62%)" }} />

      {/* Aro + logos orbitando — solo desktop (en móvil satura) */}
      <div className="pointer-events-none absolute inset-0 hidden tablet:block" aria-hidden>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: radius * 2, height: radius * 2, border: "1.5px solid rgba(219,59,43,0.22)", boxShadow: "0 0 0 14px rgba(219,59,43,0.03)" }} />
        {LOGOS.map((src, i) => (
          <div
            key={src}
            className="halo-orbit-item absolute left-1/2 top-1/2"
            style={{
              width: 54,
              height: 54,
              margin: "-27px 0 0 -27px",
              transformOrigin: "27px 27px",
              ["--halo-r" as string]: `${radius}px`,
              animation: `halo-orbit ${DUR}s linear infinite`,
              animationDelay: `${-(DUR / n) * i}s`,
            }}
          >
            <span className="flex h-[54px] w-[54px] items-center justify-center overflow-hidden rounded-full bg-white" style={{ boxShadow: "0 6px 22px rgba(0,0,0,0.20)" }}>
              <Image src={src} alt="" width={72} height={72} className="h-full w-full scale-[1.06] object-cover" />
            </span>
          </div>
        ))}
      </div>

      {/* Caja (centro) + chip de tarifa encima */}
      <div className="relative mx-auto w-full tablet:absolute tablet:left-1/2 tablet:top-1/2 tablet:w-[292px] tablet:-translate-x-1/2 tablet:-translate-y-1/2">
        <div className="relative">
          <Image src="/img/rastreo-v2.png" alt="Empaca y envía tus productos con T1" width={833} height={924} priority draggable={false} className="pointer-events-none w-full object-contain" style={{ filter: "drop-shadow(0 24px 52px rgba(0,0,0,0.5))" }} />

          {/* Chip de tarifa (cicla rutas) — gancho encima de la caja */}
          <div aria-hidden className="pointer-events-none absolute bottom-[6%] left-1/2 -translate-x-1/2">
            <div key={q} className="flex w-max items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3.5 py-2 backdrop-blur-md" style={{ animation: "fadeSlideIn 0.4s ease-out", boxShadow: "0 12px 30px rgba(0,0,0,0.45)" }}>
              <span className="flex items-center gap-1.5 font-inter text-[11.5px] font-medium text-white/85">
                {r.from}
                {Arrow}
                {r.to}
              </span>
              <span className="font-inter text-[11px] text-white/45">desde</span>
              <span className="font-inter text-[13px] font-bold text-white">${r.price}</span>
            </div>
          </div>
        </div>

        {/* Paqueterías en móvil — fila simple de logos (la órbita solo va en desktop) */}
        <div className="mt-4 flex items-center justify-center gap-2 tablet:hidden">
          {LOGOS.map((src) => (
            <span key={src} className="flex h-[32px] w-[32px] items-center justify-center overflow-hidden rounded-full bg-white" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.25)" }}>
              <Image src={src} alt="" width={64} height={64} className="h-full w-full scale-[1.06] object-cover" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
