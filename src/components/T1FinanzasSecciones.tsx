"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { FUENTE, UI } from "@/components/T1FinanzasTokens";
import { Chip } from "@/components/T1FinanzasUI";

/* ──────────────────────────────────────────────────────────────────────────
   Secciones de la landing de T1 Finanzas.

   El copy sale del documento "T1 Finanzas · copy del landing, versión 2".
   Reglas de voz que aplican a cualquier texto de esta página:
   · El título dice qué ganas; el subtítulo, cómo. Si el título solo se
     entiende con el subtítulo, se reescribe.
   · Nada de vocabulario del SAT en títulos ni botones (timbrar, CFDI, PUE,
     PPD, complemento, uso del comprobante). En las preguntas frecuentes se
     nombran una vez, explicados, porque es lo que la gente busca en Google.
   · Los planes siempre por su nombre: el plan Gratis, el plan Básico, el plan
     Avanzado. Nunca "el de pago".
   · "Nuestro sistema inteligente" o "te sugerimos"; nunca "inteligencia
     artificial".
   · El contador es aliado: T1 Finanzas hace las facturas, pero los impuestos,
     la contabilidad y las declaraciones siguen siendo suyos.
   · Ninguna función que el producto no tenga, ni como "próximamente".
   ────────────────────────────────────────────────────────────────────────── */

const Arrow = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
    <path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ══════════ 1 · El problema: el antes y el después ══════════
   No se dice el dolor, se enseña: el Excel que el dueño arma cada mes, con
   su suma rota y su columna de "¿facturado?" a medias, y encima lo demás que
   trae entre manos —el recado pegado y el mensaje del contador pidiendo los
   tickets—. Todo sale de las entrevistas del six-pager; no hay ni un dato
   inventado, y el único número es el medio día que ya está aprobado. */
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const FILAS_EXCEL = [
  { n: "2", canal: "Mercado Libre", pedido: "ML-2138", total: "12,996.00", fact: "?" },
  { n: "3", canal: "Amazon", pedido: "AMZ-7731", total: "8,990.00", fact: "sí" },
  { n: "4", canal: "Tienda Nube", pedido: "TN-5512", total: "34,500.00", fact: "" },
  { n: "5", canal: "TikTok Shop", pedido: "TT-0914", total: "4,980.00", fact: "no" },
  { n: "6", canal: "Mostrador", pedido: "—", total: "1,290.00", fact: "?" },
];
const REJILLA = "26px minmax(0,1.15fr) minmax(0,0.95fr) minmax(0,0.95fr) 74px";

function Celda({
  children,
  tono = "normal",
  alinea = "left",
  seleccionada,
}: {
  children: React.ReactNode;
  tono?: "normal" | "suave" | "encabezado" | "error" | "ok" | "falta";
  alinea?: "left" | "right" | "center";
  seleccionada?: boolean;
}) {
  const color =
    tono === "error" || tono === "falta"
      ? UI.rojo
      : tono === "ok"
        ? "#16A34A"
        : tono === "suave"
          ? UI.suave
          : tono === "encabezado"
            ? UI.tenue
            : UI.texto;
  return (
    <span
      className="truncate px-2 py-[7px]"
      style={{
        fontFamily: MONO,
        fontSize: 10,
        color,
        textAlign: alinea,
        fontWeight: tono === "error" ? 700 : 400,
        background: tono === "encabezado" ? "#F3F3F1" : seleccionada ? "rgba(226,64,47,0.07)" : undefined,
        borderRight: `1px solid ${UI.bordeSuave}`,
        outline: seleccionada ? `1.5px solid ${UI.rojo}` : undefined,
        outlineOffset: -1,
      }}
    >
      {children}
    </span>
  );
}

function HojaDeCalculo() {
  return (
    <div
      className="overflow-hidden rounded-[10px] bg-white text-left"
      style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.55)" }}
    >
      {/* Barra de fórmulas, con la suma rota */}
      <div className="flex items-center gap-2 border-b px-3 py-2" style={{ borderColor: UI.bordeSuave, background: "#F3F3F1" }}>
        <span style={{ fontFamily: MONO, fontSize: 10, color: UI.tenue }}>C7</span>
        <span
          className="flex-1 rounded-[4px] bg-white px-2 py-1"
          style={{ fontFamily: MONO, fontSize: 10.5, color: UI.texto, border: `1px solid ${UI.bordeSuave}` }}
        >
          =SUMA(C2:C6)+Agosto!C14
          <span className="ml-[1px] inline-block h-[10px] w-[1.5px] translate-y-[2px]" style={{ background: UI.rojo, animation: "blink 1s step-end infinite" }} />
        </span>
      </div>

      <div className="grid" style={{ gridTemplateColumns: REJILLA, borderBottom: `1px solid ${UI.bordeSuave}` }}>
        {["", "A", "B", "C", "D"].map((c) => (
          <Celda key={c} tono="encabezado" alinea="center">
            {c}
          </Celda>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: REJILLA, borderBottom: `1px solid ${UI.bordeSuave}` }}>
        <Celda tono="encabezado" alinea="center">1</Celda>
        <Celda>Canal</Celda>
        <Celda>Pedido</Celda>
        <Celda>Total</Celda>
        <Celda>¿Facturado?</Celda>
      </div>

      {FILAS_EXCEL.map((f) => (
        <div key={f.pedido} className="grid" style={{ gridTemplateColumns: REJILLA, borderBottom: `1px solid ${UI.bordeSuave}` }}>
          <Celda tono="encabezado" alinea="center">{f.n}</Celda>
          <Celda>{f.canal}</Celda>
          <Celda tono="suave">{f.pedido}</Celda>
          <Celda alinea="right">{f.total}</Celda>
          <Celda tono={f.fact === "sí" ? "ok" : "falta"} seleccionada={f.fact === ""}>
            {f.fact}
          </Celda>
        </div>
      ))}

      {/* El renglón del total, con el error */}
      <div className="grid" style={{ gridTemplateColumns: REJILLA, borderBottom: `1px solid ${UI.bordeSuave}` }}>
        <Celda tono="encabezado" alinea="center">7</Celda>
        <Celda tono="suave">TOTAL</Celda>
        <Celda tono="suave">&nbsp;</Celda>
        <Celda tono="error" alinea="right">#¡VALOR!</Celda>
        <Celda tono="suave">&nbsp;</Celda>
      </div>

      {/* Las hojas: una por canal, más las que cada quien se inventa. Se
          salen del borde a propósito, para que se vea que son demasiadas. */}
      <div className="flex items-center gap-1 overflow-hidden px-2 py-1.5" style={{ background: "#F3F3F1" }}>
        {["Mercado Libre", "Amazon", "Mostrador", "Septiembre", "Proveedores", "Sucursal Centro", "Agosto", "+"].map((h) => (
          <span
            key={h}
            className="rounded-t-[4px] px-2 py-1"
            style={{
              fontFamily: MONO,
              fontSize: 9.5,
              whiteSpace: "nowrap",
              color: h === "Septiembre" ? UI.texto : UI.tenue,
              background: h === "Septiembre" ? "#fff" : "transparent",
              fontWeight: h === "Septiembre" ? 700 : 400,
            }}
          >
            {h}
          </span>
        ))}
      </div>
    </div>
  );
}

