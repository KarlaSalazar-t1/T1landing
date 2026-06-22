"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { useFSStackCards } from "@/hooks/useFSStackCards";
import T1FinalCTA from "@/components/T1FinalCTA";

/* ── Marketplace icons (used in hero tree + grid) ── */
const MARKETPLACES = [
  { name: "MercadoLibre", src: "/img/meli-iso.svg" },
  { name: "Amazon", src: "/img/amazon-iso.svg" },
  { name: "Sears", src: "/img/sears-isotipo.svg" },
  { name: "SHEIN", src: "/img/shein-iso.svg" },
  { name: "Walmart", src: "/img/walmart.svg" },
  { name: "Shopify", src: "/img/shein-iso.svg" },
  { name: "Liverpool", src: "/img/sears-isotipo.svg" },
];

const MARKETPLACES_GRID = [
  { name: "MercadoLibre", src: "/img/meli-iso.svg" },
  { name: "Amazon", src: "/img/amazon-iso.svg" },
  { name: "Walmart", src: "/img/walmart.svg" },
  { name: "SHEIN", src: "/img/shein-iso.svg" },
  { name: "Sears", src: "/img/sears-isotipo.svg" },
  { name: "Liverpool", src: "/img/sears-isotipo.svg" },
  { name: "Shopify", src: "/img/shein-iso.svg" },
  { name: "TikTok Shop", src: "/img/tiktok-isotipo.png" },
];

/* ── Animated panel 1 — Inventario (stock ticks up/down) ──────────────────── */
const INVENTORY_ROWS = [
  { name: "Tenis blancos clásicos", sku: "TBC-042", price: "$1,345", channels: "3/3", start: 24 },
  { name: "Playera básica oversize", sku: "PB-101", price: "$299", channels: "2/3", start: 87 },
  { name: "Sudadera hoodie premium", sku: "SH-220", price: "$899", channels: "3/3", start: 12 },
  { name: "Gorra snapback negra", sku: "GS-088", price: "$249", channels: "2/3", start: 41 },
];

