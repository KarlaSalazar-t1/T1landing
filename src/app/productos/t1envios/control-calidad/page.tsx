import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1ControlCalidad from "@/components/T1ControlCalidad";

export const metadata = {
  title: "Control de calidad · T1 Envíos",
  description:
    "Detecta problemas de entrega antes que tu cliente. T1 monitorea cada guía, califica a tus paqueterías, abre incidencias en automático y les da seguimiento hasta resolver.",
};

export default function ControlCalidadPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar />
      <T1ControlCalidad />
      <T1Footer />
    </main>
  );
}
