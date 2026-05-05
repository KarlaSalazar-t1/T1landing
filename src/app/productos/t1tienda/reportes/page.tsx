import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1Reportes from "@/components/T1Reportes";

export const metadata = {
  title: "Reportería avanzada · T1tienda",
  description:
    "Dashboards de ventas, tráfico y rendimiento en tiempo real. Compara canales, exporta a Excel y deja que la IA encuentre oportunidades en tus datos.",
};

export default function ReportesPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar />
      <T1Reportes />
      <T1Footer />
    </main>
  );
}
