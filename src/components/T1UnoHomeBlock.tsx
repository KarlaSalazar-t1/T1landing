"use client";

/* Bloque de Uno para el home (propuesta). No es una sección completa: presenta
   a Uno y manda a su landing (/uno), como hace Shopify con Sidekick. Va después
   de las secciones de productos porque Uno trabaja sobre todos ellos.
   Texto a un lado; al otro, UNA sola conversación que avanza como en el demo
   del evento de T1: crea el producto con una foto → pide el link de pago de
   ese producto → pide la guía para mandarlo. Junto al chat cambia el
   resultado (el producto escaneado, el link, la guía). */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Typed, UnoMark, VisualGuia, VisualLink, VisualProductoFoto } from "@/components/T1UnoStage";

type Paso = { pide: string; responde: string; accion: string; Visual: (p: { done: boolean; bare?: boolean }) => ReactNode };

const PASOS: Paso[] = [
  { pide: "Crea un producto con esta foto", responde: "Listo, llené nombre, precio, categoría y descripción.", accion: "Abrir producto", Visual: VisualProductoFoto },
  { pide: "Crea un link de pago para este producto", responde: "Tu link de pago de la sudadera hueso está listo.", accion: "Copiar link de pago", Visual: VisualLink },
  { pide: "Genera la guía para mandarlo al CP 64000", responde: "Tu guía de DHL a Monterrey está lista: llega en 1 a 2 días por $168.", accion: "Imprimir guía", Visual: VisualGuia },
];

// Línea de tiempo de cada paso (ms desde que empieza)
const T_SEND = 2400; // termina de escribirse y se manda
const T_REPLY = 4200; // llega la respuesta
const T_DONE = 4700; // el resultado cambia a "hecho"
const PASO_MS = 12500;
const PAUSA_FINAL = 5000; // al terminar la guía se queda un momento antes de reiniciar

