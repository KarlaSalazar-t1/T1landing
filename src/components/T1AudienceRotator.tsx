"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

/* Variante auto-rotativa de "Para cada etapa de tu negocio": muestra una etapa
   a la vez, avanza sola con un timer y el usuario puede cambiarla haciendo clic
   en las pestañas (lo que reinicia el timer). */

const AUDIENCES = [
  {
    id: "emprendedor",
    title: "Emprendedor",
    description: "Crea tu tienda, conecta pagos y envía tus primeros pedidos sin experiencia técnica.",
    cta: "Comienza gratis",
    ctaHref: "/registro",
    image: "/img/emprendedor-v4.png",
  },
  {
    id: "pyme",
    title: "PyME",
    description: "Conecta todos tus canales de venta, automatiza envíos y optimiza tus cobros.",
    cta: "Empezar ahora",
    ctaHref: "/registro",
    image: "/img/pyme-v4.png",
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "Opera alto volumen con infraestructura robusta, soporte dedicado e integraciones a la medida.",
    cta: "Habla con un experto",
    ctaHref: "/contacto-ventas",
    image: "/img/enterprise-v4.png",
  },
];

const DURATION = 5000;

export default function T1AudienceRotator() {
  const [active, setActive] = useState(0);
  const [barFull, setBarFull] = useState(false);

  useEffect(() => {
    setBarFull(false);
    const raf = requestAnimationFrame(() => setBarFull(true));
    const timer = setTimeout(() => setActive((a) => (a + 1) % AUDIENCES.length), DURATION);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [active]);

  const a = AUDIENCES[active];

  return (
    <section className="relative overflow-hidden bg-black" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="relative mx-auto max-w-[var(--max-w)] px-5 tablet:px-6">
        <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", textAlign: "center", marginBottom: 16 }}>
          Para cada etapa de tu negocio.
        </h2>
        <p className="mx-auto font-inter text-[16px] font-light text-white/85 tablet:whitespace-nowrap tablet:text-[18px]" style={{ textAlign: "center", marginBottom: 56 }}>
          Desde tu primera venta hasta una operación de alto volumen.
        </p>

        <div className="grid grid-cols-1 gap-8 tablet:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] tablet:items-center tablet:gap-8">
          {/* Left — selectable tabs */}
          <div className="flex flex-col gap-3.5">
            {AUDIENCES.map((it, i) => {
              const on = i === active;
              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className="w-full cursor-pointer rounded-[16px] border p-5 text-left transition-all duration-300"
                  style={{
                    borderColor: on ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.07)",
                    background: on ? "rgba(255,255,255,0.05)" : "transparent",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-sora text-[20px] font-normal tablet:text-[24px]" style={{ letterSpacing: "-0.02em", color: on ? "#FFFFFF" : "rgba(255,255,255,0.45)", transition: "color 0.3s" }}>
                      {it.title}
                    </h3>
                    <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full" style={{ background: on ? "#DB3B2B" : "rgba(255,255,255,0.08)", transition: "background 0.3s" }}>
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke={on ? "#fff" : "rgba(255,255,255,0.4)"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </div>
                  {on && (
                    <>
                      <p className="font-inter text-[14px] font-normal leading-relaxed text-white/60 tablet:text-[16px]" style={{ marginTop: 12 }}>
                        {it.description}
                      </p>
                      {/* progress bar — auto-advance timer */}
                      <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.10)" }}>
                        <div
                          style={{
                            height: "100%",
                            width: barFull ? "100%" : "0%",
                            background: "#DB3B2B",
                            transition: barFull ? `width ${DURATION}ms linear` : "none",
                          }}
                        />
                      </div>
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right — active stage image + CTA, con el glow que viaja por el
              contorno (audience-beam). El beam NO se remonta al cambiar de tab
              (solo la <Image> lleva key), así que gira sin detenerse. */}
          <div className="audience-card-wrap flex w-full justify-center tablet:justify-start">
            <div className="audience-card flex w-full" style={{ maxWidth: 460 }}>
              <span className="audience-beam" aria-hidden />
              <div className="relative z-[1] w-full overflow-hidden rounded-[18.5px]" style={{ background: "#1b1714" }}>
                <div className="relative w-full" style={{ aspectRatio: "741 / 565" }}>
                  <Image
                    key={a.id}
                    src={a.image}
                    alt={a.title}
                    fill
                    className="object-cover"
                    style={{ animation: "fadeSlideIn 0.5s ease-out" }}
                    sizes="(max-width: 768px) 90vw, 460px"
                  />
                  <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.75) 100%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5 tablet:p-7">
                    <a
                      href={a.ctaHref}
                      className="inline-flex items-center gap-2 rounded-[13px] bg-[#DB3B2B] px-6 py-3 font-inter text-[14px] font-semibold text-white no-underline transition-colors duration-150 hover:bg-[#C0332A]"
                    >
                      {a.cta}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
