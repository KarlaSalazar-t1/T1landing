"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ENVIOS_RATE_EXAMPLES } from "@/lib/constants";

/* Visual del hero de Envíos: caja (dos capas: atrás + frente) en la que van
   CAYENDO distintos productos que rebotan y se acomodan en bucle — con las
   paqueterías orbitando alrededor (solo desktop) y un chip de tarifa (CDMX → …)
   que cicla encima. Todo decorativo / no interactivo.

   Occlusion: caja-back (z10) → productos (z20) → caja-front (z30). Así los
   objetos se meten detrás de la pared frontal al caer. */

const LOGOS = [
  "/img/circles/ups.svg",
  "/img/circles/fedex.svg",
  "/img/circles/dhl.svg",
  "/img/circles/ampm.svg",
  "/img/circles/99.svg",
  "/img/circles/jt.svg",
  "/img/circles/estafeta.svg",
];
const DUR = 32; // segundos por vuelta (órbita)
const BOX_DUR = 8.4; // segundos por ciclo de caída

/* Productos que caen dentro de la caja. w = ancho en % del lienzo; dx/dy =
   posición de reposo relativa al centro de la boca; rot = giro al asentarse;
   delay reparte las caídas a lo largo del ciclo. */
const PRODUCTS = [
  { src: "/img/envios-box/prod-02.png", n: 666, w: "45%", dx: "9%", dy: "-4%", rot: -6, delay: 0.0 },   // chamarra
  { src: "/img/envios-box/prod-03.png", n: 705, w: "44%", dx: "-9%", dy: "5%", rot: 5, delay: 1.2 },    // suéter
  { src: "/img/envios-box/prod-06.png", n: 462, w: "38%", dx: "2%", dy: "8%", rot: -3, delay: 2.4 },    // bolsa
  { src: "/img/envios-box/prod-07.png", n: 396, w: "37%", dx: "17%", dy: "6%", rot: 4, delay: 3.6 },    // audífonos
  { src: "/img/envios-box/prod-01.png", n: 234, w: "20%", dx: "-21%", dy: "9%", rot: -5, delay: 4.8 },  // crema
  { src: "/img/envios-box/prod-04.png", n: 293, w: "20%", dx: "22%", dy: "-1%", rot: 7, delay: 6.0 },   // smartphone
  { src: "/img/envios-box/prod-05.png", n: 290, w: "30%", dx: "-19%", dy: "-2%", rot: -2, delay: 7.2 }, // collar
];

