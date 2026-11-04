import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1IA from "@/components/T1IA";

/* Versión anterior del landing de Uno (la nueva vive en /uno) */
export const metadata = {
  title: "Uno, la IA de T1 · El aliado que tu negocio necesitaba",
  description:
    "Pregúntale a Uno, la IA de T1, por tus ventas, pedidos, pagos o envíos y recibe respuestas con tus números. También sube tu catálogo, genera guías y crea cupones y links de pago por ti.",
  robots: { index: false },
};

export default function UnoV2Page() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar pageType="sublanding" />
      <T1IA />
      <T1Footer />
    </main>
  );
}
