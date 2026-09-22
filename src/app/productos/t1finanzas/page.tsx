import T1Navbar from "@/components/T1Navbar";
import T1FinanzasHero from "@/components/T1FinanzasHero";
import T1FinanzasPilares from "@/components/T1FinanzasPilares";
import {
  T1FinanzasAntesAhora,
  T1FinanzasCanales,
  T1FinanzasDocumentos,
  T1FinanzasPlanes,
  T1FinanzasAlta,
  T1FinanzasFAQ,
} from "@/components/T1FinanzasSecciones";
import T1ProductMetrics from "@/components/T1ProductMetrics";
import T1FinalCTA from "@/components/T1FinalCTA";
import T1StickyCTA from "@/components/T1StickyCTA";
import T1EnviosAnalytics from "@/components/T1EnviosAnalytics";
import T1Footer from "@/components/T1Footer";
import { SIGNUP_URL } from "@/lib/constants";

export const metadata = {
  title: "T1 Finanzas · Factura lo que ya vendiste",
  description:
    "La facturación de T1. Factura las ventas de tu tienda y de tus marketplaces sin entrar al portal del SAT: la global de cada canal se arma sola y lo que vendiste por fuera lo capturas en cuatro pasos. 25 facturas gratis al mes por negocio.",
};

export default function FinanzasLanding() {
  return (
    <main className="min-h-screen">
      {/* Finanzas todavía NO va en el mega menú (decisión de Karla): el navbar
          solo lleva el lockup del producto. */}
      <T1Navbar product="finanzas" pageType="producto" />

      {/* Hero — facturas emitidas + "facturar aquí son cuatro preguntas" */}
      <T1FinanzasHero />

      <div className="relative z-[5] bg-black">
        {/* El hilo: antes/ahora → cómo → dónde → qué emite → cuánto →
            empezar → dudas. Sin rejillas de tarjetas con párrafo: la página
            tiene que sentirse tan fácil como el producto. */}
        {/* 1 · Antes, medio día. Ahora, un clic. */}
        <T1FinanzasAntesAhora />
        {/* 2 · Las tres capacidades, animadas (global · pedido · clave del SAT) */}
        <T1FinanzasPilares />
        {/* 3 · Los canales que ya están en T1 Tienda */}
        <T1FinanzasCanales />
        {/* 4 · Los cinco documentos, en una sola línea de chips */}
        <T1FinanzasDocumentos />
        {/* 5 · Números — los tres aprobados el 21 de septiembre */}
        <T1ProductMetrics
          metrics={[
            { end: 52513, label: "claves del SAT a tu alcance" },
            { end: 25, label: "facturas gratis cada mes" },
            { end: 3, label: "negocios en una cuenta" },
          ]}
        />
        {/* 6 · Planes — el gratis factura, el de pago factura solo */}
        <T1FinanzasPlanes />
        {/* 7 · El alta, en tres pasos cortos */}
        <T1FinanzasAlta />
        {/* 8 · FAQ larga, a propósito: la leen los agentes de IA */}
        <T1FinanzasFAQ />
      </div>

      <T1FinalCTA
        title={<>Tu primera factura, hoy</>}
        description="Crea tu cuenta gratis y factura sin entrar al portal del SAT."
        buttonLabel="Comienza gratis"
      />

      <T1Footer />

      <T1StickyCTA label="Comienza gratis" href={SIGNUP_URL} section="sticky_mobile" />
      <T1EnviosAnalytics />
    </main>
  );
}
