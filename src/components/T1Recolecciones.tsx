"use client";

import { useEffect, useRef } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import T1FinalCTA from "@/components/T1FinalCTA";

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

/* Mockup "¡Recolección creada con éxito!" — SOLO responsive */
function RecoleccionCreadaPhone({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <PhoneShell>
        <div className="flex items-center gap-2.5" style={{ marginBottom: 18 }}>
          <span className="status-pulse flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#15A33F]" style={{ ["--glow" as string]: "rgba(21,163,63,0.4)" }}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <p className="text-[17px] font-bold text-black">¡Recolección creada con éxito!</p>
        </div>

        <div className="rounded-[14px] border border-black/[0.08]">
          {/* Carrier + horario */}
          <div className="flex items-start justify-between gap-3 px-4 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <img src="/img/carriers/fedex.svg" alt="FedEx" width={48} height={48} className="h-[48px] w-[48px] shrink-0" />
              <div className="min-w-0">
                <p className="text-[13px] text-black/55">FedEx</p>
                <p className="truncate text-[16px] font-bold text-black">34567889909765445676</p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[14px] font-semibold text-black/80">Mañana, 08 de Octubre</p>
              <p className="text-[12px] text-black/50">10:00 - 13:00 hrs</p>
            </div>
          </div>
          {/* Ubicación + paquetes */}
          <div className="flex items-start justify-between gap-3 border-t border-black/[0.06] px-4 py-4">
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-black" style={{ marginBottom: 3 }}>Bodega CDMX</p>
              <p className="text-[12px] text-black/55" style={{ lineHeight: 1.5 }}>Lago Zurich 25, C.P. 55110, Ampliación granada, CDMX, México.</p>
            </div>
            <span className="shrink-0 whitespace-nowrap text-[13px] text-black/55">12 paquetes</span>
          </div>
        </div>
      </PhoneShell>
    </div>
  );
}

