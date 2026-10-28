"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { SIGNUP_URL } from "@/lib/constants";
import HeroBackground from "@/components/HeroBackground";
import T1FinalCTA from "@/components/T1FinalCTA";
import { T1FAQSection } from "@/components/T1FAQ";
import { UnoHeroCard, UnoStage, type Scene } from "@/components/T1UnoStage";
import { PEDIDOS, PREGUNTAS, TIENDA, UnoVideo } from "@/components/T1IA";

/* Landing de Uno — V2 (más simple, por comentarios del CEO: "desordenado,
   muchos colores, difícil de leer").
   · 5 secciones en lugar de 9: hero → video + qué es Uno → un solo demo →
     todo tu negocio → FAQ y cierre (el alta pasó a la FAQ).
   · Una sola paleta: el degradado oscuro de T1 solo en el hero y el cierre;
     en medio todo blanco.
   · Menos movimiento: un solo demo, escenas de 13 s, burbujas fijas y Uno
     animado solo en el hero y en el cierre.
   · El video va como SEGUNDA sección (no en el hero: ningún landing de T1
     usa ese patrón). PENDIENTE: grabación real de Uno en el administrador. */

/* Video del evento de Uno (1:00, 1280×720, ~2 MB). Si se quita (null) se
   muestra el marco con el botón de play como respaldo. */
const UNO_VIDEO_SRC: string | null = "/video/uno/uno-evento.mp4";

/* Un solo demo con lo más representativo de preguntar, pedir y diseñar */
// PEDIDOS: [cupón, producto con foto, link de pago, guía, catálogo]
// Empieza con la historia del evento: producto → link de pago → guía → rastreo
const DEMO: Scene[] = [PEDIDOS[1], PEDIDOS[2], PEDIDOS[3], PREGUNTAS[3], PREGUNTAS[0], PEDIDOS[0], TIENDA[0]];

const INTRO = [
  { title: "Pregúntale", desc: "Ventas, pedidos, cobros o envíos: te responde con tus números.", icon: <path d="M5 6.5A2.5 2.5 0 017.5 4h9A2.5 2.5 0 0119 6.5v7a2.5 2.5 0 01-2.5 2.5H11l-4 3.5V16h0.5A2.5 2.5 0 015 13.5v-7z" /> },
  { title: "Pídele", desc: "Crea cupones, productos, guías y links de pago por ti.", icon: <path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" /> },
  { title: "Tú decides", desc: "Antes de hacer algo con dinero, te pregunta y espera tu confirmación.", icon: <><circle cx="12" cy="12" r="9" /><path d="M8 12.3l2.8 2.8L16.2 9.5" /></> },
];


/* Ejemplos de qué pedirle a Uno (solo funciones que ya existen). El chip dice
   de qué producto de T1 sale cada respuesta. */
type Producto = "tienda" | "pagos" | "envios";
const LOGO: Record<Producto, { src: string; alt: string; w: number }> = {
  tienda: { src: "/img/t1tienda-logo.svg", alt: "T1 Tienda", w: 130 },
  pagos: { src: "/img/t1pagos-logo.svg", alt: "T1 Pagos", w: 137 },
  envios: { src: "/img/t1envios-logo.svg", alt: "T1 Envíos", w: 137 },
};
type Prompt = { tema: string; texto: string; producto: Producto };
const PROMPT_ROWS: Prompt[][] = [
  [
    { tema: "Productos", texto: "Crea un nuevo producto con esta foto", producto: "tienda" },
    { tema: "Cobros", texto: "¿Cuánto me queda neto de lo que cobré hoy?", producto: "pagos" },
    { tema: "Guías", texto: "Genera la guía del pedido #129 con la opción más rápida", producto: "envios" },
    { tema: "Promociones", texto: "Crea un cupón del 15% para sudaderas", producto: "tienda" },
    { tema: "Ventas", texto: "¿Cómo me fue en ventas este mes?", producto: "tienda" },
    { tema: "Rastreo", texto: "¿Dónde va el envío del pedido #124?", producto: "envios" },
  ],
  [
    { tema: "Links de pago", texto: "Crea un link de pago de $850", producto: "pagos" },
    { tema: "Tu tienda", texto: "Agrega una sección con lo más vendido", producto: "tienda" },
    { tema: "Cotizaciones", texto: "Cotiza un envío de 2 kg de CDMX a Mérida", producto: "envios" },
    { tema: "Pedidos", texto: "¿Qué pedidos tengo por preparar?", producto: "tienda" },
    { tema: "Sobrepesos", texto: "¿Tengo envíos con sobrepeso?", producto: "envios" },
    { tema: "Catálogo", texto: "Sube los productos de mi archivo de Excel", producto: "tienda" },
  ],
];

function PromptCard({ tema, texto, producto, hidden }: Prompt & { hidden?: boolean }) {
  const l = LOGO[producto];
  return (
    <div aria-hidden={hidden || undefined} className="mr-4 flex h-[148px] w-[264px] shrink-0 flex-col rounded-[20px] border border-black/[0.07] bg-white p-5 shadow-[0_12px_40px_-28px_rgba(0,0,0,0.35)] tablet:h-[160px] tablet:w-[300px] tablet:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="font-inter text-[13px] font-medium text-black/45">{tema}</span>
        <Image src={l.src} alt={l.alt} width={l.w} height={42} loading="eager" className="h-[15px] w-auto" />
      </div>
      <p className="mt-3 font-inter text-[17px] text-black tablet:text-[18px]" style={{ lineHeight: 1.4, letterSpacing: "-0.01em" }}>{texto}</p>
    </div>
  );
}

function VideoUno() {
  const ref = useRef<HTMLVideoElement>(null);
  // Solo se reproduce mientras se ve en pantalla (ahorra datos y batería).
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.4 });
    obs.observe(v);
    return () => obs.disconnect();
  }, []);
  return (
    <div className="relative mx-auto aspect-video w-full max-w-[960px] overflow-hidden rounded-[24px] bg-[#111]" style={{ boxShadow: "0 40px 90px -40px rgba(0,0,0,0.45)" }}>
      {UNO_VIDEO_SRC ? (
        <video ref={ref} src={UNO_VIDEO_SRC} muted loop playsInline controls preload="metadata" className="h-full w-full object-cover" />
      ) : (
        <>
          <HeroBackground fade={false} />
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 text-center">
            <UnoVideo estado="reposo" className="h-[88px] w-[88px] tablet:h-[130px] tablet:w-[130px]" />
            <span className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white/95 tablet:h-[68px] tablet:w-[68px]" style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#111" aria-hidden><path d="M8 5.5v13l11-6.5-11-6.5z" /></svg>
            </span>
            <p className="font-inter text-[14px] font-medium text-white/75">Mira a Uno en acción · 0:40</p>
          </div>
        </>
      )}
    </div>
  );
}

