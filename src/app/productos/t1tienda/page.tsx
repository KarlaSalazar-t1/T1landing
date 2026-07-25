import T1Navbar from "@/components/T1Navbar";
import T1TiendaHero from "@/components/T1TiendaHero";
import T1TiendaDondeVender from "@/components/T1TiendaDondeVender";
import {
  T1TiendaIncluido,
  T1TiendaMarketplaces,
  T1TiendaAdministracion,
  T1TiendaPagos,
  T1TiendaFAQ,
} from "@/components/T1TiendaSecciones";
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
        {/* 1 · Tu tienda con pagos y envíos integrados */}
        <T1TiendaIncluido />
        {/* 2 · Dónde vender — tienda en línea / marketplaces / POS */}
        <T1TiendaDondeVender />
        {/* 3 · Marketplaces — "olvídate de manejar cada canal" */}
        <T1TiendaMarketplaces />
        {/* 4 · Administración — catálogo, inventario, reportes */}
        <T1TiendaAdministracion />
        {/* 5 · Pagos — cobra como quieras */}
        <T1TiendaPagos />
        {/* 6 · Casos de éxito */}
        <T1EnterpriseCarousel />
        {/* 7 · FAQ */}
        <T1TiendaFAQ />
      </div>

      {/* CTA final */}
      <T1FinalCTA
        title={<>¿Listo para crear tu tienda?</>}
        description="Describe tu negocio y ten tu tienda lista para vender en minutos. Sin código, sin complicaciones."
        buttonLabel="Crear mi tienda gratis"
      />

      <T1Footer />
    </main>
  );
}
