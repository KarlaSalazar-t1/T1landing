import T1Navbar from "@/components/T1Navbar";
import T1EnviosHero from "@/components/T1EnviosHero";
import T1EnviosPilares from "@/components/T1EnviosPilares";
import T1EnviosVideo from "@/components/T1EnviosVideo";
import {
  T1EnviosCanales,
  T1EnviosAdministracion,
  T1EnviosFAQ,
} from "@/components/T1EnviosSecciones";
import { T1EnviosIncidencias } from "@/components/T1EnviosExtra";
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
        {/* 4 · Tu operación de punta a punta (pilares) */}
        <T1EnviosPilares />
        {/* 5 · Métricas — arriba de canales. Nota: 92% nivel de servicio es mockup, confirmar. */}
        <T1ProductMetrics
          metrics={[
            { end: 30, prefix: "+", suffix: "M", label: "envíos entregados" },
            { end: 92, suffix: "%", label: "nivel de servicio" },
            { end: 50000, prefix: "+", label: "negocios usando T1" },
          ]}
        />
        {/* 6 · Conecta tus canales de venta */}
        <T1EnviosCanales />
        {/* 7 · Incidencias */}
        <T1EnviosIncidencias />
        {/* 8 · Administra tu operación */}
        <T1EnviosAdministracion />
        {/* 9 · FAQ */}
        <T1EnviosFAQ />
      </div>

      {/* CTA final */}
      <T1FinalCTA
        title={<>¿Listo para optimizar tus envíos?</>}
        description="Cotiza, crea guías y rastrea con tarifas competitivas. Sin volumen mínimo."
        buttonLabel="Empieza a enviar"
      />

      <T1Footer />
    </main>
  );
}
