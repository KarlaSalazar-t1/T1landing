import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1RastreoGuias from "@/components/T1RastreoGuias";

export const metadata = {
  title: "Rastreo de guías · T1 Envíos",
  description:
    "Rastrea y da seguimiento a todos tus envíos en un solo lugar, con todas las paqueterías, desde el administrador de T1 Envíos.",
};

export default function RastreoPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar product="envios" pageType="sublanding" />
      <T1RastreoGuias />
      <T1Footer />
    </main>
  );
}
