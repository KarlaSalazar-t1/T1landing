"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/* ── Chip colors ── */
const GRAY = { chipColor: "#6B7280", chipBg: "rgba(107,114,128,0.08)" };
const RED = { chipColor: "#D93A26", chipBg: "rgba(217,58,38,0.08)" };
const GREEN = { chipColor: "#22C55E", chipBg: "rgba(34,197,94,0.08)" };

/* ── Row type ── */
type OrderRow = {
  id: string;
  fecha: string;
  canalSrc?: string;
  canalEmoji?: string;
  canal: string;
  productos: string;
  estatus: string;
  chipColor: string;
  chipBg: string;
};

const INITIAL_ROWS: OrderRow[] = [
  { id: "#112", fecha: "17/06/2024\n5:34 hrs", canalSrc: "/img/tiktok-isotipo.png", canal: "Tiktok", productos: "2 productos", estatus: "Por enviar", ...GRAY },
  { id: "#111", fecha: "16/06/2024\n3:12 hrs", canalSrc: "/img/shein-iso.svg", canal: "SHEIN", productos: "1 producto", estatus: "Enviado", ...GRAY },
  { id: "#110", fecha: "15/06/2024\n9:45 hrs", canalEmoji: "🏪", canal: "Tienda en línea", productos: "3 productos", estatus: "Por preparar", ...GRAY },
  { id: "#109", fecha: "14/06/2024\n2:24 hrs", canalSrc: "/img/meli-iso.svg", canal: "Mercado libre", productos: "2 productos", estatus: "Entregado", ...GRAY },
  { id: "#108", fecha: "13/06/2024\n5:34 hrs", canalSrc: "/img/amazon-iso.svg", canal: "Amazon", productos: "1 productos", estatus: "Cancelado", ...RED },
  { id: "#107", fecha: "12/06/2024\n1:18 hrs", canalSrc: "/img/walmart.svg", canal: "Walmart", productos: "4 productos", estatus: "Enviado", ...GRAY },
  { id: "#106", fecha: "11/06/2024\n8:00 hrs", canalEmoji: "🏪", canal: "Tienda en línea", productos: "1 producto", estatus: "Entregado", ...GRAY },
  { id: "#105", fecha: "10/06/2024\n4:30 hrs", canalSrc: "/img/meli-iso.svg", canal: "Mercado libre", productos: "", estatus: "Devolución", ...GRAY },
];

const NEW_ROW: OrderRow = {
  id: "#113", fecha: "Ahora", canalSrc: "/img/amazon-iso.svg", canal: "Amazon", productos: "1 producto", estatus: "Por enviar", ...GRAY,
};

/* 6 additional rows — each appears at the TOP, pushing others down */
const EXTRA_ROWS: OrderRow[] = [
  { id: "#114", fecha: "Ahora", canalSrc: "/img/shein-iso.svg", canal: "SHEIN", productos: "2 productos", estatus: "Por enviar", ...GRAY },
  { id: "#115", fecha: "Ahora", canalEmoji: "🏪", canal: "Tienda en línea", productos: "1 producto", estatus: "Pendiente", ...GRAY },
  { id: "#116", fecha: "Ahora", canalSrc: "/img/meli-iso.svg", canal: "Mercado Libre", productos: "3 productos", estatus: "Por enviar", ...GRAY },
  { id: "#117", fecha: "Ahora", canalSrc: "/img/tiktok-isotipo.png", canal: "Tiktok", productos: "1 producto", estatus: "Por preparar", ...GRAY },
  { id: "#118", fecha: "Ahora", canalSrc: "/img/amazon-iso.svg", canal: "Amazon", productos: "2 productos", estatus: "Pendiente", ...GRAY },
  { id: "#119", fecha: "Ahora", canalSrc: "/img/walmart.svg", canal: "Walmart", productos: "1 producto", estatus: "Por enviar", ...GRAY },
];

const gridCols = "50px 90px 1fr 110px 100px";
const font = "var(--font-manrope-var), sans-serif";

/* ── Sidebar nav icons (SVG file paths) ── */
const SIDEBAR_ICONS = [
  { src: "/img/icons/home.svg", label: "Inicio" },
  { src: "/img/icons/pedido.svg", label: "Pedidos" },
  { src: "/img/icons/producto.svg", label: "Productos" },
  { src: "/img/icons/cliente.svg", label: "Clientes" },
  { src: "/img/icons/canal-de-venta-24.svg", label: "Canales" },
  { src: "/img/icons/metricas.svg", label: "Métricas" },
  { src: "/img/icons/pagos.svg", label: "Pagos" },
  { src: "/img/icons/descuento.svg", label: "Descuentos" },
  { src: "/img/icons/tienda.svg", label: "Tienda" },
];

