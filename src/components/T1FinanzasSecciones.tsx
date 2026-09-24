"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";

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

/* ══════════ 1 · El problema ══════════
   Ni tabla comparativa ni tarjetas: una banda editorial. Las cuatro tareas de
   hoy van tachadas en rojo, en tipografía grande y una debajo de otra, y una
   sola línea cierra con lo que cambia. */
const TAREAS = [
  "Pasar tus ventas a Excel",
  "Buscar la clave de cada producto",
  "Juntar tickets para tu contador",
  "Cuadrar lo que ya facturaste",
];

export function T1FinanzasProblema() {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-[88px] tablet:px-6 tablet:py-[130px]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(ellipse at center, rgba(219,59,43,0.12) 0%, transparent 65%)", filter: "blur(55px)" }}
      />
      <div className="relative mx-auto flex max-w-[820px] flex-col items-center text-center">
        <h2
          className="font-sora text-[30px] font-light text-white tablet:text-[52px]"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.12, maxWidth: 680 }}
        >
          Hoy facturar te cuesta medio día al mes
        </h2>

        <ul className="mt-10 flex w-full max-w-[560px] flex-col tablet:mt-14">
          {TAREAS.map((t) => (
            <li
              key={t}
              className="border-b border-white/[0.07] py-4 font-sora text-[19px] font-light text-white/35 last:border-b-0 tablet:py-5 tablet:text-[26px]"
              style={{ textDecoration: "line-through", textDecorationColor: "rgba(219,59,43,0.85)", textDecorationThickness: 2 }}
            >
              {t}
            </li>
          ))}
        </ul>

        <p
          className="mt-11 font-sora text-[22px] font-light text-white tablet:mt-14 tablet:text-[32px]"
          style={{ letterSpacing: "-0.02em", lineHeight: 1.25, maxWidth: 620 }}
        >
          Con T1 Finanzas, nada de eso te toca a ti.
        </p>

        <a
          href={SIGNUP_URL}
          data-cta-text="Empieza a facturar gratis"
          data-cta-destination={SIGNUP_URL}
          data-cta-section="problema"
          className="mt-9 inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]"
        >
          Empieza a facturar gratis
          {Arrow}
        </a>
      </div>
    </section>
  );
}

/* ══════════ 2 · Los pedidos de T1 Tienda ══════════
   Los logos son SOLO los de las tiendas cuyos pedidos llegan a Finanzas el
   día que se publica. Shopify y Tiendanube están por confirmar, así que por
   ahora no se muestran. */
const CANAL_LOGOS = [
  { src: "/img/meli-iso.svg", alt: "Mercado Libre" },
  { src: "/img/amazon-iso.svg", alt: "Amazon" },
  { src: "/img/walmart.svg", alt: "Walmart" },
  { src: "/img/tiktokshop.svg", alt: "TikTok Shop" },
  { src: "/img/sears-isotipo.svg", alt: "Sears" },
];