/* El fondo de garabatos de WhatsApp, dibujado en código: un patrón chico que
   se repite. Va en data URI para no sumar un archivo más al bundle. */
const GARABATOS = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='88' height='88' viewBox='0 0 88 88'>" +
    "<g fill='none' stroke='#CCC0AD' stroke-width='1.1' stroke-linecap='round' stroke-linejoin='round' opacity='0.75'>" +
    "<circle cx='13' cy='15' r='5'/><path d='M29 9l4.5 4.5L29 18l-4.5-4.5z'/>" +
    "<path d='M50 8h13v10H50z'/><path d='M53 11h7M53 14h5'/>" +
    "<path d='M73 17l4-8 4 8'/>" +
    "<path d='M7 40c4-5 9-5 13 0'/><path d='M9 46h9'/>" +
    "<circle cx='57' cy='41' r='6.5'/><path d='M50.5 41h13'/><path d='M57 34.5v13'/>" +
    "<path d='M78 35v11'/><path d='M74 40h8'/>" +
    "<path d='M11 67l5.5-9 5.5 9z'/>" +
    "<path d='M33 62c2.5-3 6.5-2.5 8 .5 1.5 3-1.5 7.5-4 9.5-2.5-2-7-6.5-4-10z'/>" +
    "<circle cx='61' cy='69' r='4.5'/><path d='M74 63h9v9h-9z'/>" +
    "</g></svg>",
)}")`;

/* El mensaje del contador, montado como una pantalla de WhatsApp: barra de
   estado, cabecera con la foto, y las dos burbujas sobre el fondo de
   garabatos. Todo dibujado aquí para que no se pixelee. */
