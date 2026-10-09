"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import HeroBackground from "@/components/HeroBackground";
import T1FinalCTA from "@/components/T1FinalCTA";
import { ReporteGeneral, ReporteTiempoReal, ReporteIncidencias } from "@/components/T1ReportesLogisticosPaneles";
import { T1FAQSection } from "@/components/T1FAQ";

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

/* Hero — 2-3 cards glass (fondo blanco transparente) cuyos datos van cambiando */
function ReportesGlassCards({ className = "", stagger = false }: { className?: string; stagger?: boolean }) {
  const SNAPS = [
    { envios: 1284, aTiempo: 96, costo: 112 },
    { envios: 1291, aTiempo: 95, costo: 109 },
    { envios: 1302, aTiempo: 97, costo: 114 },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % SNAPS.length), 2800);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const s = SNAPS[i];
  const cards = [
    { l: "Envíos entregados", v: s.envios.toLocaleString("en-US"), d: "+8.2%", up: true },
    { l: "Entregas a tiempo", v: `${s.aTiempo}%`, d: "+2 pts", up: true },
    { l: "Costo promedio por envío", v: `$${s.costo}`, d: "-3.1%", up: false },
  ];
  return (
    <div className={`mx-auto flex w-full max-w-[320px] flex-col gap-4 ${className}`} style={{ fontFamily: MANROPE }}>
      {cards.map((c, idx) => (
        <div key={c.l} style={{ transform: stagger && idx === 1 ? "translateX(-38px)" : undefined }}>
          <div
            className="rounded-[18px] border border-white/[0.16] px-6 py-5"
            style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", boxShadow: "0 16px 44px rgba(0,0,0,0.28)", animation: "rastreoReveal 0.5s cubic-bezier(0.16,1,0.3,1) both", animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
              <p className="text-[13px] font-medium text-white/70">{c.l}</p>
              <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: c.up ? "rgba(34,197,94,0.16)" : "rgba(219,59,43,0.20)", color: c.up ? "#7CE0A0" : "#FF8A7A" }}>{c.d}</span>
            </div>
            <p key={`${s.envios}-${idx}`} className="font-sora text-[34px] font-light text-white tabular-nums" style={{ lineHeight: 1, animation: "countBump 0.45s ease-out" }}>{c.v}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Panel "Costo y peso promedio" — 3 métricas cuya data va cambiando */
function CostoPesoCard() {
  const SNAPS = [
    [{ v: "$96.00", d: "+10%", up: true }, { v: "1.34 kg", d: "+.5%", up: true }, { v: "7", d: "+2%", up: false }],
    [{ v: "$92.40", d: "+6%", up: true }, { v: "1.28 kg", d: "-.3%", up: false }, { v: "5", d: "-1%", up: true }],
    [{ v: "$99.10", d: "+12%", up: true }, { v: "1.41 kg", d: "+.8%", up: true }, { v: "9", d: "+4%", up: false }],
  ];
  const LABELS = ["Costo promedio", "Peso promedio", "Envíos con sobrepeso"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % SNAPS.length), 2800);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const items = SNAPS[i];
  return (
    <div className="rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)", fontFamily: MANROPE }}>
      <p className="text-[15px] font-bold text-black" style={{ marginBottom: 16 }}>Costo y peso promedio</p>
      <div className="grid grid-cols-3 overflow-hidden rounded-[14px] border border-black/[0.06]">
        {items.map((it, idx) => (
          <div key={LABELS[idx]} className="px-4 py-4" style={{ borderLeft: idx > 0 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
            <p className="text-[12px] text-black/55" style={{ marginBottom: 14, lineHeight: 1.3 }}>{LABELS[idx]}</p>
            <div key={`${i}-${idx}`} className="flex flex-wrap items-center gap-1.5" style={{ animation: "countBump 0.45s ease-out" }}>
              <span className="font-sora text-[22px] font-light text-black" style={{ letterSpacing: "-0.02em" }}>{it.v}</span>
              <span className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold" style={{ background: it.up ? "rgba(34,197,94,0.14)" : "rgba(219,59,43,0.12)", color: it.up ? "#16A34A" : "#DB3B2B" }}>{it.d}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Panel "Envíos por día de entrega" — donut + leyenda, data que va cambiando */
function DiaEntregaDonut() {
  const COLORS = ["#7CE0B4", "#EA6A2B", "#DDB85F", "#5A81E6", "#3BA152"];
  const NAMES = ["1 día", "2 días", "3 días", "4 días", "5 días"];
  const SNAPS = [
    { counts: [11, 48, 79, 37, 1], prom: "2.5" },
    { counts: [16, 52, 68, 30, 2], prom: "2.3" },
    { counts: [8, 41, 86, 44, 3], prom: "2.7" },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % SNAPS.length), 2800);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const snap = SNAPS[i];
  const total = snap.counts.reduce((s, c) => s + c, 0);
  const r = 52;
  const C = 2 * Math.PI * r;
  let acc = 0;
  const slices = snap.counts.map((count) => {
    const dash = (count / total) * C;
    const seg = { dash, offset: -((acc / total) * C) };
    acc += count;
    return seg;
  });
  return (
    <div className="rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)", fontFamily: MANROPE }}>
      <p className="text-[15px] font-bold text-black" style={{ marginBottom: 16 }}>Envíos por día de entrega</p>
      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          <svg key={i} className="donut-in" width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="16" />
            <g transform="rotate(-90 70 70)">
              {slices.map((s, idx) => (
                <circle key={idx} cx="70" cy="70" r={r} fill="none" stroke={COLORS[idx]} strokeWidth="16" strokeLinecap="butt" strokeDasharray={`${s.dash} ${C - s.dash}`} strokeDashoffset={s.offset} />
              ))}
            </g>
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span key={i} className="font-sora text-[26px] font-light text-black" style={{ lineHeight: 1, animation: "countBump 0.45s ease-out" }}>{total}</span>
            <span className="text-[10px] text-black/45" style={{ marginTop: 3 }}>promedio {snap.prom} días</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2.5">
          {snap.counts.map((count, idx) => (
            <div key={NAMES[idx]} className="flex items-center gap-2.5">
              <span className="h-[10px] w-[10px] shrink-0 rounded-full" style={{ background: COLORS[idx] }} />
              <span className="flex-1 text-[12px] text-black/70">{NAMES[idx]}</span>
              <span key={`${i}-${idx}`} className="w-[28px] text-right text-[12px] font-semibold text-black/80" style={{ animation: "countBump 0.45s ease-out" }}>{count}</span>
              <span className="w-[40px] text-right text-[12px] text-black/45">{Math.round((count / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Chips del explorador — mismas 3 vistas que la reportería real de la plataforma */
const REPORTS = [
  { key: "general", tab: "General", note: "El panorama de tu operación: cuántos envías, cuántos llegan a tiempo, cuánto pagas en promedio y qué paquetería te rinde mejor, con mapa por estado.", Panel: ReporteGeneral },
  { key: "tiempo-real", tab: "Tiempo real", note: "Lo que está pasando ahora: dónde va cada envío y qué incidencias necesitan que actúes hoy.", Panel: ReporteTiempoReal },
  { key: "incidencias", tab: "Incidencias y retornos", note: "Por qué fallan tus envíos: causas principales de incidencias y retornos, y cómo vas contra el periodo anterior.", Panel: ReporteIncidencias },
];

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
      <section className="relative flex items-center overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-20 tablet:pb-10 tablet:h-[660px]">
        <HeroBackground fade={false} />
        <div className="relative z-10 mx-auto w-full max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-12 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] tablet:gap-16">
            {/* Copy */}
            <div>
              <h1 className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[56px]" style={{ lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 22 }}>
                Entiende el desempeño de{" "}
                <span className="relative inline-block">
                  tus envíos
                  
                </span>.
              </h1>
              <p className="font-inter text-[16px] font-light text-white/70 tablet:text-[19px]" style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}>
                Revisa costos, tiempos de entrega, estados e incidencias por paquetería, zona o periodo desde el administrador.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SIGNUP_URL} className="inline-flex items-center rounded-full bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                  Ver mis reportes
                </a>
              </div>
            </div>

            {/* Dashboard — cards glass en responsive */}
            <ReportesGlassCards className="tablet:hidden" />
            {/* Dashboard — cards glass desktop, sobre el gráfico 3D */}
            <div className="relative hidden tablet:block">
              <div aria-hidden className="pointer-events-none absolute -inset-6 rounded-[28px]" style={{ background: "radial-gradient(circle at 70% 20%, rgba(219,59,43,0.18) 0%, transparent 62%)", filter: "blur(32px)" }} />
              {/* Gráfico 3D detrás de las cards */}
              <Image src="/img/graficas-reportes.png" alt="" width={1254} height={1059} priority className="pointer-events-none absolute z-0 object-contain" style={{ right: "6%", top: "-22%", width: "78%", height: "auto", filter: "drop-shadow(0 24px 50px rgba(0,0,0,0.5))" }} />
              <div className="relative z-10 tablet:-translate-x-24">
                <ReportesGlassCards stagger />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ STATEMENT — por qué medir ════════════ */}
      <section className="relative bg-white px-5 pt-24 pb-12 tablet:px-10 tablet:pt-32 tablet:pb-16" data-modal-animate>
        <div className="mx-auto max-w-[1000px] text-center">
          <h2 className="font-sora text-[26px] font-light text-black tablet:text-[36px] lg:whitespace-nowrap lg:text-[42px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 16 }}>
            No todos los envíos cuestan ni funcionan igual.
          </h2>
          <p className="mx-auto font-inter text-[16px] font-light text-black/60 tablet:text-[18px] lg:whitespace-nowrap" style={{ lineHeight: 1.55 }}>
            Con reportes logísticos puedes comparar y ajustar tu operación con datos.
          </p>
        </div>
      </section>

      {/* ════════════ INTERACTIVE REPORT EXPLORER ════════════ */}
      <section className="relative bg-white px-5 pt-12 pb-24 tablet:px-10 tablet:pt-16 tablet:pb-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[900px] text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[38px] lg:text-[46px] lg:whitespace-nowrap" style={{ letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 14 }}>
              Mide, compara y mejora tus envíos.
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Cambia de reporte y compara tus paqueterías al instante.
            </p>
          </div>

          {/* Tabs */}
          <div data-modal-animate className="-mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-1 tablet:mx-0 tablet:flex-wrap tablet:justify-center tablet:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {REPORTS.map((r, i) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setTab(i)}
                className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 font-inter text-[13px] font-semibold transition-all duration-150 ${tab === i ? "bg-[#111111] text-white" : "bg-black/[0.04] text-black/60 hover:bg-black/[0.08]"}`}
              >
                {r.tab}
              </button>
            ))}
          </div>

          {/* Panel del reporte activo */}
          <p key={`${active.key}-note`} className="mx-auto mb-5 max-w-[640px] text-center lg:max-w-none lg:whitespace-nowrap font-inter text-[14px] font-light text-black/60 tablet:text-[15px]" style={{ lineHeight: 1.55, animation: "fadeSlideIn 0.4s ease-out both" }}>{active.note}</p>
          <div data-modal-animate className="mx-auto max-w-[1000px] overflow-hidden rounded-[20px] border border-black/[0.07] bg-[#FAFAFA]" style={{ padding: 16, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
            <div className="flex items-center justify-between px-1" style={{ marginBottom: 12, fontFamily: MANROPE }}>
              <p className="text-[16px] font-semibold text-black/85 tablet:text-[18px]">{active.tab === "Tiempo real" ? "En tiempo real" : active.tab}</p>
              <span className="flex items-center gap-1.5 rounded-full bg-black/[0.04] px-3 py-1.5 text-[11px] font-semibold text-black/55">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 3v12M12 15l-4-4M12 15l4-4M5 21h14" stroke="rgba(0,0,0,0.45)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Exportar
              </span>
            </div>
            {/* Misma altura para los 3 reportes (móvil y desktop) */}
            <div key={active.key} className="h-[604px] tablet:h-[568px]" style={{ animation: "fadeSlideIn 0.45s ease-out both" }}>
              <active.Panel />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ SPLIT — tendencia de entregas ════════════ */}
      <section className="relative bg-[#FBFBFB] px-5 py-24 tablet:px-10 tablet:py-32" data-modal-animate>
        <div className="mx-auto flex max-w-[var(--max-w)] items-center">
          <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
            {/* Panel — costo/peso promedio + envíos por día de entrega */}
            <div className="order-2 flex flex-col gap-4 tablet:order-1">
              <CostoPesoCard />
              <DiaEntregaDonut />
            </div>

            <div className="order-1 tablet:order-2">
              <h2 className="font-sora text-[28px] font-light text-black tablet:text-[40px] lg:text-[46px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 18 }}>
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
              <h2 className="font-sora text-[32px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 16, maxWidth: 420 }}>
                Todo lo que puedes medir en el administrador
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
                  <div key={c.title} className="medir-card flex w-[240px] shrink-0 snap-start flex-col rounded-[20px] border border-black/[0.07] bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                    <div className="flex h-[30px] w-[30px] items-center justify-center" style={{ marginBottom: 18 }}>{c.icon}</div>
                    <h3 className="font-sora text-[19px] font-normal text-black" style={{ marginBottom: 8 }}>{c.title}</h3>
                    <p className="font-inter text-[14px] font-light text-black/55" style={{ lineHeight: 1.55, minHeight: 63 }}>{c.desc}</p>
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
      <T1FAQSection
        faqs={[
          { q: "¿Qué puedo medir en los reportes?", a: "Tiempos de entrega, % a tiempo, costos por envío y desempeño de cada paquetería, con cortes por fecha, zona, estado y tipo de servicio." },
          { q: "¿Los datos se actualizan solos?", a: "Sí. Los reportes se alimentan del estatus real de tus guías en todas las paqueterías conectadas, sin captura manual." },
          { q: "¿Puedo comparar paqueterías?", a: "Sí. El explorador te deja cambiar de indicador y ver lado a lado a tus carriers por velocidad, costo y cumplimiento." },
          { q: "¿Puedo exportar la información?", a: "Sí. Descargas cualquier reporte en CSV o Excel para compartirlo con tu equipo o integrarlo a tus propios tableros." },
          { q: "¿Tiene costo adicional?", a: "No. Los reportes logísticos vienen incluidos en T1 Envíos." },
        ]}
      />

      <T1FinalCTA
        title="Convierte tus envíos en decisiones"
        description="Mide tiempos, costos y paqueterías en el administrador y mejora tu logística con datos reales."
        buttonLabel="Ver mis reportes"
      />
    </div>
  );
}
