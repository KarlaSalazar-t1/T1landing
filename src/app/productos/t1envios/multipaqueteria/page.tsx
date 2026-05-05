import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1Multipaqueteria from "@/components/T1Multipaqueteria";

export const metadata = {
  title: "Multipaquetería · T1envíos",
  description:
    "Conecta +25 paqueterías en un click. Cotiza, genera guías y rastrea envíos desde un solo panel con T1envíos.",
};

export default function MultipaqueteriaPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar />
      <T1Multipaqueteria />
      <T1Footer />
    </main>
  );
}
