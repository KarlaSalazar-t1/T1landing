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
  "h-[50px] w-full rounded-[12px] bg-[#1D1D1D] px-4 font-inter text-[15px] text-white outline-none transition-shadow placeholder:text-[#8A8A8A] focus:ring-1 focus:ring-white/25";
const LABEL = "mb-1.5 block font-inter text-[13px] font-medium text-white/70";

export type USAVariant = "coming-soon" | "waitlist" | "not-available";

/* Subset for the picker — IP preselect + full country DB are backend (Mission
   Control / geo). US default because this surface lives under /usa. */
const COUNTRIES = [
  "United States", "Argentina", "Bolivia", "Brazil", "Canada", "Chile",
  "Colombia", "Costa Rica", "Dominican Republic", "Ecuador", "El Salvador",
  "Guatemala", "Honduras", "México", "Nicaragua", "Panamá", "Paraguay",
  "Perú", "Spain", "Uruguay", "Venezuela", "Other",
];

/* Región / cambiar país — reutilizado en ambos layouts. */
function RegionLinks() {
  return (
    <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2">
      <a href="/usa" className="inline-flex items-center gap-1.5 font-inter text-[13px] font-medium text-white/55 no-underline transition-colors hover:text-white/90">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        T1 in the U.S.
      </a>
      <a href="/" className="font-inter text-[13px] font-medium text-white/45 no-underline transition-colors hover:text-white/80">
        Switch to México
      </a>
    </div>
  );
}

function Features({ features }: { features?: string[] }) {
  if (!features || features.length === 0) return null;
  return (
    <ul className="mt-8 flex flex-col gap-3" style={{ maxWidth: 420 }}>
      {features.map((f) => (
        <li key={f} className="flex items-center gap-3">
          <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[rgba(219,59,43,0.14)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <span className="font-sora text-[15px] font-normal text-white tablet:text-[16px]">{f}</span>
        </li>
      ))}
    </ul>
  );
}

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

  /* ── Waitlist: layout de 2 columnas (como contacto/enterprise) ── */
  if (variant === "waitlist") {
    return (
      <main className="relative min-h-screen bg-black">
        <T1Navbar />
        <section className="relative px-5 pb-24 pt-[120px] tablet:px-10" style={{ background: HERO_BG }}>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0" style={{ height: "26%", background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 70%, #000 100%)" }} />

          <div className="relative z-10 mx-auto grid max-w-[var(--max-w)] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16">
            {/* Left — pitch */}
            <div className="lg:sticky lg:top-[96px] lg:self-start">
              <h1 className="font-sora text-[30px] font-light text-white tablet:text-[46px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: 460 }}>
                {headline}
              </h1>
              <p className="font-inter text-[15px] font-light text-white/70 tablet:text-[17px]" style={{ lineHeight: 1.55, marginTop: 18, maxWidth: 440 }}>
                {description}
              </p>
              <Features features={features} />
              <RegionLinks />
            </div>

            {/* Right — form card */}
            <div className="rounded-[24px] border border-white/[0.08] bg-[#121013] p-6 tablet:p-8" style={{ boxShadow: "0 30px 80px -30px rgba(0,0,0,0.7)" }}>
              {done ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#16A34A]">
                    <svg width="26" height="26" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <p className="font-sora text-[22px] font-light text-white">You&apos;re on the list</p>
                  <p className="mt-2 max-w-[340px] font-inter text-[15px] font-light text-white/60">We&apos;ll let you know when T1 arrives in {country}.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-4">
                  <div>
                    <p className="font-sora text-[18px] font-normal text-white">Join the waitlist</p>
                    <p className="mt-1 font-inter text-[14px] font-light text-white/60">We don&apos;t operate in {country}{" "}yet — leave your details and we&apos;ll let you know when we arrive.</p>
                  </div>

                  <label className="block">
                    <span className={LABEL}>Email</span>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" aria-label="Email" className={FIELD} />
                  </label>

                  <label className="block">
                    <span className={LABEL}>Country</span>
                    <div className="relative">
                      <select aria-label="Country" value={country} onChange={(e) => setCountry(e.target.value)} className={`${FIELD} appearance-none pr-10`}>
                        {COUNTRIES.map((c) => <option key={c} value={c} className="bg-[#1D1D1D]">{c}</option>)}
                      </select>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/45"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  </label>

                  {/* Chips con contexto */}
                  <div>
                    <span className={LABEL}>What do you sell?<span className="text-white/35"> (optional)</span></span>
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
                  </div>

                  <label className="block">
                    <span className={LABEL}>Phone<span className="text-white/35"> (optional)</span></span>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+52 55 1234 5678" aria-label="Phone" className={FIELD} />
                  </label>

                  <label className="mt-1 flex cursor-pointer items-start gap-2.5 font-inter text-[13px] font-light text-white/60">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-[16px] w-[16px] shrink-0 accent-[#DB3B2B]" />
                    <span>I agree to the <a href="/privacidad" className="text-white/85 underline">privacy notice</a> and to be contacted by email or WhatsApp when T1 reaches my country.</span>
                  </label>

                  <button type="submit" disabled={!valid} className="mt-2 flex h-[52px] items-center justify-center rounded-[14px] bg-[#DB3B2B] font-inter text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-[#C0332A] disabled:bg-[#60160F] disabled:text-white/45 disabled:hover:bg-[#60160F]">
                    Join the waitlist
                  </button>

                  <p className="text-center font-inter text-[13px] font-light text-white/55">
                    Already have an account? <a href="/login" className="font-medium text-white/90 underline">Log in</a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        <T1Footer />
      </main>
    );
  }

  /* ── Coming-soon / not-available: layout centrado (sin formulario) ── */
  return (
    <main className="min-h-screen bg-black">
      <T1Navbar />
      <section
        className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-[120px] text-center"
        style={{ background: HERO_BG }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0" style={{ height: "38%", background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 60%, #000 100%)" }} />

        <div className="relative z-10 mx-auto flex w-full max-w-[620px] flex-col items-center">
          <h1 className="font-sora text-[34px] font-light text-white tablet:text-[52px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.08, maxWidth: 620 }}>
            {headline}
          </h1>
          <p className="font-inter text-[16px] font-light text-white/70 tablet:text-[18px]" style={{ lineHeight: 1.55, marginTop: 20, maxWidth: 480 }}>
            {description}
          </p>

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

          <div className="flex flex-col items-center">
            <Features features={features} />
          </div>

          {variant === "not-available" && (
            <a href="/usa" className="mt-9 inline-flex h-[52px] items-center justify-center rounded-[14px] border border-white/20 px-7 font-inter text-[15px] font-semibold text-white no-underline transition-colors duration-150 hover:border-white/45 hover:bg-white/[0.06]">
              See what&apos;s available in the U.S.
            </a>
          )}

          <RegionLinks />
        </div>
      </section>

      <T1Footer />
    </main>
  );
}
