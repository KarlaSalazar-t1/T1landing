"use client";

import { useState } from "react";

/* Waitlist — versión C: dos columnas. Izquierda: título "Get early access"
   + mini explicación de T1 con bullets. Derecha: captura de email. */

const HERO_BG =
  "radial-gradient(ellipse 86% 70% at 67% 32%, rgba(226,64,47,0.26) 0%, transparent 60%), radial-gradient(ellipse 60% 58% at 14% 22%, rgba(150,34,34,0.18) 0%, transparent 58%), radial-gradient(ellipse 50% 46% at 82% 84%, rgba(244,114,150,0.08) 0%, transparent 62%), radial-gradient(ellipse 60% 70% at -4% 88%, rgba(58,74,158,0.30) 0%, transparent 52%), radial-gradient(ellipse 42% 60% at 102% 10%, rgba(58,74,158,0.24) 0%, transparent 50%), linear-gradient(160deg, #2e1622 0%, #180b13 50%, #0d070b 100%)";

const T1Logo = (
  <svg width="36" height="35" viewBox="0 0 45 44" fill="none" aria-label="T1">
    <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C27.6733 13.628 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#DB3B2B" />
    <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592C22.2919 12.2592 22.3391 12.2592 22.4335 12.2592H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#DB3B2B" />
  </svg>
);

export default function T1WaitlistC({
  title = "Get early access to T1",
  blurb = "The all-in-one, AI-native platform to sell online, get paid, and ship.",
  bullets = [
    "Online store, payments, and shipping in one place",
    "AI that gets you launched in minutes",
    "No monthly fee to start",
  ],
  formTitle = "Join the waitlist",
  formHelp = "Drop your email and we'll tell you the moment T1 reaches your country.",
  note = "1,500+ merchants already on the list · No credit card required",
}: {
  title?: string;
  blurb?: string;
  bullets?: string[];
  formTitle?: string;
  formHelp?: string;
  note?: string;
}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const ok = /.+@.+\..+/.test(email.trim());

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ background: HERO_BG }}>
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 tablet:px-10">
        <a href="/" aria-label="T1" className="inline-flex">{T1Logo}</a>
        <div className="flex items-center gap-6">
          <a href="/" className="font-inter text-[14px] font-medium text-white/55 no-underline transition-colors hover:text-white/90">Switch to México</a>
          <a href="/login" className="font-inter text-[14px] font-medium text-white/80 no-underline transition-colors hover:text-white">Log in</a>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-[var(--max-w)] items-center px-5 py-24 tablet:px-10">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
          {/* Izquierda — título + mini explicación */}
          <div>
            <h1 className="font-sora text-[34px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.08, maxWidth: 500 }}>
              {title}
            </h1>
            <p className="mt-5 font-inter text-[16px] font-light text-white/70 tablet:text-[18px]" style={{ lineHeight: 1.55, maxWidth: 440 }}>
              {blurb}
            </p>
            <ul className="mt-8 flex flex-col gap-3" style={{ maxWidth: 420 }}>
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[rgba(219,59,43,0.14)]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="font-inter text-[14px] font-light text-white/80 tablet:text-[15px]">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Derecha — captura de email */}
          <div className="rounded-[24px] bg-[#14100f] p-7 tablet:p-8" style={{ boxShadow: "0 40px 100px -30px rgba(0,0,0,0.7)" }}>
            {done ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#16A34A]">
                  <svg width="26" height="26" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <p className="font-sora text-[22px] font-light text-white">You&apos;re on the list</p>
                <p className="mt-2 max-w-[300px] font-inter text-[15px] font-light text-white/60">We&apos;ll email you as soon as your early access is ready.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (ok) setDone(true); }} className="flex flex-col">
                <p className="font-sora text-[20px] font-normal text-white">{formTitle}</p>
                <p className="mt-1.5 font-inter text-[14px] font-light leading-snug text-white/55">{formHelp}</p>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  aria-label="Email"
                  className="mt-5 h-[52px] w-full rounded-[12px] bg-[#1D1D1D] px-4 font-inter text-[15px] text-white outline-none ring-1 ring-white/10 transition-shadow placeholder:text-[#8A8A8A] focus:ring-2 focus:ring-[#DB3B2B]/60"
                />
                <button type="submit" disabled={!ok} className="mt-3 flex h-[52px] items-center justify-center rounded-[12px] bg-[#DB3B2B] font-inter text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-[#C0332A] disabled:bg-[#60160F] disabled:text-white/45">
                  Join the waitlist
                </button>
                <p className="mt-4 font-inter text-[12.5px] font-light text-white/45">{note}</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
