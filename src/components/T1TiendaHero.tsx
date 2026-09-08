"use client";

import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import { track } from "@/lib/analytics";

/* Frases del prompt animado (rotación con efecto de escritura). */
const PLACEHOLDERS = [
  "quiero vender ropa casual con un estilo minimalista y colores neutros",
  "quiero vender bolsas y accesorios de piel hechos a mano",
  "quiero vender café de especialidad tostado artesanalmente",
  "quiero vender joyería de plata con diseños elegantes y delicados",
  "quiero vender productos de skincare naturales para piel sensible",
  "quiero vender audífonos y accesorios para gaming",
  "quiero vender dulces y postres para eventos y regalos",
  "quiero vender tenis y ropa deportiva de marcas originales",
];

/* Set de chips por demanda real. Moda·Accesorios·Comida·Belleza·Electrónica·Joyería;
   Hogar y Deportes solo en móvil (fila con scroll horizontal). Cada chip precarga
   una frase al azar entre sus variantes (no reducir a una, contamina el análisis). */
type Chip = { label: string; examples: string[]; mobileOnly?: boolean };
const CHIPS: Chip[] = [
  { label: "Moda", examples: [
    "quiero vender ropa casual con un estilo minimalista y colores neutros",
    "quiero vender moda colorida con diseños originales inspirados en tendencias actuales",
    "quiero vender ropa de mujer elegante para oficina y eventos",
    "quiero vender playeras y sudaderas con estampados propios de mi marca",
    "quiero vender ropa vintage y prendas de segunda mano curadas",
    "quiero vender ropa infantil cómoda y divertida para niños de todas las edades",
  ] },
  { label: "Accesorios", examples: [
    "quiero vender bolsas y accesorios de piel hechos a mano",
    "quiero vender gorras y sombreros con un estilo urbano y moderno",
    "quiero vender lentes de sol con diseños premium y estuches personalizados",
    "quiero vender mochilas y maletas resistentes para viaje y trabajo",
    "quiero vender cinturones, carteras y accesorios de piel para caballero",
    "quiero vender accesorios para el cabello con un estilo delicado y femenino",
  ] },
  { label: "Comida", examples: [
    "quiero vender café de especialidad tostado artesanalmente",
    "quiero vender dulces y postres para eventos y regalos",
    "quiero vender snacks y botanas mexicanas con empaque llamativo",
    "quiero vender productos gourmet y artesanales de mi región",
    "quiero vender chocolates y repostería fina hechos por encargo",
    "quiero vender mezcal y bebidas artesanales con presentación premium",
  ] },
  { label: "Belleza", examples: [
    "quiero vender productos de skincare naturales para piel sensible",
    "quiero vender maquillaje con una imagen fresca y juvenil",
    "quiero vender perfumes y fragancias con presentación elegante",
    "quiero vender productos para el cuidado del cabello rizado",
    "quiero vender cosméticos veganos y libres de crueldad animal",
    "quiero vender jabones y productos artesanales para el cuidado personal",
  ] },
  { label: "Electrónica", examples: [
    "quiero vender audífonos y accesorios para gaming",
    "quiero vender fundas y accesorios para celular con diseños originales",
    "quiero vender gadgets y tecnología para casa inteligente",
    "quiero vender accesorios de cómputo con un estilo minimalista",
    "quiero vender bocinas y equipo de audio portátil",
    "quiero vender smartwatches y wearables de varias marcas",
  ] },
  { label: "Joyería", examples: [
    "quiero vender joyería de plata con diseños elegantes y delicados",
    "quiero vender bisutería artesanal hecha a mano",
    "quiero vender anillos y collares personalizados para regalo",
    "quiero vender relojes de marca con presentación premium",
    "quiero vender joyería minimalista de acero inoxidable",
    "quiero vender aretes y pulseras con piedras naturales",
  ] },
  { label: "Hogar", examples: ["Vendo artículos de decoración para el hogar"], mobileOnly: true },
  { label: "Deportes", examples: ["Vendo ropa y equipo deportivo"], mobileOnly: true },
];

const SOCIAL_PROOF = ["+50,000 negocios", "+40M de envíos", "+200M transacciones"];