export function T1FinanzasCanales() {
  return (
    <section className="overflow-hidden bg-[#0e0d0d] px-5 py-[56px] tablet:px-6 tablet:py-[80px]">
      <div className="mx-auto max-w-[900px] text-center">
        <h2
          className="mx-auto font-sora text-[28px] font-light text-white tablet:text-[42px]"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14, maxWidth: 820 }}
        >
          Si vendes con T1 Tienda, tus pedidos llegan solos
        </h2>
        <p className="mx-auto font-inter text-[15px] font-light text-white/60 tablet:whitespace-nowrap tablet:text-[17px]" style={{ lineHeight: 1.55, marginBottom: 36 }}>
          Mercado Libre, Amazon, Walmart, TikTok Shop y tu tienda en línea, sin conectar nada.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-6 tablet:gap-x-14">
          {CANAL_LOGOS.map((l) => (
            <Image
              key={l.alt}
              src={l.src}
              alt={l.alt}
              width={120}
              height={60}
              className="h-7 w-auto object-contain opacity-90 tablet:h-8"
            />
          ))}
        </div>

        <p className="mx-auto mt-8 font-inter text-[14px] font-light text-white/45 tablet:text-[15px]" style={{ maxWidth: 580 }}>
          ¿También vendes en mostrador o por WhatsApp? Esas ventas las facturas aquí mismo, en cuatro
          pasos.
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
    title: "Vendes en marketplaces",
    desc: "La factura global de Mercado Libre, Amazon o TikTok Shop, sin Excel. Con el plan Básico, la de cada uno se emite sola.",
    href: "/productos/t1finanzas#faq-global-marketplaces",
  },
  {
    title: "Tienes tienda en línea",
    desc: "Cada pedido, su factura en un clic, con los datos ya puestos. Los de tu cliente se guardan la primera vez que le facturas.",
    href: "/productos/t1finanzas#faq-ya-uso-t1-tienda",
  },
  {
    title: "Vendes en mostrador",
    desc: "Factura tus ventas sin pagar por un sistema para facturar: 25 facturas gratis cada mes, sin tarjeta.",
    href: "/productos/t1finanzas#faq-venta-fuera-de-t1",
  },
  {
    title: "Le vendes a empresas",
    desc: "Facturas a crédito, haces el recibo de cada pago que te hacen y resuelves devoluciones con una nota de crédito.",
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
              Sirve si vendes en línea, en mostrador o a empresas
            </h2>
            <p className="font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, marginBottom: 28, maxWidth: 380 }}>
              Elige cómo vendes tú y ve lo que T1 Finanzas hace por ti.
            </p>
            <a
              href={SIGNUP_URL}
              data-cta-text="Empieza a facturar gratis"
              data-cta-destination={SIGNUP_URL}
              data-cta-section="por_negocio"
              className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]"
            >
              Empieza a facturar gratis
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

/* ══════════ 4 · Lo que puedes emitir ══════════ */
const DOCUMENTOS = [
  { title: "Factura", desc: "Para la venta que un cliente te pide facturar, pagada al momento o a crédito." },
  { title: "Factura global", desc: "Junta en una sola factura las ventas de quienes no pidieron la suya, como te lo pide el SAT." },
  { title: "Nota de crédito", desc: "Para una devolución o un descuento sobre una venta que ya facturaste." },
  { title: "Cancelar o corregir", desc: "Para la factura que salió mal: la cancelas o la cambias por una nueva." },
  { title: "Recibo de pago", desc: "La factura de cada pago que te hacen en una venta a crédito. Es lo que tu contador llama complemento de pago." },
];