function MensajeContador() {
  return (
    <div
      aria-hidden
      className="overflow-hidden rounded-[14px]"
      style={{ width: 236, boxShadow: "0 24px 48px rgba(0,0,0,0.5)", fontFamily: FUENTE }}
    >
      {/* Cabecera */}
      <div style={{ background: "#20404F" }}>
        {/* Barra de estado */}
        <div className="flex items-center justify-between px-3 pb-0.5 pt-1.5" style={{ color: "#fff" }}>
          <span className="font-semibold" style={{ fontSize: 8 }}>
            9:30
          </span>
          <span className="flex items-center gap-[3px]">
            <svg width="8" height="8" viewBox="0 0 10 10" fill="#fff">
              <path d="M5 8.6 0.9 4.3a5.9 5.9 0 0 1 8.2 0L5 8.6Z" />
            </svg>
            <svg width="8" height="8" viewBox="0 0 10 10" fill="#fff">
              <path d="M9.2 1v8H1.4L9.2 1Z" />
            </svg>
            <svg width="5" height="8" viewBox="0 0 6 10" fill="#fff">
              <rect x="1.8" y="0" width="2.4" height="1.2" rx="0.4" />
              <rect x="0" y="1" width="6" height="9" rx="1.4" />
            </svg>
          </span>
        </div>

        {/* Nombre del chat */}
        <div className="flex items-center gap-2 px-2.5 pb-2 pt-1">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 3 2.5 8 7 13" />
            <path d="M2.8 8H14" />
          </svg>

          {/* La foto del contador, dibujada: círculo y silueta */}
          <span className="relative block h-[22px] w-[22px] shrink-0 overflow-hidden rounded-full" style={{ background: "#8D7F6E" }}>
            <svg viewBox="0 0 24 24" className="absolute inset-0 h-full w-full" fill="#E7DFD4">
              <circle cx="12" cy="9" r="4.2" />
              <path d="M12 14.4c4.2 0 7.4 2.6 7.4 6V24H4.6v-3.6c0-3.4 3.2-6 7.4-6Z" />
            </svg>
          </span>

          <span className="font-bold text-white" style={{ fontSize: 11.5, letterSpacing: "-0.01em" }}>
            Contador
          </span>

          <span className="ml-auto flex items-center gap-2 pr-0.5">
            <svg width="13" height="13" viewBox="0 0 24 24">
              <path
                fill="#fff"
                d="M3.5 6.2c0-.5.4-.9.9-.9h3.2c.5 0 .9.4.9.9 0 1.1.2 2.2.5 3.2.1.3 0 .7-.2.9l-2 2a15.6 15.6 0 0 0 5.9 5.9l2-2c.2-.2.6-.3.9-.2 1 .3 2.1.5 3.2.5.5 0 .9.4.9.9v3.2c0 .5-.4.9-.9.9-8.5 0-15.3-6.8-15.3-15.3Z"
              />
              <path fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" d="M19.5 2.6v5.2M16.9 5.2h5.2" />
            </svg>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="#fff">
              <circle cx="6" cy="2" r="1.25" />
              <circle cx="6" cy="6" r="1.25" />
              <circle cx="6" cy="10" r="1.25" />
            </svg>
          </span>
        </div>
      </div>

      {/* La conversación */}
      <div
        className="px-2.5 pb-4 pt-3"
        style={{ background: `${GARABATOS}, #EFE7DE`, backgroundSize: "88px 88px, auto" }}
      >
        <div
          className="w-fit rounded-[8px] rounded-tl-[2px] px-2 py-1.5 text-left"
          style={{
            maxWidth: "86%",
            background: "#fff",
            boxShadow: "0 1px 0.5px rgba(11,20,26,0.13)",
          }}
        >
          <span style={{ fontSize: 10.5, lineHeight: 1.2, color: UI.texto }}>
            ¿Me mandas los tickets de septiembre? Me faltan los de mostrador.
          </span>
          <span className="mt-0.5 block text-right" style={{ fontSize: 7.5, color: "#8696A0" }}>
            11:04
          </span>
        </div>

        <div
          className="ml-auto mt-1.5 w-fit rounded-[8px] rounded-tr-[2px] px-2 py-1.5 text-left"
          style={{
            maxWidth: "86%",
            background: "#D9FDD3",
            boxShadow: "0 1px 0.5px rgba(11,20,26,0.13)",
          }}
        >
          <span style={{ fontSize: 10.5, lineHeight: 1.35, color: "#111B21" }}>Voy, déjame los junto</span>
          <span className="mt-0.5 flex items-center justify-end gap-[3px]" style={{ fontSize: 7.5, color: "#667781" }}>
            11:06
            <svg width="11" height="7" viewBox="0 0 16 11" fill="none" stroke="#53BDEB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 6l3 3 5.5-7" />
              <path d="M6.5 6l3 3L15 2" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

/* La sección: el Excel roto enfrentado con la pantalla real de Facturación.
   No es una tabla de palomitas contra tachas; la comparación la hace el ojo. */
const FACTURAS_LIMPIAS = [
  { tipo: "Factura de venta", receptor: "Comercializadora Delta", total: "$34,500.00" },
  { tipo: "Factura global", receptor: "Público en general", total: "$28,750.00" },
  { tipo: "Factura de venta", receptor: "María González López", total: "$4,980.00" },
  { tipo: "Recibo de pago", receptor: "Distribuidora Monterrey", total: "$12,200.00" },
  { tipo: "Devolución o descuento", receptor: "Comercializadora Delta", total: "$4,640.00" },
];

function PanelFacturacionLimpio() {
  return (
    <div
      className="overflow-hidden rounded-[10px] bg-white text-left"
      style={{ fontFamily: FUENTE, boxShadow: "0 40px 80px rgba(0,0,0,0.55)" }}
    >
      <div className="flex items-center justify-between gap-3 border-b px-4 py-3" style={{ borderColor: UI.bordeSuave }}>
        <span className="font-bold" style={{ fontSize: 13, color: UI.texto }}>
          Facturación
        </span>
        <span className="rounded-[8px] px-2.5 py-1.5 font-semibold text-white" style={{ background: UI.rojo, fontSize: 10.5 }}>
          Crear factura
        </span>
      </div>

      {FACTURAS_LIMPIAS.map((f) => (
        <div
          key={f.tipo + f.receptor + f.total}
          className="flex items-center gap-3 border-b px-4 py-[11px] last:border-b-0"
          style={{ borderColor: UI.bordeSuave }}
        >
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate font-medium" style={{ fontSize: 11, color: UI.texto }}>
              {f.tipo}
            </span>
            <span className="block truncate" style={{ fontSize: 10, color: UI.tenue }}>
              {f.receptor}
            </span>
          </span>
          <span className="shrink-0 font-semibold" style={{ fontSize: 11, color: UI.texto }}>
            {f.total}
          </span>
          <span className="shrink-0">
            <Chip size={9} tono="verde">
              Registrada
            </Chip>
          </span>
        </div>
      ))}
    </div>
  );
}

export function T1FinanzasProblema() {
  return (
    <section className="relative overflow-hidden bg-black px-5 pb-[88px] pt-[56px] tablet:px-6 tablet:pb-[130px] tablet:pt-[72px]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(ellipse at center, rgba(219,59,43,0.12) 0%, transparent 65%)", filter: "blur(55px)" }}
      />
      <div className="relative mx-auto flex max-w-[var(--max-w)] flex-col items-center text-center">
        <h2
          className="font-sora text-[30px] font-light text-white tablet:text-[52px]"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.12, maxWidth: 680 }}
        >
          Facturar a mano te quita medio día al mes
        </h2>
        <p className="mt-4 font-inter text-[15px] font-light text-white/55 tablet:text-[17px]" style={{ maxWidth: 560 }}>
          Hoy lo armas canal por canal. Con T1 Finanzas, ya está listo.
        </p>

        <div className="mt-12 grid w-full grid-cols-1 items-start gap-10 tablet:mt-16 tablet:grid-cols-2 tablet:gap-12" aria-hidden>
          {/* Hoy */}
          <div className="flex flex-col items-center">
            <p className="font-inter text-[12px] font-semibold uppercase tracking-[0.1em] text-white/35" style={{ marginBottom: 16 }}>
              Hoy
            </p>
            <div className="relative w-full">
              <div className="tablet:[transform:rotate(-1.5deg)]" style={{ filter: "saturate(0.75)" }}>
                <HojaDeCalculo />
              </div>
              {/* El mensaje del contador, encimado. En móvil no cabe. */}
              <div className="absolute -bottom-20 -left-7 hidden tablet:block" style={{ transform: "rotate(-5deg)" }}>
                <MensajeContador />
              </div>
            </div>
          </div>

          {/* Con T1 Finanzas */}
          <div className="flex flex-col items-center">
            <p className="font-inter text-[12px] font-semibold uppercase tracking-[0.1em] text-[#FF6F5E]" style={{ marginBottom: 16 }}>
              Con T1 Finanzas
            </p>
            <div className="w-full tablet:[transform:rotate(1.5deg)]">
              <PanelFacturacionLimpio />
            </div>
          </div>
        </div>

        <p
          className="mt-16 font-sora text-[22px] font-light text-white tablet:mt-24 tablet:text-[32px]"
          style={{ letterSpacing: "-0.02em", lineHeight: 1.25, maxWidth: 620 }}
        >
          Con T1 Finanzas, tus ventas llegan listas.
        </p>

        <a
          href={SIGNUP_URL}
          data-cta-text="Comienza gratis"
          data-cta-destination={SIGNUP_URL}
          data-cta-section="problema"
          className="mt-9 inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]"
        >
          Comienza gratis
          {Arrow}
        </a>
      </div>
    </section>
  );
}

