import Image from "next/image";
import { SIGNUP_URL } from "@/lib/constants";
import T1EnviosOrbitHalo from "@/components/T1EnviosOrbitHalo";

const SOCIAL_PROOF = ["+30M de envíos", "+50,000 negocios", "+10 paqueterías"];
const CARRIERS = ["/img/circles/dhl.svg", "/img/circles/fedex.svg", "/img/circles/ups.svg", "/img/circles/ampm.svg", "/img/circles/99.svg"];
const RATES = [
  { from: "CDMX", to: "CDMX", price: "89" },
  { from: "CDMX", to: "Guadalajara", price: "115" },
  { from: "CDMX", to: "Monterrey", price: "119" },
];

const ArrowRight = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* Tarjetas de tarifa — mismo estilo que la sección "Ahorra". */
function RateCards() {
  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-0" style={{ background: "radial-gradient(ellipse at center, rgba(219,59,43,0.18) 0%, transparent 70%)" }} />
      <div className="relative z-[1] flex flex-col gap-3.5">
        {RATES.map((r) => (
          <div key={r.to} className="flex items-center justify-between gap-4 rounded-[16px] border border-white/[0.10] bg-[#1A1A1D]/85 px-5 py-4" style={{ boxShadow: "0 18px 44px -26px rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}>
            <div className="flex min-w-0 items-center gap-2">
              <span className="font-sora text-[16px] font-normal text-white tablet:text-[18px]">{r.from}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#DB3B2B]"><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="truncate font-sora text-[16px] font-normal text-white tablet:text-[18px]">{r.to}</span>
            </div>
            <div className="shrink-0 text-right leading-none">
              <span className="block font-inter text-[11px] font-light text-white/45" style={{ marginBottom: 3 }}>desde</span>
              <span className="font-sora text-[22px] font-light text-white" style={{ letterSpacing: "-0.02em" }}>${r.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function T1EnviosHero() {
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
        <div className="relative z-10 flex w-full max-w-[var(--max-w)] grow flex-col justify-center">
          {/* Dos columnas en desktop */}
          <div className="grid grid-cols-1 items-center gap-8 tablet:grid-cols-2 tablet:gap-6">
            {/* Izquierda — texto */}
            <div className="flex flex-col items-center text-center tablet:items-start tablet:text-left">
              <h1 className="font-sora text-[34px] font-light leading-[1.12] text-white tablet:text-[52px] desktop:text-[54px]" style={{ letterSpacing: "-0.03em" }}>
                Todos tus envíos,
                <br />
                un solo lugar
              </h1>

              <p className="mt-5 max-w-[440px] font-inter text-[16px] font-light leading-[1.55] text-white/80 tablet:text-[18px]">
                Cotiza, envía y entrega con la mejor experiencia del mercado.
              </p>

              {/* Móvil: card de tarifas arriba de los logos */}
              <div className="mt-9 w-full tablet:hidden">
                <RateCards />
              </div>

              {/* Logos de paqueterías — sólo móvil (en desktop se ven a la derecha) */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-5 tablet:hidden">
                {CARRIERS.map((src) => (
                  <span key={src} className="flex h-[46px] w-[46px] shrink-0 items-center justify-center overflow-hidden rounded-full">
                    <Image src={src} alt="" width={72} height={72} className="h-full w-full object-cover" style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.45))" }} />
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a href={SIGNUP_URL} className="mt-10 inline-flex h-[50px] items-center justify-center gap-2 rounded-[16px] bg-red-500 px-8 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-red-600 tablet:mt-11">
                Comienza a enviar
                {ArrowRight}
              </a>
            </div>

            {/* Derecha — halo con logos orbitando + card de tarifa (sólo desktop) */}
            <div className="hidden justify-center tablet:flex">
              <T1EnviosOrbitHalo />
            </div>
          </div>

          {/* Social proof — abajo, centrado (como en tienda) */}
          <div className="mt-12 mb-10 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-2 text-center tablet:mt-16 tablet:mb-0">
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
