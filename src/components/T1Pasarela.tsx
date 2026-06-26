"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { useFSStackCards } from "@/hooks/useFSStackCards";
import T1FinalCTA from "@/components/T1FinalCTA";
import { CheckoutHeroScreen, PagoFlowScreen } from "@/components/showcase/PagoMockups";

/* ── Animated count stat (white-on-dark, used in stats strip) ── */
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

export default function T1Pasarela() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stackRootRef = useRef<HTMLDivElement>(null);

  // Drive the full-screen stack-card scale/dim effect (3 alternating blocks).
  useFSStackCards(stackRootRef);

  // Scroll-triggered reveal — same pattern as ProductModal/Tienda landing
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
      {/* ── Hero — text left, checkout mock right ── */}
      <section
        className="relative overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-36 tablet:pb-24"
        style={{ background: "linear-gradient(135deg, #1A1212 0%, #261515 50%, #1A0A0A 100%)" }}
      >
        {/* Ambient red glow */}
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(219,59,43,0.15) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div className="relative mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] tablet:gap-12">
            {/* Left — title + CTA */}
            <div>
              <h1
                className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[60px]"
                style={{ lineHeight: 1.05, letterSpacing: "-1.7px", marginBottom: 22 }}
              >
                Cobra más,{" "}
                <span className="relative inline-block">
                  pierde menos
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.30)", borderRadius: 5, zIndex: -1 }} />
                </span>
                .
              </h1>
              <p
                className="font-inter text-[16px] font-light text-white/65 tablet:text-[19px]"
                style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}
              >
                Pasarela diseñada para convertir: enrutamiento inteligente, antifraude y +10 métodos de pago en un solo checkout.
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

            {/* Right — checkout screen mock */}
            <div className="relative mx-auto w-full" style={{ maxWidth: 580 }}>
              <CheckoutHeroScreen />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2 — Antes vs Hoy compact transition ── */}
      <section className="relative bg-white px-5 pt-16 pb-12 tablet:px-10 tablet:pt-20 tablet:pb-16" data-white-card>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[760px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Cada checkout abandonado es venta perdida.
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55, maxWidth: 580, margin: "0 auto" }}>
              Tarjetas declinadas, métodos limitados y formularios largos cuestan ventas todos los días.
            </p>
          </div>

          <div data-modal-animate className="mx-auto grid max-w-[820px] grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
            {[
              { stat: "1 de 4", label: "compras se abandona en el checkout" },
              { stat: "12%", label: "de tarjetas se declinan en LATAM" },
              { stat: "70%", label: "prefiere pagar con métodos locales" },
            ].map((s, i) => (
              <div
                key={s.label}
                data-stagger
                className="rounded-[18px] border border-black/[0.06] bg-white p-7 transition-shadow duration-200 hover:shadow-[0_0_25px_2px_rgba(0,0,0,0.04)]"
                style={{ ["--i" as string]: i }}
              >
                <p className="font-sora text-[36px] font-light text-black/80" style={{ letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 8 }}>{s.stat}</p>
                <p className="font-inter text-[14px] font-light text-black/55" style={{ lineHeight: 1.55 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3 — Header for stack cards ── */}
      <section className="relative bg-white px-5 pt-12 pb-8 tablet:px-10 tablet:pt-16 tablet:pb-10">
        <div data-modal-animate className="mx-auto max-w-[760px] text-center">
          <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 16 }}>
            Una pasarela diseñada para convertir.
          </h2>
          <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[19px]" style={{ lineHeight: 1.5 }}>
            Cada detalle pensado para que más clientes terminen de comprar.
          </p>
        </div>
      </section>

      {/* ── Section 3b — 3 full-screen stack cards (panel + text alternating) ── */}
      <div ref={stackRootRef} className="fs-stack-card-container relative bg-white">
        {/* Block 1 — Métodos de pago (text left, panel right) — bg white, no shadow */}
        <div
          className="fs-stack-card"
          style={{ top: 60, zIndex: 1, background: "#FFFFFF" }}
        >
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Todos los métodos de pago
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Tarjetas, transferencia, efectivo y wallets. Tu cliente paga como prefiera, tú cobras siempre desde un solo lugar.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Visa, Mastercard, AMEX y débito", "SPEI, transferencias y OXXO", "Meses sin intereses hasta 18 MSI"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
                <p className="font-sora text-[14px] font-medium text-black" style={{ marginBottom: 16 }}>Métodos disponibles</p>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { name: "Visa", color: "#1A1F71" },
                    { name: "Mastercard", color: "#EB001B", icon: "circle" },
                    { name: "AMEX", color: "#016FD0" },
                    { name: "OXXO", color: "#E10E0E" },
                    { name: "SPEI", color: "#0A6FB4" },
                    { name: "MSI 18x", color: "#DB3B2B", badge: true },
                  ].map((m) => (
                    <div key={m.name} className="flex h-[64px] items-center justify-center rounded-[10px] border border-black/[0.06] bg-[#FAFAF9]">
                      {m.icon === "circle" ? (
                        <div className="flex items-center">
                          <span className="h-[16px] w-[16px] rounded-full" style={{ background: "#EB001B", marginRight: -6 }} />
                          <span className="h-[16px] w-[16px] rounded-full" style={{ background: "#F79E1B", opacity: 0.85 }} />
                        </div>
                      ) : m.badge ? (
                        <span className="rounded-[6px] bg-[rgba(219,59,43,0.10)] px-2 py-1 font-inter text-[10px] font-bold" style={{ color: m.color }}>{m.name}</span>
                      ) : (
                        <span className="font-sora text-[12px] font-bold tracking-wide" style={{ color: m.color }}>{m.name}</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-center rounded-[10px] border border-dashed border-black/[0.12] py-2.5">
                  <span className="font-inter text-[11px] text-black/45">+ 4 métodos más</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Block 2 — Enrutamiento (panel left, text right) — bg #F6F6F6 */}
        <div
          className="fs-stack-card"
          style={{ top: 80, zIndex: 2, background: "#F6F6F6" }}
        >
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div className="relative order-2 overflow-hidden rounded-[18px] border border-black/[0.06] bg-white tablet:order-1" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
                <p className="font-sora text-[14px] font-medium text-black" style={{ marginBottom: 16 }}>Enrutamiento por procesador</p>
                <div className="relative" style={{ minHeight: 220 }}>
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 220" fill="none" preserveAspectRatio="xMidYMid meet">
                    <line x1="40" y1="110" x2="180" y2="60" stroke="rgba(219,59,43,0.35)" strokeWidth="1.5" strokeDasharray="4 4" />
                    <line x1="40" y1="110" x2="180" y2="110" stroke="#DB3B2B" strokeWidth="2" />
                    <line x1="40" y1="110" x2="180" y2="160" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                    <line x1="280" y1="60" x2="360" y2="110" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                    <line x1="280" y1="110" x2="360" y2="110" stroke="#DB3B2B" strokeWidth="2" />
                    <line x1="280" y1="160" x2="360" y2="110" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                    <circle r="4" fill="#DB3B2B"><animateMotion dur="2s" repeatCount="indefinite" path="M40 110 L180 110 L280 110 L360 110" /></circle>
                  </svg>
                  <div className="absolute flex h-[40px] w-[40px] items-center justify-center rounded-[10px] border border-black/[0.08] bg-white" style={{ left: 4, top: 90, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="#DB3B2B" strokeWidth="1.6" /><path d="M3 10h18" stroke="#DB3B2B" strokeWidth="1.6" /></svg>
                  </div>
                  {[
                    { y: 40, name: "Procesador A", subtitle: "Aprobación 88%", dim: true },
                    { y: 90, name: "Procesador B", subtitle: "Aprobación 96%", dim: false },
                    { y: 140, name: "Procesador C", subtitle: "Aprobación 79%", dim: true },
                  ].map((p) => (
                    <div
                      key={p.name}
                      className={`absolute flex w-[100px] flex-col items-center justify-center rounded-[10px] border bg-white px-2 py-2 ${p.dim ? "border-black/[0.06] opacity-50" : "border-[#DB3B2B]"}`}
                      style={{ left: 180, top: p.y, boxShadow: p.dim ? "none" : "0 4px 14px rgba(219,59,43,0.18)" }}
                    >
                      <p className="font-inter text-[10px] font-semibold text-black">{p.name}</p>
                      <p className="font-inter text-[8px] text-black/50">{p.subtitle}</p>
                    </div>
                  ))}
                  <div className="absolute flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-[rgba(34,197,94,0.10)]" style={{ right: 4, top: 90 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 21h18 M5 10v8 M9 10v8 M15 10v8 M19 10v8 M3 10l9-6 9 6v0 H3z" stroke="#16A34A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 rounded-[10px] bg-[rgba(34,197,94,0.08)] px-3 py-2">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="font-inter text-[11px] font-medium text-[#16A34A]">+24% de aprobación con enrutamiento</span>
                </div>
              </div>

              <div className="order-1 tablet:order-2">
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Más pagos aprobados
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  T1 dirige cada transacción al procesador con mayor probabilidad de aprobación. Sin que tu cliente lo note.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Reintentos automáticos en otro procesador", "Optimiza por banco emisor, monto y país", "Reduce declinaciones hasta un 24%"].map((it) => (
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

        {/* Block 3 — Antifraude (text left, panel right) — bg white */}
        <div
          className="fs-stack-card"
          style={{ top: 100, zIndex: 3, background: "#FFFFFF" }}
        >
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Antifraude inteligente
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Score de riesgo por transacción con T1 Score. Detiene fraude real sin bloquear clientes legítimos.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Análisis de +200 señales por transacción", "Decisión en menos de 100ms", "3D Secure cuando lo necesitas"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
                  <p className="font-sora text-[14px] font-medium text-black">Análisis de riesgo</p>
                  <span className="rounded-full bg-[rgba(34,197,94,0.12)] px-2 py-0.5 font-inter text-[10px] font-bold text-[#16A34A]">Bajo riesgo</span>
                </div>
                <div className="flex items-center gap-5" style={{ marginBottom: 16 }}>
                  <div className="relative flex h-[90px] w-[90px] shrink-0 items-center justify-center">
                    <svg width="90" height="90" viewBox="0 0 90 90" className="absolute inset-0 -rotate-90">
                      <circle cx="45" cy="45" r="38" stroke="rgba(0,0,0,0.06)" strokeWidth="6" fill="none" />
                      <circle cx="45" cy="45" r="38" stroke="#22C55E" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray={`${(94/100)*238.76} 238.76`} />
                    </svg>
                    <div className="text-center">
                      <p className="font-sora text-[24px] font-light text-black" style={{ lineHeight: 1, letterSpacing: "-0.02em" }}>94</p>
                      <p className="font-inter text-[8px] font-medium text-black/45">/100</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-inter text-[10px] text-black/45" style={{ marginBottom: 2 }}>Transacción</p>
                    <p className="font-inter text-[12px] font-semibold text-black">$1,345.99 · Visa •• 4242</p>
                    <p className="font-inter text-[10px] text-black/55">Decisión en 87ms</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  {[
                    "Identidad verificada",
                    "IP coherente con dirección",
                    "Histórico positivo del cliente",
                    "Velocidad de transacciones normal",
                  ].map((label) => (
                    <div key={label} className="flex items-center gap-2 rounded-[8px] bg-[#FAFAF9] px-2.5 py-1.5">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span className="font-inter text-[11px] text-black/70">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Pago con T1 — express checkout button (dark) ── */}
      <section className="relative overflow-hidden px-5 py-[100px] tablet:px-10 tablet:py-[128px]" style={{ background: "linear-gradient(135deg, #1A1212 0%, #261515 50%, #1A0A0A 100%)" }}>
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-[440px] w-[440px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(219,59,43,0.16) 0%, transparent 65%)", filter: "blur(50px)" }} />
        <div className="relative mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-12 tablet:grid-cols-2 tablet:gap-16">
            {/* Left — copy */}
            <div data-modal-animate>
              <h2 className="font-sora text-[28px] font-light text-white tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 16 }}>
                Compra en un toque, en cualquier negocio
              </h2>
              <p className="font-inter text-[16px] font-light text-white/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 28, maxWidth: 480 }}>
                El botón de pago express de T1. Tus clientes guardan sus datos una sola vez y vuelven a comprar al instante en todo el ecosistema. Menos fricción, más conversión.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Guardan tarjeta y dirección una sola vez",
                  "Vuelven a pagar con un toque, sin teclear de nuevo",
                  "Funciona en cualquier negocio que use T1",
                ].map((it) => (
                  <li key={it} className="flex items-start gap-3 font-inter text-[15px] text-white/75">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0"><circle cx="12" cy="12" r="11" fill="rgba(219,59,43,0.22)" /><path d="M7 12.5L10.5 16L17 8.5" stroke="#FF7363" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {it}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — animated Pago con T1 flow */}
            <div data-modal-animate className="relative mx-auto w-full" style={{ maxWidth: 560 }}>
              <PagoFlowScreen />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4 — Cómo funciona (4 steps) ── */}
      <section className="relative bg-[#F6F6F6] px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              De carrito a cobro, sin fricción
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Cuatro pasos invisibles para tu cliente, optimizados detrás de cada compra.
            </p>
          </div>

          <div data-modal-animate className="relative grid grid-cols-1 gap-5 tablet:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div aria-hidden className="pointer-events-none absolute hidden lg:block" style={{ left: "12.5%", right: "12.5%", top: 30, height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(219,59,43,0.25) 12%, rgba(219,59,43,0.25) 88%, transparent 100%)" }} />
            {[
              { n: "01", title: "Cliente paga", desc: "Elige método y completa el formulario optimizado para conversión." },
              { n: "02", title: "Antifraude evalúa", desc: "Score en menos de 100ms con +200 señales y machine learning." },
              { n: "03", title: "Routing inteligente", desc: "T1 dirige al procesador con mayor probabilidad de aprobación." },
              { n: "04", title: "Pago aprobado", desc: "Confirmación al cliente y al panel. Conciliación automática." },
            ].map((s, i) => (
              <div
                key={s.n}
                data-stagger
                className="tienda-card relative rounded-[18px] border border-black/[0.06] bg-white p-7"
                style={{ ["--i" as string]: i }}
              >
                <span aria-hidden className="step-dot absolute hidden h-[10px] w-[10px] rounded-full bg-[#DB3B2B] lg:block" style={{ left: 28, top: 25, boxShadow: "0 0 0 6px rgba(219,59,43,0.12)" }} />
                <span className="font-sora text-[40px] font-light text-[#DB3B2B]" style={{ display: "block", marginTop: 28, marginBottom: 12, letterSpacing: "-0.04em", lineHeight: 1 }}>
                  {s.n}
                </span>
                <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 6 }}>{s.title}</h3>
                <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5 — Lo que incluye (clean grid with icons) ── */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Todo incluido en tu pasarela
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Cada herramienta lista desde el primer cobro.
            </p>
          </div>

          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {[
              {
                title: "3D Secure", desc: "Autenticación adicional cuando el riesgo lo amerita, sin romper conversión.",
                icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 6v6c0 5 3.5 8.5 9 10 5.5-1.5 9-5 9-10V6l-9-4z" stroke="#111827" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>),
              },
              {
                title: "Meses sin intereses", desc: "Hasta 18 MSI con todos los bancos sin comisión adicional.",
                icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="#111827" strokeWidth="1.6" /><path d="M3 10h18 M7 15h2 M12 15h2 M17 15h0" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /></svg>),
              },
              {
                title: "Cobros recurrentes", desc: "Suscripciones, membresías y planes con tokenización segura.",
                icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 0 1 15-6.7L21 8 M21 12a9 9 0 0 1-15 6.7L3 16 M21 3v5h-5 M3 21v-5h5" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>),
              },
              {
                title: "Conciliación automática", desc: "Cierra cuadres con tu banco sin pelear con hojas de cálculo.",
                icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><rect x="3" y="3" width="18" height="18" rx="2" stroke="#111827" strokeWidth="1.6" /></svg>),
              },
              {
                title: "Reportes en vivo", desc: "Aprobación, conversión y devoluciones en un dashboard claro.",
                icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 21h18" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /><rect x="5" y="12" width="3.5" height="7" rx="1" stroke="#111827" strokeWidth="1.6" /><rect x="10.5" y="8" width="3.5" height="11" rx="1" stroke="#111827" strokeWidth="1.6" /><rect x="16" y="4" width="3.5" height="15" rx="1" stroke="#111827" strokeWidth="1.6" /></svg>),
              },
              {
                title: "Disputas y contracargos", desc: "Gestiona reclamaciones desde el panel. Evidencia automática.",
                icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 9v4 M12 17h.01" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" /><path d="M10.3 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.39 0z" stroke="#111827" strokeWidth="1.6" strokeLinejoin="round" /></svg>),
              },
            ].map((f, i) => (
              <div
                key={f.title}
                data-stagger
                className="tienda-card flex items-start gap-4 rounded-[16px] border border-black/[0.06] bg-white p-6"
                style={{ ["--i" as string]: i }}
              >
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-sora text-[16px] font-normal text-black" style={{ marginBottom: 4 }}>{f.title}</h3>
                  <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6 — Stats with count-up ── */}
      <section className="relative px-5 py-20 tablet:px-10 tablet:py-24" style={{ background: "linear-gradient(135deg, #1A0A0A 0%, #261515 50%, #1A0A0A 100%)" }}>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[640px] text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[24px] font-light text-white tablet:text-[34px]" style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Números que hablan por sí solos.
            </h2>
          </div>

          <div data-modal-animate className="grid grid-cols-1 gap-10 text-center tablet:grid-cols-3">
            <div data-stagger style={{ ["--i" as string]: 0 }}>
              <CountStat end={97} prefix="" suffix="%" label="aprobación promedio" />
            </div>
            <div data-stagger style={{ ["--i" as string]: 1 }}>
              <CountStat end={24} prefix="+" suffix="%" label="conversión vs estándar" />
            </div>
            <div data-stagger style={{ ["--i" as string]: 2 }}>
              <CountStat end={10} prefix="+" label="métodos de pago disponibles" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 7 — FAQ ── */}
      <section className="relative bg-[#F6F6F6] px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[760px]">
          <div data-modal-animate className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>
              Preguntas frecuentes
            </h2>
          </div>
          <div data-modal-animate className="flex flex-col gap-3">
            {[
              { q: "¿Qué métodos de pago acepta T1?", a: "Tarjetas Visa, Mastercard, AMEX (crédito y débito), SPEI, OXXO, transferencia interbancaria, MSI hasta 18 meses y wallets." },
              { q: "¿Necesito un contrato con cada banco?", a: "No. T1 te conecta a múltiples procesadores con un solo contrato y enruta cada cobro al que más conviene." },
              { q: "¿Qué tan rápido recibo el dinero?", a: "Liquidación T+1 hábil para tarjetas. SPEI y transferencias en cuestión de minutos." },
              { q: "¿Cómo funciona el antifraude?", a: "Cada transacción pasa por T1 Score, que evalúa +200 señales y emite decisión en menos de 100ms sin afectar la experiencia." },
              { q: "¿Puedo integrarme a mi tienda actual?", a: "Sí. Ofrecemos plugin para Shopify, VTEX, Magento y WooCommerce, además de SDKs y API REST." },
            ].map((f, i) => (
              <details
                key={f.q}
                data-stagger
                className="group rounded-[14px] border border-black/[0.06] bg-white transition-all duration-200 open:border-[rgba(219,59,43,0.2)] open:shadow-[0_4px_18px_rgba(0,0,0,0.05)]"
                style={{ ["--i" as string]: i }}
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
        title="¿Listo para cobrar mejor?"
        description="Activa tu pasarela en minutos. Empieza a cobrar con la tasa de aprobación más alta de México."
      />
    </div>
  );
}
