"use client";

import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import T1FinalCTA from "@/components/T1FinalCTA";

const MANROPE = "var(--font-manrope-var), 'Manrope', sans-serif";

/* Hero — panel de disputas: 2 stats + motivos de disputa (barras) */
function DisputasDashboard() {
  const MOTIVOS = [
    { name: "No recibido", pct: 38.5, color: "#DB3B2B" },
    { name: "No reconoce cargo", pct: 24.2, color: "#E2685C" },
    { name: "Duplicado", pct: 18.1, color: "#EE9A90" },
    { name: "Producto defectuoso", pct: 12.8, color: "#F2B5AD" },
    { name: "Cancelación tardía", pct: 6.4, color: "#F6CFCA" },
  ];
  const MAX = 38.5;
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 250);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: 420, fontFamily: MANROPE }}>
      <div className="rounded-[20px] border border-black/[0.07] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.18)", animation: "rastreoReveal 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
          <p className="text-[15px] font-bold text-black">Disputas</p>
          <span className="rounded-[10px] bg-[#DB3B2B] px-3 py-1.5 text-[11px] font-semibold text-white">Responder</span>
        </div>
        <div className="grid grid-cols-2 gap-3" style={{ marginBottom: 16 }}>
          <div className="rounded-[12px] border border-black/[0.06] px-3.5 py-3">
            <p className="text-[11px] font-semibold text-black/60">Abiertas</p>
            <p className="font-sora text-[26px] font-light text-black" style={{ lineHeight: 1.1 }}>8</p>
            <p className="text-[10px] text-black/45">Pendientes de respuesta</p>
          </div>
          <div className="rounded-[12px] border border-black/[0.06] px-3.5 py-3">
            <p className="text-[11px] font-semibold text-black/60">Tasa de CB</p>
            <div className="flex items-center gap-1.5">
              <p className="font-sora text-[26px] font-light text-black" style={{ lineHeight: 1.1 }}>0.42%</p>
              <span className="rounded-full bg-[rgba(34,197,94,0.14)] px-1.5 py-0.5 text-[10px] font-semibold text-[#16A34A]">-0.15%</span>
            </div>
            <p className="text-[10px] text-black/45">8 / 1,904 txns · 30 días</p>
          </div>
        </div>
        <p className="text-[12px] font-semibold text-black/70" style={{ marginBottom: 12 }}>Motivos de disputa</p>
        <div className="flex flex-col gap-2.5">
          {MOTIVOS.map((m, i) => (
            <div key={m.name} className="flex items-center gap-3">
              <span className="w-[118px] shrink-0 truncate text-[11px] text-black/70">{m.name}</span>
              <div className="relative h-[9px] flex-1 overflow-hidden rounded-full bg-black/[0.05]">
                <div className="h-full rounded-full" style={{ width: on ? `${(m.pct / MAX) * 100}%` : "0%", background: m.color, transition: "width 1.4s cubic-bezier(0.33,1,0.68,1)", transitionDelay: `${i * 0.1}s` }} />
              </div>
              <span className="w-[42px] shrink-0 text-right text-[11px] font-semibold text-black/75">{m.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Panel — tabla de disputas (desktop) */
function DisputasTable() {
  const ROWS = [
    { id: "DSP-4501", amt: "$3,450.00", motivo: "Producto no recibido", proc: "Stripe", plazo: "5 días", estado: "Abierta", warn: true },
    { id: "DSP-4502", amt: "$1,280.00", motivo: "No reconoce el cargo", proc: "Conekta", plazo: "12 días", estado: "En revisión", warn: false },
    { id: "DSP-4503", amt: "$890.00", motivo: "Duplicado", proc: "OpenPay", plazo: "3 días", estado: "Abierta", warn: true },
    { id: "DSP-4504", amt: "$2,100.00", motivo: "Producto defectuoso", proc: "Stripe", plazo: "—", estado: "Ganada", won: true, warn: false },
  ];
  const cols = "0.9fr 0.85fr 1.2fr 0.9fr 0.7fr 0.85fr";
  return (
    <div className="overflow-hidden rounded-[20px] border border-black/[0.07] bg-white" style={{ boxShadow: "0 16px 50px rgba(0,0,0,0.08)", fontFamily: MANROPE, padding: 18 }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
        <p className="text-[15px] font-bold text-black">Disputas recientes</p>
        <span className="rounded-[10px] bg-[#DB3B2B] px-3 py-1.5 text-[11px] font-semibold text-white">Responder disputa</span>
      </div>
      <div className="grid grid-cols-3 gap-3" style={{ marginBottom: 14 }}>
        {[{ l: "Abiertas", v: "8" }, { l: "Ganadas este mes", v: "12" }, { l: "Monto en disputa", v: "$14,820" }].map((s) => (
          <div key={s.l} className="rounded-[12px] border border-black/[0.06] bg-[#FAFAF9] px-3 py-2.5">
            <p className="font-sora text-[18px] font-light text-black" style={{ lineHeight: 1.1 }}>{s.v}</p>
            <p className="text-[10px] text-black/55">{s.l}</p>
          </div>
        ))}
      </div>
      <div className="overflow-hidden rounded-[12px] border border-black/[0.06]">
        <div className="grid gap-2 bg-[#FAFAF9] px-3 py-2.5" style={{ gridTemplateColumns: cols }}>
          {["Disputa", "Monto", "Motivo", "Procesador", "Plazo", "Estado"].map((h) => (
            <span key={h} className="text-[10px] font-medium text-black/50">{h}</span>
          ))}
        </div>
        {ROWS.map((r, i, arr) => (
          <div key={r.id} className="grid items-center gap-2 px-3 py-2.5" style={{ gridTemplateColumns: cols, borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.05)", background: i === arr.length - 1 ? "transparent" : "transparent" }}>
            <span className="truncate text-[11px] font-semibold text-black">{r.id}</span>
            <span className="text-[11px] text-black/70">{r.amt}</span>
            <span className="truncate text-[11px] text-black/60">{r.motivo}</span>
            <span className="text-[11px] text-black/60">{r.proc}</span>
            <span className="text-[11px] text-black/55">{r.plazo}</span>
            <span className={`justify-self-start rounded-full px-2 py-0.5 text-[10px] font-semibold ${r.won ? "bg-[rgba(34,197,94,0.12)] text-[#16A34A]" : r.warn ? "bg-[rgba(219,59,43,0.10)] text-[#DB3B2B]" : "bg-black/[0.06] text-black/55"}`}>{r.estado}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Panel — detalle de disputa + evidencia + historial */
function EvidenciaPanel() {
  const FIELDS = [
    ["Monto", "$3,450.00"],
    ["Procesador", "Stripe"],
    ["Motivo", "Producto no recibido"],
    ["Plazo", "5 días"],
  ];
  const FILES = [
    ["comprobante-entrega.pdf", "245 KB"],
    ["factura-venta.pdf", "128 KB"],
    ["captura-tracking.png", "890 KB"],
  ];
  const HIST = [
    ["Disputa recibida del procesador", "28/06 · 09:14"],
    ["Evidencia enviada automáticamente", "28/06 · 09:16"],
    ["En revisión por el banco emisor", "29/06 · 14:30"],
  ];
  return (
    <div className="rounded-[20px] border border-black/[0.07] bg-white" style={{ padding: 20, boxShadow: "0 16px 50px rgba(0,0,0,0.08)", fontFamily: MANROPE }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
        <p className="text-[15px] font-bold text-black">DSP-4501</p>
        <span className="rounded-full bg-[rgba(219,59,43,0.10)] px-2.5 py-1 text-[11px] font-semibold text-[#DB3B2B]">Abierta · 5 días</span>
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-3.5" style={{ marginBottom: 16 }}>
        {FIELDS.map(([l, v]) => (
          <div key={l}>
            <p className="text-[11px] text-black/45">{l}</p>
            <p className="text-[13px] font-medium text-black/80">{v}</p>
          </div>
        ))}
      </div>
      <p className="text-[12px] font-semibold text-black/70" style={{ marginBottom: 8 }}>Evidencia adjunta</p>
      <div className="flex flex-col gap-2" style={{ marginBottom: 16 }}>
        {FILES.map(([n, s]) => (
          <div key={n} className="flex items-center gap-2.5 rounded-[10px] border border-black/[0.07] bg-[#FAFAF9] px-3 py-2">
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[6px] bg-[#DB3B2B] text-[8px] font-bold text-white">{n.endsWith(".png") ? "IMG" : "PDF"}</span>
            <span className="flex-1 truncate text-[11px] text-black/75">{n}</span>
            <span className="text-[10px] text-black/40">{s}</span>
          </div>
        ))}
      </div>
      <p className="text-[12px] font-semibold text-black/70" style={{ marginBottom: 8 }}>Historial</p>
      <div className="relative">
        <div aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px bg-black/[0.10]" />
        <div className="flex flex-col gap-3">
          {HIST.map(([t, d], i) => (
            <div key={t} className="relative flex items-start gap-3">
              <span className="relative z-10 mt-0.5 h-[15px] w-[15px] shrink-0 rounded-full border-2 border-white" style={{ background: i === HIST.length - 1 ? "#16A34A" : "#DB3B2B" }} />
              <div className="min-w-0 flex-1">
                <p className="text-[12px] text-black/80">{t}</p>
                <p className="text-[10px] text-black/40">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const STEPS = [
  { n: "01", title: "Recibe la notificación al instante", desc: "T1 detecta cada chargeback o disputa en cuanto llega del procesador y te avisa de inmediato." },
  { n: "02", title: "Adjunta evidencia en un clic", desc: "Sube comprobantes de entrega, facturas o capturas directo desde el panel, sin buscar en otro sistema." },
  { n: "03", title: "Responde dentro del plazo", desc: "T1 controla los plazos de cada procesador y te alerta antes de que venza el tiempo de respuesta." },
  { n: "04", title: "Da seguimiento hasta la resolución", desc: "Monitorea el estado de cada caso y recibe la resolución del banco directamente en tu panel." },
];

export default function T1Reclamaciones() {
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
      {/* ════════════ HERO ════════════ */}
      <section className="relative flex items-center overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-20 tablet:pb-10 tablet:h-[660px]" style={{ background: "linear-gradient(135deg, #261515 0%, #1A0A0A 40%, #261515 100%)" }}>
        <div className="relative mx-auto w-full max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-12 tablet:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] tablet:gap-16">
            <div>
              <h1 className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[56px]" style={{ lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 22 }}>
                Gestiona disputas y{" "}
                <span className="relative inline-block">
                  chargebacks
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.35)", borderRadius: 5, zIndex: -1 }} />
                </span>
                .
              </h1>
              <p className="font-inter text-[16px] font-light text-white/70 tablet:text-[19px]" style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}>
                Responde con evidencia, controla plazos y reduce tu tasa de contracargos desde un solo panel.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SIGNUP_URL} className="inline-flex items-center rounded-full bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                  Gestionar reclamaciones
                </a>
              </div>
            </div>
            <DisputasDashboard />
          </div>
        </div>
      </section>

      {/* ════════════ TODAS TUS DISPUTAS — split ════════════ */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32" data-modal-animate>
        <div className="mx-auto flex max-w-[var(--max-w)] items-center">
          <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] tablet:gap-16">
            <div>
              <h2 className="font-sora text-[28px] font-light text-black tablet:text-[38px] lg:text-[46px]" style={{ letterSpacing: "-1.3px", lineHeight: 1.1, marginBottom: 18 }}>
                Todas tus disputas en un solo lugar.
              </h2>
              <p className="font-inter text-[15px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                T1 centraliza chargebacks de todos tus procesadores y te da las herramientas para responder a tiempo.
              </p>
              <ul className="flex flex-col gap-2.5">
                {["Disputas de Stripe, Conekta, OpenPay y más", "Control de plazos con alertas automáticas", "Tasa de contracargos en tiempo real"].map((it) => (
                  <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            <DisputasTable />
          </div>
        </div>
      </section>

      {/* ════════════ CÓMO RESOLVEMOS — stepper dark ════════════ */}
      <section className="relative px-5 py-24 tablet:px-10 tablet:py-32" style={{ background: "linear-gradient(135deg, #261515 0%, #1A0A0A 40%, #261515 100%)" }}>
        <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 h-[360px] w-[680px] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(ellipse at center, rgba(219,59,43,0.12) 0%, transparent 64%)", filter: "blur(44px)" }} />
        <div className="relative mx-auto max-w-[760px]">
          <div data-modal-animate className="text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[40px] lg:text-[46px]" style={{ letterSpacing: "-1.3px", lineHeight: 1.1, marginBottom: 14 }}>
              ¿Cómo resolvemos cada disputa?
            </h2>
            <p className="font-inter text-[16px] font-light text-white/55 tablet:text-[18px]" style={{ lineHeight: 1.5 }}>
              De la notificación a la resolución, sin perder un plazo.
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

      {/* ════════════ RESPONDE CON EVIDENCIA — split ════════════ */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32" data-modal-animate>
        <div className="mx-auto flex max-w-[var(--max-w)] items-center">
          <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
            <div className="order-2 tablet:order-1">
              <EvidenciaPanel />
            </div>
            <div className="order-1 tablet:order-2">
              <h2 className="font-sora text-[28px] font-light text-black tablet:text-[40px] lg:text-[46px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                Responde con evidencia completa.
              </h2>
              <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                Adjunta comprobantes, facturas y capturas de tracking directamente desde T1. Todo queda vinculado a la disputa.
              </p>
              <ul className="flex flex-col gap-2.5">
                {["Sube evidencia sin salir del panel", "Historial completo de cada caso", "Notificación inmediata de resolución"].map((it) => (
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

      {/* ════════════ CONTROLA TU TASA — stats dark ════════════ */}
      <section className="relative overflow-hidden px-5 py-24 tablet:px-10 tablet:py-32" style={{ background: "linear-gradient(180deg, #1A0A0A 0%, #000000 100%)" }}>
        <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 h-[340px] w-[640px] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(ellipse at center, rgba(219,59,43,0.12) 0%, transparent 66%)", filter: "blur(46px)" }} />
        <div className="relative mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[40px] lg:text-[46px]" style={{ letterSpacing: "-1.3px", lineHeight: 1.1, marginBottom: 14 }}>
              Controla tu tasa de contracargos.
            </h2>
            <p className="font-inter text-[16px] font-light text-white/55 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Visibilidad total sobre disputas, resoluciones y el impacto en tu operación.
            </p>
          </div>
          <div data-modal-animate className="mx-auto grid max-w-[920px] grid-cols-1 gap-5 tablet:grid-cols-3">
            {[
              { v: "0.42%", l: "Tasa de contracargos", d: "Dentro del rango saludable (<1%)" },
              { v: "72%", l: "Disputas ganadas", d: "12 de 17 resueltas a tu favor" },
              { v: "$28,450", l: "Monto recuperado", d: "En los últimos 30 días" },
            ].map((s, i) => (
              <div key={s.l} data-stagger className="rounded-[18px] border border-white/[0.08] bg-white/[0.03] p-7 text-center" style={{ ["--i" as string]: i, boxShadow: "0 26px 60px -28px rgba(0,0,0,0.8)" }}>
                <p className="font-sora text-[40px] font-light text-white" style={{ letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 10 }}>{s.v}</p>
                <p className="font-sora text-[15px] font-normal text-white" style={{ marginBottom: 6 }}>{s.l}</p>
                <p className="font-inter text-[13px] font-light text-white/50" style={{ lineHeight: 1.5 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FAQ ════════════ */}
      <section className="relative bg-black px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[760px]">
          <div className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>
              Preguntas frecuentes
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { q: "¿Qué es un chargeback?", a: "Un contracargo ocurre cuando un tarjetahabiente solicita a su banco la devolución de un cobro. El comercio tiene un plazo limitado para presentar evidencia y defender la transacción." },
              { q: "¿Cómo me ayuda T1 a responder?", a: "T1 centraliza las disputas de todos tus procesadores, te alerta apenas llegan, te permite adjuntar evidencia directo desde el panel y controla los plazos para que nunca pierdas uno." },
              { q: "¿Qué pasa si no respondo a tiempo?", a: "Si vence el plazo sin respuesta, el banco falla automáticamente a favor del comprador y pierdes el monto. T1 te avisa con anticipación para evitarlo." },
              { q: "¿Puedo ver por qué me están disputando?", a: "Sí. Cada disputa incluye el motivo reportado por el banco: producto no recibido, cargo no reconocido, duplicado, etc. También ves estadísticas de los motivos más frecuentes." },
              { q: "¿Tiene costo adicional?", a: "No. La gestión de reclamaciones viene incluida en T1 Pagos sin cargo extra." },
            ].map((f) => (
              <details key={f.q} className="group rounded-[14px] border border-white/[0.08] bg-white/[0.03] transition-all duration-200 open:border-[rgba(219,59,43,0.4)] open:bg-white/[0.05]">
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
        title="No pierdas otra disputa."
        description="Gestiona chargebacks con evidencia, plazos controlados y visibilidad total desde T1 Pagos."
        buttonLabel="Gestionar reclamaciones"
      />
    </div>
  );
}
