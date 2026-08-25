import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";

const HERO_BG =
  "radial-gradient(ellipse 86% 70% at 67% 32%, rgba(226,64,47,0.26) 0%, transparent 60%), radial-gradient(ellipse 60% 58% at 14% 22%, rgba(150,34,34,0.18) 0%, transparent 58%), radial-gradient(ellipse 50% 46% at 82% 84%, rgba(244,114,150,0.08) 0%, transparent 62%), radial-gradient(ellipse 60% 70% at -4% 88%, rgba(58,74,158,0.30) 0%, transparent 52%), radial-gradient(ellipse 42% 60% at 102% 10%, rgba(58,74,158,0.24) 0%, transparent 50%), linear-gradient(160deg, #2e1622 0%, #180b13 50%, #0d070b 100%)";

const PRODUCTS = [
  {
    name: "T1 Store",
    desc: "Describe your business and AI builds your online store in under a minute.",
    href: "/usa/t1tienda",
    status: { label: "Coming soon", note: "Nov 2026", color: "#F59E0B" },
  },
  {
    name: "T1 Payments",
    desc: "Accept cards, transfers, and local methods with one secure checkout.",
    href: "/usa/t1pagos",
    status: { label: "Waitlist open", note: "Join now", color: "#3B82F6" },
  },
  {
    name: "T1 Shipping",
    desc: "Quote, create labels, and track across 10+ carriers from one panel.",
    href: "/usa/t1envios",
    status: { label: "Not available yet", note: "", color: "#9CA3AF" },
  },
];

export default function T1USAHome() {
  return (
    <main className="min-h-screen bg-black">
      {/* Full site header — some products ARE available/coming, so we keep the nav. */}
      <T1Navbar />

      <section
        className="relative overflow-hidden px-5 pb-24 pt-[130px] tablet:px-10 tablet:pt-[150px]"
        style={{ background: HERO_BG }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0"
          style={{ height: "30%", background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 65%, #000 100%)" }}
        />

        <div className="relative z-10 mx-auto max-w-[var(--max-w)]">
          <div className="mx-auto max-w-[720px] text-center">
            <h1
              className="font-sora text-[36px] font-light text-white tablet:text-[56px]"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.06 }}
            >
              T1 is coming to the United States
            </h1>
            <p
              className="mx-auto font-inter text-[16px] font-light text-white/70 tablet:text-[19px]"
              style={{ lineHeight: 1.55, marginTop: 20, maxWidth: 560 }}
            >
              The all-in-one commerce platform trusted by 50,000+ businesses in Mexico is expanding north. Here's what's rolling out.
            </p>
          </div>

          {/* Product status cards */}
          <div className="mx-auto mt-14 grid max-w-[1040px] grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
            {PRODUCTS.map((p) => (
              <a
                key={p.name}
                href={p.href}
                className="group flex flex-col rounded-[20px] border border-white/[0.10] bg-white/[0.03] p-7 no-underline transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-2" style={{ marginBottom: 18 }}>
                  <span className="h-[7px] w-[7px] rounded-full" style={{ background: p.status.color }} />
                  <span className="font-inter text-[12px] font-semibold uppercase tracking-[0.08em] text-white">
                    {p.status.label}
                  </span>
                  {p.status.note && (
                    <span className="ml-auto font-inter text-[12px] font-medium text-white/70">{p.status.note}</span>
                  )}
                </div>
                <h3 className="font-sora text-[22px] font-normal text-white" style={{ letterSpacing: "-0.01em", marginBottom: 8 }}>
                  {p.name}
                </h3>
                <p className="font-inter text-[14px] font-light text-white" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  {p.desc}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 font-inter text-[14px] font-semibold text-white transition-colors group-hover:text-white/75">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-150 group-hover:translate-x-0.5">
                    <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <T1Footer />
    </main>
  );
}
