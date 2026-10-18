"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PanelFacturacionLimpio } from "@/components/T1FinanzasSecciones";

/* Paneles de la tab "Factura tus ventas" del ecosistema (home). Usan la misma
   pantalla de Facturación que la landing de T1 Finanzas. */

const FONT = "var(--font-manrope-var), 'Manrope', sans-serif";

/* Tus facturas — la pantalla de Facturación de T1 Finanzas */
/* Alto común de los dos paneles de la tab "Factura tus ventas" */
const ALTO_PANEL = { desktop: 300, compact: 300 };

export function FacturasPanel({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex h-full items-center justify-center ${compact ? "px-4 py-2" : "px-10 py-6"}`}>
      <div className="w-full" style={{ maxWidth: compact ? 340 : 460, height: compact ? ALTO_PANEL.compact : ALTO_PANEL.desktop }}>
        <PanelFacturacionLimpio />
      </div>
    </div>
  );
}

/* Pedidos de tus canales que llegan listos para facturar */
const PEDIDOS = [
  { logo: "/img/circles/ml.svg", canal: "Mercado Libre", pedido: "#2000013658", total: "$1,890.00" },
  { logo: "/img/circles/amazon.svg", canal: "Amazon", pedido: "#702-8812345", total: "$899.00" },
  { logo: "/img/circles/shein.svg", canal: "SHEIN", pedido: "#GSH77310", total: "$459.00" },
  { logo: "/img/circles/sears.svg", canal: "Sears", pedido: "#SR-55120", total: "$2,349.00" },
];
export function PedidosFacturarPanel({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex h-full items-center justify-center ${compact ? "px-4 py-2" : "px-10 py-6"}`}>
      <PedidosPorFacturarCard maxWidth={compact ? 340 : 460} alto={compact ? ALTO_PANEL.compact : ALTO_PANEL.desktop} />
    </div>
  );
}

