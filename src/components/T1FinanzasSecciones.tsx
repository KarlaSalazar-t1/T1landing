"use client";

import Image from "next/image";
import { useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";

/* ──────────────────────────────────────────────────────────────────────────
   Secciones de la landing de T1 Finanzas.

   Reglas de contenido (six-pager §9): español llano, sin jerga del SAT (y si
   un término fiscal es inevitable, se explica una vez); se le habla al dueño,
   nunca al contador; nada de lo que todavía no existe: portal de autofactura,
   chat de IA, acceso del contador, carga masiva, retenciones, addendas.
   Las únicas cifras permitidas son 52,513 · 25 · 3 (producto) y, solo en el
   bloque del problema, las de contexto del SAT y del INEGI.
   ────────────────────────────────────────────────────────────────────────── */

const Check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
    <path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Arrow = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
    <path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ══════════ 1 · El problema ══════════ */
const DOLORES = [
  {
    title: "Te piden datos que nadie te explicó",
    desc: "Claves de producto, uso del comprobante, forma y método de pago, régimen. El portal del SAT es gratis, pero exige saber de impuestos.",
  },
  {
    title: "La global de fin de mes la armas a mano",
    desc: "Vacías tus ventas canal por canal a una hoja de cálculo, restas lo que ya facturaste y cuadras contra lo que reporta cada marketplace.",
  },
  {
    title: "Los sistemas hablan el idioma del contador",
    desc: "Y el contador cobra por emitir. Le mandas capturas de pantalla por WhatsApp y nunca ves qué se facturó y qué no.",
  },
  {
    title: "Una factura mal hecha detiene tu cobro",
    desc: "Si le vendes a empresas, un impuesto mal desglosado rebota la factura y el pago se recorre semanas.",
  },
];

export function T1FinanzasProblema() {
  return (
    <section className="bg-black px-5 py-[60px] tablet:px-6 tablet:py-[88px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 48 }}>
          <h2
            className="font-sora text-[28px] font-light text-white tablet:text-[44px]"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}
          >
            Facturar no debería costarte medio día al mes
          </h2>
          <p className="mx-auto font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, maxWidth: 560 }}>
            En México, 1.95 millones de negocios formales están obligados a facturar. Casi todos lo
            hacen con miedo de equivocarse.
          </p>
        </div>

        <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-4 tablet:grid-cols-2 tablet:gap-5">
          {DOLORES.map((d) => (
            <div key={d.title} className="flex flex-col rounded-[18px] border border-white/[0.08] bg-[#141215] p-7">
              <h3 className="font-sora text-[19px] font-normal text-white" style={{ marginBottom: 8 }}>
                {d.title}
              </h3>
              <p className="font-inter text-[14px] font-light text-white/60 tablet:text-[15px]" style={{ lineHeight: 1.6 }}>
                {d.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-[980px] font-inter text-[12px] font-light text-white/30">
          Fuente del dato: INEGI, Censos Económicos 2024.
        </p>
      </div>
    </section>
  );
}

/* ══════════ 2 · Por qué T1 Finanzas (el diferenciador) ══════════ */
const RAZONES = [
  {
    title: "La venta ya vive aquí",
    desc: "No hay nada que conectar desde Finanzas ni que mantener: tus canales ya están en T1 Tienda.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M4 7h16M4 12h16M4 17h9" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="18.5" cy="17" r="3" stroke="#FFFFFF" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Gratis de verdad",
    desc: "25 facturas al mes por negocio, cada mes, no una sola vez al abrir la cuenta. Hasta tres negocios en una cuenta gratis.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 3v18" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 7.5c0-1.7-1.8-2.5-4-2.5s-4 .9-4 2.6c0 3.9 8 2.1 8 6 0 1.8-1.8 2.9-4 2.9s-4-1-4-2.7" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "En tu idioma, no en el del SAT",
    desc: "La plataforma pregunta en lenguaje normal y arma lo demás. Si algo no cuadra, se detiene y te pregunta en vez de adivinar.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M20 12a8 8 0 1 1-3.2-6.4" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M9 12.5l2.2 2.2L20 6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Un solo lugar para tu negocio",
    desc: "Tienda, pagos, envíos y ahora la factura. Lo que facturas aquí ya está dentro del resto de T1.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3.5" y="3.5" width="7" height="7" rx="2" stroke="#FFFFFF" strokeWidth="1.7" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="2" stroke="#FFFFFF" strokeWidth="1.7" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="2" stroke="#FFFFFF" strokeWidth="1.7" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="2" stroke="#FFFFFF" strokeWidth="1.7" />
      </svg>
    ),
  },
];

export function T1FinanzasPorQue() {
  return (
    <section className="bg-black px-5 py-[60px] tablet:px-6 tablet:py-[84px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 48 }}>
          <h2
            className="font-sora text-[28px] font-light text-white tablet:text-[44px]"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}
          >
            ¿Por qué facturar con T1?
          </h2>
          <p className="mx-auto font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, maxWidth: 560 }}>
            Porque facturas solo lo que ya vendiste, desde donde ya vendes, sin aprender impuestos y
            sin pagar por empezar.
          </p>
        </div>

        <div className="mx-auto grid max-w-[1040px] grid-cols-1 gap-4 tablet:grid-cols-2 tablet:gap-5 desktop:grid-cols-4">
          {RAZONES.map((r) => (
            <div key={r.title} className="flex flex-col rounded-[18px] border border-white/[0.08] bg-[#141215] p-7">
              <span className="mb-5 inline-flex">{r.icon}</span>
              <h3 className="font-sora text-[19px] font-normal text-white" style={{ marginBottom: 8 }}>
                {r.title}
              </h3>
              <p className="font-inter text-[14px] font-light text-white/60 tablet:text-[15px]" style={{ lineHeight: 1.6 }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════ 3 · Canales + cobertura ══════════ */
const CANAL_LOGOS = [
  { src: "/img/meli-iso.svg", alt: "Mercado Libre" },
  { src: "/img/amazon-iso.svg", alt: "Amazon" },
  { src: "/img/walmart.svg", alt: "Walmart" },
  { src: "/img/tiktokshop.svg", alt: "TikTok Shop" },
  { src: "/img/shopify.svg", alt: "Shopify" },
  { src: "/img/tiendanube.svg", alt: "Tiendanube" },
  { src: "/img/sears-isotipo.svg", alt: "Sears" },
];

const COBERTURA = [
  "La tienda que vende de todo",
  "La dulcería o la vinatería, con su impuesto especial al centavo",
  "La frontera, con su IVA de 8%",
  "El despacho que factura servicios",
  "Quien le vende a empresas",
];

export function T1FinanzasCanales() {
  return (
    <section className="overflow-hidden bg-[#0e0d0d] px-5 py-[60px] tablet:px-6 tablet:py-[84px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
          <div>
            <h2
              className="font-sora text-[28px] font-light text-white tablet:text-[44px]"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 16 }}
            >
              Tus canales ya están aquí
            </h2>
            <p className="font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, marginBottom: 24, maxWidth: 440 }}>
              Los canales que ya tienes conectados en T1 Tienda alimentan T1 Finanzas. No hay nada
              que conectar, ni que volver a autorizar, ni que mantener.
            </p>
            <ul className="mb-8 flex flex-col gap-3">
              {[
                "Tu tienda de T1 y tus marketplaces, en una sola pantalla",
                "Cada canal con su regla: global diaria, a fin de mes o a mano",
                "Lo que vendiste fuera de T1, incluido el mostrador, en cuatro pasos",
              ].map((it) => (
                <li key={it} className="flex items-start gap-3 font-inter text-[15px] text-white/75 tablet:text-[16px]">
                  {Check}
                  {it}
                </li>
              ))}
            </ul>
            <a
              href={SIGNUP_URL}
              className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]"
            >
              Comienza gratis
              {Arrow}
            </a>
          </div>

          <div>
            <div className="grid grid-cols-3 gap-3 tablet:gap-4">
              {CANAL_LOGOS.map((l) => (
                <div
                  key={l.alt}
                  className="flex h-[88px] items-center justify-center rounded-[16px] border border-white/[0.08] bg-[#161418] p-4"
                >
                  <Image src={l.src} alt={l.alt} width={120} height={60} className="h-7 w-auto max-w-[70%] object-contain" />
                </div>
              ))}
              <div className="flex h-[88px] items-center justify-center rounded-[16px] border border-white/[0.08] bg-[#161418] p-4 text-center font-inter text-[12.5px] font-medium leading-tight text-white/50">
                y los demás canales de T1 Tienda
              </div>
            </div>

            <div className="mt-7 border-t border-white/[0.08] pt-6">
              <p className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] text-white/40" style={{ marginBottom: 12 }}>
                Entra casi cualquier negocio
              </p>
              <div className="flex flex-wrap gap-2">
                {COBERTURA.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/[0.10] bg-white/[0.04] px-3.5 py-2 font-inter text-[13px] font-medium text-white/85"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════ 4 · Los cinco documentos ══════════ */
const DOCUMENTOS = [
  { title: "Factura", desc: "De cualquier venta, pagada al momento o a crédito. La de un pedido conectado sale con todo ya puesto." },
  { title: "Factura global", desc: "Junta por canal las ventas que nadie pidió facturar y que la ley te obliga a emitir." },
  { title: "Nota de crédito", desc: "Para devoluciones y descuentos sobre una venta que ya facturaste." },
  { title: "Cancelación y sustitución", desc: "La factura que salió mal se cancela o se sustituye, con el motivo que pide el SAT y aviso a tu cliente." },
  { title: "Recibo de pago", desc: "Cuando por fin te pagan una venta a crédito. Es la obligación que casi nadie conoce." },
];

export function T1FinanzasDocumentos() {
  return (
    <section className="bg-black px-5 py-[60px] tablet:px-6 tablet:py-[88px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 48 }}>
          <h2
            className="font-sora text-[28px] font-light text-white tablet:text-[44px]"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}
          >
            Los cinco documentos que tu negocio necesita
          </h2>
          <p className="mx-auto font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, maxWidth: 560 }}>
            Todos quedan guardados en tu cuenta, con su archivo XML —el que necesita tu contador— y
            su PDF para descargar.
          </p>
        </div>

        <div className="mx-auto grid max-w-[1040px] grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
          {DOCUMENTOS.map((d, i) => (
            <div
              key={d.title}
              className={`flex flex-col rounded-[18px] border border-white/[0.08] bg-[#141215] p-7 ${i > 2 ? "tablet:col-span-1" : ""}`}
            >
              <span className="mb-4 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#DB3B2B]/[0.12] font-inter text-[13px] font-bold text-[#DB3B2B]">
                {i + 1}
              </span>
              <h3 className="font-sora text-[19px] font-normal text-white" style={{ marginBottom: 8 }}>
                {d.title}
              </h3>
              <p className="font-inter text-[14px] font-light text-white/60 tablet:text-[15px]" style={{ lineHeight: 1.6 }}>
                {d.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════ 5 · Para quién es ══════════ */
const PERFILES = [
  {
    quien: "Delegas todo en tu contador",
    frase: "Tu contador tiene tus llaves y tú le mandas capturas. Aquí ves por primera vez qué se facturó y qué no.",
  },
  {
    quien: "Facturas a mano en el SAT",
    frase: "Facturas poco y tú mismo en el portal del SAT. Aquí lo haces en cuatro pasos y sin buscar claves.",
  },
  {
    quien: "Vendes en varios marketplaces",
    frase: "Vendes en tres o cuatro marketplaces y el cierre te cuesta medio día. Aquí la global de cada canal se arma sola.",
  },
  {
    quien: "Facturas para cobrar",
    frase: "Le vendes a empresas y sin factura correcta no hay pago. Aquí sale bien a la primera.",
  },
  {
    quien: "Tienes varias marcas",
    frase: "Varios RFC, cientos de pedidos al mes. Cada negocio con su sello y sus facturas, en una sola cuenta.",
  },
];

export function T1FinanzasParaQuien() {
  return (
    <section className="overflow-hidden bg-[#0e0d0d] px-5 py-[60px] tablet:px-6 tablet:py-[84px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <h2
          className="mx-auto max-w-[680px] text-center font-sora text-[28px] font-light text-white tablet:text-[44px]"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 40 }}
        >
          Hecho para el dueño del negocio
        </h2>

        <div className="-mr-5 flex gap-4 overflow-x-auto pb-2 pr-5 tablet:mr-0 tablet:grid tablet:grid-cols-3 tablet:overflow-visible tablet:pr-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {PERFILES.map((p) => (
            <div
              key={p.quien}
              className="flex w-[280px] shrink-0 flex-col rounded-[18px] border border-white/[0.08] bg-[#161418] p-6 tablet:w-auto"
            >
              <p className="font-inter text-[12px] font-semibold uppercase tracking-[0.07em] text-[#FF6F5E]" style={{ marginBottom: 12 }}>
                {p.quien}
              </p>
              <p className="font-inter text-[15px] font-light text-white/80 tablet:text-[16px]" style={{ lineHeight: 1.6 }}>
                «{p.frase}»
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════ 6 · Planes ══════════ */
const PLAN_ROWS = [
  { label: "Facturas al mes, por negocio", gratis: "25", pago: "Ilimitadas" },
  { label: "Factura global y todo lo que emites a mano", gratis: "Sí", pago: "Sí" },
  { label: "Autofactura de todos tus canales", gratis: "No", pago: "Sí" },
  { label: "Negocios por cuenta", gratis: "Hasta 3", pago: "Uno por suscripción" },
];

export function T1FinanzasPlanes() {
  return (
    <section className="bg-black px-5 pt-[64px] pb-[64px] tablet:px-6 tablet:pt-[104px] tablet:pb-[104px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="grid grid-cols-1 gap-10 tablet:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] tablet:items-center tablet:gap-14">
          <div className="text-left">
            <h2
              className="font-sora text-[28px] font-light text-white tablet:text-[44px]"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 16 }}
            >
              El gratis factura. El de pago factura solo.
            </h2>
            <p className="font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, maxWidth: 400, marginBottom: 24 }}>
              Facturar está dentro de los planes de T1, junto a tu tienda y tu punto de venta. Contra
              las 25 gratis cuenta cada documento que emites: factura, global, nota de crédito y
              recibo de pago.
            </p>
            <a
              href="/precios"
              className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]"
            >
              Ver los planes de T1
              {Arrow}
            </a>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-white/[0.10] bg-[#141215]">
            <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-white/[0.08] px-5 py-4 tablet:px-6">
              <span className="font-inter text-[12px] font-semibold uppercase tracking-[0.06em] text-white/40">Incluye</span>
              <span className="text-center font-inter text-[13px] font-semibold text-white">Gratis</span>
              <span className="text-center font-inter text-[13px] font-semibold text-[#FF6F5E]">De pago</span>
            </div>
            {PLAN_ROWS.map((r) => (
              <div
                key={r.label}
                className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] items-center border-b border-white/[0.06] px-5 py-4 last:border-b-0 tablet:px-6"
              >
                <span className="pr-3 font-inter text-[13.5px] font-light text-white/70 tablet:text-[15px]">{r.label}</span>
                <span className="text-center font-inter text-[13.5px] font-medium text-white/85 tablet:text-[15px]">{r.gratis}</span>
                <span className="text-center font-inter text-[13.5px] font-semibold text-white tablet:text-[15px]">{r.pago}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════ 7 · El alta y la seguridad ══════════ */
const PASOS_ALTA = [
  {
    n: "1",
    title: "Da de alta tu RFC",
    desc: "El de tu negocio. Si tienes varios, cada uno vive en la misma cuenta con sus propias facturas.",
  },
  {
    n: "2",
    title: "Sube tu sello digital",
    desc: "Son los archivos con los que tu negocio firma sus facturas. Si ya lo tienes, lo subes con una guía en video; si no, te llevamos paso a paso a tramitarlo.",
  },
  {
    n: "3",
    title: "Firma el permiso una vez",
    desc: "El que el SAT exige para que un proveedor emita facturas a nombre de tu negocio. No te pedimos tu firma electrónica.",
  },
];

export function T1FinanzasAlta() {
  return (
    <section className="overflow-hidden bg-[#0e0d0d] px-5 py-[60px] tablet:px-6 tablet:py-[88px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 44 }}>
          <h2
            className="font-sora text-[28px] font-light text-white tablet:text-[44px]"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}
          >
            Empezar te toma unos minutos
          </h2>
          <p className="mx-auto font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, maxWidth: 520 }}>
            Tres cosas, una sola vez. Después solo facturas.
          </p>
        </div>

        <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
          {PASOS_ALTA.map((p) => (
            <div key={p.n} className="flex flex-col rounded-[18px] border border-white/[0.08] bg-[#161418] p-7">
              <span className="mb-4 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#DB3B2B] font-inter text-[13px] font-bold text-white">
                {p.n}
              </span>
              <h3 className="font-sora text-[19px] font-normal text-white" style={{ marginBottom: 8 }}>
                {p.title}
              </h3>
              <p className="font-inter text-[14px] font-light text-white/60 tablet:text-[15px]" style={{ lineHeight: 1.6 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Seguridad */}
        <div className="mx-auto mt-5 flex max-w-[1000px] flex-col items-start gap-4 rounded-[20px] border border-white/[0.08] bg-[#161418] px-7 py-7 tablet:flex-row tablet:items-center tablet:gap-6">
          <span className="flex shrink-0 items-center justify-center">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="#FFFFFF" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="M9 12l2 2 4-4" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="font-sora text-[20px] font-normal text-white">Tu sello, guardado bajo llave</p>
            <p className="mt-1.5 font-inter text-[14px] font-light text-white/60 tablet:text-[15px]" style={{ lineHeight: 1.6 }}>
              Se guarda cifrado: nadie del equipo de T1 puede leerlo y cada uso deja registro. Cada
              factura se sella y se registra ante el SAT a través de un proveedor autorizado —a eso
              se le llama timbrar—, así que no hay mensaje de éxito sin una factura real detrás.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════ 8 · FAQ ══════════ */
const FAQS = [
  {
    q: "¿Qué es T1 Finanzas?",
    a: "Es la facturación de T1. Sirve para emitir las facturas de las ventas de tu negocio, sean de tu tienda en T1, de los marketplaces que tienes conectados, del mostrador o de cualquier venta hecha por fuera. Emite factura individual, factura global, nota de crédito, cancelación y sustitución, y recibo de pago. Es para el dueño del negocio, no para el contador.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Empezar es gratis: 25 facturas al mes por negocio, cada mes, hasta con tres negocios en una cuenta. Cuenta cada documento que se emite: factura, global, nota de crédito o recibo de pago. Los planes de pago de T1 incluyen facturas ilimitadas y la autofactura de canales. Los precios están en la página de planes de T1.",
  },
  {
    q: "¿Necesito saber de impuestos?",
    a: "No. La plataforma pregunta en lenguaje normal: a quién le vendiste, qué vendiste y cómo te pagaron. Las claves del SAT, el uso del comprobante y los impuestos los arma T1 y tú solo confirmas.",
  },
  {
    q: "¿Qué necesito para empezar a facturar?",
    a: "El RFC de tu negocio y su sello digital, que son los archivos que el SAT le entrega a cada negocio para firmar facturas. Si ya lo tienes, lo subes en unos minutos con una guía en video; si no, te damos la guía paso a paso para tramitarlo. Se firma una vez el permiso que el SAT exige para que un proveedor emita facturas a nombre del negocio. No se pide la firma electrónica, la identidad digital del SAT para trámites.",
  },
  {
    q: "¿Qué es la factura global y por qué estoy obligado a emitirla?",
    a: "Es una sola factura que reúne todas las ventas del periodo que nadie pidió facturar, por ejemplo las de público en general en una tienda en línea o en el mostrador. La ley obliga a emitirla. T1 la arma por canal y, en el plan de pago, la emite sola cada día o el último día del mes.",
  },
  {
    q: "¿Se facturan solas mis ventas de Mercado Libre, Amazon o TikTok Shop?",
    a: "Sí, en el plan de pago. Los canales que tu negocio tiene conectados en T1 Tienda alimentan T1 Finanzas, y cada canal tiene su regla: facturar la global cada día, a fin de mes o a mano. Tú eliges la regla y la puedes cambiar.",
  },
  {
    q: "Un cliente me pidió su factura con RFC. ¿Qué pasa con la global?",
    a: "Se le hace su factura individual con sus datos y esa venta sale de la global. Nunca se factura dos veces.",
  },
  {
    q: "¿Puedo facturar una venta que hice fuera de T1?",
    a: "Sí. Cualquier venta se captura en el asistente de nueva factura en cuatro pasos y se sella ante el SAT igual que las demás.",
  },
  {
    q: "¿Cómo sé qué clave del SAT le corresponde a mi producto?",
    a: "El catálogo del SAT tiene 52,513 claves de producto. T1 sugiere la que corresponde a cada producto con inteligencia artificial y tú la aceptas. Nunca se asigna sola y siempre la puedes cambiar.",
  },
  {
    q: "¿Puedo cancelar o corregir una factura?",
    a: "Sí. Una factura se puede cancelar o sustituir, con el motivo que pide el SAT y aviso al cliente. Las devoluciones y descuentos sobre una venta ya facturada se resuelven con una nota de crédito.",
  },
  {
    q: "¿Emite recibos de pago para ventas a crédito?",
    a: "Sí. Cuando una venta se factura a crédito, cada pago que recibes genera su recibo de pago, ligado a la factura original.",
  },
  {
    q: "¿Mis facturas son válidas ante el SAT?",
    a: "Sí. Cada factura se sella y se registra ante el SAT a través de un proveedor autorizado; a eso se le llama timbrar. No hay mensaje de éxito sin una factura real detrás.",
  },
  {
    q: "¿Dónde se guardan mis facturas y mi sello digital?",
    a: "Las facturas quedan en la cuenta de tu negocio, con su archivo XML, el que necesita el contador, y su PDF, para descargarlas cuando haga falta. El sello digital se guarda cifrado; nadie del equipo de T1 puede leerlo y cada uso deja registro.",
  },
  {
    q: "¿Puede entrar mi contador?",
    a: "En esta primera versión el contador no entra a la plataforma. Tú descargas los XML y los PDF del mes y se los mandas. El acceso directo para el contador llega en una versión siguiente.",
  },
  {
    q: "¿Qué pasa si vendo en la frontera o vendo dulces, botanas o alcohol?",
    a: "Está cubierto. El IVA de 8 por ciento de la frontera y el impuesto especial de esos productos se calculan al centavo y van donde el SAT los pide: dentro del precio en la factura individual y aparte en la global.",
  },
  {
    q: "¿Puedo facturar si le vendo a empresas con retenciones?",
    a: "Todavía no en la primera versión. Cuando una venta causa retención de IVA o de ISR (el impuesto sobre la renta), el asistente lo avisa y no la emite, para no sacar una factura incompleta. Esa capacidad se activa en cuanto pase la prueba completa.",
  },
  {
    q: "¿Qué negocios no puede facturar T1 Finanzas?",
    a: "Tabaco, combustibles, autos y motos nuevos, casas de apuestas, partidos políticos y donatarias, por sus reglas fiscales especiales. Tampoco emite nómina ni carta porte, que son otros productos. Se avisa desde el alta, no a la mitad del camino.",
  },
  {
    q: "¿Puedo tener varios negocios?",
    a: "Sí. Una cuenta gratis puede tener hasta tres negocios, cada uno con su RFC, su sello y sus 25 facturas gratis al mes. A partir del cuarto, cada negocio lleva su propia suscripción.",
  },
  {
    q: "Ya vendo en Mercado Libre y Mercado Libre me factura gratis. ¿Para qué quiero T1 Finanzas?",
    a: "El facturador de Mercado Libre emite una factura por cada venta y solo de Mercado Libre. T1 Finanzas junta todos tus canales, arma la factura global consolidada de cada uno, y además emite notas de crédito, cancelaciones y recibos de pago, que el facturador de Mercado Libre no documenta. Y no pide la firma electrónica para activarse.",
  },
  {
    q: "¿Puedo facturar ventas de meses anteriores?",
    a: "Sí, dentro del año fiscal en curso. Conviene revisarlo con tu contador antes de hacerlo.",
  },
  {
    q: "¿T1 Finanzas hace mi contabilidad o mis declaraciones?",
    a: "No. T1 Finanzas emite y guarda las facturas de tu negocio. La contabilidad y las declaraciones siguen siendo trabajo de tu contador, y tú le pasas los archivos del mes ya listos.",
  },
  {
    q: "Ya uso T1 Tienda. ¿Tengo que instalar algo?",
    a: "No. Los pedidos y los canales que ya tiene tu tienda aparecen en T1 Finanzas. Solo hay que dar de alta el RFC y subir el sello digital.",
  },
  {
    q: "¿Y si no uso T1 Tienda?",
    a: "Puedes usar T1 Finanzas solo: creas la cuenta gratis, subes tu sello y facturas cualquier venta desde el asistente. Los canales los conectas cuando quieras.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button type="button" onClick={() => setOpen((o) => !o)} className="w-full border-b border-white/10 py-5 text-left">
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
        <div className="border-t border-white/10">
          {FAQS.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
