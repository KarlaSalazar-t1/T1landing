import T1Navbar from "@/components/T1Navbar";
import T1EnviosHero from "@/components/T1EnviosHero";
import T1EnviosLogoWall from "@/components/T1EnviosLogoWall";
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

export default function EnviosLanding() {
  return (
    <main className="min-h-screen">
      <T1Navbar ctaLabel="Comienza a enviar" ctaHref={ENVIOS_SIGNUP_URL} />

      {/* Hero — cotizador funcional */}
      <T1EnviosHero />

      <div className="relative z-[5] bg-black">
        {/* Muro de logos de clientes, inmediatamente debajo del hero */}
        <T1EnviosLogoWall />
        {/* 1 · Servicios — Simplifica tus envíos (Cotiza / Envía / Seguimiento) */}
        <T1EnviosServicios />
        {/* 2 · Compara tarifas — video */}
        <T1EnviosVideo />
        {/* 3 · Conecta tus canales de venta */}
        <T1EnviosCanales />
        {/* 4 · Todo el ciclo de tu envío (demo de 4 pasos) */}
        <T1EnviosCiclo />
        {/* 5 · Métricas. nivelServicio y paqueterías PENDIENTE confirmar. */}
        <T1ProductMetrics
          metrics={[
            { end: 40, prefix: "+", suffix: "M", label: "envíos entregados" },
            { end: ENVIOS_STATS.nivelServicioPct, suffix: "%", label: "nivel de servicio" },
            { end: ENVIOS_STATS.negociosNum, prefix: "+", label: "negocios usando T1" },
          ]}
        />
        {/* 6 · Administra todo desde un panel */}
        <T1EnviosAdministracion />
        {/* 7 · Casos de éxito (envíos / logística) */}
        <T1EnterpriseCarousel
          bVariant
          only={["pirma", "sears", "makora"]}
          title="Marcas que envían con T1"
          subtitle="Historias reales de negocios que optimizaron su logística con T1 Envíos."
        />
        {/* 8 · Haz crecer tu negocio con todo T1 (ecosistema Pagos + Tienda) */}
        <T1EnviosAmplifica />
        {/* 9 · FAQ */}
        <T1EnviosFAQ />
      </div>

      {/* CTA final */}
      <T1FinalCTA
        title={<>¿Listo para optimizar tus envíos?</>}
        description="Cotiza, crea guías y rastrea con tarifas competitivas. Sin volumen mínimo."
        buttonLabel="Comienza a enviar"
      />

      <T1Footer />

      {/* CTA sticky solo-móvil (alta iniciada sin depender del scroll) */}
      <T1EnviosStickyCTA />

      {/* Instrumentación (scroll_depth, cta_click, nav_click) */}
      <T1EnviosAnalytics />
    </main>
  );
}
