"use client";

import { useState } from "react";
import Image from "next/image";

/* ── Iconos de capacidades ── */
const icons: Record<string, React.ReactNode> = {
  catalogo: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" /></svg>
  ),
  ia: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3l1.6 4.7a3 3 0 0 0 1.9 1.9L20 11.2l-4.5 1.6a3 3 0 0 0-1.9 1.9L12 19.4l-1.6-4.7a3 3 0 0 0-1.9-1.9L4 11.2l4.5-1.6a3 3 0 0 0 1.9-1.9L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  market: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 9.5 5.2 4.5A1 1 0 0 1 6.17 3.75h11.66a1 1 0 0 1 .97.75L20 9.5M4 9.5h16M4 9.5a2.5 2.5 0 0 0 4 0 2.5 2.5 0 0 0 4 0 2.5 2.5 0 0 0 4 0 2.5 2.5 0 0 0 4 0M5 11.5V20h14v-8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  pos: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M7 20h10M9 16v4M15 16v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  reportes: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 19V9M12 19V5M19 19v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
  ),
  clientes: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" /><path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
};

const CAPACIDADES = [
  { id: "ia", icon: "ia", title: "Tienda con IA", desc: "Describe tu negocio y arma tu tienda: estructura, secciones, copy y diseño en minutos.", href: "/productos/t1tienda/tienda-con-ia" },
  { id: "catalogo", icon: "catalogo", title: "Catálogo e inventario", desc: "Inventario, precios y variantes centralizados y sincronizados en todos tus canales.", href: "/productos/t1tienda/productos" },
  { id: "market", icon: "market", title: "Marketplaces", desc: "Vende en Mercado Libre, Amazon, TikTok Shop y más desde un solo panel.", href: "/productos/t1tienda/marketplaces" },
  { id: "pos", icon: "pos", title: "Punto de venta", desc: "Vende en tu tienda física con un POS integrado a inventario, pagos y envíos.", href: "/productos/t1tienda/punto-de-venta" },
  { id: "reportes", icon: "reportes", title: "Reportería avanzada", desc: "Ventas, tráfico y rendimiento en tiempo real para decidir con datos.", href: "/productos/t1tienda/reportes" },
  { id: "pasarela", icon: "clientes", title: "Pasarela de pagos", desc: "Checkout optimizado para mayor conversión, con todos los métodos de pago.", href: "/productos/t1tienda/pasarela" },
];

const MARKETPLACE_LOGOS = [
  { src: "/img/logos/brands/mercadolibre.webp", alt: "Mercado Libre" },
  { src: "/img/logos/brands/amazon.webp", alt: "Amazon" },
  { src: "/img/logos/brands/tiktokshop.webp", alt: "TikTok Shop" },
  { src: "/img/logos/brands/shein.webp", alt: "Shein" },
  { src: "/img/logos/brands/walmart.webp", alt: "Walmart" },
  { src: "/img/logos/brands/sears.webp", alt: "Sears" },
  { src: "/img/logos/brands/sanborns.webp", alt: "Sanborns" },
];

