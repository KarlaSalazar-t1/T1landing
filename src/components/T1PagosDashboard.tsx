"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const FONT = "var(--font-manrope-var), 'Manrope', sans-serif";

const TX = [
  { name: "María González", method: "VISA ····4832", amount: 2450, color: "#E2402F" },
  { name: "Carlos Ruiz", method: "SPEI", amount: 890, color: "#3A4A9E" },
  { name: "Ana Martínez", method: "MC ····1290", amount: 5200, color: "#16A34A" },
  { name: "Roberto Díaz", method: "AMEX ····8841", amount: 1100, color: "#B45309" },
  { name: "Laura Sánchez", method: "VISA ····2291", amount: 3780, color: "#7C3AED" },
];
const METHODS = ["/img/logos/brands/mastercard.webp", "/img/logos/brands/amex.webp", "/img/logos/brands/spei.webp", "/img/logos/brands/carnet.webp"];

const fmt = (n: number) => n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const initials = (name: string) => name.split(" ").map((w) => w[0]).slice(0, 2).join("");

export default function T1PagosDashboard() {
  const [idx, setIdx] = useState(0);
  const [gan, setGan] = useState(9490);

  useEffect(() => {
    const t = setInterval(() => setIdx((v) => (v + 1) % TX.length), 2600);
    return () => clearInterval(t);
  }, []);
  // Suma el monto de la nueva transacción a las ganancias en cada ciclo (con tope).
  useEffect(() => {
    setGan((g) => (g > 99000 ? 9490 : g + TX[idx].amount));
  }, [idx]);

  const rows = [0, 1, 2].map((k) => TX[(idx + k) % TX.length]);

  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: 420, fontFamily: FONT }}>
      {/* Chip Ganancias Brutas */}
      <div className="absolute -right-2 -top-5 z-20 rounded-[16px] border border-black/[0.06] bg-white px-4 py-3" style={{ boxShadow: "0 18px 44px rgba(0,0,0,0.22)" }}>
        <p className="text-[11px] font-semibold text-black/45">Ganancias Brutas</p>
        <p className="text-[20px] font-extrabold text-black" style={{ letterSpacing: "-0.02em" }}>$ {fmt(gan)}<span className="ml-1 text-[12px] font-semibold text-black/35">MXN</span></p>
      </div>

      {/* Ventana */}
      <div className="overflow-hidden rounded-[18px] bg-white" style={{ boxShadow: "0 30px 70px rgba(0,0,0,0.4)" }}>
        {/* Barra de navegador */}
        <div className="flex items-center gap-2 px-4 py-3">
          <span className="h-[9px] w-[9px] rounded-full bg-[#FF5F57]" />
          <span className="h-[9px] w-[9px] rounded-full bg-[#FEBC2E]" />
          <span className="h-[9px] w-[9px] rounded-full bg-[#28C840]" />
          <span className="ml-2 flex flex-1 items-center justify-center gap-1.5 rounded-full bg-black/[0.04] py-1 text-[11px] text-black/50">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.8" /></svg>
            t1.com/mx/pagos
          </span>
        </div>

        <div className="px-5 pb-5">
          {/* Chart */}
          <p className="text-[13px] font-bold text-black" style={{ marginBottom: 8 }}>Transacciones exitosas</p>
          <div className="rounded-[12px] border border-black/[0.06] p-3">
            <svg viewBox="0 0 320 90" className="w-full" style={{ height: 76 }} preserveAspectRatio="none">
              <path d="M6 74 C 50 74, 60 44, 96 44 S 150 52, 180 40 S 230 14, 260 20 S 300 8, 314 10" fill="none" stroke="#E2402F" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="6" cy="74" r="3.5" fill="#E2402F" />
              <circle cx="314" cy="10" r="3.5" fill="#E2402F" />
            </svg>
            <div className="mt-1 flex justify-between px-1 text-[10px] text-black/40">
              <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span>
            </div>
          </div>

          {/* Transacciones */}
          <p className="text-[13px] font-bold text-black" style={{ marginTop: 14, marginBottom: 8 }}>Transacciones</p>
          <div className="flex flex-col gap-2">
            {rows.map((r, k) => (
              <div key={`${r.name}-${idx}-${k}`} className="flex items-center gap-3 rounded-[12px] border border-black/[0.05] bg-[#FAFAF9] px-3 py-2.5" style={k === 0 ? { animation: "fadeSlideIn 0.45s ease-out" } : undefined}>
                <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: r.color }}>{initials(r.name)}</span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-[13px] font-semibold text-black">{r.name}</span>
                  <span className="block text-[11px] text-black/45">{r.method}</span>
                </span>
                <span className="text-right leading-tight">
                  <span className="block text-[13px] font-bold text-black">${fmt(r.amount)}</span>
                  <span className="block text-[11px] font-semibold text-[#16A34A]">Aprobado</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logos de métodos (circulares, sobresaliendo abajo) */}
      <div className="relative z-10 -mt-5 flex items-center justify-center gap-3">
        {METHODS.map((src) => (
          <span key={src} className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-black/[0.06] bg-white" style={{ boxShadow: "0 8px 22px rgba(0,0,0,0.18)" }}>
            <Image src={src} alt="" width={60} height={40} className="h-6 w-auto object-contain" />
          </span>
        ))}
      </div>
    </div>
  );
}