/* Muestra la primera letra en mayúscula (las frases van en minúscula en la data). */
const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const ArrowUp = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 19V5M12 5l-6 6M12 5l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function T1TiendaHero() {
  const [value, setValue] = useState("");
  const [source, setSource] = useState<"chip" | "typed">("typed");
  const [chipCategory, setChipCategory] = useState<string | null>(null);
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

  const insertChip = (chip: Chip) => {
    const el = textareaRef.current;
    const example = cap(chip.examples[Math.floor(Math.random() * chip.examples.length)]);
    setValue(example);
    setSource("chip");
    setChipCategory(chip.label);
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
        <div aria-hidden className="absolute inset-0 z-0" style={{ background: "linear-gradient(160deg, #69364e 0%, #3f2030 51%, #261420 100%)" }} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 88% 72% at 67% 32%, rgba(234,82,63,0.46) 0%, transparent 63%), radial-gradient(ellipse 61% 59% at 14% 22%, rgba(177,50,50,0.33) 0%, transparent 61%), radial-gradient(ellipse 51% 47% at 82% 84%, rgba(245,120,155,0.17) 0%, transparent 65%), radial-gradient(ellipse 61% 71% at -4% 88%, rgba(78,98,199,0.41) 0%, transparent 55%), radial-gradient(ellipse 43% 61% at 102% 10%, rgba(78,98,199,0.34) 0%, transparent 53%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 hidden tablet:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(2,1,1,0.55) 0%, rgba(20,4,4,0.20) 12%, rgba(0,0,0,0) 26%, rgba(0,0,0,0) 74%, rgba(20,4,4,0.20) 88%, rgba(2,1,1,0.55) 100%)",
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
        <div className="relative z-10 flex w-full max-w-[440px] grow flex-col items-center tablet:max-w-[720px]">
          {/* Título */}
          <h1
            className="mt-8 text-center font-sora font-light leading-[1.12] text-white tablet:mt-14"
            style={{ letterSpacing: "-0.03em", fontSize: "clamp(25px, 7vw, 44px)" }}
          >
            Crea tu tienda en
            <br />
            60 segundos
          </h1>

          <p className="mt-4 max-w-[440px] text-center font-inter text-[16px] font-light leading-[1.55] text-white/70 tablet:mt-5 tablet:max-w-none tablet:whitespace-nowrap tablet:text-[17px]">
            T1 te ayuda a vender, cobrar y enviar a todo México. Gratis, sin tarjeta de crédito.
          </p>

          {/* Bloque central */}
          <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 py-6">
            {/* Caja de prompt */}
            <div className="relative w-full rounded-[14px] bg-[#1D1D1D]" style={{ minHeight: 160 }}>
              <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => { setValue(e.target.value.slice(0, 500)); setSource("typed"); setChipCategory(null); }}
                rows={3}
                aria-label="Describe tu negocio"
                placeholder=""
                className="h-[160px] w-full resize-none rounded-[14px] bg-transparent px-[18px] py-[15px] font-inter text-[16px] leading-[1.5] text-white outline-none"
              />
              {!value && (
                <div aria-hidden className="pointer-events-none absolute inset-0 px-[18px] py-[15px] font-inter text-[16px] leading-[1.5] text-[#8A8A8A]">
                  {cap(typed)}
                  <span className="ml-px inline-block w-[2px] align-[-2px] bg-[#8A8A8A]" style={{ height: "1.1em", animation: "blink 1s step-end infinite" }} />
                </div>
              )}
              <a
                href={SIGNUP_URL}
                onClick={(e) => {
                  if (!tiendaOk) { e.preventDefault(); return; }
                  track("prompt_submitted", { prompt_source: source, chip_category: source === "chip" ? chipCategory : null, prompt_length: value.trim().length });
                }}
                aria-label="Crea tu tienda"
                style={kbOpen ? { position: "fixed", right: 16, bottom: kbH + 10, zIndex: 60 } : undefined}
                className={`absolute bottom-3 right-3 flex h-[38px] items-center gap-1.5 rounded-full px-4 font-inter text-[13px] font-semibold transition-colors ${
                  tiendaOk ? "bg-red-500 text-white hover:bg-red-600" : "bg-[#60160F] text-white/45"
                }`}
              >
                Crea tu tienda
                {ArrowUp}
              </a>
            </div>

            {/* Chips — móvil: una sola fila con scroll horizontal (no envolver); desktop: wrap centrado */}
            <div className="flex w-full min-h-[44px] flex-nowrap items-center justify-start gap-2.5 overflow-x-auto tablet:flex-wrap tablet:justify-center tablet:overflow-visible" style={{ scrollbarWidth: "none" }}>
              {CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => insertChip(chip)}
                  className={`shrink-0 rounded-[11px] border border-white/10 px-2.5 py-1.5 font-inter text-[14px] font-medium text-white transition-colors hover:border-white/25 ${chip.mobileOnly ? "tablet:hidden" : ""}`}
                  style={{ background: "rgba(52,52,52,0.6)" }}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social proof — estilo hero principal: métrica grande arriba, dos abajo */}
          <div className="mb-10 flex flex-col items-center gap-2.5 text-center tablet:mb-14 tablet:gap-4">
            <span className="font-inter text-[19px] font-normal text-white tablet:text-[24px]">{SOCIAL_PROOF[0]}</span>
            <div className="flex items-center gap-6 tablet:gap-12">
              {SOCIAL_PROOF.slice(1).map((s) => (
                <span key={s} className="font-inter text-[15px] font-normal text-white/75 tablet:text-[18px]">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
