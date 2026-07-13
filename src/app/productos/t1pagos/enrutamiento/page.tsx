import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1Enrutamiento from "@/components/T1Enrutamiento";

export const metadata = {
  title: "Enrutamiento de pagos · T1 Pagos",
  description:
    "Aprueba más pagos con enrutamiento inteligente. T1 envía cada cobro al procesador con mayor probabilidad de aprobarse y reintenta con otro si es necesario. Un solo contrato, más ventas.",
};

export default function EnrutamientoPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar />
      <T1Enrutamiento />
      <T1Footer />
    </main>
  );
}
