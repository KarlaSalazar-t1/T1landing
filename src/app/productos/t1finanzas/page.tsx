import T1Navbar from "@/components/T1Navbar";
import T1FinanzasHero from "@/components/T1FinanzasHero";
import T1FinanzasPilares from "@/components/T1FinanzasPilares";
import {
  T1FinanzasProblema,
  T1FinanzasPorQue,
  T1FinanzasCanales,
  T1FinanzasDocumentos,
  T1FinanzasParaQuien,
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
    "La facturación de T1. Factura las ventas de tu tienda y de tus marketplaces desde donde ya vendes, arma la factura global de cada canal y captura en cuatro pasos lo que vendiste por fuera. 25 facturas gratis al mes por negocio.",
};

export default function FinanzasLanding() {
  return (
    <main className="min-h-screen">
      {/* Finanzas todavía NO va en el mega menú (decisión de Karla): el navbar
          solo lleva el lockup del producto. */}
      <T1Navbar product="finanzas" pageType="producto" />

      {/* Hero — facturas emitidas + el asistente de 4 pasos */}
      <T1FinanzasHero />

      <div className="relative z-[5] bg-black">
        {/* Narrativa: problema → por qué → qué hace → dónde → qué emite →
            para quién → prueba → plan → alta → dudas */}
        {/* 1 · El problema: medio día al mes, con miedo */}
        <T1FinanzasProblema />
        {/* 2 · El diferenciador en cuatro razones */}
        <T1FinanzasPorQue />
        {/* 3 · Las tres capacidades, animadas (global · pedido · clave del SAT) */}
        <T1FinanzasPilares />
        {/* 4 · Los canales que ya están en T1 Tienda + cobertura de giros */}
        <T1FinanzasCanales />
        {/* 5 · Los cinco documentos de la primera versión */}
        <T1FinanzasDocumentos />
        {/* 6 · Para quién es — los cinco perfiles del playbook */}
        <T1FinanzasParaQuien />
        {/* 7 · Números — los tres aprobados el 21 de septiembre */}
        <T1ProductMetrics
          metrics={[
            { end: 52513, label: "claves del SAT organizadas para encontrar la tuya" },
            { end: 25, label: "facturas gratis cada mes, por negocio" },
            { end: 3, label: "negocios en una sola cuenta gratis" },
          ]}
        />
        {/* 8 · Planes — el gratis factura, el de pago factura solo */}
        <T1FinanzasPlanes />
        {/* 9 · El alta y la seguridad del sello */}
        <T1FinanzasAlta />
        {/* 10 · FAQ larga, a propósito: la leen los agentes de IA */}
        <T1FinanzasFAQ />
      </div>

      <T1FinalCTA
        title={<>¿Listo para dejar de facturar a mano?</>}
        description="Crea tu cuenta gratis y emite tus primeras 25 facturas del mes sin pagar nada."
        buttonLabel="Comienza gratis"
      />

      <T1Footer />

      <T1StickyCTA label="Comienza gratis" href={SIGNUP_URL} section="sticky_mobile" />
      <T1EnviosAnalytics />
    </main>
  );
}
