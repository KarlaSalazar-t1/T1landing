import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1ReportesLogisticos from "@/components/T1ReportesLogisticos";

export const metadata = {
  title: "Reportes logísticos · T1 Envíos",
  description:
    "Mide tu logística con datos: tiempos de entrega, costos por envío y desempeño de cada paquetería en el administrador. Filtra, compara y exporta para decidir mejor.",
};

export default function ReportesPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar />
      <T1ReportesLogisticos />
      <T1Footer />
    </main>
  );
}
