"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const AUDIENCES = [
  {
    id: "emprendedor",
    title: "Emprendedor",
    description: "Crea tu tienda, conecta pagos y envía tus primeros pedidos sin experiencia técnica.",
    cta: "Comienza gratis",
    ctaHref: "/registro",
    image: "/img/emprendedor-v3.png",
    glow: "rgba(224,64,47,0.55)", // red
  },
  {
    id: "pyme",
    title: "PyME",
    description: "Conecta todos tus canales de venta, automatiza envíos y optimiza tus cobros.",
    cta: "Empezar ahora",
    ctaHref: "/registro",
    image: "/img/pyme-v5.png",
    glow: "rgba(59,110,255,0.55)", // blue
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "Infraestructura robusta con soporte dedicado y SLAs garantizados para alto volumen.",
    cta: "Habla con un experto",
    ctaHref: "/contacto-ventas",
    image: "/img/enterprise-v4.png",
    glow: "rgba(224,64,47,0.55)", // red
  },
];

export default function T1Audience() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  /* Track scroll-snap position for dot indicators */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrollLeft = el.scrollLeft;
      const width = el.offsetWidth;
      const idx = Math.round(scrollLeft / width);
      setActiveIdx(Math.min(idx, AUDIENCES.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative overflow-hidden bg-black" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="relative mx-auto max-w-[var(--max-w)] px-5 tablet:px-6">
        <h2
          className="font-sora text-[28px] font-light text-white tablet:text-[44px]"
          style={{ letterSpacing: "-0.03em", textAlign: "center", marginBottom: 16 }}
        >
          ¿Para quién es T1?
        </h2>
        <p
          className="mx-auto font-inter text-[16px] font-light text-white/45 tablet:text-[18px]"
          style={{ textAlign: "center", maxWidth: 500, marginBottom: 56 }}
        >
          Una plataforma que crece contigo.
        </p>

        {/* Desktop: 3-column grid */}
        <div className="hidden tablet:grid tablet:grid-cols-3 tablet:gap-6">
          {AUDIENCES.map((a) => (
            <div
              key={a.id}
              className="group flex flex-col overflow-hidden rounded-[20px] border border-white/[0.08]"
              style={{
                background: "#1b1714",
                boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 0 95px -14px ${a.glow}, 0 24px 64px -30px rgba(0,0,0,0.7)`,
              }}
            >
              {/* Image area — ~60% of card */}
              <div className="relative overflow-hidden" style={{ height: 280 }}>
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text area */}
              <div className="flex flex-1 flex-col p-6" style={{ paddingTop: 24 }}>
                <h3
                  className="font-sora text-[24px] font-normal text-white"
                  style={{ letterSpacing: "-0.02em", marginBottom: 10 }}
                >
                  {a.title}
                </h3>
                <p
                  className="font-inter text-[14px] font-normal leading-relaxed text-white/55"
                  style={{ marginBottom: 20 }}
                >
                  {a.description}
                </p>
                <a
                  href={a.ctaHref}
                  className="mt-auto inline-flex w-fit items-center gap-1.5 font-inter text-[13px] font-semibold text-white/70 no-underline transition-colors duration-150 hover:text-white"
                >
                  {a.cta}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: horizontal carousel with scroll-snap */}
        <div className="tablet:hidden">
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch", paddingBottom: 4 }}
          >
            {AUDIENCES.map((a) => (
              <div
                key={a.id}
                className="flex w-[85vw] shrink-0 snap-center flex-col overflow-hidden rounded-[20px] border border-white/[0.08]"
                style={{
                  background: "#1b1714",
                  maxWidth: 340,
                  boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 0 75px -14px ${a.glow}, 0 18px 50px -28px rgba(0,0,0,0.65)`,
                }}
              >
                {/* Image area */}
                <div className="relative overflow-hidden" style={{ height: 220 }}>
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text area */}
                <div className="flex flex-1 flex-col p-5" style={{ paddingTop: 20 }}>
                  <h3
                    className="font-sora text-[22px] font-normal text-white"
                    style={{ letterSpacing: "-0.02em", marginBottom: 8 }}
                  >
                    {a.title}
                  </h3>
                  <p
                    className="font-inter text-[13px] font-normal leading-relaxed text-white/55"
                    style={{ marginBottom: 16 }}
                  >
                    {a.description}
                  </p>
                  <a
                    href={a.ctaHref}
                    className="mt-auto inline-flex w-fit items-center gap-1.5 font-inter text-[13px] font-semibold text-white/70 no-underline"
                  >
                    {a.cta}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2" style={{ marginTop: 20 }}>
            {AUDIENCES.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-200"
                style={{
                  width: activeIdx === i ? 20 : 6,
                  height: 6,
                  background: activeIdx === i ? "#D93A26" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
