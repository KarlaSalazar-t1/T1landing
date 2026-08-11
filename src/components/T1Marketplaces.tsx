"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { useFSStackCards } from "@/hooks/useFSStackCards";
import T1FinalCTA from "@/components/T1FinalCTA";

/* ── Sales-channel icons (real T1 channels) ── */
const MARKETPLACES = [
  { name: "Mercado Libre", src: "/img/meli-iso.svg" },
  { name: "Amazon", src: "/img/amazon-iso.svg" },
  { name: "Walmart", src: "/img/walmart.svg" },
  { name: "SHEIN", src: "/img/shein-iso.svg" },
  { name: "Sears", src: "/img/sears-isotipo.svg" },
  { name: "TikTok Shop", src: "/img/tiktokshop.svg" },
  { name: "Shopify", src: "/img/shopify.svg" },
];

const MARKETPLACES_GRID = [
  { name: "Mercado Libre", src: "/img/meli-iso.svg" },
  { name: "Amazon", src: "/img/amazon-iso.svg" },
  { name: "Walmart", src: "/img/walmart.svg" },
  { name: "SHEIN", src: "/img/shein-iso.svg" },
  { name: "Sears", src: "/img/sears-isotipo.svg" },
  { name: "Sanborns", src: "/img/sanborns-iso.svg" },
  { name: "AliExpress", src: "/img/aliexpress.svg" },
  { name: "TikTok Shop", src: "/img/tiktokshop.svg" },
  { name: "Total Play", src: "/img/totalplay.svg" },
  { name: "Shopify", src: "/img/shopify.svg" },
  { name: "Tienda Nube", src: "/img/tiendanube.svg" },
  { name: "WooCommerce", src: "/img/woocommerce.svg" },
];

/* ── Status pill colour: all grey except Entregado (green) / Cancelado (red) ─ */
function orderStatusStyle(status: string) {
  if (status === "Entregado") return { color: "#16A34A", bg: "rgba(34,197,94,0.12)" };
  if (status === "Cancelado") return { color: "#DC2626", bg: "rgba(220,38,38,0.10)" };
  return { color: "#6B7280", bg: "rgba(0,0,0,0.05)" };
}

/* ── Animated panel 1 — Mis productos (inventory ticks up/down) ────────────── */
const INVENTORY_ROWS = [
  { name: "Tenis blancos clásicos", sku: "TBC-042", price: "$1,345", channels: "3/3", start: 24, img: "/img/moda-tennis.png" },
  { name: "Playera básica holgada", sku: "PB-101", price: "$299", channels: "2/3", start: 87, img: "/img/moda-playera.png" },
  { name: "Sudadera con capucha", sku: "SH-220", price: "$899", channels: "3/3", start: 12, img: "/img/moda-hoodie.png" },
  { name: "Gorra plana negra", sku: "GS-088", price: "$249", channels: "2/3", start: 41, img: "/img/moda-gorra.png" },
  { name: "Playera polo mujer", sku: "PP-305", price: "$399", channels: "3/3", start: 63, img: "/img/moda-playera.png" },
  { name: "Sudadera corta violeta", sku: "SC-142", price: "$690", channels: "2/3", start: 18, img: "/img/moda-hoodie.png" },
];

