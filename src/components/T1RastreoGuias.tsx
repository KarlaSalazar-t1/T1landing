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
    <div className="mx-auto w-full" style={{ maxWidth: 340, fontFamily: MANROPE }}>
      <div
        className="relative overflow-hidden bg-white"
        style={{ borderRadius: 44, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}
      >
        <div className="px-5 pt-6 pb-7">{children}</div>
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
        <div className="flex items-center gap-2.5" style={{ marginBottom: 4 }}>
          <span className="flex items-center gap-1.5 rounded-[12px] border px-3.5 py-2.5 text-[13px] font-medium text-black/75" style={{ borderColor: "rgba(0,0,0,0.14)" }}>
            Filtrar
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 7h10M18 7h2M4 17h2M10 17h10" stroke="rgba(0,0,0,0.5)" strokeWidth="1.6" strokeLinecap="round" /><circle cx="16" cy="7" r="2.4" stroke="rgba(0,0,0,0.5)" strokeWidth="1.6" /><circle cx="8" cy="17" r="2.4" stroke="rgba(0,0,0,0.5)" strokeWidth="1.6" /></svg>
          </span>
          <span className="flex flex-1 items-center justify-between rounded-[12px] border px-3.5 py-2.5 text-[13px] font-medium text-black/75" style={{ borderColor: "rgba(0,0,0,0.14)" }}>
            Fecha
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <span className="flex h-[40px] w-[40px] items-center justify-center rounded-[12px] border" style={{ borderColor: "rgba(0,0,0,0.14)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </div>

        {/* Lista de envíos */}
        {ROWS.map((r, i) => {
          const st = r.tone === "done" ? { bg: "rgba(34,197,94,0.12)", color: "#16A34A" } : { bg: "rgba(0,0,0,0.05)", color: "rgba(0,0,0,0.6)" };
          return (
            <div key={i} style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: 14, paddingBottom: 14 }}>
              <p className="text-[12px] text-black/45" style={{ marginBottom: 10 }}>Hoy | 2:24 hrs</p>
              <div className="flex items-center gap-3">
                <img src={`/img/carriers/${r.brand}.svg`} alt={r.carrier} width={44} height={44} className="h-[44px] w-[44px] shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[16px] font-bold text-black leading-tight">{r.id}</p>
                  <p className="truncate text-[13px] text-black/45" style={{ marginTop: 2 }}>{r.carrier}</p>
                </div>
                <span className="shrink-0 text-[15px] font-bold text-black">{r.price}</span>
              </div>
              <div className="flex items-center gap-3" style={{ marginTop: 12 }}>
                <span className="rounded-full px-3 py-1 text-[11px] font-bold" style={{ background: st.bg, color: st.color }}>{r.state}</span>
                <span className="text-[13px] text-black/60">{r.source}</span>
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
              Rastrea tus guías{" "}
              <span className="relative inline-block">
                en un solo lugar
                <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.35)", borderRadius: 5, zIndex: -1 }} />
              </span>.
            </h1>
            <p className="mx-auto font-inter text-[16px] font-light text-white/70 tablet:text-[19px]" style={{ lineHeight: 1.55, marginBottom: 28, maxWidth: 560 }}>
              Detecta demoras antes que tu cliente y avísale en automático.
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
          <div data-modal-animate className="mx-auto max-w-[760px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.4px", lineHeight: 1.1 }}>
              Un solo lugar para todo lo que enviaste.
            </h2>
          </div>

          {/* Block 1 — Tablero (texto + tabla) */}
          <div data-modal-animate className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16" style={{ marginBottom: 112 }}>
            <div>
              <h3 className="font-sora text-[26px] font-light text-black tablet:text-[36px] lg:text-[42px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>Todas las paqueterías, un mismo tablero</h3>
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
            <div className="order-2 rounded-[18px] border border-black/[0.06] bg-white tablet:order-1" style={{ padding: 24, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
              <div className="grid grid-cols-3 gap-2.5 tablet:gap-3">
                {["fedex", "dhl", "estafeta", "paquetexpress", "ups", "99min", "jtexpress", "ampm"].map((b, i) => (
                  <div key={i} className="flex items-center justify-center rounded-[12px] border border-black/[0.12] bg-white py-4">
                    <img src={`/img/carriers/${b}.svg`} alt={b} width={36} height={36} className="h-[36px] w-[36px] object-contain" />
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 tablet:order-2">
              <h3 className="font-sora text-[26px] font-light text-black tablet:text-[36px] lg:text-[42px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>Más de 25 paqueterías, un estatus</h3>
              <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6 }}>Estatus normalizado de todas, sin pestañas ni copiar y pegar.</p>
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
              Seguimiento que trabaja por ti
            </h2>
            <p className="font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Cada guía vigilada en tiempo real, con avisos a tu cliente y detección automática de demoras.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
            {[
              { title: "Línea de tiempo en vivo", desc: "Cada evento, con hora y ubicación.", img: "/img/linea-del-tiempo.png", w: 1254, h: 1254 },
              { title: "Tu cliente, siempre enterado", desc: "Avisos por WhatsApp y email en cada cambio.", img: "/img/notificaciones-v2.png", w: 956, h: 1168 },
              { title: "Demoras detectadas solas", desc: "Incidencia automática cuando un envío se atora.", img: "/img/demoras.png", w: 1012, h: 1059 },
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
        title="Olvídate del ¿dónde está mi pedido?"
        description="Rastrea tus guías en un solo lugar y mantén a tus clientes informados en automático."
        buttonLabel="Empezar a rastrear"
      />
    </div>
  );
}
