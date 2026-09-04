"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { VendeCard, CobraCard, EnviaCard, TodoEnUnoCard } from "@/components/T1ScrollShowcase";
import { ValueStrip, EverythingYouNeed, BusinessStages, Faq, FinalCta } from "@/components/T1WaitlistSections";

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

/* ── Cards del stack (E): versiones en inglés y genéricas (sin logos por país) ── */
const CARD_FONT = "var(--font-manrope-var), sans-serif";
function useCycle(len: number, ms: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % len), ms);
    return () => clearInterval(t);
  }, [len, ms]);
  return i;
}
function SRow({ label, value, green = false }: { label: string; value: string; green?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/45">{label}</span>
      <span className={green ? "font-medium text-[#4ADE80]" : "font-medium text-white/75"}>{value}</span>
    </div>
  );
}

/* Sales — product card cycling the sales channel (generic labels) */
const SALE_CHANNELS = ["Online store", "Marketplaces"];
function SalesCard() {
  const i = useCycle(SALE_CHANNELS.length, 2000);
  const ch = SALE_CHANNELS[i];
  return (
    <div className="w-[320px] overflow-hidden rounded-[18px] border border-white/[0.14] bg-white/[0.06] backdrop-blur-sm" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.14)", fontFamily: CARD_FONT }}>
      <div className="relative flex items-center justify-center" style={{ height: 200 }}>
        <Image src="/img/tennis-big.png" alt="" width={230} height={150} className="object-contain" />
        <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-black">-14%</span>
        <div key={i} className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.25)", animation: "fadeSlideIn 0.4s ease-out" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 9l1-4h14l1 4M4 9v10a1 1 0 001 1h14a1 1 0 001-1V9M4 9h16" stroke="#111" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="text-[11px] font-semibold text-black">{ch}</span>
        </div>
      </div>
      <div className="p-5">
        <p className="text-[12px] font-medium text-white/45">All your sales channels</p>
        <p className="mt-0.5 text-[16px] font-semibold text-white">Sneakers Court Premium</p>
        <div className="mt-2 flex items-baseline gap-2"><span className="text-[20px] font-bold text-white">$1,890</span><span className="text-[13px] text-white/40 line-through">$2,190</span></div>
        <div className="mt-3 flex items-center justify-between rounded-[10px] border border-white/10 bg-white/[0.05] px-3 py-2">
          <span className="text-[11px] text-white/55">Sales today · {ch}</span>
          <span key={i} className="text-[13px] font-bold text-white" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>{i === 0 ? "$6,510" : "$8,240"}</span>
        </div>
        <div className="mt-3 w-full rounded-[12px] bg-black py-3 text-center text-[13px] font-semibold text-white">Add to cart</div>
      </div>
    </div>
  );
}

/* Checkout — cycling payment method (Visa / Mastercard / Amex only) */
const PAY_EN = [{ name: "Visa", src: "/img/icons/visa.svg" }, { name: "Mastercard", src: "/img/icons/mastercard.svg" }, { name: "Amex", src: "/img/icons/amex.svg" }];
function CheckoutCard() {
  const i = useCycle(PAY_EN.length, 1500);
  const m = PAY_EN[i];
  return (
    <div className="w-[320px] rounded-[18px] border border-white/[0.14] bg-white/[0.06] p-6 backdrop-blur-sm" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.14)", fontFamily: CARD_FONT }}>
      <p className="text-[14px] font-bold text-white">Order summary</p>
      <div className="mt-5 flex items-center gap-3 border-b border-white/10 pb-5">
        <div className="flex h-[46px] w-[46px] items-center justify-center overflow-hidden rounded-[10px] bg-white/[0.08]"><Image src="/img/tennis-big.png" alt="" width={40} height={28} className="object-contain" /></div>
        <div className="flex-1"><p className="text-[13px] font-medium text-white">Sneakers Court</p><p className="text-[12px] text-white/45">Size 27 · x1</p></div>
        <span className="text-[13px] font-semibold text-white">$1,890</span>
      </div>
      <div className="mt-4 flex flex-col gap-2 text-[12px]">
        <SRow label="Subtotal" value="$1,890.00" />
        <SRow label="Shipping" value="Free" green />
        <SRow label="Tax" value="$302.40" />
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4"><span className="text-[14px] font-bold text-white">Total</span><span className="text-[18px] font-bold text-white">$2,192.40</span></div>
      <div className="mt-4 flex items-center justify-between rounded-[10px] border border-white/12 px-3 py-3">
        <span className="text-[12px] text-white/50">Payment method</span>
        <span key={i} className="flex items-center gap-2" style={{ animation: "fadeSlideIn 0.35s ease-out" }}>
          <span className="flex h-[22px] items-center justify-center rounded-[5px] bg-white px-1.5"><Image src={m.src} alt={m.name} width={34} height={22} className="h-[14px] w-auto object-contain" /></span>
          <span className="text-[12px] font-semibold text-white">{m.name}</span>
        </span>
      </div>
      <div className="mt-4 w-full rounded-[12px] bg-black py-3.5 text-center text-[13px] font-semibold text-white">Pay now</div>
    </div>
  );
}

