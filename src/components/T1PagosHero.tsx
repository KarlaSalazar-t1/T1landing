import Image from "next/image";
import { SIGNUP_URL } from "@/lib/constants";

const SOCIAL_PROOF = ["+90% de aprobación", "+200M transacciones", "8 países"];
const METHODS = ["/img/icons/visa-card.svg", "/img/icons/mc-card.svg", "/img/icons/amex-card.svg", "/img/icons/spei-card.svg", "/img/icons/kueski-card.svg"];

const ArrowRight = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function T1PagosHero() {
  return (
    <div className="relative z-0">
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-5 pb-0 pt-24 tablet:min-h-screen tablet:px-6 tablet:pt-28 tablet:pb-0">
        {/* Fondo */}
        <div aria-hidden className="absolute inset-0 z-0" style={{ background: "linear-gradient(160deg, #2e1622 0%, #180b13 50%, #0d070b 100%)" }} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 86% 70% at 67% 32%, rgba(226,64,47,0.26) 0%, transparent 60%), radial-gradient(ellipse 60% 58% at 14% 22%, rgba(150,34,34,0.18) 0%, transparent 58%), radial-gradient(ellipse 50% 46% at 82% 84%, rgba(244,114,150,0.08) 0%, transparent 62%), radial-gradient(ellipse 60% 70% at -4% 88%, rgba(58,74,158,0.30) 0%, transparent 52%), radial-gradient(ellipse 42% 60% at 102% 10%, rgba(58,74,158,0.24) 0%, transparent 50%)",
          }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden tablet:block" style={{ background: "linear-gradient(90deg, rgba(2,1,1,0.85) 0%, rgba(20,4,4,0.35) 12%, rgba(0,0,0,0) 26%, rgba(0,0,0,0) 74%, rgba(20,4,4,0.35) 88%, rgba(2,1,1,0.85) 100%)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden tablet:block" style={{ background: "radial-gradient(circle at 97% -2%, rgba(4,24,82,0.75) 0%, rgba(17,0,85,0) 27%)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[260px]" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(3,1,1,0.85) 55%, #000 100%)" }} />

        {/* Contenido */}
        <div className="relative z-10 flex w-full max-w-[520px] grow flex-col items-center justify-center tablet:max-w-[720px]">
          <h1 className="text-center font-sora text-[34px] font-light leading-[1.12] text-white tablet:text-[54px] desktop:text-[54px]" style={{ letterSpacing: "-0.03em" }}>
            Cobra en línea
          </h1>

          <p className="mt-5 max-w-[440px] text-center font-inter text-[16px] font-light leading-[1.55] text-white/80 tablet:max-w-[560px] tablet:text-[18px]">
            Acepta tarjetas, SPEI, Kueski y más, con protección antifraude y depósitos al día siguiente.
          </p>

          {/* Métodos de pago */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 tablet:mt-11 tablet:gap-5">
            {METHODS.map((src) => (
              <Image key={src} src={src} alt="" width={80} height={52} className="h-[34px] w-auto shrink-0 object-contain tablet:h-[38px]" />
            ))}
          </div>

          {/* CTA */}
          <a href={SIGNUP_URL} className="mt-10 inline-flex h-[50px] items-center justify-center gap-2 rounded-[16px] bg-red-500 px-8 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-red-600">
            Comienza a cobrar
            {ArrowRight}
          </a>

          {/* Social proof */}
          <div className="mt-12 mb-10 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-2 text-center tablet:mb-14">
            {SOCIAL_PROOF.map((s, i) => (
              <span key={s} className="flex items-center gap-2.5 font-inter text-[16px] font-medium text-white">
                {i > 0 && <span aria-hidden className="text-white/40">•</span>}
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
