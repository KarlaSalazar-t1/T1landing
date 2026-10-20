"use client";

import Image from "next/image";
import { useState } from "react";

/* Resultado de rastreo (referencia para desarrollo).
   ─────────────────────────────────────────────────────────────────────────
   Estructura de la pantalla:
     1. Estatus grande + fecha (Entregada / En tránsito / Retornada)
     2. Línea de 4 pasos: Guía generada → Recolectado → En tránsito → Entregado|Retornado
     3. "Entregar en" + "Recibe"
     4. Historial: un grupo por estatus; "En tránsito (n)" se despliega con flecha
     5. Mensajería · Número de guía · "Rastrear en paquetería"
     6. "Rastrea otro pedido"
   Los datos son de EJEMPLO (ver src/lib/rastreoDemo.ts). Para conectarlo,
   sustituir `rastreoDemo(guia)` por la respuesta del API con la forma `Rastreo`. */

import type { Paso, Rastreo } from "@/lib/rastreoDemo";

const FONT = "var(--font-manrope-var), 'Manrope', sans-serif";
const ROJO = "#DB3B2B";
/* ── Íconos ── */
const Check = ({ size = 16, color = ROJO }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path d="M3.5 8.2L6.6 11.2L12.5 4.8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const IcoRetorno = ({ size = 18, color = ROJO }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 1 0 2.4-5.7" /><path d="M4 4v4.5h4.5" /></svg>
);
const IcoDoc = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A8A8A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4M10 12h5M10 16h5" /></svg>
);
const IcoCaja = ({ color = "#8A8A8A" }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M4 7.5l8 4.5 8-4.5M12 12v9" /></svg>
);
const IcoCamion = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="12" height="9" rx="1.2" /><path d="M14 10h4l3 3v3h-7" /><circle cx="6.5" cy="17.5" r="1.6" /><circle cx="17.5" cy="17.5" r="1.6" /></svg>
);

