"use client";

import { useState } from "react";
import Image from "next/image";
import { ValueStrip, EverythingYouNeed, BusinessStages, Faq, FinalCta } from "@/components/T1WaitlistSections";

/* Waitlist — versión B: página centrada de una columna (pill + heading +
   email inline + prueba social + cards de features), estilos oscuros del
   landing. Inspirada en waitlists tipo Descript / plantillas modernas. */

const HERO_BG =
  "radial-gradient(ellipse 86% 70% at 67% 32%, rgba(226,64,47,0.26) 0%, transparent 60%), radial-gradient(ellipse 60% 58% at 14% 22%, rgba(150,34,34,0.18) 0%, transparent 58%), radial-gradient(ellipse 50% 46% at 82% 84%, rgba(244,114,150,0.08) 0%, transparent 62%), radial-gradient(ellipse 60% 70% at -4% 88%, rgba(58,74,158,0.30) 0%, transparent 52%), radial-gradient(ellipse 42% 60% at 102% 10%, rgba(58,74,158,0.24) 0%, transparent 50%), linear-gradient(160deg, #2e1622 0%, #180b13 50%, #0d070b 100%)";

const T1Logo = (
  <svg width="36" height="35" viewBox="0 0 45 44" fill="none" aria-label="T1">
    <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C27.6733 13.628 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#DB3B2B" />
    <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592C22.2919 12.2592 22.3391 12.2592 22.4335 12.2592H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#DB3B2B" />
  </svg>
);

export default function T1WaitlistB({
  pill = "Early access · Coming soon",
  headline = "The all-in-one commerce platform",
  subtitle = "T1 is the all-in-one, AI-native platform to sell online, get paid, and ship. Get on the list and we'll tell you the moment we launch in your country.",
  social = "1,500+ merchants on the list",
  reassurance = "No credit card required",
}: {
  pill?: string;
  headline?: string;
  subtitle?: string;
  social?: string;
  reassurance?: string;
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

      <section className="relative z-10 mx-auto max-w-[var(--max-w)] px-5 pb-10 pt-[6vh] text-center tablet:px-10 tablet:pb-4 tablet:pt-[9vh]">
        {/* Pill */}
        <span className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.05] px-4 py-1.5 font-inter text-[12.5px] font-medium text-white/70">
          {pill}
        </span>

        {/* Heading + subtítulo */}
        <h1 className="mx-auto mt-6 max-w-[720px] font-sora text-[40px] font-light text-white tablet:text-[60px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}>
          {headline}
        </h1>
        <p className="mx-auto mt-5 max-w-[560px] font-inter text-[16px] font-light text-white/65 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
          {subtitle}
        </p>

        {done ? (
          <div className="mx-auto mt-9 flex max-w-[460px] flex-col items-center">
            <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#16A34A]">
              <svg width="26" height="26" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <p className="font-sora text-[22px] font-light text-white">You&apos;re on the list</p>
            <p className="mt-2 font-inter text-[15px] font-light text-white/60">We&apos;ll email you as soon as your early access is ready.</p>
          </div>
        ) : (
          <>
            {/* Email + botón inline */}
            <form onSubmit={(e) => { e.preventDefault(); if (ok) setDone(true); }} className="mx-auto mt-9 flex w-full max-w-[460px] items-center gap-1.5 rounded-[16px] bg-[#1D1D1D] p-1.5 ring-1 ring-white/10 transition-shadow focus-within:ring-2 focus-within:ring-[#DB3B2B]/50">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Email"
                className="min-w-0 flex-1 bg-transparent px-3.5 font-inter text-[15px] text-white outline-none placeholder:text-[#8A8A8A]"
              />
              <button type="submit" disabled={!ok} className="h-[46px] shrink-0 rounded-[12px] bg-[#DB3B2B] px-5 font-inter text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#C0332A] disabled:bg-[#60160F] disabled:text-white/45">
                Join waitlist
              </button>
            </form>

            {/* Prueba social — desktop en una línea; móvil en dos */}
            <div className="mt-6 flex flex-col items-center gap-3 tablet:flex-row tablet:justify-center tablet:gap-5">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {[1, 2, 3, 4].map((i) => (
                    <Image key={i} src={`/img/person${i}.png`} alt="" width={28} height={28} className="h-[28px] w-[28px] rounded-full border-2 border-[#180b13] object-cover" />
                  ))}
                </div>
                <span className="whitespace-nowrap font-inter text-[13px] font-light text-white/55">{social}</span>
              </div>
              <span className="whitespace-nowrap font-inter text-[13px] font-light text-white/45">{reassurance}</span>
            </div>
          </>
        )}

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
