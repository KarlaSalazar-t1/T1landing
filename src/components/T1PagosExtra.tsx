import { SIGNUP_URL } from "@/lib/constants";

/* ══════════ ¿Por qué elegir T1 Pagos? ══════════ */
const REASONS = [
  {
    title: "Mejora la aprobación",
    desc: "Cierra más ventas con una tasa de aprobación de +90%, por encima del promedio del mercado.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M4 15l4.5-4.5 3 3L20 6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 6h5v5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
  },
  {
    title: "Protege tus transacciones",
    desc: "T1 Score analiza señales de riesgo para ayudarte a reducir fraude y contracargos.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 2.5l7 3v6c0 4.5-3 7.8-7 9.5-4-1.7-7-5-7-9.5v-6l7-3z" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" /><path d="M8.5 12l2.3 2.3 4.7-4.6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
  },
  {
    title: "Seguro contra reclamaciones",
    desc: "Cobertura total que elimina las pérdidas por fraude y reclamaciones en tus cobros.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4-2.7 7.4-7 9-4.3-1.6-7-5-7-9V6l7-3z" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" /><path d="M12 8v5m0 3h.01" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" /></svg>
    ),
  },
];
export function T1PagosPorQue() {
  return (
    <section className="bg-[#0e0d0d] px-5 py-[90px] tablet:px-6 tablet:py-[128px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 48 }}>
          <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
            ¿Por qué elegir T1 Pagos?
          </h2>
          <p className="mx-auto font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, maxWidth: 560 }}>
            Tecnología, seguridad y soporte diseñados para maximizar tus cobros y proteger cada transacción.
          </p>
        </div>

        <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
          {REASONS.map((r) => (
            <div key={r.title} className="flex flex-col rounded-[18px] border border-white/[0.08] bg-[#141215] p-7">
              <span className="mb-5 inline-flex">{r.icon}</span>
              <h3 className="font-sora text-[19px] font-normal text-white" style={{ marginBottom: 8 }}>{r.title}</h3>
              <p className="font-inter text-[14px] font-light text-white/60 tablet:text-[15px]" style={{ lineHeight: 1.6 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════ Precios / comisiones ══════════ */
const PRICING = [
  { name: "Estándar", rate: "3.5%", note: "+ $1 MXN por transacción", desc: "Acepta tarjetas de crédito y débito, SPEI y más. Recibe tu dinero al día hábil siguiente.", featured: false },
  { name: "Con cobertura de reclamaciones", rate: "4.5%", note: "+ $1 MXN por transacción", desc: "Todo lo del plan Estándar más cobertura total contra fraudes y reclamaciones con T1 Score.", featured: true },
];
export function T1PagosPrecios() {
  return (
    <section className="bg-black px-5 pt-[40px] pb-[90px] tablet:px-6 tablet:pt-[48px] tablet:pb-[128px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 48 }}>
          <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
            Precios claros por transacción
          </h2>
          <p className="mx-auto font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, maxWidth: 520 }}>
            Paga solo por lo que cobras. Sin mensualidad ni costos ocultos.
          </p>
        </div>

        <div className="mx-auto grid max-w-[860px] grid-cols-1 gap-4 tablet:grid-cols-2 tablet:gap-5">
          {PRICING.map((p) => (
            <div key={p.name} className={`relative rounded-[22px] p-8 ${p.featured ? "border border-[rgba(219,59,43,0.45)] bg-[#181117]" : "border border-white/[0.10] bg-[#141215]"}`} style={p.featured ? { boxShadow: "0 24px 60px -30px rgba(219,59,43,0.30)" } : undefined}>
              {p.featured && <span className="absolute right-7 top-8 rounded-full bg-[#DB3B2B] px-2.5 py-1 font-inter text-[10px] font-bold text-white">Recomendado</span>}
              <p className="font-inter text-[12px] font-semibold uppercase tracking-[0.06em] text-white/50">{p.name}</p>
              <div className="mt-3 flex items-end gap-2">
                <span className="font-sora text-[48px] font-light text-white" style={{ letterSpacing: "-0.02em", lineHeight: 1 }}>{p.rate}</span>
                <span className="mb-2 font-inter text-[14px] font-light text-white/55">{p.note}</span>
              </div>
              <p className="mt-4 font-inter text-[14px] font-light text-white/65" style={{ lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-7 max-w-[860px] text-center font-inter text-[13px] font-light text-white/45">
          Meses sin intereses desde 2.7%, SPEI 3% + $5 y Kueski 5%. Consulta las condiciones vigentes al contratar.
        </p>
      </div>
    </section>
  );
}

/* ══════════ 8 países LATAM ══════════ */
const COUNTRIES = [
  { flag: "🇲🇽", name: "México" }, { flag: "🇨🇴", name: "Colombia" }, { flag: "🇧🇷", name: "Brasil" }, { flag: "🇸🇻", name: "El Salvador" },
  { flag: "🇬🇹", name: "Guatemala" }, { flag: "🇳🇮", name: "Nicaragua" }, { flag: "🇭🇳", name: "Honduras" }, { flag: "🇨🇷", name: "Costa Rica" },
];
export function T1PagosPaises() {
  return (
    <section className="bg-[#0e0d0d] px-5 py-[90px] tablet:px-6 tablet:py-[128px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="mx-auto max-w-[720px] text-center" style={{ marginBottom: 56 }}>
          <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
            Escala tu operación, sin complicaciones
          </h2>
          <p className="mx-auto font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, maxWidth: 560 }}>
            Cobra a tus clientes en los mercados más importantes de Latinoamérica con una sola integración.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] tablet:gap-14">
          {/* Mapa */}
          <div className="relative mx-auto w-full max-w-[440px]">
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(252,56,38,0.14) 0%, transparent 70%)" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/mapa-latam.svg" alt="Mapa de presencia en Latinoamérica" className="relative z-[1] w-full" />
          </div>

          {/* Panel de países */}
          <div className="rounded-[20px] border border-white/[0.08] bg-[#141215] p-6 tablet:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span aria-hidden className="h-[10px] w-[10px] rounded-full bg-[#fc3826]" style={{ boxShadow: "0 0 12px 2px rgba(252,56,38,0.7)" }} />
              <span className="font-sora text-[40px] font-normal text-[#fc3826] leading-none tablet:text-[46px]">8</span>
              <span className="font-inter text-[15px] font-semibold uppercase tracking-[0.12em] text-[#fc3826]">
                Países en LATAM
                <span className="mt-1 block font-inter text-[15px] font-light normal-case tracking-normal text-white/70">Expansión continua</span>
              </span>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-1 tablet:grid-cols-2">
              {COUNTRIES.map((c) => (
                <div key={c.name} className="flex items-center justify-between gap-3 border-b border-white/[0.06] py-3.5">
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="text-[22px] leading-none">{c.flag}</span>
                    <span className="truncate font-inter text-[16px] font-medium text-white">{c.name}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#22C55E]/25 bg-[#22C55E]/10 px-2.5 py-1 font-inter text-[12px] font-medium text-[#22C55E]">
                    <span className="h-[6px] w-[6px] rounded-full bg-[#22C55E]" /> Activo
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════ Certificación PCI DSS ══════════ */
export function T1PagosPCI() {
  return (
    <section className="bg-black px-5 py-[90px] tablet:px-6 tablet:py-[128px]">
      <div className="mx-auto max-w-[820px] text-center">
        <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
          Certificación PCI DSS
        </h2>
        <p className="mx-auto font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 40, maxWidth: 600 }}>
          Cada transacción se procesa bajo el estándar internacional de seguridad avalado por Visa, Mastercard y American Express para proteger los datos de tarjeta.
        </p>
        <div className="mx-auto grid max-w-[720px] grid-cols-1 gap-4 tablet:grid-cols-3">
          {[
            { t: "Datos cifrados", d: "Bóveda virtual con cifrado de extremo a extremo." },
            { t: "Antifraude con T1 Score", d: "Análisis de cada transacción en tiempo real." },
            { t: "Cumplimiento PCI", d: "Los más altos estándares de la industria." },
          ].map((f) => (
            <div key={f.t} className="rounded-[16px] border border-white/[0.08] bg-[#141215] p-6 text-left">
              <p className="font-sora text-[16px] font-normal text-white" style={{ marginBottom: 6 }}>{f.t}</p>
              <p className="font-inter text-[13px] font-light text-white/55" style={{ lineHeight: 1.55 }}>{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
