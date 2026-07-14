"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import T1FinalCTA from "@/components/T1FinalCTA";

/* Panel "Agregar nueva regla" — Nombre y Descripción escriben uno por uno + switches que se activan */
/* Marco de teléfono reutilizable (bordes redondeados) — SOLO responsive */
function PhoneShell({ children }: { children: React.ReactNode }) {
  const MANROPE = "var(--font-manrope-var), 'Manrope', sans-serif";
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

/* Mockup "Cotizador" (mismo estilo que multipaquetería) — SOLO responsive */
function CotizaPhone({ className = "" }: { className?: string }) {
  const FILTERS = ["Paquetería", "Tipo de servicio", "Ventajas"];
  const OPTIONS = [
    { brand: "fedex", name: "FedEx", sub: "Económico / Día siguiente / semanal", date: "26 de ene", adv: "Mejor servicio", price: "$158.00", note: null as string[] | null, highlight: true },
    { brand: "ups", name: "UPS", sub: "UPS SAVER (65) Express", date: "26 de ene", adv: "Mejor servicio", price: "$214.00", note: ["Incluye ", "seguro y zona extendida"] as string[] | null, highlight: false },
    { brand: "dhl", name: "DHL", sub: "Express Worldwide", date: "27 de ene", adv: "Más rápido", price: "$312.00", note: null as string[] | null, highlight: false },
    { brand: "estafeta", name: "Estafeta", sub: "Día siguiente nacional", date: "27 de ene", adv: "Mejor precio", price: "$129.00", note: null as string[] | null, highlight: false },
    { brand: "paquetexpress", name: "Paquetexpress", sub: "Estándar terrestre", date: "28 de ene", adv: "Económico", price: "$98.00", note: null as string[] | null, highlight: false },
    { brand: "99min", name: "99 Minutos", sub: "Same day metropolitano", date: "26 de ene", adv: "Más rápido", price: "$175.00", note: null as string[] | null, highlight: false },
  ];

  const Chevron = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0"><path d="M6 9l6 6 6-6" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );

  return (
    <div className={className}>
      <PhoneShell>
        {/* Filtros */}
        <div className="flex flex-wrap gap-1.5" style={{ marginBottom: 2 }}>
          {FILTERS.map((f) => (
            <span key={f} className="flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-[10.5px] font-medium text-black/75" style={{ borderColor: "rgba(0,0,0,0.14)" }}>
              {f}
              <Chevron />
            </span>
          ))}
        </div>

        {/* Resultados — hasta DHL visibles, el resto en auto-scroll (mismo efecto que desktop) */}
        <div
          className="relative overflow-hidden"
          style={{
            height: 400,
            maskImage: "linear-gradient(to bottom, #000 0, #000 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0, #000 90%, transparent 100%)",
          }}
        >
          <div className="crono-track flex flex-col">
            {[...OPTIONS, ...OPTIONS].map((o, i) => (
              <div key={i} className="relative overflow-hidden" style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 12, paddingBottom: 12 }}>
            {o.highlight && (
              <span aria-hidden className="cotiza-sweep pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2" style={{ background: "linear-gradient(100deg, transparent 0%, rgba(219,59,43,0.14) 50%, transparent 100%)" }} />
            )}
            {/* Cabecera: logo + nombre + servicio */}
            <div className="flex items-center gap-2.5">
              <img src={`/img/carriers/${o.brand}.svg`} alt={o.name} width={38} height={38} className="h-[38px] w-[38px] shrink-0" />
              <div className="min-w-0">
                <p className="text-[14px] font-bold text-black leading-tight">{o.name}</p>
                <p className="text-[12px] text-black/55" style={{ marginTop: 1 }}>{o.sub}</p>
              </div>
            </div>

            {/* Fecha estimada / Precio estimado */}
            <div className="flex justify-between" style={{ marginTop: 12 }}>
              <div>
                <span className="block text-[11px] text-black/45">Fecha estimada:</span>
                <span className="block text-[15px] font-bold text-black" style={{ marginTop: 1 }}>{o.date}</span>
                <span className="block text-[10.5px] text-black/40" style={{ marginTop: 1 }}>{o.adv}</span>
              </div>
              <div className="text-right">
                <span className="block text-[11px] text-black/45">Precio estimado:</span>
                <span className={`block text-[15px] font-bold text-black ${o.highlight ? "price-pop" : ""}`} style={{ marginTop: 1 }}>
                  {o.price}<span className="ml-1 text-[10px] font-medium text-black/45">MXN</span>
                </span>
                {o.note && (
                  <span className="block text-[10px] leading-tight text-black/45" style={{ marginTop: 2 }}>
                    {o.note[0]}<span className="font-semibold text-black/55">{o.note[1]}</span>
                  </span>
                )}
              </div>
            </div>
              </div>
            ))}
          </div>
        </div>
      </PhoneShell>
    </div>
  );
}

/* Hero visual — constelación flotante: T1 al centro, chips de reglas + paqueterías flotando */
function ReglasFloatItem({ left, top, anim, delay, children }: { left: string; top: string; anim: string; delay: number; children: React.ReactNode }) {
  return (
    <div className="absolute" style={{ left, top, transform: "translate(-50%, -50%)" }}>
      <div style={{ animation: `${anim} infinite`, animationDelay: `${delay}s` }}>{children}</div>
    </div>
  );
}

