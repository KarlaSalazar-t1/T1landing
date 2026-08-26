"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const FONT = "var(--font-manrope-var), sans-serif";

const PAY_METHODS = [
  { name: "Visa", src: "/img/icons/visa.svg" },
  { name: "Mastercard", src: "/img/icons/mastercard.svg" },
  { name: "SPEI", src: "/img/icons/spei.svg" },
  { name: "Kueski", src: "/img/icons/kueski.svg" },
];

function useCycle(len: number, ms: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % len), ms);
    return () => clearInterval(t);
  }, [len, ms]);
  return i;
}

function Row({ label, value, green = false }: { label: string; value: string; green?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/45">{label}</span>
      <span className={green ? "font-medium text-[#4ADE80]" : "font-medium text-white/75"}>{value}</span>
    </div>
  );
}

/* Checkout animado: el método de pago cicla (Visa · Mastercard · SPEI · Kueski). */
export default function T1TiendaCobraCard() {
  const i = useCycle(PAY_METHODS.length, 1500);
  const m = PAY_METHODS[i];
  return (
    <div className="w-[320px] rounded-[18px] border border-white/[0.14] bg-white/[0.06] p-5 backdrop-blur-sm" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.14)", fontFamily: FONT }}>
      <p className="text-[14px] font-bold text-white">Resumen de tu compra</p>
      <div className="mt-4 flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="flex h-[46px] w-[46px] items-center justify-center overflow-hidden rounded-[10px] bg-white/[0.08]">
          <Image src="/img/tennis-big.png" alt="" width={40} height={28} className="object-contain" />
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-medium text-white">Sneakers Court</p>
          <p className="text-[12px] text-white/45">Talla 27 · x1</p>
        </div>
        <span className="text-[13px] font-semibold text-white">$1,890</span>
      </div>
      <div className="mt-3 flex flex-col gap-1.5 text-[12px]">
        <Row label="Subtotal" value="$1,890.00" />
        <Row label="Envío" value="Gratis" green />
        <Row label="IVA" value="$302.40" />
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-[14px] font-bold text-white">Total</span>
        <span className="text-[18px] font-bold text-white">$2,192.40</span>
      </div>
      {/* Método de pago (cicla) */}
      <div className="mt-3 flex items-center justify-between rounded-[10px] border border-white/12 px-3 py-2.5">
        <span className="text-[12px] text-white/50">Método de pago</span>
        <span key={i} className="flex items-center gap-2" style={{ animation: "fadeSlideIn 0.35s ease-out" }}>
          <span className="flex h-[22px] items-center justify-center rounded-[5px] bg-white px-1.5"><Image src={m.src} alt={m.name} width={34} height={22} className="h-[14px] w-auto object-contain" /></span>
          <span className="text-[12px] font-semibold text-white">{m.name}</span>
        </span>
      </div>
      <div className="mt-3 w-full rounded-[12px] bg-black py-3 text-center text-[13px] font-semibold text-white">Pagar ahora</div>
    </div>
  );
}
