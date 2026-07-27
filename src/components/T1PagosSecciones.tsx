"use client";

import { useRef, useState } from "react";
import Image from "next/image";

/* ══════════ 1 · Acepta todos los métodos de pago ══════════ */
const METODOS = [
  { src: "/img/logos/brands/visa.webp", alt: "Visa" },
  { src: "/img/logos/brands/mastercard.webp", alt: "Mastercard" },
  { src: "/img/logos/brands/amex.webp", alt: "American Express" },
  { src: "/img/logos/brands/carnet.webp", alt: "Carnet" },
  { src: "/img/logos/brands/spei.webp", alt: "SPEI" },
  { src: "/img/logos/brands/kueski.webp", alt: "Kueski Pay" },
];
const MET_FLOAT = [
  { l: "10%", t: "18%", s: 64, r: -8 },
  { l: "26%", t: "70%", s: 56, r: 7 },
  { l: "84%", t: "20%", s: 66, r: 9 },
  { l: "90%", t: "66%", s: 54, r: -6 },
  { l: "16%", t: "44%", s: 48, r: 4 },
  { l: "78%", t: "46%", s: 50, r: -5 },
];
export function T1PagosMetodos() {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-[90px] tablet:px-6 tablet:py-[130px]">
      {MET_FLOAT.map((f, i) => {
        const logo = METODOS[i % METODOS.length];
        return (
          <div key={i} aria-hidden className="pointer-events-none absolute hidden -translate-x-1/2 -translate-y-1/2 tablet:block" style={{ left: f.l, top: f.t }}>
            <div className="flex items-center justify-center rounded-[16px] border border-white/[0.08] bg-[#1A1A1D]" style={{ width: f.s, height: f.s, transform: `rotate(${f.r}deg)` }}>
              <Image src={logo.src} alt="" width={100} height={80} className="object-contain" style={{ width: f.s * 0.66, height: f.s * 0.5 }} />
            </div>
          </div>
        );
      })}

      <div className="relative mx-auto max-w-[620px] text-center">
        <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
          Acepta todos los métodos de pago
        </h2>
        <p className="mx-auto font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.6, marginBottom: 28, maxWidth: 500 }}>
          Tarjetas, SPEI, efectivo, meses sin intereses y Kueski. Que tus clientes paguen como prefieran.
        </p>
        <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 tablet:hidden">
          {METODOS.map((l) => (
            <span key={l.alt} className="flex h-11 items-center justify-center rounded-[12px] bg-[#1A1A1D] px-3">
              <Image src={l.src} alt={l.alt} width={100} height={80} className="h-6 w-auto object-contain" />
            </span>
          ))}
        </div>
        <a href="/productos/t1pagos/pagos-en-linea" className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-8 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]">
          Ver la pasarela
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    </section>
  );
}

