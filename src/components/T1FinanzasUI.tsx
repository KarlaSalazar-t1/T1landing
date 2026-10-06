"use client";

import { useEffect, useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   Piezas compartidas de los paneles de T1 Finanzas.

   Los paneles están hechos en código, no son capturas: así se ven nítidos en
   cualquier pantalla, miden siempre lo mismo y nada se corta. Lo que sí es
   real es el contenido: cada panel reproduce una pantalla del producto
   (Facturación, Pedidos, el asistente de factura global, el paso de pago y
   el buscador de la clave del SAT), con sus mismas etiquetas, estados y
   textos, y sin los avisos amarillos y azules de la aplicación.
   ────────────────────────────────────────────────────────────────────────── */

export { FUENTE, UI } from "@/components/T1FinanzasTokens";
import { FUENTE, UI } from "@/components/T1FinanzasTokens";

type Tono = "neutro" | "verde" | "ambar" | "azul";

const TONOS: Record<Tono, { bg: string; fg: string }> = {
  neutro: { bg: "rgba(0,0,0,0.05)", fg: "#4B5563" },
  verde: { bg: "rgba(22,163,74,0.12)", fg: "#16A34A" },
  ambar: { bg: "rgba(234,88,12,0.10)", fg: "#C2410C" },
  azul: { bg: "rgba(37,99,235,0.10)", fg: "#2563EB" },
};

export function Chip({
  children,
  tono = "neutro",
  size = 10,
}: {
  children: React.ReactNode;
  tono?: Tono;
  size?: number;
}) {
  const c = TONOS[tono];
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-[3px] font-semibold"
      style={{ background: c.bg, color: c.fg, fontSize: size, lineHeight: 1.3 }}
    >
      {children}
    </span>
  );
}

/* Ventana de la aplicación: barra de puntos y alto fijo, para que al cambiar
   de pestaña el panel no cambie de tamaño. */
export function VentanaApp({
  children,
  alto,
  className = "",
  cromo = "siempre",
}: {
  children: React.ReactNode;
  /** Alto fijo del lienzo. Sin él, la ventana crece con su contenido. */
  alto?: number;
  className?: string;
  /** La barra de puntos roba altura y no siempre aporta: se puede ocultar. */
  cromo?: "siempre" | "escritorio" | "nunca";
}) {
  return (
    <div
      className={`w-full select-none overflow-hidden rounded-[16px] bg-white ${className}`}
      aria-hidden
      style={{ fontFamily: FUENTE, pointerEvents: "none", boxShadow: "0 30px 70px rgba(0,0,0,0.42)" }}
    >
      <div
        className={`${cromo === "nunca" ? "hidden" : cromo === "escritorio" ? "hidden tablet:flex" : "flex"} items-center gap-1.5 border-b px-3.5 py-2.5`}
        style={{ borderColor: UI.bordeSuave, background: "#F7F6F5" }}
      >
        {["#E26153", "#E8C15C", "#6FBF73"].map((c) => (
          <span key={c} className="block h-[9px] w-[9px] rounded-full" style={{ background: c }} />
        ))}
      </div>
      <div className="overflow-hidden" style={alto ? { height: alto } : undefined}>
        {children}
      </div>
    </div>
  );
}

/* Botón rojo de la aplicación. */
export function BotonApp({ children, ancho }: { children: React.ReactNode; ancho?: number | string }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[9px] px-3.5 py-[7px] font-semibold text-white"
      style={{ background: UI.rojo, fontSize: 11.5, width: ancho }}
    >
      {children}
    </span>
  );
}

/* Opción de radio, como las del asistente. */
export function Radio({ on }: { on?: boolean }) {
  return (
    <span
      className="relative mt-[1px] block h-[13px] w-[13px] shrink-0 rounded-full border-[1.5px]"
      style={{ borderColor: on ? UI.rojo : "rgba(0,0,0,0.25)" }}
    >
      {on && (
        <span
          className="absolute left-1/2 top-1/2 block h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: UI.rojo }}
        />
      )}
    </span>
  );
}

/* Chispa de "sugerido por T1", igual que en el producto. */
export function Chispa({ size = 12, color = "#2563EB" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M12 3l1.9 4.9L18.8 10l-4.9 2.1L12 17l-1.9-4.9L5.2 10l4.9-2.1L12 3z" fill={color} />
      <path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" fill={color} />
    </svg>
  );
}

/* ── Tiempos ──────────────────────────────────────────────────────────────
   Los paneles no son fotos: enseñan cómo se usa el producto. Estos dos
   ayudantes manejan el avance de los pasos y el tecleo. ── */

/** Avanza 0, 1, 2… y vuelve a empezar. */
export function usePasos(total: number, ms: number, arranca = true) {
  const [paso, setPaso] = useState(0);
  useEffect(() => {
    if (!arranca) return;
    const t = setInterval(() => setPaso((p) => (p + 1) % total), ms);
    return () => clearInterval(t);
  }, [total, ms, arranca]);
  return paso;
}

/** Escribe un texto letra por letra, como si alguien lo tecleara. */
export function useEscritura(texto: string, ms = 85, arranca = true) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!arranca) {
      setN(0);
      return;
    }
    let i = 0;
    setN(0);
    const t = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= texto.length) clearInterval(t);
    }, ms);
    return () => clearInterval(t);
  }, [texto, ms, arranca]);
  return { escrito: texto.slice(0, n), completo: n >= texto.length };
}

/** Cursor que parpadea al final de un campo. */
export function Cursor({ alto = 12 }: { alto?: number }) {
  return (
    <span
      className="ml-[1px] inline-block w-[1.5px] translate-y-[2px]"
      style={{ height: alto, background: UI.rojo, animation: "blink 1s step-end infinite" }}
    />
  );
}

/** Campo de formulario de la aplicación, con su palomita al quedar lleno. */
export function Campo({
  label,
  valor,
  lleno,
  cursor,
}: {
  label: string;
  valor: string;
  lleno?: boolean;
  cursor?: boolean;
}) {
  return (
    <span className="block">
      <span className="block" style={{ fontSize: 9.5, color: UI.suave }}>
        {label}
      </span>
      <span
        className="mt-1 flex items-center gap-2 rounded-[9px] border px-3 py-2 transition-colors duration-300"
        style={{ borderColor: cursor ? "rgba(226,64,47,0.45)" : UI.borde, background: "#fff", minHeight: 32 }}
      >
        <span className="min-w-0 flex-1 truncate" style={{ fontSize: 11, color: valor ? UI.texto : UI.tenue }}>
          {valor || "—"}
          {cursor && <Cursor />}
        </span>
        {lleno && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path d="M5 12l4.5 4.5L19 7" stroke="#16A34A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </span>
  );
}
