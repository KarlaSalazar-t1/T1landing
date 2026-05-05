import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1Pasarela from "@/components/T1Pasarela";

export const metadata = {
  title: "Pasarela de pagos · T1tienda",
  description:
    "Pasarela de pagos optimizada para conversión. Acepta tarjetas, SPEI, OXXO y más. Enrutamiento inteligente, antifraude y MSI sin esfuerzo.",
};

export default function PasarelaPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar />
      <T1Pasarela />
      <T1Footer />
    </main>
  );
}
