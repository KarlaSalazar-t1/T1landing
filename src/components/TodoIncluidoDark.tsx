"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";

/* Dark-background variant of the "Todo incluido desde el día uno" section —
   black cards, each showing its pre-rendered v2 mockup image sticking out the
   top edge. Self-contained carousel state. */

const CARD_BG = "#121214";
const CARD_CLS =
  "incluye-card flex shrink-0 snap-start w-[80vw] max-w-[320px] tablet:w-[320px] flex-col rounded-[24px]";
const CARD_STYLE: React.CSSProperties = {
  boxShadow: "0 26px 60px -28px rgba(0,0,0,0.8)",
  background: CARD_BG,
  border: "1px solid rgba(255,255,255,0.06)",
};

/* Each card shows its pre-rendered v2 mockup image, sticking out the top edge
   of the black card. */
const INCLUYE_CARDS = [
  { img: "/img/incluye-responsive-v2.png", title: "Diseño responsive", desc: "Tu tienda se ve perfecta en cualquier dispositivo, sin esfuerzo." },
  { img: "/img/incluye-checkout-v2.png", title: "Checkout integrado", desc: "Pasarela de pagos lista, optimizada para conversión." },
  { img: "/img/incluye-seo-v2.png", title: "Optimizado para SEO", desc: "Estructura, metadatos y velocidad pensados para Google." },
  { img: "/img/incluye-catalogo-v2.png", title: "Catálogo inteligente", desc: "Sube fotos y la IA arma título, descripción y variantes." },
  { img: "/img/incluye-dominio-v2.png", title: "Dominio personalizado", desc: "Conecta tu dominio en minutos o usa uno de cortesía." },
  { img: "/img/incluye-metricas-v2.png", title: "Métricas en tiempo real", desc: "Dashboard de ventas, tráfico y comportamiento desde el día uno." },
];

export default function TodoIncluidoDark() {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [pages, setPages] = useState(1);

  const step = () => {
    const el = ref.current;
    const card = el?.querySelector<HTMLElement>(".incluye-card");
    return card ? card.offsetWidth + 28 : (el?.clientWidth ?? 0) * 0.8;
  };
  const pageStep = () => {
    const el = ref.current;
    if (!el) return 1;
    const s = Math.max(1, step());
    const visible = Math.max(1, Math.floor(el.clientWidth / s));
    return visible * s;
  };
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const calc = () => {
      const ps = Math.max(1, pageStep());
      const maxScroll = el.scrollWidth - el.clientWidth;
      setPages(maxScroll <= 1 ? 1 : Math.ceil(maxScroll / ps) + 1);
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const goTo = useCallback((i: number) => {
    const el = ref.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const target = i >= pages - 1 ? maxScroll : i * pageStep();
    el.scrollTo({ left: Math.min(target, maxScroll), behavior: "smooth" });
  }, [pages]);
  const scrollBy = useCallback((dir: number) => {
    goTo(Math.max(0, Math.min(pages - 1, idx + dir)));
  }, [goTo, idx, pages]);
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
    setIdx(atEnd ? pages - 1 : Math.min(pages - 1, Math.round(el.scrollLeft / Math.max(1, pageStep()))));
  };

  return (
    <section className="relative px-5 pb-[60px] pt-24 tablet:px-10 tablet:pb-[60px] tablet:pt-32">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
          <h2 className="font-sora text-[32px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
            Todo incluido desde el día uno
          </h2>
          <p className="font-inter text-[16px] font-light text-white/55 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
            Tu tienda nace con todo lo necesario para vender, optimizar y crecer.
          </p>
        </div>

        <div
          ref={ref}
          onScroll={onScroll}
          className="flex gap-7 overflow-x-auto snap-x snap-mandatory px-6 pt-24 pb-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollPaddingLeft: 24, scrollPaddingRight: 24 }}
        >
          {INCLUYE_CARDS.map((card) => (
            <div key={card.title} className={CARD_CLS} style={CARD_STYLE}>
              {/* v2 mockup image — top-aligned, sticks out above the card edge */}
              <div className="relative" style={{ height: 170 }}>
                <div className="absolute left-1/2 -translate-x-1/2" style={{ top: -56, width: "94%", height: 228 }}>
                  <Image
                    src={card.img}
                    alt=""
                    fill
                    className="pointer-events-none object-contain"
                    style={{ objectPosition: "center top", filter: "drop-shadow(0 22px 34px rgba(0,0,0,0.6))" }}
                    sizes="320px"
                  />
                </div>
              </div>
              <div className="px-6 pb-7 pt-1">
                <h3 className="font-sora text-[21px] font-normal text-white" style={{ marginBottom: 8, letterSpacing: "-0.01em" }}>{card.title}</h3>
                <p className="font-inter text-[14px] font-light text-white/55" style={{ lineHeight: 1.55 }}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-7 flex items-center justify-center gap-4">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Anterior" className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 transition-colors hover:border-white/30 hover:text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: pages }, (_, i) => i).map((i) => (
              <button key={i} type="button" onClick={() => goTo(i)} aria-label={`Ir a la tarjeta ${i + 1}`} className="cursor-pointer rounded-full border-none p-0 transition-all duration-200" style={{ width: idx === i ? 22 : 8, height: 8, background: idx === i ? "#DB3B2B" : "rgba(255,255,255,0.22)" }} />
            ))}
          </div>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Siguiente" className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 transition-colors hover:border-white/30 hover:text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
