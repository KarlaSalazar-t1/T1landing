import T1Navbar from "@/components/T1Navbar";
import T1EnviosHero from "@/components/T1EnviosHero";
import T1EnviosPilares from "@/components/T1EnviosPilares";
import T1EnviosVideo from "@/components/T1EnviosVideo";
import {
  T1EnviosCanales,
  T1EnviosAdministracion,
  T1EnviosFAQ,
} from "@/components/T1EnviosSecciones";
import { T1EnviosAmplifica } from "@/components/T1EnviosExtra";
import T1EnterpriseCarousel from "@/components/T1EnterpriseCarousel";
import { T1EnviosServicios, T1EnviosCotizadorSection } from "@/components/T1EnviosServicios";
import T1ProductMetrics from "@/components/T1ProductMetrics";
import T1FinalCTA from "@/components/T1FinalCTA";
import T1Footer from "@/components/T1Footer";

export default function EnviosLanding() {
  return (
    <main className="min-h-screen">
      <T1Navbar />

      {/* Hero — el cotizador */}
      <T1EnviosHero />

      <div className="relative z-[5] bg-black">
        {/* 1 · Servicios — Simplifica tus envíos (Cotiza / Envía / Seguimiento) */}
        <T1EnviosServicios />
        {/* 2 · Cotizador en vivo */}
        <T1EnviosCotizadorSection />
        {/* 3 · Compara tarifas — video */}
        <T1EnviosVideo />
        {/* 4 · Conecta tus canales de venta (después de Compara) */}
        <T1EnviosCanales />
        {/* 5 · Tu operación de punta a punta (pilares) */}
        <T1EnviosPilares />
        {/* 6 · Métricas. Nota: 92% nivel de servicio es mockup, confirmar. */}
        <T1ProductMetrics
          metrics={[
            { end: 40, prefix: "+", suffix: "M", label: "envíos entregados" },
            { end: 92, suffix: "%", label: "nivel de servicio" },
            { end: 50000, prefix: "+", label: "negocios usando T1" },
          ]}
        />
        {/* 7 · Administra todo desde un panel */}
        <T1EnviosAdministracion />
        {/* 8 · Haz crecer tu negocio con todo T1 (ecosistema Pagos + Tienda) */}
        <T1EnviosAmplifica />
        {/* 8.5 · Casos de éxito (envíos / logística) */}
        <T1EnterpriseCarousel
          bVariant
          only={["pirma", "sears", "makora"]}
          title="Marcas que envían con T1"
          subtitle="Historias reales de negocios que optimizaron su logística con T1 Envíos."
        />
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
    </main>
  );
}
