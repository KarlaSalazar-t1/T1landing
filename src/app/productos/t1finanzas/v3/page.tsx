import T1Navbar from "@/components/T1Navbar";
import T1FinanzasHero from "@/components/T1FinanzasHero";
import T1FinanzasPilares from "@/components/T1FinanzasPilares";
import { T1FinanzasBeneficios } from "@/components/T1FinanzasV2";
import { T1FinanzasPerfiles, T1FinanzasEcosistema } from "@/components/T1FinanzasV3";
import {
  T1FinanzasProblema,
  T1FinanzasDocumentos,
  T1FinanzasFAQ,
} from "@/components/T1FinanzasSecciones";
import T1FinanzasAlta from "@/components/T1FinanzasAlta";
// import T1FinanzasPedidos from "@/components/T1FinanzasPedidos"; // oculto: el video aún no existe
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

/* v3 — la v2 más las dos cosas que Alegra hace bien:

   · "Encuentra tu caso": el perfil en primera persona con la lista de lo que
     se resuelve, en vez de las cuatro tarjetas de una línea de la v2.
   · "Ya vendes, cobras y envías con T1": el ecosistema deja de estar
     escondido en el último bloque y tiene su propia sección, con el punto
     de venta y los canales nombrados. */
export default function FinanzasLandingV3() {
  return (
    <main className="min-h-screen">
      <T1Navbar product="finanzas" pageType="producto" />

      <T1FinanzasHero />

      <div className="relative z-[5] bg-black">
        {/* 1 · Lo que ganas, y debajo la prueba */}
        <T1FinanzasBeneficios />
        <T1FinanzasProblema sinEncabezado />
        {/* 2 · El diferenciador: los pedidos ya están aquí. OCULTO por ahora
            (decisión de Karla): el video todavía no existe. Para volver a
            mostrarlo, descomenta el import y esta línea, y pásale `src`. */}
        {/* <T1FinanzasPedidos /> */}
        {/* 3 · Cómo facturas — pedido · global · otras ventas */}
        <T1FinanzasPilares titulo="Todas tus ventas se facturan igual de fácil" sinClave />
        {/* 4 · Empezar cuesta tres pasos. Sube aquí: la objeción de "¿y qué
            tanto me cuesta arrancar?" llega justo después de ver cómo se
            factura, y mucho antes del precio. */}
        <T1FinanzasAlta />
        {/* 5 · Para quién es, en primera persona */}
        <T1FinanzasPerfiles />
        {/* 6 · La pieza que faltaba del ecosistema T1 */}
        <T1FinanzasEcosistema />
        {/* 7 · Lo que haces después de facturar */}
        <T1FinanzasDocumentos />
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
