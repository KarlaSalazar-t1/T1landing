import T1Navbar from "@/components/T1Navbar";
import T1FinanzasHero from "@/components/T1FinanzasHero";
import T1FinanzasPilares from "@/components/T1FinanzasPilares";
import {
  T1FinanzasAntesAhora,
  T1FinanzasCanales,
  T1FinanzasPorNegocio,
  T1FinanzasDocumentos,
  T1FinanzasPlanes,
  T1FinanzasAlta,
  T1FinanzasFAQ,
} from "@/components/T1FinanzasSecciones";
import T1FinalCTA from "@/components/T1FinalCTA";
import T1StickyCTA from "@/components/T1StickyCTA";
import T1EnviosAnalytics from "@/components/T1EnviosAnalytics";
import T1Footer from "@/components/T1Footer";
import { SIGNUP_URL } from "@/lib/constants";

export const metadata = {
  title: "T1 Finanzas · Tu facturación, fácil y automática",
  description:
    "La facturación de T1. Si vendes con T1 Tienda, tus pedidos de Mercado Libre, Amazon y tu tienda en línea llegan listos para facturar en un clic. Lo que vendes en mostrador o por WhatsApp lo facturas en cuatro pasos. 25 facturas gratis al mes por negocio.",
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
        {/* El hilo: qué te duele hoy → cómo funciona → de dónde salen tus
            pedidos → para quién es → qué emite → cuánto cuesta → cómo
            empiezas → dudas. */}
        {/* 1 · El problema: deja de perder medio día al mes facturando */}
        <T1FinanzasAntesAhora />
        {/* 2 · Cómo funciona (pedido en un clic · factura global · clave sugerida) */}
        <T1FinanzasPilares />
        {/* 3 · Los pedidos de T1 Tienda, que llegan solos */}
        <T1FinanzasCanales />
        {/* 4 · Por tipo de negocio — cada tarjeta llevará a su sublanding */}
        <T1FinanzasPorNegocio />
        {/* 5 · Factura, cancela y corrige: los cinco documentos */}
        <T1FinanzasDocumentos />
        {/* 6 · Planes — empieza gratis con 25 facturas al mes.
            "Nuestros números" salió: Finanzas todavía no tiene números
            propios y repetía los tres datos del hero. Regresa cuando la beta
            tenga facturas emitidas y negocios facturando aquí. */}
        <T1FinanzasPlanes />
        {/* 7 · El alta, en tres pasos cortos */}
        <T1FinanzasAlta />
        {/* 8 · FAQ larga, a propósito: la leen los agentes de IA */}
        <T1FinanzasFAQ />
      </div>

      <T1FinalCTA
        title={<>Empieza a facturar gratis desde hoy</>}
        description="Con T1 vendes, cobras, envías y ahora facturas desde un solo lugar. Tienes 25 facturas gratis al mes por negocio y no te pedimos tarjeta."
        buttonLabel="Crea tu cuenta gratis"
      />

      <T1Footer />

      <T1StickyCTA label="Empieza a facturar gratis" href={SIGNUP_URL} section="sticky_mobile" />
      <T1EnviosAnalytics />
    </main>
  );
}
