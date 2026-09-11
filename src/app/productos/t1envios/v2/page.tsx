import T1Navbar from "@/components/T1Navbar";
import T1EnviosHeroV2 from "@/components/T1EnviosHeroV2";
import T1EnviosCiclo from "@/components/T1EnviosCiclo";
import T1EnviosVideo from "@/components/T1EnviosVideo";
import {
  T1EnviosCanales,
  T1EnviosAdministracion,
  T1EnviosFAQ,
} from "@/components/T1EnviosSecciones";
import { T1EnviosAmplifica } from "@/components/T1EnviosExtra";
import T1EnterpriseCarousel from "@/components/T1EnterpriseCarousel";
import { T1EnviosServicios } from "@/components/T1EnviosServicios";
import T1ProductMetrics from "@/components/T1ProductMetrics";
import T1FinalCTA from "@/components/T1FinalCTA";
import T1EnviosStickyCTA from "@/components/T1EnviosStickyCTA";
import T1EnviosAnalytics from "@/components/T1EnviosAnalytics";
import T1Footer from "@/components/T1Footer";
import { ENVIOS_STATS, ENVIOS_SIGNUP_URL } from "@/lib/constants";

/* Ruta de prueba A/B: mismo landing de envíos, pero con el hero V2
   (cotizador sin caja, inputs sobre el degradado). */
export default function EnviosLandingV2() {
  return (
    <main className="min-h-screen">
      <T1Navbar ctaLabel="Comienza a enviar" ctaHref={ENVIOS_SIGNUP_URL} product="envios" pageType="producto" />

      {/* Hero V2 — cotizador sin caja */}
      <T1EnviosHeroV2 />

      <div className="relative z-[5] bg-black">
        <T1EnviosServicios />
        <T1EnviosVideo />
        <T1EnviosCanales />
        <T1EnviosCiclo />
        <T1ProductMetrics
          metrics={[
            { end: 40, prefix: "+", suffix: "M", label: "envíos entregados" },
            { end: ENVIOS_STATS.nivelServicioPct, suffix: "%", label: "nivel de servicio" },
            { end: ENVIOS_STATS.negociosNum, prefix: "+", label: "negocios usando T1" },
          ]}
        />
        <T1EnviosAdministracion />
        <T1EnterpriseCarousel
          bVariant
          only={["pirma", "sears", "makora"]}
          title="Marcas que envían con T1"
          subtitle="Historias reales de negocios que optimizaron su logística con T1 Envíos."
        />
        <T1EnviosAmplifica />
        <T1EnviosFAQ />
      </div>

      <T1FinalCTA
        title={<>¿Listo para optimizar tus envíos?</>}
        description="Cotiza, crea guías y rastrea con tarifas competitivas. Sin volumen mínimo."
        buttonLabel="Comienza a enviar"
      />

      <T1Footer />
      <T1EnviosStickyCTA />
      <T1EnviosAnalytics />
    </main>
  );
}