/* ── 1+2 · Estatus y línea de pasos ── */
function LineaDePasos({ r }: { r: Rastreo }) {
  const finalLabel = r.final === "retornado" ? "Retornado" : "Entregado";
  const pasos: { k: Paso; label: string }[] = [
    { k: "guia", label: "Guía generada" },
    { k: "recolectado", label: "Recolectado" },
    { k: "transito", label: "En tránsito" },
    { k: "final", label: finalLabel },
  ];
  const actual = pasos.findIndex((p) => p.k === r.pasoActual);
  return (
    <div className="relative mx-auto mt-9 w-full max-w-[720px]">
      {/* Línea de fondo + avance */}
      <div className="absolute left-[12.5%] right-[12.5%] top-[46px] h-[2px] bg-black/[0.08] tablet:top-[50px]" />
      <div className="absolute left-[12.5%] top-[46px] h-[2px] tablet:top-[50px]" style={{ width: `${(actual / 3) * 75}%`, background: ROJO }} />
      <div className="relative grid grid-cols-4">
        {pasos.map((p, i) => {
          const hecho = i < actual;
          const enCurso = i === actual;
          const esFinal = p.k === "final" && enCurso;
          return (
            <div key={p.k} className="flex flex-col items-center text-center">
              <span className={`mb-3 text-[11.5px] tablet:text-[14px] ${enCurso ? "font-bold text-[#1F1F1F]" : "font-medium text-[#3A3A3A]"}`}>{p.label}</span>
              <span
                className="relative flex h-[34px] w-[34px] items-center justify-center rounded-full border-2 bg-white tablet:h-[40px] tablet:w-[40px]"
                style={{
                  borderColor: hecho || enCurso ? (esFinal && r.final === "entregado" ? "#16A34A" : ROJO) : "rgba(0,0,0,0.15)",
                  boxShadow: enCurso ? `0 0 0 6px ${esFinal && r.final === "entregado" ? "rgba(22,163,74,0.14)" : "rgba(219,59,43,0.14)"}` : "none",
                }}
              >
                {hecho ? (
                  <Check />
                ) : enCurso ? (
                  esFinal && r.final === "retornado" ? <IcoRetorno /> : esFinal ? <Check color="#16A34A" /> : <IcoCamion color={ROJO} />
                ) : (
                  <span className="h-[8px] w-[8px] rounded-full bg-black/15" />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── 4 · Historial (con "En tránsito" desplegable) ── */
function FilaHistorial({
  icono,
  anillo,
  titulo,
  fecha,
  ultima = false,
  children,
}: {
  icono: React.ReactNode;
  anillo: string;
  titulo: React.ReactNode;
  fecha: string;
  ultima?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative flex gap-4 tablet:gap-5">
      {!ultima && <span aria-hidden className="absolute left-[19px] top-[44px] bottom-0 border-l-2 border-dashed" style={{ borderColor: "rgba(0,0,0,0.14)" }} />}
      <span className="relative z-[1] flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border-2 bg-white" style={{ borderColor: anillo }}>
        {icono}
      </span>
      <div className={`min-w-0 flex-1 ${ultima ? "pb-1" : "pb-7"}`}>
        <div className="flex items-start justify-between gap-3 pt-1.5">
          <div className="text-[15px] font-bold text-[#1F1F1F] tablet:text-[17px]">{titulo}</div>
          <span className="shrink-0 pt-0.5 text-[11.5px] text-[#8A8A8A] tablet:text-[13px]">{fecha}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

function Historial({ r }: { r: Rastreo }) {
  const [abierto, setAbierto] = useState(false);
  const t = r.historial.transito;
  const enTransito = r.estatus === "transito";
  /* Color de "En tránsito":
     · verde mientras va en camino sin problemas
     · naranja si hubo una incidencia (excepción o va de regreso)
     · gris cuando ya se entregó (el verde pasa a "Entregado") */
  const conIncidencia = r.final === "retornado" || t.some((e) => /excepci[oó]n|incidencia/i.test(e.detalle));
  const colorTransito = conIncidencia ? "#F59E0B" : r.final === "entregado" ? "rgba(0,0,0,0.15)" : "#16A34A";
  const iconoTransito = conIncidencia ? "#F59E0B" : r.final === "entregado" ? "#8A8A8A" : "#16A34A";
  return (
    <div className="px-1 tablet:px-6">
      <FilaHistorial icono={<IcoDoc />} anillo="rgba(0,0,0,0.15)" titulo="Guía generada" fecha={r.historial.guia.fecha}>
        <p className="mt-1 text-[14px] text-[#5A5A5A]">Guía generada</p>
      </FilaHistorial>

      {r.historial.recolectado && (
        <FilaHistorial icono={<IcoCaja />} anillo="rgba(0,0,0,0.15)" titulo="Recolectado" fecha={r.historial.recolectado.fecha}>
          <p className="mt-1 text-[14px] text-[#5A5A5A]">{r.historial.recolectado.detalle}</p>
        </FilaHistorial>
      )}

      {t.length > 0 && (
        <FilaHistorial
          icono={<IcoCamion color={iconoTransito} />}
          anillo={colorTransito}
          ultima={!r.historial.final}
          fecha={`${t[0].fecha} — ${t[t.length - 1].fecha}`}
          titulo={
            <button type="button" onClick={() => setAbierto((v) => !v)} aria-expanded={abierto} className="flex cursor-pointer items-center gap-1.5 text-left">
              En tránsito <span className="font-medium text-[#8A8A8A]">({t.length})</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200" style={{ transform: abierto ? "rotate(180deg)" : "none" }}><path d="M4 6l4 4 4-4" stroke="#5A5A5A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          }
        >
          {/* Cerrado: solo el último evento. Abierto: todos. */}
          <div className="mt-2 flex flex-col gap-2.5">
            {(abierto ? t : t.slice(-1)).map((e) => (
              <div key={e.fecha + e.hora} className="grid grid-cols-[110px_1fr] gap-3 text-[13px] tablet:grid-cols-[150px_1fr] tablet:text-[14px]" style={{ animation: "fadeSlideIn 0.3s ease-out both" }}>
                <span className="text-[#8A8A8A]">{e.fecha} · {e.hora}</span>
                <span className="text-[#3A3A3A]">{e.detalle}</span>
              </div>
            ))}
          </div>
          {t.length > 1 && (
            <button type="button" onClick={() => setAbierto((v) => !v)} className="mt-3 cursor-pointer text-[13.5px] font-semibold" style={{ color: ROJO }}>
              {abierto ? "Ocultar eventos anteriores" : t.length === 2 ? "Ver 1 evento anterior" : `Ver ${t.length - 1} eventos anteriores`}
            </button>
          )}
          {enTransito && <p className="mt-3 text-[12.5px] text-[#8A8A8A]">El paquete sigue en camino. Te avisaremos cuando cambie su estatus.</p>}
        </FilaHistorial>
      )}

      {r.historial.final && (
        <FilaHistorial
          icono={r.final === "retornado" ? <IcoRetorno /> : <Check size={18} color="#16A34A" />}
          anillo={r.final === "retornado" ? ROJO : "#16A34A"}
          ultima
          titulo={r.final === "retornado" ? "Retornado" : "Entregado"}
          fecha={r.historial.final.fecha}
        >
          <p className="mt-1 text-[14px] font-semibold text-[#1F1F1F]">{r.historial.final.detalle}</p>
        </FilaHistorial>
      )}
    </div>
  );
}

/* ── Pantalla completa ── */
export default function T1RastreoResultado({ r }: { r: Rastreo }) {
  const titulo = r.estatus === "entregado" ? "Entregada" : r.estatus === "retornado" ? "Retornada" : "En tránsito";
  const subtitulo = r.estatus === "entregado" ? "Entregado el" : r.estatus === "retornado" ? "Retornado el" : "Entrega estimada:";
  // Rojo solo cuando hay un problema (retorno). Entregado en verde; la fecha
  // estimada en tono neutro para que no se lea como algo malo.
  const colorFecha = r.estatus === "retornado" ? ROJO : r.estatus === "entregado" ? "#16A34A" : "#1F1F1F";
  return (
    <div className="mx-auto w-full max-w-[920px] overflow-hidden rounded-[24px] bg-white px-5 py-10 text-[#1F1F1F] tablet:px-12 tablet:py-14" style={{ fontFamily: FONT, boxShadow: "0 30px 80px rgba(0,0,0,0.35)" }}>
      {/* 1 · Estatus */}
      <div className="text-center">
        <h2 className="text-[34px] font-bold tablet:text-[48px]" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>{titulo}</h2>
        <p className="mt-2 text-[15px] text-[#5A5A5A] tablet:text-[18px]">
          {subtitulo} <span className="font-semibold" style={{ color: colorFecha }}>{r.fechaEstatus}</span>
        </p>
      </div>

      {/* 2 · Pasos */}
      <LineaDePasos r={r} />

      {/* 3 · Destino */}
      <div className="mt-9 text-center">
        <p className="text-[14px] tablet:text-[17px]"><span className="font-bold">Entregar en:</span> <span className="text-[#5A5A5A]">{r.entregarEn}</span></p>
        <p className="mt-1.5 text-[13px] tablet:text-[15px]"><span className="font-bold">Recibe:</span> <span className="text-[#5A5A5A]">{r.recibe}</span></p>
      </div>

      {/* 4 · Historial */}
      <div className="mt-9 border-y border-black/[0.08] py-8">
        <Historial r={r} />
      </div>

      {/* 5 · Paquetería + guía + CTA */}
      <div className="grid grid-cols-1 items-center gap-6 border-b border-black/[0.08] py-8 text-center tablet:grid-cols-3 tablet:gap-4">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#9A9A9A]">Mensajería</p>
          <div className="flex items-center justify-center gap-2.5">
            <Image src={r.paqueteria.logo} alt="" width={64} height={28} className="h-[26px] w-auto object-contain" />
            <span className="text-[15px] font-semibold">{r.paqueteria.nombre}</span>
          </div>
        </div>
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#9A9A9A]">Número de guía</p>
          <p className="break-all text-[16px] font-bold tablet:text-[18px]">{r.guia}</p>
        </div>
        <div className="flex justify-center tablet:justify-end">
          <a
            href={r.paqueteria.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[14px] px-6 py-3.5 text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]"
            style={{ background: ROJO, boxShadow: "0 12px 26px rgba(219,59,43,0.3)" }}
          >
            Rastrear en paquetería
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M5 11L11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </div>

      {/* 6 · Otro pedido */}
      <div className="pt-7 text-center">
        <a
          href="#buscar-guia"
          onClick={(e) => {
            // Se queda en esta página: sube al buscador y lo deja listo para otra guía.
            e.preventDefault();
            document.getElementById("buscar-guia")?.scrollIntoView({ behavior: "smooth", block: "start" });
            const input = document.querySelector<HTMLInputElement>("#buscar-guia input");
            if (input) { input.select(); setTimeout(() => input.focus({ preventScroll: true }), 450); }
          }}
          className="inline-flex items-center gap-2 text-[15px] font-bold text-[#1F1F1F] no-underline hover:opacity-70"
        >
          Rastrea otro pedido
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M3.75 9h10.5M10 4.75 14.25 9 10 13.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    </div>
  );
}
