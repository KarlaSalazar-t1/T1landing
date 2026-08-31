"use client";

import { useRef, useState } from "react";
import Image from "next/image";

/* ══════════ Conecta tus canales — marketplaces (logos alineados, compacto) ══════════ */
const CHANNELS = [
  { src: "/img/logos/brands/mercadolibre.webp", alt: "Mercado Libre" },
  { src: "/img/logos/brands/amazon.webp", alt: "Amazon" },
  { src: "/img/logos/brands/tiktokshop.webp", alt: "TikTok Shop" },
  { src: "/img/logos/brands/shein.webp", alt: "Shein" },
  { src: "/img/logos/brands/walmart.webp", alt: "Walmart" },
  { src: "/img/logos/brands/sears.webp", alt: "Sears" },
  { src: "/img/logos/brands/sanborns.webp", alt: "Sanborns" },
  { src: "/img/shopify.svg", alt: "Shopify" },
  { src: "/img/woocommerce.svg", alt: "WooCommerce" },
  { src: "/img/tiendanube.svg", alt: "Tiendanube" },
  { src: "/img/aliexpress.svg", alt: "AliExpress" },
];
/* posiciones flotantes (dispersas) — una por cada canal */
const CH_FLOAT = [
  { l: "7%", t: "13%", s: 46, r: -8 },
  { l: "24%", t: "7%", s: 42, r: 6 },
  { l: "43%", t: "10%", s: 40, r: -5 },
  { l: "60%", t: "7%", s: 42, r: 7 },
  { l: "77%", t: "11%", s: 44, r: -6 },
  { l: "93%", t: "16%", s: 42, r: 5 },
  { l: "12%", t: "87%", s: 42, r: 6 },
  { l: "32%", t: "93%", s: 40, r: -7 },
  { l: "52%", t: "89%", s: 44, r: 5 },
  { l: "71%", t: "93%", s: 40, r: -5 },
  { l: "89%", t: "85%", s: 46, r: 7 },
];
export function T1EnviosCanales() {
  return (
    <section className="relative overflow-hidden bg-[#0e0d0d] px-5 py-[80px] tablet:px-6 tablet:py-[110px]">
      {/* logos dispersos (desktop y responsive) */}
      {CH_FLOAT.map((f, i) => {
        const l = CHANNELS[i % CHANNELS.length];
        return (
          <div key={i} aria-hidden className="pointer-events-none absolute hidden -translate-x-1/2 -translate-y-1/2 tablet:block tablet:scale-100" style={{ left: f.l, top: f.t }}>
            <Image src={l.src} alt="" width={160} height={52} className="w-auto object-contain opacity-80" style={{ height: f.s, transform: `rotate(${f.r}deg)` }} sizes="130px" />
          </div>
        );
      })}
      <div className="relative z-[1] mx-auto flex min-h-[300px] max-w-[620px] flex-col items-center justify-center text-center tablet:min-h-[380px]">
        <h2 className="font-sora text-[28px] font-light text-white tablet:text-[40px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
          Conecta tus canales y genera guías más rápido
        </h2>
        <p className="mx-auto font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.6, maxWidth: 560 }}>
          Sincroniza pedidos, direcciones y estados de envío desde T1 Tienda, marketplaces y tiendas externas como Shopify, Mercado Libre, Amazon, SHEIN y más.
        </p>
        {/* Móvil: fila de logos (los flotantes se ocultan en móvil para no encimar el texto) */}
        <div className="mt-10 flex max-w-[320px] flex-wrap items-center justify-center gap-x-6 gap-y-4 tablet:hidden">
          {CHANNELS.slice(0, 6).map((l) => (
            <Image key={l.alt} src={l.src} alt={l.alt} width={120} height={40} className="w-auto object-contain opacity-85" style={{ height: 30 }} sizes="120px" />
          ))}
        </div>
        <a href="/login" className="mt-8 inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]">
          Conecta tus canales
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    </section>
  );
}