/* ══════════ 2 · Los pedidos de T1 Tienda ══════════
   Los logos son SOLO los de las tiendas cuyos pedidos llegan a Finanzas el
   día que se publica. WooCommerce queda fuera hasta confirmarlo. */
const CANAL_LOGOS = [
  { src: "/img/meli-iso.svg", alt: "Mercado Libre" },
  { src: "/img/amazon-iso.svg", alt: "Amazon" },
  { src: "/img/walmart.svg", alt: "Walmart" },
  { src: "/img/tiktokshop.svg", alt: "TikTok Shop" },
  { src: "/img/sears-isotipo.svg", alt: "Sears" },
  { src: "/img/sanborns-iso.svg", alt: "Sanborns" },
  { src: "/img/shein-iso.svg", alt: "SHEIN" },
  { src: "/img/aliexpress.svg", alt: "AliExpress" },
  { src: "/img/shopify.svg", alt: "Shopify" },
  { src: "/img/tiendanube.svg", alt: "Tienda Nube" },
  { src: "/img/totalplay.svg", alt: "Total Play" },
];

/* Los isotipos flotan alrededor del texto, como en "Actualizar cada canal a
   mano" de la sublanding de marketplaces. En móvil se reparten arriba y
   abajo, para que nunca se encimen con el texto. */
const DISPERSION_DESKTOP = [
  { i: 0, l: "8%", t: "22%", s: 54, r: -8 },
  { i: 1, l: "16%", t: "62%", s: 48, r: 7 },
  { i: 2, l: "90%", t: "24%", s: 52, r: 8 },
  { i: 3, l: "84%", t: "64%", s: 46, r: -7 },
  { i: 4, l: "28%", t: "11%", s: 44, r: 5 },
  { i: 5, l: "72%", t: "10%", s: 42, r: -5 },
  { i: 6, l: "6%", t: "44%", s: 44, r: 6 },
  { i: 7, l: "94%", t: "44%", s: 46, r: -6 },
  { i: 8, l: "30%", t: "88%", s: 46, r: 6 },
  { i: 9, l: "70%", t: "89%", s: 44, r: -6 },
  { i: 10, l: "49%", t: "92%", s: 40, r: 4 },
];
const DISPERSION_MOVIL = [
  { i: 0, l: "12%", t: "8%", s: 42, r: -8 },
  { i: 4, l: "38%", t: "5%", s: 38, r: 5 },
  { i: 3, l: "64%", t: "6%", s: 38, r: -5 },
  { i: 2, l: "88%", t: "10%", s: 42, r: 8 },
  { i: 6, l: "22%", t: "16%", s: 36, r: 4 },
  { i: 5, l: "78%", t: "17%", s: 36, r: -6 },
  { i: 1, l: "12%", t: "90%", s: 42, r: 7 },
  { i: 8, l: "38%", t: "93%", s: 40, r: -6 },
  { i: 9, l: "62%", t: "92%", s: 40, r: 7 },
  { i: 7, l: "88%", t: "88%", s: 42, r: 6 },
  { i: 10, l: "74%", t: "81%", s: 36, r: -4 },
];