/* ── Sub components ── */
function StatusChip({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span className="inline-block w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ color, background: bg }}>
      {label}
    </span>
  );
}

function CanalIcon({ row }: { row: { canalSrc?: string; canalEmoji?: string } }) {
  if (row.canalSrc) return <Image src={row.canalSrc} alt="" width={16} height={16} className="shrink-0 rounded-full object-contain" />;
  if (row.canalEmoji) return <span className="shrink-0 text-[12px]">{row.canalEmoji}</span>;
  return null;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="transition-transform duration-200" style={{ transform: open ? "rotate(180deg)" : "none" }}>
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Main ──
   Renders the desktop "T1tienda" admin frame (glass + inner white +
   header bar + sidebar). The right content area defaults to the Mis pedidos
   table, but `contentOverride` lets callers (e.g. DesktopTiendaPanel) swap
   in a different view (Canales de Venta) while keeping the same frame. */
export default function PedidosPanel({
  animate,
  contentOverride,
  activeIconLabel = "Pedidos",
}: {
  animate: boolean;
  contentOverride?: React.ReactNode;
  activeIconLabel?: string;
}) {
  const [showNew, setShowNew] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [extraCount, setExtraCount] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  // Reset animation when animate toggles off→on (scroll back up and re-enter)
  useEffect(() => {
    if (animate) {
      // Reset all states
      setShowNew(false);
      setShowProduct(false);
      setExtraCount(0);
      setAnimKey((k) => k + 1);
    }
  }, [animate]);

  useEffect(() => {
    if (!animate) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    // 1: first new row
    timers.push(setTimeout(() => setShowNew(true), 1800));
    // 2: expand product
    timers.push(setTimeout(() => setShowProduct(true), 3000));
    // 3-8: add 6 more rows one by one — slower pace
    for (let i = 0; i < 6; i++) {
      timers.push(setTimeout(() => setExtraCount(i + 1), 5500 + i * 1800));
    }
    return () => timers.forEach(clearTimeout);
  }, [animate, animKey]);

  return (
    <div
      className="relative h-full"
      style={{
        padding: "12px 0 0 12px",
        borderRadius: "20px 0 0 0",
        background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.05) 60%, transparent 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 -4px 40px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.4), inset 1px 0 0 rgba(255,255,255,0.3)",
      }}
    >
    <div
      className="relative flex h-full overflow-hidden bg-white"
      style={{
        borderRadius: "14px 0 0 0",
        boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
        fontFamily: font,
      }}
    >
      {/* Full layout — header bar on top, then sidebar + content below */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header bar — collapse icon + T1tienda logo */}
        <div className="flex items-center gap-2 border-b border-black/[0.06] bg-white px-4" style={{ paddingTop: 14, paddingBottom: 12 }}>
          <Image src="/img/icons/colapse.svg" alt="" width={20} height={20} style={{ opacity: 0.35 }} />
          <div className="flex items-center gap-1">
            <svg width="28" height="27" viewBox="0 0 45 44" fill="none">
              <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457V19.1513V19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#D93A26" />
              <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592H22.4335H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#D93A26" />
            </svg>
            <span className="font-sora text-[16px] font-bold text-black">tienda</span>
          </div>
        </div>

        {/* Body — sidebar + content side by side */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar icons — bigger */}
          <div
            className="flex flex-col items-center gap-2 border-r border-black/[0.06] bg-white"
            style={{ width: 80, paddingTop: 16, paddingBottom: 16 }}
          >
            {SIDEBAR_ICONS.map((icon, i) => {
              const isActive = icon.label === activeIconLabel;
              return (
                <div
                  key={i}
                  className="flex h-[44px] w-[44px] items-center justify-center rounded-[12px] transition-colors duration-300"
                  style={{ background: isActive ? "#F0F0F0" : "transparent" }}
                >
                  <Image
                    src={icon.src}
                    alt={icon.label}
                    width={28}
                    height={28}
                    style={{ opacity: isActive ? 1 : 0.4, transition: "opacity 0.3s" }}
                  />
                </div>
              );
            })}
          </div>

          {/* Content area — defaults to Mis pedidos; can be overridden */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {contentOverride ? (
              <>{contentOverride}</>
            ) : (
              <>
        {/* Pedidos header */}
        <div className="flex items-center gap-3 border-b border-black/[0.04] px-5" style={{ paddingTop: 18, paddingBottom: 14 }}>
          <h3 className="text-[18px] font-bold text-black">Mis pedidos</h3>
          <span className="flex items-center gap-1 text-[11px] font-medium text-black/40">
            Todos los canales <Chevron open={false} />
          </span>
        </div>

        {/* Table header */}
        <div
          className="grid border-b border-black/[0.04] px-4 text-[9px] font-semibold uppercase tracking-wide text-black/35"
          style={{ gridTemplateColumns: gridCols, paddingTop: 8, paddingBottom: 6, gap: "0 12px" }}
        >
          <span>Id ⇅</span>
          <span>Fecha</span>
          <span>Canal de venta</span>
          <span>Productos</span>
          <span>Estatus</span>
        </div>

        {/* Rows */}
        <div className="flex-1 overflow-hidden">
          {/* Extra rows — newest on top, each slides in from above */}
          {EXTRA_ROWS.slice(0, extraCount).reverse().map((row, i) => (
            <div
              key={row.id}
              className="grid items-center border-b border-black/[0.04] px-4"
              style={{ gridTemplateColumns: gridCols, paddingTop: 14, paddingBottom: 14, gap: "0 12px", animation: "slideRowIn 0.8s ease-out" }}
            >
              <span className="text-[10px] font-semibold text-black/70">{row.id}</span>
              <span className="text-[9px] text-black/50">{row.fecha}</span>
              <span className="flex items-center gap-1.5 text-[10px] text-black/70">
                <CanalIcon row={row} />{row.canal}
              </span>
              <span className="text-[10px] text-black/50">{row.productos}</span>
              <StatusChip label={row.estatus} color={row.chipColor} bg={row.chipBg} />
            </div>
          ))}

          {/* New row (#107) */}
          {showNew && (
            <>
              <div
                className="grid items-center border-b border-black/[0.04] px-4"
                style={{ gridTemplateColumns: gridCols, paddingTop: 14, paddingBottom: 14, gap: "0 12px", background: "rgba(0,0,0,0.015)", animation: "slideRowIn 0.6s ease-out" }}
              >
                <span className="text-[10px] font-semibold text-black/70">{NEW_ROW.id}</span>
                <span className="text-[9px] text-black/50">{NEW_ROW.fecha}</span>
                <span className="flex items-center gap-1.5 text-[10px] text-black/70">
                  <CanalIcon row={NEW_ROW} />{NEW_ROW.canal}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-black/50">
                  {NEW_ROW.productos} <Chevron open={showProduct} />
                </span>
                <StatusChip label={NEW_ROW.estatus} color={NEW_ROW.chipColor} bg={NEW_ROW.chipBg} />
              </div>

              {showProduct && (
                <div
                  className="flex items-center gap-2 border-b border-black/[0.04] bg-black/[0.01] px-4"
                  style={{ paddingTop: 6, paddingBottom: 6, paddingLeft: 60, animation: "slideRowIn 0.4s ease-out" }}
                >
                  <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center overflow-hidden rounded-[5px] bg-gray-50">
                    <Image src="/img/tennis-tabla.png" alt="Tenis" width={26} height={26} className="object-contain" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-black/80">Tenis blancos clasicos</p>
                    <p className="text-[9px] text-black/40">102292 / 14229-2</p>
                  </div>
                  <span className="ml-auto text-[10px] font-semibold text-black/60">$1,345.99</span>
                </div>
              )}
            </>
          )}

          {/* Initial rows */}
          {INITIAL_ROWS.map((row) => (
            <div
              key={row.id}
              className="grid items-center border-b border-black/[0.04] px-4"
              style={{ gridTemplateColumns: gridCols, paddingTop: 14, paddingBottom: 14, gap: "0 12px" }}
            >
              <span className="text-[10px] font-semibold text-black/70">{row.id}</span>
              <span className="whitespace-pre-line text-[9px] text-black/50">{row.fecha}</span>
              <span className="flex items-center gap-1.5 text-[10px] text-black/70">
                <CanalIcon row={row} />{row.canal}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-black/50">
                {row.productos}
                {row.productos && <Chevron open={false} />}
              </span>
              <StatusChip label={row.estatus} color={row.chipColor} bg={row.chipBg} />
            </div>
          ))}
        </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