/* La tarjeta "Pedidos por facturar" sola (también la usa la stack card de la home). */
export function PedidosPorFacturarCard({ maxWidth = 460, shadow = "0 10px 30px rgba(0,0,0,0.12)", alto }: { maxWidth?: number; shadow?: string; alto?: number }) {
  return (
    <div style={{ fontFamily: FONT, width: "100%", maxWidth }}>
      <div className="flex w-full flex-col overflow-hidden rounded-[12px] border border-black/[0.06] bg-white" style={{ boxShadow: shadow, height: alto }}>
        <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
          <span className="text-[13px] font-bold text-[#1F1F1F]">Pedidos por facturar</span>
        </div>
        {PEDIDOS.map((p) => (
          <div key={p.pedido} className="flex flex-1 items-center gap-3 border-b border-black/[0.05] px-4 py-2.5 last:border-b-0">
            <Image src={p.logo} alt={p.canal} width={28} height={28} className="h-[28px] w-[28px] shrink-0 rounded-full" />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[11.5px] font-semibold text-[#1F1F1F]">{p.canal}</span>
              <span className="block text-[10px] text-[#828282]">{p.pedido}</span>
            </span>
            <span className="text-[11.5px] font-semibold text-[#1F1F1F]">{p.total}</span>
            <span className="shrink-0 rounded-full bg-[rgba(34,197,94,0.12)] px-2 py-0.5 text-[9.5px] font-bold text-[#16A34A]"><span className="hidden min-[420px]:inline">Listo para facturar</span><span className="min-[420px]:hidden">Listo</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════ Pantalla "Pedidos" de T1 Finanzas (stack card de la home) ══════════
   Réplica de la pantalla real: encabezado, tabla (desktop) o tarjetas (móvil).
   Animación: van entrando pedidos nuevos de distintos canales arriba de la
   lista. "Facturar" emite la factura de ese pedido y aparece un aviso. */

type Canal = "ml" | "amazon" | "shein" | "sears" | "link" | "tienda";
type Pedido = { id: number; canal: Canal; cliente: string; fecha: string; monto: string; facturada: boolean; nuevo?: boolean };

const CANALES: Record<Canal, { nombre: string; logo?: string }> = {
  ml: { nombre: "Mercado Libre", logo: "/img/circles/ml.svg" },
  amazon: { nombre: "Amazon", logo: "/img/circles/amazon.svg" },
  shein: { nombre: "SHEIN", logo: "/img/circles/shein.svg" },
  sears: { nombre: "Sears", logo: "/img/circles/sears.svg" },
  link: { nombre: "Link de pago" },
  tienda: { nombre: "Tienda en línea" },
};

/* Pedidos que van "entrando" (ciclan) */
const ENTRANTES: Omit<Pedido, "id" | "facturada">[] = [
  { canal: "ml", cliente: "Ana Martínez", fecha: "15/10/2026", monto: "$1,890.00" },
  { canal: "amazon", cliente: "Luis Hernández", fecha: "15/10/2026", monto: "$899.00" },
  { canal: "link", cliente: "Cliente por definir", fecha: "15/10/2026", monto: "$693.00" },
  { canal: "shein", cliente: "Sofía Ramírez", fecha: "15/10/2026", monto: "$459.00" },
  { canal: "tienda", cliente: "Carlos Ruiz", fecha: "15/10/2026", monto: "$2,349.00" },
  { canal: "sears", cliente: "María González", fecha: "15/10/2026", monto: "$5,684.00" },
];
const INICIALES: Pedido[] = [
  { id: 792606, canal: "link", cliente: "Cliente por definir", fecha: "15/10/2026", monto: "$693.00", facturada: false },
  { id: 668514, canal: "ml", cliente: "Jorge Castillo", fecha: "15/10/2026", monto: "$1,250.00", facturada: false },
  { id: 881513, canal: "amazon", cliente: "Paola Díaz", fecha: "14/10/2026", monto: "$5,684.00", facturada: true },
  { id: 821032, canal: "sears", cliente: "Raúl Medina", fecha: "14/10/2026", monto: "$3,120.00", facturada: false },
  { id: 710571, canal: "tienda", cliente: "Elena Torres", fecha: "14/10/2026", monto: "$780.00", facturada: true },
];

function IconoCanal({ canal, size = 22 }: { canal: Canal; size?: number }) {
  const c = CANALES[canal];
  if (c.logo) return <Image src={c.logo} alt="" width={size} height={size} className="shrink-0 rounded-full" style={{ width: size, height: size }} />;
  return (
    <span className="flex shrink-0 items-center justify-center text-[#4C4C4C]" style={{ width: size, height: size }}>
      {canal === "link" ? (
        <svg width={size - 2} height={size - 2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" /><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" /></svg>
      ) : (
        <svg width={size - 2} height={size - 2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9l1.2-4h13.6L20 9M4 9h16M4 9v10h16V9M9 19v-5h6v5" /></svg>
      )}
    </span>
  );
}

function Estatus({ facturada }: { facturada: boolean }) {
  return facturada ? (
    <span className="whitespace-nowrap rounded-full bg-[rgba(34,197,94,0.12)] px-2.5 py-1 text-[10.5px] font-semibold text-[#16A34A]">Facturado</span>
  ) : (
    <span className="whitespace-nowrap rounded-full bg-[#F1F1F2] px-2.5 py-1 text-[10.5px] font-semibold text-[#3A3A3A]">Sin facturar</span>
  );
}

/* Cursor de clic simulado (mismo que los mockups de Pagos: flecha + anillo rojo) */
function TapSimulado() {
  return (
    <span className="pointer-events-none absolute z-[6]" style={{ left: "58%", top: "62%" }}>
      <span className="absolute rounded-full" style={{ left: -15, top: -15, width: 30, height: 30, border: "2.5px solid rgba(219,59,43,0.85)", animation: "tapRipple 0.9s ease-out infinite" }} />
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#111827" stroke="white" strokeWidth="1.4" strokeLinejoin="round" style={{ position: "absolute", left: 1, top: 1, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))" }}><path d="M5 2.5l6 17.5 2.3-7.2L20.5 10.5z" /></svg>
    </span>
  );
}

function BotonFacturar({ facturada, tap }: { facturada: boolean; tap: boolean }) {
  if (facturada) return <span className="text-[11px] font-medium text-[#9A9A9A]">Ver factura</span>;
  return (
    <span
      className="relative inline-flex whitespace-nowrap rounded-[8px] border bg-white px-2.5 py-1 text-[11px] font-semibold text-[#1F1F1F]"
      style={{ borderColor: tap ? "#9CA3AF" : "#D4D4D8", background: tap ? "#F4F4F5" : "#fff", transition: "all 0.2s ease" }}
    >
      Facturar
      {tap && <TapSimulado />}
    </span>
  );
}

export function PedidosFinanzasPantalla({ mobile = false, alto, radio = "10px 10px 0 0" }: { mobile?: boolean; alto: number | string; radio?: string }) {
  const [pedidos, setPedidos] = useState<Pedido[]>(INICIALES);
  const [aviso, setAviso] = useState<{ id: number; key: number } | null>(null);
  const [tapId, setTapId] = useState<number | null>(null);
  const sig = useRef(0);
  const avisoKey = useRef(0);

  /* Ciclo simulado (sin interacción del usuario): entra un pedido nuevo arriba
     → el cursor hace clic en "Facturar" → queda "Facturado" y sale el aviso.
     Un pedido cada ~3.2s; máx. 7 en la lista. */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const t = setInterval(() => {
      const base = ENTRANTES[sig.current % ENTRANTES.length];
      const id = 900000 + ((sig.current * 7919) % 99999);
      sig.current += 1;
      setPedidos((prev) => [{ ...base, id, facturada: false, nuevo: true }, ...prev.map((p) => ({ ...p, nuevo: false }))].slice(0, 7));
      timers.push(setTimeout(() => setTapId(id), 900));
      timers.push(
        setTimeout(() => {
          setTapId(null);
          setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, facturada: true } : p)));
          avisoKey.current += 1;
          setAviso({ id, key: avisoKey.current });
        }, 1900),
      );
    }, 3200);
    return () => {
      clearInterval(t);
      timers.forEach(clearTimeout);
    };
  }, []);

  /* El aviso se oculta solo */
  useEffect(() => {
    if (!aviso) return;
    const t = setTimeout(() => setAviso(null), 2400);
    return () => clearTimeout(t);
  }, [aviso]);


  return (
    <div className="relative overflow-hidden bg-white text-left" style={{ height: alto, borderRadius: radio, fontFamily: FONT }}>
      {/* Encabezado de la pantalla */}
      <div className={`flex items-start justify-between gap-3 ${mobile ? "px-4 pt-4" : "px-6 pt-5"}`}>
        <div>
          <p className={`${mobile ? "text-[17px]" : "text-[20px]"} font-semibold text-[#1F1F1F]`}>Pedidos</p>
          <p className={`${mobile ? "text-[11px]" : "text-[12px]"} text-[#6B6B6B]`}>Las ventas de todos tus canales, listas para facturar.</p>
        </div>
        <span className={`shrink-0 rounded-[10px] bg-[#DB3B2B] font-semibold text-white ${mobile ? "px-2.5 py-1.5 text-[10.5px]" : "px-3 py-2 text-[11.5px]"}`}>Factura global</span>
      </div>

      {mobile ? (
        /* Móvil: tarjetas */
        <div className="mt-3 border-t border-black/[0.07]">
          {pedidos.map((p) => (
            <div key={p.id} className="border-b border-black/[0.07] px-4 py-3" style={p.nuevo ? { animation: "fadeSlideIn 0.5s ease-out both", background: "rgba(219,59,43,0.04)" } : undefined}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[13px] text-[#3A3A3A]">{p.id}</span>
                <Estatus facturada={p.facturada} />
              </div>
              <div className="mt-1 flex items-center gap-2 text-[12px] text-[#6B6B6B]"><IconoCanal canal={p.canal} size={18} />{CANALES[p.canal].nombre}</div>
              <div className="mt-2 flex items-end justify-between">
                <div className="leading-tight">
                  <p className="text-[10.5px] text-[#8A8A8A]">{p.cliente}</p>
                  <p className="text-[13px] font-semibold text-[#1F1F1F]">{p.monto}</p>
                </div>
                <BotonFacturar facturada={p.facturada} tap={tapId === p.id} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Desktop: tabla */
        <div className="mx-5 mt-4 overflow-hidden rounded-[12px] border border-black/[0.07]">
          <div className="grid items-center gap-3 border-b border-black/[0.07] px-4 py-2.5 text-[11px] font-medium text-[#6B6B6B]" style={{ gridTemplateColumns: COLS }}>
            <span>ID</span><span>Canal</span><span>Cliente</span><span className="text-right">Monto</span><span>Facturación</span><span className="text-right">Acciones</span>
          </div>
          {pedidos.map((p) => (
            <div
              key={p.id}
              className="grid items-center gap-3 border-b border-black/[0.06] px-4 py-2.5 last:border-b-0"
              style={{ gridTemplateColumns: COLS, ...(p.nuevo ? { animation: "fadeSlideIn 0.5s ease-out both", background: "rgba(219,59,43,0.04)" } : {}) }}
            >
              <span className="font-mono text-[12px] text-[#3A3A3A]">{p.id}</span>
              <span className="flex min-w-0 items-center gap-1.5 text-[11.5px] text-[#4C4C4C]"><IconoCanal canal={p.canal} size={20} /><span className="truncate">{CANALES[p.canal].nombre}</span></span>
              <span className="truncate text-[12px] text-[#1F1F1F]">{p.cliente}</span>
              <span className="text-right text-[12px] font-medium text-[#1F1F1F]">{p.monto}</span>
              <span><Estatus facturada={p.facturada} /></span>
              <span className="flex justify-end"><BotonFacturar facturada={p.facturada} tap={tapId === p.id} /></span>
            </div>
          ))}
        </div>
      )}

      {/* Aviso "Factura emitida" */}
      {aviso && (
        <div
          key={aviso.key}
          className={`absolute left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5 rounded-[12px] border border-black/[0.06] bg-white px-3.5 py-2.5 text-[#1F1F1F] ${mobile ? "top-3" : "top-4"}`}
          style={{ boxShadow: "0 14px 34px rgba(0,0,0,0.18)", animation: "fadeSlideIn 0.35s ease-out both" }}
        >
          <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[#16A34A]">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <span className="whitespace-nowrap text-[12px] font-semibold">Factura emitida · Pedido {aviso.id}</span>
        </div>
      )}
    </div>
  );
}
const COLS = "62px minmax(0,1.15fr) minmax(0,1fr) 72px 84px 70px";
