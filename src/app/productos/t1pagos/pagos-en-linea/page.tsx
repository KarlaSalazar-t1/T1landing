import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1PagosEnLinea from "@/components/T1PagosEnLinea";

export const metadata = {
  title: "Pagos en línea · T1 Pagos",
  description:
    "Acepta pagos en línea con tarjetas, transferencias y efectivo. Más de 10 métodos, mayor aprobación, liquidación T+1 y todo en el administrador.",
};

export default function PagosEnLineaPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar />
      <T1PagosEnLinea />
      <T1Footer />
    </main>
  );
}
