import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1ReglasEnvio from "@/components/T1ReglasEnvio";

export const metadata = {
  title: "Reglas de envío · T1 Envíos",
  description:
    "Asignación automática de paqueterías con reglas inteligentes. Define una vez tus criterios y T1 elige el carrier ideal —por costo, tiempo o servicio— en cada pedido.",
};

export default function ReglasEnvioPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar />
      <T1ReglasEnvio />
      <T1Footer />
    </main>
  );
}
