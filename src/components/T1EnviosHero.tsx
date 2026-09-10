"use client";

import Image from "next/image";
import { ENVIOS_SIGNUP_URL, ENVIOS_STATS } from "@/lib/constants";
import T1EnviosCotizadorPanel from "@/components/T1EnviosCotizadorPanel";
import HeroBackground from "@/components/HeroBackground";

const SOCIAL_PROOF = [ENVIOS_STATS.enviosEntregados + " de envíos", ENVIOS_STATS.negocios + " negocios", ENVIOS_STATS.paqueterias + " paqueterías"];
const CARRIERS = ["/img/circles/ups.svg", "/img/circles/fedex.svg", "/img/circles/dhl.svg", "/img/circles/ampm.svg", "/img/circles/99.svg", "/img/circles/jt.svg", "/img/circles/estafeta.svg"];

const ArrowRight = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* Fila de logos de paquetería (reemplaza la órbita que se recortaba).
   Móvil: una fila con scroll horizontal. Desktop: fila centrada con wrap. */
function CarrierLogos() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2.5 tablet:gap-3">
      {CARRIERS.map((src) => (
        <span key={src} className="flex h-[36px] w-[36px] shrink-0 items-center justify-center overflow-hidden rounded-full tablet:h-[40px] tablet:w-[40px]" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.30)" }}>
          <Image src={src} alt="" width={80} height={80} className="h-full w-full object-cover" />
        </span>
      ))}
    </div>
  );
}

export default function T1EnviosHero() {
  return (
    <div className="relative z-0">
      <section id="cotizador" className="relative flex min-h-[92svh] scroll-mt-20 flex-col items-center justify-center overflow-hidden px-5 pb-0 pt-24 tablet:min-h-screen tablet:px-6 tablet:pt-28 tablet:pb-0">
        {/* Fondo (compartido entre los heroes) */}
        <HeroBackground fadeHeight={640} />

        {/* Contenido */}
        <div className="relative z-10 flex w-full max-w-[var(--max-w)] grow flex-col justify-center">
          <div className="grid grid-cols-1 items-center gap-8 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] tablet:gap-10">
            {/* Izquierda — texto */}
            <div className="flex flex-col items-center text-center tablet:items-start tablet:text-left">
              <h1 className="font-sora text-[34px] font-light leading-[1.12] text-white tablet:text-[52px] desktop:text-[54px]" style={{ letterSpacing: "-0.03em" }}>
                Todos tus envíos,
                <br />
                un solo lugar
              </h1>

              <p className="mt-4 max-w-[520px] font-inter text-[15px] font-light leading-[1.5] text-white/80 tablet:text-[18px]">
                Las mejores tarifas, sin volumen mínimo ni contratos.
              </p>

              {/* Móvil: cotizador funcional + logos */}
              <div className="mt-7 w-full tablet:hidden">
                <T1EnviosCotizadorPanel />
                <div className="mt-6">
                  <CarrierLogos />
                </div>
              </div>

              {/* CTA */}
              <a href={ENVIOS_SIGNUP_URL} data-cta-location="hero" data-cta-text="Comienza a enviar" data-cta-destination={ENVIOS_SIGNUP_URL} className="mt-8 inline-flex h-[52px] items-center justify-center gap-2 rounded-[16px] bg-red-500 px-8 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-red-600 tablet:mt-9">
                Comienza a enviar
                {ArrowRight}
              </a>
            </div>

            {/* Derecha — cotizador (más grande) + logos en fila (sólo desktop) */}
            <div className="hidden flex-col items-center gap-7 tablet:flex">
              <div className="w-full max-w-[468px]">
                <T1EnviosCotizadorPanel />
              </div>
              <div className="w-full max-w-[468px]">
                <CarrierLogos />
              </div>
            </div>
          </div>

          {/* Social proof — métrica grande arriba, dos abajo */}
          <div className="mt-12 mb-10 flex flex-col items-center gap-2.5 px-2 text-center tablet:mt-16 tablet:mb-0 tablet:gap-4">
            <span className="font-inter text-[19px] font-normal text-white tablet:text-[24px]">{SOCIAL_PROOF[0]}</span>
            <div className="flex items-center gap-6 tablet:gap-12">
              {SOCIAL_PROOF.slice(1).map((s) => (
                <span key={s} className="font-inter text-[15px] font-normal text-white/75 tablet:text-[18px]">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
