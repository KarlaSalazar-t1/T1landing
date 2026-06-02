"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HERO_DATA, LOGIN_URL } from "@/lib/constants";

/* ── Rotating words ── */
const ROTATING_WORDS = [
  "Crea tu tienda",
  "Cobra en línea",
  "Gestiona envíos",
  "Todo en uno",
];

// Pre-compute the longest word to anchor the container's min-width.
// This prevents CLS when the typewriter swaps short<->long words causing
// the heading to wrap differently on narrow viewports.
const LONGEST_WORD = ROTATING_WORDS.reduce((a, b) => (a.length >= b.length ? a : b));

function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const fullText = ROTATING_WORDS[index];
    let charIdx = 0;
    let erasing = false;
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      if (!erasing) {
        charIdx++;
        setDisplayedText(fullText.slice(0, charIdx));
        if (charIdx >= fullText.length) {
          // Pause then start erasing
          timeout = setTimeout(() => {
            erasing = true;
            tick();
          }, 1800);
          return;
        }
        timeout = setTimeout(tick, 60 + Math.random() * 40);
      } else {
        charIdx--;
        setDisplayedText(fullText.slice(0, charIdx));
        if (charIdx <= 0) {
          // Move to next word
          timeout = setTimeout(() => {
            setIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
          }, 300);
          return;
        }
        timeout = setTimeout(tick, 30);
      }
    }

    timeout = setTimeout(tick, 400);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <span className="relative inline-block align-baseline">
      {/* Invisible sizer locks the container width to the longest word so the
          typewriter never causes layout shift (CLS) as text length changes. */}
      <span aria-hidden="true" className="invisible whitespace-pre">
        {LONGEST_WORD}
      </span>
      {/* Actual visible word, absolutely positioned over the sizer */}
      <span className="absolute inset-0">
        {displayedText}
        <span
          className="ml-0.5 inline-block w-[3px] bg-white/80"
          style={{
            height: "0.85em",
            verticalAlign: "text-bottom",
            animation: "blink 0.7s step-end infinite",
          }}
        />
      </span>
    </span>
  );
}

/* ── Logo marquee — same brands as Casos de éxito ── */
const LOGOS = [
  { src: "/img/logos/sears.svg", alt: "Sears" },
  { src: "/img/logos/circulo-de-credito.png", alt: "Círculo de Crédito" },
  { src: "/img/logos/mercado-libre.svg", alt: "Mercado Libre" },
  { src: "/img/logos/telcel.svg", alt: "Telcel" },
  { src: "/img/logos/pirma.png", alt: "Pirma" },
  { src: "/img/logos/makora.svg", alt: "Makora" },
  { src: "/img/logos/sanborns.svg", alt: "Sanborns" },
  { src: "/img/logos/pase.png", alt: "PASE" },
  { src: "/img/logos/claro.svg", alt: "Claro" },
];

function LogoMarquee() {
  return (
    <div className="relative overflow-hidden" style={{ padding: "28px 0" }}>
      {/* No fade edges — clean seamless loop */}

      <div className="marquee-track flex items-center gap-16">
        {/* Double the logos for seamless loop */}
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <Image
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            width={120}
            height={40}
            className="h-[28px] w-auto shrink-0 object-contain brightness-0 invert opacity-60"
          />
        ))}
      </div>
    </div>
  );
}

/* ── Hero video loop — cycles through 4 videos ── */
function HeroVideoLoop() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ pointerEvents: "none", backgroundColor: "#000" }}
    >
      <source src="/img/hero.mp4" type="video/mp4" />
    </video>
  );
}

/* ── Hero section ── */
export default function T1Hero() {
  return (
    <>
      {/* Sticky hero — stays in place while content scrolls over.
          Now sized so the V/C/E intro cards (in the dark band that follows)
          peek visibly above the fold, giving an unmistakable scroll hint. */}
      <div className="sticky top-0 z-0">
        <section className="relative flex min-h-[86svh] flex-col overflow-hidden tablet:h-[88vh] tablet:min-h-0">
          {/* Background video — loop through 4 clips */}
          <div className="absolute inset-0 z-0">
            <HeroVideoLoop />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/[0.42]" />
          </div>

          {/* Bottom gradient fade to black */}
          <div
            className="absolute bottom-0 left-0 right-0 z-[1]"
            style={{
              height: 340,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 60%, #000 100%)",
            }}
          />

          {/* Content — on mobile fills the available space with content
              centered vertically so the gap above the logo marquee shrinks
              on taller phones. Desktop also grows (flex-1) so the logo
              marquee gets pushed to the bottom on tall monitors instead
              of floating in the middle of a black void. */}
          <div className="relative z-10 mx-auto flex w-full max-w-[var(--max-w)] flex-1 flex-col justify-center px-5 tablet:px-6">
            <div className="pt-[90px] pb-6 tablet:pt-[140px] tablet:pb-6 lg:pt-[180px]">
              {/* Rotating eyebrow word */}
              <p
                className="font-sora text-[38px] font-normal leading-[1.26] text-white tablet:text-[48px] lg:text-[60px]"
                style={{
                  letterSpacing: "-0.03em",
                  marginBottom: 12,
                  minHeight: "1.26em",
                }}
              >
                <RotatingWord />
              </p>

              {/* Main heading */}
              <h1
                className="mb-[60px] font-sora text-[32px] font-light text-white tablet:mb-[40px] tablet:text-[40px] lg:text-[48px]"
                style={{
                  letterSpacing: "-0.03em",
                  lineHeight: "1.26em",
                  maxWidth: 580,
                }}
              >
                La plataforma del
                <br />
                comercio moderno
              </h1>

              {/* CTAs */}
              <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:gap-4">
                <a
                  href={HERO_DATA.ctaHref}
                  className="inline-flex h-[50px] items-center justify-center gap-2.5 rounded-[23px] bg-[#DB3B2B] px-8 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A] hover:shadow-[0_4px_16px_rgba(226,97,83,0.4)] tablet:px-10 tablet:text-[16px]"
                >
                  {HERO_DATA.cta}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M6.75 4.5L11.25 9L6.75 13.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href={LOGIN_URL}
                  className="inline-flex h-[50px] items-center justify-center rounded-[23px] border border-[#E7E7E7] bg-transparent px-8 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-white/10 tablet:px-10 tablet:text-[16px]"
                >
                  {HERO_DATA.ctaSecondary}
                </a>
              </div>

              {/* Subtitle */}
              <p
                className="font-inter text-[14px] font-light text-white/70 tablet:text-[16px]"
                style={{ letterSpacing: "-0.03em", marginTop: 14 }}
              >
                {HERO_DATA.subtitle}
              </p>
            </div>
          </div>

          {/* Logo marquee — pinned to the bottom of the section
              (mt-auto) so on tall desktops it sits low instead of
              floating in the middle of empty black. */}
          <div className="relative z-10 mt-auto" style={{ paddingTop: 10, paddingBottom: 30 }}>
            <div className="mx-auto max-w-[var(--max-w)] px-4 tablet:px-6">
              <LogoMarquee />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
