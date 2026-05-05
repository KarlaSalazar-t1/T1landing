"use client";

import Image from "next/image";

export default function GlassShipmentCard() {
  return (
    <div className="glass-card-wrapper w-[240px]">
      <div className="glass-card">
        <div className="relative z-[3] flex flex-col gap-[14px] p-5" style={{ fontFamily: "var(--font-manrope-var), sans-serif" }}>
          {/* Carrier logo + name */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-[8px] bg-white/10">
              <Image src="/img/icons/fedex-logo.svg" alt="FedEx" width={28} height={28} className="object-contain" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-white">FedEx</p>
              <p className="text-[10px] text-white/40">Express</p>
            </div>
          </div>

          {/* Tracking number */}
          <div>
            <p className="text-[9px] font-medium uppercase tracking-wider text-white/35">No. de rastreo</p>
            <p className="font-mono text-[14px] font-semibold tracking-wide text-white/90">4356 7890 0082</p>
          </div>

          {/* Divider */}
          <div className="w-full" style={{ height: 1, background: "rgba(255,255,255,0.12)" }} />

          {/* Weight & Dimensions */}
          <div className="flex gap-4">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-wider text-white/35">Peso</p>
              <p className="text-[13px] font-semibold text-white/80">2.5 kg</p>
            </div>
            <div>
              <p className="text-[9px] font-medium uppercase tracking-wider text-white/35">Dimensiones</p>
              <p className="text-[13px] font-semibold text-white/80">30×20×15 cm</p>
            </div>
          </div>

          {/* Origin & Destination */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-[9px] font-medium uppercase tracking-wider text-white/35">CP Origen</p>
              <p className="text-[14px] font-bold text-white/90">11000</p>
              <p className="text-[8px] text-white/30">CDMX</p>
            </div>
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
              <path d="M2 6H18M18 6L14 2M18 6L14 10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex-1 text-right">
              <p className="text-[9px] font-medium uppercase tracking-wider text-white/35">CP Destino</p>
              <p className="text-[14px] font-bold text-white/90">44100</p>
              <p className="text-[8px] text-white/30">Guadalajara</p>
            </div>
          </div>

          {/* (Rastrear button removed per design — main CTA lives on the outer card) */}
        </div>
      </div>
    </div>
  );
}
