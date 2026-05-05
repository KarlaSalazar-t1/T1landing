"use client";

import { useEffect, useRef } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { useFSStackCards } from "@/hooks/useFSStackCards";
import T1FinalCTA from "@/components/T1FinalCTA";

function CountStat({ end, prefix = "", suffix = "", label, decimals = 0 }: { end: number; prefix?: string; suffix?: string; label: string; decimals?: number }) {
  const { ref, display } = useCountUp({ end, prefix, suffix, decimals, duration: 1800 });
  return (
    <div ref={ref}>
      <p className="font-sora text-[36px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1 }}>
        {display}
      </p>
      <p className="font-inter text-[12px] font-light text-white/55 tablet:text-[13px]">{label}</p>
    </div>
  );
}

export default function T1Reportes() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stackRootRef = useRef<HTMLDivElement>(null);
  useFSStackCards(stackRootRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("modal-visible");
        });
      },
      { root: null, threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    root.querySelectorAll("[data-modal-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="w-full">
      {/* ── Hero — text left, dashboard mock right ── */}
      <section
        className="relative overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-36 tablet:pb-24"
        style={{ background: "linear-gradient(135deg, #1A1212 0%, #261515 50%, #1A0A0A 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(219,59,43,0.15) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div className="relative mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] tablet:gap-12">
            <div>
              <h1
                className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[60px]"
                style={{ lineHeight: 1.05, letterSpacing: "-1.7px", marginBottom: 22 }}
              >
                Decide con{" "}
                <span className="relative inline-block">
                  datos reales
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.30)", borderRadius: 5, zIndex: -1 }} />
                </span>
                , no con suposiciones.
              </h1>
              <p
                className="font-inter text-[16px] font-light text-white/65 tablet:text-[19px]"
                style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}
              >
                Dashboards de ventas, tráfico y rendimiento por canal. Toda la operación de tu negocio en gráficas claras y exportables.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                  Comenzar ahora
                </a>
                <span className="font-inter text-[13px] text-white/50">Sin tarjeta · Empieza gratis</span>
              </div>
            </div>

            {/* Right — Dashboard glass mock */}
            <div className="relative">
              <div
                className="relative mx-auto rounded-[20px]"
                style={{
                  maxWidth: 480,
                  padding: 14,
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
                }}
              >
                <div className="rounded-[14px] bg-white" style={{ padding: "20px 22px" }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                    <div>
                      <p className="font-inter text-[10px] text-black/45">Ventas · 7 días</p>
                      <p className="font-sora text-[26px] font-light text-black" style={{ letterSpacing: "-0.025em", lineHeight: 1 }}>$284,920</p>
                    </div>
                    <span className="rounded-full bg-[rgba(34,197,94,0.12)] px-2.5 py-1 font-inter text-[11px] font-bold text-[#16A34A]">↑ 24%</span>
                  </div>
                  {/* Bar chart */}
                  <div className="flex h-[80px] items-end gap-1.5" style={{ marginBottom: 12 }}>
                    {[35, 52, 28, 64, 48, 78, 90].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-[3px]" style={{ height: `${h}%`, background: i === 6 ? "#DB3B2B" : "rgba(219,59,43,0.18)" }} />
                    ))}
                  </div>
                  {/* Channel breakdown */}
                  <div className="flex flex-col gap-1.5">
                    {[
                      { name: "Tienda online", pct: 48, val: "$136,761" },
                      { name: "MercadoLibre", pct: 28, val: "$79,778" },
                      { name: "Sucursales", pct: 24, val: "$68,381" },
                    ].map((c) => (
                      <div key={c.name} className="flex items-center gap-2.5">
                        <span className="font-inter text-[10px] text-black/65 w-[80px]">{c.name}</span>
                        <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-black/[0.05]">
                          <div className="h-full rounded-full bg-[#DB3B2B]" style={{ width: `${c.pct}%` }} />
                        </div>
                        <span className="font-inter text-[10px] font-semibold text-black w-[60px] text-right">{c.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating insight badge */}
              <div className="absolute hidden tablet:flex items-start gap-2.5 rounded-[14px] bg-white" style={{ left: -28, bottom: 40, width: 240, padding: "12px 14px", boxShadow: "0 14px 40px rgba(0,0,0,0.18)" }}>
                <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[rgba(139,92,246,0.12)]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 3L14 9L20 11L14 13L12 19L10 13L4 11L10 9L12 3Z" stroke="#8B5CF6" strokeWidth="1.6" strokeLinejoin="round" fill="rgba(139,92,246,0.15)" /></svg>
                </div>
                <div>
                  <p className="font-sora text-[11px] font-semibold text-black" style={{ marginBottom: 2 }}>Insight de IA</p>
                  <p className="font-inter text-[10px] text-black/55" style={{ lineHeight: 1.45 }}>Tus ventas suben 38% los viernes. Considera campañas para esos días.</p>
                </div>
              </div>

              {/* Floating live badge */}
              <div className="absolute hidden tablet:flex items-center gap-2 rounded-full bg-white" style={{ right: -10, top: 40, padding: "8px 14px", boxShadow: "0 10px 28px rgba(0,0,0,0.16)" }}>
                <span className="h-[8px] w-[8px] rounded-full bg-[#22C55E]" style={{ animation: "pulse-soft 2s ease-in-out infinite" }} />
                <span className="font-inter text-[11px] font-semibold text-black">Datos en vivo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Antes ── */}
      <section className="relative bg-[#F6F6F6] px-5 pt-16 pb-12 tablet:px-10 tablet:pt-20 tablet:pb-16" data-white-card>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[26px] font-light text-black tablet:text-[34px] lg:text-[40px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>
              Datos disponibles, decisiones <em className="not-italic text-black/40">en la oscuridad.</em>
            </h2>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
            {[
              { title: "Reportes a destiempo", desc: "Cierras el mes y descubres lo que pasó. Para cuando reaccionas, ya es tarde." },
              { title: "Datos por todos lados", desc: "Una pestaña para online, otra para POS, otra para marketplaces. Nada se cruza." },
              { title: "Sin contexto, sin acción", desc: "Tablas con números pero sin entender qué los explica ni qué hacer al respecto." },
            ].map((p, i) => (
              <div key={p.title} data-stagger className="rounded-[18px] border border-black/[0.06] bg-white p-7 transition-shadow duration-200 hover:shadow-[0_0_25px_2px_rgba(0,0,0,0.04)]" style={{ ["--i" as string]: i }}>
                <h3 className="font-sora text-[18px] font-normal text-black/70" style={{ marginBottom: 6 }}>{p.title}</h3>
                <p className="font-inter text-[14px] font-light text-black/50" style={{ lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stack cards intro ── */}
      <section className="relative bg-white px-5 pt-12 pb-8 tablet:px-10 tablet:pt-16 tablet:pb-10">
        <div data-modal-animate className="mx-auto max-w-[760px] text-center">
          <h2 className="font-sora text-[28px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.4px", lineHeight: 1.1, marginBottom: 16 }}>
            Tu negocio, en gráficas claras.
          </h2>
          <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[19px]" style={{ lineHeight: 1.5 }}>
            De los números crudos al insight accionable, sin Excel intermedio.
          </p>
        </div>
      </section>

      {/* ── Stack cards ── */}
      <div ref={stackRootRef} className="fs-stack-card-container relative bg-white">
        {/* Block 1 — Ventas en vivo (text left, panel right) — bg white, no shadow */}
        <div className="fs-stack-card" style={{ top: 60, zIndex: 1, background: "#FFFFFF" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Ventas en vivo, no al cierre del mes
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Monitorea tu operación en tiempo real. Cada venta, cada visita, cada conversión visible al instante.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Dashboard en tiempo real (no batch)", "Comparativas por día, semana, mes y año", "Métricas de tráfico, conversión y ticket promedio"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Panel — KPI cards + chart */}
              <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
                  <p className="font-sora text-[14px] font-medium text-black">Resumen del día</p>
                  <span className="rounded-full bg-[rgba(34,197,94,0.12)] px-2 py-0.5 font-inter text-[10px] font-bold text-[#16A34A]">En vivo</span>
                </div>
                <div className="grid grid-cols-3 gap-2" style={{ marginBottom: 14 }}>
                  {[
                    { label: "Ventas", value: "$48,250", change: "+12%", color: "#16A34A" },
                    { label: "Pedidos", value: "42", change: "+8%", color: "#16A34A" },
                    { label: "Ticket prom.", value: "$1,148", change: "−3%", color: "#DC2626" },
                  ].map((k) => (
                    <div key={k.label} className="rounded-[10px] bg-[#FAFAF9] p-3">
                      <p className="font-inter text-[9px] text-black/45">{k.label}</p>
                      <p className="font-sora text-[16px] font-light text-black" style={{ letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 2 }}>{k.value}</p>
                      <p className="font-inter text-[9px] font-bold" style={{ color: k.color }}>{k.change}</p>
                    </div>
                  ))}
                </div>
                {/* Hourly chart */}
                <p className="font-inter text-[10px] font-semibold uppercase tracking-wider text-black/45" style={{ marginBottom: 8 }}>Por hora</p>
                <div className="flex h-[80px] items-end gap-1">
                  {[12, 18, 25, 32, 40, 55, 48, 62, 70, 58, 78, 85, 65, 50].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-[2px]" style={{ height: `${h}%`, background: i >= 11 ? "rgba(219,59,43,0.30)" : "#DB3B2B" }} />
                  ))}
                </div>
                <div className="mt-1 flex justify-between font-inter text-[8px] text-black/40">
                  <span>9am</span><span>12pm</span><span>3pm</span><span>6pm</span><span>10pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Block 2 — Comparativa por canal (panel left, text right) — bg #F6F6F6 */}
        <div className="fs-stack-card" style={{ top: 80, zIndex: 2, background: "#F6F6F6", boxShadow: "0 -4px 30px rgba(0,0,0,0.18)" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              {/* Panel — channel comparison */}
              <div className="relative order-2 overflow-hidden rounded-[18px] border border-black/[0.06] bg-white tablet:order-1" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
                  <p className="font-sora text-[14px] font-medium text-black">Desempeño por canal</p>
                  <span className="rounded-full bg-black/[0.05] px-2 py-0.5 font-inter text-[10px] font-medium text-black/60">Últimos 30 días</span>
                </div>
                {[
                  { ch: "Tienda online", val: "$136,761", pct: 48, color: "#DB3B2B", change: "+24%" },
                  { ch: "MercadoLibre", val: "$79,778", pct: 28, color: "#FFE600", txt: "#1A1A1A", change: "+18%" },
                  { ch: "Amazon", val: "$42,165", pct: 15, color: "#FF9900", change: "+9%" },
                  { ch: "Sucursales", val: "$26,216", pct: 9, color: "#22C55E", change: "+5%" },
                ].map((c) => (
                  <div key={c.ch} className="flex items-center gap-3 py-2.5" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                    <span className="h-[10px] w-[10px] rounded-full" style={{ background: c.color }} />
                    <span className="font-inter text-[12px] text-black/70 flex-1">{c.ch}</span>
                    <span className="font-inter text-[12px] font-semibold text-black">{c.val}</span>
                    <span className="rounded-full bg-[rgba(34,197,94,0.10)] px-1.5 py-0.5 font-inter text-[9px] font-bold text-[#16A34A]">{c.change}</span>
                  </div>
                ))}
                {/* Pie chart visual */}
                <div className="mt-4 flex items-center justify-center" style={{ marginTop: 16 }}>
                  <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
                    <circle cx="60" cy="60" r="48" fill="none" stroke="#DB3B2B" strokeWidth="14" strokeDasharray="144.8 301.6" />
                    <circle cx="60" cy="60" r="48" fill="none" stroke="#FFE600" strokeWidth="14" strokeDasharray="84.5 301.6" strokeDashoffset="-144.8" />
                    <circle cx="60" cy="60" r="48" fill="none" stroke="#FF9900" strokeWidth="14" strokeDasharray="45.2 301.6" strokeDashoffset="-229.3" />
                    <circle cx="60" cy="60" r="48" fill="none" stroke="#22C55E" strokeWidth="14" strokeDasharray="27.1 301.6" strokeDashoffset="-274.5" />
                  </svg>
                </div>
              </div>

              <div className="order-1 tablet:order-2">
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Compara canales y descubre dónde crecer
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Mira qué canal vende más, qué producto rota mejor por marketplace y dónde está tu mejor margen.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Comparativa por canal, marketplace o sucursal", "Productos top y de baja rotación", "Análisis de margen por canal"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Block 3 — IA insights (text left, panel right) — bg white */}
        <div className="fs-stack-card" style={{ top: 100, zIndex: 3, background: "#FFFFFF", boxShadow: "0 -4px 30px rgba(0,0,0,0.18)" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Insights de IA, no solo gráficas
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  La IA lee tus datos, identifica patrones y te sugiere acciones concretas. Decisiones más rápidas, menos análisis manual.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Detecta tendencias y anomalías automáticamente", "Pregúntale en lenguaje natural y obtén la respuesta", "Recomendaciones de acción priorizadas"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Panel — AI insights feed */}
              <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
                <div className="flex items-center gap-2" style={{ marginBottom: 16 }}>
                  <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[rgba(139,92,246,0.12)]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 3L14 9L20 11L14 13L12 19L10 13L4 11L10 9L12 3Z" stroke="#8B5CF6" strokeWidth="1.6" strokeLinejoin="round" fill="rgba(139,92,246,0.15)" /></svg>
                  </div>
                  <p className="font-sora text-[14px] font-medium text-black">Insights de hoy</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  {[
                    {
                      tag: "Oportunidad",
                      tagColor: "#16A34A",
                      tagBg: "rgba(34,197,94,0.10)",
                      title: "Tus ventas suben 38% los viernes",
                      desc: "Considera lanzar promociones específicas los viernes para maximizar el efecto.",
                    },
                    {
                      tag: "Alerta",
                      tagColor: "#B45309",
                      tagBg: "rgba(245,158,11,0.10)",
                      title: "El producto TBC-042 baja 18% MoM",
                      desc: "Revisa precio, stock o foto. Está perdiendo tracción vs el mes pasado.",
                    },
                    {
                      tag: "Tendencia",
                      tagColor: "#8B5CF6",
                      tagBg: "rgba(139,92,246,0.10)",
                      title: "Marketplaces crecen 24%",
                      desc: "MercadoLibre y Amazon están escalando. Aumenta inventario en estos canales.",
                    },
                  ].map((ins) => (
                    <div key={ins.title} className="rounded-[12px] border border-black/[0.06] bg-[#FAFAF9] px-3.5 py-3">
                      <span className="inline-block rounded-full px-2 py-0.5 font-inter text-[9px] font-bold" style={{ background: ins.tagBg, color: ins.tagColor, marginBottom: 6 }}>{ins.tag}</span>
                      <p className="font-inter text-[12px] font-semibold text-black" style={{ marginBottom: 3 }}>{ins.title}</p>
                      <p className="font-inter text-[10px] text-black/55" style={{ lineHeight: 1.5 }}>{ins.desc}</p>
                    </div>
                  ))}
                </div>
                {/* Ask in natural language */}
                <div className="mt-3 flex items-center gap-2 rounded-[10px] border border-black/[0.08] bg-white px-3 py-2.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3L14 9L20 11L14 13L12 19L10 13L4 11L10 9L12 3Z" stroke="#8B5CF6" strokeWidth="1.6" strokeLinejoin="round" fill="rgba(139,92,246,0.15)" /></svg>
                  <span className="font-inter text-[11px] text-black/45 flex-1">Pregúntale a tu data...</span>
                  <span className="rounded-full bg-[rgba(139,92,246,0.10)] px-2 py-0.5 font-inter text-[9px] font-bold text-[#8B5CF6]">IA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cómo funciona ── */}
      <section className="relative bg-[#F6F6F6] px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              De los datos a la decisión, sin escalas
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Cuatro pasos para que tus reportes sean útiles desde el primer día.
            </p>
          </div>
          <div data-modal-animate className="relative grid grid-cols-1 gap-5 tablet:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div aria-hidden className="pointer-events-none absolute hidden lg:block" style={{ left: "12.5%", right: "12.5%", top: 30, height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(219,59,43,0.25) 12%, rgba(219,59,43,0.25) 88%, transparent 100%)" }} />
            {[
              { n: "01", title: "Conecta tus canales", desc: "Tienda online, sucursales y marketplaces se sincronizan al instante." },
              { n: "02", title: "Visualiza en tiempo real", desc: "Dashboards listos con KPIs clave: ventas, tráfico, conversión, ticket." },
              { n: "03", title: "Compara y filtra", desc: "Cruza canales, periodos y categorías. Encuentra qué funciona y qué no." },
              { n: "04", title: "Actúa con IA", desc: "Insights priorizados con sugerencias accionables para crecer más rápido." },
            ].map((s, i) => (
              <div key={s.n} data-stagger className="tienda-card relative rounded-[18px] border border-black/[0.06] bg-white p-7" style={{ ["--i" as string]: i }}>
                <span aria-hidden className="step-dot absolute hidden h-[10px] w-[10px] rounded-full bg-[#DB3B2B] lg:block" style={{ left: 28, top: 25, boxShadow: "0 0 0 6px rgba(219,59,43,0.12)" }} />
                <span className="font-sora text-[40px] font-light text-[#DB3B2B]" style={{ display: "block", marginTop: 28, marginBottom: 12, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.n}</span>
                <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 6 }}>{s.title}</h3>
                <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lo que incluye ── */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Toda tu operación, en un solo panel
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Métricas, comparativas y exportables listos desde el primer día.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {[
              { title: "Dashboards prediseñados", desc: "Ventas, tráfico, productos, clientes y más, listos para usar.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="10" rx="1.5" stroke="#DB3B2B" strokeWidth="1.6" /><rect x="13" y="3" width="8" height="6" rx="1.5" stroke="#DB3B2B" strokeWidth="1.6" /><rect x="3" y="15" width="8" height="6" rx="1.5" stroke="#DB3B2B" strokeWidth="1.6" /><rect x="13" y="11" width="8" height="10" rx="1.5" stroke="#DB3B2B" strokeWidth="1.6" /></svg>) },
              { title: "Exportación a Excel/CSV", desc: "Descarga cualquier reporte en un click para análisis externo.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z M14 3v5h5" stroke="#DB3B2B" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 13l3 3 4-4" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Reportes programados", desc: "Recíbelos en tu email diario, semanal o mensual sin abrir nada.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#DB3B2B" strokeWidth="1.6" /><path d="M12 7v5l3 2" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Alertas configurables", desc: "Notificaciones cuando un KPI cae o sube fuera del rango.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M13.7 21a2 2 0 0 1-3.4 0" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Reportes personalizados", desc: "Crea tus propias vistas con drag & drop. Comparte con tu equipo.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M11 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6 M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "API y BI integrations", desc: "Conecta a Power BI, Looker o tu propio sistema vía API.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M16 18l6-6-6-6 M8 6l-6 6 6 6" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
            ].map((f, i) => (
              <div key={f.title} data-stagger className="tienda-card flex items-start gap-4 rounded-[16px] border border-black/[0.06] bg-white p-6" style={{ ["--i" as string]: i }}>
                <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[12px]" style={{ background: "rgba(219,59,43,0.08)" }}>{f.icon}</div>
                <div>
                  <h3 className="font-sora text-[16px] font-normal text-black" style={{ marginBottom: 4 }}>{f.title}</h3>
                  <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative px-5 py-20 tablet:px-10 tablet:py-24" style={{ background: "linear-gradient(135deg, #1A0A0A 0%, #261515 50%, #1A0A0A 100%)" }}>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[640px] text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[24px] font-light text-white tablet:text-[34px]" style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Más datos, mejores decisiones.
            </h2>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-10 text-center tablet:grid-cols-3">
            <div data-stagger style={{ ["--i" as string]: 0 }}><CountStat end={40} prefix="+" label="KPIs prediseñados al instante" /></div>
            <div data-stagger style={{ ["--i" as string]: 1 }}>
              <p className="font-sora text-[36px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1 }}>&lt; 1s</p>
              <p className="font-inter text-[12px] font-light text-white/55 tablet:text-[13px]">para refrescar dashboards</p>
            </div>
            <div data-stagger style={{ ["--i" as string]: 2 }}>
              <p className="font-sora text-[36px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1 }}>24/7</p>
              <p className="font-inter text-[12px] font-light text-white/55 tablet:text-[13px]">soporte en español</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative bg-[#F6F6F6] px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[760px]">
          <div data-modal-animate className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>Preguntas frecuentes</h2>
          </div>
          <div data-modal-animate className="flex flex-col gap-3">
            {[
              { q: "¿Qué dashboards vienen incluidos?", a: "Ventas, tráfico, conversión, ticket promedio, productos top, comparativa por canal, antifraude y más, todos pre-configurados." },
              { q: "¿Puedo crear reportes personalizados?", a: "Sí. Editor drag & drop para construir tus propias vistas combinando KPIs y filtros." },
              { q: "¿Se exporta a Excel?", a: "Cualquier reporte se descarga como Excel (.xlsx) o CSV con un click." },
              { q: "¿Cómo funcionan las alertas?", a: "Configuras umbrales por KPI y recibes notificación por email o WhatsApp cuando se cruzan." },
              { q: "¿La IA realmente analiza mis datos?", a: "Sí. Detecta patrones, anomalías y oportunidades. También puedes preguntarle en lenguaje natural." },
            ].map((f, i) => (
              <details key={f.q} data-stagger className="group rounded-[14px] border border-black/[0.06] bg-white transition-all duration-200 open:border-[rgba(219,59,43,0.2)] open:shadow-[0_4px_18px_rgba(0,0,0,0.05)]" style={{ ["--i" as string]: i }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-sora text-[16px] font-normal text-black transition-colors duration-150 hover:text-[#DB3B2B]">
                  {f.q}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-black/40 transition-transform duration-300 group-open:rotate-180 group-open:text-[#DB3B2B]"><path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </summary>
                <p className="px-6 pb-5 font-inter text-[14px] font-light text-black/65" style={{ lineHeight: 1.65 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <T1FinalCTA
        title="¿Listo para decidir con datos?"
        description="Conecta tus canales y empieza a ver tu negocio claro desde el primer día."
      />
    </div>
  );
}
