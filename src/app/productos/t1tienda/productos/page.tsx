import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1Productos from "@/components/T1Productos";

export const metadata = {
  title: "Productos e inventario · T1 Tienda",
  description:
    "Tu catálogo, stock y precios centralizados. Variantes por canal, alertas de bajo stock y sincronización en tiempo real entre tienda online, sucursales y marketplaces.",
};

export default function ProductosPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar />
      <T1Productos />
      <T1Footer />
    </main>
  );
}
