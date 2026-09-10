import Image from "next/image";
import { SIGNUP_URL } from "@/lib/constants";
import HeroBackground from "@/components/HeroBackground";
import T1PagosLinkCreator from "@/components/T1PagosLinkCreator";

const SOCIAL_PROOF = ["+90% de aprobación", "+200M transacciones", "8 países"];
const METHODS = ["/img/icons/visa-card.svg", "/img/icons/mc-card.svg", "/img/icons/amex-card.svg", "/img/icons/spei-card.svg", "/img/icons/kueski-card.svg"];

const ArrowRight = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* Logos de métodos de pago — a color, directos sobre el fondo */
function MethodLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {METHODS.map((src) => (
        <Image key={src} src={src} alt="" width={80} height={52} className="h-[32px] w-auto shrink-0 object-contain" />
      ))}
    </div>
  );
}

/* Panel del creador de link de pago (funcional) — el gancho interactivo del hero */
function LinkPanel() {
  return (
    <div
      className="w-full max-w-[420px] rounded-[22px] border border-white/[0.16] bg-white/[0.08] p-6 backdrop-blur-md tablet:p-7"
      style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.30)" }}
    >
      <p className="mb-5 text-center font-inter text-[12px] font-medium uppercase tracking-[0.1em] text-white/40">Cobra en segundos</p>
      <T1PagosLinkCreator />
    </div>
  );
}

export default function T1PagosHero() {
  return (
    <div className="relative z-0">
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-5 pb-0 pt-24 tablet:min-h-screen tablet:px-6 tablet:pt-28 tablet:pb-0">
        {/* Fondo (compartido entre los heroes) */}
        <HeroBackground fadeHeight={300} />

        {/* Contenido */}
        <div className="relative z-10 grid w-full max-w-[var(--max-w)] grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-8">
          {/* Izquierda — texto */}
          <div className="flex flex-col items-center text-center tablet:items-start tablet:text-left">
            <h1 className="font-sora text-[30px] font-light leading-[1.12] text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em" }}>
              Cobra en línea,
              <br />
              simple y seguro
            </h1>

            <p className="mt-4 max-w-[460px] font-inter text-[15px] font-light leading-[1.5] text-white/80 tablet:text-[18px]">
              Tarjetas, SPEI y meses sin intereses, con antifraude y depósitos al día siguiente.
            </p>

            {/* Móvil: creador de link funcional + métodos (en desktop van a la derecha) */}
            <div className="mt-8 w-full tablet:hidden">
              <LinkPanel />
              <div className="mt-6">
                <MethodLogos />
              </div>
            </div>

            {/* CTA */}
            <a href={SIGNUP_URL} data-cta-location="hero" data-cta-text="Comienza a cobrar" data-cta-destination={SIGNUP_URL} className="mt-8 inline-flex h-[50px] items-center justify-center gap-2 rounded-[16px] bg-red-500 px-8 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-red-600 tablet:mt-10">
              Comienza a cobrar
              {ArrowRight}
            </a>
          </div>

          {/* Derecha — creador de link (sólo desktop) + métodos debajo */}
          <div className="hidden flex-col items-center gap-6 tablet:flex">
            <LinkPanel />
            <MethodLogos />
          </div>
        </div>

        {/* Social proof — métrica grande arriba, dos abajo */}
        <div className="relative z-10 mt-12 mb-10 flex w-full max-w-[var(--max-w)] flex-col items-center gap-2.5 px-2 text-center tablet:mt-16 tablet:mb-4 tablet:gap-4">
          <span className="font-inter text-[19px] font-normal text-white tablet:text-[24px]">{SOCIAL_PROOF[0]}</span>
          <div className="flex items-center gap-6 tablet:gap-12">
            {SOCIAL_PROOF.slice(1).map((s) => (
              <span key={s} className="font-inter text-[15px] font-normal text-white/75 tablet:text-[18px]">{s}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
