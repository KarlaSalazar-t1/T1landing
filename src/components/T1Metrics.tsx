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
    // Roll-up estilo boardy.ai: arranca en 0 al entrar en viewport y sube con
    // easeOutCubic (~1.5s) — ágil, sin sentirse lento.
    duration: 1500,
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
      {/* Mobile-only black bridge that absorbs any sliver of space
          exposed when Safari's URL bar toggles between AI and Metrics.
          Trimmed because 80px on top of the section's 60px padding made
          the metrics feel pushed down and off-centre. */}
      <div aria-hidden className="tablet:hidden bg-black" style={{ height: 32 }} />
    <section className="relative overflow-hidden bg-black pb-[120px] pt-[20px]">
      {/* Color blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute" style={{ top: "-30%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(219,59,43,0.1) 0%, transparent 55%)", filter: "blur(70px)" }} />
        <div className="absolute" style={{ bottom: "-20%", right: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 55%)", filter: "blur(60px)" }} />
        <div className="absolute" style={{ top: "20%", right: "-5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 55%)", filter: "blur(50px)" }} />
      </div>

      <div className="relative mx-auto max-w-[var(--max-w)] px-5 tablet:px-6">
        <h3
          className="font-sora text-[32px] font-light text-white tablet:text-[44px]"
          style={{
            textAlign: "center",
            letterSpacing: "-0.03em",
            marginBottom: 28,
          }}
        >
          Nuestros números
        </h3>

        <div className="grid grid-cols-1 items-start gap-10 tablet:grid-cols-3 tablet:gap-16">
          <AnimatedMetric end={25000} prefix="+" suffix="" label="negocios usando T1" />
          <AnimatedMetric end={40} prefix="+" suffix="M" label="envíos entregados" />
          <AnimatedMetric end={200} prefix="+" suffix="M" label="transacciones procesadas" />
        </div>
      </div>
    </section>
    </>
  );
}