/* Mockup "Recolección de hoy" — SOLO responsive */
function RecoleccionHoyPhone({ className = "" }: { className?: string }) {
  const CARRIERS = [
    { brand: "fedex", name: "FedEx", count: "8 guías" },
    { brand: "dhl", name: "DHL", count: "5 guías" },
    { brand: "estafeta", name: "Estafeta", count: "3 guías" },
  ];
  return (
    <div className={className}>
      <PhoneShell>
        <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
          <p className="text-[19px] font-bold text-black">Recolección de hoy</p>
          <span className="rounded-full bg-[rgba(219,59,43,0.10)] px-3 py-1 text-[12px] font-bold text-[#DB3B2B]">1 visita</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {CARRIERS.map((c, i) => (
            <div key={i} className="flex items-center gap-3 rounded-[12px] border border-black/[0.08] bg-white px-3.5 py-3">
              <img src={`/img/carriers/${c.brand}.svg`} alt={c.name} width={40} height={40} className="h-[40px] w-[40px] shrink-0" />
              <span className="min-w-0 flex-1 truncate text-[15px] font-semibold text-black">{c.name}</span>
              <span className="text-[13px] text-black/55">{c.count}</span>
            </div>
          ))}
        </div>
        <div className="mt-3.5 flex items-center gap-2 rounded-[12px] bg-[#FAFAF9] px-3.5 py-3">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="text-[12px] text-black/65">16 paquetes · 3 paqueterías · una sola recolección</span>
        </div>
      </PhoneShell>
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
      <section className="relative flex items-center overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-20 tablet:pb-10 tablet:h-[660px]" style={{ background: "linear-gradient(135deg, #261515 0%, #1A0A0A 40%, #261515 100%)" }}>
        <div className="relative mx-auto w-full max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-12 tablet:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] tablet:gap-16">
            {/* Copy */}
            <div>
              <h1 className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[56px]" style={{ lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 22 }}>
                Tus paquetes siempre{" "}
                <span className="relative inline-block">
                  en camino
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.35)", borderRadius: 5, zIndex: -1 }} />
                </span>.
              </h1>
              <p className="font-inter text-[16px] font-light text-white/70 tablet:text-[19px]" style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 470 }}>
                Programa pickups una vez y T1 los repite automáticamente.
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
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15 }}>
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

      {/* ════════════ SPLIT — pickup recurrente + weekly calendar ════════════ */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32" data-modal-animate>
        <div className="mx-auto flex max-w-[var(--max-w)] items-center">
          <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
            <div>
              <h2 className="font-sora text-[28px] font-light text-black tablet:text-[40px] lg:text-[46px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                Recolecciones automáticas
              </h2>
              <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                Define tus días de recolección y T1 agenda tus pickups automáticamente.
              </p>
              <ul className="flex flex-col gap-2.5">
                {["Recolecciones recurrentes por día y horario", "Pausa o ajusta tu agenda cuando quieras", "Recordatorio del pickup del día"].map((it) => (
                  <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            {/* Panel — teléfono en responsive */}
            <RecoleccionCreadaPhone className="tablet:hidden" />
            {/* Panel — recolección creada con éxito (desktop) */}
            <div className="relative hidden overflow-hidden rounded-[18px] border border-black/[0.06] bg-white tablet:block" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)", fontFamily: MANROPE, animation: "rastreoReveal 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
              <div className="flex items-center gap-2.5" style={{ marginBottom: 18 }}>
                <span className="status-pulse flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#15A33F]" style={{ ["--glow" as string]: "rgba(21,163,63,0.4)" }}>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <p className="text-[15px] font-bold text-black">¡Recolección creada con éxito!</p>
              </div>

              <div className="rounded-[14px] border border-black/[0.08]">
                {/* Carrier + horario */}
                <div className="flex items-start justify-between gap-3 px-4 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <img src="/img/carriers/fedex.svg" alt="FedEx" width={40} height={40} className="h-[40px] w-[40px] shrink-0 object-contain" />
                    <div className="min-w-0">
                      <p className="text-[12px] text-black/55">FedEx</p>
                      <p className="truncate text-[14px] font-bold text-black">34567889909765445676</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[13px] font-semibold text-black/80">Mañana, 08 de Octubre</p>
                    <p className="text-[11px] text-black/50">10:00 - 13:00 hrs</p>
                  </div>
                </div>
                {/* Ubicación + paquetes */}
                <div className="flex items-start justify-between gap-3 border-t border-black/[0.06] px-4 py-4">
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-black" style={{ marginBottom: 3 }}>Bodega CDMX</p>
                    <p className="text-[11px] text-black/55" style={{ lineHeight: 1.5 }}>Lago Zurich 25, C.P. 55110, Ampliación granada, CDMX, México.</p>
                  </div>
                  <span className="shrink-0 whitespace-nowrap text-[12px] text-black/55">12 paquetes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ SPLIT (reverse) — multi-paquetería en una visita ════════════ */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32" data-modal-animate>
        <div className="mx-auto flex max-w-[var(--max-w)] items-center">
          <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
            {/* Panel — teléfono en responsive */}
            <RecoleccionHoyPhone className="order-2 tablet:hidden" />
            {/* Panel — multiple carriers one pickup (desktop) */}
            <div className="relative order-2 hidden overflow-hidden rounded-[18px] border border-black/[0.06] bg-white tablet:order-1 tablet:block" style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)", fontFamily: MANROPE }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
                <p className="text-[14px] font-bold text-black">Recolección de hoy</p>
                <span className="rounded-full bg-[rgba(219,59,43,0.10)] px-2.5 py-1 text-[10px] font-bold text-[#DB3B2B]">1 visita</span>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { brand: "fedex", name: "FedEx", count: "8 guías" },
                  { brand: "dhl", name: "DHL", count: "5 guías" },
                  { brand: "estafeta", name: "Estafeta", count: "3 guías" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-[10px] border border-black/[0.06] bg-white px-3 py-2.5">
                    <img src={`/img/carriers/${c.brand}.svg`} alt={c.name} width={30} height={30} className="h-[30px] w-[30px] shrink-0 object-contain" />
                    <span className="min-w-0 flex-1 truncate text-[12px] font-semibold text-black">{c.name}</span>
                    <span className="text-[11px] text-black/55">{c.count}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-[10px] bg-[#FAFAF9] px-3 py-2.5">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="text-[11px] text-black/65">16 paquetes · 3 paqueterías · una sola recolección</span>
              </div>
            </div>

            <div className="order-1 tablet:order-2">
              <h2 className="font-sora text-[28px] font-light text-black tablet:text-[40px] lg:text-[46px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                Varias paqueterías, una sola visita
              </h2>
              <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                Junta todos tus envíos del día sin importar la paquetería. T1 coordina la recolección para que entregues todo de una vez, en un mismo punto.
              </p>
              <ul className="flex flex-col gap-2.5">
                {["Consolida +25 paqueterías en un pickup", "Menos interrupciones en tu operación", "Comprobante de lo recolectado"].map((it) => (
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
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32" data-white-card>
        <div className="mx-auto max-w-[760px]">
          <div className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>
              Preguntas frecuentes
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { q: "¿Desde dónde pueden recolectar?", a: "Desde tu sucursal, bodega o casa. Defines uno o varios puntos de recolección y el horario que mejor te convenga." },
              { q: "¿Puedo programar recolecciones recurrentes?", a: "Sí. Eliges los días y la ventana de horario, y T1 agenda el pickup cada semana en automático. Puedes pausarlo o ajustarlo cuando quieras." },
              { q: "¿Recogen varias paqueterías en una sola visita?", a: "Sí. T1 consolida tus envíos del día de +25 paqueterías para que entregues todo en una sola recolección." },
              { q: "¿Tiene costo la recolección?", a: "Depende de la paquetería y tu plan. Al agendar verás si el pickup está incluido o su costo antes de confirmar." },
              { q: "¿Cómo sé que pasaron por mis paquetes?", a: "Recibes un comprobante de lo recolectado y el seguimiento en vivo de cada guía continúa desde tu panel de T1." },
            ].map((f) => (
              <details
                key={f.q}
                className="group rounded-[14px] border border-black/[0.06] bg-white transition-all duration-200 open:border-[rgba(219,59,43,0.2)] open:shadow-[0_4px_18px_rgba(0,0,0,0.05)]"
              >
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
        title="Recolecciones desde donde operas"
        description="Programa tu primera recolección hoy y deja que T1 pase por tus envíos desde donde operes."
        buttonLabel="Programar recolección"
      />
    </div>
  );
}
