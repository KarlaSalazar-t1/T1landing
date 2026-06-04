"use client";

import { useEffect, useRef, useState } from "react";

const MAX_PROMPT = 500;
const SIGNUP_BASE = "https://t1.com/mx/tienda";

const TYPING_PLACEHOLDERS = [
  "Quiero vender maquillaje, skincare y productos de belleza",
  "Quiero vender galletas, pasteles y postres hechos por mí",
  "Quiero vender accesorios para celular y tecnología",
  "Quiero vender comida y accesorios para mascotas",
  "Quiero vender decoración y artículos para el hogar",
  "Quiero vender ropa deportiva y artículos fitness",
];

/**
 * T1AISectionV2 — focused AI hero.
 *
 * Reduced from a 5-slide feature carousel to a single, oversized prompt input
 * (CEO: "esconde las demás features, que solo quede el input… en grande y que
 * quede claro que puede hacer tu tienda en línea"). The bright white prompt
 * panel is the focal point on the warm-dark P3 background; the rotating
 * placeholder demonstrates what to type and submits to the AI store builder.
 */
export default function T1AISectionV2() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [prompt, setPrompt] = useState("");

  // Rotating typing placeholder — pauses while the user is typing.
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    if (prompt.length > 0) return;

    let textIdx = 0;
    let charIdx = 0;
    let phase: "typing" | "pause" | "deleting" = "typing";
    let timer = 0;

    const tick = () => {
      const current = TYPING_PLACEHOLDERS[textIdx];
      if (phase === "typing") {
        if (charIdx < current.length) {
          charIdx++;
          ta.placeholder = current.slice(0, charIdx);
          timer = window.setTimeout(tick, 32);
        } else {
          phase = "pause";
          timer = window.setTimeout(tick, 1800);
        }
      } else if (phase === "pause") {
        phase = "deleting";
        timer = window.setTimeout(tick, 0);
      } else {
        if (charIdx > 0) {
          charIdx--;
          ta.placeholder = current.slice(0, charIdx);
          timer = window.setTimeout(tick, 18);
        } else {
          textIdx = (textIdx + 1) % TYPING_PLACEHOLDERS.length;
          phase = "typing";
          timer = window.setTimeout(tick, 250);
        }
      }
    };

    timer = window.setTimeout(tick, 400);
    return () => window.clearTimeout(timer);
  }, [prompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = prompt.trim();
    const target = trimmed
      ? `${SIGNUP_BASE}?prompt=${encodeURIComponent(trimmed)}`
      : SIGNUP_BASE;
    window.open(target, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative" style={{ background: "#161311" }}>
      <div className="ai-section-bg relative flex w-full flex-col overflow-hidden">
        {/* Decorative glow blobs — warm color pops on the dark base. */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute"
            style={{
              top: "-10%",
              left: "-8%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(219,59,43,0.22) 0%, transparent 60%)",
              filter: "blur(90px)",
            }}
          />
          <div
            className="absolute"
            style={{
              top: "20%",
              right: "-12%",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,140,110,0.16) 0%, transparent 60%)",
              filter: "blur(100px)",
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: "-25%",
              left: "35%",
              width: 450,
              height: 450,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,150,120,0.12) 0%, transparent 55%)",
              filter: "blur(70px)",
            }}
          />
        </div>

        <div className="relative mx-auto flex w-full max-w-[var(--max-w)] flex-col items-center px-5 py-16 text-center tablet:px-6 tablet:py-24">
          {/* Big, clear headline — AI builds your online store. */}
          <h2
            className="font-sora text-[30px] font-light text-white tablet:text-[44px] lg:text-[56px]"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 860 }}
          >
            Crea tu tienda en línea con{" "}
            <span style={{ color: "#FF6F5E" }}>IA</span>
          </h2>
          <p
            className="mt-5 font-inter text-[16px] font-normal text-white/65 tablet:text-[19px]"
            style={{ letterSpacing: "-0.01em", lineHeight: 1.45, maxWidth: 600 }}
          >
            Describe lo que vendes y nuestra inteligencia artificial construye tu
            tienda completa en segundos.
          </p>

          {/* Oversized prompt panel — the single focal point of the section. */}
          <form
            onSubmit={handleSubmit}
            className="ai-prompt-form mx-auto mt-9 w-full max-w-[680px] rounded-[22px] border bg-white/95 text-left backdrop-blur-sm transition-all duration-200 focus-within:border-[#DB3B2B] tablet:mt-12"
            style={{
              borderColor: "rgba(0,0,0,0.10)",
              padding: "22px 22px 18px",
              boxShadow:
                "0 30px 80px -24px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value.slice(0, MAX_PROMPT))}
              placeholder=""
              rows={3}
              maxLength={MAX_PROMPT}
              aria-label="Describe tu negocio"
              className="w-full resize-none border-none bg-transparent font-inter text-[16px] text-black outline-none placeholder:text-black/40 tablet:text-[18px]"
              style={{ minHeight: 96, lineHeight: 1.5 }}
            />
            <div className="mt-1 flex items-center justify-between gap-3">
              <span className="font-inter text-[12px] text-black/40">
                {prompt.length}/{MAX_PROMPT}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Describir por voz"
                  title="Describir por voz"
                  className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-black/10 bg-white text-black/55 transition-all duration-200 hover:border-black/20 hover:text-black"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="6" y="2" width="4" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M3.5 8C3.5 10.4853 5.51472 12.5 8 12.5C10.4853 12.5 12.5 10.4853 12.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M8 12.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <button
                  type="submit"
                  disabled={!prompt.trim()}
                  className="inline-flex h-[42px] items-center gap-2 rounded-full bg-[#DB3B2B] px-5 font-inter text-[14px] font-semibold text-white transition-all duration-200 hover:bg-[#C0332A] disabled:cursor-not-allowed disabled:opacity-40 tablet:text-[15px]"
                >
                  Crear mi tienda
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </form>

          {/* Reassurance line */}
          <p className="mt-5 font-inter text-[13px] font-normal text-white/40">
            Gratis · Sin tarjeta · Lista en minutos
          </p>
        </div>
      </div>
    </section>
  );
}
