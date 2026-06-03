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
          Mobile: minimal bottom padding so the band ends right under
          the cards and the white section begins at a thin divider.
          Desktop: keeps the deep 220px bottom padding for the card-peek
          effect with the overlapping white card. */}
      <div
        className="relative z-[5] -mt-2.5 rounded-t-[24px] bg-black pb-7 pt-10 tablet:pb-[220px]"
      >
        <T1FeatureIntro />
      </div>

      {/* Dark block — sharp top edge over the intro band.
          (P3 tonality) Base is a warm neutral dark (#141414, footer ref) so
          the contained sections read cohesive instead of flipping light↔dark.
          No `data-white-card` here anymore: the whole block is dark now, so the
          navbar must STAY in dark mode (white text) instead of flipping to its
          white-bar light mode. With no [data-white-card] on the landing, the
          navbar's scroll handler leaves isLight=false throughout.
          Desktop pulls up by 160 to keep the peek over the dark intro band. */}
      <div
        className="relative z-10 bg-[#141414] tablet:-mt-40"
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
