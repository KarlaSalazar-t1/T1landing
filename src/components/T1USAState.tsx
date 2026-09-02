"use client";

import { useState, useEffect } from "react";
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

/* Lada + bandera por país (ISO-2). El default se preselecciona con el país que
   detectamos por IP; el usuario puede cambiarlo en el dropdown. */
const DIAL: { iso: string; flag: string; dial: string; name: string }[] = [
  { iso: "US", flag: "🇺🇸", dial: "+1", name: "United States" },
  { iso: "MX", flag: "🇲🇽", dial: "+52", name: "México" },
  { iso: "AR", flag: "🇦🇷", dial: "+54", name: "Argentina" },
  { iso: "BO", flag: "🇧🇴", dial: "+591", name: "Bolivia" },
  { iso: "BR", flag: "🇧🇷", dial: "+55", name: "Brazil" },
  { iso: "CA", flag: "🇨🇦", dial: "+1", name: "Canada" },
  { iso: "CL", flag: "🇨🇱", dial: "+56", name: "Chile" },
  { iso: "CO", flag: "🇨🇴", dial: "+57", name: "Colombia" },
  { iso: "CR", flag: "🇨🇷", dial: "+506", name: "Costa Rica" },
  { iso: "DO", flag: "🇩🇴", dial: "+1", name: "Dominican Republic" },
  { iso: "EC", flag: "🇪🇨", dial: "+593", name: "Ecuador" },
  { iso: "SV", flag: "🇸🇻", dial: "+503", name: "El Salvador" },
  { iso: "GT", flag: "🇬🇹", dial: "+502", name: "Guatemala" },
  { iso: "HN", flag: "🇭🇳", dial: "+504", name: "Honduras" },
  { iso: "NI", flag: "🇳🇮", dial: "+505", name: "Nicaragua" },
  { iso: "PA", flag: "🇵🇦", dial: "+507", name: "Panamá" },
  { iso: "PY", flag: "🇵🇾", dial: "+595", name: "Paraguay" },
  { iso: "PE", flag: "🇵🇪", dial: "+51", name: "Perú" },
  { iso: "ES", flag: "🇪🇸", dial: "+34", name: "Spain" },
  { iso: "UY", flag: "🇺🇾", dial: "+598", name: "Uruguay" },
  { iso: "VE", flag: "🇻🇪", dial: "+58", name: "Venezuela" },
];

/* Header mínimo para la waiting list: solo logo + Log in (sin nav ni
   "Comienza gratis", que abriría un alta de cuenta — WL-02). */
function MinimalHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 tablet:px-10">
      <a href="/" aria-label="T1" className="flex shrink-0 items-center">
        <svg width="40" height="39" viewBox="0 0 45 44" fill="none">
          <g clipPath="url(#t1clipmin)">
            <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985C31.7332 19.1985 31.7332 19.1985 31.7332 19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457C39.6169 19.2457 39.6169 19.1985 39.6169 19.1513C39.6169 19.1041 39.6169 19.1041 39.6169 19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#D93A26" />
            <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506C21.867 13.2034 21.867 13.0617 21.867 13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592C22.2919 12.2592 22.3391 12.2592 22.4335 12.2592H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781C32.6303 6.02781 32.6303 5.9806 32.6303 5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#D93A26" />
          </g>
          <defs><clipPath id="t1clipmin"><rect width="44.1244" height="43.0982" fill="white" /></clipPath></defs>
        </svg>
      </a>
      <a href="/login" className="font-inter text-[14px] font-medium text-white/80 no-underline transition-colors hover:text-white">
        Log in
      </a>
    </header>
  );
}

/* Región / cambiar país — reutilizado en ambos layouts. */
function RegionLinks() {
  return (
    <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2">
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
          <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[rgba(219,59,43,0.14)] tablet:h-[24px] tablet:w-[24px]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="tablet:h-[14px] tablet:w-[14px]"><path d="M5 12L10 17L19 7" stroke="#DB3B2B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <span className="font-sora text-[13px] font-normal text-white tablet:text-[16px]">{f}</span>
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
  const [iso, setIso] = useState("US"); // lada del teléfono; se ajusta por IP
  const [sells, setSells] = useState<"" | "products" | "services" | "both">("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState(false);

  /* Preselección por IP: detectamos el país del visitante y elegimos su lada y
     país por defecto. El usuario siempre puede cambiarlo. */
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch("https://ipapi.co/json/");
        if (!r.ok) return;
        const d = await r.json();
        const code = String(d?.country_code || "").toUpperCase();
        if (!alive || !code) return;
        const match = DIAL.find((x) => x.iso === code);
        if (match) {
          setIso(match.iso);
          if (COUNTRIES.includes(match.name)) setCountry(match.name);
        }
      } catch {
        /* sin red / bloqueado: se queda el default */
      }
    })();
    return () => { alive = false; };
  }, []);
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
        <MinimalHeader />
        <section className="relative px-5 pb-24 pt-[110px] tablet:px-10" style={{ background: HERO_BG }}>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0" style={{ height: "26%", background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 70%, #000 100%)" }} />

          <div className="relative z-10 mx-auto grid max-w-[var(--max-w)] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16">
            {/* Left — pitch */}
            <div>
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
            <div className="rounded-[24px] bg-[#121013] p-6 tablet:p-8" style={{ boxShadow: "0 30px 80px -30px rgba(0,0,0,0.7)" }}>
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

                  {/* País y celular en la misma línea */}
                  <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
                    <label className="block">
                      <span className={LABEL}>Country</span>
                      <div className="relative">
                        <select aria-label="Country" value={country} onChange={(e) => setCountry(e.target.value)} className={`${FIELD} appearance-none pr-10`}>
                          {COUNTRIES.map((c) => <option key={c} value={c} className="bg-[#1D1D1D]">{c}</option>)}
                        </select>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/45"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </label>
                    <label className="block">
                      <span className={LABEL}>Phone<span className="text-white/35"> (optional)</span></span>
                      <div className="flex h-[50px] items-center rounded-[12px] bg-[#1D1D1D] transition-shadow focus-within:ring-1 focus-within:ring-white/25">
                        <div className="relative shrink-0">
                          <select aria-label="Country code" value={iso} onChange={(e) => setIso(e.target.value)} className="h-[50px] appearance-none rounded-l-[12px] bg-transparent pl-4 pr-7 font-inter text-[15px] text-white outline-none">
                            {DIAL.map((d) => <option key={d.iso} value={d.iso} className="bg-[#1D1D1D]">{d.flag} {d.dial}</option>)}
                          </select>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/45"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                        <span aria-hidden className="h-[22px] w-px shrink-0 bg-white/12" />
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="55 1234 5678" aria-label="Phone" className="h-[50px] min-w-0 flex-1 rounded-r-[12px] bg-transparent px-3 font-inter text-[15px] text-white outline-none placeholder:text-[#8A8A8A]" />
                      </div>
                    </label>
                  </div>

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
