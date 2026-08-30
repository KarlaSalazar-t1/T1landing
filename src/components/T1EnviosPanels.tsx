"use client";

import React, { useEffect, useState } from "react";

const MANROPE = "var(--font-manrope-var), 'Manrope', sans-serif";

/* ── Cotiza y crea — card que cicla entre paqueterías (estilo hero) ── */
const COTIZA_QUOTES = [
  { logo: "/img/circles/fedex.svg", carrier: "FedEx", dest: "CDMX → Guadalajara", eta: "2 días hábiles", price: "115" },
  { logo: "/img/circles/dhl.svg", carrier: "DHL", dest: "CDMX → Monterrey", eta: "3 días hábiles", price: "128" },
  { logo: "/img/circles/99.svg", carrier: "99 minutos", dest: "CDMX → CDMX", eta: "Mismo día", price: "89" },
  { logo: "/img/circles/ups.svg", carrier: "UPS", dest: "CDMX → Cancún", eta: "2 días hábiles", price: "149" },
];
export function CotizaCard({ hideButton = false }: { hideButton?: boolean }) {
  const [q, setQ] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setQ((v) => (v + 1) % COTIZA_QUOTES.length), 2600);
    return () => clearInterval(t);
  }, []);
  const quote = COTIZA_QUOTES[q];
  return (
    <div className="w-full" style={{ fontFamily: MANROPE }}>
      <p className="text-[13px] font-semibold text-black/55" style={{ marginBottom: 14 }}>Mejor tarifa para tu envío</p>
      <div key={q} style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={quote.logo} alt={quote.carrier} width={44} height={44} className="h-[44px] w-[44px] shrink-0 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="text-[16px] font-bold text-black leading-tight">{quote.carrier}</p>
            <p className="truncate text-[13px] text-black/50" style={{ marginTop: 1 }}>{quote.dest}</p>
          </div>
        </div>
        <div className="flex items-end justify-between" style={{ marginTop: 16 }}>
          <div className="leading-tight">
            <p className="text-[11px] text-black/45">Entrega estimada</p>
            <p className="text-[15px] font-bold text-black" style={{ marginTop: 2 }}>{quote.eta}</p>
          </div>
          <div className="text-right leading-tight">
            <p className="text-[11px] text-black/45">Precio</p>
            <p className="text-[20px] font-bold text-black" style={{ marginTop: 2 }}>${quote.price}<span className="ml-0.5 text-[10px] font-semibold text-black/45">MXN</span></p>
          </div>
        </div>
      </div>
      {!hideButton && (
        <div className="mt-4 flex h-[42px] items-center justify-center rounded-[12px] text-[14px] font-semibold text-white" style={{ background: "#DB3B2B" }}>Crear envío</div>
      )}
    </div>
  );
}

function PhoneShell({ children, flat = false }: { children: React.ReactNode; flat?: boolean }) {
  return (
    <div className="mx-auto w-full" style={{ maxWidth: 460, fontFamily: MANROPE }}>
      <div className="relative overflow-hidden bg-white" style={{ borderRadius: 14, border: flat ? "none" : "1px solid rgba(0,0,0,0.08)", boxShadow: flat ? "none" : "0 18px 44px rgba(0,0,0,0.35)" }}>
        <div className={flat ? "px-1 pt-1 pb-1" : "px-5 pt-6 pb-6"}>{children}</div>
      </div>
    </div>
  );
}

