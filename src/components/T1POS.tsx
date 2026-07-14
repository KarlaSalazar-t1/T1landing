"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { SIGNUP_URL, SALES_URL } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { useFSStackCards } from "@/hooks/useFSStackCards";
import T1FinalCTA from "@/components/T1FinalCTA";
import { PosHeroScreen, PosCheckoutScreen, PosCheckoutMobileScreen, NegocioFlowScreen } from "@/components/showcase/PosMockups";
import { TodoEnUnoCard } from "@/components/T1ScrollShowcase";

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

/* Catalog panel — product edit form: single price (base/oferta/costo/margen)
   and inventory PER SUCURSAL (stock varies by branch, price does not). */
function Field({ label, value, hint = false, placeholder }: { label: string; value?: string; hint?: boolean; placeholder?: string }) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1" style={{ marginBottom: 5 }}>
        <span className="font-inter text-[11px] text-black/55">{label}</span>
        {hint && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.7-2 2-2 3.2M12 17.5h.01" strokeLinecap="round" /></svg>}
      </div>
      <div className="flex items-center gap-1.5 rounded-[9px] border border-black/[0.12] px-2.5" style={{ height: 34 }}>
        <span className="font-inter text-[12px] text-black/40">$</span>
        <span className={`font-inter text-[12.5px] ${value ? "text-black/85" : "text-black/35"}`}>{value ?? placeholder}</span>
      </div>
    </div>
  );
}

