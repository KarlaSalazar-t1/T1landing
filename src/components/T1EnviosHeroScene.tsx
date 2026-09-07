"use client";

import Image from "next/image";
import T1EnviosCotizadorPanel from "@/components/T1EnviosCotizadorPanel";

/* Escena del hero de T1 Envíos (desktop) — cotizador FUNCIONAL con los 7 logos
   de paquetería orbitando detrás, alineados a un aro. El panel dejó de ser un
   mock (evita dead clicks): ahora es el cotizador real (T1EnviosCotizadorPanel). */

const LOGOS = [
  "/img/circles/ups.svg",
  "/img/circles/fedex.svg",
  "/img/circles/dhl.svg",
  "/img/circles/ampm.svg",
  "/img/circles/99.svg",
  "/img/circles/jt.svg",
  "/img/circles/estafeta.svg",
];
const DUR = 30; // segundos por vuelta

export default function T1EnviosHeroScene({ size = 488, radius = 212 }: { size?: number; radius?: number }) {
  const n = LOGOS.length;
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      {/* Glow */}
      <div aria-hidden className="absolute rounded-full" style={{ inset: -20, background: "radial-gradient(ellipse at 50% 50%, rgba(229,144,134,0.16) 0%, transparent 62%)" }} />
      {/* Aro */}
      <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: radius * 2, height: radius * 2, border: "1.5px solid rgba(219,59,43,0.22)", boxShadow: "0 0 0 14px rgba(219,59,43,0.03)" }} />

      {/* Logos orbitando (detrás del panel) — decorativos */}
      {LOGOS.map((src, i) => (
        <div
          key={src}
          aria-hidden
          className="halo-orbit-item pointer-events-none absolute left-1/2 top-1/2 z-0"
          style={{
            width: 56,
            height: 56,
            margin: "-28px 0 0 -28px",
            transformOrigin: "28px 28px",
            ["--halo-r" as string]: `${radius}px`,
            animation: `halo-orbit ${DUR}s linear infinite`,
            animationDelay: `${-(DUR / n) * i}s`,
          }}
        >
          <span className="flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full bg-white" style={{ boxShadow: "0 6px 22px rgba(0,0,0,0.20)" }}>
            <Image src={src} alt="" width={72} height={72} className="h-full w-full object-cover" />
          </span>
        </div>
      ))}

      {/* Cotizador funcional (centro) */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2" style={{ width: 356 }}>
        <T1EnviosCotizadorPanel />
      </div>
    </div>
  );
}