function MpInventoryPanel() {
  const [units, setUnits] = useState(() => INVENTORY_ROWS.map((r) => r.start));
  const [flash, setFlash] = useState<{ idx: number; dir: "up" | "down" } | null>(null);

  useEffect(() => {
    let tick = 0;
    const id = setInterval(() => {
      const idx = tick % INVENTORY_ROWS.length;
      const up = tick % 3 === 0; // every 3rd touch is a restock (up), else a sale (down)
      tick++;
      setUnits((prev) =>
        prev.map((s, k) => {
          if (k !== idx) return s;
          return up ? s + (6 + (tick % 5)) : Math.max(1, s - (1 + (tick % 2)));
        })
      );
      setFlash({ idx, dir: up ? "up" : "down" });
      window.setTimeout(() => setFlash(null), 650);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  // minmax(0,…) so every row's columns line up regardless of content length
  const cols = "minmax(0,1.5fr) minmax(0,0.7fr) minmax(0,0.85fr) minmax(0,0.5fr) minmax(0,0.6fr)";

  return (
    <div className="relative overflow-hidden rounded-[13px] border border-black/[0.06] bg-white tablet:min-h-[400px]" style={{ padding: 18, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <p className="font-sora text-[14px] font-medium text-black" style={{ marginBottom: 14 }}>Mis productos</p>

      {/* Desktop: table */}
      <div className="hidden tablet:block">
        <div className="grid items-center gap-2 border-b border-black/[0.06] pb-2" style={{ gridTemplateColumns: cols }}>
          <span className="font-inter text-[9px] font-semibold uppercase tracking-wide text-black/35">Producto</span>
          <span className="font-inter text-[9px] font-semibold uppercase tracking-wide text-black/35">Estatus</span>
          <span className="font-inter text-[9px] font-semibold uppercase tracking-wide text-black/35">Inventario</span>
          <span className="font-inter text-[9px] font-semibold uppercase tracking-wide text-black/35">Canales</span>
          <span className="text-right font-inter text-[9px] font-semibold uppercase tracking-wide text-black/35">Precio</span>
        </div>
        {INVENTORY_ROWS.map((row, i) => {
          const isFlash = flash?.idx === i;
          const flashColor = flash?.dir === "up" ? "#16A34A" : "#DB3B2B";
          return (
            <div key={row.sku} className="grid items-center gap-2 py-3.5" style={{ gridTemplateColumns: cols, borderBottom: i < INVENTORY_ROWS.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center overflow-hidden rounded-[7px] border border-black/[0.06] bg-white">
                  <Image src={row.img} alt="" width={30} height={30} className="h-full w-full object-contain" />
                </div>
                <p className="min-w-0 truncate font-inter text-[12px] font-semibold text-black">{row.name}</p>
              </div>
              <span className="w-fit rounded-full bg-[rgba(34,197,94,0.12)] px-2 py-0.5 font-inter text-[9px] font-bold text-[#16A34A]">Activo</span>
              <div>
                <span className="font-sora text-[13px] font-semibold tabular-nums transition-colors duration-300" style={{ color: isFlash ? flashColor : "#111" }}>
                  {units[i]}
                </span>
                <span className="font-inter text-[10px] text-black/40"> uds</span>
              </div>
              <span className="font-inter text-[11px] font-medium text-black/55 tabular-nums">{row.channels}</span>
              <span className="text-right font-inter text-[12px] font-semibold text-black tabular-nums">{row.price}</span>
            </div>
          );
        })}
      </div>

      {/* Mobile: stacked product cards (3, like the real app) */}
      <div className="flex flex-col tablet:hidden">
        {INVENTORY_ROWS.slice(0, 3).map((row, i) => {
          const isFlash = flash?.idx === i;
          const flashColor = flash?.dir === "up" ? "#16A34A" : "#DB3B2B";
          return (
            <div key={row.sku} className="flex items-start gap-2.5 py-2.5" style={{ borderBottom: i < 2 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
              <span className="mt-0.5 h-[16px] w-[16px] shrink-0 rounded-[4px] border border-black/20" />
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center overflow-hidden rounded-[9px] border border-black/[0.06] bg-white">
                <Image src={row.img} alt="" width={38} height={38} className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="mb-0.5 inline-block rounded-full bg-[rgba(34,197,94,0.12)] px-1.5 py-px font-inter text-[9px] font-bold text-[#16A34A]">Activo</span>
                <p className="line-clamp-2 font-inter text-[12px] font-semibold leading-snug text-black">{row.name}</p>
                <p className="mt-1 font-inter text-[11px] text-black/45">{row.channels} canales de venta</p>
                <p className="mt-0.5 font-inter text-[12px] text-black/75">
                  <span className="font-semibold tabular-nums transition-colors duration-300" style={{ color: isFlash ? flashColor : "#111" }}>{units[i]}</span> unidades
                  <span className="mx-1.5 text-black/20">|</span>
                  <span className="font-semibold tabular-nums text-black">{row.price}</span>
                </p>
              </div>
              <button type="button" className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-black/10 text-black/40">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="18" cy="12" r="1.6" /></svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Animated panel 2 — Mis pedidos (table on desktop, cards on mobile) ────── */
type MpOrder = { k: number; id: string; time: string; ch: string; chName: string; customer: string; total: string; status: string };
const ORDER_POOL: Omit<MpOrder, "k">[] = [
  { id: "2000013668786725", time: "17:30", ch: "meli-iso.svg", chName: "Mercado Libre", customer: "Dulce Paulina Cordero", total: "$169", status: "Por enviar" },
  { id: "2000013665470881", time: "16:48", ch: "amazon-iso.svg", chName: "Amazon", customer: "Carlos Ruiz Mendoza", total: "$892", status: "En camino" },
  { id: "87370253", time: "15:12", ch: "sears-isotipo.svg", chName: "Sears", customer: "María Antonieta Muñoz", total: "$499", status: "Entregado" },
  { id: "2000013660012345", time: "14:05", ch: "shein-iso.svg", chName: "SHEIN", customer: "Ana Pérez Lozano", total: "$2,150", status: "Cancelado" },
  { id: "87360273", time: "12:33", ch: "walmart.svg", chName: "Walmart", customer: "Luis Hernández Gil", total: "$456", status: "Por enviar" },
  { id: "2000013659012873", time: "10:57", ch: "amazon-iso.svg", chName: "Amazon", customer: "Diego Torres Vega", total: "$1,099", status: "Entregado" },
  { id: "2000013658770421", time: "09:26", ch: "meli-iso.svg", chName: "Mercado Libre", customer: "Valeria Cruz Soto", total: "$389", status: "Por enviar" },
];

function MpOrdersPanel() {
  const [orders, setOrders] = useState<MpOrder[]>(() => ORDER_POOL.slice(0, 6).map((o, k) => ({ ...o, k })));

  useEffect(() => {
    let i = 6;
    const id = setInterval(() => {
      const next = ORDER_POOL[i % ORDER_POOL.length];
      const k = i;
      i++;
      setOrders((prev) => [{ ...next, k }, ...prev.slice(0, 5)]);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const cols = "minmax(0,0.8fr) minmax(0,1.15fr) minmax(0,1.2fr) minmax(0,0.7fr) minmax(0,0.95fr)";

  return (
    <div className="relative overflow-hidden rounded-[13px] border border-black/[0.06] bg-white tablet:min-h-[400px]" style={{ padding: 18, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <p className="font-sora text-[14px] font-medium text-black" style={{ marginBottom: 14 }}>Mis pedidos</p>

      {/* Desktop: table */}
      <div className="hidden tablet:block">
        <div className="grid items-center gap-2 border-b border-black/[0.06] pb-2" style={{ gridTemplateColumns: cols }}>
          <span className="font-inter text-[9px] font-semibold uppercase tracking-wide text-black/35">Pedido</span>
          <span className="font-inter text-[9px] font-semibold uppercase tracking-wide text-black/35">Canal</span>
          <span className="font-inter text-[9px] font-semibold uppercase tracking-wide text-black/35">Cliente</span>
          <span className="font-inter text-[9px] font-semibold uppercase tracking-wide text-black/35">Total</span>
          <span className="font-inter text-[9px] font-semibold uppercase tracking-wide text-black/35">Estado</span>
        </div>
        {orders.map((o, i) => {
          const st = orderStatusStyle(o.status);
          return (
            <div
              key={o.k}
              className="grid items-center gap-2 py-3.5"
              style={{ gridTemplateColumns: cols, borderBottom: i < orders.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none", animation: i === 0 ? "fadeSlideIn 0.45s ease-out" : undefined }}
            >
              <span className="min-w-0 truncate font-inter text-[11px] font-medium text-black/55 tabular-nums">#{o.id}</span>
              <div className="flex min-w-0 items-center gap-1.5">
                <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center overflow-hidden rounded-[5px] border border-black/[0.05] bg-white">
                  <Image src={`/img/${o.ch}`} alt="" width={16} height={16} className="object-contain" />
                </div>
                <span className="min-w-0 truncate font-inter text-[11px] text-black/65">{o.chName}</span>
              </div>
              <span className="min-w-0 truncate font-inter text-[12px] font-semibold text-black">{o.customer}</span>
              <span className="font-inter text-[12px] font-semibold text-black tabular-nums">{o.total}</span>
              <span className="w-fit rounded-full px-2 py-0.5 font-inter text-[9px] font-bold" style={{ color: st.color, background: st.bg }}>{o.status}</span>
            </div>
          );
        })}
      </div>

      {/* Mobile: stacked order cards. Fixed-height, overflow-clipped container
          showing ~3 cards so the panel doesn't resize when a new order slides
          in on top (the 4th card just gets clipped). */}
      <div className="overflow-hidden tablet:hidden" style={{ height: 372 }}>
        {orders.slice(0, 4).map((o, i) => {
          const st = orderStatusStyle(o.status);
          return (
            <div
              key={o.k}
              className="py-3"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.06)", animation: i === 0 ? "fadeSlideIn 0.45s ease-out" : undefined }}
            >
              <p className="font-inter text-[10px] text-black/45">Hoy <span className="mx-1 text-black/20">|</span> {o.time} hrs</p>
              <div className="mt-0.5 flex items-center justify-between gap-3">
                <span className="min-w-0 truncate font-inter text-[13px] font-bold text-black tabular-nums">#{o.id}</span>
                <span className="shrink-0 font-inter text-[13px] font-bold text-black tabular-nums">{o.total}</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-full px-2 py-0.5 font-inter text-[10px] font-semibold" style={{ color: st.color, background: st.bg }}>{o.status}</span>
                <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border border-black/[0.05] bg-white">
                  <Image src={`/img/${o.ch}`} alt="" width={17} height={17} className="object-contain" />
                </div>
                <span className="font-inter text-[12px] text-black/70">{o.chName}</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="min-w-0 truncate font-inter text-[12px] text-black/70">{o.customer}</span>
                <span className="text-black/20">|</span>
                <span className="shrink-0 font-inter text-[12px] font-medium text-black/80">1 producto</span>
                <svg className="ml-auto shrink-0 text-black/35" width="13" height="13" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Animated panel 3 — Administrar publicación (activar / pausar por canal) ─ */
const MANAGE_CHANNELS = [
  { src: "sears-isotipo.svg", name: "Sears" },
  { src: "sanborns-iso.svg", name: "Sanborns" },
  { src: "icon-tienda.svg", name: "Tienda en línea" },
  { src: "meta.png", name: "Facebook e Instagram" },
];

function MpPublishPanel() {
  const [active, setActive] = useState([true, false, true, true]);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      const idx = i % MANAGE_CHANNELS.length;
      i++;
      setActive((prev) => prev.map((c, k) => (k === idx ? !c : c)));
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[13px] border border-black/[0.06] bg-white tablet:min-h-[400px]" style={{ padding: 18, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <p className="font-sora text-[14px] font-medium text-black" style={{ marginBottom: 14 }}>Administrar publicación</p>
      <div className="flex items-center gap-3 rounded-[10px] border border-black/[0.05] bg-[#FAFAF9] px-3 py-3" style={{ marginBottom: 16 }}>
        <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-black/[0.05] bg-white">
          <Image src="/img/tenis-transparente.png" alt="" width={36} height={28} className="object-contain" />
        </div>
        <div className="flex-1">
          <p className="font-inter text-[12px] font-semibold text-black">Tenis blancos clásicos</p>
          <p className="font-inter text-[10px] text-black/50">Importado de tus marketplaces</p>
        </div>
      </div>
      <p className="font-inter text-[12px] font-semibold text-black/80" style={{ marginBottom: 12 }}>Publicar en:</p>
      <div className="flex flex-col gap-3.5">
        {MANAGE_CHANNELS.map((c, i) => {
          const on = active[i];
          return (
            <div key={c.name} className="flex items-center gap-3">
              {/* Checkbox (red when active) — no switch */}
              <span
                className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[6px] border-2 transition-all duration-200"
                style={{ borderColor: on ? "#DB3B2B" : "rgba(0,0,0,0.22)", background: on ? "#DB3B2B" : "#fff" }}
              >
                {on && (
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center overflow-hidden rounded-[6px]">
                <Image src={`/img/${c.src}`} alt="" width={24} height={24} className="object-contain" />
              </div>
              <span className="font-inter text-[13px] font-medium text-black/85">{c.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function T1Marketplaces() {
  const stackRootRef = useRef<HTMLDivElement>(null);
  useFSStackCards(stackRootRef);

  return (
    <div className="w-full">
      {/* ── Section 1: Hero — text left, visual right ── */}
      <section
        className="relative px-5 pt-28 pb-16 tablet:px-10 tablet:pt-36 tablet:pb-24"
        style={{
          background: "radial-gradient(ellipse 86% 70% at 67% 32%, rgba(226,64,47,0.26) 0%, transparent 60%), radial-gradient(ellipse 60% 58% at 14% 22%, rgba(150,34,34,0.18) 0%, transparent 58%), radial-gradient(ellipse 50% 46% at 82% 84%, rgba(244,114,150,0.08) 0%, transparent 62%), radial-gradient(ellipse 60% 70% at -4% 88%, rgba(58,74,158,0.30) 0%, transparent 52%), radial-gradient(ellipse 42% 60% at 102% 10%, rgba(58,74,158,0.24) 0%, transparent 50%), linear-gradient(160deg, #2e1622 0%, #180b13 50%, #0d070b 100%)",
        }}
      >
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] tablet:gap-12">
            {/* Left — title + description + CTA */}
            <div>
              <h1
                className="font-sora text-[32px] font-light text-white tablet:text-[44px]"
                style={{ lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 22 }}
              >
                Vende en +10 marketplaces desde un solo lugar
              </h1>
              <p
                className="font-inter text-[16px] font-light text-white/65 tablet:text-[19px]"
                style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}
              >
                Tu inventario, pedidos y catálogo sincronizados en tiempo real.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={SIGNUP_URL}
                  className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]"
                >
                  Comienza gratis
                </a>
              </div>
            </div>

            {/* Right — connector tree visual */}
            <div className="relative">
              {/* Mobile: radial connector tree — T1 at the centre, channels
                  around it linked by dashed lines + animated dots (same idea as
                  the desktop tree). */}
              <div className="relative mx-auto tablet:hidden" style={{ width: "100%", maxWidth: 300, aspectRatio: "1" }}>
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 300" fill="none" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <radialGradient id="mpPulseM">
                      <stop offset="0%" stopColor="#FF7A6B" stopOpacity="0.6" />
                      <stop offset="55%" stopColor="#FF7A6B" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#FF7A6B" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* [startX, startY, endX, endY] — lines start ~42 units out from
                      the centre so they don't run behind the T1 node. */}
                  {[
                    [192, 150, 258, 150],
                    [171, 186, 204, 243],
                    [129, 186, 96, 243],
                    [108, 150, 42, 150],
                    [129, 114, 96, 57],
                    [171, 114, 204, 57],
                  ].map(([sx, sy, x, y], i) => (
                    <g key={i}>
                      <line x1={sx} y1={sy} x2={x} y2={y} stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeDasharray="5 4" />
                      {/* Soft red pulse behind the icon — peaks as the dot arrives */}
                      <circle cx={x} cy={y} r="12" fill="url(#mpPulseM)" opacity="0.12">
                        <animate attributeName="opacity" values="0.1;0.6;0.1" keyTimes="0;0.5;1" dur={`${2 + (i % 3) * 0.4}s`} begin={`${i * 0.25}s`} repeatCount="indefinite" />
                        <animate attributeName="r" values="9;20;9" keyTimes="0;0.5;1" dur={`${2 + (i % 3) * 0.4}s`} begin={`${i * 0.25}s`} repeatCount="indefinite" />
                      </circle>
                      <circle cx={x} cy={y} r="2.5" fill="rgba(255,255,255,0.4)" />
                      <circle r="2.5" fill="#E26153" opacity="0.7">
                        <animateMotion dur={`${2 + (i % 3) * 0.4}s`} repeatCount="indefinite" path={`M${sx} ${sy} L${x} ${y}`} begin={`${i * 0.25}s`} />
                      </circle>
                    </g>
                  ))}
                </svg>

                {/* Channel logos around the centre */}
                {[
                  { mp: MARKETPLACES[0], x: 86, y: 50 },
                  { mp: MARKETPLACES[2], x: 68, y: 81 },
                  { mp: MARKETPLACES[3], x: 32, y: 81 },
                  { mp: MARKETPLACES[4], x: 14, y: 50 },
                  { mp: MARKETPLACES[5], x: 32, y: 19 },
                  { mp: MARKETPLACES[6], x: 68, y: 19 },
                ].map(({ mp, x, y }, i) => (
                  <div
                    key={i}
                    className="absolute flex h-[50px] w-[50px] items-center justify-center"
                    style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                  >
                    <Image src={mp.src} alt={mp.name} width={50} height={50} className="h-full w-full object-contain" />
                  </div>
                ))}

                {/* T1 centre node */}
                <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
                  <div className="flex h-[58px] w-[58px] items-center justify-center rounded-[15px]" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <svg width="34" height="32" viewBox="0 0 45 44" fill="none">
                      <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457V19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#D93A26" />
                      <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592H22.4335H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#D93A26" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Desktop: animated connector tree */}
              <div className="relative hidden tablet:block" style={{ minHeight: 420 }}>
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 400" fill="none" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <radialGradient id="mpPulseD">
                      <stop offset="0%" stopColor="#FF7A6B" stopOpacity="0.6" />
                      <stop offset="55%" stopColor="#FF7A6B" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#FF7A6B" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* Trunk + branches dashed */}
                  <line x1="80" y1="200" x2="135" y2="200" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="5 4" />
                  <circle cx="135" cy="200" r="3" fill="rgba(255,255,255,0.4)" />
                  <line x1="200" y1="200" x2="270" y2="200" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="5 4" />
                  <circle cx="270" cy="200" r="3" fill="rgba(255,255,255,0.4)" />
                  <line x1="270" y1="40" x2="270" y2="360" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="5 4" />
                  {/* Col1 (x=320) */}
                  <line x1="270" y1="40" x2="320" y2="40" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="5 4" />
                  <circle cx="320" cy="40" r="3" fill="rgba(255,255,255,0.4)" />
                  <line x1="270" y1="150" x2="320" y2="150" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="5 4" />
                  <circle cx="320" cy="150" r="3" fill="rgba(255,255,255,0.4)" />
                  <line x1="270" y1="260" x2="320" y2="260" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="5 4" />
                  <circle cx="320" cy="260" r="3" fill="rgba(255,255,255,0.4)" />
                  <line x1="270" y1="360" x2="320" y2="360" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="5 4" />
                  <circle cx="320" cy="360" r="3" fill="rgba(255,255,255,0.4)" />
                  {/* Col2 (x=460) */}
                  <line x1="270" y1="95" x2="460" y2="95" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="5 4" />
                  <circle cx="460" cy="95" r="3" fill="rgba(255,255,255,0.4)" />
                  <line x1="270" y1="200" x2="460" y2="200" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="5 4" />
                  <circle cx="460" cy="200" r="3" fill="rgba(255,255,255,0.4)" />
                  <line x1="270" y1="305" x2="460" y2="305" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="5 4" />
                  <circle cx="460" cy="305" r="3" fill="rgba(255,255,255,0.4)" />
                  {/* Animated dots */}
                  <circle r="3" fill="#E26153" opacity="0.7"><animateMotion dur="1.6s" repeatCount="indefinite" path="M80 200 L135 200" /></circle>
                  <circle r="3" fill="#E26153" opacity="0.7"><animateMotion dur="1.4s" repeatCount="indefinite" path="M200 200 L270 200" /></circle>
                  <circle r="3" fill="#E26153" opacity="0.6"><animateMotion dur="2.5s" repeatCount="indefinite" path="M270 200 L270 40 L320 40" /></circle>
                  <circle r="3" fill="#E26153" opacity="0.6"><animateMotion dur="2s" repeatCount="indefinite" path="M270 200 L270 150 L320 150" begin="0.5s" /></circle>
                  <circle r="3" fill="#E26153" opacity="0.6"><animateMotion dur="2s" repeatCount="indefinite" path="M270 200 L270 260 L320 260" begin="0.3s" /></circle>
                  <circle r="3" fill="#E26153" opacity="0.6"><animateMotion dur="2.5s" repeatCount="indefinite" path="M270 200 L270 360 L320 360" begin="0.8s" /></circle>
                  <circle r="3" fill="#E26153" opacity="0.6"><animateMotion dur="3s" repeatCount="indefinite" path="M270 200 L270 95 L460 95" begin="0.2s" /></circle>
                  <circle r="3" fill="#E26153" opacity="0.7"><animateMotion dur="2.5s" repeatCount="indefinite" path="M270 200 L460 200" begin="0.6s" /></circle>
                  <circle r="3" fill="#E26153" opacity="0.6"><animateMotion dur="3s" repeatCount="indefinite" path="M270 200 L270 305 L460 305" begin="0.4s" /></circle>
                  {/* Soft red pulse behind each marketplace icon — peaks right as
                      its travelling dot arrives (matched dur + begin). */}
                  {[
                    { cx: 320, cy: 40, dur: "2.5s", begin: "0s" },
                    { cx: 320, cy: 150, dur: "2s", begin: "0.5s" },
                    { cx: 320, cy: 260, dur: "2s", begin: "0.3s" },
                    { cx: 320, cy: 360, dur: "2.5s", begin: "0.8s" },
                    { cx: 460, cy: 95, dur: "3s", begin: "0.2s" },
                    { cx: 460, cy: 200, dur: "2.5s", begin: "0.6s" },
                    { cx: 460, cy: 305, dur: "3s", begin: "0.4s" },
                  ].map((n, i) => (
                    <circle key={`pulse-${i}`} cx={n.cx} cy={n.cy} r="16" fill="url(#mpPulseD)" opacity="0.12">
                      <animate attributeName="opacity" values="0.1;0.6;0.1" keyTimes="0;0.5;1" dur={n.dur} begin={n.begin} repeatCount="indefinite" />
                      <animate attributeName="r" values="12;27;12" keyTimes="0;0.5;1" dur={n.dur} begin={n.begin} repeatCount="indefinite" />
                    </circle>
                  ))}
                </svg>

                {/* Product card on the left of tree */}
                <div
                  className="absolute overflow-hidden rounded-[18px]"
                  style={{
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 150,
                    padding: "16px",
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  <div className="mb-2 flex items-center justify-center">
                    <Image src="/img/tenis-transparente.png" alt="" width={84} height={64} className="object-contain" />
                  </div>
                  <p className="text-center text-[14px] font-bold text-white">$1,345.99</p>
                  <p className="text-center text-[10px] text-white/60">Tenis blancos clásicos</p>
                </div>

                {/* T1 logo at the trunk node */}
                <div className="absolute" style={{ left: "calc(35% + 10px)", top: "50%", transform: "translate(-50%, -50%)" }}>
                  <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[14px]" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <svg width="32" height="30" viewBox="0 0 45 44" fill="none">
                      <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457V19.1513V19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#D93A26" />
                      <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592H22.4335H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#D93A26" />
                    </svg>
                  </div>
                </div>

                {/* Marketplace icons */}
                {[
                  { mp: MARKETPLACES[0], pctX: 64, pctY: 10 },
                  { mp: MARKETPLACES[1], pctX: 92, pctY: 23.75 },
                  { mp: MARKETPLACES[2], pctX: 64, pctY: 37.5 },
                  { mp: MARKETPLACES[3], pctX: 92, pctY: 50 },
                  { mp: MARKETPLACES[4], pctX: 64, pctY: 65 },
                  { mp: MARKETPLACES[5], pctX: 92, pctY: 76.25 },
                  { mp: MARKETPLACES[6], pctX: 64, pctY: 90 },
                ].map(({ mp, pctX, pctY }, i) => (
                  <div
                    key={i}
                    className="absolute flex h-[52px] w-[52px] items-center justify-center"
                    style={{ left: `${pctX}%`, top: `${pctY}%`, transform: "translate(-50%, -50%)" }}
                  >
                    <Image src={mp.src} alt={mp.name} width={52} height={52} className="h-full w-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Problemas — intro cards (like the Tienda "Antes" section) ── */}
      <section className="relative overflow-hidden bg-white px-5 pt-10 pb-6 tablet:px-10 tablet:pt-14 tablet:pb-8" data-white-card>
        {/* toque sutil de rojo oscuro */}
        <div aria-hidden className="pointer-events-none absolute" style={{ top: "-14%", right: "-6%", width: 580, height: 580, borderRadius: "50%", background: "radial-gradient(circle, rgba(125,26,26,0.07) 0%, transparent 62%)", filter: "blur(30px)" }} />
        <div className="relative mx-auto max-w-[var(--max-w)]">
          <div className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              Vender en varios canales es complicado
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {[
              { title: "Saltas entre plataformas", desc: "Entras y sales de cada marketplace para revisar ventas, pedidos e inventario.", icon: "shuffle" },
              { title: "Necesitas más personal", desc: "Administrar cada canal por separado se vuelve un trabajo de tiempo completo.", icon: "users" },
              { title: "Sobreventas de inventario", desc: "Sin un inventario unificado vendes lo que ya no tienes y pierdes la venta.", icon: "alert" },
            ].map((p) => (
              <div
                key={p.title}
                className="w-full tablet:w-[300px] rounded-[18px] border border-black/[0.07] bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
              >
                <div className="mb-4 flex h-[30px] w-[30px] items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {p.icon === "shuffle" && (
                      <>
                        <path d="M16 3h5v5" />
                        <path d="M4 20L21 3" />
                        <path d="M21 16v5h-5" />
                        <path d="M15 15l6 6" />
                        <path d="M4 4l5 5" />
                      </>
                    )}
                    {p.icon === "users" && (
                      <>
                        <circle cx="9" cy="8" r="3.2" />
                        <path d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" />
                        <path d="M16 5.2a3.2 3.2 0 0 1 0 5.6" />
                        <path d="M17.5 14.8c2 .7 3.5 2.7 3.5 5.2" />
                      </>
                    )}
                    {p.icon === "alert" && (
                      <>
                        <path d="M10.3 4.3L2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z" />
                        <path d="M12 9.5v4" />
                        <path d="M12 17v.01" />
                      </>
                    )}
                  </svg>
                </div>
                <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 6 }}>{p.title}</h3>
                <p className="font-inter text-[14px] font-light text-black/55" style={{ lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Conecta los canales — texto centrado + iconos flotando en el espacio ── */}
      <section className="relative flex min-h-[600px] items-center overflow-hidden bg-white px-5 py-24 tablet:min-h-[640px] tablet:px-10 tablet:py-36">
        {/* very subtle red blob */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(219,59,43,0.06) 0%, transparent 62%)" }}
        />

        {/* DESKTOP floating scatter — icons dispersed around the centred text. */}
        {[
          { i: 0, l: "8%", t: "24%", s: 52, r: -8 },
          { i: 1, l: "20%", t: "70%", s: 46, r: 7 },
          { i: 2, l: "31%", t: "18%", s: 44, r: 5 },
          { i: 3, l: "11%", t: "46%", s: 58, r: -6 },
          { i: 4, l: "89%", t: "24%", s: 54, r: 8 },
          { i: 5, l: "80%", t: "66%", s: 46, r: -7 },
          { i: 6, l: "69%", t: "19%", s: 44, r: -5 },
          { i: 7, l: "92%", t: "48%", s: 52, r: 6 },
          { i: 8, l: "27%", t: "82%", s: 44, r: -6 },
          { i: 9, l: "73%", t: "81%", s: 50, r: 7 },
          { i: 10, l: "50%", t: "15%", s: 46, r: 4 },
          { i: 11, l: "50%", t: "85%", s: 46, r: -4 },
        ].map(({ i, l, t, s, r }) => {
          const mp = MARKETPLACES_GRID[i];
          return (
            <Image
              key={`d-${mp.name}`}
              src={mp.src}
              alt={mp.name}
              width={s}
              height={s}
              className="pointer-events-none absolute hidden -translate-x-1/2 -translate-y-1/2 object-contain tablet:block"
              style={{ left: l, top: t, width: s, height: s, transform: `translate(-50%, -50%) rotate(${r}deg)`, filter: "drop-shadow(0 12px 22px rgba(0,0,0,0.14))" }}
            />
          );
        })}

        {/* MOBILE floating scatter — same dispersed look but kept in the TOP and
            BOTTOM bands so the icons never sit over the centred text. */}
        {[
          { i: 0, l: "12%", t: "9%", s: 42, r: -8 },
          { i: 2, l: "38%", t: "7%", s: 40, r: 5 },
          { i: 6, l: "63%", t: "8%", s: 40, r: -5 },
          { i: 4, l: "88%", t: "12%", s: 44, r: 8 },
          { i: 10, l: "25%", t: "20%", s: 40, r: 4 },
          { i: 5, l: "75%", t: "21%", s: 40, r: -6 },
          { i: 1, l: "12%", t: "90%", s: 42, r: 7 },
          { i: 3, l: "38%", t: "93%", s: 44, r: -6 },
          { i: 9, l: "62%", t: "92%", s: 42, r: 7 },
          { i: 7, l: "88%", t: "88%", s: 42, r: 6 },
          { i: 8, l: "26%", t: "80%", s: 40, r: -6 },
          { i: 11, l: "74%", t: "80%", s: 40, r: -4 },
        ].map(({ i, l, t, s, r }) => {
          const mp = MARKETPLACES_GRID[i];
          return (
            <Image
              key={`m-${mp.name}`}
              src={mp.src}
              alt={mp.name}
              width={s}
              height={s}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 object-contain tablet:hidden"
              style={{ left: l, top: t, width: s, height: s, transform: `translate(-50%, -50%) rotate(${r}deg)`, filter: "drop-shadow(0 12px 22px rgba(0,0,0,0.14))" }}
            />
          );
        })}

        {/* centered copy */}
        <div className="relative mx-auto max-w-[620px] text-center">
          <h2 className="font-sora text-[26px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
            Actualizar cada canal a mano
          </h2>
          <p className="mx-auto font-inter text-[15px] font-light text-black/60 tablet:text-[17px]" style={{ lineHeight: 1.6, marginBottom: 28, maxWidth: 500 }}>
            Conecta los canales donde ya vendes y gestiona todas tus ventas sin salir de T1.
          </p>

          <a
            href={SIGNUP_URL}
            className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-8 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]"
          >
            Conecta tus canales
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      {/* Stack cards — 3 full-screen blocks (text + panel alternating) */}
      <div ref={stackRootRef} className="fs-stack-card-container relative bg-white">
        {/* Block 1 — Importa y publica (text left, image right) — bg white */}
        <div className="fs-stack-card" style={{ top: 60, zIndex: 1, background: "#FFFFFF" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[32px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 18 }}>
                  Importa y publica tus productos
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, maxWidth: 460 }}>
                  Importa tus productos y pedidos desde otros marketplaces, y publícalos en Sears, Sanborns, redes sociales o tu tienda en línea sin recapturar información.
                </p>
              </div>
              <div className="tablet:scale-[1.55] tablet:origin-center">
                <Image src="/img/importa.png" alt="Importa y publica tus productos" width={1672} height={941} className="h-auto w-full" sizes="(max-width: 768px) 94vw, 860px" />
              </div>
            </div>
          </div>
        </div>

        {/* Block 2 — Un solo inventario (text left, panel right) — bg #FBFBFB */}
        <div className="fs-stack-card" style={{ top: 80, zIndex: 2, background: "#FBFBFB" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[32px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 14 }}>
                  Un solo inventario
                </h3>
                <p className="font-inter text-[14px] font-light text-black/55 tablet:text-[15px]" style={{ lineHeight: 1.55, marginBottom: 22 }}>
                  Se actualiza al instante en todos tus canales y evitas sobreventas.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Inventario unificado entre tu tienda y marketplaces", "Actualización en tiempo real al vender"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <MpInventoryPanel />
            </div>
          </div>
        </div>

        {/* Block 3 — Pedidos (panel left, text right) — degradado #1A0A0A → #000 */}
        <div className="fs-stack-card" style={{ top: 100, zIndex: 3, background: "linear-gradient(180deg, #1A0A0A 0%, #000000 100%)" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div className="order-2 tablet:order-1">
                <MpOrdersPanel />
              </div>

              <div className="order-1 tablet:order-2">
                <h3 className="font-sora text-[32px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 14 }}>
                  Todos tus pedidos en un lugar
                </h3>
                <p className="font-inter text-[14px] font-light text-white/60 tablet:text-[15px]" style={{ lineHeight: 1.55, marginBottom: 22 }}>
                  Procesa los pedidos de todos tus canales sin saltar entre plataformas.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Vista unificada de pedidos por canal", "Filtra por estado, marketplace o cliente", "Genera guías de envío en segundos"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-white/75 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>


      {/* ── FAQ (fondo oscuro) ── */}
      <section className="relative bg-black px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[760px]">
          <div className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[32px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              Preguntas frecuentes
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { q: "¿Qué canales de venta puedo conectar?", a: "Mercado Libre, Amazon, Walmart, SHEIN, Sears, Sanborns, AliExpress, TikTok Shop, Total Play, Shopify, Tienda Nube, WooCommerce y más." },
              { q: "¿Necesito tener cuenta en cada marketplace?", a: "Sí, necesitas una cuenta de vendedor en cada marketplace que quieras conectar. T1 te ayuda con la configuración y conecta cada cuenta una sola vez." },
              { q: "¿Cómo se sincroniza el inventario?", a: "En tiempo real. Cada venta en cualquier canal descuenta el inventario al instante en todos los demás." },
              { q: "¿Puedo tener precios diferentes por canal?", a: "Sí. Cada SKU puede tener un precio distinto en cada marketplace para optimizar margen según las comisiones de cada plataforma." },
              { q: "¿Qué pasa con las categorías de cada marketplace?", a: "T1 mapea automáticamente tus categorías a las taxonomías de cada marketplace. Tú nombras una vez, T1 traduce al lenguaje de cada canal." },
            ].map((f) => (
              <details
                key={f.q}
                className="group rounded-[14px] border border-white/[0.08] bg-white/[0.03] transition-all duration-200 open:border-[rgba(219,59,43,0.4)] open:bg-white/[0.05]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-sora text-[16px] font-normal text-white transition-colors duration-150 hover:text-[#FF6F5E]">
                  {f.q}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-white/40 transition-transform duration-300 group-open:rotate-180 group-open:text-[#FF6F5E]">
                    <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="px-6 pb-5 font-inter text-[14px] font-light text-white/60" style={{ lineHeight: 1.65 }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA — scroll-reveal pattern like the main T1 landing ── */}
      <T1FinalCTA
        title="¿Listo para vender en todos lados?"
        description="Crea tu cuenta gratis y sincroniza inventario, pedidos y precios de todos tus canales desde un solo lugar."
      />
    </div>
  );
}
