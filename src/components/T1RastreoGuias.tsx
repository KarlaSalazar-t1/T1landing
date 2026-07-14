"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import T1FinalCTA from "@/components/T1FinalCTA";

const MANROPE = "var(--font-manrope-var), 'Manrope', sans-serif";

function CountStat({ end, prefix = "", suffix = "", label, decimals = 0 }: { end: number; prefix?: string; suffix?: string; label: string; decimals?: number }) {
  const { ref, display } = useCountUp({ end, prefix, suffix, decimals, duration: 1800 });
  return (
    <div ref={ref}>
      <p className="font-sora text-[36px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1 }}>
        {display}
      </p>
      <p className="font-inter text-[12px] font-light text-white tablet:text-[13px]">{label}</p>
    </div>
  );
}

/* Marco de teléfono reutilizable (bordes redondeados) — SOLO responsive */
function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full" style={{ maxWidth: 320, fontFamily: MANROPE }}>
      <div
        className="relative overflow-hidden bg-white"
        style={{ borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 10px 30px rgba(0,0,0,0.10)" }}
      >
        <div className="px-4 pt-5 pb-5">{children}</div>
      </div>
    </div>
  );
}

/* Mockup "Mis envíos" (estilo app) — SOLO responsive */
function MisEnviosPhone({ className = "" }: { className?: string }) {
  const ROWS = [
    { brand: "fedex", id: "43567890082", carrier: "FedEx", price: "$345.00", state: "En camino", tone: "neutral" as const, source: "T1envíos" },
    { brand: "dhl", id: "78112094553", carrier: "DHL", price: "$345.00", state: "Entregado", tone: "done" as const, source: "Shopify" },
    { brand: "ampm", id: "55230981770", carrier: "Grupo ampm", price: "$345.00", state: "Recolectado", tone: "neutral" as const, source: "T1envíos" },
  ];

  return (
    <div className={className}>
      <PhoneShell>
        {/* Controles */}
        <div className="flex items-center gap-2" style={{ marginBottom: 2 }}>
          <span className="flex items-center gap-1.5 rounded-[10px] border px-3 py-2 text-[11px] font-medium text-black/75" style={{ borderColor: "rgba(0,0,0,0.14)" }}>
            Filtrar
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 7h10M18 7h2M4 17h2M10 17h10" stroke="rgba(0,0,0,0.5)" strokeWidth="1.6" strokeLinecap="round" /><circle cx="16" cy="7" r="2.4" stroke="rgba(0,0,0,0.5)" strokeWidth="1.6" /><circle cx="8" cy="17" r="2.4" stroke="rgba(0,0,0,0.5)" strokeWidth="1.6" /></svg>
          </span>
          <span className="flex flex-1 items-center justify-between rounded-[10px] border px-3 py-2 text-[11px] font-medium text-black/75" style={{ borderColor: "rgba(0,0,0,0.14)" }}>
            Fecha
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border" style={{ borderColor: "rgba(0,0,0,0.14)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </div>

        {/* Lista de envíos */}
        {ROWS.map((r, i) => {
          const st = r.tone === "done" ? { bg: "rgba(34,197,94,0.12)", color: "#16A34A" } : { bg: "rgba(0,0,0,0.05)", color: "rgba(0,0,0,0.6)" };
          return (
            <div key={i} style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: 10, paddingBottom: 10 }}>
              <p className="text-[10.5px] text-black/45" style={{ marginBottom: 7 }}>Hoy | 2:24 hrs</p>
              <div className="flex items-center gap-2.5">
                <img src={`/img/carriers/${r.brand}.svg`} alt={r.carrier} width={36} height={36} className="h-[36px] w-[36px] shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-bold text-black leading-tight">{r.id}</p>
                  <p className="truncate text-[11.5px] text-black/45" style={{ marginTop: 1 }}>{r.carrier}</p>
                </div>
                <span className="shrink-0 text-[13.5px] font-bold text-black">{r.price}</span>
              </div>
              <div className="flex items-center gap-2.5" style={{ marginTop: 9 }}>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold" style={{ background: st.bg, color: st.color }}>{r.state}</span>
                <span className="text-[11.5px] text-black/60">{r.source}</span>
              </div>
            </div>
          );
        })}
      </PhoneShell>
    </div>
  );
}

