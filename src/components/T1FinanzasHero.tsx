"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import HeroBackground from "@/components/HeroBackground";

/* ──────────────────────────────────────────────────────────────────────────
   Hero de T1 Finanzas.

   La promesa del producto es "factura lo que ya vendiste", así que el visual
   NO es un formulario: es la lista de facturas que se emiten solas desde las
   ventas que ya viven en T1 (tienda + marketplaces), con la factura global
   de cada canal entre ellas. Mismo lenguaje que el dashboard de Pagos:
   tarjeta blanca sobre el fondo cálido compartido.

   Números permitidos (six-pager §8 + decisión del 21 de septiembre):
   52,513 · 25 · 3. Nada de tracción: Finanzas es nuevo.
   ────────────────────────────────────────────────────────────────────────── */

const FONT = "var(--font-inter), 'Inter', sans-serif";

type Row = {
  tipo: "individual" | "global";
  cliente: string;
  canal: string;
  /** Isotipo del canal; sin él se pinta la insignia "T1" (venta propia o capturada). */
  logo?: string;
  total: number;
  detalle: string;
};

const ROWS: Row[] = [
  { tipo: "individual", cliente: "Comercializadora Vega", canal: "T1 Tienda", total: 4820.5, detalle: "Pedido #10482" },
  { tipo: "global", cliente: "Factura global", canal: "Mercado Libre", logo: "/img/meli-iso.svg", total: 18340.0, detalle: "63 ventas del día sin RFC" },
  { tipo: "individual", cliente: "Distribuidora del Norte", canal: "Amazon", logo: "/img/amazon-iso.svg", total: 9650.0, detalle: "Pedido #A-7731" },
  { tipo: "global", cliente: "Factura global", canal: "TikTok Shop", logo: "/img/tiktokshop.svg", total: 7215.8, detalle: "41 ventas del día sin RFC" },
  { tipo: "individual", cliente: "Venta de mostrador", canal: "Capturada a mano", total: 1290.0, detalle: "Asistente en 4 pasos" },
];

