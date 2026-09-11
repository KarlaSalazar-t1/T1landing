import T1Navbar from "@/components/T1Navbar";
import T1EnviosRastreoHero from "@/components/T1EnviosRastreoHero";
import T1Footer from "@/components/T1Footer";
import { ENVIOS_SIGNUP_URL, ENVIOS_QUOTE_URL } from "@/lib/constants";

export const metadata = {
  title: "Rastrea tu envío · T1",
  description: "Ingresa tu número de guía y consulta el estatus de tu paquete en tiempo real.",
};

/* Página SOLO de rastreo (input de número de guía). Distinta de la página de
   la feature de rastreo (/productos/t1envios/rastreo), que da la info general. */
export default function TrackPage() {
  return (
    <main className="min-h-screen">
      <T1Navbar ctaLabel="Comienza a enviar" ctaHref={ENVIOS_SIGNUP_URL} product="envios" pageType="sublanding" />

      {/* Hero — número de guía + Rastrear envío */}
      <T1EnviosRastreoHero />

      <div className="relative z-[5] bg-black">
        {/* Compara tarifas y envía al mejor precio */}
        <section className="px-5 py-[64px] tablet:px-6 tablet:py-[96px]">
          <div className="mx-auto flex max-w-[880px] flex-col items-center gap-6 rounded-[24px] border border-white/[0.08] bg-[#141215] px-6 py-12 text-center tablet:px-10 tablet:py-16">
            <h2 className="font-sora text-[27px] font-light leading-[1.14] text-white tablet:text-[40px]" style={{ letterSpacing: "-0.03em" }}>
              Compara tarifas y envía al mejor precio
            </h2>
            <p className="mx-auto max-w-[540px] font-inter text-[15px] font-light leading-[1.55] text-white/60 tablet:text-[17px]">
              Descubre y compara las mejores tarifas y tiempos de entrega de las paqueterías líderes en México.
            </p>
            <a href={ENVIOS_QUOTE_URL} className="mt-1 inline-flex h-[50px] items-center justify-center gap-2 rounded-[14px] bg-red-500 px-8 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-red-600">
              Cotizar ahora
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </section>
      </div>

      <T1Footer />
    </main>
  );
}
