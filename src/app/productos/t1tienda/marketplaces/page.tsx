import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1Marketplaces from "@/components/T1Marketplaces";

export const metadata = {
  title: "Marketplaces · T1tienda",
  description:
    "Conecta y vende en +10 marketplaces desde un solo lugar. Inventario, pedidos y catálogo sincronizados en tiempo real.",
};

export default function MarketplacesPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar />
      <T1Marketplaces />
      <T1Footer />
    </main>
  );
}
