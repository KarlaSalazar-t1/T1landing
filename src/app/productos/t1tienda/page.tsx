import T1Navbar from "@/components/T1Navbar";
import T1TiendaHero from "@/components/T1TiendaHero";
import T1TiendaDondeVender from "@/components/T1TiendaDondeVender";
import T1TiendaBento from "@/components/T1TiendaBento";
import T1TiendaMosaico from "@/components/T1TiendaMosaico";
import T1TiendaVideo from "@/components/T1TiendaVideo";
import {
  T1TiendaIncluido,
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
      <T1Navbar product="tienda" pageType="producto" />

      {/* Hero — el prompt: describe tu negocio y crea tu tienda con IA */}
      <T1TiendaHero />

      <div className="relative z-[5] bg-black">
        {/* Video demo — cómo funciona (store creation) */}
        <T1TiendaVideo />
        {/* 1 · Tu tienda con pagos y envíos integrados */}
        <T1TiendaIncluido />
        {/* 2 · Dónde vender — tienda en línea / marketplaces / POS */}
        <T1TiendaDondeVender />
        {/* 3 · Marketplaces — "Un solo administrador…" (oculto por ahora) */}
        {/* <T1TiendaMarketplaces /> */}
        {/* 3.5 · Carrusel de tiendas — "Miles de negocios ya crecen con T1" */}
        <T1TiendaBento />
        {/* 3.6 · Mosaico bento (parallax) — misma sección, versión grid (más alta) */}
        <T1TiendaMosaico />
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
        description="Describe tu negocio y ten tu tienda lista para vender en segundos. Sin código."
        buttonLabel="Comienza gratis"
      />

      <T1Footer />
    </main>
  );
}