/* ── Cotizador (versión móvil simplificada del panel de multipaquetería) ── */
export function CotizadorPanel() {
  const BR = "#C0453A";
  const OPTIONS = [
    { brand: "fedex", name: "FedEx", sub: "Servicio express", eta: "2 días hábiles", etaSub: "Mié · 24 ene", price: "$143.00", highlight: true },
    { brand: "dhl", name: "DHL", sub: "Estándar", eta: "3 días hábiles", etaSub: "Jue · 25 ene", price: "$128.00", highlight: false },
  ];
  return (
    <PhoneShell>
      {OPTIONS.map((o, i) => (
        <div key={i} className="relative overflow-hidden" style={{ borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.08)", paddingTop: i === 0 ? 0 : 12, paddingBottom: 12 }}>
          {o.highlight && (
            <span aria-hidden className="cotiza-sweep pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2" style={{ background: "linear-gradient(100deg, transparent 0%, rgba(219,59,43,0.14) 50%, transparent 100%)" }} />
          )}
          <div className="flex items-center gap-2.5">
            <img src={`/img/carriers/${o.brand}.svg`} alt={o.name} width={38} height={38} className="h-[38px] w-[38px] shrink-0" />
            <div className="min-w-0">
              <p className="text-[14px] font-bold text-black leading-tight">{o.name}</p>
              <p className="text-[12px] text-black/55" style={{ marginTop: 1 }}>{o.sub}</p>
            </div>
          </div>
          <div className="flex justify-between" style={{ marginTop: 12 }}>
            <div>
              <span className="block text-[11px] text-black/45">Entrega estimada:</span>
              <span className="block text-[15px] font-bold text-black" style={{ marginTop: 1 }}>{o.eta}</span>
              <span className="block text-[10.5px] text-black/40" style={{ marginTop: 1 }}>{o.etaSub}</span>
            </div>
            <div className="text-right">
              <span className="block text-[11px] text-black/45">Precio:</span>
              <span className={`block text-[15px] font-bold text-black ${o.highlight ? "price-pop" : ""}`} style={{ marginTop: 1 }}>
                {o.price}<span className="ml-1 text-[10px] font-medium text-black/45">MXN</span>
              </span>
            </div>
          </div>
          <button className="mt-3 w-full rounded-[10px] py-2.5 text-[13px] font-semibold text-white" style={{ background: BR }}>Crear envío</button>
        </div>
      ))}
    </PhoneShell>
  );
}

/* ── Torre de control — incidencias que se detectan y resuelven ── */
const INCIDENTS = [
  { title: "Retraso en tránsito", sub: "DHL · Guía #4821", carrier: "dhl" },
  { title: "Dirección incompleta", sub: "FedEx · Guía #5127", carrier: "fedex" },
  { title: "Intento de entrega fallido", sub: "UPS · Guía #3390", carrier: "ups" },
];
export function IncidentCards() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % (INCIDENTS.length + 2)), 1500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full" style={{ fontFamily: MANROPE }}>
      <div className="mb-3 flex items-center gap-2">
        <span aria-hidden className="h-[8px] w-[8px] rounded-full bg-[#DB3B2B]" style={{ boxShadow: "0 0 8px 1px rgba(219,59,43,0.7)" }} />
        <p className="text-[14px] font-bold text-black">Torre de control</p>
        <span className="ml-auto text-[11px] text-black/45">En tiempo real</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {INCIDENTS.map((it, i) => {
          const resolved = i < step;
          return (
            <div key={i} className="flex items-center gap-2.5 rounded-[10px] border border-black/[0.07] bg-black/[0.02] px-3 py-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/img/carriers/${it.carrier}.svg`} alt="" width={26} height={26} className="h-[26px] w-[26px] shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-bold text-black leading-tight">{it.title}</p>
                <p className="truncate text-[11px] text-black/50" style={{ marginTop: 1 }}>{it.sub}</p>
              </div>
              <span className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10.5px] font-semibold transition-colors duration-300 ${resolved ? "text-[#16A34A]" : "text-[#DB3B2B]"}`} style={{ background: resolved ? "rgba(34,197,94,0.12)" : "rgba(219,59,43,0.10)" }}>
                <span className="h-[5px] w-[5px] rounded-full" style={{ background: resolved ? "#16A34A" : "#DB3B2B" }} />
                {resolved ? "Resuelta" : "Detectada"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Rastreo — cronograma con auto-scroll (misma animación de multipaquetería); modo bare para el pilar ── */
export function RastreoPanel({ flat = false, height = 300, bare = false }: { flat?: boolean; height?: number; bare?: boolean }) {
  const EVENTS = [
    { chip: "Hoy", icon: "truck", title: "Envío entregado · Guía #5127-SH1 · CDMX", time: "12:02:59 p.m." },
    { icon: "box", title: "Paquete entregado · Recibió: Ana Martínez", time: "12:02:59 p.m." },
    { title: "En reparto · unidad en ruta", time: "09:14:10 a.m." },
    { title: "Recolectado por la paquetería", time: "Ayer · 05:30 p.m." },
    { title: "Guía generada · #5127-SH1", time: "Ayer · 02:02 p.m." },
    { title: "Pedido preparado", time: "Ayer · 01:40 p.m." },
    { title: "Pedido pagado · $292.00 MXN", time: "Ayer · 01:38 p.m." },
  ];
  const mask = "linear-gradient(to bottom, transparent 0, #000 16px, #000 calc(100% - 22px), transparent 100%)";
  const inner = (
    <div className="w-full" style={{ fontFamily: MANROPE }}>
      <div className="flex items-center" style={{ marginBottom: 14 }}>
        <p className="text-[16px] font-semibold text-black">Rastreo de envíos</p>
      </div>
      <div className="relative overflow-hidden" style={{ height, maskImage: mask, WebkitMaskImage: mask }}>
        <div className="crono-track flex flex-col">
          {[...EVENTS, ...EVENTS].map((e, i) => (
            <div key={i} className="relative flex gap-3" style={{ paddingBottom: 20 }}>
              <span aria-hidden className="absolute" style={{ left: 9, top: 22, bottom: -2, borderLeft: "2px dotted rgba(0,0,0,0.16)" }} />
              <div className="relative z-10 flex w-[20px] shrink-0 justify-center" style={{ paddingTop: 3 }}>
                {e.icon === "box" ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" /><path d="M4 7.5l8 4.5 8-4.5M12 12v9" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                ) : e.icon === "truck" ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="1" y="6" width="13" height="10" rx="1" stroke="#1A1A1A" strokeWidth="1.5" /><path d="M14 9h4l3 3v4h-7M4 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM15 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (
                  <span className="h-[9px] w-[9px] rounded-full bg-[#1A1A1A]" style={{ marginTop: 2 }} />
                )}
              </div>
              <div className="flex-1" style={{ minWidth: 0 }}>
                {e.chip && <span className="mb-1.5 inline-block rounded-[6px] bg-black/[0.06] px-2 py-0.5 text-[11px] font-medium text-black/55">{e.chip}</span>}
                <p className="text-[12.5px] text-black/85" style={{ lineHeight: 1.4 }}>{e.title}</p>
                <p className="text-[11px] text-black/40" style={{ marginTop: 2 }}>{e.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  if (bare) return inner;
  return <PhoneShell flat={flat}>{inner}</PhoneShell>;
}

/* ── Cotizador — pantalla como "Cotiza con múltiples paqueterías" (multipaquetería) ── */
const COTIZA_OPTIONS = [
  { brand: "fedex", name: "FedEx", sub: "Mismo día / 24H", eta: "2 días hábiles", etaSub: "Mié · 24 ene", price: "$143.00", highlight: true },
  { brand: "dhl", name: "DHL", sub: "Servicio express", eta: "3 días hábiles", etaSub: "Jue · 25 ene", price: "$128.00", highlight: false },
];
export function CotizadorScreen() {
  const FILTERS = ["Paquetería", "Tipo de servicio", "Ventajas"];
  const Chevron = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="shrink-0"><path d="M6 9l6 6 6-6" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  return (
    <div className="flex h-full flex-col bg-white px-4 pt-5" style={{ fontFamily: MANROPE }}>
      <p className="text-[14px] font-bold text-black" style={{ marginBottom: 12 }}>Cotizador</p>
      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <span key={f} className="flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-[10.5px] font-medium text-black/75" style={{ borderColor: "rgba(0,0,0,0.14)" }}>{f}<Chevron /></span>
        ))}
      </div>
      {COTIZA_OPTIONS.map((o, i) => (
        <div key={i} className="relative overflow-hidden" style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 12, paddingBottom: 12, marginTop: i === 0 ? 12 : 0 }}>
          {o.highlight && <span aria-hidden className="cotiza-sweep pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2" style={{ background: "linear-gradient(100deg, transparent 0%, rgba(219,59,43,0.14) 50%, transparent 100%)" }} />}
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/img/carriers/${o.brand}.svg`} alt={o.name} width={36} height={36} className="h-[36px] w-[36px] shrink-0" />
            <div className="min-w-0">
              <p className="text-[14px] font-bold leading-tight text-black">{o.name}</p>
              <p className="text-[12px] text-black/55" style={{ marginTop: 1 }}>{o.sub}</p>
            </div>
          </div>
          <div className="flex justify-between" style={{ marginTop: 12 }}>
            <div>
              <span className="block text-[11px] text-black/45">Entrega estimada:</span>
              <span className="block text-[14.5px] font-bold text-black" style={{ marginTop: 1 }}>{o.eta}</span>
              <span className="block text-[10.5px] text-black/40" style={{ marginTop: 1 }}>{o.etaSub}</span>
            </div>
            <div className="text-right">
              <span className="block text-[11px] text-black/45">Precio:</span>
              <span className={`block text-[14.5px] font-bold text-black ${o.highlight ? "price-pop" : ""}`} style={{ marginTop: 1 }}>{o.price}<span className="ml-1 text-[10px] font-medium text-black/45">MXN</span></span>
            </div>
          </div>
          <button className="mt-3 w-full rounded-[10px] py-2.5 text-[13px] font-semibold text-white" style={{ background: "#C0453A" }}>Crear envío</button>
        </div>
      ))}
    </div>
  );
}

