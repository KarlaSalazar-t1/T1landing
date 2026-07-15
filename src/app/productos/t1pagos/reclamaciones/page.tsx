import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1Reclamaciones from "@/components/T1Reclamaciones";

export const metadata = {
  title: "Reclamaciones · T1 Pagos",
  description:
    "Gestiona disputas y chargebacks desde un solo panel. T1 centraliza contracargos de todos tus procesadores, te alerta a tiempo, adjuntas evidencia en un clic y controlas plazos para no perder disputas.",
};

export default function ReclamacionesPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar />
      <T1Reclamaciones />
      <T1Footer />
    </main>
  );
}