function Chip({ si, action, children }: { si?: boolean; action?: boolean; children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-1.5 whitespace-nowrap rounded-[11px] border px-3 py-2"
      style={{ background: action ? "rgba(219,59,43,0.12)" : "rgba(255,255,255,0.05)", borderColor: action ? "rgba(219,59,43,0.4)" : "rgba(255,255,255,0.12)", boxShadow: "0 12px 30px rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
    >
      {si && <span className="rounded-[5px] bg-[#DB3B2B] px-1.5 py-0.5 text-[9px] font-bold text-white">SI</span>}
      <span className="text-[12px] font-medium" style={{ color: action ? "#FF8A7C" : "rgba(255,255,255,0.9)" }}>{children}</span>
    </div>
  );
}

function Logo({ brand }: { brand: string }) {
  return <img src={`/img/carriers/${brand}.svg`} alt={brand} width={46} height={46} className="h-[46px] w-[46px] object-contain" style={{ filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.5))" }} />;
}

function ReglasBuilder() {
  const MANROPE = "var(--font-manrope-var), 'Manrope', sans-serif";
  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: 480, aspectRatio: "1 / 1", fontFamily: MANROPE }}>
      {/* Anillos sutiles */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 480 480" fill="none" preserveAspectRatio="xMidYMid meet">
        {[96, 168].map((r) => (
          <circle key={r} cx="240" cy="240" r={r} stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="3 6" />
        ))}
      </svg>

      {/* Elementos flotando */}
      <ReglasFloatItem left="50%" top="11%" anim="float-slow 4s ease-in-out" delay={0}><Chip si>peso &gt; 5 kg</Chip></ReglasFloatItem>
      <ReglasFloatItem left="83%" top="27%" anim="float 4.4s ease-in-out" delay={0.4}><Logo brand="fedex" /></ReglasFloatItem>
      <ReglasFloatItem left="86%" top="58%" anim="float-reverse 4.2s ease-in-out" delay={0.2}><Chip action>→ Express</Chip></ReglasFloatItem>
      <ReglasFloatItem left="62%" top="88%" anim="float-slow 4.6s ease-in-out" delay={0.7}><Chip si>monto &gt; $2,000</Chip></ReglasFloatItem>
      <ReglasFloatItem left="18%" top="78%" anim="float 4s ease-in-out" delay={0.5}><Logo brand="99min" /></ReglasFloatItem>
      <ReglasFloatItem left="13%" top="40%" anim="float-reverse 4.5s ease-in-out" delay={0.3}><Chip>CDMX</Chip></ReglasFloatItem>

      {/* T1 al centro */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(219,59,43,0.42) 0%, transparent 70%)" }} />
        <div className="flex h-[76px] w-[76px] items-center justify-center rounded-[18px]" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 8px 34px rgba(219,59,43,0.35)" }}>
        <svg width="40" height="38" viewBox="0 0 45 44" fill="none">
          <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457V19.1513V19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#D93A26" />
          <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592H22.4335H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#D93A26" />
        </svg>
        </div>
      </div>
    </div>
  );
}

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

function CarrierTile({ brand }: { brand: string }) {
  return (
    <img
      src={`/img/carriers/${brand}.svg`}
      alt={brand}
      width={38}
      height={38}
      className="h-[38px] w-[38px] shrink-0 object-contain"
    />
  );
}

