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
const QUOTES = [
  { logo: "/img/circles/fedex.svg", carrier: "FedEx", dest: "CDMX → Guadalajara", eta: "2 días hábiles", price: "115" },
  { logo: "/img/circles/dhl.svg", carrier: "DHL", dest: "CDMX → Monterrey", eta: "3 días hábiles", price: "128" },
  { logo: "/img/circles/99.svg", carrier: "99 minutos", dest: "CDMX → CDMX", eta: "Mismo día", price: "89" },
  { logo: "/img/circles/ups.svg", carrier: "UPS", dest: "CDMX → Cancún", eta: "2 días hábiles", price: "149" },
];
const DUR = 26; // segundos por vuelta

export default function T1EnviosOrbitHalo({ size = 420, radius = 192 }: { size?: number; radius?: number }) {
  const n = LOGOS.length;
  const [q, setQ] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setQ((v) => (v + 1) % QUOTES.length), 2600);
    return () => clearInterval(t);
  }, []);
  const quote = QUOTES[q];

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      {/* Glow suave */}
      <div aria-hidden className="absolute rounded-full" style={{ inset: -30, background: "radial-gradient(ellipse at 50% 50%, rgba(229,144,134,0.16) 0%, transparent 65%)" }} />
      {/* Aro */}
      <div aria-hidden className="absolute inset-0 rounded-full" style={{ border: "1.5px solid rgba(219,59,43,0.22)", boxShadow: "0 0 0 14px rgba(219,59,43,0.03), inset 0 0 40px rgba(219,59,43,0.05)" }} />

      {/* Núcleo — mini-card de cotización que cicla */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 200 }}>
        <div className="rounded-[16px] bg-white p-3.5" style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.35)", fontFamily: "var(--font-manrope-var), 'Manrope', sans-serif" }}>
          <div key={q} style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
            <div className="flex items-center gap-2.5">
              <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center overflow-hidden rounded-full">
                <Image src={quote.logo} alt="" width={40} height={40} className="h-full w-full object-cover" />
              </span>
              <div className="min-w-0 leading-tight">
                <p className="text-[13px] font-bold text-black">{quote.carrier}</p>
                <p className="truncate text-[11px] text-black/50">{quote.dest}</p>
              </div>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <div className="leading-tight">
                <p className="text-[10px] text-black/45">Entrega</p>
                <p className="text-[12.5px] font-bold text-black">{quote.eta}</p>
              </div>
              <div className="text-right leading-tight">
                <p className="text-[10px] text-black/45">Precio</p>
                <p className="text-[15px] font-bold text-black">${quote.price}<span className="ml-0.5 text-[9px] font-semibold text-black/45">MXN</span></p>
              </div>
            </div>
          </div>
          <div className="mt-3 flex h-[34px] items-center justify-center rounded-[10px] bg-[#DB3B2B] text-[12.5px] font-semibold text-white">Crear envío</div>
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
