/* Variante Buen Fin — VERSIÓN B (layout de hero): logo VERTICAL a la izquierda y
   el título a la derecha (sobre todo en desktop). Mismo resto de la home. */

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

export const metadata = {
  title: "Tu tienda lista para el Buen Fin · T1",
  description:
    "Prepárate para el Buen Fin: crea tu tienda, vende, cobra y envía a todo México desde un solo lugar con T1.",
};

export default function BuenFinLandingB() {
  return (
    <main className="min-h-screen">
      <T1Navbar bVariant />

      {/* Hero — variante Buen Fin B: logo vertical izq · título der */}
      <T1HeroB buenFin variantB />

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
  );
}