/* ── Torre de control — tasa de incidencias + lista de incidencias (auto-scroll) ── */
const INCIDENCIAS = [
  { id: "INC-00103", carrier: "dhl", issue: "Dirección incorrecta o incompleta", eta: "10 días hábiles" },
  { id: "INC-00147", carrier: "dhl", issue: "Acceso restringido", eta: "8 días hábiles" },
  { id: "INC-00189", carrier: "jtexpress", issue: "Paquete sin movimiento", eta: "12 días hábiles" },
];
function IncidenceCard({ inc }: { inc: (typeof INCIDENCIAS)[number] }) {
  return (
    <div className="rounded-[12px] border border-black/[0.08] p-3.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[13px] font-bold text-black">{inc.id}</span>
        <span className="rounded-full px-2 py-1 text-[10px] font-semibold" style={{ background: "rgba(219,59,43,0.10)", color: "#DB3B2B" }}>Requiere acción</span>
      </div>
      <p className="text-[11px] text-black/50" style={{ marginTop: 8 }}>No. de guía <span className="text-black/75">77452320977452</span></p>
      <p className="text-[11px] text-black/50" style={{ marginTop: 2 }}>Actualizado <span className="text-black/75">02/10/24 · 07:33 am</span></p>
      <div className="flex items-center gap-1.5" style={{ marginTop: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/img/carriers/${inc.carrier}.svg`} alt="" width={20} height={20} className="h-[18px] w-[26px] shrink-0 object-contain" />
        <span className="text-[12px] font-medium text-black">{inc.issue}</span>
      </div>
      <div className="flex items-center gap-1.5 text-[11px] text-black/50" style={{ marginTop: 6 }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" /><path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Solución estimada <span className="text-black/75">{inc.eta}</span>
      </div>
      <div className="flex items-center justify-between" style={{ marginTop: 12 }}>
        <span className="text-[12px] font-semibold text-black">Ver detalle</span>
        <span className="flex items-center gap-1 rounded-[9px] px-3 py-1.5 text-[12px] font-semibold text-white" style={{ background: "#C0453A" }}>Acciones<svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
      </div>
    </div>
  );
}
export function TorreControlScreen() {
  const mask = "linear-gradient(to bottom, #000 0, #000 calc(100% - 26px), transparent 100%)";
  return (
    <div className="flex h-full flex-col bg-white" style={{ fontFamily: MANROPE }}>
      <div className="border-b border-black/[0.06] px-4 pt-4 pb-3">
        <p className="text-[12px] text-black/50">Tasa de incidencias</p>
        <p className="text-[26px] font-bold text-black" style={{ lineHeight: 1.1 }}>1.02%</p>
        <p className="text-[11px] text-black/40">148 / 3,452 envíos</p>
      </div>
      <div className="relative flex-1 overflow-hidden" style={{ maskImage: mask, WebkitMaskImage: mask }}>
        <div className="crono-track flex flex-col gap-3 px-4 py-3">
          {[...INCIDENCIAS, ...INCIDENCIAS].map((inc, i) => <IncidenceCard key={i} inc={inc} />)}
        </div>
      </div>
    </div>
  );
}

/* ── Detalle de guía — datos del envío + cronología (auto-scroll) ── */
const CRONO = [
  { chip: "Hoy", title: "Envío ha salido de una estación", place: "Ciudad de México, México" },
  { title: "Procesado en México City Hub", place: "Ciudad de México, México" },
  { chip: "Ayer", title: "Envío ha salido de una estación", place: "Querétaro, México" },
  { title: "Envío procesado en Querétaro", place: "Querétaro, México" },
  { title: "Envío recolectado", place: "Guadalajara, Jalisco" },
  { title: "Información de envío recibida", place: "Sistema T1envíos" },
];
export function DetalleGuiaScreen() {
  const mask = "linear-gradient(to bottom, #000 0, #000 calc(100% - 24px), transparent 100%)";
  return (
    <div className="flex h-full flex-col bg-white" style={{ fontFamily: MANROPE }}>
      <div className="flex items-center gap-2 px-4 pt-4 pb-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span className="text-[14px] font-bold text-black">Detalle de guía</span>
      </div>
      <div className="mx-4 rounded-[12px] border border-black/[0.08] p-3">
        <div className="flex gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/carriers/fedex.svg" alt="FedEx" width={34} height={34} className="h-[34px] w-[34px] shrink-0" />
          <div className="min-w-0">
            <p className="text-[12.5px] font-bold text-black">FedEx : <span className="underline">77452320977452</span></p>
            <p className="text-[11px] text-black/50" style={{ marginTop: 1 }}>Mismo día / 24H</p>
            <p className="text-[11px] text-black/50" style={{ marginTop: 3 }}>No. de pedido: <span className="text-black/75">774523209</span></p>
            <p className="text-[11px] text-black/50">1 pieza · 0.5 kg</p>
          </div>
        </div>
      </div>
      <p className="px-4 text-[13px] font-bold text-black" style={{ marginTop: 14, marginBottom: 2 }}>Cronología</p>
      <div className="relative flex-1 overflow-hidden" style={{ maskImage: mask, WebkitMaskImage: mask }}>
        <div className="crono-track flex flex-col px-4 pt-2">
          {[...CRONO, ...CRONO].map((e, i) => (
            <div key={i} className="relative flex gap-3" style={{ paddingBottom: 18 }}>
              <span aria-hidden className="absolute" style={{ left: 4, top: 14, bottom: -4, borderLeft: "2px dotted rgba(0,0,0,0.16)" }} />
              <span className="relative z-10 mt-1 h-[8px] w-[8px] shrink-0 rounded-full bg-[#1A1A1A]" />
              <div className="min-w-0 flex-1">
                {e.chip && <span className="mb-1 inline-block rounded-[6px] bg-black/[0.06] px-2 py-0.5 text-[10px] font-medium text-black/55">{e.chip}</span>}
                <p className="text-[12px] text-black/85" style={{ lineHeight: 1.35 }}>{e.title}</p>
                <p className="text-[10.5px] text-black/40" style={{ marginTop: 1 }}>{e.place}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
