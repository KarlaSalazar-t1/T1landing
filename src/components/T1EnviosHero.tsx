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
    <>
      {/* HERO normal — texto + CTA (izq) · visual (der) */}
      <div className="relative z-0">
        <section className="relative flex min-h-[78svh] flex-col justify-center overflow-hidden px-5 pb-28 pt-24 tablet:min-h-[84svh] tablet:px-6 tablet:pb-32 tablet:pt-28">
          <HeroBackground />
          <div className="relative z-10 mx-auto flex w-full max-w-[var(--max-w)] flex-col">
            <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-12">
              {/* Izquierda */}
              <div className="flex flex-col items-center text-center tablet:items-start tablet:text-left">
                <h1 className="font-sora text-[34px] font-light leading-[1.1] text-white tablet:text-[52px] desktop:text-[54px]" style={{ letterSpacing: "-0.03em" }}>
                  Todos tus envíos,
                  <br />
                  un solo lugar
                </h1>
                <p className="mt-4 max-w-[460px] font-inter text-[15px] font-light leading-[1.5] text-white/80 tablet:text-[18px]">
                  Las mejores tarifas, sin volumen mínimo ni contratos. Cotiza, genera guías y rastrea desde un solo lugar.
                </p>
                <a href={ENVIOS_SIGNUP_URL} data-cta-location="hero" data-cta-text="Comienza a enviar" data-cta-destination={ENVIOS_SIGNUP_URL} className="mt-8 inline-flex h-[52px] items-center justify-center gap-2 rounded-[16px] bg-red-500 px-8 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-red-600">
                  Comienza a enviar
                  {ArrowRight}
                </a>
              </div>

              {/* Derecha — visual: caja + paqueterías orbitando + card de tarifa */}
              <div className="flex justify-center tablet:justify-end">
                <T1EnviosHeroVisual />
              </div>
            </div>

            {/* Métricas — centradas al fondo del hero (como en home/tienda) */}
            <div className="mt-10 tablet:mt-12">
              <SocialProof />
            </div>
          </div>
        </section>
      </div>

      {/* BANDA accionable — cotizador (justo debajo del hero) */}
      <section id="cotizador" className="relative z-[5] scroll-mt-20 bg-black px-5 pb-10 pt-2 tablet:px-6 tablet:pb-14">
        <div className="mx-auto -mt-14 w-full max-w-[980px] rounded-[20px] border border-white/[0.08] bg-[#161418] p-5 tablet:-mt-16 tablet:p-6" style={{ boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}>
          <p className="mb-4 text-center font-sora text-[17px] font-normal text-white/90 tablet:mb-5 tablet:text-[20px]" style={{ letterSpacing: "-0.01em" }}>Cotiza tu envío en segundos</p>
          <T1EnviosCotizadorPanel bare />
        </div>
      </section>
    </>
  );
}
