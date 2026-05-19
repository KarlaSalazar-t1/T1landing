"use client";

import Image from "next/image";

const SIDE_PLANS = [
  {
    id: "t1pagos",
    title: "T1pagos",
    badge: "",
    badgeColor: "",
    badgeText: "",
    // Hero number + small descriptor underneath
    headline: "Desde 3.5% + $1",
    eyebrow: "por transacción",
    description: "4.5% con protección de contracargos.",
    cta: "Ver detalles",
    href: "https://t1.com/mx/pagos/",
  },
  {
    id: "t1envios",
    title: "T1envíos",
    badge: "",
    badgeColor: "",
    badgeText: "",
    headline: "Cotiza y recarga",
    eyebrow: "",
    description: "Las mejores tarifas, sin mínimo de envíos.",
    cta: "Ver tarifas",
    href: "https://www.t1.com/mx/envios",
  },
];

export default function T1Pricing() {
  return (
    <section className="bg-white" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="mx-auto max-w-[var(--max-w)] px-5 tablet:px-6">
        {/* Heading */}
        <div style={{ marginBottom: 32 }}>
          <h2
            className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 8 }}
          >
            Precios transparentes
          </h2>
          <p className="font-inter text-[16px] font-light text-black/50 tablet:text-[20px]">
            Paga solo por lo que usas. Sin sorpresas, sin letras chiquitas.
          </p>
        </div>

        {/* Two-column 40/60 grid: T1tienda full-height (left, 40%) | T1pagos+T1envíos stacked (right, 60%) */}
        <div className="grid grid-cols-1 gap-4 tablet:grid-cols-[2fr_3fr]">
          {/* LEFT: T1tienda — single white card with two simple plans stacked */}
          <div
            className="flex flex-col overflow-hidden rounded-[20px] border border-black/[0.06] bg-white"
            style={{ padding: "26px 28px", boxShadow: "0 0 25px 0 rgba(0,0,0,0.04)" }}
          >
            {/* Header — logo */}
            <div style={{ marginBottom: 24 }}>
              <Image src="/img/t1tienda-logo.svg" alt="T1tienda" width={140} height={32} style={{ width: "auto", height: 30 }} />
            </div>

            {/* Two plans stacked, separated by a divider */}
            <div className="flex flex-1 flex-col" style={{ marginBottom: 22 }}>
              {/* Plan 1 — Integrador / Gratis */}
              <div className="border-b border-black/[0.06] pb-6">
                <span
                  className="inline-flex items-center rounded-full bg-black/[0.05] font-inter text-[11px] font-semibold uppercase tracking-[0.06em] text-black/55"
                  style={{ padding: "4px 10px", marginBottom: 12 }}
                >
                  Integrador
                </span>
                <p
                  className="font-sora text-[32px] font-normal text-black tablet:text-[36px]"
                  style={{ letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 8 }}
                >
                  Gratis
                </p>
                <p className="font-inter text-[14px] font-light text-black/55" style={{ lineHeight: 1.5 }}>
                  Conecta Mercado Libre, Amazon, Shein, Sears y más.
                </p>
              </div>

              {/* Plan 2 — Tienda en línea / Desde $399/mes */}
              <div className="pt-6">
                <span
                  className="inline-flex items-center rounded-full bg-black/[0.05] font-inter text-[11px] font-semibold uppercase tracking-[0.06em] text-black/55"
                  style={{ padding: "4px 10px", marginBottom: 12 }}
                >
                  Tienda en línea
                </span>
                <p
                  className="font-sora text-[32px] font-normal text-black tablet:text-[36px]"
                  style={{ letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 8 }}
                >
                  Desde $399/mes
                </p>
                <p className="font-inter text-[14px] font-light text-black/65" style={{ lineHeight: 1.5 }}>
                  Crea tu tienda gratis + 30 días de prueba.
                </p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://t1.com/mx/tienda"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1.5 font-inter text-[14px] font-semibold text-black no-underline transition-colors duration-150 hover:text-black/70"
            >
              Ver planes
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* RIGHT: T1pagos and T1envíos stacked in 2 rows */}
          <div className="flex flex-col gap-4">
            {SIDE_PLANS.map((plan) => (
              <a
                key={plan.id}
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 flex-col overflow-hidden rounded-[20px] border border-black/[0.06] bg-white no-underline transition-all duration-300 hover:border-black/[0.12]"
                style={{ padding: "26px 28px", boxShadow: "0 0 25px 0 rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-center gap-2" style={{ marginBottom: 14 }}>
                  <Image
                    src={plan.id === "t1pagos" ? "/img/t1pagos-logo.svg" : "/img/t1envios-logo.svg"}
                    alt={plan.title}
                    width={140}
                    height={30}
                    style={{ width: "auto", height: 28 }}
                  />
                  {plan.badge && (
                    <span
                      className="rounded-[6px] px-2 py-0.5 font-inter text-[11px] font-semibold"
                      style={{ background: plan.badgeColor, color: plan.badgeText }}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p
                  className="font-sora text-[32px] font-normal text-black tablet:text-[36px]"
                  style={{ letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: plan.eyebrow ? 2 : 8 }}
                >
                  {plan.headline}
                </p>

                {plan.eyebrow && (
                  <p
                    className="font-inter text-[18px] font-normal text-black/65 tablet:text-[20px]"
                    style={{ letterSpacing: "-0.01em", lineHeight: 1.3, marginBottom: 10 }}
                  >
                    {plan.eyebrow}
                  </p>
                )}

                <p className="font-inter text-[14px] font-light text-black/55" style={{ lineHeight: 1.5, marginBottom: 14 }}>
                  {plan.description}
                </p>

                <span className="mt-auto inline-flex items-center gap-1.5 font-inter text-[14px] font-semibold text-black transition-transform duration-200 group-hover:translate-x-1">
                  {plan.cta}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p
          className="text-center font-inter text-[12px] font-light text-black/40 tablet:text-[13px]"
          style={{ marginTop: 20 }}
        >
          Sin contratos forzosos · Sin costos de instalación · Soporte incluido en todos los planes
        </p>
      </div>
    </section>
  );
}
