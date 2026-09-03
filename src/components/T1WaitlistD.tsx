"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { VendeCard, CobraCard, EnviaCard, TodoEnUnoCard } from "@/components/T1ScrollShowcase";

/* Deck de cards del landing (Vende / Cobra / Envía / Todo en uno). */
const DECK = [VendeCard, CobraCard, EnviaCard, TodoEnUnoCard];

/* Fondo semi-opaco detrás de la card (las del landing son muy transparentes):
   simula un frosted glass pero con suficiente contraste para leer el contenido. */
function GlassWrap({ children, h }: { children: React.ReactNode; h?: number }) {
  return (
    <div className="relative rounded-[18px]" style={h ? { height: h, overflow: "hidden" } : undefined}>
      <div className="absolute inset-0 rounded-[18px]" style={{ background: "linear-gradient(155deg, rgba(58,30,44,0.86) 0%, rgba(26,13,20,0.92) 55%, rgba(14,8,11,0.94) 100%)" }} />
      <div className="relative">{children}</div>
    </div>
  );
}

/* Altura uniforme de las cards en el stack para que ninguna sobresalga. */
const STACK_H = 434;

/* Swipe: una card a la vez que entra deslizándose (sin indicadores). */
function CardSwiper() {
  const [a, setA] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setA((v) => (v + 1) % DECK.length), 4200);
    return () => clearInterval(t);
  }, []);
  const C = DECK[a];
  return (
    <div className="flex w-full items-center justify-center" style={{ minHeight: 500 }}>
      <div key={a} style={{ animation: "carouselSlideRight 0.55s cubic-bezier(0.22,1,0.36,1)" }}>
        <GlassWrap><C /></GlassWrap>
      </div>
    </div>
  );
}

/* Stack: baraja de cards apiladas (Vende / Cobra / Envía) que se van cambiando. */
const STACK_DECK = [VendeCard, CobraCard, EnviaCard];
function CardStack() {
  const [a, setA] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setA((v) => (v + 1) % STACK_DECK.length), 3600);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative mx-auto" style={{ width: 344, height: 484 }}>
      {STACK_DECK.map((C, i) => {
        const pos = (i - a + STACK_DECK.length) % STACK_DECK.length;
        const hidden = pos > 2;
        return (
          <div
            key={i}
            className="absolute left-1/2 top-0 flex justify-center"
            style={{
              width: 320,
              marginLeft: -160,
              transform: `translateX(${pos * 14}px) translateY(${pos * 16}px) scale(${1 - pos * 0.05}) rotate(${pos * 1.6}deg)`,
              opacity: hidden ? 0 : 1 - pos * 0.16,
              zIndex: STACK_DECK.length - pos,
              transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease",
              pointerEvents: pos === 0 ? "auto" : "none",
            }}
          >
            <GlassWrap h={STACK_H}><C /></GlassWrap>
          </div>
        );
      })}
    </div>
  );
}

/* Waitlist — versión D: hero de 2 columnas (izq: heading + email; der: cards
   Vende/Cobra/Envía animadas subiendo) + abajo título y cards de features.
   Inspirada en waitlists tipo aircart, con estilos oscuros del landing. */

/* Mismo fondo del hero del landing principal (T1HeroB) — más vívido. */
const HERO_BG =
  "radial-gradient(ellipse 86% 70% at 67% 32%, rgba(226,64,47,0.40) 0%, transparent 60%)," +
  "radial-gradient(ellipse 60% 58% at 14% 22%, rgba(150,34,34,0.26) 0%, transparent 58%)," +
  "radial-gradient(ellipse 50% 46% at 82% 84%, rgba(244,114,150,0.12) 0%, transparent 62%)," +
  "radial-gradient(ellipse 60% 70% at -4% 88%, rgba(58,74,158,0.55) 0%, transparent 52%)," +
  "radial-gradient(ellipse 42% 60% at 102% 10%, rgba(58,74,158,0.45) 0%, transparent 50%)," +
  "linear-gradient(160deg, #3e1f30 0%, #1c0d15 48%, #160a11 100%)";

const T1Logo = (
  <svg width="36" height="35" viewBox="0 0 45 44" fill="none" aria-label="T1">
    <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C27.6733 13.628 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#DB3B2B" />
    <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592C22.2919 12.2592 22.3391 12.2592 22.4335 12.2592H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#DB3B2B" />
  </svg>
);

/* ── Cards de features (abajo) ── */
const IconStore = <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 9l1-4h14l1 4M4 9v10a1 1 0 001 1h14a1 1 0 001-1V9M4 9h16M9 20v-6h6v6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const IconCard = <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="5.5" width="18" height="13" rx="2.2" stroke="#fff" strokeWidth="1.6" /><path d="M3 9.5h18M6.5 14.5h4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /></svg>;
const IconTruck = <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6.5h11v9.5H3zM14 10h3.5L21 13v3h-7" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="7.5" cy="18" r="1.6" stroke="#fff" strokeWidth="1.6" /><circle cx="17" cy="18" r="1.6" stroke="#fff" strokeWidth="1.6" /></svg>;
const FEATURES = [
  { icon: IconStore, title: "Online store", desc: "Build your store with AI and sell online, on marketplaces, and on social." },
  { icon: IconCard, title: "Payments", desc: "Accept cards, transfers, and installments, with built-in fraud protection." },
  { icon: IconTruck, title: "Shipping", desc: "Quote, create labels with top carriers, and track every order in one place." },
];

