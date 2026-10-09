import T1Navbar from "@/components/T1Navbar";
import T1FinanzasHero from "@/components/T1FinanzasHero";
import T1FinanzasPilares from "@/components/T1FinanzasPilares";
import { T1FinanzasBeneficios, T1FinanzasOrigen } from "@/components/T1FinanzasV2";
import {
  T1FinanzasProblema,
  T1FinanzasDocumentos,
  T1FinanzasPlanes,
  T1FinanzasFAQ,
} from "@/components/T1FinanzasSecciones";
import T1FinanzasAlta from "@/components/T1FinanzasAlta";
import T1FinalCTA from "@/components/T1FinalCTA";
import T1StickyCTA from "@/components/T1StickyCTA";
import T1EnviosAnalytics from "@/components/T1EnviosAnalytics";
import T1Footer from "@/components/T1Footer";
import { SIGNUP_URL } from "@/lib/constants";

export const metadata = {
  title: "T1 Finanzas · Factura tus ventas en un clic",
  description:
    "La facturación de T1. Tus pedidos de Mercado Libre, Amazon, TikTok Shop y más llegan listos para facturar, y cualquier otra venta la facturas en minutos. Comienza gratis con 25 facturas al mes por negocio.",
  robots: { index: false, follow: false },
};

/* Ruta de prueba A/B del landing de Finanzas. Tres cambios contra la v1:

   1 · La primera sección abre con cuatro beneficios en tarjetas y la
       comparación queda debajo, sin título propio, como la prueba.
   2 · "Tus pedidos llegan solos" y "Funciona vendas donde vendas" se funden
       en una sola sección: en la v1 eran tres seguidas contestando lo mismo.
   3 · El alta de tres pasos sube: se ve antes de los documentos y del
       precio, para que llegues al plan sabiendo que empezar es fácil. */
export default function FinanzasLandingV2() {
  return (
    <main className="min-h-screen">
      <T1Navbar product="finanzas" pageType="producto" />

      <T1FinanzasHero />

      <div className="relative z-[5] bg-black">
        {/* 1 · Lo que ganas, y debajo la prueba: la hoja de cálculo de hoy
            contra la pantalla de Facturación */}
        <T1FinanzasBeneficios />
        <T1FinanzasProblema sinEncabezado />
        {/* 2 · Cómo facturas — pestañas: pedido · global · otras ventas · clave */}
        <T1FinanzasPilares titulo="Tú confirmas, la factura se arma sola" sinClave />
        {/* 3 · De dónde salen tus ventas: canales conectados y tipos de negocio */}
        <T1FinanzasOrigen />
        {/* 4 · Empezar cuesta tres pasos */}
        <T1FinanzasAlta />
        {/* 5 · Lo que haces después de facturar */}
        <T1FinanzasDocumentos />
        {/* 6 · Planes */}
        <T1FinanzasPlanes />
        {/* 7 · FAQ larga, a propósito: la leen los agentes de IA */}
        <T1FinanzasFAQ />
      </div>

      <T1FinalCTA
        title={<>Factura gratis desde hoy</>}
        description="Con T1 vendes, cobras, envías y ahora facturas desde un solo lugar."
        buttonLabel="Comienza gratis"
      />

      <T1Footer />

      <T1StickyCTA label="Comienza gratis" href={SIGNUP_URL} section="sticky_mobile" />
      <T1EnviosAnalytics />
    </main>
  );
}
