import T1Navbar from "@/components/T1Navbar";
import T1EnviosHero from "@/components/T1EnviosHero";
import T1EnviosPilares from "@/components/T1EnviosPilares";
import T1EnviosTarifas from "@/components/T1EnviosTarifas";
import {
  T1EnviosPaqueterias,
  T1EnviosCanales,
  T1EnviosAdministracion,
  T1EnviosFAQ,
} from "@/components/T1EnviosSecciones";
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
        {/* 1 · Paqueterías — olvídate de negociar con cada una */}
        <T1EnviosPaqueterias />
        {/* 2 · Cotiza, crea y rastrea (pilares) */}
        <T1EnviosPilares />
        {/* 3 · Conecta tus canales de venta */}
        <T1EnviosCanales />
        {/* 4 · Administra tu operación */}
        <T1EnviosAdministracion />
        {/* 5 · FAQ */}
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
