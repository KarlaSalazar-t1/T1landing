"use client";

import { useState } from "react";
import Image from "next/image";

/* Secciones inferiores compartidas por las waitlist B y E:
   - BusinessStages: "para cada etapa de tu negocio" (emprendedor / PyME / enterprise)
     con imagen lifestyle a la derecha. Reemplaza al antiguo "how it works" para no
     repetir los pilares (tienda / pagos / envíos) del bloque de arriba.
   - Faq: preguntas típicas de una página coming-soon (acordeón)
   - FinalCta: banda de cierre con botón que regresa al formulario del hero (#top)
   Estilos oscuros del landing (font-sora headings, font-inter body, rojo #DB3B2B). */

const IconRocket = <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3c3.2 1.1 5 4.2 5 8 0 1.9-.7 3.7-1.7 5H8.7C7.7 14.7 7 12.9 7 11c0-3.8 1.8-6.9 5-8z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="12" cy="9.5" r="1.6" stroke="#fff" strokeWidth="1.6" /><path d="M9 16.5l-1.6 3M15 16.5l1.6 3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /></svg>;
const IconTrend = <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 16l5-5 3 3 8-8M15 6h5v5" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const IconBuilding = <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="5" y="4" width="14" height="16" rx="1.5" stroke="#fff" strokeWidth="1.6" /><path d="M9 8h2M13 8h2M9 12h2M13 12h2M10 20v-2.5h4V20" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /></svg>;

const STAGES = [
  {
    icon: IconRocket,
    title: "Just getting started",
    desc: "Launch your first store with AI, take your first payment, and ship your first order. No monthly fee, no code.",
  },
  {
    icon: IconTrend,
    title: "Growing business",
    desc: "Sell across your store, marketplaces, and social from one place, and manage inventory, orders, and customers as you scale.",
  },
  {
    icon: IconBuilding,
    title: "Enterprise",
    desc: "Multi-branch inventory, advanced payments, and the reliability to handle high volume, with support to match.",
  },
];

