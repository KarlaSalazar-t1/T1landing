"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Tienda en línea — AI prompt panel.
 * Shows a typed prompt + spark icon, then transitions to a generated
 * tienda preview (storefront mockup).
 *
 * Stages:
 *   typing  → typewriter prompt
 *   loading → "Creando tu tienda..." with spinner
 *   ready   → storefront preview reveal
 */
const PROMPT_TEXT = "Quiero vender accesorios para celular y tecnología";
const FONT = "var(--font-manrope-var), sans-serif";

type Stage = "typing" | "loading" | "ready";

function Spark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5L9.4 6.6L14.5 8L9.4 9.4L8 14.5L6.6 9.4L1.5 8L6.6 6.6L8 1.5Z"
        fill="#DB3B2B"
      />
    </svg>
  );
}

export default function TiendaPromptPanel({ animate }: { animate: boolean }) {
  const [typed, setTyped] = useState("");
  const [stage, setStage] = useState<Stage>("typing");

  useEffect(() => {
    if (!animate) {
      setTyped("");
      setStage("typing");
      return;
    }
    let i = 0;
    let typingTimer: ReturnType<typeof setTimeout>;
    let loadingTimer: ReturnType<typeof setTimeout>;
    let readyTimer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (i <= PROMPT_TEXT.length) {
        setTyped(PROMPT_TEXT.slice(0, i));
        i++;
        typingTimer = setTimeout(tick, 32 + Math.random() * 20);
      } else {
        loadingTimer = setTimeout(() => {
          setStage("loading");
          readyTimer = setTimeout(() => setStage("ready"), 1400);
        }, 600);
      }
    };
    typingTimer = setTimeout(tick, 800);
    return () => {
      clearTimeout(typingTimer);
      clearTimeout(loadingTimer);
      clearTimeout(readyTimer);
    };
  }, [animate]);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ paddingTop: 12, paddingLeft: 12, fontFamily: FONT }}
    >
      {/* Glass border frame */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: "18px 0 0 0",
          background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.03) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), inset 1px 0 0 rgba(255,255,255,0.3)",
        }}
      />

      {/* Inner white panel with two stages */}
      <div
        className="relative flex h-full flex-col overflow-hidden bg-white"
        style={{ borderRadius: "14px 0 0 0" }}
      >
        {/* Top: prompt input ALWAYS visible */}
        <div className="px-6" style={{ paddingTop: 24, paddingBottom: 16 }}>
          <span
            className="inline-flex w-fit items-center gap-1.5 rounded-full font-inter text-[11px] font-semibold"
            style={{
              padding: "5px 12px 5px 9px",
              background: "rgba(219,59,43,0.08)",
              color: "#DB3B2B",
              marginBottom: 10,
            }}
          >
            <Spark size={12} />
            Crea tu tienda con IA
          </span>

          {/* Prompt input */}
          <div
            className="rounded-[14px] border bg-white"
            style={{
              borderColor: stage === "typing" ? "#DB3B2B" : "rgba(0,0,0,0.08)",
              padding: "12px 14px",
              boxShadow: stage === "typing" ? "0 0 0 3px rgba(219,59,43,0.08)" : "0 0 0 0 transparent",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
          >
            <span className="font-inter text-[13px] text-black/85" style={{ lineHeight: 1.4 }}>
              {typed}
              {stage === "typing" && (
                <span
                  className="ml-0.5 inline-block w-[2px] bg-[#DB3B2B]"
                  style={{ height: "0.9em", verticalAlign: "text-bottom", animation: "blink 0.7s step-end infinite" }}
                />
              )}
            </span>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-inter text-[10px] text-black/35">
                {typed.length}/500
              </span>
              <span
                className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-white"
                style={{ background: "#DB3B2B" }}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M8 13V3M8 3L4 7M8 3L12 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: loading or generated tienda preview */}
        <div className="relative flex-1 px-6 pb-5">
          {stage === "loading" && (
            <div
              className="flex h-full flex-col items-center justify-center gap-3"
              style={{ animation: "fadeSlideIn 0.4s ease-out" }}
            >
              <div
                className="flex h-[44px] w-[44px] items-center justify-center"
                style={{ animation: "spin 1.2s linear infinite" }}
              >
                <Spark size={26} />
              </div>
              <span className="font-inter text-[12px] font-medium text-black/65">
                Creando tu tienda…
              </span>
            </div>
          )}

          {stage === "ready" && (
            <div
              className="relative flex h-full flex-col overflow-hidden rounded-[12px] border border-black/[0.06] bg-white"
              style={{ animation: "fadeSlideIn 0.5s ease-out" }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 border-b border-black/[0.05] bg-[#FAFAFA] px-3 py-1.5">
                <div className="h-[6px] w-[6px] rounded-full bg-[#FF5F57]" />
                <div className="h-[6px] w-[6px] rounded-full bg-[#FEBC2E]" />
                <div className="h-[6px] w-[6px] rounded-full bg-[#28C840]" />
                <div className="ml-2 flex-1 truncate rounded-[4px] bg-white px-2 py-0.5 text-[8px] text-black/40">
                  techstore.t1pages.com
                </div>
              </div>

              {/* Hero band */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ background: "linear-gradient(120deg, #0F172A 0%, #1E293B 100%)" }}
              >
                <div>
                  <p className="font-sora text-[11px] font-semibold text-white">TechStore</p>
                  <p className="font-inter text-[8px] text-white/65">Accesorios para celular y tecnología</p>
                </div>
                <span
                  className="rounded-full bg-[#DB3B2B] px-2 py-0.5 font-inter text-[7px] font-bold text-white"
                >
                  Comprar
                </span>
              </div>

              {/* Product grid */}
              <div className="grid grid-cols-3 gap-1.5 p-2">
                {[
                  { img: "/img/tenis-transparente.png", name: "Funda Pro", price: "$249" },
                  { img: "/img/tenis-transparente.png", name: "Cargador 20W", price: "$399" },
                  { img: "/img/tenis-transparente.png", name: "Audífonos BT", price: "$549" },
                  { img: "/img/tenis-transparente.png", name: "PowerBank", price: "$199" },
                  { img: "/img/tenis-transparente.png", name: "MagSafe", price: "$329" },
                  { img: "/img/tenis-transparente.png", name: "Cable USB-C", price: "$89" },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-[5px] border border-black/[0.05] bg-white"
                    style={{ animation: `fadeSlideIn 0.4s ease-out ${0.2 + i * 0.07}s both` }}
                  >
                    <div className="flex h-[42px] items-center justify-center bg-[#F7F7F7]">
                      <Image src={p.img} alt="" width={40} height={28} className="object-contain" />
                    </div>
                    <div style={{ padding: "4px 6px" }}>
                      <p className="truncate font-inter text-[8px] font-medium text-black">{p.name}</p>
                      <p className="font-inter text-[8px] font-bold text-black">{p.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer pill */}
              <div className="mt-auto flex items-center justify-center gap-1 border-t border-black/[0.04] py-1.5">
                <Spark size={9} />
                <span className="font-inter text-[8px] font-semibold text-black/55">
                  Tienda creada en segundos con T1
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
