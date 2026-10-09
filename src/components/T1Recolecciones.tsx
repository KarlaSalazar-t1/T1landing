"use client";

import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import HeroBackground from "@/components/HeroBackground";
import T1FinalCTA from "@/components/T1FinalCTA";
import { T1FAQSection } from "@/components/T1FAQ";

const MANROPE = "var(--font-manrope-var), 'Manrope', sans-serif";

/* Hero visual — camión recolector con puntos (Casa, Bodega…) y paquetes que caen al camión */
function RecoleccionOrbit() {
  const POINTS = [
    { label: "Casa", x: 56, icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 11l8-7 8 7M6 10v9h12v-9M10 19v-5h4v5" stroke="#DB3B2B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
    { label: "Bodega", x: 148, icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 21V9l9-5 9 5v12M3 21h18M9 21v-6h6v6" stroke="#DB3B2B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
    { label: "Sucursal", x: 240, icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 9l1-4.2A1 1 0 0 1 5.97 4h12.06a1 1 0 0 1 .97.8L20 9M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M3 9h18M9.5 20v-5h5v5" stroke="#DB3B2B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
    { label: "Tienda", x: 332, icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 2l-2 5a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0l-2-5H6zM5 11v9h14v-9M9 20v-5h6v5" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
    { label: "CEDIS", x: 424, icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 21V7l7-3v17M10 21V9l8-3v15M3 21h18M6 11h1M6 14h1M6 17h1M14 11h1M14 14h1" stroke="#DB3B2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
  ];
  const W = 480, H = 400;
  const TX = 240, TY = 300; // truck center

  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: 480, aspectRatio: "480 / 400" }}>
      {/* Lines + falling packages */}
      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" fill="none">
        {POINTS.map((p, i) => (
          <line key={i} x1={p.x} y1={96} x2={TX} y2={TY - 36} stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeDasharray="4 4" />
        ))}
        {POINTS.map((p, i) => (
          <rect key={i} width="7" height="7" rx="1.5" fill="#FFFFFF" opacity="0.9">
            <animateMotion dur={`${1.8 + (i % 3) * 0.4}s`} repeatCount="indefinite" path={`M${p.x - 3.5} ${92} L${TX - 3.5} ${TY - 44}`} begin={`${i * 0.3}s`} />
            <animate attributeName="opacity" values="0;0.95;0.95;0" dur={`${1.8 + (i % 3) * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
          </rect>
        ))}
      </svg>

      {/* Pickup point tiles (white = alto contraste) */}
      {POINTS.map((p, i) => (
        <div key={i} className="absolute flex flex-col items-center gap-1.5" style={{ left: `${(p.x / W) * 100}%`, top: `${(64 / H) * 100}%`, transform: "translate(-50%, -50%)" }}>
          <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[16px] bg-white" style={{ boxShadow: "0 10px 26px rgba(0,0,0,0.45)" }}>
            {p.icon}
          </div>
          <span className="font-inter text-[11px] font-medium text-white/75">{p.label}</span>
        </div>
      ))}

      {/* Camión recolector (principal) */}
      <div className="absolute" style={{ left: `${(TX / W) * 100}%`, top: `${(TY / H) * 100}%`, transform: "translate(-50%, -50%)" }}>
        <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(219,59,43,0.55) 0%, transparent 70%)" }} />
        <div className="truck-go relative flex h-[112px] w-[112px] items-center justify-center rounded-[26px]" style={{ background: "linear-gradient(145deg, #FF6F5E 0%, #DB3B2B 100%)", boxShadow: "0 18px 44px rgba(219,59,43,0.5)" }}>
          {/* Líneas de velocidad */}
          <span aria-hidden className="speed-dash absolute h-[2.5px] w-[16px] rounded-full bg-white/70" style={{ left: -6, top: "42%", animationDelay: "0s" }} />
          <span aria-hidden className="speed-dash absolute h-[2.5px] w-[22px] rounded-full bg-white/70" style={{ left: -10, top: "54%", animationDelay: "0.18s" }} />
          <span aria-hidden className="speed-dash absolute h-[2.5px] w-[13px] rounded-full bg-white/70" style={{ left: -4, top: "66%", animationDelay: "0.34s" }} />
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none"><rect x="1.5" y="6" width="13" height="10" rx="1.2" stroke="#FFFFFF" strokeWidth="1.6" /><path d="M14.5 9.5H18l3 3v3.5h-6.5M4.5 16.5a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM15.5 16.5a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <p className="mt-2 text-center font-inter text-[12px] font-semibold text-white">Recolectando</p>
      </div>
    </div>
  );
}

const IA_PURPLE = "#7C3AED";

/* Chip "✦ IA de T1" (morado) */
function IAChip({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${className}`} style={{ color: IA_PURPLE, background: "rgba(124,58,237,0.10)" }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3z" fill="currentColor" /></svg>
      IA de T1
    </span>
  );
}

function StepCheck() {
  return (
    <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[#5BAE6E]">
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}

/* Panel "Crear recolección" — el flujo de la plataforma en 3 pasos (dirección → paquetería → día) */
function CrearRecoleccionPanel() {
  return (
    <div className="flex flex-col gap-2.5 rounded-[18px] border border-black/[0.06] bg-[#FAFAFA] p-3 tablet:p-4" style={{ boxShadow: "0 16px 50px rgba(0,0,0,0.08)", fontFamily: MANROPE }}>
      <p className="px-1 text-[16px] font-bold text-black">Crear recolección</p>
      {[
        { t: "Dirección de recolección", body: (<><p className="text-[12.5px] font-semibold text-black">Bodega CDMX</p><p className="text-[11.5px] text-black/55">Av. Francisco I. Madero 140, Centro, CDMX · 06000</p></>) },
        {
          t: "Elige la paquetería",
          body: (
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/carriers/fedex.svg" alt="FedEx" width={30} height={30} className="h-[30px] w-[30px]" />
              <span className="text-[12.5px] font-semibold text-black">FedEx</span>
            </div>
          ),
        },
        { t: "Agenda la recolección", body: (<p className="text-[12.5px] font-semibold text-black">Mañana, viernes 21 de agosto</p>) },
      ].map((st, i) => (
        <div key={st.t} className="rounded-[12px] border border-black/[0.07] bg-white px-4 py-3" style={{ animation: "rastreoReveal 0.5s ease both", animationDelay: `${0.1 + i * 0.12}s` }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
            <span className="flex items-center gap-2"><StepCheck /><span className="text-[13px] font-semibold text-black">{st.t}</span></span>
            <span className="text-[11px] text-black/50">Editar</span>
          </div>
          {st.body}
        </div>
      ))}
      <div className="flex items-center justify-between rounded-[12px] border border-black/[0.07] bg-white px-4 py-3">
        <span className="text-[12.5px] text-black/60">Número de paquetes</span>
        <span className="text-[12.5px] font-semibold text-black">12</span>
      </div>
      <span className="self-end rounded-[10px] bg-[#DB3B2B] px-4 py-2 text-[12px] font-semibold text-white">Crear recolección</span>
    </div>
  );
}

/* Panel IA — "Estimando el horario de tu zona…" → horario sugerido + recolección creada */
function HorarioIAPanel() {
  const [phase, setPhase] = useState<0 | 1>(0);
  useEffect(() => {
    const id = setTimeout(() => setPhase((p) => (p === 0 ? 1 : 0)), phase === 0 ? 1700 : 5200);
    return () => clearTimeout(id);
  }, [phase]);
  return (
    <div className="flex flex-col gap-3" style={{ fontFamily: MANROPE }}>
      {/* Agenda la recolección — la IA estima el horario */}
      <div className="rounded-[18px] border border-black/[0.06] bg-white p-4 tablet:p-5" style={{ boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
        <div className="flex items-center gap-2" style={{ marginBottom: 10 }}>
          {phase === 1 ? <StepCheck /> : <span className="h-[20px] w-[20px] shrink-0 rounded-full border-2 border-black/15" />}
          <span className="text-[14px] font-semibold text-black">Agenda la recolección</span>
        </div>
        <p className="text-[12.5px] font-semibold text-black" style={{ marginBottom: 8 }}>Mañana, viernes 21 de agosto</p>
        <div className="min-h-[96px]">
          {phase === 0 ? (
            <div key="loading" className="rounded-[12px] border px-4 py-3" style={{ borderColor: "rgba(124,58,237,0.18)", background: "rgba(124,58,237,0.05)", animation: "fadeSlideIn 0.3s ease-out both" }}>
              <p className="flex items-center gap-2 text-[12px] font-medium" style={{ color: IA_PURPLE }}>
                <span className="h-[12px] w-[12px] rounded-full border-2 border-current border-t-transparent" style={{ animation: "spin 0.8s linear infinite" }} />
                Estimando el horario de tu zona…
              </p>
              <span className="mt-3 block h-[8px] w-[62%] rounded-full" style={{ background: "rgba(124,58,237,0.14)" }} />
              <span className="mt-2 block h-[8px] w-[84%] rounded-full" style={{ background: "rgba(124,58,237,0.10)" }} />
            </div>
          ) : (
            <div key="result" style={{ animation: "fadeSlideIn 0.4s ease-out both" }}>
              <div className="flex items-center gap-2">
                <span className="text-[24px] font-semibold text-black" style={{ letterSpacing: "-0.01em" }}>10:00 – 13:00</span>
                <IAChip />
              </div>
              <p className="mt-1 text-[12.5px] text-black/65">FedEx suele recolectar en tu zona en este horario.</p>
              <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-black/65">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                Ten tus paquetes listos desde las 10:00
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ¡Recolección creada con éxito! — con la línea del horario recomendado por IA */}
      <div className="rounded-[18px] border border-black/[0.06] bg-white p-4 tablet:p-5" style={{ boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
        <div className="flex items-center gap-2.5" style={{ marginBottom: 12 }}>
          <span className="status-pulse flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#15A33F]" style={{ ["--glow" as string]: "rgba(21,163,63,0.4)" }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <p className="text-[14px] font-bold text-black">¡Recolección creada con éxito!</p>
        </div>
        <div className="flex items-start justify-between gap-3 rounded-[12px] border border-black/[0.08] px-3.5 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/carriers/fedex.svg" alt="FedEx" width={34} height={34} className="h-[34px] w-[34px] shrink-0 object-contain" />
            <div className="min-w-0">
              <p className="text-[11px] text-black/55">FedEx · Bodega CDMX</p>
              <p className="truncate text-[12.5px] font-bold text-black">12 paquetes</p>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[12px] font-semibold text-black/80">Mañana, 21 de agosto</p>
            <p className="text-[11px] text-black/50">10:00 - 13:00 hrs</p>
          </div>
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11.5px] text-black/70">
          <IAChip />
          Horario recomendado por IA de T1 · 10:00–13:00
        </div>
      </div>
    </div>
  );
}

export default function T1Recolecciones() {
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
      {/* ════════════ HERO — copy left, interactive scheduler right ════════════ */}
      <section className="relative flex items-center overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-20 tablet:pb-10 tablet:h-[660px]">
        <HeroBackground fade={false} />
        <div className="relative z-10 mx-auto w-full max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-12 tablet:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] tablet:gap-16">
            {/* Copy */}
            <div>
              <h1 className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[56px]" style={{ lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 22 }}>
                Tus paquetes siempre{" "}
                <span className="relative inline-block">
                  en camino
                  
                </span>.
              </h1>
              <p className="font-inter text-[16px] font-light text-white/70 tablet:text-[19px]" style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 470 }}>
                Programa tus recolecciones en minutos y la IA de T1 te sugiere el horario en que la paquetería suele pasar por tu zona.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SIGNUP_URL} className="inline-flex items-center rounded-full bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                  Programar recolección
                </a>
              </div>
            </div>

            {/* Hero visual — puntos de recolección → T1 */}
            <RecoleccionOrbit />
          </div>
        </div>
      </section>

      {/* ════════════ DESDE DONDE OPERES — 3 cards ════════════ */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32" data-modal-animate>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              Configura tus recolecciones desde donde operes
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {[
              { title: "Sucursal", desc: "Que pasen por tu tienda física en el horario que definas.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 9l1-4.2A1 1 0 0 1 5.97 4h12.06a1 1 0 0 1 .97.8L20 9M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M3 9h18M9.5 20v-5h5v5" stroke="#0E0E0E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Bodega", desc: "Recolección de volumen desde tu centro de operación.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M3 21V9l9-5 9 5v12M3 21h18M9 21v-6h6v6" stroke="#0E0E0E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Casa", desc: "Vendes desde casa, T1 pasa por tus paquetes igual.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 11l8-7 8 7M6 10v9h12v-9M10 19v-5h4v5" stroke="#0E0E0E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
            ].map((c, i) => (
              <div key={c.title} data-stagger className="tienda-card w-full max-w-[300px] rounded-[18px] border border-black/[0.06] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.07)]" style={{ ["--i" as string]: i }}>
                <div style={{ marginBottom: 18 }}>{c.icon}</div>
                <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 6 }}>{c.title}</h3>
                <p className="font-inter text-[14px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ SPLIT — programar es fácil (flujo de la plataforma) ════════════ */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32" data-modal-animate>
        <div className="mx-auto flex max-w-[var(--max-w)] items-center">
          <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
            <div>
              <h2 className="font-sora text-[28px] font-light text-black tablet:text-[40px] lg:text-[46px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 18 }}>
                Programa tus recolecciones fácil
              </h2>
              <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                Elige el punto de recolección, la paquetería y el día. En unos clics queda agendada, sin llamadas ni filas en sucursal.
              </p>
              <ul className="flex flex-col gap-2.5">
                {["Todo el flujo en una sola pantalla", "Guarda tus puntos de recolección", "Comprobante de lo recolectado"].map((it) => (
                  <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            <CrearRecoleccionPanel />
          </div>
        </div>
      </section>

      {/* ════════════ SPLIT (reverse) — IA de T1: horario recomendado ════════════ */}
      <section className="relative bg-[#FBFBFB] px-5 py-24 tablet:px-10 tablet:py-32" data-modal-animate>
        <div className="mx-auto flex max-w-[var(--max-w)] items-center">
          <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
            <div className="order-2 tablet:order-1">
              <HorarioIAPanel />
            </div>
            <div className="order-1 tablet:order-2">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-inter text-[12px] font-semibold" style={{ color: IA_PURPLE, background: "rgba(124,58,237,0.10)" }}>
                ✦ IA de T1
              </span>
              <h2 className="font-sora text-[28px] font-light text-black tablet:text-[40px] lg:text-[46px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 18 }}>
                Tu recolección, en el mejor horario
              </h2>
              <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                Nuestra IA aprendió de más de 1.6 millones de recolecciones reales y te recomienda el horario en que la paquetería suele pasar por tu zona. Prepara tus paquetes con tiempo y aprovecha mejor tu día.
              </p>
              <ul className="flex flex-col gap-2.5">
                {["Horario recomendado según tu código postal y día de la semana", "Sugerencia por paquetería: FedEx, DHL, Estafeta y más", "Recordatorio el día del pickup"].map((it) => (
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
      <T1FAQSection
        faqs={[
          { q: "¿Desde dónde pueden recolectar?", a: "Desde tu sucursal, bodega o casa. Defines uno o varios puntos de recolección y el horario que mejor te convenga." },
              { q: "¿Cómo sé a qué hora pasará la paquetería?", a: "Al agendar, la IA de T1 te sugiere el horario en que esa paquetería suele recolectar en tu zona, según tu código postal y el día de la semana. Así tienes tus paquetes listos a tiempo y organizas mejor tu día." },
          { q: "¿Tiene costo la recolección?", a: "Depende de la paquetería y tu plan. Al agendar verás si el pickup está incluido o su costo antes de confirmar." },
          { q: "¿Cómo sé que pasaron por mis paquetes?", a: "Recibes un comprobante de lo recolectado y el seguimiento en vivo de cada guía continúa desde el administrador de T1." },
        ]}
      />

      <T1FinalCTA
        title="Recolecciones desde donde operas"
        description="Programa tu primera recolección hoy y deja que T1 pase por tus envíos desde donde operes."
        buttonLabel="Programar recolección"
      />
    </div>
  );
}
