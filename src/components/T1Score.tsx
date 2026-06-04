"use client";

const FONT = "var(--font-manrope-var), sans-serif";

/**
 * T1Score — compact card band for T1's risk & credit intelligence product.
 *
 * Shares the warm-dark base (#141312) of the Casos de éxito (T1Enterprise)
 * section that follows it, so the hand-off reads as one continuous surface
 * instead of a hard edge (CEO: "que el fondo sea del color de la sección
 * siguiente"). The contained glass card already provides all the separation
 * it needs.
 *
 * Visual kept deliberately minimal, echoing the clean AI section: one focal
 * credit-score card on the right, a short pillar list + single CTA on the left.
 * The previous version's dense footer-stats strip and fourth factor bar were
 * dropped to reduce noise.
 */

/* The three T1 Score capabilities — same taxonomy as the mega menu so the
   product story is consistent across the site. Descriptions dropped: the CEO
   asked for less text, so each pillar is now a single clear line. */
const PILLARS = [
  { id: "fraude", title: "Prevención de fraude" },
  { id: "riesgo", title: "Análisis de riesgo" },
  { id: "credito", title: "Evaluación crediticia" },
];

/* ── Per-pillar line icons (white per CEO — cleaner on the dark card) ── */
function PillarIcon({ id }: { id: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#FFFFFF",
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

/* ── Risk-score graphic — concentric coral rings + score + a single decision
   pill, floating directly on the dark card (peach backdrop removed per CEO:
   "en la imagen que no tenga ese fondo blanco con degradado"). The white
   decision pill stays as a focal "result" chip. The 78 → "Transacción
   rechazada / Cliente de alto riesgo" tells the antifraude story at a glance.
   ── */
function ScoreReportCard() {
  return (
    <div
      className="w-full"
      style={{
        maxWidth: 400,
        fontFamily: FONT,
      }}
    >
      {/* Stacks on mobile (rings on top, full-width pill below) so the pill
          text never clips in the narrow column; side-by-side from tablet up. */}
      <div className="flex flex-col items-center gap-4 tablet:flex-row">
        {/* Concentric risk rings — score 78, on a dark red color blob that
            gives the card interior depth now that the peach surface is gone
            (CEO: "añade un blob de color azul oscuro o rojo dentro de la card"). */}
        <div className="relative flex shrink-0 items-center justify-center">
          <div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              width: 230,
              height: 230,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(219,59,43,0.42) 0%, rgba(150,42,31,0.18) 46%, transparent 72%)",
              filter: "blur(32px)",
            }}
          />
          <svg width="138" height="138" viewBox="0 0 200 200" fill="none" className="relative">
            {/* faint full-circle tracks for depth (light, for the dark surface) */}
            <circle cx="100" cy="100" r="80" stroke="rgba(255,255,255,0.10)" strokeWidth="11" />
            <circle cx="100" cy="100" r="61" stroke="rgba(255,255,255,0.10)" strokeWidth="11" />
            <circle cx="100" cy="100" r="42" stroke="rgba(255,255,255,0.10)" strokeWidth="10" />
            {/* layered coral arcs (dark → light, varied start angles) */}
            <circle cx="100" cy="100" r="80" stroke="#B83B2B" strokeWidth="11" strokeLinecap="round" strokeDasharray="362 141" transform="rotate(-90 100 100)" />
            <circle cx="100" cy="100" r="61" stroke="#E25A43" strokeWidth="11" strokeLinecap="round" strokeDasharray="230 154" transform="rotate(-52 100 100)" />
            <circle cx="100" cy="100" r="42" stroke="#FF9270" strokeWidth="10" strokeLinecap="round" strokeDasharray="124 140" transform="rotate(-124 100 100)" />
            <text x="100" y="114" textAnchor="middle" style={{ fontSize: 46, fontWeight: 700, fill: "#FFFFFF", letterSpacing: "-1px" }}>78</text>
          </svg>
        </div>

        {/* Decision pill */}
        <div
          className="flex w-full min-w-0 items-center gap-3 rounded-[14px] bg-white tablet:flex-1"
          style={{ padding: "13px 15px", boxShadow: "0 12px 32px -18px rgba(0,0,0,0.5)" }}
        >
          <span
            className="flex shrink-0 items-center justify-center rounded-full"
            style={{ width: 38, height: 38, background: "rgba(226,97,83,0.12)" }}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <path d="M12 2.2l2 7.8 7.8 2-7.8 2-2 7.8-2-7.8-7.8-2 7.8-2z" fill="#E26153" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="text-[13.5px] font-bold text-[#2E2A28]" style={{ lineHeight: 1.2 }}>
              Transacción rechazada
            </p>
            <p className="mt-0.5 text-[12px] text-[#6B6B6B]" style={{ lineHeight: 1.3 }}>
              Cliente de alto riesgo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function T1Score() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#141312" }}>
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
          className="relative mx-auto overflow-hidden rounded-[24px] border border-white/[0.08]"
          style={{
            maxWidth: 1040,
            background: "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.018) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Color blob inside the card — a deep-red glow lower-right (behind
              the score) + a dark-blue glow upper-left, clipped by the card's
              overflow-hidden so the interior reads with color depth instead of
              flat glass (CEO: "añade un degradado o blob de color azul oscuro o
              rojo dentro de la card"). */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(115% 95% at 100% 100%, rgba(219,59,43,0.26) 0%, rgba(219,59,43,0.10) 32%, transparent 60%), radial-gradient(95% 85% at 0% 0%, rgba(36,66,150,0.20) 0%, transparent 55%)",
            }}
          />
          <div className="relative z-[1] p-7 tablet:p-12">
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
                Prevén fraude y evalúa el riesgo de cada operación con IA y los
                datos de Círculo de Crédito.
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
                <ul className="flex flex-col gap-4">
                  {PILLARS.map((p) => (
                    <li key={p.id} className="flex items-center gap-3.5">
                      <span className="shrink-0">
                        <PillarIcon id={p.id} />
                      </span>
                      <p className="font-inter text-[15px] font-semibold text-white tablet:text-[16px]">
                        {p.title}
                      </p>
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
