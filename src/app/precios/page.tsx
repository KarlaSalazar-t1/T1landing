import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";
import T1Pricing from "@/components/T1Pricing";

export const metadata = {
  title: "Precios · T1",
  description:
    "Precios transparentes. Paga solo por lo que usas, sin sorpresas ni letras chiquitas. T1 Tienda, T1 Pagos y T1 Envíos.",
};

export default function PreciosPage() {
  return (
    <main className="min-h-screen bg-white">
      <T1Navbar />

      {/* Dark header band so the fixed navbar stays legible and the page
          has a clear entry point. */}
      <header
        className="relative flex flex-col items-center justify-center overflow-hidden px-5 text-center"
        style={{
          paddingTop: 140,
          paddingBottom: 60,
          background:
            "radial-gradient(120% 90% at 50% 0%, #2a1410 0%, #1a0c0a 55%, #120808 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute"
          style={{
            top: "-30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(219,59,43,0.22) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <h1
          className="relative font-sora text-[34px] font-light text-white tablet:text-[52px]"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
        >
          Precios transparentes
        </h1>
        <p
          className="relative mt-3 font-inter text-[15px] font-light text-white/70 tablet:text-[19px]"
          style={{ maxWidth: 560 }}
        >
          Paga solo por lo que usas. Sin sorpresas, sin letras chiquitas.
        </p>
      </header>

      <T1Pricing hideHeading />

      <T1Footer />
    </main>
  );
}