export default function T1IAv2() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("modal-visible"); }),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    root.querySelectorAll("[data-modal-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="w-full">
      {/* ── 1 · Hero (igual que v1) ── */}
      <section className="relative overflow-hidden px-5 pt-28 pb-16 tablet:px-10 tablet:pt-36 tablet:pb-24">
        <HeroBackground fade={false} />
        <div className="relative z-10 mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tablet:gap-12">
            <div>
              <h1 className="font-sora text-[34px] font-light text-white tablet:text-[48px] lg:text-[60px]" style={{ lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 22 }}>
                El experto de tu negocio
              </h1>
              <p className="font-inter text-[16px] font-light text-white/70 tablet:text-[19px]" style={{ lineHeight: 1.55, marginBottom: 32, maxWidth: 480 }}>
                Uno, la IA de T1, conoce tus ventas, productos, clientes y envíos, y hace el trabajo por ti.
              </p>
              <a href={SIGNUP_URL} className="inline-flex items-center rounded-[14px] bg-[#DB3B2B] px-7 py-3.5 font-inter text-[15px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A]">
                Comienza gratis
              </a>
              {/* El botón habla de la cuenta de T1; esta línea aclara que Uno
                  no se paga aparte. */}
              <p className="mt-3 flex items-center gap-1.5 font-inter text-[13px] text-white/65">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 12l5 5 9-10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Uno viene incluido en todos los planes de T1
              </p>
            </div>
            <div className="relative">
              <UnoHeroCard avatar={<UnoVideo estado="saludo" className="h-full w-full" />} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 · Video + qué es Uno, en una sola sección ── */}
      <section className="relative bg-white px-5 py-16 tablet:px-10 tablet:py-24">
        <div className="mx-auto max-w-[1040px]">
          <div data-modal-animate className="mx-auto mb-8 max-w-[720px] text-center tablet:mb-12">
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12 }}>
              Uno no te contesta. Uno lo hace.
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.5 }}>
              Le pides lo que necesitas con tus palabras, y lo hace.
            </p>
          </div>
          <div data-modal-animate><VideoUno /></div>
          <div data-modal-animate className="mt-8 grid grid-cols-1 gap-4 tablet:mt-12 tablet:grid-cols-3 tablet:gap-5">
            {INTRO.map((c, i) => (
              <div key={c.title} data-stagger style={{ ["--i" as string]: i }} className="rounded-[20px] border border-black/[0.07] bg-white p-5 shadow-[0_12px_40px_-28px_rgba(0,0,0,0.35)] tablet:p-6">
                <div className="mb-2 flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E2939" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden>{c.icon}</svg>
                  <h3 className="font-sora text-[19px] font-normal text-black tablet:text-[21px]" style={{ letterSpacing: "-0.02em" }}>{c.title}</h3>
                </div>
                <p className="font-inter text-[15px] font-light text-black/60" style={{ lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 · Un solo demo: preguntar, pedir y diseñar ── */}
      <section className="relative overflow-hidden bg-white px-5 py-16 tablet:px-10 tablet:py-24">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div data-modal-animate className="mx-auto mb-8 max-w-[720px] text-center">
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12 }}>
              Tu día, resuelto en una conversación
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.5 }}>
              Sube un producto, cóbralo y mándalo sin salir de la conversación.
            </p>
          </div>
          <UnoStage scenes={DEMO} sceneMs={13000} />
        </div>
      </section>

      {/* ── 4 · Todo tu negocio: ejemplos de qué pedirle, por producto ── */}
      <section className="relative overflow-hidden bg-white py-16 tablet:py-24">
        <div className="mx-auto max-w-[var(--max-w)] px-5 tablet:px-10">
          <div data-modal-animate className="mx-auto mb-8 max-w-[760px] text-center tablet:mb-12">
            <h2 className="font-sora text-[28px] font-light text-black tablet:text-[44px]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
              Todo tu negocio en una sola conversación
            </h2>
            <p className="font-inter text-[16px] font-light text-black/60 tablet:text-[18px]" style={{ lineHeight: 1.55 }}>
              Una sola IA para tu tienda, tus pagos y tus envíos, con más de 250 acciones.
            </p>
          </div>
        </div>
        {/* Dos filas en sentidos opuestos; se pausan con el mouse encima */}
        <div data-modal-animate className="flex flex-col gap-4" style={{ maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}>
          {PROMPT_ROWS.map((row, r) => (
            <div key={r} className="overflow-hidden py-3">
              <div className="marquee-track flex motion-reduce:[animation:none]" style={{ animationDuration: r ? "70s" : "60s", animationDirection: r ? "reverse" : "normal" }}>
                {[...row, ...row].map((p, i) => <PromptCard key={i} {...p} hidden={i >= row.length} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6 · FAQ y cierre ── */}
      <T1FAQSection
        faqs={[
          { q: "¿Uno tiene costo?", a: "No. Uno viene incluido en todos los planes de T1, sin costo adicional." },
          { q: "¿Dónde encuentro a Uno?", a: "Uno vive en cada uno de los administradores de T1. Ábrelo desde el panel lateral en cualquier sección, desde tu computadora o tu celular, a la hora que sea." },
          { q: "¿Qué puede hacer Uno?", a: "Consulta tus ventas, pedidos, transacciones y envíos; cotiza y genera guías, programa recolecciones, crea productos, cupones y links de pago, importa tu catálogo y diseña tu tienda." },
          { q: "¿Puede hacer cambios en mi negocio?", a: "Sí, pero siempre te muestra una propuesta antes. Nada se aplica hasta que eliges Aplicar o Confirmar." },
          { q: "¿Qué hace diferente a Uno de otras herramientas de IA?", a: "Uno trabaja con los datos reales de tu tienda, tus cobros y tus envíos, y puede hacer cambios en ellos. No te da consejos genéricos: te responde con tus números." },
          { q: "¿Uno me ayuda a configurar mi cuenta?", a: "Sí. Desde el primer día te dice qué te falta para cobrar, vender y facturar, y lo resuelve contigo paso a paso." },
          { q: "¿Necesito conocimientos técnicos?", a: "No. Le escribes como le escribirías a alguien de tu equipo, sin fórmulas ni filtros." },
        ]}
      />
      <T1FinalCTA
        title={
          <>
            <UnoVideo estado="saludo" className="mx-auto mb-4 block h-[88px] w-[88px] tablet:h-[110px] tablet:w-[110px]" />
            El verdadero todo en Uno
          </>
        }
        description="Crea tu cuenta gratis y pregúntale a Uno cómo va tu negocio."
      />
    </div>
  );
}
