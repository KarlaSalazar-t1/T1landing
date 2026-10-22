import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1IA from "@/components/T1IA";

export const metadata = {
  title: "Uno, la IA de T1 · Decide con los datos de tu negocio",
  description:
    "Pregúntale a Uno, la IA de T1, por tus ventas, pedidos, pagos o envíos y recibe respuestas con tus números. También sube tu catálogo, genera guías y crea cupones y links de pago por ti.",
};

export default function UnoPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar pageType="sublanding" />
      <T1IA />
      <T1Footer />
    </main>
  );
}
