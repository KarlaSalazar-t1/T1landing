import T1Navbar from "@/components/T1Navbar";
import T1Hero from "@/components/T1Hero";
import T1Problema from "@/components/T1Problema";
import T1FeatureIntro from "@/components/T1FeatureIntro";
import T1Features from "@/components/T1Features";
import T1AISectionV2 from "@/components/T1AISectionV2";
import T1Score from "@/components/T1Score";
import T1Metrics from "@/components/T1Metrics";
import T1Solutions from "@/components/T1Solutions";
// import T1Enterprise from "@/components/T1Enterprise"; // versión stack anterior — oculta, reemplazada por el carrusel
import T1EnterpriseCarousel from "@/components/T1EnterpriseCarousel";
import T1Audience from "@/components/T1Audience";
import T1AudienceRotator from "@/components/T1AudienceRotator";
import T1ScrollShowcase from "@/components/T1ScrollShowcase";
import T1Footer from "@/components/T1Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <T1Navbar />

      {/* Hero — sticky, stays behind */}
      <T1Hero />

      {/* El problema — scroll normal, sobre la tarjeta negra que empieza en el hero */}
      <div className="relative z-[5] -mt-2.5 rounded-t-[24px] bg-black pt-4">
        <T1Problema />
      </div>

      {/* Cards Vende/Cobra/Envía — en desktop se quedan STICKY y la sección de
          abajo ("Todo lo que tu negocio necesita") SUBE y las TAPA (efecto stack).
          En móvil (cards apiladas, muy altas) scroll normal. El hero ya baja normal. */}
      <div className="fi-pinned relative z-[5] bg-black pb-8 pt-2 tablet:sticky tablet:top-0 tablet:pb-10">
        <T1FeatureIntro />
      </div>

      {/* Dark block — "Todo lo que tu negocio necesita".
          En desktop SUBE y TAPA las cards Vende/Cobra/Envía (fijas arriba), con
          esquinas superiores redondeadas (efecto tarjeta que sube). Sin -mt para
          que las cards se vean completas antes de ser tapadas. El navbar queda en
          modo oscuro (texto blanco) todo el bloque. */}
      <div
        className="relative isolate z-10 rounded-t-[24px] bg-[#141414] tablet:rounded-t-[28px]"
      >
        {/* Orden: IA → stack cards → Score → Para quién es T1 → Métricas */}
        {/* Sección "De una frase a tu tienda" oculta a solicitud */}
        {/* <T1AISectionV2 /> */}
        <T1Features />
        <T1Score />
        {/* Versión anterior (grid de 3 cards) oculta — reemplazada por la auto-rotativa */}
        {/* <T1Audience /> */}
        <T1AudienceRotator />
        <T1Metrics />
      </div>

      {/* Casos de éxito — scroll normal. */}
      <div className="relative z-[10]">
        <T1EnterpriseCarousel />
      </div>

      {/* Todo lo que puedes hacer con T1 — sección "fija": queda sticky detrás
          mientras el showcase de abajo SUBE y la TAPA. El efecto stack empieza
          aquí (en Vende/Cobra/Envía/Todo en uno), no en esta sección. */}
      <div className="sticky top-0 z-[11]">
        <T1Solutions />
      </div>

      {/* Showcase Vende/Cobra/Envía/Todo en uno + CTA final — scrollean POR
          ENCIMA de la sección fija de Solutions (efecto stack: sube y la cubre). */}
      <div className="relative z-[12]">
        <T1ScrollShowcase />
        <T1Footer />
      </div>
    </main>
  );
}
