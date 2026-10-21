"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   Built mockups of the real T1pos UI (desktop + mobile), populated
   with the product set used across the landing. Each is designed at a
   fixed internal size and scaled to fit its container (crisp at any
   width), then wrapped in the same glass "screen" frame the main
   landing's stack cards use.
   ────────────────────────────────────────────────────────────── */

/* Scales a fixed-size design to the container width. */
function ScaledMock({ designW, designH, children }: { designW: number; designH: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / designW);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [designW]);
  return (
    <div ref={ref} style={{ width: "100%", aspectRatio: `${designW} / ${designH}`, overflow: "hidden" }}>
      <div style={{ width: designW, height: designH, transform: `scale(${scale || 0.0001})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}

/* Glass "screen" frame — same edge treatment as the T1 stack-card screens. */
export function GlassScreen({ children, radius = 16, className = "", style }: { children: React.ReactNode; radius?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        borderRadius: radius + 9,
        padding: 9,
        background: "linear-gradient(155deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 42%, rgba(255,255,255,0.04) 100%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 0 0 1px rgba(255,255,255,0.10), 0 0 0 1px rgba(255,255,255,0.10), 0 22px 46px rgba(0,0,0,0.26)",
        ...style,
      }}
    >
      <div style={{ borderRadius: radius, overflow: "hidden", background: "#fff" }}>{children}</div>
    </div>
  );
}

const DESK_PRODUCTS = [
  { name: "Tenis blancos clásicos", sub: "120 disponibles", price: "$1,345.99", img: "/img/tenis-transparente.png", state: "ok" as const },
  { name: "Playera básica algodón", sub: "1 disponible", price: "$249.00", img: "/img/playera.png", state: "low" as const },
  { name: "Sudadera hoodie premium", sub: "Agotado", price: "$890.00", img: "/img/moda-hoodie.png", state: "out" as const },
  { name: "Gorra clásica bordada", sub: "2 variantes", price: "$329.00", img: "/img/moda-gorra.png", state: "ok" as const },
  { name: "Playera polo mujer", sub: "84 disponibles", price: "$399.00", img: "/img/moda-playera.png", state: "ok" as const },
];

const SIDE_ICONS = [
  "M6 2h9l3 3v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z",      // doc/bag
  "M4 6h16M4 12h16M4 18h10",                                            // list
  "M3 7h18v12H3zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",                // briefcase
  "M9 15l6-6M8 13l-2 2a3 3 0 0 0 4 4l2-2M16 11l2-2a3 3 0 0 0-4-4l-2 2", // link
  "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 21a7 7 0 0 1 14 0",            // user
  "M4 20V10M10 20V4M16 20v-7M20 20H3",                                  // chart
  "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.3 1A7 7 0 0 0 14 6l-.4-2.4h-3.2L10 6a7 7 0 0 0-2.6 1.6l-2.3-1-2 3.4 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.3-1A7 7 0 0 0 10 18l.4 2.4h3.2L14 18a7 7 0 0 0 2.6-1.6l2.3 1 2-3.4-2-1.5a7 7 0 0 0 .1-1z", // gear
];

function PosDesktop() {
  return (
    <div className="flex h-full w-full flex-col bg-white font-inter" style={{ width: 940, height: 620 }}>
      {/* top bar */}
      <div className="flex items-center justify-between border-b border-black/[0.06] px-5" style={{ height: 52 }}>
        <div className="flex items-center gap-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8"><path d="M9 4v16M4 4h16v16H4z" /></svg>
          <span className="font-sora text-[20px] font-bold tracking-tight"><span className="text-[#DB3B2B]">T1</span><span className="text-black">pos</span></span>
          <div className="ml-3 flex items-center gap-1.5 rounded-full border border-black/[0.10] px-2.5 py-1">
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#16A34A] font-inter text-[9px] font-bold text-white">CO</span>
            <span className="font-inter text-[13px] font-medium text-black">Chicos Ole</span>
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M5 7l3 3 3-3" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" /></svg>
          <div className="relative">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8"><path d="M6 6h15l-1.5 9h-12zM6 6L5 3H2M9 20a1 1 0 1 0 0 .01M18 20a1 1 0 1 0 0 .01" /></svg>
            <span className="absolute -right-1 -top-1 h-[8px] w-[8px] rounded-full bg-[#DB3B2B]" />
          </div>
          <div className="h-[30px] w-[30px] rounded-full" style={{ background: "linear-gradient(135deg,#C0392B,#7B241C)" }} />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* sidebar */}
        <div className="flex flex-col items-center justify-between border-r border-black/[0.06] py-4" style={{ width: 56 }}>
          <div className="flex flex-col items-center gap-5">
            {SIDE_ICONS.map((d, i) => (
              <div key={i} className={`flex h-[30px] w-[30px] items-center justify-center rounded-[9px] ${i === 0 ? "bg-black/[0.05]" : ""}`}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? "#111827" : "#9CA3AF"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
              </div>
            ))}
          </div>
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] border border-black/[0.08]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.7"><path d="M5 11h14v9H5zM8 11V7a4 4 0 0 1 8 0v4" /></svg>
          </div>
        </div>

        {/* main */}
        <div className="flex flex-1 flex-col overflow-hidden px-6 py-5">
          <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
            <p className="font-sora text-[22px] font-semibold text-black">La Noria Giftshop</p>
            <div className="flex items-center gap-2 rounded-[12px] bg-[#DB3B2B] px-4 py-2.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"><path d="M12 5v14M5 12h14" /></svg>
              <span className="font-inter text-[13px] font-semibold text-white">Crear producto</span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-[12px] border border-black/[0.10] px-4" style={{ height: 44, marginBottom: 14 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
            <span className="font-inter text-[14px] text-black/40">Buscar producto</span>
          </div>
          <div className="flex items-center gap-5 border-b border-black/[0.06]" style={{ marginBottom: 6 }}>
            {["Destacados", "Playeras", "Tenis", "Caballero", "Dama", "Niño", "Outlet", "Promociones"].map((t, i) => (
              <div key={t} className="relative pb-2.5">
                <span className={`font-inter text-[13px] ${i === 0 ? "font-semibold text-black" : "text-black/50"}`}>{t}</span>
                {i === 0 && <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#DB3B2B]" />}
              </div>
            ))}
          </div>
          {/* Auto-scrolling product list (seamless vertical marquee) */}
          <div style={{ height: 390, overflow: "hidden" }}>
            <div style={{ animation: "posListScroll 16s linear infinite" }}>
              {[...DESK_PRODUCTS, ...DESK_PRODUCTS].map((p, idx) => (
                <div key={idx} className="flex items-center gap-3 border-b border-black/[0.04]" style={{ height: 56, opacity: p.state === "out" ? 0.45 : 1 }}>
                  <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-black/[0.05] bg-[#FAFAF9]">
                    <Image src={p.img} alt="" width={32} height={24} className="object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-inter text-[13px] font-medium text-black">{p.name}</p>
                    {p.state === "low" ? (
                      <span className="mt-0.5 inline-flex rounded-[5px] bg-[rgba(245,158,11,0.12)] px-1.5 py-0.5 font-inter text-[10px] font-semibold text-[#B45309]">{p.sub}</span>
                    ) : p.state === "out" ? (
                      <span className="mt-0.5 inline-flex rounded-[5px] bg-[rgba(219,59,43,0.10)] px-1.5 py-0.5 font-inter text-[10px] font-semibold text-[#DB3B2B]">{p.sub}</span>
                    ) : (
                      <p className="font-inter text-[11px] text-black/45">{p.sub}</p>
                    )}
                  </div>
                  <span className="font-inter text-[13px] font-semibold text-black">{p.price}</span>
                  <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-black/[0.10]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#9CA3AF"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* cart */}
        <div className="flex flex-col border-l border-black/[0.06] px-4 py-4" style={{ width: 248 }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
            <p className="font-sora text-[17px] font-semibold text-black">Carrito</p>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.7"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13h10l1-13" /></svg>
          </div>
          <div className="flex items-center gap-2 rounded-[10px] border border-black/[0.08] px-2.5 py-2" style={{ marginBottom: 14 }}>
            <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#DB3B2B] font-inter text-[9px] font-bold text-white">AE</span>
            <span className="flex-1 font-inter text-[12px] font-medium text-black">Arturo Elías</span>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#9CA3AF" strokeWidth="1.6"><path d="M4 4l8 8M12 4l-8 8" /></svg>
          </div>
          {[
            { name: "Tenis blancos clásicos", variant: "", qty: 1, price: "$1,345.99", img: "/img/tenis-transparente.png" },
            { name: "Gorra clásica bordada", variant: "Color: Negro", qty: 2, price: "$658.00", img: "/img/moda-gorra.png" },
          ].map((it) => (
            <div key={it.name} className="flex items-start gap-2.5" style={{ marginBottom: 14 }}>
              <div className="relative h-[34px] w-[34px] shrink-0">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[7px] border border-black/[0.05] bg-[#FAFAF9]"><Image src={it.img} alt="" width={26} height={20} className="object-contain" /></div>
                <span className="absolute -left-1 -top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#DB3B2B] font-inter text-[8px] font-bold text-white">{it.qty}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-inter text-[11.5px] font-medium leading-tight text-black">{it.name}</p>
                {it.variant && <p className="mt-0.5 font-inter text-[9.5px] text-black/45">{it.variant}</p>}
              </div>
              <span className="font-inter text-[11.5px] font-semibold text-black">{it.price}</span>
            </div>
          ))}
          <div className="mt-auto">
            <div className="flex gap-2" style={{ marginBottom: 10 }}>
              {[{ l: "Importe", d: "M12 6v12M9 9h4.5a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3H15" }, { l: "Descuento", d: "M9 15l6-6M9.5 9.5h.01M14.5 14.5h.01M5 5h14v14H5z" }].map((b) => (
                <div key={b.l} className="flex flex-1 flex-col items-center gap-1 rounded-[12px] border border-black/[0.10] py-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d={b.d} /></svg>
                  <span className="font-inter text-[11px] text-black/70">{b.l}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center rounded-[12px] bg-[#DB3B2B]" style={{ height: 44 }}>
              <span className="font-inter text-[14px] font-semibold text-white">Cobrar $2,003.99</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PosMobile() {
  return (
    <div className="flex h-full w-full flex-col bg-white font-inter" style={{ width: 300, height: 615 }}>
      {/* status bar */}
      <div className="flex items-center justify-between px-5 pt-2.5" style={{ height: 30 }}>
        <span className="font-inter text-[12px] font-semibold text-black">9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="15" height="11" viewBox="0 0 18 12" fill="#111"><rect x="0" y="7" width="2.5" height="4" rx="0.6" /><rect x="4" y="5" width="2.5" height="6" rx="0.6" /><rect x="8" y="3" width="2.5" height="8" rx="0.6" /><rect x="12" y="1" width="2.5" height="10" rx="0.6" /></svg>
          <svg width="14" height="11" viewBox="0 0 16 12" fill="none" stroke="#111" strokeWidth="1.3"><path d="M1 4a10 10 0 0 1 14 0M3.5 6.5a6.5 6.5 0 0 1 9 0M8 9.5h.01" /></svg>
          <svg width="20" height="11" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="#111" /><rect x="2" y="2" width="16" height="8" rx="1.5" fill="#111" /><rect x="21.5" y="4" width="1.5" height="4" rx="0.7" fill="#111" /></svg>
        </div>
      </div>
      {/* header */}
      <div className="flex items-center justify-between px-5" style={{ height: 46 }}>
        <span className="w-[18px]" />
        <span className="font-sora text-[16px] font-semibold text-black">Carrito</span>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.7"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13h10l1-13" /></svg>
      </div>
      {/* assign customer */}
      <div className="px-4" style={{ marginBottom: 16 }}>
        <div className="flex items-center gap-2 rounded-[12px] border border-black/[0.10] px-3" style={{ height: 42 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.6"><circle cx="10" cy="8" r="3.2" /><path d="M4 19a6 6 0 0 1 12 0M18 8v5M15.5 10.5h5" /></svg>
          <span className="font-inter text-[13px] text-black/55">Asignar cliente</span>
        </div>
      </div>
      {/* items */}
      <div className="flex-1 px-4">
        {[
          { name: "Tenis blancos clásicos", chips: [] as string[], price: "$1,345.99", img: "/img/tenis-transparente.png" },
          { name: "Playera básica algodón", chips: ["Chica", "Azul"], price: "$249.00", img: "/img/playera.png" },
        ].map((it) => (
          <div key={it.name} className="flex items-start gap-3" style={{ marginBottom: 16 }}>
            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center overflow-hidden rounded-[9px] border border-black/[0.05] bg-[#FAFAF9]">
              <Image src={it.img} alt="" width={30} height={24} className="object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-inter text-[13px] font-medium text-black">{it.name}</p>
              {it.chips.length > 0 && (
                <div className="mt-1 flex gap-1.5">
                  {it.chips.map((c) => (
                    <span key={c} className="rounded-[6px] bg-black/[0.05] px-2 py-0.5 font-inter text-[10px] text-black/55">{c}</span>
                  ))}
                </div>
              )}
            </div>
            <span className="font-inter text-[13px] font-semibold text-black">{it.price}</span>
          </div>
        ))}
      </div>
      {/* footer */}
      <div className="px-4 pb-4">
        <div className="flex gap-2.5" style={{ marginBottom: 10 }}>
          {[{ l: "Importe", d: "M12 6v12M9 9h4.5a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3H15" }, { l: "Descuento", d: "M9 15l6-6M9.5 9.5h.01M14.5 14.5h.01M5 5h14v14H5z" }].map((b) => (
            <div key={b.l} className="flex flex-1 flex-col items-center gap-1 rounded-[12px] border border-black/[0.10] py-3">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d={b.d} /></svg>
              <span className="font-inter text-[12px] text-black/70">{b.l}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center rounded-[12px] bg-[#DB3B2B]" style={{ height: 46 }}>
          <span className="font-inter text-[14px] font-semibold text-white">Cobrar $1,594.99</span>
        </div>
      </div>
    </div>
  );
}

/* Tap indicator — ripple + cursor showing where the click lands. */
function Tap({ left = "50%", top = "50%" }: { left?: number | string; top?: number | string }) {
  return (
    <span className="pointer-events-none absolute z-[6]" style={{ left, top }}>
      <span className="absolute rounded-full" style={{ left: -17, top: -17, width: 34, height: 34, border: "2.5px solid rgba(219,59,43,0.85)", animation: "tapRipple 1.1s ease-out infinite" }} />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#111827" stroke="white" strokeWidth="1.4" strokeLinejoin="round" style={{ position: "absolute", left: 1, top: 1, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))" }}><path d="M5 2.5l6 17.5 2.3-7.2L20.5 10.5z" /></svg>
    </span>
  );
}

/* ══════════ Nuevo inicio del POS ("Hola, Brenda") ══════════
   Pantalla de inicio actual del producto: saludo, buscador de producto /
   orden / cliente con escáner y 4 accesos directos. La venta se arma en el
   panel "Venta" (desktop) o en la hoja "Nueva venta" (móvil). */

const ATAJOS = [
  {
    l: "Generar link de pago",
    icon: (s: number) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#DB3B2B" strokeWidth="1.7" strokeLinecap="round"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" /><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" /></svg>
    ),
  },
  {
    l: "Órdenes y pedidos",
    icon: (s: number) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.6" strokeLinejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M4 7.5l8 4.5 8-4.5M12 12v9" /></svg>
    ),
  },
  {
    l: "Control de caja",
    icon: (s: number) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="5" r="2.2" /><path d="M3 20l3-3h5l5-4a1.6 1.6 0 0 0-2-2.5l-3 2.2H8l-5 4" /><circle cx="15.5" cy="8" r="2.6" /></svg>
    ),
  },
  {
    l: "Editar acceso directo",
    icon: (s: number) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" /><path d="M17.5 3.5l3 3L12 15l-4 1 1-4z" /></svg>
    ),
  },
];

function PosAtajos({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid grid-cols-2 ${compact ? "gap-3" : "gap-4"}`}>
      {ATAJOS.map((a) => (
        <div
          key={a.l}
          className={`flex flex-col items-center justify-center rounded-[12px] border border-black/[0.07] bg-white text-center ${compact ? "gap-2 px-2 py-4" : "gap-3 py-7"}`}
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
        >
          {a.icon(compact ? 26 : 30)}
          <span className={`font-inter text-black/70 ${compact ? "text-[11.5px] leading-tight" : "text-[13px]"}`}>{a.l}</span>
        </div>
      ))}
    </div>
  );
}

