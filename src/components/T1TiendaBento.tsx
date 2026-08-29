"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/* Mosaico asimétrico de tiendas reales (desktop + móvil) con parallax al hacer
   scroll y una card de texto que flota al centro. Va entre Marketplaces y Pagos.
   Las imágenes son mocks; se repiten a propósito para llenar el mosaico. */

const D = (k: number) => ({ src: "", w: 1122, h: 1402, k }); // desktop shot (ratio 0.80)
const M = (k: number) => ({ src: "", w: 941, h: 1672, k }); // mobile shot (ratio 0.56)
const shot = (n: number, k: number) => {
  const desktop = n <= 4;
  return { ...(desktop ? D(k) : M(k)), src: `/img/store-mock-${n}.png` };
};

// 4 columnas con offset vertical distinto => mosaico asimétrico, no alineado.
const COLS_DESKTOP = [
  { offset: 0, shots: [shot(1, -26), shot(6, 18), shot(3, -14)] },
  { offset: 54, shots: [shot(5, 24), shot(2, -18)] },
  { offset: 22, shots: [shot(7, -20), shot(4, 16), shot(1, -12)] },
  { offset: 72, shots: [shot(6, 22), shot(5, -16)] },
];
const COLS_MOBILE = [
  { offset: 0, shots: [shot(1, -14), shot(6, 12), shot(3, -10)] },
  { offset: 34, shots: [shot(5, 14), shot(2, -12), shot(4, 10)] },
];

type S = { src: string; w: number; h: number; k: number };

function ShotCard({ s }: { s: S }) {
  return (
    <div
      className="overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#141215]"
      style={{ transform: `translate3d(0, calc(var(--p, 0) * ${s.k}px), 0)`, willChange: "transform" }}
    >
      <Image src={s.src} alt="" width={s.w} height={s.h} className="h-auto w-full" sizes="(max-width: 768px) 45vw, 260px" />
    </div>
  );
}

function Columns({ cols }: { cols: { offset: number; shots: S[] }[] }) {
  return (
    <>
      {cols.map((c, ci) => (
        <div key={ci} className="flex flex-1 flex-col gap-3.5 tablet:gap-4" style={{ marginTop: c.offset }}>
          {c.shots.map((s, i) => <ShotCard key={i} s={s} />)}
        </div>
      ))}
    </>
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
    <section ref={ref} className="relative overflow-hidden bg-black px-5 py-[80px] tablet:px-6 tablet:py-[110px]">
      <div className="relative mx-auto max-w-[1120px]">
        {/* Mosaico — desktop (4 columnas escalonadas) */}
        <div className="hidden justify-center gap-4 tablet:flex" aria-hidden>
          <Columns cols={COLS_DESKTOP} />
        </div>
        {/* Mosaico — móvil (2 columnas escalonadas) */}
        <div className="flex justify-center gap-3.5 tablet:hidden" aria-hidden>
          <Columns cols={COLS_MOBILE} />
        </div>

        {/* Degradados en los bordes para que la sección no empiece/termine abrupta */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[120px] tablet:h-[160px]" style={{ background: "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.65) 45%, transparent 100%)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[120px] tablet:h-[160px]" style={{ background: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.65) 45%, transparent 100%)" }} />

        {/* Halo oscuro para dar foco a la card central */}
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2" style={{ width: "min(700px, 92%)", height: 380, background: "radial-gradient(ellipse at center, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.74) 46%, transparent 72%)" }} />

        {/* Card de texto — flota al centro y se mueve con el scroll (parallax) */}
        <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center px-4">
          <div
            className="relative w-full max-w-[440px] rounded-[22px] border border-white/[0.12] px-9 py-10 text-center"
            style={{
              transform: "translate3d(0, calc(var(--p, 0) * -46px), 0)",
              willChange: "transform",
              background:
                "radial-gradient(ellipse 80% 70% at 30% 15%, rgba(234,82,63,0.22) 0%, transparent 60%), linear-gradient(160deg, #1b1016 0%, #0d090c 60%, #070506 100%)",
              boxShadow: "0 30px 90px -18px rgba(0,0,0,0.9)",
            }}
          >
            <h2 className="font-sora text-[28px] font-light leading-[1.12] text-white tablet:text-[38px]" style={{ letterSpacing: "-0.03em" }}>
              Miles de negocios<br />ya crecen con T1
            </h2>
            <p className="mx-auto mt-4 max-w-[320px] font-inter text-[14px] font-light leading-[1.55] text-white/65 tablet:text-[15px]">
              Cada día se crean nuevas tiendas que venden, cobran y envían desde un solo lugar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
