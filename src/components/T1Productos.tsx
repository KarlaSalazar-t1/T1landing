"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { useFSStackCards } from "@/hooks/useFSStackCards";
import T1FinalCTA from "@/components/T1FinalCTA";
import GlassProductCard from "@/components/GlassProductCard";

const HERO_CARD_A_CHANNELS = [
  { src: "/img/meli-iso.svg", alt: "Mercado Libre" },
  { src: "/img/amazon-iso.svg", alt: "Amazon" },
  { src: "/img/shein-iso.svg", alt: "SHEIN" },
  { src: "/img/walmart.svg", alt: "Walmart" },
];

const HERO_CARD_B_CHANNELS = [
  { src: "/img/shopify.svg", alt: "Shopify" },
  { src: "/img/tiktokshop.svg", alt: "TikTok Shop" },
  { src: "/img/tiendanube.svg", alt: "Tienda Nube" },
];

function CountStat({ end, prefix = "", suffix = "", label, decimals = 0 }: { end: number; prefix?: string; suffix?: string; label: string; decimals?: number }) {
  const { ref, display } = useCountUp({ end, prefix, suffix, decimals, duration: 1800 });
  return (
    <div ref={ref}>
      <p className="font-sora text-[36px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1 }}>
        {display}
      </p>
      <p className="font-inter text-[12px] font-light text-white/55 tablet:text-[13px]">{label}</p>
    </div>
  );
}

/* Shared product pool for the simulated panels (varied photos, not just the tenis). */
const PANEL_PRODUCTS = [
  { name: "Tenis blancos clásicos", units: 24, price: "$1,345.99", img: "/img/tenis-transparente.png" },
  { name: "Playera básica algodón", units: 87, price: "$249.00", img: "/img/playera.png" },
  { name: "Gorra clásica bordada", units: 53, price: "$329.00", img: "/img/gorra.png" },
  { name: "Sudadera hoodie premium", units: 12, price: "$890.00", img: "/img/moda-hoodie.png" },
  { name: "Playera polo mujer", units: 41, price: "$399.00", img: "/img/moda-playera.png" },
  { name: "Mochila urbana 25L", units: 38, price: "$1,120.00", img: "/img/moda-gorra.png" },
];

const PANEL_GRID = "minmax(0,1.7fr) minmax(0,0.75fr) minmax(0,0.85fr) minmax(0,0.5fr) minmax(0,0.6fr)";

/* Block 1 panel — Productos list with rows sliding in (mirrors the real T1 table). */
function ProductsPanel() {
  const [rows, setRows] = useState(() => PANEL_PRODUCTS.slice(0, 4).map((p, i) => ({ ...p, _k: i })));
  const next = useRef(4);
  useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) => {
        const item = PANEL_PRODUCTS[next.current % PANEL_PRODUCTS.length];
        const k = next.current;
        next.current += 1;
        return [{ ...item, _k: k }, ...prev.slice(0, 3)];
      });
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 18, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <div className="flex flex-wrap gap-1.5" style={{ marginBottom: 14 }}>
        {["Estatus", "Canal de venta", "Inventario", "Categoría"].map((f) => (
          <span key={f} className="inline-flex items-center gap-1 rounded-full border border-black/[0.10] px-2 py-1 font-inter text-[9px] text-black/55">
            {f}
            <svg width="7" height="7" viewBox="0 0 16 16" fill="none"><path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        ))}
      </div>
      <div className="grid items-center gap-1.5 border-b border-black/[0.06] pb-2" style={{ gridTemplateColumns: PANEL_GRID, marginBottom: 6 }}>
        <span className="font-inter text-[8px] font-semibold uppercase tracking-wide text-black/40">Producto</span>
        <span className="font-inter text-[8px] font-semibold uppercase tracking-wide text-black/40">Estatus</span>
        <span className="font-inter text-[8px] font-semibold uppercase tracking-wide text-black/40">Inventario</span>
        <span className="font-inter text-[8px] font-semibold uppercase tracking-wide text-black/40 text-center">Canales</span>
        <span className="font-inter text-[8px] font-semibold uppercase tracking-wide text-black/40 text-right">Precio</span>
      </div>
      {rows.map((row, i) => (
        <div
          key={row._k}
          className={`grid items-center gap-1.5 py-2 ${i < 3 ? "border-b border-black/[0.04]" : ""}`}
          style={{ gridTemplateColumns: PANEL_GRID, animation: i === 0 ? "fadeSlideIn 0.45s ease-out" : undefined }}
        >
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border border-black/[0.05] bg-[#FAFAF9]">
              <Image src={row.img} alt="" width={24} height={18} className="object-contain" />
            </div>
            <p className="min-w-0 truncate font-inter text-[10px] font-semibold text-black">{row.name}</p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full bg-[rgba(34,197,94,0.10)] px-1.5 py-0.5 font-inter text-[8.5px] font-semibold text-[#16A34A]">Activo</span>
          <span className="font-inter text-[10px] text-black/70">{row.units} uds</span>
          <span className="text-center font-inter text-[10px] text-black/55">1/3</span>
          <span className="text-right font-inter text-[10px] font-semibold text-black">{row.price}</span>
        </div>
      ))}
    </div>
  );
}

