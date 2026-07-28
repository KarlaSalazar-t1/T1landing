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

/* NOTA: si tienes tus propios íconos "circle" (dhl-circle, ml-circle, etc.),
   colócalos en /public/img y cambia los `src` de abajo. Aquí uso los isotipos y
   logos de marca que ya existen en el proyecto. */
const CARDS: Card[] = [
  {
    id: "vende",
    label: "Vende",
    desc: "En más de 10 canales de venta: tienda en línea, marketplaces y redes sociales.",
    glow: "#E0402F",
    iconStyle: "circle",
    icons: [
      { src: "/img/logos/brands/mercadolibre.webp" },
      { src: "/img/logos/brands/amazon.webp" },
      { src: "/img/aliexpress.svg", white: true },
      { src: "/img/logos/brands/shein.webp" },
      { src: "/img/logos/brands/sears.webp" },
      { src: "/img/logos/brands/tiktokshop.webp" },
      { src: "/img/meta.png", white: true },
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
      { src: "/img/logos/brands/carnet.webp" },
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
      { src: "/img/logos/brands/dhl.webp" },
      { src: "/img/logos/brands/fedex.webp" },
      { src: "/img/ups-iso.svg" },
      { src: "/img/carriers/jtexpress.svg", white: true },
      { src: "/img/logos/brands/grupo-ampm.webp" },
      { src: "/img/logos/brands/99minutos.webp" },
      { src: "/img/logos/brands/paquetexpress.webp" },
    ],
  },
];

/* Charcoal card + halo suave por card (rojo / azul) para que resalte sobre el
   fondo negro. */
function cardStyle(glow: string, padding: string): React.CSSProperties {
  return {
    background: "#141414",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: `0 14px 34px rgba(0,0,0,0.55), 0 0 60px -20px ${glow}55`,
    padding,
  };
}

/* Grid de íconos: círculos para canales/paqueterías, tarjetas blancas para
   métodos de pago (como en la referencia). */
function IconGrid({ card }: { card: Card }) {
  if (card.iconStyle === "card") {
    return (
      <div className="flex flex-wrap gap-2">
        {card.icons.map((ic) => (
          <div key={ic.src} className="flex h-[38px] w-[58px] items-center justify-center rounded-[9px] bg-white">
            <Image src={ic.src} alt="" width={80} height={52} className="h-[56%] w-auto max-w-[74%] object-contain" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-2.5">
      {card.icons.map((ic) => (
        <div
          key={ic.src}
          className="flex h-[46px] w-[46px] items-center justify-center overflow-hidden rounded-full"
          style={ic.white ? { background: "#fff" } : undefined}
        >
          <Image
            src={ic.src}
            alt=""
            width={92}
            height={92}
            className={ic.white ? "h-[62%] w-[62%] object-contain" : "h-full w-full object-cover"}
            style={ic.white ? undefined : { filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.4))" }}
          />
        </div>
      ))}
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