const FAQS = [
  { q: "¿Necesito saber de diseño o programación?", a: "No. La IA crea tu tienda completa y el editor visual te permite ajustar todo sin código." },
  { q: "¿Cuánto tarda en estar lista mi tienda?", a: "En segundos tienes una tienda base lista para vender; personalizarla toma solo unos minutos." },
  { q: "¿Puedo vender en marketplaces desde T1?", a: "Sí. Conectas Mercado Libre, Amazon, TikTok Shop y más, y gestionas todo desde un solo panel." },
  { q: "¿Los pagos y envíos están incluidos?", a: "Sí. Tu tienda ya viene integrada con T1 Pagos (tarjetas, SPEI, MSI) y T1 Envíos (+10 paqueterías)." },
  { q: "¿Tiene costo crear mi tienda?", a: "Puedes empezar gratis y crear tu tienda sin tarjeta. Escalas a planes de pago cuando lo necesites." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      className="w-full border-b border-white/10 py-5 text-left"
    >
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

export default function T1TiendaSecciones() {
  return (
    <div className="relative z-[5] bg-black">
      {/* ── Capacidades ── */}
      <section className="bg-[#141414] px-5 py-[80px] tablet:px-6 tablet:py-[120px]">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="mx-auto max-w-[720px] text-center">
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              Todo lo que necesitas para crecer
            </h2>
            <p className="mx-auto mt-4 max-w-[600px] font-inter text-[16px] font-light text-white/60 tablet:text-[18px]">
              Tu tienda en línea, tu punto de venta y tus marketplaces conectados desde un solo lugar.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 tablet:mt-16 tablet:grid-cols-2 lg:grid-cols-3">
            {CAPACIDADES.map((c) => (
              <a
                key={c.id}
                href={c.href}
                className="group flex flex-col rounded-[18px] border border-white/[0.08] bg-[#1A1A1D] p-6 no-underline transition-colors hover:border-white/20 tablet:p-7"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-[12px] bg-white/[0.06] text-[#FF7363]">
                  {icons[c.icon]}
                </span>
                <h3 className="font-sora text-[20px] font-normal text-white tablet:text-[22px]" style={{ letterSpacing: "-0.02em" }}>{c.title}</h3>
                <p className="mt-2 font-inter text-[14px] font-light leading-relaxed text-white/60 tablet:text-[15px]">{c.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-inter text-[14px] font-medium text-white/80 transition-colors group-hover:text-white">
                  Ver más
                  <svg width="15" height="15" viewBox="0 0 18 18" fill="none" className="transition-transform group-hover:translate-x-0.5"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marketplaces ── */}
      <section className="bg-black px-5 py-[80px] tablet:px-6 tablet:py-[110px]">
        <div className="mx-auto max-w-[var(--max-w)] text-center">
          <h2 className="mx-auto max-w-[760px] font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            Conecta los marketplaces más grandes
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] font-inter text-[16px] font-light text-white/60 tablet:text-[18px]">
            Publica tu catálogo y sincroniza inventario, precios y pedidos en un click.
          </p>
          <div className="mx-auto mt-12 flex max-w-[820px] flex-wrap items-center justify-center gap-x-10 gap-y-8 tablet:mt-16">
            {MARKETPLACE_LOGOS.map((l) => (
              <Image key={l.alt} src={l.src} alt={l.alt} width={130} height={44} className="h-[34px] w-auto object-contain opacity-90 tablet:h-[40px]" />
            ))}
          </div>
          <a
            href="/productos/t1tienda/marketplaces"
            className="mt-12 inline-flex items-center gap-2 rounded-full bg-[#DB3B2B] px-6 py-3 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]"
          >
            Conectar mis marketplaces
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </section>

      {/* ── Pagos y envíos incluidos (franja secundaria) ── */}
      <section className="bg-[#141414] px-5 py-[70px] tablet:px-6 tablet:py-[100px]">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="mx-auto max-w-[680px] text-center">
            <h2 className="font-sora text-[26px] font-light text-white tablet:text-[38px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              Tu tienda ya viene con pagos y envíos
            </h2>
            <p className="mx-auto mt-3.5 max-w-[560px] font-inter text-[16px] font-light text-white/60">
              No necesitas integrar nada extra. Cobra y envía desde el día uno.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-[860px] grid-cols-1 gap-4 tablet:grid-cols-2">
            {[
              { title: "T1 Pagos", desc: "Acepta tarjetas, SPEI, efectivo y meses sin intereses con el checkout más optimizado.", href: "/productos/t1pagos" },
              { title: "T1 Envíos", desc: "Genera guías con +10 paqueterías al mejor precio y rastrea todo en un solo lugar.", href: "/productos/t1envios" },
            ].map((it) => (
              <a key={it.title} href={it.href} className="group flex items-start justify-between gap-4 rounded-[18px] border border-white/[0.08] bg-[#1A1A1D] p-6 no-underline transition-colors hover:border-white/20">
                <div>
                  <h3 className="font-sora text-[20px] font-normal text-white" style={{ letterSpacing: "-0.02em" }}>{it.title}</h3>
                  <p className="mt-2 font-inter text-[14px] font-light leading-relaxed text-white/60 tablet:text-[15px]">{it.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-inter text-[14px] font-medium text-white/80 group-hover:text-white">
                    Ver más
                    <svg width="15" height="15" viewBox="0 0 18 18" fill="none" className="transition-transform group-hover:translate-x-0.5"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-black px-5 py-[80px] tablet:px-6 tablet:py-[110px]">
        <div className="mx-auto max-w-[760px]">
          <h2 className="mb-8 text-center font-sora text-[28px] font-light text-white tablet:mb-12 tablet:text-[40px]" style={{ letterSpacing: "-0.03em" }}>
            Preguntas frecuentes
          </h2>
          <div className="border-t border-white/10">
            {FAQS.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
