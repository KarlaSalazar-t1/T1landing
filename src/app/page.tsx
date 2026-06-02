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
          Lives between the hero and the white card so the cards sit on
          the black background, then the white card slides up over their
          bottom — only the top of the cards peeks above its rounded edge. */}
      <div className="relative z-[5] bg-black" style={{ paddingTop: 40, paddingBottom: 220 }}>
        <T1FeatureIntro />
      </div>

      {/* White card — scrolls over the dark intro section. The negative
          margin pulls the white edge up so it overlaps the bottom of the
          intro cards (giving the "card peek" feel). */}
      <div className="relative z-10" data-white-card style={{ marginTop: -160 }}>
        {/* Rounded top cap */}
        <div
          className="bg-[#F6F6F6]"
          style={{ borderRadius: "24px 24px 0 0", height: 24 }}
        />
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
