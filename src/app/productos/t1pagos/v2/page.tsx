import T1Navbar from "@/components/T1Navbar";
import T1PagosHeroV2 from "@/components/T1PagosHeroV2";
import T1PagosPilares from "@/components/T1PagosPilares";
import {
  T1PagosAdministracion,
  T1PagosFAQ,
} from "@/components/T1PagosSecciones";
import { T1PagosPorQue, T1PagosPrecios, T1PagosPaises } from "@/components/T1PagosExtra";
import { T1PagosScore } from "@/components/T1PagosScoreFlow";
import T1EnterpriseCarousel from "@/components/T1EnterpriseCarousel";
import T1ProductMetrics from "@/components/T1ProductMetrics";
import T1FinalCTA from "@/components/T1FinalCTA";
import T1StickyCTA from "@/components/T1StickyCTA";
import T1EnviosAnalytics from "@/components/T1EnviosAnalytics";
import T1Footer from "@/components/T1Footer";
import { SIGNUP_URL } from "@/lib/constants";

/* Ruta de prueba A/B: mismo landing de pagos, pero con el hero V2
   (creador de link sin card, sobre el degradado). */
export default function PagosLandingV2() {
  return (
    <main className="min-h-screen">
      <T1Navbar product="pagos" pageType="producto" />

      {/* Hero V2 — creador de link sin card */}
      <T1PagosHeroV2 />

      <div className="relative z-[5] bg-black">
        <T1PagosPorQue />
        <T1PagosPilares />
        <T1ProductMetrics
          metrics={[
            { end: 200, prefix: "+", suffix: "M", label: "transacciones procesadas" },
            { end: 90, prefix: "+", suffix: "%", label: "tasa de aprobación" },
            { end: 8, label: "países en Latinoamérica" },
          ]}
        />
        <T1PagosPrecios />
        <T1PagosScore />
        <T1PagosPaises />
        <T1PagosAdministracion />
        <T1EnterpriseCarousel
          bVariant
          only={["casadetono", "telcel", "pase", "circulo"]}
          title="Marcas que cobran con T1"
          subtitle="Historias reales de negocios que crecieron sus cobros con T1 Pagos."
        />
        <T1PagosFAQ />
      </div>

      <T1FinalCTA
        title={<>¿Listo para empezar a cobrar?</>}
        description="Crea tu cuenta gratis y cobra con un link o integra la pasarela desde el día uno."
        buttonLabel="Crea tu cuenta gratis"
      />

      <T1Footer />
      <T1StickyCTA label="Comienza a cobrar" href={SIGNUP_URL} section="sticky_mobile" />
      <T1EnviosAnalytics />
    </main>
  );
}
