import T1Navbar from "@/components/T1Navbar";
import T1Hero from "@/components/T1Hero";
import T1Features from "@/components/T1Features";
import T1AISectionV2 from "@/components/T1AISectionV2";
import T1Metrics from "@/components/T1Metrics";
import T1Solutions from "@/components/T1Solutions";
import T1Pricing from "@/components/T1Pricing";
import T1Enterprise from "@/components/T1Enterprise";
import T1Audience from "@/components/T1Audience";
import T1ScrollShowcase from "@/components/T1ScrollShowcase";
import T1Footer from "@/components/T1Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <T1Navbar />

      {/* Hero — sticky, stays behind */}
      <T1Hero />

      {/* White card — scrolls over the hero */}
      <div className="relative z-10" data-white-card>
        {/* Rounded top cap */}
        <div
          className="bg-[#F6F6F6]"
          style={{ borderRadius: "24px 24px 0 0", height: 24, marginTop: -10 }}
        />
        <T1Features />
        <T1AISectionV2 />
        <T1Metrics />
        <T1Audience />
        <T1Solutions />
        <T1Pricing />
      </div>

      {/* Enterprise — sticky behind the black card (same pattern as hero) */}
      <div className="sticky top-0 z-[11]">
        <T1Enterprise />
      </div>

      {/* Black showcase — scrolls over Enterprise */}
      <div className="relative z-[12]">
        <T1ScrollShowcase />
        <T1Footer />
      </div>
    </main>
  );
}
