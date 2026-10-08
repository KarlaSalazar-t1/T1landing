"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { useFSStackCards } from "@/hooks/useFSStackCards";
import T1FinalCTA from "@/components/T1FinalCTA";
import HeroBackground from "@/components/HeroBackground";

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
      {/* Línea suave — semana actual vs anterior (mismo estilo que el reporte de ventas) */}
      <svg key={i} viewBox="0 0 300 112" className="w-full" style={{ marginBottom: 12, animation: "fadeSlideIn 0.5s ease-out" }}>
        <defs>
          <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(229,72,77,0.22)" />
            <stop offset="100%" stopColor="rgba(229,72,77,0)" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((k) => (
          <line key={k} x1="0" x2="300" y1={8 + k * 30} y2={8 + k * 30} stroke="rgba(0,0,0,0.05)" strokeWidth="0.8" />
        ))}
        {(() => {
          const pts = (arr: number[]) => arr.map((v, k) => [Math.round((4 + (k / (arr.length - 1)) * 292) * 100) / 100, Math.round((98 - (v / 100) * 88) * 100) / 100] as [number, number]);
          const cur = smoothPath(pts(bars));
          const prev = smoothPath(pts(HERO_BARS[(i + 1) % HERO_BARS.length].map((v) => v * 0.82)));
          const last = pts(bars)[bars.length - 1];
          return (
            <>
              <path d={`${cur} L296,98 L4,98 Z`} fill="url(#heroArea)" />
              <path d={prev} fill="none" stroke="#3B7DD8" strokeWidth="1.1" strokeDasharray="3 3" strokeLinejoin="round" />
              <path d={cur} fill="none" stroke="#E5484D" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" pathLength={1} style={{ strokeDasharray: 1, animation: "reportDraw 1.1s ease-out both" }} />
              <circle cx={last[0]} cy={last[1]} r="3.5" fill="#fff" stroke="#E5484D" strokeWidth="2" />
            </>
          );
        })()}
        {["L", "M", "M", "J", "V", "S", "D"].map((d, k) => (
          <text key={k} x={4 + (k / 6) * 292} y="110" textAnchor={k === 0 ? "start" : k === 6 ? "end" : "middle"} style={{ fontSize: 7.5, fill: "rgba(0,0,0,0.45)", fontFamily: "Inter, sans-serif" }}>{d}</text>
        ))}
      </svg>
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

/* ── Floating metric badge — hace "zoom in" (abre) y "zoom out" (cierra)
   ciclando distintas métricas. ── */
const FLOAT_METRICS = [
  { label: "Ventas de la semana", chg: "+18%", type: "area", data: [42, 60, 50, 76, 58, 90, 72], pct: 0 },
  { label: "Conversión", chg: "+5%", type: "line", data: [30, 45, 40, 55, 62, 70, 80], pct: 0 },
  { label: "Ticket promedio", chg: "+12%", type: "line", data: [50, 48, 58, 54, 66, 72, 68], pct: 68 },
  { label: "Tráfico del día", chg: "+22%", type: "area", data: [20, 35, 48, 42, 60, 72, 88], pct: 0 },
];
function FloatMiniChart({ m }: { m: (typeof FLOAT_METRICS)[number] }) {
  const H = 64;
  if (m.type === "bars") {
    return (
      <div className="flex items-end gap-1.5" style={{ height: H }}>
        {m.data.map((h, idx) => (
          <span key={idx} className="flex-1 rounded-[2px]" style={{ height: `${h}%`, background: idx === m.data.length - 1 ? "#DB3B2B" : "rgba(219,59,43,0.3)" }} />
        ))}
      </div>
    );
  }
  if (m.type === "line" || m.type === "area") {
    const pts = m.data.map((h, idx) => `${(idx / (m.data.length - 1)) * 100},${30 - (h / 100) * 27}`);
    return (
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full" style={{ height: H }}>
        {m.type === "area" && <polygon fill="rgba(219,59,43,0.16)" points={`0,30 ${pts.join(" ")} 100,30`} />}
        <polyline fill="none" stroke="#DB3B2B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" points={pts.join(" ")} />
      </svg>
    );
  }
  // donut
  const r = 20, c = 2 * Math.PI * r, off = c * (1 - m.pct / 100);
  return (
    <div className="flex items-center justify-center" style={{ height: H }}>
      <svg width="64" height="64" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(219,59,43,0.16)" strokeWidth="5" />
        <circle cx="24" cy="24" r={r} fill="none" stroke="#DB3B2B" strokeWidth="5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} transform="rotate(-90 24 24)" />
        <text x="24" y="27.5" textAnchor="middle" style={{ fontSize: 11, fontWeight: 700, fill: "#111827" }}>{m.pct}%</text>
      </svg>
    </div>
  );
}
function FloatingMetric() {
  const i = useCycle(FLOAT_METRICS.length, 2800);
  const m = FLOAT_METRICS[i];
  return (
    <div
      key={i}
      className="absolute hidden tablet:block rounded-[16px]"
      style={{ ...(i % 2 === 0 ? { right: -30 } : { left: -30 }), bottom: 44, width: 176, padding: "15px 16px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.5)", boxShadow: "0 16px 40px rgba(0,0,0,0.22)", transformOrigin: "center", animation: "floatPop 2.8s ease-in-out" }}
    >
      <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
        <p className="font-sora text-[11px] font-semibold text-black">{m.label}</p>
        <span className="rounded-full bg-[rgba(34,197,94,0.14)] px-1.5 py-0.5 font-inter text-[9px] font-bold text-[#16A34A]">{m.chg}</span>
      </div>
      <FloatMiniChart m={m} />
    </div>
  );
}

