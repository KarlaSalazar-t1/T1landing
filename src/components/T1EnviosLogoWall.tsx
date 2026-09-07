import Image from "next/image";

/* Muro de logos de clientes, inmediatamente debajo del hero (CAMBIO 7).
   Credibilidad para tráfico frío. Marcas que usan T1 Envíos.
   Por ahora solo las que tienen logo real en blanco: Sears, Makora, Pirma. */

const BRANDS = [
  { src: "/img/logo-sears-white.png", alt: "Sears", w: 335, h: 90 },
  { src: "/img/logo-makora-white.png", alt: "Makora", w: 420, h: 93 },
  { src: "/img/logo-pirma-white.png", alt: "Pirma", w: 280, h: 194 },
];

export default function T1EnviosLogoWall() {
  return (
    <section className="bg-black px-5 pt-10 pb-2 tablet:px-6 tablet:pt-14">
      <div className="mx-auto max-w-[var(--max-w)]">
        <p className="text-center font-inter text-[13px] font-medium uppercase tracking-[0.12em] text-white/40">
          Marcas que envían con T1
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 tablet:gap-x-20">
          {BRANDS.map((b) => (
            <Image
              key={b.alt}
              src={b.src}
              alt={b.alt}
              width={b.w}
              height={b.h}
              className="w-auto object-contain opacity-55"
              style={{ height: b.alt === "Pirma" ? 40 : 26 }}
              sizes="160px"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
