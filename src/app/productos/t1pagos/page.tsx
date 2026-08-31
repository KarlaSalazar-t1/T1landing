import T1Navbar from "@/components/T1Navbar";
import T1PagosHero from "@/components/T1PagosHero";
import T1PagosPilares from "@/components/T1PagosPilares";
import {
  T1PagosMetodos,
  T1PagosAdministracion,
  T1PagosFAQ,
} from "@/components/T1PagosSecciones";
import { T1PagosPorQue, T1PagosPrecios, T1PagosPaises, T1PagosPCI } from "@/components/T1PagosExtra";
import { T1PagosScore } from "@/components/T1PagosScoreFlow";
import T1EnterpriseCarousel from "@/components/T1EnterpriseCarousel";
import T1ProductMetrics from "@/components/T1ProductMetrics";
import T1FinalCTA from "@/components/T1FinalCTA";
import T1Footer from "@/components/T1Footer";

export default function PagosLanding() {
  return (
    <main className="min-h-screen">
      <T1Navbar />

      {/* Hero — crear link de pago */}
      <T1PagosHero />

      <div className="relative z-[5] bg-black">
        {/* 1 · Métricas — justo debajo del hero */}
        <T1ProductMetrics
          metrics={[
            { end: 200, prefix: "+", suffix: "M", label: "transacciones procesadas" },
            { end: 90, prefix: "+", suffix: "%", label: "tasa de aprobación" },
            { end: 8, label: "países en Latinoamérica" },
          ]}
        />
        {/* 2 · ¿Por qué elegir T1 Pagos? (panel claro) */}
        <T1PagosPorQue />
        {/* 3 · Una plataforma para todos tus cobros (pilares) — antes de link de pago */}
        <T1PagosPilares />
        {/* 4 · Crea un link de pago */}
        <T1PagosMetodos />
        {/* 5 · Antifraude con T1 Score (panel simulado) */}
        <T1PagosScore />
        {/* 6 · Precios / comisiones */}
        <T1PagosPrecios />
        {/* 6 · Administra tus cobros (después de precios) */}
        <T1PagosAdministracion />
        {/* 7 · 8 países LATAM (mapa) */}
        <T1PagosPaises />
        {/* 9 · Certificación PCI DSS */}
        <T1PagosPCI />
        {/* 9.5 · Casos de éxito (pagos / antifraude) */}
        <T1EnterpriseCarousel
          bVariant
          only={["casadetono", "telcel", "pase", "circulo"]}
          title="Marcas que cobran con T1"
          subtitle="Historias reales de negocios que crecieron sus cobros con T1 Pagos."
        />
        {/* 10 · FAQ */}
        <T1PagosFAQ />
      </div>

      {/* CTA final */}
      <T1FinalCTA
        title={<>¿Listo para empezar a cobrar?</>}
        description="Crea tu cuenta gratis y cobra con un link o integra la pasarela desde el día uno."
        buttonLabel="Crea tu cuenta gratis"
      />

      <T1Footer />
    </main>
  );
}
