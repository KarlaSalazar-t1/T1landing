"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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

/* ── Animation helpers ── */
function useCycle(len: number, ms: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % len), ms);
    return () => clearInterval(id);
  }, [len, ms]);
  return i;
}

function AnimNumber({ value, prefix = "", className, style }: { value: number; prefix?: string; className?: string; style?: CSSProperties }) {
  const [disp, setDisp] = useState(0);
  const fromRef = useRef(0);
  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    const dur = 900;
    let raf = 0;
    let startT = 0;
    const tick = (t: number) => {
      if (!startT) startT = t;
      const p = Math.min(1, (t - startT) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisp(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <span className={className} style={style}>
      {prefix}
      {Math.round(disp).toLocaleString("en-US")}
    </span>
  );
}

const EASE = "cubic-bezier(0.22,1,0.36,1)";

/* ── Hero dashboard (animated) ── */
const HERO_BARS = [
  [35, 52, 28, 64, 48, 78, 90],
  [48, 40, 62, 45, 72, 58, 84],
  [30, 58, 44, 70, 52, 66, 95],
];
const HERO_TOTAL = [284920, 312540, 296180];
const HERO_PCT = ["↑ 24%", "↑ 31%", "↑ 18%"];
const HERO_CH_NAMES = ["Tienda online", "MercadoLibre", "Sucursales"];
const HERO_CH_VAL = [
  [136761, 79778, 68381],
  [158420, 92140, 61980],
  [144990, 85320, 65870],
];
const HERO_CH_PCT = [
  [48, 28, 24],
  [51, 30, 19],
  [49, 29, 22],
];

function HeroDashboard() {
  const i = useCycle(HERO_BARS.length, 2400);
  const bars = HERO_BARS[i];
  return (
    <div className="rounded-[14px] bg-white" style={{ padding: "20px 22px" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
        <div>
          <p className="font-inter text-[10px] text-black/45">Ventas · 7 días</p>
          <AnimNumber value={HERO_TOTAL[i]} prefix="$" className="font-sora text-[26px] font-light text-black" style={{ letterSpacing: "-0.025em", lineHeight: 1, display: "block" }} />
        </div>
        <span className="rounded-full bg-[rgba(34,197,94,0.12)] px-2.5 py-1 font-inter text-[11px] font-bold text-[#16A34A]" style={{ transition: "all 0.4s ease" }}>{HERO_PCT[i]}</span>
      </div>
      <div className="flex h-[80px] items-end gap-1.5" style={{ marginBottom: 12 }}>
        {bars.map((h, idx) => (
          <div key={idx} className="flex-1 rounded-t-[3px]" style={{ height: `${h}%`, background: idx === bars.length - 1 ? "#DB3B2B" : "rgba(219,59,43,0.18)", transition: `height 0.7s ${EASE}` }} />
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        {HERO_CH_NAMES.map((name, idx) => (
          <div key={name} className="flex items-center gap-2.5">
            <span className="font-inter text-[10px] text-black/65 w-[80px]">{name}</span>
            <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-black/[0.05]">
              <div className="h-full rounded-full bg-[#DB3B2B]" style={{ width: `${HERO_CH_PCT[i][idx]}%`, transition: `width 0.7s ${EASE}` }} />
            </div>
            <AnimNumber value={HERO_CH_VAL[i][idx]} prefix="$" className="font-inter text-[10px] font-semibold text-black w-[60px] text-right" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Live sales panel (animated) ── */
const LIVE_HOURLY = [
  [12, 18, 25, 32, 40, 55, 48, 62, 70, 58, 78, 85, 65, 50],
  [20, 28, 22, 44, 52, 48, 66, 58, 74, 82, 70, 90, 60, 55],
  [16, 22, 34, 28, 46, 60, 54, 70, 64, 78, 88, 76, 68, 58],
];
const LIVE_KPI = [
  [48250, 42, 1148],
  [51420, 45, 1142],
  [46980, 40, 1174],
];
const LIVE_KPI_CHG = [
  ["+12%", "+8%", "−3%"],
  ["+18%", "+11%", "−1%"],
  ["+9%", "+6%", "+2%"],
];
const LIVE_KPI_COLOR = [
  ["#16A34A", "#16A34A", "#DC2626"],
  ["#16A34A", "#16A34A", "#DC2626"],
  ["#16A34A", "#16A34A", "#16A34A"],
];
const LIVE_LABELS = ["Ventas", "Pedidos", "Ticket prom."];

function LiveSalesPanel() {
  const i = useCycle(LIVE_HOURLY.length, 2200);
  const hourly = LIVE_HOURLY[i];
  const kpi = LIVE_KPI[i];
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
        <p className="font-sora text-[14px] font-medium text-black">Resumen del día</p>
        <span className="flex items-center gap-1.5 rounded-full bg-[rgba(34,197,94,0.12)] px-2 py-0.5 font-inter text-[10px] font-bold text-[#16A34A]">
          <span className="h-[6px] w-[6px] rounded-full bg-[#16A34A]" style={{ animation: "pulse-soft 1.6s ease-in-out infinite" }} />
          En vivo
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2" style={{ marginBottom: 14 }}>
        {LIVE_LABELS.map((label, idx) => (
          <div key={label} className="rounded-[10px] bg-[#FAFAF9] p-3">
            <p className="font-inter text-[9px] text-black/45">{label}</p>
            <AnimNumber value={kpi[idx]} prefix={idx === 1 ? "" : "$"} className="font-sora text-[16px] font-light text-black" style={{ letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 2, display: "block" }} />
            <p className="font-inter text-[9px] font-bold" style={{ color: LIVE_KPI_COLOR[i][idx], transition: "color 0.4s ease" }}>{LIVE_KPI_CHG[i][idx]}</p>
          </div>
        ))}
      </div>
      <p className="font-inter text-[10px] font-semibold uppercase tracking-wider text-black/45" style={{ marginBottom: 8 }}>Por hora</p>
      <div className="flex h-[80px] items-end gap-1">
        {hourly.map((h, idx) => (
          <div key={idx} className="flex-1 rounded-t-[2px]" style={{ height: `${h}%`, background: idx >= 11 ? "rgba(219,59,43,0.30)" : "#DB3B2B", transition: `height 0.7s ${EASE}` }} />
        ))}
      </div>
      <div className="mt-1 flex justify-between font-inter text-[8px] text-black/40">
        <span>9am</span><span>12pm</span><span>3pm</span><span>6pm</span><span>10pm</span>
      </div>
    </div>
  );
}

/* ── Channel comparison panel (animated fill + change) ── */
const CH_DATA = [
  [
    { ch: "Tienda online", val: 136761, pct: 48, color: "#DB3B2B", change: "+24%" },
    { ch: "MercadoLibre", val: 79778, pct: 28, color: "#FFE600", change: "+18%" },
    { ch: "Amazon", val: 42165, pct: 15, color: "#FF9900", change: "+9%" },
    { ch: "Sucursales", val: 26216, pct: 9, color: "#22C55E", change: "+5%" },
  ],
  [
    { ch: "Tienda online", val: 158940, pct: 52, color: "#DB3B2B", change: "+29%" },
    { ch: "MercadoLibre", val: 84300, pct: 27, color: "#FFE600", change: "+21%" },
    { ch: "Amazon", val: 48720, pct: 14, color: "#FF9900", change: "+12%" },
    { ch: "Sucursales", val: 21040, pct: 7, color: "#22C55E", change: "+3%" },
  ],
  [
    { ch: "Tienda online", val: 147250, pct: 50, color: "#DB3B2B", change: "+26%" },
    { ch: "MercadoLibre", val: 88110, pct: 29, color: "#FFE600", change: "+19%" },
    { ch: "Amazon", val: 39980, pct: 13, color: "#FF9900", change: "+7%" },
    { ch: "Sucursales", val: 24360, pct: 8, color: "#22C55E", change: "+6%" },
  ],
];
const PIE_C = 2 * Math.PI * 48;

function ChannelComparePanel() {
  const [started, setStarted] = useState(false);
  const i = useCycle(CH_DATA.length, 2800);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 150);
    return () => clearTimeout(t);
  }, []);
  const rows = CH_DATA[i];
  let acc = 0;
  const segs = rows.map((r) => {
    const len = started ? (r.pct / 100) * PIE_C : 0;
    const seg = { len, offset: -acc };
    acc += len;
    return seg;
  });
  return (
    <div className="relative order-2 overflow-hidden rounded-[18px] border border-black/[0.06] bg-white tablet:order-1" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
        <p className="font-sora text-[14px] font-medium text-black">Desempeño por canal</p>
        <span className="rounded-full bg-black/[0.05] px-2 py-0.5 font-inter text-[10px] font-medium text-black/60">Últimos 30 días</span>
      </div>
      {rows.map((c) => (
        <div key={c.ch} className="flex items-center gap-3 py-2.5" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
          <span className="h-[10px] w-[10px] rounded-full" style={{ background: c.color }} />
          <span className="font-inter text-[12px] text-black/70 flex-1">{c.ch}</span>
          <AnimNumber value={c.val} prefix="$" className="font-inter text-[12px] font-semibold text-black" />
          <span className="rounded-full bg-[rgba(34,197,94,0.10)] px-1.5 py-0.5 font-inter text-[9px] font-bold text-[#16A34A]">{c.change}</span>
        </div>
      ))}
      <div className="flex items-center justify-center" style={{ marginTop: 16 }}>
        <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
          {rows.map((c, idx) => (
            <circle
              key={c.ch}
              cx="60"
              cy="60"
              r="48"
              fill="none"
              stroke={c.color}
              strokeWidth="14"
              strokeDasharray={`${segs[idx].len} ${PIE_C}`}
              strokeDashoffset={segs[idx].offset}
              style={{ transition: `stroke-dasharray 0.9s ${EASE}, stroke-dashoffset 0.9s ${EASE}` }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ── AI insights feed (rotating) ── */
const INSIGHTS = [
  { tag: "Oportunidad", tagColor: "#16A34A", tagBg: "rgba(34,197,94,0.10)", title: "Tus ventas suben 38% los viernes", desc: "Considera lanzar promociones específicas los viernes para maximizar el efecto." },
  { tag: "Alerta", tagColor: "#B45309", tagBg: "rgba(245,158,11,0.10)", title: "El producto TBC-042 baja 18% MoM", desc: "Revisa precio, stock o foto. Está perdiendo tracción vs el mes pasado." },
  { tag: "Tendencia", tagColor: "#8B5CF6", tagBg: "rgba(139,92,246,0.10)", title: "Marketplaces crecen 24%", desc: "MercadoLibre y Amazon están escalando. Aumenta inventario en estos canales." },
  { tag: "Oportunidad", tagColor: "#16A34A", tagBg: "rgba(34,197,94,0.10)", title: "Tu ticket promedio sube a $1,174", desc: "Los clientes compran más por orden. Prueba bundles para reforzar la tendencia." },
  { tag: "Alerta", tagColor: "#B45309", tagBg: "rgba(245,158,11,0.10)", title: "Carrito abandonado en 31%", desc: "El costo de envío aparece tarde en el checkout. Muéstralo antes para reducir fricción." },
  { tag: "Tendencia", tagColor: "#8B5CF6", tagBg: "rgba(139,92,246,0.10)", title: "Tus reseñas mejoran a 4.7★", desc: "La satisfacción sube este mes. Aprovecha para pedir más opiniones a tus clientes." },
];

function AIInsightsPanel() {
  const [start, setStart] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStart((s) => (s + 1) % INSIGHTS.length), 2600);
    return () => clearInterval(id);
  }, []);
  const visible = [0, 1, 2].map((k) => (start + k) % INSIGHTS.length);
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center gap-2" style={{ marginBottom: 16 }}>
        <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[rgba(139,92,246,0.12)]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 3L14 9L20 11L14 13L12 19L10 13L4 11L10 9L12 3Z" stroke="#8B5CF6" strokeWidth="1.6" strokeLinejoin="round" fill="rgba(139,92,246,0.15)" /></svg>
        </div>
        <p className="font-sora text-[14px] font-medium text-black">Insights de hoy</p>
      </div>
      <div className="flex flex-col gap-2.5">
        {visible.map((pi) => {
          const ins = INSIGHTS[pi];
          return (
            <div key={pi} className="rounded-[12px] border border-black/[0.06] bg-[#FAFAF9] px-3.5 py-3" style={{ animation: "fadeSlideIn 0.5s ease-out both" }}>
              <span className="inline-block rounded-full px-2 py-0.5 font-inter text-[9px] font-bold" style={{ background: ins.tagBg, color: ins.tagColor, marginBottom: 6 }}>{ins.tag}</span>
              <p className="font-inter text-[12px] font-semibold text-black" style={{ marginBottom: 3 }}>{ins.title}</p>
              <p className="font-inter text-[10px] text-black/55" style={{ lineHeight: 1.5 }}>{ins.desc}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-[10px] border border-black/[0.08] bg-white px-3 py-2.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3L14 9L20 11L14 13L12 19L10 13L4 11L10 9L12 3Z" stroke="#8B5CF6" strokeWidth="1.6" strokeLinejoin="round" fill="rgba(139,92,246,0.15)" /></svg>
        <span className="font-inter text-[11px] text-black/45 flex-1">Pregúntale a tu data...</span>
        <span className="rounded-full bg-[rgba(139,92,246,0.10)] px-2 py-0.5 font-inter text-[9px] font-bold text-[#8B5CF6]">IA</span>
      </div>
    </div>
  );
}

export default function T1Reportes() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stackRootRef = useRef<HTMLDivElement>(null);
  useFSStackCards(stackRootRef);
  // Carrusel "Toda tu operación, en un solo panel" — flechas prev/next
  const opRef = useRef<HTMLDivElement>(null);
  const scrollOp = (dir: number) => {
    const el = opRef.current;
    const card = el?.querySelector<HTMLElement>(".op-card");
    const step = card ? card.offsetWidth + 20 : (el?.clientWidth ?? 0) * 0.8;
    el?.scrollBy({ left: dir * step, behavior: "smooth" });
  };

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
          <div className="grid grid-cols-1 items-center gap-10 tablet:min-h-[420px] tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] tablet:gap-12">
            <div>
              <h1
                className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[60px]"
                style={{ lineHeight: 1.05, letterSpacing: "-1.7px", marginBottom: 22 }}
              >
                Entiende tu{" "}
                <span className="relative inline-block">
                  negocio
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.30)", borderRadius: 5, zIndex: -1 }} />
                </span>
                .
              </h1>
              <p
                className="font-inter text-[16px] font-light text-white/65 tablet:text-[19px]"
                style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 460 }}
              >
                Consulta ventas, tráfico, productos y rendimiento por canal en reportes claros, actualizados y fáciles de exportar.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                  Comenzar ahora
                </a>
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
                <HeroDashboard />
              </div>

              {/* Floating mini-chart badge */}
              <div className="absolute hidden tablet:block rounded-[14px] bg-white" style={{ left: -28, bottom: 40, width: 210, padding: "13px 15px", boxShadow: "0 14px 40px rgba(0,0,0,0.18)" }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                  <p className="font-sora text-[11px] font-semibold text-black">Ventas de la semana</p>
                  <span className="rounded-full bg-[rgba(34,197,94,0.12)] px-1.5 py-0.5 font-inter text-[9px] font-bold text-[#16A34A]">+18%</span>
                </div>
                <div className="flex items-end gap-1.5" style={{ height: 46 }}>
                  {[42, 60, 50, 76, 58, 90, 72].map((h, i) => (
                    <span key={i} className="flex-1 rounded-[2px]" style={{ height: `${h}%`, background: i === 5 ? "#DB3B2B" : "rgba(219,59,43,0.28)" }} />
                  ))}
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
      <section className="relative bg-white px-5 pt-16 pb-12 tablet:px-10 tablet:pt-20 tablet:pb-16" data-white-card>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="mx-auto text-center" style={{ marginBottom: 48, animation: "fadeSlideIn 0.6s ease-out both" }}>
            <h2 className="font-sora text-[26px] font-light text-black tablet:text-[34px] lg:text-[40px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>
              Más canales, datos más difíciles de leer.
            </h2>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
            {[
              { title: "Reportes separados", desc: "Cada canal muestra información distinta y cuesta juntarla.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#111827" strokeWidth="1.6" /><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#111827" strokeWidth="1.6" /><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#111827" strokeWidth="1.6" /><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#111827" strokeWidth="1.6" /></svg>) },
              { title: "Decisiones tarde", desc: "Te das cuenta de lo que pasó cuando el periodo ya cerró.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#111827" strokeWidth="1.6" /><path d="M12 7v5l3 2" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Poca claridad", desc: "Sabes cuánto vendiste, pero no siempre por qué subió o bajó.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#111827" strokeWidth="1.6" /><path d="M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.7-2 2-2 3.5" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="17.5" r="0.6" fill="#111827" stroke="#111827" strokeWidth="0.8" /></svg>) },
            ].map((p, i) => (
              <div key={p.title} data-stagger className="rounded-[18px] border border-black/[0.06] bg-white p-7 transition-shadow duration-200 hover:shadow-[0_0_25px_2px_rgba(0,0,0,0.04)]" style={{ ["--i" as string]: i }}>
                <div className="flex h-[40px] w-[40px] items-center justify-center" style={{ marginBottom: 16 }}>{p.icon}</div>
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
            Todo lo importante, listo para revisar.
          </h2>
          <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[19px]" style={{ lineHeight: 1.5 }}>
            Ventas, pedidos, tráfico, conversión, ticket promedio y desempeño por canal desde un solo panel.
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
                  Ventas en tiempo real
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Consulta ventas, pedidos, ticket promedio y comportamiento por hora sin esperar al cierre del día o del mes.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Ventas y pedidos por periodo.", "Comparativas por día, semana o mes.", "Tráfico y ticket promedio."].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Panel — KPI cards + chart */}
              <LiveSalesPanel />
            </div>
          </div>
        </div>

        {/* Block 2 — Comparativa por canal (panel left, text right) — bg #FBFBFB */}
        <div className="fs-stack-card" style={{ top: 80, zIndex: 2, background: "#FBFBFB" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              {/* Panel — channel comparison */}
              <ChannelComparePanel />

              <div className="order-1 tablet:order-2">
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Compara el desempeño de cada canal
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Revisa qué vende más y en qué canal para invertir mejor tu tiempo, inventario y promociones.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Ventas por canal.", "Productos top y baja rotación.", "Ticket promedio por canal."].map((it) => (
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

        {/* Block 3 — IA insights (oculto) */}
        {false && (
        <div className="fs-stack-card" style={{ top: 100, zIndex: 3, background: "#FFFFFF" }}>
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
              <AIInsightsPanel />
            </div>
          </div>
        </div>
        )}
      </div>

      {/* ── Cómo funciona ── */}
      <section className="relative bg-[#FBFBFB] px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Empieza a leer tu operación en 3 pasos
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Conecta, revisa y compara para tomar mejores decisiones desde el primer día.
            </p>
          </div>
          <div data-modal-animate className="relative grid grid-cols-1 gap-5 tablet:grid-cols-3 lg:gap-6">
            <div aria-hidden className="pointer-events-none absolute hidden lg:block" style={{ left: "16.6%", right: "16.6%", top: 30, height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(219,59,43,0.25) 12%, rgba(219,59,43,0.25) 88%, transparent 100%)" }} />
            {[
              { n: "01", title: "Conecta tus canales", desc: "Tienda online, sucursales y marketplaces." },
              { n: "02", title: "Revisa tus KPIs principales", desc: "Ventas, pedidos, tráfico, conversión y ticket promedio." },
              { n: "03", title: "Compara y toma decisiones", desc: "Filtra por canal, periodo, producto o categoría." },
            ].map((s, i) => (
              <div key={s.n} data-stagger className="tienda-card relative rounded-[18px] border border-black/[0.06] bg-white p-7" style={{ ["--i" as string]: i }}>
                <span className="font-sora text-[40px] font-light text-[#DB3B2B]" style={{ display: "block", marginTop: 28, marginBottom: 12, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.n}</span>
                <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 6 }}>{s.title}</h3>
                <p className="font-inter text-[13px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div data-modal-animate className="mt-12 flex justify-center">
            <a
              href={SIGNUP_URL}
              className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]"
            >
              Comenzar ahora
            </a>
          </div>
        </div>
      </section>

      {/* ── Toda tu operación — sección oscura + carrusel (como "Todo para administrar productos") ── */}
      <section className="relative px-5 py-24 tablet:px-10 tablet:py-32" style={{ background: "linear-gradient(180deg, #1A0A0A 0%, #000000 100%)" }}>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Toda tu operación, en un solo panel
            </h2>
            <p className="font-inter text-[16px] font-light text-white/55 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Métricas, comparativas y exportables listos desde el primer día.
            </p>
          </div>
          <div ref={opRef} data-modal-animate className="-mr-5 flex gap-5 overflow-x-auto pb-2 pr-5 tablet:mr-0 tablet:justify-center tablet:pr-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {[
              { title: "Dashboards prediseñados", desc: "Ventas, tráfico, productos, clientes y más, listos para usar.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="10" rx="1.5" stroke="#FF7363" strokeWidth="1.6" /><rect x="13" y="3" width="8" height="6" rx="1.5" stroke="#FF7363" strokeWidth="1.6" /><rect x="3" y="15" width="8" height="6" rx="1.5" stroke="#FF7363" strokeWidth="1.6" /><rect x="13" y="11" width="8" height="10" rx="1.5" stroke="#FF7363" strokeWidth="1.6" /></svg>) },
              { title: "Exportación a Excel/CSV", desc: "Descarga cualquier reporte en un click para análisis externo.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z M14 3v5h5" stroke="#FF7363" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 13l3 3 4-4" stroke="#FF7363" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Filtros y comparativas", desc: "Filtra por canal, periodo o categoría y compara contra el periodo que quieras.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 5h18l-7 8v6l-4-2v-4L3 5z" stroke="#FF7363" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
            ].map((f, i) => (
              <div key={f.title} data-stagger style={{ ["--i" as string]: i }} className="op-card flex w-[80vw] max-w-[300px] shrink-0 snap-start flex-col rounded-[18px] border border-white/[0.08] bg-[#121214] p-7">
                <div className="mb-5 flex h-[48px] w-[48px] items-center justify-center rounded-[13px] bg-[rgba(219,59,43,0.10)]">{f.icon}</div>
                <h3 className="font-sora text-[18px] font-normal text-white" style={{ marginBottom: 8 }}>{f.title}</h3>
                <p className="font-inter text-[14px] font-light text-white/55" style={{ lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
          {/* Flechas de navegación (solo móvil: en desktop las 3 cards ya caben) */}
          <div className="mt-7 flex items-center justify-center gap-3 tablet:hidden">
            <button type="button" onClick={() => scrollOp(-1)} aria-label="Anterior" className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 transition-colors hover:border-white/30 hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button type="button" onClick={() => scrollOp(1)} aria-label="Siguiente" className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 transition-colors hover:border-white/30 hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div data-modal-animate className="mt-12 flex justify-center">
            <a
              href={SIGNUP_URL}
              className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]"
            >
              Conectar mis canales
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats (oculto) ── */}
      {false && (
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
      )}

      {/* ── FAQ (fondo oscuro) ── */}
      <section className="relative bg-black px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[760px]">
          <div data-modal-animate className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[36px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>Preguntas frecuentes</h2>
          </div>
          <div data-modal-animate className="flex flex-col gap-3">
            {[
              { q: "¿Qué dashboards vienen incluidos?", a: "Ventas, tráfico, conversión, ticket promedio, productos top, comparativa por canal, antifraude y más, todos pre-configurados." },
              { q: "¿Puedo crear reportes personalizados?", a: "Sí. Editor drag & drop para construir tus propias vistas combinando KPIs y filtros." },
              { q: "¿Se exporta a Excel?", a: "Cualquier reporte se descarga como Excel (.xlsx) o CSV con un click." },
              { q: "¿Cómo funcionan las alertas?", a: "Configuras umbrales por KPI y recibes notificación por email o WhatsApp cuando se cruzan." },
              { q: "¿La IA realmente analiza mis datos?", a: "Sí. Detecta patrones, anomalías y oportunidades. También puedes preguntarle en lenguaje natural." },
            ].map((f, i) => (
              <details key={f.q} data-stagger className="group rounded-[14px] border border-white/[0.08] bg-white/[0.03] transition-all duration-200 open:border-[rgba(219,59,43,0.4)] open:bg-white/[0.05]" style={{ ["--i" as string]: i }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-sora text-[16px] font-normal text-white transition-colors duration-150 hover:text-[#FF6F5E]">
                  {f.q}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-white/40 transition-transform duration-300 group-open:rotate-180 group-open:text-[#FF6F5E]"><path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </summary>
                <p className="px-6 pb-5 font-inter text-[14px] font-light text-white/60" style={{ lineHeight: 1.65 }}>{f.a}</p>
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
