"use client";

import Image from "next/image";

/* Carrusel de tiendas (no clickable) — reemplaza el mosaico con parallax.
   Fila que se desliza sola (marquee). Las imágenes son mocks; se repiten para
   llenar el loop. Pendiente: swap por capturas reales de tiendas. */

const STORES = [1, 2, 3, 4, 5, 6, 7];

function StoreCard({ n }: { n: number }) {
  return (
    <div className="mr-4 h-[250px] w-[188px] shrink-0 overflow-hidden rounded-[16px] border border-white/[0.08] bg-[#141215] tablet:mr-5 tablet:h-[290px] tablet:w-[220px]">
      <Image
        src={`/img/store-mock-${n}.png`}
        alt=""
        width={470}
        height={700}
        className="h-full w-full object-cover object-top"
        sizes="(max-width: 768px) 200px, 236px"
      />
    </div>
  );
}

export default function T1TiendaBento() {
  // Duplicado para que el marquee haga loop sin costura.
  const row = [...STORES, ...STORES];
  return (
    <section className="relative overflow-hidden bg-black py-[60px] tablet:py-[88px]">
      <div className="mx-auto max-w-[760px] px-5 text-center tablet:px-6">
        <h2 className="font-sora text-[26px] font-light leading-[1.12] text-white tablet:whitespace-nowrap tablet:text-[34px]" style={{ letterSpacing: "-0.03em" }}>
          Miles de negocios ya crecen con T1
        </h2>
        <p className="mx-auto mt-4 max-w-[440px] font-inter text-[15px] font-light leading-[1.55] text-white/60 tablet:text-[17px]">
          Cada día se crean nuevas tiendas que venden, cobran y envían desde un solo lugar.
        </p>
      </div>

      {/* Carrusel (no clickable) */}
      <div className="relative mt-10 tablet:mt-14" aria-hidden>
        <div className="marquee-track flex w-max items-stretch">
          {row.map((n, i) => (
            <StoreCard key={i} n={n} />
          ))}
        </div>
        {/* Máscaras laterales para que entre/salga suave */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[70px] tablet:w-[150px]" style={{ background: "linear-gradient(to right, #000 0%, transparent 100%)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[70px] tablet:w-[150px]" style={{ background: "linear-gradient(to left, #000 0%, transparent 100%)" }} />
      </div>
    </section>
  );
}