function CarrierTable({ className = "", variant = "card" }: { className?: string; variant?: "card" | "phone" }) {
  const cols = "44px 1.7fr 0.9fr 0.9fr 1.1fr";
  const ROWS = [
    { brand: "fedex", name: "FedEx", svc: "Económico / Día siguiente / semanal", date: "26 de ene", adv: "Mejor servicio", price: "$158.00", note: null as string[] | null, highlight: true },
    { brand: "ups", name: "UPS", svc: "UPS SAVER (65) Express", date: "26 de ene", adv: "Mejor servicio", price: "$214.00", note: ["Incluye ", "seguro y zona extendida"] as string[] | null, highlight: false },
    { brand: "dhl", name: "DHL", svc: "Express Worldwide", date: "27 de ene", adv: "Más rápido", price: "$312.00", note: null as string[] | null, highlight: false },
    { brand: "estafeta", name: "Estafeta", svc: "Día siguiente nacional", date: "27 de ene", adv: "Mejor precio", price: "$129.00", note: null as string[] | null, highlight: false },
    { brand: "paquetexpress", name: "Paquetexpress", svc: "Estándar terrestre", date: "28 de ene", adv: "Económico", price: "$98.00", note: null as string[] | null, highlight: false },
    { brand: "99min", name: "99 Minutos", svc: "Same day metropolitano", date: "26 de ene", adv: "Más rápido", price: "$175.00", note: null as string[] | null, highlight: false },
  ];
  const content = (
    <>
        {/* Header */}
        <div className="grid items-center gap-2 px-3 py-3" style={{ gridTemplateColumns: cols }}>
          <span className="text-[11px] text-black/55" style={{ gridColumn: "1 / span 2" }}>Paquetería</span>
          <span className="flex items-center gap-1 text-[11px] text-black/55">Fecha estimada<svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M8 3L5 6M8 3l3 3M8 13l-3-3M8 13l3-3" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" strokeLinecap="round" /></svg></span>
          <span className="text-[11px] text-black/55 underline">Ventajas</span>
          <span className="flex items-center justify-end gap-1 text-[11px] text-black/55">Precio estimado<svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M8 3L5 6M8 3l3 3M8 13l-3-3M8 13l3-3" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" strokeLinecap="round" /></svg></span>
        </div>

        {/* Rows — auto-scroll hacia arriba (autoplay) */}
        <div
          className="relative overflow-hidden"
          style={{
            height: 320,
            maskImage: "linear-gradient(to bottom, transparent 0, #000 8%, #000 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 8%, #000 80%, transparent 100%)",
          }}
        >
          <div className="crono-track flex flex-col">
            {[...ROWS, ...ROWS].map((r, i) => (
              <div
                key={i}
                className="grid items-center gap-2 rounded-[12px] px-3 py-4"
                style={{ gridTemplateColumns: cols, background: r.highlight ? "rgba(219,59,43,0.05)" : "#FFFFFF", borderBottom: r.highlight ? "none" : "1px solid rgba(0,0,0,0.05)" }}
              >
                {/* Paquetería (logo) */}
                <CarrierTile brand={r.brand} />
                {/* Tipo de servicio */}
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-bold text-black">{r.name}</p>
                  <p className="truncate text-[11px] text-black/55">{r.svc}</p>
                </div>
                {/* Fecha */}
                <span className="text-[11px] font-medium text-black/70">{r.date}</span>
                {/* Ventajas */}
                <span className="text-[11px] text-black/55">{r.adv}</span>
                {/* Precio */}
                <div className="text-right">
                  <p className="text-[13px] font-bold text-black">
                    {r.price}
                    <span className="ml-1 text-[9px] font-medium text-black/45">MXN</span>
                  </p>
                  {r.note && (
                    <p className="text-[10px] leading-tight text-black/45">
                      {r.note[0]}<span className="font-semibold text-black/55">{r.note[1]}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
    </>
  );

  if (variant === "phone") {
    return <div className={className}><PhoneShell>{content}</PhoneShell></div>;
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white ${className}`}
      style={{ boxShadow: "0 16px 50px rgba(0,0,0,0.08)", fontFamily: "var(--font-manrope-var), 'Manrope', sans-serif" }}
    >
      <div className="relative" style={{ padding: 14 }}>{content}</div>
    </div>
  );
}

/* Tabla con reasignación automática: la paquetería que falla baja y la siguiente sube con contorno rojo */
/* Reasignación automática — versión responsive (estilo tarjeta Cotizador + animación desktop) */
function ReassignPhone({ className = "" }: { className?: string }) {
  const CARRIERS = [
    { brand: "fedex", name: "FedEx", svc: "Económico / Día siguiente / semanal", date: "26 de ene", adv: "Mejor servicio", price: "$158.00", note: null as string[] | null },
    { brand: "ups", name: "UPS", svc: "UPS SAVER (65) Express", date: "26 de ene", adv: "Mejor servicio", price: "$214.00", note: ["Incluye ", "seguro y zona extendida"] as string[] | null },
    { brand: "dhl", name: "DHL", svc: "Express Worldwide", date: "27 de ene", adv: "Más rápido", price: "$312.00", note: null as string[] | null },
  ];
  const CARD_H = 132; // separación entre tarjetas (slot)
  const [order, setOrder] = useState([0, 1, 2]);
  const [failing, setFailing] = useState(false);

  useEffect(() => {
    let to: ReturnType<typeof setTimeout>;
    const iv = setInterval(() => {
      setFailing(true);
      to = setTimeout(() => {
        setOrder((o) => [...o.slice(1), o[0]]);
        setFailing(false);
      }, 1200);
    }, 3200);
    return () => {
      clearInterval(iv);
      clearTimeout(to);
    };
  }, []);

  return (
    <div className={className}>
      <PhoneShell>
        <div className="relative" style={{ height: CARD_H * 3 }}>
          {CARRIERS.map((r, idx) => {
            const slot = order.indexOf(idx);
            const isTop = slot === 0;
            const failed = isTop && failing;
            return (
              <div
                key={idx}
                className="absolute left-0 right-0"
                style={{ transform: `translateY(${slot * CARD_H}px)`, transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)", zIndex: isTop ? 2 : 1 }}
              >
                <div
                  className="rounded-[12px]"
                  style={{
                    height: 120,
                    padding: 12,
                    transition: "background 0.4s ease, border-color 0.4s ease, opacity 0.4s ease",
                    background: failed ? "rgba(0,0,0,0.03)" : isTop ? "rgba(219,59,43,0.05)" : "#FFFFFF",
                    border: failed ? "1px dashed rgba(0,0,0,0.2)" : isTop ? "1px solid #DB3B2B" : "1px solid rgba(0,0,0,0.08)",
                    opacity: failed ? 0.6 : 1,
                  }}
                >
                  {/* Cabecera: logo + nombre + servicio */}
                  <div className="flex items-center gap-2.5">
                    <img src={`/img/carriers/${r.brand}.svg`} alt={r.name} width={38} height={38} className="h-[38px] w-[38px] shrink-0" />
                    <div className="min-w-0">
                      <p className={`truncate text-[13.5px] font-bold leading-tight ${failed ? "text-black/50 line-through" : "text-black"}`}>{r.name}</p>
                      <p className="truncate text-[11.5px] text-black/55" style={{ marginTop: 1 }}>{r.svc}</p>
                    </div>
                  </div>

                  {/* Fecha estimada / Precio estimado */}
                  <div className="flex justify-between" style={{ marginTop: 10 }}>
                    <div className="min-w-0">
                      <span className="block text-[10.5px] text-black/45">Fecha estimada:</span>
                      <span className="block text-[13.5px] font-bold text-black" style={{ marginTop: 1 }}>{r.date}</span>
                      {failed ? (
                        <span className="mt-0.5 flex items-center gap-1 text-[10.5px] font-semibold text-[#DB3B2B]">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#DB3B2B" strokeWidth="1.8" /><path d="M9 9l6 6M15 9l-6 6" stroke="#DB3B2B" strokeWidth="1.8" strokeLinecap="round" /></svg>
                          No disponible
                        </span>
                      ) : (
                        <span className="block text-[10.5px] text-black/40" style={{ marginTop: 1 }}>{r.adv}</span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="block text-[10.5px] text-black/45">Precio estimado:</span>
                      <span className={`block text-[13.5px] font-bold ${failed ? "text-black/40 line-through" : "text-black"}`} style={{ marginTop: 1 }}>
                        {r.price}<span className="ml-1 text-[9.5px] font-medium text-black/45">MXN</span>
                      </span>
                      {r.note && !failed && (
                        <span className="block text-[10px] leading-tight text-black/45" style={{ marginTop: 1 }}>
                          {r.note[0]}<span className="font-semibold text-black/55">{r.note[1]}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </PhoneShell>
    </div>
  );
}

function CarrierReassign({ className = "" }: { className?: string }) {
  const cols = "44px 1.7fr 0.9fr 0.9fr 1.1fr";
  const CARRIERS = [
    { brand: "fedex", name: "FedEx", svc: "Económico / Día siguiente / se…", date: "26 de ene", adv: "Mejor servicio", price: "$158.00", note: null as string[] | null },
    { brand: "ups", name: "UPS", svc: "UPS SAVER (65) Express", date: "26 de ene", adv: "Mejor servicio", price: "$214.00", note: ["Incluye ", "seguro y zona extendida"] as string[] | null },
    { brand: "dhl", name: "DHL", svc: "Express Worldwide", date: "27 de ene", adv: "Más rápido", price: "$312.00", note: null as string[] | null },
  ];
  const ROW_H = 92;
  const [order, setOrder] = useState([0, 1, 2]);
  const [failing, setFailing] = useState(false);

  useEffect(() => {
    let to: ReturnType<typeof setTimeout>;
    const iv = setInterval(() => {
      setFailing(true);
      to = setTimeout(() => {
        setOrder((o) => [...o.slice(1), o[0]]);
        setFailing(false);
      }, 1200);
    }, 3200);
    return () => {
      clearInterval(iv);
      clearTimeout(to);
    };
  }, []);

  const arrow = (
    <svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M8 3L5 6M8 3l3 3M8 13l-3-3M8 13l3-3" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" strokeLinecap="round" /></svg>
  );

  return (
    <div
      className={`relative overflow-hidden rounded-[18px] border border-black/[0.06] bg-white ${className}`}
      style={{ boxShadow: "0 16px 50px rgba(0,0,0,0.08)", fontFamily: "var(--font-manrope-var), 'Manrope', sans-serif" }}
    >
      <div style={{ padding: 14 }}>
        {/* Header */}
        <div className="grid items-center gap-2 px-3 py-3" style={{ gridTemplateColumns: cols }}>
          <span className="text-[11px] text-black/55" style={{ gridColumn: "1 / span 2" }}>Paquetería</span>
          <span className="flex items-center gap-1 text-[11px] text-black/55">Fecha estimada{arrow}</span>
          <span className="text-[11px] text-black/55 underline">Ventajas</span>
          <span className="flex items-center justify-end gap-1 text-[11px] text-black/55">Precio estimado{arrow}</span>
        </div>

        {/* Rows stage (reordering) */}
        <div className="relative" style={{ height: ROW_H * 3 }}>
          {CARRIERS.map((r, idx) => {
            const slot = order.indexOf(idx);
            const isTop = slot === 0;
            const failed = isTop && failing;
            return (
              <div
                key={idx}
                className="absolute left-0 right-0 px-1"
                style={{ transform: `translateY(${slot * ROW_H}px)`, transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)", zIndex: isTop ? 2 : 1 }}
              >
                <div
                  className="grid items-center gap-2 rounded-[12px] px-3"
                  style={{
                    gridTemplateColumns: cols,
                    height: ROW_H - 8,
                    transition: "background 0.4s ease, border-color 0.4s ease, opacity 0.4s ease",
                    background: failed ? "rgba(0,0,0,0.03)" : isTop ? "rgba(219,59,43,0.05)" : "#FFFFFF",
                    border: failed ? "1px dashed rgba(0,0,0,0.2)" : isTop ? "1px solid #DB3B2B" : "1px solid rgba(0,0,0,0.05)",
                    opacity: failed ? 0.6 : 1,
                  }}
                >
                  <CarrierTile brand={r.brand} />
                  <div className="min-w-0">
                    <p className={`truncate text-[12px] font-bold ${failed ? "text-black/50 line-through" : "text-black"}`}>{r.name}</p>
                    <p className="truncate text-[11px] text-black/55">{r.svc}</p>
                  </div>
                  <span className="text-[11px] font-medium text-black/70">{r.date}</span>
                  {failed ? (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-[#DB3B2B]">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#DB3B2B" strokeWidth="1.8" /><path d="M9 9l6 6M15 9l-6 6" stroke="#DB3B2B" strokeWidth="1.8" strokeLinecap="round" /></svg>
                      No disponible
                    </span>
                  ) : (
                    <span className="text-[11px] text-black/55">{r.adv}</span>
                  )}
                  <div className="text-right">
                    <p className={`text-[13px] font-bold ${failed ? "text-black/40 line-through" : "text-black"}`}>
                      {r.price}
                      <span className="ml-1 text-[9px] font-medium text-black/45">MXN</span>
                    </p>
                    {r.note && !failed && (
                      <p className="text-[10px] leading-tight text-black/45">
                        {r.note[0]}<span className="font-semibold text-black/55">{r.note[1]}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* Panel simulado del builder de reglas de T1 Envíos — cicla:
   nueva regla → seleccionar paqueterías → seleccionar servicios → canvas final.
   Los botones se habilitan solo cuando ya hay selección (click simulado). */
function ReglasBuilderScreen({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const MK = "var(--font-manrope-var), 'Manrope', sans-serif";
  const [step, setStep] = useState(0);
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    setFilled(false);
    const t1 = setTimeout(() => setFilled(true), 1500);
    const t2 = setTimeout(() => setStep((step + 1) % 4), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [step]);
  // step 0 (form) ya viene lleno; steps 1 y 2 se llenan con el "click" simulado
  const canProceed = step === 0 ? true : filled;
  const Cursor = () => (
    <span className="pointer-events-none absolute z-30" style={{ left: 22, top: "50%", marginTop: -2 }}>
      <span className="absolute rounded-full" style={{ left: -14, top: -14, width: 28, height: 28, border: "2px solid rgba(219,59,43,0.75)", animation: "tapRipple 1s ease-out infinite" }} />
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))" }}><path d="M5 3l14 7-6 2-2 6L5 3z" fill="#1a1a1a" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" /></svg>
    </span>
  );
  const footer = (label: string) => (
    <div className="flex justify-end border-t border-black/[0.06] px-5 py-3">
      <span className="rounded-[8px] px-5 py-2 text-[12px] font-semibold text-white transition-colors duration-300" style={{ background: canProceed ? "#DB3B2B" : "rgba(219,59,43,0.4)" }}>{label}</span>
    </div>
  );

  const Switch = ({ on }: { on: boolean }) => (
    <span className="relative inline-flex h-[18px] w-[32px] shrink-0 items-center rounded-full px-0.5" style={{ background: on ? "#DB3B2B" : "rgba(0,0,0,0.15)" }}>
      <span className="h-[13px] w-[13px] rounded-full bg-white" style={{ transform: on ? "translateX(14px)" : "translateX(0)", boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }} />
    </span>
  );
  const Check = ({ on }: { on: boolean }) => (
    <span className="flex h-[13px] w-[13px] shrink-0 items-center justify-center rounded-[4px] border" style={{ borderColor: on ? "#DB3B2B" : "rgba(0,0,0,0.25)", background: on ? "#DB3B2B" : "#fff" }}>
      {on && <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>}
    </span>
  );
  const CONDS = ["Costo de producto", "Volumetría", "Zona", "Días", "Horario", "Personalizada"];
  const CARRIERS = [
    { name: "T1 Envíos", t1: true }, { name: "DHL", brand: "dhl" }, { name: "Fedex", brand: "fedex" },
    { name: "Grupo AMPM", brand: "ampm" }, { name: "Paquetexpress", brand: "paquetexpress" }, { name: "Ups", brand: "ups" },
    { name: "JT Express", brand: "jtexpress" }, { name: "Estafeta", brand: "estafeta" }, { name: "99 minutos", brand: "99min" },
  ];

  /* Step 0 — Agregar nueva regla */
  const formDrawer = (
    <div className="flex h-full flex-col bg-white" style={{ fontFamily: MK }}>
      <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-3">
        <p className="text-[14px] font-bold text-black">Agregar nueva regla</p>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="rgba(0,0,0,0.45)" strokeWidth="1.8" strokeLinecap="round" /></svg>
      </div>
      <div className="flex-1 overflow-hidden px-5 py-4">
        <label className="mb-1 block text-[10.5px] text-black/55">Nombre</label>
        <div className="mb-3 rounded-[8px] border border-black/[0.12] px-3 py-2"><span className="text-[12px] text-black/80">Envíos exprés CDMX Sur</span></div>
        <label className="mb-1 block text-[10.5px] text-black/55">Descripción (opcional)</label>
        <div className="mb-3.5 rounded-[8px] border border-black/[0.12] px-3 py-2"><span className="text-[12px] text-black/35">Placeholder</span></div>
        <div className="mb-2 flex items-center justify-between rounded-[8px] border border-black/[0.08] px-3 py-2"><span className="text-[11px] text-black/70">Activa la regla de inmediato</span><Switch on={false} /></div>
        <div className="mb-4 flex items-center justify-between rounded-[8px] border border-black/[0.08] px-3 py-2"><span className="text-[11px] text-black/70">Activa el seguro de tus envíos</span><Switch on /></div>
        <p className="mb-2 text-[13px] font-bold text-black">Condiciones de la regla</p>
        <p className="mb-1.5 text-[10.5px] text-black/55">¿Cómo deben cumplirse las condiciones?</p>
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div className="rounded-[8px] border-2 border-[#DB3B2B] p-2.5">
            <div className="mb-0.5 flex items-center gap-1.5"><span className="flex h-[12px] w-[12px] items-center justify-center rounded-full border-2 border-[#DB3B2B]"><span className="h-[5px] w-[5px] rounded-full bg-[#DB3B2B]" /></span><span className="text-[11px] font-semibold text-black">Todas (AND)</span></div>
            <p className="text-[9.5px] text-black/45" style={{ lineHeight: 1.35 }}>Solo si se cumplen todas.</p>
          </div>
          <div className="rounded-[8px] border border-black/[0.1] p-2.5">
            <div className="mb-0.5 flex items-center gap-1.5"><span className="h-[12px] w-[12px] rounded-full border-2 border-black/20" /><span className="text-[11px] font-semibold text-black/70">Al menos una (OR)</span></div>
            <p className="text-[9.5px] text-black/45" style={{ lineHeight: 1.35 }}>Si al menos una es verdadera.</p>
          </div>
        </div>
        <p className="mb-1.5 text-[10.5px] text-black/55">Selecciona una o múltiples condiciones:</p>
        <div className="grid grid-cols-3 gap-1.5">
          {CONDS.map((c, i) => {
            const on = i < 3;
            return (
              <div key={c} className="flex items-center gap-1 rounded-[8px] border px-2 py-2" style={{ borderColor: on ? "rgba(219,59,43,0.4)" : "rgba(0,0,0,0.1)", background: on ? "rgba(219,59,43,0.04)" : "#fff" }}>
                <Check on={on} /><span className="truncate text-[10px] text-black/75">{c}</span>
              </div>
            );
          })}
        </div>
      </div>
      {footer("Continuar")}
    </div>
  );

  /* Step 1 — Seleccionar paqueterías */
  const carriersDrawer = (
    <div className="flex h-full flex-col bg-white" style={{ fontFamily: MK }}>
      <div className="flex items-center gap-2.5 border-b border-black/[0.06] px-5 py-3">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="rgba(0,0,0,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <p className="flex-1 text-[14px] font-bold text-black">Seleccionar paqueterías</p>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="rgba(0,0,0,0.45)" strokeWidth="1.8" strokeLinecap="round" /></svg>
      </div>
      <div className="flex-1 overflow-hidden px-5 py-3">
        <p className="mb-2.5 text-[10.5px] text-black/55" style={{ lineHeight: 1.5 }}>Selecciona las paqueterías que se aplicarán cuando se cumplan las condiciones. Puedes elegir más de una.</p>
        <div className="flex flex-col gap-1.5">
          {CARRIERS.map((c, i) => {
            const on = filled && (i === 1 || i === 2 || i === 5);
            return (
              <div key={c.name} className="relative flex items-center gap-2.5 rounded-[8px] border px-3 py-2" style={{ borderColor: on ? "rgba(219,59,43,0.35)" : "rgba(0,0,0,0.08)", background: on ? "rgba(219,59,43,0.03)" : "#fff" }}>
                {i === 1 && filled && <Cursor />}
                <Check on={on} />
                {c.t1 ? <span className="font-sora text-[11px] font-bold text-[#DB3B2B]">T1</span> : <img src={`/img/carriers/${c.brand}.svg`} alt="" width={22} height={20} className="h-[16px] w-[24px] object-contain" />}
                <span className="text-[11.5px] text-black/80">{c.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      {footer("Continuar")}
    </div>
  );

  /* Step 2 — Seleccionar servicios */
  const SERVICES = [
    { brand: "dhl", name: "DHL", svc: "Día siguiente" },
    { brand: "dhl", name: "DHL", svc: "Económico / 2 días" },
    { brand: "fedex", name: "Fedex", svc: "Económico / Día siguiente / semanal" },
    { brand: "fedex", name: "Fedex", svc: "Mismo día / 24H" },
    { brand: "ups", name: "Ups", svc: "UPS SAVER (65) Express" },
    { brand: "ups", name: "Ups", svc: "UPS STANDAR (11) Terrestre" },
  ];
  const servicesDrawer = (
    <div className="flex h-full flex-col bg-white" style={{ fontFamily: MK }}>
      <div className="flex items-center gap-2.5 border-b border-black/[0.06] px-5 py-3">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="rgba(0,0,0,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <p className="flex-1 text-[14px] font-bold text-black">Seleccionar servicios</p>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="rgba(0,0,0,0.45)" strokeWidth="1.8" strokeLinecap="round" /></svg>
      </div>
      <div className="flex-1 overflow-hidden px-5 py-3">
        <p className="mb-2.5 text-[10.5px] text-black/55" style={{ lineHeight: 1.5 }}>Elige el servicio de cada paquetería y define su prioridad. Arrastra para ordenar cómo se intentará el envío.</p>
        <div className="flex flex-col gap-1.5">
          {SERVICES.map((s, i) => {
            const on = filled && (i === 0 || i === 3);
            return (
              <div key={i} className="relative flex items-center gap-2 rounded-[8px] border px-3 py-2" style={{ borderColor: on ? "rgba(219,59,43,0.35)" : "rgba(0,0,0,0.08)", background: on ? "rgba(219,59,43,0.03)" : "#fff" }}>
                {i === 0 && filled && <Cursor />}
                <Check on={on} />
                <img src={`/img/carriers/${s.brand}.svg`} alt="" width={22} height={18} className="h-[14px] w-[22px] shrink-0 object-contain" />
                <span className="shrink-0 text-[11.5px] font-semibold text-black">{s.name}</span>
                <span className="flex-1 truncate text-[10px] text-black/50">{s.svc}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0"><path d="M5 9h14M5 15h14" stroke="rgba(0,0,0,0.3)" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </div>
            );
          })}
        </div>
      </div>
      {footer("Crear regla")}
    </div>
  );

  /* Step 3 — canvas final (rule card + flujo de paqueterías) */
  const chip = (t: string) => <span key={t} className="rounded-[6px] bg-[rgba(59,110,224,0.08)] px-2 py-1 text-[9.5px] font-medium text-[#3B6FE0]">{t}</span>;
  const arrow = (
    <svg width="22" height="10" viewBox="0 0 22 10" fill="none" className="shrink-0"><path d="M1 5h16m0 0l-4-3.5M17 5l-4 3.5" stroke="rgba(0,0,0,0.3)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
  const flowCard = (brand: string, name: string) => (
    <div className="w-[118px] shrink-0 rounded-[12px] border border-black/[0.08] bg-white p-3" style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}>
      <div className="mb-2 flex h-[26px] items-center justify-center"><img src={`/img/carriers/${brand}.svg`} alt="" width={44} height={26} className="h-[22px] w-auto object-contain" /></div>
      <p className="mb-2 text-center text-[11px] font-semibold text-black">{name}</p>
      <div className="flex items-center gap-1 text-[10px] text-black/70"><span className="flex h-[12px] w-[12px] items-center justify-center rounded-full bg-[#16A34A]"><svg width="7" height="7" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Exitoso</div>
      <div className="mt-1 flex items-center gap-1 text-[10px] text-black/70"><span className="flex h-[12px] w-[12px] items-center justify-center rounded-full bg-[#DC2626]"><svg width="7" height="7" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" /></svg></span>Rechazado</div>
    </div>
  );
  const canvasContent = (
    <div className="flex items-center gap-4 p-5" style={{ fontFamily: MK }}>
      <div className="w-[210px] shrink-0 rounded-[12px] border border-black/[0.08] bg-white p-4" style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
        <div className="mb-2 flex items-center gap-2 text-[10px]"><span className="text-black/45">ID</span><span className="font-semibold text-black">67898765</span><span className="ml-auto rounded-full bg-[rgba(34,197,94,0.14)] px-2 py-0.5 text-[8.5px] font-bold text-[#16A34A]">ACTIVA</span></div>
        <div className="mb-1 flex gap-2 text-[11px]"><span className="text-black/45">Nombre</span><span className="font-semibold text-black">CDMX Sur</span></div>
        <div className="mb-3 flex gap-2 text-[10px]"><span className="shrink-0 text-black/45">Descripción</span><span className="text-black/70" style={{ lineHeight: 1.4 }}>Envíos exprés al sur de la CDMX</span></div>
        <p className="mb-1.5 text-[11px] font-semibold text-black">Zona</p>
        <div className="mb-3 flex flex-wrap gap-1.5">{["Zona Express", "Zona Principal", "Zona Pedregal", "Zona Coyoacán"].map(chip)}</div>
        <p className="mb-1.5 text-[11px] font-semibold text-black">Días</p>
        <div className="mb-3 flex flex-wrap gap-1.5">{["Miércoles", "Jueves", "Viernes"].map(chip)}</div>
        <p className="mb-1.5 text-[11px] font-semibold text-black">Horario</p>
        <div className="flex flex-wrap gap-1.5">{["10:00 - 14:00", "16:00 - 20:00"].map(chip)}</div>
      </div>
      <div className="flex items-center gap-2">
        {arrow}{flowCard("fedex", "Fedex")}{arrow}{flowCard("ups", "Ups")}{arrow}{flowCard("dhl", "DHL")}
      </div>
    </div>
  );

  const drawer = step === 0 ? formDrawer : step === 1 ? carriersDrawer : servicesDrawer;

  if (variant === "mobile") {
    return (
      <div key={step} className="mx-auto overflow-hidden rounded-[12px] border border-black/[0.08] bg-white" style={{ maxWidth: 300, height: 420, boxShadow: "0 10px 30px rgba(0,0,0,0.10)", animation: "modalContentFade 0.4s ease-out" }}>
        {step === 3 ? (
          <div className="relative h-full overflow-hidden bg-white" style={{ fontFamily: MK, backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)", backgroundSize: "16px 16px" }}>
            <div className="flex items-center justify-between border-b border-black/[0.06] bg-white px-4 py-3">
              <span className="text-[13px] font-semibold text-black/80">Reglas específicas</span>
              <span className="rounded-[8px] bg-[#DB3B2B] px-3 py-1 text-[10.5px] font-semibold text-white">Nueva regla</span>
            </div>
            <div className="p-4">
              <div className="rounded-[12px] border border-black/[0.08] bg-white p-3" style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
                <div className="mb-2 flex items-center gap-2 text-[10px]"><span className="text-black/45">ID</span><span className="font-semibold text-black">67898765</span><span className="ml-auto h-[10px] w-[10px] rounded-full bg-[#16A34A]" /></div>
                <div className="mb-1 flex gap-2 text-[11px]"><span className="text-black/45">Nombre</span><span className="font-semibold text-black">CDMX Sur</span></div>
                <div className="flex gap-2 text-[10px]"><span className="shrink-0 text-black/45">Descripción</span><span className="text-black/70" style={{ lineHeight: 1.4 }}>Envíos exprés para paquetes dirigidos al sur de la CDMX</span></div>
              </div>
            </div>
          </div>
        ) : drawer}
      </div>
    );
  }
  return (
    <div className="relative overflow-hidden rounded-[16px] border border-black/[0.08] bg-white" style={{ height: 486, boxShadow: "0 30px 80px rgba(0,0,0,0.14)" }}>
      {/* Canvas atenuado (fondo punteado) */}
      <div className="absolute inset-0" style={{ background: "#F4F4F5", backgroundImage: "radial-gradient(rgba(0,0,0,0.09) 1.2px, transparent 1.2px)", backgroundSize: "18px 18px" }}>
        {/* Topbar */}
        <div className="relative z-[2] flex items-center justify-between border-b border-black/[0.06] bg-white px-5 py-3" style={{ fontFamily: MK }}>
          <div className="flex items-center gap-2.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="rgba(0,0,0,0.55)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="text-[14px] font-semibold text-black/80">Reglas específicas</span>
          </div>
          {step === 3 && <span className="rounded-[9px] bg-[#DB3B2B] px-4 py-1.5 text-[11px] font-semibold text-white">Nueva regla</span>}
        </div>
        {/* Canvas content (step 3) */}
        {step === 3 && <div key="canvas" className="overflow-hidden" style={{ animation: "modalContentFade 0.45s ease-out" }}>{canvasContent}</div>}
        {/* Zoom controls */}
        <div className="absolute bottom-4 left-4 z-[1] flex flex-col divide-y divide-black/[0.08] overflow-hidden rounded-[10px] border border-black/[0.1] bg-white">
          {["+", "−", "⤢"].map((s) => (<span key={s} className="flex h-[30px] w-[30px] items-center justify-center text-[14px] text-black/50">{s}</span>))}
        </div>
      </div>
      {/* Drawer (steps 0, 1 y 2) */}
      {step !== 3 && (
        <div key={step} className="absolute right-0 top-0 z-[3] h-full" style={{ width: 372, borderLeft: "1px solid rgba(0,0,0,0.06)", animation: "modalContentFade 0.4s ease-out" }}>
          {drawer}
        </div>
      )}
    </div>
  );
}

export default function T1ReglasEnvio() {
  const rootRef = useRef<HTMLDivElement>(null);
  // Carrusel "Define reglas para asignar cada envío" — flechas prev/next
  const reglasRef = useRef<HTMLDivElement>(null);
  const scrollReglas = (dir: number) => {
    const el = reglasRef.current;
    const card = el?.querySelector<HTMLElement>(".regla-card");
    const step = card ? card.offsetWidth + 20 : (el?.clientWidth ?? 0) * 0.8;
    el?.scrollBy({ left: dir * step, behavior: "smooth" });
  };

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
      {/* ── Hero — text left, rules engine right ── */}
      <section
        className="relative flex items-center overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-20 tablet:pb-10 tablet:h-[660px]"
        style={{ background: "linear-gradient(135deg, #261515 0%, #1A0A0A 40%, #261515 100%)" }}
      >
        <div className="relative mx-auto w-full max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] tablet:gap-12">
            <div>
              <h1
                className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[56px]"
                style={{ lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 22 }}
              >
                Automatiza la<br />
                elección de{" "}
                <span className="relative inline-block">
                  paquetería.
                  <span aria-hidden className="absolute left-0 right-0 bottom-1" style={{ height: 10, background: "rgba(219,59,43,0.30)", borderRadius: 5, zIndex: -1 }} />
                </span>
              </h1>
              <p
                className="font-inter text-[16px] font-light text-white/65 tablet:text-[19px]"
                style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}
              >
                Crea reglas por destino, peso, dimensiones o monto para que T1 asigne el servicio más conveniente en cada pedido.
              </p>
              <div className="flex flex-col items-start gap-3">
                <a href={SIGNUP_URL} className="inline-flex w-[206px] items-center justify-center rounded-[16px] bg-[#DB3B2B] px-7 py-4 text-center font-inter text-[16px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                  Crear mis reglas
                </a>
              </div>
            </div>

            {/* Right — coded flow: pedido → T1 (reglas) → carrier ideal */}
            <ReglasBuilder />
          </div>
        </div>
      </section>

      {/* ── Problema — asignar a mano tiene un costo ── */}
      <section className="relative bg-white px-5 pt-24 pb-12 tablet:px-10 tablet:pt-32 tablet:pb-16" data-white-card>
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 56 }}>
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15 }}>
              Elegir cada paquetería a mano <em className="not-italic text-black">cuesta tiempo y dinero.</em>
            </h2>
          </div>
          <div data-modal-animate className="flex flex-wrap justify-center gap-5">
            {[
              { title: "Costos innecesarios", desc: "Elegir mal puede encarecer envíos que tenían una mejor opción.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 3l9 16H3L12 3z" stroke="#0E0E0E" strokeWidth="1.6" strokeLinejoin="round" /><path d="M12 10v4M12 17h.01" stroke="#0E0E0E" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
              { title: "Trabajo repetitivo", desc: "Comparar tarifas y tiempos en cada pedido consume tiempo operativo.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#0E0E0E" strokeWidth="1.6" /><path d="M12 7v5l3.5 2" stroke="#0E0E0E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
              { title: "Criterios inconsistentes", desc: "Cada persona puede elegir distinto si no existe una regla clara.", icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M3 21h18" stroke="#0E0E0E" strokeWidth="1.6" strokeLinecap="round" /><rect x="5" y="11" width="3.4" height="7" stroke="#0E0E0E" strokeWidth="1.6" /><rect x="10.8" y="7" width="3.4" height="11" stroke="#0E0E0E" strokeWidth="1.6" /><rect x="16.6" y="13" width="3.4" height="5" stroke="#0E0E0E" strokeWidth="1.6" /></svg>) },
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

      {/* ── Stack cards ── */}
      <div className="relative bg-white">
        {/* Título de la sección de reglas */}
        <section className="relative bg-white px-5 py-12 tablet:px-10 tablet:py-16" data-modal-animate>
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="font-sora text-[32px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.4px", lineHeight: 1.1 }}>
              Automatiza tu operación con T1
            </h2>
          </div>
        </section>

        {/* Define reglas — título/CTA izq + carrusel de cards der (como "Crea productos como prefieras") */}
        <section className="relative overflow-hidden bg-white px-5 pt-6 pb-[100px] tablet:px-10 tablet:pt-8 tablet:pb-[128px]" data-modal-animate>
          <div className="mx-auto max-w-[var(--max-w)]">
            <div className="grid grid-cols-1 gap-10 tablet:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)] tablet:items-center tablet:gap-14">
              {/* Left — título + CTA */}
              <div>
                <h2 className="font-sora text-[32px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.12, marginBottom: 16, maxWidth: 420 }}>
                  Define reglas para asignar cada envío
                </h2>
                <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55, marginBottom: 28, maxWidth: 400 }}>
                  Crea reglas simples, sin código ni hojas de cálculo, y deja que T1 asigne la mejor opción en cada pedido.
                </p>
                <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                  Crear mis reglas
                </a>
              </div>

              {/* Right — carrusel de cards con flechas */}
              <div className="flex flex-col gap-5">
                <div ref={reglasRef} className="-mr-5 flex gap-5 overflow-x-auto pb-2 pr-5 tablet:mr-0 tablet:pr-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {[
                    { title: "Menor costo", desc: "Elige la opción más económica disponible en cada pedido.", img: "/img/regla-menor-costo.png", w: 1299, h: 1024 },
                    { title: "Más rápido", desc: "Prioriza el envío con el menor tiempo de entrega.", img: "/img/regla-mas-rapido.png", w: 1186, h: 867 },
                    { title: "Prioridad T1", desc: "Reglas listas, decididas por nuestra experiencia y análisis con IA.", img: "/img/regla-t1.png", w: 900, h: 667 },
                    { title: "Personalizado", desc: "Crea tus propias reglas por destino, peso, monto o servicio.", img: "/img/regla-personalizado.png", w: 1000, h: 873 },
                  ].map((c) => (
                    <div key={c.title} className="regla-card flex w-[270px] shrink-0 snap-start flex-col rounded-[20px] border border-black/[0.07] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                      <h3 className="font-sora text-[19px] font-normal text-black" style={{ marginBottom: 8 }}>{c.title}</h3>
                      <p className="font-inter text-[14px] font-light text-black/55" style={{ lineHeight: 1.55, marginBottom: 20, minHeight: 63 }}>{c.desc}</p>
                      <div className="mt-auto overflow-hidden rounded-[14px]">
                        <Image src={c.img} alt={c.title} width={c.w} height={c.h} className="block h-auto w-full object-contain" sizes="270px" />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Flechas de navegación */}
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => scrollReglas(-1)} aria-label="Anterior" className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-black/15 bg-white text-black/55 transition-colors hover:border-black/30 hover:text-black">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <button type="button" onClick={() => scrollReglas(1)} aria-label="Siguiente" className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-black/15 bg-white text-black/55 transition-colors hover:border-black/30 hover:text-black">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Block 2 — Prioridad T1 (panel left, text right) — bg blanco */}
        <section className="px-5 py-20 tablet:px-10 tablet:py-28" style={{ background: "#FFFFFF" }} data-modal-animate>
          <div className="mx-auto flex max-w-[var(--max-w)] items-center">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              {/* Panel — teléfono (estilo Cotizador) en responsive, tabla en desktop */}
              <CotizaPhone className="order-2 tablet:hidden" />
              <CarrierTable className="hidden tablet:block tablet:order-1" />

              <div className="order-1 tablet:order-2">
                <h3 className="font-sora text-[30px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Prioridad T1
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Detrás de cada regla, T1 compara todas las paqueterías en tiempo real para asignar la mejor opción de cada envío.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Costo, tiempo de entrega y nivel de servicio", "Cobertura, tiempos reales y desempeño histórico de cada paquetería", "Tarifas T1 con descuento por volumen agregado"].map((it) => (
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

        {/* Construye tus propias reglas — panel simulado grande sobre fondo oscuro */}
        <section className="relative px-5 py-24 tablet:px-10 tablet:py-32" data-modal-animate style={{ background: "linear-gradient(180deg, #1A0A0A 0%, #000000 100%)" }}>
          <div className="relative mx-auto max-w-[var(--max-w)]">
            <div className="mx-auto max-w-[980px] text-center" style={{ marginBottom: 44 }}>
              <h2 className="font-sora text-[28px] font-light text-white tablet:text-[36px] lg:text-[44px]" style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}>
                Construye tus propias reglas
              </h2>
              <p className="font-inter text-[16px] font-light text-white/60 lg:whitespace-nowrap tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
                Crea una nueva regla: ponle nombre, elige cómo se cumplen las condiciones y qué paqueterías aplican.
              </p>
            </div>
            <div className="mx-auto" style={{ maxWidth: 940 }}>
              <div className="hidden tablet:block">
                <ReglasBuilderScreen />
              </div>
              <div className="tablet:hidden">
                <ReglasBuilderScreen variant="mobile" />
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                Crear mi primera regla
              </a>
            </div>
          </div>
        </section>

        {/* Block 3 — Failover (text left, panel right) */}
        <section className="px-5 py-20 tablet:px-10 tablet:py-28" style={{ background: "#FFFFFF" }} data-modal-animate>
          <div className="mx-auto flex max-w-[var(--max-w)] items-center">
            <div className="grid w-full grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
              <div>
                <h3 className="font-sora text-[26px] font-light text-black tablet:text-[40px] lg:text-[48px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 18 }}>
                  Adaptación automática
                </h3>
                <p className="font-inter text-[15px] font-light text-black/65 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 24 }}>
                  Si una paquetería falla, T1 asigna la mejor alternativa.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Reasignación automática ante cobertura o caída", "Respaldo configurable por regla", "Bitácora de cada decisión de ruteo"].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-inter text-[14px] text-black/70 tablet:text-[15px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Panel — reasignación: teléfono en responsive, tabla en desktop */}
              <ReassignPhone className="tablet:hidden" />
              <CarrierReassign className="hidden tablet:block" />
            </div>
          </div>
        </section>
      </div>



      {/* ── FAQ (fondo oscuro) ── */}
      <section className="relative bg-black px-5 py-24 tablet:px-10 tablet:py-32">
        <div className="mx-auto max-w-[760px]">
          <div className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-1.2px", lineHeight: 1.15 }}>
              Preguntas frecuentes
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { q: "¿Cuántas reglas puedo crear?", a: "Las que necesites. Puedes tener reglas generales y excepciones específicas por cliente, producto o temporada." },
              { q: "¿Qué pasa si dos reglas aplican al mismo pedido?", a: "Se respeta el orden de prioridad que definas. La primera regla que coincida gana; el resto se ignora para ese pedido." },
              { q: "¿Usa mis tarifas negociadas?", a: "Sí. Las reglas consideran tus tarifas T1 por volumen agregado o las cuentas propias que conectes." },
              { q: "¿Y si ningún criterio coincide?", a: "Defines una regla 'Default' que captura todo lo demás, normalmente optimizada por mejor precio del día." },
              { q: "¿Puedo simular antes de activar?", a: "Sí. Puedes probar una regla contra envíos recientes para ver a qué paquetería habrían ido antes de ponerla en vivo." },
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
        title="Deja que tus reglas trabajen por ti"
        description="Configura tu primera regla de envío hoy y olvídate de elegir paquetería pedido por pedido."
        buttonLabel="Crear mis reglas"
      />
    </div>
  );
}
