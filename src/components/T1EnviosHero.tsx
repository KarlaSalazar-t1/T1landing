"use client";

import { ENVIOS_SIGNUP_URL } from "@/lib/constants";
import T1EnviosCotizadorPanel from "@/components/T1EnviosCotizadorPanel";
import T1EnviosHeroVisual from "@/components/T1EnviosHeroVisual";
import HeroBackground from "@/components/HeroBackground";

/* Social proof — mismo estilo y contenido que el hero de home/tienda:
   métrica grande arriba + dos abajo. */
const SOCIAL_PROOF = ["+50,000 negocios", "+40M de envíos", "+200M transacciones"];

function SocialProof() {
  return (
    <div className="flex flex-col items-center gap-2.5 text-center tablet:gap-3.5">
      <span className="font-inter text-[19px] font-normal text-white tablet:text-[24px]">{SOCIAL_PROOF[0]}</span>
      <div className="flex items-center gap-6 tablet:gap-12">
        {SOCIAL_PROOF.slice(1).map((s) => (
          <span key={s} className="font-inter text-[15px] font-normal text-white/75 tablet:text-[18px]">{s}</span>
        ))}
      </div>
    </div>
  );
}

const ArrowRight = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function T1EnviosHero() {
  return (
    <div className="relative overflow-hidden">
      {/* Fondo compartido: hero + banda comparten UN solo degradado que baja a negro,
          así el cálido se ve detrás del panel y no corta de golpe. */}
      <HeroBackground fadeHeight={340} />

      {/* HERO normal — texto + CTA (izq) · visual (der) */}
      <section className="relative z-10 flex min-h-[78svh] flex-col justify-center px-5 pb-8 pt-24 tablet:min-h-[84svh] tablet:px-6 tablet:pb-10 tablet:pt-28">
          <div className="mx-auto flex w-full max-w-[var(--max-w)] flex-col">
            <div className="grid grid-cols-1 items-center gap-8 tablet:grid-cols-2 tablet:gap-12">
              {/* Izquierda */}
              <div className="flex flex-col items-center text-center tablet:items-start tablet:text-left">
                <h1 className="font-sora text-[34px] font-light leading-[1.1] text-white tablet:text-[52px] desktop:text-[54px]" style={{ letterSpacing: "-0.03em" }}>
                  Todos tus envíos,
                  <br />
                  un solo lugar
                </h1>
                <p className="mt-4 max-w-[420px] font-inter text-[15px] font-light leading-[1.5] text-white/80 tablet:text-[18px]">
                  Cotiza, genera guías y rastrea desde un solo lugar. Sin volumen mínimo ni contratos.
                </p>
                {/* CTA desktop — junto al texto */}
                <a href={ENVIOS_SIGNUP_URL} data-cta-location="hero" data-cta-text="Comienza ahora" data-cta-destination={ENVIOS_SIGNUP_URL} className="mt-8 hidden h-[52px] items-center justify-center gap-2 rounded-[16px] bg-red-500 px-8 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-red-600 tablet:inline-flex">
                  Comienza ahora
                  {ArrowRight}
                </a>
              </div>

              {/* Derecha — visual: caja + paqueterías orbitando + card de tarifa */}
              <div className="-mt-8 flex justify-center tablet:mt-0 tablet:justify-end">
                <T1EnviosHeroVisual />
              </div>

              {/* CTA móvil — debajo de la imagen */}
              <a href={ENVIOS_SIGNUP_URL} data-cta-location="hero" data-cta-text="Comienza ahora" data-cta-destination={ENVIOS_SIGNUP_URL} className="mt-1 inline-flex h-[52px] items-center justify-center gap-2 justify-self-center rounded-[16px] bg-red-500 px-8 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-red-600 tablet:hidden">
                Comienza ahora
                {ArrowRight}
              </a>
            </div>

            {/* Métricas — centradas al fondo del hero (como en home/tienda) */}
            <div className="mt-10 tablet:mt-12">
              <SocialProof />
            </div>
          </div>
        </section>

      {/* BANDA accionable — cotizador (sobre el mismo fondo cálido, transparente) */}
      <section id="cotizador" className="relative z-10 scroll-mt-20 px-5 pb-14 pt-2 tablet:px-6 tablet:pb-16">
        <div className="mx-auto w-full max-w-[980px] rounded-[20px] border border-white/[0.08] bg-[#161418] p-5 tablet:p-6" style={{ boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}>
          <p className="mb-4 text-center font-sora text-[17px] font-normal text-white/90 tablet:mb-5 tablet:text-[20px]" style={{ letterSpacing: "-0.01em" }}>Cotiza tu envío en segundos</p>
          <T1EnviosCotizadorPanel bare />
        </div>
      </section>
    </div>
  );
}
