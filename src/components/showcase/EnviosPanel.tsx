"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ShipmentRow = {
  guia: string;
  paqueteria: string;
  logoSrc: string;
  fecha: string;
  canalVenta: string;
  costo: string;
  estado: string;
  estadoColor: string;
  estadoBg: string;
};

const INITIAL_ROWS: ShipmentRow[] = [
  { guia: "43567890082", paqueteria: "FedEx", logoSrc: "/img/icons/fedex-logo.svg", fecha: "26 de ene\n2:24 hrs", canalVenta: "T1 Envíos", costo: "$87.45 MXN", estado: "En camino", estadoColor: "#6B7280", estadoBg: "rgba(107,114,128,0.08)" },
  { guia: "43567890082", paqueteria: "DHL", logoSrc: "/img/dhl-iso.svg", fecha: "26 de ene\n2:24 hrs", canalVenta: "Shopify", costo: "$449.00 MXN", estado: "Entregado", estadoColor: "#22C55E", estadoBg: "rgba(34,197,94,0.08)" },
  { guia: "43567890082", paqueteria: "99minutos", logoSrc: "/img/99min-iso.svg", fecha: "26 de ene\n2:24 hrs", canalVenta: "Shopify", costo: "$87.45 MXN", estado: "Recolectado", estadoColor: "#6B7280", estadoBg: "rgba(107,114,128,0.08)" },
  { guia: "43567890082", paqueteria: "99minutos", logoSrc: "/img/99min-iso.svg", fecha: "26 de ene\n2:24 hrs", canalVenta: "T1 Envíos", costo: "$87.45 MXN", estado: "Por recolectar", estadoColor: "#6B7280", estadoBg: "rgba(107,114,128,0.08)" },
  { guia: "43567890082", paqueteria: "FedEx", logoSrc: "/img/icons/fedex-logo.svg", fecha: "26 de ene\n2:24 hrs", canalVenta: "Amazon", costo: "$87.45 MXN", estado: "Entregado", estadoColor: "#22C55E", estadoBg: "rgba(34,197,94,0.08)" },
  { guia: "43567890082", paqueteria: "DHL", logoSrc: "/img/dhl-iso.svg", fecha: "26 de ene\n2:24 hrs", canalVenta: "T1 Envíos", costo: "$87.45", estado: "En camino", estadoColor: "#6B7280", estadoBg: "rgba(107,114,128,0.08)" },
];

const EXTRA_ROWS: ShipmentRow[] = [
  { guia: "98765432100", paqueteria: "99minutos", logoSrc: "/img/99min-iso.svg", fecha: "Ahora", canalVenta: "T1 Envíos", costo: "$78.00 MXN", estado: "Por recolectar", estadoColor: "#6B7280", estadoBg: "rgba(107,114,128,0.08)" },
  { guia: "55667788990", paqueteria: "FedEx", logoSrc: "/img/icons/fedex-logo.svg", fecha: "Ahora", canalVenta: "MeLi", costo: "$95.50 MXN", estado: "En camino", estadoColor: "#6B7280", estadoBg: "rgba(107,114,128,0.08)" },
  { guia: "11223344556", paqueteria: "DHL", logoSrc: "/img/dhl-iso.svg", fecha: "Ahora", canalVenta: "Amazon", costo: "$210.00 MXN", estado: "Recolectado", estadoColor: "#6B7280", estadoBg: "rgba(107,114,128,0.08)" },
];

const gridCols = "minmax(0,1.5fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,0.8fr) 24px";
const font = "var(--font-manrope-var), sans-serif";

function RowItem({ row, animated }: { row: ShipmentRow; animated?: boolean }) {
  return (
    <div
      className="grid items-center border-b border-black/[0.04] px-5"
      style={{ gridTemplateColumns: gridCols, paddingTop: 12, paddingBottom: 12, gap: "0 10px", animation: animated ? "slideRowIn 0.8s ease-out" : undefined }}
    >
      <div className="flex items-center gap-2.5">
        <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center overflow-hidden rounded-[8px]">
          <Image src={row.logoSrc} alt="" width={26} height={26} className="object-contain" style={{ transform: "none" }} />
        </div>
        <div>
          <p className="text-[10px] font-semibold text-black/70">{row.guia}</p>
          <p className="text-[9px] text-black/40">{row.paqueteria}</p>
        </div>
      </div>
      <span className="whitespace-pre-line text-[9px] text-black/50">{row.fecha}</span>
      <span className="text-[10px] text-black/60">{row.canalVenta}</span>
      <span className="text-[10px] font-semibold text-black/70">{row.costo}</span>
      <span className="inline-block w-fit rounded-full px-2 py-0.5 text-[9px] font-semibold" style={{ color: row.estadoColor, background: row.estadoBg }}>{row.estado}</span>
      <span className="text-[12px] text-black/20">•••</span>
    </div>
  );
}

export default function EnviosPanel({ animate }: { animate: boolean }) {
  const [extraCount, setExtraCount] = useState(0);

  useEffect(() => {
    if (!animate) { setExtraCount(0); return; }
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < 3; i++) {
      timers.push(setTimeout(() => setExtraCount(i + 1), 3000 + i * 2000));
    }
    return () => timers.forEach(clearTimeout);
  }, [animate]);

  return (
    <div className="relative h-full" style={{ paddingTop: 12, paddingLeft: 12 }}>
      {/* Glass border frame */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: "18px 0 0 0",
          background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.03) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), inset 1px 0 0 rgba(255,255,255,0.3)",
        }}
      />

      {/* White panel inside */}
      <div
        className="relative flex h-full flex-col overflow-hidden bg-white"
        style={{ borderRadius: "14px 0 0 0", fontFamily: font }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-black/[0.06] px-5" style={{ paddingTop: 16, paddingBottom: 12 }}>
          <h3 className="text-[18px] font-bold text-black">Mis envíos</h3>
        </div>

        {/* Search bar */}
        <div className="px-5" style={{ paddingTop: 10, paddingBottom: 8 }}>
          <div className="flex items-center gap-2 rounded-[8px] border border-black/[0.06] bg-[#FAFAFA] px-3 py-1.5">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" />
              <path d="M11 11L14 14" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="text-[10px] text-black/25">Buscar por guía, paquetería...</span>
          </div>
        </div>

        {/* Table header */}
        <div
          className="grid border-b border-black/[0.06] px-5 text-[9px] font-semibold uppercase tracking-wide text-black/35"
          style={{ gridTemplateColumns: gridCols, paddingTop: 8, paddingBottom: 6, gap: "0 10px" }}
        >
          <span>Guía</span>
          <span>Fecha ⇅</span>
          <span>Canal de venta</span>
          <span>Costo ⇅</span>
          <span>Estado</span>
          <span></span>
        </div>

        {/* Rows */}
        <div className="flex-1 overflow-hidden">
          {EXTRA_ROWS.slice(0, extraCount).reverse().map((row, i) => (
            <RowItem
              key={`extra-${row.guia}-${row.paqueteria}`}
              row={row}
              animated={i === 0}
            />
          ))}
          {INITIAL_ROWS.map((row, i) => (
            <RowItem key={`init-${i}`} row={row} />
          ))}
        </div>
      </div>
    </div>
  );
}
