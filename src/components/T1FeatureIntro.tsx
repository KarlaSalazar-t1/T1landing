"use client";

import { FEATURE_CARDS } from "@/lib/constants";

/* ── Modern line icons for the Vende / Cobra / Envía intro cards ── */
function FeatureIcon({ id, size = 28 }: { id: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#000000",
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (id === "vende") {
    return (
      <svg {...common}>
        <path d="M3 9l1.5-4.5h15L21 9" />
        <path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" />
        <path d="M3 9a2.4 2.4 0 0 0 4.5 0 2.4 2.4 0 0 0 4.5 0 2.4 2.4 0 0 0 4.5 0 2.4 2.4 0 0 0 4.5 0" />
        <path d="M9 20v-5h6v5" />
      </svg>
    );
  }
  if (id === "cobra") {
    return (
      <svg {...common}>
        <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
        <path d="M2.5 9.5h19" />
        <path d="M6 14.5h4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M21 8l-9-5-9 5 9 5 9-5z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
      <path d="M7.5 5.5l9 5" />
    </svg>
  );
}

/**
 * T1FeatureIntro
 *
 * The Vende / Cobra / Envía cards lifted out of T1Features and laid on a
 * dark band that sits between the hero and the white card section. The
 * white card below has a negative margin so only the top of these cards
 * peeks above the white card's rounded edge — the classic Stripe / Linear
 * "card peek over the next section" treatment.
 */
export default function T1FeatureIntro() {
  return (
    <div className="relative mx-auto w-full max-w-[var(--max-w)] px-5 tablet:px-6">
      {/* Section title sits above the cards on the dark band. Pushed
          down a bit so it doesn't crowd the logo marquee above. Mobile
          splits the heading into two lines for better legibility. */}
      <h2
        className="mx-auto font-sora text-[28px] font-light text-white tablet:text-[36px] lg:text-[44px]"
        style={{
          letterSpacing: "-0.03em",
          lineHeight: "1.2em",
          textAlign: "center",
          maxWidth: 700,
          marginTop: 24,
          marginBottom: 36,
        }}
      >
        Todo tu negocio,
        <br className="tablet:hidden" />{" "}
        en un solo lugar
      </h2>

      {/* MOBILE — 3 cards stacked */}
      <div className="flex flex-col gap-4 tablet:hidden">
        {[
          { id: "vende", label: "VENDE", desc: "En tu tienda en línea o marketplaces" },
          { id: "cobra", label: "COBRA", desc: "Con tarjeta o transferencia con nuestro checkout integrado o link de pago" },
          { id: "envia", label: "ENVÍA", desc: "Cotiza y crea envíos con las mejores paqueterías y los precios más bajos" },
        ].map((item) => (
          <div
            key={item.id}
            className="flex flex-col rounded-[12px] bg-white"
            style={{
              padding: "20px 20px",
              minHeight: 124,
              boxShadow: "0 0 25px 0 rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
              <p className="font-inter text-[16px] font-semibold uppercase tracking-[0.04em] text-black">
                {item.label}
              </p>
              <FeatureIcon id={item.id} size={26} />
            </div>
            <p className="font-inter text-[14px] font-normal text-black" style={{ lineHeight: 1.5 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* DESKTOP — 3-column card grid, equal heights */}
      <div className="hidden tablet:grid tablet:auto-rows-fr tablet:grid-cols-3 tablet:items-stretch tablet:gap-4 lg:gap-6">
        {FEATURE_CARDS.map((card) => (
          <div
            key={card.id}
            className="flex h-full flex-col rounded-[15px] bg-white transition-all duration-300 hover:scale-[1.01]"
            style={{ padding: "40px 32px", boxShadow: "0 0 25px 0 rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 32 }}>
              <p className="font-inter text-[18px] font-medium uppercase text-black tablet:text-[20px]">
                {card.label}
              </p>
              <FeatureIcon id={card.id} size={28} />
            </div>
            <p className="w-full font-inter text-[15px] font-normal text-black tablet:text-[16px]" style={{ lineHeight: 1.5 }}>
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
