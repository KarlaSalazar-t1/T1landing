/* Ruta /vb — VERSIÓN B del hero (A/B para decidir). Idéntica a la home pero
   con T1HeroB en lugar de T1Hero. La home (/) queda intacta con el Hero A. */

import T1Navbar from "@/components/T1Navbar";
import T1HeroB from "@/components/T1HeroB";
import T1Problema from "@/components/T1Problema";
import T1FeatureIntro from "@/components/T1FeatureIntro";
import T1Features from "@/components/T1Features";
import T1Metrics from "@/components/T1Metrics";
import T1Solutions from "@/components/T1Solutions";
import T1EnterpriseCarousel from "@/components/T1EnterpriseCarousel";
import T1AudienceRotator from "@/components/T1AudienceRotator";
import T1ScrollShowcase from "@/components/T1ScrollShowcase";
import T1Footer from "@/components/T1Footer";

export default function HomeVariantB() {
  return (
    <main className="min-h-screen">
      <T1Navbar />

      {/* Hero — VERSIÓN B */}
      <T1HeroB />

      <div className="relative z-[5] -mt-2.5 rounded-t-[24px] bg-black pt-4">
        <T1Problema />
      </div>

      <div className="fi-pinned relative z-[5] bg-black pb-8 pt-2 tablet:sticky tablet:top-0 tablet:pb-10">
        <T1FeatureIntro />
      </div>

      <div className="relative isolate z-10 rounded-t-[24px] bg-[#0e0d0d] tablet:rounded-t-[28px]">
        <T1Features />
        <T1Metrics />
        <T1AudienceRotator />
      </div>

      <div className="relative z-[10]">
        <T1EnterpriseCarousel bVariant />
      </div>

      <div className="sticky top-0 z-[11]">
        <T1Solutions />
      </div>

      <div className="relative z-[12]">
        <T1ScrollShowcase />
        <T1Footer />
      </div>
    </main>
  );
}