/* ── Ventas: periodo actual vs comparativo (curvas suaves, como el reporte real) ── */
/* Curva suave (Catmull-Rom → Bézier) a partir de puntos [x, y]. */
function smoothPath(pts: [number, number][]) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let k = 0; k < pts.length - 1; k++) {
    const p0 = pts[k - 1] ?? pts[k], p1 = pts[k], p2 = pts[k + 1], p3 = pts[k + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}
const SALES_TABS = [
  {
    label: "Mis ventas", value: "$54,062.00", chg: "-2.5%", up: false, max: 6000, ticks: ["0", "1500", "3000", "4500", "6000"],
    actual: "$58,041.62", actualChg: "-3.91%", actualUp: false, comp: "$60,401.00",
    cur: [1400, 2200, 1700, 850, 1250, 1300, 2100, 1700, 2600, 0, 3700, 1550, 2400, 1850, 4700, 550, 1300, 800, 1050, 500, 1700, 2950, 300, 1500, 3500, 4000, 2600, 500, 5300, 1900],
    prev: [1200, 2050, 1050, 3100, 750, 2150, 2200, 2500, 1050, 2400, 1150, 3950, 400, 1000, 1200, 5000, 3700, 350, 2900, 2200, 2400, 2350, 2750, 2500, 1050, 1500, 400, 1200, 2200, 3500],
  },
  {
    label: "Unidades vendidas", value: "133", chg: "-9.52%", up: false, max: 12, ticks: ["0", "3", "6", "9", "12"],
    actual: "133", actualChg: "-9.52%", actualUp: false, comp: "147",
    cur: [3, 5, 4, 2, 3, 3, 5, 4, 6, 1, 8, 4, 5, 4, 10, 2, 3, 2, 3, 1, 4, 7, 1, 4, 8, 9, 6, 2, 11, 5],
    prev: [3, 5, 3, 7, 2, 5, 5, 6, 3, 6, 3, 9, 1, 3, 3, 11, 8, 1, 7, 5, 6, 5, 6, 6, 3, 4, 1, 3, 5, 8],
  },
  {
    label: "Ticket Promedio", value: "$406.48", chg: "+7.76%", up: true, max: 600, ticks: ["0", "150", "300", "450", "600"],
    actual: "$406.48", actualChg: "+7.76%", actualUp: true, comp: "$377.20",
    cur: [380, 420, 400, 360, 390, 410, 430, 400, 450, 330, 470, 390, 420, 410, 520, 350, 380, 360, 400, 340, 420, 480, 320, 400, 470, 500, 450, 360, 540, 430],
    prev: [360, 400, 350, 430, 340, 390, 400, 410, 360, 400, 350, 450, 300, 340, 360, 470, 440, 320, 420, 390, 400, 390, 410, 400, 350, 370, 310, 350, 380, 420],
  },
];
const X_LABELS = ["09 sep.", "13 sep.", "17 sep.", "21 sep.", "25 sep.", "29 sep.", "03 oct.", "08 oct."];

function LiveSalesPanel() {
  const i = useCycle(SALES_TABS.length, 3200);
  const t = SALES_TABS[i];
  // Área del gráfico dentro del viewBox
  const L = 34, R = 316, T = 8, B = 122;
  const toPts = (arr: number[]) => arr.map((v, k) => [Math.round((L + (k / (arr.length - 1)) * (R - L)) * 100) / 100, Math.round((B - (v / t.max) * (B - T)) * 100) / 100] as [number, number]);
  const cur = smoothPath(toPts(t.cur));
  const prev = smoothPath(toPts(t.prev));
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 20, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      {/* KPI tabs — la activa se resalta (blanca con sombra) */}
      <div className="grid grid-cols-3 gap-2" style={{ marginBottom: 14 }}>
        {SALES_TABS.map((k, idx) => {
          const on = idx === i;
          return (
            <div key={k.label} className="rounded-[10px] p-2.5 tablet:p-3" style={{ background: on ? "#FFFFFF" : "#F6F6F6", boxShadow: on ? "0 2px 10px rgba(0,0,0,0.10)" : "none", border: on ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent", transition: "all 0.4s ease" }}>
              <p className={`font-inter text-[9.5px] tablet:text-[10.5px] ${on ? "font-semibold text-black" : "text-black/50"}`}>{k.label}</p>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className={`font-inter text-[13px] font-medium tablet:text-[15px] ${on ? "text-black" : "text-black/70"}`} style={{ letterSpacing: "-0.01em" }}>{k.value}</span>
                <span className="rounded-full px-1.5 py-0.5 font-inter text-[8.5px] font-semibold" style={{ color: k.up ? "#16A34A" : "#E5484D", background: k.up ? "rgba(34,197,94,0.10)" : "rgba(229,72,77,0.10)" }}>{k.chg}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-t border-black/[0.07]" style={{ paddingTop: 12, marginBottom: 6 }}>
        <div className="flex items-end gap-6">
          <div>
            <p className="font-inter text-[10px] text-black/45">Período actual</p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="font-inter text-[17px] font-medium text-black/80" style={{ letterSpacing: "-0.01em" }}>{t.actual}</span>
              <span className="rounded-full px-1.5 py-0.5 font-inter text-[8.5px] font-semibold" style={{ color: t.actualUp ? "#16A34A" : "#E5484D", background: t.actualUp ? "rgba(34,197,94,0.10)" : "rgba(229,72,77,0.10)" }}>{t.actualChg}</span>
            </div>
          </div>
          <div>
            <p className="font-inter text-[10px] text-black/45">Periodo comparativo</p>
            <span className="mt-1 block font-inter text-[17px] font-medium text-black/80" style={{ letterSpacing: "-0.01em" }}>{t.comp}</span>
          </div>
        </div>
      </div>
      <svg key={i} viewBox="0 0 320 146" className="w-full" style={{ animation: "fadeSlideIn 0.5s ease-out" }}>
        {/* Rejilla + eje Y */}
        {t.ticks.map((tk, k) => {
          const y = B - (k / (t.ticks.length - 1)) * (B - T);
          return (
            <g key={tk}>
              <line x1={L} x2={R} y1={y} y2={y} stroke="rgba(0,0,0,0.05)" strokeWidth="0.6" />
              <text x={L - 4} y={y + 2.5} textAnchor="end" style={{ fontSize: 7, fill: "rgba(0,0,0,0.5)", fontFamily: "Inter, sans-serif" }}>{tk}</text>
            </g>
          );
        })}
        <line x1={L} x2={L} y1={T} y2={B} stroke="rgba(0,0,0,0.35)" strokeWidth="0.6" />
        <line x1={L} x2={R} y1={B} y2={B} stroke="rgba(0,0,0,0.35)" strokeWidth="0.6" />
        <defs><clipPath id="salesPlot"><rect x={L} y={0} width={R - L} height={B} /></clipPath></defs>
        <g clipPath="url(#salesPlot)">
          {/* Relleno suave bajo la curva actual */}
          <path d={`${cur} L${R},${B} L${L},${B} Z`} fill="rgba(229,72,77,0.05)" />
          <path d={prev} fill="none" stroke="#3B7DD8" strokeWidth="0.9" strokeLinejoin="round" />
          <path d={cur} fill="none" stroke="#E5636B" strokeWidth="1.5" strokeLinejoin="round" pathLength={1} style={{ strokeDasharray: 1, animation: "reportDraw 1.1s ease-out both" }} />
        </g>
        {X_LABELS.map((lb, k) => (
          <text key={lb} x={L + (k / (X_LABELS.length - 1)) * (R - L)} y={B + 11} textAnchor={k === 0 ? "start" : k === X_LABELS.length - 1 ? "end" : "middle"} style={{ fontSize: 6.5, fill: "rgba(0,0,0,0.5)", fontFamily: "Inter, sans-serif" }}>{lb}</text>
        ))}
      </svg>
      <div className="mt-1 flex items-center justify-center gap-5 font-inter text-[10px] text-black/70">
        <span className="flex items-center gap-1.5"><span className="h-[8px] w-[8px] rounded-full bg-[#E5636B]" />09 sep - 08 oct</span>
        <span className="flex items-center gap-1.5"><span className="h-[8px] w-[8px] rounded-full bg-[#3B7DD8]" />10 ago - 08 sep</span>
      </div>
    </div>
  );
}

/* ── Ventas por canal — pastel con etiquetas y líneas guía (como el reporte real) ── */
const CH_SLICES = [
  { ch: "Tienda en línea", color: "#111111", icon: null as string | null },
  { ch: "Shein", color: "#111111", icon: "/img/shein-iso.svg" },
  { ch: "Sears", color: "#E04355", icon: "/img/sears-isotipo.svg" },
  { ch: "Mercado Libre", color: "#F9E54E", icon: "/img/circles/ml.svg" },
  { ch: "Shopify", color: "#9FC54D", icon: "/img/shopify.svg" },
];
/* Periodos que van rotando — ventas y variación por canal (mismo orden que CH_SLICES) */
const CH_PERIODS = [
  { vals: [6274, 395, 17256, 31372, 2745], change: ["+12%", "+4%", "+18%", "+24%", "+6%"] },
  { vals: [8120, 540, 15480, 28960, 4310], change: ["+29%", "+37%", "-10%", "-8%", "+57%"] },
  { vals: [7140, 460, 20380, 26150, 3620], change: ["-12%", "-15%", "+32%", "-10%", "-16%"] },
];
const ROW_ORDER = [3, 2, 0, 4, 1]; // orden fijo de la tabla (evita que las filas salten)
const PIE_CX = 170, PIE_CY = 118, PIE_R = 78;
const polar = (deg: number, r: number): [number, number] => {
  const a = ((deg - 90) * Math.PI) / 180;
  // Redondeo: mismas cadenas en servidor y cliente (evita mismatch de hidratación)
  return [Math.round((PIE_CX + r * Math.cos(a)) * 100) / 100, Math.round((PIE_CY + r * Math.sin(a)) * 100) / 100];
};
function pieSlices(vals: number[]) {
  const total = vals.reduce((a, b) => a + b, 0);
  let before = 0;
  return CH_SLICES.map((s, idx) => {
    const pct = (vals[idx] / total) * 100;
    const start = before * 3.6, end = (before + pct) * 3.6;
    before += pct;
    const [x1, y1] = polar(start, PIE_R), [x2, y2] = polar(end, PIE_R);
    const d = `M${PIE_CX},${PIE_CY} L${x1},${y1} A${PIE_R},${PIE_R} 0 ${end - start > 180 ? 1 : 0} 1 ${x2},${y2} Z`;
    return { ...s, val: vals[idx], pct, d, mid: (start + end) / 2 };
  });
}

/* Interpola los valores hacia el periodo nuevo (el pastel y los montos se "mueven") */
function useTweened(target: number[], ms = 900) {
  const [vals, setVals] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    const from = fromRef.current;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      const e = 1 - Math.pow(1 - p, 3);
      const next = target.map((v, k) => from[k] + (v - from[k]) * e);
      fromRef.current = next;
      setVals(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return vals;
}

function ChannelComparePanel() {
  const i = useCycle(CH_PERIODS.length, 3400);
  const period = CH_PERIODS[i];
  const vals = useTweened(period.vals);
  const slices = pieSlices(vals);
  // Se resalta el canal que más creció en el periodo
  const best = period.change.reduce((bi, c, k, arr) => (parseFloat(c) > parseFloat(arr[bi]) ? k : bi), 0);
  return (
    <div className="relative order-2 overflow-hidden rounded-[18px] border border-black/[0.06] bg-white tablet:order-1" style={{ padding: 20, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
        <p className="font-sora text-[14px] font-medium text-black">Ventas por canal</p>
        <span className="rounded-full bg-black/[0.05] px-2 py-0.5 font-inter text-[10px] font-medium text-black/60">Últimos 30 días</span>
      </div>
      {/* Tabla por canal — montos y variación cambian con el periodo; se marca el canal que más creció */}
      {ROW_ORDER.map((idx) => {
        const c = slices[idx];
        const on = idx === best;
        const up = !period.change[idx].startsWith("-");
        return (
          <div key={c.ch} className="flex items-center gap-3 rounded-[8px] px-1.5 py-2" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)", background: on ? "rgba(0,0,0,0.03)" : "transparent", transition: "background 0.4s ease" }}>
            <span className="h-[10px] w-[10px] rounded-full" style={{ background: c.color, boxShadow: c.color === "#F9E54E" ? "inset 0 0 0 1px rgba(0,0,0,0.08)" : "none" }} />
            <span className="flex-1 font-inter text-[12px] text-black/70">{c.ch}</span>
            <span className="font-inter text-[12px] font-semibold tabular-nums text-black">${Math.round(c.val).toLocaleString("en-US")}</span>
            <span className="w-[40px] rounded-full px-1.5 py-0.5 text-center font-inter text-[9px] font-bold" style={{ color: up ? "#16A34A" : "#E5484D", background: up ? "rgba(34,197,94,0.10)" : "rgba(229,72,77,0.10)", transition: "all 0.4s ease" }}>{period.change[idx]}</span>
          </div>
        );
      })}
      <svg viewBox="-66 0 466 236" className="w-full" style={{ marginTop: 6 }}>
        {slices.map((s, idx) => {
          const [dx, dy] = polar(s.mid, idx === best ? 6 : 0).map((v, k) => v - (k === 0 ? PIE_CX : PIE_CY));
          return (
            <path key={s.ch} d={s.d} fill={s.color} stroke="#fff" strokeWidth="1.2" style={{ transform: `translate(${dx}px, ${dy}px)`, transition: `transform 0.5s ${EASE}` }} />
          );
        })}
        {/* Etiquetas con línea guía */}
        {slices.map((s) => {
          const [ax, ay] = polar(s.mid, PIE_R + 2);
          const [bx, by] = polar(s.mid, PIE_R + 16);
          const right = s.mid < 180;
          const ex = bx + (right ? 10 : -10);
          const label = `${s.ch}: ${s.pct.toFixed(2)}%`;
          const tx = ex + (right ? 4 : -4);
          const iconX = right ? tx : tx - label.length * 5.5 - 14;
          return (
            <g key={`l-${s.ch}`}>
              <polyline points={`${ax},${ay} ${bx},${by} ${ex},${by}`} fill="none" stroke={s.color === "#F9E54E" ? "#E3CC2A" : s.color} strokeWidth="0.8" />
              {s.icon ? (
                <image href={s.icon} x={iconX} y={by - 6} width="12" height="12" />
              ) : (
                <g transform={`translate(${iconX} ${by - 5})`}><rect width="10" height="10" rx="2" fill="#444" /><path d="M2 4h6M2.5 4v4h5V4M2 4l1-2h4l1 2" stroke="#fff" strokeWidth="0.8" fill="none" /></g>
              )}
              <text x={right ? tx + 14 : tx} y={by + 3} textAnchor={right ? "start" : "end"} style={{ fontSize: 10, fontWeight: 700, fill: "#111", fontFamily: "Inter, sans-serif" }}>{label}</text>
            </g>
          );
        })}
      </svg>
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
  // Carrusel "Toda tu operación, en el administrador" — flechas prev/next
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
      >
        <HeroBackground fade={false} />
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(219,59,43,0.15) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div className="relative z-10 mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-10 tablet:min-h-[420px] tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] tablet:gap-12">
            <div>
              <h1
                className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[60px]"
                style={{ lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 22 }}
              >
                Entiende tu{" "}
                <span className="relative inline-block">
                  negocio
                  
                </span>
              </h1>
              <p
                className="font-inter text-[16px] font-light text-white/65 tablet:text-[19px]"
                style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 460 }}
              >
                Consulta ventas, tráfico, productos y rendimiento por canal en reportes claros, actualizados y fáciles de exportar.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                  Comienza gratis
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

              {/* Floating metric badge — zoom in/out ciclando métricas */}
              <FloatingMetric />

              {/* Floating live badge (glass) */}
              <div className="absolute hidden tablet:flex items-center gap-2 rounded-full" style={{ right: -10, top: 40, padding: "8px 14px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.5)", boxShadow: "0 10px 28px rgba(0,0,0,0.18)" }}>
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
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              Más canales, menos claridad
            </h2>
          </div>
          <div data-modal-animate className="flex flex-wrap justify-center gap-5">
            {[
              { title: "Reportes separados", desc: "Cada canal muestra información distinta y cuesta juntarla.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#111827" strokeWidth="1.6" /><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#111827" strokeWidth="1.6" /><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#111827" strokeWidth="1.6" /><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#111827" strokeWidth="1.6" /></svg>) },
              { title: "Decisiones tarde", desc: "Te das cuenta de lo que pasó cuando el periodo ya cerró.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#111827" strokeWidth="1.6" /><path d="M12 7v5l3 2" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Poca claridad", desc: "Sabes cuánto vendiste, pero no siempre por qué subió o bajó.", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#111827" strokeWidth="1.6" /><path d="M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.7-2 2-2 3.5" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="17.5" r="0.6" fill="#111827" stroke="#111827" strokeWidth="0.8" /></svg>) },
            ].map((p, i) => (
              <div key={p.title} data-stagger className="w-full max-w-[280px] rounded-[18px] border border-black/[0.06] bg-white p-7 transition-shadow duration-200 hover:shadow-[0_0_25px_2px_rgba(0,0,0,0.04)] tablet:w-[280px]" style={{ ["--i" as string]: i }}>
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
        <div data-modal-animate className="mx-auto max-w-[1120px] text-center">
          <h2 className="font-sora text-[28px] font-light text-black tablet:whitespace-nowrap tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
            Todo lo importante, listo para revisar
          </h2>
          <p className="font-inter text-[16px] font-light text-black/60 lg:whitespace-nowrap tablet:text-[19px]" style={{ lineHeight: 1.5 }}>
            Ventas, pedidos, tráfico, conversión, ticket promedio y desempeño por canal desde el administrador.
          </p>
        </div>
      </section>

      {/* ── Stack cards ── */}
      <div ref={stackRootRef} className="fs-stack-card-container relative bg-white">
        {/* Block 1 — Ventas en vivo (text left, panel right) — bg white, no shadow */}
        <div className="fs-stack-card" style={{ top: 60, zIndex: 1, background: "#FFFFFF" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div className="order-2 tablet:order-1">
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 18 }}>
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
              {/* Panel — KPI cards + chart (primero en responsive) */}
              <div className="order-1 tablet:order-2">
                <LiveSalesPanel />
              </div>
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
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 18 }}>
                  Compara el desempeño de cada canal
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Revisa qué vende más y en qué canal para invertir mejor tu tiempo, inventario y promociones.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Ventas por canal.", "Productos más y menos vendidos.", "Ticket promedio por canal."].map((it) => (
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
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 18 }}>
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
          <div data-modal-animate className="mx-auto max-w-[820px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:whitespace-nowrap tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
              Lee tu operación en 3 pasos
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Conecta, revisa y compara para tomar mejores decisiones desde el primer día.
            </p>
          </div>
          <div data-modal-animate className="relative grid grid-cols-1 gap-5 tablet:grid-cols-3 lg:gap-6">
            <div aria-hidden className="pointer-events-none absolute hidden lg:block" style={{ left: "16.6%", right: "16.6%", top: 30, height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(219,59,43,0.25) 12%, rgba(219,59,43,0.25) 88%, transparent 100%)" }} />
            {[
              { n: "01", title: "Conecta tus canales", desc: "Tienda online, sucursales y marketplaces." },
              { n: "02", title: "Visualiza las métricas clave de tu negocio", desc: "Ventas, pedidos, tráfico, conversión y ticket promedio." },
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
              Comienza gratis
            </a>
          </div>
        </div>
      </section>

      {/* ── Toda tu operación — sección oscura + carrusel (como "Todo para administrar productos") ── */}
      <section className="relative px-5 py-24 tablet:px-10 tablet:py-32" style={{ background: "linear-gradient(180deg, #1A0A0A 0%, #000000 100%)" }}>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:whitespace-nowrap tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
              Toda tu operación en el administrador
            </h2>
            <p className="font-inter text-[16px] font-light text-white/55 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Métricas, comparativas y exportables listos desde el primer día.
            </p>
          </div>
          <div ref={opRef} data-modal-animate className="-mr-5 flex gap-5 overflow-x-auto pb-2 pr-5 pt-16 tablet:mr-0 tablet:justify-center tablet:pr-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {[
              { title: "Reportes listos para usar", desc: "Ventas, tráfico, productos, clientes y más, listos para usar.", img: "/img/predisenados-v2.png", w: 1719, h: 915 },
              { title: "Exportación a Excel/CSV", desc: "Descarga cualquier reporte en un clic para análisis externo.", img: "/img/excel-v2.png", w: 1497, h: 823 },
              { title: "Filtros y comparativas", desc: "Filtra por canal, periodo o categoría y compara contra el periodo que quieras.", img: "/img/filtros-v2.png", w: 1329, h: 717 },
            ].map((f, i) => (
              <div key={f.title} data-stagger style={{ ["--i" as string]: i }} className="op-card relative flex w-[80vw] max-w-[300px] shrink-0 snap-start flex-col rounded-[18px] border border-white/[0.08] bg-[#121214] px-6 pt-0 pb-6">
                {/* imagen que sobresale por arriba de la card */}
                <div className="relative mb-5" style={{ marginTop: -46 }}>
                  <Image src={f.img} alt={f.title} width={f.w} height={f.h} className="mx-auto block h-auto object-contain" style={{ width: "110%", filter: "drop-shadow(0 22px 34px rgba(0,0,0,0.5))" }} sizes="(max-width: 768px) 80vw, 300px" />
                </div>
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
              Conecta tus canales
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
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>Preguntas frecuentes</h2>
          </div>
          <div data-modal-animate className="flex flex-col gap-3">
            {[
              { q: "¿Qué reportes vienen incluidos?", a: "Ventas, tráfico, conversión, ticket promedio, productos más vendidos, comparativa por canal, antifraude y más, todos preconfigurados." },
              { q: "¿Los reportes se actualizan solos?", a: "Sí. Cada venta se refleja en tus reportes en tiempo real, sin que actualices nada." },
              { q: "¿Necesito conectar mis canales?", a: "Sí. Conectas tu tienda, sucursales y marketplaces una vez y T1 reúne todo en el administrador." },
              { q: "¿Se exporta a Excel?", a: "Cualquier reporte se descarga como Excel (.xlsx) o CSV con un clic." },
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
        description="Crea tu cuenta gratis y empieza a ver tu negocio claro desde el primer día."
        buttonLabel="Comienza ahora"
      />
    </div>
  );
}
