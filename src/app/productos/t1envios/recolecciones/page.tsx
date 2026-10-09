import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1Recolecciones from "@/components/T1Recolecciones";

export const metadata = {
  title: "Recolecciones · T1 Envíos",
  description:
    "Programa recolecciones desde tu sucursal, bodega o casa. La IA de T1 te sugiere el horario en que la paquetería suele pasar por tu zona para que prepares tus paquetes con tiempo.",
};

export default function RecoleccionesPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar product="envios" pageType="sublanding" />
      <T1Recolecciones />
      <T1Footer />
    </main>
  );
}
