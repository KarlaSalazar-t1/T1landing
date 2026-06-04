"use client";

import Image from "next/image";

const FONT = "var(--font-manrope-var), sans-serif";

/**
 * T1Score — dedicated band for T1's risk & credit intelligence product.
 *
 * The CEO flagged that T1 Score had no home on the landing ("faltó ver dónde
 * meter una sección de T1Score"). It already exists as a hidden tab inside
 * T1Solutions (kept for a future launch); this surfaces it as its own section
 * so the product reads as a core pillar. Copy mirrors the mega-menu taxonomy
 * in constants.ts (fraude / riesgo / crédito) and the credit-report graphic is
 * adapted from the hidden T1Solutions panel so the visual stays consistent.
 *
 * Sits on the warm-dark P3 tonality between the AI section and Metrics so the
 * two "intelligence" moments live together and the transitions stay smooth.
 */

/* The three T1 Score capabilities — same taxonomy as the mega menu so the
   product story is consistent across the site. */
const PILLARS = [
  {
    id: "fraude",
    title: "Prevención de fraude",
    desc: "Bloquea transacciones fraudulentas en tiempo real, antes de que afecten tu negocio.",
  },
  {
    id: "riesgo",
    title: "Análisis de riesgo",
    desc: "Evalúa el riesgo de cada operación al instante y decide a quién aprobar.",
  },
  {
    id: "credito",
    title: "Evaluación crediticia",
    desc: "Conoce la capacidad de pago de tus clientes con datos tradicionales y alternativos.",
  },
];

