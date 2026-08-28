import T1Navbar from "@/components/T1Navbar";
import T1EnviosHero from "@/components/T1EnviosHero";
import T1EnviosPilares from "@/components/T1EnviosPilares";
import T1EnviosTarifas from "@/components/T1EnviosTarifas";
import {
  T1EnviosCanales,
  T1EnviosAdministracion,
  T1EnviosFAQ,
} from "@/components/T1EnviosSecciones";
import { T1EnviosIncidencias } from "@/components/T1EnviosExtra";
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
        {/* Tarifas de ejemplo — Ahorra en cada envío */}
        <T1EnviosTarifas />
        {/* Cotiza, crea y rastrea (pilares) */}
        <T1EnviosPilares />
        {/* Métricas — prueba social temprana. Nota: 92% nivel de servicio es mockup, confirmar. */}
        <T1ProductMetrics
          metrics={[
            { end: 30, prefix: "+", suffix: "M", label: "envíos entregados" },
            { end: 92, suffix: "%", label: "nivel de servicio" },
            { end: 50000, prefix: "+", label: "negocios usando T1" },
          ]}
        />
        {/* 3 · Conecta tus canales de venta */}
        <T1EnviosCanales />
        {/* 4 · Incidencias — resuélvelas antes que tu cliente */}
        <T1EnviosIncidencias />
        {/* 5 · Administra tu operación */}
        <T1EnviosAdministracion />
        {/* 6 · FAQ */}
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
