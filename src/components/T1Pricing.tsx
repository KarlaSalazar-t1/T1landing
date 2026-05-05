"use client";

const TIENDA_PLANS = [
  {
    title: "Integrador de marketplaces",
    badge: "Gratis",
    badgeColor: "rgba(34,197,94,0.12)",
    badgeText: "#22C55E",
    headline: "$0",
    headlineSuffix: "/mes",
    description:
      "Conecta y gestiona Amazon, Mercado Libre, SHEIN y más sin costo. Solo pagas si vendes.",
  },
  {
    title: "Tienda en línea",
    badge: "30 días gratis",
    badgeColor: "rgba(34,197,94,0.12)",
    badgeText: "#22C55E",
    headline: "Desde $399",
    headlineSuffix: "/mes",
    description:
      "Tu tienda con dominio propio, checkout integrado y herramientas de IA. Prueba gratis 30 días.",
  },
];

const SIDE_PLANS = [
  {
    id: "t1pagos",
    title: "T1pagos",
    badge: "",
    badgeColor: "",
    badgeText: "",
    headline: "Desde 3.5%",
    description:
      "3.5% sin protección de contracargos · 4.5% con protección. Sin renta mensual.",
    cta: "Ver detalles",
    href: "https://t1.com/mx/pagos/",
  },
  {
    id: "t1envios",
    title: "T1envíos",
    badge: "",
    badgeColor: "",
    badgeText: "",
    headline: "Pago por guía",
    description:
      "Recarga saldo y compra guías al mejor precio del mercado. Sin mensualidad.",
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

        {/* Two-column grid: T1tienda (with 2 sub-plans) | T1pagos + T1envíos stacked */}
        <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
          {/* LEFT: T1tienda — single white card split in two halves */}
          <div
            className="flex flex-col overflow-hidden rounded-[20px] border border-black/[0.06] bg-white"
            style={{ padding: "26px 28px", boxShadow: "0 0 25px 0 rgba(0,0,0,0.04)" }}
          >
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
              <p className="font-inter text-[16px] font-semibold text-black">T1tienda</p>
              <p className="font-inter text-[13px] font-light text-black/50" style={{ marginTop: 2 }}>
                Empieza gratis o lleva tu marca al siguiente nivel
              </p>
            </div>

            {/* Divided sub-plans — single card, split by horizontal divider */}
            <div className="flex flex-1 flex-col" style={{ marginBottom: 18 }}>
              {TIENDA_PLANS.map((sub, i) => (
                <div
                  key={sub.title}
                  className={i === 0 ? "border-b border-black/[0.06] pb-4" : "pt-4"}
                >
                  <div className="flex items-center gap-2" style={{ marginBottom: 6 }}>
                    <span className="font-inter text-[13px] font-semibold text-black">{sub.title}</span>
                    <span
                      className="rounded-[6px] px-2 py-0.5 font-inter text-[10px] font-semibold"
                      style={{ background: sub.badgeColor, color: sub.badgeText }}
                    >
                      {sub.badge}
                    </span>
                  </div>
                  <p className="font-sora text-[20px] font-normal text-black" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                    {sub.headline}
                    <span className="font-inter text-[12px] font-light text-black/50">{sub.headlineSuffix}</span>
                  </p>
                  <p className="font-inter text-[12px] font-light text-black/55" style={{ marginTop: 6, lineHeight: 1.5 }}>
                    {sub.description}
                  </p>
                </div>
              ))}
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

          {/* RIGHT: stacked column with T1pagos + T1envíos */}
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
                <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
                  <span className="font-inter text-[16px] font-semibold text-black">{plan.title}</span>
                  {plan.badge && (
                    <span
                      className="rounded-[6px] px-2 py-0.5 font-inter text-[11px] font-semibold"
                      style={{ background: plan.badgeColor, color: plan.badgeText }}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="font-sora text-[24px] font-normal text-black tablet:text-[26px]" style={{ letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 8 }}>
                  {plan.headline}
                </p>

                <p className="font-inter text-[13px] font-light text-black/55" style={{ lineHeight: 1.5, marginBottom: 14 }}>
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
