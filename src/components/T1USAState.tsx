"use client";

import { useState } from "react";
import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";

/* Shared hero gradient: same family as every product hero (warm plum + red/blue),
   dimmed so international pages read as a distinct, quieter surface. */
const HERO_BG =
  "radial-gradient(ellipse 86% 70% at 67% 32%, rgba(226,64,47,0.26) 0%, transparent 60%), radial-gradient(ellipse 60% 58% at 14% 22%, rgba(150,34,34,0.18) 0%, transparent 58%), radial-gradient(ellipse 50% 46% at 82% 84%, rgba(244,114,150,0.08) 0%, transparent 62%), radial-gradient(ellipse 60% 70% at -4% 88%, rgba(58,74,158,0.30) 0%, transparent 52%), radial-gradient(ellipse 42% 60% at 102% 10%, rgba(58,74,158,0.24) 0%, transparent 50%), linear-gradient(160deg, #2e1622 0%, #180b13 50%, #0d070b 100%)";

/* Same field treatment as the main landing hero: solid dark input, muted
   placeholder, subtle focus ring. */
const FIELD =
  "h-[54px] w-full flex-1 rounded-[14px] bg-[#1D1D1D] px-5 font-inter text-[15px] text-white outline-none transition-shadow placeholder:text-[#8A8A8A] focus:ring-1 focus:ring-white/20";

export type USAVariant = "coming-soon" | "waitlist" | "not-available";

/* Subset for the picker — IP preselect + full country DB are backend (Mission
   Control / geo). US default because this surface lives under /usa. */
const COUNTRIES = [
  "United States", "Argentina", "Bolivia", "Brazil", "Canada", "Chile",
  "Colombia", "Costa Rica", "Dominican Republic", "Ecuador", "El Salvador",
  "Guatemala", "Honduras", "México", "Nicaragua", "Panamá", "Paraguay",
  "Perú", "Spain", "Uruguay", "Venezuela", "Other",
];

