"use client";

/* Paneles del explorador "Mide, compara y mejora tus envíos" (reportería de
   T1 Envíos). Réplica simplificada de las 3 vistas reales de la plataforma:
   General · En tiempo real · Incidencias y retornos. Datos ficticios. */

const MANROPE = "var(--font-manrope-var), 'Manrope', sans-serif";
const RED = "#E5484D";
const PINK = "#F2A7A9";

/* Curva suave (Catmull-Rom → Bézier). Coordenadas redondeadas para que
   servidor y cliente generen la misma cadena. */
function smoothPath(pts: [number, number][]) {
  const r = (n: number) => Math.round(n * 100) / 100;
  let d = `M${r(pts[0][0])},${r(pts[0][1])}`;
  for (let k = 0; k < pts.length - 1; k++) {
    const p0 = pts[k - 1] ?? pts[k], p1 = pts[k], p2 = pts[k + 1], p3 = pts[k + 2] ?? p2;
    d += ` C${r(p1[0] + (p2[0] - p0[0]) / 6)},${r(p1[1] + (p2[1] - p0[1]) / 6)} ${r(p2[0] - (p3[0] - p1[0]) / 6)},${r(p2[1] - (p3[1] - p1[1]) / 6)} ${r(p2[0])},${r(p2[1])}`;
  }
  return d;
}

function Card({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[14px] border border-black/[0.07] bg-white p-4 ${className}`}>
      {title && <p className="text-[12.5px] font-bold text-black" style={{ marginBottom: 10 }}>{title}</p>}
      {children}
    </div>
  );
}

function Delta({ v, good }: { v: string; good: boolean }) {
  return (
    <span className="rounded-full px-1.5 py-0.5 text-[9.5px] font-semibold" style={{ color: good ? "#16A34A" : RED, background: good ? "rgba(34,197,94,0.10)" : "rgba(229,72,77,0.10)" }}>{v}</span>
  );
}

/* Gráfica de línea: periodo actual (rojo) vs anterior (rosa punteado) */
function LineCompare({ cur, prev, max, yTicks, xLabels, legend, height = 150, width = 320 }: { cur: number[]; prev: number[]; max: number; yTicks: string[]; xLabels: string[]; legend: [string, string]; height?: number; width?: number }) {
  const W = width, L = 30, R = width - 6, T = 8, B = height - 22;
  const pts = (arr: number[]) => arr.map((v, k) => [L + (k / (arr.length - 1)) * (R - L), B - (v / max) * (B - T)] as [number, number]);
  const c = smoothPath(pts(cur));
  const p = smoothPath(pts(prev));
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${height}`} className="w-full">
        <defs><clipPath id={`lc-${legend[0]}-${width}`}><rect x={L} y={0} width={R - L} height={B + 1} /></clipPath></defs>
        {yTicks.map((tk, k) => {
          const y = B - (k / (yTicks.length - 1)) * (B - T);
          return (
            <g key={tk}>
              <line x1={L} x2={R} y1={y} y2={y} stroke="rgba(0,0,0,0.06)" strokeWidth="0.6" />
              <text x={L - 5} y={y + 2.5} textAnchor="end" style={{ fontSize: 7, fill: "rgba(0,0,0,0.45)" }}>{tk}</text>
            </g>
          );
        })}
        <g clipPath={`url(#lc-${legend[0]}-${width})`}>
          <path d={p} fill="none" stroke={PINK} strokeWidth="1.2" strokeDasharray="3 3" />
          <path d={c} fill="none" stroke={RED} strokeWidth="1.6" strokeLinejoin="round" pathLength={1} style={{ strokeDasharray: 1, animation: "reportDraw 1.2s ease-out both" }} />
        </g>
        {xLabels.map((lb, k) => (
          <text key={lb} x={L + (k / (xLabels.length - 1)) * (R - L)} y={B + 13} textAnchor={k === 0 ? "start" : k === xLabels.length - 1 ? "end" : "middle"} style={{ fontSize: 7, fill: "rgba(0,0,0,0.45)" }}>{lb}</text>
        ))}
      </svg>
      <div className="mt-1 flex items-center justify-center gap-4 text-[10px] text-black/60">
        <span className="flex items-center gap-1.5"><span className="h-[7px] w-[7px] rounded-full" style={{ background: RED }} />{legend[0]}</span>
        <span className="flex items-center gap-1.5"><span className="h-[7px] w-[7px] rounded-full" style={{ background: PINK }} />{legend[1]}</span>
      </div>
    </div>
  );
}

