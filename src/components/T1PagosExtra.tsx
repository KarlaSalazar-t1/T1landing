import { SIGNUP_URL } from "@/lib/constants";

const Arrow = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* ══════════ API / desarrolladores ══════════ */
export function T1PagosApi() {
  return (
    <section className="overflow-hidden bg-[#0e0d0d] px-5 py-[90px] tablet:px-6 tablet:py-[128px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
          <div>
            <span className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] text-[#DB3B2B]">Para desarrolladores</span>
            <h2 className="mt-3 font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 16, maxWidth: 440 }}>
              Integra pagos con nuestra API
            </h2>
            <p className="font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, marginBottom: 24, maxWidth: 440 }}>
              API REST orientada a recursos, con respuestas estandarizadas y webhooks. Conecta tu e-commerce en horas, no semanas.
            </p>
            <ul className="mb-8 flex flex-col gap-3">
              {["API REST con documentación clara", "Webhooks para eventos en tiempo real", "Entornos de prueba y producción", "Certificación PCI DSS de extremo a extremo"].map((it) => (
                <li key={it} className="flex items-start gap-3 font-inter text-[15px] text-white/75 tablet:text-[16px]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {it}
                </li>
              ))}
            </ul>
            <a href={SIGNUP_URL} className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]">
              Comienza gratis
              {Arrow}
            </a>
          </div>

          {/* Code snippet mock */}
          <div className="overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#141216]">
            <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-5 py-3.5">
              <span className="h-[10px] w-[10px] rounded-full bg-white/15" />
              <span className="h-[10px] w-[10px] rounded-full bg-white/15" />
              <span className="h-[10px] w-[10px] rounded-full bg-white/15" />
              <span className="ml-2 font-inter text-[12px] text-white/40">POST /v1/charges</span>
            </div>
            <pre className="overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-[1.7] text-white/80 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <code>{`curl https://api.t1.com/v1/charges \\
  -H "Authorization: Bearer sk_live_..." \\
  -d amount=245000 \\
  -d currency=mxn \\
  -d payment_method=card

{
  "id": "ch_9f2a...",
  "status": `}<span className="text-[#22C55E]">{`"approved"`}</span>{`,
  "amount": 245000,
  "currency": "mxn"
}`}</code>
            </pre>
          </div>
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
    <section className="bg-black px-5 py-[90px] tablet:px-6 tablet:py-[128px]">
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
        <div className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 48 }}>
          <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
            Cobra en 8 países de Latinoamérica
          </h2>
          <p className="mx-auto font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, maxWidth: 520 }}>
            Una sola integración para expandir tu operación por la región.
          </p>
        </div>

        <div className="mx-auto grid max-w-[860px] grid-cols-2 gap-3 tablet:grid-cols-4 tablet:gap-4">
          {COUNTRIES.map((c) => (
            <div key={c.name} className="flex items-center gap-3 rounded-[14px] border border-white/[0.08] bg-[#1A1A1D] px-4 py-3.5">
              <span className="text-[24px] leading-none">{c.flag}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-inter text-[15px] font-medium text-white">{c.name}</span>
                <span className="flex items-center gap-1.5 font-inter text-[12px] font-light text-white/50">
                  <span className="h-[6px] w-[6px] rounded-full bg-[#22C55E]" /> Activo
                </span>
              </span>
            </div>
          ))}
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
        <span className="mx-auto mb-6 flex h-[56px] w-[56px] items-center justify-center rounded-[16px] border border-white/[0.10] bg-[#141216]">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M12 2.5l7 3v6c0 4.5-3 7.8-7 9.5-4-1.7-7-5-7-9.5v-6l7-3z" stroke="#DB3B2B" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M8.5 12l2.3 2.3 4.7-4.6" stroke="#DB3B2B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
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
