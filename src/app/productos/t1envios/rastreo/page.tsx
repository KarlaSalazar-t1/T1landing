import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1RastreoGuias from "@/components/T1RastreoGuias";

export const metadata = {
  title: "Rastreo de guías · T1 Envíos",
  description:
    "Rastrea todas tus guías en un solo lugar, sin importar la paquetería. Estatus unificado en tiempo real, notificaciones automáticas a tu cliente y detección de demoras.",
};

export default function RastreoGuiasPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar />
      <T1RastreoGuias />
      <T1Footer />
    </main>
  );
}
