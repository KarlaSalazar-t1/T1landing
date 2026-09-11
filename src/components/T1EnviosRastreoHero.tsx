import { ENVIOS_TRACK_URL } from "@/lib/constants";
import HeroBackground from "@/components/HeroBackground";

/* Hero de la página de Rastreo (réplica de t1.com/mx/track, adaptada a nuestro
   tema oscuro): número de guía + "Rastrear envío". Form GET nativo hacia
   ENVIOS_TRACK_URL — el click nunca muere. */

const ArrowRight = (
  <svg width="17" height="17" viewBox="0 0 18 18" fill="none"><path d="M3.75 9h10.5M10 4.75 14.25 9 10 13.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function T1EnviosRastreoHero() {
  return (
    <div className="relative z-0">
      <section className="relative flex min-h-[86svh] flex-col items-center justify-center overflow-hidden px-5 pb-0 pt-24 tablet:min-h-[92svh] tablet:px-6 tablet:pt-28">
        {/* Fondo (compartido entre los heroes) */}
        <HeroBackground />

        <div className="relative z-10 flex w-full max-w-[640px] grow flex-col items-center justify-center text-center">
          <h1 className="mt-6 font-sora text-[32px] font-light leading-[1.12] text-white tablet:mt-10 tablet:whitespace-nowrap tablet:text-[44px]" style={{ letterSpacing: "-0.03em" }}>
            Rastrea tu envío en segundos
          </h1>

          <p className="mt-4 max-w-[380px] font-inter text-[15px] font-light leading-[1.55] text-white/80 tablet:max-w-[600px] tablet:text-[17px]">
            Ingresa tu número de guía y consulta el estatus de tu paquete en tiempo real, con todas las paqueterías disponibles.
          </p>

          {/* Card de rastreo */}
          <div className="mt-8 w-full max-w-[480px] rounded-[18px] bg-[#1D1D1D] p-5 text-left tablet:mt-9 tablet:p-6" style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.30)" }}>
            <form method="get" action={ENVIOS_TRACK_URL}>
              <label className="block">
                <span className="mb-1.5 block font-inter text-[11px] font-semibold uppercase tracking-[0.08em] text-white/50">Número de guía</span>
                <input
                  name="guia"
                  required
                  placeholder="Ej. 7945123456"
                  aria-label="Número de guía"
                  className="w-full rounded-[10px] border border-white/[0.10] bg-black/25 px-4 py-3 font-inter text-[16px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#E2604C]"
                />
              </label>
              <button type="submit" className="mt-4 flex h-[50px] w-full items-center justify-center gap-2 rounded-[12px] bg-red-500 font-inter text-[15px] font-semibold text-white transition-colors hover:bg-red-600">
                Rastrear envío
                {ArrowRight}
              </button>
            </form>
            <p className="mt-3.5 text-center font-inter text-[12.5px] font-light text-white/45">
              Consulta disponible para envíos generados con T1 Envíos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
