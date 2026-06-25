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
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 0 0 1px rgba(255,255,255,0.10), 0 0 0 1px rgba(255,255,255,0.10), 0 30px 60px rgba(0,0,0,0.5)",
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
            <span className="font-inter text-[14px] text-black/40">Búsqueda</span>
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

/* Animated checkout flow: empty cart → add products → cobrar → tarjeta → paid. */
const CHECKOUT_ITEMS = [
  { name: "Playera básica algodón", variant: "Talla: CH", price: "$250.00", img: "/img/playera.png" },
  { name: "Gorra clásica bordada", variant: "Color: Negro", price: "$250.00", img: "/img/moda-gorra.png" },
];

function PosCheckoutDesktop() {
  // 0 empty · 1 +item1 · 2 +item2 (Cobrar) · 3 método · 4 confirmar · 5 cobro exitoso
  const [step, setStep] = useState(0);
  useEffect(() => {
    const durations = [1500, 900, 1400, 2200, 1700, 2700];
    const t = setTimeout(() => setStep((step + 1) % 6), durations[step]);
    return () => clearTimeout(t);
  }, [step]);

  const visible = step === 0 ? 0 : step === 1 ? 1 : 2;
  const modal = step >= 3;

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

        {/* main */}
        <div className="flex flex-1 flex-col overflow-hidden px-6 py-5" style={{ filter: modal ? "blur(1.5px)" : "none", opacity: modal ? 0.6 : 1, transition: "opacity 0.3s ease" }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
            <p className="font-sora text-[22px] font-semibold text-black">La Noria Giftshop</p>
            <div className="flex items-center gap-2 rounded-[12px] bg-[#DB3B2B] px-4 py-2.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"><path d="M12 5v14M5 12h14" /></svg>
              <span className="font-inter text-[13px] font-semibold text-white">Crear producto</span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-[12px] border border-black/[0.10] px-4" style={{ height: 44, marginBottom: 14 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
            <span className="font-inter text-[14px] text-black/40">Búsqueda</span>
          </div>
          {DESK_PRODUCTS.map((p) => (
            <div key={p.name} className="relative flex items-center gap-3 border-b border-black/[0.04]" style={{ height: 56, opacity: p.state === "out" ? 0.45 : 1 }}>
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-black/[0.05] bg-[#FAFAF9]">
                <Image src={p.img} alt="" width={32} height={24} className="object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-inter text-[13px] font-medium text-black">{p.name}</p>
                <p className="font-inter text-[11px] text-black/45">{p.sub}</p>
              </div>
              <span className="font-inter text-[13px] font-semibold text-black">{p.price}</span>
              <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-black/[0.10]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#9CA3AF"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
              </div>
              {/* tap lands on the product being added to the cart */}
              {p.name === "Playera básica algodón" && step === 0 && <Tap left="32%" top="50%" />}
              {p.name === "Gorra clásica bordada" && step === 1 && <Tap left="32%" top="50%" />}
            </div>
          ))}
        </div>

        {/* cart */}
        <div className="flex flex-col border-l border-black/[0.06] px-4 py-4" style={{ width: 248 }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
            <p className="font-sora text-[17px] font-semibold text-black">Carrito</p>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.7"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13h10l1-13" /></svg>
          </div>
          {visible === 0 ? (
            <div className="flex flex-1 items-center justify-center px-4 text-center">
              <p className="font-inter text-[14px] font-medium text-black/35">No hay productos<br />en el carrito</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 rounded-[10px] border border-black/[0.08] px-2.5 py-2" style={{ marginBottom: 14 }}>
                <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#DB3B2B] font-inter text-[9px] font-bold text-white">AE</span>
                <span className="flex-1 font-inter text-[12px] font-medium text-black">Arturo Elías</span>
              </div>
              {CHECKOUT_ITEMS.slice(0, visible).map((it, i) => (
                <div key={it.name} className="flex items-start gap-2.5" style={{ marginBottom: 14, animation: i === visible - 1 ? "fadeSlideIn 0.4s ease-out" : undefined }}>
                  <div className="relative h-[34px] w-[34px] shrink-0">
                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[7px] border border-black/[0.05] bg-[#FAFAF9]"><Image src={it.img} alt="" width={26} height={20} className="object-contain" /></div>
                    <span className="absolute -left-1 -top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#DB3B2B] font-inter text-[8px] font-bold text-white">1</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-inter text-[11.5px] font-medium leading-tight text-black">{it.name}</p>
                    <p className="mt-0.5 font-inter text-[9.5px] text-black/45">{it.variant}</p>
                  </div>
                  <span className="font-inter text-[11.5px] font-semibold text-black">{it.price}</span>
                </div>
              ))}
            </>
          )}
          <div className="mt-auto">
            <div className="flex gap-2" style={{ marginBottom: 10 }}>
              {[{ l: "Importe", d: "M12 6v12M9 9h4.5a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3H15" }, { l: "Descuento", d: "M9 15l6-6M9.5 9.5h.01M14.5 14.5h.01M5 5h14v14H5z" }].map((b) => (
                <div key={b.l} className="flex flex-1 flex-col items-center gap-1 rounded-[12px] border border-black/[0.10] py-2.5" style={{ opacity: visible === 0 ? 0.5 : 1 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d={b.d} /></svg>
                  <span className="font-inter text-[11px] text-black/70">{b.l}</span>
                </div>
              ))}
            </div>
            {visible >= 2 && (
              <div className="relative flex items-center justify-center rounded-[12px] bg-[#DB3B2B]" style={{ height: 44, animation: "fadeSlideIn 0.4s ease-out" }}>
                <span className="font-inter text-[14px] font-semibold text-white">Cobrar $500.00</span>
                {step === 2 && <Tap left="64%" top="56%" />}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Checkout modal ── */}
      {modal && (
        <div className="absolute inset-0 z-10 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.28)" }}>
          <div className="relative rounded-[20px] bg-white" style={{ width: 380, padding: "26px 26px 24px", boxShadow: "0 24px 60px rgba(0,0,0,0.25)", animation: "fadeSlideIn 0.35s ease-out" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" className="absolute right-5 top-5"><path d="M6 6l12 12M18 6L6 18" /></svg>

            <div key={step} style={{ animation: "modalContentFade 0.32s ease-out" }}>
            {step === 3 && (
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

            {step === 4 && (
              <>
                <p className="text-center font-sora text-[15px] font-medium text-black/70" style={{ marginBottom: 2 }}>Monto a cobrar</p>
                <p className="text-center font-sora text-[44px] font-semibold text-black" style={{ letterSpacing: "-0.02em", marginBottom: 14 }}>$500.00</p>
                <p className="text-center font-inter text-[13px] text-black/60" style={{ marginBottom: 16 }}>Realiza el cobro con tu terminal bancaria</p>
                <div className="relative flex items-center justify-center rounded-[12px] bg-[#DB3B2B]" style={{ height: 46 }}>
                  <span className="font-inter text-[14px] font-semibold text-white">Confirmar pago</span>
                  <Tap left="62%" top="56%" />
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <div className="mx-auto flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#22C55E]" style={{ marginBottom: 12 }}>
                  <svg width="26" height="26" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <p className="text-center font-sora text-[15px] font-medium text-black/70" style={{ marginBottom: 2 }}>Cobro exitoso</p>
                <p className="text-center font-sora text-[38px] font-semibold text-black" style={{ letterSpacing: "-0.02em", marginBottom: 4 }}>$500.00</p>
                <p className="text-center font-inter text-[12.5px] text-black/55" style={{ marginBottom: 16 }}>No. de pedido 123455678</p>
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
function PosCheckoutMobile() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const durations = [1300, 1500, 1700, 2100, 1800, 2500];
    const t = setTimeout(() => setStep((step + 1) % 6), durations[step]);
    return () => clearTimeout(t);
  }, [step]);

  const screen = step <= 1 ? "list" : step <= 3 ? "cart" : step === 4 ? "confirm" : "success";
  const NAV = [
    "M6 2h9l3 3v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z",
    "M8 4h8v4H8zM6 8h12v12H6z",
    "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 21a7 7 0 0 1 14 0",
    "M3 7h18v12H3zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
    "M4 7h16M4 12h16M4 17h16",
  ];

  return (
    <div className="relative flex h-full w-full flex-col bg-white font-inter" style={{ width: 300, height: 620 }}>
      <MStatus />

      {/* ── List screen (steps 0–1) ── */}
      {screen === "list" && (
        <div key="list" className="flex flex-1 flex-col overflow-hidden" style={{ animation: "modalContentFade 0.3s ease-out" }}>
          <div className="flex items-center justify-between px-5" style={{ height: 44 }}>
            <span className="w-[18px]" />
            <span className="font-sora text-[15px] font-semibold text-black">La Noria Giftshop</span>
            <div className="relative">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.7"><path d="M6 6h15l-1.5 9h-12zM6 6L5 3H2M9 20a1 1 0 1 0 0 .01M18 20a1 1 0 1 0 0 .01" /></svg>
              <span className="absolute -right-1 -top-1 h-[7px] w-[7px] rounded-full bg-[#DB3B2B]" />
            </div>
          </div>
          {/* search row */}
          <div className="flex items-center gap-2 px-4" style={{ marginBottom: 12 }}>
            <div className="flex flex-1 items-center gap-2 rounded-[11px] bg-black/[0.04] px-3" style={{ height: 38 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
              <span className="font-inter text-[12px] text-black/40">Búsqueda</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.6" className="ml-auto"><path d="M4 6v12M7 6v12M10 6v12M13 6v12M16 6v12M19 6v12" /></svg>
            </div>
            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[11px] bg-[#DB3B2B]"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"><path d="M12 5v14M5 12h14" /></svg></div>
          </div>
          {/* tabs */}
          <div className="flex items-center gap-4 border-b border-black/[0.06] px-4" style={{ marginBottom: 4 }}>
            <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[8px] border border-black/[0.10]"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.7"><path d="M8 3v18M8 3L4 7M16 21V3M16 21l4-4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            {["Destacados", "Playeras", "Tenis", "Chamarras"].map((t, i) => (
              <div key={t} className="relative pb-2.5"><span className={`font-inter text-[12px] ${i === 0 ? "font-semibold text-black" : "text-black/50"}`}>{t}</span>{i === 0 && <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#DB3B2B]" />}</div>
            ))}
          </div>
          {/* products */}
          <div className="flex-1 overflow-hidden px-4">
            {DESK_PRODUCTS.map((p) => (
              <div key={p.name} className="relative flex items-center gap-3 py-2.5" style={{ opacity: p.state === "out" ? 0.45 : 1 }}>
                <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-black/[0.05] bg-[#FAFAF9]"><Image src={p.img} alt="" width={30} height={22} className="object-contain" /></div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-inter text-[12px] font-medium text-black">{p.name}</p>
                  <p className="font-inter text-[12px] font-semibold text-black">{p.price}{p.state === "ok" && <span className="font-normal text-black/45"> · {p.sub}</span>}{p.state === "low" && <span className="ml-1.5 rounded-[4px] bg-[rgba(245,158,11,0.12)] px-1 py-0.5 text-[9px] font-semibold text-[#B45309]">{p.sub}</span>}{p.state === "out" && <span className="ml-1.5 rounded-[4px] bg-[rgba(219,59,43,0.10)] px-1 py-0.5 text-[9px] font-semibold text-[#DB3B2B]">{p.sub}</span>}</p>
                </div>
                {p.name === "Playera básica algodón" && step === 0 && <Tap left="28%" top="50%" />}
              </div>
            ))}
          </div>
          {/* cobrar (appears once a product is added) + bottom nav */}
          {step === 1 && (
            <div className="relative px-4" style={{ marginBottom: 6 }}>
              <div className="flex items-center justify-center rounded-[12px] bg-[#DB3B2B]" style={{ height: 44, animation: "fadeSlideIn 0.4s ease-out" }}><span className="font-inter text-[14px] font-semibold text-white">Cobrar $500.00</span></div>
              <Tap left="50%" top="50%" />
            </div>
          )}
          <div className="flex items-center justify-around border-t border-black/[0.06] px-2" style={{ height: 52 }}>
            {NAV.map((d, i) => (
              <div key={i} className={`flex h-[34px] w-[34px] items-center justify-center rounded-full ${i === 0 ? "bg-[rgba(219,59,43,0.10)]" : ""}`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? "#DB3B2B" : "#9CA3AF"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg></div>
            ))}
          </div>
        </div>
      )}

      {/* ── Cart screen (steps 2–3) ── */}
      {screen === "cart" && (
        <div key="cart" className="flex flex-1 flex-col overflow-hidden" style={{ animation: step === 2 ? "modalContentFade 0.3s ease-out" : undefined, filter: step === 3 ? "blur(1px)" : "none" }}>
          <div className="flex items-center justify-between px-5" style={{ height: 46 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8"><path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="font-sora text-[15px] font-semibold text-black">Carrito</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.7"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13h10l1-13" /></svg>
          </div>
          <div className="px-4" style={{ marginBottom: 16 }}>
            <div className="flex items-center gap-2 rounded-[11px] border border-black/[0.10] px-3" style={{ height: 40 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.6"><circle cx="10" cy="8" r="3.2" /><path d="M4 19a6 6 0 0 1 12 0M18 8v5M15.5 10.5h5" /></svg>
              <span className="font-inter text-[12.5px] text-black/55">Asignar cliente</span>
            </div>
          </div>
          <div className="flex-1 px-4">
            {[
              { name: "Playera básica algodón", chips: ["Chica", "Azul"], price: "$250.00", img: "/img/playera.png", qty: 2 },
              { name: "Gorra clásica bordada", chips: ["Negro"], price: "$250.00", img: "/img/moda-gorra.png", qty: 1 },
            ].map((it) => (
              <div key={it.name} className="flex items-start gap-3" style={{ marginBottom: 16 }}>
                <div className="relative h-[38px] w-[38px] shrink-0">
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[9px] border border-black/[0.05] bg-[#FAFAF9]"><Image src={it.img} alt="" width={28} height={22} className="object-contain" /></div>
                  <span className="absolute -left-1.5 -top-1.5 flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#DB3B2B] font-inter text-[8px] font-bold text-white">{it.qty}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-inter text-[12.5px] font-medium text-black">{it.name}</p>
                  <div className="mt-1 flex gap-1.5">{it.chips.map((c) => <span key={c} className="rounded-[6px] bg-black/[0.05] px-1.5 py-0.5 font-inter text-[9.5px] text-black/55">{c}</span>)}</div>
                </div>
                <span className="font-inter text-[12.5px] font-semibold text-black">{it.price}</span>
              </div>
            ))}
          </div>
          <div className="px-4 pb-4">
            <div className="flex gap-2.5" style={{ marginBottom: 10 }}>
              {[{ l: "Importe", d: "M12 6v12M9 9h4.5a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3H15" }, { l: "Descuento", d: "M9 15l6-6M9.5 9.5h.01M14.5 14.5h.01M5 5h14v14H5z" }].map((b) => (
                <div key={b.l} className="flex flex-1 flex-col items-center gap-1 rounded-[12px] border border-black/[0.10] py-2.5"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d={b.d} /></svg><span className="font-inter text-[11px] text-black/70">{b.l}</span></div>
              ))}
            </div>
            <div className="relative flex items-center justify-center rounded-[12px] bg-[#DB3B2B]" style={{ height: 46 }}>
              <span className="font-inter text-[14px] font-semibold text-white">Cobrar $500.00</span>
              {step === 2 && <Tap left="50%" top="50%" />}
            </div>
          </div>
        </div>
      )}

      {/* ── Method bottom sheet (step 3, over cart) ── */}
      {step === 3 && (
        <div className="absolute inset-0 z-10 flex flex-col justify-end" style={{ background: "rgba(0,0,0,0.28)" }}>
          <div className="rounded-t-[22px] bg-white px-5 pb-6 pt-5" style={{ animation: "sheetUp 0.35s ease-out" }}>
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
            <span className="flex-1 text-center font-sora text-[14px] font-medium text-black/70" style={{ paddingRight: 17 }}>Realiza el cobro con tu terminal bancaria.</span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="font-sora text-[15px] font-medium text-black/70" style={{ marginBottom: 4 }}>Monto a cobrar</p>
            <p className="font-sora text-[46px] font-semibold text-black" style={{ letterSpacing: "-0.02em" }}>$500.00</p>
          </div>
          <div className="relative pb-5">
            <div className="flex items-center justify-center rounded-[12px] bg-[#DB3B2B]" style={{ height: 48 }}><span className="font-inter text-[14px] font-semibold text-white">Confirmar pago</span></div>
            <Tap left="50%" top="46%" />
          </div>
        </div>
      )}

      {/* ── Success screen (step 5) ── */}
      {screen === "success" && (
        <div key="success" className="flex flex-1 flex-col items-center justify-center px-6 text-center" style={{ animation: "modalContentFade 0.3s ease-out" }}>
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#22C55E]" style={{ marginBottom: 14 }}><svg width="28" height="28" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          <p className="font-sora text-[15px] font-medium text-black/70" style={{ marginBottom: 2 }}>Cobro exitoso</p>
          <p className="font-sora text-[40px] font-semibold text-black" style={{ letterSpacing: "-0.02em", marginBottom: 4 }}>$500.00</p>
          <p className="font-inter text-[12px] text-black/55" style={{ marginBottom: 22 }}>No. de pedido 123455678</p>
          <div className="flex w-full gap-2.5">
            <div className="flex flex-1 items-center justify-center rounded-[12px] border border-black/[0.12] py-3"><span className="font-inter text-[13px] font-medium text-black/75">Ver detalles</span></div>
            <div className="flex flex-1 items-center justify-center rounded-[12px] bg-[#DB3B2B] py-3"><span className="font-inter text-[13px] font-semibold text-white">Finalizar</span></div>
          </div>
        </div>
      )}
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

export function PosCheckoutMobileScreen() {
  return (
    <GlassScreen radius={16}>
      <ScaledMock designW={300} designH={620}>
        <PosCheckoutMobile />
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
