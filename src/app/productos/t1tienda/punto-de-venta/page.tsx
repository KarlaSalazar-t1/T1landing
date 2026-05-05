import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1POS from "@/components/T1POS";

export const metadata = {
  title: "Punto de venta · T1tienda",
  description:
    "Vende en sucursal y online desde una sola caja. Cobra con tarjeta, efectivo o transferencia, sincroniza inventario y cierra turno con control de caja.",
};

export default function POSPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar />
      <T1POS />
      <T1Footer />
    </main>
  );
}
