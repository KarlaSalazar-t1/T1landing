"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const FONT = "var(--font-manrope-var), sans-serif";

/* Métodos del checkout — el seleccionado va ciclando. */
const METHODS = [
  { id: "card", name: "Tarjeta de crédito o débito", sub: "Hasta 18 meses sin intereses", logos: ["/img/icons/visa.svg", "/img/icons/mastercard.svg", "/img/icons/amex.svg"] },
  { id: "spei", name: "Transferencia SPEI", sub: "Se acredita en minutos", logos: ["/img/icons/spei.svg"] },
  { id: "kueski", name: "Kueski Pay", sub: "Compra ahora, paga después", logos: ["/img/icons/kueski.svg"] },
];

/* Símbolo T1 (mismo trazo que el del checkout en PagoMockups). */
const T1Mark = ({ size = 22, fill = "#fff" }: { size?: number; fill?: string }) => (
  <svg width={size} height={Math.round((size * 44) / 45)} viewBox="0 0 45 44" fill="none" aria-label="T1">
    <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985C31.7332 19.1985 31.7332 19.1985 31.7332 19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457C39.6169 19.2457 39.6169 19.1985 39.6169 19.1513C39.6169 19.1041 39.6169 19.1041 39.6169 19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill={fill} />
    <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506C21.867 13.2034 21.867 13.0617 21.867 13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592C22.2919 12.2592 22.3391 12.2592 22.4335 12.2592H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781C32.6303 6.02781 32.6303 5.9806 32.6303 5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill={fill} />
  </svg>
);

function useCycle(len: number, ms: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % len), ms);
    return () => clearInterval(t);
  }, [len, ms]);
  return i;
}

/* Checkout de la tienda (claro, como lo ve el comprador): producto, total,
   métodos de pago que van ciclando y el aviso de pago aprobado. */
export default function T1TiendaCobraCard() {
  const i = useCycle(METHODS.length, 2200);
  return (
    <div className="relative w-full max-w-[360px]" style={{ fontFamily: FONT }}>
      <div className="rounded-[20px] bg-white p-5" style={{ boxShadow: "0 30px 70px rgba(0,0,0,0.55)" }}>
        {/* Cabecera del checkout */}
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-bold text-black">Finaliza tu compra</p>
          <span className="flex items-center gap-1 rounded-full bg-[#F3F4F6] px-2 py-1 text-[10px] font-semibold text-black/60">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
            Pago seguro
          </span>
        </div>

        {/* Producto + total */}
        <div className="mt-4 flex items-center gap-3 rounded-[12px] bg-[#F7F7F8] p-2.5">
          <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-white">
            <Image src="/img/tennis-big.png" alt="" width={40} height={28} className="object-contain" />
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[12.5px] font-semibold text-black">Sneakers Court</p>
            <p className="text-[11px] text-black/50">Talla 27 · Envío gratis</p>
          </div>
          <span className="text-[14px] font-bold text-black">$2,192</span>
        </div>

        {/* Pago exprés — Paga con T1 */}
        <p className="mt-4 text-center text-[11.5px] font-medium text-black/55">Pago exprés</p>
        <div className="mt-2 flex h-[42px] items-center justify-center gap-1.5 rounded-[12px] bg-[#DB3B2B]">
          <span className="text-[13px] font-semibold text-white">Paga con</span>
          <T1Mark size={20} />
        </div>
        <div className="my-3 flex items-center gap-3">
          <span className="h-px flex-1 bg-black/[0.10]" />
          <span className="text-[11px] text-black/40">o</span>
          <span className="h-px flex-1 bg-black/[0.10]" />
        </div>

        {/* Métodos de pago */}
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-black/45">Elige cómo pagar</p>
        <div className="flex flex-col gap-2">
          {METHODS.map((m, k) => {
            const on = k === i;
            return (
              <div
                key={m.id}
                className="flex items-center gap-3 rounded-[12px] border px-3 py-2.5"
                style={{ borderColor: on ? "#DB3B2B" : "rgba(0,0,0,0.09)", background: on ? "rgba(219,59,43,0.04)" : "#fff", transition: "all 0.35s ease" }}
              >
                <span className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border-2" style={{ borderColor: on ? "#DB3B2B" : "rgba(0,0,0,0.2)", transition: "border-color 0.35s ease" }}>
                  <span className="h-[7px] w-[7px] rounded-full bg-[#DB3B2B]" style={{ transform: on ? "scale(1)" : "scale(0)", transition: "transform 0.3s ease" }} />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-[12.5px] font-semibold text-black">{m.name}</span>
                  <span className="block text-[10.5px] text-black/50">{m.sub}</span>
                </span>
                <span className="flex shrink-0 items-center gap-1">
                  {m.logos.map((src) => (
                    <Image key={src} src={src} alt="" width={30} height={18} className="h-[13px] w-auto object-contain" />
                  ))}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex h-[44px] items-center justify-center rounded-[12px] bg-[#DB3B2B] text-[13.5px] font-semibold text-white">
          Pagar $2,192.40
        </div>
      </div>

      {/* Aviso de pago aprobado — aparece con cada método */}
      <div
        key={i}
        className="absolute -right-4 -top-5 flex items-center gap-2 rounded-[14px] bg-white px-3 py-2 tablet:-right-10"
        style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.35)", animation: "fadeSlideIn 0.45s ease-out both", animationDelay: "0.9s" }}
      >
        <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#16A34A]">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <span className="leading-tight">
          <span className="block text-[11.5px] font-bold text-black">Pago aprobado</span>
          <span className="block text-[10px] text-black/50">Llega a tu cuenta mañana</span>
        </span>
      </div>
    </div>
  );
}
