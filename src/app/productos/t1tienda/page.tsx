import T1Navbar from "@/components/T1Navbar";
import T1TiendaHero from "@/components/T1TiendaHero";
import T1TiendaSecciones from "@/components/T1TiendaSecciones";
import T1EnterpriseCarousel from "@/components/T1EnterpriseCarousel";
import T1FinalCTA from "@/components/T1FinalCTA";
import T1Footer from "@/components/T1Footer";

export default function TiendaLanding() {
  return (
    <main className="min-h-screen">
      <T1Navbar />

      {/* Hero — el prompt: describe tu negocio y crea tu tienda con IA */}
      <T1TiendaHero />

      {/* Capacidades · Marketplaces · Pagos y envíos incluidos · FAQ */}
      <T1TiendaSecciones />

      {/* Casos de éxito */}
      <div className="relative z-[6] bg-black">
        <T1EnterpriseCarousel />
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
