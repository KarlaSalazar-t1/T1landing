"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";

/* Real T1 stores featured in the "tiendas que ya venden con T1" section. */
const STORES = [
  {
    id: "lochwild",
    name: "LochWild",
    category: "Outdoor & aventura",
    summary:
      "Ropa y equipo para vivir la aventura al aire libre. Una tienda con identidad propia, con envíos y pagos listos desde el día uno.",
    url: "https://lochwild.mx",
    desktop: "/img/store-lochwild-desktop.png",
    mobile: "/img/store-lochwild-mobile.png",
    scrollDur: "38s",
  },
  {
    id: "loverboy",
    name: "Lover Boy",
    category: "Merch de artista",
    summary:
      "Merch oficial y vinilo de edición limitada del artista Mario Bautista, con pre-venta y cobros en un solo lugar.",
    url: "https://loverboy.mx/",
    desktop: "/img/store-loverboy-desktop.png",
    mobile: "/img/store-loverboy-mobile.png",
    scrollDur: "12s",
  },
  {
    id: "pirma",
    name: "Pirma",
    category: "Deporte & calzado",
    summary:
      "Calzado y ropa deportiva mexicana, del running al fútbol y los equipos que amas, en una tienda que opera a gran volumen.",
    url: "https://pirma.com.mx/",
    desktop: "/img/store-pirma-desktop.png",
    mobile: "/img/store-pirma-mobile.png",
    scrollDur: "16s",
  },
];

function NavBtn({ dir, dark, onClick }: { dir: "left" | "right"; dark: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Tienda anterior" : "Tienda siguiente"}
      className={`flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border transition-all duration-150 ${
        dark
          ? "border-white/15 bg-white/[0.06] text-white/55 hover:border-white/30 hover:text-white"
          : "border-black/10 bg-black/[0.03] text-black/45 hover:border-black/25 hover:text-black"
      }`}
    >
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <path d={dir === "left" ? "M10 4L6 8L10 12" : "M6 4L10 8L6 12"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default function StoreShowcase({ dark = true }: { dark?: boolean }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const s = STORES[active];

  const go = useCallback((d: number) => {
    setActive((a) => (a + d + STORES.length) % STORES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % STORES.length), 6500);
    return () => clearInterval(id);
  }, [paused, active]);

  const text = dark ? "text-white" : "text-black";
  const textSoft = dark ? "text-white/65" : "text-black/60";
  const textFaint = dark ? "text-white/45" : "text-black/45";

  return (
    <div
      className="mx-auto max-w-[var(--max-w)] px-5 tablet:px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid items-center gap-4 tablet:grid-cols-[1.12fr_0.88fr] tablet:gap-12">
        {/* ── Left: a deck — active store in front, the others peeking behind ── */}
        <div className="relative h-[340px] tablet:h-[392px]">
          {STORES.map((st, i) => {
            const pos = (i - active + STORES.length) % STORES.length; // 0 front, 1/2 behind
            const deck = [
              { x: 0, y: 0, s: 1, z: 30, dim: 0 },
              { x: 22, y: -18, s: 0.965, z: 20, dim: 0.36 },
              { x: 44, y: -36, s: 0.93, z: 10, dim: 0.5 },
            ][pos];
            const isFront = pos === 0;
            return (
              <div
                key={st.id}
                className="absolute inset-0"
                aria-hidden={!isFront}
                style={{
                  transform: `translate(${deck.x}px, ${deck.y}px) scale(${deck.s})`,
                  transformOrigin: "50% 50%",
                  zIndex: deck.z,
                  transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                {/* Desktop screenshot — no bezel, no browser bar */}
                <div
                  className="relative overflow-hidden rounded-[20px]"
                  style={{ boxShadow: "0 30px 70px -34px rgba(0,0,0,0.6)" }}
                >
                  <div className="relative w-full aspect-[31/20] tablet:aspect-auto tablet:h-[348px]" style={{ background: dark ? "#0d0d0d" : "#fff" }}>
                    <Image
                      src={st.desktop}
                      alt={`Tienda ${st.name} en escritorio`}
                      fill
                      quality={72}
                      className="object-cover"
                      style={{ objectPosition: "50% 0%" }}
                      sizes="(max-width: 768px) 90vw, 600px"
                    />
                  </div>
                  {/* Dim overlay pushes the non-active screens back */}
                  <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                    style={{ background: "rgba(6,10,20,1)", opacity: deck.dim }}
                  />
                </div>

                {/* Phone — only the front store shows it; scroll runs only when
                    front, so it always starts from the top on activation. */}
                <div
                  className="absolute bottom-20 right-2 tablet:bottom-0 tablet:right-6 transition-opacity duration-300"
                  style={{ opacity: isFront ? 1 : 0 }}
                >
                  <div
                    className="w-[130px] h-[260px] tablet:w-[150px] tablet:h-[300px] overflow-hidden rounded-[26px] border-[6px] border-white/20 backdrop-blur-sm"
                    style={{ background: "#0d0d0d", boxShadow: "0 26px 50px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.25)" }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-[20px]">
                      <Image
                        src={st.mobile}
                        alt={`Tienda ${st.name} en móvil`}
                        fill
                        quality={72}
                        className={`object-cover ${isFront ? "store-mobile-scroll" : ""}`}
                        style={{ objectPosition: "50% 0%", animationDuration: st.scrollDur, animationTimingFunction: "linear" }}
                        sizes="160px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Right: store info panel ── */}
        <div>
          <h4
            key={`${s.id}-name`}
            className={`font-sora text-[22px] font-normal tablet:text-[26px] ${text}`}
            style={{ letterSpacing: "-0.02em", animation: "fadeSlideIn 0.4s ease-out" }}
          >
            {s.name}
          </h4>
          <p className={`mt-1 font-inter text-[13px] font-medium ${textFaint}`}>{s.category}</p>
          <p
            key={`${s.id}-summary`}
            className={`mt-4 font-inter text-[15px] leading-relaxed ${textSoft}`}
            style={{ maxWidth: 440, minHeight: 72, animation: "fadeSlideIn 0.4s ease-out" }}
          >
            {s.summary}
          </p>

          {s.url !== "#" && (
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 inline-flex items-center gap-2 rounded-full border px-6 py-3 font-inter text-[14px] font-semibold no-underline transition-colors duration-150 ${
                dark ? "border-white/20 text-white hover:bg-white/10" : "border-black/15 text-black hover:bg-black/[0.04]"
              }`}
            >
              Visitar tienda
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}

          {/* Nav: arrows + dots */}
          <div className="mt-8 flex items-center gap-3">
            <NavBtn dir="left" dark={dark} onClick={() => go(-1)} />
            <NavBtn dir="right" dark={dark} onClick={() => go(1)} />
            <div className="ml-2 flex items-center gap-1.5">
              {STORES.map((st, i) => (
                <button
                  key={st.id}
                  onClick={() => setActive(i)}
                  aria-label={`Ver ${st.name}`}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: active === i ? 20 : 6,
                    height: 6,
                    background: active === i ? "#DB3B2B" : dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
