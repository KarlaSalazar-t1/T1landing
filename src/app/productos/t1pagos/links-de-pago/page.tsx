import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1LinksDePago from "@/components/T1LinksDePago";

export const metadata = {
  title: "Links de pago · T1 Pagos",
  description:
    "Cobra con un link de pago sin tener página web. Créalo en segundos, compártelo por WhatsApp, redes o correo y recibe el pago al instante.",
};

export default function LinksDePagoPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar />
      <T1LinksDePago />
      <T1Footer />
    </main>
  );
}
