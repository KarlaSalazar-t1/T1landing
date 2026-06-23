"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { useFSStackCards } from "@/hooks/useFSStackCards";
import T1FinalCTA from "@/components/T1FinalCTA";
import GlassProductCard from "@/components/GlassProductCard";

const HERO_CARD_CHANNELS = [
  { src: "/img/meli-iso.svg", alt: "Mercado Libre" },
  { src: "/img/amazon-iso.svg", alt: "Amazon" },
  { src: "/img/shein-iso.svg", alt: "SHEIN" },
  { src: "/img/walmart.svg", alt: "Walmart" },
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

export default function T1Productos() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stackRootRef = useRef<HTMLDivElement>(null);
  useFSStackCards(stackRootRef);

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
                  siempre sincronizado
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.30)", borderRadius: 5, zIndex: -1 }} />
                </span>
                .
              </h1>
              <p
                className="font-inter text-[16px] font-light text-white/65 tablet:text-[19px]"
                style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}
              >
                Productos, variantes, precios e inventario centralizados en un solo lugar. Cambias una vez, se actualiza en todos tus canales.
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

            {/* Right — product list mock + floating glass product card */}
            <div className="relative flex justify-center">
              {/* Mobile: the glass product card on its own (cleaner than the phone) */}
              <div className="flex justify-center py-2 tablet:hidden">
                <GlassProductCard
                  imageSrc="/img/tenis-transparente.png"
                  price="$1,345.99"
                  title="Tenis blancos clásicos"
                  units="3,102 unidades · 4 canales"
                  marketplaces={HERO_CARD_CHANNELS}
                />
              </div>

              {/* Desktop: phone list + floating glass card + sync badge */}
              <div className="relative hidden justify-center tablet:flex">
                {/* Phone-like product list */}
                <div className="relative overflow-hidden rounded-[18px]" style={{ width: 280, aspectRatio: "9/16", boxShadow: "0 20px 60px rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.10)" }}>
                  <Image src="/img/list-product.webp" alt="Lista de productos" fill className="object-cover object-top" sizes="280px" priority />
                </div>

                {/* Floating glass product card */}
                <div className="absolute" style={{ right: -36, bottom: 56 }}>
                  <GlassProductCard
                    imageSrc="/img/tenis-transparente.png"
                    price="$1,345.99"
                    title="Tenis blancos clásicos"
                    units="3,102 unidades · 4 canales"
                    marketplaces={HERO_CARD_CHANNELS}
                  />
                </div>

                {/* Floating sync badge */}
                <div className="absolute flex items-center gap-2 rounded-full bg-white" style={{ left: -16, top: 90, padding: "8px 14px", boxShadow: "0 10px 28px rgba(0,0,0,0.16)" }}>
                  <span className="h-[8px] w-[8px] rounded-full bg-[#22C55E]" style={{ animation: "pulse-soft 2s ease-in-out infinite" }} />
                  <span className="font-inter text-[11px] font-semibold text-black">Sincronizado en 4 canales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Antes ── */}
      <section className="relative bg-[#F6F6F6] px-5 pt-16 pb-12 tablet:px-10 tablet:pt-20 tablet:pb-16" data-white-card>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[26px] font-light text-black tablet:text-[34px] lg:text-[40px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>
              Subir productos no debería ser <em className="not-italic text-black/40">un trabajo aparte.</em>
            </h2>
          </div>

          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
            {[
              { title: "Catálogos duplicados", desc: "Subes el mismo producto en cada plataforma. Cada cambio se vuelve un día perdido.", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="8" y="8" width="12" height="12" rx="2" stroke="#9CA3AF" strokeWidth="1.6" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Precios desfasados", desc: "Cambias precio en uno, olvidas en otro. Pierdes margen o vendes barato sin querer.", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="7.5" cy="7.5" r="1.2" fill="#9CA3AF" /></svg>) },
              { title: "Variantes imposibles", desc: "Tallas, colores, materiales… llevar todo manualmente es trabajo a tiempo completo.", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#9CA3AF" strokeWidth="1.6" /><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#9CA3AF" strokeWidth="1.6" /><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#9CA3AF" strokeWidth="1.6" /><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#9CA3AF" strokeWidth="1.6" /></svg>) },
            ].map((p, i) => (
              <div
                key={p.title}
                data-stagger
                className="rounded-[18px] border border-black/[0.06] bg-white p-7 transition-shadow duration-200 hover:shadow-[0_0_25px_2px_rgba(0,0,0,0.04)]"
                style={{ ["--i" as string]: i }}
              >
                <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[11px] bg-black/[0.04]" style={{ marginBottom: 16 }}>{p.icon}</div>
                <h3 className="font-sora text-[18px] font-normal text-black/70" style={{ marginBottom: 6 }}>{p.title}</h3>
                <p className="font-inter text-[14px] font-light text-black/50" style={{ lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stack cards intro ── */}
      <section className="relative bg-white px-5 pt-12 pb-8 tablet:px-10 tablet:pt-16 tablet:pb-10">
        <div data-modal-animate className="mx-auto max-w-[760px] text-center">
          <h2 className="font-sora text-[28px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.4px", lineHeight: 1.1, marginBottom: 16 }}>
            Un catálogo, todos tus canales.
          </h2>
          <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[19px]" style={{ lineHeight: 1.5 }}>
            Centraliza productos, variantes y precios. Distribuye con un click.
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
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Un solo catálogo
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Sube tus productos una sola vez. Edita desde un solo lugar y se actualiza en tu tienda online, sucursales y marketplaces.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Bulk import desde Excel o CSV", "IA que genera título y descripción desde una foto", "Categorías y atributos personalizables"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Panel — product table */}
              <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
                  <p className="font-sora text-[14px] font-medium text-black">Catálogo · 1,432 productos</p>
                  <span className="rounded-full bg-[rgba(219,59,43,0.10)] px-2 py-0.5 font-inter text-[10px] font-bold text-[#DB3B2B]">+ Nuevo</span>
                </div>
                <div className="grid grid-cols-[40px_1fr_60px_50px] items-center gap-2 border-b border-black/[0.06] pb-2" style={{ marginBottom: 8 }}>
                  <span className="font-inter text-[9px] font-semibold uppercase tracking-wide text-black/40"></span>
                  <span className="font-inter text-[9px] font-semibold uppercase tracking-wide text-black/40">Producto</span>
                  <span className="font-inter text-[9px] font-semibold uppercase tracking-wide text-black/40 text-right">Precio</span>
                  <span className="font-inter text-[9px] font-semibold uppercase tracking-wide text-black/40 text-right">Inv.</span>
                </div>
                {[
                  { name: "Tenis blancos clásicos", sku: "TBC-042", price: "$1,345.99", stock: 24, img: "/img/tenis-transparente.png" },
                  { name: "Playera básica algodón", sku: "PB-101", price: "$249.00", stock: 87, img: "/img/tenis-transparente.png" },
                  { name: "Sudadera hoodie premium", sku: "SH-220", price: "$890.00", stock: 12, img: "/img/tenis-transparente.png" },
                  { name: "Mochila urbana 25L", sku: "MU-007", price: "$1,120.00", stock: 38, img: "/img/tenis-transparente.png" },
                ].map((row, i) => (
                  <div key={row.sku} className={`grid grid-cols-[40px_1fr_60px_50px] items-center gap-2 py-2 ${i < 3 ? "border-b border-black/[0.04]" : ""}`}>
                    <div className="flex h-[32px] w-[32px] items-center justify-center overflow-hidden rounded-[6px] border border-black/[0.05] bg-[#FAFAF9]">
                      <Image src={row.img} alt="" width={26} height={20} className="object-contain" />
                    </div>
                    <div>
                      <p className="font-inter text-[11px] font-semibold text-black truncate">{row.name}</p>
                      <p className="font-inter text-[9px] text-black/45">{row.sku}</p>
                    </div>
                    <p className="font-inter text-[11px] font-semibold text-black text-right">{row.price}</p>
                    <p className="font-inter text-[11px] font-semibold text-black text-right">{row.stock}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Block 2 — Variantes + precios por canal (panel left, text right) — bg #F6F6F6 */}
        <div className="fs-stack-card" style={{ top: 80, zIndex: 2, background: "#F6F6F6" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              {/* Panel — variants editor */}
              <div className="relative order-2 overflow-hidden rounded-[18px] border border-black/[0.06] bg-white tablet:order-1" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
                <div className="flex items-center gap-3" style={{ marginBottom: 14 }}>
                  <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-black/[0.05] bg-[#FAFAF9]">
                    <Image src="/img/tenis-transparente.png" alt="" width={36} height={28} className="object-contain" />
                  </div>
                  <div>
                    <p className="font-inter text-[12px] font-semibold text-black">Tenis blancos clásicos</p>
                    <p className="font-inter text-[10px] text-black/50">3 atributos · 9 variantes</p>
                  </div>
                </div>

                <p className="font-inter text-[10px] font-semibold uppercase tracking-wider text-black/45" style={{ marginBottom: 8 }}>Talla</p>
                <div className="flex flex-wrap gap-2" style={{ marginBottom: 14 }}>
                  {["24", "25", "26", "27", "28", "29"].map((s, i) => (
                    <div key={s} className={`flex h-[28px] w-[36px] items-center justify-center rounded-[6px] border text-[11px] font-semibold ${i === 1 ? "border-[#DB3B2B] bg-[rgba(219,59,43,0.06)] text-[#DB3B2B]" : "border-black/[0.08] text-black/65"}`}>{s}</div>
                  ))}
                </div>

                <p className="font-inter text-[10px] font-semibold uppercase tracking-wider text-black/45" style={{ marginBottom: 8 }}>Color</p>
                <div className="flex flex-wrap gap-2" style={{ marginBottom: 14 }}>
                  {[
                    { name: "Blanco", c: "#FFFFFF", border: true },
                    { name: "Negro", c: "#1A1A1A" },
                    { name: "Beige", c: "#D9CDB8" },
                  ].map((c, i) => (
                    <div key={c.name} className={`flex items-center gap-2 rounded-[6px] border px-2.5 py-1 ${i === 0 ? "border-[#DB3B2B]" : "border-black/[0.08]"}`}>
                      <span className="h-[12px] w-[12px] rounded-full" style={{ background: c.c, border: c.border ? "1px solid rgba(0,0,0,0.10)" : "none" }} />
                      <span className="font-inter text-[10px] font-medium text-black/70">{c.name}</span>
                    </div>
                  ))}
                </div>

                <p className="font-inter text-[10px] font-semibold uppercase tracking-wider text-black/45" style={{ marginBottom: 8 }}>Precio por canal</p>
                <div className="flex flex-col gap-1.5">
                  {[
                    { ch: "meli-iso.svg", name: "MercadoLibre", price: "$1,389.00" },
                    { ch: "amazon-iso.svg", name: "Amazon", price: "$1,425.00" },
                    { ch: "shein-iso.svg", name: "Tienda online", price: "$1,345.99" },
                  ].map((p) => (
                    <div key={p.name} className="flex items-center gap-2 rounded-[8px] bg-[#FAFAF9] px-2.5 py-2">
                      <div className="flex h-[20px] w-[20px] items-center justify-center overflow-hidden rounded-[4px] border border-black/[0.05] bg-white">
                        <Image src={`/img/${p.ch}`} alt="" width={16} height={16} className="object-contain" />
                      </div>
                      <span className="font-inter text-[11px] text-black/70 flex-1">{p.name}</span>
                      <span className="font-inter text-[11px] font-semibold text-black">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-1 tablet:order-2">
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Variantes y precios por canal
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Talla, color, material, sabor… combinaciones ilimitadas. Define un precio diferente por canal para optimizar margen.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Atributos personalizables por categoría", "Precios diferenciados por marketplace", "Promociones por temporada o canal"].map((it) => (
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
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Inventario en vivo
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Cada venta descuenta inventario al instante en todos tus canales. Alertas automáticas cuando algo está por agotarse.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Inventario por sucursal y por canal", "Alerta de bajo inventario configurable", "Reposición sugerida con datos de venta"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Panel — stock dashboard with alert */}
              <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
                  <p className="font-sora text-[14px] font-medium text-black">Estado del inventario</p>
                  <span className="rounded-full bg-[rgba(34,197,94,0.12)] px-2 py-0.5 font-inter text-[10px] font-bold text-[#16A34A]">En vivo</span>
                </div>

                {/* Stock summary cards */}
                <div className="grid grid-cols-3 gap-2" style={{ marginBottom: 14 }}>
                  <div className="rounded-[10px] bg-[#FAFAF9] p-3">
                    <p className="font-inter text-[9px] text-black/45">Total SKUs</p>
                    <p className="font-sora text-[20px] font-light text-black" style={{ letterSpacing: "-0.02em", lineHeight: 1 }}>1,432</p>
                  </div>
                  <div className="rounded-[10px] bg-[rgba(34,197,94,0.06)] p-3">
                    <p className="font-inter text-[9px] text-[#16A34A]">Disponibles</p>
                    <p className="font-sora text-[20px] font-light text-[#16A34A]" style={{ letterSpacing: "-0.02em", lineHeight: 1 }}>1,398</p>
                  </div>
                  <div className="rounded-[10px] bg-[rgba(245,158,11,0.06)] p-3">
                    <p className="font-inter text-[9px] text-[#B45309]">Bajo inv.</p>
                    <p className="font-sora text-[20px] font-light text-[#B45309]" style={{ letterSpacing: "-0.02em", lineHeight: 1 }}>34</p>
                  </div>
                </div>

                {/* Alert items */}
                <p className="font-inter text-[10px] font-semibold uppercase tracking-wider text-black/45" style={{ marginBottom: 8 }}>Necesitan reposición</p>
                <div className="flex flex-col gap-1.5">
                  {[
                    { name: "Sudadera hoodie · Negro · M", stock: 3, max: 50 },
                    { name: "Tenis blancos · 26", stock: 5, max: 40 },
                    { name: "Mochila urbana · Beige", stock: 2, max: 30 },
                  ].map((it) => (
                    <div key={it.name} className="flex items-center gap-3 rounded-[8px] bg-[#FAFAF9] px-3 py-2">
                      <div className="flex h-[8px] flex-1 overflow-hidden rounded-full bg-black/[0.05]">
                        <div className="h-full rounded-full bg-[#F59E0B]" style={{ width: `${(it.stock / it.max) * 100}%` }} />
                      </div>
                      <span className="font-inter text-[10px] text-black/65 flex-shrink-0 w-[150px] truncate">{it.name}</span>
                      <span className="font-inter text-[10px] font-bold text-[#B45309] w-[36px] text-right">{it.stock} pzs</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-center rounded-[10px] bg-[#DB3B2B] py-2">
                  <span className="font-inter text-[11px] font-semibold text-white">Generar orden de reposición</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cómo funciona ── */}
      <section className="relative bg-[#F6F6F6] px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              De foto a producto en línea, en minutos
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Sube, edita, distribuye. Sin pelear con cada plataforma.
            </p>
          </div>
          <div data-modal-animate className="relative grid grid-cols-1 gap-5 tablet:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div aria-hidden className="pointer-events-none absolute hidden lg:block" style={{ left: "12.5%", right: "12.5%", top: 30, height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(219,59,43,0.25) 12%, rgba(219,59,43,0.25) 88%, transparent 100%)" }} />
            {[
              { n: "01", title: "Sube tu producto", desc: "Una foto basta. La IA genera título, descripción y categoría." },
              { n: "02", title: "Define variantes", desc: "Talla, color, material. Combinaciones ilimitadas con un editor visual." },
              { n: "03", title: "Distribuye canales", desc: "Selecciona dónde publicar. T1 mapea categorías por marketplace." },
              { n: "04", title: "Inventario sincronizado", desc: "Cada venta actualiza inventario en todos los canales en tiempo real." },
            ].map((s, i) => (
              <div key={s.n} data-stagger className="tienda-card relative rounded-[18px] border border-black/[0.06] bg-white p-7" style={{ ["--i" as string]: i }}>
                <span aria-hidden className="step-dot absolute hidden h-[10px] w-[10px] rounded-full bg-[#DB3B2B] lg:block" style={{ left: 28, top: 25, boxShadow: "0 0 0 6px rgba(219,59,43,0.12)" }} />
                <span className="font-sora text-[40px] font-light text-[#DB3B2B]" style={{ display: "block", marginTop: 28, marginBottom: 12, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.n}</span>
                <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 6 }}>{s.title}</h3>
                <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lo que incluye ── */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Todo lo que tu catálogo necesita
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Centraliza, automatiza y escala sin agregar carga operativa.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {[
              { title: "Bulk import", desc: "Sube cientos de productos desde Excel o CSV en un click.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3v12 M8 11l4 4 4-4 M5 21h14" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "IA para fotos", desc: "Sube una imagen y obtén título, descripción y atributos al instante.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#DB3B2B" strokeWidth="1.6" /><path d="M3 16l5-5 5 5 4-4 4 4" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="9" r="1.5" fill="#DB3B2B" /></svg>) },
              { title: "SKUs automáticos", desc: "Generación automática de SKUs únicos por variante.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 5v14 M7 5v14 M11 5v14 M15 5v14 M19 5v14" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Categorías inteligentes", desc: "Mapeo automático a categorías de cada marketplace.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#DB3B2B" strokeWidth="1.6" /><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#DB3B2B" strokeWidth="1.6" /><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#DB3B2B" strokeWidth="1.6" /><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#DB3B2B" strokeWidth="1.6" /></svg>) },
              { title: "Alertas de inventario", desc: "Notificaciones cuando un producto está por agotarse.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M13.7 21a2 2 0 0 1-3.4 0" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Histórico y reportes", desc: "Análisis de rotación, productos top y baja rotación.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 21h18 M3 3v18" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" /><path d="M7 17l4-4 3 3 5-7" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
            ].map((f, i) => (
              <div key={f.title} data-stagger className="tienda-card flex items-start gap-4 rounded-[16px] border border-black/[0.06] bg-white p-6" style={{ ["--i" as string]: i }}>
                <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[12px]" style={{ background: "rgba(219,59,43,0.08)" }}>{f.icon}</div>
                <div>
                  <h3 className="font-sora text-[16px] font-normal text-black" style={{ marginBottom: 4 }}>{f.title}</h3>
                  <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative px-5 py-20 tablet:px-10 tablet:py-24" style={{ background: "linear-gradient(135deg, #1A0A0A 0%, #261515 50%, #1A0A0A 100%)" }}>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[640px] text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[24px] font-light text-white tablet:text-[34px]" style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Números que hablan por sí solos.
            </h2>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-10 text-center tablet:grid-cols-3">
            <div data-stagger style={{ ["--i" as string]: 0 }}><CountStat end={500} prefix="+" label="productos por hora con bulk import" /></div>
            <div data-stagger style={{ ["--i" as string]: 1 }}><CountStat end={10} prefix="+" label="canales conectables al instante" /></div>
            <div data-stagger style={{ ["--i" as string]: 2 }}>
              <p className="font-sora text-[36px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1 }}>&lt; 2s</p>
              <p className="font-inter text-[12px] font-light text-white/55 tablet:text-[13px]">para sincronizar inventario entre canales</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative bg-[#F6F6F6] px-5 py-24 tablet:px-10 tablet:py-32">
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
