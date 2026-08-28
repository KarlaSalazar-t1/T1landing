"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/* Mosaico bento de tiendas reales (desktop + móvil) con parallax al hacer scroll
   y una card central con degradado + mensaje. Va entre Marketplaces y Pagos. */

type Shot = { src: string; alt: string; k: number };

// k = intensidad/dirección del parallax (px por unidad de progreso)
const LEFT: Shot[] = [
  { src: "/img/store-mock-1.png", alt: "Tienda en línea creada con T1", k: -22 },
  { src: "/img/store-mock-5.png", alt: "Tienda móvil creada con T1", k: 16 },
];
const RIGHT: Shot[] = [
  { src: "/img/store-mock-6.png", alt: "Tienda móvil creada con T1", k: -16 },
  { src: "/img/store-mock-4.png", alt: "Tienda en línea creada con T1", k: 22 },
];
const MOBILE: Shot[] = [
  { src: "/img/store-mock-1.png", alt: "Tienda creada con T1", k: -14 },
  { src: "/img/store-mock-5.png", alt: "Tienda creada con T1", k: 14 },
  { src: "/img/store-mock-6.png", alt: "Tienda creada con T1", k: -14 },
  { src: "/img/store-mock-4.png", alt: "Tienda creada con T1", k: 14 },
];

function Shot({ shot, sizes }: { shot: Shot; sizes: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#141215]">
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        className="object-cover object-top"
        style={{ transform: `scale(1.16) translate3d(0, calc(var(--p, 0) * ${shot.k}px), 0)` }}
        sizes={sizes}
      />
    </div>
  );
}

function TextCard() {
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[20px] border border-white/[0.10] px-7 py-10 text-center"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 30% 18%, rgba(234,82,63,0.30) 0%, transparent 62%), radial-gradient(ellipse 60% 60% at 90% 100%, rgba(78,98,199,0.22) 0%, transparent 60%), linear-gradient(160deg, #2a1522 0%, #170d14 55%, #0a070a 100%)",
      }}
    >
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 font-inter text-[12px] font-semibold uppercase tracking-[0.14em] text-white/75">
        <span aria-hidden className="h-[6px] w-[6px] rounded-full bg-[#DB3B2B]" style={{ boxShadow: "0 0 10px 1px rgba(219,59,43,0.8)" }} />
        T1 Tienda
      </span>
      <h2 className="font-sora text-[30px] font-light leading-[1.1] text-white tablet:text-[40px]" style={{ letterSpacing: "-0.03em" }}>
        Miles de tiendas<br />nuevas cada día
      </h2>
      <p className="mx-auto mt-5 max-w-[360px] font-inter text-[15px] font-light leading-[1.55] text-white/70 tablet:text-[16px]">
        Negocios de todo México ya crecen con T1: crean su tienda, cobran y envían desde un solo lugar.
      </p>
    </div>
  );
}

export default function T1TiendaBento() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const p = Math.max(-1, Math.min(1, ((vh / 2) - (r.top + r.height / 2)) / (vh / 2 + r.height / 2)));
        el.style.setProperty("--p", p.toFixed(4));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="overflow-hidden bg-black px-5 py-[90px] tablet:px-6 tablet:py-[120px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        {/* Desktop — mosaico bento */}
        <div className="hidden gap-4 tablet:flex" style={{ height: 560 }}>
          <div className="flex flex-[0.92] flex-col gap-4">
            <div className="basis-[42%]"><Shot shot={LEFT[0]} sizes="320px" /></div>
            <div className="basis-[58%]"><Shot shot={LEFT[1]} sizes="320px" /></div>
          </div>
          <div className="flex-[1.28]"><TextCard /></div>
          <div className="flex flex-[0.92] flex-col gap-4">
            <div className="basis-[58%]"><Shot shot={RIGHT[0]} sizes="320px" /></div>
            <div className="basis-[42%]"><Shot shot={RIGHT[1]} sizes="320px" /></div>
          </div>
        </div>

        {/* Móvil — imágenes en 2 columnas con la card de texto en medio */}
        <div className="flex flex-col gap-3 tablet:hidden">
          <div className="grid grid-cols-2 gap-3">
            {MOBILE.slice(0, 2).map((s) => (
              <div key={s.src} className="h-[220px]"><Shot shot={s} sizes="45vw" /></div>
            ))}
          </div>
          <div className="min-h-[260px]"><TextCard /></div>
          <div className="grid grid-cols-2 gap-3">
            {MOBILE.slice(2).map((s) => (
              <div key={s.src} className="h-[220px]"><Shot shot={s} sizes="45vw" /></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
