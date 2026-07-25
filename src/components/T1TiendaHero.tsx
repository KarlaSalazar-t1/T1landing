"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SIGNUP_URL } from "@/lib/constants";

/* ── Carrusel de logos de marcas ── */
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
    <div className="relative overflow-hidden" style={{ padding: "22px 0" }}>
      <div className="marquee-track flex items-center">
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <Image
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            width={120}
            height={40}
            className="mr-16 h-[26px] w-auto shrink-0 object-contain opacity-60 brightness-0 invert"
          />
        ))}
      </div>
    </div>
  );
}

const PLACEHOLDERS = [
  "Vendo ropa y accesorios de moda",
  "Vendo gadgets y accesorios de electrónica",
  "Vendo maquillaje y productos de belleza",
  "Vendo ropa y equipo deportivo",
];

const CHIPS: { label: string; example: string }[] = [
  { label: "Moda", example: "Vendo ropa y accesorios de moda" },
  { label: "Electrónica", example: "Vendo gadgets y accesorios de electrónica" },
  { label: "Belleza", example: "Vendo maquillaje y productos de belleza" },
  { label: "Deportes", example: "Vendo ropa y equipo deportivo" },
  { label: "Joyería", example: "Hago joyería y bisutería artesanal" },
  { label: "Hogar", example: "Vendo artículos de decoración para el hogar" },
];

const SOCIAL_PROOF = ["+25,000 tiendas", "+30M de envíos", "+200M transacciones"];

const ArrowUp = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 19V5M12 5l-6 6M12 5l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function T1TiendaHero() {
  const [value, setValue] = useState("");
  const [phIdx, setPhIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Alto del teclado móvil para subir la flecha por encima
  const [kbH, setKbH] = useState(0);
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const onResize = () => setKbH(Math.max(0, window.innerHeight - vv.height - vv.offsetTop));
    vv.addEventListener("resize", onResize);
    vv.addEventListener("scroll", onResize);
    return () => {
      vv.removeEventListener("resize", onResize);
      vv.removeEventListener("scroll", onResize);
    };
  }, []);
  const kbOpen = kbH > 120;

  // Placeholder con animación typewriter
  useEffect(() => {
    if (value) return;
    const full = PLACEHOLDERS[phIdx % PLACEHOLDERS.length];
    let delay = deleting ? 35 : 65;
    if (!deleting && typed === full) delay = 1900;
    if (deleting && typed === "") delay = 350;
    const t = setTimeout(() => {
      if (!deleting && typed === full) setDeleting(true);
      else if (deleting && typed === "") {
        setDeleting(false);
        setPhIdx((p) => p + 1);
      } else {
        setTyped(deleting ? full.slice(0, typed.length - 1) : full.slice(0, typed.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [typed, deleting, phIdx, value]);

  const insertChip = (chip: { label: string; example: string }) => {
    const el = textareaRef.current;
    setValue(chip.example);
    requestAnimationFrame(() => {
      if (el) {
        el.focus();
        const end = el.value.length;
        el.setSelectionRange(end, end);
      }
    });
  };

  const tiendaOk = value.trim().length > 0;

  return (
    <div className="relative z-0">
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-5 pb-0 pt-24 tablet:min-h-screen tablet:px-6 tablet:pt-28 tablet:pb-0">
        {/* Fondo */}
        <div aria-hidden className="absolute inset-0 z-0" style={{ background: "linear-gradient(180deg, #141414 0%, #020101 100%)" }} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at 6% 102%, rgba(3,20,70,0.6) 0%, rgba(17,0,85,0) 26%), radial-gradient(circle at 79% 52%, rgba(112,10,10,0.95) 0%, rgba(87,9,9,0) 60%), radial-gradient(circle at -7% 48%, rgba(112,10,10,1) 0%, rgba(87,9,9,0) 60%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 hidden tablet:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(2,1,1,0.85) 0%, rgba(20,4,4,0.35) 12%, rgba(0,0,0,0) 26%, rgba(0,0,0,0) 74%, rgba(20,4,4,0.35) 88%, rgba(2,1,1,0.85) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 hidden tablet:block"
          style={{ background: "radial-gradient(circle at 97% -2%, rgba(4,24,82,0.75) 0%, rgba(17,0,85,0) 27%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[260px]"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(3,1,1,0.85) 55%, #000 100%)" }}
        />

        {/* Contenido */}
        <div className="relative z-10 flex w-full max-w-[440px] grow flex-col items-center tablet:max-w-[640px]">
          {/* Título */}
          <h1
            className="text-center font-sora text-[32px] font-light leading-[1.14] text-white tablet:text-[48px] desktop:text-[48px]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Crea tu tienda en segundos.
          </h1>

          {/* Bloque central */}
          <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 py-6">
            <p className="max-w-[360px] text-center font-inter text-[16px] font-light leading-[1.6] text-white tablet:max-w-none">
              Describe tu negocio y la IA crea tu tienda lista para vender.
            </p>

            {/* Caja de prompt */}
            <div className="relative w-full rounded-[14px] bg-[#1D1D1D]" style={{ minHeight: 160 }}>
              <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => setValue(e.target.value.slice(0, 500))}
                rows={3}
                aria-label="Describe tu negocio"
                placeholder=""
                className="h-[160px] w-full resize-none rounded-[14px] bg-transparent px-[18px] py-[15px] font-inter text-[16px] leading-[1.5] text-white outline-none"
              />
              {!value && (
                <div aria-hidden className="pointer-events-none absolute inset-0 px-[18px] py-[15px] font-inter text-[16px] leading-[1.5] text-[#8A8A8A]">
                  {typed}
                  <span className="ml-px inline-block w-[2px] align-[-2px] bg-[#8A8A8A]" style={{ height: "1.1em", animation: "blink 1s step-end infinite" }} />
                </div>
              )}
              <a
                href={SIGNUP_URL}
                onClick={(e) => {
                  if (!tiendaOk) e.preventDefault();
                }}
                aria-label="Crear tienda"
                style={kbOpen ? { position: "fixed", right: 16, bottom: kbH + 10, zIndex: 60 } : undefined}
                className={`absolute bottom-3 right-3 flex h-[38px] w-[38px] items-center justify-center rounded-full transition-colors ${
                  tiendaOk ? "bg-red-500 text-white hover:bg-red-600" : "bg-[#60160F] text-white/45"
                }`}
              >
                {ArrowUp}
              </a>
            </div>

            {/* Chips */}
            <div className="flex min-h-[80px] flex-wrap items-start justify-center gap-2.5 tablet:min-h-[44px]">
              {CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => insertChip(chip)}
                  className="rounded-[11px] border border-white/10 px-2.5 py-1.5 font-inter text-[14px] font-medium text-white transition-colors hover:border-white/25"
                  style={{ background: "rgba(52,52,52,0.6)" }}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-2 text-center">
            {SOCIAL_PROOF.map((s, i) => (
              <span key={s} className="flex items-center gap-2.5 font-inter text-[16px] font-medium text-white">
                {i > 0 && <span aria-hidden className="text-white/40">•</span>}
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Marquee de logos */}
        <div className="relative z-10 -mx-5 mt-6 tablet:-mx-6 tablet:mt-8">
          <div className="mx-auto max-w-[var(--max-w)] px-3">
            <LogoMarquee />
          </div>
        </div>
      </section>
    </div>
  );
}