/* Block 3 panel — inventory editor: "Disponible" ticks up/down and turns red below 5. */
const INVENTORY_GRID = "minmax(0,1.5fr) minmax(0,0.8fr) minmax(0,0.7fr) minmax(0,0.6fr)";

function InventoryPanel() {
  const [rows, setRows] = useState([
    { name: "Tenis blancos clásicos", img: "/img/tenis-transparente.png", avail: 10, nv: 1 },
    { name: "Playera básica algodón", img: "/img/playera.png", avail: 8, nv: 1 },
    { name: "Sudadera hoodie premium", img: "/img/moda-hoodie.png", avail: 6, nv: 1 },
    { name: "Gorra clásica bordada", img: "/img/gorra.png", avail: 4, nv: 1 },
  ]);
  const [bump, setBump] = useState(-1);
  useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) => {
        const i = Math.floor(Math.random() * prev.length);
        const dir = Math.random() > 0.5 ? 1 : -1;
        setBump(i);
        return prev.map((r, j) => {
          if (j !== i) return r;
          const avail = Math.max(0, Math.min(20, r.avail + dir));
          return { ...r, avail };
        });
      });
      setTimeout(() => setBump(-1), 500);
    }, 1900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 18, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <p className="font-sora text-[14px] font-medium text-black" style={{ marginBottom: 14 }}>Editar inventario</p>
      <div className="grid items-end gap-1.5 border-b border-black/[0.06] pb-2" style={{ gridTemplateColumns: INVENTORY_GRID, marginBottom: 6 }}>
        <span className="font-inter text-[8px] font-semibold uppercase tracking-wide text-black/40">Nombre</span>
        <span className="text-center font-inter text-[8px] font-semibold uppercase tracking-wide text-black/40">Disponible</span>
        <span className="text-center font-inter text-[8px] font-semibold uppercase tracking-wide text-black/40">No vend.</span>
        <span className="text-center font-inter text-[8px] font-semibold uppercase tracking-wide text-black/40">Total</span>
      </div>
      {rows.map((row, i) => {
        const low = row.avail < 5;
        return (
          <div key={row.name} className={`grid items-center gap-1.5 py-1.5 ${i < 3 ? "border-b border-black/[0.04]" : ""}`} style={{ gridTemplateColumns: INVENTORY_GRID }}>
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border border-black/[0.05] bg-[#FAFAF9]">
                <Image src={row.img} alt="" width={22} height={16} className="object-contain" />
              </div>
              <p className="min-w-0 truncate font-inter text-[10px] font-semibold text-black">{row.name}</p>
            </div>
            <div
              className="mx-auto flex h-[24px] w-[40px] items-center justify-center rounded-[6px] border font-inter text-[10px] font-semibold tabular-nums transition-colors"
              style={{
                borderColor: low ? "rgba(219,59,43,0.45)" : "rgba(0,0,0,0.12)",
                background: low ? "rgba(219,59,43,0.06)" : "#FFFFFF",
                color: low ? "#DB3B2B" : "#000000",
                animation: bump === i ? "countBump 0.5s ease-out" : undefined,
              }}
            >
              {row.avail}
            </div>
            <div className="mx-auto flex h-[24px] w-[34px] items-center justify-center rounded-[6px] border border-black/[0.10] bg-white font-inter text-[10px] text-black/60 tabular-nums">{row.nv}</div>
            <div className="mx-auto flex h-[24px] w-[34px] items-center justify-center rounded-[6px] border border-black/[0.10] bg-[#FAFAF9] font-inter text-[10px] font-semibold text-black tabular-nums">{row.avail + row.nv}</div>
          </div>
        );
      })}
      <div className="mt-3 flex items-center justify-center rounded-[10px] bg-[#DB3B2B] py-2">
        <span className="font-inter text-[11px] font-semibold text-white">Guardar cambios</span>
      </div>
    </div>
  );
}

