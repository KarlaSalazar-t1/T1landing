/* Propuesta: el home con Uno en la instrucción de "Crea tu tienda" del hero,
   armado como está hoy en t1.com (T1HeroB + instrucciones por pestaña).
   Solo para revisión (noindex); el resto del home es idéntico a /. */

import T1Navbar from "@/components/T1Navbar";
import T1HeroB from "@/components/T1HeroB";
import T1Problema from "@/components/T1Problema";
import T1FeatureIntro from "@/components/T1FeatureIntro";
import T1Features from "@/components/T1Features";
import T1Solutions from "@/components/T1Solutions";
import T1EnterpriseCarousel from "@/components/T1EnterpriseCarousel";
import T1AudienceRotator from "@/components/T1AudienceRotator";
import T1ScrollShowcase from "@/components/T1ScrollShowcase";
import T1Footer from "@/components/T1Footer";
import T1UnoHomeBlock from "@/components/T1UnoHomeBlock";
import { UnoBrandProvider } from "@/lib/unoBrand";

export const metadata = { robots: { index: false } };

export default function HomeHeroUno() {
  return (
    <UnoBrandProvider>
    <main className="min-h-screen">
      <T1Navbar />

      {/* Hero con Uno (base visual de t1.com) */}
      <T1HeroB uno />

      <div className="relative z-[5] -mt-2.5 rounded-t-[24px] bg-black pt-4">
        <T1Problema />
      </div>

      <div className="fi-pinned relative z-[5] bg-black pb-8 pt-2 tablet:sticky tablet:top-0 tablet:pb-10">
        <T1FeatureIntro bVariant />
      </div>

      <div className="relative isolate z-10 rounded-t-[24px] bg-[#0e0d0d] tablet:rounded-t-[28px]">
        <T1Features />
        <T1AudienceRotator bVariant />
      </div>

      {/* Uno: bloque que lo presenta y manda a /uno */}
      <div className="relative z-[10]">
        <T1UnoHomeBlock />
      </div>

      <div className="relative z-[10]">
        <T1EnterpriseCarousel bVariant />
      </div>

      <div className="sticky top-0 z-[11]">
        <T1Solutions />
      </div>

      <div className="relative z-[12]">
        <T1ScrollShowcase bVariant />
        <T1Footer />
      </div>
    </main>
    </UnoBrandProvider>
  );
}