export function T1FinanzasDocumentos() {
  return (
    <section className="overflow-hidden bg-[#0e0d0d] px-5 py-[56px] tablet:px-6 tablet:py-[80px]">
      <div className="mx-auto max-w-[820px]">
        <div className="text-center" style={{ marginBottom: 32 }}>
          <h2
            className="font-sora text-[28px] font-light text-white tablet:text-[40px]"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}
          >
            Factura, cancela y corrige en un solo lugar
          </h2>
          <p className="mx-auto font-inter text-[15px] font-light text-white/60 tablet:whitespace-nowrap tablet:text-[17px]" style={{ lineHeight: 1.55 }}>
            Cada una se guarda con su PDF y su XML, el archivo que te pide tu contador.
          </p>
        </div>

        <ul className="mx-auto flex max-w-[720px] flex-col">
          {DOCUMENTOS.map((d) => (
            <li
              key={d.title}
              className="flex items-start gap-3.5 border-b border-white/[0.07] py-4 last:border-b-0 tablet:items-center tablet:gap-4"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="mt-[3px] shrink-0 tablet:mt-0">
                <path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-inter text-[14.5px] font-light leading-[1.55] text-white/55 tablet:text-[15.5px]">
                <span className="font-medium text-white">{d.title}.</span> {d.desc}
              </p>
            </li>
          ))}
        </ul>
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
    <section className="bg-black px-5 py-[56px] tablet:px-6 tablet:py-[88px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="grid grid-cols-1 gap-8 tablet:grid-cols-2 tablet:items-center tablet:gap-16">
          <div className="text-left">
            <h2
              className="font-sora text-[28px] font-light text-white tablet:text-[44px]"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 14 }}
            >
              25 facturas gratis al mes, sin tarjeta
            </h2>
            <p className="font-inter text-[15px] font-light text-white/60 tablet:text-[17px]" style={{ lineHeight: 1.55, maxWidth: 420, marginBottom: 24 }}>
              Y hasta 3 negocios en la misma cuenta. Con los planes Básico y Avanzado facturas
              sin límite.
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
                <span className="text-center font-inter text-[13px] font-semibold text-white">Gratis</span>
                <span className="text-center font-inter text-[13px] font-semibold text-[#FF6F5E]">Básico y Avanzado</span>
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
              Las 25 gratis cuentan cada documento que emites.
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
    a: "El RFC de tu negocio y su sello digital, que son los archivos que el SAT te da para firmar tus facturas. Si ya lo tienes, lo subes en unos minutos con una guía en video; si no, te damos la guía paso a paso para tramitarlo. También firmas una vez el permiso que el SAT pide para que un sistema emita facturas a tu nombre. No te pedimos tu firma electrónica (e.firma).",
  },
  {
    q: "¿Qué es el sello digital y cómo lo saco?",
    a: "Son dos archivos, uno .cer y uno .key, con una contraseña, que el SAT le da a cada negocio para firmar sus facturas. También se le conoce como CSD (certificado de sello digital). Si ya facturas con algún sistema distinto al portal del SAT, casi seguro ya lo tienes. Si no, se tramita en línea en el sitio del SAT con tu e.firma, y en T1 te damos la guía paso a paso.",
  },
  {
    q: "Ya uso T1 Tienda. ¿Tengo que instalar algo?",
    id: "ya-uso-t1-tienda",
    a: "No. Los pedidos de las tiendas y marketplaces que ya vendes con T1 Tienda aparecen en T1 Finanzas. Solo hay que dar de alta el RFC y subir el sello digital.",
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
    a: "Empezar es gratis: 25 facturas al mes por negocio, cada mes, y hasta tres negocios en una cuenta. Cuentan todas las facturas, facturas globales, notas de crédito y recibos de pago que haces. Los planes Básico y Avanzado incluyen facturas sin límite y la factura global automática de tus tiendas y marketplaces. Los precios están en la sección de planes.",
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
    a: "No para hacer tus facturas. Te preguntamos en palabras simples a quién le vendiste, qué vendiste y cómo te pagaron, te sugerimos los datos que pide el SAT y tú revisas la factura antes de emitirla. Tus impuestos y tus declaraciones los sigue viendo tu contador.",
  },
  {
    q: "¿Cómo sé qué clave de producto del SAT le corresponde a lo que vendo?",
    a: "No tienes que buscarla. El catálogo del SAT tiene 52,513 claves de producto, y nuestro sistema inteligente te sugiere la que mejor le queda a cada cosa que vendes. Tú la apruebas. Nunca la ponemos sin preguntarte, y siempre la puedes cambiar.",
  },
  {
    q: "¿Puedo facturar una venta que hice fuera de T1?",
    id: "venta-fuera-de-t1",
    a: "Sí. Tus ventas de mostrador, WhatsApp o en persona las capturas en cuatro pasos y quedan registradas ante el SAT igual que las demás.",
  },
  {
    q: "¿Puedo cancelar o corregir una factura?",
    a: "Sí. Puedes cancelar una factura o cambiarla por una nueva, con el motivo que pide el SAT. Las devoluciones y los descuentos sobre una venta ya facturada se resuelven con una nota de crédito.",
  },
  {
    q: "¿Emite recibos de pago para ventas a crédito?",
    id: "recibos-de-pago",
    a: "Sí. Cuando te pagan una venta que facturaste a crédito, registras el pago y emites su recibo de pago, ligado a la factura original. Es lo que tu contador llama complemento de pago.",
  },
  {
    q: "¿Puedo facturar ventas de meses anteriores?",
    a: "Sí, dentro del año fiscal en curso. Conviene revisarlo con tu contador antes de hacerlo.",
  },
  {
    q: "¿Emite factura electrónica versión 4.0?",
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
    a: "Es una sola factura que junta las ventas de un periodo que nadie pidió facturar, por ejemplo las de tu mostrador o las de tu tienda en línea. El SAT te pide emitirla. En T1 se arma una por cada lugar donde vendes: tu tienda en línea, cada marketplace y tu mostrador. En el plan Gratis la emites tú con un botón; en el plan Básico se emite sola cada día o a fin de mes, como tú elijas.",
  },
  {
    q: "¿Se factura sola la global de mis ventas en Mercado Libre, Amazon o TikTok Shop?",
    id: "global-marketplaces",
    a: "Sí, con los planes Básico y Avanzado. Eliges si sale cada día o a fin de mes, o si la emites tú con un botón, y lo puedes cambiar cuando quieras. La factura que un cliente te pide la emites tú en un clic.",
  },
  {
    q: "Un cliente me pidió factura de una venta. ¿Qué pasa con la global?",
    a: "Si la global de ese periodo todavía no se emite, le haces su factura con sus datos y esa venta ya no entra en la global. Si la global ya se emitió, con un botón T1 saca esa venta de la global con una nota de crédito y hace la factura de tu cliente, sin cancelar nada. En ningún caso la venta se factura dos veces. En el segundo caso, la nota de crédito y la factura cuentan dentro de tus 25 facturas del plan Gratis.",
  },
  {
    q: "Ya vendo en Mercado Libre y Mercado Libre me factura. ¿Para qué quiero T1 Finanzas?",
    a: "Porque en T1 facturas en un solo lugar lo que vendes en Mercado Libre, Amazon, tu tienda en línea y tu mostrador, no solo lo de Mercado Libre. Cada uno tiene su factura global, y desde el mismo lugar emites notas de crédito, cancelaciones y recibos de pago. Si vendes en Mercado Libre y en algún otro lado, aquí dejas de facturar en varias partes.",
  },

  /* ── Seguridad y validez ── */
  {
    q: "¿Mis facturas son válidas ante el SAT?",
    grupo: "Seguridad y validez",
    a: "Sí. Cada factura se registra ante el SAT a través de un proveedor autorizado. A eso se le llama timbrar. Solo te decimos que tu factura está lista cuando ya tiene su timbre, el sello que la hace válida ante el SAT.",
  },
  {
    q: "¿Dónde se guardan mis facturas y mi sello digital?",
    a: "Tus facturas quedan en la cuenta de tu negocio, con su XML, el archivo que te pide tu contador, y su PDF, para descargarlas cuando las necesites. Tu sello se guarda protegido y nadie de T1 puede verlo.",
  },

  /* ── Lo que no hace ── */
  {
    q: "¿Puede entrar mi contador?",
    grupo: "Lo que no hace",
    a: "Por ahora tu contador no entra a la plataforma. Tú descargas los XML y los PDF del mes y se los mandas, y él los usa como siempre.",
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
    q: "¿Qué negocios no puede facturar T1 Finanzas?",
    a: "Tabaco, combustibles, autos y motos nuevos, casas de apuestas, partidos políticos y donatarias, por sus reglas fiscales especiales. Tampoco emite nómina ni carta porte, que son otros productos. Te lo decimos desde el alta, no a la mitad del camino.",
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
                  className="font-inter text-[12px] font-semibold uppercase tracking-[0.09em] text-[#FF6F5E]"
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
