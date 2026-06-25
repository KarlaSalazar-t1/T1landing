"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { useFSStackCards } from "@/hooks/useFSStackCards";
import T1FinalCTA from "@/components/T1FinalCTA";
import { PosDesktopScreen, PosMobileScreen, PosCheckoutScreen, PosCheckoutMobileScreen } from "@/components/showcase/PosMockups";

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

export default function T1POS() {
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
      {/* ── Hero — text left, POS terminal mock right ── */}
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
                El punto de venta de{" "}
                <span className="relative inline-block">
                  tu tienda física.
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.30)", borderRadius: 5, zIndex: -1 }} />
                </span>
              </h1>
              <p
                className="font-inter text-[16px] font-light text-white/65 tablet:text-[19px]"
                style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}
              >
                Cobra tus ventas en piso con tarjeta, efectivo o SPEI usando el mismo catálogo e inventario de tu tienda en línea. Con control de caja al cierre.
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

            {/* Right — POS on desktop + mobile, framed with the same transparent
                glass edge as the main landing's stack cards. */}
            <div className="relative mx-auto w-full" style={{ maxWidth: 600 }}>
              {/* Desktop POS screen (built mock + glass frame) */}
              <PosDesktopScreen />

              {/* Mobile POS app — overlaps the bottom-right corner, in front */}
              <div className="absolute" style={{ width: "30%", right: "-3%", bottom: "-12%", zIndex: 2 }}>
                <PosMobileScreen />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Stack cards intro ── */}
      <section className="relative bg-white px-5 pt-12 pb-8 tablet:px-10 tablet:pt-16 tablet:pb-10">
        <div data-modal-animate className="mx-auto max-w-[760px] text-center">
          <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 16 }}>
            Una caja conectada a todo tu negocio.
          </h2>
          <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[19px]" style={{ lineHeight: 1.5 }}>
            Cobra, sincroniza y cierra el día sin saltar entre sistemas.
          </p>
        </div>
      </section>

      {/* ── Stack cards — 3 full-screen alternating panel + text ── */}
      <div ref={stackRootRef} className="fs-stack-card-container relative bg-white">
        {/* Block 1 — Cobra rápido (text left, panel right) — bg white, no shadow */}
        <div className="fs-stack-card" style={{ top: 60, zIndex: 1, background: "#FFFFFF" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Cobra rápido
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Tarjeta, efectivo, SPEI o transferencia desde una sola terminal. Tu cliente paga como prefiera, tú cobras siempre.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Cobra con tarjeta, efectivo o SPEI", "Hasta 18 meses sin intereses", "Comprobante digital al instante"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Panel — "Monto a cobrar" payment selection (mirrors the real screen) */}
              <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 26, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
                <p className="text-center font-sora text-[15px] font-medium text-black/70" style={{ marginBottom: 2 }}>Monto a cobrar</p>
                <p className="text-center font-sora text-[44px] font-semibold text-black" style={{ letterSpacing: "-0.02em", marginBottom: 16 }}>$500.00</p>
                <p className="mx-auto text-center font-inter text-[13px] text-black/55" style={{ marginBottom: 18, maxWidth: 280 }}>Elige el método de cobro con el que finalizarás esta venta.</p>
                {[
                  { l: "Tarjeta", d: "M3 7h18v10H3zM3 10h18", hot: true },
                  { l: "Efectivo", d: "M3 6h18v12H3zM7 12h.01M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", hot: false },
                  { l: "Transferencia", d: "M7 7h10l-3-3M17 17H7l3 3", hot: false },
                ].map((m, i) => (
                  <div key={m.l} className={`flex items-center gap-3 py-3.5 ${i < 2 ? "border-b border-black/[0.06]" : ""}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={m.hot ? "#DB3B2B" : "#6B7280"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={m.d} /></svg>
                    <span className={`flex-1 font-inter text-[14px] ${m.hot ? "font-semibold text-black" : "text-black/75"}`}>{m.l}</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Block 2 — Inventario sincronizado (panel left, text right) — bg #F6F6F6 */}
        <div className="fs-stack-card" style={{ top: 80, zIndex: 2, background: "#F6F6F6" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              {/* Panel — sucursal vs online sync */}
              <div className="relative order-2 overflow-hidden rounded-[18px] border border-black/[0.06] bg-white tablet:order-1" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
                  <p className="font-sora text-[14px] font-medium text-black">Inventario en vivo</p>
                  <span className="rounded-full bg-[rgba(34,197,94,0.12)] px-2 py-0.5 font-inter text-[10px] font-bold text-[#16A34A]">Sincronizado</span>
                </div>
                {[
                  { name: "Tenis blancos clásicos", sku: "TBC-042", suc: 24, online: 12 },
                  { name: "Playera básica", sku: "PB-101", suc: 45, online: 42 },
                  { name: "Sudadera hoodie", sku: "SH-220", suc: 12, online: 22 },
                ].map((row, i) => (
                  <div key={row.sku} className={`flex items-center justify-between py-3 ${i < 2 ? "border-b border-black/[0.05]" : ""}`}>
                    <div>
                      <p className="font-inter text-[13px] font-semibold text-black">{row.name}</p>
                      <p className="font-inter text-[11px] text-black/50">{row.sku}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-inter text-[9px] text-black/45">Sucursal</p>
                        <p className="font-sora text-[14px] font-semibold text-black">{row.suc}</p>
                      </div>
                      <div className="h-[24px] w-px bg-black/[0.08]" />
                      <div className="text-right">
                        <p className="font-inter text-[9px] text-black/45">Online</p>
                        <p className="font-sora text-[14px] font-semibold text-black">{row.online}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-3 flex items-center gap-2 rounded-[10px] bg-[rgba(34,197,94,0.08)] px-3 py-2">
                  <span className="h-[6px] w-[6px] rounded-full bg-[#22C55E]" style={{ animation: "pulse-soft 2s ease-in-out infinite" }} />
                  <span className="font-inter text-[11px] font-medium text-[#16A34A]">Última sync hace 2 segundos</span>
                </div>
              </div>

              <div className="order-1 tablet:order-2">
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Inventario sincronizado
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Cada venta en sucursal descuenta stock online en segundos. Adiós sobreventas, hola tranquilidad.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Inventario unificado: tienda física y online", "Transferencias entre sucursales en un click"].map((it) => (
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

        {/* Block 3 — Control de caja (text left, panel right) — bg white */}
        <div className="fs-stack-card" style={{ top: 100, zIndex: 3, background: "#FFFFFF" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Corte de caja
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Control de caja con detalle de cobros, devoluciones y efectivo. Cuadres precisos sin pelear con hojas de cálculo.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Apertura y cierre de turno por vendedor", "Detalle de ingresos y retiros de efectivo", "Saldo en vivo según ventas y movimientos"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Panel — Control de caja (mirrors the real T1pos screen) */}
              <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
                <p className="font-sora text-[14px] font-medium text-black" style={{ marginBottom: 14 }}>Control de caja</p>
                <div className="text-center" style={{ marginBottom: 14 }}>
                  <p className="font-sora text-[30px] font-semibold text-black" style={{ letterSpacing: "-0.02em", lineHeight: 1 }}>$5,234.00</p>
                  <p className="mt-1 font-inter text-[10px] text-black/45">Saldo según ventas y movimientos</p>
                </div>
                <div className="flex gap-2" style={{ marginBottom: 14 }}>
                  <div className="flex flex-1 items-center justify-center rounded-[10px] border border-black/[0.12] py-2 font-inter text-[11px] font-medium text-black/70">Retirar efectivo</div>
                  <div className="flex flex-1 items-center justify-center rounded-[10px] border border-black/[0.12] py-2 font-inter text-[11px] font-medium text-black/70">Ingresar efectivo</div>
                </div>
                <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                  <span className="font-inter text-[11px] font-semibold text-black">Movimientos</span>
                  <span className="font-inter text-[10px] font-medium text-black/45 underline">Ver detalles</span>
                </div>
                <div className="rounded-[10px] border border-black/[0.06] bg-[#FCFCFC] px-3 py-1" style={{ marginBottom: 14 }}>
                  {[
                    { l: "Pagos en efectivo", a: "$2,434.00" },
                    { l: "Devoluciones en efectivo", a: "$2,434.00" },
                    { l: "Ingresos manuales", a: "$0.00" },
                    { l: "Retiros manuales", a: "$2,434.00" },
                    { l: "Pagos con tarjeta", a: "$2,434.00" },
                    { l: "Pago personalizado 1", a: "$540.00" },
                  ].map((m, i) => (
                    <div key={m.l} className={`flex items-center justify-between py-1.5 ${i < 5 ? "border-b border-black/[0.04]" : ""}`}>
                      <span className="font-inter text-[11px] text-black/65">{m.l}</span>
                      <span className="font-inter text-[11px] font-semibold text-black">{m.a}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center rounded-[10px] bg-[#DB3B2B] py-2.5">
                  <span className="font-inter text-[12px] font-semibold text-white">Cerrar caja</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── De carrito a ticket — animated checkout flow ── */}
      <section className="relative overflow-hidden px-5 py-[100px] tablet:px-10 tablet:py-[128px]" style={{ background: "linear-gradient(135deg, #1A1212 0%, #261515 50%, #1A0A0A 100%)" }}>
        <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle at center, rgba(219,59,43,0.16) 0%, transparent 65%)", filter: "blur(50px)" }} />
        <div className="relative mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              De carrito a ticket en segundos
            </h2>
            <p className="font-inter text-[16px] font-light text-white/65 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Agrega productos, cobra y entrega el ticket. Así de rápido cobran tus vendedores.
            </p>
          </div>
          <div data-modal-animate className="mx-auto" style={{ maxWidth: 760 }}>
            {/* Desktop flow on tablet+, the phone flow on mobile */}
            <div className="hidden tablet:block">
              <PosCheckoutScreen />
            </div>
            <div className="mx-auto tablet:hidden" style={{ maxWidth: 270 }}>
              <PosCheckoutMobileScreen />
            </div>
          </div>
          <div data-modal-animate className="mt-12 flex justify-center">
            <a
              href={SIGNUP_URL}
              className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-8 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]"
            >
              Empieza a cobrar
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Multiplataforma ── */}
      <section className="relative bg-white px-5 py-[100px] tablet:px-10 tablet:py-[128px]">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[880px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Tu caja, en cualquier pantalla
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px] tablet:whitespace-nowrap" style={{ lineHeight: 1.55 }}>
              La misma caja en la computadora del mostrador y en el celular de tu equipo en piso.
            </p>
          </div>
          <div data-modal-animate className="mx-auto grid max-w-[920px] grid-cols-1 gap-5 tablet:grid-cols-3">
            {[
              {
                title: "App para iOS y Android",
                desc: "Cobra desde tu celular o tablet, ideal para vender en piso o en eventos.",
                icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></svg>),
              },
              {
                title: "Web de escritorio",
                desc: "La caja completa en la computadora de tu mostrador, lista para operar.",
                icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></svg>),
              },
              {
                title: "Responsive, sin instalar",
                desc: "Se adapta a cualquier pantalla y funciona directo desde el navegador.",
                icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="14" height="10" rx="2" /><rect x="17" y="8" width="5" height="12" rx="1.5" /><path d="M6 18h6" /></svg>),
              },
            ].map((p, i) => (
              <div key={p.title} data-stagger className="flex flex-col items-center rounded-[20px] border border-black/[0.07] bg-white px-7 py-9 text-center" style={{ ["--i" as string]: i, boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
                <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[16px]" style={{ background: "rgba(219,59,43,0.08)", marginBottom: 18 }}>{p.icon}</div>
                <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 8 }}>{p.title}</h3>
                <p className="font-inter text-[14px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Download / open CTAs — heading + two equal-sized cards */}
          <div data-modal-animate className="mx-auto mt-12 max-w-[720px]">
            <p className="text-center font-inter text-[15px] font-medium text-black/65" style={{ marginBottom: 18 }}>
              Descarga la app o ábrela en la web
            </p>
            <div className="grid grid-cols-1 items-stretch gap-5 tablet:grid-cols-2">
              {/* Card 1 — Descarga la app (un QR por plataforma) */}
              <div className="flex flex-col items-center justify-center rounded-[20px] border border-black/[0.08] bg-white px-7 py-8" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
                <div className="flex items-start justify-center gap-6">
                  {[
                    { label: "iOS", logo: (<svg width="14" height="14" viewBox="0 0 24 24" fill="#111827"><path d="M17.6 7.1c-.9.05-2 .6-2.6 1.3-.6.6-1.1 1.6-.9 2.5 1 .08 2-.5 2.6-1.2.6-.7 1-1.7.9-2.6zM19 16.8c-.3.8-.5 1.1-.9 1.8-.6.9-1.4 2-2.4 2-.9 0-1.1-.6-2.3-.6-1.2 0-1.5.6-2.3.6-1 0-1.7-1-2.3-1.9-1.7-2.5-1.9-5.5-.8-7 .8-1.1 2-1.7 3.1-1.7 1.2 0 1.9.6 2.9.6.9 0 1.5-.6 2.9-.6 1 0 2.1.6 2.9 1.5-2.6 1.4-2.2 5.1.5 5.7z" /></svg>) },
                    { label: "Android", logo: (<svg width="14" height="14" viewBox="0 0 24 24"><path d="M3.6 2.3l11 9.7-11 9.7c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1z" fill="#4285F4" /><path d="M16.8 9.1l-2.2 2.9 2.2 2.9 3.5-2c.7-.4.7-1.4 0-1.8l-3.5-2z" fill="#FBBC04" /><path d="M14.6 12l-11 9.7c.4.2.9.2 1.3 0l11.9-6.8-2.2-2.9z" fill="#34A853" /><path d="M14.6 12l2.2-2.9L4.9 2.3c-.4-.2-.9-.2-1.3 0l11 9.7z" fill="#EA4335" /></svg>) },
                  ].map((q) => (
                    <div key={q.label} className="flex flex-col items-center">
                      <div className="flex h-[92px] w-[92px] items-center justify-center rounded-[14px] border border-black/[0.10] bg-white" style={{ padding: 9 }}>
                        <svg width="74" height="74" viewBox="0 0 56 56" fill="#111827" aria-label={`QR ${q.label}`}>
                          <path d="M0 0h20v20H0zM4 4v12h12V4zM7 7h6v6H7z" />
                          <path d="M36 0h20v20H36zM40 4v12h12V4zM43 7h6v6h-6z" />
                          <path d="M0 36h20v20H0zM4 40v12h12V40zM7 43h6v6H7z" />
                          <path d="M24 0h4v4h-4zM30 0h2v6h-6V4h4zM24 8h6v4h-4v4h-2zM32 8h4v4h-4zM24 16h8v4h-4v-2h-4z" />
                          <path d="M36 24h4v4h-4zM44 24h4v8h-4v-4h-4v-2h4zM50 24h6v4h-4v2h-2zM36 32h6v4h-2v4h-4zM44 36h4v4h4v4h-8zM52 32h4v8h-4zM24 24h6v4h-2v2h-4zM24 32h4v4h4v4h-8zM30 40h6v4h-4v4h-2zM36 48h8v4h-8zM48 48h8v4h-8z" />
                        </svg>
                      </div>
                      <div className="mt-2.5 flex items-center gap-1.5">
                        {q.logo}
                        <span className="font-inter text-[12.5px] font-semibold text-black">{q.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2 — Versión web (black line icon, no background) */}
              <a href={SIGNUP_URL} className="flex flex-col items-center justify-center rounded-[20px] border border-black/[0.08] bg-white px-7 py-8 text-center no-underline transition-colors hover:border-black/25" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5" style={{ marginBottom: 18 }}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18" strokeLinecap="round" /></svg>
                <p className="font-inter text-[13px] text-black/55" style={{ marginBottom: 18, maxWidth: 230 }}>Visítalo en web desde cualquier dispositivo</p>
                <span className="inline-flex items-center gap-1.5 rounded-[11px] bg-black px-5 py-2.5 font-inter text-[13px] font-semibold text-white">
                  Ir a la versión web
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lo que incluye ── */}
      <section className="relative bg-[#F6F6F6] px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Todo lo que necesita tu sucursal
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Una sola plataforma, todo lo que tu equipo en piso necesita.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {[
              { title: "Lector de código", desc: "Escaneo rápido por código de barras o QR.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 5v14 M7 5v14 M11 5v14 M15 5v14 M19 5v14 M21 5v14" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Tickets digitales", desc: "Envía recibos por WhatsApp o email al instante.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 3h14a2 2 0 0 1 2 2v14l-3-3H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="#111827" strokeWidth="1.6" strokeLinejoin="round" /><path d="M8 9h8 M8 13h5" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Promociones", desc: "Cupones, 2x1 y descuentos directo en caja.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 11.5V7l-9-4-9 4v9l9 4 9-4v-1.5" stroke="#111827" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="14" cy="14" r="2" stroke="#111827" strokeWidth="1.6" /></svg>) },
              { title: "Multi-vendedor", desc: "Cuentas por colaborador con permisos y reportes.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="#111827" strokeWidth="1.6" /><circle cx="17" cy="9" r="2.5" stroke="#111827" strokeWidth="1.6" /><path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6 M14 14a5 5 0 0 1 7 5" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Devoluciones", desc: "Procesa cambios y reembolsos sin fricción.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 1 0 3-6.7 M3 4v5h5" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
            ].map((f, i) => (
              <div key={f.title} data-stagger className="tienda-card flex items-start gap-4 rounded-[16px] border border-black/[0.06] bg-white p-6" style={{ ["--i" as string]: i }}>
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center">{f.icon}</div>
                <div>
                  <h3 className="font-sora text-[16px] font-normal text-black" style={{ marginBottom: 4 }}>{f.title}</h3>
                  <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ecosistema T1 ── */}
      <section className="relative bg-[#F6F6F6] px-5 py-[100px] tablet:px-10 tablet:py-[128px]">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[700px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Tu caja es parte del ecosistema T1
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              T1pos se conecta con toda tu operación: tienda en línea, pagos y envíos, en una sola plataforma.
            </p>
          </div>
          <div data-modal-animate className="relative mx-auto flex max-w-[760px] flex-wrap items-start justify-center gap-x-7 gap-y-8 tablet:gap-x-12">
            <div aria-hidden className="pointer-events-none absolute left-[10%] right-[10%] top-[34px] hidden h-px tablet:block" style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.12) 14%, rgba(0,0,0,0.12) 86%, transparent)" }} />
            {[
              { name: "Tienda en línea", img: "/img/icon-tienda.svg" },
              { name: "Pagos", img: "/img/icon-pagos.svg" },
              { name: "T1pos", pos: true },
              { name: "Envíos", img: "/img/icon-envios.svg" },
              { name: "Score", img: "/img/icon-score.svg" },
            ].map((n, i) => (
              <div key={n.name} data-stagger className="relative flex w-[92px] flex-col items-center" style={{ ["--i" as string]: i }}>
                {n.pos ? (
                  <div className="flex h-[68px] w-[68px] items-center justify-center rounded-[20px] bg-[#DB3B2B]" style={{ boxShadow: "0 12px 26px rgba(219,59,43,0.30)" }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2l-2 4v13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6l-2-4z" /><path d="M4 6h16M15.5 10a3.5 3.5 0 0 1-7 0" /></svg>
                  </div>
                ) : (
                  <div className="flex h-[68px] w-[68px] items-center justify-center rounded-[20px] border border-black/[0.07] bg-white" style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.05)" }}>
                    <Image src={n.img!} alt="" width={34} height={34} />
                  </div>
                )}
                <span className={`mt-3 text-center font-inter text-[13px] ${n.pos ? "font-semibold text-black" : "text-black/65"}`}>{n.name}</span>
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
            <div data-stagger style={{ ["--i" as string]: 0 }}><CountStat end={30} prefix="<" suffix="s" label="por venta promedio" /></div>
            <div data-stagger style={{ ["--i" as string]: 1 }}><CountStat end={6} prefix="+" label="métodos de pago aceptados" /></div>
            <div data-stagger style={{ ["--i" as string]: 2 }}>
              <p className="font-sora text-[36px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1 }}>24/7</p>
              <p className="font-inter text-[12px] font-light text-white/55 tablet:text-[13px]">soporte en español</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Planes (POS-relevant: usuarios + sucursales) ── */}
      <section className="relative bg-white px-5 py-[100px] tablet:px-10 tablet:py-[128px]">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Un plan para cada operación
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Suma usuarios y sucursales conforme tu tienda crece. El punto de venta está incluido en todos.
            </p>
          </div>
          <div data-modal-animate className="mx-auto grid max-w-[980px] grid-cols-1 items-stretch gap-5 tablet:grid-cols-3">
            {[
              {
                name: "Inicia", price: "$0", users: "1 usuario", branches: "1 sucursal", featured: false,
                features: ["Caja con cobros en tarjeta, efectivo y SPEI", "Inventario sincronizado con tu tienda en línea", "Control y corte de caja"],
              },
              {
                name: "Crece", price: "$399", users: "5 usuarios", branches: "3 sucursales", featured: true,
                features: ["Todo lo de Inicia", "Roles y permisos por usuario", "Reportes de ventas por sucursal"],
              },
              {
                name: "Pro", price: "$899", users: "Usuarios ilimitados", branches: "Sucursales ilimitadas", featured: false,
                features: ["Todo lo de Crece", "Administración multisucursal", "Soporte prioritario"],
              },
            ].map((p, i) => (
              <div
                key={p.name}
                data-stagger
                className={`relative flex flex-col rounded-[20px] p-7 ${p.featured ? "border-2 border-[#DB3B2B] bg-white" : "border border-black/[0.08] bg-white"}`}
                style={{ ["--i" as string]: i, boxShadow: p.featured ? "0 18px 50px rgba(219,59,43,0.12)" : "0 4px 20px rgba(0,0,0,0.04)" }}
              >
                {p.featured && (
                  <span className="absolute right-6 top-7 rounded-full bg-[rgba(219,59,43,0.10)] px-2.5 py-1 font-inter text-[11px] font-bold text-[#DB3B2B]">Recomendado</span>
                )}
                <p className="font-sora text-[18px] font-medium text-black" style={{ marginBottom: 10 }}>{p.name}</p>
                <div className="flex items-end gap-1" style={{ marginBottom: 20 }}>
                  <span className="font-sora text-[40px] font-light text-black" style={{ letterSpacing: "-0.03em", lineHeight: 1 }}>{p.price}</span>
                  <span className="font-inter text-[14px] text-black/50" style={{ marginBottom: 4 }}>/mes</span>
                </div>
                {/* usuarios + sucursales (the POS-relevant dimensions) */}
                <div className="flex flex-col gap-2.5 rounded-[14px] bg-[#FAFAF9] p-4" style={{ marginBottom: 20 }}>
                  <div className="flex items-center gap-2.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DB3B2B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.4" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>
                    <span className="font-inter text-[14px] font-semibold text-black">{p.users}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DB3B2B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l1.5-5h15L21 9M4 9v10h16V9M4 9h16M9 19v-5h6v5" /></svg>
                    <span className="font-inter text-[14px] font-semibold text-black">{p.branches}</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-2.5" style={{ marginBottom: 24 }}>
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 font-inter text-[13px] text-black/65">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={SIGNUP_URL}
                  className={`mt-auto inline-flex items-center justify-center rounded-[12px] px-6 py-3 font-inter text-[14px] font-semibold no-underline transition-colors duration-150 ${p.featured ? "bg-[#DB3B2B] text-white hover:bg-[#C0332A]" : "border border-black/15 text-black hover:border-black/35"}`}
                >
                  Comenzar
                </a>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 text-center font-inter text-[13px] font-light text-black/45" style={{ maxWidth: 560 }}>
            Precios de referencia. Consulta los planes y límites vigentes en t1.com.
          </p>
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
              { q: "¿Funciona sin conexión a internet?", a: "Sí. El POS opera offline y sincroniza ventas e inventario en cuanto recupera conexión." },
              { q: "¿Necesito hardware especial?", a: "No. Funciona en tus dispositivos Android, iPhone, iPad y navegador web." },
              { q: "¿Cómo se actualiza el inventario?", a: "Cada venta en sucursal descuenta inventario en tiempo real. Sin acciones manuales." },
              { q: "¿Cuánto tarda en operar mi sucursal?", a: "Configuración inicial en menos de un día. Capacitación a tu equipo incluida." },
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
        title="¿Listo para vender en piso?"
        description="Activa tu punto de venta hoy. Conecta caja, inventario y reportes en una sola plataforma."
      />
    </div>
  );
}
