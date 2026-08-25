import T1Footer from "@/components/T1Footer";

/* ── T1 logo (coral wordmark) ── */
function T1Logo() {
  return (
    <svg width="40" height="39" viewBox="0 0 45 44" fill="none" aria-label="T1">
      <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457V19.1513V19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#E2614F" />
      <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592H22.4335H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#E2614F" />
    </svg>
  );
}

const HERO_BG =
  "radial-gradient(ellipse 86% 70% at 67% 32%, rgba(226,64,47,0.26) 0%, transparent 60%), radial-gradient(ellipse 60% 58% at 14% 22%, rgba(150,34,34,0.18) 0%, transparent 58%), radial-gradient(ellipse 50% 46% at 82% 84%, rgba(244,114,150,0.08) 0%, transparent 62%), radial-gradient(ellipse 60% 70% at -4% 88%, rgba(58,74,158,0.30) 0%, transparent 52%), radial-gradient(ellipse 42% 60% at 102% 10%, rgba(58,74,158,0.24) 0%, transparent 50%), linear-gradient(160deg, #2e1622 0%, #180b13 50%, #0d070b 100%)";

const PRODUCTS = [
  {
    name: "T1 Store",
    desc: "Launch an online store in under a minute — describe your business and AI builds it.",
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
      <header className="absolute left-0 right-0 top-0 z-20 mx-auto flex w-full max-w-[var(--max-w)] items-center justify-between px-5 pt-7 tablet:px-10">
        <a href="/usa" aria-label="T1 United States">
          <T1Logo />
        </a>
        <a href="/" className="font-inter text-[13px] font-medium text-white/55 no-underline transition-colors hover:text-white/90">
          Switch to México
        </a>
      </header>

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
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-1.5 font-inter text-[12px] font-medium text-white/75">
              <span className="h-[6px] w-[6px] rounded-full bg-[#E2614F]" />
              New market
            </span>
            <h1
              className="font-sora text-[36px] font-light text-white tablet:text-[56px]"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.06, marginTop: 20 }}
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
                  <span className="font-inter text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ color: p.status.color }}>
                    {p.status.label}
                  </span>
                  {p.status.note && (
                    <span className="ml-auto font-inter text-[12px] font-medium text-white/45">{p.status.note}</span>
                  )}
                </div>
                <h3 className="font-sora text-[22px] font-normal text-white" style={{ letterSpacing: "-0.01em", marginBottom: 8 }}>
                  {p.name}
                </h3>
                <p className="font-inter text-[14px] font-light text-white/60" style={{ lineHeight: 1.6, marginBottom: 24 }}>
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
