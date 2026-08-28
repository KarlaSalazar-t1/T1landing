"use client";

import { useEffect, useState } from "react";

/* Panel pequeño de checkout "Origen MX" — cicla el monto y la forma de pago. */
const CHECKOUTS = [
  { total: "$1,345.99", item: "Tenis blancos clásicos", method: "Visa ••4242", icon: "/img/icons/visa.svg" },
  { total: "$899.00", item: "Audífonos inalámbricos", method: "Mastercard ••8210", icon: "/img/icons/mastercard.svg" },
  { total: "$2,499.00", item: "Reloj deportivo", method: "SPEI", icon: "/img/icons/spei.svg" },
  { total: "$549.50", item: "Mochila urbana", method: "Amex ••1005", icon: "/img/icons/amex.svg" },
];

export function OrigenCheckoutPanel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % CHECKOUTS.length), 2600);
    return () => clearInterval(t);
  }, []);
  const c = CHECKOUTS[i];
  return (
    <div className="mx-auto w-full overflow-hidden rounded-[16px] bg-white" style={{ maxWidth: 300, boxShadow: "0 18px 44px rgba(0,0,0,0.35)" }}>
      <div className="flex h-[44px] items-center gap-2 border-b border-black/[0.06] px-4">
        <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#DB3B2B] font-sora text-[10px] font-bold text-white">O</span>
        <span className="font-sora text-[13px] font-semibold text-black">Origen MX</span>
        <span className="ml-auto font-inter text-[10px] text-black/40">Checkout</span>
      </div>
      <div className="flex flex-col px-4 py-4">
        <p className="text-center font-inter text-[11px] text-black/45">Total a pagar</p>
        <p key={`t-${i}`} className="text-center font-sora text-[32px] font-light text-black" style={{ letterSpacing: "-0.03em", lineHeight: 1, marginTop: 4, animation: "fadeSlideIn 0.4s ease-out" }}>{c.total}</p>
        <p key={`n-${i}`} className="text-center font-inter text-[11px] text-black/50" style={{ marginTop: 5, marginBottom: 16, animation: "fadeSlideIn 0.4s ease-out" }}>{c.item}</p>
        <div key={`m-${i}`} className="flex items-center gap-2 rounded-[10px] border px-3 py-2.5" style={{ borderColor: "rgba(219,59,43,0.4)", marginBottom: 12, animation: "fadeSlideIn 0.4s ease-out" }}>
          <span className="flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full border border-[#DB3B2B]"><span className="h-[7px] w-[7px] rounded-full bg-[#DB3B2B]" /></span>
          <span className="flex-1 font-inter text-[12px] text-black/75">{c.method}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.icon} alt="" style={{ height: 14, width: "auto" }} />
        </div>
        <div className="relative flex h-[44px] items-center justify-center overflow-hidden rounded-[11px] bg-[#DB3B2B] font-inter text-[13px] font-semibold text-white">
          Pagar ahora
          <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[44px] w-[44px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "rgba(255,255,255,0.5)", animation: "tapRipple 0.9s ease-out infinite" }} />
        </div>
      </div>
    </div>
  );
}
