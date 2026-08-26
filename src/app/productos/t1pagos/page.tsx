import T1Navbar from "@/components/T1Navbar";
import T1PagosHero from "@/components/T1PagosHero";
import T1PagosPilares from "@/components/T1PagosPilares";
import {
  T1PagosMetodos,
  T1PagosAprobacion,
  T1PagosAdministracion,
  T1PagosFAQ,
} from "@/components/T1PagosSecciones";
import { T1PagosApi, T1PagosPrecios, T1PagosPaises, T1PagosPCI } from "@/components/T1PagosExtra";
import T1FinalCTA from "@/components/T1FinalCTA";
import T1Footer from "@/components/T1Footer";

export default function PagosLanding() {
  return (
    <main className="min-h-screen">
      <T1Navbar />

      {/* Hero — crear link de pago */}
      <T1PagosHero />

      <div className="relative z-[5] bg-black">
        {/* 1 · Acepta todos los métodos de pago */}
        <T1PagosMetodos />
        {/* 2 · Una plataforma, cero complicaciones (pilares) */}
        <T1PagosPilares />
        {/* 3 · Aprueba más, protege cada venta (antifraude) */}
        <T1PagosAprobacion />
        {/* 4 · Administra tus cobros */}
        <T1PagosAdministracion />
        {/* 5 · Integra con la API (desarrolladores) */}
        <T1PagosApi />
        {/* 6 · Precios / comisiones */}
        <T1PagosPrecios />
        {/* 7 · 8 países LATAM */}
        <T1PagosPaises />
        {/* 8 · Certificación PCI DSS */}
        <T1PagosPCI />
        {/* 9 · FAQ */}
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