/* Block 2 panel — variant editor where changing price/cost re-derives margin & profit. */
const VARIANT_ROWS = [
  { v: "Rojo / Chico / Algodón", sel: false },
  { v: "Rojo / Chico / Poliéster", sel: true },
  { v: "Rojo / Grande / Algodón", sel: false },
];

function VariantPanel() {
  const [price, setPrice] = useState(349);
  const [cost, setCost] = useState(104);
  const [bump, setBump] = useState<"price" | "cost" | null>("price");
  useEffect(() => {
    const prices = [349, 329, 379, 399, 359];
    const costs = [104, 96, 118, 132, 110];
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      // Alternate which input "the user" edits; the other stays, margin re-derives.
      if (i % 2 === 1) {
        setPrice(prices[i % prices.length]);
        setBump("price");
      } else {
        setCost(costs[i % costs.length]);
        setBump("cost");
      }
      setTimeout(() => setBump(null), 600);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const profit = Math.max(0, price - cost);
  const margin = price > 0 ? Math.round((profit / price) * 100) : 0;
  const money = (n: number) => `$${n.toFixed(2)}`;

  return (
    <div className="relative order-2 overflow-hidden rounded-[18px] border border-black/[0.06] bg-white tablet:order-1" style={{ padding: 18, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
        <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-black/[0.05] bg-[#FAFAF9]">
          <Image src="/img/playera.png" alt="" width={30} height={24} className="object-contain" />
        </div>
        <div>
          <p className="font-inter text-[12px] font-semibold text-black">Playera polo mujer</p>
          <p className="font-inter text-[10px] text-black/50">3 atributos · 8 variantes</p>
        </div>
      </div>

      {/* variant rows */}
      <div className="flex flex-col" style={{ marginBottom: 12 }}>
        {VARIANT_ROWS.map((row) => (
          <div key={row.v} className={`flex items-center gap-2 rounded-[8px] px-2 py-1.5 ${row.sel ? "bg-[#FAFAF9]" : ""}`}>
            <span className={`flex h-[13px] w-[13px] shrink-0 items-center justify-center rounded-[3px] border ${row.sel ? "border-[#DB3B2B] bg-[#DB3B2B]" : "border-black/20"}`}>
              {row.sel && <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </span>
            <div className="flex h-[24px] w-[24px] shrink-0 items-center justify-center overflow-hidden rounded-[5px] border border-black/[0.05] bg-white">
              <Image src="/img/playera.png" alt="" width={18} height={14} className="object-contain" />
            </div>
            <span className={`flex-1 font-inter text-[10.5px] ${row.sel ? "font-semibold text-black" : "text-black/65"}`}>{row.v}</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="black" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        ))}
      </div>

      {/* price + derived margin/profit */}
      <div className="rounded-[10px] border border-black/[0.06] bg-[#FCFCFC] p-2.5">
        <p className="font-inter text-[9px] font-semibold uppercase tracking-wider text-black/45" style={{ marginBottom: 6 }}>Precio</p>
        <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
          <div className="flex-1">
            <p className="font-inter text-[8px] text-black/45" style={{ marginBottom: 2 }}>Precio base</p>
            <div
              className="flex h-[24px] items-center rounded-[6px] border bg-white px-2 font-inter text-[10px] font-semibold text-black tabular-nums"
              style={{ borderColor: bump === "price" ? "rgba(219,59,43,0.40)" : "rgba(0,0,0,0.12)", animation: bump === "price" ? "countBump 0.5s ease-out" : undefined }}
            >
              {money(price)}
            </div>
          </div>
          <div className="flex-1">
            <p className="font-inter text-[8px] text-black/45" style={{ marginBottom: 2 }}>Costo</p>
            <div
              className="flex h-[24px] items-center rounded-[6px] border bg-white px-2 font-inter text-[10px] text-black/70 tabular-nums"
              style={{ borderColor: bump === "cost" ? "rgba(219,59,43,0.40)" : "rgba(0,0,0,0.12)", animation: bump === "cost" ? "countBump 0.5s ease-out" : undefined }}
            >
              {money(cost)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <p className="font-inter text-[8px] text-black/45" style={{ marginBottom: 2 }}>Ganancia</p>
            <div className="flex h-[24px] items-center justify-center rounded-[6px] bg-[rgba(34,197,94,0.10)] font-inter text-[10px] font-semibold text-[#16A34A] tabular-nums" style={{ animation: bump ? "countBump 0.5s ease-out" : undefined }}>{money(profit)}</div>
          </div>
          <div className="flex-1">
            <p className="font-inter text-[8px] text-black/45" style={{ marginBottom: 2 }}>Margen</p>
            <div className="flex h-[24px] items-center justify-center rounded-[6px] bg-[rgba(34,197,94,0.10)] font-inter text-[10px] font-semibold text-[#16A34A] tabular-nums" style={{ animation: bump ? "countBump 0.5s ease-out" : undefined }}>{margin}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function T1Productos() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stackRootRef = useRef<HTMLDivElement>(null);
  useFSStackCards(stackRootRef);

  // "Todo lo que tu catálogo necesita" carousel — arrow + dot navigation.
  // Dot count is derived from how many snap positions are actually reachable
  // (cards visible at once vary by viewport), not one-per-card.
  const incluyeRef = useRef<HTMLDivElement>(null);
  const [incluyeIdx, setIncluyeIdx] = useState(0);
  const [incluyePages, setIncluyePages] = useState(1);
  const incluyeStep = () => {
    const el = incluyeRef.current;
    const card = el?.querySelector<HTMLElement>(".incluye-card");
    return card ? card.offsetWidth + 28 : (el?.clientWidth ?? 0) * 0.8;
  };
  const incluyeLastIndex = () => {
    const el = incluyeRef.current;
    if (!el) return 0;
    const step = Math.max(1, incluyeStep());
    return Math.max(0, Math.round((el.scrollWidth - el.clientWidth) / step));
  };
  const scrollIncluye = useCallback((dir: number) => {
    incluyeRef.current?.scrollBy({ left: dir * incluyeStep(), behavior: "smooth" });
  }, []);
  const goIncluye = useCallback((i: number) => {
    const el = incluyeRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    // Snap the last dot to the true end so the final card is fully visible.
    el.scrollTo({ left: i >= incluyeLastIndex() ? max : i * incluyeStep(), behavior: "smooth" });
  }, []);
  const onIncluyeScroll = () => {
    const el = incluyeRef.current;
    if (!el) return;
    const step = Math.max(1, incluyeStep());
    setIncluyeIdx(Math.min(incluyeLastIndex(), Math.round(el.scrollLeft / step)));
  };
  useEffect(() => {
    const update = () => setIncluyePages(incluyeLastIndex() + 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("modal-visible");
        });
      },
      { root: null, threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    root.querySelectorAll("[data-modal-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="w-full">
      {/* ── Hero — text left, product list mock right ── */}
      <section
        className="relative overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-36 tablet:pb-24"
        style={{ background: "linear-gradient(135deg, #1A1212 0%, #261515 50%, #1A0A0A 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(219,59,43,0.15) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div className="relative mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] tablet:gap-12">
            {/* Left */}
            <div>
              <h1
                className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[60px]"
                style={{ lineHeight: 1.05, letterSpacing: "-1.7px", marginBottom: 22 }}
              >
                Tu catálogo,{" "}
                <span className="relative inline-block">
                  sincronizado.
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.30)", borderRadius: 5, zIndex: -1 }} />
                </span>
              </h1>
              <p
                className="font-inter text-[16px] font-light text-white/65 tablet:text-[19px]"
                style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 440 }}
              >
                Centraliza productos, precios e inventario. Cambias una vez y se actualiza en todos tus canales.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={SIGNUP_URL}
                  className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]"
                >
                  Comenzar ahora
                </a>
              </div>
            </div>

            {/* Right — two overlapping glass product cards (different product + channels) */}
            <div className="relative flex justify-center py-2 tablet:py-6">
              <div className="relative" style={{ perspective: 1000 }}>
                {/* Back card — peeks behind on desktop, also floating in 3D */}
                <div className="absolute hidden tablet:block" style={{ left: -187, top: -26, zIndex: 0, transform: "rotate(-8deg) scale(0.92)", opacity: 0.96 }}>
                  <GlassProductCard
                    autoTilt
                    className="tilt-delay"
                    imageSrc="/img/playera.png"
                    price="$249.00"
                    title="Playera básica algodón"
                    units="1,840 unidades · 3 canales"
                    marketplaces={HERO_CARD_B_CHANNELS}
                  />
                </div>

                {/* Front card — main, auto-tilting; leans right only on desktop
                    (where it fans against the back card). The `rotate` property
                    composes with the child's auto-tilt transform. */}
                <div className="relative tablet:rotate-[20deg]" style={{ zIndex: 1 }}>
                  <GlassProductCard
                    autoTilt
                    imageSrc="/img/tenis-transparente.png"
                    price="$1,345.99"
                    title="Tenis blancos clásicos"
                    units="3,102 unidades · 4 canales"
                    marketplaces={HERO_CARD_A_CHANNELS}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stack cards intro ── */}
      <section className="relative bg-white px-5 pt-12 pb-8 tablet:px-10 tablet:pt-16 tablet:pb-10">
        <div data-modal-animate className="mx-auto max-w-[760px] text-center">
          <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 16 }}>
            Un catálogo, todos tus canales.
          </h2>
          <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[19px]" style={{ lineHeight: 1.5 }}>
            Centraliza productos, variantes y precios. Publícalos en todos tus canales con un click.
          </p>
        </div>
      </section>

      {/* ── Stack cards ── */}
      <div ref={stackRootRef} className="fs-stack-card-container relative bg-white">
        {/* Block 1 — Catálogo centralizado (text left, panel right) — bg white, no shadow */}
        <div className="fs-stack-card" style={{ top: 60, zIndex: 1, background: "#FFFFFF" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Un solo catálogo
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Sube tus productos una sola vez. Edita desde un solo lugar y se actualiza en tu tienda online, sucursales y marketplaces.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Carga masiva desde Excel o CSV", "IA que genera título y descripción desde una foto", "Categorías y atributos personalizables"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Panel — animated Productos list */}
              <ProductsPanel />
            </div>
          </div>
        </div>

        {/* Block 2 — Variantes + precios por canal (panel left, text right) — bg #F6F6F6 */}
        <div className="fs-stack-card" style={{ top: 80, zIndex: 2, background: "#F6F6F6" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              {/* Panel — animated variant editor (price/cost → margin & profit) */}
              <VariantPanel />

              <div className="order-1 tablet:order-2">
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Variantes y precios por canal
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Hasta 3 atributos —como color, talla o material— con todas sus combinaciones. Define precio, costo y margen de cada variante.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Atributos personalizables por categoría", "Precio, costo y margen por variante", "Precios diferenciados por marketplace"].map((it) => (
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

        {/* Block 3 — Stock en tiempo real (text left, panel right) — bg white */}
        <div className="fs-stack-card" style={{ top: 100, zIndex: 3, background: "#FFFFFF" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Edita inventario en segundos
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Cada venta lo descuenta al instante en todos tus canales. Y cuando necesitas ajustar, lo cambias desde una vista pensada para hacerlo rápido.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Inventario por sucursal y por canal", "Vista rápida para editar existencias", "Se sincroniza al instante en todos tus canales"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Panel — animated inventory editor */}
              <InventoryPanel />
            </div>
          </div>
        </div>
      </div>

      {/* ── Cómo funciona ── */}
      <section className="relative bg-[#F6F6F6] px-5 py-[100px] tablet:px-10 tablet:py-[128px]">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Crea productos como prefieras
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Con IA, de forma manual o de forma masiva. Tú eliges cómo cargar tu catálogo.
            </p>
          </div>
          <div data-modal-animate className="flex flex-wrap justify-center gap-5">
            {[
              {
                title: "Con IA",
                desc: "Sube una foto y la IA genera título, descripción, categoría y atributos al instante.",
                icon: (<><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" /><path d="M18.5 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z" /></>),
              },
              {
                title: "De forma manual",
                desc: "Crea producto a producto con un editor visual, con todo el control del detalle.",
                icon: (<path d="M4 20h16 M14.5 4.5l3 3-9.5 9.5-3.5.9.9-3.5 9.6-9.4Z" />),
              },
              {
                title: "De forma masiva",
                desc: "Importa cientos de productos desde Excel o CSV en un solo paso.",
                icon: (<path d="M12 16V4 M8 8l4-4 4 4 M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />),
              },
            ].map((s) => (
              <div
                key={s.title}
                className="w-full tablet:w-[300px] rounded-[18px] border border-black/[0.07] bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
              >
                <div className="mb-4 flex h-[30px] w-[30px] items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {s.icon}
                  </svg>
                </div>
                <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 6 }}>{s.title}</h3>
                <p className="font-inter text-[14px] font-light text-black/55" style={{ lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lo que incluye ── */}
      <section className="relative bg-white px-5 py-[100px] tablet:px-10 tablet:py-[128px]">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Todo lo que tu catálogo necesita
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Centraliza, automatiza y escala sin agregar carga operativa.
            </p>
          </div>
          {/* Horizontal carousel — same card style as the Tienda "Todo incluido"
              section: each card carries a compact mockup + title + desc. */}
          <div
            ref={incluyeRef}
            onScroll={onIncluyeScroll}
            data-modal-animate
            className="flex gap-7 overflow-x-auto snap-x snap-mandatory px-6 py-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollPaddingLeft: 24, scrollPaddingRight: 24 }}
          >
            {/* 1. Carga masiva */}
            <div data-stagger style={{ ["--i" as string]: 0 }} className="incluye-card flex shrink-0 snap-start w-[80vw] max-w-[300px] tablet:w-[300px] flex-col overflow-hidden rounded-[18px] border border-black/[0.06] bg-white p-6">
              <div className="incluye-visual relative mb-6 flex h-[150px] items-center justify-center overflow-hidden rounded-[10px]" style={{ background: "linear-gradient(135deg,#FBFBFB 0%,#F4F4F5 100%)", padding: 12 }}>
                <div className="w-full max-w-[190px] rounded-[8px] border border-black/[0.07] bg-white p-2.5">
                  <div className="mb-2 flex items-center gap-1.5">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M6 2h8l4 4v16H6z" stroke="#16A34A" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 13l2 2 4-4" stroke="#16A34A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span className="font-inter text-[9px] font-semibold text-black">productos.csv</span>
                    <span className="ml-auto font-inter text-[8px] font-bold text-[#16A34A]">428/428</span>
                  </div>
                  {["Tenis blancos clásicos", "Playera básica algodón", "Sudadera hoodie premium"].map((n) => (
                    <div key={n} className="mb-1 flex items-center gap-1.5">
                      <span className="flex h-[10px] w-[10px] items-center justify-center rounded-full bg-[#16A34A]"><svg width="6" height="6" viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                      <span className="font-inter text-[8px] text-black/55 truncate">{n}</span>
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="font-sora text-[17px] font-normal text-black" style={{ marginBottom: 6 }}>Carga masiva</h3>
              <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>Sube cientos de productos desde Excel o CSV en un solo paso.</p>
            </div>

            {/* 2. IA para fotos */}
            <div data-stagger style={{ ["--i" as string]: 1 }} className="incluye-card flex shrink-0 snap-start w-[80vw] max-w-[300px] tablet:w-[300px] flex-col overflow-hidden rounded-[18px] border border-black/[0.06] bg-white p-6">
              <div className="incluye-visual relative mb-6 flex h-[150px] items-center justify-center overflow-hidden rounded-[10px]" style={{ background: "linear-gradient(135deg,#FBFBFB 0%,#F4F4F5 100%)", padding: 12 }}>
                <div className="flex w-full max-w-[200px] items-center gap-2 rounded-[8px] border border-black/[0.07] bg-white p-2">
                  <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border border-black/[0.05] bg-[#FAFAF9]">
                    <Image src="/img/tenis-transparente.png" alt="" width={38} height={28} className="object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-[rgba(139,92,246,0.10)] px-1.5 py-0.5">
                      <svg width="7" height="7" viewBox="0 0 24 24" fill="none"><path d="M12 3L14 9L20 11L14 13L12 19L10 13L4 11L10 9L12 3Z" stroke="#8B5CF6" strokeWidth="2" strokeLinejoin="round" fill="rgba(139,92,246,0.2)" /></svg>
                      <span className="font-inter text-[7px] font-semibold text-[#8B5CF6]">Generado con IA</span>
                    </span>
                    <div className="h-[3px] w-full rounded-full bg-black/15" style={{ marginBottom: 3 }} />
                    <div className="h-[3px] w-3/4 rounded-full bg-black/10" style={{ marginBottom: 3 }} />
                    <div className="h-[3px] w-1/2 rounded-full bg-black/10" />
                  </div>
                </div>
              </div>
              <h3 className="font-sora text-[17px] font-normal text-black" style={{ marginBottom: 6 }}>IA para fotos</h3>
              <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>Sube una imagen y obtén título, descripción y atributos al instante.</p>
            </div>

            {/* 3. Variantes ilimitadas */}
            <div data-stagger style={{ ["--i" as string]: 2 }} className="incluye-card flex shrink-0 snap-start w-[80vw] max-w-[300px] tablet:w-[300px] flex-col overflow-hidden rounded-[18px] border border-black/[0.06] bg-white p-6">
              <div className="incluye-visual relative mb-6 flex h-[150px] items-center justify-center overflow-hidden rounded-[10px]" style={{ background: "linear-gradient(135deg,#FBFBFB 0%,#F4F4F5 100%)", padding: 12 }}>
                <div className="w-full max-w-[190px] rounded-[8px] border border-black/[0.07] bg-white p-2.5">
                  <p className="mb-1.5 font-inter text-[8px] font-semibold uppercase tracking-wider text-black/45">Talla</p>
                  <div className="mb-2.5 flex flex-wrap gap-1">
                    {["24", "25", "26", "27", "28"].map((s, i) => (
                      <span key={s} className={`flex h-[16px] w-[20px] items-center justify-center rounded-[4px] border font-inter text-[8px] font-semibold ${i === 1 ? "border-[#DB3B2B] bg-[rgba(219,59,43,0.06)] text-[#DB3B2B]" : "border-black/[0.10] text-black/55"}`}>{s}</span>
                    ))}
                  </div>
                  <p className="mb-1.5 font-inter text-[8px] font-semibold uppercase tracking-wider text-black/45">Color</p>
                  <div className="flex gap-1.5">
                    {["#FFFFFF", "#1A1A1A", "#D9CDB8", "#3878FF"].map((c) => (
                      <span key={c} className="h-[14px] w-[14px] rounded-full" style={{ background: c, border: "1px solid rgba(0,0,0,0.12)" }} />
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="font-sora text-[17px] font-normal text-black" style={{ marginBottom: 6 }}>Variantes y combinaciones</h3>
              <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>Hasta 3 atributos —como color, talla o material— con todas sus combinaciones.</p>
            </div>

            {/* 4. Categorías inteligentes */}
            <div data-stagger style={{ ["--i" as string]: 3 }} className="incluye-card flex shrink-0 snap-start w-[80vw] max-w-[300px] tablet:w-[300px] flex-col overflow-hidden rounded-[18px] border border-black/[0.06] bg-white p-6">
              <div className="incluye-visual relative mb-6 flex h-[150px] items-center justify-center overflow-hidden rounded-[10px]" style={{ background: "linear-gradient(135deg,#FBFBFB 0%,#F4F4F5 100%)", padding: 12 }}>
                <div className="w-full max-w-[190px] rounded-[8px] border border-black/[0.07] bg-white p-2.5">
                  <div className="mb-2 flex items-center gap-1 font-inter text-[8px] text-black/55">
                    <span>Ropa</span>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="black" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span>Calzado</span>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="black" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span className="font-semibold text-[#DB3B2B]">Tenis</span>
                  </div>
                  {[
                    { ch: "meli-iso.svg", cat: "Ropa › Tenis" },
                    { ch: "amazon-iso.svg", cat: "Calzado › Deportivo" },
                  ].map((m) => (
                    <div key={m.ch} className="mb-1 flex items-center gap-1.5 rounded-[5px] bg-[#FAFAF9] px-1.5 py-1">
                      <Image src={`/img/${m.ch}`} alt="" width={12} height={12} className="rounded-[3px] object-contain" />
                      <span className="font-inter text-[8px] text-black/60 truncate">{m.cat}</span>
                      <svg width="9" height="9" viewBox="0 0 16 16" fill="none" className="ml-auto shrink-0"><path d="M3 8l3 3 7-7" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="font-sora text-[17px] font-normal text-black" style={{ marginBottom: 6 }}>Categorías inteligentes</h3>
              <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>Mapeo automático a la categoría correcta de cada marketplace.</p>
            </div>

            {/* 5. Histórico y reportes */}
            <div data-stagger style={{ ["--i" as string]: 4 }} className="incluye-card flex shrink-0 snap-start w-[80vw] max-w-[300px] tablet:w-[300px] flex-col overflow-hidden rounded-[18px] border border-black/[0.06] bg-white p-6">
              <div className="incluye-visual relative mb-6 flex h-[150px] items-center justify-center overflow-hidden rounded-[10px]" style={{ background: "linear-gradient(135deg,#FBFBFB 0%,#F4F4F5 100%)", padding: 12 }}>
                <div className="w-full max-w-[190px] rounded-[8px] border border-black/[0.07] bg-white p-2.5">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-inter text-[8px] text-black/50">Más vendidos · 30 días</span>
                    <span className="font-inter text-[9px] font-bold text-[#22C55E]">↑ 18%</span>
                  </div>
                  <div className="flex h-[40px] items-end gap-1">
                    {[40, 62, 34, 70, 52, 84, 96].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-[2px]" style={{ height: `${h}%`, background: i === 6 ? "#DB3B2B" : "rgba(219,59,43,0.18)" }} />
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="font-sora text-[17px] font-normal text-black" style={{ marginBottom: 6 }}>Histórico y reportes</h3>
              <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>Productos top, rotación y baja rotación con datos reales.</p>
            </div>
          </div>

          {/* Carousel controls — arrows + dot indicators */}
          <div className="mt-7 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollIncluye(-1)}
              aria-label="Anterior"
              className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-black/70 transition-colors hover:border-black/25 hover:text-black"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: incluyePages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goIncluye(i)}
                  aria-label={`Ir a la posición ${i + 1}`}
                  className="cursor-pointer rounded-full border-none p-0 transition-all duration-200"
                  style={{ width: incluyeIdx === i ? 22 : 8, height: 8, background: incluyeIdx === i ? "#DB3B2B" : "rgba(0,0,0,0.18)" }}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollIncluye(1)}
              aria-label="Siguiente"
              className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-black/70 transition-colors hover:border-black/25 hover:text-black"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative px-5 py-[100px] tablet:px-10 tablet:py-[128px]" style={{ background: "linear-gradient(135deg, #1A0A0A 0%, #261515 50%, #1A0A0A 100%)" }}>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[640px] text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[24px] font-light text-white tablet:text-[34px]" style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Números que hablan por sí solos.
            </h2>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-10 text-center tablet:grid-cols-3">
            <div data-stagger style={{ ["--i" as string]: 0 }}><CountStat end={500} prefix="+" label="productos por hora con carga masiva" /></div>
            <div data-stagger style={{ ["--i" as string]: 1 }}><CountStat end={10} prefix="+" label="canales conectables al instante" /></div>
            <div data-stagger style={{ ["--i" as string]: 2 }}>
              <p className="font-sora text-[36px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1 }}>&lt; 2s</p>
              <p className="font-inter text-[12px] font-light text-white/55 tablet:text-[13px]">para sincronizar inventario entre canales</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative bg-[#F6F6F6] px-5 py-[100px] tablet:px-10 tablet:py-[128px]">
        <div className="mx-auto max-w-[760px]">
          <div data-modal-animate className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>Preguntas frecuentes</h2>
          </div>
          <div data-modal-animate className="flex flex-col gap-3">
            {[
              { q: "¿Cuántos productos puedo subir?", a: "Ilimitados. Hemos visto catálogos de cientos de miles de SKUs operando sin problemas." },
              { q: "¿La IA crea descripciones automáticamente?", a: "Sí. Sube una foto y la IA genera título, descripción y atributos. Tú revisas y publicas." },
              { q: "¿Cómo se manejan las variantes?", a: "Define cualquier atributo (talla, color, material…) y T1 genera todas las combinaciones automáticamente." },
              { q: "¿Puedo importar desde Shopify u otro?", a: "Sí. Importadores listos para Shopify, VTEX, WooCommerce y archivos CSV/Excel." },
              { q: "¿El inventario se actualiza en tiempo real?", a: "Sí. Cada venta en cualquier canal descuenta inventario en menos de 2 segundos en todos los demás." },
            ].map((f, i) => (
              <details key={f.q} data-stagger className="group rounded-[14px] border border-black/[0.06] bg-white transition-all duration-200 open:border-[rgba(219,59,43,0.2)] open:shadow-[0_4px_18px_rgba(0,0,0,0.05)]" style={{ ["--i" as string]: i }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-sora text-[16px] font-normal text-black transition-colors duration-150 hover:text-[#DB3B2B]">
                  {f.q}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-black/40 transition-transform duration-300 group-open:rotate-180 group-open:text-[#DB3B2B]"><path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </summary>
                <p className="px-6 pb-5 font-inter text-[14px] font-light text-black/65" style={{ lineHeight: 1.65 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <T1FinalCTA
        title="¿Listo para centralizar tu catálogo?"
        description="Sube tus productos una sola vez y véndelos en todos tus canales con inventario sincronizado."
      />
    </div>
  );
}