/* Lista con barra horizontal + conteo + porcentaje */
function BarList({ rows, mobileMax = 99 }: { rows: { name: string; n: number; pct: number }[]; mobileMax?: number }) {
  return (
    <div className="flex flex-col gap-2.5">
      {rows.map((r, i) => (
        <div key={r.name} className={`grid grid-cols-[minmax(0,1.9fr)_minmax(0,0.6fr)_20px_34px] items-center gap-2.5 tablet:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_22px_34px] tablet:gap-3 ${i >= mobileMax ? "hidden tablet:grid" : ""}`}>
          <span className="truncate text-[11.5px] text-black/80">{r.name}</span>
          <span className="h-[6px] overflow-hidden rounded-full bg-black/[0.06]">
            <span className="block h-full rounded-full" style={{ width: `${Math.max(r.pct, 2)}%`, background: RED, transformOrigin: "left", animation: `barGrow 0.8s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.06}s both` }} />
          </span>
          <span className="text-right text-[11.5px] text-black/75">{r.n}</span>
          <span className="rounded-full bg-black/[0.04] py-0.5 text-center text-[9.5px] font-semibold text-black/60">{r.pct}%</span>
        </div>
      ))}
    </div>
  );
}

/* ══════════ General ══════════ */
const KPIS = [
  { label: "Número de envíos", value: "2,799", d: "-11.7%", good: false },
  { label: "Entregas a tiempo", value: "82.0%", d: "+4.2%", good: true },
  { label: "Costo promedio", value: "$126.23", d: "-1.1%", good: true },
  { label: "Tasa de incidencia", value: "2.9%", d: "", good: true },
  { label: "Envíos con sobrepeso", value: "0", d: "-100%", good: true },
];
const TOP_ESTADOS = [
  { n: "Estado de México", e: 608, ent: "92.6%", part: 21.7 },
  { n: "Ciudad de México", e: 568, ent: "93.1%", part: 20.3 },
  { n: "Puebla", e: 169, ent: "94.1%", part: 6.0 },
  { n: "Veracruz", e: 149, ent: "89.3%", part: 5.3 },
];
const PAQ = [
  { brand: "dhl", name: "DHL", serv: "Economy Select", envios: "1,789", ent: "1,661", dias: "3.0", costo: "$125.45" },
  { brand: "fedex", name: "FedEx", serv: "Express Saver", envios: "513", ent: "479", dias: "3.0", costo: "$142.54" },
  { brand: "ampm", name: "AMPM", serv: "Estándar", envios: "467", ent: "438", dias: "3.1", costo: "$110.31" },
];
const PAQ_COLS = "28px minmax(0,1.6fr) 56px 70px 64px 74px";

