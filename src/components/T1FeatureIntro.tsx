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
  },
];

/* Charcoal card + halo suave por card (rojo / azul) para que resalte sobre el
   fondo negro. */
function cardStyle(_glow: string, padding: string): React.CSSProperties {
  return {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.14)",
    padding,
  };
}

/* Grid de íconos: círculos para canales/paqueterías, tarjetas blancas para
   métodos de pago (como en la referencia). */
function IconGrid({ card }: { card: Card }) {
  if (card.iconStyle === "card") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2">
        {card.icons.map((ic) => (
          <div key={ic.src} className="flex h-[32px] w-[50px] items-center justify-center rounded-[8px] bg-white">
            <Image src={ic.src} alt="" width={80} height={52} className="h-[56%] w-auto max-w-[74%] object-contain" />
          </div>
        ))}
        <span className="flex h-[32px] items-center rounded-full border border-white/20 px-3 font-inter text-[12px] font-medium text-white/65">y más</span>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      {card.icons.map((ic) => (
        <div
          key={ic.src}
          className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full"
          style={ic.white ? { background: "#fff" } : undefined}
        >
          <Image
            src={ic.src}
            alt=""
            width={76}
            height={76}
            className={ic.white ? "h-[62%] w-[62%] object-contain" : "h-full w-full object-cover"}
            style={ic.white ? undefined : { filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.4))" }}
          />
        </div>
      ))}
      <span className="flex h-[38px] items-center rounded-full border border-white/20 px-3 font-inter text-[12px] font-medium text-white/65">y más</span>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