/* ── Per-pillar line icons (coral, to tie into the AI section accent) ── */
function PillarIcon({ id }: { id: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#FF6F5E",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (id === "fraude") {
    return (
      <svg {...common}>
        <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" />
        <path d="M9 11.5l2 2 4-4" />
      </svg>
    );
  }
  if (id === "riesgo") {
    return (
      <svg {...common}>
        <path d="M3 12h3l2.5 6 4-13 2.5 9 2-2h4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="11" r="2" />
      <path d="M13 10h5M13 13.5h5M5.5 15.5c.6-1.2 1.8-2 3-2s2.4.8 3 2" />
    </svg>
  );
}

/* ── Credit-report graphic — white card floating on the dark band, adapted
   from the hidden "evaluación crediticia" panel in T1Solutions. ── */
function ScoreReportCard() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[18px] bg-white"
      style={{
        maxWidth: 400,
        padding: "24px 26px",
        boxShadow: "0 30px 80px -24px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.05)",
        fontFamily: FONT,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
        <div>
          <p className="text-[11px] font-medium text-[#828282]">Reporte crediticio</p>
          <p className="text-[15px] font-bold text-[#4c4c4c]">Juan Pérez García</p>
        </div>
        <span className="rounded-full bg-[rgba(34,197,94,0.1)] px-2.5 py-1 text-[10px] font-bold text-[#22C55E]">
          Aprobado
        </span>
      </div>

      {/* Score gauge */}
      <div className="flex items-center gap-4" style={{ marginBottom: 18 }}>
        <svg width="96" height="96" viewBox="0 0 100 100" fill="none" className="shrink-0">
          <circle cx="50" cy="50" r="40" stroke="rgba(0,0,0,0.06)" strokeWidth="8" />
          <circle cx="50" cy="50" r="40" stroke="#22C55E" strokeWidth="8" strokeLinecap="round" strokeDasharray="210 251" transform="rotate(-90 50 50)" />
          <text x="50" y="48" textAnchor="middle" style={{ fontSize: 17, fontWeight: 700, fill: "#4c4c4c" }}>742</text>
          <text x="50" y="62" textAnchor="middle" style={{ fontSize: 6, fontWeight: 500, fill: "#828282" }}>de 850</text>
        </svg>
        <div>
          <p className="text-[12px] font-medium text-[#828282]">Score crediticio</p>
          <p className="text-[20px] font-bold text-[#22C55E]" style={{ lineHeight: 1.1 }}>Excelente</p>
          <p className="text-[11px] text-[#828282]">Riesgo bajo de impago</p>
        </div>
      </div>

      {/* Factores evaluados */}
      <div style={{ marginBottom: 16 }}>
        <p className="text-[11px] font-bold text-[#4c4c4c]" style={{ marginBottom: 10 }}>Factores evaluados</p>
        {[
          { label: "Historial de pagos", value: "Excelente", pct: 95, color: "#22C55E" },
          { label: "Utilización de crédito", value: "32%", pct: 68, color: "#22C55E" },
          { label: "Antigüedad", value: "8 años", pct: 80, color: "#8B5CF6" },
          { label: "Datos alternativos", value: "Buena", pct: 75, color: "#E26153" },
        ].map((row) => (
          <div key={row.label} style={{ marginBottom: 9 }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
              <span className="text-[11px] text-[#4c4c4c]">{row.label}</span>
              <span className="text-[11px] font-bold text-[#4c4c4c]">{row.value}</span>
            </div>
            <div className="h-[5px] w-full overflow-hidden rounded-full bg-black/[0.05]">
              <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Footer stats */}
      <div className="flex items-center justify-between border-t border-black/[0.06] pt-3.5">
        <div>
          <p className="text-[9px] text-[#828282]">Cuentas activas</p>
          <p className="text-[15px] font-bold text-[#4c4c4c]">4</p>
        </div>
        <div>
          <p className="text-[9px] text-[#828282]">Saldo total</p>
          <p className="text-[15px] font-bold text-[#4c4c4c]">$45,200</p>
        </div>
        <div>
          <p className="text-[9px] text-[#828282]">Pagos a tiempo</p>
          <p className="text-[15px] font-bold text-[#22C55E]">100%</p>
        </div>
      </div>
    </div>
  );
}

export default function T1Score() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#141414" }}>
      {/* Soft warm glow — keeps the band graphic and cohesive with the AI section. */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute"
          style={{
            top: "8%",
            right: "-8%",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(219,59,43,0.16) 0%, transparent 60%)",
            filter: "blur(95px)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[var(--max-w)] px-5 py-16 tablet:px-6 tablet:py-24">
        {/* Heading + subheading */}
        <div style={{ maxWidth: 640 }}>
          <h2
            className="font-sora text-[30px] font-light text-white tablet:text-[40px] lg:text-[46px]"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.12 }}
          >
            Crece con confianza con{" "}
            <span style={{ color: "#FF6F5E" }}>T1&nbsp;Score</span>
          </h2>
          <p
            className="mt-5 font-inter text-[16px] font-normal text-white/65 tablet:text-[18px]"
            style={{ letterSpacing: "-0.01em", lineHeight: 1.5, maxWidth: 560 }}
          >
            Inteligencia artificial y los datos de Círculo de Crédito para prevenir
            fraude, evaluar el riesgo y conocer la capacidad de pago de tus clientes
            — en cada transacción.
          </p>
        </div>

        {/* Two columns: pillars + CTA on the left, score graphic on the right.
            On mobile the graphic comes first (order-1) right under the intro,
            then the pillars and CTA. */}
        <div className="mt-10 grid grid-cols-1 items-center gap-10 tablet:mt-14 tablet:grid-cols-2 tablet:gap-14">
          {/* Score report graphic */}
          <div className="relative order-1 flex justify-center tablet:order-2 tablet:justify-end">
            <div
              className="pointer-events-none absolute"
              style={{
                inset: "-12%",
                background: "radial-gradient(circle at 50% 42%, rgba(255,111,94,0.18) 0%, transparent 65%)",
                filter: "blur(44px)",
              }}
            />
            <ScoreReportCard />
          </div>

          {/* Pillars + CTA */}
          <div className="order-2 tablet:order-1">
            <ul className="flex flex-col gap-5">
              {PILLARS.map((p) => (
                <li key={p.id} className="flex items-start gap-3.5">
                  <span
                    className="mt-[2px] flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px]"
                    style={{
                      background: "rgba(255,111,94,0.12)",
                      border: "1px solid rgba(255,111,94,0.22)",
                    }}
                  >
                    <PillarIcon id={p.id} />
                  </span>
                  <div>
                    <p className="font-inter text-[15px] font-semibold text-white tablet:text-[16px]">
                      {p.title}
                    </p>
                    <p
                      className="mt-0.5 font-inter text-[13.5px] font-normal text-white/55 tablet:text-[14px]"
                      style={{ lineHeight: 1.45 }}
                    >
                      {p.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA + Círculo de Crédito trust mark */}
            <div className="mt-9 flex flex-col gap-5 tablet:flex-row tablet:items-center tablet:gap-7">
              <a
                href="/productos/t1score"
                className="inline-flex h-[50px] w-fit items-center justify-center gap-2 rounded-[25px] bg-[#DB3B2B] px-7 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A] hover:shadow-[0_4px_16px_rgba(226,97,83,0.4)] tablet:text-[16px]"
              >
                Conoce T1 Score
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <div className="flex items-center gap-2.5">
                <span className="font-inter text-[12px] text-white/40">Integra los datos de</span>
                <span
                  className="flex items-center rounded-[7px] bg-white px-2.5"
                  style={{ height: 30, boxShadow: "0 2px 8px rgba(0,0,0,0.25)" }}
                >
                  <Image
                    src="/img/logos/circulo-de-credito.png"
                    alt="Círculo de Crédito"
                    width={96}
                    height={20}
                    className="h-auto w-auto object-contain"
                    style={{ maxHeight: 18, maxWidth: 100 }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
