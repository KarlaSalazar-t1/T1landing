"use client";

import { useEffect, useRef } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { useFSStackCards } from "@/hooks/useFSStackCards";
import T1FinalCTA from "@/components/T1FinalCTA";
import { PosDesktopScreen, PosMobileScreen } from "@/components/showcase/PosMockups";

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
                Tu tienda física y online,{" "}
                <span className="relative inline-block">
                  en la misma caja.
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.30)", borderRadius: 5, zIndex: -1 }} />
                </span>
              </h1>
              <p
                className="font-inter text-[16px] font-light text-white/65 tablet:text-[19px]"
                style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}
              >
                Punto de venta listo para cobrar con tarjeta, efectivo o SPEI. Inventario sincronizado con tu tienda online y control de caja al cierre.
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

              {/* Sync pill bridging the two devices */}
              <div className="absolute hidden tablet:flex items-center gap-2 rounded-full bg-white" style={{ left: -16, bottom: 28, padding: "8px 14px", zIndex: 3, boxShadow: "0 10px 28px rgba(0,0,0,0.18)" }}>
                <span className="h-[8px] w-[8px] rounded-full bg-[#22C55E]" style={{ animation: "pulse-soft 2s ease-in-out infinite" }} />
                <span className="font-inter text-[11px] font-semibold text-black">Sincronizado online</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2 — Antes (single-line) ── */}
      <section className="relative bg-[#F6F6F6] px-5 pt-16 pb-12 tablet:px-10 tablet:pt-20 tablet:pb-16" data-white-card>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[26px] font-light text-black tablet:text-[34px] lg:text-[40px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>
              Caja, inventario y reportes <em className="not-italic text-black/40">no deberían vivir aparte.</em>
            </h2>
          </div>

          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
            {[
              { title: "Sobreventas", desc: "Vendes algo que ya no tenías. Tu cliente reclama y pierdes la confianza." },
              { title: "Cierres a mano", desc: "Hojas de cálculo para cuadrar caja al final del día. Errores y horas perdidas." },
              { title: "Datos que no cuadran", desc: "POS por un lado, e-commerce por otro, contabilidad por otro. Nunca coincide." },
            ].map((p, i) => (
              <div
                key={p.title}
                data-stagger
                className="rounded-[18px] border border-black/[0.06] bg-white p-7 transition-shadow duration-200 hover:shadow-[0_0_25px_2px_rgba(0,0,0,0.04)]"
                style={{ ["--i" as string]: i }}
              >
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
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Cobra rápido en cualquier método
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Tarjeta, efectivo, SPEI o transferencia desde una sola terminal. Tu cliente paga como prefiera, tú cobras siempre.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Lectura de tarjeta NFC y chip", "Comprobante digital o impreso", "Hasta 18 meses sin intereses"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Panel — POS terminal */}
              <div className="relative overflow-hidden rounded-[18px] bg-[#0F1015]" style={{ padding: 24, boxShadow: "0 16px 50px rgba(0,0,0,0.18)", fontFamily: "Inter, sans-serif" }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
                  <span className="font-inter text-[11px] font-medium text-white/55">Sucursal Centro</span>
                  <span className="rounded-full bg-[rgba(34,197,94,0.18)] px-2.5 py-1 text-[10px] font-bold text-[#22C55E]">En línea</span>
                </div>
                <div className="rounded-[12px] bg-white" style={{ padding: "18px 20px" }}>
                  <p className="text-[12px] font-medium text-[#828282]">Total a cobrar</p>
                  <p className="font-sora text-[40px] font-light text-[#4c4c4c]" style={{ lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 4 }}>$1,345.99</p>
                  <p className="text-[11px] text-[#828282]" style={{ marginBottom: 12 }}>3 productos · Tenis blancos clásicos</p>
                  <div className="flex gap-2" style={{ marginBottom: 8 }}>
                    {["Tarjeta", "Efectivo", "SPEI"].map((m, i) => (
                      <div key={m} className={`flex flex-1 items-center justify-center rounded-[8px] py-2 text-[11px] font-semibold ${i === 0 ? "border border-[#DB3B2B] bg-[rgba(219,59,43,0.06)] text-[#DB3B2B]" : "border border-black/[0.08] text-black/55"}`}>{m}</div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center rounded-[8px] bg-[#DB3B2B] py-2.5">
                    <span className="font-inter text-[12px] font-semibold text-white">Cobrar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Block 2 — Inventario sincronizado (panel left, text right) — bg #F6F6F6 */}
        <div className="fs-stack-card" style={{ top: 80, zIndex: 2, background: "#F6F6F6", boxShadow: "0 -4px 30px rgba(0,0,0,0.18)" }}>
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
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Inventario que se actualiza al instante
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Cada venta en sucursal descuenta stock online en segundos. Adiós sobreventas, hola tranquilidad.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Stock unificado tienda física + online", "Alertas de bajo stock por sucursal", "Transferencias entre sucursales en un click"].map((it) => (
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
        <div className="fs-stack-card" style={{ top: 100, zIndex: 3, background: "#FFFFFF", boxShadow: "0 -4px 30px rgba(0,0,0,0.18)" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Cierra turno con un click
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Control de caja con detalle de cobros, devoluciones y efectivo. Cuadres precisos sin pelear con hojas de cálculo.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Apertura y cierre de turno por vendedor", "Detalle de ingresos y retiros de efectivo", "Reporte por sucursal y por método de pago"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Panel — control de caja */}
              <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
                  <p className="font-sora text-[14px] font-medium text-black">Cierre de caja · Hoy</p>
                  <span className="rounded-full bg-black/[0.05] px-2 py-0.5 font-inter text-[10px] font-medium text-black/60">Sucursal Centro</span>
                </div>
                <div className="rounded-[12px] border border-black/[0.05] bg-[#FAFAF9]" style={{ padding: "16px 18px", marginBottom: 12 }}>
                  <p className="font-inter text-[10px] text-black/45">Total cobrado</p>
                  <p className="font-sora text-[28px] font-light text-black" style={{ letterSpacing: "-0.025em", lineHeight: 1, marginBottom: 4 }}>$48,250.00</p>
                  <p className="font-inter text-[11px] text-[#16A34A] font-bold">42 ventas · 8 horas operadas</p>
                </div>
                <div className="grid grid-cols-2 gap-2" style={{ marginBottom: 12 }}>
                  <div className="flex items-center gap-3 rounded-[10px] bg-[rgba(34,197,94,0.06)] px-3 py-2.5">
                    <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[rgba(34,197,94,0.14)]">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 13V3M8 3L4 7M8 3L12 7" stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div>
                      <p className="font-inter text-[9px] text-black/50">Efectivo ingresado</p>
                      <p className="font-inter text-[12px] font-bold text-black">+$8,420.00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-[10px] bg-[rgba(219,59,43,0.06)] px-3 py-2.5">
                    <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[rgba(219,59,43,0.12)]">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 3V13M8 13L4 9M8 13L12 9" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div>
                      <p className="font-inter text-[9px] text-black/50">Efectivo retirado</p>
                      <p className="font-inter text-[12px] font-bold text-black">−$1,250.00</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  {[
                    { label: "Tarjeta", amount: "$32,180", pct: 67 },
                    { label: "Efectivo", amount: "$11,420", pct: 24 },
                    { label: "SPEI", amount: "$4,650", pct: 9 },
                  ].map((m) => (
                    <div key={m.label} className="flex items-center gap-3 rounded-[8px] bg-[#FAFAF9] px-3 py-2">
                      <span className="font-inter text-[11px] text-black/65 w-[60px]">{m.label}</span>
                      <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-black/[0.05]">
                        <div className="h-full rounded-full bg-[#DB3B2B]" style={{ width: `${m.pct}%` }} />
                      </div>
                      <span className="font-inter text-[11px] font-semibold text-black w-[64px] text-right">{m.amount}</span>
                    </div>
                  ))}
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
              De carrito a ticket en menos de 30 segundos
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Diseñado para que tus vendedores cobren rápido sin equivocarse.
            </p>
          </div>
          <div data-modal-animate className="relative grid grid-cols-1 gap-5 tablet:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div aria-hidden className="pointer-events-none absolute hidden lg:block" style={{ left: "12.5%", right: "12.5%", top: 30, height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(219,59,43,0.25) 12%, rgba(219,59,43,0.25) 88%, transparent 100%)" }} />
            {[
              { n: "01", title: "Escanea o busca", desc: "Lector de código o búsqueda rápida por nombre o SKU." },
              { n: "02", title: "Ajusta y aplica", desc: "Aplica descuentos, MSI o cupones en un click." },
              { n: "03", title: "Cobra al cliente", desc: "Tarjeta, efectivo, SPEI o partido en varios métodos." },
              { n: "04", title: "Imprime o envía", desc: "Ticket impreso o digital al WhatsApp del cliente." },
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
              Todo lo que necesita tu sucursal
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Una sola plataforma, todo lo que tu equipo en piso necesita.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {[
              { title: "Lector de código", desc: "Escaneo rápido por código de barras o QR.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 5v14 M7 5v14 M11 5v14 M15 5v14 M19 5v14 M21 5v14" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Tickets digitales", desc: "Envía recibos por WhatsApp o email al instante.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 3h14a2 2 0 0 1 2 2v14l-3-3H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="#DB3B2B" strokeWidth="1.6" strokeLinejoin="round" /><path d="M8 9h8 M8 13h5" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Promociones", desc: "Cupones, 2x1 y descuentos directo en caja.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 11.5V7l-9-4-9 4v9l9 4 9-4v-1.5" stroke="#DB3B2B" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="14" cy="14" r="2" stroke="#DB3B2B" strokeWidth="1.6" /></svg>) },
              { title: "Multi-vendedor", desc: "Cuentas por colaborador con permisos y reportes.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="#DB3B2B" strokeWidth="1.6" /><circle cx="17" cy="9" r="2.5" stroke="#DB3B2B" strokeWidth="1.6" /><path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6 M14 14a5 5 0 0 1 7 5" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Devoluciones", desc: "Procesa cambios y reembolsos sin fricción.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 1 0 3-6.7 M3 4v5h5" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Reportes por sucursal", desc: "Compara ventas, vendedores y métodos en vivo.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 21h18" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" /><rect x="5" y="12" width="3.5" height="7" rx="1" stroke="#DB3B2B" strokeWidth="1.6" /><rect x="10.5" y="8" width="3.5" height="11" rx="1" stroke="#DB3B2B" strokeWidth="1.6" /><rect x="16" y="4" width="3.5" height="15" rx="1" stroke="#DB3B2B" strokeWidth="1.6" /></svg>) },
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
            <div data-stagger style={{ ["--i" as string]: 0 }}><CountStat end={30} prefix="<" suffix="s" label="por venta promedio" /></div>
            <div data-stagger style={{ ["--i" as string]: 1 }}><CountStat end={6} prefix="+" label="métodos de pago aceptados" /></div>
            <div data-stagger style={{ ["--i" as string]: 2 }}>
              <p className="font-sora text-[36px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1 }}>24/7</p>
              <p className="font-inter text-[12px] font-light text-white/55 tablet:text-[13px]">soporte en español</p>
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
              { q: "¿Funciona sin conexión a internet?", a: "Sí. El POS opera offline y sincroniza ventas e inventario en cuanto recupera conexión." },
              { q: "¿Necesito hardware especial?", a: "Funciona en tablet, PC o terminal POS. Te ayudamos a elegir el equipo según tu volumen." },
              { q: "¿Cómo se actualiza el inventario online?", a: "Cada venta en sucursal descuenta stock online en tiempo real. Sin acciones manuales." },
              { q: "¿Puedo emitir factura desde el POS?", a: "Sí. Facturación CFDI 4.0 directo desde la caja con datos del cliente." },
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