/* ══════════ 2 · Aprueba más, protege cada venta (antifraude) ══════════ */
export function T1PagosAprobacion() {
  return (
    <section className="overflow-hidden bg-[#141414] px-5 py-[90px] tablet:px-6 tablet:py-[128px]">
      <div className="mx-auto max-w-[var(--max-w)]">
        <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
          <div>
            <h2 className="font-sora text-[28px] font-light text-white tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 16 }}>
              Aprueba más y protege cada venta
            </h2>
            <p className="font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, marginBottom: 24, maxWidth: 440 }}>
              Con T1 Score analizamos cada transacción en tiempo real para aprobar más operaciones legítimas y frenar el fraude.
            </p>
            <ul className="mb-8 flex flex-col gap-3">
              {["+85% de tasa de aprobación", "Antifraude personalizado con T1 Score", "Seguro contra contracargos", "Certificación PCI DSS"].map((it) => (
                <li key={it} className="flex items-start gap-3 font-inter text-[15px] text-white/75 tablet:text-[16px]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {it}
                </li>
              ))}
            </ul>
            <a href="/productos/t1pagos/reclamaciones" className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]">
              Conocer más
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
          <div className="overflow-hidden rounded-[20px] border border-white/[0.08]">
            <Image src="/img/t1score-v3.png" alt="Antifraude con T1 Score" width={1720} height={914} className="block h-auto w-full" sizes="(max-width: 768px) 92vw, 560px" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════ 3 · Administra tus cobros (carrusel) ══════════ */
const ADMIN_CARDS = [
  { title: "Panel de pagos", desc: "Visualiza y filtra todas tus transacciones, con reportes y conciliación automática.", img: "/img/dashboard-pagos.png", w: 1440, h: 1080, href: "/productos/t1pagos/pagos-en-linea" },
  { title: "Contracargos", desc: "Gestiona disputas con evidencia y monitorea tu tasa de contracargos en un panel.", img: "/img/metricas-contracargos.png", w: 1248, h: 1024, href: "/productos/t1pagos/reclamaciones" },
  { title: "Dinero al día siguiente", desc: "Recibe tus depósitos al día hábil siguiente, con dispersión flexible.", img: "/img/dinero-dia-siguiente.png", w: 1269, h: 1240, href: "/productos/t1pagos/pagos-en-linea" },
  { title: "Enrutamiento", desc: "Optimiza la aprobación enrutando cada transacción por el mejor flujo.", img: "/img/reglas-link.png", w: 1190, h: 1322, href: "/productos/t1pagos/enrutamiento" },
];
export function T1PagosAdministracion() {
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
              Administra todos tus cobros
            </h2>
            <p className="font-inter text-[16px] font-light text-white/60 tablet:text-[18px]" style={{ lineHeight: 1.55, marginBottom: 28, maxWidth: 400 }}>
              Transacciones, contracargos, dispersión y enrutamiento, todo desde un solo panel.
            </p>
            <a href="/productos/t1pagos/pagos-en-linea" className="inline-flex items-center gap-2 rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#C0332A]">
              Conocer más
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
          <div className="flex flex-col gap-5">
            <div ref={ref} className="-mr-5 flex gap-5 overflow-x-auto pb-2 pr-5 tablet:mr-0 tablet:pr-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {ADMIN_CARDS.map((s) => (
                <a key={s.title} href={s.href} data-card className="flex w-[270px] shrink-0 snap-start flex-col rounded-[20px] border border-white/[0.08] bg-[#1A1A1D] p-6 no-underline transition-colors hover:border-white/20">
                  <h3 className="font-sora text-[19px] font-normal text-white" style={{ marginBottom: 8 }}>{s.title}</h3>
                  <p className="font-inter text-[14px] font-light text-white/55" style={{ lineHeight: 1.55, marginBottom: 20, minHeight: 63 }}>{s.desc}</p>
                  <div className="mt-auto overflow-hidden rounded-[14px]">
                    <Image src={s.img} alt={s.title} width={s.w} height={s.h} className="block h-[240px] w-full object-cover object-top" sizes="270px" />
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
  { q: "¿Necesito una tienda para cobrar con T1 Pagos?", a: "No. Puedes cobrar con un link de pago aunque no tengas tienda, o integrar la pasarela a tu sitio." },
  { q: "¿Qué métodos de pago acepta?", a: "Tarjetas Visa, Mastercard, Amex y Carnet, SPEI, efectivo, meses sin intereses y Kueski." },
  { q: "¿Cuánto cobra T1 Pagos?", a: "Desde 3.5% + $1 MXN por transacción, o 4.5% + $1 con cobertura de contracargos incluida." },
  { q: "¿Cuándo recibo mi dinero?", a: "Con depósitos al día hábil siguiente, con opción de dispersión flexible según tu plan." },
  { q: "¿Cómo protegen contra el fraude?", a: "Con T1 Score analizamos cada transacción en tiempo real y ofrecemos seguro contra contracargos." },
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
export function T1PagosFAQ() {
  return (
    <section className="bg-[#141414] px-5 py-[80px] tablet:px-6 tablet:py-[110px]">
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
