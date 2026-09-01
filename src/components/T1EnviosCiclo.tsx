"use client";

import { useEffect, useRef, useState } from "react";
import { GuiaScreen } from "@/components/T1EnviosPanels";

const MANROPE = "var(--font-manrope-var), 'Manrope', sans-serif";

/* Puntero + ripple de "tap" para comunicar el clic que navega. */
function TapDot({ left, top }: { left: number | string; top: number | string }) {
  return (
    <span className="pointer-events-none absolute z-20" style={{ left, top }}>
      <span className="absolute rounded-full" style={{ left: -16, top: -16, width: 32, height: 32, border: "2.5px solid rgba(219,59,43,0.9)", animation: "tapRipple 1.1s ease-out infinite" }} />
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#1f2937" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))" }}><path d="M5 2.5l6 17.5 2.3-7.2L20.5 10.5z" /></svg>
    </span>
  );
}

function Field({ label, value, ph, unit }: { label: string; value?: string; ph?: string; unit?: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-semibold text-black/70" style={{ marginBottom: 3 }}>{label}</p>
      <div className="flex items-center gap-1 rounded-[9px] border border-black/[0.12] px-2.5" style={{ height: 32 }}>
        <span className={`min-w-0 flex-1 truncate text-[11px] ${value ? "text-black/80" : "text-black/35"}`}>{value || ph}</span>
        {unit && <span className="shrink-0 text-[10px] text-black/35">{unit}</span>}
      </div>
    </div>
  );
}

function TapButton({ label, tap }: { label: string; tap?: boolean }) {
  return (
    <div className="relative mt-auto flex h-[42px] items-center justify-center rounded-[11px] text-[13px] font-semibold text-white" style={{ background: "#DB3B2B" }}>
      {label}
      {tap && <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[42px] w-[42px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "rgba(255,255,255,0.45)", animation: "tapRipple 1s ease-out infinite" }} />}
    </div>
  );
}

/* 0 · Cotizador — llenas la info */
function CotizaFormScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-4 pt-5 pb-4" style={{ fontFamily: MANROPE }}>
      <p className="text-[15px] font-bold text-black">Cotizador</p>
      <p className="text-[11px] text-black/50" style={{ marginTop: 2, marginBottom: 14 }}>Completa estos campos para calcular tu envío</p>
      <div className="flex flex-col gap-3">
        <Field label="Código Postal de origen" ph="06700" />
        <Field label="Código Postal de destino" ph="06700" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Largo" ph="30" unit="cm" />
          <Field label="Alto" ph="25" unit="cm" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Ancho" ph="40" unit="cm" />
          <Field label="Peso" ph="1" unit="kg" />
        </div>
      </div>
      <label className="mt-3.5 flex items-center gap-2 text-[11.5px] text-black/70">
        <span className="h-[16px] w-[16px] rounded-[4px] border border-black/25" />
        Incluir seguro de envío
      </label>
      <TapButton label="Cotizar" tap />
    </div>
  );
}

