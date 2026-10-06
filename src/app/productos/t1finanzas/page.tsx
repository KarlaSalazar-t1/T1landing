import T1Navbar from "@/components/T1Navbar";
import T1FinanzasHero from "@/components/T1FinanzasHero";
import T1FinanzasPilares from "@/components/T1FinanzasPilares";
import {
  T1FinanzasProblema,
  T1FinanzasProblemaC,
  T1FinanzasProblemaD,
  T1FinanzasCanales,
  T1FinanzasPorNegocio,
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
};

/* TEMPORAL: rotula cada propuesta de la primera sección mientras se elige. */
function EtiquetaPropuesta({ letra, nombre }: { letra: string; nombre: string }) {
  return (
    <div className="bg-black px-5 pt-10 tablet:px-6">
      <p className="mx-auto max-w-[var(--max-w)] font-inter text-[12px] font-semibold uppercase tracking-[0.12em] text-white/25">
        Propuesta {letra} · {nombre}
      </p>
    </div>
  );
}

export default function FinanzasLanding() {
  return (
    <main className="min-h-screen">
      {/* Finanzas todavía NO va en el mega menú (decisión de Karla): el navbar
          solo lleva el lockup del producto. */}
      <T1Navbar product="finanzas" pageType="producto" />

      {/* Hero — la pantalla de Inicio del producto, con el aviso de pedido */}
      <T1FinanzasHero />

      <div className="relative z-[5] bg-black">
        {/* El hilo: qué te duele hoy → cómo funciona → de dónde salen tus
            pedidos → para quién es → qué emite → cuánto cuesta → cómo
            empiezas → dudas. */}
        {/* 1 · El problema, en tres propuestas para comparar en vivo.
            TEMPORAL: cuando Karla elija una, se quedan solo esa y su
            componente; las otras dos se borran de T1FinanzasSecciones. */}
        <EtiquetaPropuesta letra="A" nombre="tipografía (la actual)" />
        <T1FinanzasProblema />
        <EtiquetaPropuesta letra="C" nombre="el revoltijo de hoy" />
        <T1FinanzasProblemaC />
        <EtiquetaPropuesta letra="D" nombre="el antes y el después" />
        <T1FinanzasProblemaD />
        {/* 2 · Cómo facturas — pestañas: pedido · global · otras ventas · clave */}
        <T1FinanzasPilares />
        {/* 3 · Los pedidos de T1 Tienda, que llegan solos */}
        <T1FinanzasCanales />
        {/* 4 · Por tipo de negocio — cada tarjeta llevará a su sublanding */}
        <T1FinanzasPorNegocio />
        {/* 5 · Lo que haces después de facturar: nota de crédito, cancelar, recibo */}
        <T1FinanzasDocumentos />
        {/* 6 · Planes — empieza gratis con 25 facturas al mes.
            "Nuestros números" salió: Finanzas todavía no tiene números
            propios y repetía los tres datos del hero. Regresa cuando la beta
            tenga facturas emitidas y negocios facturando aquí. */}
        <T1FinanzasPlanes />
        {/* 7 · El alta, con el simulador de los tres pasos */}
        <T1FinanzasAlta />
        {/* 8 · FAQ larga, a propósito: la leen los agentes de IA */}
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
