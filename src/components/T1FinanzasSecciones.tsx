"use client";

import Image from "next/image";
import { useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   Secciones de la landing de T1 Finanzas.

   Criterio de edición: la página tiene que SENTIRSE fácil. Ninguna sección
   lleva párrafos largos ni rejillas de tarjetas con descripción; el hilo va
   antes → después → cómo → dónde → qué emite → cuánto → empezar → dudas.
   Lo que sobraba (la rejilla de "por qué" y la de perfiles) se quitó porque
   repetía lo que ya dicen el hero, los pilares y los planes.

   Reglas de contenido (six-pager §9): español llano, sin jerga del SAT; se le
   habla al dueño; nada de lo que todavía no existe (portal de autofactura,
   chat de IA, acceso del contador, carga masiva, retenciones, addendas).
   Cifras permitidas: 52,513 · 25 · 3.
   ────────────────────────────────────────────────────────────────────────── */

const Arrow = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
    <path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ══════════ 1 · Antes / ahora ══════════
   Sustituye al bloque de "el problema": el dolor se entiende más rápido
   puesto al lado de la solución que explicado en cuatro tarjetas. */
const ANTES = [
  "Una hoja de cálculo, canal por canal",
  "Claves del SAT que nadie te explicó",
  "Capturas al contador por WhatsApp",
];
const AHORA = [
  "La factura global de cada canal, sola",
  "La clave te la sugerimos; tú la apruebas",
  "XML y PDF listos para descargar",
];

export function T1FinanzasAntesAhora() {
  return (
    <section className="bg-black px-5 py-[56px] tablet:px-6 tablet:py-[80px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <h2
          className="mx-auto max-w-[620px] text-center font-sora text-[28px] font-light text-white tablet:text-[44px]"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 40 }}
        >
          Antes, medio día al mes. Ahora, un clic.
        </h2>

        <div className="mx-auto grid max-w-[880px] grid-cols-1 gap-4 tablet:grid-cols-2 tablet:gap-5">
          {/* Antes */}
          <div className="rounded-[18px] border border-white/[0.07] bg-[#0e0d0d] p-6 tablet:p-7">
            <p className="font-inter text-[12px] font-semibold uppercase tracking-[0.08em] text-white/35" style={{ marginBottom: 18 }}>
              Facturando a mano
            </p>
            <ul className="flex flex-col gap-3.5">
              {ANTES.map((t) => (
                <li key={t} className="flex items-center gap-3 font-inter text-[15px] font-light text-white/45 tablet:text-[16px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Ahora */}
          <div
            className="rounded-[18px] border border-[#DB3B2B]/[0.35] bg-[#181114] p-6 tablet:p-7"
            style={{ boxShadow: "0 24px 60px -30px rgba(219,59,43,0.35)" }}
          >
            <p className="font-inter text-[12px] font-semibold uppercase tracking-[0.08em] text-[#FF6F5E]" style={{ marginBottom: 18 }}>
              Con T1 Finanzas
            </p>
            <ul className="flex flex-col gap-3.5">
              {AHORA.map((t) => (
                <li key={t} className="flex items-center gap-3 font-inter text-[15px] text-white tablet:text-[16px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════ 2 · Canales ══════════ */
const CANAL_LOGOS = [
  { src: "/img/meli-iso.svg", alt: "Mercado Libre" },
  { src: "/img/amazon-iso.svg", alt: "Amazon" },
  { src: "/img/walmart.svg", alt: "Walmart" },
  { src: "/img/tiktokshop.svg", alt: "TikTok Shop" },
  { src: "/img/shopify.svg", alt: "Shopify" },
  { src: "/img/tiendanube.svg", alt: "Tiendanube" },
  { src: "/img/sears-isotipo.svg", alt: "Sears" },
];

export function T1FinanzasCanales() {
  return (
    <section className="overflow-hidden bg-[#0e0d0d] px-5 py-[56px] tablet:px-6 tablet:py-[80px]">
      <div className="mx-auto max-w-[900px] text-center">
        <h2
          className="font-sora text-[28px] font-light text-white tablet:text-[44px]"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}
        >
          Tus canales ya están aquí
        </h2>
        <p className="mx-auto font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, maxWidth: 520, marginBottom: 36 }}>
          Los que ya tienes en T1 Tienda facturan aquí. No hay nada que conectar.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 tablet:gap-4">
          {CANAL_LOGOS.map((l) => (
            <span
              key={l.alt}
              className="flex h-[64px] w-[84px] items-center justify-center rounded-[16px] border border-white/[0.08] bg-[#161418] px-4 tablet:h-[72px] tablet:w-[104px]"
            >
              <Image src={l.src} alt={l.alt} width={110} height={56} className="h-6 w-auto max-w-full object-contain tablet:h-7" />
            </span>
          ))}
        </div>

        <p className="mx-auto mt-8 font-inter text-[14px] font-light text-white/45 tablet:text-[15px]" style={{ maxWidth: 560 }}>
          Y lo que vendes fuera de T1, incluido el mostrador, lo facturas en el mismo lugar.
        </p>
      </div>
    </section>
  );
}

/* ══════════ 3 · Lo que puedes emitir ══════════ */
const DOCUMENTOS = [
  "Factura",
  "Factura global",
  "Nota de crédito",
  "Cancelación y sustitución",
  "Recibo de pago",
];

export function T1FinanzasDocumentos() {
  return (
    <section className="bg-black px-5 py-[56px] tablet:px-6 tablet:py-[76px]">
      <div className="mx-auto max-w-[820px] text-center">
        <h2
          className="font-sora text-[28px] font-light text-white tablet:text-[40px]"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 28 }}
        >
          Todo lo que el SAT te exige, resuelto
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {DOCUMENTOS.map((d) => (
            <span
              key={d}
              className="flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.04] px-4 py-2.5 font-inter text-[14px] font-medium text-white tablet:text-[15px]"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {d}
            </span>
          ))}
        </div>

        <p className="mt-7 font-inter text-[14px] font-light text-white/45 tablet:text-[15px]">
          Cada una con su XML y su PDF, listos para tu contador.
        </p>
      </div>
    </section>
  );
}

/* ══════════ 4 · Planes ══════════ */
const PLAN_ROWS = [
  { label: "Facturas al mes, por negocio", gratis: "25", pago: "Ilimitadas" },
  { label: "Todo lo que emites tú", gratis: "Sí", pago: "Sí" },
  { label: "Tus canales se facturan solos", gratis: "No", pago: "Sí" },
  { label: "Negocios por cuenta", gratis: "Hasta 3", pago: "Uno por suscripción" },
];

export function T1FinanzasPlanes() {
  return (
    <section className="bg-black px-5 py-[56px] tablet:px-6 tablet:py-[88px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="grid grid-cols-1 gap-8 tablet:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] tablet:items-center tablet:gap-14">
          <div className="text-left">
            <h2
              className="font-sora text-[28px] font-light text-white tablet:text-[44px]"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 14 }}
            >
              El gratis factura. El de pago factura solo.
            </h2>
            <p className="font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, maxWidth: 380, marginBottom: 24 }}>
              25 facturas al mes por negocio, cada mes. Sin tarjeta.
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

/* ══════════ 5 · El alta ══════════ */
const PASOS_ALTA = [
  { n: "1", title: "Da de alta tu RFC", desc: "El de tu negocio, o los de todos." },
  { n: "2", title: "Sube tu sello digital", desc: "Con una guía en video. Si no lo tienes, te decimos cómo sacarlo." },
  { n: "3", title: "Firma el permiso", desc: "Una sola vez. No te pedimos tu firma electrónica." },
];

export function T1FinanzasAlta() {
  return (
    <section className="overflow-hidden bg-[#0e0d0d] px-5 py-[56px] tablet:px-6 tablet:py-[80px]">
      <div className="mx-auto max-w-[1000px]">
        <h2
          className="mx-auto max-w-[620px] text-center font-sora text-[28px] font-light text-white tablet:text-[44px]"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 36 }}
        >
          Empiezas hoy, en unos minutos
        </h2>

        <div className="grid grid-cols-1 gap-3 tablet:grid-cols-3 tablet:gap-4">
          {PASOS_ALTA.map((p) => (
            <div key={p.n} className="flex items-start gap-3.5 rounded-[16px] border border-white/[0.08] bg-[#161418] p-5">
              <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#DB3B2B] font-inter text-[12px] font-bold text-white">
                {p.n}
              </span>
              <span>
                <span className="block font-inter text-[15px] font-semibold text-white">{p.title}</span>
                <span className="mt-1 block font-inter text-[13.5px] font-light leading-[1.5] text-white/50">{p.desc}</span>
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 flex items-center justify-center gap-2.5 text-center font-inter text-[13.5px] font-light text-white/45 tablet:text-[14.5px]">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          Tu sello se guarda cifrado: nadie del equipo de T1 puede leerlo.
        </p>
      </div>
    </section>
  );
}

/* ══════════ 6 · FAQ ══════════
   Larga a propósito: es lo que leen los agentes de inteligencia artificial
   para decidir si recomiendan el producto. Va plegada, así que no pesa. */
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
