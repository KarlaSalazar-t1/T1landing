"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/* Halo con logos de paquetería orbitando + mini-card de cotización que cicla
   — recreado del landing actual de T1 Envíos. */
const LOGOS = [
  "/img/circles/dhl.svg",
  "/img/circles/fedex.svg",
  "/img/circles/ups.svg",
  "/img/circles/ampm.svg",
  "/img/circles/99.svg",
];
const RATES = [
  { from: "CDMX", to: "CDMX", price: "89" },
  { from: "CDMX", to: "Guadalajara", price: "115" },
  { from: "CDMX", to: "Monterrey", price: "119" },
];
const DUR = 26; // segundos por vuelta

export default function T1EnviosOrbitHalo({ size = 420, radius = 192 }: { size?: number; radius?: number }) {
  const n = LOGOS.length;
  const [q, setQ] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setQ((v) => (v + 1) % RATES.length), 2600);
    return () => clearInterval(t);
  }, []);
  const rate = RATES[q];

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      {/* Glow suave */}
      <div aria-hidden className="absolute rounded-full" style={{ inset: -30, background: "radial-gradient(ellipse at 50% 50%, rgba(229,144,134,0.16) 0%, transparent 65%)" }} />
      {/* Aro */}
      <div aria-hidden className="absolute inset-0 rounded-full" style={{ border: "1.5px solid rgba(219,59,43,0.22)", boxShadow: "0 0 0 14px rgba(219,59,43,0.03), inset 0 0 40px rgba(219,59,43,0.05)" }} />

      {/* Núcleo — card de tarifa (estilo "Ahorra") que cicla */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 236 }}>
        <div className="rounded-[16px] bg-white px-5 py-[18px]" style={{ boxShadow: "0 24px 56px rgba(0,0,0,0.45)" }}>
          <div key={q} style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
            <p className="font-inter text-[11px] font-medium text-black/45" style={{ marginBottom: 12 }}>Tarifa preferencial</p>
            <div className="flex items-center gap-2" style={{ marginBottom: 14 }}>
              <span className="font-sora text-[16px] font-normal text-black" style={{ letterSpacing: "-0.01em" }}>{rate.from}</span>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#DB3B2B]"><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="truncate font-sora text-[16px] font-normal text-black" style={{ letterSpacing: "-0.01em" }}>{rate.to}</span>
            </div>
            <div className="flex items-end gap-1.5">
              <span className="font-inter text-[13px] font-light text-black/45" style={{ marginBottom: 5 }}>desde</span>
              <span className="font-sora text-[30px] font-light text-black" style={{ letterSpacing: "-0.02em", lineHeight: 1 }}>${rate.price}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logos orbitando */}
      {LOGOS.map((src, i) => (
        <div
          key={src}
          aria-hidden
          className="halo-orbit-item absolute left-1/2 top-1/2"
          style={{
            width: 62,
            height: 62,
            margin: "-31px 0 0 -31px",
            transformOrigin: "31px 31px",
            ["--halo-r" as string]: `${radius}px`,
            animation: `halo-orbit ${DUR}s linear infinite`,
            animationDelay: `${-(DUR / n) * i}s`,
          }}
        >
          <span className="flex h-[62px] w-[62px] items-center justify-center overflow-hidden rounded-full bg-white" style={{ boxShadow: "0 6px 22px rgba(0,0,0,0.20)" }}>
            <Image src={src} alt="" width={72} height={72} className="h-full w-full object-cover" />
          </span>
        </div>
      ))}
    </div>
  );
}