export function ReporteGeneral() {
  return (
    <div className="flex h-full flex-col gap-3" style={{ fontFamily: MANROPE }}>
      <div className="grid grid-cols-2 gap-2.5 tablet:grid-cols-5">
        {KPIS.map((k, i) => (
          <div key={k.label} className={`rounded-[12px] border border-black/[0.07] bg-white px-3 py-2.5 ${i === 4 ? "hidden tablet:block" : ""}`}>
            <p className="truncate text-[10.5px] text-black/60 underline decoration-dotted underline-offset-2">{k.label}</p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="text-[17px] font-semibold text-black/85">{k.value}</span>
              {k.d && <Delta v={k.d} good={k.good} />}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 tablet:grid-cols-2">
        <Card title="Evolución por semana">
          <div className="flex items-center gap-1.5" style={{ marginBottom: 2 }}>
            <span className="text-[20px] font-semibold text-black/85">860</span>
            <span className="text-[10px] font-semibold text-[#16A34A]">↗ 4.2%</span>
          </div>
          <LineCompare
            cur={[700, 760, 840, 960, 760, 640, 560, 500, 420, 300, 240, 220]}
            prev={[820, 840, 790, 760, 780, 840, 800, 740, 700, 780, 820, 620]}
            max={1100} yTicks={["0", "251", "501", "752", "1,002"]} xLabels={["2 jun", "9 jun", "16 jun", "23 jun", "30 jun"]}
            legend={["Envíos", "Periodo anterior"]} height={112}
          />
        </Card>
        <Card title="Envíos por estado" className="hidden tablet:block">
          <div className="flex flex-col gap-2.5">
            {TOP_ESTADOS.map((s, i) => (
              <div key={s.n} className="grid items-center gap-2" style={{ gridTemplateColumns: "minmax(0,1.2fr) minmax(0,1fr) 34px 40px" }}>
                <span className="truncate text-[11.5px] text-black/80">{s.n}</span>
                {/* Zona de calor: más envíos → rojo más intenso */}
                <span className="h-[14px] rounded-[4px]" style={{ width: `${(s.part / 21.7) * 100}%`, background: `rgba(229,72,77,${0.25 + (s.part / 21.7) * 0.7})`, transformOrigin: "left", animation: `barGrow 0.8s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.06}s both` }} />
                <span className="text-right text-[11px] text-black/75">{s.e}</span>
                <span className="text-right text-[10px] text-black/55">{s.part}%</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 text-[9.5px] text-black/45">
            Menos envíos
            <span className="h-[5px] flex-1 rounded-full" style={{ background: "linear-gradient(90deg, rgba(229,72,77,0.2), rgba(229,72,77,0.95))" }} />
            Más envíos
          </div>
        </Card>
      </div>

      <Card title="Envíos por paquetería" className="flex-1">
        {/* Móvil: filas compactas */}
        <div className="flex flex-col tablet:hidden">
          {PAQ.map((r) => (
            <div key={r.serv} className="grid items-center gap-2.5 py-2" style={{ gridTemplateColumns: "28px minmax(0,1fr) auto", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/img/carriers/${r.brand}.svg`} alt={r.name} width={28} height={28} className="h-[28px] w-[28px] object-contain" />
              <span className="min-w-0 leading-tight"><span className="block text-[12px] font-semibold text-black/85">{r.name}</span><span className="block truncate text-[10.5px] text-black/50">{r.serv} · {r.envios} envíos</span></span>
              <span className="text-right text-[12px] font-semibold text-black/80">{r.costo}</span>
            </div>
          ))}
        </div>
        <div className="hidden overflow-x-auto tablet:block">
          <div style={{ minWidth: 520 }}>
            <div className="grid gap-2 pb-1.5 text-[9.5px] font-medium text-black/45" style={{ gridTemplateColumns: PAQ_COLS }}>
              <span /><span>Servicio</span><span className="text-right">Envíos</span><span className="text-right">Entregados</span><span className="text-right">Días prom.</span><span className="text-right">Costo prom.</span>
            </div>
            {PAQ.map((r) => (
              <div key={r.serv} className="grid items-center gap-2 py-1.5" style={{ gridTemplateColumns: PAQ_COLS, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/img/carriers/${r.brand}.svg`} alt={r.name} width={28} height={28} className="h-[28px] w-[28px] object-contain" />
                <span className="min-w-0 truncate text-[11.5px]"><span className="font-semibold text-black/85">{r.name}</span><span className="text-black/50"> · {r.serv}</span></span>
                <span className="text-right text-[11px] text-black/75">{r.envios}</span>
                <span className="text-right text-[11px] text-black/75">{r.ent}</span>
                <span className="text-right text-[11px] text-black/75">{r.dias}</span>
                <span className="text-right text-[11px] font-semibold text-black/80">{r.costo}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ══════════ En tiempo real ══════════ */
const ACCION = [
  { n: "Cambio de dirección", v: 5, p: "63%" },
  { n: "Destinatario no localizado", v: 2, p: "25%" },
  { n: "Envíos con sobrepeso", v: 1, p: "13%" },
];
const ICONS = {
  guia: <path d="M8 4h8M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM9 9h6M9 13h6M9 17h4" />,
  caja: <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM4 7.5l8 4.5 8-4.5M12 12v9" />,
  camino: <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM8 5.2l8 4.6M4 7.5l8 4.5 8-4.5" />,
  ok: <><circle cx="12" cy="12" r="8.5" /><path d="M8.5 12.2l2.3 2.3 4.7-4.7" /></>,
  ret: <path d="M17 3l3 3-3 3M20 6H8a4 4 0 0 0-4 4M7 21l-3-3 3-3M4 18h12a4 4 0 0 0 4-4" />,
  x: <><circle cx="12" cy="12" r="8.5" /><path d="M9.5 9.5l5 5M14.5 9.5l-5 5" /></>,
};
const FLUJO = [
  { k: "guia", n: "Guías generadas", v: 22 },
  { k: "caja", n: "Recolectado", v: 14 },
  { k: "camino", n: "En camino", v: 106 },
  { k: "ok", n: "Entregados hoy", v: 205 },
] as const;
const FUERA = [
  { k: "ret", n: "Retornado", v: 106 },
  { k: "x", n: "Cancelado", v: 22 },
] as const;
function Ico({ k }: { k: keyof typeof ICONS }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{ICONS[k]}</svg>;
}

export function ReporteTiempoReal() {
  return (
    <div className="flex h-full flex-col gap-3" style={{ fontFamily: MANROPE }}>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full border border-black/[0.08] px-2.5 py-1 text-[10.5px] text-black/65">
          <span className="h-[6px] w-[6px] rounded-full bg-[#22C55E]" style={{ animation: "pulse-soft 1.6s ease-in-out infinite" }} />
          Ahora mismo
        </span>
      </div>
      <Card className="flex flex-1 flex-col">
        <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
          <p className="text-[12.5px] font-bold text-black underline decoration-dotted underline-offset-2">Requiere acción</p>
          <span className="hidden rounded-[10px] border border-black/[0.10] px-3 py-1.5 text-[10.5px] font-medium text-black/75 tablet:inline">Ir a incidencias</span>
        </div>
        <div className="grid flex-1 grid-cols-1 overflow-hidden rounded-[10px] border border-black/[0.08] tablet:grid-cols-3">
          {ACCION.map((a, i) => (
            <div key={a.n} className={`flex flex-col justify-center px-4 py-3 tablet:justify-start tablet:p-5 ${i ? "border-t border-black/[0.08] tablet:border-l tablet:border-t-0" : ""}`}>
              <p className="text-[11.5px] text-black/75">{a.n}</p>
              <div className="mt-1.5 flex items-center gap-2 tablet:mt-2">
                <span className="text-[24px] font-semibold leading-none text-black/85 tablet:text-[30px]">{a.v}</span>
                <span className="rounded-full bg-black/[0.05] px-1.5 py-0.5 text-[9.5px] font-semibold text-black/60">{a.p}</span>
              </div>
              <p className="-mt-3 text-right text-[10.5px] text-black/55 underline underline-offset-2 tablet:mt-auto">Ir a incidencias ›</p>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Tus envíos en tiempo real" className="flex flex-1 flex-col">
        <div className="grid flex-1 grid-cols-1 items-center gap-4 tablet:grid-cols-[1fr_auto_0.45fr] tablet:gap-5 tablet:py-3">
          <div className="relative grid grid-cols-4">
            {/* Línea punteada entre pasos (desktop) */}
            <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[10px] border-t border-dashed border-black/25" />
            {FLUJO.map((f, i) => (
              <div key={f.n} className="relative flex flex-col items-center text-center" style={{ animation: "fadeSlideIn 0.5s ease-out both", animationDelay: `${i * 0.1}s` }}>
                <span className="bg-white px-1.5"><Ico k={f.k} /></span>
                <span className="mt-2 text-[20px] font-semibold leading-none text-black/85 tablet:mt-3 tablet:text-[28px]">{f.v}</span>
                <span className="mt-1.5 text-[9.5px] leading-tight text-black/55 underline underline-offset-2 tablet:text-[10px]">{f.n}</span>
              </div>
            ))}
          </div>
          <span className="hidden h-[90px] w-px bg-black/10 tablet:block" />
          <div className="grid grid-cols-2 border-t border-black/[0.08] pt-3 tablet:border-t-0 tablet:pt-0">
            {FUERA.map((f) => (
              <div key={f.n} className="flex flex-col items-center text-center">
                <Ico k={f.k} />
                <span className="mt-2 text-[20px] font-semibold leading-none text-black/85 tablet:mt-3 tablet:text-[28px]">{f.v}</span>
                <span className="mt-1.5 text-[9.5px] leading-tight text-black/55 underline underline-offset-2 tablet:text-[10px]">{f.n}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ══════════ Incidencias y retornos ══════════ */
const INCIDENCIAS = [
  { name: "Cambio de dirección", n: 37, pct: 46 },
  { name: "Paquete rechazado", n: 18, pct: 23 },
  { name: "Destinatario no localizado", n: 8, pct: 10 },
  { name: "Cancelación de guía", n: 5, pct: 6 },
  { name: "Demora", n: 5, pct: 6 },
];
const RETORNOS = [
  { name: "Dirección incorrecta", n: 19, pct: 59 },
  { name: "Cambio de dirección", n: 6, pct: 19 },
  { name: "Paquete rechazado", n: 4, pct: 13 },
  { name: "Reenvío a mensajería", n: 3, pct: 9 },
];

const INC_CUR = [35, 38, 43, 50, 52, 48, 40, 32, 34, 52, 54, 54, 53, 40, 2];
const INC_PREV = [0, 0, 1, 2, 8, 15, 21, 25, 18, 3, 6, 18, 30, 40, 12];
const INC_Y = ["0", "25%", "50%", "75%", "100%"];
const INC_X = ["2 jun", "9 jun", "16 jun", "23 jun", "30 jun"];

export function ReporteIncidencias() {
  return (
    <div className="flex h-full flex-col gap-3" style={{ fontFamily: MANROPE }}>
      <Card title="Incidencias por periodo">
        <div className="flex items-baseline gap-2" style={{ marginBottom: 4 }}>
          <span className="text-[22px] font-semibold text-black/85">2.8%</span>
          <span className="text-[10px] text-black/55">En relación al total</span>
        </div>
        {/* Móvil: viewBox angosto para que el texto se lea; desktop: ancho completo */}
        <div className="tablet:hidden">
          <LineCompare cur={INC_CUR} prev={INC_PREV} max={100} yTicks={INC_Y} xLabels={INC_X} legend={["Incidencias", "Periodo anterior"]} height={130} />
        </div>
        <div className="hidden tablet:block">
          <LineCompare cur={INC_CUR} prev={INC_PREV} max={100} yTicks={INC_Y} xLabels={INC_X} legend={["Incidencias", "Periodo anterior"]} height={165} width={900} />
        </div>
      </Card>
      <div className="grid flex-1 grid-cols-1 gap-3 tablet:grid-cols-2">
        <Card title="Incidencias">
          <div className="-mt-1 mb-3 flex items-baseline gap-2"><span className="text-[20px] font-semibold text-black/85">2.8%</span><span className="text-[10px] text-black/55">En relación al total</span></div>
          <BarList rows={INCIDENCIAS} mobileMax={3} />
        </Card>
        <Card title="Retornos">
          <div className="-mt-1 mb-3 flex items-baseline gap-2"><span className="text-[20px] font-semibold text-black/85">1.12%</span><span className="text-[10px] text-black/55">En relación al total</span></div>
          <BarList rows={RETORNOS} mobileMax={3} />
        </Card>
      </div>
    </div>
  );
}
