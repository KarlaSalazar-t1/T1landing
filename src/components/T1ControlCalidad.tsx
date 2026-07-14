"use client";

import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import T1FinalCTA from "@/components/T1FinalCTA";

const MANROPE = "var(--font-manrope-var), 'Manrope', sans-serif";


/* Hero visual — 2 cards de Incidencias (blanco/negro, con count-up y fade-in) */
function CalidadDashboard() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFrame((f) => f + 1), 100);
    return () => clearInterval(id);
  }, []);

  // Cada ciclo los números cuentan hacia arriba; la tasa oscila levemente para verse "en vivo".
  const CYCLE = 64;
  const phase = frame % CYCLE;
  const fillP = Math.min(1, phase / 12);
  const accion = Math.round(2 * fillP);
  const rateVal = fillP < 1 ? 7.21 * fillP : 7.21 + 0.04 * Math.sin(frame / 3);
  const rate = rateVal.toFixed(2);

  return (
    <div className="relative mx-auto flex w-full flex-col gap-4" style={{ maxWidth: 460, fontFamily: MANROPE }}>
      {/* Card 1 — Requiere acción */}
      <div
        className="rounded-[18px] border border-black/[0.08] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]"
        style={{ padding: 26, boxShadow: "0 16px 50px rgba(0,0,0,0.18)", animation: "rastreoReveal 0.5s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
          <p className="text-[15px] font-semibold text-black">Requiere acción</p>
          <span className="flex items-center gap-1.5 text-[10px] text-black/40">
            <span className="h-[6px] w-[6px] rounded-full bg-[#F59E0B]" style={{ animation: "pulse-soft 1.6s ease-in-out infinite" }} />
            en revisión
          </span>
        </div>
        <p className="font-sora text-[44px] font-light text-black tabular-nums" style={{ lineHeight: 1, marginBottom: 12 }}>{accion}</p>
        <p className="text-[13px] font-light text-black/55" style={{ lineHeight: 1.5 }}>
          Incidencias que requieren tomes una decisión para continuar el proceso.
        </p>
      </div>

      {/* Card 2 — Tasa de incidencias */}
      <div
        className="rounded-[18px] border border-black/[0.08] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]"
        style={{ padding: 26, boxShadow: "0 16px 50px rgba(0,0,0,0.18)", animation: "rastreoReveal 0.5s cubic-bezier(0.16,1,0.3,1) both", animationDelay: "0.12s" }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
          <p className="text-[15px] font-semibold text-black">Tasa de incidencias</p>
          <span className="flex items-center gap-1.5 text-[10px] text-black/40">
            <span className="h-[6px] w-[6px] rounded-full bg-[#DB3B2B]" style={{ animation: "pulse-soft 1.6s ease-in-out infinite" }} />
            en vivo
          </span>
        </div>
        <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
          <p className="font-sora text-[44px] font-light text-black tabular-nums" style={{ lineHeight: 1 }}>{rate}%</p>
          <span
            className="rounded-full bg-[rgba(219,59,43,0.10)] px-2.5 py-1 text-[12px] font-semibold text-[#DB3B2B]"
            style={{ animation: "rastreoReveal 0.4s ease both", animationDelay: "0.5s" }}
          >
            +7.2%
          </span>
        </div>
        <p className="text-[13px] font-light text-black/55" style={{ lineHeight: 1.5 }}>30 / 416 envíos en los últimos 31 días</p>
      </div>
    </div>
  );
}

const STEPS = [
  { n: "01", title: "Monitorea cada guía 24/7", desc: "T1 sincroniza el estatus de todas tus paqueterías y vigila el avance de cada envío en tiempo real." },
  { n: "02", title: "Detecta demoras y anomalías", desc: "Compara contra el tiempo prometido y marca de inmediato lo que se sale de lo normal." },
  { n: "03", title: "Abre y clasifica la incidencia", desc: "Genera el caso automáticamente, lo etiqueta por tipo y prioridad, sin que muevas un dedo." },
  { n: "04", title: "Da seguimiento hasta resolver", desc: "Un equipo dedicado escala con la paquetería y mantiene a tu cliente informado." },
];

/* Detalle de envío + Historial de actividad (fade-in sencillo) */
function EnvioDetalle({ className = "" }: { className?: string }) {
  const FIELDS = [
    ["Servicio", "UPS SAVER (65) Express"],
    ["Costo", "$1405.44260"],
    ["Fecha de creación", "10/06/2026"],
    ["Fecha estimada de entrega", "-"],
    ["Cantidad de paquetes", "1"],
    ["Paquete", "67 x 67 x 22 cm"],
    ["Peso total", "19.7516 kg"],
  ];
  return (
    <div className={`flex flex-col gap-4 ${className}`} style={{ fontFamily: MANROPE }}>
      {/* Card 1 — Detalle de envío */}
      <div
        className="rounded-[18px] border border-black/[0.07] bg-white transition-all duration-300 hover:shadow-[0_18px_44px_rgba(0,0,0,0.10)]"
        style={{ padding: 24, boxShadow: "0 16px 50px rgba(0,0,0,0.08)", animation: "rastreoReveal 0.5s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        <p className="text-[16px] font-semibold text-black" style={{ marginBottom: 18 }}>Detalle de envío</p>
        <div className="flex items-start gap-4" style={{ marginBottom: 18 }}>
          <img src="/img/carriers/ups.svg" alt="UPS" width={44} height={44} className="h-[44px] w-[44px] shrink-0 object-contain" style={{ animation: "float-slow 3s ease-in-out infinite", filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.12))" }} />
          <div>
            <p className="text-[12px] text-black/45" style={{ marginBottom: 2 }}>Guía</p>
            <p className="text-[14px] font-semibold text-black">1Z117W7K0421637199</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {FIELDS.map(([l, v]) => (
            <div key={l}>
              <p className="text-[12px] text-black/45" style={{ marginBottom: 2 }}>{l}</p>
              <p className="text-[13px] text-black/80">{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Card 2 — Historial de Actividad */}
      <div
        className="rounded-[18px] border border-black/[0.07] bg-white transition-all duration-300 hover:shadow-[0_18px_44px_rgba(0,0,0,0.10)]"
        style={{ padding: 24, boxShadow: "0 16px 50px rgba(0,0,0,0.08)", animation: "rastreoReveal 0.5s cubic-bezier(0.16,1,0.3,1) both", animationDelay: "0.12s" }}
      >
        <p className="text-[16px] font-semibold text-black" style={{ marginBottom: 18 }}>Historial de Actividad</p>
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[#16A34A]" style={{ animation: "pulse-soft 2s ease-in-out infinite" }}>
            <svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M5 3l5 5-5 5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] text-black/80">Incidencia creada por cancelación de guía</p>
            <p className="text-[12px] text-black/45" style={{ marginTop: 2 }}>Creada</p>
            <p className="text-[11px] text-black/35" style={{ marginTop: 2 }}>18/06/2026 12:12 PM</p>
          </div>
          <span className="shrink-0 whitespace-nowrap text-[11px] text-black/40">18 jun · 12:12 PM</span>
        </div>
      </div>
    </div>
  );
}

/* Marco de teléfono reutilizable (bordes redondeados) — SOLO responsive */
function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full" style={{ maxWidth: 340, fontFamily: MANROPE }}>
      <div className="relative overflow-hidden bg-white" style={{ borderRadius: 44, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}>
        <div className="px-5 pt-6 pb-7">{children}</div>
      </div>
    </div>
  );
}

/* Mockup "Incidencias" — SOLO responsive */
function IncidenciasPhone({ className = "" }: { className?: string }) {
  const BR = "#C0453A";
  const CHIPS = ["Paquetería", "Fecha", "Estado incidencia", "Situación de entrega"];
  const ROWS = [
    { id: "INC-00103", guide: "77452320977452", carrier: "FedEx", estado: "Requiere acción", warn: true, sit: "Acceso restringido" },
    { id: "INC-00120", guide: "77452320977452", carrier: "99 Minutos", estado: "En proceso", warn: false, sit: "Dirección incorrecta" },
  ];
  const cols = "1.2fr 0.95fr 1fr";
  return (
    <div className={className}>
      <PhoneShell>
        {/* Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
          <h4 className="text-[22px] font-bold text-black" style={{ letterSpacing: "-0.5px" }}>Incidencias</h4>
          <span className="rounded-[11px] px-3.5 py-2 text-[12px] font-semibold text-white" style={{ background: BR }}>Reportar incidencia</span>
        </div>
        <p className="text-[13px] font-light text-black/55" style={{ lineHeight: 1.45, marginBottom: 16 }}>
          Soluciona incidencias de entrega rápidamente y centraliza el seguimiento de todos tus envíos.
        </p>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-2.5" style={{ marginBottom: 14 }}>
          <div className="rounded-[13px] border border-black/[0.08] px-3.5 py-3">
            <p className="text-[12px] font-semibold text-black/70">Requiere acción</p>
            <p className="font-sora text-[30px] font-light text-black" style={{ lineHeight: 1.15 }}>4</p>
            <p className="text-[10px] text-black/45" style={{ lineHeight: 1.3 }}>Incidencias que requieren una decisión.</p>
          </div>
          <div className="rounded-[13px] border border-black/[0.08] px-3.5 py-3">
            <p className="text-[12px] font-semibold text-black/70">Tasa de incidencias</p>
            <div className="flex items-center gap-1.5">
              <p className="font-sora text-[24px] font-light text-black" style={{ lineHeight: 1.15 }}>1.02%</p>
              <span className="rounded-full bg-[rgba(219,59,43,0.10)] px-1.5 py-0.5 text-[10px] font-semibold text-[#DB3B2B]">+2.1%</span>
            </div>
            <p className="text-[10px] text-black/45">148 / 3,452 envíos · 30 días</p>
          </div>
        </div>

        {/* Búsqueda */}
        <div className="flex items-center gap-2 rounded-[12px] border border-black/[0.12] px-3.5 py-3" style={{ marginBottom: 12 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="rgba(0,0,0,0.35)" strokeWidth="1.8" /><path d="M21 21l-4.3-4.3" stroke="rgba(0,0,0,0.35)" strokeWidth="1.8" strokeLinecap="round" /></svg>
          <span className="text-[13px] text-black/40">Búsqueda</span>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2" style={{ marginBottom: 14 }}>
          {CHIPS.map((f) => (
            <span key={f} className="flex items-center gap-1 rounded-[9px] border border-black/[0.12] px-2.5 py-1.5 text-[11px] text-black/65">
              {f}
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="rgba(0,0,0,0.4)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          ))}
        </div>

        {/* Tabla */}
        <div className="overflow-hidden rounded-[12px] border border-black/[0.08]">
          <div className="grid gap-2 bg-[#FAFAF9] px-3 py-2.5" style={{ gridTemplateColumns: cols }}>
            <span className="text-[11px] font-medium text-black/50">Guía</span>
            <span className="text-[11px] font-medium text-black/50">Estado</span>
            <span className="text-[11px] font-medium text-black/50">Situación</span>
          </div>
          {ROWS.map((r, i) => (
            <div key={i} className="grid items-center gap-2 px-3 py-3" style={{ gridTemplateColumns: cols, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="min-w-0">
                <p className="truncate text-[12px] font-bold text-black">{r.id}</p>
                <p className="truncate text-[10px] text-black/45">{r.guide} · {r.carrier}</p>
              </div>
              <span className={`justify-self-start rounded-full px-2 py-0.5 text-[10px] font-semibold ${r.warn ? "bg-[rgba(219,59,43,0.10)] text-[#DB3B2B]" : "bg-black/[0.06] text-black/55"}`}>{r.estado}</span>
              <span className="text-[11px] text-black/60">{r.sit}</span>
            </div>
          ))}
        </div>
      </PhoneShell>
    </div>
  );
}

/* Mockup "Detalle de envío + Historial" — SOLO responsive */
function DetallePhone({ className = "" }: { className?: string }) {
  const FIELDS = [
    ["Servicio", "UPS SAVER (65) Express"],
    ["Costo", "$1405.44260"],
    ["Fecha de creación", "10/06/2026"],
    ["Fecha estimada de entrega", "-"],
    ["Cantidad de paquetes", "1"],
    ["Paquete", "67 x 67 x 22 cm"],
    ["Peso total", "19.7516 kg"],
  ];
  return (
    <div className={className}>
      <PhoneShell>
        {/* Card 1 — Detalle de envío */}
        <div className="rounded-[16px] border border-black/[0.08] bg-white" style={{ padding: 18, boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>
          <p className="text-[18px] font-semibold text-black" style={{ marginBottom: 16 }}>Detalle de envío</p>
          <div className="flex items-start gap-3" style={{ marginBottom: 16 }}>
            <img src="/img/carriers/ups.svg" alt="UPS" width={48} height={48} className="h-[48px] w-[48px] shrink-0" />
            <div>
              <p className="text-[13px] text-black/45" style={{ marginBottom: 2 }}>Guía</p>
              <p className="text-[15px] font-semibold text-black">1Z117W7K0421637199</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-4">
            {FIELDS.map(([l, v]) => (
              <div key={l}>
                <p className="text-[12px] text-black/45" style={{ marginBottom: 2 }}>{l}</p>
                <p className="text-[13.5px] text-black/80">{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2 — Historial de Actividad */}
        <div className="rounded-[16px] border border-black/[0.08] bg-white" style={{ padding: 18, marginTop: 16, boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>
          <p className="text-[18px] font-semibold text-black" style={{ marginBottom: 16 }}>Historial de Actividad</p>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(34,197,94,0.15)" }}>
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M5 3l5 5-5 5" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] text-black/80">Incidencia creada por cancelación de guía</p>
              <p className="text-[12px] text-black/45" style={{ marginTop: 2 }}>Creada</p>
              <p className="text-[11px] text-black/35" style={{ marginTop: 2 }}>18/06/2026 12:12 PM</p>
            </div>
            <span className="shrink-0 whitespace-nowrap text-[11px] text-black/40">18 jun · 12:12 PM</span>
          </div>
        </div>
      </PhoneShell>
    </div>
  );
}

export default function T1ControlCalidad() {
  const rootRef = useRef<HTMLDivElement>(null);

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
    <div ref={rootRef} className="w-full" style={{ ["--max-w" as string]: "1220px" }}>
      {/* ════════════ HERO — asymmetric: copy left, score dashboard right ════════════ */}
      <section className="relative flex items-center overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-20 tablet:pb-10 tablet:h-[660px]" style={{ background: "linear-gradient(135deg, #261515 0%, #1A0A0A 40%, #261515 100%)" }}>
        <div className="relative mx-auto w-full max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-12 tablet:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] tablet:gap-16">
            {/* Copy */}
            <div>
              <h1 className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[56px]" style={{ lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 22 }}>
                Anticípate a las incidencias de<br />
                <span className="relative inline-block">
                  tus envíos
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.35)", borderRadius: 5, zIndex: -1 }} />
                </span>.
              </h1>
              <p className="font-inter text-[16px] font-light text-white/70 tablet:text-[19px]" style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 470 }}>
                Controla tus envíos y anticipa cualquier incidencia.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SIGNUP_URL} className="inline-flex items-center rounded-full bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                  Activar control de calidad
                </a>
              </div>
            </div>

            {/* Hero visual — monitor de calidad */}
            <CalidadDashboard />
          </div>
        </div>
      </section>

      {/* ════════════ CARRIER SCORECARD ════════════ */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 gap-12 tablet:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] tablet:gap-16 tablet:items-center">
            <div data-modal-animate>
              <h2 className="font-sora text-[28px] font-light text-black tablet:text-[38px] lg:text-[46px]" style={{ letterSpacing: "-1.3px", lineHeight: 1.1, marginBottom: 18 }}>
                Convierte incidencias en mejoras.
              </h2>
              <p className="font-inter text-[15px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                Optimiza tus envíos con cada incidencia.
              </p>
              <ul className="flex flex-col gap-2.5">
                {["Ranking por desempeño real, actualizado solo", "% a tiempo y tasa de reclamos por paquetería", "Decide a quién enviar según resultados"].map((it) => (
                  <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {it}
                  </li>
                ))}
              </ul>
            </div>

            {/* Incidencias — teléfono en responsive */}
            <IncidenciasPhone className="tablet:hidden" />
            {/* Incidencias panel — desktop */}
            <div data-modal-animate className="hidden overflow-hidden rounded-[20px] border border-black/[0.07] bg-white tablet:block" style={{ boxShadow: "0 16px 50px rgba(0,0,0,0.08)", fontFamily: MANROPE, padding: 18 }}>
              {/* Header */}
              <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                <p className="text-[16px] font-bold text-black">Incidencias</p>
                <span className="rounded-[10px] bg-[#DB3B2B] px-3 py-1.5 text-[11px] font-semibold text-white">Reportar incidencia</span>
              </div>
              <p className="text-[11px] font-light text-black/55" style={{ marginBottom: 14, lineHeight: 1.45 }}>
                Soluciona incidencias de entrega rápidamente y centraliza el seguimiento de todos tus envíos.
              </p>

              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-3" style={{ marginBottom: 12 }}>
                <div className="rounded-[12px] border border-black/[0.07] px-3.5 py-3" style={{ animation: "float-slow 3s ease-in-out infinite" }}>
                  <p className="text-[11px] font-semibold text-black/70">Requiere acción</p>
                  <p className="font-sora text-[26px] font-light text-black" style={{ lineHeight: 1.15 }}>4</p>
                  <p className="text-[9px] text-black/45" style={{ lineHeight: 1.3 }}>Incidencias que requieren una decisión.</p>
                </div>
                <div className="rounded-[12px] border border-black/[0.07] px-3.5 py-3" style={{ animation: "float-slow 3s ease-in-out infinite", animationDelay: "1.5s" }}>
                  <p className="text-[11px] font-semibold text-black/70">Tasa de incidencias</p>
                  <div className="flex items-center gap-1.5">
                    <p className="font-sora text-[26px] font-light text-black" style={{ lineHeight: 1.15 }}>1.02%</p>
                    <span className="rounded-full bg-[rgba(219,59,43,0.10)] px-1.5 py-0.5 text-[9px] font-semibold text-[#DB3B2B]">+2.1%</span>
                  </div>
                  <p className="text-[9px] text-black/45">148 / 3,452 envíos · 30 días</p>
                </div>
              </div>

              {/* Search */}
              <div className="flex items-center gap-2 rounded-[10px] border border-black/[0.1] px-3 py-2" style={{ marginBottom: 10 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="rgba(0,0,0,0.35)" strokeWidth="1.8" /><path d="M21 21l-4.3-4.3" stroke="rgba(0,0,0,0.35)" strokeWidth="1.8" strokeLinecap="round" /></svg>
                <span className="text-[11px] text-black/40">Búsqueda</span>
              </div>

              {/* Filter chips */}
              <div className="flex flex-wrap gap-1.5" style={{ marginBottom: 12 }}>
                {["Paquetería", "Fecha", "Estado incidencia", "Situación de entrega"].map((f) => (
                  <span key={f} className="flex items-center gap-1 rounded-[8px] border border-black/[0.1] px-2 py-1 text-[10px] text-black/60">
                    {f}
                    <svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="rgba(0,0,0,0.4)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                ))}
              </div>

              {/* Table */}
              <div className="overflow-hidden rounded-[10px] border border-black/[0.06]">
                <div className="grid gap-2 bg-[#FAFAF9] px-3 py-2" style={{ gridTemplateColumns: "1.3fr 1fr 1.1fr" }}>
                  <span className="text-[10px] font-medium text-black/50">Guía</span>
                  <span className="text-[10px] font-medium text-black/50">Estado</span>
                  <span className="text-[10px] font-medium text-black/50">Situación de entrega</span>
                </div>
                {[
                  { id: "INC-00103", guide: "77452320977452", carrier: "FedEx", estado: "Requiere acción", warn: true, sit: "Acceso restringido" },
                  { id: "INC-00120", guide: "77452320977452", carrier: "99 Minutos", estado: "En proceso", warn: false, sit: "Dirección incorrecta" },
                ].map((r, i, arr) => (
                  <div key={i} className="grid items-center gap-2 px-3 py-2.5 transition-colors duration-150 hover:bg-[#FAFAF9]" style={{ gridTemplateColumns: "1.3fr 1fr 1.1fr", borderBottom: i < arr.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-semibold text-black">{r.id}</p>
                      <p className="truncate text-[9px] text-black/45">{r.guide} · {r.carrier}</p>
                    </div>
                    <span className={`justify-self-start rounded-full px-2 py-0.5 text-[9px] font-semibold ${r.warn ? "bg-[rgba(219,59,43,0.10)] text-[#DB3B2B]" : "bg-black/[0.06] text-black/55"}`}>{r.estado}</span>
                    <span className="truncate text-[10px] text-black/60">{r.sit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ VERTICAL STEPPER ════════════ */}
      <section className="relative px-5 py-24 tablet:px-10 tablet:py-32" style={{ background: "linear-gradient(135deg, #261515 0%, #1A0A0A 40%, #261515 100%)" }}>
        <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 h-[360px] w-[680px] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(ellipse at center, rgba(219,59,43,0.12) 0%, transparent 64%)", filter: "blur(44px)" }} />
        <div className="relative mx-auto max-w-[760px]">
          <div data-modal-animate className="text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[40px] lg:text-[46px]" style={{ letterSpacing: "-1.3px", lineHeight: 1.1, marginBottom: 14 }}>
              ¿Cómo cuidamos cada envío?
            </h2>
            <p className="font-inter text-[16px] font-light text-white/55 tablet:text-[18px]" style={{ lineHeight: 1.5 }}>
              Un proceso que corre solo, de la recolección a la entrega.
            </p>
          </div>
          <div className="relative">
            <div aria-hidden className="absolute left-[19px] top-2 bottom-2 w-px" style={{ background: "linear-gradient(180deg, rgba(219,59,43,0.5) 0%, rgba(255,255,255,0.08) 100%)" }} />
            <div className="flex flex-col gap-8">
              {STEPS.map((s, i) => (
                <div key={s.n} data-modal-animate data-stagger className="relative flex gap-5" style={{ ["--i" as string]: i }}>
                  <div className="relative z-10 flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#161616]">
                    <span className="font-sora text-[14px] font-light text-[#FF6F5E]">{s.n}</span>
                  </div>
                  <div className="flex-1 rounded-[16px] border border-white/[0.08] bg-white/[0.03] px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05]">
                    <h3 className="font-sora text-[18px] font-normal text-white tablet:text-[20px]" style={{ marginBottom: 6 }}>{s.title}</h3>
                    <p className="font-inter text-[14px] font-light text-white/60" style={{ lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ SPLIT FEATURE — incidencias automáticas ════════════ */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32" data-modal-animate>
        <div className="mx-auto flex max-w-[var(--max-w)] items-center">
          <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
            {/* Panel — teléfono en responsive, tarjetas en desktop */}
            <DetallePhone className="order-2 tablet:hidden" />
            <div className="order-2 hidden tablet:order-1 tablet:block">
              <EnvioDetalle />
            </div>

            <div className="order-1 tablet:order-2">
              <h2 className="font-sora text-[28px] font-light text-black tablet:text-[40px] lg:text-[46px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                Resuelve incidencias más rápido.
              </h2>
              <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                T1 abre, gestiona y resuelve incidencias con la paquetería por ti.
              </p>
              <ul className="flex flex-col gap-2.5">
                {["Detección automática de envíos detenidos", "Incidencias clasificadas por tipo y prioridad", "Seguimiento con la paquetería de tu parte"].map((it) => (
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


      {/* ════════════ FAQ — estilo t1.com/mx/tienda ════════════ */}
      <section className="relative bg-black px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[760px]">
          <div className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[36px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>
              Preguntas frecuentes
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { q: "¿Cómo detecta T1 un problema de entrega?", a: "Compara el avance real de cada guía contra el tiempo prometido por la paquetería. Cuando un envío se detiene o se sale de lo esperado, lo marca y abre una incidencia automáticamente." },
              { q: "¿Qué pasa cuando se abre una incidencia?", a: "Se clasifica por tipo y prioridad, y un equipo de T1 da seguimiento con la paquetería hasta resolverla. Tú ves el avance sin tener que perseguir al carrier." },
              { q: "¿Cómo se calcula el score de cada paquetería?", a: "Con tu operación real: porcentaje de entregas a tiempo, tasa de reclamos e incidencias. El ranking se actualiza solo conforme llegan los resultados." },
              { q: "¿Mi cliente se entera de las demoras?", a: "Sí. Puedes activar avisos automáticos para que tu comprador reciba novedades del envío antes de tener que preguntar." },
              { q: "¿Necesito configurar algo?", a: "No. El control de calidad viene incluido en T1 Envíos y empieza a vigilar tus guías en cuanto las generas o las importas." },
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
        title="Anticípate a las incidencias."
        description="Activa el control de calidad de T1 y resuelve los problemas antes de que se conviertan en un reclamo."
        buttonLabel="Activar control de calidad"
      />
    </div>
  );
}
