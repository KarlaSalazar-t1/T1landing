import { SIGNUP_URL } from "@/lib/constants";
import HeroBackground from "@/components/HeroBackground";
import T1PagosLinkCreator from "@/components/T1PagosLinkCreator";
import T1PagosDashboard from "@/components/T1PagosDashboard";

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

export default function T1PagosHero() {
  return (
    <div className="relative overflow-hidden">
      {/* Fondo compartido: hero + banda comparten UN solo degradado que baja a negro. */}
      <HeroBackground fadeHeight={340} />

      {/* HERO normal — texto + CTA (izq) · dashboard (der) */}
      <section className="relative z-10 flex min-h-[78svh] flex-col justify-center px-5 pb-8 pt-24 tablet:min-h-[84svh] tablet:px-6 tablet:pb-10 tablet:pt-28">
          <div className="mx-auto flex w-full max-w-[var(--max-w)] flex-col">
            <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-12">
              {/* Izquierda */}
              <div className="flex flex-col items-center text-center tablet:items-start tablet:text-left">
                <h1 className="font-sora text-[34px] font-light leading-[1.1] text-white tablet:text-[52px] desktop:text-[54px]" style={{ letterSpacing: "-0.03em" }}>
                  Cobra en línea,
                  <br />
                  simple y seguro
                </h1>
                <p className="mt-4 max-w-[460px] font-inter text-[15px] font-light leading-[1.5] text-white/80 tablet:text-[18px]">
                  Acepta pagos con la mejor tasa de aprobación, antifraude incluido y depósitos al día siguiente.
                </p>
                <a href={SIGNUP_URL} data-cta-location="hero" data-cta-text="Comienza a cobrar" data-cta-destination={SIGNUP_URL} className="mt-8 inline-flex h-[52px] items-center justify-center gap-2 rounded-[16px] bg-red-500 px-8 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-red-600">
                  Comienza a cobrar
                  {ArrowRight}
                </a>
              </div>

              {/* Derecha — dashboard inclinado/flotando (foto de producto, no panel vivo) */}
              <div className="flex justify-center [perspective:1600px] tablet:justify-center tablet:pr-6">
                <div className="w-full max-w-[400px] tablet:[transform:rotateY(-8deg)_rotateX(3deg)]" style={{ transformStyle: "preserve-3d" }}>
                  <T1PagosDashboard />
                </div>
              </div>
            </div>

            {/* Métricas — centradas al fondo del hero (como en home/tienda) */}
            <div className="mt-10 tablet:mt-12">
              <SocialProof />
            </div>
          </div>
        </section>

      {/* BANDA accionable — link de pago (sobre el mismo fondo cálido, transparente) */}
      <section className="relative z-10 px-5 pb-14 pt-2 tablet:px-6 tablet:pb-16">
        <div className="mx-auto w-full max-w-[760px] rounded-[20px] border border-white/[0.08] bg-[#161418] p-5 tablet:p-6" style={{ boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}>
          <p className="mb-4 text-center font-sora text-[17px] font-normal text-white/90 tablet:mb-5 tablet:text-[20px]" style={{ letterSpacing: "-0.01em" }}>Crea tu link de pago en segundos</p>
          <T1PagosLinkCreator bare />
        </div>
      </section>
    </div>
  );
}