function MpInventoryPanel() {
  const [stock, setStock] = useState(() => INVENTORY_ROWS.map((r) => r.start));
  const [flash, setFlash] = useState<{ idx: number; dir: "up" | "down" } | null>(null);

  useEffect(() => {
    let tick = 0;
    const id = setInterval(() => {
      const idx = tick % INVENTORY_ROWS.length;
      // Every 3rd touch on a row is a restock (up), otherwise a sale (down).
      const up = tick % 3 === 0;
      tick++;
      setStock((prev) =>
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

  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 18, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
        <p className="font-sora text-[14px] font-medium text-black">Mis productos</p>
        <span className="rounded-full bg-[rgba(34,197,94,0.12)] px-2 py-0.5 font-inter text-[10px] font-bold text-[#16A34A]">Sincronizado</span>
      </div>
      {/* Column header */}
      <div className="grid items-center gap-2 border-b border-black/[0.06] pb-2" style={{ gridTemplateColumns: "1.7fr 0.8fr 0.7fr 0.7fr" }}>
        <span className="font-inter text-[9px] font-semibold uppercase tracking-wide text-black/35">Producto</span>
        <span className="font-inter text-[9px] font-semibold uppercase tracking-wide text-black/35">Inventario</span>
        <span className="font-inter text-[9px] font-semibold uppercase tracking-wide text-black/35">Canales</span>
        <span className="text-right font-inter text-[9px] font-semibold uppercase tracking-wide text-black/35">Precio</span>
      </div>
      {INVENTORY_ROWS.map((row, i) => {
        const isFlash = flash?.idx === i;
        const flashColor = flash?.dir === "up" ? "#16A34A" : "#DB3B2B";
        return (
          <div key={row.sku} className="grid items-center gap-2 py-2.5" style={{ gridTemplateColumns: "1.7fr 0.8fr 0.7fr 0.7fr", borderBottom: i < INVENTORY_ROWS.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
            <div className="flex items-center gap-2.5">
              <div className="h-[34px] w-[34px] shrink-0 rounded-[7px] border border-black/[0.06]" style={{ background: "linear-gradient(135deg, #F1EFEE 0%, #E4E1DF 100%)" }} />
              <div className="min-w-0">
                <p className="truncate font-inter text-[12px] font-semibold text-black">{row.name}</p>
                <span className="mt-0.5 inline-block rounded-full bg-[rgba(34,197,94,0.12)] px-1.5 py-px font-inter text-[8px] font-bold text-[#16A34A]">Activo</span>
              </div>
            </div>
            <div>
              <span
                className="font-sora text-[13px] font-semibold tabular-nums transition-colors duration-300"
                style={{ color: isFlash ? flashColor : "#111" }}
              >
                {stock[i]}
              </span>
              <span className="font-inter text-[10px] text-black/40"> uds</span>
            </div>
            <span className="font-inter text-[11px] font-medium text-black/55 tabular-nums">{row.channels}</span>
            <span className="text-right font-inter text-[12px] font-semibold text-black tabular-nums">{row.price}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Animated panel 2 — Pedidos (new orders slide in) ─────────────────────── */
type MpOrder = { k: number; ch: string; chName: string; customer: string; total: string; status: string; color: string; bg: string };
const ORDER_POOL: Omit<MpOrder, "k">[] = [
  { ch: "meli-iso.svg", chName: "Mercado Libre", customer: "María González", total: "$1,345", status: "Por enviar", color: "#B45309", bg: "rgba(245,158,11,0.12)" },
  { ch: "amazon-iso.svg", chName: "Amazon", customer: "Carlos Ruiz", total: "$892", status: "En camino", color: "#1D4ED8", bg: "rgba(59,130,246,0.12)" },
  { ch: "shein-iso.svg", chName: "SHEIN", customer: "Ana Pérez", total: "$2,150", status: "Pagado", color: "#16A34A", bg: "rgba(34,197,94,0.12)" },
  { ch: "walmart.svg", chName: "Walmart", customer: "Luis Hernández", total: "$456", status: "Por enviar", color: "#B45309", bg: "rgba(245,158,11,0.12)" },
  { ch: "sears-isotipo.svg", chName: "Sears", customer: "Sofía Ramírez", total: "$729", status: "Pagado", color: "#16A34A", bg: "rgba(34,197,94,0.12)" },
  { ch: "amazon-iso.svg", chName: "Amazon", customer: "Diego Torres", total: "$1,099", status: "En camino", color: "#1D4ED8", bg: "rgba(59,130,246,0.12)" },
  { ch: "meli-iso.svg", chName: "Mercado Libre", customer: "Valeria Cruz", total: "$389", status: "Pagado", color: "#16A34A", bg: "rgba(34,197,94,0.12)" },
];

function MpOrdersPanel() {
  const [orders, setOrders] = useState<MpOrder[]>(() => ORDER_POOL.slice(0, 4).map((o, k) => ({ ...o, k })));
  const [count, setCount] = useState(42);

  useEffect(() => {
    let i = 4;
    const id = setInterval(() => {
      const next = ORDER_POOL[i % ORDER_POOL.length];
      const k = i;
      i++;
      setOrders((prev) => [{ ...next, k }, ...prev.slice(0, 3)]);
      setCount((c) => c + 1);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 18, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
        <p className="font-sora text-[14px] font-medium text-black">Mis pedidos</p>
        <span className="rounded-full bg-[rgba(219,59,43,0.10)] px-2 py-0.5 font-inter text-[10px] font-bold text-[#DB3B2B] tabular-nums">{count} nuevos</span>
      </div>
      <div className="flex flex-col gap-2">
        {orders.map((o, i) => (
          <div
            key={o.k}
            className="flex items-center gap-3 rounded-[10px] border border-black/[0.05] bg-[#FAFAF9] px-3 py-2.5"
            style={i === 0 ? { animation: "fadeSlideIn 0.45s ease-out" } : undefined}
          >
            <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border border-black/[0.05] bg-white">
              <Image src={`/img/${o.ch}`} alt="" width={20} height={20} className="object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-inter text-[12px] font-semibold text-black">{o.customer}</p>
              <p className="font-inter text-[10px] text-black/45">{o.chName}</p>
            </div>
            <span className="font-inter text-[12px] font-semibold text-black tabular-nums">{o.total}</span>
            <span className="rounded-full px-2 py-0.5 font-inter text-[9px] font-bold" style={{ color: o.color, background: o.bg }}>{o.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Animated panel 3 — Publicar (marketplaces select/deselect) ───────────── */
const PUBLISH_CHANNELS = [
  { src: "meli-iso.svg", name: "Mercado Libre" },
  { src: "amazon-iso.svg", name: "Amazon" },
  { src: "walmart.svg", name: "Walmart" },
  { src: "shein-iso.svg", name: "SHEIN" },
  { src: "sears-isotipo.svg", name: "Sears" },
];

function MpPublishPanel() {
  const [checked, setChecked] = useState([true, true, false, true, false]);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      const idx = i % PUBLISH_CHANNELS.length;
      i++;
      setChecked((prev) => prev.map((c, k) => (k === idx ? !c : c)));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  const n = checked.filter(Boolean).length;

  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 18, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <p className="font-sora text-[14px] font-medium text-black" style={{ marginBottom: 14 }}>Publicar producto</p>
      <div className="flex items-center gap-3 rounded-[10px] border border-black/[0.05] bg-[#FAFAF9] px-3 py-3" style={{ marginBottom: 16 }}>
        <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-black/[0.05] bg-white">
          <Image src="/img/tenis-transparente.png" alt="" width={36} height={28} className="object-contain" />
        </div>
        <div className="flex-1">
          <p className="font-inter text-[12px] font-semibold text-black">Tenis blancos clásicos</p>
          <p className="font-inter text-[10px] text-black/50">3 variantes · $1,345.99</p>
        </div>
      </div>
      <p className="font-inter text-[11px] font-medium text-black/55" style={{ marginBottom: 10 }}>Publicar en:</p>
      <div className="flex flex-col gap-2" style={{ marginBottom: 16 }}>
        {PUBLISH_CHANNELS.map((c, i) => {
          const on = checked[i];
          return (
            <div
              key={c.name}
              className="flex items-center gap-3 rounded-[10px] border px-3 py-2 transition-colors duration-200"
              style={{ borderColor: on ? "rgba(219,59,43,0.35)" : "rgba(0,0,0,0.07)", background: on ? "rgba(219,59,43,0.03)" : "#fff" }}
            >
              <div
                className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-all duration-200"
                style={{ borderColor: on ? "#DB3B2B" : "rgba(0,0,0,0.2)", background: on ? "#DB3B2B" : "#fff" }}
              >
                {on && (
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div className="flex h-[24px] w-[24px] shrink-0 items-center justify-center overflow-hidden rounded-[6px]">
                <Image src={`/img/${c.src}`} alt="" width={22} height={22} className="object-contain" />
              </div>
              <span className="font-inter text-[12px] font-medium text-black/80">{c.name}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center rounded-[10px] bg-[#DB3B2B] py-2.5">
        <span className="font-inter text-[12px] font-semibold text-white tabular-nums">Publicar en {n} {n === 1 ? "canal" : "canales"}</span>
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
          background: "linear-gradient(135deg, #261515 0%, #1A0A0A 40%, #261515 100%)",
        }}
      >
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] tablet:gap-12">
            {/* Left — title + description + CTA */}
            <div>
              <h1
                className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[56px]"
                style={{ lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 22 }}
              >
                Vende en +10 marketplaces desde un solo lugar.
              </h1>
              <p
                className="font-inter text-[16px] font-light text-white/65 tablet:text-[19px]"
                style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}
              >
                Conecta Mercado Libre, Amazon, Walmart, SHEIN y más. Tu inventario, pedidos y catálogo sincronizados en tiempo real.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={SIGNUP_URL}
                  className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]"
                >
                  Comenzar ahora
                </a>
                <span className="font-inter text-[13px] text-white/50">Sin tarjeta · Empieza gratis</span>
              </div>
            </div>

            {/* Right — connector tree visual */}
            <div className="relative">
              {/* Mobile: simplified compact view */}
              <div className="grid grid-cols-3 gap-3 tablet:hidden" style={{ minHeight: 200 }}>
                {MARKETPLACES.slice(0, 6).map((mp, i) => (
                  <div
                    key={i}
                    className="flex h-[64px] items-center justify-center rounded-[14px]"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
                  >
                    <Image src={mp.src} alt={mp.name} width={40} height={40} className="object-contain" />
                  </div>
                ))}
              </div>

              {/* Desktop: animated connector tree */}
              <div className="relative hidden tablet:block" style={{ minHeight: 420 }}>
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 400" fill="none" preserveAspectRatio="xMidYMid meet">
                  {/* Trunk + branches dashed */}
                  <line x1="80" y1="200" x2="155" y2="200" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="5 4" />
                  <circle cx="155" cy="200" r="3" fill="rgba(255,255,255,0.4)" />
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
                  <circle r="3" fill="#E26153" opacity="0.7"><animateMotion dur="1.6s" repeatCount="indefinite" path="M80 200 L155 200" /></circle>
                  <circle r="3" fill="#E26153" opacity="0.7"><animateMotion dur="1.4s" repeatCount="indefinite" path="M200 200 L270 200" /></circle>
                  <circle r="3" fill="#E26153" opacity="0.6"><animateMotion dur="2.5s" repeatCount="indefinite" path="M270 200 L270 40 L320 40" /></circle>
                  <circle r="3" fill="#E26153" opacity="0.6"><animateMotion dur="2s" repeatCount="indefinite" path="M270 200 L270 150 L320 150" begin="0.5s" /></circle>
                  <circle r="3" fill="#E26153" opacity="0.6"><animateMotion dur="2s" repeatCount="indefinite" path="M270 200 L270 260 L320 260" begin="0.3s" /></circle>
                  <circle r="3" fill="#E26153" opacity="0.6"><animateMotion dur="2.5s" repeatCount="indefinite" path="M270 200 L270 360 L320 360" begin="0.8s" /></circle>
                  <circle r="3" fill="#E26153" opacity="0.6"><animateMotion dur="3s" repeatCount="indefinite" path="M270 200 L270 95 L460 95" begin="0.2s" /></circle>
                  <circle r="3" fill="#E26153" opacity="0.7"><animateMotion dur="2.5s" repeatCount="indefinite" path="M270 200 L460 200" begin="0.6s" /></circle>
                  <circle r="3" fill="#E26153" opacity="0.6"><animateMotion dur="3s" repeatCount="indefinite" path="M270 200 L270 305 L460 305" begin="0.4s" /></circle>
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
                    className="absolute flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-[12px]"
                    style={{ left: `${pctX}%`, top: `${pctY}%`, transform: "translate(-50%, -50%)", background: "rgba(255,255,255,0.04)" }}
                  >
                    <Image src={mp.src} alt={mp.name} width={48} height={48} className="object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Una sola operación — header + 3 full-screen stack cards ── */}
      <section className="relative bg-white px-5 pt-16 pb-8 tablet:px-10 tablet:pt-20 tablet:pb-10" data-white-card>
        <div className="mx-auto max-w-[700px] text-center">
          <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
            Una sola operación, todos tus canales
          </h2>
          <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
            Olvídate de gestionar cada marketplace por separado. T1 unifica tu catálogo, inventario y pedidos en un solo panel.
          </p>
        </div>
      </section>

      {/* Stack cards — 3 full-screen blocks (text + panel alternating) */}
      <div ref={stackRootRef} className="fs-stack-card-container relative bg-white">
        {/* Block 1 — Inventario (text left, panel right) — bg white, no shadow */}
        <div className="fs-stack-card" style={{ top: 60, zIndex: 1, background: "#FFFFFF" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Un solo inventario para todos tus canales
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Tu stock se actualiza al instante en todos los marketplaces conectados. Adiós a las sobreventas y al inventario fantasma.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Stock unificado entre tu tienda y marketplaces", "Actualización en tiempo real al vender", "Alertas automáticas de bajo stock"].map((it) => (
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

        {/* Block 2 — Pedidos (panel left, text right) — bg #F6F6F6 */}
        <div className="fs-stack-card" style={{ top: 80, zIndex: 2, background: "#F6F6F6" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div className="order-2 tablet:order-1">
                <MpOrdersPanel />
              </div>

              <div className="order-1 tablet:order-2">
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Todos tus pedidos en un solo panel
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Procesa pedidos de todos los marketplaces sin saltar entre plataformas. Etiqueta, factura y envía desde un solo lugar.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Vista unificada de pedidos por canal", "Filtra por estado, marketplace o cliente", "Genera guías y facturas automáticamente"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Block 3 — Catálogo (text left, panel right) — bg white */}
        <div className="fs-stack-card" style={{ top: 100, zIndex: 3, background: "#FFFFFF" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Publica tu catálogo en un click
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Selecciona los productos y los marketplaces. T1 los publica con título, descripción y categoría adaptados a cada canal.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Mapeo automático de categorías por marketplace", "Variantes y precios diferenciados por canal", "Sincroniza cambios al instante"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <MpPublishPanel />
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 3: Marketplaces grid ── */}
      <section className="relative bg-[#F6F6F6] px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="mx-auto max-w-[640px] text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[26px] font-light text-black tablet:text-[34px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15, marginBottom: 12 }}>
              Más de 10 marketplaces conectados
            </h2>
            <p className="font-inter text-[15px] font-light text-black/60 tablet:text-[17px]" style={{ lineHeight: 1.6 }}>
              Conecta los principales canales del comercio en México y Latinoamérica.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 tablet:grid-cols-4 tablet:gap-5">
            {MARKETPLACES_GRID.map((mp) => (
              <div
                key={mp.name}
                className="flex flex-col items-center justify-center rounded-[16px] border border-black/[0.06] bg-white py-8 transition-all duration-200 hover:border-black/[0.12] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
              >
                <div className="mb-3 flex h-[56px] w-[56px] items-center justify-center">
                  <Image src={mp.src} alt={mp.name} width={56} height={56} className="object-contain" />
                </div>
                <p className="font-inter text-[13px] font-medium text-black/70">{mp.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[760px]">
          <div className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>
              Preguntas frecuentes
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { q: "¿Qué marketplaces puedo conectar?", a: "MercadoLibre, Amazon, Walmart, SHEIN, Sears, Liverpool, Shopify, TikTok Shop y más de 10 canales totales." },
              { q: "¿Necesito tener cuenta en cada marketplace?", a: "Sí, necesitas una cuenta de vendedor en cada marketplace donde quieras publicar. T1 te ayuda con la configuración y conecta cada cuenta una sola vez." },
              { q: "¿Cómo se sincroniza el inventario?", a: "En tiempo real. Cada venta en cualquier canal descuenta stock en menos de 2 segundos en todos los demás. Adiós sobreventas." },
              { q: "¿Puedo tener precios diferentes por canal?", a: "Sí. Cada SKU puede tener un precio distinto en cada marketplace para optimizar margen según las comisiones de cada plataforma." },
              { q: "¿Qué pasa con las categorías de cada marketplace?", a: "T1 mapea automáticamente tus categorías a las taxonomías de cada marketplace. Tú nombras una vez, T1 traduce al lenguaje de cada canal." },
              { q: "¿Cuánto tarda en estar listo?", a: "Conexión inicial en menos de un día. Publicación de tu catálogo masivo en minutos con bulk import." },
            ].map((f) => (
              <details
                key={f.q}
                className="group rounded-[14px] border border-black/[0.06] bg-white transition-all duration-200 open:border-[rgba(219,59,43,0.2)] open:shadow-[0_4px_18px_rgba(0,0,0,0.05)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-sora text-[16px] font-normal text-black transition-colors duration-150 hover:text-[#DB3B2B]">
                  {f.q}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-black/40 transition-transform duration-300 group-open:rotate-180 group-open:text-[#DB3B2B]">
                    <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="px-6 pb-5 font-inter text-[14px] font-light text-black/65" style={{ lineHeight: 1.65 }}>
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
        description="Conecta tus canales en minutos y comienza a sincronizar inventario, pedidos y precios sin esfuerzo."
      />
    </div>
  );
}
