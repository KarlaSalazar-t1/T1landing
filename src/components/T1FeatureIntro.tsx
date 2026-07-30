"use client";

import Image from "next/image";

/* Íconos por card.
   - `white` → logo rectangular/plano que va dentro de un fondo blanco (círculo o
     tarjeta) para que se lea; se muestra con object-contain.
   - sin `white` → app-icon de marca que llena el círculo (object-cover). */
type Icon = { src: string; white?: boolean };
type Card = {
  id: string;
  label: string;
  desc: string;
  glow: string;
  iconStyle: "circle" | "card";
  icons: Icon[];
  /* Máx. de íconos visibles en una línea antes del "+X" (undefined = todos). */
  maxVisible?: number;
  plus?: string;
  ctaLabel: string;
  ctaHref: string;
};

/* Íconos circulares de marca en /public/img/circles (provistos por el equipo). */
const CARDS: Card[] = [
  {
    id: "vende",
    label: "Vende",
    desc: "En más de 10 canales de venta: tienda en línea, marketplaces y redes sociales.",
    glow: "#E0402F",
    iconStyle: "circle",
    icons: [
      { src: "/img/circles/ml.svg" },
      { src: "/img/circles/amazon.svg" },
      { src: "/img/circles/shein.svg" },
      { src: "/img/circles/sears.svg" },
      { src: "/img/circles/sanborns.svg" },
      { src: "/img/circles/meta.svg" },
    ],
    maxVisible: 5,
    plus: "+5",
    ctaLabel: "Conoce T1 Tienda",
    ctaHref: "/productos/t1tienda",
  },
  {
    id: "cobra",
    label: "Cobra",
    desc: "Con múltiples métodos de pago y ofrece meses sin intereses.",
    glow: "#2F6BFF",
    iconStyle: "card",
    icons: [
      { src: "/img/logos/brands/kueski.webp" },
      { src: "/img/logos/brands/visa.webp" },
      { src: "/img/logos/brands/mastercard.webp" },
      { src: "/img/logos/brands/amex.webp" },
      { src: "/img/logos/brands/spei.webp" },
    ],
    ctaLabel: "Conoce T1 Pagos",
    ctaHref: "/productos/t1pagos",
  },
  {
    id: "envia",
    label: "Envía",
    desc: "Con más de 10 paqueterías: rastrea y administra tus envíos en un panel.",
    glow: "#E0402F",
    iconStyle: "circle",
    icons: [
      { src: "/img/circles/dhl.svg" },
      { src: "/img/circles/fedex.svg" },
      { src: "/img/circles/ups.svg" },
      { src: "/img/circles/jt.svg" },
      { src: "/img/circles/ampm.svg" },
      { src: "/img/circles/99.svg" },
    ],
    maxVisible: 5,
    plus: "+5",
    ctaLabel: "Conoce T1 Envíos",
    ctaHref: "/productos/t1envios",
  },
];

/* Link CTA con flecha (mismo patrón que "Comienza gratis →") */
function CardCta({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="group/cta inline-flex items-center gap-1.5 font-inter text-[14px] font-semibold text-white no-underline transition-colors hover:text-white/70"
    >
      {label}
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-150 group-hover/cta:translate-x-0.5">
        <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

/* Charcoal card + halo suave por card (rojo / azul) para que resalte sobre el
   fondo negro. */
function cardStyle(_glow: string, padding: string): React.CSSProperties {
  return {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.14)",
    padding,
  };
}

/* Íconos en una sola línea: pagos muestra todos; canales/paqueterías muestran
   los que caben (maxVisible) y un "+X" al final. */
function IconGrid({ card }: { card: Card }) {
  const isCard = card.iconStyle === "card";
  const visible = card.maxVisible != null ? card.icons.slice(0, card.maxVisible) : card.icons;
  return (
    <div className="flex items-center justify-center gap-2">
      {visible.map((ic) =>
        isCard ? (
          <div key={ic.src} className="flex h-[30px] w-[46px] shrink-0 items-center justify-center rounded-[8px] bg-white">
            <Image src={ic.src} alt="" width={80} height={52} className="h-[56%] w-auto max-w-[74%] object-contain" />
          </div>
        ) : (
          <div
            key={ic.src}
            className="flex h-[32px] w-[32px] shrink-0 items-center justify-center overflow-hidden rounded-full"
            style={ic.white ? { background: "#fff" } : undefined}
          >
            <Image
              src={ic.src}
              alt=""
              width={64}
              height={64}
              className={ic.white ? "h-[62%] w-[62%] object-contain" : "h-full w-full object-cover"}
              style={ic.white ? undefined : { filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.4))" }}
            />
          </div>
        )
      )}
      {card.plus && (
        <span className="flex h-[32px] shrink-0 items-center rounded-full border border-white/20 px-2.5 font-inter text-[12px] font-semibold text-white/70">{card.plus}</span>
      )}
    </div>
  );
}

/**
 * T1FeatureIntro
 *
 * Cards Vende / Cobra / Envía: título + descripción + grid de íconos (canales,
 * métodos de pago y paqueterías) sobre la banda negra entre el hero y la sección
 * de cards blanca.
 */
export default function T1FeatureIntro() {
  return (
    <div className="relative mx-auto w-full max-w-[var(--max-w)] px-5 tablet:px-6">
      {/* MOBILE — 3 cards apiladas */}
      <div className="flex flex-col gap-4 tablet:hidden">
        {CARDS.map((item, i) => (
          <div
            key={item.id}
            className="fi-reveal flex flex-col rounded-[16px]"
            style={{ ...cardStyle(item.glow, "24px 22px"), ["--fi-range" as string]: `entry ${8 + i * 5}% cover ${40 + i * 7}%` } as React.CSSProperties}
          >
            <p className="font-inter text-[24px] font-normal text-white" style={{ marginBottom: 12 }}>
              {item.label}
            </p>
            <p className="font-inter text-[16px] font-normal leading-relaxed text-white/70" style={{ marginBottom: 22 }}>
              {item.desc}
            </p>
            <IconGrid card={item} />
            <div style={{ marginTop: 22 }}>
              <CardCta label={item.ctaLabel} href={item.ctaHref} />
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP — grid de 3 columnas, alturas iguales */}
      <div className="hidden tablet:grid tablet:auto-rows-fr tablet:grid-cols-3 tablet:items-stretch tablet:gap-4 lg:gap-6">
        {CARDS.map((card, i) => (
          <div
            key={card.id}
            className="fi-reveal flex h-full flex-col rounded-[16px] transition-transform duration-300 hover:scale-[1.01]"
            style={{ ...cardStyle(card.glow, "34px 30px"), ["--fi-range" as string]: `entry ${8 + i * 6}% cover ${42 + i * 8}%` } as React.CSSProperties}
          >
            <p className="font-inter text-[22px] font-normal text-white" style={{ marginBottom: 14 }}>
              {card.label}
            </p>
            <p className="w-full font-inter text-[15px] font-normal leading-relaxed text-white/70" style={{ marginBottom: 28, minHeight: 66 }}>
              {card.desc}
            </p>
            <div className="mt-auto">
              <IconGrid card={card} />
              <div style={{ marginTop: 26 }}>
                <CardCta label={card.ctaLabel} href={card.ctaHref} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