/* Shipping — label + tracking, generic carrier name (no logos) */
const CARRIERS_GEN = ["Carrier 1", "Carrier 2", "Carrier 3", "Carrier 4"];
const TRACK_EN = [{ label: "Label created", sub: "Today · 9:14 am" }, { label: "Picked up", sub: "Today · 2:30 pm" }, { label: "In transit", sub: "Out for delivery" }, { label: "Delivered", sub: "Est.: tomorrow" }];
function ShippingCard() {
  const i = useCycle(CARRIERS_GEN.length, 1900);
  const step = useCycle(TRACK_EN.length, 1300);
  const c = CARRIERS_GEN[i];
  return (
    <div className="w-[320px] rounded-[18px] border border-white/[0.14] bg-white/[0.06] p-5 backdrop-blur-sm" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.14)", fontFamily: CARD_FONT }}>
      <div className="flex items-center justify-between">
        <span key={i} className="flex items-center gap-2" style={{ animation: "fadeSlideIn 0.35s ease-out" }}>
          <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-white/[0.1]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 6.5h11v9.5H3zM14 10h3.5L21 13v3h-7" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" /><circle cx="7.5" cy="18" r="1.5" stroke="#fff" strokeWidth="1.7" /><circle cx="17" cy="18" r="1.5" stroke="#fff" strokeWidth="1.7" /></svg></span>
          <span className="text-[13px] font-semibold text-white">{c}</span>
        </span>
        <span className="rounded-full bg-[rgba(74,222,128,0.16)] px-2.5 py-1 text-[11px] font-bold text-[#4ADE80]">In transit</span>
      </div>
      <p className="mt-4 text-[11px] text-white/45">Shipping label</p>
      <p className="text-[16px] font-bold tracking-wide text-white">4657 8912 34</p>
      <div className="mt-3 flex items-center gap-3">
        <div className="flex-1"><p className="text-[11px] text-white/40">Origin</p><p className="text-[13px] font-semibold text-white">CDMX · 06600</p></div>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 12h16M14 6l6 6-6 6" stroke="#E2604C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div className="flex-1 text-right"><p className="text-[11px] text-white/40">Destination</p><p className="text-[13px] font-semibold text-white">GDL · 44100</p></div>
      </div>
      <div className="mt-5 rounded-[12px] border border-white/10 bg-white/[0.05] p-4">
        <p className="mb-4 text-[12px] font-semibold text-white">Track your shipment in real time</p>
        <div className="flex flex-col">
          {TRACK_EN.map((t, si) => {
            const done = si <= step;
            const last = si === TRACK_EN.length - 1;
            return (
              <div key={t.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full" style={{ background: done ? "#E2604C" : "rgba(255,255,255,0.15)", transition: "background 0.4s ease" }}>
                    {done && <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </div>
                  {!last && <div className="w-[2px] flex-1" style={{ minHeight: 20, background: si < step ? "#E2604C" : "rgba(255,255,255,0.12)", transition: "background 0.4s ease" }} />}
                </div>
                <div style={{ paddingBottom: last ? 0 : 12 }}>
                  <p className="text-[13px] font-semibold leading-none" style={{ color: done ? "#fff" : "rgba(255,255,255,0.4)" }}>{t.label}</p>
                  <p className="mt-1 text-[11px] text-white/45">{t.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* Stack: baraja de cards (Sales / Checkout / Shipping) que se van cambiando. */
const STACK_DECK = [SalesCard, CheckoutCard, ShippingCard];
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

export default function T1WaitlistD({
  pill = "Early access · Coming soon",
  headline = "Built to power the future of ecommerce",
  subtitle = "T1 is the all-in-one, AI-native platform to sell, get paid, and ship. Join the waitlist to get early access.",
  social = "1,500+ merchants on the list",
  reassurance = "No credit card required",
  anim = "swipe",
}: {
  pill?: string;
  headline?: string;
  subtitle?: string;
  social?: string;
  reassurance?: string;
  anim?: "swipe" | "stack";
}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const ok = /.+@.+\..+/.test(email.trim());

  return (
    <main id="top" className="relative min-h-screen overflow-hidden" style={{ background: HERO_BG }}>
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
                <p className="font-sora text-[18px] font-light text-white">You&apos;re on the list. We&apos;ll be in touch.</p>
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

      {/* ── Secciones inferiores ── */}
      <ValueStrip />
      <EverythingYouNeed />
      <BusinessStages />
      <Faq />
      <FinalCta />
    </main>
  );
}