/* 1 · Resultados — das clic en una opción → crear envío */
const RESULTS = [
  { brand: "fedex", name: "FedEx", sub: "Estándar", eta: "26 de ene", price: "$214.00", rec: true },
  { brand: "dhl", name: "DHL", sub: "Mismo día / 24H", eta: "26 de ene", price: "$228.00", rec: false },
  { brand: "99min", name: "99 minutos", sub: "Mismo día", eta: "Hoy", price: "$189.00", rec: false },
];
function ResultadosScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-4 pt-5" style={{ fontFamily: MANROPE }}>
      <p className="text-[15px] font-bold text-black">Mejores tarifas</p>
      <p className="text-[11px] text-black/50" style={{ marginTop: 2, marginBottom: 12 }}>Elige una opción para tu envío</p>
      <div className="flex flex-col gap-2.5">
        {RESULTS.map((o, i) => (
          <div key={o.name} className="relative overflow-hidden rounded-[11px] border p-3" style={{ borderColor: o.rec ? "rgba(219,59,43,0.5)" : "rgba(0,0,0,0.10)", background: o.rec ? "rgba(219,59,43,0.05)" : "#fff", animation: "fadeSlideIn 0.5s ease-out both", animationDelay: `${0.15 + i * 0.14}s` }}>
            {o.rec && <span className="absolute right-0 top-0 rounded-bl-[8px] bg-[#DB3B2B] px-2 py-0.5 text-[8px] font-bold text-white">RECOMENDADA</span>}
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/img/carriers/${o.brand}.svg`} alt={o.name} width={30} height={30} className="h-[30px] w-[30px] shrink-0" />
              <div className="min-w-0"><p className="text-[13px] font-bold leading-tight text-black">{o.name}</p><p className="text-[11px] text-black/55">{o.sub}</p></div>
            </div>
            <div className="mt-2 flex items-end justify-between">
              <div><span className="block text-[10px] text-black/45">Entrega</span><span className="block text-[12px] font-bold text-black">{o.eta}</span></div>
              <div className="text-right"><span className="block text-[10px] text-black/45">Precio</span><span className="block text-[13px] font-bold text-black">{o.price}<span className="ml-0.5 text-[9px] font-medium text-black/45">MXN</span></span></div>
            </div>
            {o.rec && <TapDot left="72%" top="78%" />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* 2 · Crear envío · Paso 1 — direcciones */
const Star = <svg width="11" height="11" viewBox="0 0 24 24" fill="#F2A900"><path d="M12 2l3 6.3 6.9.9-5 4.8 1.2 6.9L12 17.7 5.9 20.9 7.1 14 2.1 9.2 9 8.3z" /></svg>;
function CrearPaso1Screen() {
  return (
    <div className="flex h-full flex-col bg-white px-4 pt-5 pb-4" style={{ fontFamily: MANROPE }}>
      <p className="text-[13px] font-bold text-black/45">Crear envío · 1 de 3</p>
      <p className="text-[14px] font-bold text-black" style={{ marginTop: 8 }}>Dirección de origen</p>
      <div className="mt-2 flex items-center justify-between rounded-[9px] border border-black/[0.12] px-3" style={{ height: 38 }}>
        <span className="text-[12px] font-medium text-black/80">Bodega CDMX</span>
        <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#F2A900]/15">{Star}</span>
      </div>
      <p className="text-[10.5px] leading-snug text-black/45" style={{ marginTop: 6 }}>Av. Francisco I. Madero 140, Centro, CDMX · Fabián Hernández</p>
      <p className="text-[14px] font-bold text-black" style={{ marginTop: 14, marginBottom: 8 }}>Dirección de destino</p>
      <div className="flex flex-col gap-3">
        <Field label="Nombre de contacto" value="María González López" />
        <Field label="Calle y número" value="Av. Reforma 123" />
        <Field label="Código Postal" value="06000" />
      </div>
      <TapButton label="Siguiente" />
    </div>
  );
}

/* 3 · Crear envío · Paso 2 — paquete */
function CrearPaso2Screen() {
  return (
    <div className="flex h-full flex-col bg-white px-4 pt-5 pb-4" style={{ fontFamily: MANROPE }}>
      <p className="text-[13px] font-bold text-black/45">Crear envío · 2 de 3</p>
      <p className="text-[14px] font-bold text-black" style={{ marginTop: 8 }}>Dimensiones del paquete</p>
      <div className="mt-3 flex flex-col gap-3">
        <Field label="Nombre de plantilla" value="Caja para botas" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Largo" value="30" unit="cm" />
          <Field label="Alto" value="25" unit="cm" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Ancho" value="40" unit="cm" />
          <Field label="Peso" value="1" unit="kg" />
        </div>
      </div>
      <div className="mt-3.5 rounded-[10px] bg-black/[0.03] px-3 py-2.5">
        <div className="flex items-center justify-between text-[11px] text-black/55"><span>Peso físico</span><span className="font-semibold text-black/75">6 kg</span></div>
        <div className="mt-1 flex items-center justify-between text-[11px] text-black/55"><span>Peso volumétrico</span><span className="font-semibold text-black/75">10.8 kg</span></div>
        <div className="mt-1 flex items-center justify-between text-[11px] text-black/55"><span>Peso a cotizar</span><span className="font-bold text-black">10.8 kg</span></div>
      </div>
      <TapButton label="Siguiente" />
    </div>
  );
}

/* 4 · Crear envío · Paso 3 — das clic en la paquetería → resumen */
const PAQ = [
  { brand: "fedex", name: "FedEx", sub: "Estándar", price: "$214.00", rec: true },
  { brand: "dhl", name: "DHL", sub: "Mismo día / 24H", price: "$228.00", rec: false },
  { brand: "ups", name: "UPS", sub: "UPS Saver Express", price: "$242.00", rec: false },
];
function CrearPaso3Screen() {
  return (
    <div className="flex h-full flex-col bg-white px-4 pt-5" style={{ fontFamily: MANROPE }}>
      <p className="text-[13px] font-bold text-black/45" style={{ marginBottom: 8 }}>Crear envío · 3 de 3</p>
      <p className="text-[14px] font-bold text-black" style={{ marginBottom: 10 }}>Selecciona paquetería</p>
      <div className="flex flex-col gap-2.5">
        {PAQ.map((o, i) => (
          <div key={o.name} className="relative overflow-hidden rounded-[11px] border p-3" style={{ borderColor: o.rec ? "rgba(219,59,43,0.5)" : "rgba(0,0,0,0.10)", background: o.rec ? "rgba(219,59,43,0.05)" : "#fff", animation: "fadeSlideIn 0.5s ease-out both", animationDelay: `${0.15 + i * 0.14}s` }}>
            {o.rec && <span className="absolute right-0 top-0 rounded-bl-[8px] bg-[#DB3B2B] px-2 py-0.5 text-[8px] font-bold text-white">RECOMENDADA</span>}
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/img/carriers/${o.brand}.svg`} alt={o.name} width={30} height={30} className="h-[30px] w-[30px] shrink-0" />
              <div className="min-w-0"><p className="text-[13px] font-bold leading-tight text-black">{o.name}</p><p className="text-[11px] text-black/55">{o.sub}</p></div>
            </div>
            <div className="mt-2 flex items-end justify-between">
              <div><span className="block text-[10px] text-black/45">Entrega</span><span className="block text-[12px] font-bold text-black">26 de ene</span></div>
              <div className="text-right"><span className="block text-[10px] text-black/45">Precio</span><span className="block text-[13px] font-bold text-black">{o.price}<span className="ml-0.5 text-[9px] font-medium text-black/45">MXN</span></span></div>
            </div>
            {o.rec && <TapDot left="72%" top="78%" />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Rastrea — card de datos arriba + rastreo que se va llenando abajo */
const RASTREO = [
  { t: "Guía generada", s: "Ayer · 14:02" },
  { t: "Recolectado", s: "Ayer · 17:30" },
  { t: "En tránsito", s: "Hoy · 06:20" },
  { t: "En reparto", s: "Hoy · 09:14" },
  { t: "Entregado", s: "Hoy · 12:02" },
];
function RastreaScreen() {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= RASTREO.length) return;
    const id = setTimeout(() => setN((v) => v + 1), n === 0 ? 450 : 720);
    return () => clearTimeout(id);
  }, [n]);
  return (
    <div className="flex h-full flex-col bg-white px-4 pt-5" style={{ fontFamily: MANROPE }}>
      {/* Card con datos del envío */}
      <div className="flex gap-2.5 rounded-[12px] border border-black/[0.08] p-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/carriers/fedex.svg" alt="FedEx" width={34} height={34} className="h-[34px] w-[34px] shrink-0" />
        <div className="min-w-0">
          <p className="text-[12.5px] font-bold text-black">FedEx · <span className="underline">7745 2320 9774</span></p>
          <p className="text-[10.5px] text-black/50" style={{ marginTop: 1 }}>Sucursal Polanco → Ma. Fernanda Baz</p>
          <p className="text-[10.5px] text-black/50" style={{ marginTop: 1 }}>1 pieza · 10.8 kg</p>
        </div>
      </div>
      {/* Rastreo que se va llenando */}
      <p className="text-[13px] font-bold text-black" style={{ marginTop: 14, marginBottom: 10 }}>Rastreo</p>
      <div className="flex flex-col">
        {RASTREO.map((e, i) => {
          const on = i < n;
          const last = i === RASTREO.length - 1;
          return (
            <div key={e.t} className="relative flex gap-3" style={{ paddingBottom: last ? 0 : 16 }}>
              {!last && <span aria-hidden className="absolute" style={{ left: 9, top: 20, bottom: 0, borderLeft: `2px solid ${i < n - 1 ? "#16A34A" : "rgba(0,0,0,0.12)"}`, transition: "border-color 0.4s" }} />}
              <span className="relative z-10 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full" style={{ background: on ? "#16A34A" : "rgba(0,0,0,0.06)", transition: "background 0.35s" }}>
                {on ? <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg> : <span className="h-[6px] w-[6px] rounded-full bg-black/25" />}
              </span>
              <div className="min-w-0 flex-1" style={{ opacity: on ? 1 : 0.4, transition: "opacity 0.35s" }}>
                <p className={`text-[12.5px] ${last && on ? "font-bold" : "font-semibold"} text-black`}>{e.t}</p>
                <p className="text-[10.5px] text-black/45" style={{ marginTop: 1 }}>{e.s}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* 8 · Notificación — incidencia detectada */
function NotifScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-white px-5" style={{ fontFamily: MANROPE }}>
      <div className="relative w-full rounded-[14px] border border-black/[0.08] bg-white px-4 py-4" style={{ boxShadow: "0 12px 30px rgba(0,0,0,0.10)", animation: "fadeSlideIn 0.5s ease-out both" }}>
        <div className="flex items-start gap-3">
          <span className="relative flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#DB3B2B]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="#fff" strokeWidth="1.7" /><path d="M4 7l8 6 8-6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="absolute -right-1 -top-1 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#111] px-1 text-[9px] font-bold text-white" style={{ border: "2px solid #fff" }}>1</span>
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-[#DB3B2B]">T1 Envíos</p>
              <p className="text-[9px] text-black/35">ahora</p>
            </div>
            <p className="text-[13.5px] font-bold text-black" style={{ marginTop: 2 }}>Incidencia detectada</p>
            <p className="text-[11px] text-black/55" style={{ marginTop: 2, lineHeight: 1.45 }}>Dirección incorrecta · Guía #5127-SH1. Revisa y resuélvela.</p>
          </div>
        </div>
        <span aria-hidden className="pointer-events-none absolute" style={{ left: "50%", top: "50%" }}>
          <span className="absolute rounded-full" style={{ left: -16, top: -16, width: 32, height: 32, border: "2.5px solid rgba(219,59,43,0.55)", animation: "tapRipple 1.4s ease-out infinite" }} />
        </span>
      </div>
      <p className="mt-4 text-center text-[11px] font-medium text-black/45">Te avisamos antes que a tu cliente</p>
    </div>
  );
}

/* 9 · Incidencias — lista; das clic en una → detalle */
const INCS = [
  { id: "INC-00103", issue: "Dirección incorrecta", carrier: "fedex", eta: "10 días hábiles", tap: true },
  { id: "INC-00147", issue: "Acceso restringido", carrier: "dhl", eta: "8 días hábiles", tap: false },
];
function IncidenciasListScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-4 pt-5" style={{ fontFamily: MANROPE }}>
      <p className="text-[14px] font-bold text-black">Torre de control</p>
      <div className="mt-3 rounded-[12px] border border-black/[0.08] p-3.5">
        <p className="text-[11.5px] text-black/50">Tasa de incidencias</p>
        <p className="text-[24px] font-bold text-black" style={{ lineHeight: 1.1, marginTop: 2 }}>1.02%</p>
        <p className="text-[10.5px] text-black/40" style={{ marginTop: 2 }}>148 / 3,452 envíos</p>
      </div>
      <div className="mt-3 flex flex-col gap-2.5">
        {INCS.map((inc, i) => (
          <div key={inc.id} className="relative rounded-[12px] border border-black/[0.08] p-3" style={{ animation: "fadeSlideIn 0.5s ease-out both", animationDelay: `${0.15 + i * 0.14}s` }}>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12.5px] font-bold text-black">{inc.id}</span>
              <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold" style={{ background: "rgba(219,59,43,0.10)", color: "#DB3B2B" }}>Requiere acción</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/img/carriers/${inc.carrier}.svg`} alt="" width={22} height={22} className="h-[18px] w-[26px] shrink-0 object-contain" />
              <span className="text-[12px] font-medium text-black">{inc.issue}</span>
            </div>
            <p className="mt-1.5 text-[10.5px] text-black/50">Solución estimada · {inc.eta}</p>
            <div className="mt-2 flex items-center gap-1"><span className="text-[11.5px] font-semibold text-[#DB3B2B]">Cambiar dirección</span><svg width="12" height="12" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="#DB3B2B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
            {inc.tap && <TapDot left="30%" top="82%" />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* 10 · Detalle — cambiar dirección (resolución de la incidencia) */
function CambiarDireccionScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-4 pt-4 pb-4" style={{ fontFamily: MANROPE }}>
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-bold text-black">Cambiar dirección</p>
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 3L13 13M13 3L3 13" stroke="#111" strokeWidth="1.8" strokeLinecap="round" /></svg>
      </div>
      <div className="mt-3 flex items-start justify-between gap-2 rounded-[10px] border border-black/[0.10] px-3 py-2.5">
        <div className="min-w-0">
          <p className="text-[10px] font-bold text-black/70">Dirección actual</p>
          <p className="text-[10px] leading-snug text-black/45" style={{ marginTop: 2 }}>Av. Insurgentes Nte. S/N, San Simón Tolnahuac, Cuauhtémoc, 06920 CDMX</p>
        </div>
        <span className="shrink-0 text-[10px] font-semibold text-black/70">Replicar</span>
      </div>
      <p className="text-[12px] font-bold text-black" style={{ marginTop: 12, marginBottom: 8 }}>Nueva dirección</p>
      <div className="flex flex-col gap-2.5">
        <Field label="Calle" value="Av. Insurgentes Nte." />
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Número exterior" value="S/N" />
          <Field label="Número interior" value="N/A" />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Código postal" value="06920" />
          <Field label="Colonia" value="San Simón T." />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Estado" value="Ciudad de México" />
          <Field label="Ciudad" value="Cuauhtémoc" />
        </div>
      </div>
      <div className="mt-auto flex h-[42px] items-center justify-center rounded-[11px] text-[13px] font-semibold text-white" style={{ background: "#DB3B2B" }}>
        Cambiar
      </div>
    </div>
  );
}

/* ════════════════ Simulador de 4 pasos ════════════════ */
const FRAMES = [
  CotizaFormScreen, ResultadosScreen,                          // 0-1 · Cotiza
  CrearPaso1Screen, CrearPaso2Screen, CrearPaso3Screen, GuiaScreen, // 2-5 · Crea (direcciones → paquete → paquetería → creado)
  RastreaScreen,                                               // 6 · Rastrea
  NotifScreen, IncidenciasListScreen, CambiarDireccionScreen,  // 7-9 · Incidencias
];
const DURS = [3400, 3400, 2900, 2900, 3200, 3600, 6000, 3000, 3200, 4000];
const FRAME_STEP = [0, 0, 1, 1, 1, 1, 2, 3, 3, 3];
const STEP_FIRST = [0, 2, 6, 7];

const STEPS = [
  { n: "1", title: "Cotiza", desc: "Compara tarifas y tiempos entre las mejores paqueterías." },
  { n: "2", title: "Crea tu envío", desc: "Pones direcciones, info del paquete y eliges paquetería." },
  { n: "3", title: "Rastrea", desc: "Sigue cada estatus del paquete hasta la entrega." },
  { n: "4", title: "Gestiona incidencias", desc: "Detectamos y resolvemos desde la torre de control." },
];

export default function T1EnviosCiclo() {
  const [frame, setFrame] = useState(0);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setStarted(true); return; }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const id = setTimeout(() => setFrame((f) => (f + 1) % FRAMES.length), DURS[frame]);
    return () => clearTimeout(id);
  }, [frame, started]);

  const Screen = FRAMES[frame];
  const activeStep = FRAME_STEP[frame];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black px-5 tablet:px-6" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div aria-hidden className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(219,59,43,0.13) 0%, transparent 65%)", filter: "blur(50px)" }} />
      <div className="relative mx-auto max-w-[var(--max-w)]">
        <div className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 48 }}>
          <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
            Todo el ciclo de tu envío
          </h2>
          <p className="mx-auto font-inter text-[16px] font-light text-white/60 tablet:whitespace-nowrap tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
            Cotiza, crea tu guía, rastrea y gestiona incidencias desde un solo lugar.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 tablet:grid-cols-2 tablet:gap-12 lg:gap-16">
          {/* Indicador de paso — sólo móvil (arriba del panel) */}
          <div className="tablet:hidden">
            <div className="mb-4 flex items-center justify-center gap-1.5">
              {STEPS.map((_, i) => (
                <span key={i} className="h-[6px] rounded-full transition-all duration-300" style={{ width: activeStep === i ? 24 : 7, background: activeStep === i ? "#DB3B2B" : "rgba(255,255,255,0.22)" }} />
              ))}
            </div>
            <div key={activeStep} className="text-center" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
              <p className="font-inter text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#DB3B2B]">Paso {activeStep + 1} de 4</p>
              <h3 className="font-sora text-[20px] font-normal text-white" style={{ marginTop: 4 }}>{STEPS[activeStep].title}</h3>
              <p className="mx-auto max-w-[320px] font-inter text-[13px] font-light text-white/55" style={{ marginTop: 4, lineHeight: 1.5 }}>{STEPS[activeStep].desc}</p>
            </div>
          </div>

          {/* Panel simulado (sin barra de título) */}
          <div className="mx-auto w-full" style={{ maxWidth: 330 }}>
            <div className="overflow-hidden rounded-[20px] bg-white" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
              <div style={{ height: 476, overflow: "hidden" }}>
                <div key={frame} className="h-full" style={{ animation: "heroWordIn 0.4s ease-out both" }}>
                  {started ? <Screen /> : null}
                </div>
              </div>
            </div>
          </div>

          {/* Lista de pasos — sólo desktop */}
          <div className="hidden flex-col gap-3 tablet:flex">
            {STEPS.map((s, i) => {
              const on = activeStep === i;
              return (
                <button
                  key={s.n}
                  type="button"
                  onClick={() => setFrame(STEP_FIRST[i])}
                  className="flex items-start gap-4 rounded-[14px] border p-4 text-left transition-all duration-300"
                  style={{ borderColor: on ? "rgba(219,59,43,0.5)" : "rgba(255,255,255,0.10)", background: on ? "rgba(219,59,43,0.10)" : "rgba(255,255,255,0.02)", cursor: "pointer" }}
                >
                  <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full font-sora text-[15px]" style={{ background: on ? "#DB3B2B" : "rgba(255,255,255,0.06)", color: on ? "#fff" : "rgba(255,255,255,0.5)", transition: "all 0.4s ease" }}>{s.n}</span>
                  <div>
                    <h3 className="font-sora text-[18px] font-normal text-white tablet:text-[19px]" style={{ marginBottom: 3 }}>{s.title}</h3>
                    <p className="font-inter text-[13px] font-light text-white/55" style={{ lineHeight: 1.55 }}>{s.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <a href="/login" className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]">
            Comienza a enviar
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
