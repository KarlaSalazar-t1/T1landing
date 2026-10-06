"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FUENTE, UI } from "@/components/T1FinanzasTokens";

/* ──────────────────────────────────────────────────────────────────────────
   El aviso que flota sobre el panel del hero: un pedido que acaba de entrar
   y está listo para facturar. Va cambiando de pedido —y de canal— para que
   se entienda que llegan de todos lados, no de uno solo.
   ────────────────────────────────────────────────────────────────────────── */

const PEDIDOS = [
  { canal: "Mercado Libre", logo: "/img/meli-iso.svg", total: "$12,996.00" },
  { canal: "Amazon", logo: "/img/amazon-iso.svg", total: "$8,990.00" },
  { canal: "Tienda Nube", logo: "/img/tiendanube.svg", total: "$34,500.00" },
  { canal: "TikTok Shop", logo: "/img/tiktokshop.svg", total: "$4,980.00" },
];

export default function AvisoPedido() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % PEDIDOS.length), 3200);
    return () => clearInterval(t);
  }, []);

  const p = PEDIDOS[i];

  return (
    <div
      className="flex items-center gap-3 rounded-[14px] border bg-white px-3.5 py-3"
      aria-hidden
      style={{
        fontFamily: FUENTE,
        borderColor: UI.bordeSuave,
        boxShadow: "0 22px 50px rgba(0,0,0,0.30)",
        animation: "fadeSlideIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s both, float 5s ease-in-out 1.3s infinite",
      }}
    >
      <span
        className="relative flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full border bg-white"
        style={{ borderColor: UI.borde }}
      >
        <Image key={p.canal} src={p.logo} alt="" width={32} height={32} className="h-[17px] w-[17px] object-contain" style={{ animation: "fadeSlideIn 0.35s ease-out" }} />
        <span className="absolute -right-[2px] -top-[2px] h-[9px] w-[9px] rounded-full border-2 border-white" style={{ background: UI.rojo }} />
      </span>

      <span className="min-w-0 flex-1 leading-tight">
        <span className="block whitespace-nowrap font-bold" style={{ fontSize: 11.5, color: UI.texto }}>
          Nuevo pedido por facturar
        </span>
        <span
          key={p.canal}
          className="block whitespace-nowrap"
          style={{ fontSize: 10.5, color: UI.tenue, animation: "fadeSlideIn 0.35s ease-out" }}
        >
          {p.canal} · {p.total}
        </span>
      </span>

      {/* En móvil el botón sobra: la tarjeta ya es angosta. */}
      <span
        className="ml-1 hidden shrink-0 rounded-[8px] px-2.5 py-1.5 font-semibold text-white tablet:inline-block"
        style={{ background: UI.rojo, fontSize: 10.5 }}
      >
        Facturar
      </span>
    </div>
  );
}
