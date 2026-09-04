"use client";

import { useState } from "react";
import Image from "next/image";

/* Secciones inferiores compartidas por las waitlist B y E:
   - HowItWorks: 3 pasos (build / sell & get paid / ship & scale)
   - Faq: preguntas típicas de una página coming-soon (acordeón)
   - FinalCta: banda de cierre con botón que regresa al formulario del hero (#top)
   Estilos oscuros del landing (font-sora headings, font-inter body, rojo #DB3B2B). */

const IconStore = <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 9l1-4h14l1 4M4 9v10a1 1 0 001 1h14a1 1 0 001-1V9M4 9h16M9 20v-6h6v6" stroke="#E2604C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const IconCard = <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="5.5" width="18" height="13" rx="2.2" stroke="#E2604C" strokeWidth="1.7" /><path d="M3 9.5h18M6.5 14.5h4" stroke="#E2604C" strokeWidth="1.7" strokeLinecap="round" /></svg>;
const IconTruck = <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 6.5h11v9.5H3zM14 10h3.5L21 13v3h-7" stroke="#E2604C" strokeWidth="1.7" strokeLinejoin="round" /><circle cx="7.5" cy="18" r="1.6" stroke="#E2604C" strokeWidth="1.7" /><circle cx="17" cy="18" r="1.6" stroke="#E2604C" strokeWidth="1.7" /></svg>;

const STEPS = [
  {
    icon: IconStore,
    title: "Build your store",
    desc: "Create your store with AI in minutes. Import your catalog, pick a design, and go live. No code needed.",
  },
  {
    icon: IconCard,
    title: "Get paid, with or without a store",
    desc: "Accept cards, transfers, and installments on your store, or just share a payment link. No online store required.",
  },
  {
    icon: IconTruck,
    title: "Ship from anywhere you sell",
    desc: "Quote and print labels with top carriers and track every order, even if you sell on marketplaces or social.",
  },
];

/* Mockup tipo browser (columna derecha), inspirado en el layout de Float. */
function StoreMock() {
  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <div className="overflow-hidden rounded-[16px] border border-white/[0.1] bg-[#141018]" style={{ boxShadow: "0 40px 90px -30px rgba(0,0,0,0.7)" }}>
        <div className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-3">
          <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#febc2e]" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#28c840]" />
          <div className="ml-3 flex-1 rounded-md bg-white/[0.06] px-3 py-1 font-inter text-[11px] text-white/40">yourstore.t1.com</div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-center rounded-[12px] bg-white/[0.05] py-6">
            <Image src="/img/tennis-big.png" alt="" width={230} height={150} className="object-contain" />
          </div>
          <p className="mt-4 font-inter text-[15px] font-semibold text-white">Sneakers Court Premium</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-inter text-[19px] font-bold text-white">$1,890</span>
            <span className="font-inter text-[13px] text-white/40 line-through">$2,190</span>
          </div>
          <div className="mt-4 rounded-[10px] bg-[#DB3B2B] py-2.5 text-center font-inter text-[13px] font-semibold text-white">Add to cart</div>
        </div>
      </div>
    </div>
  );
}

export function HowItWorks({
  title = "From idea to first sale, faster",
  subtitle = "T1 brings your whole business into one place, so you can launch, sell, and grow without juggling ten different tools.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative z-10 mx-auto max-w-[var(--max-w)] px-5 py-20 tablet:px-10">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
        {/* Izquierda — título + lista con iconos */}
        <div>
          <h2 className="max-w-[440px] font-sora text-[26px] font-light text-white tablet:text-[36px]" style={{ letterSpacing: "-0.02em", lineHeight: 1.12 }}>
            {title}
          </h2>
          <p className="mt-4 max-w-[440px] font-inter text-[15px] font-light text-white/60 tablet:text-[16px]" style={{ lineHeight: 1.6 }}>
            {subtitle}
          </p>
          <div className="mt-10 flex flex-col gap-7">
            {STEPS.map((s) => (
              <div key={s.title} className="flex items-start gap-4">
                <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[12px] bg-[rgba(226,96,76,0.12)]">{s.icon}</span>
                <div>
                  <h3 className="font-sora text-[17px] font-normal text-white tablet:text-[18px]">{s.title}</h3>
                  <p className="mt-1.5 max-w-[380px] font-inter text-[14px] font-light leading-relaxed text-white/55">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Derecha — mockup */}
        <StoreMock />
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
    a: "No monthly fee to start. You only pay standard processing fees when you get paid, so your costs grow with your sales, not before.",
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
    <section className="relative z-10 mx-auto max-w-[var(--max-w)] px-5 py-20 tablet:px-10">
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
