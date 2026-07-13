import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1Recolecciones from "@/components/T1Recolecciones";

export const metadata = {
  title: "Recolecciones · T1 Envíos",
  description:
    "Programa pickups automáticos desde tu sucursal, bodega o casa. Agenda recolecciones recurrentes, junta varias paqueterías en una sola visita y olvídate de ir a dejar paquetes.",
};

export default function RecoleccionesPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar />
      <T1Recolecciones />
      <T1Footer />
    </main>
  );
}
