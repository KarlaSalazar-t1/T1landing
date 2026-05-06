"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function T1AISectionV2() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered reveal — IntersectionObserver toggles .is-visible
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    root.querySelectorAll("[data-ai-card]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div ref={rootRef} className="mx-auto max-w-[var(--max-w)] px-5 tablet:px-6">

        <style jsx>{`
          [data-ai-card] {
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          }
          [data-ai-card].is-visible {
            opacity: 1;
            transform: translateY(0);
          }
          [data-ai-card][data-i="0"] { transition-delay: 0ms; }
          [data-ai-card][data-i="1"] { transition-delay: 80ms; }
          [data-ai-card][data-i="2"] { transition-delay: 160ms; }
          [data-ai-card][data-i="3"] { transition-delay: 220ms; }
          [data-ai-card][data-i="4"] { transition-delay: 280ms; }
          [data-ai-card][data-i="5"] { transition-delay: 340ms; }
        `}</style>

        {/* 2-column grid: title at top-left, 5 cards distributed.
            Cards are shadow-only (no stroke), animated on scroll. */}
        <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2 tablet:gap-6">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-5 tablet:gap-6">

            {/* Title — no card chrome, lives in top-left cell */}
            <div data-ai-card data-i="0" className="flex flex-col" style={{ paddingTop: 16, paddingBottom: 8 }}>
              <div className="mb-3 flex">
                <svg width="36" height="36" viewBox="0 0 28 28" fill="none">
                  <path d="M14 3L16.5 10.5L24 13L16.5 15.5L14 23L11.5 15.5L4 13L11.5 10.5L14 3Z" stroke="#DB3B2B" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(219,59,43,0.10)" />
                </svg>
              </div>
              <h2
                className="font-sora text-[28px] font-light text-black tablet:text-[36px] lg:text-[44px]"
                style={{ letterSpacing: "-1.32px", lineHeight: 1.15, marginBottom: 14 }}
              >
                La <span style={{ color: "#DB3B2B" }}>IA</span> es la base desde el primer día.
              </h2>
              <p
                className="font-inter text-[16px] font-light text-black/55 tablet:text-[17px]"
                style={{ lineHeight: 1.55, maxWidth: 460 }}
              >
                No es una función extra: está integrada en todo T1 para ayudarte a operar y crecer.
              </p>
            </div>

            {/* Personaliza — shadow card, image overlapping below */}
            <div data-ai-card data-i="2" className="group relative flex flex-col overflow-hidden rounded-[20px] bg-white transition-all duration-300" style={{ padding: "28px 30px 0", boxShadow: "0 0 25px 2px rgba(0,0,0,0.06)" }}>
              <h3 className="font-sora text-[20px] font-normal text-black tablet:text-[22px]" style={{ marginBottom: 6 }}>Personaliza tu tienda</h3>
              <p className="font-inter text-[14px] font-light leading-relaxed text-black/65 tablet:text-[15px]" style={{ marginBottom: 16 }}>Genera imágenes de producto, edita banners y personaliza textos con inteligencia artificial.</p>
              <div className="flex flex-1 items-center justify-center" style={{ minHeight: 220 }}>
                <Image src="/img/personaliza.png" alt="Personaliza tu tienda" width={360} height={220} className="object-contain" style={{ maxHeight: 240, width: "auto", marginBottom: 12 }} />
              </div>
            </div>

            {/* Enrutamiento inteligente — taller card, image at 70% width */}
            <div data-ai-card data-i="4" className="group flex flex-col overflow-hidden rounded-[20px] bg-white transition-all duration-300" style={{ padding: "28px 30px", boxShadow: "0 0 25px 2px rgba(0,0,0,0.06)", minHeight: 320 }}>
              <h3 className="font-sora text-[20px] font-normal text-black tablet:text-[22px]" style={{ marginBottom: 6 }}>Enrutamiento inteligente</h3>
              <p className="font-inter text-[14px] font-light leading-relaxed text-black/65 tablet:text-[15px]" style={{ marginBottom: 18 }}>Nuestra IA elige la paquetería más rápida y económica para cada envío.</p>
              {/* Diagram — 70% width centered */}
              <div className="relative mx-auto w-[70%] flex-1" style={{ minHeight: 140 }}>
                {/* T1 logo — vertically centered at left edge */}
                <div className="absolute" style={{ left: 0, top: "50%", transform: "translateY(-50%)" }}>
                  <svg width="36" height="34" viewBox="0 0 45 44" fill="none">
                    <path d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985V19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457V19.1513V19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z" fill="#D93A26" />
                    <path d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506V13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592H22.4335H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781V5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z" fill="#D93A26" />
                  </svg>
                </div>
                <div className="absolute" style={{ right: 0, top: 0 }}>
                  <Image src="/img/icons/fedex-logo.svg" alt="FedEx" width={48} height={30} className="object-contain" />
                </div>
                <div className="absolute" style={{ right: 0, top: "50%", transform: "translateY(-50%)" }}>
                  <Image src="/img/dhl-iso.svg" alt="DHL" width={48} height={30} className="object-contain" />
                </div>
                <div className="absolute" style={{ right: 0, bottom: 0 }}>
                  <Image src="/img/99min-iso.svg" alt="99min" width={48} height={30} className="object-contain" />
                </div>
                <svg className="absolute" style={{ left: 30, top: 0, right: 40, bottom: 0, width: "calc(100% - 70px)", height: "100%" }} viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
                  <path d="M0 50 C25 50, 35 11, 100 11" stroke="rgba(226,97,83,0.2)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
                  <path d="M0 50 C25 50, 35 50, 100 50" stroke="rgba(226,97,83,0.25)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
                  <path d="M0 50 C25 50, 35 89, 100 89" stroke="rgba(226,97,83,0.2)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
                </svg>
                <div className="absolute" style={{ left: 30, top: 0, right: 40, bottom: 0 }}>
                  <div className="h-[7px] w-[7px] rounded-full bg-[#E26153]/60" style={{ position: "absolute", animation: "routeDot1 2.5s ease-in-out infinite" }} />
                  <div className="h-[7px] w-[7px] rounded-full bg-[#E26153]/70" style={{ position: "absolute", animation: "routeDot2 2s ease-in-out infinite" }} />
                  <div className="h-[7px] w-[7px] rounded-full bg-[#E26153]/60" style={{ position: "absolute", animation: "routeDot3 2.8s ease-in-out infinite" }} />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-5 tablet:gap-6">

            {/* Crea tu tienda — prompt input */}
            <div data-ai-card data-i="1" className="group flex flex-col overflow-hidden rounded-[20px] bg-white transition-all duration-300" style={{ padding: "28px 30px", boxShadow: "0 0 25px 2px rgba(0,0,0,0.06)" }}>
              <h3 className="font-sora text-[20px] font-normal text-black tablet:text-[22px]" style={{ marginBottom: 6 }}>Crea tu tienda</h3>
              <p className="font-inter text-[14px] font-light leading-relaxed text-black/65 tablet:text-[15px]" style={{ marginBottom: 18 }}>Describe tu negocio y la IA genera tu tienda lista para vender en menos de 2 minutos.</p>
              <div className="rounded-[14px] border border-black/[0.10] bg-white" style={{ padding: "18px 18px 14px" }}>
                <p className="font-inter text-[15px] text-black/55" style={{ minHeight: 56, lineHeight: 1.4 }}>
                  Quiero vender muebles de la más alta calidad.
                </p>
                <div className="flex items-center justify-end gap-3">
                  <span className="font-inter text-[12px] text-black/30">40/500</span>
                  <button type="button" className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#DB3B2B] transition-transform duration-200 group-hover:scale-105">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M8 13V3M8 3L4 7M8 3L12 7" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Crea tus productos — product card */}
            <div data-ai-card data-i="3" className="group flex flex-col overflow-hidden rounded-[20px] bg-white transition-all duration-300" style={{ padding: "28px 30px", boxShadow: "0 0 25px 2px rgba(0,0,0,0.06)" }}>
              <h3 className="font-sora text-[20px] font-normal text-black tablet:text-[22px]" style={{ marginBottom: 6 }}>Crea tus productos</h3>
              <p className="font-inter text-[14px] font-light leading-relaxed text-black/65 tablet:text-[15px]" style={{ marginBottom: 18 }}>Sube una foto y la IA genera título, descripción y variantes automáticamente.</p>
              <div className="rounded-[14px] border border-black/[0.08] bg-white" style={{ padding: "16px 18px" }}>
                <div className="flex items-center gap-4" style={{ marginBottom: 14 }}>
                  <div className="flex h-[80px] w-[88px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-black/[0.06]">
                    <Image src="/img/tenis-transparente.png" alt="" width={70} height={56} className="object-contain" />
                  </div>
                  <p className="font-sora text-[15px] font-bold text-black/85 tablet:text-[16px]" style={{ lineHeight: 1.35 }}>
                    Tenis clásicos blancos con detalles en rojo
                  </p>
                </div>
                <p className="font-inter text-[13px] font-light text-black/60 tablet:text-[14px]" style={{ lineHeight: 1.55 }}>
                  Tenis clásicos blancos, con un diseño minimalista y cómodo, son perfectos para cualquier ocasión, ya sea un paseo casual o una salida con amigos.
                </p>
              </div>
            </div>

            {/* Análisis de riesgo — text top-left + gauge bottom-right, fills available height to align with Enrutamiento */}
            <div data-ai-card data-i="5" className="group flex flex-1 flex-col overflow-hidden rounded-[20px] bg-white transition-all duration-300" style={{ padding: "28px 30px", boxShadow: "0 0 25px 2px rgba(0,0,0,0.06)", minHeight: 320 }}>
              <h3 className="font-sora text-[20px] font-normal text-black tablet:text-[22px]" style={{ marginBottom: 6 }}>Análisis de riesgo</h3>
              <p className="font-inter text-[14px] font-light leading-relaxed text-black/65 tablet:text-[15px]" style={{ marginBottom: 16 }}>IA que evalúa el riesgo crediticio de cada transacción en tiempo real.</p>
              <div className="flex flex-1 items-center justify-center">
                <svg width="130" height="130" viewBox="0 0 110 110" fill="none" className="transition-transform duration-500 group-hover:scale-105">
                  <circle cx="55" cy="55" r="48" stroke="rgba(0,0,0,0.04)" strokeWidth="6" />
                  <circle cx="55" cy="55" r="48" stroke="#DB3B2B" strokeWidth="6" strokeLinecap="round" strokeDasharray="260 302" transform="rotate(-90 55 55)" />
                  <circle cx="55" cy="55" r="36" stroke="rgba(0,0,0,0.03)" strokeWidth="5" />
                  <circle cx="55" cy="55" r="36" stroke="#E26153" strokeWidth="5" strokeLinecap="round" strokeDasharray="150 226" transform="rotate(-90 55 55)" />
                  <circle cx="55" cy="55" r="25" stroke="rgba(0,0,0,0.02)" strokeWidth="4" />
                  <circle cx="55" cy="55" r="25" stroke="#F2876A" strokeWidth="4" strokeLinecap="round" strokeDasharray="90 157" transform="rotate(-90 55 55)" />
                  <text x="55" y="60" textAnchor="middle" style={{ fontSize: 22, fontWeight: 700, fill: "rgba(0,0,0,0.75)" }}>78</text>
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