export default function T1RastreoGuias() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");

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

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div ref={rootRef} className="w-full" style={{ ["--max-w" as string]: "1220px" }}>
      {/* ════════════ HERO ════════════ */}
      <section className="relative flex items-center overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-20 tablet:pb-10 tablet:h-[660px]" style={{ background: "linear-gradient(135deg, #261515 0%, #1A0A0A 40%, #261515 100%)" }}>
        <div className="relative mx-auto flex w-full max-w-[860px] flex-col items-center text-center">
          {/* Copy + interactive search */}
          <div className="flex w-full flex-col items-center">
            <h1 className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[56px]" style={{ lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 22 }}>
              Rastrea todas tus guías desde{" "}
              <span className="relative inline-block">
                T1
                <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.35)", borderRadius: 5, zIndex: -1 }} />
              </span>.
            </h1>
            <p className="mx-auto font-inter text-[16px] font-light text-white/70 tablet:text-[19px]" style={{ lineHeight: 1.55, marginBottom: 28, maxWidth: 560 }}>
              Consulta el estado de tus envíos y mantén a tus clientes informados desde un solo lugar.
            </p>

            {/* Interactive tracking search */}
            <form onSubmit={handleTrack} className="mx-auto w-full" style={{ maxWidth: 520 }}>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white p-1.5" style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.45)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ml-3 shrink-0"><circle cx="11" cy="11" r="7" stroke="rgba(0,0,0,0.4)" strokeWidth="1.8" /><path d="M20 20l-3.2-3.2" stroke="rgba(0,0,0,0.4)" strokeWidth="1.8" strokeLinecap="round" /></svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ingresa tu número de guía"
                  aria-label="Número de guía"
                  className="min-w-0 flex-1 bg-transparent px-2 py-2.5 font-inter text-[15px] text-black outline-none placeholder:text-black/40"
                  style={{ fontFamily: MANROPE }}
                />
                <button type="submit" className="shrink-0 rounded-full bg-[#DB3B2B] px-6 py-3 font-inter text-[14px] font-semibold text-white transition-all duration-150 hover:bg-[#C0332A]">
                  Rastrear
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ════════════ BENTO — capacidades ════════════ */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="relative mx-auto flex min-h-[300px] max-w-[960px] items-center justify-center overflow-hidden text-center tablet:min-h-[400px]" style={{ marginBottom: 48 }}>
            {/* toque sutil de rojo */}
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: 620, height: 480, background: "radial-gradient(circle, rgba(219,59,43,0.06) 0%, transparent 62%)" }} />
            {/* DESKTOP scatter — más dispersos y lejos del título */}
            {[
              { b: "fedex", l: "5%", t: "22%", s: 52, r: -8 },
              { b: "estafeta", l: "9%", t: "52%", s: 50, r: -5 },
              { b: "dhl", l: "15%", t: "82%", s: 46, r: 7 },
              { b: "jtexpress", l: "27%", t: "12%", s: 44, r: 5 },
              { b: "ampm", l: "73%", t: "12%", s: 46, r: -5 },
              { b: "paquetexpress", l: "95%", t: "22%", s: 50, r: 8 },
              { b: "99min", l: "91%", t: "52%", s: 46, r: 6 },
              { b: "ups", l: "85%", t: "82%", s: 48, r: -7 },
            ].map(({ b, l, t, s, r }) => (
              <img key={`d-${b}`} src={`/img/carriers/${b}.svg`} alt="" width={s} height={s} className="pointer-events-none absolute hidden -translate-x-1/2 -translate-y-1/2 object-contain tablet:block" style={{ left: l, top: t, width: s, height: s, transform: `translate(-50%,-50%) rotate(${r}deg)`, filter: "drop-shadow(0 12px 22px rgba(0,0,0,0.12))" }} />
            ))}
            {/* MOBILE scatter — bandas superior e inferior, dentro de límites (sin cortarse) */}
            {[
              { b: "fedex", l: "16%", t: "15%", s: 36, r: -8 },
              { b: "jtexpress", l: "42%", t: "13%", s: 34, r: 5 },
              { b: "ampm", l: "66%", t: "14%", s: 34, r: -5 },
              { b: "paquetexpress", l: "84%", t: "17%", s: 36, r: 8 },
              { b: "dhl", l: "16%", t: "85%", s: 36, r: 7 },
              { b: "estafeta", l: "43%", t: "87%", s: 34, r: -6 },
              { b: "ups", l: "66%", t: "86%", s: 34, r: 7 },
              { b: "99min", l: "84%", t: "83%", s: 36, r: 6 },
            ].map(({ b, l, t, s, r }) => (
              <img key={`m-${b}`} src={`/img/carriers/${b}.svg`} alt="" width={s} height={s} className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 object-contain tablet:hidden" style={{ left: l, top: t, width: s, height: s, transform: `translate(-50%,-50%) rotate(${r}deg)`, filter: "drop-shadow(0 12px 22px rgba(0,0,0,0.12))" }} />
            ))}
            <h2 className="relative z-[1] mx-auto font-sora text-[28px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.4px", lineHeight: 1.1, maxWidth: 460 }}>
              Un solo lugar para todos tus envíos.
            </h2>
          </div>

          {/* Block 1 — Tablero (texto + tabla, panel más grande) */}
          <div data-modal-animate className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(0,0.8fr)_minmax(0,1.28fr)] tablet:gap-14" style={{ marginBottom: 112 }}>
            <div>
              <h3 className="font-sora text-[26px] font-light text-black tablet:text-[36px] lg:text-[42px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>Todas tus guías en una sola vista</h3>
              <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6 }}>Filtra por estado y encuentra en segundos qué pedidos van en camino, cuáles entregaste y cuáles necesitan atención.</p>
            </div>
            {/* Panel — teléfono "Mis envíos" en responsive */}
            <MisEnviosPhone className="tablet:hidden" />
            {/* Panel — tabla en desktop */}
            <div className="hidden overflow-hidden rounded-[18px] border border-black/[0.06] bg-white tablet:block" style={{ boxShadow: "0 16px 50px rgba(0,0,0,0.08)", fontFamily: MANROPE }}>
                <div className="grid items-center gap-2 border-b border-black/[0.07] bg-[#FAFAF9] px-4 py-3" style={{ gridTemplateColumns: "1.7fr 1fr 1.1fr 0.9fr" }}>
                  <span className="text-[11px] font-medium text-black/55">Guía</span>
                  <span className="flex items-center gap-1 text-[11px] font-medium text-black/55">Fecha<svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M8 3L5 6M8 3l3 3M8 13l-3-3M8 13l3-3" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" strokeLinecap="round" /></svg></span>
                  <span className="text-[11px] font-medium text-black/55">Cliente</span>
                  <span className="text-[11px] font-medium text-black/55">Estado</span>
                </div>
                {[
                  { brand: "fedex", name: "FedEx", id: "43567890082", date: "26 de ene", time: "2:24 hrs", client: "Javier Mena", state: "En camino", tone: "neutral" as const, highlight: false },
                  { brand: "dhl", name: "DHL", id: "78112094553", date: "26 de ene", time: "2:24 hrs", client: "Javier Mena", state: "Entregado", tone: "done" as const, highlight: true },
                  { brand: "ampm", name: "Grupo ampm", id: "55230981770", date: "26 de ene", time: "2:24 hrs", client: "Javier Mena", state: "Recolectado", tone: "neutral" as const, highlight: false },
                  { brand: "fedex", name: "FedEx", id: "34092817745", date: "26 de ene", time: "2:24 hrs", client: "Javier Mena", state: "Entregado", tone: "done" as const, highlight: false },
                ].map((r, i, arr) => {
                  const st = r.tone === "done" ? { bg: "rgba(34,197,94,0.12)", color: "#16A34A" } : { bg: "rgba(0,0,0,0.05)", color: "rgba(0,0,0,0.6)" };
                  return (
                    <div
                      key={i}
                      className="grid items-center gap-2 px-4 py-3.5"
                      style={{ gridTemplateColumns: "1.7fr 1fr 1.1fr 0.9fr", background: r.highlight ? "#FBFBFB" : "#FFFFFF", borderBottom: i < arr.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}
                    >
                      <div className="flex items-center gap-3">
                        <img src={`/img/carriers/${r.brand}.svg`} alt={r.name} width={34} height={34} className="h-[34px] w-[34px] shrink-0 object-contain" />
                        <div className="min-w-0">
                          <p className="truncate text-[12px] font-bold text-black">{r.id}</p>
                          <p className="truncate text-[11px] text-black/50">{r.name}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-black/80">{r.date}</p>
                        <p className="text-[10px] text-black/45">{r.time}</p>
                      </div>
                      <span className="flex items-center gap-1 text-[12px] text-black/70">
                        {r.client}
                        <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="rgba(0,0,0,0.4)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      <span className="justify-self-start rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ background: st.bg, color: st.color }}>{r.state}</span>
                    </div>
                  );
                })}
              </div>
          </div>

          {/* Block 2 — +25 paqueterías (panel + texto) */}
          <div data-modal-animate className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16" style={{ marginBottom: 112 }}>
            {/* Placeholder — aquí irá una imagen */}
            <div className="order-2 flex items-center justify-center rounded-[18px] border border-dashed border-black/[0.12] bg-[#FBFBFB] tablet:order-1" style={{ minHeight: 300 }}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="text-black/20"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="8.5" cy="9.5" r="1.8" stroke="currentColor" strokeWidth="1.5" /><path d="M4 18l5-5 4 3 3-3 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="order-1 tablet:order-2">
              <h3 className="font-sora text-[26px] font-light text-black tablet:text-[36px] lg:text-[42px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>El mismo estatus para todas tus paqueterías</h3>
              <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6 }}>Cada paquetería nombra sus estados diferente. T1 los estandariza en un solo lenguaje claro, para que entiendas el estatus de cada guía al instante, sin descifrar los términos de cada una.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ Seguimiento — sección oscura, degradado #1A0A0A → #000 ════════════ */}
      <section className="relative px-5 py-24 tablet:px-10 tablet:py-32" style={{ background: "linear-gradient(180deg, #1A0A0A 0%, #000000 100%)" }}>
        <div className="mx-auto max-w-[var(--max-w)]">
          {/* C/D/E — capacidades restantes (estilo "Todo incluido desde el día uno") */}
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 104 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
              Seguimiento automático para cada guía
            </h2>
            <p className="font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Cada guía vigilada en tiempo real, con avisos a tu cliente y detección automática de demoras.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
            {[
              { title: "Línea de tiempo en vivo", desc: "Revisa los eventos de cada guía en orden, con fecha, hora y ubicación.", img: "/img/linea-del-tiempo.png", w: 1254, h: 1254 },
              { title: "Tu cliente, siempre actualizado", desc: "Envía actualizaciones por WhatsApp o email cuando el estado del envío cambie.", img: "/img/notificaciones-v2.png", w: 956, h: 1168 },
              { title: "Alertas en demoras", desc: "Identifica envíos sin movimiento y genera alertas o incidencias cuando aplica.", img: "/img/demoras.png", w: 1012, h: 1059 },
            ].map((c, i) => (
              <div key={c.title} data-stagger style={{ ["--i" as string]: i }} className="incluye-card flex flex-col rounded-[18px] border border-white/[0.08] bg-[#121214] px-6 pb-6">
                {/* imagen que sobresale por arriba de la card */}
                <div className="relative" style={{ height: 150 }}>
                  <div className="absolute left-1/2 -translate-x-1/2" style={{ top: -48, width: "100%", height: 200 }}>
                    <Image src={c.img} alt={c.title} width={c.w} height={c.h} className="pointer-events-none mx-auto block h-full w-auto object-contain" style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.4))" }} sizes="(max-width: 768px) 90vw, 340px" />
                  </div>
                </div>
                <h3 className="font-sora text-[19px] font-normal text-white" style={{ marginBottom: 6 }}>{c.title}</h3>
                <p className="font-inter text-[13px] font-light text-white/55" style={{ lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ════════════ FAQ (fondo oscuro) ════════════ */}
      <section className="relative bg-black px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[760px]">
          <div className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>
              Preguntas frecuentes
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { q: "¿Funciona con cualquier paquetería?", a: "Sí. Rastreas las +25 paqueterías conectadas a T1 y también guías generadas fuera de T1 que importes con su número." },
              { q: "¿Mi cliente recibe un link de rastreo?", a: "Sí. Recibe una página de rastreo con el estado en vivo, y avisos automáticos por WhatsApp y email en cada cambio." },
              { q: "¿Puedo personalizar la página con mi marca?", a: "Sí. La página de rastreo lleva tu logo y colores, para que la experiencia se sienta tuya y no de la paquetería." },
              { q: "¿Cómo se abren las incidencias?", a: "T1 detecta envíos sin movimiento y abre la incidencia automáticamente. Un equipo dedicado da seguimiento con la paquetería." },
              { q: "¿Hay API o webhooks?", a: "Sí. Puedes recibir los cambios de estatus por webhook para integrarlos a tu CRM, ERP o flujos internos." },
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
        title={<>Olvídate del<br />¿dónde está mi pedido?</>}
        description="Rastrea tus guías en un solo lugar y mantén a tus clientes informados en automático."
        buttonLabel="Empezar a rastrear"
      />
    </div>
  );
}