function InventoryPanel() {
  const SUCS = [
    { n: "Correo Mayor", star: true, u: "1" },
    { n: "Sucursal 10", star: false, u: "" },
    { n: "Sucursal 9", star: false, u: "" },
  ];
  return (
    <div className="relative order-2 overflow-hidden rounded-[18px] border border-black/[0.06] bg-white tablet:order-1" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      {/* Precio */}
      <p className="font-sora text-[15px] font-semibold text-black" style={{ marginBottom: 14 }}>Precio</p>
      <div className="grid grid-cols-2 gap-3" style={{ marginBottom: 12 }}>
        <Field label="Precio base" value="3,299" />
        <Field label="Precio oferta" hint value="1,979" />
      </div>
      <div className="grid grid-cols-3 gap-2.5" style={{ marginBottom: 14 }}>
        <Field label="Costo" hint placeholder="0" />
        <div className="min-w-0">
          <span className="mb-[5px] block font-inter text-[11px] text-black/55">Ganancia</span>
          <div className="flex items-center justify-center rounded-[9px] bg-[rgba(34,197,94,0.10)]" style={{ height: 34 }}><span className="font-inter text-[12.5px] font-semibold text-[#16A34A]">$1,979</span></div>
        </div>
        <div className="min-w-0">
          <span className="mb-[5px] block font-inter text-[11px] text-black/55">Margen</span>
          <div className="flex items-center justify-center rounded-[9px] bg-[rgba(34,197,94,0.10)]" style={{ height: 34 }}><span className="font-inter text-[12.5px] font-semibold text-[#16A34A]">100%</span></div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex h-[15px] w-[15px] items-center justify-center rounded-[4px] border border-black/20" />
        <span className="font-inter text-[12px] text-black/60">Mi producto grava IVA</span>
      </div>

      <div className="my-5 h-px bg-black/[0.07]" />

      {/* Inventario por sucursal */}
      <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
        <p className="font-sora text-[15px] font-semibold text-black">Inventario por sucursal</p>
      </div>
      <p className="text-right font-inter text-[10.5px] text-black/45" style={{ marginBottom: 6 }}>Unidades disponibles</p>
      {SUCS.map((s, i) => (
        <div key={s.n} className={`flex items-center gap-3 py-2.5 ${i < SUCS.length - 1 ? "border-b border-black/[0.05]" : ""}`}>
          <span className="flex flex-1 items-center gap-1.5 font-inter text-[13px] font-medium text-black">
            {s.n}
            {s.star && <span className="flex h-[16px] w-[16px] items-center justify-center rounded-[5px] bg-[rgba(245,158,11,0.14)]"><svg width="9" height="9" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 18l-6 3.4 1.4-6.8L2.3 9.1l6.9-.8z" /></svg></span>}
          </span>
          <div className="flex w-[90px] items-center rounded-[9px] border border-black/[0.12] px-2.5" style={{ height: 34 }}><span className={`font-inter text-[12.5px] ${s.u ? "text-black/85" : "text-black/30"}`}>{s.u || "0"}</span></div>
        </div>
      ))}
      <div className="mt-3 flex items-center justify-center rounded-[9px] border border-black/[0.12] py-2"><span className="font-inter text-[12px] font-medium text-black/60">Editar sucursales</span></div>
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
          <div className="grid grid-cols-1 items-center gap-10 tablet:min-h-[420px] tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] tablet:items-end tablet:gap-12">
            {/* Left */}
            <div className="tablet:self-center">
              <h1
                className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[60px]"
                style={{ lineHeight: 1.05, letterSpacing: "-1.7px", marginBottom: 22 }}
              >
                El punto de venta{" "}
                <span className="relative inline-block">
                  todo en uno.
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.30)", borderRadius: 5, zIndex: -1 }} />
                </span>
              </h1>
              <p
                className="font-inter text-[16px] font-light text-white/65 tablet:text-[19px]"
                style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 500 }}
              >
                Vende en piso, cobra con distintos métodos y mantén tu catálogo e inventario sincronizados en T1.
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

            {/* Right — POS phone (bleeds to the section's bottom edge) with the
                animated "Crear producto" → cart → payment floats. */}
            <div className="relative w-full tablet:-mb-24">
              <PosHeroScreen />
            </div>
          </div>
        </div>
      </section>

      {/* ── ¿Qué es? — explainer (Vende · Cobra · Controla) ── */}
      <section className="relative bg-white px-5 pt-10 pb-10 tablet:px-10 tablet:pt-14 tablet:pb-14">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="mx-auto max-w-[760px] text-center" style={{ marginBottom: 48, animation: "fadeSlideIn 0.6s ease-out both" }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[34px] lg:text-[42px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15 }}>
              Todo tu negocio, en un solo lugar.
            </h2>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
            {[
              {
                title: "Vende en piso",
                desc: "Arma cada venta con el mismo catálogo de tu tienda en línea, con inventario por sucursal.",
                img: "/img/vende-en-piso.png",
              },
              {
                title: "Cobra con cualquier método",
                desc: "Efectivo, SPEI, transferencia y pagos con tarjeta o métodos personalizados. Envía tickets por WhatsApp, SMS o email.",
                img: "/img/cobra-cualquier-metodo.png",
              },
              {
                title: "Controla tu inventario",
                desc: "Stock por sucursal, actualizado en tiempo real con cada venta en piso o en línea. Sin sobreventas.",
                img: "/img/controla-inventario.png",
              },
            ].map((f, i) => (
              <div key={f.title} data-stagger className="tienda-card flex flex-col rounded-[20px] border border-black/[0.07] bg-white p-6" style={{ ["--i" as string]: i, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <h3 className="font-sora text-[19px] font-normal text-black" style={{ marginBottom: 8 }}>{f.title}</h3>
                <p className="font-inter text-[14px] font-light text-black/60" style={{ lineHeight: 1.6, marginBottom: 20 }}>{f.desc}</p>
                <div className="mt-auto overflow-hidden rounded-[14px]">
                  <Image src={f.img} alt={f.title} width={1536} height={1024} className="block h-[220px] w-full object-cover object-top" sizes="(max-width: 768px) 100vw, 360px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── De carrito a ticket — animated checkout flow (white) ── */}
      <section className="relative bg-white px-5 pt-4 pb-16 tablet:px-10 tablet:pt-6 tablet:pb-20">
        <div className="relative mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 44 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Marca y cobra en segundos.
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Agrega productos, cobra con cualquier forma de pago y comparte el ticket al terminar. Así de rápido cobran tus vendedores.
            </p>
          </div>
          <div data-modal-animate className="mx-auto" style={{ maxWidth: 760 }}>
            <div className="hidden tablet:block">
              <PosCheckoutScreen />
            </div>
            <div className="mx-auto tablet:hidden" style={{ maxWidth: 270 }}>
              <PosCheckoutMobileScreen />
            </div>
          </div>
          <div data-modal-animate className="mt-10 flex justify-center">
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

      {/* ── Administra tu catálogo (module) — gris ── */}
      <section className="relative bg-[#FBFBFB] px-5 py-16 tablet:px-10 tablet:py-24">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
            <InventoryPanel />
            <div className="order-1 tablet:order-2">
              <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                Crea y administra tu catálogo
              </h3>
              <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                Da de alta tus productos con sus variantes, precios e inventario, y mantén todo centralizado en un mismo lugar.
              </p>
              <ul className="flex flex-col gap-2.5">
                {["Crea productos con variantes y sus precios", "Inventario centralizado, siempre actualizado", "El mismo catálogo en piso y en tu tienda en línea"].map((it) => (
                  <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Controla todo tu negocio (panel de caja) ── */}
      <div ref={stackRootRef} className="fs-stack-card-container relative bg-white">
        {/* Controla tu negocio — panel de control de caja */}
        <div className="fs-stack-card" style={{ top: 100, zIndex: 3, background: "#FFFFFF" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[22px] font-light text-black tablet:text-[30px] lg:text-[36px]" style={{ letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 18 }}>
                  Controla todo tu negocio
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Administra sucursales, equipo y corte de caja desde una sola cuenta. Todo bajo control, sin pelear con hojas de cálculo.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Multi-sucursal: cada tienda con su propio inventario", "Multi-empleado: cuentas por vendedor con permisos y reportes", "Apertura y corte de caja por sucursal y turno"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Panel — animated flow: sucursal → PIN → cargando → caja → apertura → corte */}
              <div className="mx-auto w-full" style={{ maxWidth: 288 }}>
                <NegocioFlowScreen />
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ── Multiplataforma — descarga (dark QR card) on white ── */}
      <section className="relative bg-white px-5 pb-10 tablet:px-10 tablet:pb-14">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[720px]">
            <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] px-6 pt-10 pb-0 tablet:px-10 tablet:pt-0 tablet:pb-0" style={{ background: "linear-gradient(135deg, #1A1212 0%, #261515 50%, #1A0A0A 100%)", boxShadow: "0 16px 40px rgba(0,0,0,0.14)" }}>
              {/* colored blobs */}
              <div aria-hidden className="pointer-events-none absolute -right-12 -top-16 h-[240px] w-[240px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(219,59,43,0.38) 0%, transparent 70%)", filter: "blur(34px)" }} />
              <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-[230px] w-[230px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(255,140,60,0.24) 0%, transparent 70%)", filter: "blur(36px)" }} />
              <div aria-hidden className="pointer-events-none absolute left-1/3 top-1/2 h-[180px] w-[180px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(130,90,255,0.16) 0%, transparent 70%)", filter: "blur(34px)" }} />

              <div className="relative grid grid-cols-1 items-center gap-4 tablet:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] tablet:gap-8">
                {/* Left — imagen del POS en distintos dispositivos, sobresale (sangre inferior) */}
                <div className="relative order-2 self-end tablet:order-1">
                  <Image src="/img/pos-dispositivos.png" alt="T1 POS en distintos dispositivos" width={1536} height={1024} className="block h-auto max-w-none" style={{ width: "116%", marginLeft: "-8%", marginBottom: -2, filter: "drop-shadow(0 22px 34px rgba(0,0,0,0.42))" }} sizes="(max-width: 768px) 100vw, 460px" />
                </div>

                {/* Right — texto + QR / botones */}
                <div className="relative order-1 pb-8 text-center tablet:order-2 tablet:py-14 tablet:text-left">
                  <p className="font-sora text-[24px] font-medium text-white tablet:text-[30px]" style={{ letterSpacing: "-0.5px", marginBottom: 8 }}>Tu POS en cualquier dispositivo</p>
                  <p className="font-inter text-[15px] font-light text-white/60 tablet:hidden" style={{ marginBottom: 28 }}>Descárgalo gratis o ábrelo desde la web.</p>
                  <p className="hidden font-inter text-[15px] font-light text-white/60 tablet:block" style={{ marginBottom: 28 }}>Descárgalo gratis escaneando el código o ábrelo desde la web.</p>

                  {/* Desktop → one QR per store */}
                  <div className="hidden flex-col tablet:flex">
                    <div className="flex items-start justify-center gap-8 tablet:justify-start">
                      {[
                        { store: "App Store", logo: (<svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M17.6 7.1c-.9.05-2 .6-2.6 1.3-.6.6-1.1 1.6-.9 2.5 1 .08 2-.5 2.6-1.2.6-.7 1-1.7.9-2.6zM19 16.8c-.3.8-.5 1.1-.9 1.8-.6.9-1.4 2-2.4 2-.9 0-1.1-.6-2.3-.6-1.2 0-1.5.6-2.3.6-1 0-1.7-1-2.3-1.9-1.7-2.5-1.9-5.5-.8-7 .8-1.1 2-1.7 3.1-1.7 1.2 0 1.9.6 2.9.6.9 0 1.5-.6 2.9-.6 1 0 2.1.6 2.9 1.5-2.6 1.4-2.2 5.1.5 5.7z" /></svg>) },
                        { store: "Google Play", logo: (<svg width="14" height="14" viewBox="0 0 24 24"><path d="M3.6 2.3l11 9.7-11 9.7c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1z" fill="#4285F4" /><path d="M16.8 9.1l-2.2 2.9 2.2 2.9 3.5-2c.7-.4.7-1.4 0-1.8l-3.5-2z" fill="#FBBC04" /><path d="M14.6 12l-11 9.7c.4.2.9.2 1.3 0l11.9-6.8-2.2-2.9z" fill="#34A853" /><path d="M14.6 12l2.2-2.9L4.9 2.3c-.4-.2-.9-.2-1.3 0l11 9.7z" fill="#EA4335" /></svg>) },
                      ].map((q) => (
                        <div key={q.store} className="flex flex-col items-center">
                          <div className="flex h-[108px] w-[108px] shrink-0 items-center justify-center rounded-[16px] bg-white" style={{ padding: 12, boxShadow: "0 6px 22px rgba(0,0,0,0.3)" }}>
                            <svg width="84" height="84" viewBox="0 0 56 56" fill="#111827" fillRule="evenodd" aria-label={`Código QR para ${q.store}`}>
                              <path d="M0 0h20v20H0zM4 4v12h12V4zM7 7h6v6H7z" />
                              <path d="M36 0h20v20H36zM40 4v12h12V4zM43 7h6v6h-6z" />
                              <path d="M0 36h20v20H0zM4 40v12h12V40zM7 43h6v6H7z" />
                              <path d="M24 0h4v4h-4zM30 0h2v6h-6V4h4zM24 8h6v4h-4v4h-2zM32 8h4v4h-4zM24 16h8v4h-4v-2h-4z" />
                              <path d="M36 24h4v4h-4zM44 24h4v8h-4v-4h-4v-2h4zM50 24h6v4h-4v2h-2zM36 32h6v4h-2v4h-4zM44 36h4v4h4v4h-8zM52 32h4v8h-4zM24 24h6v4h-2v2h-4zM24 32h4v4h4v4h-8zM30 40h6v4h-4v4h-2zM36 48h8v4h-8zM48 48h8v4h-8z" />
                            </svg>
                          </div>
                          <div className="mt-2.5 flex items-center gap-1.5">
                            {q.logo}
                            <span className="font-inter text-[12.5px] font-medium text-white/70">{q.store}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile → tappable store buttons (white pills on dark card) */}
                  <div className="flex flex-col items-center justify-center gap-3 tablet:hidden">
                    <a href={SIGNUP_URL} className="flex w-full items-center justify-center gap-3 rounded-[14px] bg-white px-6 py-3 no-underline">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#111827"><path d="M17.6 7.1c-.9.05-2 .6-2.6 1.3-.6.6-1.1 1.6-.9 2.5 1 .08 2-.5 2.6-1.2.6-.7 1-1.7.9-2.6zM19 16.8c-.3.8-.5 1.1-.9 1.8-.6.9-1.4 2-2.4 2-.9 0-1.1-.6-2.3-.6-1.2 0-1.5.6-2.3.6-1 0-1.7-1-2.3-1.9-1.7-2.5-1.9-5.5-.8-7 .8-1.1 2-1.7 3.1-1.7 1.2 0 1.9.6 2.9.6.9 0 1.5-.6 2.9-.6 1 0 2.1.6 2.9 1.5-2.6 1.4-2.2 5.1.5 5.7z" /></svg>
                      <span className="text-left">
                        <span className="block font-inter text-[10px] leading-none text-black/55">Descárgala en el</span>
                        <span className="block font-sora text-[17px] font-semibold leading-tight text-black">App Store</span>
                      </span>
                    </a>
                    <a href={SIGNUP_URL} className="flex w-full items-center justify-center gap-3 rounded-[14px] bg-white px-6 py-3 no-underline">
                      <svg width="22" height="22" viewBox="0 0 24 24"><path d="M3.6 2.3l11 9.7-11 9.7c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1z" fill="#4285F4" /><path d="M16.8 9.1l-2.2 2.9 2.2 2.9 3.5-2c.7-.4.7-1.4 0-1.8l-3.5-2z" fill="#FBBC04" /><path d="M14.6 12l-11 9.7c.4.2.9.2 1.3 0l11.9-6.8-2.2-2.9z" fill="#34A853" /><path d="M14.6 12l2.2-2.9L4.9 2.3c-.4-.2-.9-.2-1.3 0l11 9.7z" fill="#EA4335" /></svg>
                      <span className="text-left">
                        <span className="block font-inter text-[10px] leading-none text-black/55">Disponible en</span>
                        <span className="block font-sora text-[17px] font-semibold leading-tight text-black">Google Play</span>
                      </span>
                    </a>
                  </div>

                  <a href={SIGNUP_URL} className="mt-7 inline-flex items-center gap-1.5 font-inter text-[14px] font-medium text-[#FF7060] no-underline hover:gap-2.5">
                    O ábrela en la web
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M4 8h8M9 5l3 3-3 3" stroke="#FF7060" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lo que incluye — "Tu sucursal, lista para vender" (gris) ── */}
      <section className="relative bg-[#FBFBFB] px-5 pt-14 pb-16 tablet:px-10 tablet:pt-16 tablet:pb-20">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Tu sucursal, lista para vender
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Una sola plataforma, todo lo que tu equipo en piso necesita.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {[
              { title: "Lector de código", desc: "Escaneo rápido por código de barras mediante escáner o la cámara de tu dispositivo.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 5v14 M7 5v14 M11 5v14 M15 5v14 M19 5v14 M21 5v14" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Tickets digitales", desc: "Envía recibos por WhatsApp, SMS o email al instante.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 3h14a2 2 0 0 1 2 2v14l-3-3H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="#111827" strokeWidth="1.6" strokeLinejoin="round" /><path d="M8 9h8 M8 13h5" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Promociones", desc: "Descuentos directo al cobrar o automatizados.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 11.5V7l-9-4-9 4v9l9 4 9-4v-1.5" stroke="#111827" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="14" cy="14" r="2" stroke="#111827" strokeWidth="1.6" /></svg>) },
              { title: "Multi-vendedor", desc: "Cuentas por colaborador con permisos y reportes.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="#111827" strokeWidth="1.6" /><circle cx="17" cy="9" r="2.5" stroke="#111827" strokeWidth="1.6" /><path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6 M14 14a5 5 0 0 1 7 5" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Devoluciones", desc: "Procesa reembolsos sin fricción.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 1 0 3-6.7 M3 4v5h5" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
            ].map((f, i) => (
              <div key={f.title} data-stagger className="tienda-card flex items-start gap-4 rounded-[16px] border border-black/[0.07] bg-white p-6" style={{ ["--i" as string]: i, boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center">{f.icon}</div>
                <div>
                  <h3 className="font-sora text-[16px] font-normal text-black" style={{ marginBottom: 4 }}>{f.title}</h3>
                  <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div data-modal-animate className="mt-12 flex justify-center">
            <a
              href={SIGNUP_URL}
              className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]"
            >
              Activar mi punto de venta
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats (oculto) ── */}
      {false && (
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
      )}

      {/* ── Planes ── */}
      <section className="relative bg-white px-5 py-[100px] tablet:px-10 tablet:py-[128px]">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[700px] text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Un plan para cada operación
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Todos los planes incluyen la plataforma completa. Solo elige cuántos usuarios y sucursales necesitas.
            </p>
          </div>
          {/* plan cards — differ only in usuarios + sucursales */}
          <div data-modal-animate className="mx-auto grid max-w-[1040px] grid-cols-1 items-stretch gap-4 tablet:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {[
              { name: "Gratuito", price: "$0", users: "1 usuario", branches: "1 sucursal", featured: false, custom: false },
              { name: "Básico", price: "$399", users: "5 usuarios", branches: "3 sucursales", featured: false, custom: false },
              { name: "Avanzado", price: "$899", users: "15 usuarios", branches: "10 sucursales", featured: true, custom: false },
              { name: "Enterprise", price: "A tu medida", users: "Usuarios ilimitados", branches: "Sucursales ilimitadas", featured: false, custom: true },
            ].map((p, i) => (
              <div
                key={p.name}
                data-stagger
                className={`relative flex flex-col rounded-[20px] p-6 ${p.featured ? "border-2 border-[#DB3B2B] bg-white" : "border border-black/[0.08] bg-white"}`}
                style={{ ["--i" as string]: i, boxShadow: p.featured ? "0 18px 50px rgba(219,59,43,0.12)" : "0 4px 20px rgba(0,0,0,0.04)" }}
              >
                {p.featured && (
                  <span className="absolute right-5 top-6 rounded-full bg-[rgba(219,59,43,0.10)] px-2.5 py-1 font-inter text-[10px] font-bold text-[#DB3B2B]">Recomendado</span>
                )}
                <p className="font-sora text-[18px] font-medium text-black" style={{ marginBottom: 10 }}>{p.name}</p>
                <div className="flex items-end gap-1" style={{ marginBottom: 20 }}>
                  <span className={`font-sora font-light text-black ${p.custom ? "text-[24px]" : "text-[40px]"}`} style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}>{p.price}</span>
                  {!p.custom && <span className="font-inter text-[14px] text-black/50" style={{ marginBottom: 4 }}>/mes</span>}
                </div>
                <div className="flex flex-col gap-2.5 rounded-[14px] bg-[#FAFAF9] p-4" style={{ marginBottom: 22 }}>
                  <div className="flex items-center gap-2.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DB3B2B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.4" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>
                    <span className="font-inter text-[14px] font-semibold text-black">{p.users}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DB3B2B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l1.5-5h15L21 9M4 9v10h16V9M4 9h16M9 19v-5h6v5" /></svg>
                    <span className="font-inter text-[14px] font-semibold text-black">{p.branches}</span>
                  </div>
                </div>
                <a
                  href={p.custom ? SALES_URL : SIGNUP_URL}
                  className={`mt-auto inline-flex items-center justify-center rounded-[12px] px-5 py-3 font-inter text-[14px] font-semibold no-underline transition-colors duration-150 ${p.featured ? "bg-[#DB3B2B] text-white hover:bg-[#C0332A]" : "border border-black/15 text-black hover:border-black/35"}`}
                >
                  {p.custom ? "Contactar ventas" : "Comenzar"}
                </a>
              </div>
            ))}
          </div>

          {/* Todos los planes incluyen — the full platform (same in every plan) */}
          <div data-modal-animate className="mx-auto mt-6 max-w-[1040px] rounded-[20px] border border-black/[0.08] bg-white p-7 tablet:p-9" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
            <p className="text-center font-sora text-[16px] font-medium text-black" style={{ marginBottom: 18 }}>
              Todos los planes incluyen la plataforma completa
            </p>
            <div className="grid grid-cols-1 gap-x-8 gap-y-3 tablet:grid-cols-2 lg:grid-cols-3">
              {[
                "Cobros con tarjeta, efectivo y SPEI",
                "Inventario y precios por sucursal, en tiempo real",
                "Control y corte de caja",
                "Roles y permisos por usuario",
                "Reportes de ventas",
                "Tickets digitales por WhatsApp, SMS y email",
                "Promociones y descuentos al cobrar",
                "Devoluciones y reembolsos",
              ].map((f) => (
                <div key={f} className="flex items-start gap-2.5 font-inter text-[13.5px] text-black/70">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Cross-sell — POS también activa tu tienda en línea */}
          <div data-modal-animate className="mx-auto mt-5 flex max-w-[1040px] flex-col items-center gap-4 rounded-[20px] border border-[rgba(219,59,43,0.25)] p-6 text-center tablet:flex-row tablet:items-center tablet:gap-5 tablet:text-left" style={{ background: "rgba(219,59,43,0.04)" }}>
            <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[14px] bg-white" style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}>
              <Image src="/img/icon-tienda.svg" alt="" width={28} height={28} />
            </span>
            <div className="flex-1">
              <p className="font-sora text-[15px] font-semibold text-black" style={{ marginBottom: 3 }}>También activas tu Tienda en línea</p>
              <p className="font-inter text-[13.5px] font-light text-black/60" style={{ lineHeight: 1.55 }}>
                Con cualquier plan de T1pos vendes en tu local y por internet con el mismo catálogo, con inventario por sucursal. Sin contratar nada aparte.
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-[rgba(34,197,94,0.12)] px-3 py-1 font-inter text-[12px] font-bold text-[#16A34A]">Incluido</span>
          </div>

          <p className="mx-auto mt-8 text-center font-inter text-[13px] font-light text-black/45" style={{ maxWidth: 560 }}>
            Precios de referencia. Consulta los planes y límites vigentes en t1.com.
          </p>
        </div>
      </section>

      {/* ── Ecosistema T1 — órbita ── */}
      <section className="relative overflow-hidden px-5 py-16 tablet:px-10 tablet:py-20" style={{ background: "linear-gradient(135deg, #1A1212 0%, #0F0808 55%, #050303 100%)" }}>
        <div className="relative mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
            {/* Text */}
            <div data-modal-animate>
              <h2 className="font-sora text-[28px] font-light text-white tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 16 }}>
                T1 POS es parte del ecosistema T1
              </h2>
              <p className="font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 28, maxWidth: 460 }}>
                T1pos no trabaja solo: comparte catálogo, inventario y clientes con el resto de T1 para que manejes todo tu negocio desde un solo lugar.
              </p>
              <ul className="flex flex-col gap-4" style={{ marginBottom: 32 }}>
                {[
                  { t: "Un solo catálogo", d: "el mismo catálogo de tu tienda en línea, con inventario por sucursal." },
                  { t: "Cobros conectados", d: "cobra en persona, en línea o con links de pago de T1 Pagos, todo en un lugar." },
                  { t: "Envíos a un click", d: "genera guías con T1 Envíos desde la misma plataforma para tus ventas en línea." },
                ].map((b) => (
                  <li key={b.t} className="flex items-start gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-1 shrink-0"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span className="font-inter text-[14.5px] tablet:text-[15px]" style={{ lineHeight: 1.55 }}>
                      <span className="font-medium text-white">{b.t}:</span>
                      <span className="font-light text-white/55"> {b.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                Empezar con T1
              </a>
            </div>
            {/* Orbit */}
            <div className="flex items-center justify-center">
              <TodoEnUnoCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative bg-black px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[760px]">
          <div data-modal-animate className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[36px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>Preguntas frecuentes</h2>
          </div>
          <div data-modal-animate className="flex flex-col gap-3">
            {[
              { q: "¿Funciona sin conexión a internet?", a: "Sí. El POS opera offline y sincroniza ventas e inventario en cuanto recupera conexión." },
              { q: "¿Necesito hardware especial?", a: "No. Funciona en tus dispositivos Android, iPhone, iPad y navegador web." },
              { q: "¿Cómo se actualiza el inventario?", a: "Cada venta en sucursal descuenta inventario en tiempo real. Sin acciones manuales." },
              { q: "¿Cuánto tarda en operar mi sucursal?", a: "Configuración inicial en menos de un día. Capacitación a tu equipo incluida." },
            ].map((f, i) => (
              <details key={f.q} data-stagger className="group rounded-[14px] border border-white/[0.08] bg-white/[0.03] transition-all duration-200 open:border-[rgba(219,59,43,0.4)] open:bg-white/[0.05]" style={{ ["--i" as string]: i }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-sora text-[16px] font-normal text-white transition-colors duration-150 hover:text-[#FF6F5E]">
                  {f.q}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-white/40 transition-transform duration-300 group-open:rotate-180 group-open:text-[#FF6F5E]"><path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </summary>
                <p className="px-6 pb-5 font-inter text-[14px] font-light text-white/60" style={{ lineHeight: 1.65 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <T1FinalCTA
        title="¿Listo para vender en piso?"
        description="Activa tu punto de venta hoy. Conecta ventas, inventario y reportes en una sola plataforma."
      />
    </div>
  );
}