/* ══════════ 3 · Administra tu operación (carrusel) ══════════ */
const ADMIN_CARDS = [
  { title: "Reportes logísticos", desc: "Tiempos de entrega, costos y desempeño por paquetería en tiempo real.", img: "/img/envios-reportes.png", w: 1254, h: 1254, href: "/productos/t1envios/reportes" },
  { title: "Control de calidad", desc: "Detecta y gestiona incidencias antes que tu cliente, desde un solo panel.", img: "/img/envios-calidad.png", w: 1254, h: 1254, href: "/productos/t1envios/control-calidad" },
  { title: "Reglas de envío", desc: "Asigna automáticamente la paquetería ideal según reglas que tú defines.", img: "/img/envios-reglas.png", w: 1254, h: 1254, href: "/productos/t1envios/reglas" },
  { title: "Recolecciones", desc: "Programa que pasen por tus paquetes a tu puerta, sin ir a la sucursal.", img: "/img/envios-recolecciones.png", w: 1254, h: 1254, href: "/productos/t1envios/recolecciones" },
];
export function T1EnviosAdministracion() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-card]");
    const step = first ? first.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  return (
    <section className="overflow-hidden bg-black px-5 py-[90px] tablet:px-6 tablet:py-[128px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="grid grid-cols-1 gap-10 tablet:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)] tablet:items-center tablet:gap-14">
          <div>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 16, maxWidth: 420 }}>
              Controla tu operación desde un panel
            </h2>
            <p className="font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, marginBottom: 28, maxWidth: 400 }}>
              Reportes, reglas, recolecciones y control de calidad, todo en un mismo lugar.
            </p>
            <a href="/login" className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]">
              Comienza ahora
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
          <div className="flex flex-col gap-5">
            <div ref={ref} className="-mr-5 flex gap-5 overflow-x-auto pb-2 pr-5 tablet:mr-0 tablet:pr-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {ADMIN_CARDS.map((s) => (
                <a key={s.title} href={s.href} data-card className="group flex w-[270px] shrink-0 snap-start flex-col rounded-[20px] border border-white/[0.08] bg-[#1A1A1D] p-6 no-underline transition-colors hover:border-white/20">
                  <div className="flex items-center justify-between gap-2" style={{ marginBottom: 8 }}>
                    <h3 className="font-sora text-[19px] font-normal text-white">{s.title}</h3>
                    <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-white/15 text-white/55 transition-all duration-200 group-hover:translate-x-0.5 group-hover:border-white/40 group-hover:text-white">
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </div>
                  <p className="font-inter text-[14px] font-light text-white/55" style={{ lineHeight: 1.55, marginBottom: 20, minHeight: 63 }}>{s.desc}</p>
                  <div className="mt-auto flex h-[210px] items-center justify-center overflow-hidden rounded-[14px]">
                    <Image src={s.img} alt={s.title} width={s.w} height={s.h} className="h-full w-full object-contain" sizes="270px" />
                  </div>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => scrollBy(-1)} aria-label="Anterior" className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/55 transition-colors hover:border-white/30 hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button type="button" onClick={() => scrollBy(1)} aria-label="Siguiente" className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/55 transition-colors hover:border-white/30 hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════ 4 · FAQ ══════════ */
const FAQS = [
  { q: "¿Necesito una tienda para usar T1 Envíos?", a: "No. Puedes cotizar y crear guías aunque vendas por redes sociales, marketplaces o tu propia tienda." },
  { q: "¿Con qué paqueterías puedo enviar?", a: "Con +10 paqueterías: DHL, FedEx, UPS, Estafeta, 99 minutos, Paquete Express, J&T, AMPM y más." },
  { q: "¿Hay volumen mínimo de envíos?", a: "No. Accedes a tarifas preferenciales desde tu primer envío, sin mínimos ni contratos." },
  { q: "¿Cómo pago mis envíos?", a: "Con saldo prepagado que recargas con tarjeta o SPEI, con opción de recarga automática." },
  { q: "¿Puedo rastrear y gestionar incidencias?", a: "Sí. Rastreas todos tus paquetes en un solo lugar y gestionas incidencias antes que tu cliente." },
];
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button type="button" onClick={() => setOpen((o) => !o)} className="w-full border-b border-white/10 py-5 text-left">
      <div className="flex items-center justify-between gap-4">
        <span className="font-inter text-[16px] font-medium text-white tablet:text-[18px]">{q}</span>
        <span className={`shrink-0 text-white/50 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
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
export function T1EnviosFAQ() {
  return (
    <section className="bg-black px-5 py-[80px] tablet:px-6 tablet:py-[110px]">
      <div className="mx-auto max-w-[760px]">
        <h2 className="mb-8 text-center font-sora text-[28px] font-light text-white tablet:mb-12 tablet:text-[40px]" style={{ letterSpacing: "-0.03em" }}>
          Preguntas frecuentes
        </h2>
        <div className="border-t border-white/10">
          {FAQS.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  );
}