const Arrow = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#E2604C]"><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function T1EnviosHeroVisual() {
  const n = LOGOS.length;
  const radius = 194;
  const [q, setQ] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setQ((v) => (v + 1) % ENVIOS_RATE_EXAMPLES.length), 3200);
    return () => clearInterval(t);
  }, []);
  const r = ENVIOS_RATE_EXAMPLES[q];

  /* El video WEBM tiene alpha y se ve mejor, pero Safari no soporta alpha en
     WebM → ahí (y con reduced-motion) caemos a la animación CSS con los PNG. */
  const [useVideo, setUseVideo] = useState(true);
  useEffect(() => {
    const ua = navigator.userAgent;
    const isSafari = /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(ua);
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (isSafari || reduce) setUseVideo(false);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[340px] select-none tablet:aspect-square tablet:w-[440px] tablet:max-w-none">
      {/* Glow cálido */}
      <div aria-hidden className="absolute inset-[-12%] rounded-full" style={{ background: "radial-gradient(ellipse at 50% 46%, rgba(229,144,134,0.18) 0%, transparent 62%)" }} />

      {/* Aro + logos orbitando — solo desktop (en móvil satura) */}
      <div className="pointer-events-none absolute inset-0 hidden tablet:block" aria-hidden>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: radius * 2, height: radius * 2, border: "1.5px solid rgba(219,59,43,0.22)", boxShadow: "0 0 0 14px rgba(219,59,43,0.03)" }} />
        {LOGOS.map((src, i) => (
          <div
            key={src}
            className="halo-orbit-item absolute left-1/2 top-1/2"
            style={{
              width: 66,
              height: 66,
              margin: "-33px 0 0 -33px",
              transformOrigin: "33px 33px",
              ["--halo-r" as string]: `${radius}px`,
              animation: `halo-orbit ${DUR}s linear infinite`,
              animationDelay: `${-(DUR / n) * i}s`,
            }}
          >
            <span className="flex h-[66px] w-[66px] items-center justify-center overflow-hidden rounded-full bg-white" style={{ boxShadow: "0 6px 22px rgba(0,0,0,0.20)" }}>
              <Image src={src} alt="" width={88} height={88} className="h-full w-full scale-[1.06] object-cover" />
            </span>
          </div>
        ))}
      </div>

      {/* Caja animada (centro) + chip de tarifa encima */}
      <div className="relative mx-auto w-full tablet:absolute tablet:left-1/2 tablet:top-1/2 tablet:w-[320px] tablet:-translate-x-1/2 tablet:-translate-y-1/2">
        {/* Lienzo cuadrado: video WEBM (con alpha) o, en su defecto, las 3 capas CSS */}
        <div className="relative aspect-square w-full" style={{ filter: "drop-shadow(0 26px 52px rgba(0,0,0,0.5))" }}>
          {useVideo ? (
            /* Video renderizado: productos entrando a la caja (fondo transparente) */
            <video
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 h-full w-full object-contain"
            >
              <source src="/video/envios/caja.webm" type="video/webm" />
            </video>
          ) : (
            <>
              {/* Capa 1 — atrás de la caja */}
              <Image src="/img/envios-box/caja-back.png" alt="" width={1254} height={1254} priority draggable={false} className="pointer-events-none absolute inset-0 z-10 h-full w-full object-contain" />

              {/* Capa 2 — productos que caen */}
              <div className="pointer-events-none absolute inset-0 z-20" aria-hidden>
                {PRODUCTS.map((p) => (
                  <div
                    key={p.src}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `calc(50% + ${p.dx})`, top: `calc(47% + ${p.dy})`, width: p.w }}
                  >
                    <div className="box-drop-item" style={{ ["--r" as string]: `${p.rot}deg`, ["--box-dur" as string]: `${BOX_DUR}s`, animationDelay: `${p.delay}s` }}>
                      <Image src={p.src} alt="" width={p.n} height={p.n} draggable={false} className="h-auto w-full object-contain" style={{ filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.32))" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Capa 3 — frente de la caja (tapa la parte baja de los productos) */}
              <Image src="/img/envios-box/caja-front.png" alt="Empaca y envía tus productos con T1" width={1254} height={1254} priority draggable={false} className="pointer-events-none absolute inset-0 z-30 h-full w-full object-contain" />
            </>
          )}

          {/* Chip de tarifa (cicla rutas) — gancho encima de la caja */}
          <div aria-hidden className="pointer-events-none absolute bottom-[8%] left-1/2 z-40 -translate-x-1/2">
            <div key={q} className="flex w-max items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3.5 py-2 backdrop-blur-md" style={{ animation: "fadeSlideIn 0.4s ease-out", boxShadow: "0 12px 30px rgba(0,0,0,0.45)" }}>
              <span className="flex items-center gap-1.5 font-inter text-[11.5px] font-medium text-white/85">
                {r.from}
                {Arrow}
                {r.to}
              </span>
              <span className="font-inter text-[11px] text-white/45">desde</span>
              <span className="font-inter text-[13px] font-bold text-white">${r.price}</span>
            </div>
          </div>
        </div>

        {/* Paqueterías en móvil — 2 líneas debajo del video (la órbita va en desktop) */}
        <div className="mt-5 flex flex-col items-center gap-3 tablet:hidden" aria-hidden>
          {[LOGOS.slice(0, 4), LOGOS.slice(4)].map((row, ri) => (
            <div key={ri} className="flex items-center justify-center gap-3.5">
              {row.map((src) => (
                <span key={src} className="flex h-[44px] w-[44px] items-center justify-center overflow-hidden rounded-full bg-white" style={{ boxShadow: "0 5px 14px rgba(0,0,0,0.28)" }}>
                  <Image src={src} alt="" width={64} height={64} className="h-full w-full scale-[1.06] object-cover" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
