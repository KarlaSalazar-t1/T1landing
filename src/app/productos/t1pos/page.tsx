import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1POS from "@/components/T1POS";

export const metadata = {
  title: "T1 POS · Punto de venta",
  description:
    "Vende en sucursal y online desde una sola caja. Cobra con tarjeta, efectivo o transferencia, sincroniza inventario y cierra turno con control de caja.",
};

/* T1 POS ya es producto propio (antes: /productos/t1tienda/punto-de-venta). */
export default function T1POSPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar product="pos" pageType="producto" />
      <T1POS />
      <T1Footer />
    </main>
  );
}
