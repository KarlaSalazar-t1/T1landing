"use client";

import Image from "next/image";

/* ── Modern line icons for the Vende / Cobra / Envía intro cards ── */
function FeatureIcon({ id, size = 28, color = "#000000" }: { id: string; size?: number; color?: string }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.3,
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

/* ── Card data — single source for mobile + desktop. Each card carries the
   real brand logos of what it includes so the section is graphic, not just
   text (CEO feedback: "que sea más gráfico, que muestre los íconos"). ── */
type Brand = { src: string; alt: string };
type Card = { id: string; label: string; desc: string; logos: Brand[] };

const CARDS: Card[] = [
  {
    id: "vende",
    label: "VENDE",
    desc: "Crea tu tienda en línea con IA y maneja todos tus marketplaces desde un solo lugar.",
    logos: [
      { src: "/img/logos/mercado-libre.svg", alt: "Mercado Libre" },
      { src: "/img/amazon-iso.svg", alt: "Amazon" },
      { src: "/img/tiktok-isotipo.png", alt: "TikTok Shop" },
      { src: "/img/shein-iso.svg", alt: "Shein" },
      { src: "/img/walmart.svg", alt: "Walmart" },
    ],
  },
  {
    id: "cobra",
    label: "COBRA",
    desc: "Recibe pagos con tarjetas, SPEI, Kueski y meses sin intereses, o comparte un link de pago.",
    logos: [
      { src: "/img/icons/visa.svg", alt: "Visa" },
      { src: "/img/icons/mastercard.svg", alt: "Mastercard" },
      { src: "/img/icons/amex.svg", alt: "American Express" },
      { src: "/img/icons/spei.svg", alt: "SPEI" },
      { src: "/img/icons/kueski.svg", alt: "Kueski Pay" },
    ],
  },
  {
    id: "envia",
    label: "ENVÍA",
    desc: "Cotiza, crea guías y rastrea tus pedidos con +10 paqueterías al mejor precio del mercado.",
    logos: [
      { src: "/img/icons/fedex-logo.svg", alt: "FedEx" },
      { src: "/img/dhl-iso.svg", alt: "DHL" },
      { src: "/img/icons/estafeta-logo.svg", alt: "Estafeta" },
      { src: "/img/99min-iso.svg", alt: "99minutos" },
    ],
  },
];

/* Glass card surface — the previous solid #242424 read as a flat, washed-out
   gray. A translucent white fill + blur over the black band gives a darker,
   premium "glass" panel (CEO: "obscurecer un poco o poner transparencia"),
   while the colorful brand tiles still provide the pop of color. */
const CARD_SURFACE: React.CSSProperties = {
  background: "rgba(255,255,255,0.045)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.09)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 14px 34px rgba(0,0,0,0.42)",
};

/* White logo tiles — the brand marks pop against the dark card. */
function LogoTiles({ logos, compact = false }: { logos: Brand[]; compact?: boolean }) {
  const tileH = compact ? 30 : 38;
  const maxH = compact ? 16 : 20;
  const maxW = compact ? 34 : 44;
  return (
    <div className="flex flex-wrap items-center gap-1.5 tablet:gap-2">
      {logos.map((l) => (
        <div
          key={l.alt}
          className="flex items-center justify-center rounded-[8px] bg-white"
          style={{
            height: tileH,
            minWidth: tileH + 6,
            padding: "0 8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.22)",
          }}
        >
          <Image
            src={l.src}
            alt={l.alt}
            width={44}
            height={20}
            className="h-auto w-auto object-contain"
            style={{ maxHeight: maxH, maxWidth: maxW }}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * T1FeatureIntro
 *
 * The Vende / Cobra / Envía cards lifted out of T1Features and laid on a
 * dark band that sits between the hero and the white card section. Each card
 * now shows the real brand logos it includes (marketplaces / payment methods
 * / couriers) so the value is graphic at a glance.
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
          marginTop: 32,
          marginBottom: 56,
        }}
      >
        Todo tu negocio,
        <br className="tablet:hidden" />{" "}
        en un solo lugar
      </h2>

      {/* MOBILE — 3 cards stacked */}
      <div className="flex flex-col gap-4 tablet:hidden">
        {CARDS.map((item) => (
          <div
            key={item.id}
            className="flex flex-col rounded-[12px]"
            style={{ ...CARD_SURFACE, padding: "20px 20px" }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
              <p className="font-inter text-[16px] font-semibold uppercase tracking-[0.04em] text-white">
                {item.label}
              </p>
              <FeatureIcon id={item.id} size={24} color="#FFFFFF" />
            </div>
            <p className="font-inter text-[13.5px] font-normal text-white/70" style={{ lineHeight: 1.5, marginBottom: 18 }}>
              {item.desc}
            </p>
            <div className="mt-auto">
              <LogoTiles logos={item.logos} compact />
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP — 3-column card grid, equal heights */}
      <div className="hidden tablet:grid tablet:auto-rows-fr tablet:grid-cols-3 tablet:items-stretch tablet:gap-4 lg:gap-6">
        {CARDS.map((card) => (
          <div
            key={card.id}
            className="flex h-full flex-col rounded-[15px] transition-all duration-300 hover:scale-[1.01]"
            style={{ ...CARD_SURFACE, padding: "34px 30px" }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 22 }}>
              <p className="font-inter text-[18px] font-semibold uppercase tracking-[0.03em] text-white tablet:text-[20px]">
                {card.label}
              </p>
              <FeatureIcon id={card.id} size={26} color="#FFFFFF" />
            </div>
            <p className="w-full font-inter text-[15px] font-normal text-white/70 tablet:text-[16px]" style={{ lineHeight: 1.55, marginBottom: 26 }}>
              {card.desc}
            </p>
            <div className="mt-auto">
              <LogoTiles logos={card.logos} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
