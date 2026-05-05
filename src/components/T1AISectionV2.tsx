"use client";

import Image from "next/image";

export default function T1AISectionV2() {
  return (
    <section className="bg-white" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="mx-auto max-w-[var(--max-w)] px-5 tablet:px-6">

        <style jsx>{`
          .ai-v2-grid {
            display: grid;
            grid-template-columns: repeat(15, 1fr);
            grid-template-rows: repeat(9, clamp(38px, 4.6vw, 55px));
            gap: 16px;
            position: relative;
          }
          .ai-v2-tl { grid-column: 1 / 5; grid-row: 1 / 5; }
          .ai-v2-bl { grid-column: 1 / 5; grid-row: 5 / 10; }
          .ai-v2-title { grid-column: 5 / 12; grid-row: 1 / 5; }
          .ai-v2-bottom { grid-column: 5 / 12; grid-row: 5 / 10; }
          .ai-v2-tr { grid-column: 12 / 16; grid-row: 1 / 7; }
          .ai-v2-br { grid-column: 12 / 16; grid-row: 7 / 10; }
          .ai-v2-sparkle-float {
            position: absolute;
            left: 50%;
            top: calc(50% - 10px);
            transform: translate(-50%, -50%);
            z-index: 20;
            pointer-events: none;
          }
          @media (max-width: 767px) {
            .ai-v2-grid {
              display: flex;
              flex-direction: column;
              gap: 12px;
            }
            .ai-v2-sparkle-float { display: none; }
            .ai-v2-title { display: none; }
            .ai-v2-mobile-title { display: block; }
            .ai-v2-grid > div p { font-size: 14px !important; }
            .ai-v2-bottom .ai-v2-bottom-photos {
              max-width: 100% !important;
              margin-top: 12px;
            }
          }
        `}</style>

        {/* Mobile title — outside the grid */}
        <div className="ai-v2-mobile-title hidden" style={{ textAlign: "center", marginBottom: 24 }}>
          <div className="mb-3 flex justify-center">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <path d="M14 3L16.5 10.5L24 13L16.5 15.5L14 23L11.5 15.5L4 13L11.5 10.5L14 3Z" stroke="#8B5CF6" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(139,92,246,0.08)" />
            </svg>
          </div>
          <h2 className="font-sora text-[24px] font-light text-black" style={{ letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 8 }}>
            La <span style={{ color: "#8B5CF6" }}>IA</span> es la base desde el primer día.
          </h2>
          <p className="font-inter text-[14px] font-light text-black/50" style={{ lineHeight: 1.5 }}>
            No es una función extra: está integrada en tu tienda, pagos, envíos y seguridad para ayudarte a operar y crecer.
          </p>
        </div>

        <div className="ai-v2-grid">

          {/* ── TL: Crea tu tienda (4×3) ── */}
          <div className="ai-v2-tl group flex flex-col overflow-hidden rounded-[20px] border border-black/[0.06] bg-white transition-all duration-300" style={{ padding: "20px 20px" }}>
            <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 6 }}>Crea tu tienda</h3>
            <p className="font-inter text-[12px] font-normal leading-relaxed text-black/70" style={{ marginBottom: 12 }}>Describe tu negocio y la IA genera tu tienda lista para vender en menos de 2 minutos.</p>
            <div>
              <div className="flex items-end justify-between rounded-[8px] border border-black/[0.06] bg-white px-3 py-3.5">
                <p className="font-inter text-[10px] text-black/35">Quiero vender muebles...</p>
                <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#E26153] transition-transform duration-300 group-hover:scale-125">
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M5 8V2M5 2L2.5 4.5M5 2L7.5 4.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
            </div>
          </div>

          {/* ── BL: Crea productos (4×6) ── */}
          <div className="ai-v2-bl group flex flex-col overflow-hidden rounded-[20px] border border-black/[0.06] bg-white transition-all duration-300" style={{ padding: "20px 20px 0" }}>
            <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 4 }}>Crea tus productos</h3>
            <p className="font-inter text-[12px] font-normal text-black/70" style={{ marginBottom: 10 }}>Sube una foto y la IA genera título, descripción y variantes automáticamente.</p>
            <div className="flex-1 overflow-hidden rounded-t-[10px] border border-b-0 border-black/[0.05] bg-white" style={{ padding: "12px 12px 0" }}>
              <p className="text-[9px] font-semibold text-black/50">Fotos</p>
              <div className="mt-1 mb-2 flex gap-2">
                <div className="flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-[6px] border border-black/[0.06]">
                  <Image src="/img/tenis-transparente.png" alt="" width={44} height={44} className="object-contain" />
                </div>
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[6px] border border-dashed border-black/[0.08]">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 8h8M8 4v8" stroke="rgba(0,0,0,0.12)" strokeWidth="1" strokeLinecap="round" /></svg>
                </div>
              </div>
              <p className="text-[8px] font-semibold text-black/50">Nombre</p>
              <div className="mt-0.5 mb-1.5 rounded-[3px] border border-black/[0.05] px-2 py-1">
                <span className="text-[10px] text-black/35">Tenis clásicos blanco</span>
              </div>
              <p className="text-[8px] font-semibold text-black/50">Descripción</p>
              <div className="mt-0.5 rounded-[3px] border border-black/[0.05] px-2 py-1">
                <span className="text-[9px] text-black/25">Diseño minimalista y cómodo...</span>
              </div>
            </div>
          </div>

          {/* ── Title (7×4) — white bg, clean ── */}
          <div className="ai-v2-title relative flex flex-col items-center justify-center overflow-hidden rounded-[24px] border border-black/[0.06] bg-white" style={{ padding: "32px 20px" }}>
            <h2 className="relative z-10 text-center font-sora text-[22px] font-light text-black tablet:text-[28px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 8 }}>
              La <span style={{ color: "#8B5CF6" }}>IA</span> es la base desde el primer día.
            </h2>
            <p className="relative z-10 text-center font-inter text-[13px] font-normal text-black/55 tablet:text-[14px]" style={{ maxWidth: 520, lineHeight: 1.5 }}>
              No es una función extra: está integrada en tu tienda, pagos, envíos y seguridad para ayudarte a operar y crecer.
            </p>
          </div>

          {/* ── Bottom center: Personaliza (7×5) — text left, image right ── */}
          <div className="ai-v2-bottom group relative flex flex-col overflow-hidden rounded-[20px] border border-black/[0.06] bg-white transition-all duration-300" style={{ padding: "20px 20px" }}>
            <div className="flex h-full flex-col tablet:flex-row tablet:items-center tablet:gap-4">
              {/* Text left */}
              <div className="ai-v2-bottom-text flex-1">
                <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 4 }}>Personaliza tu tienda</h3>
                <p className="font-inter text-[12px] font-normal leading-relaxed text-black/70">Genera imágenes de producto, edita banners y personaliza textos con inteligencia artificial.</p>
              </div>
              {/* Image right */}
              <div className="ai-v2-bottom-photos flex shrink-0 items-center justify-center" style={{ maxWidth: 240 }}>
                <Image src="/img/personaliza.png" alt="Personaliza tu tienda" width={220} height={140} className="object-contain" />
              </div>
            </div>
          </div>

          {/* ── TR: Enrutamiento (4×6) — T1 logo → courier logo nodes ── */}
          <div className="ai-v2-tr group flex flex-col overflow-hidden rounded-[20px] border border-black/[0.06] bg-white transition-all duration-300" style={{ padding: "20px 16px" }}>
            <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 4 }}>Enrutamiento inteligente</h3>
            <p className="font-inter text-[12px] font-normal leading-relaxed text-black/70" style={{ marginBottom: 8 }}>Nuestra IA elige la paquetería más rápida y económica para cada envío.</p>
            {/* T1 logo → lines → courier icons — single tight row, no gaps */}
            <div className="relative flex-1" style={{ minHeight: 90 }}>
              {/* All elements positioned absolutely for pixel-perfect alignment */}
              {/* T1 logo — vertically centered at left edge */}
              <div className="absolute" style={{ left: 0, top: "50%", transform: "translateY(-50%)" }}>
                <svg width="22" height="20" viewBox="0 0 45 44" fill="none">
                  <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457V19.1513V19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#D93A26" />
                  <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592H22.4335H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#D93A26" />
                </svg>
              </div>
              {/* Courier icons — vertically at top/center/bottom, touching right edge */}
              <div className="absolute" style={{ right: 0, top: 0 }}>
                <Image src="/img/icons/fedex-logo.svg" alt="FedEx" width={32} height={20} className="object-contain" />
              </div>
              <div className="absolute" style={{ right: 0, top: "50%", transform: "translateY(-50%)" }}>
                <Image src="/img/dhl-iso.svg" alt="DHL" width={32} height={20} className="object-contain" />
              </div>
              <div className="absolute" style={{ right: 0, bottom: 0 }}>
                <Image src="/img/99min-iso.svg" alt="99min" width={32} height={20} className="object-contain" />
              </div>
              {/* SVG lines + dots: from T1 edge to courier edge, percentage-based */}
              <svg className="absolute" style={{ left: 24, top: 0, right: 34, bottom: 0, width: "calc(100% - 58px)", height: "100%" }} viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
                <path d="M0 50 C25 50, 35 11, 100 11" stroke="rgba(226,97,83,0.2)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
                <path d="M0 50 C25 50, 35 50, 100 50" stroke="rgba(226,97,83,0.25)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
                <path d="M0 50 C25 50, 35 89, 100 89" stroke="rgba(226,97,83,0.2)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
              </svg>
              {/* Animated dots — HTML divs to avoid SVG distortion */}
              <div className="absolute" style={{ left: 24, top: 0, right: 34, bottom: 0 }}>
                <div className="h-[7px] w-[7px] rounded-full bg-[#E26153]/60" style={{ position: "absolute", animation: "routeDot1 2.5s ease-in-out infinite" }} />
                <div className="h-[7px] w-[7px] rounded-full bg-[#E26153]/70" style={{ position: "absolute", animation: "routeDot2 2s ease-in-out infinite" }} />
                <div className="h-[7px] w-[7px] rounded-full bg-[#E26153]/60" style={{ position: "absolute", animation: "routeDot3 2.8s ease-in-out infinite" }} />
              </div>
            </div>
          </div>

          {/* ── BR: Análisis de riesgo (4×4) — description + gauge in same row ── */}
          <div className="ai-v2-br group flex flex-col overflow-hidden rounded-[20px] border border-black/[0.06] bg-white transition-all duration-300" style={{ padding: "20px 20px" }}>
            <h3 className="font-sora text-[18px] font-normal text-black" style={{ marginBottom: 8 }}>Análisis de riesgo</h3>
            <div className="flex items-center gap-3">
              <p className="flex-1 font-inter text-[12px] font-normal leading-relaxed text-black/70">IA que evalúa el riesgo crediticio de cada transacción en tiempo real.</p>
              <svg width="70" height="70" viewBox="0 0 110 110" fill="none" className="shrink-0 transition-transform duration-500 group-hover:scale-105">
                <circle cx="55" cy="55" r="48" stroke="rgba(0,0,0,0.04)" strokeWidth="6" />
                <circle cx="55" cy="55" r="48" stroke="#E26153" strokeWidth="6" strokeLinecap="round" strokeDasharray="260 302" transform="rotate(-90 55 55)" />
                <circle cx="55" cy="55" r="36" stroke="rgba(0,0,0,0.03)" strokeWidth="5" />
                <circle cx="55" cy="55" r="36" stroke="#8B5CF6" strokeWidth="5" strokeLinecap="round" strokeDasharray="150 226" transform="rotate(-90 55 55)" />
                <circle cx="55" cy="55" r="25" stroke="rgba(0,0,0,0.02)" strokeWidth="4" />
                <circle cx="55" cy="55" r="25" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round" strokeDasharray="90 157" transform="rotate(-90 55 55)" />
                <text x="55" y="60" textAnchor="middle" style={{ fontSize: 20, fontWeight: 700, fill: "rgba(0,0,0,0.7)" }}>78</text>
              </svg>
            </div>
          </div>

          {/* ── Sparkle circle — orbiting dots follow the ring contour ── */}
          {/* Hidden per request — kept in DOM for future re-enable */}
          <div className="ai-v2-sparkle-float" style={{ display: "none" }}>
            <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
              <div className="absolute rounded-full bg-white" style={{ width: 120, height: 120 }} />
              <div className="absolute rounded-full" style={{ width: 108, height: 108, border: "1px solid rgba(139,92,246,0.12)" }} />
              <div className="absolute rounded-full" style={{ width: 72, height: 72, border: "1px solid rgba(139,92,246,0.08)" }} />
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" className="relative z-10 animate-pulse-soft">
                <path d="M24 6L28 18L40 22L28 26L24 38L20 26L8 22L20 18L24 6Z" stroke="#8B5CF6" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(139,92,246,0.1)" />
                <path d="M38 8L39.5 12.5L44 14L39.5 15.5L38 20L36.5 15.5L32 14L36.5 12.5L38 8Z" stroke="#8B5CF6" strokeWidth="0.8" strokeLinejoin="round" fill="rgba(139,92,246,0.05)" />
              </svg>
              {/* Dots orbiting on the outer ring (r=54) */}
              <div className="absolute" style={{ width: 108, height: 108, animation: "orbitSpin 20s linear infinite" }}>
                <div className="h-[5px] w-[5px] rounded-full bg-[#8B5CF6]/35" style={{ position: "absolute", top: -2, left: 51, transform: "translateX(-50%)" }} />
                <div className="h-[4px] w-[4px] rounded-full bg-[#E26153]/30" style={{ position: "absolute", top: 51, right: -2 }} />
                <div className="h-[4px] w-[4px] rounded-full bg-[#8B5CF6]/25" style={{ position: "absolute", bottom: -2, left: 51, transform: "translateX(-50%)" }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
