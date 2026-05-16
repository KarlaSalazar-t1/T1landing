"use client";

import { useCountUp } from "@/hooks/useCountUp";

function AnimatedMetric({
  end,
  prefix,
  suffix,
  label,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const { ref, display } = useCountUp({
    end,
    // Use hook default (1200ms) — short, ease-out, no stagger between
    // the three metrics; they all kick off in the same frame.
    prefix,
    suffix,
  });

  return (
    <div className="text-center" ref={ref}>
      <p className="font-sora text-[40px] font-light leading-none tracking-tight text-white tablet:text-[72px]">
        {display}
      </p>
      <p className="mt-4 font-inter text-[16px] font-normal text-white">
        {label}
      </p>
    </div>
  );
}

export default function T1Metrics() {
  return (
    <>
      {/* Mobile-only warm→black bridge. Hides the moment Safari's URL bar
          toggles and exposes a sliver of black under the AI section. */}
      <div
        aria-hidden
        className="tablet:hidden"
        style={{
          height: 80,
          background: "linear-gradient(180deg, #FFF1EB 0%, #000 100%)",
        }}
      />
    <section className="relative overflow-hidden bg-black" style={{ paddingTop: 60, paddingBottom: 60 }}>
      {/* Color blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute" style={{ top: "-30%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(219,59,43,0.1) 0%, transparent 55%)", filter: "blur(70px)" }} />
        <div className="absolute" style={{ bottom: "-20%", right: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 55%)", filter: "blur(60px)" }} />
        <div className="absolute" style={{ top: "20%", right: "-5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 55%)", filter: "blur(50px)" }} />
      </div>

      <div className="relative mx-auto max-w-[var(--max-w)] px-5 tablet:px-6">
        <h3
          className="font-sora text-[24px] font-light text-white tablet:text-[32px]"
          style={{
            textAlign: "center",
            letterSpacing: "-0.03em",
            marginBottom: 40,
          }}
        >
          Nuestros números:
        </h3>

        <div className="grid grid-cols-1 items-start gap-10 tablet:grid-cols-3 tablet:gap-0">
          <AnimatedMetric end={25} prefix="+" suffix=" mil" label="Negocios" />
          <AnimatedMetric end={25} prefix="+$" suffix=" B" label="procesados en pagos" />
          <AnimatedMetric end={40} prefix="+" suffix=" M" label="de envíos gestionados" />
        </div>
      </div>
    </section>
    </>
  );
}
