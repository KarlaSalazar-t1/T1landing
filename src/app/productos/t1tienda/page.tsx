import T1Navbar from "@/components/T1Navbar";
import T1TiendaHero from "@/components/T1TiendaHero";
import T1TiendaDondeVender from "@/components/T1TiendaDondeVender";
import T1TiendaBento from "@/components/T1TiendaBento";
import T1TiendaVideo from "@/components/T1TiendaVideo";
import {
  T1TiendaIncluido,
  T1TiendaMarketplaces,
  T1TiendaAdministracion,
  T1TiendaPagos,
  T1TiendaFAQ,
} from "@/components/T1TiendaSecciones";
import T1ProductMetrics from "@/components/T1ProductMetrics";
import T1EnterpriseCarousel from "@/components/T1EnterpriseCarousel";
import T1FinalCTA from "@/components/T1FinalCTA";
import T1Footer from "@/components/T1Footer";

export default function TiendaLanding() {
  return (
    <main className="min-h-screen">
      <T1Navbar />

      {/* Hero — el prompt: describe tu negocio y crea tu tienda con IA */}
      <T1TiendaHero />

      <div className="relative z-[5] bg-black">
        {/* Video demo — cómo funciona (store creation) */}
        <T1TiendaVideo />
        {/* 1 · Tu tienda con pagos y envíos integrados */}
        <T1TiendaIncluido />
        {/* 2 · Dónde vender — tienda en línea / marketplaces / POS */}
        <T1TiendaDondeVender />
        {/* Métricas — prueba social */}
        <T1ProductMetrics
          metrics={[
            { end: 50000, prefix: "+", label: "negocios usando T1" },
            { end: 6000, prefix: "+", label: "tiendas creadas" },
            { end: 200, prefix: "+", suffix: "M", label: "transacciones procesadas" },
          ]}
        />
        {/* 3 · Marketplaces — "olvídate de manejar cada canal" */}
        <T1TiendaMarketplaces />
        {/* 3.5 · Bento — miles de tiendas creadas con T1 (parallax) */}
        <T1TiendaBento />
        {/* 4 · Pagos — cobra como quieras */}
        <T1TiendaPagos />
        {/* 5 · Administración — catálogo, inventario, reportes */}
        <T1TiendaAdministracion />
        {/* 5.5 · Casos de éxito (comercio / omnicanal) */}
        <T1EnterpriseCarousel
          bVariant
          only={["pirma", "sears", "makora"]}
          title="Marcas que venden con T1"
          subtitle="Historias reales de negocios que centralizaron su venta con T1."
        />
        {/* 6 · FAQ */}
        <T1TiendaFAQ />
      </div>

      {/* CTA final */}
      <T1FinalCTA
        title={<>¿Listo para crear tu tienda?</>}
        description="Describe tu negocio y ten tu tienda lista para vender en menos de 1 minuto. Sin código."
        buttonLabel="Comienza gratis"
      />

      <T1Footer />
    </main>
  );
}