const fmt = (n: number) =>
  n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function FacturasPanel() {
  const [idx, setIdx] = useState(0);
  const [emitidas, setEmitidas] = useState(9);

  // Un solo intervalo mueve la lista y el contador de las 25 gratis, para no
  // encadenar un efecto que reaccione al efecto anterior.
  useEffect(() => {
    const t = setInterval(() => {
      setIdx((v) => (v + 1) % ROWS.length);
      setEmitidas((e) => (e >= 24 ? 9 : e + 1));
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const rows = [0, 1, 2].map((k) => ROWS[(idx + k) % ROWS.length]);

  return (
    <div
      className="relative mx-auto w-full select-none"
      aria-hidden
      style={{ maxWidth: 420, fontFamily: FONT, pointerEvents: "none" }}
    >
      {/* Chip — el contador de las 25 gratis, que es el gancho del plan */}
      <div
        className="absolute -right-2 -top-5 z-20 hidden rounded-[16px] border border-black/[0.06] bg-white px-4 py-3 tablet:block"
        style={{ boxShadow: "0 18px 44px rgba(0,0,0,0.22)" }}
      >
        <p className="text-[11px] font-semibold text-black/45">Facturas de este mes</p>
        <p className="text-[20px] font-extrabold text-black" style={{ letterSpacing: "-0.02em" }}>
          {emitidas}
          <span className="ml-1 text-[12px] font-semibold text-black/35">de 25 gratis</span>
        </p>
      </div>

      <div className="overflow-hidden rounded-[18px] bg-white" style={{ boxShadow: "0 30px 70px rgba(0,0,0,0.4)" }}>
        <div className="px-5 pb-5 pt-4 tablet:pt-5">
          <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
            <p className="text-[13px] font-bold text-black">Facturas emitidas</p>
            <span className="rounded-full bg-[#F2F1EF] px-2.5 py-1 text-[10px] font-semibold text-black/50">
              Septiembre
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {rows.map((r, k) => (
              <div
                key={`${r.cliente}-${idx}-${k}`}
                className={`items-center gap-3 rounded-[12px] border border-black/[0.05] bg-[#FAFAF9] px-3 py-2.5 ${k < 2 ? "flex" : "hidden tablet:flex"}`}
                style={k === 0 ? { animation: "fadeSlideIn 0.45s ease-out" } : undefined}
              >
                <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-black/[0.06] bg-white">
                  {r.logo ? (
                    <Image src={r.logo} alt="" width={30} height={30} className="h-[17px] w-[17px] object-contain" />
                  ) : (
                    <span className="text-[10px] font-extrabold text-[#DB3B2B]">T1</span>
                  )}
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="flex items-center gap-1.5">
                    <span className="truncate text-[13px] font-semibold text-black">{r.cliente}</span>
                    {r.tipo === "global" && (
                      <span className="shrink-0 rounded-full bg-[#DB3B2B]/[0.10] px-1.5 py-[2px] text-[9px] font-bold uppercase tracking-[0.04em] text-[#DB3B2B]">
                        Global
                      </span>
                    )}
                  </span>
                  <span className="block truncate text-[11px] text-black/45">
                    {r.canal} · {r.detalle}
                  </span>
                </span>
                <span className="text-right leading-tight">
                  <span className="block text-[13px] font-bold text-black">${fmt(r.total)}</span>
                  <span className="block text-[11px] font-semibold text-[#16A34A]">Timbrada</span>
                </span>
              </div>
            ))}
          </div>

          {/* Pie — el XML y el PDF que pide el contador */}
          <div className="mt-3 flex items-center gap-2 border-t border-black/[0.06] pt-3">
            {["XML", "PDF"].map((f) => (
              <span
                key={f}
                className="flex items-center gap-1.5 rounded-full border border-black/[0.07] bg-white px-2.5 py-1.5 text-[10.5px] font-semibold text-black/55"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4v11m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 19h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {f}
              </span>
            ))}
            <span className="ml-auto text-[10.5px] font-medium text-black/35">Listas para tu contador</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Prueba social — Finanzas no tiene tracción todavía, así que la banda son
   las tres cifras aprobadas del producto (52,513 · 25 · 3), no métricas de uso. */
function SocialProof() {
  return (
    <div className="flex flex-col items-center gap-2.5 text-center tablet:gap-3.5">
      <span className="font-inter text-[19px] font-normal text-white tablet:text-[24px]">
        25 facturas gratis al mes, por negocio
      </span>
      <div className="flex items-center gap-6 tablet:gap-12">
        <span className="font-inter text-[15px] font-normal text-white/75 tablet:text-[18px]">
          52,513 claves del SAT
        </span>
        <span className="font-inter text-[15px] font-normal text-white/75 tablet:text-[18px]">
          Hasta 3 negocios
        </span>
      </div>
    </div>
  );
}

/* ── Banda accionable — el asistente de 4 pasos, que es lo que sustituye al
   portal del SAT para cualquier venta hecha por fuera. Avanza solo. ── */
const PASOS = [
  { n: 1, title: "¿A quién le vendiste?", desc: "RFC y datos fiscales, guardados desde la primera vez." },
  { n: 2, title: "¿Qué vendiste?", desc: "La clave del SAT te la sugiere la inteligencia artificial." },
  { n: 3, title: "¿Cómo te pagaron?", desc: "De contado o a crédito; los impuestos los arma T1." },
  { n: 4, title: "Vista previa", desc: "Revisas y se timbra ante el SAT. Sin jerga en ninguna pantalla." },
];

function AsistentePasos() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((v) => (v + 1) % PASOS.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-2.5 tablet:grid-cols-4 tablet:gap-3">
      {PASOS.map((p, i) => {
        const on = i === active;
        return (
          <div
            key={p.n}
            className="rounded-[14px] border p-4 transition-all duration-500"
            style={{
              borderColor: on ? "rgba(219,59,43,0.45)" : "rgba(255,255,255,0.08)",
              background: on ? "rgba(219,59,43,0.08)" : "rgba(255,255,255,0.02)",
            }}
          >
            <span
              className="mb-2.5 flex h-[26px] w-[26px] items-center justify-center rounded-full font-inter text-[12px] font-bold transition-colors duration-500"
              style={{
                background: on ? "#DB3B2B" : "rgba(255,255,255,0.08)",
                color: on ? "#fff" : "rgba(255,255,255,0.5)",
              }}
            >
              {p.n}
            </span>
            <p className="font-inter text-[13.5px] font-semibold text-white">{p.title}</p>
            <p className="mt-1 font-inter text-[12.5px] font-light leading-[1.5] text-white/55">{p.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

const ArrowRight = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
    <path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function T1FinanzasHero() {
  return (
    <div className="relative overflow-hidden">
      <HeroBackground fadeHeight={340} />

      <section className="relative z-10 flex min-h-[78svh] flex-col justify-center px-5 pb-8 pt-24 tablet:min-h-[84svh] tablet:px-6 tablet:pb-10 tablet:pt-28">
        <div className="mx-auto flex w-full max-w-[var(--max-w)] flex-col">
          <div className="grid grid-cols-1 items-center gap-8 tablet:grid-cols-2 tablet:gap-12">
            {/* Izquierda */}
            <div className="flex flex-col items-center text-center tablet:items-start tablet:text-left">
              <h1
                className="font-sora text-[34px] font-light leading-[1.1] text-white tablet:text-[52px] desktop:text-[54px]"
                style={{ letterSpacing: "-0.03em" }}
              >
                Factura lo que
                <br />
                ya vendiste
              </h1>
              <p className="mt-4 max-w-[460px] font-inter text-[15px] font-light leading-[1.5] text-white/80 tablet:text-[18px]">
                Tus ventas de T1 y de tus marketplaces se facturan desde donde ya vendes. Lo que
                vendiste por fuera lo capturas en cuatro pasos, sin aprender el vocabulario del SAT.
              </p>
              <a
                href={SIGNUP_URL}
                data-cta-location="hero"
                data-cta-text="Comienza gratis"
                data-cta-destination={SIGNUP_URL}
                className="mt-8 hidden h-[52px] items-center justify-center gap-2 rounded-[16px] bg-red-500 px-8 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-red-600 tablet:inline-flex"
              >
                Comienza gratis
                {ArrowRight}
              </a>
            </div>

            {/* Derecha — facturas emitidas (foto de producto) */}
            <div className="flex justify-center [perspective:1600px] tablet:justify-center tablet:pr-6">
              <div
                className="w-full max-w-[400px] tablet:[transform:rotateY(-8deg)_rotateX(3deg)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <FacturasPanel />
              </div>
            </div>

            {/* CTA móvil */}
            <a
              href={SIGNUP_URL}
              data-cta-location="hero"
              data-cta-text="Comienza gratis"
              data-cta-destination={SIGNUP_URL}
              className="mt-1 inline-flex h-[52px] items-center justify-center gap-2 justify-self-center rounded-[16px] bg-red-500 px-8 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-red-600 tablet:hidden"
            >
              Comienza gratis
              {ArrowRight}
            </a>
          </div>

          <div className="mt-10 tablet:mt-12">
            <SocialProof />
          </div>
        </div>
      </section>

      {/* BANDA — el asistente de 4 pasos sobre el mismo fondo cálido */}
      <section className="relative z-10 px-5 pb-14 pt-2 tablet:px-6 tablet:pb-16">
        <div
          className="mx-auto w-full max-w-[860px] rounded-[20px] border border-white/[0.08] bg-[#161418] p-5 tablet:p-6"
          style={{ boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}
        >
          <p
            className="mb-4 text-center font-sora text-[17px] font-normal text-white/90 tablet:mb-5 tablet:text-[20px]"
            style={{ letterSpacing: "-0.01em" }}
          >
            ¿Vendiste fuera de T1? Factúralo en cuatro pasos
          </p>
          <AsistentePasos />
        </div>
      </section>
    </div>
  );
}
