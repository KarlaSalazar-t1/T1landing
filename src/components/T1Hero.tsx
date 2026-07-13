"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HERO_DATA, LOGIN_URL } from "@/lib/constants";

/* ── Rotating words ── */
/* The rotator cycles the ecosystem pillars + the all-in-one angle WITHOUT
   repeating "IA" — IA now lives once, fixed and core, in the H1 below
   ("listo con IA"), so the hero no longer says "IA" three times (we want it
   to read as core, not spammed). Now also surfaces the two pillars the CEO
   asked to see from the hero: "Vende en marketplaces" (sell beyond your own
   store) and "Protégete del fraude" (the Score benefit, stated plainly — CEO:
   "Protégete con Score es ambiguo si no sabes qué es Score"). "Todo conectado" closes on
   the 360 ecosystem — our real differentiator, not just an online store. */
const ROTATING_WORDS = [
  "Crea tu tienda",
  "Vende en marketplaces",
  "Cobra en segundos",
  "Envía al mejor precio",
  "Protégete del fraude",
  "Todo conectado",
];

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
    <span>
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

      <div className="marquee-track flex items-center">
        {/* Double the logos for seamless loop. Spacing is per-item margin
            (not flex gap) so the -50% keyframe lands exactly on one period
            — otherwise a trailing half-gap makes the loop "jump" on mobile. */}
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <Image
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            width={120}
            height={40}
            className="mr-16 h-[28px] w-auto shrink-0 object-contain brightness-0 invert opacity-60"
          />
        ))}
      </div>
    </div>
  );
}

/* ── Hero video loop ── */
function HeroVideoLoop() {
  const ref = useRef<HTMLVideoElement>(null);

  /* Pause decoding AND hide the layer once the hero is scrolled past.
     The hero is `position: sticky top-0 z-0`, so the <video> stays pinned at
     the top of the viewport BEHIND every dark section for the whole page — it
     is never geometrically off-screen, so an IntersectionObserver on the video
     never fires. Two problems follow from that pinned live layer:
       (1) a 720p video that keeps decoding competes with painting the stack +
           IA sections below it (the "se tarda en cargar" jank);
       (2) on fast scroll-ups it bleeds through for a few frames before the
           opaque dark sections re-composite over it ("veo el video abajo").
     So we gate on scroll position instead: once we've scrolled roughly one
     viewport down (hero is ~88vh and fully covered by then), pause + flip
     `visibility:hidden` so there's no live layer left to bleed or decode.
     Coming back up restores it instantly (poster gives the first paint, no
     black flash). rAF-throttled, passive listener. */
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let ticking = false;
    let hidden = false;
    const apply = () => {
      ticking = false;
      const past = window.scrollY > window.innerHeight * 0.92;
      if (past === hidden) return;
      hidden = past;
      if (past) {
        v.pause();
        v.style.visibility = "hidden";
      } else {
        v.style.visibility = "visible";
        v.play().catch(() => {});
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster="/img/hero-poster.jpg"
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
            <div className="pt-[90px] pb-6 tablet:pt-[110px] tablet:pb-6 lg:pt-[144px]">
              {/* Rotating eyebrow word — mobile sits at 28px so the longest
                  phrase ("Vende en marketplaces") fits on a SINGLE line for all
                  mainstream phones (≥360px wide). At 34px three of the six
                  phrases wrapped to two lines mid-type, which read as broken /
                  jumpy (CEO: "se ve raro cuando se va a 2 líneas"). One-line
                  min-height keeps the eyebrow hugging the H1 with no reserved
                  2-line gap; on a rare ~320px device a phrase may still wrap and
                  the box grows gracefully. */}
              <p
                className="flex min-h-[1.34em] flex-col justify-end font-sora text-[28px] font-normal leading-[1.26] text-white tablet:min-h-[1.34em] tablet:text-[48px] lg:text-[60px]"
                style={{
                  letterSpacing: "-0.03em",
                  marginBottom: 12,
                }}
              >
                <RotatingWord />
              </p>

              {/* Main heading — IA lives here, once and fixed (CEO: "nacimos
                  con IA, es core"). "listo con IA" ties to the north star
                  (negocio listo en minutos) and reads cleanly in Spanish,
                  unlike the "nacido con IA" calque of AI-native. The rotator
                  and subtitle no longer repeat "IA". */}
              <h1
                className="mb-[60px] font-sora text-[32px] font-light text-white tablet:mb-[40px] tablet:text-[44px]"
                style={{
                  letterSpacing: "-0.03em",
                  lineHeight: "1.26em",
                  maxWidth: 580,
                }}
              >
                Todo tu negocio,
                <br />
                listo con <span style={{ color: "#FF6F5E" }}>IA</span>
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
          <div className="relative z-10 mt-auto" style={{ paddingTop: 20, paddingBottom: 30 }}>
            <div className="mx-auto max-w-[var(--max-w)] px-5 tablet:px-6">
              <p
                className="text-center font-inter text-[13px] font-medium uppercase text-white/45 tablet:text-[14px]"
                style={{ letterSpacing: "0.08em", marginBottom: 6 }}
              >
                Más de 25 mil negocios usan T1.
              </p>
              <LogoMarquee />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