function Mensajes({ paso, fase }: { paso: number; fase: number }) {
  return (
    <>
      {PASOS.slice(0, paso + 1).map((p, i) => {
        const actual = i === paso;
        return (
          <div key={i} className="flex flex-col gap-3">
            {(!actual || fase >= 1) && (
              <div className="ml-6 self-end rounded-[14px] bg-[#F4F4F3] px-3.5 py-2.5 font-inter text-[13px] leading-snug text-black/80" style={actual ? { animation: "fadeSlideIn 0.35s ease-out both" } : undefined}>
                {p.pide}
              </div>
            )}
            {actual && fase === 1 && (
              <span className="grid w-[14px] grid-cols-2 gap-[3px] pl-0.5" aria-hidden>
                {[0, 1, 2, 3].map((k) => (
                  <span key={k} className="h-[5px] w-[5px] rounded-full bg-[#DB3B2B]" style={{ animation: `pulse-soft 0.9s ${k * 0.12}s ease-in-out infinite` }} />
                ))}
              </span>
            )}
            {(!actual || fase >= 2) && (
              <div style={actual ? { animation: "fadeSlideIn 0.4s ease-out both" } : undefined}>
                <p className="font-inter text-[13px] leading-relaxed text-black/85">{p.responde}</p>
                <div className="mt-2 flex items-center gap-2 rounded-[12px] border border-black/[0.07] px-3 py-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-[#DB3B2B]"><path d="M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1 1M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1-1" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" /></svg>
                  <span className="flex-1 truncate font-inter text-[12px] font-semibold text-black/80">{p.accion}</span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden className="text-black/35"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

function Conversacion() {
  const [paso, setPaso] = useState(0);
  const [fase, setFase] = useState(0);
  const [vuelta, setVuelta] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const cuerpoRef = useRef<HTMLDivElement>(null);

  // Solo corre mientras se ve; al salir de pantalla vuelve al inicio.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting);
      if (!e.isIntersecting) { setPaso(0); setFase(0); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const ultimo = paso === PASOS.length - 1;
    const ts = [
      window.setTimeout(() => setFase(1), T_SEND),
      window.setTimeout(() => setFase(2), T_REPLY),
      window.setTimeout(() => setFase(3), T_DONE),
      window.setTimeout(() => {
        setFase(0);
        if (ultimo) { setPaso(0); setVuelta((v) => v + 1); } else setPaso(paso + 1);
      }, ultimo ? PASO_MS + PAUSA_FINAL : PASO_MS),
    ];
    return () => ts.forEach((t) => window.clearTimeout(t));
  }, [paso, visible, vuelta]);

  // El chat baja solo para que siempre se vea el último mensaje
  useEffect(() => {
    const t = window.setTimeout(() => {
      const b = cuerpoRef.current;
      if (b) b.scrollTo({ top: b.scrollHeight, behavior: "smooth" });
    }, 80);
    return () => window.clearTimeout(t);
  }, [paso, fase]);

  const Visual = PASOS[paso].Visual;
  const clave = `${vuelta}-${paso}`;

  return (
    <div ref={ref} className="relative tablet:h-[420px]">
      {/* Resultado de lo que se pidió, sobre el degradado de las cards de
          producto. En escritorio el chat se encima en su orilla derecha, así
          que el resultado deja libre ese espacio. */}
      <div className="stack-bg-tienda relative h-[260px] w-full overflow-hidden rounded-[24px] border border-white/[0.08] tablet:absolute tablet:inset-y-0 tablet:left-0 tablet:right-[250px] tablet:h-auto tablet:w-auto">
        <div key={clave} className="relative z-[1] h-full w-full tablet:pr-[60px]" style={{ animation: "fadeSlideIn 0.45s ease-out both" }}>
          <Visual done={fase >= 3} bare />
        </div>
      </div>
      {/* La conversación: se va llenando paso a paso. Misma altura que el resultado. */}
      <div className="relative z-[2] -mt-10 ml-auto flex h-[270px] w-[88%] flex-col overflow-hidden rounded-[22px] bg-white tablet:absolute tablet:inset-y-0 tablet:right-0 tablet:mt-0 tablet:h-auto tablet:w-[310px]" style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-2 px-5 pb-2 pt-4">
          <UnoMark size={20} />
          <span className="font-inter text-[14px] font-semibold text-black/85">Uno</span>
        </div>
        <div key={vuelta} ref={cuerpoRef} className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-5 pb-2 pt-1">
          <Mensajes paso={paso} fase={fase} />
        </div>
        <div className="p-3">
          <div className="flex items-center gap-2.5 rounded-[14px] bg-white py-2 pl-3.5 pr-2" style={{ boxShadow: "0 0 0 1px rgba(219,59,43,0.18), 0 6px 20px -6px rgba(219,59,43,0.28)" }}>
            <p className="min-w-0 flex-1 truncate font-inter text-[13px] text-black/80">
              {fase === 0 ? <Typed key={clave} text={PASOS[paso].pide} ms={T_SEND - 300} /> : <span className="text-black/40">Pide lo que necesites…</span>}
            </p>
            <span className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-white transition-colors ${fase === 0 ? "bg-[#DB3B2B]" : "bg-black/15"}`}>
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M8 13V3.5M8 3.5L4 7.5M8 3.5L12 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Botón secundario del sitio sobre fondo oscuro (contorno blanco): "Conoce a
   Uno" no es el registro, así que no usa el rojo de "Comienza gratis". */
const BOTON = "inline-flex h-[44px] items-center gap-1.5 rounded-[14px] border border-white/40 px-6 font-inter text-[15px] font-semibold text-white no-underline transition-colors duration-200 hover:border-white hover:bg-white/[0.06]";

export default function T1UnoHomeBlock() {
  return (
    <section className="bg-[#0e0d0d] px-5 pb-10 pt-[80px] tablet:px-6 tablet:pt-[100px]">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(0,340px)_minmax(0,1fr)] tablet:gap-12">
        <div className="flex flex-col items-start">
          <h2 className="text-balance font-sora text-[30px] font-light text-white tablet:text-[40px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 14 }}>
            Uno, el experto de tu negocio
          </h2>
          <p className="font-inter text-[16px] font-light text-white/65 tablet:text-[17px]" style={{ lineHeight: 1.55 }}>
            La IA de T1 hace lo que le pides con tus palabras: sube tu producto, cóbralo y envíalo en una sola conversación.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3">
            <a href="/uno" className={BOTON}>
              Conoce a Uno
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <span className="font-inter text-[13px] font-light text-white/45">Incluido en todos los planes</span>
          </div>
        </div>
        <Conversacion />
      </div>
    </section>
  );
}
