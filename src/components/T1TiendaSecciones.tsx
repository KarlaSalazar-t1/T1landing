"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import T1TiendaCobraCard from "@/components/T1TiendaCobraCard";

/* ══════════ 1 · Tu tienda con pagos y envíos integrados ══════════ */
export function T1TiendaIncluido() {
  return (
    <section className="bg-[#0e0d0d] px-5 py-[80px] tablet:px-6 tablet:py-[110px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="text-center">
          <h2 className="font-sora text-[28px] font-light text-white tablet:whitespace-nowrap tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            Tu tienda, con pagos y envíos integrados
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] font-inter text-[16px] font-light text-white/60 tablet:text-[18px]">
            No necesitas integrar nada extra. Vende, cobra y envía desde el día uno, todo en un solo lugar.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-[900px] grid-cols-1 gap-4 tablet:mt-14 tablet:grid-cols-2">
          {[
            {
              title: "T1 Pagos",
              logo: "/img/t1pagos-white.svg",
              desc: "Acepta tarjetas, SPEI, Kueski y meses sin intereses con una pasarela de pago pensada para convertir.",
              href: "/productos/t1pagos",
              type: "card" as const,
              icons: ["/img/icons/visa-card.svg", "/img/icons/mc-card.svg", "/img/icons/amex-card.svg", "/img/icons/spei-card.svg", "/img/icons/kueski-card.svg"],
            },
            {
              title: "T1 Envíos",
              logo: "/img/t1envios-white.svg",
              desc: "Genera guías con +10 paqueterías a precio competitivo y rastrea todos tus pedidos en un solo lugar.",
              href: "/productos/t1envios",
              type: "circle" as const,
              icons: ["/img/circles/dhl.svg", "/img/circles/fedex.svg", "/img/circles/ups.svg", "/img/circles/ampm.svg", "/img/circles/99.svg"],
              plus: "+5",
            },
          ].map((it) => (
            <a key={it.title} href={it.href} className="group flex flex-col rounded-[18px] border border-white/[0.08] bg-[#1A1A1D] p-7 no-underline transition-colors hover:border-white/20">
              <Image src={it.logo} alt={it.title} width={160} height={36} className="h-[30px] w-auto object-contain" style={{ objectPosition: "left" }} />
              <p className="mt-2.5 font-inter text-[15px] font-light leading-relaxed text-white/60 tablet:text-[16px]">{it.desc}</p>
              <div className="mt-auto flex items-center gap-3 pt-6">
                {it.type === "card"
                  ? it.icons.map((src) => (
                      <Image key={src} src={src} alt="" width={80} height={52} className="h-[30px] w-auto shrink-0 object-contain" />
                    ))
                  : it.icons.map((src) => (
                      <span key={src} className="flex h-[32px] w-[32px] shrink-0 items-center justify-center overflow-hidden rounded-full">
                        <Image src={src} alt="" width={64} height={64} className="h-full w-full object-cover" style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.4))" }} />
                      </span>
                    ))}
                {it.plus && (
                  <span className="flex h-[32px] shrink-0 items-center rounded-full border border-white/20 px-2.5 font-inter text-[12px] font-semibold text-white/70">{it.plus}</span>
                )}
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 font-inter text-[14px] font-medium text-white/80 group-hover:text-white">
                Conoce más
                <svg width="15" height="15" viewBox="0 0 18 18" fill="none" className="transition-transform group-hover:translate-x-0.5"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════ 2 · Marketplaces — "Con T1, olvídate de todo esto" ══════════ */
const MP_LOGOS = [
  { src: "/img/logos/brands/mercadolibre.webp", alt: "Mercado Libre" },
  { src: "/img/logos/brands/amazon.webp", alt: "Amazon" },
  { src: "/img/logos/brands/tiktokshop.webp", alt: "TikTok Shop" },
  { src: "/img/logos/brands/shein.webp", alt: "Shein" },
  { src: "/img/logos/brands/walmart.webp", alt: "Walmart" },
  { src: "/img/logos/brands/sears.webp", alt: "Sears" },
  { src: "/img/logos/brands/sanborns.webp", alt: "Sanborns" },
];
/* posiciones flotantes (desktop) — una por cada logo */
const MP_FLOAT = [
  { l: "9%", t: "20%", s: 60, r: -8 },
  { l: "24%", t: "72%", s: 52, r: 7 },
  { l: "85%", t: "20%", s: 62, r: 9 },
  { l: "91%", t: "66%", s: 50, r: -6 },
  { l: "15%", t: "46%", s: 46, r: 4 },
  { l: "80%", t: "46%", s: 48, r: -5 },
  { l: "50%", t: "6%", s: 46, r: 6 },
];
export function T1TiendaMarketplaces() {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-[90px] tablet:px-6 tablet:py-[130px]">
      {/* logos flotantes dispersos — solo desktop */}
      {MP_FLOAT.map((f, i) => {
        const logo = MP_LOGOS[i % MP_LOGOS.length];
        return (
          <div key={i} aria-hidden className="pointer-events-none absolute hidden -translate-x-1/2 -translate-y-1/2 tablet:block" style={{ left: f.l, top: f.t }}>
            <Image src={logo.src} alt="" width={110} height={110} className="object-contain opacity-90" style={{ width: f.s, height: f.s, transform: `rotate(${f.r}deg)` }} sizes="70px" />
          </div>
        );
      })}

      <div className="relative mx-auto max-w-[620px] text-center">
        {/* móvil — logos arriba (dispersos, no atrás del texto) */}
        <div className="mb-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 tablet:hidden">
          {MP_LOGOS.slice(0, 4).map((l, i) => (
            <Image key={l.alt} src={l.src} alt={l.alt} width={80} height={80} className="h-9 w-auto object-contain opacity-85" style={{ transform: `rotate(${i % 2 ? 5 : -5}deg)` }} />
          ))}
        </div>
        <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
          Un solo panel para todos tus marketplaces
        </h2>
        <p className="mx-auto font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 28, maxWidth: 500 }}>
          Conecta los marketplaces donde ya vendes y gestiona catálogo, inventario y pedidos sin duplicar trabajo.
        </p>
        <a href="/productos/t1tienda/marketplaces" className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-8 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]">
          Conecta tus canales
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
        {/* móvil — logos abajo (dispersos, no atrás del texto) */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 tablet:hidden">
          {MP_LOGOS.slice(4).map((l, i) => (
            <Image key={l.alt} src={l.src} alt={l.alt} width={80} height={80} className="h-9 w-auto object-contain opacity-85" style={{ transform: `rotate(${i % 2 ? -6 : 6}deg)` }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════ 3 · Administración — carrusel (catálogo, inventario, reportes) ══════════ */
const ADMIN_CARDS = [
  { title: "Catálogo con IA", desc: "Sube una foto y la IA crea título, descripción y atributos al instante.", img: "/img/admin-catalogo.png", w: 1248, h: 1024 },
  { title: "Inventario", desc: "Precios, variantes y existencias sincronizadas en todos tus canales.", img: "/img/tienda-inventario.png", w: 1254, h: 1254 },
  { title: "Reportes", desc: "Ventas, tráfico y rendimiento en tiempo real para decidir con datos.", img: "/img/tienda-reportes.png", w: 1254, h: 1254 },
  { title: "Clientes", desc: "Historial de compras y segmentación de clientes para vender más.", img: "/img/tienda-clientes.png", w: 1254, h: 1254 },
  { title: "Sucursales", desc: "Inventario y ventas por ubicación en cada sucursal o almacén.", img: "/img/tienda-sucursales.png", w: 1536, h: 1024 },
];
export function T1TiendaAdministracion() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-card]");
    const step = first ? first.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  return (
    <section className="overflow-hidden bg-[#0e0d0d] px-5 py-[90px] tablet:px-6 tablet:py-[128px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="grid grid-cols-1 gap-10 tablet:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)] tablet:items-center tablet:gap-14">
          <div>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 16, maxWidth: 420 }}>
              Administra todo desde un solo lugar
            </h2>
            <p className="font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, marginBottom: 28, maxWidth: 400 }}>
              Catálogo, inventario y reportes centralizados. Cambia una vez y se sincroniza en todos tus canales.
            </p>
            <a href="/productos/t1tienda/productos" className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]">
              Conoce más
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
          <div className="flex flex-col gap-5">
            <div ref={ref} className="-mr-5 flex gap-5 overflow-x-auto pb-2 pr-5 tablet:mr-0 tablet:pr-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {ADMIN_CARDS.map((s) => (
                <div key={s.title} data-card className="flex w-[240px] shrink-0 snap-start flex-col rounded-[20px] border border-white/[0.08] bg-[#1A1A1D] p-5">
                  <h3 className="font-sora text-[19px] font-normal text-white" style={{ marginBottom: 8 }}>{s.title}</h3>
                  <p className="font-inter text-[14px] font-light text-white/55" style={{ lineHeight: 1.5, marginBottom: 18, minHeight: 42 }}>{s.desc}</p>
                  <div className="mt-auto flex h-[188px] items-center justify-center overflow-hidden rounded-[14px]">
                    <Image src={s.img} alt={s.title} width={s.w} height={s.h} className="h-full w-full object-contain" sizes="240px" />
                  </div>
                </div>
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

/* ══════════ 4 · Pagos — cobra como quieras ══════════ */
export function T1TiendaPagos() {
  return (
    <section className="overflow-hidden bg-black px-5 py-[90px] tablet:px-6 tablet:py-[128px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)] tablet:gap-14">
          <div className="order-2 flex justify-center tablet:order-1 tablet:justify-start">
            <T1TiendaCobraCard />
          </div>
          <div className="order-1 tablet:order-2">
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 16 }}>
              Cobra como tus clientes prefieran
            </h2>
            <p className="font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, marginBottom: 24, maxWidth: 440 }}>
              Una pasarela de pago pensada para convertir, con todos los métodos de pago y meses sin intereses.
            </p>
            <ul className="mb-8 flex flex-col gap-3">
              {["Tarjetas, SPEI y Kueski", "Meses sin intereses", "Links de pago para vender por WhatsApp", "Antifraude con T1 Score"].map((it) => (
                <li key={it} className="flex items-start gap-3 font-inter text-[15px] text-white/75 tablet:text-[16px]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {it}
                </li>
              ))}
            </ul>
            <a href="/productos/t1tienda/pasarela" className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]">
              Conoce la pasarela
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════ 5 · FAQ ══════════ */
const FAQS = [
  { q: "¿Necesito saber de diseño o programación?", a: "No. La IA crea tu tienda completa y el editor visual te permite ajustar todo sin código." },
  { q: "¿Cuánto tarda en estar lista mi tienda?", a: "En menos de 1 minuto tienes una tienda base lista para vender; personalizarla toma solo unos minutos." },
  { q: "¿Puedo vender en marketplaces desde T1?", a: "Sí. Conectas Mercado Libre, Amazon, TikTok Shop y más, y gestionas todo desde un solo panel." },
  { q: "¿Los pagos y envíos están incluidos?", a: "Sí. Tu tienda ya viene integrada con T1 Pagos (tarjetas, SPEI, MSI) y T1 Envíos (+10 paqueterías)." },
  { q: "¿Tiene costo crear mi tienda?", a: "Puedes empezar gratis y crear tu tienda sin tarjeta. Escalas a planes de pago cuando lo necesites." },
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
export function T1TiendaFAQ() {
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
