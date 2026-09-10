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
    <section className="bg-[#0e0d0d] px-5 py-[60px] tablet:px-6 tablet:py-[84px]">
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
  { name: "Estándar", rate: "3.5%", note: "+ $1 MXN por transacción", desc: "Tarjetas, débito, crédito y SPEI, con depósito al día hábil siguiente.", featured: false },
  { name: "Con cobertura", rate: "4.5%", note: "+ $1 MXN por transacción", desc: "Todo lo de Estándar más cobertura contra fraude y contracargos en pagos con tarjeta.", featured: true },
];
export function T1PagosPrecios() {
  return (
    <section className="bg-black px-5 pt-[32px] pb-[64px] tablet:px-6 tablet:pt-[40px] tablet:pb-[88px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 32 }}>
          <h2 className="font-sora text-[25px] font-light text-white tablet:text-[36px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12 }}>
            Precios claros por transacción
          </h2>
          <p className="mx-auto max-w-[480px] font-inter text-[15px] font-light text-white/60 tablet:max-w-none tablet:whitespace-nowrap tablet:text-[17px]" style={{ lineHeight: 1.5 }}>
            Paga solo por lo que cobras. Sin mensualidad ni costos ocultos.
          </p>
        </div>

        <div className="mx-auto grid max-w-[780px] grid-cols-1 gap-3.5 tablet:grid-cols-2 tablet:gap-4">
          {PRICING.map((p) => (
            <div key={p.name} className={`relative flex flex-col rounded-[18px] p-6 ${p.featured ? "border border-[rgba(219,59,43,0.45)] bg-[#181117]" : "border border-white/[0.10] bg-[#141215]"}`} style={p.featured ? { boxShadow: "0 24px 60px -30px rgba(219,59,43,0.30)" } : undefined}>
              <div className="flex items-center justify-between gap-3">
                <p className="font-inter text-[12px] font-semibold uppercase tracking-[0.06em] text-white/50">{p.name}</p>
                {p.featured && <span className="shrink-0 rounded-full bg-[#DB3B2B] px-2.5 py-1 font-inter text-[10px] font-bold text-white">Recomendado</span>}
              </div>
              <div className="mt-4 flex items-end gap-2">
                <span className="font-sora text-[40px] font-light text-white" style={{ letterSpacing: "-0.02em", lineHeight: 1 }}>{p.rate}</span>
                <span className="mb-1.5 font-inter text-[13px] font-light text-white/55">{p.note}</span>
              </div>
              <div className="my-4 h-px w-full bg-white/[0.09]" />
              <p className="font-inter text-[13.5px] font-light text-white/65" style={{ lineHeight: 1.55 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-[780px] text-center font-inter text-[12px] font-light text-white/40">
          Meses sin intereses, SPEI y Kueski Pay disponibles. Consulta condiciones al contratar. *MXN, IVA no incluido.
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
    <section className="bg-[#0e0d0d] px-5 py-[52px] tablet:px-6 tablet:py-[76px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tablet:gap-14">
          {/* Mapa */}
          <div className="relative mx-auto w-full max-w-[440px]">
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(252,56,38,0.14) 0%, transparent 70%)" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/mapa-latam.svg" alt="Mapa de presencia en Latinoamérica" className="relative z-[1] w-full" />
          </div>

          {/* Texto + países (a la derecha del mapa) */}
          <div className="text-center tablet:text-left">
            <h2 className="font-sora text-[25px] font-light text-white tablet:text-[34px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              Escala sin complicaciones
            </h2>
            <p className="mx-auto mt-3 max-w-[440px] font-inter text-[15px] font-light text-white/60 tablet:mx-0 tablet:text-[17px]" style={{ lineHeight: 1.5 }}>
              Cobra en los mercados más importantes de Latinoamérica con una sola integración.
            </p>

            <div className="mt-7 mb-5 flex items-center justify-center gap-3 tablet:justify-start">
              <span className="font-sora text-[52px] font-light leading-none text-[#fc3826] tablet:text-[58px]">8</span>
              <span className="text-left font-inter text-[14px] font-semibold uppercase leading-tight tracking-[0.12em] text-[#fc3826]">
                Países en LATAM
                <span className="mt-1 block font-inter text-[13px] font-light normal-case tracking-normal text-white/60">Y en expansión continua</span>
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-2.5 tablet:justify-start">
              {COUNTRIES.map((c) => (
                <span key={c.name} className="flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.04] px-3.5 py-2 font-inter text-[14px] font-medium text-white">
                  <span className="text-[18px] leading-none">{c.flag}</span>
                  {c.name}
                </span>
              ))}
            </div>

            {/* Certificación PCI DSS — debajo de los países, en la misma columna */}
            <div className="mt-7 flex flex-col items-center gap-3 border-t border-white/[0.08] pt-6 text-center tablet:flex-row tablet:items-start tablet:gap-3 tablet:text-left">
              <span className="flex shrink-0 items-center justify-center tablet:mt-0.5">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="#FFFFFF" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <div>
                <p className="font-sora text-[16px] font-normal text-white">Certificación PCI DSS</p>
                <p className="mt-0.5 font-inter text-[13px] font-light text-white/55" style={{ lineHeight: 1.5 }}>
                  El máximo estándar internacional de seguridad para procesar pagos con tarjeta.
                </p>
              </div>
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
    <section className="bg-black px-5 py-[56px] tablet:px-6 tablet:py-[72px]">
      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 rounded-[20px] border border-white/[0.08] bg-[#141215] px-6 py-8 text-center tablet:flex-row tablet:gap-6 tablet:px-9 tablet:text-left">
        <span className="flex shrink-0 items-center justify-center">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="#FFFFFF" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <div>
          <p className="font-sora text-[20px] font-normal text-white tablet:text-[24px]">Certificación PCI DSS</p>
          <p className="mt-1.5 font-inter text-[14px] font-light text-white/60 tablet:text-[15px]" style={{ lineHeight: 1.6 }}>
            Procesamos cada pago con cifrado de extremo a extremo, bajo el estándar internacional avalado por Visa, Mastercard y American Express.
          </p>
        </div>
      </div>
    </section>
  );
}