export default function T1WaitlistD({
  pill = "Early access · Coming soon",
  headline = "Built to power the future of ecommerce",
  subtitle = "T1 is the all-in-one, AI-native platform to sell, get paid, and ship. Join the waitlist to get early access.",
  social = "1,500+ merchants on the list",
  reassurance = "No credit card required",
  featuresTitle = "Everything you need to grow",
  anim = "swipe",
}: {
  pill?: string;
  headline?: string;
  subtitle?: string;
  social?: string;
  reassurance?: string;
  featuresTitle?: string;
  anim?: "swipe" | "stack";
}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const ok = /.+@.+\..+/.test(email.trim());

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ background: HERO_BG }}>
      <header className="relative z-20 mx-auto flex max-w-[var(--max-w)] items-center justify-between px-5 py-5 tablet:px-10">
        <a href="/" aria-label="T1" className="inline-flex">{T1Logo}</a>
        <div className="flex items-center gap-6">
          <a href="/" className="font-inter text-[14px] font-medium text-white/55 no-underline transition-colors hover:text-white/90">Switch to México</a>
          <a href="/login" className="font-inter text-[14px] font-medium text-white/80 no-underline transition-colors hover:text-white">Log in</a>
        </div>
      </header>

      {/* ── Hero 2 columnas ── */}
      <section className="relative z-10 mx-auto max-w-[var(--max-w)] px-5 pt-[4vh] tablet:px-10 tablet:pt-[6vh]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:gap-14">
          {/* Izquierda */}
          <div>
            <span className="font-inter text-[12.5px] font-semibold uppercase tracking-[0.16em] text-white/45">{pill}</span>
            <h1 className="mt-4 max-w-[560px] font-sora text-[38px] font-light text-white tablet:text-[54px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              {headline}
            </h1>
            <p className="mt-5 max-w-[480px] font-inter text-[16px] font-light text-white/65 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              {subtitle}
            </p>

            {done ? (
              <div className="mt-8 flex items-center gap-3">
                <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#16A34A]"><svg width="22" height="22" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <p className="font-sora text-[18px] font-light text-white">You&apos;re on the list — we&apos;ll be in touch.</p>
              </div>
            ) : (
              <>
                <form onSubmit={(e) => { e.preventDefault(); if (ok) setDone(true); }} className="mt-8 flex w-full max-w-[460px] items-center gap-1.5 rounded-[16px] bg-[#1D1D1D] p-1.5 ring-1 ring-white/10 transition-shadow focus-within:ring-2 focus-within:ring-[#DB3B2B]/50">
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" aria-label="Email" className="min-w-0 flex-1 bg-transparent px-3.5 font-inter text-[15px] text-white outline-none placeholder:text-[#8A8A8A]" />
                  <button type="submit" disabled={!ok} className="h-[46px] shrink-0 rounded-[12px] bg-[#DB3B2B] px-5 font-inter text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#C0332A] disabled:bg-[#60160F] disabled:text-white/45">Join waitlist</button>
                </form>
                <div className="mt-5 flex flex-col items-start gap-1.5 tablet:flex-row tablet:items-center tablet:gap-5">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2.5">
                      {[1, 2, 3, 4].map((i) => (
                        <Image key={i} src={`/img/person${i}.png`} alt="" width={28} height={28} className="h-[28px] w-[28px] rounded-full border-2 border-[#180b13] object-cover" />
                      ))}
                    </div>
                    <span className="whitespace-nowrap font-inter text-[13px] font-light text-white/55">{social}</span>
                  </div>
                  <span className="whitespace-nowrap font-inter text-[12px] font-light text-white/40 tablet:text-[13px] tablet:text-white/45">{reassurance}</span>
                </div>
              </>
            )}
          </div>

          {/* Derecha — animación de cards (también en móvil) */}
          <div className="mt-4 flex justify-center lg:mt-0 lg:block">
            <div className="origin-top scale-[0.86] tablet:scale-95 lg:scale-100">
              {anim === "stack" ? <CardStack /> : <CardSwiper />}
            </div>
          </div>
        </div>
      </section>

      {/* ── Título + cards de features ── */}
      <section className="relative z-10 mx-auto max-w-[var(--max-w)] px-5 pb-24 pt-[10vh] tablet:px-10">
        <h2 className="text-center font-sora text-[26px] font-light text-white tablet:text-[36px]" style={{ letterSpacing: "-0.02em" }}>{featuresTitle}</h2>
        <div className="mx-auto mt-10 grid max-w-[900px] grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-[18px] border border-white/[0.08] bg-white/[0.03] p-6 text-left">
              <span className="mb-4 inline-flex text-white">{f.icon}</span>
              <h3 className="font-sora text-[17px] font-normal text-white">{f.title}</h3>
              <p className="mt-1.5 font-inter text-[14px] font-light leading-snug text-white/55" style={{ minHeight: 40 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