export function T1FinanzasCanales() {
  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden bg-[#0e0d0d] px-5 py-[80px] tablet:min-h-[620px] tablet:px-10 tablet:py-[120px]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(219,59,43,0.10) 0%, transparent 62%)" }}
      />

      {DISPERSION_DESKTOP.map(({ i, l, t, s: size, r }) => (
        <Image
          key={`d-${CANAL_LOGOS[i].alt}`}
          src={CANAL_LOGOS[i].src}
          alt={CANAL_LOGOS[i].alt}
          width={size}
          height={size}
          className="pointer-events-none absolute hidden object-contain tablet:block"
          style={{ left: l, top: t, width: size, height: size, transform: `translate(-50%, -50%) rotate(${r}deg)`, filter: "drop-shadow(0 14px 26px rgba(0,0,0,0.45))" }}
        />
      ))}

      {DISPERSION_MOVIL.map(({ i, l, t, s: size, r }) => (
        <Image
          key={`m-${CANAL_LOGOS[i].alt}`}
          src={CANAL_LOGOS[i].src}
          alt={CANAL_LOGOS[i].alt}
          width={size}
          height={size}
          className="pointer-events-none absolute object-contain tablet:hidden"
          style={{ left: l, top: t, width: size, height: size, transform: `translate(-50%, -50%) rotate(${r}deg)`, filter: "drop-shadow(0 14px 26px rgba(0,0,0,0.45))" }}
        />
      ))}

      <div className="relative mx-auto max-w-[620px] text-center">
        <h2
          className="mx-auto font-sora text-[28px] font-light text-white tablet:text-[42px]"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}
        >
          Tus pedidos llegan solos desde donde ya vendes
        </h2>
        <p className="mx-auto font-inter text-[15px] font-light text-white/60 tablet:text-[17px]" style={{ lineHeight: 1.6, maxWidth: 520 }}>
          Si ya vendes con T1 Tienda, no tienes que conectar nada.
        </p>
      </div>
    </section>
  );
}

/* ══════════ 3 · Por tipo de negocio ══════════
   Mismo patrón que "Mejora tus envíos en un solo lugar": título, subtítulo y
   CTA a la izquierda; carrusel de tarjetas a la derecha. Cada tarjeta lleva
   dos niveles nada más —quién eres y qué ganas—, sin la etiqueta roja ni la
   tercera línea de apoyo.

   Mientras no existan las sublandings, cada tarjeta lleva a la pregunta
   frecuente de su tema, que se abre sola al llegar por la liga. */
const NEGOCIOS = [
  {
    title: "Marketplaces",
    desc: "Tu factura global de cada marketplace, sin armarla a mano.",
    href: "/productos/t1finanzas#faq-global-marketplaces",
  },
  {
    title: "Tienda en línea",
    desc: "Facturas cada pedido en un clic, y los datos de tu cliente se guardan desde su primera factura.",
    href: "/productos/t1finanzas#faq-ya-uso-t1-tienda",
  },
  {
    title: "Mostrador",
    desc: "Facturas tus ventas sin pagar otro sistema.",
    href: "/productos/t1finanzas#faq-venta-fuera-de-t1",
  },
  {
    title: "Ventas a empresas",
    desc: "Facturas a crédito y registras cada pago con su recibo.",
    href: "/productos/t1finanzas#faq-recibos-de-pago",
  },
];

export function T1FinanzasPorNegocio() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-card]");
    const step = first ? first.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden bg-black px-5 py-[72px] tablet:px-6 tablet:py-[110px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="grid grid-cols-1 gap-10 tablet:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)] tablet:items-center tablet:gap-14">
          <div>
            <h2
              className="font-sora text-[28px] font-light text-white tablet:text-[44px]"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 16, maxWidth: 420 }}
            >
              Funciona vendas donde vendas
            </h2>
            <p className="font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, marginBottom: 28, maxWidth: 380 }}>
              Elige cómo vendes y descubre lo que T1 Finanzas hace por ti.
            </p>
            <a
              href={SIGNUP_URL}
              data-cta-text="Comienza gratis"
              data-cta-destination={SIGNUP_URL}
              data-cta-section="por_negocio"
              className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]"
            >
              Comienza gratis
              {Arrow}
            </a>
          </div>

          <div className="flex flex-col gap-5">
            <div
              ref={ref}
              className="-mr-5 flex gap-5 overflow-x-auto pb-2 pr-5 tablet:mr-0 tablet:pr-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {NEGOCIOS.map((n) => (
                <a
                  key={n.title}
                  href={n.href}
                  data-card
                  className="group flex w-[270px] shrink-0 snap-start flex-col rounded-[20px] border border-white/[0.08] bg-[#1A1A1D] p-6 no-underline transition-colors hover:border-white/20"
                >
                  <div className="flex items-center justify-between gap-2" style={{ marginBottom: 10 }}>
                    <h3 className="font-sora text-[19px] font-normal text-white">{n.title}</h3>
                    <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-white/15 text-white/55 transition-all duration-200 group-hover:translate-x-0.5 group-hover:border-white/40 group-hover:text-white">
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </div>
                  <p className="font-inter text-[14px] font-light text-white/55" style={{ lineHeight: 1.55 }}>
                    {n.desc}
                  </p>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Anterior"
                className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/55 transition-colors hover:border-white/30 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Siguiente"
                className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/55 transition-colors hover:border-white/30 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════ 4 · Lo que puedes emitir ══════════
   Mismo patrón que "Elegir cada paquetería a mano cuesta tiempo y dinero" de
   Reglas de envío: título centrado y una fila de tarjetas con icono que se
   acomodan solas. */
