import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1IAv2 from "@/components/T1IAv2";

export const metadata = {
  title: "Uno, la IA de T1 · El aliado que tu negocio necesitaba",
  description:
    "Pregúntale a Uno, la IA de T1, por tus ventas, pedidos, pagos o envíos y recibe respuestas con tus números. También crea cupones, productos, guías y links de pago por ti.",
  robots: { index: false },
};

export default function UnoV2Page() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar pageType="sublanding" />
      <T1IAv2 />
      <T1Footer />
    </main>
  );
}
