"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import T1FinalCTA from "@/components/T1FinalCTA";

const MANROPE = "var(--font-manrope-var), 'Manrope', sans-serif";


/* Número que cuenta de 0 a su valor (easeOutCubic) */
function CountUp({ end, prefix = "", suffix = "", decimals = 0 }: { end: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const STEPS = 42;
    let i = 0;
    const id = setInterval(() => {
      i++;
      const p = i / STEPS;
      const eased = 1 - Math.pow(1 - p, 3);
      setV(end * eased);
      if (i >= STEPS) {
        setV(end);
        clearInterval(id);
      }
    }, 32);
    return () => clearInterval(id);
  }, [end]);
  const num = decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US");
  return <>{prefix}{num}{suffix}</>;
}

/* Envíos por estado — barras horizontales que crecen de izquierda a derecha (loop suave) */
function EstadoBars() {
  const STATES = [
    { name: "Ciudad de México", pct: 54.74, color: "#DB3B2B" },
    { name: "Estado de México", pct: 35.47, color: "#E2685C" },
    { name: "Veracruz", pct: 4.28, color: "#EE9A90" },
    { name: "Querétaro", pct: 3.36, color: "#F2B5AD" },
    { name: "Nuevo León", pct: 0.92, color: "#F6CFCA" },
  ];
  const MAX = 54.74;
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <p className="text-[11px] font-medium text-black/55" style={{ marginBottom: 12 }}>Envíos por estado</p>
      <div className="flex flex-col gap-2.5">
        {STATES.map((s, i) => (
          <div key={s.name} className="flex items-center gap-3">
            <span className="w-[96px] shrink-0 truncate text-right text-[11px] text-black/70">{s.name}</span>
            <div className="relative h-[10px] flex-1 overflow-hidden rounded-full bg-black/[0.05]">
              <div
                className="h-full rounded-full"
                style={{
                  width: on ? `${(s.pct / MAX) * 100}%` : "0%",
                  background: s.color,
                  transition: "width 1.5s cubic-bezier(0.33,1,0.68,1)",
                  transitionDelay: `${i * 0.12}s`,
                }}
              />
            </div>
            <span className="w-[50px] shrink-0 text-right text-[11px] font-semibold text-black/75">{s.pct.toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </>
  );
}

/* Card con barras horizontales que crecen de izquierda a derecha (loop suave) */
function HBarsCard({ title, items }: { title: string; items: { name: string; pct: number }[] }) {
  const MAX = Math.max(...items.map((i) => i.pct));
  const COLORS = ["#C0291B", "#DB3B2B", "#E2685C", "#EE9A90", "#F4C2BB", "#F8D7D2"];
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 250);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 20, boxShadow: "0 16px 50px rgba(0,0,0,0.08)", fontFamily: MANROPE }}>
      <p className="text-[14px] font-bold text-black" style={{ marginBottom: 14 }}>{title}</p>
      <div className="flex flex-col gap-2.5 overflow-y-auto pr-1" style={{ maxHeight: 150 }}>
        {items.map((it, i) => (
          <div key={it.name} className="flex items-center gap-3">
            <span className="w-[92px] shrink-0 truncate text-right text-[11px] text-black/70">{it.name}</span>
            <div className="relative h-[9px] flex-1 overflow-hidden rounded-full bg-black/[0.05]">
              <div
                className="h-full rounded-full"
                style={{
                  width: on ? `${(it.pct / MAX) * 100}%` : "0%",
                  background: COLORS[Math.min(i, COLORS.length - 1)],
                  transition: "width 1.4s cubic-bezier(0.33,1,0.68,1)",
                  transitionDelay: `${i * 0.1}s`,
                }}
              />
            </div>
            <span className="w-[54px] shrink-0 text-right text-[11px] font-semibold text-black/75">{it.pct.toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Donut "Estado de envíos" + leyenda (entrada ligera) */
type DonutItem = { name: string; count: number; pct: number; color: string };
function DonutChart({ data }: { data: DonutItem[] }) {
  const r = 56;
  const C = 2 * Math.PI * r;
  let acc = 0;
  const slices = data
    .filter((d) => d.pct > 0)
    .map((d) => {
      const dash = (d.pct / 100) * C;
      const seg = { color: d.color, dash, offset: -((acc / 100) * C) };
      acc += d.pct;
      return seg;
    });

  return (
    <div className="flex flex-col items-center gap-7 tablet:flex-row" style={{ fontFamily: MANROPE }}>
      <svg className="donut-in shrink-0" width="150" height="150" viewBox="0 0 150 150">
        <circle cx="75" cy="75" r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="18" />
        <g transform="rotate(-90 75 75)">
          {slices.map((s, i) => (
            <circle key={i} cx="75" cy="75" r={r} fill="none" stroke={s.color} strokeWidth="18" strokeDasharray={`${s.dash} ${C - s.dash}`} strokeDashoffset={s.offset} />
          ))}
        </g>
      </svg>
      <div className="grid w-full grid-cols-2 gap-x-6 gap-y-3.5">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-2" style={{ animation: "rastreoReveal 0.45s ease both", animationDelay: `${0.15 + i * 0.06}s` }}>
            <span className="h-[10px] w-[10px] shrink-0 rounded-full" style={{ background: d.color }} />
            <span className="min-w-0 flex-1 truncate text-[12px] text-black/70">{d.name}</span>
            <span className="text-[12px] font-semibold text-black/80">{d.count}</span>
            <span className="w-[48px] text-right text-[12px] text-black/45">{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Donut "Estado de envíos" — versión responsive (leyenda vertical) */
function DonutChartResponsive({ className = "" }: { className?: string }) {
  const DATA = [
    { name: "Guía generada", pct: 23, count: 23, color: "#7CE0B4" },
    { name: "Por recolectar", pct: 18, count: 18, color: "#EA6A2B" },
    { name: "Recolectado", pct: 21, count: 21, color: "#DDB85F" },
    { name: "En camino", pct: 17, count: 17, color: "#5A81E6" },
    { name: "Entregado", pct: 5, count: 5, color: "#3BA152" },
    { name: "Incidencia", pct: 16, count: 16, color: "#E85C6B" },
  ];
  const r = 68;
  const C = 2 * Math.PI * r;
  let acc = 0;
  const slices = DATA.filter((d) => d.pct > 0).map((d) => {
    const dash = (d.pct / 100) * C;
    const seg = { color: d.color, dash, offset: -((acc / 100) * C) };
    acc += d.pct;
    return seg;
  });

  return (
    <div className={className} style={{ fontFamily: MANROPE }}>
      <div className="flex justify-center" style={{ marginBottom: 24 }}>
        <svg className="donut-in" width="210" height="210" viewBox="0 0 180 180">
          <circle cx="90" cy="90" r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="22" />
          <g transform="rotate(-90 90 90)">
            {slices.map((s, i) => (
              <circle key={i} cx="90" cy="90" r={r} fill="none" stroke={s.color} strokeWidth="22" strokeDasharray={`${s.dash} ${C - s.dash}`} strokeDashoffset={s.offset} />
            ))}
          </g>
        </svg>
      </div>
      <div className="flex flex-col">
        {DATA.map((d, i) => (
          <div key={d.name} className="flex items-center gap-3" style={{ paddingTop: 11, paddingBottom: 11, animation: "rastreoReveal 0.45s ease both", animationDelay: `${0.15 + i * 0.06}s` }}>
            <span className="h-[14px] w-[14px] shrink-0 rounded-full" style={{ background: d.color }} />
            <span className="min-w-0 flex-1 text-[16px] text-black/75">{d.name}</span>
            <span className="w-[60px] text-right text-[16px] text-black/70">{d.pct}%</span>
            <span className="w-[40px] text-right text-[16px] font-medium text-black/85">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Tabla "Últimos envíos" (scrolleable) */
function EnviosList() {
  const cols = "0.7fr 1.5fr 1.1fr 1fr";
  const ROWS = [
    { brand: "dhl", guia: "3316457756" },
    { brand: "dhl", guia: "3316457362" },
    { brand: "dhl", guia: "3316457336" },
    { brand: "dhl", guia: "3316457222" },
    { brand: "fedex", guia: "873588472878" },
    { brand: "estafeta", guia: "552309817745" },
    { brand: "paquetexpress", guia: "884512309776" },
    { brand: "ups", guia: "1Z117W7K0421" },
    { brand: "99min", guia: "99M2230981770" },
  ];
  return (
    <div style={{ fontFamily: MANROPE }}>
      <p className="text-[14px] font-bold text-black" style={{ marginBottom: 14 }}>Últimos 20 envíos</p>
      <div className="grid gap-2 px-2 pb-2" style={{ gridTemplateColumns: cols }}>
        <span className="text-[11px] font-medium text-black/50">Paquetería</span>
        <span className="text-[11px] font-medium text-black/50">N.º de guía</span>
        <span className="text-[11px] font-medium text-black/50">Fecha de envío</span>
        <span className="text-right text-[11px] font-medium text-black/50">Estado</span>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: 264 }}>
        {ROWS.map((r, i) => (
          <div key={i} className="grid items-center gap-2 px-2 py-3" style={{ gridTemplateColumns: cols, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
            <img src={`/img/carriers/${r.brand}.svg`} alt={r.brand} width={34} height={34} className="h-[34px] w-[34px] object-contain" />
            <span className="text-[13px] text-black/80">{r.guia}</span>
            <span className="text-[13px] text-black/65">25/06/2026</span>
            <span className="justify-self-end whitespace-nowrap rounded-full bg-[rgba(245,158,11,0.12)] px-3 py-1 text-[11px] font-semibold text-[#B45309]">Por recolectar</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Tabla "Envíos por paquetería" (scrolleable, con fila Total) */
function PaqueteriaTable() {
  const cols = "46px 0.9fr 0.85fr 1fr 1fr 1fr 1.1fr";
  const tile = (brand: string) =>
    brand === "t1" ? (
      <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-[#E0241B]">
        <span className="font-sora text-[12px] font-extrabold text-white">T1</span>
      </span>
    ) : (
      <img src={`/img/carriers/${brand}.svg`} alt={brand} width={34} height={34} className="h-[34px] w-[34px] object-contain" />
    );
  const ROWS = [
    { brand: "ups", total: 14, ent: 0, tiempo: "0", costo: "450.6", peso: "11", tot: "$6,308.44" },
    { brand: "ampm", total: 12, ent: 0, tiempo: "0", costo: "105.08", peso: "1.08", tot: "$1,260.93" },
    { brand: "paquetexpress", total: 34, ent: 0, tiempo: "0", costo: "304.37", peso: "10.59", tot: "$10,348.63" },
    { brand: "dhl", total: 177, ent: 14, tiempo: "-24", costo: "285.82", peso: "8.36", tot: "$50,590.52" },
    { brand: "fedex", total: 82, ent: 1, tiempo: "-1", costo: "339.72", peso: "12.02", tot: "$27,856.85" },
    { brand: "99min", total: 2, ent: 0, tiempo: "0", costo: "137.37", peso: "1", tot: "$274.74" },
  ];
  return (
    <div style={{ fontFamily: MANROPE }}>
      <p className="text-[14px] font-bold text-black" style={{ marginBottom: 14 }}>Envíos por paquetería</p>
      <div className="overflow-auto" style={{ maxHeight: 320 }}>
        <div style={{ minWidth: 620 }}>
          <div className="grid gap-2 px-1 pb-2" style={{ gridTemplateColumns: cols }}>
            <span className="text-[10px] font-medium text-black/50">Paquetería</span>
            <span className="text-center text-[10px] font-medium text-black/50">Total</span>
            <span className="text-center text-[10px] font-medium text-black/50">Entregado</span>
            <span className="text-center text-[10px] font-medium text-black/50">Tiempo</span>
            <span className="text-center text-[10px] font-medium text-black/50">Costo prom.</span>
            <span className="text-center text-[10px] font-medium text-black/50">Peso (kg)</span>
            <span className="text-right text-[10px] font-medium text-black/50">Costo total</span>
          </div>
          {ROWS.map((r, i) => (
            <div key={i} className="grid items-center gap-2 px-1 py-2.5" style={{ gridTemplateColumns: cols, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
              {tile(r.brand)}
              <span className="text-center text-[12px] text-black/75">{r.total}</span>
              <span className="text-center text-[12px] text-black/75">{r.ent}</span>
              <span className="text-center text-[12px] text-black/75">{r.tiempo}</span>
              <span className="text-center text-[12px] text-black/75">{r.costo}</span>
              <span className="text-center text-[12px] text-black/75">{r.peso}</span>
              <span className="text-right text-[12px] font-semibold text-black/80">{r.tot}</span>
            </div>
          ))}
          <div className="grid items-center gap-2 px-1 py-3" style={{ gridTemplateColumns: cols, borderTop: "2px solid rgba(0,0,0,0.12)" }}>
            <span className="text-[12px] font-bold text-black">Total</span>
            <span className="text-center text-[12px] font-bold text-black">321</span>
            <span className="text-center text-[12px] font-bold text-black">15</span>
            <span className="text-center text-[12px] font-bold text-black">-22.5</span>
            <span className="text-center text-[12px] font-bold text-black">96640.11</span>
            <span className="text-center text-[12px] font-bold text-black">9.05</span>
            <span className="text-right text-[12px] font-bold text-black">$96,640.11</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const REPORTS = [
  {
    key: "estado",
    tab: "Estado de envíos",
    type: "donut" as const,
    note: "Distribución de envíos por estado, este mes.",
    donut: [
      { name: "Guía generada", count: 0, pct: 0, color: "#34A853" },
      { name: "En camino", count: 20, pct: 6.02, color: "#4285F4" },
      { name: "Por recolectar", count: 296, pct: 89.16, color: "#EA6A2B" },
      { name: "Entregado", count: 15, pct: 4.52, color: "#1E8E3E" },
      { name: "Recolectado", count: 1, pct: 0.3, color: "#F4C20D" },
      { name: "Incidencia", count: 0, pct: 0, color: "#DB3B2B" },
    ] as DonutItem[],
    data: [],
  },
  {
    key: "ultimos",
    tab: "Últimos envíos",
    type: "list" as const,
    note: "Tus envíos más recientes y su estado actual.",
    data: [],
  },
  {
    key: "paqueteria",
    tab: "Envíos por paquetería",
    type: "table" as const,
    note: "Resumen de envíos, costo y peso por paquetería, este mes.",
    data: [],
  },
];

/* "Últimos envíos" — versión responsive (tarjetas por envío) */
function EnviosListResponsive({ className = "" }: { className?: string }) {
  const ROWS = [
    { brand: "dhl", guia: "3316457756" },
    { brand: "dhl", guia: "3316457362" },
    { brand: "dhl", guia: "3316457336" },
    { brand: "dhl", guia: "3316457222" },
    { brand: "fedex", guia: "873588472878" },
    { brand: "estafeta", guia: "552309817745" },
    { brand: "paquetexpress", guia: "884512309776" },
    { brand: "ups", guia: "1Z117W7K0421" },
    { brand: "99min", guia: "99M2230981770" },
  ];
  return (
    <div className={className} style={{ fontFamily: MANROPE }}>
      <p className="text-[19px] font-bold text-black" style={{ marginBottom: 16 }}>Últimos 20 envíos</p>
      <div className="overflow-y-auto" style={{ maxHeight: 512 }}>
        {ROWS.map((r, i) => (
          <div key={i} style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 16, paddingBottom: 16 }}>
            {/* Logo + N.º de guía + estado */}
            <div className="flex items-center gap-3" style={{ marginBottom: 14 }}>
              <img src={`/img/carriers/${r.brand}.svg`} alt={r.brand} width={40} height={40} className="h-[40px] w-[40px] shrink-0" />
              <span className="min-w-0 flex-1 truncate text-[16px] font-semibold text-black">{r.guia}</span>
              <span className="shrink-0 rounded-full bg-[rgba(245,158,11,0.12)] px-3 py-1.5 text-[13px] font-semibold text-[#B45309]">Por recolectar</span>
            </div>
            {/* Fecha de envío */}
            <div>
              <p className="text-[13px] text-black/45" style={{ marginBottom: 3 }}>Fecha de envío</p>
              <p className="text-[15px] text-black/80">25/06/2026</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* "Envíos por paquetería" — versión responsive (tarjetas por paquetería) */
function PaqueteriaResponsive({ className = "" }: { className?: string }) {
  const ROWS = [
    { brand: "ups", envios: 14, ent: 0, dias: "3 días", inc: 1, prom: "$450.60", total: "$6,308.44" },
    { brand: "ampm", envios: 12, ent: 0, dias: "2 días", inc: 0, prom: "$105.08", total: "$1,260.93" },
    { brand: "paquetexpress", envios: 34, ent: 0, dias: "3 días", inc: 2, prom: "$304.37", total: "$10,348.63" },
    { brand: "dhl", envios: 177, ent: 14, dias: "2 días", inc: 8, prom: "$285.82", total: "$50,590.52" },
    { brand: "fedex", envios: 82, ent: 1, dias: "2 días", inc: 3, prom: "$339.72", total: "$27,856.85" },
    { brand: "99min", envios: 2, ent: 0, dias: "1 día", inc: 0, prom: "$137.37", total: "$274.74" },
  ];
  const Cell = ({ label, value, divider = false }: { label: string; value: string; divider?: boolean }) => (
    <div className={divider ? "pl-4" : ""} style={divider ? { borderLeft: "1px solid rgba(0,0,0,0.08)" } : undefined}>
      <p className="text-[13px] text-black/45" style={{ marginBottom: 3 }}>{label}</p>
      <p className="text-[16px] text-black/80">{value}</p>
    </div>
  );
  return (
    <div className={className} style={{ fontFamily: MANROPE }}>
      <p className="text-[19px] font-bold text-black" style={{ marginBottom: 16 }}>Envíos por paquetería</p>
      <div className="overflow-y-auto" style={{ maxHeight: 490 }}>
      {ROWS.map((r, i) => (
        <div key={i} style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 18, paddingBottom: 18 }}>
          {/* Logo + envíos */}
          <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
            <img src={`/img/carriers/${r.brand}.svg`} alt={r.brand} width={44} height={44} className="h-[44px] w-[44px] shrink-0" />
            <span className="text-[18px] font-semibold text-black">{r.envios} envíos</span>
          </div>
          {/* Entregado / Tiempo / Incidencia */}
          <div className="grid grid-cols-3 gap-3" style={{ marginBottom: 14 }}>
            <Cell label="Entregado" value={String(r.ent)} />
            <Cell label="Tiempo de entrega" value={r.dias} divider />
            <Cell label="Incidencia" value={String(r.inc)} divider />
          </div>
          {/* Costo promedio / Costo total */}
          <div className="grid grid-cols-2 gap-3">
            <Cell label="Costo promedio" value={r.prom} />
            <Cell label="Costo total" value={r.total} divider />
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

/* Marco de teléfono reutilizable (bordes redondeados) — SOLO responsive */
function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full" style={{ maxWidth: 340, fontFamily: MANROPE }}>
      <div className="relative overflow-hidden bg-white" style={{ borderRadius: 44, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}>
        <div className="px-4 pt-6 pb-7">{children}</div>
      </div>
    </div>
  );
}

/* Hero visual responsive — 4 stats + Envíos por estado (SOLO responsive) */
function ReportesHeroPhone({ className = "" }: { className?: string }) {
  const CARDS = [
    { label: "Número de envíos", end: 281, decimals: 0, prefix: "", suffix: "", delta: "-34.64%", up: false },
    { label: "Costo promedio por envío", end: 153.9, decimals: 1, prefix: "$", suffix: "", delta: "+34.64%", up: true },
    { label: "Peso promedio", end: 1.0, decimals: 1, prefix: "", suffix: " kg", delta: "-34.64%", up: false },
    { label: "Tiempo promedio de entrega", end: 3, decimals: 0, prefix: "", suffix: " días", delta: "+34.64%", up: true },
  ];
  const STATES = [
    { name: "1-CDMX", pct: 45, color: "#C0291B" },
    { name: "2-Edo. de México", pct: 25, color: "#DB3B2B" },
    { name: "3-Monterrey", pct: 18, color: "#E2685C" },
    { name: "4-Chihuahua", pct: 8, color: "#EE9A90" },
    { name: "5-Puebla", pct: 4, color: "#F4C2BB" },
  ];
  const MAX = 45;
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={className}>
      <div className="relative">
        <div aria-hidden className="pointer-events-none absolute -inset-4 rounded-[52px]" style={{ background: "radial-gradient(circle at 70% 20%, rgba(219,59,43,0.18) 0%, transparent 62%)", filter: "blur(32px)" }} />
        <div className="relative">
      <PhoneShell>
        {/* 4 stat cards */}
        <div className="grid grid-cols-2 gap-3" style={{ marginBottom: 14 }}>
          {CARDS.map((c) => (
            <div key={c.label} className="rounded-[14px] border border-black/[0.08] bg-white px-3.5 py-3.5" style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
              <div className="flex items-start justify-between gap-2">
                <p className="text-[13px] font-medium text-black/70" style={{ lineHeight: 1.25 }}>{c.label}</p>
                <p className="whitespace-nowrap font-sora text-[19px] font-semibold text-black" style={{ lineHeight: 1 }}>
                  <CountUp end={c.end} prefix={c.prefix} suffix={c.suffix} decimals={c.decimals} />
                </p>
              </div>
              <p className="text-[12px] text-black/45" style={{ marginTop: 16 }}>Periodo anterior</p>
              <p className="text-[13px] font-semibold" style={{ color: c.up ? "#16A34A" : "#DB3B2B" }}>{c.delta}</p>
            </div>
          ))}
        </div>

        {/* Envíos por estado */}
        <div className="rounded-[14px] border border-black/[0.08] bg-white px-4 py-4" style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
            <p className="text-[15px] font-semibold text-black">Envíos por estado</p>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="rgba(0,0,0,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div className="flex flex-col gap-3">
            {STATES.map((s, i) => (
              <div key={s.name} className="flex items-center gap-3">
                <span className="w-[112px] shrink-0 text-[13px] text-black/70">{s.name}</span>
                <div className="relative h-[8px] flex-1 overflow-hidden rounded-full bg-black/[0.05]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: on ? `${(s.pct / MAX) * 100}%` : "0%", background: s.color, transition: "width 1.4s cubic-bezier(0.33,1,0.68,1)", transitionDelay: `${i * 0.1}s` }}
                  />
                </div>
                <span className="w-[36px] shrink-0 text-right text-[13px] font-semibold text-black/75">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </PhoneShell>
        </div>
      </div>
    </div>
  );
}

export default function T1ReportesLogisticos() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState(0);
  // Carrusel "Todo lo que puedes medir" — flechas prev/next (estilo Define reglas)
  const medirRef = useRef<HTMLDivElement>(null);
  const scrollMedir = (dir: number) => {
    const el = medirRef.current;
    const card = el?.querySelector<HTMLElement>(".medir-card");
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

  const active = REPORTS[tab];

  return (
    <div ref={rootRef} className="w-full" style={{ ["--max-w" as string]: "1220px" }}>
      {/* ════════════ HERO — copy left, dashboard right ════════════ */}
      <section className="relative flex items-center overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-20 tablet:pb-10 tablet:h-[660px]" style={{ background: "linear-gradient(135deg, #261515 0%, #1A0A0A 40%, #261515 100%)" }}>
        <div className="relative mx-auto w-full max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-12 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] tablet:gap-16">
            {/* Copy */}
            <div>
              <h1 className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[56px]" style={{ lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 22 }}>
                Entiende el desempeño de{" "}
                <span className="relative inline-block">
                  tus envíos
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.35)", borderRadius: 5, zIndex: -1 }} />
                </span>.
              </h1>
              <p className="font-inter text-[16px] font-light text-white/70 tablet:text-[19px]" style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}>
                Revisa costos, tiempos de entrega, estados e incidencias por paquetería, zona o periodo desde un solo panel.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SIGNUP_URL} className="inline-flex items-center rounded-full bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                  Ver mis reportes
                </a>
              </div>
            </div>

            {/* Dashboard — teléfono en responsive */}
            <ReportesHeroPhone className="tablet:hidden" />
            {/* Dashboard — desktop */}
            <div className="relative hidden tablet:block">
              <div aria-hidden className="pointer-events-none absolute -inset-6 rounded-[28px]" style={{ background: "radial-gradient(circle at 70% 20%, rgba(219,59,43,0.18) 0%, transparent 62%)", filter: "blur(32px)" }} />
              {/* Gráfico 3D detrás del panel */}
              <Image src="/img/graficas-reportes.png" alt="" width={1254} height={1059} priority className="pointer-events-none absolute z-0 object-contain" style={{ right: "-16%", top: "-26%", width: "74%", height: "auto", filter: "drop-shadow(0 24px 50px rgba(0,0,0,0.5))" }} />
              <div className="relative z-10 overflow-hidden rounded-[22px] border border-white/[0.10] bg-white" style={{ padding: 24, boxShadow: "0 30px 70px rgba(0,0,0,0.55)", fontFamily: MANROPE }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
                  <p className="text-[14px] font-bold text-black">Panel de reportes</p>
                  <span className="rounded-full bg-black/[0.05] px-2.5 py-1 text-[10px] font-semibold text-black/55">Enero 2026</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5" style={{ marginBottom: 16 }}>
                  {[
                    { end: 1284, prefix: "", suffix: "", l: "Envíos", c: "#0E0E0E" },
                    { end: 96, prefix: "", suffix: "%", l: "A tiempo", c: "#16A34A" },
                    { end: 112, prefix: "$", suffix: "", l: "Costo prom.", c: "#0E0E0E" },
                  ].map((k) => (
                    <div key={k.l} className="rounded-[12px] border border-black/[0.06] bg-[#FAFAF9] px-3 py-3">
                      <p className="font-sora text-[20px] font-light tabular-nums" style={{ lineHeight: 1, color: k.c }}><CountUp end={k.end} prefix={k.prefix} suffix={k.suffix} /></p>
                      <p className="text-[11px] text-black/55" style={{ marginTop: 4 }}>{k.l}</p>
                    </div>
                  ))}
                </div>
                <EstadoBars />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ STATEMENT — por qué medir ════════════ */}
      <section className="relative bg-white px-5 pt-24 pb-12 tablet:px-10 tablet:pt-32 tablet:pb-16" data-modal-animate>
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="font-sora text-[26px] font-light text-black tablet:text-[36px] lg:text-[42px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.2 }}>
            No todos los envíos cuestan ni funcionan igual.{" "}
            <span className="text-black/45">Con reportes logísticos puedes comparar y ajustar tu operación con datos.</span>
          </h2>
        </div>
      </section>

      {/* ════════════ INTERACTIVE REPORT EXPLORER ════════════ */}
      <section className="relative bg-white px-5 pt-12 pb-24 tablet:px-10 tablet:pt-16 tablet:pb-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[900px] text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[38px] lg:text-[46px] lg:whitespace-nowrap" style={{ letterSpacing: "-1.3px", lineHeight: 1.1, marginBottom: 14 }}>
              Mide, compara y mejora tus envíos.
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Cambia de reporte y compara tus paqueterías al instante.
            </p>
          </div>

          {/* Tabs */}
          <div data-modal-animate className="mb-6 flex flex-wrap justify-center gap-2">
            {REPORTS.map((r, i) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setTab(i)}
                className={`rounded-full px-5 py-2.5 font-inter text-[13px] font-semibold transition-all duration-150 ${tab === i ? "bg-[#111111] text-white" : "bg-black/[0.04] text-black/60 hover:bg-black/[0.08]"}`}
              >
                {r.tab}
              </button>
            ))}
          </div>

          {/* Chart panel */}
          <div data-modal-animate className="mx-auto max-w-[760px] overflow-hidden rounded-[20px] border border-black/[0.07] bg-white" style={{ padding: 28, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
            {active.type !== "list" && active.type !== "table" && (
              <div className="flex items-center justify-between" style={{ marginBottom: 18, fontFamily: MANROPE }}>
                <p className="text-[14px] font-bold text-black">{active.tab}</p>
                <span className="flex items-center gap-1.5 rounded-full bg-black/[0.04] px-3 py-1.5 text-[11px] font-semibold text-black/55">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 3v12M12 15l-4-4M12 15l4-4M5 21h14" stroke="rgba(0,0,0,0.45)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Exportar
                </span>
              </div>
            )}
            <div className="flex flex-col justify-center tablet:min-h-[360px]">
              {active.type === "donut" ? (
                <>
                  <DonutChartResponsive key={`${active.key}-m`} className="tablet:hidden" />
                  <div className="hidden tablet:block">
                    <DonutChart key={active.key} data={active.donut!} />
                  </div>
                </>
              ) : active.type === "list" ? (
                <>
                  <EnviosListResponsive className="tablet:hidden" />
                  <div className="hidden tablet:block">
                    <EnviosList key={active.key} />
                  </div>
                </>
              ) : active.type === "table" ? (
                <>
                  <PaqueteriaResponsive className="tablet:hidden" />
                  <div className="hidden tablet:block">
                    <PaqueteriaTable key={active.key} />
                  </div>
                </>
              ) : null}
            </div>
            <p className="mt-4 font-inter text-[12px] text-black/50">{active.note}</p>
          </div>
        </div>
      </section>

      {/* ════════════ SPLIT — tendencia de entregas ════════════ */}
      <section className="relative bg-[#FBFBFB] px-5 py-24 tablet:px-10 tablet:py-32" data-modal-animate>
        <div className="mx-auto flex max-w-[var(--max-w)] items-center">
          <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
            {/* Panel — 2 cards de barras horizontales */}
            <div className="order-2 flex flex-col gap-4 tablet:order-1">
              <HBarsCard
                title="Envíos por estado"
                items={[
                  { name: "Ciudad de México", pct: 54.74 },
                  { name: "Estado de México", pct: 35.47 },
                  { name: "Veracruz", pct: 4.28 },
                  { name: "Querétaro", pct: 3.36 },
                  { name: "Nuevo León", pct: 0.92 },
                ]}
              />
              <HBarsCard
                title="Tiempo de entrega efectiva"
                items={[
                  { name: "-29 días", pct: 33.33 },
                  { name: "-21 días", pct: 33.33 },
                  { name: "-22 días", pct: 20.0 },
                  { name: "-1 días", pct: 6.67 },
                  { name: "-17 días", pct: 6.67 },
                ]}
              />
            </div>

            <div className="order-1 tablet:order-2">
              <h2 className="font-sora text-[28px] font-light text-black tablet:text-[40px] lg:text-[46px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                Identifica tendencias
              </h2>
              <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                Mide el desempeño de tus envíos y corrige a tiempo cualquier desviación.
              </p>
              <ul className="flex flex-col gap-2.5">
                {["Tendencias por periodo, no solo totales", "Compara mes contra mes en automático", "Alertas cuando un indicador empeora"].map((it) => (
                  <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════ CAPACIDADES — todo lo que puedes medir (estilo "Define reglas") ════════════ */}
      <section className="relative overflow-hidden bg-white px-5 py-24 tablet:px-10 tablet:py-32" data-modal-animate>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 gap-10 tablet:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)] tablet:items-center tablet:gap-14">
            {/* Left — título + CTA */}
            <div>
              <h2 className="font-sora text-[32px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.12, marginBottom: 16, maxWidth: 420 }}>
                Todo lo que puedes medir en un panel
              </h2>
              <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55, marginBottom: 28, maxWidth: 400 }}>
                Del estado de cada envío al costo por paquetería, con datos listos para exportar.
              </p>
              <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                Ver mis reportes
              </a>
            </div>

            {/* Right — carrusel de cards con flechas */}
            <div className="flex flex-col gap-5">
              <div ref={medirRef} className="-mr-5 flex gap-5 overflow-x-auto pb-2 pr-5 tablet:mr-0 tablet:pr-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {[
                  { title: "Envíos por estado", desc: "Por recolectar, en tránsito, entregados y con incidencia, en tiempo real.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#111827" strokeWidth="1.6" /><path d="M3 9h18M8 14h3M8 17h6" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
                  { title: "Desempeño por paquetería", desc: "Compara costo, peso y entregas a tiempo de cada carrier.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M3 21h18" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" /><rect x="5" y="11" width="3.5" height="8" rx="1" stroke="#111827" strokeWidth="1.6" /><rect x="10.5" y="7" width="3.5" height="12" rx="1" stroke="#111827" strokeWidth="1.6" /><rect x="16" y="4" width="3.5" height="15" rx="1" stroke="#111827" strokeWidth="1.6" /></svg>) },
                  { title: "Costos de envío", desc: "Costo promedio y total por periodo, paquetería o canal.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#111827" strokeWidth="1.6" /><path d="M12 7v10M14.5 9.3c0-1-1.1-1.8-2.5-1.8s-2.5.8-2.5 1.8 1.1 1.7 2.5 1.9 2.5.9 2.5 1.9-1.1 1.8-2.5 1.8-2.5-.8-2.5-1.8" stroke="#111827" strokeWidth="1.4" strokeLinecap="round" /></svg>) },
                  { title: "Tendencias de entrega", desc: "Evolución de entregas a tiempo y demoras a lo largo del tiempo.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M3 17l6-6 4 4 8-8" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M21 7v5h-5" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
                  { title: "Comparativa por periodo", desc: "Contrasta contra el periodo anterior para ver qué mejoró y qué no.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="18" rx="1.5" stroke="#111827" strokeWidth="1.6" /><rect x="13" y="3" width="8" height="18" rx="1.5" stroke="#111827" strokeWidth="1.6" /></svg>) },
                  { title: "Exportables al instante", desc: "Descarga cualquier reporte en Excel o CSV con un click.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z M14 3v5h5" stroke="#111827" strokeWidth="1.6" strokeLinejoin="round" /><path d="M12 11v6m0 0l-2.5-2.5M12 17l2.5-2.5" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
                ].map((c) => (
                  <div key={c.title} className="medir-card flex w-[270px] shrink-0 snap-start flex-col rounded-[20px] border border-black/[0.07] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                    <h3 className="font-sora text-[19px] font-normal text-black" style={{ marginBottom: 8 }}>{c.title}</h3>
                    <p className="font-inter text-[14px] font-light text-black/55" style={{ lineHeight: 1.55, marginBottom: 20, minHeight: 63 }}>{c.desc}</p>
                    <div className="mt-auto flex h-[130px] items-center justify-center rounded-[14px] border border-black/[0.05] bg-[#FAFAF9]">
                      <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-white shadow-[0_4px_14px_rgba(0,0,0,0.06)]">{c.icon}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Flechas de navegación */}
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => scrollMedir(-1)} aria-label="Anterior" className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-black/15 bg-white text-black/55 transition-colors hover:border-black/30 hover:text-black">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button type="button" onClick={() => scrollMedir(1)} aria-label="Siguiente" className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-black/15 bg-white text-black/55 transition-colors hover:border-black/30 hover:text-black">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FAQ — estilo t1.com/mx/tienda ════════════ */}
      <section className="relative bg-black px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[760px]">
          <div className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>
              Preguntas frecuentes
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { q: "¿Qué puedo medir en los reportes?", a: "Tiempos de entrega, % a tiempo, costos por envío y desempeño de cada paquetería, con cortes por fecha, zona, estado y tipo de servicio." },
              { q: "¿Los datos se actualizan solos?", a: "Sí. Los reportes se alimentan del estatus real de tus guías en todas las paqueterías conectadas, sin captura manual." },
              { q: "¿Puedo comparar paqueterías?", a: "Sí. El explorador te deja cambiar de indicador y ver lado a lado a tus carriers por velocidad, costo y cumplimiento." },
              { q: "¿Puedo exportar la información?", a: "Sí. Descargas cualquier reporte en CSV o Excel para compartirlo con tu equipo o integrarlo a tus propios tableros." },
              { q: "¿Tiene costo adicional?", a: "No. Los reportes logísticos vienen incluidos en T1 Envíos." },
            ].map((f) => (
              <details
                key={f.q}
                className="group rounded-[14px] border border-white/[0.08] bg-white/[0.03] transition-all duration-200 open:border-[rgba(219,59,43,0.4)] open:bg-white/[0.05]"
              >
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
        title="Convierte tus envíos en decisiones"
        description="Mide tiempos, costos y paqueterías en un solo panel y mejora tu logística con datos reales."
        buttonLabel="Ver mis reportes"
      />
    </div>
  );
}
