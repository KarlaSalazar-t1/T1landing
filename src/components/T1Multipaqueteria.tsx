"use client";

import Image from "next/image";
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

/* Carriers — using initials for the visual since no logos are imported */
const CARRIERS = [
  { name: "FedEx", color: "#4D148C", letter: "F" },
  { name: "DHL", color: "#FFCC00", txt: "#1A1A1A", letter: "D" },
  { name: "Estafeta", color: "#E60000", letter: "E" },
  { name: "Paquetexpress", color: "#0066CC", letter: "P" },
  { name: "Redpack", color: "#E10E0E", letter: "R" },
  { name: "Sendex", color: "#1A8FE3", letter: "S" },
  { name: "AFIMEX", color: "#22C55E", letter: "A" },
  { name: "99Minutos", color: "#FF6B00", letter: "99" },
];

export default function T1Multipaqueteria() {
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
      {/* ── Hero — text left, carriers connected visual right ── */}
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
                Conecta{" "}
                <span className="relative inline-block">
                  +25 paqueterías
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.30)", borderRadius: 5, zIndex: -1 }} />
                </span>
                {" "}en un click.
              </h1>
              <p
                className="font-inter text-[16px] font-light text-white/65 tablet:text-[19px]"
                style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}
              >
                Cotiza, genera guías y rastrea desde un solo panel. Mejor tarifa, mejor tiempo, mejor servicio para cada envío.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                  Comenzar ahora
                </a>
                <span className="font-inter text-[13px] text-white/50">Sin tarjeta · Empieza gratis</span>
              </div>
            </div>

            {/* Right — T1 hub with carriers radiating */}
            <div className="relative" style={{ minHeight: 420 }}>
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 420" fill="none" preserveAspectRatio="xMidYMid meet">
                {/* Lines from T1 to each carrier */}
                {[
                  { x2: 80, y2: 50 },
                  { x2: 420, y2: 50 },
                  { x2: 30, y2: 200 },
                  { x2: 470, y2: 200 },
                  { x2: 80, y2: 350 },
                  { x2: 420, y2: 350 },
                  { x2: 250, y2: 30 },
                  { x2: 250, y2: 380 },
                ].map((p, i) => (
                  <line key={i} x1="250" y1="210" x2={p.x2} y2={p.y2} stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="4 4" />
                ))}
                {/* Animated dots radiating outward */}
                {[
                  { x: 80, y: 50, dur: 2 },
                  { x: 420, y: 50, dur: 2.4, delay: 0.3 },
                  { x: 30, y: 200, dur: 1.8, delay: 0.5 },
                  { x: 470, y: 200, dur: 2.2, delay: 0.7 },
                  { x: 80, y: 350, dur: 2.6, delay: 0.4 },
                  { x: 420, y: 350, dur: 2, delay: 0.6 },
                  { x: 250, y: 30, dur: 2.3, delay: 0.2 },
                  { x: 250, y: 380, dur: 2.1, delay: 0.8 },
                ].map((p, i) => (
                  <circle key={i} r="3" fill="#E26153" opacity="0.7">
                    <animateMotion dur={`${p.dur}s`} repeatCount="indefinite" path={`M250 210 L${p.x} ${p.y}`} begin={`${p.delay || 0}s`} />
                  </circle>
                ))}
              </svg>

              {/* T1 hub at center */}
              <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
                <div className="flex h-[68px] w-[68px] items-center justify-center rounded-[16px]" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 8px 30px rgba(219,59,43,0.25)" }}>
                  <svg width="38" height="36" viewBox="0 0 45 44" fill="none">
                    <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457V19.1513V19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#D93A26" />
                    <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592H22.4335H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#D93A26" />
                  </svg>
                </div>
              </div>

              {/* Carrier badges around T1 */}
              {[
                { x: 80, y: 50, c: CARRIERS[0] },
                { x: 420, y: 50, c: CARRIERS[1] },
                { x: 30, y: 200, c: CARRIERS[2] },
                { x: 470, y: 200, c: CARRIERS[3] },
                { x: 80, y: 350, c: CARRIERS[4] },
                { x: 420, y: 350, c: CARRIERS[5] },
                { x: 250, y: 30, c: CARRIERS[6] },
                { x: 250, y: 380, c: CARRIERS[7] },
              ].map((p, i) => (
                <div
                  key={i}
                  className="absolute flex h-[52px] w-[52px] items-center justify-center rounded-[12px]"
                  style={{
                    left: `${(p.x / 500) * 100}%`,
                    top: `${(p.y / 420) * 100}%`,
                    transform: "translate(-50%, -50%)",
                    background: p.c.color,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                  }}
                >
                  <span className="font-sora text-[16px] font-bold" style={{ color: p.c.txt || "#FFFFFF", letterSpacing: "-0.02em" }}>{p.c.letter}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Antes ── */}
      <section className="relative bg-[#F6F6F6] px-5 pt-16 pb-12 tablet:px-10 tablet:pt-20 tablet:pb-16" data-white-card>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[26px] font-light text-black tablet:text-[34px] lg:text-[40px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>
              Negociar con cada paquetería <em className="not-italic text-black/40">no debería ser tu trabajo.</em>
            </h2>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
            {[
              { title: "Tarifas opacas", desc: "Cada paquetería con su tabla. Comparar manualmente toma horas." },
              { title: "Contratos individuales", desc: "Negociaciones directas con cada carrier, descuentos sólo a alto volumen." },
              { title: "Plataformas separadas", desc: "Una para FedEx, otra para DHL, otra para Estafeta. Todo desconectado." },
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
            Una sola integración, +25 paqueterías.
          </h2>
          <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[19px]" style={{ lineHeight: 1.5 }}>
            Cotiza, genera guías y rastrea sin saltar entre plataformas.
          </p>
        </div>
      </section>

      {/* ── Stack cards ── */}
      <div ref={stackRootRef} className="fs-stack-card-container relative bg-white">
        {/* Block 1 — Cotiza al instante (text left, panel right) — bg white, no shadow */}
        <div className="fs-stack-card" style={{ top: 60, zIndex: 1, background: "#FFFFFF" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Cotiza con todas las paqueterías al mismo tiempo
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Compara precios y tiempos en un solo paso. Elige el balance perfecto entre costo, velocidad y servicio.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Cotización en menos de 2 segundos", "Tarifas T1 con descuento por volumen agregado", "Comparación clara entre paqueterías"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Panel — quote comparison */}
              <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
                  <p className="font-sora text-[14px] font-medium text-black">Cotización CDMX → Monterrey</p>
                  <span className="rounded-full bg-black/[0.05] px-2 py-0.5 font-inter text-[10px] font-medium text-black/60">2.3 kg</span>
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    { c: CARRIERS[0], time: "Mañana", price: "$189.00", best: false },
                    { c: CARRIERS[1], time: "Mañana", price: "$172.50", best: true, label: "Mejor precio" },
                    { c: CARRIERS[3], time: "Hoy 8pm", price: "$245.00", best: false, label: "Más rápido" },
                    { c: CARRIERS[4], time: "2 días", price: "$148.00", best: false },
                    { c: CARRIERS[7], time: "Hoy", price: "$198.50", best: false },
                  ].map((q, i) => (
                    <div key={i} className={`flex items-center gap-3 rounded-[10px] border px-3 py-2.5 ${q.best ? "border-[#DB3B2B] bg-[rgba(219,59,43,0.04)]" : "border-black/[0.06] bg-[#FAFAF9]"}`}>
                      <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[6px]" style={{ background: q.c.color }}>
                        <span className="font-sora text-[12px] font-bold" style={{ color: q.c.txt || "#FFFFFF" }}>{q.c.letter}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-inter text-[12px] font-semibold text-black">{q.c.name}</p>
                        <p className="font-inter text-[10px] text-black/55">Entrega {q.time}</p>
                      </div>
                      {q.label && (
                        <span className={`rounded-full px-2 py-0.5 font-inter text-[9px] font-bold ${q.best ? "bg-[rgba(219,59,43,0.10)] text-[#DB3B2B]" : "bg-[rgba(34,197,94,0.10)] text-[#16A34A]"}`}>
                          {q.label}
                        </span>
                      )}
                      <span className="font-sora text-[14px] font-bold text-black w-[64px] text-right">{q.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Block 2 — Asignación automática (panel left, text right) — bg #F6F6F6 */}
        <div className="fs-stack-card" style={{ top: 80, zIndex: 2, background: "#F6F6F6", boxShadow: "0 -4px 30px rgba(0,0,0,0.18)" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              {/* Panel — rules engine */}
              <div className="relative order-2 overflow-hidden rounded-[18px] border border-black/[0.06] bg-white tablet:order-1" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
                <p className="font-sora text-[14px] font-medium text-black" style={{ marginBottom: 16 }}>Reglas de envío</p>
                <div className="flex flex-col gap-2">
                  {[
                    { cond: "Si CP empieza con 0", action: "Estafeta · Express", color: CARRIERS[2].color },
                    { cond: "Si peso > 5kg", action: "Paquetexpress · Sobrepeso", color: CARRIERS[3].color },
                    { cond: "Si total > $2,000", action: "FedEx · Asegurado", color: CARRIERS[0].color },
                    { cond: "Si entrega es CDMX", action: "99Minutos · Same day", color: CARRIERS[7].color },
                    { cond: "Default", action: "Mejor precio del día", color: "#DB3B2B" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-[10px] border border-black/[0.06] bg-[#FAFAF9] px-3 py-2.5">
                      <span className="font-inter text-[10px] font-semibold text-black/65 uppercase tracking-wide w-[20px]">SI</span>
                      <span className="font-inter text-[11px] text-black/70 flex-1">{r.cond}</span>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span className="rounded-[6px] px-2 py-0.5 font-inter text-[10px] font-bold text-white" style={{ background: r.color }}>{r.action}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-[10px] bg-[rgba(34,197,94,0.08)] px-3 py-2">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="font-inter text-[11px] font-medium text-[#16A34A]">Última semana: 1,243 envíos asignados automáticamente</span>
                </div>
              </div>

              <div className="order-1 tablet:order-2">
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Asignación automática con reglas inteligentes
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Define una vez tus reglas y T1 elige por ti. La paquetería correcta para cada pedido, sin clicks manuales.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Reglas por CP, peso, dimensión o monto", "Optimización por costo, tiempo o servicio", "Reasignación automática si una paquetería falla"].map((it) => (
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

        {/* Block 3 — Rastreo (text left, panel right) — bg white */}
        <div className="fs-stack-card" style={{ top: 100, zIndex: 3, background: "#FFFFFF", boxShadow: "0 -4px 30px rgba(0,0,0,0.18)" }}>
          <div className="mx-auto flex h-full max-w-[var(--max-w)] items-center px-5 tablet:px-10">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Rastrea todas tus guías en un solo lugar
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  El estado de cada envío en tiempo real, sin importar la paquetería. Notifica a tu cliente automáticamente.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Estatus unificado de todas las paqueterías", "Notificaciones automáticas por WhatsApp y email", "Detección de demoras antes que tu cliente"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Panel — tracking timeline */}
              <div className="relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
                  <div>
                    <p className="font-sora text-[14px] font-medium text-black">Guía #FD928473201</p>
                    <p className="font-inter text-[10px] text-black/45">FedEx · Express</p>
                  </div>
                  <span className="rounded-full bg-[rgba(34,197,94,0.12)] px-2 py-0.5 font-inter text-[10px] font-bold text-[#16A34A]">En camino</span>
                </div>

                {/* Timeline */}
                <div className="relative">
                  {[
                    { time: "Hoy · 14:32", status: "En reparto", desc: "Saliendo a la dirección final", active: true },
                    { time: "Hoy · 06:18", status: "En sucursal destino", desc: "MTY Centro de distribución", done: true },
                    { time: "Ayer · 22:40", status: "En tránsito", desc: "Saliendo de CDMX", done: true },
                    { time: "Ayer · 16:05", status: "Recolectado", desc: "Pickup desde tu sucursal", done: true },
                  ].map((t, i, arr) => (
                    <div key={i} className="relative flex gap-3 pb-3">
                      {i < arr.length - 1 && <span className="absolute left-[7px] top-[18px] bottom-0 w-px bg-black/[0.08]" />}
                      <div className={`relative z-10 mt-1 h-[14px] w-[14px] shrink-0 rounded-full ${t.active ? "bg-[#DB3B2B]" : t.done ? "bg-[#22C55E]" : "bg-black/15"}`}>
                        {t.active && <span className="absolute inset-0 rounded-full" style={{ animation: "pulse-soft 2s ease-in-out infinite", boxShadow: "0 0 0 5px rgba(219,59,43,0.18)" }} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`font-inter text-[12px] ${t.active ? "font-bold text-black" : "font-semibold text-black/75"}`}>{t.status}</p>
                          <span className="font-inter text-[9px] text-black/45">{t.time}</span>
                        </div>
                        <p className="font-inter text-[10px] text-black/55">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer notify */}
                <div className="mt-2 flex items-center gap-2 rounded-[10px] bg-[#FAFAF9] px-3 py-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="font-inter text-[11px] text-black/65">Cliente notificado por WhatsApp</span>
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
              De pedido a entrega, sin fricción
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Cuatro pasos automáticos para cada envío.
            </p>
          </div>
          <div data-modal-animate className="relative grid grid-cols-1 gap-5 tablet:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div aria-hidden className="pointer-events-none absolute hidden lg:block" style={{ left: "12.5%", right: "12.5%", top: 30, height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(219,59,43,0.25) 12%, rgba(219,59,43,0.25) 88%, transparent 100%)" }} />
            {[
              { n: "01", title: "Cotiza", desc: "Compara precios y tiempos entre +25 paqueterías al instante." },
              { n: "02", title: "Genera guía", desc: "Etiqueta lista para imprimir en menos de 5 segundos." },
              { n: "03", title: "Programa pickup", desc: "Solicita recolección desde tu sucursal o bodega." },
              { n: "04", title: "Rastrea y notifica", desc: "Estatus unificado y avisos automáticos a tu cliente." },
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
              Todo lo que necesita tu logística
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Sin contratos individuales, sin pelear con cada paquetería.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-4 tablet:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {[
              { title: "Tarifas T1", desc: "Descuento por volumen agregado, sin volumen mínimo de tu lado.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 1V23M17 5H9.5a3.5 3.5 0 0 0 0 7H14.5a3.5 3.5 0 0 1 0 7H6" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Generación de guías", desc: "Etiquetas en PDF o ZPL para impresión térmica directa.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="14" rx="2" stroke="#DB3B2B" strokeWidth="1.6" /><path d="M5 7v6 M9 7v6 M13 7v6 M17 7v6 M3 21h18" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Recolecciones", desc: "Programa pickup desde tu sucursal o bodega con un click.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="8" width="14" height="9" rx="1" stroke="#DB3B2B" strokeWidth="1.6" /><path d="M16 12h4l2 3v2h-6 M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0z M16 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Control de calidad", desc: "Detecta retrasos y problemas antes que tu cliente reclame.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 6v6c0 5 3.5 8.5 9 10 5.5-1.5 9-5 9-10V6l-9-4z" stroke="#DB3B2B" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Notificaciones automáticas", desc: "Avisos por WhatsApp y email a tu cliente sin que tengas que hacer nada.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Reportes logísticos", desc: "Tiempos de entrega, costos y desempeño por paquetería.", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 21h18" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" /><rect x="5" y="12" width="3.5" height="7" rx="1" stroke="#DB3B2B" strokeWidth="1.6" /><rect x="10.5" y="8" width="3.5" height="11" rx="1" stroke="#DB3B2B" strokeWidth="1.6" /><rect x="16" y="4" width="3.5" height="15" rx="1" stroke="#DB3B2B" strokeWidth="1.6" /></svg>) },
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

      {/* ── Carriers grid ── */}
      <section className="relative bg-[#F6F6F6] px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[640px] text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[26px] font-light text-black tablet:text-[34px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15, marginBottom: 12 }}>
              +25 paqueterías conectadas
            </h2>
            <p className="font-inter text-[15px] font-light text-black/60 tablet:text-[17px]" style={{ lineHeight: 1.6 }}>
              Las principales nacionales e internacionales, con tarifas T1 incluidas.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-2 gap-4 tablet:grid-cols-4 tablet:gap-5">
            {CARRIERS.map((mp) => (
              <div key={mp.name} className="flex flex-col items-center justify-center rounded-[16px] border border-black/[0.06] bg-white py-8 transition-all duration-200 hover:border-black/[0.12] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="mb-3 flex h-[56px] w-[56px] items-center justify-center rounded-[12px]" style={{ background: mp.color }}>
                  <span className="font-sora text-[20px] font-bold" style={{ color: mp.txt || "#FFFFFF", letterSpacing: "-0.02em" }}>{mp.letter}</span>
                </div>
                <p className="font-inter text-[13px] font-medium text-black/70">{mp.name}</p>
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
              Logística sin fricción.
            </h2>
          </div>
          <div data-modal-animate className="grid grid-cols-1 gap-10 text-center tablet:grid-cols-3">
            <div data-stagger style={{ ["--i" as string]: 0 }}><CountStat end={25} prefix="+" label="paqueterías conectadas" /></div>
            <div data-stagger style={{ ["--i" as string]: 1 }}><CountStat end={30} prefix="−" suffix="%" label="costo promedio vs tarifas directas" /></div>
            <div data-stagger style={{ ["--i" as string]: 2 }}>
              <p className="font-sora text-[36px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1 }}>&lt; 5s</p>
              <p className="font-inter text-[12px] font-light text-white/55 tablet:text-[13px]">para generar una guía</p>
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
              { q: "¿Necesito contratar cada paquetería?", a: "No. Contratas T1 una sola vez y accedes a +25 paqueterías con tarifas preferenciales por volumen agregado." },
              { q: "¿Puedo usar mi propia cuenta de paquetería?", a: "Sí. Si ya tienes una cuenta directa con FedEx, DHL u otro, puedes conectarla y usar tus tarifas negociadas." },
              { q: "¿Hay volumen mínimo de envíos?", a: "No. Empieza con un envío al mes o miles. La tarifa T1 aplica desde el primero." },
              { q: "¿Qué tan rápido genero una guía?", a: "Menos de 5 segundos por guía. Imprime PDF o ZPL para etiqueta térmica." },
              { q: "¿Cómo se gestionan retrasos o pérdidas?", a: "T1 monitorea cada envío y abre incidencias automáticamente. Equipo dedicado a resolver con la paquetería por ti." },
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
        title="¿Listo para enviar mejor?"
        description="Conecta +25 paqueterías hoy y genera tu primera guía con tarifas T1."
      />
    </div>
  );
}
