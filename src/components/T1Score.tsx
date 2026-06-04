"use client";

const FONT = "var(--font-manrope-var), sans-serif";

/**
 * T1Score — compact card band for T1's risk & credit intelligence product.
 *
 * Sits on a pure-black base (same as the Metrics section right below) so there
 * is no jarring light/dark switch between the two — the contained glass card
 * already provides all the separation it needs (CEO: "como está en card ya se
 * ve la separación, no es necesario el switch de color").
 *
 * Visual kept deliberately minimal, echoing the clean AI section: one focal
 * credit-score card on the right, a short pillar list + single CTA on the left.
 * The previous version's dense footer-stats strip and fourth factor bar were
 * dropped to reduce noise.
 */

/* The three T1 Score capabilities — same taxonomy as the mega menu so the
   product story is consistent across the site. */
const PILLARS = [
  {
    id: "fraude",
    title: "Prevención de fraude",
    desc: "Bloquea transacciones fraudulentas en tiempo real.",
  },
  {
    id: "riesgo",
    title: "Análisis de riesgo",
    desc: "Evalúa cada operación al instante y decide a quién aprobar.",
  },
  {
    id: "credito",
    title: "Evaluación crediticia",
    desc: "Conoce la capacidad de pago con datos tradicionales y alternativos.",
  },
];

/* ── Per-pillar line icons (coral, tying into the AI section accent) ── */
function PillarIcon({ id }: { id: string }) {
  const common = {
    width: 20,
    height: 20,
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

/* ── Credit-score graphic — minimal white card floating inside the band.
   Pared down from the old dense report: header + gauge + three factor rows,
   no footer-stats strip. Grays darkened to #6B6B6B so the small labels clear
   WCAG AA on white. ── */
function ScoreReportCard() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[16px] bg-white"
      style={{
        maxWidth: 330,
        padding: "22px 24px",
        boxShadow: "0 20px 50px -24px rgba(0,0,0,0.6)",
        fontFamily: FONT,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
        <div>
          <p className="text-[10.5px] font-medium text-[#6B6B6B]">Reporte crediticio</p>
          <p className="text-[14px] font-bold text-[#3a3a3a]">Juan Pérez García</p>
        </div>
        <span className="rounded-full bg-[rgba(21,128,61,0.1)] px-2.5 py-1 text-[10px] font-bold text-[#15803D]">
          Aprobado
        </span>
      </div>

      {/* Score gauge */}
      <div className="flex items-center gap-4" style={{ marginBottom: 18 }}>
        <svg width="86" height="86" viewBox="0 0 100 100" fill="none" className="shrink-0">
          <circle cx="50" cy="50" r="40" stroke="rgba(0,0,0,0.06)" strokeWidth="8" />
          <circle cx="50" cy="50" r="40" stroke="#16A34A" strokeWidth="8" strokeLinecap="round" strokeDasharray="210 251" transform="rotate(-90 50 50)" />
          <text x="50" y="48" textAnchor="middle" style={{ fontSize: 17, fontWeight: 700, fill: "#3a3a3a" }}>742</text>
          <text x="50" y="62" textAnchor="middle" style={{ fontSize: 6.5, fontWeight: 600, fill: "#6B6B6B" }}>de 850</text>
        </svg>
        <div>
          <p className="text-[11px] font-medium text-[#6B6B6B]">Score crediticio</p>
          <p className="text-[20px] font-bold text-[#16A34A]" style={{ lineHeight: 1.1 }}>Excelente</p>
          <p className="text-[11px] text-[#6B6B6B]">Riesgo bajo de impago</p>
        </div>
      </div>

      {/* Factores evaluados */}
      <div>
        <p className="text-[10.5px] font-bold text-[#3a3a3a]" style={{ marginBottom: 10 }}>Factores evaluados</p>
        {[
          { label: "Historial de pagos", value: "Excelente", pct: 95, color: "#16A34A" },
          { label: "Utilización de crédito", value: "32%", pct: 68, color: "#16A34A" },
          { label: "Datos alternativos", value: "Buena", pct: 75, color: "#E26153" },
        ].map((row) => (
          <div key={row.label} style={{ marginBottom: 9 }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
              <span className="text-[10.5px] text-[#3a3a3a]">{row.label}</span>
              <span className="text-[10.5px] font-bold text-[#3a3a3a]">{row.value}</span>
            </div>
            <div className="h-[5px] w-full overflow-hidden rounded-full bg-black/[0.05]">
              <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function T1Score() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#000" }}>
      {/* One soft warm glow — keeps the band cohesive with the AI section
          without the previous visual clutter. */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute"
          style={{
            top: "10%",
            right: "0%",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(219,59,43,0.12) 0%, transparent 60%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[var(--max-w)] px-5 py-14 tablet:px-6 tablet:py-20">
        {/* Self-contained card — its own border/fill is what separates the
            section from Metrics below, so the band itself can share Metrics'
            black background. */}
        <div
          className="mx-auto overflow-hidden rounded-[24px] border border-white/[0.08]"
          style={{
            maxWidth: 1040,
            background: "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.018) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 60px rgba(0,0,0,0.5)",
          }}
        >
          <div className="p-7 tablet:p-12">
            {/* Heading + subheading */}
            <div className="tablet:max-w-[560px]">
              <h2
                className="font-sora text-[24px] font-light text-white tablet:text-[30px] lg:text-[34px]"
                style={{ letterSpacing: "-0.02em", lineHeight: 1.15 }}
              >
                Crece con confianza con{" "}
                <span style={{ color: "#FF6F5E" }}>T1&nbsp;Score</span>
              </h2>
              <p
                className="mt-3.5 font-inter text-[14px] font-normal text-white/65 tablet:text-[15px]"
                style={{ letterSpacing: "-0.01em", lineHeight: 1.5, maxWidth: 500 }}
              >
                IA y los datos de Círculo de Crédito para prevenir fraude, evaluar el
                riesgo y conocer la capacidad de pago de tus clientes.
              </p>
            </div>

            {/* Two columns: pillars + CTA on the left, score card on the right.
                On mobile the card comes first (order-1) under the intro. */}
            <div className="mt-8 grid grid-cols-1 items-center gap-9 tablet:mt-10 tablet:grid-cols-2 tablet:gap-12">
              {/* Score card */}
              <div className="relative order-1 flex justify-center tablet:order-2 tablet:justify-end">
                <ScoreReportCard />
              </div>

              {/* Pillars + CTA */}
              <div className="order-2 tablet:order-1">
                <ul className="flex flex-col gap-5">
                  {PILLARS.map((p) => (
                    <li key={p.id} className="flex items-start gap-3.5">
                      <span className="mt-[1px] shrink-0">
                        <PillarIcon id={p.id} />
                      </span>
                      <div>
                        <p className="font-inter text-[14px] font-semibold text-white tablet:text-[15px]">
                          {p.title}
                        </p>
                        <p
                          className="mt-1 font-inter text-[12.5px] font-normal text-white/60 tablet:text-[13px]"
                          style={{ lineHeight: 1.45 }}
                        >
                          {p.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* CTA — single button, trust mark removed per CEO. */}
                <a
                  href="/productos/t1score"
                  className="mt-8 inline-flex h-[46px] w-fit items-center justify-center gap-2 rounded-[23px] bg-[#DB3B2B] px-6 font-inter text-[14px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A] hover:shadow-[0_4px_16px_rgba(226,97,83,0.4)] tablet:text-[15px]"
                >
                  Conoce T1 Score
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
