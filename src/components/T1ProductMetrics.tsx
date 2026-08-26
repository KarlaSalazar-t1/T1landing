"use client";

import { useCountUp } from "@/hooks/useCountUp";

type Metric = { end: number; prefix?: string; suffix?: string; label: string };

function AnimatedMetric({ end, prefix, suffix, label }: Metric) {
  const { ref, display } = useCountUp({ end, duration: 1600, prefix, suffix });
  return (
    <div className="text-center" ref={ref}>
      <p className="font-sora text-[34px] font-light leading-none tracking-tight text-white tablet:text-[58px]">{display}</p>
      <p className="mt-4 font-inter text-[16px] font-normal text-white/70">{label}</p>
    </div>
  );
}

/**
 * T1ProductMetrics — banda de "Nuestros números" reutilizable para las
 * landings de producto. Mismo estilo que T1Metrics del home (count-up al
 * entrar en viewport, fondo negro con blobs de color).
 */
export default function T1ProductMetrics({ title = "Nuestros números", metrics }: { title?: string; metrics: Metric[] }) {
  return (
    <section className="relative overflow-hidden bg-black pb-[72px] pt-[72px] tablet:pb-[120px] tablet:pt-[110px]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute" style={{ top: "-30%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(219,59,43,0.1) 0%, transparent 55%)", filter: "blur(70px)" }} />
        <div className="absolute" style={{ bottom: "-20%", right: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 55%)", filter: "blur(60px)" }} />
        <div className="absolute" style={{ top: "20%", right: "-5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 55%)", filter: "blur(50px)" }} />
      </div>

      <div className="relative mx-auto max-w-[var(--max-w)] px-5 tablet:px-6">
        <h3 className="font-sora text-[28px] font-light text-white tablet:text-[32px]" style={{ textAlign: "center", letterSpacing: "-0.03em", marginBottom: 28 }}>
          {title}
        </h3>
        <div className="grid grid-cols-1 items-start gap-10 tablet:grid-cols-3 tablet:gap-16">
          {metrics.map((m) => (
            <AnimatedMetric key={m.label} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}
