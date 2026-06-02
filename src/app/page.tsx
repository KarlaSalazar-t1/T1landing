import T1Navbar from "@/components/T1Navbar";
import T1Hero from "@/components/T1Hero";
import T1FeatureIntro from "@/components/T1FeatureIntro";
import T1Features from "@/components/T1Features";
import T1AISectionV2 from "@/components/T1AISectionV2";
import T1Metrics from "@/components/T1Metrics";
import T1Solutions from "@/components/T1Solutions";
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

      {/* Dark band carrying the Vende / Cobra / Envia intro cards.
          Rounded top corners now live on this dark band so the curve
          divides the hero (sharp) and the dark intro (rounded). */}
      <div
        className="relative z-[5] bg-black"
        style={{
          paddingTop: 40,
          paddingBottom: 220,
          borderRadius: "24px 24px 0 0",
          marginTop: -10,
        }}
      >
        <T1FeatureIntro />
      </div>

      {/* White card — sharp top edge, solid gray bg. */}
      <div
        className="relative z-10 bg-[#F6F6F6]"
        data-white-card
        style={{ marginTop: -160 }}
      >
        <T1Features />
        <T1AISectionV2 />
        <T1Metrics />
        <T1Audience />
        <T1Solutions />
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