const DOCUMENTOS = [
  {
    title: "Nota de crédito",
    desc: "La usas para una devolución o un descuento sobre una venta ya facturada.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M6 3.5h8l4 4v13H6v-17z" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 13.5h6" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M11.5 11l-2.5 2.5L11.5 16" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Cancelar o corregir",
    desc: "Si una factura salió mal, la cancelas o la cambias por una nueva.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M20 12a8 8 0 1 1-2.6-5.9" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M20 4v4.2h-4.2" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 10l4 4m0-4l-4 4" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Recibo de pago",
    desc: "Lo emites por cada pago de una venta a crédito. Tu contador lo conoce como complemento de pago.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M5 3.5h14v17l-2.3-1.6-2.3 1.6-2.4-1.6L9.6 20.5 7.3 18.9 5 20.5v-17z" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 9.5l2 2 4-4" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function T1FinanzasDocumentos() {
  return (
    <section className="overflow-hidden bg-black px-5 py-[72px] tablet:px-6 tablet:py-[110px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="mx-auto max-w-[940px] text-center" style={{ marginBottom: 48 }}>
          <h2
            className="font-sora text-[28px] font-light text-white tablet:whitespace-nowrap tablet:text-[42px]"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}
          >
            Cancela, corrige y haz notas de crédito
          </h2>
          <p className="mx-auto font-inter text-[15px] font-light text-white/60 tablet:whitespace-nowrap tablet:text-[17px]" style={{ lineHeight: 1.55 }}>
            Cada factura se guarda con su PDF y su XML, el archivo que te pide tu contador.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          {DOCUMENTOS.map((d) => (
            <div
              key={d.title}
              className="w-full max-w-[300px] rounded-[18px] border border-white/[0.08] bg-[#141215] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <div style={{ marginBottom: 24 }}>{d.icon}</div>
              <h3 className="font-sora text-[18px] font-normal text-white" style={{ marginBottom: 8 }}>
                {d.title}
              </h3>
              <p className="font-inter text-[14px] font-light text-white/55" style={{ lineHeight: 1.6 }}>
                {d.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════ 4 · Planes ══════════
   Salen de la tabla la fila "Todo lo que emites tú" (igual en todos los
   planes, le quitaba peso a la que decide) y la de "Negocios por cuenta"
   (hacía ver que pagar te quita negocios). */
const PLAN_ROWS = [
  { label: "Facturas al mes, por negocio", gratis: "25", pago: "Sin límite" },
  { label: "Factura global automática", gratis: "No", pago: "Sí" },
];

export function T1FinanzasPlanes() {
  return (
    <section className="bg-[#0e0d0d] px-5 py-[56px] tablet:px-6 tablet:py-[88px]">
      {/* El par texto + tabla va centrado en la sección, no pegado a la izquierda. */}
      <div className="mx-auto max-w-[980px]">
        <div className="grid grid-cols-1 gap-8 tablet:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] tablet:items-center tablet:gap-14">
          <div className="text-left">
            <h2
              className="font-sora text-[28px] font-light text-white tablet:text-[44px]"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 14 }}
            >
              Comienza gratis, crece sin límite
            </h2>
            <p className="font-inter text-[15px] font-light text-white/60 tablet:text-[17px]" style={{ lineHeight: 1.55, maxWidth: 360, marginBottom: 24 }}>
              El plan Gratuito incluye 25 facturas al mes. Con los planes Básico y Avanzado,
              desde $399 al mes, facturas sin límite.
            </p>
            <a
              href="/precios"
              className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]"
            >
              Ver los planes de T1
              {Arrow}
            </a>
          </div>

          <div className="w-full tablet:max-w-[500px]">
            <div className="overflow-hidden rounded-[20px] border border-white/[0.10] bg-[#141215]">
              <div className="grid grid-cols-[minmax(0,1.85fr)_minmax(0,0.7fr)_minmax(0,1fr)] border-b border-white/[0.08] px-5 py-3.5">
                <span className="font-inter text-[12px] font-semibold uppercase tracking-[0.06em] text-white/40">Incluye</span>
                <span className="text-center font-inter text-[13px] font-semibold text-white/65">Gratuito</span>
                <span className="text-center font-inter text-[13px] font-semibold text-white">Básico y Avanzado</span>
              </div>
              {PLAN_ROWS.map((r) => (
                <div
                  key={r.label}
                  className="grid grid-cols-[minmax(0,1.85fr)_minmax(0,0.7fr)_minmax(0,1fr)] items-center border-b border-white/[0.06] px-5 py-3.5 last:border-b-0"
                >
                  <span className="pr-3 font-inter text-[13.5px] font-light text-white/70 tablet:text-[14.5px]">{r.label}</span>
                  <span className="text-center font-inter text-[13.5px] font-medium text-white/85 tablet:text-[14.5px]">{r.gratis}</span>
                  <span className="text-center font-inter text-[13.5px] font-semibold text-white tablet:text-[14.5px]">{r.pago}</span>
                </div>
              ))}
            </div>

            <p className="mt-5 font-inter text-[14px] font-light leading-[1.55] text-white/55 tablet:text-[15px]">
              Cada factura, nota de crédito o recibo de pago cuenta dentro de las 25.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════ 6 · Preguntas frecuentes ══════════
   Ordenadas por tema (empezar · precio · facturar · tiendas y factura global ·
   seguridad y validez · lo que no hace). Cada respuesta se lee sola, sin leer
   las demás, porque es lo que consultan los asistentes de IA. */
type Faq = { q: string; a: string; grupo?: string; id?: string };

const FAQS: Faq[] = [
  /* ── Empezar ── */
  {
    q: "¿Qué es T1 Finanzas?",
    grupo: "Empezar",
    a: "Es la facturación de T1. Con ella emites las facturas de las ventas de tu negocio: las de tu tienda en T1, las de tus marketplaces conectados, las de tu mostrador y las que haces por WhatsApp o en persona. Emite facturas, factura global, notas de crédito, cancelaciones y recibos de pago. Está hecha para quien lleva el negocio, y le pasas a tu contador tus archivos listos.",
  },
  {
    q: "¿Qué necesito para empezar a facturar?",
    a: "El RFC de tu negocio y su sello digital. El sello son dos archivos que te da el SAT para firmar tus facturas: si ya los tienes, los subes en unos minutos con una guía en video; si no, te damos la guía paso a paso para tramitarlos. También aceptas, con una casilla, el permiso que el SAT pide para que un sistema emita facturas a tu nombre. No te pedimos tu firma electrónica (e.firma).",
  },
  {
    q: "¿Qué es el sello digital y cómo lo saco?",
    a: "Son dos archivos, uno .cer y uno .key, con una contraseña, que el SAT le da a cada negocio para firmar sus facturas. También se le conoce como CSD (certificado de sello digital). Si ya facturas con algún sistema distinto al portal del SAT, casi seguro ya lo tienes. Si no, se tramita en línea en el sitio del SAT con tu e.firma, y en T1 te damos la guía paso a paso.",
  },
  {
    q: "Ya uso T1 Tienda. ¿Tengo que instalar algo?",
    id: "ya-uso-t1-tienda",
    a: "No. Los pedidos de las tiendas y marketplaces donde ya vendes con T1 Tienda aparecen en T1 Finanzas. Solo hay que dar de alta el RFC y subir el sello digital.",
  },
  {
    q: "¿Y si no uso T1 Tienda?",
    a: "Puedes usar T1 Finanzas solo: creas tu cuenta gratis, subes tu sello y facturas tus ventas en cuatro pasos. Si después vendes con T1 Tienda, tus pedidos llegan solos.",
  },
  {
    q: "Ya uso otro facturador. ¿Pierdo mis facturas?",
    a: "No. Tus facturas anteriores siguen siendo válidas y el SAT las tiene registradas. En T1 empiezas a facturar desde el día que te das de alta, con el mismo sello digital que ya usas.",
  },

  /* ── Precio ── */
  {
    q: "¿Cuánto cuesta?",
    grupo: "Precio",
    a: "Empezar es gratis: tienes 25 facturas al mes por negocio y hasta 3 negocios en una cuenta. Cuentan todas las facturas, facturas globales, notas de crédito y recibos de pago que emites. Los planes Básico y Avanzado incluyen facturas sin límite y la factura global automática de tus tiendas y marketplaces. Los precios están en la sección de planes.",
  },
  {
    q: "¿Qué pasa cuando llego a las 25 facturas del mes?",
    a: "Te avisamos cuando te queden cinco. Al llegar a 25 puedes pasar al plan Básico para facturar sin límite. Si puedes esperar, se renuevan el día 1 del mes siguiente. Las facturas que ya emitiste no cambian.",
  },
  {
    q: "¿Cuentan las facturas que cancelo?",
    a: "Sí. Cada factura cuenta al emitirse, aunque después la canceles. Si la sustituyes por una nueva, la nueva también cuenta.",
  },
  {
    q: "¿Puedo tener varios negocios?",
    a: "Sí. Una cuenta gratis puede tener hasta tres negocios, cada uno con su RFC, su sello y sus 25 facturas gratis al mes.",
  },

  /* ── Facturar ── */
  {
    q: "¿Necesito saber de impuestos para facturar?",
    grupo: "Facturar",
    a: "No. Para hacer tus facturas, te preguntamos en palabras simples a quién le vendiste, qué vendiste y cómo te pagaron, te sugerimos los datos que pide el SAT y tú revisas la factura antes de emitirla. Tus impuestos y tus declaraciones los sigue viendo tu contador.",
  },
  {
    q: "¿Cómo sé qué clave de producto del SAT le corresponde a lo que vendo?",
    a: "No tienes que buscarla. El catálogo del SAT tiene 52,513 claves de producto, y nuestro sistema inteligente te sugiere la que mejor le queda a cada cosa que vendes. Tú la apruebas. Nunca la ponemos sin preguntarte, y la puedes cambiar antes de emitir la factura.",
  },
  {
    q: "¿Puedo facturar una venta que hice fuera de T1?",
    id: "venta-fuera-de-t1",
    a: "Sí. Tus ventas de mostrador, WhatsApp o en persona las capturas en cuatro pasos y su factura vale igual que las demás.",
  },
  {
    q: "¿Puedo cancelar o corregir una factura?",
    a: "Sí. Puedes cancelar una factura o cambiarla por una nueva, con el motivo que pide el SAT. Las devoluciones y los descuentos sobre una venta ya facturada se resuelven con una nota de crédito.",
  },
  {
    q: "¿Puedo hacer recibos de pago de ventas a crédito?",
    id: "recibos-de-pago",
    a: "Sí. Cuando te pagan una venta que facturaste a crédito, registras el pago y emites su recibo de pago, ligado a la factura original. Es lo que tu contador llama complemento de pago.",
  },
  {
    q: "¿Puedo facturar ventas de meses anteriores?",
    a: "Sí, dentro del año fiscal en curso. Conviene revisarlo con tu contador antes de hacerlo.",
  },
  {
    q: "¿T1 Finanzas emite facturas en la versión 4.0?",
    a: "Sí. Todas las facturas se emiten en la versión 4.0 del CFDI (comprobante fiscal digital por internet), que es la que el SAT pide hoy.",
  },
  {
    q: "¿Qué pasa si vendo en la frontera?",
    a: "Si tu negocio tiene el estímulo del IVA de 8 por ciento de la región fronteriza, facturas con esa tasa, calculada al centavo.",
  },

  /* ── Tus tiendas y la factura global ── */
  {
    q: "¿Qué es la factura global y por qué tengo que emitirla?",
    grupo: "Tus tiendas y la factura global",
    a: "Es una sola factura que junta las ventas de un periodo por las que nadie pidió factura, por ejemplo las de tu mostrador o las de tu tienda en línea. El SAT te pide emitirla. En T1 se arma una por cada lugar donde vendes: tu tienda en línea, cada marketplace y tu mostrador. La emites tú con un botón o, si tu plan lo incluye, se emite sola cada día o a fin de mes, como tú elijas.",
  },
  {
    q: "¿Se factura sola la global de mis ventas en Mercado Libre, Amazon o TikTok Shop?",
    id: "global-marketplaces",
    a: "Sí, con los planes Básico y Avanzado. Eliges si sale cada día o a fin de mes, o si la emites tú con un botón, y lo puedes cambiar cuando quieras. La factura que un cliente te pide la emites tú en un clic.",
  },
  {
    q: "Un cliente me pidió factura de una venta. ¿Qué pasa con la global?",
    a: "Si la global de ese periodo todavía no se emite, le haces su factura con sus datos y esa venta ya no entra en la global. Si la global ya se emitió, con un botón T1 saca esa venta de la global con una nota de crédito y hace la factura de tu cliente, sin cancelar nada. En ningún caso la venta se factura dos veces. En el segundo caso, la nota de crédito y la factura nueva cuentan dentro de tus 25 facturas gratis del mes.",
  },
  {
    q: "Ya facturo con la herramienta de Mercado Libre. ¿Para qué quiero T1 Finanzas?",
    a: "Porque en T1 facturas en un solo lugar lo que vendes en Mercado Libre, Amazon, tu tienda en línea y tu mostrador, no solo lo de Mercado Libre. Cada tienda y marketplace tiene su propia factura global, y desde el mismo lugar emites notas de crédito, cancelaciones y recibos de pago. Si vendes en Mercado Libre y en algún otro lado, aquí dejas de facturar en varias partes.",
  },

  /* ── Seguridad y validez ── */
  {
    q: "¿Mis facturas son válidas ante el SAT?",
    grupo: "Seguridad y validez",
    a: "Sí. Cada factura se registra ante el SAT a través de un proveedor autorizado. A eso se le llama timbrar. Solo te decimos que tu factura está lista cuando ya tiene su timbre, que es lo que la hace válida ante el SAT.",
  },
  {
    q: "¿Dónde se guardan mis facturas y mi sello digital?",
    a: "Tus facturas quedan guardadas en la cuenta de tu negocio con su PDF y su XML, el archivo que usa tu contador. Las descargas cuando las necesites.",
  },

  /* ── Lo que no hace ── */
  {
    q: "¿Puede entrar mi contador?",
    grupo: "Lo que no hace",
    a: "Por ahora no. Descargas los XML y los PDF del mes, se los mandas y tu contador trabaja con ellos como siempre.",
  },
  {
    q: "¿T1 Finanzas hace mi contabilidad o mis declaraciones?",
    a: "No. T1 Finanzas emite y guarda las facturas de tu negocio. La contabilidad y las declaraciones siguen siendo trabajo de tu contador, y tú le pasas los archivos del mes ya listos.",
  },
  {
    q: "¿Puedo facturar si le vendo a empresas que me hacen retenciones?",
    a: "Todavía no. Si una venta lleva retención de IVA o de ISR (el impuesto sobre la renta), te avisamos antes de emitirla para que no salga una factura incompleta. Mientras tanto, esas facturas las sigues haciendo como hoy.",
  },
  {
    q: "¿Puedo facturar en dólares o a clientes del extranjero?",
    a: "Todavía no. Por ahora T1 Finanzas factura en pesos y a clientes en México.",
  },
  {
    q: "¿Qué negocios no pueden usar T1 Finanzas todavía?",
    a: "Tabaco, combustibles, autos y motos nuevos, casas de apuestas, partidos políticos y asociaciones que reciben donativos deducibles, por sus reglas fiscales especiales. Tampoco emite nómina ni carta porte, que son otro tipo de factura. Te lo decimos desde el alta, no a la mitad del camino.",
  },
];

/* Una pregunta se abre sola cuando se llega a ella por su liga (las tarjetas
   de "por tipo de negocio" apuntan aquí mientras no existan las sublandings). */
function FAQItem({ q, a, id }: Faq) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!id) return;
    const abrirSiEsLaMia = () => {
      if (window.location.hash !== `#faq-${id}`) return;
      setOpen(true);
      ref.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    };
    abrirSiEsLaMia();
    window.addEventListener("hashchange", abrirSiEsLaMia);
    return () => window.removeEventListener("hashchange", abrirSiEsLaMia);
  }, [id]);

  return (
    <button ref={ref} id={id ? `faq-${id}` : undefined} type="button" onClick={() => setOpen((o) => !o)} className="w-full scroll-mt-28 border-b border-white/10 py-5 text-left">
      <div className="flex items-center justify-between gap-4">
        <span className="font-inter text-[16px] font-medium text-white tablet:text-[18px]">{q}</span>
        <span className={`shrink-0 text-white/50 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
      </div>
      <div className="grid transition-all duration-300" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <p className="pr-8 pt-3 font-inter text-[15px] font-light leading-relaxed text-white/60 tablet:text-[16px]">{a}</p>
        </div>
      </div>
    </button>
  );
}

export function T1FinanzasFAQ() {
  return (
    <section className="bg-black px-5 py-[56px] tablet:px-6 tablet:py-[78px]">
      <div className="mx-auto max-w-[760px]">
        <h2
          className="mb-8 text-center font-sora text-[28px] font-light text-white tablet:mb-12 tablet:text-[40px]"
          style={{ letterSpacing: "-0.03em" }}
        >
          Preguntas frecuentes
        </h2>
        <div>
          {FAQS.map((f) => (
            <div key={f.q}>
              {f.grupo && (
                <p
                  className="font-inter text-[12px] font-semibold uppercase tracking-[0.09em] text-white/40"
                  style={{ marginTop: 34, marginBottom: 6 }}
                >
                  {f.grupo}
                </p>
              )}
              <FAQItem q={f.q} a={f.a} id={f.id} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
