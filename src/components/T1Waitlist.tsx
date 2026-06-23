"use client";

import { useState } from "react";
import T1Navbar from "@/components/T1Navbar";
import T1Footer from "@/components/T1Footer";

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
      {/* Shared navbar (carries the T1 logo) — same header as the landing. */}
      <T1Navbar />

      {/* Waitlist hero — IA-style red/blue blobs on black. The country selector
          lives in the footer below (same place as the rest of the site), not in
          a top-corner chip. */}
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
          className="font-sora text-[36px] font-light text-white tablet:text-[54px]"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.05, marginTop: 22 }}
        >
          Acceso anticipado
          <br />
          exclusivo
        </h1>

        <p
          className="font-inter text-[16px] font-light text-white/70 tablet:text-[18px]"
          style={{ lineHeight: 1.55, marginTop: 18, maxWidth: 460 }}
        >
          Regístrate hoy y obtén descuentos de lanzamiento y acompañamiento durante tu integración.
        </p>

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