export default function T1USAState({
  variant,
  headline,
  description,
  date,
  features,
}: {
  variant: USAVariant;
  /** Kept for page clarity / metadata; not rendered. */
  product?: string;
  headline: string;
  description: string;
  /** Only for "coming-soon": the launch window, e.g. "November 2026". */
  date?: string;
  /** Short bullet list explaining the function (optional). */
  features?: string[];
}) {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("United States");
  const [sells, setSells] = useState<"" | "products" | "services" | "both">("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState(false);
  const emailOk = /.+@.+\..+/.test(email.trim());
  const valid = emailOk && consent; // email + consent required; country has a default
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (valid) setDone(true);
  };

  // Only the waitlist captures an email. Coming-soon just announces; not-available offers a way forward.
  const showForm = variant === "waitlist";

  return (
    <main className="min-h-screen bg-black">
      {/* Full site header: some products ARE available/coming, so we keep the nav. */}
      <T1Navbar />

      <section
        className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-[120px] text-center"
        style={{ background: HERO_BG }}
      >
        {/* Bottom fade to fuse with the footer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0"
          style={{ height: "38%", background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 60%, #000 100%)" }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[620px] flex-col items-center">
          <h1
            className="font-sora text-[34px] font-light text-white tablet:text-[52px]"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.08, maxWidth: 620 }}
          >
            {headline}
          </h1>

          <p
            className="font-inter text-[16px] font-light text-white/70 tablet:text-[18px]"
            style={{ lineHeight: 1.55, marginTop: 20, maxWidth: 480 }}
          >
            {description}
          </p>

          {/* Launch date (coming-soon only) */}
          {variant === "coming-soon" && date && (
            <div className="mt-8 inline-flex items-center gap-2.5 rounded-[14px] border border-white/12 bg-white/[0.04] px-5 py-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                <rect x="3.5" y="5" width="17" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
                <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              <span className="font-inter text-[15px] font-medium text-white/85">
                Launching <span className="font-semibold text-white">{date}</span>
              </span>
            </div>
          )}

          {/* Short function explainer */}
          {features && features.length > 0 && (
            <ul className="mt-8 flex flex-col items-start gap-2.5 text-left">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 font-inter text-[14px] font-light text-white/70 tablet:text-[15px]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
                    <path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          )}

          {/* Action */}
          {showForm ? (
            done ? (
              <div className="mt-9 w-full rounded-[16px] border border-[#16A34A]/30 px-6 py-7 text-center" style={{ maxWidth: 460, background: "rgba(34,197,94,0.08)" }}>
                <div className="mx-auto mb-3 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#16A34A]">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-sora text-[18px] font-normal text-white">You&apos;re on the list</p>
                <p className="mt-1.5 font-inter text-[14px] font-light text-white/65">We&apos;ll let you know when T1 arrives in {country}.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-9 flex w-full flex-col gap-3 text-left" style={{ maxWidth: 460 }}>
                <p className="text-center font-inter text-[14px] font-light text-white/60">
                  We don&apos;t operate in {country}{" "}yet — join the list and we&apos;ll let you know when we arrive.
                </p>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  aria-label="Email"
                  className={FIELD}
                />
                {/* País — preselect por IP es backend; default US + editable */}
                <select aria-label="Country" value={country} onChange={(e) => setCountry(e.target.value)} className={FIELD}>
                  {COUNTRIES.map((c) => <option key={c} value={c} className="bg-[#1D1D1D]">{c}</option>)}
                </select>
                {/* ¿Qué vendes? — opcional */}
                <div className="flex gap-2">
                  {([["products", "Products"], ["services", "Services"], ["both", "Both"]] as const).map(([v, label]) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setSells((s) => (s === v ? "" : v))}
                      className="h-[46px] flex-1 rounded-[12px] border font-inter text-[14px] font-medium transition-colors"
                      style={{ borderColor: sells === v ? "#DB3B2B" : "rgba(255,255,255,0.12)", background: sells === v ? "rgba(219,59,43,0.12)" : "transparent", color: sells === v ? "#fff" : "rgba(255,255,255,0.6)" }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {/* Celular con lada — opcional, sin OTP */}
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone (optional) — e.g. +52 55 1234 5678"
                  aria-label="Phone"
                  className={FIELD}
                />
                {/* Consentimiento — obligatorio */}
                <label className="mt-1 flex cursor-pointer items-start gap-2.5 font-inter text-[13px] font-light text-white/60">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-[16px] w-[16px] shrink-0 accent-[#DB3B2B]" />
                  <span>I agree to the <a href="/privacidad" className="text-white/85 underline">privacy notice</a> and to be contacted by email or WhatsApp when T1 reaches my country.</span>
                </label>
                <button
                  type="submit"
                  disabled={!valid}
                  className="mt-1 h-[54px] w-full shrink-0 rounded-[14px] bg-[#DB3B2B] px-7 font-inter text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-[#C0332A] disabled:bg-[#60160F] disabled:text-white/45 disabled:hover:bg-[#60160F]"
                >
                  Join the waitlist
                </button>
                {/* ¿Ya tienes cuenta? — "Crear cuenta" vive dentro del login (WL-02) */}
                <p className="mt-1 text-center font-inter text-[13px] font-light text-white/55">
                  Already have an account? <a href="/login" className="font-medium text-white/90 underline">Log in</a>
                </p>
              </form>
            )
          ) : variant === "not-available" ? (
            <a
              href="/usa"
              className="mt-9 inline-flex h-[52px] items-center justify-center rounded-[14px] border border-white/20 px-7 font-inter text-[15px] font-semibold text-white no-underline transition-colors duration-150 hover:border-white/45 hover:bg-white/[0.06]"
            >
              See what&apos;s available in the U.S.
            </a>
          ) : null}

          {/* Back / switch region */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="/usa" className="inline-flex items-center gap-1.5 font-inter text-[13px] font-medium text-white/55 no-underline transition-colors hover:text-white/90">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              T1 in the U.S.
            </a>
            <a href="/" className="font-inter text-[13px] font-medium text-white/45 no-underline transition-colors hover:text-white/80">
              Switch to México
            </a>
          </div>
        </div>
      </section>

      <T1Footer />
    </main>
  );
}
