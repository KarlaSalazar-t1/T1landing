"use client";

import { useState } from "react";
import T1Footer from "@/components/T1Footer";

/* ── T1 logo (coral wordmark) ── */
function T1Logo() {
  return (
    <svg width="40" height="39" viewBox="0 0 45 44" fill="none" aria-label="T1">
      <path
        d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457V19.1513V19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z"
        fill="#E2614F"
      />
      <path
        d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592H22.4335H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z"
        fill="#E2614F"
      />
    </svg>
  );
}

export default function T1Waitlist() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const valid = /.+@.+\..+/.test(email.trim());

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setDone(true);
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Minimal header — just the logo. No nav / login / sign-up CTAs since the
          product isn't available in this country yet (they'd be dead ends). The
          country selector stays in the footer below. */}
      <header className="absolute left-0 right-0 top-0 z-20 mx-auto flex w-full max-w-[var(--max-w)] items-center px-5 pt-7 tablet:px-10">
        <a href="/" aria-label="Inicio">
          <T1Logo />
        </a>
      </header>

      {/* Waitlist hero — IA-style red/blue blobs on black. The country selector
          lives in the footer below (same place as the rest of the site). */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-[110px] text-center">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute" style={{ top: "-12%", left: "0%", width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(219,59,43,0.34) 0%, transparent 62%)", filter: "blur(100px)" }} />
          <div className="absolute" style={{ top: "-6%", right: "-8%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,120,255,0.30) 0%, transparent 62%)", filter: "blur(100px)" }} />
          <div className="absolute" style={{ bottom: "-14%", left: "38%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 64%)", filter: "blur(120px)" }} />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[620px] flex-col items-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-1.5 font-inter text-[12px] font-medium text-white/75">
          <span className="h-[6px] w-[6px] rounded-full bg-[#E2614F]" />
          Pronto en Colombia
        </span>

        <h1
          className="font-sora text-[34px] font-light text-white tablet:text-[52px]"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.08, marginTop: 22, maxWidth: 620 }}
        >
          Todo tu negocio en un solo lugar
        </h1>

        <div
          className="font-inter text-[16px] font-light text-white/70 tablet:text-[18px]"
          style={{ lineHeight: 1.55, marginTop: 20 }}
        >
          <p className="tablet:whitespace-nowrap">Vende en línea, cobra y envía desde una sola plataforma.</p>
          <p className="mx-auto" style={{ marginTop: 14, maxWidth: 460 }}>
            Aún no llegamos a Colombia, pero muy pronto: regístrate y sé de los primeros.
          </p>
        </div>

        {done ? (
          <div
            className="mt-9 w-full rounded-[16px] border border-[#16A34A]/30 px-6 py-7 text-center"
            style={{ maxWidth: 460, background: "rgba(34,197,94,0.08)" }}
          >
            <div className="mx-auto mb-3 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#16A34A]">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-sora text-[18px] font-normal text-white">¡Estás en la lista!</p>
            <p className="mt-1.5 font-inter text-[14px] font-light text-white/65">
              Te avisaremos en cuanto T1 llegue a Colombia.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-9 flex w-full flex-col gap-3" style={{ maxWidth: 460 }}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo para empezar"
              className="h-[54px] w-full rounded-[14px] border border-white/15 bg-white/[0.04] px-5 font-inter text-[15px] text-white outline-none transition-colors placeholder:text-white/40 focus:border-white/40"
            />
            <button
              type="submit"
              disabled={!valid}
              className="h-[54px] w-full rounded-[14px] bg-[#DB3B2B] font-inter text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-[#C0332A] disabled:cursor-not-allowed disabled:bg-[#F1B0A9] disabled:hover:bg-[#F1B0A9]"
            >
              Unirme a la lista de espera
            </button>
          </form>
        )}

        {/* Back to the IP-detected country (set dynamically; México shown as default). */}
        <a
          href="/"
          className="mt-9 inline-flex items-center gap-1.5 font-inter text-[13px] font-medium text-white/55 no-underline transition-colors hover:text-white/90"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Volver a México
        </a>
        </div>
      </section>

      {/* Shared footer (carries the country/language selector at the bottom). */}
      <T1Footer />
    </main>
  );
}