export function BusinessStages({
  title = "Built for every stage of your business",
  subtitle = "Whether you're making your first sale or running at scale, T1 gives you the tools you need at every step, and grows with you.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative z-10 mx-auto max-w-[var(--max-w)] px-5 pb-6 pt-20 tablet:px-10 tablet:py-20">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
        {/* Izquierda — título + etapas */}
        <div>
          <h2 className="max-w-[460px] font-sora text-[26px] font-light text-white tablet:text-[36px]" style={{ letterSpacing: "-0.02em", lineHeight: 1.12 }}>
            {title}
          </h2>
          <p className="mt-4 max-w-[440px] font-inter text-[15px] font-light text-white/60 tablet:text-[16px]" style={{ lineHeight: 1.6 }}>
            {subtitle}
          </p>
          <div className="mt-10 flex flex-col gap-7">
            {STAGES.map((s) => (
              <div key={s.title} className="flex items-start gap-4">
                <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[12px] bg-white/[0.06]">{s.icon}</span>
                <div>
                  <h3 className="font-sora text-[17px] font-normal text-white tablet:text-[18px]">{s.title}</h3>
                  <p className="mt-1.5 max-w-[400px] font-inter text-[14px] font-light leading-relaxed text-white/55">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Derecha — imagen lifestyle */}
        <div className="flex justify-center">
          <Image
            src="/img/every-stage.png"
            alt="A merchant running their business with T1"
            width={1285}
            height={1187}
            className="h-auto w-full max-w-[520px] object-contain"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, #000 60%, transparent 90%)",
              maskImage: "linear-gradient(to bottom, #000 60%, transparent 90%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ── Value strip: one platform · AI-native · pay as you sell ── */
const VIconLayers = <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 16.5l9 5 9-5" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /></svg>;
const VIconSpark = <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /><path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" /></svg>;
const VIconTag = <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 12.5V5a2 2 0 012-2h7.5L21 11.5 13.5 19 3 12.5z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="8" cy="8" r="1.4" stroke="#fff" strokeWidth="1.6" /></svg>;

const VALUES = [
  { icon: VIconLayers, title: "One platform", desc: "Store, payments, and shipping working together as one." },
  { icon: VIconSpark, title: "AI-native", desc: "AI built into every step, from setup to your next sale." },
  { icon: VIconTag, title: "Pay as you sell", desc: "No card or monthly fee to start. You only pay when you sell." },
];

export function ValueStrip() {
  return (
    <section className="relative z-10 mx-auto max-w-[var(--max-w)] px-5 py-10 tablet:px-10">
      <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-6 tablet:grid-cols-3 tablet:gap-0">
        {VALUES.map((v, i) => (
          <div key={v.title} className={`flex items-start gap-3.5 tablet:px-7 ${i > 0 ? "tablet:border-l tablet:border-white/[0.08]" : ""}`}>
            <span className="mt-0.5 inline-flex shrink-0 text-white">{v.icon}</span>
            <div>
              <h3 className="font-sora text-[15px] font-normal text-white">{v.title}</h3>
              <p className="mt-1 font-inter text-[13px] font-light leading-snug text-white/55">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Everything you need to grow: pilares (tienda / pagos / envíos) ── */
const PIconStore = <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 9l1-4h14l1 4M4 9v10a1 1 0 001 1h14a1 1 0 001-1V9M4 9h16M9 20v-6h6v6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const PIconCard = <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="5.5" width="18" height="13" rx="2.2" stroke="#fff" strokeWidth="1.6" /><path d="M3 9.5h18M6.5 14.5h4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /></svg>;
const PIconTruck = <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6.5h11v9.5H3zM14 10h3.5L21 13v3h-7" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="7.5" cy="18" r="1.6" stroke="#fff" strokeWidth="1.6" /><circle cx="17" cy="18" r="1.6" stroke="#fff" strokeWidth="1.6" /></svg>;

const PILLARS = [
  { icon: PIconStore, title: "Online store", desc: "Build your store with AI, load a full product catalog, and sell online, on marketplaces, and on social. No code needed." },
  { icon: PIconCard, title: "Payments", desc: "Accept cards, transfers, and installments, or share a payment link, all with built-in fraud protection." },
  { icon: PIconTruck, title: "Shipping", desc: "Connect your marketplaces, quote and print labels with top carriers, and track every order in one place." },
];

export function EverythingYouNeed({ title = "Everything you need to grow" }: { title?: string }) {
  return (
    <section className="relative z-10 mx-auto max-w-[var(--max-w)] px-5 py-16 tablet:px-10">
      <h2 className="text-center font-sora text-[26px] font-light text-white tablet:text-[36px]" style={{ letterSpacing: "-0.02em" }}>{title}</h2>
      <div className="mx-auto mt-10 grid max-w-[900px] grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
        {PILLARS.map((p) => (
          <div key={p.title} className="rounded-[18px] border border-white/[0.08] bg-white/[0.03] p-6 text-left">
            <span className="mb-4 inline-flex text-white">{p.icon}</span>
            <h3 className="font-sora text-[17px] font-normal text-white">{p.title}</h3>
            <p className="mt-1.5 font-inter text-[14px] font-light leading-snug text-white/55">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "When is T1 launching?",
    a: "We're rolling out early access in phases. Join the waitlist and we'll email you the moment your access is ready in your country.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on what you use. The online store has a free plan, and you only start paying once you pass its volume limits. Payments work on a small fee per transaction. Shipping runs on prepaid balance you top up, so you only pay for the labels you use. No monthly fee to get started.",
  },
  {
    q: "Do I need a credit card to join?",
    a: "No. Joining the waitlist is free and takes a few seconds. No credit card required.",
  },
  {
    q: "What can I do with T1?",
    a: "Everything to run your business in one place: build an online store, accept payments, and ship orders, all AI-native and from a single dashboard.",
  },
  {
    q: "Can I use it if I already sell on marketplaces?",
    a: "Yes. Connect your sales channels and manage orders, inventory, and shipping together, without switching between tools.",
  },
];

export function Faq({ title = "Frequently asked questions" }: { title?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative z-10 mx-auto max-w-[var(--max-w)] px-5 pb-20 pt-6 tablet:px-10 tablet:py-20">
      <h2 className="text-center font-sora text-[26px] font-light text-white tablet:text-[36px]" style={{ letterSpacing: "-0.02em" }}>
        {title}
      </h2>
      <div className="mx-auto mt-10 flex max-w-[720px] flex-col gap-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="overflow-hidden rounded-[16px] border border-white/[0.08] bg-white/[0.03]">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left tablet:px-6"
              >
                <span className="font-inter text-[15px] font-medium text-white tablet:text-[16px]">{f.q}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 transition-transform duration-300" style={{ transform: isOpen ? "rotate(45deg)" : "none" }}>
                  <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
              <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 font-inter text-[14px] font-light leading-relaxed text-white/60 tablet:px-6 tablet:text-[15px]">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function FinalCta({
  title = "Be first to sell with T1",
  subtitle = "Get early access before everyone else. It only takes a few seconds, no credit card required.",
  cta = "Join the waitlist",
}: {
  title?: string;
  subtitle?: string;
  cta?: string;
}) {
  const scrollTop = () => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <section className="relative z-10 mx-auto max-w-[var(--max-w)] px-5 pb-24 pt-6 tablet:px-10">
      <div className="mx-auto max-w-[760px] rounded-[24px] border border-white/[0.1] bg-white/[0.04] px-6 py-12 text-center tablet:px-12 tablet:py-14">
        <h2 className="font-sora text-[28px] font-light text-white tablet:text-[38px]" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-[460px] font-inter text-[15px] font-light text-white/60 tablet:text-[16px]" style={{ lineHeight: 1.6 }}>
          {subtitle}
        </p>
        <button
          type="button"
          onClick={scrollTop}
          className="mt-8 inline-flex h-[50px] items-center justify-center rounded-[12px] bg-[#DB3B2B] px-7 font-inter text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-[#C0332A]"
        >
          {cta}
        </button>
      </div>
    </section>
  );
}
