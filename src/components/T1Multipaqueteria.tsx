"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
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

/* Panel "Dimensiones del paquete" con efecto de escritura en autoplay */
function DimensionesPanel({ className = "", variant = "card" }: { className?: string; variant?: "card" | "phone" }) {
  const NOMBRE = "Caja para botas";
  const FIELDS = [
    { label: "Largo", value: "23", unit: "cm" },
    { label: "Alto", value: "45", unit: "cm" },
    { label: "Ancho", value: "25", unit: "cm" },
    { label: "Peso", value: "2", unit: "kg" },
  ];
  // Se llenan uno por uno (secuencial): Nombre → Largo → Alto → Ancho → Peso.
  const ORDER_LENS = [NOMBRE.length, ...FIELDS.map((f) => f.value.length)];
  const OFFSETS = ORDER_LENS.map((_, i) => ORDER_LENS.slice(0, i).reduce((a, b) => a + b, 0));
  const TOTAL = ORDER_LENS.reduce((a, b) => a + b, 0);
  const HOLD = 14; // ticks que mantiene todo lleno antes de reiniciar
  const [p, setP] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setP((prev) => (prev >= TOTAL + HOLD ? 0 : prev + 1));
    }, 190);
    return () => clearInterval(id);
  }, [TOTAL]);

  const sliced = (order: number, s: string) => s.slice(0, Math.max(0, Math.min(s.length, p - OFFSETS[order])));
  const caret = (order: number, s: string) => {
    const local = p - OFFSETS[order];
    return p <= TOTAL && local >= 0 && local < s.length;
  };

  const content = (
    <>
      <p className="text-[18px] font-semibold text-black" style={{ marginBottom: 18 }}>Dimensiones del paquete</p>

      {/* Selected template chip */}
      <div className="flex items-center justify-between rounded-[10px] border border-black/[0.1] bg-white px-3.5 py-3" style={{ marginBottom: 18 }}>
        <span className="text-[13px] text-black/80">Caja para bota</span>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="rgba(0,0,0,0.4)" strokeWidth="1.4" strokeLinecap="round" /></svg>
      </div>

      {/* Template name (typing) */}
      <label className="block text-[12px] text-black/55" style={{ marginBottom: 6 }}>Nombre de plantilla</label>
      <div className="rounded-[10px] border border-black/[0.1] bg-white px-3.5 py-3" style={{ marginBottom: 18 }}>
        {sliced(0, NOMBRE) === "" && !caret(0, NOMBRE) ? (
          <span className="text-[13px] text-black/35">Caja para botas</span>
        ) : (
          <span className="text-[13px] text-black/80">{sliced(0, NOMBRE)}{caret(0, NOMBRE) && <span className="type-caret" />}</span>
        )}
      </div>

      {/* Dimensions (typing) */}
      <div className="grid grid-cols-2 gap-3 tablet:grid-cols-4" style={{ marginBottom: 16 }}>
        {FIELDS.map((f, i) => (
          <div key={f.label}>
            <label className="block text-[12px] text-black/55" style={{ marginBottom: 6 }}>{f.label}</label>
            <div className="flex items-center justify-between rounded-[10px] border border-black/[0.1] bg-white px-3 py-2.5">
              <span className="text-[13px] text-black/80">{sliced(i + 1, f.value)}{caret(i + 1, f.value) && <span className="type-caret" />}</span>
              <span className="text-[11px] text-black/35">{f.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Checkboxes */}
      <div className="flex flex-col gap-2.5">
        {["Guardar cambios en esta plantilla", "Guardar como una nueva plantilla"].map((c) => (
          <label key={c} className="flex items-center gap-2.5 text-[13px] text-black/70">
            <span className="h-[16px] w-[16px] shrink-0 rounded-[4px] border border-black/20 bg-white" />
            {c}
          </label>
        ))}
      </div>
    </>
  );

  if (variant === "phone") {
    return <div className={className}><PhoneShell>{content}</PhoneShell></div>;
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white ${className}`}
      style={{ padding: 24, boxShadow: "0 16px 50px rgba(0,0,0,0.08)", fontFamily: "var(--font-manrope-var), 'Manrope', sans-serif" }}
    >
      {content}
    </div>
  );
}

/* Brand logos for the hero orbit (real SVG icons) */
const ORBIT = [
  { name: "FedEx", logo: "/img/carriers/fedex.svg" },
  { name: "DHL", logo: "/img/carriers/dhl.svg" },
  { name: "Paquetexpress", logo: "/img/carriers/paquetexpress.svg" },
  { name: "UPS", logo: "/img/carriers/ups.svg" },
  { name: "99 Minutos", logo: "/img/carriers/99min.svg" },
  { name: "Grupo ampm", logo: "/img/carriers/ampm.svg" },
  { name: "J&T Express", logo: "/img/carriers/jtexpress.svg" },
  { name: "Estafeta", logo: "/img/carriers/estafeta.svg" },
];

/* Hero visual — radar circular (mismo estilo que reglas) */
function RadarFlow() {
  const C = 240;
  const R = 180;
  const LOGOS = [
    "/img/carriers/fedex.svg",
    "/img/carriers/dhl.svg",
    "/img/carriers/estafeta.svg",
    "/img/carriers/paquetexpress.svg",
    "/img/carriers/ups.svg",
    "/img/carriers/99min.svg",
  ];
  const NODES = LOGOS.map((logo, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    return { logo, x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
  });

  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: 480, aspectRatio: "1 / 1" }}>
      {/* Rotating radar sweep */}
      <div
        aria-hidden
        className="radar-sweep pointer-events-none absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: "78%",
          height: "78%",
          background: "conic-gradient(from 0deg, rgba(219,59,43,0.26) 0deg, rgba(219,59,43,0.06) 36deg, transparent 70deg, transparent 360deg)",
          maskImage: "radial-gradient(circle, #000 64%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle, #000 64%, transparent 100%)",
        }}
      />

      {/* Rings, spokes + particles */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 480 480" fill="none" preserveAspectRatio="xMidYMid meet">
        {[72, 126, 180].map((r) => (
          <circle key={r} cx={C} cy={C} r={r} stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 5" />
        ))}
        {NODES.map((n, i) => (
          <line key={i} x1={C} y1={C} x2={n.x} y2={n.y} stroke="rgba(255,255,255,0.16)" strokeWidth="1" strokeDasharray="4 4" />
        ))}
        {NODES.map((n, i) => (
          <circle key={i} r="2.6" fill="#E26153" opacity="0.85">
            <animateMotion dur="2.6s" repeatCount="indefinite" path={`M${C} ${C} L${n.x} ${n.y}`} begin={`${i * 0.45}s`} />
          </circle>
        ))}
      </svg>

      {/* Carrier nodes around the ring */}
      {NODES.map((n, i) => (
        <div key={i} className="absolute" style={{ left: `${(n.x / 480) * 100}%`, top: `${(n.y / 480) * 100}%`, transform: "translate(-50%, -50%)" }}>
          <span aria-hidden className="carrier-ping absolute left-1/2 top-1/2 h-[46px] w-[46px] -translate-x-1/2 -translate-y-1/2 rounded-[12px]" style={{ animationDelay: `${i}s` }} />
          <img src={n.logo} alt="Paquetería" width={46} height={46} className="relative h-[46px] w-[46px] object-contain" style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.4))" }} />
        </div>
      ))}

      {/* T1 hub at center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(219,59,43,0.40) 0%, transparent 70%)" }} />
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[18px]" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 8px 34px rgba(219,59,43,0.35)" }}>
          <svg width="40" height="38" viewBox="0 0 45 44" fill="none">
            <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457V19.1513V19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#D93A26" />
            <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592H22.4335H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#D93A26" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* Marco de teléfono reutilizable (status bar + bordes redondeados) — SOLO responsive */
function PhoneShell({ children }: { children: React.ReactNode }) {
  const MANROPE = "var(--font-manrope-var), 'Manrope', sans-serif";
  return (
    <div className="mx-auto w-full" style={{ maxWidth: 340, fontFamily: MANROPE }}>
      <div
        className="relative overflow-hidden bg-white"
        style={{ borderRadius: 44, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}
      >
        {/* Contenido */}
        <div className="px-5 pt-7 pb-7">{children}</div>
      </div>
    </div>
  );
}

/* Mockup de teléfono "Cotizador" — SOLO se muestra en versión mobile/responsive */
function CotizadorPhone() {
  const BR = "#C0453A";
  const FILTERS = ["Paquetería", "Tipo de servicio", "Ventajas"];
  const OPTIONS = [
    { brand: "fedex", name: "Fedex", sub: "Mismo día / 24H", eta: "2 días hábiles", etaSub: "Mié - 24/ene/24", price: "$143.00", highlight: true },
    { brand: "fedex", name: "Fedex", sub: "Servicio express", eta: "2 días hábiles", etaSub: "Mié - 24/ene/24", price: "$143.00", highlight: false },
  ];

  const Chevron = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0"><path d="M6 9l6 6 6-6" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );

  return (
    <PhoneShell>
      {/* Filtros */}
      <div className="flex flex-wrap gap-2" style={{ marginBottom: 4 }}>
            {FILTERS.map((f) => (
              <span key={f} className="flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12px] font-medium text-black/75" style={{ borderColor: "rgba(0,0,0,0.14)" }}>
                {f}
                <Chevron />
              </span>
            ))}
          </div>

          {/* Resultados */}
          {OPTIONS.map((o, i) => (
            <div key={i} className="relative overflow-hidden" style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 18, paddingBottom: 18 }}>
              {/* Shimmer sweep del resultado destacado (mismo efecto que desktop) */}
              {o.highlight && (
                <span aria-hidden className="cotiza-sweep pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2" style={{ background: "linear-gradient(100deg, transparent 0%, rgba(219,59,43,0.14) 50%, transparent 100%)" }} />
              )}
              {/* Cabecera: logo + nombre + servicio */}
              <div className="flex items-center gap-3">
                <img src={`/img/carriers/${o.brand}.svg`} alt={o.name} width={52} height={52} className="h-[52px] w-[52px] shrink-0" />
                <div className="min-w-0">
                  <p className="text-[17px] font-bold text-black leading-tight">{o.name}</p>
                  <p className="text-[14px] text-black/55" style={{ marginTop: 2 }}>{o.sub}</p>
                </div>
              </div>

              {/* Entrega estimada / Precio */}
              <div className="flex justify-between" style={{ marginTop: 16 }}>
                <div>
                  <span className="block text-[13px] text-black/45">Entrega estimada:</span>
                  <span className="block text-[18px] font-bold text-black" style={{ marginTop: 2 }}>{o.eta}</span>
                  <span className="block text-[12px] text-black/40" style={{ marginTop: 1 }}>{o.etaSub}</span>
                </div>
                <div className="text-right">
                  <span className="block text-[13px] text-black/45">Precio:</span>
                  <span className={`block text-[18px] font-bold text-black ${o.highlight ? "price-pop" : ""}`} style={{ marginTop: 2 }}>
                    {o.price}<span className="ml-1 text-[11px] font-medium text-black/45">MXN</span>
                  </span>
                </div>
              </div>

              {/* Botón */}
              <button className="mt-4 w-full rounded-[12px] py-3.5 text-[15px] font-semibold text-white" style={{ background: BR }}>
                Crear envío
              </button>
            </div>
          ))}
    </PhoneShell>
  );
}

/* Panel "Cronograma" (auto-scroll) — variant "card" (desktop) / "phone" (responsive) */
function CronogramaPanel({ className = "", variant = "card" }: { className?: string; variant?: "card" | "phone" }) {
  const EVENTS = [
    { chip: "Ayer", title: "Devolución #5127-RE01 rechazada — no vale", time: "12:20:39 p.m." },
    { title: "Devolución #5127-RE01 solicitada — 2 artículos", time: "12:19:49 p.m." },
    { icon: "box", title: "Paquete entregado · Recibió: test lopez quiroz", time: "12:02:59 p.m." },
    { icon: "truck", title: "Evento de envío: delivered · #5127-SH1 · Mexico City · Package delivered successfully", time: "12:02:59 p.m." },
    { title: "Guía manual almacenada QA-Manual · QA-1782237769", time: "12:02:55 p.m." },
    { title: "Pedido preparado", time: "12:02:33 p.m." },
    { title: "Orden marcada como pagada · $292.0 via manual", time: "12:02:29 p.m." },
  ];

  const header = (
    <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
      <p className="text-[16px] font-semibold text-black">Cronograma</p>
      <span className="rounded-[10px] border border-black/[0.12] px-3 py-1.5 text-[11px] font-medium text-black/70">Agregar un comentario</span>
    </div>
  );

  const track = (
    <div className="crono-track flex flex-col">
      {[...EVENTS, ...EVENTS].map((e, i) => (
        <div key={i} className="relative flex gap-3" style={{ paddingBottom: 20 }}>
          {/* dotted connector */}
          <span aria-hidden className="absolute" style={{ left: 9, top: 22, bottom: -2, borderLeft: "2px dotted rgba(0,0,0,0.16)" }} />
          {/* node */}
          <div className="relative z-10 flex w-[20px] shrink-0 justify-center" style={{ paddingTop: 3 }}>
            {e.icon === "box" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" /><path d="M4 7.5l8 4.5 8-4.5M12 12v9" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" /></svg>
            ) : e.icon === "truck" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="1" y="6" width="13" height="10" rx="1" stroke="#1A1A1A" strokeWidth="1.5" /><path d="M14 9h4l3 3v4h-7M4 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM15 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            ) : (
              <span className="h-[9px] w-[9px] rounded-full bg-[#1A1A1A]" style={{ marginTop: 2 }} />
            )}
          </div>
          {/* content */}
          <div className="flex-1" style={{ minWidth: 0 }}>
            {e.chip && <span className="mb-1.5 inline-block rounded-[6px] bg-black/[0.06] px-2 py-0.5 text-[11px] font-medium text-black/55">{e.chip}</span>}
            <p className="text-[12.5px] text-black/85" style={{ lineHeight: 1.4 }}>{e.title}</p>
            <p className="text-[11px] text-black/40" style={{ marginTop: 2 }}>{e.time}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const mask = "linear-gradient(to bottom, transparent 0, #000 16px, #000 calc(100% - 22px), transparent 100%)";

  if (variant === "phone") {
    return (
      <div className={className}>
        <PhoneShell>
          {header}
          <div className="relative overflow-hidden" style={{ height: 300, maskImage: mask, WebkitMaskImage: mask }}>
            {track}
          </div>
        </PhoneShell>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white ${className}`} style={{ padding: 22, boxShadow: "0 16px 50px rgba(0,0,0,0.08)", height: 318.5, display: "flex", flexDirection: "column", fontFamily: "var(--font-manrope-var), 'Manrope', sans-serif" }}>
      {header}
      <div className="relative flex-1 overflow-hidden" style={{ maskImage: mask, WebkitMaskImage: mask }}>
        {track}
      </div>
    </div>
  );
}

export default function T1Multipaqueteria() {
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
    <div ref={rootRef} className="w-full">
      {/* ── Hero — text left, carriers connected visual right ── */}
      <section
        className="relative flex items-center px-5 pt-28 pb-16 tablet:px-10 tablet:pt-20 tablet:pb-10 tablet:h-[660px]"
        style={{ background: "linear-gradient(135deg, #261515 0%, #1A0A0A 40%, #261515 100%)" }}
      >
        <div className="mx-auto w-full max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] tablet:gap-12">
            <div>
              <h1
                className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[56px]"
                style={{ lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 22 }}
              >
                Envía a +25<br />
                <span className="relative inline-block">
                  paqueterías
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.30)", borderRadius: 5, zIndex: -1 }} />
                </span>
                {" "}en<br />
                un click.
              </h1>
              <p
                className="font-inter text-[16px] font-light text-white/65 tablet:text-[19px]"
                style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}
              >
                Cotiza, genera guías y rastrea desde un solo panel.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                  Comenzar ahora
                </a>
              </div>
            </div>

            {/* Right — radar circular (igual que reglas) */}
            <RadarFlow />
          </div>
        </div>
      </section>

      {/* ── Antes ── */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32" data-white-card>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15 }}>
              Negociar con cada paquetería <em className="not-italic text-black">no debería ser tu trabajo.</em>
            </h2>
          </div>
          <div data-modal-animate className="flex flex-wrap justify-center gap-5">
            {[
              { title: "Tarifas poco claras", desc: "Cada paquetería con su tabla. Comparar manualmente toma horas.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#0E0E0E" strokeWidth="1.6" /><path d="M8 8h8M8 12h8M8 16h5" stroke="#0E0E0E" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Contratos individuales", desc: "Negociaciones directas con cada carrier, descuentos sólo a alto volumen.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 3h10l6 5v13H4V3z" stroke="#0E0E0E" strokeWidth="1.6" strokeLinejoin="round" /><path d="M14 3v5h6M8 13h8M8 17h5" stroke="#0E0E0E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Plataformas separadas", desc: "Una para FedEx, otra para DHL, otra para Estafeta. Todo desconectado.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M16 3h5v5M21 3l-7 7M8 21H3v-5M3 21l7-7M21 16v5h-5M14 14l7 7M3 8V3h5M10 10 3 3" stroke="#0E0E0E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
            ].map((p, i) => (
              <div key={p.title} data-stagger className="w-full max-w-[300px] rounded-[18px] border border-black/[0.06] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.07)]" style={{ ["--i" as string]: i }}>
                <div style={{ marginBottom: 24 }}>{p.icon}</div>
                <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 8 }}>{p.title}</h3>
                <p className="font-inter text-[14px] font-light text-black/55" style={{ lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stack cards intro ── */}
      <section className="relative bg-white px-5 pt-12 pb-8 tablet:px-10 tablet:pt-16 tablet:pb-10">
        <div data-modal-animate className="mx-auto max-w-[760px] text-center">
          <h2 className="font-sora text-[28px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.4px", lineHeight: 1.1 }}>
            Una sola integración.
          </h2>
        </div>
      </section>

      {/* ── Stack cards ── */}
      <div className="relative bg-white">
        {/* Block 1 — Cotiza al instante (text left, panel right) — bg white, no shadow */}
        <div className="px-5 py-20 tablet:px-10 tablet:py-28" style={{ background: "#FFFFFF" }} data-modal-animate>
          <div className="mx-auto flex max-w-[var(--max-w)] items-center">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Cotiza con múltiples paqueterías
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Compara precios y tiempos en un solo paso.
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
              {/* Panel — mobile: mockup de teléfono "Cotizador" (solo responsive) */}
              <div className="tablet:hidden">
                <CotizadorPhone />
              </div>
              {/* Panel — desktop: quote comparison table */}
              <div className="relative hidden overflow-hidden rounded-[18px] border border-black/[0.06] bg-white tablet:block" style={{ padding: 16, boxShadow: "0 16px 50px rgba(0,0,0,0.08)", fontFamily: "var(--font-manrope-var), 'Manrope', sans-serif" }}>
                {(() => {
                  const cols = "1.55fr 1fr 1.35fr 0.85fr";
                  const QIcon = () => (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="rgba(0,0,0,0.3)" strokeWidth="1.6" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.2 2.4c-.5.2-.7.5-.7 1v.6" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" strokeLinecap="round" /><circle cx="12" cy="16.5" r="0.8" fill="rgba(0,0,0,0.4)" /></svg>
                  );
                  const rows = [
                    { brand: "fedex", name: "Fedex", svc: "Mismo día / 24H", badge: "spark", highlight: true },
                    { brand: "fedex", name: "Fedex", svc: "Servicio express", badge: null, highlight: false },
                    { brand: "dhl", name: "DHL", svc: "Servicio express", badge: null, highlight: false },
                    { brand: "paquetexpress", name: "Paquetexpress", svc: "Servicio express", badge: "star", highlight: false },
                    { brand: "ups", name: "UPS", svc: "Servicio express", badge: "bolt", highlight: false },
                  ];
                  return (
                    <>
                      {/* Header */}
                      <div className="grid items-center gap-2 px-3 py-2.5" style={{ gridTemplateColumns: cols }}>
                        <span className="text-[10px] font-medium text-black/55">Paquetería</span>
                        <span className="flex items-center gap-1 text-[10px] font-medium text-black/55">Entrega estimada<QIcon /></span>
                        <span className="flex items-center gap-1 text-[10px] font-medium text-black/55">Envío de paquetes<QIcon /></span>
                        <span className="text-right text-[10px] font-medium text-black/55">Precio</span>
                      </div>
                      {/* Rows */}
                      <div className="flex flex-col gap-2">
                        {rows.map((r, i) => (
                          <div
                            key={i}
                            className="relative grid items-center gap-2 overflow-hidden rounded-[12px] border px-3 py-3"
                            style={{ gridTemplateColumns: cols, borderColor: r.highlight ? "#DB3B2B" : "rgba(0,0,0,0.07)", background: "#FFFFFF" }}
                          >
                            {/* Shimmer sweep (highlighted row) */}
                            {r.highlight && (
                              <span aria-hidden className="cotiza-sweep pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2" style={{ background: "linear-gradient(100deg, transparent 0%, rgba(219,59,43,0.16) 50%, transparent 100%)" }} />
                            )}
                            {/* Paquetería */}
                            <div className="flex min-w-0 items-center gap-2">
                              <img src={`/img/carriers/${r.brand}.svg`} alt={r.name} width={28} height={28} className="h-[28px] w-[28px] shrink-0 object-contain" />
                              <div className="min-w-0">
                                <p className="flex items-center gap-1 truncate text-[11px] font-bold text-black">
                                  {r.name}
                                  {r.badge === "spark" && <span className="flex h-[14px] w-[14px] items-center justify-center rounded-full" style={{ background: "rgba(59,130,246,0.14)" }}><svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z" fill="#3B82F6" /></svg></span>}
                                  {r.badge === "star" && <span className="flex h-[14px] w-[14px] items-center justify-center rounded-full" style={{ background: "rgba(34,197,94,0.14)" }}><svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3z" stroke="#16A34A" strokeWidth="2" strokeLinejoin="round" /></svg></span>}
                                  {r.badge === "bolt" && <span className="flex h-[14px] w-[14px] items-center justify-center rounded-full" style={{ background: "rgba(245,158,11,0.16)" }}><svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="#F59E0B" /></svg></span>}
                                </p>
                                <p className="truncate text-[10px] text-black/55">{r.svc}</p>
                              </div>
                            </div>
                            {/* Entrega estimada */}
                            <div>
                              <p className="text-[11px] font-semibold text-black/80">2 días hábiles</p>
                              <p className="text-[9px] text-black/45">Mié - 24/ene/24</p>
                            </div>
                            {/* Envío de paquetes */}
                            <div className="flex flex-col gap-1">
                              <span className="flex items-center gap-1 text-[10px] text-black/70">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="11" height="18" rx="1" stroke="#DB3B2B" strokeWidth="1.6" /><path d="M15 8h4a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-4M7.5 7h2M7.5 11h2M7.5 15h2" stroke="#DB3B2B" strokeWidth="1.4" strokeLinecap="round" /></svg>
                                Solo dejar en sucursal
                              </span>
                              <span className="flex items-center gap-1 text-[10px] text-black/70">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><rect x="1" y="6" width="13" height="10" rx="1" stroke="#DB3B2B" strokeWidth="1.6" /><path d="M14 9h4l3 3v4h-7M4 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM15 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" stroke="#DB3B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                Recolección
                              </span>
                            </div>
                            {/* Precio */}
                            <span className="text-right text-[12px] font-bold text-black">
                              <span className={r.highlight ? "price-pop" : undefined}>$143.00</span>
                              <span className="ml-0.5 text-[8px] font-medium text-black/45">MXN</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Block 2 — Asignación automática (panel left, text right) — bg #FBFBFB */}
        <div className="px-5 py-20 tablet:px-10 tablet:py-28" style={{ background: "#FBFBFB" }} data-modal-animate>
          <div className="mx-auto flex max-w-[var(--max-w)] items-center">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <DimensionesPanel variant="phone" className="order-2 tablet:hidden" />
              <DimensionesPanel className="hidden tablet:block tablet:order-1" />

              <div className="order-1 tablet:order-2">
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Asignación automática inteligente
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Automatiza la asignación de paqueterías con reglas inteligentes.
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
        <div className="px-5 py-20 tablet:px-10 tablet:py-28" style={{ background: "#FFFFFF" }} data-modal-animate>
          <div className="mx-auto flex max-w-[var(--max-w)] items-center">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Rastrea todos tus envíos
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Consulta el estado de cada envío desde un solo panel.
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
              {/* Panel — Cronograma: teléfono en responsive, tarjeta en desktop */}
              <CronogramaPanel variant="phone" className="tablet:hidden" />
              <div className="hidden tablet:block">
                <CronogramaPanel />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Carriers grid ── */}
      <section className="relative bg-[#FBFBFB] px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[640px] text-center" style={{ marginBottom: 48 }}>
            <h2 className="font-sora text-[26px] font-light text-black tablet:text-[34px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15, marginBottom: 12 }}>
              Más de 25 paqueterías conectadas
            </h2>
            <p className="font-inter text-[15px] font-light text-black/60 tablet:text-[17px]" style={{ lineHeight: 1.6 }}>
              Las principales nacionales e internacionales, con tarifas T1 incluidas.
            </p>
          </div>
          <div data-modal-animate className="grid grid-cols-2 gap-4 tablet:grid-cols-4 tablet:gap-5">
            {ORBIT.map((mp) => (
              <div key={mp.name} className="flex flex-col items-center justify-center rounded-[16px] border border-black/[0.06] bg-white py-8 transition-all duration-200 hover:border-black/[0.12] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <img
                  src={mp.logo}
                  alt={mp.name}
                  width={56}
                  height={56}
                  className="mb-3 h-[56px] w-[56px] object-contain"
                  style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.12))" }}
                />
                <p className="font-inter text-[13px] font-medium text-black/70">{mp.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── FAQ ── */}
      <section className="relative bg-white px-5 py-24 tablet:px-10 tablet:py-32" data-white-card>
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