function PosBuscador({ texto, compact = false, tap = false }: { texto?: string; compact?: boolean; tap?: boolean }) {
  return (
    <div className={`relative flex items-center gap-2 rounded-[12px] border border-black/[0.10] bg-white ${compact ? "px-3" : "px-4"}`} style={{ height: compact ? 38 : 44 }}>
      <svg width={compact ? 14 : 16} height={compact ? 14 : 16} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
      <span className={`flex-1 truncate font-inter ${compact ? "text-[11.5px]" : "text-[13px]"} ${texto ? "text-black/80" : "text-black/40"}`}>{texto || "Buscar producto, orden o cliente..."}</span>
      {texto && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18" /></svg>}
      <svg width={compact ? 15 : 17} height={compact ? 15 : 17} viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.6"><path d="M4 8V5h3M20 8V5h-3M4 16v3h3M20 16v3h-3M8 8v8M11 8v8M14 8v8M16.5 8v8" /></svg>
      {tap && <Tap left="40%" top="55%" />}
    </div>
  );
}

/* Resultado de búsqueda (una fila de producto) */
function PosResultado({ p, compact = false, tap = false }: { p: { name: string; price: string; stock: string; low?: boolean; img: string }; compact?: boolean; tap?: boolean }) {
  return (
    <div className="relative flex items-center gap-3" style={{ padding: compact ? "8px 0" : "10px 4px", animation: "fadeSlideIn 0.35s ease-out" }}>
      <div className={`flex shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-[#FAFAF9] ${compact ? "h-[38px] w-[38px]" : "h-[44px] w-[44px]"}`}>
        <Image src={p.img} alt="" width={36} height={30} className="object-contain" />
      </div>
      <div className="min-w-0 flex-1">
        <p className={`truncate font-inter text-black ${compact ? "text-[12px]" : "text-[13px]"}`}>{p.name}</p>
        <span className={`mt-0.5 inline-block rounded-[5px] px-1.5 py-[1px] font-inter text-[10px] ${p.low ? "bg-[rgba(245,158,11,0.16)] text-[#B45309]" : "text-black/50"}`}>{p.stock}</span>
      </div>
      <span className={`font-inter text-black/80 ${compact ? "text-[12px]" : "text-[13px]"}`}>{p.price}</span>
      <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full border border-black/[0.10]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#6B7280"><circle cx="5" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="12" r="1.8" /></svg>
      </span>
      {tap && <Tap left="34%" top="50%" />}
    </div>
  );
}

/* Productos del flujo de venta (mismos en móvil y desktop) */
const VENTA_PRODUCTOS = [
  { name: "Playera básica algodón", price: "$125.00", stock: "1 disponible", low: true, img: "/img/moda-playera.png", qty: 2, total: "$250.00" },
  { name: "Gorra clásica bordada", price: "$250.00", stock: "120 disponibles", img: "/img/moda-gorra.png", qty: 1, total: "$250.00" },
];

/* Fila del carrito con control de cantidad y borrar */
function PosItemVenta({ it, compact = false }: { it: (typeof VENTA_PRODUCTOS)[number]; compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5" style={{ padding: compact ? "7px 0" : "8px 0", animation: "fadeSlideIn 0.35s ease-out" }}>
      <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center overflow-hidden rounded-[7px] bg-[#FAFAF9]"><Image src={it.img} alt="" width={28} height={22} className="object-contain" /></div>
      <div className="min-w-0 flex-1">
        <p className={`truncate font-inter text-black ${compact ? "text-[11.5px]" : "text-[11.5px]"}`}>{it.name}</p>
        <span className={`inline-block rounded-[4px] px-1 font-inter text-[9px] ${it.low ? "bg-[rgba(245,158,11,0.16)] text-[#B45309]" : "text-black/50"}`}>{it.stock}</span>
      </div>
      <span className="font-inter text-[11px] text-black/80">{it.total}</span>
      <span className="flex items-center gap-1.5 rounded-full border border-black/[0.10] px-1.5 py-[1px] font-inter text-[10px] text-black/80">- <b className="font-semibold">{it.qty}</b> +</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.6"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13h10l1-13M10 11v6M14 11v6" /></svg>
    </div>
  );
}

function PosTotales({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-[10px] border border-black/[0.08] font-inter ${compact ? "px-3 py-2 text-[11px]" : "px-3 py-2.5 text-[11.5px]"}`}>
      <div className="flex justify-between text-black/70"><span>Subtotal</span><span>$431.03</span></div>
      <div className="mt-1 flex justify-between text-black/70"><span>IVA</span><span>$68.97</span></div>
      <div className="mt-1 flex justify-between font-semibold text-black"><span>Total</span><span>$500.00</span></div>
    </div>
  );
}

function PosBotonesImporte({ activoDescuento = true }: { activoDescuento?: boolean }) {
  return (
    <div className="flex gap-2">
      {[
        { l: "Importe", on: !activoDescuento, d: "M12 7v10M9.5 9.5h3.75a1.75 1.75 0 0 1 0 3.5h-2.5a1.75 1.75 0 0 0 0 3.5H15" },
        { l: "Descuento", on: activoDescuento, d: "M9 15l6-6M9.5 9.5h.01M14.5 14.5h.01" },
      ].map((b) => (
        <div key={b.l} className="flex flex-1 flex-col items-center gap-0.5 rounded-[10px] border border-black/[0.10] py-2" style={{ opacity: b.on ? 1 : 0.4 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d={b.d} /></svg>
          <span className="font-inter text-[10.5px] text-black/75">{b.l}</span>
        </div>
      ))}
    </div>
  );
}


function PosCheckoutDesktop() {
  // 0 inicio (clic en buscar) · 1 busca y agrega playera · 2 busca y agrega gorra
  // 3 Cobrar · 4 método · 5 confirmar · 6 cobro exitoso
  const [step, setStep] = useState(0);
  useEffect(() => {
    const durations = [1500, 1500, 1500, 1300, 2200, 1700, 2700];
    const t = setTimeout(() => setStep((step + 1) % 7), durations[step]);
    return () => clearTimeout(t);
  }, [step]);

  const visible = step === 0 ? 0 : step === 1 ? 1 : 2;
  const modal = step >= 4;

  const RowArrow = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );

  return (
    <div className="relative flex h-full w-full flex-col bg-white font-inter" style={{ width: 940, height: 620 }}>
      {/* top bar */}
      <div className="flex items-center justify-between border-b border-black/[0.06] px-5" style={{ height: 52 }}>
        <div className="flex items-center gap-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8"><path d="M9 4v16M4 4h16v16H4z" /></svg>
          <span className="font-sora text-[20px] font-bold tracking-tight"><span className="text-[#DB3B2B]">T1</span><span className="text-black">pos</span></span>
          <div className="ml-3 flex items-center gap-1.5 rounded-full border border-black/[0.10] px-2.5 py-1">
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#16A34A] font-inter text-[9px] font-bold text-white">CO</span>
            <span className="font-inter text-[13px] font-medium text-black">Chicos Ole</span>
          </div>
        </div>
        <div className="h-[30px] w-[30px] rounded-full" style={{ background: "linear-gradient(135deg,#C0392B,#7B241C)" }} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* sidebar */}
        <div className="flex flex-col items-center gap-5 border-r border-black/[0.06] py-4" style={{ width: 56 }}>
          {SIDE_ICONS.slice(0, 6).map((d, i) => (
            <div key={i} className={`flex h-[30px] w-[30px] items-center justify-center rounded-[9px] ${i === 0 ? "bg-black/[0.05]" : ""}`}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? "#111827" : "#9CA3AF"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
            </div>
          ))}
        </div>

        {/* main — nuevo inicio ("Hola, Brenda") y búsqueda de productos */}
        <div className="flex flex-1 flex-col overflow-hidden px-6 py-5" style={{ filter: modal ? "blur(1.5px)" : "none", opacity: modal ? 0.6 : 1, transition: "opacity 0.3s" }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 14, height: 38 }}>
            <p className="font-sora text-[22px] font-semibold text-black/80">{step === 0 ? "Hola, Brenda" : step === 1 || step >= 3 ? "Playera básica" : "Gorra clásica"}</p>
            {step > 0 && (
              <div className="flex items-center gap-2 rounded-[12px] bg-[#DB3B2B] px-4 py-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"><path d="M12 5v14M5 12h14" /></svg>
                <span className="font-inter text-[13px] font-semibold text-white">Crear producto</span>
              </div>
            )}
          </div>
          <div style={{ marginBottom: 16 }}>
            <PosBuscador texto={step === 0 ? "" : step === 2 ? "Gorra clásica" : "Playera básica"} tap={step === 0} />
          </div>
          {step === 0 ? (
            <PosAtajos />
          ) : (
            <div key={step === 2 ? "g" : "p"}>
              <PosResultado p={step === 2 ? VENTA_PRODUCTOS[1] : VENTA_PRODUCTOS[0]} tap={step === 1 || step === 2} />
            </div>
          )}
        </div>

        {/* Venta — panel derecho */}
        <div className="flex flex-col border-l border-black/[0.06] px-4 py-4" style={{ width: 300, background: "#fff" }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
            <p className="font-sora text-[18px] font-semibold text-black/80">Venta</p>
            <span className="flex items-center gap-1.5 rounded-[9px] border border-black/[0.10] px-2.5 py-1.5 font-inter text-[11px] text-black/80">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.7"><circle cx="10" cy="8" r="3.4" /><path d="M4 20a6 6 0 0 1 12 0M19 8v5M16.5 10.5h5" /></svg>
              Asignar cliente
            </span>
          </div>
          {visible === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-3 text-center">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.2 10.5h10.6L20 7H6" /><circle cx="9" cy="19" r="1.5" /><circle cx="17" cy="19" r="1.5" /></svg>
              <p className="mt-2 font-inter text-[15px] font-semibold text-black/80">Agrega productos</p>
              <p className="mt-1 font-inter text-[11px] text-black/55">Escanea o busca los productos que el cliente quiere comprar</p>
            </div>
          ) : (
            <div className="flex-1 overflow-hidden">
              {VENTA_PRODUCTOS.slice(0, visible).map((it) => <PosItemVenta key={it.name} it={it} />)}
            </div>
          )}
          <div className="mt-auto flex flex-col gap-2">
            <PosBotonesImporte activoDescuento={visible > 0} />
            {visible >= 2 && <PosTotales />}
            <div className="relative flex items-center justify-center rounded-[12px]" style={{ height: 42, background: visible >= 2 ? "#DB3B2B" : "rgba(219,59,43,0.4)" }}>
              <span className="font-inter text-[13.5px] font-semibold text-white">{visible >= 2 ? "Cobrar $500.00" : visible === 1 ? "Cobrar $250.00" : "Cobrar $0.00"}</span>
              {step === 3 && <Tap left="62%" top="56%" />}
            </div>
            {visible >= 2 && <p className="text-center font-inter text-[11.5px] font-semibold text-[#DB3B2B]">Vaciar carrito</p>}
          </div>
        </div>
      </div>

      {/* ── Checkout modal ── */}
      {modal && (
        <div className="absolute inset-0 z-10 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.28)" }}>
          <div className="relative rounded-[20px] bg-white" style={{ width: 380, padding: "26px 26px 24px", boxShadow: "0 24px 60px rgba(0,0,0,0.25)", animation: "fadeSlideIn 0.35s ease-out" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" className="absolute right-5 top-5"><path d="M6 6l12 12M18 6L6 18" /></svg>

            <div key={step} style={{ animation: "modalContentFade 0.32s ease-out" }}>
            {step === 4 && (
              <>
                <p className="text-center font-sora text-[15px] font-medium text-black/70" style={{ marginBottom: 2 }}>Monto a cobrar</p>
                <p className="text-center font-sora text-[40px] font-semibold text-black" style={{ letterSpacing: "-0.02em", marginBottom: 14 }}>$500.00</p>
                <p className="text-center font-inter text-[12.5px] text-black/55" style={{ marginBottom: 16 }}>Elige el método de cobro con el que finalizarás esta venta.</p>
                {[
                  { l: "Tarjeta", d: "M3 7h18v10H3zM3 10h18", hot: true },
                  { l: "Efectivo", d: "M3 6h18v12H3zM7 12h.01M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", hot: false },
                  { l: "Transferencia", d: "M7 7h10l-3-3M17 17H7l3 3", hot: false },
                ].map((m) => (
                  <div key={m.l} className="relative flex items-center gap-3 border-b border-black/[0.06] py-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={m.hot ? "#DB3B2B" : "#6B7280"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={m.d} /></svg>
                    <span className={`flex-1 font-inter text-[14px] ${m.hot ? "font-semibold text-black" : "text-black/75"}`}>{m.l}</span>
                    <RowArrow />
                    {m.hot && <Tap left="86%" top="50%" />}
                  </div>
                ))}
              </>
            )}

            {step === 5 && (
              <>
                <p className="text-center font-sora text-[15px] font-medium text-black/70" style={{ marginBottom: 2 }}>Monto a cobrar</p>
                <p className="text-center font-sora text-[44px] font-semibold text-black" style={{ letterSpacing: "-0.02em", marginBottom: 14 }}>$500.00</p>
                <p className="text-center font-inter text-[13px] text-black/60" style={{ marginBottom: 16 }}>Confirma el pago para completar la venta</p>
                <div className="relative flex items-center justify-center rounded-[12px] bg-[#DB3B2B]" style={{ height: 46 }}>
                  <span className="font-inter text-[14px] font-semibold text-white">Confirmar pago</span>
                  <Tap left="62%" top="56%" />
                </div>
              </>
            )}

            {step === 6 && (
              <>
                <div className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#22C55E]" style={{ marginBottom: 10 }}>
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <p className="text-center font-sora text-[14px] font-medium text-black/70" style={{ marginBottom: 2 }}>Cobro exitoso</p>
                <p className="text-center font-sora text-[34px] font-semibold text-black" style={{ letterSpacing: "-0.02em", marginBottom: 2 }}>$500.00</p>
                <p className="text-center font-inter text-[12px] text-black/55" style={{ marginBottom: 12 }}>No. de pedido 123455678</p>
                <p className="text-center font-inter text-[12px] text-black/70" style={{ marginBottom: 8 }}>Selecciona cómo entregar el ticket al cliente.</p>
                <div className="flex flex-col gap-2" style={{ marginBottom: 14 }}>
                  {[
                    { l: "Email", icon: (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>) },
                    { l: "SMS", icon: (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v11H8l-4 4z" /></svg>) },
                    { l: "WhatsApp", icon: (<svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm5.3 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.7-1.2-4.5-4-4.6-4.2-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9.9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.7.7 1.9.1.1.1.3 0 .5-.1.2-.2.3-.3.5l-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.7.8.3.1.4.2.5.3.1.2.1.7-.1 1.3z" /></svg>) },
                  ].map((o) => (
                    <div key={o.l} className="flex items-center justify-center gap-2 rounded-[10px] border border-black/[0.12] py-2">
                      {o.icon}
                      <span className="font-inter text-[12.5px] font-medium text-black/75">{o.l}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <div className="flex flex-1 items-center justify-center rounded-[12px] border border-black/[0.12] py-2.5">
                    <span className="font-inter text-[13px] font-medium text-black/75">Ver detalles</span>
                  </div>
                  <div className="flex flex-1 items-center justify-center rounded-[12px] bg-[#DB3B2B] py-2.5">
                    <span className="font-inter text-[13px] font-semibold text-white">Finalizar</span>
                  </div>
                </div>
              </>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Mobile status bar (shared). */
function MStatus() {
  return (
    <div className="flex items-center justify-between px-5 pt-2.5" style={{ height: 30 }}>
      <span className="font-inter text-[12px] font-semibold text-black">9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="15" height="11" viewBox="0 0 18 12" fill="#111"><rect x="0" y="7" width="2.5" height="4" rx="0.6" /><rect x="4" y="5" width="2.5" height="6" rx="0.6" /><rect x="8" y="3" width="2.5" height="8" rx="0.6" /><rect x="12" y="1" width="2.5" height="10" rx="0.6" /></svg>
        <svg width="14" height="11" viewBox="0 0 16 12" fill="none" stroke="#111" strokeWidth="1.3"><path d="M1 4a10 10 0 0 1 14 0M3.5 6.5a6.5 6.5 0 0 1 9 0M8 9.5h.01" /></svg>
        <svg width="20" height="11" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="#111" /><rect x="2" y="2" width="16" height="8" rx="1.5" fill="#111" /><rect x="21.5" y="4" width="1.5" height="4" rx="0.7" fill="#111" /></svg>
      </div>
    </div>
  );
}

/* Animated mobile checkout flow: list → cobrar → cart → método → confirmar → éxito. */
function PosCheckoutMobile({ liftButtons = false }: { liftButtons?: boolean }) {
  const [step, setStep] = useState(0);
  // When shown semi-cut inside the stack card the bottom bleeds off the card
  // edge; this extra bottom inset (cut off, invisible) raises the action buttons
  // above the cut line so they stay visible. In the sublanding (liftButtons=false)
  // the phone shows fully with its normal small padding.
  const LIFT = liftButtons ? 100 : 0;
  useEffect(() => {
    const durations = [1300, 1500, 1700, 2100, 1800, 2500];
    const t = setTimeout(() => setStep((step + 1) % 6), durations[step]);
    return () => clearTimeout(t);
  }, [step]);

  const screen = step <= 1 ? "list" : step <= 3 ? "cart" : step === 4 ? "confirm" : "success";
  return (
    <div className="relative flex h-full w-full flex-col bg-white font-inter" style={{ width: 300, height: 620 }}>
      <MStatus />

      {/* ── Inicio (step 0) y búsqueda (step 1) — nuevo home "Hola, Brenda" ── */}
      {screen === "list" && (
        <div key="list" className="flex flex-1 flex-col overflow-hidden" style={{ animation: "modalContentFade 0.3s ease-out" }}>
          <div className="flex items-center justify-between px-4" style={{ height: 48 }}>
            <span className="flex items-center gap-2.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.7" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              <span className="font-sora text-[15px] font-semibold text-black/80">{step === 0 ? "Hola, Brenda" : "Playera básica"}</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-[10px] border border-black/[0.10] px-2.5 py-1.5 font-inter text-[11px] text-black/80">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.2 10.5h10.6L20 7H6" /><circle cx="9" cy="19" r="1.4" /><circle cx="17" cy="19" r="1.4" /></svg>
              Nueva venta
            </span>
          </div>
          <div className="px-4" style={{ marginBottom: 14 }}>
            <PosBuscador compact texto={step === 0 ? "" : "Playera básica"} tap={step === 0} />
          </div>
          {step === 0 ? (
            <div className="px-4"><PosAtajos compact /></div>
          ) : (
            <div className="px-4">
              <div className="flex gap-4 border-b border-black/[0.06]" style={{ marginBottom: 4 }}>
                {["Todos", "Productos", "Clientes", "Órdenes"].map((t, k) => (
                  <span key={t} className={`relative pb-2 font-inter text-[11.5px] ${k === 0 ? "text-black" : "text-black/55"}`}>
                    {t}
                    {k === 0 && <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-[#DB3B2B]" />}
                  </span>
                ))}
              </div>
              <PosResultado compact p={VENTA_PRODUCTOS[0]} tap />
            </div>
          )}
        </div>
      )}

      {/* ── Nueva venta (steps 2–3) ── */}
      {screen === "cart" && (
        <div key="cart" className="flex flex-1 flex-col overflow-hidden" style={{ animation: step === 2 ? "modalContentFade 0.3s ease-out" : undefined, filter: step === 3 ? "blur(1px)" : "none" }}>
          <div className="flex items-center justify-between px-4" style={{ height: 48 }}>
            <span className="flex items-center gap-2">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
              <span className="font-sora text-[15px] font-semibold text-black/80">Nueva venta</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-[10px] border border-black/[0.10] px-2.5 py-1.5 font-inter text-[11px] text-black/80">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.7"><circle cx="10" cy="8" r="3.4" /><path d="M4 20a6 6 0 0 1 12 0M19 8v5M16.5 10.5h5" /></svg>
              Asignar cliente
            </span>
          </div>
          <div className="flex-1 overflow-hidden px-4">
            {VENTA_PRODUCTOS.map((it) => <PosItemVenta key={it.name} it={it} compact />)}
          </div>
          <div className="flex flex-col gap-2 px-4" style={{ paddingBottom: 12 + LIFT }}>
            <PosBotonesImporte />
            <PosTotales compact />
            <div className="relative flex items-center justify-center rounded-[12px] bg-[#DB3B2B]" style={{ height: 44 }}>
              <span className="font-inter text-[14px] font-semibold text-white">Cobrar $500.00</span>
              {step === 2 && <Tap left="50%" top="50%" />}
            </div>
            <p className="text-center font-inter text-[11.5px] font-semibold text-[#DB3B2B]">Vaciar carrito</p>
          </div>
        </div>
      )}

      {/* ── Method bottom sheet (step 3, over cart) ── */}
      {step === 3 && (
        <div className="absolute inset-0 z-10 flex flex-col justify-end" style={{ background: "rgba(0,0,0,0.28)" }}>
          <div className="rounded-t-[22px] bg-white px-5 pt-5" style={{ animation: "sheetUp 0.35s ease-out", paddingBottom: 24 + LIFT }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" className="ml-auto"><path d="M6 6l12 12M18 6L6 18" /></svg>
            <p className="text-center font-sora text-[13px] font-medium text-black/70" style={{ marginBottom: 2 }}>Monto a cobrar</p>
            <p className="text-center font-sora text-[34px] font-semibold text-black" style={{ letterSpacing: "-0.02em", marginBottom: 12 }}>$500.00</p>
            <p className="text-center font-inter text-[11.5px] text-black/55" style={{ marginBottom: 12 }}>Elige el método de cobro con el que finalizarás esta venta.</p>
            {[
              { l: "Tarjeta", d: "M3 7h18v10H3zM3 10h18", hot: true },
              { l: "Efectivo", d: "M3 6h18v12H3zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", hot: false },
              { l: "Link de pago", d: "M9 15l6-6M8 13l-2 2a3 3 0 0 0 4 4l2-2M16 11l2-2a3 3 0 0 0-4-4l-2 2", hot: false },
            ].map((m) => (
              <div key={m.l} className="relative flex items-center gap-3 border-b border-black/[0.06] py-3">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={m.hot ? "#DB3B2B" : "#6B7280"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={m.d} /></svg>
                <span className={`flex-1 font-inter text-[13.5px] ${m.hot ? "font-semibold text-black" : "text-black/75"}`}>{m.l}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {m.hot && <Tap left="88%" top="50%" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Confirm screen (step 4) ── */}
      {screen === "confirm" && (
        <div key="confirm" className="flex flex-1 flex-col px-6" style={{ animation: "modalContentFade 0.3s ease-out" }}>
          <div className="flex items-center gap-3" style={{ height: 56 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8"><path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="flex-1 text-center font-sora text-[14px] font-medium text-black/70" style={{ paddingRight: 17 }}>Confirma el pago para completar la venta.</span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="font-sora text-[15px] font-medium text-black/70" style={{ marginBottom: 4 }}>Monto a cobrar</p>
            <p className="font-sora text-[46px] font-semibold text-black" style={{ letterSpacing: "-0.02em" }}>$500.00</p>
          </div>
          <div className="relative" style={{ paddingBottom: 20 + LIFT }}>
            <div className="flex items-center justify-center rounded-[12px] bg-[#DB3B2B]" style={{ height: 48 }}><span className="font-inter text-[14px] font-semibold text-white">Confirmar pago</span></div>
            <Tap left="50%" top="46%" />
          </div>
        </div>
      )}

      {/* ── Success screen (step 5) ── */}
      {screen === "success" && (
        <div key="success" className="flex flex-1 flex-col items-center px-6 pt-7 text-center" style={{ animation: "modalContentFade 0.3s ease-out", paddingBottom: 20 + LIFT }}>
          <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#22C55E]" style={{ marginBottom: 10 }}><svg width="26" height="26" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          <p className="font-sora text-[14px] font-medium text-black/70" style={{ marginBottom: 2 }}>Cobro exitoso</p>
          <p className="font-sora text-[34px] font-semibold text-black" style={{ letterSpacing: "-0.02em", marginBottom: 2 }}>$500.00</p>
          <p className="font-inter text-[12px] text-black/55" style={{ marginBottom: 14 }}>No. de pedido 123455678</p>
          <p className="font-inter text-[12px] text-black/70" style={{ marginBottom: 9 }}>Selecciona cómo entregar el ticket al cliente.</p>
          <div className="flex w-full flex-col gap-2">
            {[
              { l: "Email", icon: (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>) },
              { l: "SMS", icon: (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v11H8l-4 4z" /></svg>) },
              { l: "WhatsApp", icon: (<svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm5.3 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.7-1.2-4.5-4-4.6-4.2-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9.9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.7.7 1.9.1.1.1.3 0 .5-.1.2-.2.3-.3.5l-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.7.8.3.1.4.2.5.3.1.2.1.7-.1 1.3z" /></svg>) },
            ].map((o) => (
              <div key={o.l} className="flex items-center justify-center gap-2 rounded-[11px] border border-black/[0.12] py-2.5">
                {o.icon}
                <span className="font-inter text-[12.5px] font-medium text-black/75">{o.l}</span>
              </div>
            ))}
          </div>
          <div className="mt-auto flex w-full gap-2.5 pt-4">
            <div className="flex flex-1 items-center justify-center rounded-[12px] border border-black/[0.12] py-3"><span className="font-inter text-[13px] font-medium text-black/75">Ver detalles</span></div>
            <div className="flex flex-1 items-center justify-center rounded-[12px] bg-[#DB3B2B] py-3"><span className="font-inter text-[13px] font-semibold text-white">Finalizar</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Static POS product-list phone screen (hero) — "La Noria Giftshop". */
const HERO_PRODUCTS = [
  { name: "Peluche Costalito", price: "$250.00", sub: "1 disponible", img: "/img/moda-hoodie.png", state: "low" as const },
  { name: "Tenis blancos clásicos", price: "$1,345.99", sub: "23 unidades", img: "/img/tenis-transparente.png", state: "ok" as const },
  { name: "Sudadera hoodie premium", price: "$890.00", sub: "Agotado", img: "/img/moda-hoodie.png", state: "out" as const },
  { name: "Gorra clásica bordada", price: "$329.00", sub: "2 variantes", img: "/img/moda-gorra.png", state: "ok" as const },
  { name: "Playera polo mujer", price: "$399.00", sub: "84 disponibles", img: "/img/moda-playera.png", state: "ok" as const },
];

/* Types a string char-by-char while `active`; shows full text otherwise.
   Restarts whenever `resetKey` changes. */
function useTyper(active: boolean, text: string, resetKey: number) {
  const [val, setVal] = useState(text);
  useEffect(() => {
    if (!active) { setVal(text); return; }
    setVal("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVal(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 85);
    return () => clearInterval(id);
  }, [active, text, resetKey]);
  return val;
}

function PosHeroMobile({ cartCount = 0, showNew = false }: { cartCount?: number; showNew?: boolean }) {
  /* Nuevo inicio del POS: saludo + "Nueva venta", buscador y accesos directos. */
  return (
    <div className="relative flex h-full w-full flex-col bg-white font-inter" style={{ width: 300, height: 615 }}>
      <MStatus />
      <div className="flex items-center justify-between gap-2 px-4" style={{ height: 48 }}>
        <span className="flex min-w-0 items-center gap-2.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.7" strokeLinecap="round" className="shrink-0"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          <span className="max-w-[150px] truncate whitespace-nowrap font-sora text-[15px] font-semibold text-black/80">{showNew ? "Playera Marvelous" : "Hola, Brenda"}</span>
        </span>
        <span className="relative flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[10px] border border-black/[0.10] px-2.5 py-1.5 font-inter text-[11px] text-black/80">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.2 10.5h10.6L20 7H6" /><circle cx="9" cy="19" r="1.4" /><circle cx="17" cy="19" r="1.4" /></svg>
          Nueva venta
          {cartCount > 0 && (
            <span key={cartCount} className="absolute -right-1.5 -top-1.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#DB3B2B] px-[3px] font-inter text-[8px] font-bold text-white" style={{ animation: "fadeSlideIn 0.3s ease-out" }}>{cartCount}</span>
          )}
        </span>
      </div>
      <div className="px-4" style={{ marginBottom: 14 }}>
        <PosBuscador compact texto={showNew ? "Playera Marvelous" : ""} />
      </div>
      {showNew ? (
        /* Después de crear el producto: la búsqueda lo muestra en la lista, listo para cobrar */
        <div key="buscar" className="px-4" style={{ animation: "modalContentFade 0.3s ease-out" }}>
          <div className="flex gap-4 border-b border-black/[0.06]" style={{ marginBottom: 4 }}>
            {["Todos", "Productos", "Clientes", "Órdenes"].map((t, k) => (
              <span key={t} className={`relative pb-2 font-inter text-[11.5px] ${k === 0 ? "text-black" : "text-black/55"}`}>
                {t}
                {k === 0 && <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-[#DB3B2B]" />}
              </span>
            ))}
          </div>
          <PosResultado compact p={{ name: "Playera Marvelous", price: "$2,400.00", stock: "6 disponibles", img: "/img/moda-playera.png" }} />
        </div>
      ) : (
        <div className="px-4"><PosAtajos compact /></div>
      )}
    </div>
  );
}

/* Hero composition — phone (shifted right) with an animated "Crear producto"
   panel that types a product, adds it as a floating card, and on tap surfaces
   the cart badge + "Cobrar" pill. Loops.
   Steps: 0 type name · 1 type price · 2 card appears · 3 tap+cart+cobrar · 4 hold. */
export function PosHeroScreen() {
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    // 0 type name · 1 type price · 2 product card · 3 in-phone Cobrar + tap · 4 cart float · 5 payment float
    const durations = [2800, 2600, 2800, 3000, 3000, 4000];
    const t = setTimeout(() => {
      setStep((s) => {
        if (s >= 5) { setCycle((c) => c + 1); return 0; }
        return s + 1;
      });
    }, durations[step]);
    return () => clearTimeout(t);
  }, [step]);

  const typedName = useTyper(step === 0, "Playera Marvelous", cycle);
  const priceTyper = useTyper(step === 1, "$ 2,400.00", cycle);
  const shownPrice = step === 0 ? "" : priceTyper;
  const crearIn = step <= 1;                    // crear-producto panel
  const productIn = step === 2 || step === 3;   // product-created card
  const phoneCobrarIn = step === 3;             // in-phone Cobrar button + tap
  const cartIn = step === 4;                    // cart summary float
  const paymentIn = step === 5;                 // payment methods float

  const PAY = [
    { l: "Tarjeta", d: "M2 5h20v14H2zM2 10h20" },
    { l: "Efectivo", d: "M2 6h20v12H2zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" },
    { l: "Transferencia SPEI", d: "M4 10l8-5 8 5M6 10v7M18 10v7M4 19h16" },
  ];

  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: 480 }}>
      {/* Phone — left/centered, cropped at the bottom (bleeds off the frame). */}
      <div
        className="relative mx-auto w-full tablet:mx-0 tablet:w-[80%]"
        style={{ maxWidth: 336, zIndex: 1, aspectRatio: "300 / 445", overflow: "hidden", animation: "fadeSlideIn 0.6s ease-out both" }}
      >
        <GlassScreen radius={30}>
          <ScaledMock designW={300} designH={615}>
            <PosHeroMobile cartCount={step >= 3 ? 1 : 0} showNew={step >= 2} />
          </ScaledMock>
        </GlassScreen>

        {/* In-phone "Cobrar" button — sticky bar over the cropped bottom (step 3). */}
        <div
          className="absolute font-inter"
          style={{ left: 12, right: 12, bottom: 12, zIndex: 5, opacity: phoneCobrarIn ? 1 : 0, transform: phoneCobrarIn ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
        >
          <div className="relative flex items-center justify-center rounded-[12px] bg-[#DB3B2B]" style={{ height: 40, boxShadow: "0 8px 22px rgba(219,59,43,0.45)" }}>
            <span className="font-inter text-[13px] font-semibold text-white">Cobrar $2,400.00</span>
          </div>
        </div>
      </div>

      {/* Floating "Crear producto" panel — right, solid white, on top of the phone (steps 0–1). */}
      <div
        className="absolute hidden font-inter tablet:block"
        style={{ right: "-5%", top: "11%", width: "48%", zIndex: 4, borderRadius: 16, padding: 16, background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 24px 48px rgba(0,0,0,0.3)", opacity: crearIn ? 1 : 0, transform: crearIn ? "translateY(0)" : "translateY(-8px)", transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)", pointerEvents: crearIn ? "auto" : "none" }}
      >
        <p className="font-sora text-[13px] font-semibold text-black" style={{ marginBottom: 12 }}>Crear producto</p>
        <p className="font-inter text-[10px] text-black/50" style={{ marginBottom: 4 }}>Nombre del producto</p>
        <div className="flex items-center rounded-[7px] border border-black/10 bg-black/[0.03] px-2.5" style={{ marginBottom: 11, height: 30 }}>
          <span className="font-inter text-[11px] text-black/85">{typedName}</span>
          {step === 0 && <span className="ml-0.5 inline-block h-[12px] w-px bg-black/60" style={{ animation: "blink 1s step-end infinite" }} />}
        </div>
        <p className="font-inter text-[10px] text-black/50" style={{ marginBottom: 4 }}>Precio de venta</p>
        <div className="flex items-center rounded-[7px] border border-black/10 bg-black/[0.03] px-2.5" style={{ height: 30 }}>
          <span className="font-inter text-[11px] text-black/85">{shownPrice}</span>
          {step === 1 && <span className="ml-0.5 inline-block h-[12px] w-px bg-black/60" style={{ animation: "blink 1s step-end infinite" }} />}
        </div>
      </div>

      {/* Floating product-created card — left, over the phone (steps 2–3). */}
      <div
        className="absolute hidden items-center gap-2.5 font-inter tablet:flex"
        style={{ left: "-7%", top: "42%", width: "53%", zIndex: 3, borderRadius: 14, padding: "8px 10px", background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 16px 34px rgba(0,0,0,0.28)", opacity: productIn ? 1 : 0, transform: productIn ? "translateY(0)" : "translateY(14px)", transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)", pointerEvents: productIn ? "auto" : "none" }}
      >
        <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center overflow-hidden rounded-[9px] bg-[#FAFAF9]"><Image src="/img/moda-playera.png" alt="" width={30} height={24} className="object-contain" /></div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-inter text-[11.5px] font-semibold text-black">Playera Marvelous</p>
          <p className="font-inter text-[10px] text-black/50">$2,400.00 · 6 disponibles</p>
        </div>
        <div className="relative flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#DB3B2B]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.6"><path d="M12 5v14M5 12h14" /></svg>
          {step === 3 && <span className="absolute rounded-full" style={{ inset: -6, border: "2.5px solid rgba(219,59,43,0.85)", animation: "tapRipple 1.1s ease-out infinite" }} />}
        </div>
      </div>

      {/* Floating cart summary — right, appears after tap (step 4). */}
      <div
        className="absolute hidden font-inter tablet:block"
        style={{ right: "-5%", top: "16%", width: "52%", zIndex: 4, borderRadius: 16, padding: 14, background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 24px 48px rgba(0,0,0,0.3)", opacity: cartIn ? 1 : 0, transform: cartIn ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)", pointerEvents: cartIn ? "auto" : "none" }}
      >
        <p className="font-sora text-[12px] font-semibold text-black" style={{ marginBottom: 10 }}>Carrito · 1 producto</p>
        <div className="flex items-center gap-2.5" style={{ marginBottom: 12 }}>
          <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-[#FAFAF9]"><Image src="/img/moda-playera.png" alt="" width={26} height={20} className="object-contain" /></div>
          <div className="min-w-0 flex-1"><p className="truncate font-inter text-[11px] font-medium text-black">Playera Marvelous</p></div>
          <span className="font-inter text-[11px] font-semibold text-black">$2,400.00</span>
        </div>
        <div className="flex items-center justify-center rounded-[10px] bg-[#DB3B2B]" style={{ height: 36 }}><span className="font-inter text-[12px] font-semibold text-white">Cobrar $2,400.00</span></div>
      </div>

      {/* Floating payment methods — right, appears last (step 5). */}
      <div
        className="absolute hidden font-inter tablet:block"
        style={{ right: "-5%", top: "16%", width: "52%", zIndex: 4, borderRadius: 16, padding: 14, background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 24px 48px rgba(0,0,0,0.3)", opacity: paymentIn ? 1 : 0, transform: paymentIn ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)", pointerEvents: paymentIn ? "auto" : "none" }}
      >
        <p className="font-sora text-[12px] font-semibold text-black" style={{ marginBottom: 10 }}>Forma de pago</p>
        {PAY.map((m, i) => (
          <div key={m.l} className="flex items-center gap-2.5 rounded-[10px] border px-2.5" style={{ height: 34, marginBottom: i < PAY.length - 1 ? 7 : 0, borderColor: i === 0 ? "#DB3B2B" : "rgba(0,0,0,0.10)", background: i === 0 ? "rgba(219,59,43,0.05)" : "#fff" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? "#DB3B2B" : "#6B7280"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={m.d} /></svg>
            <span className="flex-1 font-inter text-[11px] font-medium text-black">{m.l}</span>
            <span className="flex h-[15px] w-[15px] items-center justify-center rounded-full border" style={{ borderColor: i === 0 ? "#DB3B2B" : "rgba(0,0,0,0.2)" }}>{i === 0 && <span className="h-[7px] w-[7px] rounded-full bg-[#DB3B2B]" />}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PosDesktopScreen() {
  return (
    <GlassScreen radius={13}>
      <ScaledMock designW={940} designH={620}>
        <PosDesktop />
      </ScaledMock>
    </GlassScreen>
  );
}

export function PosCheckoutMobileScreen({ liftButtons = false }: { liftButtons?: boolean }) {
  return (
    <GlassScreen radius={16}>
      <ScaledMock designW={300} designH={620}>
        <PosCheckoutMobile liftButtons={liftButtons} />
      </ScaledMock>
    </GlassScreen>
  );
}

export function PosMobileScreen() {
  return (
    <GlassScreen radius={16}>
      <ScaledMock designW={300} designH={615}>
        <PosMobile />
      </ScaledMock>
    </GlassScreen>
  );
}

export function PosCheckoutScreen() {
  return (
    <GlassScreen radius={13}>
      <ScaledMock designW={940} designH={620}>
        <PosCheckoutDesktop />
      </ScaledMock>
    </GlassScreen>
  );
}

/* ── Controla tu negocio flow — sucursal → PIN → cargando → caja → apertura → corte ── */
const SUCURSALES = [
  { n: "La Noria Giftshop", a: "Av. Cam. a San Pablo #100, Xochimilco, CDMX" },
  { n: "Estadio Azul", a: "Antiguo Camino a Xochimilco 78, La Noria, CDMX" },
  { n: "Prensa Azul", a: "Antiguo Camino a Xochimilco 100, Huichapan, CDMX" },
];
const CAJAS = ["Alimentos", "Librería", "Dulcería"];
const CORTE_MOVS = [
  { l: "Pagos en efectivo", a: "$2,434.00" },
  { l: "Pagos con tarjeta", a: "$2,434.00" },
  { l: "Retiros manuales", a: "$540.00" },
  { l: "Devoluciones", a: "$134.00" },
];

function NegocioFlowMobile() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const dur = [2400, 2600, 2000, 2400, 2400, 3400];
    const t = setTimeout(() => setStep((s) => (s + 1) % 6), dur[step]);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="relative flex h-full w-full flex-col bg-white font-inter" style={{ width: 300, height: 620 }}>
      <MStatus />

      {/* s0 — Selecciona la sucursal */}
      {step === 0 && (
        <div key="suc" className="flex flex-1 flex-col px-5 pt-3" style={{ animation: "modalContentFade 0.3s ease-out" }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
            <span className="font-sora text-[17px] font-semibold text-black">Selecciona la sucursal</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </div>
          {SUCURSALES.map((s, i) => (
            <div key={s.n} className="relative flex items-start gap-3 border-b border-black/[0.06] py-4">
              <div className="min-w-0 flex-1">
                <p className="font-sora text-[14px] font-semibold text-black">{s.n}</p>
                <p className="mt-0.5 font-inter text-[11px] text-black/50" style={{ lineHeight: 1.4 }}>{s.a}</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="mt-1 shrink-0"><path d="M9 6l6 6-6 6" /></svg>
              {i === 0 && <Tap left="26%" top="46%" />}
            </div>
          ))}
        </div>
      )}

      {/* s1 — Ingresa tu PIN */}
      {step === 1 && (
        <div key="pin" className="flex flex-1 flex-col items-center px-6 pt-8" style={{ animation: "modalContentFade 0.3s ease-out" }}>
          <p className="font-sora text-[15px] font-medium text-black/70" style={{ marginBottom: 18 }}>Ingresa tu PIN de usuario</p>
          <div className="flex gap-3.5" style={{ marginBottom: 26 }}>
            {[0, 1, 2, 3].map((d) => (
              <span key={d} className="h-[13px] w-[13px] rounded-full bg-[#DB3B2B]" style={{ opacity: 0, animation: `fadeSlideIn 0.25s ease-out ${0.35 + d * 0.35}s both` }} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2.5" style={{ width: 214 }}>
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((n) => (
              <div key={n} className="flex items-center justify-center rounded-[10px] border border-black/[0.10] font-sora text-[18px] font-medium text-black/80" style={{ height: 42 }}>{n}</div>
            ))}
            <div className="flex items-center justify-center rounded-[10px] border border-black/[0.10]" style={{ height: 42 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6H9l-5 6 5 6h11a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM14 10l4 4M18 10l-4 4" /></svg></div>
            <div className="flex items-center justify-center rounded-[10px] border border-black/[0.10] font-sora text-[18px] font-medium text-black/80" style={{ height: 42 }}>0</div>
            <div className="relative flex items-center justify-center rounded-[10px] bg-[#DB3B2B]" style={{ height: 42 }}><svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg><Tap left="50%" top="50%" /></div>
          </div>
        </div>
      )}

      {/* s2 — Cargando */}
      {step === 2 && (
        <div key="load" className="flex flex-1 flex-col items-center justify-center px-8 text-center" style={{ animation: "modalContentFade 0.3s ease-out" }}>
          <span className="rounded-full border-[3px] border-black/[0.08]" style={{ width: 48, height: 48, borderTopColor: "#DB3B2B", animation: "spin 0.8s linear infinite", marginBottom: 24 }} />
          <p className="font-sora text-[17px] font-semibold text-black" style={{ marginBottom: 6 }}>Todo listo, Arturo</p>
          <p className="font-inter text-[13px] text-black/50">Tu punto de venta se está preparando.</p>
        </div>
      )}

      {/* s3 — Home (POS) — desde el nav se entra a "caja" */}
      {step === 3 && (
        <div key="home" className="flex flex-1 flex-col overflow-hidden" style={{ animation: "modalContentFade 0.3s ease-out" }}>
          <div className="flex items-center justify-between px-5" style={{ height: 42 }}>
            <span className="w-[16px]" />
            <span className="font-sora text-[14px] font-semibold text-black">La Noria Giftshop</span>
            <div className="relative"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.7"><path d="M6 6h15l-1.5 9h-12zM6 6L5 3H2M9 20a1 1 0 1 0 0 .01M18 20a1 1 0 1 0 0 .01" /></svg><span className="absolute -right-1 -top-1 h-[6px] w-[6px] rounded-full bg-[#DB3B2B]" /></div>
          </div>
          <div className="flex-1 overflow-hidden px-4">
            {HERO_PRODUCTS.map((p) => (
              <div key={p.name} className="relative flex items-center gap-3 py-2.5" style={{ opacity: p.state === "out" ? 0.45 : 1 }}>
                <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-black/[0.05] bg-[#FAFAF9]"><Image src={p.img} alt="" width={28} height={20} className="object-contain" /></div>
                <div className="min-w-0 flex-1"><p className="truncate font-inter text-[12px] font-medium text-black">{p.name}</p><p className="font-inter text-[12px] font-semibold text-black">{p.price}</p></div>
              </div>
            ))}
          </div>
          <div className="px-4" style={{ marginBottom: 6 }}><div className="flex items-center justify-center rounded-[12px] bg-[#DB3B2B]" style={{ height: 42 }}><span className="font-inter text-[13px] font-semibold text-white">Cobrar $375.00</span></div></div>
          {/* bottom nav — tap on "caja" (register) */}
          <div className="flex items-center justify-around border-t border-black/[0.06] px-2" style={{ height: 50 }}>
            {["M6 2h9l3 3v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z", "M8 4h8v4H8zM6 8h12v12H6z", "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 21a7 7 0 0 1 14 0", "M3 7h18v12H3zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", "M4 7h16M4 12h16M4 17h16"].map((d, i) => (
              <div key={i} className={`relative flex h-[32px] w-[32px] items-center justify-center rounded-full ${i === 0 ? "bg-[rgba(219,59,43,0.10)]" : ""}`}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? "#DB3B2B" : "#9CA3AF"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
                {i === 3 && <Tap left="50%" top="50%" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* s4 — Apertura de caja */}
      {step === 4 && (
        <div key="apert" className="flex flex-1 flex-col px-5 pt-3" style={{ animation: "modalContentFade 0.3s ease-out" }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
            <span className="font-sora text-[17px] font-semibold text-black">Apertura de caja</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </div>
          <p className="font-inter text-[12.5px] text-black/50" style={{ marginBottom: 14 }}>Selecciona la caja a aperturar</p>
          {CAJAS.map((c, i) => (
            <div key={c} className="relative flex items-center justify-between border-b border-black/[0.06] py-4">
              <span className="font-sora text-[14px] font-semibold text-black">{c}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
              {i === 0 && <Tap left="18%" top="50%" />}
            </div>
          ))}
          <div className="mt-auto pb-5"><div className="flex items-center justify-center rounded-[12px] border border-black/[0.12] py-3"><span className="font-inter text-[13px] font-medium text-black/70">Historial de cajas</span></div></div>
        </div>
      )}

      {/* s5 — Corte de caja (resumen) */}
      {step === 5 && (
        <div key="corte" className="flex flex-1 flex-col px-5 pt-3" style={{ animation: "modalContentFade 0.3s ease-out" }}>
          <p className="font-sora text-[15px] font-semibold text-black" style={{ marginBottom: 12 }}>Corte de caja · Alimentos</p>
          <div className="rounded-[14px] border border-black/[0.06] bg-[#FCFCFC] p-4" style={{ marginBottom: 12 }}>
            <p className="text-center font-inter text-[11px] text-black/45" style={{ marginBottom: 2 }}>Saldo en caja</p>
            <p className="text-center font-sora text-[30px] font-semibold text-black" style={{ letterSpacing: "-0.02em", lineHeight: 1 }}>$5,234.00</p>
          </div>
          <div className="rounded-[12px] border border-black/[0.06] px-3.5">
            {CORTE_MOVS.map((m, i) => (
              <div key={m.l} className={`flex items-center justify-between py-2.5 ${i < CORTE_MOVS.length - 1 ? "border-b border-black/[0.04]" : ""}`}><span className="font-inter text-[12px] text-black/65">{m.l}</span><span className="font-inter text-[12px] font-semibold text-black">{m.a}</span></div>
            ))}
          </div>
          <div className="mt-auto pb-5"><div className="flex items-center justify-center rounded-[12px] bg-[#DB3B2B] py-3"><span className="font-inter text-[13px] font-semibold text-white">Cerrar caja</span></div></div>
        </div>
      )}
    </div>
  );
}

export function NegocioFlowScreen() {
  return (
    <GlassScreen radius={16}>
      <ScaledMock designW={300} designH={620}>
        <NegocioFlowMobile />
      </ScaledMock>
    </GlassScreen>
  );
}
